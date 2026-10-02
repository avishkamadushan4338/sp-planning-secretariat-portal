import { createFileRoute } from "@tanstack/react-router";
import SMPDashboard from "@/features/smp/SMPDashboard";

export const Route = createFileRoute("/smp/_layout/dashboard")({
  head: () => ({
    meta: [
      {
        title: "SMP Dashboard | Store Management Portal",
      },
    ],
  }),
  component: SMPDashboard,
});
