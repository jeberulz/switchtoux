"use client";

import {
  forwardRef,
  useId,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { Icon } from "../icons";
import styles from "./controls.module.css";

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export interface AccordionProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  children?: ReactNode;
  defaultOpen?: boolean;
  disabled?: boolean;
  headingLevel?: 3 | 4;
  onOpenChange?: (open: boolean) => void;
  title: ReactNode;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  function Accordion(
    {
      children,
      className,
      defaultOpen = false,
      disabled = false,
      headingLevel = 3,
      onOpenChange,
      title,
      ...props
    },
    ref,
  ) {
    const [open, setOpen] = useState(defaultOpen);
    const baseId = useId();
    const triggerId = `${baseId}-trigger`;
    const panelId = `${baseId}-panel`;
    const Heading = headingLevel === 3 ? "h3" : "h4";

    function toggle() {
      const next = !open;
      setOpen(next);
      onOpenChange?.(next);
    }

    return (
      <div
        className={classes(styles.accordion, className)}
        data-open={open}
        ref={ref}
        {...props}
      >
        <Heading className={styles.accordionHeading}>
          <button
            aria-controls={panelId}
            aria-expanded={open}
            className={styles.accordionTrigger}
            disabled={disabled}
            id={triggerId}
            onClick={toggle}
            type="button"
          >
            <span>{title}</span>
            <span className={styles.disclosureIcon}>
              <Icon alt="minus" name="add" showAlt={open} size="small" />
            </span>
          </button>
        </Heading>
        <div
          aria-labelledby={triggerId}
          className={styles.accordionPanel}
          hidden={!open}
          id={panelId}
          role="region"
        >
          {children}
        </div>
      </div>
    );
  },
);

export interface DisclosureRowProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  children?: ReactNode;
  defaultOpen?: boolean;
  description?: ReactNode;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: ReactNode;
}

export const DisclosureRow = forwardRef<HTMLDivElement, DisclosureRowProps>(
  function DisclosureRow(
    {
      children,
      className,
      defaultOpen = false,
      description,
      disabled = false,
      onOpenChange,
      title,
      ...props
    },
    ref,
  ) {
    const [open, setOpen] = useState(defaultOpen);
    const baseId = useId();
    const triggerId = `${baseId}-trigger`;
    const panelId = `${baseId}-panel`;

    function toggle() {
      const next = !open;
      setOpen(next);
      onOpenChange?.(next);
    }

    return (
      <div
        className={classes(styles.disclosure, className)}
        data-open={open}
        ref={ref}
        {...props}
      >
        <button
          aria-controls={panelId}
          aria-expanded={open}
          className={styles.disclosureTrigger}
          disabled={disabled}
          id={triggerId}
          onClick={toggle}
          type="button"
        >
          <span className={styles.disclosureSummary}>
            <strong>{title}</strong>
            {description ? (
              <span className={styles.disclosureDescription}>{description}</span>
            ) : null}
          </span>
          <span className={styles.disclosureIcon}>
            <Icon alt="minus" name="add" showAlt={open} size="small" />
          </span>
        </button>
        <div
          aria-labelledby={triggerId}
          className={styles.disclosurePanel}
          hidden={!open}
          id={panelId}
          role="region"
        >
          {children}
        </div>
      </div>
    );
  },
);
