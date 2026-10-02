import type { QueryClient } from "@tanstack/react-query";
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import type { orpc } from "@/utils/orpc";
import { Toaster } from "sonner";
import { FooterProvider } from "@/shared/contexts/FooterContext";
import { SitePublishProvider } from "@/shared/contexts/SitePublishContext";
import appCss from "../index.css?url";

export interface RouterAppContext {
  orpc: typeof orpc;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Planning Secretariat — Southern Provincial Council, Sri Lanka",
      },
      {
        name: "description",
        content: "Official Portal of the Planning Secretariat, Southern Provincial Council, Sri Lanka. Regional planning, sustainable development, and administrative monitoring.",
      },
      {
        name: "keywords",
        content: "Southern Province, Planning Secretariat, Sri Lanka, Provincial Council, Galle, Regional Development, Public Service",
      },
      {
        property: "og:title",
        content: "Planning Secretariat — Southern Provincial Council, Sri Lanka",
      },
      {
        property: "og:description",
        content: "Empowering Regional Growth & Sustainable Development across Southern Province.",
      },
      {
        property: "og:type",
        content: "website",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800;900&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Noto+Sans+Sinhala:wght@100..900&family=Noto+Sans+Tamil:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap",
      },
    ],
  }),

  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-ivory text-prem-black font-sans antialiased selection:bg-gold/20 selection:text-maroon">
        <SitePublishProvider>
          <FooterProvider>
            <Outlet />
          </FooterProvider>
        </SitePublishProvider>
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            style: {
              fontFamily: "Inter, sans-serif",
              fontSize: "0.88rem",
            },
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}
