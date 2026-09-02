import { spawn } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import process from "node:process";

const TARGET_URL = process.env.PREVIEW_URL ?? "http://localhost:3000/design-lab/explorations";
const CHROME =
  process.env.CHROME_BIN ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const EXPECTED_STAGE_WIDTH = { desktop: 1440, mobile: 375 };
const MIN_PREVIEW_FONT_PX = 14;
const BANNED_SANS = "Inter";
const BANNED_CANVAS = "rgb(0, 0, 0)";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForDevToolsPort(userDataDir) {
  const portFile = path.join(userDataDir, "DevToolsActivePort");
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const [port] = (await readFile(portFile, "utf8")).split("\n");
      if (port) return Number(port);
    } catch {
      // Chrome has not written the file yet.
    }
    await sleep(100);
  }
  throw new Error("Chrome never reported a DevTools port");
}

function createCdpSession(socket) {
  let nextId = 0;
  const pending = new Map();
  const listeners = new Set();

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id !== undefined && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(`${message.method}: ${message.error.message}`));
      else resolve(message.result);
      return;
    }
    for (const listener of listeners) listener(message);
  });

  const send = (method, params = {}, sessionId) =>
    new Promise((resolve, reject) => {
      const id = (nextId += 1);
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params, sessionId }));
    });

  const once = (method, sessionId) =>
    new Promise((resolve) => {
      const listener = (message) => {
        if (message.method === method && (!sessionId || message.sessionId === sessionId)) {
          listeners.delete(listener);
          resolve(message.params);
        }
      };
      listeners.add(listener);
    });

  return { send, once };
}

const measure = `(() => {
  const round = (n) => Math.round(n * 100) / 100;
  const root = getComputedStyle(document.documentElement);
  const body = getComputedStyle(document.body);

  const previews = [...document.querySelectorAll("[data-preview-mode]")].map((frame) => {
    const stage = frame.querySelector("[data-preview-stage]");
    const measured = stage ?? frame.lastElementChild;
    const transform = measured ? getComputedStyle(measured).transform : "none";
    const scale = transform === "none" ? 1 : Number(transform.split("(")[1].split(",")[0]);
    return {
      mode: frame.dataset.previewMode,
      hasStage: Boolean(stage),
      layoutWidth: measured ? round(measured.clientWidth) : null,
      renderedWidth: measured ? round(measured.getBoundingClientRect().width) : null,
      frameWidth: round(frame.getBoundingClientRect().width),
      scale: round(scale),
      tabIndex: frame.getAttribute("tabindex"),
      decorativeButtons: frame.querySelectorAll("button").length,
      decorativeLinks: frame.querySelectorAll("a[href]").length,
    };
  });

  const previewFontSizes = [...document.querySelectorAll("[data-preview-mode] *")]
    .filter((el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()))
    .map((el) => parseFloat(getComputedStyle(el).fontSize))
    .filter((n) => Number.isFinite(n));

  return {
    viewport: window.innerWidth,
    bodyFontFamily: body.fontFamily,
    bodyBackground: body.backgroundColor,
    bodyMinHeight: body.minHeight,
    accent: root.getPropertyValue("--color-accent").trim(),
    canvas: root.getPropertyValue("--color-bg").trim(),
    previews,
    smallestPreviewFontPx: previewFontSizes.length ? Math.min(...previewFontSizes) : null,
  };
})()`;

async function probe(send, sessionId, width, height) {
  await send(
    "Emulation.setDeviceMetricsOverride",
    { width, height, deviceScaleFactor: 1, mobile: false },
    sessionId,
  );
  await send("Page.reload", { ignoreCache: false }, sessionId);
  await sleep(1200);
  const { result, exceptionDetails } = await send(
    "Runtime.evaluate",
    { expression: measure, returnByValue: true, awaitPromise: true },
    sessionId,
  );
  if (exceptionDetails) throw new Error(exceptionDetails.text ?? "evaluation failed");
  return result.value;
}

function grade(wide, narrow) {
  const failures = [];

  for (const [label, snapshot] of [
    ["1440px viewport", wide],
    ["375px viewport", narrow],
  ]) {
    for (const preview of snapshot.previews) {
      const expected = EXPECTED_STAGE_WIDTH[preview.mode];
      if (!preview.hasStage) {
        failures.push(
          `${label}: ${preview.mode} preview has no [data-preview-stage]; the "${expected}" caption is unbacked`,
        );
        continue;
      }
      if (Math.abs(preview.layoutWidth - expected) > 1) {
        failures.push(
          `${label}: ${preview.mode} stage lays out at ${preview.layoutWidth}px, caption claims ${expected}px`,
        );
      }
      if (preview.renderedWidth > preview.frameWidth + 1) {
        failures.push(
          `${label}: ${preview.mode} stage renders ${preview.renderedWidth}px inside a ${preview.frameWidth}px frame`,
        );
      }
      if (preview.decorativeButtons > 0) {
        failures.push(
          `${label}: ${preview.mode} preview holds ${preview.decorativeButtons} focusable <button> in decorative content`,
        );
      }
    }
  }

  if (wide.bodyFontFamily.includes(BANNED_SANS)) {
    failures.push(`body font is still ${BANNED_SANS}: ${wide.bodyFontFamily}`);
  }
  if (wide.bodyBackground === BANNED_CANVAS) {
    failures.push("body background is still pure black");
  }
  if (!wide.bodyMinHeight || wide.bodyMinHeight === "0px") {
    failures.push("body has no min-height");
  }
  if (narrow.smallestPreviewFontPx !== null && narrow.smallestPreviewFontPx < MIN_PREVIEW_FONT_PX) {
    failures.push(
      `smallest preview text at 375px is ${narrow.smallestPreviewFontPx}px, floor is ${MIN_PREVIEW_FONT_PX}px`,
    );
  }

  return failures;
}

async function main() {
  const userDataDir = await mkdtemp(path.join(tmpdir(), "preview-fidelity-"));
  const chrome = spawn(
    CHROME,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      "--remote-debugging-port=0",
      `--user-data-dir=${userDataDir}`,
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  let socket;
  try {
    const port = await waitForDevToolsPort(userDataDir);
    const version = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json();

    socket = new WebSocket(version.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      socket.addEventListener("open", resolve, { once: true });
      socket.addEventListener("error", reject, { once: true });
    });

    const { send, once } = createCdpSession(socket);
    const { targetId } = await send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });

    await send("Page.enable", {}, sessionId);
    await send("Runtime.enable", {}, sessionId);

    const loaded = once("Page.loadEventFired", sessionId);
    await send("Page.navigate", { url: TARGET_URL }, sessionId);
    await loaded;
    await sleep(1000);

    const wide = await probe(send, sessionId, 1440, 900);
    const narrow = await probe(send, sessionId, 375, 812);
    const failures = grade(wide, narrow);

    const report = { url: TARGET_URL, wide, narrow, failures };
    if (process.argv.includes("--json")) {
      console.log(JSON.stringify(report, null, 2));
    } else {
      console.log(`preview fidelity: ${TARGET_URL}`);
      console.log(`  body font        ${wide.bodyFontFamily}`);
      console.log(`  body background  ${wide.bodyBackground}`);
      console.log(`  accent           ${wide.accent}`);
      console.log(`  smallest 375 text ${narrow.smallestPreviewFontPx}px`);
      for (const [label, snapshot] of [
        ["1440", wide],
        ["375", narrow],
      ]) {
        for (const preview of snapshot.previews.slice(0, 2)) {
          console.log(
            `  @${label} ${preview.mode}: stage=${preview.hasStage} layout=${preview.layoutWidth} rendered=${preview.renderedWidth} frame=${preview.frameWidth} scale=${preview.scale} buttons=${preview.decorativeButtons}`,
          );
        }
      }
      console.log(failures.length ? `\nFAIL (${failures.length})` : "\nPASS");
      for (const failure of failures) console.log(`  - ${failure}`);
    }

    process.exitCode = failures.length ? 1 : 0;
  } finally {
    socket?.close();
    chrome.kill();
    await rm(userDataDir, { force: true, recursive: true });
  }
}

await main();
