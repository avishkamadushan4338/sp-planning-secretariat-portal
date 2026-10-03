import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react+tanstack__react-query.mjs";
import { FiDownload, FiList, FiRefreshCw } from "../_libs/react-icons.mjs";
import { getTransactions } from "./smpApi-B7J5_1vM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/transactions-u4ZYsV1_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAROON = "#4A0918";
var GOLD = "#C79A2B";
var ACTION_CFG = {
	created: {
		label: "Created",
		color: "#6366F1"
	},
	edited: {
		label: "Edited",
		color: GOLD
	},
	deleted: {
		label: "Deleted",
		color: "#DC2626"
	},
	stock_in: {
		label: "Stock In",
		color: "#16A34A"
	},
	stock_out: {
		label: "Stock Out",
		color: "#EA580C"
	},
	issued: {
		label: "Issued",
		color: "#0EA5E9"
	},
	borrowed: {
		label: "Borrowed",
		color: "#EC4899"
	},
	returned: {
		label: "Returned",
		color: "#10B981"
	}
};
function exportCSV(rows) {
	const lines = [[
		"Date",
		"Action",
		"Item",
		"SKU",
		"Qty Before",
		"Qty After",
		"User",
		"Note"
	].join(","), ...rows.map((r) => [
		new Date(r.createdAt).toLocaleString("en-LK"),
		r.action,
		r.itemName,
		r.sku || "",
		r.qtyBefore,
		r.qtyAfter,
		r.username,
		`"${(r.note || "").replace(/"/g, "\"\"")}"`
	].join(","))];
	const blob = new Blob([lines.join("\n")], { type: "text/csv" });
	const a = document.createElement("a");
	a.href = URL.createObjectURL(blob);
	a.download = `transactions_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
	a.click();
}
function SMPTransactions() {
	const [rows, setRows] = (0, import_react.useState)([]);
	const [loading, setLoad] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	const [actF, setActF] = (0, import_react.useState)("All");
	const [dateF, setDateF] = (0, import_react.useState)({
		from: "",
		to: ""
	});
	const load = async () => {
		setLoad(true);
		try {
			const { data } = await getTransactions();
			setRows(data);
		} finally {
			setLoad(false);
		}
	};
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const visible = rows.filter((r) => actF === "All" || r.action === actF).filter((r) => !search || r.itemName?.toLowerCase().includes(search.toLowerCase()) || r.username?.toLowerCase().includes(search.toLowerCase())).filter((r) => !dateF.from || r.createdAt >= dateF.from).filter((r) => !dateF.to || r.createdAt <= dateF.to + "T23:59:59");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
				placeholder: "Search item or user…",
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					display: "flex",
					gap: 5,
					flexWrap: "wrap"
				},
				children: ["All", ...Object.keys(ACTION_CFG)].map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setActF(a),
					style: {
						padding: "4px 10px",
						borderRadius: 100,
						border: `1.5px solid ${actF === a ? GOLD : "rgba(74,9,24,0.15)"}`,
						background: actF === a ? GOLD : "transparent",
						color: actF === a ? "#fff" : ACTION_CFG[a]?.color || "rgba(74,9,24,0.6)",
						fontSize: "0.7rem",
						fontWeight: 600,
						cursor: "pointer",
						fontFamily: "Inter,sans-serif",
						whiteSpace: "nowrap"
					},
					children: a === "All" ? "All" : ACTION_CFG[a].label
				}, a))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: load,
				style: iconBtn,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiRefreshCw, { size: 13 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => exportCSV(visible),
				style: iconBtn,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiDownload, { size: 13 })
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
					"Date",
					"Action",
					"Item Name",
					"Qty Δ",
					"User",
					"Note"
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
					colSpan: 6,
					style: {
						textAlign: "center",
						padding: "2.5rem",
						color: "rgba(74,9,24,0.35)"
					},
					children: "Loading…"
				}) }) : visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
					colSpan: 6,
					style: {
						textAlign: "center",
						padding: "2.5rem",
						fontSize: "0.85rem",
						color: "rgba(74,9,24,0.35)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiList, {
						size: 28,
						style: {
							display: "block",
							margin: "0 auto 0.5rem",
							opacity: .25
						}
					}), "No records match filters"]
				}) }) : visible.map((r, i) => {
					const ac = ACTION_CFG[r.action] || {
						label: r.action,
						color: MAROON
					};
					const delta = r.qtyAfter - r.qtyBefore;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						style: {
							borderBottom: "1px solid rgba(74,9,24,0.05)",
							background: i % 2 === 0 ? "#fff" : "rgba(252,251,250,0.6)"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									padding: "9px 12px",
									fontSize: "0.75rem",
									color: "rgba(74,9,24,0.5)",
									whiteSpace: "nowrap"
								},
								children: new Date(r.createdAt).toLocaleString("en-LK")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: { padding: "9px 12px" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										display: "inline-flex",
										alignItems: "center",
										padding: "2px 8px",
										borderRadius: 100,
										fontSize: "0.65rem",
										fontWeight: 700,
										background: `${ac.color}14`,
										color: ac.color,
										whiteSpace: "nowrap"
									},
									children: ac.label
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									padding: "9px 12px",
									fontWeight: 600,
									color: MAROON,
									fontSize: "0.82rem"
								},
								children: r.itemName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								style: {
									padding: "9px 12px",
									fontWeight: 700,
									fontSize: "0.85rem",
									color: delta > 0 ? "#16A34A" : delta < 0 ? "#DC2626" : MAROON
								},
								children: [delta > 0 ? "+" : "", delta !== 0 ? delta : "—"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									padding: "9px 12px",
									fontSize: "0.78rem",
									color: "rgba(74,9,24,0.6)"
								},
								children: r.username
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									padding: "9px 12px",
									fontSize: "0.75rem",
									color: "rgba(74,9,24,0.45)",
									maxWidth: 200,
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap"
								},
								children: r.note || "—"
							})
						]
					}, r.id);
				}) })]
			})
		})]
	})] });
}
var iconBtn = {
	display: "inline-flex",
	alignItems: "center",
	gap: 6,
	padding: "7px 11px",
	borderRadius: 8,
	cursor: "pointer",
	border: "1.5px solid rgba(74,9,24,0.18)",
	background: "#fff",
	color: MAROON,
	fontSize: "0.8rem",
	fontWeight: 500,
	fontFamily: "Inter,sans-serif"
};
var SplitComponent = SMPTransactions;
//#endregion
export { SplitComponent as component };
