"use client";

import { createLabSubmit, InlineNewsletterForm } from "@/design-system/components/forms";

export function LabInlineNewsletterForm() {
  return <InlineNewsletterForm submit={createLabSubmit("success")} />;
}
