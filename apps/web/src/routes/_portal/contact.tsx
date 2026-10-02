import { createFileRoute } from "@tanstack/react-router";
import Contact from "@/features/portal/contact/Contact";

export const Route = createFileRoute("/_portal/contact")({
  head: () => ({
    meta: [
      {
        title: "Contact Us | Provincial Planning Secretariat — Southern Province",
      },
      {
        name: "description",
        content: "Get in touch with the Southern Province Planning Secretariat at Galle. Send inquiries, complaints, and requests for information.",
      },
    ],
  }),
  component: Contact,
});
