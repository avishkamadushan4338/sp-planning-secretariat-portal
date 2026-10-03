import { createFileRoute } from "@tanstack/react-router";
import News from "@/features/portal/news/News";

export const Route = createFileRoute("/_portal/news")({
  head: () => ({
    meta: [
      {
        title: "News & Press Releases | Provincial Planning Secretariat — Southern Province",
      },
      {
        name: "description",
        content: "Latest news, media releases, events, and project inaugurations from the Southern Provincial Planning Secretariat.",
      },
    ],
  }),
  component: News,
});
