import { createFileRoute } from "@tanstack/react-router";
import SMPDisposal from "@/features/smp/SMPDisposal";

export const Route = createFileRoute("/smp/_layout/disposal")({
  head: () => ({
    meta: [
      {
        title: "SMP Disposal | Store Management Portal",
      },
    ],
  }),
  component: SMPDisposal,
});
