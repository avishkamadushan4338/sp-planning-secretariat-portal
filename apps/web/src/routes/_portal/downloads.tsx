import { createFileRoute } from "@tanstack/react-router";
import Downloads from "@/features/portal/downloads/Downloads";

export const Route = createFileRoute("/_portal/downloads")({
  head: () => ({
    meta: [
      {
        title: "Downloads & Forms | Provincial Planning Secretariat — Southern Province",
      },
      {
        name: "description",
        content: "Download official planning templates, project submission forms, and regulatory guidelines.",
      },
    ],
  }),
  component: Downloads,
});
