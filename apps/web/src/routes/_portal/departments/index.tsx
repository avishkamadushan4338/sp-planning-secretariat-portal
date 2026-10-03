import { createFileRoute } from "@tanstack/react-router";
import Departments from "@/features/portal/departments/Departments";

export const Route = createFileRoute("/_portal/departments/")({
  head: () => ({
    meta: [
      {
        title: "Departments & Divisions | Provincial Planning Secretariat — Southern Province",
      },
      {
        name: "description",
        content: "Explore the departments and divisions of the Provincial Planning Secretariat — Accounts, Administration, and Development.",
      },
    ],
  }),
  component: Departments,
});
