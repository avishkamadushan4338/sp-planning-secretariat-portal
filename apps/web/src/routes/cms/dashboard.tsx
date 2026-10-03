import { createFileRoute, redirect } from "@tanstack/react-router";
import { getRequest } from "@tanstack/react-start/server";
import CMSDashboard from "@/features/cms/CMSDashboard";
import { auth } from "@/services.server";

/**
 * CMS dashboard route guard.
 *
 * The dashboard previously relied on a client-side session check inside
 * `CMSDashboard`, which meant anyone hitting this URL had the admin shell
 * rendered before being bounced. The read/write API was still protected by
 * `protectedProcedure`, so no data leaked — but the guard belongs here, on the
 * server, before the route renders at all.
 *
 * Note the redirect happens during server-side route resolution, so the check
 * cannot be skipped by disabling JavaScript.
 */
export const Route = createFileRoute("/cms/dashboard")({
  head: () => ({
    meta: [
      {
        title: "CMS Dashboard | Provincial Planning Secretariat",
      },
    ],
  }),
  beforeLoad: async () => {
    const request = getRequest();
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session?.user) {
      throw redirect({ to: "/cms/" });
    }

    // Staff with the "store" seat manage inventory, not site content. Only
    // admins and the secretary may reach the content dashboard.
    const role = (session.user as { role?: string }).role;
    if (role === "storeAdmin") {
      throw redirect({ to: "/smp" });
    }

    return { user: session.user };
  },
  component: CMSDashboard,
});