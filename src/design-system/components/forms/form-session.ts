import type { FieldErrors, SubmitResult } from "./schema";

export type FormSession<TValues> =
  | { phase: "editing"; errors: FieldErrors<TValues>; values: TValues }
  | { phase: "submitting"; values: TValues }
  | { phase: "success"; confirmation: string; values: TValues }
  | {
      errorId: string;
      message: string;
      phase: "provider-failure";
      values: TValues;
    };

export type FormEvent<TValues> =
  | { type: "change"; values: TValues }
  | { type: "invalid"; errors: FieldErrors<TValues>; values: TValues }
  | { type: "submit" }
  | { type: "result"; result: SubmitResult };

export function createFormSession<TValues>(values: TValues): FormSession<TValues> {
  return { phase: "editing", errors: {}, values };
}

export function reduceFormSession<TValues>(
  session: FormSession<TValues>,
  event: FormEvent<TValues>,
): FormSession<TValues> {
  switch (event.type) {
    case "change":
      if (session.phase === "submitting" || session.phase === "success") {
        return session;
      }
      return { phase: "editing", errors: {}, values: event.values };
    case "invalid":
      if (session.phase === "submitting" || session.phase === "success") {
        return session;
      }
      return { phase: "editing", errors: event.errors, values: event.values };
    case "submit":
      if (session.phase === "success") {
        return session;
      }
      return { phase: "submitting", values: session.values };
    case "result":
      if (session.phase !== "submitting") {
        return session;
      }
      if (event.result.ok) {
        return {
          phase: "success",
          confirmation: event.result.confirmation,
          values: session.values,
        };
      }
      return {
        errorId: event.result.errorId,
        message: event.result.message,
        phase: "provider-failure",
        values: session.values,
      };
  }
}
