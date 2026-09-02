import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  Icon,
  iconCatalog,
  iconSizeVariables,
} from "../../src/design-system/components/icons";

describe("icon primitive", () => {
  it("keeps the catalog closed and sized from tokens", () => {
    expect(Object.keys(iconCatalog).sort()).toEqual([
      "add",
      "alert",
      "arrowLeft",
      "arrowRight",
      "arrowUpRight",
      "bookOpen",
      "calendar",
      "cancel",
      "checkmarkCircle",
      "clock",
      "download",
      "file",
      "filter",
      "helpCircle",
      "informationCircle",
      "link",
      "mail",
      "menu",
      "minus",
      "presentation",
      "search",
      "share",
      "sidebarLeft",
      "userGroup",
    ]);
    expect(iconSizeVariables.small).toBe("var(--primitive-dimension-icon-small)");
    expect(iconSizeVariables.medium).toBe(
      "var(--primitive-dimension-icon-medium)",
    );
    expect(iconSizeVariables.large).toBe("var(--primitive-dimension-icon-large)");
  });

  it("renders a decorative svg at the requested token size", () => {
    const markup = renderToStaticMarkup(
      <Icon name="search" size="small" />,
    );

    expect(markup).toContain("<svg");
    expect(markup).toContain('aria-hidden="true"');
    expect(markup).toContain('data-icon="search"');
    expect(markup).toContain('data-size="small"');
    expect(markup).toContain("var(--primitive-dimension-icon-small)");
  });

  it("swaps to the alternate glyph without changing the wrapper", () => {
    const markup = renderToStaticMarkup(
      <Icon alt="minus" name="add" showAlt size="small" />,
    );

    expect(markup).toContain('data-icon="minus"');
    expect(markup).not.toContain('data-icon="add"');
  });
});
