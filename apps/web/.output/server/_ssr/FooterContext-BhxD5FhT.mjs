import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/FooterContext-BhxD5FhT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FooterContext = (0, import_react.createContext)(null);
function FooterProvider({ children }) {
	const [hidden, setHidden] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterContext.Provider, {
		value: {
			hidden,
			setHidden
		},
		children
	});
}
function useFooter() {
	return (0, import_react.useContext)(FooterContext);
}
//#endregion
export { FooterProvider, useFooter };
