import { createFileRoute } from "@tanstack/react-router";
import SMPTransactions from "@/features/smp/SMPTransactions";

export const Route = createFileRoute("/smp/_layout/transactions")({
  head: () => ({
    meta: [
      {
        title: "SMP Transactions | Store Management Portal",
      },
    ],
  }),
  component: SMPTransactions,
});
