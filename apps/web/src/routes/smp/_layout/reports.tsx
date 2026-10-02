import { createFileRoute } from "@tanstack/react-router";
import SMPReports from "@/features/smp/SMPReports";

export const Route = createFileRoute("/smp/_layout/reports")({
  head: () => ({
    meta: [
      {
        title: "SMP Reports | Store Management Portal",
      },
    ],
  }),
  component: SMPReports,
});
