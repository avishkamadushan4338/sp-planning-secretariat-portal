import { createFileRoute } from "@tanstack/react-router";
import CMSDashboard from "@/features/cms/CMSDashboard";

export const Route = createFileRoute("/cms/dashboard")({
  head: () => ({
    meta: [
      {
        title: "CMS Dashboard | Provincial Planning Secretariat",
      },
    ],
  }),
  component: CMSDashboard,
});
