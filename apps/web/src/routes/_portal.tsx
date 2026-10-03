import { createFileRoute } from "@tanstack/react-router";
import MainLayout from "@/shared/layouts/MainLayout";

export const Route = createFileRoute("/_portal")({
  component: MainLayout,
});
