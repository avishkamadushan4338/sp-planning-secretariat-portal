import { createFileRoute } from "@tanstack/react-router";
import About from "@/features/portal/about/About";

export const Route = createFileRoute("/_portal/about/$")({
  head: () => ({
    meta: [
      {
        title: "About Us | Provincial Planning Secretariat — Southern Province",
      },
      {
        name: "description",
        content: "Learn about the Provincial Planning Secretariat — mandate, history, leadership team, and organisational structure.",
      },
    ],
  }),
  component: About,
});
