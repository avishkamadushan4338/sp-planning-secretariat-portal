import { createFileRoute } from "@tanstack/react-router";
import CMSLogin from "@/features/cms/CMSLogin";

export const Route = createFileRoute("/cms/")({
  head: () => ({
    meta: [
      {
        title: "CMS Portal Login | Provincial Planning Secretariat",
      },
    ],
  }),
  component: CMSLogin,
});
