import {
  forwardRef,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import styles from "./brand.module.css";

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export interface WordmarkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  compact?: boolean;
}

export const Wordmark = forwardRef<HTMLAnchorElement, WordmarkProps>(
  function Wordmark({ className, compact = false, href = "/", ...props }, ref) {
    return (
      <a
        aria-label={compact ? "Switch to UX" : undefined}
        className={classes(styles.wordmark, className)}
        data-compact={compact || undefined}
        href={href}
        ref={ref}
        {...props}
      >
        {compact ? (
          <span aria-hidden="true">
            S<span className={styles.wordmarkSlash}>/</span>UX
          </span>
        ) : (
          <>
            <span>Switch</span>
            <span aria-hidden="true">&nbsp;</span>
            <span className={styles.wordmarkSlash}>/</span>
            <span aria-hidden="true">&nbsp;</span>
            <span>to UX</span>
          </>
        )}
      </a>
    );
  },
);

export type MonoEyebrowProps = HTMLAttributes<HTMLSpanElement>;

export const MonoEyebrow = forwardRef<HTMLSpanElement, MonoEyebrowProps>(
  function MonoEyebrow({ className, ...props }, ref) {
    return (
      <span
        className={classes(styles.monoEyebrow, className)}
        ref={ref}
        {...props}
      />
    );
  },
);

export type EvidenceKind = "evidence" | "inference" | "assumption" | "unknown";

const evidenceDetails: Record<EvidenceKind, { code: string; label: string }> = {
  evidence: { code: "E", label: "Evidence" },
  inference: { code: "I", label: "Inference" },
  assumption: { code: "A", label: "Assumption" },
  unknown: { code: "X", label: "Unknown" },
};

export interface EvidenceLabelProps extends HTMLAttributes<HTMLSpanElement> {
  compact?: boolean;
  kind: EvidenceKind;
  selected?: boolean;
}

export const EvidenceLabel = forwardRef<HTMLSpanElement, EvidenceLabelProps>(
  function EvidenceLabel(
    { className, compact = false, kind, selected = false, ...props },
    ref,
  ) {
    const detail = evidenceDetails[kind];
    return (
      <span
        aria-label={compact ? detail.label : undefined}
        className={classes(
          styles.evidenceLabel,
          selected && styles.evidenceSelected,
          className,
        )}
        data-evidence={kind}
        data-selected={selected || undefined}
        ref={ref}
        {...props}
      >
        <span aria-hidden={compact || undefined} className={styles.evidenceCode}>
          [{detail.code}]
        </span>
        {compact ? null : <span className={styles.evidenceName}>{detail.label}</span>}
      </span>
    );
  },
);

export interface EvidenceLegendProps extends HTMLAttributes<HTMLUListElement> {
  selected?: EvidenceKind;
}

export const EvidenceLegend = forwardRef<HTMLUListElement, EvidenceLegendProps>(
  function EvidenceLegend({ className, selected, ...props }, ref) {
    return (
      <ul
        aria-label="Evidence notation"
        className={classes(styles.evidenceLegend, className)}
        ref={ref}
        {...props}
      >
        {(Object.keys(evidenceDetails) as EvidenceKind[]).map((kind) => (
          <li key={kind}>
            <EvidenceLabel kind={kind} selected={kind === selected} />
          </li>
        ))}
      </ul>
    );
  },
);

export interface SystemNodeProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  active?: boolean;
  detail?: ReactNode;
  title: ReactNode;
}

export const SystemNode = forwardRef<HTMLDivElement, SystemNodeProps>(
  function SystemNode(
    { active = false, className, detail, title, ...props },
    ref,
  ) {
    return (
      <div
        className={classes(
          styles.systemNode,
          active && styles.systemNodeActive,
          className,
        )}
        data-active={active || undefined}
        ref={ref}
        {...props}
      >
        <strong className={styles.systemNodeTitle}>{title}</strong>
        {detail ? <span className={styles.systemNodeDetail}>{detail}</span> : null}
      </div>
    );
  },
);

export interface SignalNodeProps extends HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
  label: string;
}

export const SignalNode = forwardRef<HTMLSpanElement, SignalNodeProps>(
  function SignalNode({ active = false, className, label, ...props }, ref) {
    return (
      <span
        className={classes(
          styles.signalNode,
          active && styles.signalNodeActive,
          className,
        )}
        data-active={active || undefined}
        ref={ref}
        {...props}
      >
        <span aria-hidden="true" className={styles.signalNodeMark} />
        <span>{label}</span>
      </span>
    );
  },
);

export type ConnectionOrientation = "horizontal" | "vertical";

interface ConnectionProps extends HTMLAttributes<HTMLSpanElement> {
  label?: string;
  orientation?: ConnectionOrientation;
}

export interface ConnectionPathProps extends ConnectionProps {
  active?: boolean;
}

export const ConnectionPath = forwardRef<HTMLSpanElement, ConnectionPathProps>(
  function ConnectionPath(
    { active = false, className, label, orientation = "horizontal", ...props },
    ref,
  ) {
    return (
      <span
        aria-hidden={label ? undefined : true}
        aria-label={label}
        className={classes(
          styles.connectionPath,
          orientation === "horizontal"
            ? styles.connectionHorizontal
            : styles.connectionVertical,
          active && styles.connectionActive,
          className,
        )}
        data-active={active || undefined}
        data-orientation={orientation}
        ref={ref}
        role={label ? "img" : undefined}
        {...props}
      />
    );
  },
);

export interface NodeClusterProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
}

export const NodeCluster = forwardRef<HTMLDivElement, NodeClusterProps>(
  function NodeCluster({ className, label, ...props }, ref) {
    return (
      <div
        aria-label={label}
        className={classes(styles.nodeCluster, className)}
        ref={ref}
        role="group"
        {...props}
      />
    );
  },
);

export interface ProofLabelProps extends HTMLAttributes<HTMLSpanElement> {
  accent?: boolean;
}

export const ProofLabel = forwardRef<HTMLSpanElement, ProofLabelProps>(
  function ProofLabel({ accent = false, className, ...props }, ref) {
    return (
      <span
        className={classes(
          styles.proofLabel,
          accent && styles.proofLabelAccent,
          className,
        )}
        data-accent={accent || undefined}
        ref={ref}
        {...props}
      />
    );
  },
);

export interface ArtefactStampProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  code: string;
  meta?: ReactNode;
  title: ReactNode;
}

export const ArtefactStamp = forwardRef<HTMLDivElement, ArtefactStampProps>(
  function ArtefactStamp({ className, code, meta, title, ...props }, ref) {
    return (
      <div
        className={classes(styles.artefactStamp, className)}
        ref={ref}
        {...props}
      >
        <span className={styles.artefactStampCode}>{code}</span>
        <strong className={styles.artefactStampTitle}>{title}</strong>
        {meta ? <span className={styles.artefactStampMeta}>{meta}</span> : null}
      </div>
    );
  },
);

export interface AtmosphericFieldProps extends HTMLAttributes<HTMLDivElement> {
  intensity?: "quiet" | "standard";
}

export const AtmosphericField = forwardRef<
  HTMLDivElement,
  AtmosphericFieldProps
>(function AtmosphericField(
  { className, intensity = "standard", ...props },
  ref,
) {
  return (
    <div
      className={classes(
        styles.atmosphericField,
        intensity === "quiet" && styles.atmosphericFieldQuiet,
        className,
      )}
      data-intensity={intensity}
      ref={ref}
      {...props}
    />
  );
});

export interface ConnectionTraceProps extends ConnectionProps {
  animated?: boolean;
}

export const ConnectionTrace = forwardRef<
  HTMLSpanElement,
  ConnectionTraceProps
>(function ConnectionTrace(
  { animated = false, className, label, orientation = "horizontal", ...props },
  ref,
) {
  return (
    <span
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={classes(
        styles.connectionTrace,
        orientation === "horizontal"
          ? styles.connectionHorizontal
          : styles.connectionVertical,
        animated && styles.connectionAnimated,
        className,
      )}
      data-animated={animated || undefined}
      data-orientation={orientation}
      ref={ref}
      role={label ? "img" : undefined}
      {...props}
    />
  );
});

export interface SystemFrameProps
  extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  children: ReactNode;
  footer?: ReactNode;
  label: string;
  title?: ReactNode;
}

export const SystemFrame = forwardRef<HTMLElement, SystemFrameProps>(
  function SystemFrame(
    { children, className, footer, label, title, ...props },
    ref,
  ) {
    return (
      <section
        aria-label={label}
        className={classes(styles.systemFrame, className)}
        ref={ref}
        {...props}
      >
        {title ? <div className={styles.systemFrameHeader}>{title}</div> : null}
        <div className={styles.systemFrameBody}>{children}</div>
        {footer ? <div className={styles.systemFrameFooter}>{footer}</div> : null}
      </section>
    );
  },
);
