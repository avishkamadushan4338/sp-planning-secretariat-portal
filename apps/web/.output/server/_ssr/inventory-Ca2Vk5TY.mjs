import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react+tanstack__react-query.mjs";
import { AnimatePresence, motion } from "../_libs/framer-motion.mjs";
import { FiChevronDown, FiChevronUp, FiDollarSign, FiEdit2, FiHash, FiPackage, FiPlus, FiRefreshCw, FiSearch, FiTrash2, FiX } from "../_libs/react-icons.mjs";
import { createItem, deleteItem, getCategories, getItems, getUniqueIds, updateItem } from "./smpApi-B7J5_1vM.mjs";
import { useSMP } from "./SMPContext-082lc8Y9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inventory-Ca2Vk5TY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAROON = "#4A0918";
var GOLD = "#C79A2B";
var CREAM = "#FCFBFA";
var STATUS_CFG = {
	available: {
		label: "Available",
		bg: "rgba(22,163,74,0.1)",
		text: "#15803D",
		dot: "#22C55E"
	},
	out_of_stock: {
		label: "Out of Stock",
		bg: "rgba(220,38,38,0.1)",
		text: "#B91C1C",
		dot: "#EF4444"
	},
	reserved: {
		label: "Reserved",
		bg: "rgba(139,92,246,0.1)",
		text: "#7C3AED",
		dot: "#8B5CF6"
	},
	damaged: {
		label: "Damaged",
		bg: "rgba(107,114,128,0.1)",
		text: "#374151",
		dot: "#9CA3AF"
	}
};
var COND = [
	"Good",
	"Fair",
	"Damaged",
	"Under Repair"
];
var BLANK = {
	name: "",
	category: "Stationery",
	description: "",
	qty: "",
	condition: "Good",
	purchaseValue: "",
	currentValue: ""
};
function Modal({ title, onClose, children, wide }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		style: {
			position: "fixed",
			inset: 0,
			background: "rgba(30,5,12,0.55)",
			backdropFilter: "blur(4px)",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			zIndex: 200,
			padding: "1rem"
		},
		onClick: (e) => {
			if (e.target === e.currentTarget) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 24,
				scale: .96
			},
			animate: {
				opacity: 1,
				y: 0,
				scale: 1,
				transition: {
					duration: .35,
					ease: [
						.16,
						1,
						.3,
						1
					]
				}
			},
			exit: {
				opacity: 0,
				y: 16,
				scale: .97
			},
			style: {
				background: "#fff",
				borderRadius: 16,
				boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
				width: "100%",
				maxWidth: wide ? 760 : 440,
				overflow: "hidden"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "1rem 1.5rem",
					borderBottom: "1px solid rgba(74,9,24,0.1)",
					background: "rgba(74,9,24,0.02)"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					style: {
						fontFamily: "'Playfair Display',serif",
						fontSize: "1rem",
						fontWeight: 700,
						color: MAROON
					},
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					style: {
						background: "none",
						border: "none",
						cursor: "pointer",
						color: "rgba(74,9,24,0.4)",
						display: "flex",
						padding: 4,
						borderRadius: 6
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 17 })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					padding: "1.25rem 1.5rem 1.5rem",
					maxHeight: "82vh",
					overflowY: "auto"
				},
				children
			})]
		})
	});
}
function Field({ label, error, children, half }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: { gridColumn: half ? void 0 : "span 2" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				style: {
					display: "block",
					fontSize: "0.68rem",
					fontWeight: 600,
					color: MAROON,
					letterSpacing: "0.07em",
					textTransform: "uppercase",
					marginBottom: "0.32rem"
				},
				children: label
			}),
			children,
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: {
					fontSize: "0.68rem",
					color: "#DC2626",
					marginTop: "0.22rem"
				},
				children: error
			})
		]
	});
}
function FInput({ value, onChange, placeholder, type = "text", readOnly }) {
	const [f, setF] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		value,
		readOnly,
		onChange: (e) => onChange(e.target.value),
		onFocus: () => setF(true),
		onBlur: () => setF(false),
		placeholder,
		style: {
			width: "100%",
			border: `1.5px solid ${f ? GOLD : "rgba(74,9,24,0.18)"}`,
			borderRadius: 8,
			outline: "none",
			padding: "8px 11px",
			fontSize: "0.84rem",
			color: MAROON,
			background: readOnly ? "rgba(74,9,24,0.03)" : f ? "rgba(199,154,43,0.02)" : "#fff",
			fontFamily: "Inter,sans-serif",
			boxShadow: f ? `0 0 0 3px rgba(199,154,43,0.1)` : "none",
			transition: "all 0.18s"
		}
	});
}
function StatusBadge({ status }) {
	const cfg = STATUS_CFG[status] || STATUS_CFG.available;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		style: {
			display: "inline-flex",
			alignItems: "center",
			gap: 4,
			fontSize: "0.63rem",
			fontWeight: 700,
			padding: "2px 8px",
			borderRadius: 100,
			background: cfg.bg,
			color: cfg.text
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
			width: 5,
			height: 5,
			borderRadius: "50%",
			background: cfg.dot,
			display: "inline-block"
		} }), cfg.label]
	});
}
function UniqueIdsDrawer({ item }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [ids, setIds] = (0, import_react.useState)([]);
	const [loading, setLoad] = (0, import_react.useState)(false);
	const load = (0, import_react.useCallback)(async () => {
		if (!open) return;
		setLoad(true);
		try {
			const { data } = await getUniqueIds(item.id);
			setIds(data);
		} catch (_e) {} finally {
			setLoad(false);
		}
	}, [open, item.id]);
	(0, import_react.useEffect)(() => {
		load();
	}, [open, load]);
	const UID_STATUS = {
		available: {
			color: "#15803D",
			bg: "rgba(22,163,74,0.08)"
		},
		reserved: {
			color: "#7C3AED",
			bg: "rgba(139,92,246,0.08)"
		},
		disposed: {
			color: "#9CA3AF",
			bg: "rgba(107,114,128,0.08)"
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: { marginTop: 4 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setOpen((o) => !o),
			style: {
				display: "inline-flex",
				alignItems: "center",
				gap: 5,
				fontSize: "0.68rem",
				fontWeight: 600,
				color: GOLD,
				background: "rgba(199,154,43,0.08)",
				border: `1px solid rgba(199,154,43,0.2)`,
				borderRadius: 6,
				padding: "3px 9px",
				cursor: "pointer"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiHash, { size: 11 }),
				item.uniqueIdCount || 0,
				" unique IDs",
				open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronUp, { size: 11 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronDown, { size: 11 })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				opacity: 0,
				height: 0
			},
			animate: {
				opacity: 1,
				height: "auto"
			},
			exit: {
				opacity: 0,
				height: 0
			},
			style: { overflow: "hidden" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					marginTop: 8,
					display: "flex",
					flexWrap: "wrap",
					gap: 5
				},
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: {
						fontSize: "0.72rem",
						color: "rgba(74,9,24,0.4)"
					},
					children: "Loading…"
				}) : ids.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: {
						fontSize: "0.72rem",
						color: "rgba(74,9,24,0.4)"
					},
					children: "No unique IDs found"
				}) : ids.map((uid) => {
					const sc = UID_STATUS[uid.status] || UID_STATUS.available;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						title: uid.condition,
						style: {
							fontSize: "0.67rem",
							fontWeight: 700,
							fontFamily: "monospace",
							padding: "2px 7px",
							borderRadius: 5,
							background: sc.bg,
							color: sc.color,
							border: `1px solid ${sc.color}22`
						},
						children: uid.uniqueNo
					}, uid.id);
				})
			})
		}) })]
	});
}
function SMPInventory() {
	const { isStorekeeper, isAdmin } = useSMP();
	const [items, setItems] = (0, import_react.useState)([]);
	const [cats, setCats] = (0, import_react.useState)([]);
	const [loading, setLoad] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	const [catF, setCatF] = (0, import_react.useState)("All");
	const [stF, setStF] = (0, import_react.useState)("All");
	const [modal, setModal] = (0, import_react.useState)(null);
	const [target, setTarget] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(BLANK);
	const [errs, setErrs] = (0, import_react.useState)({});
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [toast, setToast] = (0, import_react.useState)(null);
	const [showVal, setShowVal] = (0, import_react.useState)(false);
	const [uniqueIdInputs, setUniqueIdInputs] = (0, import_react.useState)([]);
	const showToast = (msg, type = "success") => {
		setToast({
			msg,
			type
		});
		setTimeout(() => setToast(null), 3200);
	};
	const load = (0, import_react.useCallback)(async () => {
		setLoad(true);
		try {
			const [{ data: its }, { data: cs }] = await Promise.all([getItems(), getCategories()]);
			setItems(its);
			setCats(cs);
		} finally {
			setLoad(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	const visible = items.filter((i) => catF === "All" || i.category === catF).filter((i) => stF === "All" || i.status === stF).filter((i) => {
		const q = search.toLowerCase();
		return !q || i.name.toLowerCase().includes(q) || i.sku.toLowerCase().includes(q) || i.category.toLowerCase().includes(q);
	});
	const validate = () => {
		const e = {};
		if (!form.name.trim()) e.name = "Required";
		if (form.qty === "" || Number(form.qty) <= 0) e.qty = "Must be > 0";
		if (modal === "add") {
			const qty = Number(form.qty);
			const filled = uniqueIdInputs.filter((v) => v.trim());
			if (filled.length !== qty) e.uniqueIds = `Enter exactly ${qty} unique ID${qty !== 1 ? "s" : ""} (${filled.length} entered)`;
			else {
				const dupes = filled.filter((v, i) => filled.indexOf(v) !== i);
				if (dupes.length) e.uniqueIds = `Duplicate IDs: ${[...new Set(dupes)].join(", ")}`;
			}
		}
		setErrs(e);
		return Object.keys(e).length === 0;
	};
	const handleSave = async () => {
		if (!validate()) return;
		setSaving(true);
		try {
			const payload = {
				...form,
				qty: Number(form.qty),
				purchaseValue: Number(form.purchaseValue) || 0,
				currentValue: Number(form.currentValue) || 0
			};
			if (modal === "add") {
				payload.uniqueIds = uniqueIdInputs.map((v) => v.trim());
				await createItem(payload);
			} else await updateItem(target.id, payload);
			showToast(modal === "add" ? "Item added successfully" : "Item updated successfully");
			setModal(null);
			load();
		} catch (e) {
			showToast(e.response?.data?.error || "Error saving item", "error");
		} finally {
			setSaving(false);
		}
	};
	const handleDelete = async () => {
		setSaving(true);
		try {
			await deleteItem(target.id);
			showToast("Item removed", "error");
			setModal(null);
			load();
		} catch (e) {
			showToast(e.response?.data?.error || "Error deleting item", "error");
		} finally {
			setSaving(false);
		}
	};
	const openAdd = () => {
		setForm({
			...BLANK,
			category: cats[0]?.name || "Stationery"
		});
		setErrs({});
		setTarget(null);
		setUniqueIdInputs([]);
		setModal("add");
	};
	const openEdit = (i) => {
		setForm({
			...i,
			qty: String(i.qty),
			purchaseValue: String(i.purchaseValue || ""),
			currentValue: String(i.currentValue || "")
		});
		setErrs({});
		setTarget(i);
		setModal("edit");
	};
	const openDel = (i) => {
		setTarget(i);
		setModal("delete");
	};
	const catList = ["All", ...cats.map((c) => c.name)];
	const statusList = ["All", ...Object.keys(STATUS_CFG)];
	const fmtVal = (v) => v ? `Rs. ${Number(v).toLocaleString("en-LK")}` : "—";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				flexWrap: "wrap",
				gap: 10,
				marginBottom: "1rem",
				alignItems: "center"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						flex: "1 1 200px",
						position: "relative",
						border: "1.5px solid rgba(74,9,24,0.15)",
						borderRadius: 8,
						background: CREAM,
						display: "flex",
						alignItems: "center"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiSearch, {
							size: 13,
							style: {
								position: "absolute",
								left: 10,
								color: "rgba(74,9,24,0.4)"
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: search,
							onChange: (e) => setSearch(e.target.value),
							placeholder: "Search name, SKU, category…",
							style: {
								border: "none",
								outline: "none",
								background: "transparent",
								padding: "8px 8px 8px 30px",
								width: "100%",
								fontSize: "0.82rem",
								color: MAROON,
								fontFamily: "Inter,sans-serif"
							}
						}),
						search && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSearch(""),
							style: {
								background: "none",
								border: "none",
								cursor: "pointer",
								padding: "0 8px",
								color: "rgba(74,9,24,0.4)",
								display: "flex"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 13 })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "flex",
						gap: 5,
						flexWrap: "wrap"
					},
					children: catList.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						label: c,
						active: catF === c,
						onClick: () => setCatF(c)
					}, c))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "flex",
						gap: 5,
						flexWrap: "wrap"
					},
					children: statusList.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						label: s === "All" ? "All Status" : STATUS_CFG[s]?.label || s,
						active: stF === s,
						onClick: () => setStF(s),
						color: s !== "All" ? STATUS_CFG[s]?.text : void 0
					}, s))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						gap: 8,
						marginLeft: "auto",
						alignItems: "center"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setShowVal((v) => !v),
							title: "Toggle value columns",
							style: {
								...ghostBtn,
								gap: 5
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiDollarSign, { size: 13 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { fontSize: "0.75rem" },
								children: showVal ? "Hide" : "Values"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: load,
							style: ghostBtn,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiRefreshCw, { size: 13 })
						}),
						isStorekeeper && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: openAdd,
							style: primaryBtn,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPlus, { size: 13 }), " Add Item"]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				background: "#fff",
				borderRadius: 12,
				border: "1px solid rgba(74,9,24,0.1)",
				boxShadow: "0 2px 12px rgba(74,9,24,0.06)",
				overflow: "hidden"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					padding: "0.65rem 1.1rem",
					borderBottom: "1px solid rgba(74,9,24,0.07)",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					style: {
						fontSize: "0.75rem",
						color: "rgba(74,9,24,0.5)"
					},
					children: [
						"Showing ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							style: { color: MAROON },
							children: visible.length
						}),
						" of ",
						items.length,
						" items"
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { overflowX: "auto" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					style: {
						width: "100%",
						borderCollapse: "collapse"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: [
						"Item Name",
						"SKU",
						"Category",
						"Qty",
						"Available",
						"Condition",
						"Status",
						...showVal ? ["Purchase Val", "Current Val"] : [],
						"Unique IDs",
						""
					].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						style: {
							padding: "9px 12px",
							textAlign: "left",
							fontFamily: "'Cinzel',serif",
							fontSize: "0.62rem",
							letterSpacing: "0.09em",
							color: "rgba(74,9,24,0.5)",
							fontWeight: 600,
							borderBottom: "1px solid rgba(74,9,24,0.1)",
							background: "rgba(74,9,24,0.025)",
							whiteSpace: "nowrap"
						},
						children: h
					}, h)) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: loading ? Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 12,
						style: { padding: "10px 12px" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
							height: 22,
							background: "rgba(74,9,24,0.06)",
							borderRadius: 4,
							animation: "pulse 1.5s ease-in-out infinite"
						} })
					}) }, i)) : visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						colSpan: 12,
						style: {
							textAlign: "center",
							padding: "3rem",
							color: "rgba(74,9,24,0.35)",
							fontSize: "0.85rem"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPackage, {
							size: 28,
							style: {
								display: "block",
								margin: "0 auto 0.5rem",
								opacity: .3
							}
						}), "No items found"]
					}) }) : visible.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						style: {
							borderBottom: "1px solid rgba(74,9,24,0.05)",
							background: idx % 2 === 0 ? "#fff" : "rgba(252,251,250,0.6)",
							transition: "background 0.12s"
						},
						onMouseEnter: (e) => e.currentTarget.style.background = "rgba(199,154,43,0.04)",
						onMouseLeave: (e) => e.currentTarget.style.background = idx % 2 === 0 ? "#fff" : "rgba(252,251,250,0.6)",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: { padding: "10px 12px" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontWeight: 600,
										color: MAROON,
										fontSize: "0.83rem"
									},
									children: item.name
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: { padding: "10px 12px" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
									style: {
										fontSize: "0.7rem",
										color: "rgba(74,9,24,0.55)",
										background: "rgba(74,9,24,0.06)",
										padding: "2px 6px",
										borderRadius: 4
									},
									children: item.sku
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									padding: "10px 12px",
									fontSize: "0.79rem",
									color: "rgba(74,9,24,0.7)"
								},
								children: item.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									padding: "10px 12px",
									fontWeight: 700,
									color: item.qty === 0 ? "#B91C1C" : MAROON,
									fontSize: "0.88rem"
								},
								children: item.qty
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									padding: "10px 12px",
									fontWeight: 600,
									color: "rgba(74,9,24,0.7)",
									fontSize: "0.84rem"
								},
								children: item.availableQty ?? item.qty
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									padding: "10px 12px",
									fontSize: "0.75rem",
									color: "rgba(74,9,24,0.6)"
								},
								children: item.condition
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: { padding: "10px 12px" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: item.status })
							}),
							showVal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									padding: "10px 12px",
									fontSize: "0.75rem",
									color: "rgba(74,9,24,0.6)"
								},
								children: fmtVal(item.purchaseValue)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									padding: "10px 12px",
									fontSize: "0.75rem",
									color: "rgba(74,9,24,0.6)"
								},
								children: fmtVal(item.currentValue)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: { padding: "10px 12px" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UniqueIdsDrawer, { item })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: { padding: "10px 12px" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										gap: 5,
										justifyContent: "flex-end"
									},
									children: [isStorekeeper && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IBtn, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEdit2, { size: 12 }),
										color: GOLD,
										onClick: () => openEdit(item)
									}), isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IBtn, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, { size: 12 }),
										color: "#DC2626",
										onClick: () => openDel(item)
									})]
								})
							})
						]
					}, item.id)) })]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: (modal === "add" || modal === "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
			title: modal === "add" ? "Add New Item" : "Edit Item",
			onClose: () => setModal(null),
			wide: true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: "0.85rem"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Item Name *",
							error: errs.name,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
								value: form.name,
								onChange: (v) => setForm((f) => ({
									...f,
									name: v
								})),
								placeholder: "e.g. Office Chair"
							})
						}),
						modal === "edit" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "SKU",
							half: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									padding: "8px 11px",
									border: "1.5px solid rgba(74,9,24,0.1)",
									borderRadius: 8,
									background: "rgba(74,9,24,0.03)",
									fontSize: "0.82rem",
									color: "rgba(74,9,24,0.5)",
									fontFamily: "monospace"
								},
								children: form.sku
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Category",
							half: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: form.category,
								onChange: (e) => setForm((f) => ({
									...f,
									category: e.target.value
								})),
								style: selectSt,
								children: cats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c.name }, c.id))
							})
						}),
						modal === "add" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Initial Quantity *",
							half: true,
							error: errs.qty,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
								value: form.qty,
								onChange: (v) => setForm((f) => ({
									...f,
									qty: v
								})),
								placeholder: "0",
								type: "number"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Condition",
							half: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: form.condition,
								onChange: (e) => setForm((f) => ({
									...f,
									condition: e.target.value
								})),
								style: selectSt,
								children: COND.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Description",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: form.description,
								onChange: (e) => setForm((f) => ({
									...f,
									description: e.target.value
								})),
								placeholder: "Optional description",
								rows: 2,
								style: {
									width: "100%",
									border: "1.5px solid rgba(74,9,24,0.18)",
									borderRadius: 8,
									outline: "none",
									padding: "8px 11px",
									fontSize: "0.84rem",
									color: MAROON,
									fontFamily: "Inter,sans-serif",
									resize: "vertical"
								}
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								gridColumn: "span 2",
								borderTop: "1px solid rgba(74,9,24,0.08)",
								paddingTop: "0.75rem",
								marginTop: "0.25rem"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								style: {
									fontSize: "0.7rem",
									fontWeight: 700,
									color: GOLD,
									textTransform: "uppercase",
									letterSpacing: "0.08em",
									marginBottom: "0.75rem",
									display: "flex",
									alignItems: "center",
									gap: 5
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiDollarSign, { size: 12 }), " Financial Value Tracking"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									display: "grid",
									gridTemplateColumns: "1fr 1fr",
									gap: "0.75rem"
								},
								children: [["Purchase Value (Rs.)", "purchaseValue"], ["Current Value (Rs.)", "currentValue"]].map(([label, key]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									style: {
										display: "block",
										fontSize: "0.65rem",
										fontWeight: 600,
										color: "rgba(74,9,24,0.55)",
										letterSpacing: "0.06em",
										textTransform: "uppercase",
										marginBottom: "0.28rem"
									},
									children: label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
									value: form[key],
									onChange: (v) => setForm((f) => ({
										...f,
										[key]: v
									})),
									placeholder: "0",
									type: "number"
								})] }, key))
							})]
						})
					]
				}),
				modal === "add" && (() => {
					const qty = Math.max(0, parseInt(form.qty) || 0);
					const inputs = Array.from({ length: qty }, (_, i) => uniqueIdInputs[i] ?? "");
					return qty > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							marginTop: "0.85rem",
							borderTop: "1px solid rgba(74,9,24,0.08)",
							paddingTop: "0.85rem"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: 6,
									marginBottom: "0.65rem"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiHash, {
									size: 13,
									color: GOLD
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									style: {
										fontSize: "0.7rem",
										fontWeight: 700,
										color: GOLD,
										textTransform: "uppercase",
										letterSpacing: "0.08em"
									},
									children: ["Unique Item IDs ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										style: {
											color: "rgba(74,9,24,0.4)",
											fontWeight: 400,
											textTransform: "none",
											letterSpacing: 0
										},
										children: [
											"— one per physical unit (",
											qty,
											" required)"
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									display: "grid",
									gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
									gap: 8
								},
								children: inputs.map((val, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									style: {
										display: "block",
										fontSize: "0.63rem",
										color: "rgba(74,9,24,0.5)",
										marginBottom: "0.2rem",
										fontWeight: 600
									},
									children: ["Unit ", i + 1]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: val,
									onChange: (e) => {
										const next = Array.from({ length: qty }, (_, j) => uniqueIdInputs[j] ?? "");
										next[i] = e.target.value;
										setUniqueIdInputs(next);
									},
									placeholder: `e.g. CHAIR-${String(i + 1).padStart(3, "0")}`,
									style: {
										width: "100%",
										border: `1.5px solid ${val.trim() ? GOLD : "rgba(74,9,24,0.18)"}`,
										borderRadius: 8,
										outline: "none",
										padding: "7px 10px",
										fontSize: "0.82rem",
										color: MAROON,
										fontFamily: "monospace",
										background: "#fff",
										boxSizing: "border-box",
										transition: "border-color 0.15s"
									},
									onFocus: (e) => e.target.style.borderColor = GOLD,
									onBlur: (e) => e.target.style.borderColor = val.trim() ? GOLD : "rgba(74,9,24,0.18)"
								})] }, i))
							}),
							errs.uniqueIds && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									fontSize: "0.72rem",
									color: "#DC2626",
									marginTop: "0.4rem"
								},
								children: errs.uniqueIds
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							marginTop: "0.75rem",
							background: "rgba(74,9,24,0.03)",
							border: "1px solid rgba(74,9,24,0.1)",
							borderRadius: 8,
							padding: "9px 12px"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontSize: "0.72rem",
								color: "rgba(74,9,24,0.45)"
							},
							children: "Enter a quantity above to assign unique item IDs."
						})
					});
				})(),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						justifyContent: "flex-end",
						gap: 10,
						marginTop: "1.25rem",
						paddingTop: "1rem",
						borderTop: "1px solid rgba(74,9,24,0.08)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setModal(null),
						style: ghostBtn,
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleSave,
						disabled: saving,
						style: primaryBtn,
						children: saving ? "Saving…" : modal === "add" ? "Add Item" : "Save Changes"
					})]
				})
			]
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: modal === "delete" && target && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
			title: "Remove Item",
			onClose: () => setModal(null),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					textAlign: "center",
					padding: "0.5rem 0"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						width: 50,
						height: 50,
						borderRadius: "50%",
						background: "rgba(220,38,38,0.1)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						margin: "0 auto 1rem"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, {
						size: 20,
						color: "#DC2626"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					style: {
						fontSize: "0.87rem",
						color: "rgba(74,9,24,0.7)",
						lineHeight: 1.7
					},
					children: [
						"Remove ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							style: { color: MAROON },
							children: target.name
						}),
						"?",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								fontSize: "0.78rem",
								color: "rgba(74,9,24,0.5)"
							},
							children: "All associated unique IDs will also be removed. This cannot be undone."
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					justifyContent: "center",
					gap: 10,
					marginTop: "1.25rem",
					paddingTop: "1rem",
					borderTop: "1px solid rgba(74,9,24,0.08)"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setModal(null),
					style: ghostBtn,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleDelete,
					disabled: saving,
					style: {
						...primaryBtn,
						background: "linear-gradient(135deg,#B91C1C 0%,#DC2626 100%)",
						boxShadow: "0 4px 16px rgba(185,28,28,0.3)"
					},
					children: saving ? "Removing…" : "Remove Item"
				})]
			})]
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: toast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				opacity: 0,
				y: 20,
				scale: .95
			},
			animate: {
				opacity: 1,
				y: 0,
				scale: 1
			},
			exit: {
				opacity: 0,
				y: 20
			},
			style: {
				position: "fixed",
				bottom: "1.5rem",
				right: "1.5rem",
				background: "#fff",
				border: `1.5px solid ${toast.type === "error" ? "rgba(220,38,38,0.25)" : "rgba(22,163,74,0.25)"}`,
				borderRadius: 10,
				padding: "10px 16px",
				boxShadow: "0 8px 28px rgba(0,0,0,0.12)",
				zIndex: 9999,
				fontSize: "0.82rem",
				color: MAROON,
				fontWeight: 500,
				display: "flex",
				alignItems: "center",
				gap: 8
			},
			children: toast.msg
		}) })
	] });
}
var Chip = ({ label, active, onClick, color }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
	onClick,
	style: {
		fontSize: "0.7rem",
		fontWeight: active ? 700 : 500,
		padding: "4px 11px",
		borderRadius: 100,
		cursor: "pointer",
		border: `1.5px solid ${active ? GOLD : "rgba(74,9,24,0.15)"}`,
		background: active ? GOLD : "transparent",
		color: active ? "#fff" : color || "rgba(74,9,24,0.6)",
		transition: "all 0.15s",
		fontFamily: "Inter,sans-serif",
		whiteSpace: "nowrap"
	},
	children: label
});
var IBtn = ({ icon, color, onClick }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
	onClick,
	style: {
		width: 28,
		height: 28,
		borderRadius: 7,
		cursor: "pointer",
		background: `${color}12`,
		border: `1px solid ${color}28`,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		color,
		transition: "all 0.15s"
	},
	onMouseEnter: (e) => {
		e.currentTarget.style.background = `${color}22`;
	},
	onMouseLeave: (e) => {
		e.currentTarget.style.background = `${color}12`;
	},
	children: icon
});
var primaryBtn = {
	display: "inline-flex",
	alignItems: "center",
	gap: 6,
	padding: "8px 16px",
	borderRadius: 8,
	border: "none",
	cursor: "pointer",
	background: `linear-gradient(135deg,${MAROON} 0%,#6E1528 100%)`,
	color: "#fff",
	fontSize: "0.8rem",
	fontWeight: 600,
	boxShadow: `0 4px 14px rgba(74,9,24,0.25)`,
	fontFamily: "Inter,sans-serif"
};
var ghostBtn = {
	display: "inline-flex",
	alignItems: "center",
	gap: 6,
	padding: "8px 14px",
	borderRadius: 8,
	cursor: "pointer",
	border: "1.5px solid rgba(74,9,24,0.18)",
	background: "#fff",
	color: MAROON,
	fontSize: "0.8rem",
	fontWeight: 500,
	fontFamily: "Inter,sans-serif"
};
var selectSt = {
	width: "100%",
	border: "1.5px solid rgba(74,9,24,0.18)",
	borderRadius: 8,
	outline: "none",
	padding: "8px 11px",
	fontSize: "0.84rem",
	color: MAROON,
	background: "#fff",
	fontFamily: "Inter,sans-serif",
	cursor: "pointer"
};
var SplitComponent = SMPInventory;
//#endregion
export { SplitComponent as component };
