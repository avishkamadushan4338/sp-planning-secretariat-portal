import { createFileRoute } from "@tanstack/react-router";
import Notices from "@/features/portal/notices/Notices";

export const Route = createFileRoute("/_portal/notices")({
  head: () => ({
    meta: [
      {
        title: "Official Notices & Circulars | Provincial Planning Secretariat — Southern Province",
      },
      {
        name: "description",
        content: "Public notices, procurement tenders, circulars, and announcements.",
      },
    ],
  }),
  component: Notices,
});
