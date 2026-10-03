import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react+tanstack__react-query.mjs";
import { FiActivity, FiAlertCircle, FiRefreshCw, FiShield } from "../_libs/react-icons.mjs";
import { getLoginLogs } from "./smpApi-B7J5_1vM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-logs-hHVcUZN_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAROON = "#4A0918";
var GOLD = "#C79A2B";
var DAYS_28 = 24192e5;
function SMPLoginLogs() {
	const [rows, setRows] = (0, import_react.useState)([]);
	const [loading, setLoad] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	const [statusF, setStatusF] = (0, import_react.useState)("All");
	const [dateF, setDateF] = (0, import_react.useState)({
		from: "",
		to: ""
	});
	const load = async () => {
		setLoad(true);
		try {
			const { data } = await getLoginLogs();
			setRows(data);
		} finally {
			setLoad(false);
		}
	};
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const visible = rows.filter((r) => statusF === "All" || r.status === statusF).filter((r) => !search || r.username?.toLowerCase().includes(search.toLowerCase()) || r.ip?.includes(search)).filter((r) => !dateF.from || r.loginTime >= dateF.from).filter((r) => !dateF.to || r.loginTime <= dateF.to + "T23:59:59");
	const agePercent = (ts) => {
		const age = Date.now() - new Date(ts).getTime();
		return Math.min(100, age / DAYS_28 * 100);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				background: "rgba(74,9,24,0.04)",
				border: "1px solid rgba(74,9,24,0.1)",
				borderRadius: 10,
				padding: "10px 14px",
				marginBottom: "1rem",
				display: "flex",
				alignItems: "center",
				gap: 8
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiShield, {
				size: 14,
				color: GOLD
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				style: {
					fontSize: "0.8rem",
					color: "rgba(74,9,24,0.6)"
				},
				children: [
					"Login logs are ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "read-only" }),
					" and automatically deleted after ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "28 days" }),
					". Cannot be manually deleted."
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				flexWrap: "wrap",
				gap: 8,
				marginBottom: "1rem",
				alignItems: "center"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: search,
					onChange: (e) => setSearch(e.target.value),
					placeholder: "Username or IP…",
					style: {
						flex: "1 1 180px",
						border: "1.5px solid rgba(74,9,24,0.15)",
						borderRadius: 8,
						outline: "none",
						padding: "7px 11px",
						fontSize: "0.82rem",
						color: MAROON,
						fontFamily: "Inter,sans-serif",
						background: "#FCFBFA"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "date",
					value: dateF.from,
					onChange: (e) => setDateF((f) => ({
						...f,
						from: e.target.value
					})),
					style: {
						border: "1.5px solid rgba(74,9,24,0.15)",
						borderRadius: 8,
						outline: "none",
						padding: "7px 10px",
						fontSize: "0.8rem",
						color: MAROON,
						fontFamily: "Inter,sans-serif",
						background: "#fff"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: {
						fontSize: "0.8rem",
						color: "rgba(74,9,24,0.4)"
					},
					children: "to"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "date",
					value: dateF.to,
					onChange: (e) => setDateF((f) => ({
						...f,
						to: e.target.value
					})),
					style: {
						border: "1.5px solid rgba(74,9,24,0.15)",
						borderRadius: 8,
						outline: "none",
						padding: "7px 10px",
						fontSize: "0.8rem",
						color: MAROON,
						fontFamily: "Inter,sans-serif",
						background: "#fff"
					}
				}),
				[
					"All",
					"success",
					"failed"
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setStatusF(s),
					style: {
						padding: "5px 12px",
						borderRadius: 100,
						border: `1.5px solid ${statusF === s ? GOLD : "rgba(74,9,24,0.15)"}`,
						background: statusF === s ? GOLD : "transparent",
						color: statusF === s ? "#fff" : s === "failed" ? "#DC2626" : "rgba(74,9,24,0.6)",
						fontSize: "0.72rem",
						fontWeight: 600,
						cursor: "pointer",
						fontFamily: "Inter,sans-serif",
						textTransform: "capitalize"
					},
					children: s === "All" ? "All" : s === "success" ? "Success" : "Failed"
				}, s)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: load,
					style: {
						display: "inline-flex",
						alignItems: "center",
						gap: 5,
						padding: "7px 11px",
						borderRadius: 8,
						border: "1.5px solid rgba(74,9,24,0.18)",
						background: "#fff",
						color: MAROON,
						cursor: "pointer"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiRefreshCw, { size: 13 })
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				background: "#fff",
				borderRadius: 12,
				border: "1px solid rgba(74,9,24,0.1)",
				boxShadow: "0 2px 10px rgba(74,9,24,0.05)",
				overflow: "hidden"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					padding: "0.65rem 1.1rem",
					borderBottom: "1px solid rgba(74,9,24,0.07)",
					fontSize: "0.75rem",
					color: "rgba(74,9,24,0.5)"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						style: { color: MAROON },
						children: visible.length
					}),
					" of ",
					rows.length,
					" records"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { overflowX: "auto" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					style: {
						width: "100%",
						borderCollapse: "collapse"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: [
						"Status",
						"Username",
						"Login Time",
						"Logout Time",
						"IP Address",
						"Device/Browser",
						"Age (28d expiry)"
					].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						style: {
							padding: "9px 12px",
							textAlign: "left",
							fontFamily: "'Cinzel',serif",
							fontSize: "0.63rem",
							letterSpacing: "0.09em",
							color: "rgba(74,9,24,0.5)",
							fontWeight: 600,
							borderBottom: "1px solid rgba(74,9,24,0.1)",
							background: "rgba(74,9,24,0.025)",
							whiteSpace: "nowrap"
						},
						children: h
					}, h)) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 7,
						style: {
							textAlign: "center",
							padding: "2.5rem",
							color: "rgba(74,9,24,0.35)"
						},
						children: "Loading…"
					}) }) : visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						colSpan: 7,
						style: {
							textAlign: "center",
							padding: "2.5rem",
							fontSize: "0.85rem",
							color: "rgba(74,9,24,0.35)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiActivity, {
							size: 28,
							style: {
								display: "block",
								margin: "0 auto 0.5rem",
								opacity: .25
							}
						}), "No log records match filters"]
					}) }) : visible.map((r, i) => {
						const age = agePercent(r.createdAt);
						const isFailed = r.status === "failed";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							style: {
								borderBottom: "1px solid rgba(74,9,24,0.05)",
								background: i % 2 === 0 ? "#fff" : "rgba(252,251,250,0.6)"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: { padding: "9px 12px" },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										style: {
											display: "inline-flex",
											alignItems: "center",
											gap: 4,
											padding: "2px 8px",
											borderRadius: 100,
											fontSize: "0.65rem",
											fontWeight: 700,
											background: isFailed ? "rgba(220,38,38,0.1)" : "rgba(22,163,74,0.1)",
											color: isFailed ? "#B91C1C" : "#15803D"
										},
										children: [isFailed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAlertCircle, { size: 10 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiShield, { size: 10 }), isFailed ? "Failed" : "Success"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: {
										padding: "9px 12px",
										fontWeight: 600,
										color: MAROON,
										fontSize: "0.83rem"
									},
									children: r.username
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: {
										padding: "9px 12px",
										fontSize: "0.75rem",
										color: "rgba(74,9,24,0.6)",
										whiteSpace: "nowrap"
									},
									children: new Date(r.loginTime).toLocaleString("en-LK")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: {
										padding: "9px 12px",
										fontSize: "0.75rem",
										color: "rgba(74,9,24,0.5)",
										whiteSpace: "nowrap"
									},
									children: r.logoutTime ? new Date(r.logoutTime).toLocaleString("en-LK") : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: {
										padding: "9px 12px",
										fontSize: "0.75rem",
										color: "rgba(74,9,24,0.55)",
										fontFamily: "monospace"
									},
									children: r.ip
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: {
										padding: "9px 12px",
										fontSize: "0.72rem",
										color: "rgba(74,9,24,0.45)",
										maxWidth: 180,
										overflow: "hidden",
										textOverflow: "ellipsis",
										whiteSpace: "nowrap"
									},
									title: r.deviceInfo,
									children: r.deviceInfo
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: { padding: "9px 12px" },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											alignItems: "center",
											gap: 8
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												flex: 1,
												height: 5,
												background: "rgba(74,9,24,0.08)",
												borderRadius: 100,
												overflow: "hidden"
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
												height: "100%",
												width: `${age}%`,
												background: age > 80 ? "#DC2626" : age > 50 ? GOLD : "#16A34A",
												borderRadius: 100,
												transition: "width 0.3s"
											} })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											style: {
												fontSize: "0.65rem",
												color: "rgba(74,9,24,0.4)",
												whiteSpace: "nowrap"
											},
											children: [Math.round(age), "%"]
										})]
									})
								})
							]
						}, r.id);
					}) })]
				})
			})]
		})
	] });
}
var SplitComponent = SMPLoginLogs;
//#endregion
export { SplitComponent as component };
