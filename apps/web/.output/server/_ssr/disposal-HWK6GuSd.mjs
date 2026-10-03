import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react+tanstack__react-query.mjs";
import { AnimatePresence, motion } from "../_libs/framer-motion.mjs";
import { FiAlertTriangle, FiCheckCircle, FiHash, FiPlus, FiRefreshCw, FiSearch, FiTrash2, FiX } from "../_libs/react-icons.mjs";
import { approveDisposal, createDisposal, getDisposals, getItems, getUniqueIds, updateDisposalStatus } from "./smpApi-B7J5_1vM.mjs";
import { useSMP } from "./SMPContext-082lc8Y9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/disposal-HWK6GuSd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAROON = "#4A0918";
var GOLD = "#C79A2B";
var STATUS_CFG = {
	pending_approval: {
		label: "Pending Approval",
		color: "#F59E0B",
		bg: "rgba(245,158,11,0.1)"
	},
	approved: {
		label: "Approved",
		color: "#3B82F6",
		bg: "rgba(59,130,246,0.1)"
	},
	disposed: {
		label: "Disposed",
		color: "#6B7280",
		bg: "rgba(107,114,128,0.1)"
	},
	recycled: {
		label: "Recycled",
		color: "#10B981",
		bg: "rgba(16,185,129,0.1)"
	},
	auctioned: {
		label: "Auctioned",
		color: "#6366F1",
		bg: "rgba(99,102,241,0.1)"
	},
	written_off: {
		label: "Written Off",
		color: "#EF4444",
		bg: "rgba(239,68,68,0.1)"
	}
};
var DISPOSAL_METHODS = [
	"Disposal",
	"Recycling",
	"Auction",
	"Write-Off",
	"Donation",
	"Return to Supplier"
];
var DISPOSAL_REASONS = [
	"Broken / Non-functional",
	"Damaged beyond repair",
	"Expired / Outdated",
	"Obsolete equipment",
	"End of useful life",
	"Surplus stock",
	"Other"
];
var BLANK_FORM = {
	itemId: "",
	uniqueItemIds: [],
	qty: "",
	disposalReason: "",
	disposalMethod: "",
	institute: "",
	authorizedBy: "",
	disposalNotes: "",
	estimatedDisposalValue: ""
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
				y: 16
			},
			style: {
				background: "#fff",
				borderRadius: 16,
				boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
				width: "100%",
				maxWidth: wide ? 680 : 460,
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
var FF = ({ label, value, onChange, placeholder, type = "text", required, children }) => {
	const [f, setF] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: { marginBottom: "0.8rem" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			style: {
				display: "block",
				fontSize: "0.68rem",
				fontWeight: 600,
				color: MAROON,
				letterSpacing: "0.07em",
				textTransform: "uppercase",
				marginBottom: "0.3rem"
			},
			children: [label, required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: { color: "#DC2626" },
				children: " *"
			})]
		}), children || /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type,
			value,
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
				background: f ? "rgba(199,154,43,0.02)" : "#fff",
				fontFamily: "Inter,sans-serif",
				boxShadow: f ? `0 0 0 3px rgba(199,154,43,0.1)` : "none",
				transition: "all 0.18s"
			}
		})]
	});
};
function UniqueIdSelector({ itemId, qty, selected, onChange }) {
	const [ids, setIds] = (0, import_react.useState)([]);
	const [loading, setLoad] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!itemId) {
			setIds([]);
			return;
		}
		setLoad(true);
		getUniqueIds(itemId).then((r) => setIds(r.data.filter((u) => u.status === "available"))).catch(() => {}).finally(() => setLoad(false));
	}, [itemId]);
	const toggle = (id) => {
		if (selected.includes(id)) onChange(selected.filter((x) => x !== id));
		else if (selected.length < Number(qty)) onChange([...selected, id]);
	};
	if (!itemId || ids.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FF, {
		label: "Select Specific Units (optional)",
		children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			style: {
				fontSize: "0.75rem",
				color: "rgba(74,9,24,0.4)"
			},
			children: "Loading…"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				display: "flex",
				flexWrap: "wrap",
				gap: 6,
				maxHeight: 110,
				overflowY: "auto",
				border: "1.5px solid rgba(74,9,24,0.12)",
				borderRadius: 8,
				padding: "8px 10px",
				background: "#FAFAFA"
			},
			children: ids.map((uid) => {
				const isSel = selected.includes(uid.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => toggle(uid.id),
					style: {
						fontSize: "0.67rem",
						fontWeight: 700,
						fontFamily: "monospace",
						padding: "3px 8px",
						borderRadius: 5,
						cursor: "pointer",
						background: isSel ? "#DC2626" : "rgba(74,9,24,0.06)",
						color: isSel ? "#fff" : MAROON,
						border: `1px solid ${isSel ? "#DC2626" : "rgba(74,9,24,0.15)"}`,
						transition: "all 0.15s"
					},
					children: uid.uniqueNo
				}, uid.id);
			})
		}), selected.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			style: {
				fontSize: "0.68rem",
				color: "#DC2626",
				marginTop: 5,
				fontWeight: 600
			},
			children: [
				selected.length,
				" unit",
				selected.length > 1 ? "s" : "",
				" selected for disposal"
			]
		})]
	});
}
function SMPDisposal() {
	const { isStorekeeper, isAdmin } = useSMP();
	const [rows, setRows] = (0, import_react.useState)([]);
	const [items, setItems] = (0, import_react.useState)([]);
	const [loading, setLoad] = (0, import_react.useState)(true);
	const [statusF, setStatusF] = (0, import_react.useState)("pending_approval");
	const [search, setSearch] = (0, import_react.useState)("");
	const [modal, setModal] = (0, import_react.useState)(null);
	const [target, setTarget] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(BLANK_FORM);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)("");
	const [toast, setToast] = (0, import_react.useState)(null);
	const [newStatus, setNewStatus] = (0, import_react.useState)("");
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
			const [{ data: ds }, { data: its }] = await Promise.all([getDisposals(), getItems()]);
			setRows(ds);
			setItems(its);
		} finally {
			setLoad(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	const visible = rows.filter((r) => statusF === "all" || r.status === statusF).filter((r) => {
		if (!search) return true;
		const q = search.toLowerCase();
		return r.itemName?.toLowerCase().includes(q) || r.institute?.toLowerCase().includes(q) || r.disposedBy?.toLowerCase().includes(q);
	});
	const handleCreate = async (e) => {
		e.preventDefault();
		if (!form.itemId) return setErr("Select an item");
		if (!form.qty || Number(form.qty) <= 0) return setErr("Quantity must be > 0");
		if (!form.disposalReason) return setErr("Disposal reason required");
		if (!form.disposalMethod) return setErr("Disposal method required");
		setErr("");
		setSaving(true);
		try {
			await createDisposal({
				...form,
				qty: Number(form.qty)
			});
			showToast("Disposal record created — awaiting approval");
			setModal(null);
			setForm(BLANK_FORM);
			load();
		} catch (e) {
			setErr(e.response?.data?.error || "Error creating disposal record");
		} finally {
			setSaving(false);
		}
	};
	const handleApprove = async (id) => {
		setSaving(true);
		try {
			await approveDisposal(id);
			showToast("Disposal approved");
			load();
		} catch (e) {
			showToast(e.response?.data?.error || "Error", "error");
		} finally {
			setSaving(false);
		}
	};
	const handleUpdateStatus = async () => {
		if (!newStatus) return;
		setSaving(true);
		try {
			await updateDisposalStatus(target.id, { status: newStatus });
			showToast("Status updated");
			setModal(null);
			load();
		} catch (e) {
			showToast(e.response?.data?.error || "Error", "error");
		} finally {
			setSaving(false);
		}
	};
	const selectedItem = items.find((i) => i.id === form.itemId);
	const fmtDate = (d) => d ? new Date(d).toLocaleDateString("en-LK", { dateStyle: "medium" }) : "—";
	const fmtVal = (v) => v ? `Rs. ${Number(v).toLocaleString("en-LK")}` : "—";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				background: "rgba(220,38,38,0.04)",
				border: "1px solid rgba(220,38,38,0.15)",
				borderRadius: 10,
				padding: "10px 14px",
				marginBottom: "1rem",
				display: "flex",
				alignItems: "center",
				gap: 8
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAlertTriangle, {
				size: 14,
				color: "#DC2626",
				style: { flexShrink: 0 }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: {
					fontSize: "0.78rem",
					color: "rgba(74,9,24,0.6)"
				},
				children: "Disposal records permanently reduce inventory. Admin approval required before items are finalized as disposed."
			})]
		}),
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
						flex: "1 1 180px",
						position: "relative",
						border: "1.5px solid rgba(74,9,24,0.15)",
						borderRadius: 8,
						background: "#FCFBFA",
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
							placeholder: "Search item, institute…",
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
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 12 })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "flex",
						gap: 5,
						flexWrap: "wrap"
					},
					children: [
						{
							key: "pending_approval",
							label: "Pending"
						},
						{
							key: "approved",
							label: "Approved"
						},
						{
							key: "disposed",
							label: "Disposed"
						},
						{
							key: "recycled",
							label: "Recycled"
						},
						{
							key: "auctioned",
							label: "Auctioned"
						},
						{
							key: "written_off",
							label: "Written Off"
						},
						{
							key: "all",
							label: "All"
						}
					].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setStatusF(t.key),
						style: {
							fontSize: "0.7rem",
							fontWeight: statusF === t.key ? 700 : 500,
							padding: "5px 12px",
							borderRadius: 100,
							cursor: "pointer",
							border: `1.5px solid ${statusF === t.key ? GOLD : "rgba(74,9,24,0.15)"}`,
							background: statusF === t.key ? GOLD : "transparent",
							color: statusF === t.key ? "#fff" : "rgba(74,9,24,0.6)",
							transition: "all 0.15s",
							fontFamily: "Inter,sans-serif",
							whiteSpace: "nowrap"
						},
						children: [
							t.label,
							" (",
							rows.filter((r) => t.key === "all" ? true : r.status === t.key).length,
							")"
						]
					}, t.key))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						gap: 8,
						marginLeft: "auto"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: load,
						style: ghostBtn,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiRefreshCw, { size: 13 })
					}), isStorekeeper && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							setForm(BLANK_FORM);
							setErr("");
							setModal("create");
						},
						style: primaryBtn,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPlus, { size: 13 }), " Record Disposal"]
					})]
				})
			]
		}),
		loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				textAlign: "center",
				padding: "3rem",
				color: "rgba(74,9,24,0.35)"
			},
			children: "Loading…"
		}) : visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				textAlign: "center",
				padding: "3rem",
				background: "#fff",
				borderRadius: 12,
				border: "1px solid rgba(74,9,24,0.08)",
				color: "rgba(74,9,24,0.35)",
				fontSize: "0.85rem"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, {
				size: 28,
				style: {
					display: "block",
					margin: "0 auto 0.75rem",
					opacity: .25
				}
			}), "No disposal records found"]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				display: "flex",
				flexDirection: "column",
				gap: 10
			},
			children: visible.map((r) => {
				const sc = STATUS_CFG[r.status] || STATUS_CFG.pending_approval;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 8
					},
					animate: {
						opacity: 1,
						y: 0
					},
					style: {
						background: "#fff",
						borderRadius: 12,
						border: "1px solid rgba(74,9,24,0.09)",
						boxShadow: "0 2px 8px rgba(74,9,24,0.05)",
						overflow: "hidden"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							padding: "11px 16px",
							borderBottom: "1px solid rgba(74,9,24,0.07)",
							display: "flex",
							alignItems: "center",
							gap: 12,
							flexWrap: "wrap"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									width: 34,
									height: 34,
									borderRadius: 9,
									background: `${sc.color}14`,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									flexShrink: 0
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, {
									size: 15,
									color: sc.color
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									flex: 1,
									minWidth: 0
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									style: {
										fontWeight: 700,
										color: MAROON,
										fontSize: "0.88rem"
									},
									children: r.itemName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									style: {
										fontSize: "0.68rem",
										color: "rgba(74,9,24,0.45)"
									},
									children: [
										r.sku,
										" · ",
										r.qty,
										" units · ",
										r.category
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: "0.64rem",
									fontWeight: 700,
									padding: "2px 8px",
									borderRadius: 100,
									background: sc.bg,
									color: sc.color,
									flexShrink: 0
								},
								children: sc.label
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { padding: "11px 16px" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									display: "grid",
									gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
									gap: 10,
									marginBottom: 10
								},
								children: [
									["Disposal Reason", r.disposalReason],
									["Method", r.disposalMethod],
									["Disposed By", r.disposedBy],
									["Date", fmtDate(r.disposalDate)],
									["Authorized By", r.authorizedBy || "—"],
									["Est. Value", fmtVal(r.estimatedDisposalValue)],
									...r.institute ? [["Institute / Dept", r.institute]] : [],
									...r.approvedBy ? [["Approved By", r.approvedBy]] : []
								].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									style: {
										fontSize: "0.61rem",
										fontWeight: 600,
										color: "rgba(74,9,24,0.4)",
										textTransform: "uppercase",
										letterSpacing: "0.05em",
										marginBottom: 2
									},
									children: k
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									style: {
										fontSize: "0.78rem",
										fontWeight: 600,
										color: MAROON
									},
									children: v
								})] }, k))
							}),
							r.uniqueItemIds && r.uniqueItemIds.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									flexWrap: "wrap",
									gap: 5,
									marginBottom: 10
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									style: {
										fontSize: "0.63rem",
										fontWeight: 600,
										color: "rgba(74,9,24,0.4)",
										display: "flex",
										alignItems: "center",
										gap: 4
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiHash, { size: 10 }), " Units:"]
								}), r.uniqueItemIds.map((no) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: "0.65rem",
										fontWeight: 700,
										fontFamily: "monospace",
										padding: "2px 6px",
										borderRadius: 4,
										background: "rgba(220,38,38,0.08)",
										color: "#B91C1C",
										border: "1px solid rgba(220,38,38,0.15)"
									},
									children: no
								}, no))]
							}),
							r.disposalNotes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									fontSize: "0.75rem",
									color: "rgba(74,9,24,0.5)",
									background: "rgba(74,9,24,0.03)",
									borderRadius: 7,
									padding: "6px 10px",
									marginBottom: 10
								},
								children: r.disposalNotes
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									gap: 8,
									flexWrap: "wrap"
								},
								children: [isAdmin && r.status === "pending_approval" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => handleApprove(r.id),
									disabled: saving,
									style: {
										display: "inline-flex",
										alignItems: "center",
										gap: 5,
										padding: "5px 12px",
										borderRadius: 7,
										border: "none",
										cursor: "pointer",
										background: "linear-gradient(135deg,#1D4ED8 0%,#3B82F6 100%)",
										color: "#fff",
										fontSize: "0.74rem",
										fontWeight: 600,
										fontFamily: "Inter,sans-serif",
										boxShadow: "0 3px 10px rgba(59,130,246,0.3)"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheckCircle, { size: 12 }), " Approve"]
								}), isAdmin && ![
									"disposed",
									"recycled",
									"auctioned",
									"written_off"
								].includes(r.status) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setTarget(r);
										setNewStatus("");
										setModal("status");
									},
									style: ghostBtn,
									children: "Update Status"
								})]
							})
						]
					})]
				}, r.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: modal === "create" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
			title: "Record Disposal",
			onClose: () => setModal(null),
			wide: true,
			children: [err && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					alignItems: "center",
					gap: 7,
					background: "rgba(220,38,38,0.07)",
					border: "1px solid rgba(220,38,38,0.2)",
					borderRadius: 8,
					padding: "8px 12px",
					marginBottom: "1rem"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAlertTriangle, {
					size: 13,
					color: "#DC2626",
					style: { flexShrink: 0 }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: {
						fontSize: "0.78rem",
						color: "#DC2626"
					},
					children: err
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleCreate,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: "0 1rem"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: { gridColumn: "span 2" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FF, {
								label: "Item *",
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: form.itemId,
									onChange: (e) => setForm((f) => ({
										...f,
										itemId: e.target.value,
										uniqueItemIds: []
									})),
									style: {
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
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "— Select item —"
									}), items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: i.id,
										children: [
											i.name,
											" (",
											i.sku,
											") — ",
											i.qty,
											" in stock"
										]
									}, i.id))]
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FF, {
							label: "Quantity to Dispose *",
							value: form.qty,
							onChange: (v) => setForm((f) => ({
								...f,
								qty: v,
								uniqueItemIds: []
							})),
							placeholder: "0",
							type: "number",
							required: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FF, {
							label: "Estimated Disposal Value (Rs.)",
							value: form.estimatedDisposalValue,
							onChange: (v) => setForm((f) => ({
								...f,
								estimatedDisposalValue: v
							})),
							placeholder: "0",
							type: "number"
						}),
						form.itemId && form.qty && Number(form.qty) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: { gridColumn: "span 2" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UniqueIdSelector, {
								itemId: form.itemId,
								qty: form.qty,
								selected: form.uniqueItemIds,
								onChange: (ids) => setForm((f) => ({
									...f,
									uniqueItemIds: ids
								}))
							})
						}),
						selectedItem && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								gridColumn: "span 2",
								background: "rgba(220,38,38,0.04)",
								borderRadius: 8,
								padding: "7px 12px",
								marginBottom: "0.5rem"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								style: {
									fontSize: "0.72rem",
									color: "rgba(74,9,24,0.5)"
								},
								children: [
									"Current stock: ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
										style: { color: MAROON },
										children: [
											selectedItem.qty,
											" ",
											selectedItem.unit
										]
									}),
									Number(form.qty) > selectedItem.qty && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											color: "#DC2626",
											fontWeight: 700
										},
										children: " — Cannot exceed available stock!"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FF, {
							label: "Disposal Reason *",
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: form.disposalReason,
								onChange: (e) => setForm((f) => ({
									...f,
									disposalReason: e.target.value
								})),
								style: {
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
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "— Select reason —"
								}), DISPOSAL_REASONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: r }, r))]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FF, {
							label: "Disposal Method *",
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: form.disposalMethod,
								onChange: (e) => setForm((f) => ({
									...f,
									disposalMethod: e.target.value
								})),
								style: {
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
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "— Select method —"
								}), DISPOSAL_METHODS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: m }, m))]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FF, {
							label: "Institute / Division",
							value: form.institute,
							onChange: (v) => setForm((f) => ({
								...f,
								institute: v
							})),
							placeholder: "Requesting division"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FF, {
							label: "Authorized By",
							value: form.authorizedBy,
							onChange: (v) => setForm((f) => ({
								...f,
								authorizedBy: v
							})),
							placeholder: "Authorizing officer"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { gridColumn: "span 2" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								style: {
									display: "block",
									fontSize: "0.68rem",
									fontWeight: 600,
									color: MAROON,
									letterSpacing: "0.07em",
									textTransform: "uppercase",
									marginBottom: "0.3rem"
								},
								children: "Disposal Notes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: form.disposalNotes,
								onChange: (e) => setForm((f) => ({
									...f,
									disposalNotes: e.target.value
								})),
								placeholder: "Additional notes or observations…",
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
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						justifyContent: "flex-end",
						gap: 10,
						marginTop: "1.25rem",
						paddingTop: "1rem",
						borderTop: "1px solid rgba(74,9,24,0.08)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setModal(null),
						style: ghostBtn,
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: saving,
						style: {
							...primaryBtn,
							background: "linear-gradient(135deg,#B91C1C 0%,#DC2626 100%)",
							boxShadow: "0 4px 16px rgba(185,28,28,0.25)"
						},
						children: saving ? "Submitting…" : "Submit for Approval"
					})]
				})]
			})]
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: modal === "status" && target && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
			title: "Update Disposal Status",
			onClose: () => setModal(null),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					style: {
						fontSize: "0.82rem",
						color: "rgba(74,9,24,0.6)",
						marginBottom: "1rem"
					},
					children: [
						"Update status for ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							style: { color: MAROON },
							children: target.itemName
						}),
						" (×",
						target.qty,
						"):"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FF, {
					label: "New Status",
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: newStatus,
						onChange: (e) => setNewStatus(e.target.value),
						style: {
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
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "— Select new status —"
						}), Object.entries(STATUS_CFG).filter(([k]) => k !== target.status).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: k,
							children: v.label
						}, k))]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						justifyContent: "flex-end",
						gap: 10,
						marginTop: "1rem",
						paddingTop: "1rem",
						borderTop: "1px solid rgba(74,9,24,0.08)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setModal(null),
						style: ghostBtn,
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleUpdateStatus,
						disabled: saving || !newStatus,
						style: primaryBtn,
						children: saving ? "Updating…" : "Update Status"
					})]
				})
			]
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: toast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				opacity: 0,
				y: 20
			},
			animate: {
				opacity: 1,
				y: 0
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
				fontWeight: 500
			},
			children: toast.msg
		}) })
	] });
}
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
var SplitComponent = SMPDisposal;
//#endregion
export { SplitComponent as component };
