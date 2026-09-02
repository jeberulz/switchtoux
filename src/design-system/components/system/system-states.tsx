import type { HTMLAttributes, ReactNode } from "react";
import { EvidenceLabel, SystemFrame } from "../brand";
import { CategoryLabel, StatusBadge, TextLink } from "../controls";
import {
  FormErrorSummary,
  SubmissionErrorPanel,
  SuccessPanel,
  type FormErrorItem,
} from "../forms";
import { Icon, type IconName } from "../icons";
import styles from "./system.module.css";

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

type StateTone = "neutral" | "success" | "warning" | "error";

interface StatePanelProps extends HTMLAttributes<HTMLElement> {
  action?: ReactNode;
  children?: ReactNode;
  heading: string;
  icon: IconName;
  label: string;
  live?: "alert" | "status";
  tone?: StateTone;
}

function StatePanel({
  action,
  children,
  className,
  heading,
  icon,
  label,
  live,
  tone = "neutral",
  ...props
}: StatePanelProps) {
  return (
    <section
      className={classes(styles.statePanel, className)}
      data-tone={tone}
      role={live}
      {...props}
    >
      <div className={styles.stateIcon}><Icon name={icon} /></div>
      <div className={styles.stateCopy}>
        <CategoryLabel>{label}</CategoryLabel>
        <h3>{heading}</h3>
        {children}
      </div>
      {action ? <div className={styles.stateAction}>{action}</div> : null}
    </section>
  );
}

export interface ComingSoonStateProps {
  description: string;
  interestHref: string;
  title: string;
}

export function ComingSoonState({
  description,
  interestHref,
  title,
}: ComingSoonStateProps) {
  return (
    <StatePanel
      action={<TextLink href={interestHref}>Register interest</TextLink>}
      heading={title}
      icon="calendar"
      label="Availability"
    >
      <StatusBadge status="coming-soon" />
      <p>{description}</p>
    </StatePanel>
  );
}

export interface EmptyResourceCategoryProps {
  category: string;
  resetHref: string;
}

export function EmptyResourceCategory({
  category,
  resetHref,
}: EmptyResourceCategoryProps) {
  return (
    <StatePanel
      action={<TextLink href={resetHref}>View every resource</TextLink>}
      heading={`No published resources in ${category} yet.`}
      icon="bookOpen"
      label="Empty category"
    >
      <p>Upcoming work stays clearly marked until useful material is ready to read.</p>
    </StatePanel>
  );
}

export interface FormSuccessStateProps {
  actionHref?: string;
  actionLabel?: string;
  confirmation: string;
  heading?: string;
}

export function FormSuccessState(props: FormSuccessStateProps) {
  return <SuccessPanel {...props} />;
}

export interface FormFailureStateProps {
  errorId: string;
  message: string;
  showContact?: boolean;
}

export function FormFailureState(props: FormFailureStateProps) {
  return <SubmissionErrorPanel {...props} />;
}

export function ValidationErrorState({ errors }: { errors: readonly FormErrorItem[] }) {
  return <FormErrorSummary errors={[...errors]} />;
}

export function SpamCheckFailureState({ retryHref }: { retryHref: string }) {
  return (
    <StatePanel
      action={<TextLink href={retryHref}>Run the check again</TextLink>}
      heading="We could not complete the security check."
      icon="alert"
      label="Spam protection"
      live="alert"
      tone="warning"
    >
      <p>Your answers are still here. Check your connection, then retry the verification.</p>
    </StatePanel>
  );
}

export function CMSContentFailureState({ fallback }: { fallback: ReactNode }) {
  return (
    <StatePanel
      heading="Some supporting content is unavailable."
      icon="informationCircle"
      label="Content fallback"
      live="status"
    >
      <p>The primary page content remains available while this optional section is restored.</p>
      <div className={styles.fallbackContent}>{fallback}</div>
    </StatePanel>
  );
}

export interface MissingImageStateProps {
  alt: string;
  caption?: string;
}

export function MissingImageState({ alt, caption }: MissingImageStateProps) {
  return (
    <figure className={styles.missingImage}>
      <div aria-label={`${alt}. Image unavailable.`} role="img">
        <Icon name="presentation" size="large" />
        <span>Image unavailable</span>
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

export function ContentLoadingState({ label = "Loading content" }: { label?: string }) {
  return (
    <div aria-busy="true" className={styles.loadingState} role="status">
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className={styles.loadingHeading} />
      <span aria-hidden="true" className={styles.loadingLine} />
      <span aria-hidden="true" className={styles.loadingLineShort} />
    </div>
  );
}

export function NotFoundState({ homeHref = "/" }: { homeHref?: string }) {
  return (
    <StatePanel
      action={<TextLink href={homeHref}>Return to the start</TextLink>}
      heading="This page could not be found."
      icon="search"
      label="Not found"
      tone="error"
    >
      <p>The address may be incomplete, or the page may have moved.</p>
    </StatePanel>
  );
}

export function GeneralErrorState({ retryHref }: { retryHref: string }) {
  return (
    <StatePanel
      action={<TextLink href={retryHref}>Try this page again</TextLink>}
      heading="Something interrupted this page."
      icon="alert"
      label="Unexpected error"
      live="alert"
      tone="error"
    >
      <p>No request was completed. Retry the page or return later.</p>
    </StatePanel>
  );
}

export function NetworkErrorState({ retryHref }: { retryHref: string }) {
  return (
    <StatePanel
      action={<TextLink href={retryHref}>Retry connection</TextLink>}
      heading="The connection was interrupted."
      icon="link"
      label="Network error"
      live="alert"
      tone="warning"
    >
      <p>Check your connection. Any form answers remain on this device until you retry.</p>
    </StatePanel>
  );
}

export function ReducedMotionState() {
  return (
    <StatePanel
      heading="The sequence remains clear without movement."
      icon="informationCircle"
      label="Reduced motion"
    >
      <div className={styles.reducedSequence}>
        <span>Evidence</span><span>Decision</span><span>Prototype</span><span>Evaluation</span>
      </div>
      <p>State changes are immediate. No meaning depends on animation.</p>
    </StatePanel>
  );
}

export function StaticAtmosphereFallback() {
  return (
    <SystemFrame label="Static system fallback" title="Atmosphere unavailable">
      <div className={styles.staticFallback}>
        <EvidenceLabel kind="evidence" />
        <span aria-hidden="true" className={styles.staticPath} />
        <EvidenceLabel kind="inference" />
        <span aria-hidden="true" className={styles.staticPath} />
        <EvidenceLabel kind="assumption" />
        <span aria-hidden="true" className={styles.staticPath} />
        <EvidenceLabel kind="unknown" />
      </div>
      <p className={styles.staticFallbackNote}>
        The relationship and labels remain available when animated atmosphere cannot render.
      </p>
    </SystemFrame>
  );
}
