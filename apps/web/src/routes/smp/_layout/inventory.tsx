import { createFileRoute } from "@tanstack/react-router";
import SMPInventory from "@/features/smp/SMPInventory";

export const Route = createFileRoute("/smp/_layout/inventory")({
  head: () => ({
    meta: [
      {
        title: "SMP Inventory | Store Management Portal",
      },
    ],
  }),
  component: SMPInventory,
});
