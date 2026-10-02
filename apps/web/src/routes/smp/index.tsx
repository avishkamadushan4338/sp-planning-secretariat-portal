import { createFileRoute } from "@tanstack/react-router";
import SMPLogin from "@/features/smp/SMPLogin";

export const Route = createFileRoute("/smp/")({
  head: () => ({
    meta: [
      {
        title: "SMP Login | Store Management Portal",
      },
    ],
  }),
  component: SMPLogin,
});
