"use client";

import {
  cloneElement,
  type InputHTMLAttributes,
  type ReactElement,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { Button, TextLink, type ButtonProps } from "../controls";
import { programmeSelectorOptions } from "./schema";
import styles from "./forms.module.css";

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

type ControlAria = {
  "aria-describedby"?: string;
  "aria-errormessage"?: string;
  "aria-invalid"?: boolean;
  id?: string;
};

export interface FieldWrapperProps {
  children: ReactElement<ControlAria>;
  error?: string;
  hint?: string;
  htmlFor: string;
  label: string;
}

export function FieldWrapper({
  children,
  error,
  hint,
  htmlFor,
  label,
}: FieldWrapperProps) {
  const hintId = hint ? `${htmlFor}-hint` : undefined;
  const errorId = error ? `${htmlFor}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={htmlFor}>
        {label}
      </label>
      {cloneElement(children, {
        "aria-describedby": describedBy,
        "aria-errormessage": errorId,
        "aria-invalid": error ? true : undefined,
        id: htmlFor,
      })}
      {hint ? (
        <p className={styles.hint} id={hintId}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className={styles.error} id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export function TextInput({ className, type = "text", ...props }: TextInputProps) {
  return <input {...props} className={classes(styles.control, className)} type={type} />;
}

export type EmailInputProps = InputHTMLAttributes<HTMLInputElement>;

export function EmailInput({ className, ...props }: EmailInputProps) {
  return (
    <input
      autoComplete="email"
      {...props}
      className={classes(styles.control, className)}
      type="email"
    />
  );
}

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea {...props} className={classes(styles.control, styles.textarea, className)} />
  );
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: readonly SelectOption[];
}

export function Select({ className, options, ...props }: SelectProps) {
  return (
    <select {...props} className={classes(styles.control, className)}>
      {options.map((option) => (
        <option key={option.value || "empty"} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  error?: string;
  label: string;
}

export function Checkbox({ className, error, id, label, ...props }: CheckboxProps) {
  const errorId = error && id ? `${id}-error` : undefined;

  return (
    <div className={styles.checkboxField}>
      <label className={classes(styles.checkbox, className)} htmlFor={id}>
        <input
          {...props}
          aria-errormessage={errorId}
          aria-invalid={error ? true : undefined}
          id={id}
          type="checkbox"
        />
        <span>{label}</span>
      </label>
      {error ? (
        <p className={styles.error} id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export type ProgrammeSelectorProps = Omit<SelectProps, "options">;

export function ProgrammeSelector(props: ProgrammeSelectorProps) {
  return <Select options={programmeSelectorOptions()} {...props} />;
}

export interface FormErrorItem {
  id: string;
  message: string;
}

export function FormErrorSummary({ errors }: { errors: readonly FormErrorItem[] }) {
  if (errors.length === 0) return null;

  return (
    <div className={styles.errorSummary} role="alert">
      <p>Fix the highlighted fields.</p>
      <ul>
        {errors.map((error) => (
          <li key={error.id}>
            <a href={`#${error.id}`}>{error.message}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SpamProtectionSlot() {
  return (
    <>
      <input
        aria-hidden="true"
        autoComplete="off"
        className={styles.honeypot}
        name="website"
        tabIndex={-1}
      />
      <div className={styles.turnstileSlot} data-slot="turnstile" />
    </>
  );
}

export type FormSubmitButtonVariant = "primary" | "onRose";

export interface FormSubmitButtonProps extends Omit<ButtonProps, "variant"> {
  variant?: FormSubmitButtonVariant;
}

export function FormSubmitButton({
  type = "submit",
  variant = "primary",
  ...props
}: FormSubmitButtonProps) {
  const button = <Button {...props} type={type} variant="primary" />;

  if (variant === "onRose") {
    return <span className={styles.submitOnRose}>{button}</span>;
  }

  return button;
}

export interface SuccessPanelProps {
  actionHref?: string;
  actionLabel?: string;
  confirmation: string;
  heading?: string;
}

export function SuccessPanel({
  actionHref,
  actionLabel,
  confirmation,
  heading = "Request received.",
}: SuccessPanelProps) {
  return (
    <div className={styles.successPanel} role="status">
      <h2>{heading}</h2>
      <p>{confirmation}</p>
      {actionHref && actionLabel ? (
        <TextLink href={actionHref}>{actionLabel}</TextLink>
      ) : null}
    </div>
  );
}

export interface SubmissionErrorPanelProps {
  errorId: string;
  message: string;
  showContact?: boolean;
}

export function SubmissionErrorPanel({
  errorId,
  message,
  showContact = false,
}: SubmissionErrorPanelProps) {
  return (
    <div className={styles.submissionError} role="alert">
      <p>{message}</p>
      <p className={styles.errorId}>{errorId}</p>
      {showContact ? (
        <TextLink href="mailto:hello@switchtoux.com">Email hello@switchtoux.com</TextLink>
      ) : null}
    </div>
  );
}
