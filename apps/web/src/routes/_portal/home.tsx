import { createFileRoute } from "@tanstack/react-router";
import Home from "@/features/portal/home/Home";

export const Route = createFileRoute("/_portal/home")({
  head: () => ({
    meta: [
      {
        title: "Provincial Planning Secretariat – Southern Province | Galle, Sri Lanka",
      },
      {
        name: "description",
        content: "Official website of the Provincial Planning Secretariat, Southern Province, Sri Lanka. Driving integrated provincial development from Dakshinapaya, Galle.",
      },
      {
        property: "og:title",
        content: "Provincial Planning Secretariat – Southern Province, Sri Lanka",
      },
      {
        property: "og:description",
        content: "Driving integrated provincial development from Dakshinapaya, Galle.",
      },
    ],
  }),
  component: Home,
});
