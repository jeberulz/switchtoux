import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export type PageContainerWidth = "content" | "atmospheric";

export interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
  width?: PageContainerWidth;
  withGutters?: boolean;
}

const containerWidths: Record<PageContainerWidth, string> = {
  content: "max-w-[var(--layout-container-content)]",
  atmospheric: "max-w-[var(--layout-container-atmospheric)]",
};

export const PageContainer = forwardRef<HTMLDivElement, PageContainerProps>(
  function PageContainer(
    { className, width = "content", withGutters = true, ...props },
    ref,
  ) {
    return (
      <div
        className={classes(
          "mx-auto w-full",
          containerWidths[width],
          withGutters &&
            "px-[var(--layout-page-padding-small-fallback)] mobile:px-[var(--layout-page-padding-mobile)] tablet:px-[var(--layout-page-padding-tablet)] desktop:px-[var(--layout-page-padding-desktop)] wide:px-[var(--layout-page-padding-large)]",
          className,
        )}
        data-layout="page-container"
        ref={ref}
        {...props}
      />
    );
  },
);

export type SectionSpacing = "default" | "compact" | "none";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: SectionSpacing;
}

const sectionSpacing: Record<SectionSpacing, string> = {
  default:
    "py-[var(--layout-section-mobile)] tablet:py-[var(--layout-section-tablet)] desktop:py-[var(--layout-section-desktop)]",
  compact:
    "py-[var(--layout-section-compact-minimum)] desktop:py-[var(--layout-section-compact-maximum)]",
  none: "",
};

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { className, spacing = "default", ...props },
  ref,
) {
  return (
    <section
      className={classes(sectionSpacing[spacing], className)}
      data-layout="section"
      ref={ref}
      {...props}
    />
  );
});

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  gap?: "none" | "standard";
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { className, gap = "standard", ...props },
  ref,
) {
  return (
    <div
      className={classes(
        "grid grid-cols-[repeat(var(--layout-columns-mobile),minmax(0,1fr))] tablet:grid-cols-[repeat(var(--layout-columns-tablet),minmax(0,1fr))] desktop:grid-cols-[repeat(var(--layout-columns-desktop),minmax(0,1fr))]",
        gap === "standard" &&
          "gap-[var(--layout-gutter-mobile)] tablet:gap-[var(--layout-gutter-tablet)] desktop:gap-[var(--layout-gutter-desktop)]",
        className,
      )}
      data-layout="grid"
      ref={ref}
      {...props}
    />
  );
});

export type SplitRatio = "4/8" | "5/7" | "7/5" | "8/4" | "3/9";

export interface SplitLayoutProps extends HTMLAttributes<HTMLDivElement> {
  ratio?: SplitRatio;
}

const splitRatios: Record<SplitRatio, string> = {
  "4/8":
    "comparison:[&>*:first-child]:col-span-4 comparison:[&>*:last-child]:col-span-8",
  "5/7":
    "comparison:[&>*:first-child]:col-span-5 comparison:[&>*:last-child]:col-span-7",
  "7/5":
    "comparison:[&>*:first-child]:col-span-7 comparison:[&>*:last-child]:col-span-5",
  "8/4":
    "comparison:[&>*:first-child]:col-span-8 comparison:[&>*:last-child]:col-span-4",
  "3/9":
    "comparison:[&>*:first-child]:col-span-3 comparison:[&>*:last-child]:col-span-9",
};

export const SplitLayout = forwardRef<HTMLDivElement, SplitLayoutProps>(
  function SplitLayout({ className, ratio = "5/7", ...props }, ref) {
    return (
      <div
        className={classes(
          "grid grid-cols-1 gap-[var(--layout-gutter-mobile)] comparison:grid-cols-12 comparison:gap-[var(--layout-gutter-desktop)]",
          splitRatios[ratio],
          className,
        )}
        data-layout="split"
        data-ratio={ratio}
        ref={ref}
        {...props}
      />
    );
  },
);

export type StackGap = "small" | "standard" | "large";

export interface ContentStackProps extends HTMLAttributes<HTMLDivElement> {
  gap?: StackGap;
}

const stackGaps: Record<StackGap, string> = {
  small: "gap-[var(--space-3)]",
  standard: "gap-[var(--space-5)]",
  large: "gap-[var(--space-7)]",
};

export const ContentStack = forwardRef<HTMLDivElement, ContentStackProps>(
  function ContentStack({ className, gap = "standard", ...props }, ref) {
    return (
      <div
        className={classes("flex flex-col", stackGaps[gap], className)}
        data-layout="content-stack"
        ref={ref}
        {...props}
      />
    );
  },
);

export interface InlineClusterProps extends HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  justify?: "start" | "between" | "end";
  gap?: StackGap;
}

const clusterAlignment = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
} as const;

const clusterJustification = {
  start: "justify-start",
  between: "justify-between",
  end: "justify-end",
} as const;

export const InlineCluster = forwardRef<HTMLDivElement, InlineClusterProps>(
  function InlineCluster(
    {
      align = "center",
      className,
      gap = "standard",
      justify = "start",
      ...props
    },
    ref,
  ) {
    return (
      <div
        className={classes(
          "flex flex-wrap",
          clusterAlignment[align],
          clusterJustification[justify],
          stackGaps[gap],
          className,
        )}
        data-layout="inline-cluster"
        ref={ref}
        {...props}
      />
    );
  },
);

export type SurfaceTone = "default" | "raised" | "outline";

export interface SurfacePanelProps extends HTMLAttributes<HTMLDivElement> {
  tone?: SurfaceTone;
}

const surfaceTones: Record<SurfaceTone, string> = {
  default:
    "border-[var(--primitive-dimension-border-default)] border-[var(--color-border-subtle)] bg-[var(--color-surface)]",
  raised:
    "border-[var(--primitive-dimension-border-default)] border-[var(--color-border)] bg-[var(--color-surface-raised)] shadow-[var(--shadow-raised)]",
  outline:
    "border-[var(--primitive-dimension-border-default)] border-[var(--color-border-strong)] bg-transparent",
};

export const SurfacePanel = forwardRef<HTMLDivElement, SurfacePanelProps>(
  function SurfacePanel({ className, tone = "default", ...props }, ref) {
    return (
      <div
        className={classes(
          "rounded-[var(--component-panel-radius)] p-[var(--component-panel-padding-mobile)] desktop:p-[var(--component-panel-padding-desktop)]",
          surfaceTones[tone],
          className,
        )}
        data-layout="surface-panel"
        data-tone={tone}
        ref={ref}
        {...props}
      />
    );
  },
);

export interface FeaturePanelProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export const FeaturePanel = forwardRef<HTMLElement, FeaturePanelProps>(
  function FeaturePanel({ className, ...props }, ref) {
    return (
      <article
        className={classes(
          "rounded-[var(--component-panel-radius)] border-[var(--primitive-dimension-border-default)] border-[var(--color-border)] border-l-[var(--component-focus-ring-inner-width)] border-l-[var(--color-accent)] bg-[var(--color-surface-raised)] p-[var(--component-panel-padding-mobile)] desktop:p-[var(--component-panel-padding-desktop)]",
          className,
        )}
        data-layout="feature-panel"
        ref={ref}
        {...props}
      />
    );
  },
);

export type StickyRailProps = HTMLAttributes<HTMLElement>;

export const StickyRail = forwardRef<HTMLElement, StickyRailProps>(
  function StickyRail({ className, ...props }, ref) {
    return (
      <aside
        className={classes(
          "comparison:sticky comparison:top-[var(--space-5)] comparison:self-start",
          className,
        )}
        data-layout="sticky-rail"
        ref={ref}
        {...props}
      />
    );
  },
);

export interface HorizontalRailProps extends HTMLAttributes<HTMLDivElement> {
  "aria-label": string;
}

export const HorizontalRail = forwardRef<HTMLDivElement, HorizontalRailProps>(
  function HorizontalRail({ className, ...props }, ref) {
    return (
      <div
        className={classes(
          "grid snap-x snap-mandatory auto-cols-[min(80%,var(--layout-reading-standard))] grid-flow-col gap-[var(--layout-gutter-mobile)] overflow-x-auto overscroll-x-contain pb-[var(--space-3)] tablet:gap-[var(--layout-gutter-tablet)] desktop:gap-[var(--layout-gutter-desktop)] [&>*]:snap-start",
          className,
        )}
        data-layout="horizontal-rail"
        ref={ref}
        tabIndex={0}
        {...props}
      />
    );
  },
);

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  strength?: "subtle" | "default" | "strong";
}

const dividerStrengths = {
  subtle: "border-[var(--color-border-subtle)]",
  default: "border-[var(--color-border)]",
  strong: "border-[var(--color-border-strong)]",
} as const;

export const Divider = forwardRef<HTMLHRElement, DividerProps>(function Divider(
  { className, strength = "subtle", ...props },
  ref,
) {
  return (
    <hr
      className={classes(
        "m-0 border-0 border-t-[var(--primitive-dimension-border-default)]",
        dividerStrengths[strength],
        className,
      )}
      data-layout="divider"
      ref={ref}
      {...props}
    />
  );
});

export interface SectionHeaderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  action?: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  headingId?: string;
  headingLevel?: 2 | 3;
  title: ReactNode;
}

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  function SectionHeader(
    {
      action,
      className,
      description,
      eyebrow,
      headingId,
      headingLevel = 2,
      title,
      ...props
    },
    ref,
  ) {
    const Heading = headingLevel === 2 ? "h2" : "h3";

    return (
      <div
        className={classes(
          "grid gap-[var(--space-5)] comparison:grid-cols-12 comparison:items-end",
          className,
        )}
        data-layout="section-header"
        ref={ref}
        {...props}
      >
        <ContentStack className="comparison:col-span-8" gap="small">
          {eyebrow ? (
            <div className="font-[var(--font-family-mono)] text-[length:var(--text-label-mono)] font-[var(--text-label-mono-font-weight)] tracking-[var(--text-label-mono-letter-spacing)] text-[var(--color-text-muted)] uppercase">
              {eyebrow}
            </div>
          ) : null}
          <Heading
            className="m-0 text-[length:var(--text-heading-xl)] leading-[var(--text-heading-xl-line-height)] font-[var(--text-heading-xl-font-weight)] tracking-[var(--text-heading-xl-letter-spacing)]"
            id={headingId}
          >
            {title}
          </Heading>
          {description ? (
            <div className="max-w-[var(--layout-reading-standard)] text-[length:var(--text-body-md)] leading-[var(--text-body-md-line-height)] text-[var(--color-text-muted)]">
              {description}
            </div>
          ) : null}
        </ContentStack>
        {action ? (
          <div className="comparison:col-span-4 comparison:justify-self-end">
            {action}
          </div>
        ) : null}
      </div>
    );
  },
);
