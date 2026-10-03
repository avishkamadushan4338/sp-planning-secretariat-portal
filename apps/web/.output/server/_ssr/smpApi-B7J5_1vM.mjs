import { axios } from "../_libs/axios+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/smpApi-B7J5_1vM.js
var api = axios.create({ baseURL: `/api/smp` });
api.interceptors.request.use((cfg) => {
	const token = typeof window !== "undefined" ? localStorage.getItem("smp_token") : null;
	if (token) cfg.headers.Authorization = `Bearer ${token}`;
	return cfg;
});
api.interceptors.response.use((r) => r, (err) => {
	if (err.response?.status === 401) {
		localStorage.removeItem("smp_token");
		localStorage.removeItem("smp_user");
		window.location.href = "/smp";
	}
	return Promise.reject(err);
});
var login = (u, p) => api.post("/auth/login", {
	username: u,
	password: p
});
var logout = () => api.post("/auth/logout");
var getUsers = () => api.get("/users");
var createUser = (d) => api.post("/users", d);
var updateUser = (id, d) => api.patch(`/users/${id}`, d);
var deleteUser = (id) => api.delete(`/users/${id}`);
var changePassword = (d) => api.patch("/users/me/password", d);
var getItems = () => api.get("/items");
var createItem = (d) => api.post("/items", d);
var updateItem = (id, d) => api.patch(`/items/${id}`, d);
var deleteItem = (id) => api.delete(`/items/${id}`);
var getCategories = () => api.get("/items/meta/categories");
var getUniqueIds = (itemId) => api.get(`/items/${itemId}/unique-ids`);
var createDisposal = (d) => api.post("/disposal", d);
var getDisposals = (p = {}) => api.get("/disposal", { params: p });
var approveDisposal = (id) => api.patch(`/disposal/${id}/approve`);
var updateDisposalStatus = (id, d) => api.patch(`/disposal/${id}/status`, d);
var getDashboard = () => api.get("/reports/dashboard");
var getTransactions = (p = {}) => api.get("/reports/transactions", { params: p });
var getLoginLogs = (p = {}) => api.get("/reports/login-logs", { params: p });
var getValueSummary = () => api.get("/reports/value-summary");
//#endregion
export { approveDisposal, changePassword, createDisposal, createItem, createUser, deleteItem, deleteUser, getCategories, getDashboard, getDisposals, getItems, getLoginLogs, getTransactions, getUniqueIds, getUsers, getValueSummary, login, logout, updateDisposalStatus, updateItem, updateUser };
