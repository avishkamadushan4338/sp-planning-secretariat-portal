//#region node_modules/.nitro/vite/services/ssr/assets/cmsAuth-B_i6idnL.js
var KEY = "cms_creds";
async function sha256(text) {
	const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
	return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
function getCredentials() {
	const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
	return raw ? JSON.parse(raw) : null;
}
async function ensureDefaults() {
	if (!getCredentials()) {
		const hash = await sha256("Admin@123");
		localStorage.setItem(KEY, JSON.stringify({
			username: "Admin",
			hash
		}));
	}
}
async function verifyLogin(username, password) {
	await ensureDefaults();
	const creds = getCredentials();
	const hash = await sha256(password);
	return creds?.username === username && creds?.hash === hash;
}
async function changeUsername(newUsername, currentPassword) {
	const creds = getCredentials();
	if (!creds) throw new Error("No credentials found");
	const hash = await sha256(currentPassword);
	if (creds.hash !== hash) throw new Error("Incorrect current password");
	localStorage.setItem(KEY, JSON.stringify({
		...creds,
		username: newUsername
	}));
}
async function changePassword(currentPassword, newPassword) {
	const creds = getCredentials();
	if (!creds) throw new Error("No credentials found");
	const curHash = await sha256(currentPassword);
	if (creds.hash !== curHash) throw new Error("Incorrect current password");
	const newHash = await sha256(newPassword);
	localStorage.setItem(KEY, JSON.stringify({
		...creds,
		hash: newHash
	}));
}
//#endregion
export { changePassword, changeUsername, getCredentials, verifyLogin };
