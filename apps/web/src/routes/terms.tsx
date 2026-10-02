import { createFileRoute } from "@tanstack/react-router";
import TermsAndServices from "@/features/portal/terms/TermsAndServices";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      {
        title: "Terms and Services | Provincial Planning Secretariat — Southern Province",
      },
    ],
  }),
  component: TermsAndServices,
});
