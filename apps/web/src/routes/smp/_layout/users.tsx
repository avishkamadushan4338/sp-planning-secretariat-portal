import { createFileRoute } from "@tanstack/react-router";
import SMPUsers from "@/features/smp/SMPUsers";

export const Route = createFileRoute("/smp/_layout/users")({
  head: () => ({
    meta: [
      {
        title: "SMP Users | Store Management Portal",
      },
    ],
  }),
  component: SMPUsers,
});
