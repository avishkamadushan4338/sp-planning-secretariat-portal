import { createFileRoute, useParams, Navigate } from "@tanstack/react-router";
import DepartmentDetail from "@/features/portal/departments/DepartmentDetail";
import DepartmentProfile from "@/features/portal/departments/DepartmentProfile";

const DEPT_KEYS = new Set(["accounts", "administration", "development"]);
const PROFILE_KEYS = new Set(["head-administration", "head-accounts"]);

function DepartmentRouter() {
  const { slug } = useParams({ strict: false });
  if (slug && DEPT_KEYS.has(slug)) return <DepartmentDetail />;
  if (slug && PROFILE_KEYS.has(slug)) return <DepartmentProfile />;
  return <Navigate to="/departments" replace />;
}

export const Route = createFileRoute("/_portal/departments/$slug")({
  head: () => ({
    meta: [
      {
        title: "Department Details | Provincial Planning Secretariat — Southern Province",
      },
    ],
  }),
  component: DepartmentRouter,
});
