import { createFileRoute } from "@tanstack/react-router";
import FAQ from "@/features/portal/faq/FAQ";

export const Route = createFileRoute("/_portal/faq")({
  head: () => ({
    meta: [
      {
        title: "Frequently Asked Questions | Provincial Planning Secretariat — Southern Province",
      },
      {
        name: "description",
        content: "Find answers to frequently asked questions about the Southern Province Planning Secretariat services, downloads, and procedures.",
      },
    ],
  }),
  component: FAQ,
});
