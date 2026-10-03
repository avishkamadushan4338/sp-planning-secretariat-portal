import { createFileRoute } from "@tanstack/react-router";
import Documents from "@/features/portal/documents/Documents";

export const Route = createFileRoute("/_portal/documents")({
  head: () => ({
    meta: [
      {
        title: "Official Documents | Provincial Planning Secretariat — Southern Province",
      },
      {
        name: "description",
        content: "Access development plans, statistical handbooks, performance reports, and regional policy guidelines.",
      },
    ],
  }),
  component: Documents,
});
