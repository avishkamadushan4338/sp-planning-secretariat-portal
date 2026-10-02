import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
// @ts-ignore
import { routeTree } from "./routeTree.gen";
import { createQueryClient, orpc } from "./utils/orpc";

export const getRouter = () => {
  const queryClient = createQueryClient();

  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    context: { orpc, queryClient },
    defaultNotFoundComponent: () => <div className="p-8 text-center text-lg">Page Not Found</div>,
    rewrite: {
      input: ({ url }) => {
        // Strip /en, /si, /ta from url for router internal matching
        const segments = url.pathname.split("/").filter(Boolean);
        if (segments[0] && ["en", "si", "ta"].includes(segments[0])) {
          url.pathname = "/" + segments.slice(1).join("/");
          if (!url.pathname) url.pathname = "/";
        }
        return url;
      },
      output: ({ url }) => {
        return url;
      },
    },
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });

  return router;
};

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
