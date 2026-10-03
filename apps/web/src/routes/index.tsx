import { createFileRoute } from "@tanstack/react-router";
import LandingPage from "@/features/portal/landing/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Welcome — Southern Province Planning Secretariat",
      },
      {
        name: "description",
        content: "Official gateway of the Planning Secretariat, Southern Provincial Council, Sri Lanka. Select your preferred language to proceed.",
      },
    ],
  }),
  component: LandingPage,
});
