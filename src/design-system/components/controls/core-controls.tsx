import {
  cloneElement,
  forwardRef,
  useId,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import styles from "./controls.module.css";

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export type ButtonVariant = "primary" | "secondary" | "text";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingLabel?: string;
  variant?: ButtonVariant;
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary: styles.buttonPrimary,
  secondary: styles.buttonSecondary,
  text: styles.buttonText,
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className,
    disabled,
    loading = false,
    loadingLabel = "Loading",
    type = "button",
    variant = "primary",
    ...props
  },
  ref,
) {
  return (
    <button
      aria-busy={loading || undefined}
      className={classes(styles.button, buttonVariants[variant], className)}
      data-loading={loading || undefined}
      data-variant={variant}
      disabled={disabled || loading}
      ref={ref}
      type={type}
      {...props}
    >
      <span className={styles.buttonContent}>{children}</span>
      {loading ? <LoadingIndicator label={loadingLabel} /> : null}
    </button>
  );
});

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  tone?: "default" | "ghost";
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { children, className, label, tone = "default", type = "button", ...props },
    ref,
  ) {
    return (
      <button
        aria-label={label}
        className={classes(
          styles.iconButton,
          tone === "ghost" && styles.iconButtonGhost,
          className,
        )}
        data-tone={tone}
        ref={ref}
        type={type}
        {...props}
      >
        {children}
      </button>
    );
  },
);

export interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  arrow?: "forward" | "back" | "none";
  inline?: boolean;
}

export const TextLink = forwardRef<HTMLAnchorElement, TextLinkProps>(
  function TextLink(
    { arrow = "forward", children, className, inline = false, ...props },
    ref,
  ) {
    return (
      <a
        className={classes(
          styles.textLink,
          inline && styles.textLinkInline,
          arrow === "back" && styles.textLinkBackward,
          className,
        )}
        data-arrow={arrow}
        ref={ref}
        {...props}
      >
        {arrow === "back" ? (
          <span aria-hidden="true" className={styles.textLinkArrow}>
            ←
          </span>
        ) : null}
        <span>{children}</span>
        {arrow === "forward" ? (
          <span aria-hidden="true" className={styles.textLinkArrow}>
            →
          </span>
        ) : null}
      </a>
    );
  },
);

export type ProgrammeStatus =
  | "coming-soon"
  | "enrolling"
  | "in-progress"
  | "closed";

const statusLabels: Record<ProgrammeStatus, string> = {
  "coming-soon": "Coming soon",
  enrolling: "Enrolling",
  "in-progress": "In progress",
  closed: "Closed",
};

const statusClasses: Record<ProgrammeStatus, string> = {
  "coming-soon": styles.statusComingSoon,
  enrolling: styles.statusEnrolling,
  "in-progress": styles.statusInProgress,
  closed: styles.statusClosed,
};

export interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  label?: string;
  showSignal?: boolean;
  status: ProgrammeStatus;
}

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  function StatusBadge(
    { className, label, showSignal = true, status, ...props },
    ref,
  ) {
    return (
      <span
        className={classes(styles.statusBadge, statusClasses[status], className)}
        data-status={status}
        ref={ref}
        {...props}
      >
        {showSignal ? <span aria-hidden="true" className={styles.statusSignal} /> : null}
        {label ?? statusLabels[status]}
      </span>
    );
  },
);

export type CategoryLabelProps = HTMLAttributes<HTMLSpanElement>;

export const CategoryLabel = forwardRef<HTMLSpanElement, CategoryLabelProps>(
  function CategoryLabel({ className, ...props }, ref) {
    return (
      <span
        className={classes(styles.categoryLabel, className)}
        ref={ref}
        {...props}
      />
    );
  },
);

export interface MetadataItemProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  layout?: "stacked" | "inline";
  value: ReactNode;
}

export const MetadataItem = forwardRef<HTMLSpanElement, MetadataItemProps>(
  function MetadataItem(
    { className, label, layout = "stacked", value, ...props },
    ref,
  ) {
    return (
      <span
        className={classes(
          styles.metadataItem,
          layout === "inline" && styles.metadataItemInline,
          className,
        )}
        ref={ref}
        {...props}
      >
        <span className={styles.metadataLabel}>{label}</span>
        <span className={styles.metadataValue}>{value}</span>
      </span>
    );
  },
);

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  selected?: boolean;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { className, selected = false, ...props },
  ref,
) {
  return (
    <span
      className={classes(styles.tag, selected && styles.tagSelected, className)}
      data-selected={selected || undefined}
      ref={ref}
      {...props}
    />
  );
});

export interface ProgressIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  current: number;
  label: string;
  total: number;
}

export const ProgressIndicator = forwardRef<
  HTMLDivElement,
  ProgressIndicatorProps
>(function ProgressIndicator(
  { className, current, label, total, ...props },
  ref,
) {
  const safeTotal = Math.max(1, Math.floor(total));
  const safeCurrent = Math.min(safeTotal, Math.max(0, Math.floor(current)));

  return (
    <div
      aria-label={label}
      aria-valuemax={safeTotal}
      aria-valuemin={0}
      aria-valuenow={safeCurrent}
      aria-valuetext={`${safeCurrent} of ${safeTotal}`}
      className={classes(styles.progress, className)}
      ref={ref}
      role="progressbar"
      {...props}
    >
      <div className={styles.progressHeader}>
        <span>{label}</span>
        <span className={styles.progressValue}>
          {safeCurrent}/{safeTotal}
        </span>
      </div>
      <span aria-hidden="true" className={styles.progressSegments}>
        {Array.from({ length: safeTotal }, (_, index) => (
          <span
            className={classes(
              styles.progressSegment,
              index < safeCurrent && styles.progressSegmentComplete,
            )}
            key={index}
          />
        ))}
      </span>
    </div>
  );
});

export interface TooltipProps {
  children: ReactElement<{ "aria-describedby"?: string }>;
  content: ReactNode;
}

export function Tooltip({ children, content }: TooltipProps) {
  const id = useId();
  const describedBy = [children.props["aria-describedby"], id]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={styles.tooltipRoot}>
      {cloneElement(children, { "aria-describedby": describedBy })}
      <span className={styles.tooltipContent} id={id} role="tooltip">
        {content}
      </span>
    </span>
  );
}

export interface LoadingIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  label?: string;
}

export const LoadingIndicator = forwardRef<
  HTMLSpanElement,
  LoadingIndicatorProps
>(function LoadingIndicator(
  { className, label = "Loading", ...props },
  ref,
) {
  return (
    <span
      aria-live="polite"
      className={classes(styles.loading, className)}
      ref={ref}
      role="status"
      {...props}
    >
      <span aria-hidden="true" className={styles.loadingBar} />
      <span aria-hidden="true" className={styles.loadingBar} />
      <span aria-hidden="true" className={styles.loadingBar} />
      <span className="sr-only">{label}</span>
    </span>
  );
});
