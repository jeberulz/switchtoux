export type SystemStateId =
  | "SYS-01"
  | "SYS-02"
  | "SYS-03"
  | "SYS-04"
  | "SYS-05"
  | "SYS-06"
  | "SYS-07"
  | "SYS-08"
  | "SYS-09"
  | "SYS-10"
  | "SYS-11"
  | "SYS-12"
  | "SYS-13"
  | "SYS-14";

export type SystemStateIntent =
  | "informational"
  | "success"
  | "recoverable"
  | "blocking"
  | "fallback";

export interface SystemStateDefinition {
  component: string;
  id: SystemStateId;
  intent: SystemStateIntent;
  purpose: string;
}

export const systemStateDefinitions: readonly SystemStateDefinition[] = [
  { id: "SYS-01", component: "ComingSoonState", intent: "informational", purpose: "Sets honest availability and provides a relevant interest route." },
  { id: "SYS-02", component: "EmptyResourceCategory", intent: "informational", purpose: "Explains an empty editorial filter and restores the complete list." },
  { id: "SYS-03", component: "FormSuccessState", intent: "success", purpose: "Confirms a completed request after editable fields have been replaced." },
  { id: "SYS-04", component: "FormFailureState", intent: "recoverable", purpose: "Reports provider rejection while confirming that entered values remain." },
  { id: "SYS-05", component: "ValidationErrorState", intent: "recoverable", purpose: "Summarises field errors and links back to each invalid control." },
  { id: "SYS-06", component: "SpamCheckFailureState", intent: "recoverable", purpose: "Explains an incomplete spam check without blaming the visitor." },
  { id: "SYS-07", component: "CMSContentFailureState", intent: "fallback", purpose: "Keeps a page usable when optional managed content cannot resolve." },
  { id: "SYS-08", component: "MissingImageState", intent: "fallback", purpose: "Preserves figure geometry and meaning without fabricating imagery." },
  { id: "SYS-09", component: "ContentLoadingState", intent: "informational", purpose: "Reserves final content geometry and announces active loading once." },
  { id: "SYS-10", component: "NotFoundState", intent: "blocking", purpose: "Explains a missing route and offers one safe way back." },
  { id: "SYS-11", component: "GeneralErrorState", intent: "recoverable", purpose: "Contains an unexpected page failure and offers a retry route." },
  { id: "SYS-12", component: "NetworkErrorState", intent: "recoverable", purpose: "Distinguishes connection failure from rejected user input." },
  { id: "SYS-13", component: "ReducedMotionState", intent: "fallback", purpose: "Communicates the same hierarchy with all decorative movement removed." },
  { id: "SYS-14", component: "StaticAtmosphereFallback", intent: "fallback", purpose: "Retains the evidence-to-evaluation structure when atmosphere cannot render." },
] as const;
