import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react+tanstack__react-query.mjs";
import { login, logout } from "./smpApi-B7J5_1vM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SMPContext-082lc8Y9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Ctx = (0, import_react.createContext)(null);
function SMPProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(() => {
		try {
			return JSON.parse(typeof window !== "undefined" ? localStorage.getItem("smp_user") : null);
		} catch {
			return null;
		}
	});
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const signIn = (0, import_react.useCallback)(async (username, password) => {
		setLoading(true);
		setError("");
		try {
			const { data } = await login(username, password);
			localStorage.setItem("smp_token", data.token);
			localStorage.setItem("smp_user", JSON.stringify(data.user));
			setUser(data.user);
			return { ok: true };
		} catch (e) {
			const msg = e.response?.data?.error || "Login failed";
			setError(msg);
			return {
				ok: false,
				error: msg
			};
		} finally {
			setLoading(false);
		}
	}, []);
	const signOut = (0, import_react.useCallback)(async () => {
		try {
			await logout();
		} catch (_e) {}
		localStorage.removeItem("smp_token");
		localStorage.removeItem("smp_user");
		setUser(null);
	}, []);
	const isAdmin = user?.role === "admin";
	const isStorekeeper = user?.role === "storekeeper" || user?.role === "admin";
	const isViewer = !!user;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value: {
			user,
			loading,
			error,
			signIn,
			signOut,
			isAdmin,
			isStorekeeper,
			isViewer
		},
		children
	});
}
var useSMP = () => (0, import_react.useContext)(Ctx);
//#endregion
export { SMPProvider, useSMP };
