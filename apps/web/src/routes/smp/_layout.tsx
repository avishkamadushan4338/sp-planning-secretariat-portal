import { createFileRoute } from "@tanstack/react-router";
import SMPLayout from "@/features/smp/SMPLayout";

export const Route = createFileRoute("/smp/_layout")({
  component: SMPLayout,
});
