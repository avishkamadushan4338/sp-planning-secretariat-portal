import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react+tanstack__react-query.mjs";
import { useNavigate$1 } from "./react-router-dom-shim-Y_PNYd7n.mjs";
import { motion } from "../_libs/framer-motion.mjs";
import { FiBarChart2, FiDollarSign, FiPackage, FiRefreshCw, FiTrash2, FiTrendingDown, FiUsers } from "../_libs/react-icons.mjs";
import { getDashboard } from "./smpApi-B7J5_1vM.mjs";
import { useSMP } from "./SMPContext-082lc8Y9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard--1Jre-it.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAROON = "#4A0918";
var GOLD = "#C79A2B";
var fmtDate = (s) => new Date(s).toLocaleString("en-LK", {
	dateStyle: "medium",
	timeStyle: "short"
});
var fmtVal = (v) => new Intl.NumberFormat("en-LK", {
	style: "currency",
	currency: "LKR",
	maximumFractionDigits: 0
}).format(v);
var ACTION_LABELS = {
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
	reserved: {
		label: "Reserved",
		color: "#8B5CF6"
	},
	disposed: {
		label: "Disposed",
		color: "#6B7280"
	}
};
var fadeUp = (delay = 0) => ({
	hidden: {
		opacity: 0,
		y: 16
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			delay,
			duration: .45,
			ease: [
				.16,
				1,
				.3,
				1
			]
		}
	}
});
function SMPDashboard() {
	const { isAdmin } = useSMP();
	const navigate = useNavigate$1();
	const [data, setData] = (0, import_react.useState)(null);
	const [loading, setLoad] = (0, import_react.useState)(true);
	const [error, setErr] = (0, import_react.useState)("");
	const load = async () => {
		setLoad(true);
		setErr("");
		try {
			const { data: d } = await getDashboard();
			setData(d);
		} catch (e) {
			setErr(e.response?.data?.error || "Failed to load dashboard");
		} finally {
			setLoad(false);
		}
	};
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrBox, {
		msg: error,
		onRetry: load
	});
	const { totalItems, totalQty, outOfStockCount, activeUsers, pendingDisposals, totalDisposals, totalStockValue, recentTransactions, categoryBreakdown, actionCounts, topDisposedItems } = data;
	const statCards = [
		{
			label: "Total Items",
			value: totalItems,
			icon: FiPackage,
			color: GOLD,
			sub: "item types",
			link: "/smp/inventory"
		},
		{
			label: "Total Stock Qty",
			value: totalQty,
			icon: FiBarChart2,
			color: "#0EA5E9",
			sub: "units in store",
			link: "/smp/inventory"
		},
		{
			label: "Out of Stock",
			value: outOfStockCount,
			icon: FiTrendingDown,
			color: "#DC2626",
			sub: "items empty",
			link: "/smp/inventory",
			danger: outOfStockCount > 0
		},
		{
			label: "Total Disposals",
			value: totalDisposals,
			icon: FiTrash2,
			color: "#6B7280",
			sub: "all time",
			link: "/smp/disposal"
		},
		...totalStockValue > 0 ? [{
			label: "Stock Value",
			value: fmtVal(totalStockValue),
			icon: FiDollarSign,
			color: "#10B981",
			sub: "current value",
			link: null
		}] : [],
		...isAdmin ? [{
			label: "Active Users",
			value: activeUsers,
			icon: FiUsers,
			color: "#6366F1",
			sub: "system users",
			link: "/smp/users"
		}, {
			label: "Pending Disposals",
			value: pendingDisposals,
			icon: FiTrash2,
			color: "#9CA3AF",
			sub: "awaiting approval",
			link: "/smp/disposal",
			warn: pendingDisposals > 0
		}] : []
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 20
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				variants: fadeUp(0),
				initial: "hidden",
				animate: "visible",
				style: {
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
					gap: 12
				},
				children: statCards.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					variants: fadeUp(i * .04),
					initial: "hidden",
					animate: "visible",
					onClick: () => s.link && navigate(s.link),
					style: {
						background: s.danger ? "rgba(220,38,38,0.04)" : s.warn ? "rgba(245,158,11,0.04)" : "#fff",
						borderRadius: 12,
						border: `1px solid ${s.danger ? "rgba(220,38,38,0.2)" : s.warn ? "rgba(245,158,11,0.2)" : "rgba(74,9,24,0.09)"}`,
						boxShadow: "0 2px 10px rgba(74,9,24,0.06)",
						padding: "1rem 1.1rem",
						display: "flex",
						alignItems: "flex-start",
						gap: 12,
						cursor: s.link ? "pointer" : "default",
						transition: "box-shadow 0.15s, transform 0.15s"
					},
					whileHover: s.link ? {
						y: -2,
						boxShadow: "0 6px 20px rgba(74,9,24,0.12)"
					} : {},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							width: 38,
							height: 38,
							borderRadius: 10,
							background: `${s.color}14`,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexShrink: 0
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, {
							size: 17,
							color: s.color
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { minWidth: 0 },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									fontSize: "0.65rem",
									color: "rgba(74,9,24,0.45)",
									fontWeight: 500,
									textTransform: "uppercase",
									letterSpacing: "0.06em",
									marginBottom: "0.12rem"
								},
								children: s.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									fontSize: typeof s.value === "string" ? "0.95rem" : "1.3rem",
									fontWeight: 800,
									color: s.danger ? "#DC2626" : s.warn ? "#B45309" : MAROON,
									lineHeight: 1,
									fontFamily: "'Playfair Display', serif"
								},
								children: s.value
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									fontSize: "0.65rem",
									color: "rgba(74,9,24,0.38)",
									marginTop: "0.18rem"
								},
								children: s.sub
							})
						]
					})]
				}, s.label))
			}),
			isAdmin && pendingDisposals > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				variants: fadeUp(.1),
				initial: "hidden",
				animate: "visible",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertBanner, {
					color: "#6B7280",
					bg: "rgba(107,114,128,0.06)",
					border: "rgba(107,114,128,0.2)",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, {
						size: 14,
						color: "#6B7280"
					}),
					title: `${pendingDisposals} disposal record${pendingDisposals > 1 ? "s" : ""} awaiting approval`,
					action: "View Disposals",
					onAction: () => navigate("/smp/disposal")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: 16
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					variants: fadeUp(.14),
					initial: "hidden",
					animate: "visible",
					style: {
						background: "#fff",
						borderRadius: 12,
						border: "1px solid rgba(74,9,24,0.09)",
						boxShadow: "0 2px 10px rgba(74,9,24,0.05)",
						overflow: "hidden"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							padding: "0.85rem 1.1rem",
							borderBottom: "1px solid rgba(74,9,24,0.08)",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							style: {
								fontFamily: "'Playfair Display', serif",
								fontSize: "0.92rem",
								fontWeight: 700,
								color: MAROON
							},
							children: "Recent Transactions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => navigate("/smp/transactions"),
							style: {
								fontSize: "0.72rem",
								color: GOLD,
								background: "none",
								border: "none",
								cursor: "pointer",
								fontWeight: 600
							},
							children: "View all →"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							maxHeight: 320,
							overflowY: "auto"
						},
						children: recentTransactions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								padding: "2rem",
								textAlign: "center",
								color: "rgba(74,9,24,0.35)",
								fontSize: "0.82rem"
							},
							children: "No transactions yet"
						}) : recentTransactions.map((tx) => {
							const al = ACTION_LABELS[tx.action] || {
								label: tx.action,
								color: MAROON
							};
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "flex-start",
									gap: 10,
									padding: "9px 14px",
									borderBottom: "1px solid rgba(74,9,24,0.05)"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										display: "inline-flex",
										alignItems: "center",
										padding: "2px 7px",
										borderRadius: 100,
										fontSize: "0.62rem",
										fontWeight: 700,
										background: `${al.color}14`,
										color: al.color,
										whiteSpace: "nowrap",
										flexShrink: 0,
										marginTop: 2
									},
									children: al.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										flex: 1,
										minWidth: 0
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										style: {
											fontSize: "0.79rem",
											fontWeight: 600,
											color: MAROON,
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "ellipsis"
										},
										children: tx.itemName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										style: {
											fontSize: "0.68rem",
											color: "rgba(74,9,24,0.42)",
											marginTop: 2
										},
										children: [
											tx.username,
											" · ",
											fmtDate(tx.createdAt)
										]
									})]
								})]
							}, tx.id);
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 14
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						variants: fadeUp(.18),
						initial: "hidden",
						animate: "visible",
						style: {
							background: "#fff",
							borderRadius: 12,
							border: "1px solid rgba(74,9,24,0.09)",
							boxShadow: "0 2px 10px rgba(74,9,24,0.05)",
							padding: "0.85rem 1.1rem"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							style: {
								fontFamily: "'Playfair Display', serif",
								fontSize: "0.92rem",
								fontWeight: 700,
								color: MAROON,
								marginBottom: "0.85rem"
							},
							children: "Category Breakdown"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "flex",
								flexDirection: "column",
								gap: 7
							},
							children: (categoryBreakdown || []).slice(0, 6).map((c) => {
								const maxQty = Math.max(...(categoryBreakdown || []).map((x) => x.qty), 1);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										justifyContent: "space-between",
										marginBottom: 3
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											fontSize: "0.73rem",
											color: "rgba(74,9,24,0.65)",
											fontWeight: 500
										},
										children: c.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										style: {
											fontSize: "0.73rem",
											fontWeight: 700,
											color: MAROON
										},
										children: [c.qty, " units"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										height: 5,
										background: "rgba(74,9,24,0.07)",
										borderRadius: 100
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
										height: "100%",
										width: `${c.qty / maxQty * 100}%`,
										background: `linear-gradient(90deg, ${MAROON} 0%, ${GOLD} 100%)`,
										borderRadius: 100,
										transition: "width 0.5s"
									} })
								})] }, c.name);
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						variants: fadeUp(.22),
						initial: "hidden",
						animate: "visible",
						style: {
							background: "#fff",
							borderRadius: 12,
							border: "1px solid rgba(74,9,24,0.09)",
							boxShadow: "0 2px 10px rgba(74,9,24,0.05)",
							padding: "0.85rem 1.1rem"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							style: {
								fontFamily: "'Playfair Display', serif",
								fontSize: "0.92rem",
								fontWeight: 700,
								color: MAROON,
								marginBottom: "0.85rem"
							},
							children: "Action Summary"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: 6
							},
							children: Object.entries(ACTION_LABELS).map(([key, { label, color }]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: 7
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
										width: 7,
										height: 7,
										borderRadius: "50%",
										background: color,
										flexShrink: 0
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											fontSize: "0.72rem",
											color: "rgba(74,9,24,0.58)",
											flex: 1
										},
										children: label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											fontSize: "0.8rem",
											fontWeight: 700,
											color: MAROON
										},
										children: actionCounts[key] || 0
									})
								]
							}, key))
						})]
					})]
				})]
			}),
			topDisposedItems && topDisposedItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				variants: fadeUp(.26),
				initial: "hidden",
				animate: "visible",
				style: {
					background: "#fff",
					borderRadius: 12,
					border: "1px solid rgba(74,9,24,0.09)",
					boxShadow: "0 2px 10px rgba(74,9,24,0.05)",
					padding: "0.85rem 1.1rem"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					style: {
						fontFamily: "'Playfair Display', serif",
						fontSize: "0.92rem",
						fontWeight: 700,
						color: MAROON,
						marginBottom: "0.85rem"
					},
					children: "Most Disposed Items"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "flex",
						flexWrap: "wrap",
						gap: 8
					},
					children: topDisposedItems.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							alignItems: "center",
							gap: 8,
							background: "rgba(74,9,24,0.03)",
							border: "1px solid rgba(74,9,24,0.09)",
							borderRadius: 8,
							padding: "6px 12px"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									width: 20,
									height: 20,
									borderRadius: "50%",
									background: "#6B7280",
									color: "#fff",
									fontSize: "0.65rem",
									fontWeight: 800,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									flexShrink: 0
								},
								children: i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: "0.78rem",
									fontWeight: 600,
									color: MAROON
								},
								children: item.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								style: {
									fontSize: "0.72rem",
									color: "rgba(74,9,24,0.45)",
									fontWeight: 500
								},
								children: [item.count, " disposed"]
							})
						]
					}, item.name))
				})]
			})
		]
	});
}
function AlertBanner({ color, bg, border, icon, title, detail, action, onAction }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			background: bg,
			border: `1px solid ${border}`,
			borderRadius: 10,
			padding: "10px 14px",
			display: "flex",
			alignItems: "center",
			gap: 10
		},
		children: [
			icon,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					flex: 1,
					minWidth: 0
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: {
						fontSize: "0.8rem",
						fontWeight: 700,
						color
					},
					children: title
				}), detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: {
						fontSize: "0.72rem",
						color: "rgba(74,9,24,0.5)",
						marginLeft: 8
					},
					children: detail
				})]
			}),
			action && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: onAction,
				style: {
					fontSize: "0.72rem",
					fontWeight: 600,
					color,
					background: "none",
					border: `1px solid ${border}`,
					borderRadius: 6,
					padding: "3px 10px",
					cursor: "pointer",
					whiteSpace: "nowrap",
					flexShrink: 0
				},
				children: [action, " →"]
			})
		]
	});
}
function Skeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			display: "grid",
			gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
			gap: 12
		},
		children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
			height: 88,
			background: "#fff",
			borderRadius: 12,
			border: "1px solid rgba(74,9,24,0.08)",
			animation: "pulse 1.5s ease-in-out infinite"
		} }, i))
	});
}
function ErrBox({ msg, onRetry }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			textAlign: "center",
			padding: "3rem"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			style: {
				color: "#DC2626",
				marginBottom: "1rem",
				fontSize: "0.85rem"
			},
			children: msg
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: onRetry,
			style: {
				display: "inline-flex",
				alignItems: "center",
				gap: 6,
				padding: "8px 18px",
				borderRadius: 8,
				background: MAROON,
				color: "#fff",
				border: "none",
				cursor: "pointer",
				fontSize: "0.83rem"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiRefreshCw, { size: 13 }), " Retry"]
		})]
	});
}
var SplitComponent = SMPDashboard;
//#endregion
export { SplitComponent as component };
