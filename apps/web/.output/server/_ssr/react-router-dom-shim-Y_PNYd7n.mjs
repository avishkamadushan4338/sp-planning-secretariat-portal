import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react+tanstack__react-query.mjs";
import { Link, Outlet, useLocation, useNavigate, useParams } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/react-router-dom-shim-Y_PNYd7n.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function getCurrentLang() {
	if (typeof window !== "undefined") {
		const segments = window.location.pathname.split("/").filter(Boolean);
		if (segments[0] && [
			"en",
			"si",
			"ta"
		].includes(segments[0])) return segments[0];
		const stored = localStorage.getItem("lang");
		if (stored && [
			"en",
			"si",
			"ta"
		].includes(stored)) return stored;
	}
	return "en";
}
function localizePath(path, lang) {
	if (!path || path.startsWith("http://") || path.startsWith("https://") || path.startsWith("mailto:") || path.startsWith("tel:") || path.startsWith("#")) return path;
	const currentLang = lang || getCurrentLang();
	const cleanPath = path.startsWith("/") ? path : `/${path}`;
	if (cleanPath.startsWith("/cms") || cleanPath.startsWith("/smp") || cleanPath.startsWith("/api") || cleanPath.startsWith("/branding") || cleanPath.startsWith("/assets")) return cleanPath;
	const segments = cleanPath.split("/").filter(Boolean);
	if (segments[0] && [
		"en",
		"si",
		"ta"
	].includes(segments[0])) {
		segments[0] = currentLang;
		return `/${segments.join("/")}`;
	}
	return `/${currentLang}${cleanPath === "/" ? "" : cleanPath}`;
}
var Link$1 = import_react.forwardRef(function Link$2(props, ref) {
	const { to, href, children, ...rest } = props;
	const rawTarget = to || href || "/";
	const target = typeof rawTarget === "string" ? localizePath(rawTarget) : rawTarget;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: target,
		ref,
		...rest,
		children
	});
});
var NavLink = Link$1;
var Outlet$1 = Outlet;
var useNavigate$1 = () => {
	const navigate = useNavigate();
	return (to, options) => {
		if (typeof to === "number") {
			if (typeof window !== "undefined") window.history.go(to);
			return;
		}
		const target = typeof to === "string" ? localizePath(to) : to;
		navigate({
			to: target,
			replace: options?.replace
		});
	};
};
var useLocation$1 = () => {
	const location = useLocation();
	let pathname = location.pathname;
	const segments = pathname.split("/").filter(Boolean);
	if (segments[0] && [
		"en",
		"si",
		"ta"
	].includes(segments[0])) {
		pathname = "/" + segments.slice(1).join("/");
		if (pathname === "") pathname = "/";
	}
	return {
		pathname,
		rawPathname: location.pathname,
		search: location.searchStr || "",
		hash: location.hash || "",
		state: location.state || null,
		key: location.pathname
	};
};
var useParams$1 = () => {
	const params = useParams({ strict: false }) || {};
	if (!params.lang) params.lang = getCurrentLang();
	return params;
};
var useSearchParams = () => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.searchStr || "");
	const setSearchParams = (params) => {};
	return [searchParams, setSearchParams];
};
var Navigate$1 = ({ to, replace }) => {
	const navigate = useNavigate$1();
	import_react.useEffect(() => {
		navigate(to, { replace });
	}, [to, replace]);
	return null;
};
var Routes = ({ children }) => {
	const location = useLocation$1();
	const childArray = import_react.Children.toArray(children);
	for (const child of childArray) if (import_react.isValidElement(child)) {
		const { path, element } = child.props;
		if (!path || path === "*" || location.pathname.endsWith(path) || location.pathname.includes(path)) return element || null;
	}
	return null;
};
var Route = ({ element }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: element });
};
//#endregion
export { Link$1, NavLink, Navigate$1, Outlet$1, Route, Routes, getCurrentLang, localizePath, useLocation$1, useNavigate$1, useParams$1, useSearchParams };
