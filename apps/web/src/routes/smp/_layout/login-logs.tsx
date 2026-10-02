import { createFileRoute } from "@tanstack/react-router";
import SMPLoginLogs from "@/features/smp/SMPLoginLogs";

export const Route = createFileRoute("/smp/_layout/login-logs")({
  head: () => ({
    meta: [
      {
        title: "SMP Login Logs | Store Management Portal",
      },
    ],
  }),
  component: SMPLoginLogs,
});
