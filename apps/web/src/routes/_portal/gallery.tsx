import { createFileRoute } from "@tanstack/react-router";
import Gallery from "@/features/portal/gallery/Gallery";

export const Route = createFileRoute("/_portal/gallery")({
  head: () => ({
    meta: [
      {
        title: "Photo Gallery | Provincial Planning Secretariat — Southern Province",
      },
      {
        name: "description",
        content: "Photographic highlights of provincial conferences, community workshops, and regional milestones.",
      },
    ],
  }),
  component: Gallery,
});
