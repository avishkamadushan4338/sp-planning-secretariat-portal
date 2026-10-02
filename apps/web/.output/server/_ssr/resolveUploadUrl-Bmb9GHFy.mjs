//#region node_modules/.nitro/vite/services/ssr/assets/resolveUploadUrl-Bmb9GHFy.js
var API_BASE = "";
function resolveUploadUrl(src) {
	if (typeof src !== "string" || !src.startsWith("/uploads/")) return src;
	return `${API_BASE}${src}`;
}
//#endregion
export { resolveUploadUrl };
