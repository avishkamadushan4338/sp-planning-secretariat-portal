import { createFileRoute } from "@tanstack/react-router";
import AboutDeputySecretary from "@/features/portal/about-deputy-secretary/AboutDeputySecretary";

export const Route = createFileRoute("/_portal/about-deputy-secretary")({
  head: () => ({
    meta: [
      {
        title: "Deputy Chief Secretary | Provincial Planning Secretariat — Southern Province",
      },
      {
        name: "description",
        content: "Profile, biography and leadership message from the Deputy Chief Secretary – Planning.",
      },
    ],
  }),
  component: AboutDeputySecretary,
});
