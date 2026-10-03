import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seo-9D_r0kof.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function SeoHead(props) {
	import_react.useEffect(() => {
		if (typeof document !== "undefined") {
			if (props.title) document.title = props.title;
		}
	}, [props.title]);
	return null;
}
//#endregion
export { SeoHead };
