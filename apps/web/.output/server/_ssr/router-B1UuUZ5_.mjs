import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react+tanstack__react-query.mjs";
import { HeadContent, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { Toaster } from "../_libs/sonner.mjs";
import { onError } from "../_libs/@orpc/client+[...].mjs";
import { OpenAPIHandler, OpenAPIReferencePlugin, RPCHandler } from "../_libs/@orpc/openapi+[...].mjs";
import { appRouter, auth, createContext, createQueryClient, orpc } from "./orpc-z2cWmUEA.mjs";
import { FooterProvider } from "./FooterContext-BhxD5FhT.mjs";
import { SitePublishContext } from "./SitePublishContextInstance-CHsmS2ZD.mjs";
import { setupRouterSsrQueryIntegration } from "../_libs/@tanstack/react-router-ssr-query+[...].mjs";
import { ZodToJsonSchemaConverter } from "../_libs/orpc__zod+zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-B1UuUZ5_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STORAGE_KEY = "site_publish_mode";
function SitePublishProvider({ children }) {
	const [isLive, setIsLive] = (0, import_react.useState)(() => {
		try {
			const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
			return stored === null ? true : stored === "live";
		} catch {
			return true;
		}
	});
	const setLive = (0, import_react.useCallback)((value) => {
		setIsLive(value);
		try {
			localStorage.setItem(STORAGE_KEY, value ? "live" : "coming_soon");
		} catch {}
		window.dispatchEvent(new StorageEvent("storage", {
			key: STORAGE_KEY,
			newValue: value ? "live" : "coming_soon"
		}));
	}, []);
	(0, import_react.useEffect)(() => {
		const handler = (e) => {
			if (e.key === STORAGE_KEY) setIsLive(e.newValue === "live");
		};
		window.addEventListener("storage", handler);
		return () => window.removeEventListener("storage", handler);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SitePublishContext.Provider, {
		value: {
			isLive,
			setLive
		},
		children
	});
}
var src_default = "/assets/index-DCkwfYEG.css";
var Route$29 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Planning Secretariat — Southern Provincial Council, Sri Lanka" },
			{
				name: "description",
				content: "Official Portal of the Planning Secretariat, Southern Provincial Council, Sri Lanka. Regional planning, sustainable development, and administrative monitoring."
			},
			{
				name: "keywords",
				content: "Southern Province, Planning Secretariat, Sri Lanka, Provincial Council, Galle, Regional Development, Public Service"
			},
			{
				property: "og:title",
				content: "Planning Secretariat — Southern Provincial Council, Sri Lanka"
			},
			{
				property: "og:description",
				content: "Empowering Regional Growth & Sustainable Development across Southern Province."
			},
			{
				property: "og:type",
				content: "website"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: src_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800;900&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Noto+Sans+Sinhala:wght@100..900&family=Noto+Sans+Tamil:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
			}
		]
	}),
	component: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-ivory text-prem-black font-sans antialiased selection:bg-gold/20 selection:text-maroon",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SitePublishProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					position: "top-right",
					richColors: true,
					closeButton: true,
					toastOptions: { style: {
						fontFamily: "Inter, sans-serif",
						fontSize: "0.88rem"
					} }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$26 = () => import("./routes-0yFo4NXW.mjs");
var Route$28 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Welcome — Southern Province Planning Secretariat" }, {
		name: "description",
		content: "Official gateway of the Planning Secretariat, Southern Provincial Council, Sri Lanka. Select your preferred language to proceed."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("../_portal-BiFbWnNC.mjs");
var Route$27 = createFileRoute("/_portal")({ component: lazyRouteComponent($$splitComponentImporter$25, "component") });
var $$splitComponentImporter$24 = () => import("./terms-BEr63Pvg.mjs");
var Route$26 = createFileRoute("/terms")({
	head: () => ({ meta: [{ title: "Terms and Services | Provincial Planning Secretariat — Southern Province" }] }),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./about-deputy-secretary-DA_sgFNK.mjs");
var Route$25 = createFileRoute("/_portal/about-deputy-secretary")({
	head: () => ({ meta: [{ title: "Deputy Chief Secretary | Provincial Planning Secretariat — Southern Province" }, {
		name: "description",
		content: "Profile, biography and leadership message from the Deputy Chief Secretary – Planning."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./contact-D-xbI-1t.mjs");
var Route$24 = createFileRoute("/_portal/contact")({
	head: () => ({ meta: [{ title: "Contact Us | Provincial Planning Secretariat — Southern Province" }, {
		name: "description",
		content: "Get in touch with the Southern Province Planning Secretariat at Galle. Send inquiries, complaints, and requests for information."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./documents-DQ0bcarx.mjs");
var Route$23 = createFileRoute("/_portal/documents")({
	head: () => ({ meta: [{ title: "Official Documents | Provincial Planning Secretariat — Southern Province" }, {
		name: "description",
		content: "Access development plans, statistical handbooks, performance reports, and regional policy guidelines."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./downloads-DFwjzVWL.mjs");
var Route$22 = createFileRoute("/_portal/downloads")({
	head: () => ({ meta: [{ title: "Downloads & Forms | Provincial Planning Secretariat — Southern Province" }, {
		name: "description",
		content: "Download official planning templates, project submission forms, and regulatory guidelines."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./faq-Bs2_6Stz.mjs");
var Route$21 = createFileRoute("/_portal/faq")({
	head: () => ({ meta: [{ title: "Frequently Asked Questions | Provincial Planning Secretariat — Southern Province" }, {
		name: "description",
		content: "Find answers to frequently asked questions about the Southern Province Planning Secretariat services, downloads, and procedures."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./gallery-Daj6N04V.mjs");
var Route$20 = createFileRoute("/_portal/gallery")({
	head: () => ({ meta: [{ title: "Photo Gallery | Provincial Planning Secretariat — Southern Province" }, {
		name: "description",
		content: "Photographic highlights of provincial conferences, community workshops, and regional milestones."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./home-Dt9aN-Ug.mjs");
var Route$19 = createFileRoute("/_portal/home")({
	head: () => ({ meta: [
		{ title: "Provincial Planning Secretariat – Southern Province | Galle, Sri Lanka" },
		{
			name: "description",
			content: "Official website of the Provincial Planning Secretariat, Southern Province, Sri Lanka. Driving integrated provincial development from Dakshinapaya, Galle."
		},
		{
			property: "og:title",
			content: "Provincial Planning Secretariat – Southern Province, Sri Lanka"
		},
		{
			property: "og:description",
			content: "Driving integrated provincial development from Dakshinapaya, Galle."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./news-BHmm_wHR.mjs");
var Route$18 = createFileRoute("/_portal/news")({
	head: () => ({ meta: [{ title: "News & Press Releases | Provincial Planning Secretariat — Southern Province" }, {
		name: "description",
		content: "Latest news, media releases, events, and project inaugurations from the Southern Provincial Planning Secretariat."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./notices-Cupmap4w.mjs");
var Route$17 = createFileRoute("/_portal/notices")({
	head: () => ({ meta: [{ title: "Official Notices & Circulars | Provincial Planning Secretariat — Southern Province" }, {
		name: "description",
		content: "Public notices, procurement tenders, circulars, and announcements."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./cms-DBl1Vh1V.mjs");
var Route$16 = createFileRoute("/cms/")({
	head: () => ({ meta: [{ title: "CMS Portal Login | Provincial Planning Secretariat" }] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./dashboard-B3aJqVLS.mjs");
var Route$15 = createFileRoute("/cms/dashboard")({
	head: () => ({ meta: [{ title: "CMS Dashboard | Provincial Planning Secretariat" }] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./smp-mIN0AXTg.mjs");
var Route$14 = createFileRoute("/smp/")({
	head: () => ({ meta: [{ title: "SMP Login | Store Management Portal" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("../_layout-D8TM6G8u.mjs");
var Route$13 = createFileRoute("/smp/_layout")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./about-DQdrXacX.mjs");
var Route$12 = createFileRoute("/_portal/about/")({
	head: () => ({ meta: [{ title: "About Us | Provincial Planning Secretariat — Southern Province" }, {
		name: "description",
		content: "Learn about the Provincial Planning Secretariat — mandate, history, leadership team, and organisational structure."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("../_-BSEWlI48.mjs");
var Route$11 = createFileRoute("/_portal/about/$")({
	head: () => ({ meta: [{ title: "About Us | Provincial Planning Secretariat — Southern Province" }, {
		name: "description",
		content: "Learn about the Provincial Planning Secretariat — mandate, history, leadership team, and organisational structure."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./departments-BQWLHnAl.mjs");
var Route$10 = createFileRoute("/_portal/departments/")({
	head: () => ({ meta: [{ title: "Departments & Divisions | Provincial Planning Secretariat — Southern Province" }, {
		name: "description",
		content: "Explore the departments and divisions of the Provincial Planning Secretariat — Accounts, Administration, and Development."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("../_slug-CxEHYug3.mjs");
var Route$9 = createFileRoute("/_portal/departments/$slug")({
	head: () => ({ meta: [{ title: "Department Details | Provincial Planning Secretariat — Southern Province" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var Route$8 = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var rpcHandler = new RPCHandler(appRouter, { interceptors: [onError((error) => {
	console.error("[orpc error]", error);
})] });
var apiHandler = new OpenAPIHandler(appRouter, {
	plugins: [new OpenAPIReferencePlugin({ schemaConverters: [new ZodToJsonSchemaConverter()] })],
	interceptors: [onError((error) => {
		console.error("[openapi error]", error);
	})]
});
async function handle({ request }) {
	const context = await createContext({ req: request });
	const rpcResult = await rpcHandler.handle(request, {
		prefix: "/api/rpc",
		context
	});
	if (rpcResult.response) return rpcResult.response;
	const apiResult = await apiHandler.handle(request, {
		prefix: "/api/rpc/api-reference",
		context
	});
	if (apiResult.response) return apiResult.response;
	return new Response("Not found", { status: 404 });
}
var Route$7 = createFileRoute("/api/rpc/$")({ server: { handlers: {
	HEAD: handle,
	GET: handle,
	POST: handle,
	PUT: handle,
	PATCH: handle,
	DELETE: handle
} } });
var $$splitComponentImporter$6 = () => import("./dashboard--1Jre-it.mjs");
var Route$6 = createFileRoute("/smp/_layout/dashboard")({
	head: () => ({ meta: [{ title: "SMP Dashboard | Store Management Portal" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./disposal-HWK6GuSd.mjs");
var Route$5 = createFileRoute("/smp/_layout/disposal")({
	head: () => ({ meta: [{ title: "SMP Disposal | Store Management Portal" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./inventory-Ca2Vk5TY.mjs");
var Route$4 = createFileRoute("/smp/_layout/inventory")({
	head: () => ({ meta: [{ title: "SMP Inventory | Store Management Portal" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./login-logs-hHVcUZN_.mjs");
var Route$3 = createFileRoute("/smp/_layout/login-logs")({
	head: () => ({ meta: [{ title: "SMP Login Logs | Store Management Portal" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./reports-BDDrMJh9.mjs");
var Route$2 = createFileRoute("/smp/_layout/reports")({
	head: () => ({ meta: [{ title: "SMP Reports | Store Management Portal" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./transactions-u4ZYsV1_.mjs");
var Route$1 = createFileRoute("/smp/_layout/transactions")({
	head: () => ({ meta: [{ title: "SMP Transactions | Store Management Portal" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./users-QJuNjYtf.mjs");
var Route = createFileRoute("/smp/_layout/users")({
	head: () => ({ meta: [{ title: "SMP Users | Store Management Portal" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$28.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$29
});
var PortalRoute = Route$27.update({
	id: "/_portal",
	getParentRoute: () => Route$29
});
var TermsRoute = Route$26.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$29
});
var PortalAboutDeputySecretaryRoute = Route$25.update({
	id: "/about-deputy-secretary",
	path: "/about-deputy-secretary",
	getParentRoute: () => PortalRoute
});
var PortalContactRoute = Route$24.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => PortalRoute
});
var PortalDocumentsRoute = Route$23.update({
	id: "/documents",
	path: "/documents",
	getParentRoute: () => PortalRoute
});
var PortalDownloadsRoute = Route$22.update({
	id: "/downloads",
	path: "/downloads",
	getParentRoute: () => PortalRoute
});
var PortalFaqRoute = Route$21.update({
	id: "/faq",
	path: "/faq",
	getParentRoute: () => PortalRoute
});
var PortalGalleryRoute = Route$20.update({
	id: "/gallery",
	path: "/gallery",
	getParentRoute: () => PortalRoute
});
var PortalHomeRoute = Route$19.update({
	id: "/home",
	path: "/home",
	getParentRoute: () => PortalRoute
});
var PortalNewsRoute = Route$18.update({
	id: "/news",
	path: "/news",
	getParentRoute: () => PortalRoute
});
var PortalNoticesRoute = Route$17.update({
	id: "/notices",
	path: "/notices",
	getParentRoute: () => PortalRoute
});
var CmsIndexRoute = Route$16.update({
	id: "/cms/",
	path: "/cms/",
	getParentRoute: () => Route$29
});
var CmsDashboardRoute = Route$15.update({
	id: "/cms/dashboard",
	path: "/cms/dashboard",
	getParentRoute: () => Route$29
});
var SmpIndexRoute = Route$14.update({
	id: "/smp/",
	path: "/smp/",
	getParentRoute: () => Route$29
});
var SmpLayoutRoute = Route$13.update({
	id: "/smp/_layout",
	path: "/smp",
	getParentRoute: () => Route$29
});
var PortalAboutIndexRoute = Route$12.update({
	id: "/about/",
	path: "/about/",
	getParentRoute: () => PortalRoute
});
var PortalAboutSplatRoute = Route$11.update({
	id: "/about/$",
	path: "/about/$",
	getParentRoute: () => PortalRoute
});
var PortalDepartmentsIndexRoute = Route$10.update({
	id: "/departments/",
	path: "/departments/",
	getParentRoute: () => PortalRoute
});
var PortalDepartmentsSlugRoute = Route$9.update({
	id: "/departments/$slug",
	path: "/departments/$slug",
	getParentRoute: () => PortalRoute
});
var ApiAuthSplatRoute = Route$8.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route$29
});
var ApiRpcSplatRoute = Route$7.update({
	id: "/api/rpc/$",
	path: "/api/rpc/$",
	getParentRoute: () => Route$29
});
var SmpLayoutDashboardRoute = Route$6.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => SmpLayoutRoute
});
var SmpLayoutDisposalRoute = Route$5.update({
	id: "/disposal",
	path: "/disposal",
	getParentRoute: () => SmpLayoutRoute
});
var SmpLayoutInventoryRoute = Route$4.update({
	id: "/inventory",
	path: "/inventory",
	getParentRoute: () => SmpLayoutRoute
});
var SmpLayoutLoginLogsRoute = Route$3.update({
	id: "/login-logs",
	path: "/login-logs",
	getParentRoute: () => SmpLayoutRoute
});
var SmpLayoutReportsRoute = Route$2.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => SmpLayoutRoute
});
var SmpLayoutTransactionsRoute = Route$1.update({
	id: "/transactions",
	path: "/transactions",
	getParentRoute: () => SmpLayoutRoute
});
var SmpLayoutUsersRoute = Route.update({
	id: "/users",
	path: "/users",
	getParentRoute: () => SmpLayoutRoute
});
var PortalRouteChildren = {
	PortalAboutDeputySecretaryRoute,
	PortalContactRoute,
	PortalDocumentsRoute,
	PortalDownloadsRoute,
	PortalFaqRoute,
	PortalGalleryRoute,
	PortalHomeRoute,
	PortalNewsRoute,
	PortalNoticesRoute,
	PortalAboutSplatRoute,
	PortalDepartmentsSlugRoute,
	PortalAboutIndexRoute,
	PortalDepartmentsIndexRoute
};
var PortalRouteWithChildren = PortalRoute._addFileChildren(PortalRouteChildren);
var SmpLayoutRouteChildren = {
	SmpLayoutDashboardRoute,
	SmpLayoutDisposalRoute,
	SmpLayoutInventoryRoute,
	SmpLayoutLoginLogsRoute,
	SmpLayoutReportsRoute,
	SmpLayoutTransactionsRoute,
	SmpLayoutUsersRoute
};
var rootRouteChildren = {
	IndexRoute,
	PortalRoute: PortalRouteWithChildren,
	TermsRoute,
	CmsDashboardRoute,
	SmpLayoutRoute: SmpLayoutRoute._addFileChildren(SmpLayoutRouteChildren),
	CmsIndexRoute,
	SmpIndexRoute,
	ApiAuthSplatRoute,
	ApiRpcSplatRoute
};
var routeTree = Route$29._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = createQueryClient();
	const router = createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreloadStaleTime: 0,
		context: {
			orpc,
			queryClient
		},
		defaultNotFoundComponent: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-8 text-center text-lg",
			children: "Page Not Found"
		}),
		rewrite: {
			input: ({ url }) => {
				const segments = url.pathname.split("/").filter(Boolean);
				if (segments[0] && [
					"en",
					"si",
					"ta"
				].includes(segments[0])) {
					url.pathname = "/" + segments.slice(1).join("/");
					if (!url.pathname) url.pathname = "/";
				}
				return url;
			},
			output: ({ url }) => {
				return url;
			}
		}
	});
	setupRouterSsrQueryIntegration({
		router,
		queryClient
	});
	return router;
};
//#endregion
export { getRouter };
