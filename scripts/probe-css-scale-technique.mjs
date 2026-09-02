// Settles an empirical fork in the preview-scaling design: can we derive a
// unitless scale factor in pure CSS, and by which construction?
//
// Typed calc() division (length / length -> number) is CSS Values 4 and is not
// in Firefox as of 157. tan(atan2(y, x)) is the same quotient via trig
// functions, which shipped in all three engines in 2022. This probe checks that
// the trig form actually produces the right number rather than trusting prose.
//
// Chrome only proves the trig form works where typed division also works. It
// cannot prove the Firefox claim. It does prove the two forms are numerically
// identical, which is the part a fallback would have to preserve.

import { spawn } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import process from "node:process";

const CHROME =
  process.env.CHROME_BIN ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const CANVAS_WIDTH = 1440;
const CANVAS_HEIGHT = 900;
const AVAILABLE = 783;

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

const PAGE = `<!doctype html>
<meta charset="utf-8">
<title>scale technique probe</title>
<style>
  @property --canvas-w { syntax: "<length>"; inherits: true; initial-value: ${CANVAS_WIDTH}px; }
  @property --canvas-h { syntax: "<length>"; inherits: true; initial-value: ${CANVAS_HEIGHT}px; }
  @property --fit      { syntax: "<length>"; inherits: true; initial-value: ${AVAILABLE}px; }

  #host {
    container-type: inline-size;
    width: ${AVAILABLE}px;
    --canvas-w: ${CANVAS_WIDTH}px;
    --canvas-h: ${CANVAS_HEIGHT}px;
    --fit: ${AVAILABLE}px;
  }
  #host > div:not(#frame) { width: 10px; height: 10px; }

  /* The three candidate constructions for the same number. */
  #typed     { transform: scale(calc(var(--fit) / var(--canvas-w))); }
  #trig      { transform: scale(tan(atan2(var(--fit), var(--canvas-w)))); }
  #trigClamp { transform: scale(min(1, tan(atan2(var(--fit), var(--canvas-w))))); }

  /* Container-relative, which is how it would actually be authored. */
  #trigCq    { transform: scale(min(1, tan(atan2(100cqw, var(--canvas-w))))); }

  /* Frame sized by the same scale, so the aspect ratio is exact by construction. */
  #frame {
    width:  calc(var(--canvas-w) * tan(atan2(100cqw, var(--canvas-w))));
    height: calc(var(--canvas-h) * tan(atan2(100cqw, var(--canvas-w))));
  }

  /* Does the scale factor survive an unregistered custom property? */
  #unregistered { --raw-w: ${CANVAS_WIDTH}px; transform: scale(tan(atan2(var(--fit), var(--raw-w)))); }
</style>
<div id="host">
  <div id="typed"></div>
  <div id="trig"></div>
  <div id="trigClamp"></div>
  <div id="trigCq"></div>
  <div id="frame"></div>
  <div id="unregistered"></div>
  <div id="inertHost" inert><button id="innerButton">x</button></div>
</div>
`;

const probe = `(() => {
  const scaleOf = (id) => {
    const t = getComputedStyle(document.getElementById(id)).transform;
    if (!t || t === "none") return { raw: t, scale: null };
    const m = t.match(/matrix\\(([^)]+)\\)/);
    return { raw: t, scale: m ? Number.parseFloat(m[1].split(",")[0]) : null };
  };
  const frame = getComputedStyle(document.getElementById("frame"));
  const button = document.getElementById("innerButton");
  button.focus();
  return {
    ua: navigator.userAgent,
    typed: scaleOf("typed"),
    trig: scaleOf("trig"),
    trigClamp: scaleOf("trigClamp"),
    trigCq: scaleOf("trigCq"),
    unregistered: scaleOf("unregistered"),
    frameWidth: frame.width,
    frameHeight: frame.height,
    supportsTypedDivision: CSS.supports("transform", "scale(calc(100px / 10px))"),
    supportsTrigRatio: CSS.supports("transform", "scale(tan(atan2(100px, 10px)))"),
    supportsContainerUnit: CSS.supports("width", "1cqw"),
    inertInPrototype: "inert" in HTMLElement.prototype,
    inertButtonTookFocus: document.activeElement === button,
  };
})()`;

async function main() {
  const userDataDir = await mkdtemp(path.join(tmpdir(), "css-scale-probe-"));
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
    await send(
      "Page.navigate",
      { url: `data:text/html;charset=utf-8,${encodeURIComponent(PAGE)}` },
      sessionId,
    );
    await loaded;
    await sleep(400);

    const { result } = await send(
      "Runtime.evaluate",
      { expression: probe, returnByValue: true },
      sessionId,
    );

    const value = result?.value;
    if (!value) throw new Error("probe returned no value");

    const expectedScale = AVAILABLE / CANVAS_WIDTH;
    const failures = [];

    console.log(value.ua);
    console.log("");
    console.log(`expected scale ${expectedScale.toFixed(6)}`);
    console.log("");

    for (const key of ["typed", "trig", "trigClamp", "trigCq", "unregistered"]) {
      const entry = value[key];
      const ok = entry.scale !== null && Math.abs(entry.scale - expectedScale) < 0.0005;
      console.log(
        `${key.padEnd(13)} ${ok ? "ok    " : "FAIL  "} scale=${entry.scale ?? "none"}  ${entry.raw}`,
      );
      if (!ok && key !== "unregistered") failures.push(`${key} did not produce the expected scale`);
    }

    const expectedFrameWidth = CANVAS_WIDTH * expectedScale;
    const expectedFrameHeight = CANVAS_HEIGHT * expectedScale;
    console.log("");
    console.log(`frame ${value.frameWidth} x ${value.frameHeight}`);
    console.log(
      `want  ${expectedFrameWidth.toFixed(2)}px x ${expectedFrameHeight.toFixed(2)}px  (ratio ${(CANVAS_WIDTH / CANVAS_HEIGHT).toFixed(4)})`,
    );
    const gotRatio = Number.parseFloat(value.frameWidth) / Number.parseFloat(value.frameHeight);
    console.log(`got ratio ${gotRatio.toFixed(4)}`);
    if (Math.abs(gotRatio - CANVAS_WIDTH / CANVAS_HEIGHT) > 0.001) {
      failures.push("frame aspect ratio drifted");
    }

    console.log("");
    console.log(`CSS.supports typed division   ${value.supportsTypedDivision}`);
    console.log(`CSS.supports trig ratio       ${value.supportsTrigRatio}`);
    console.log(`CSS.supports 1cqw             ${value.supportsContainerUnit}`);
    console.log(`inert in HTMLElement          ${value.inertInPrototype}`);
    console.log(`button inside inert took focus ${value.inertButtonTookFocus}`);
    if (value.inertButtonTookFocus) failures.push("inert did not remove the button from focus");

    console.log("");
    if (failures.length === 0) {
      console.log("PASS: trig ratio is numerically identical to typed division here.");
    } else {
      console.log("FAILURES");
      for (const failure of failures) console.log(`  - ${failure}`);
      process.exitCode = 1;
    }
  } finally {
    socket?.close();
    chrome.kill();
    await rm(userDataDir, { recursive: true, force: true });
  }
}

await main();
