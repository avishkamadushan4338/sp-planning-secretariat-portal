import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react+tanstack__react-query.mjs";
import { require_react_dom } from "../_libs/@tanstack/react-router+[...].mjs";
import { useNavigate$1 } from "./react-router-dom-shim-Y_PNYd7n.mjs";
import { Toaster, toast } from "../_libs/sonner.mjs";
import { aboutFunctionsApi, aboutHistoryApi, aboutOverviewApi, departmentsApi, faqsApi, homeContentApi, orgStructureApi, siteSettingsApi, staffApi } from "./cmsContentApi-C5pJ-eT_.mjs";
import { resolveUploadUrl } from "./resolveUploadUrl-Bmb9GHFy.mjs";
import { AnimatePresence, motion } from "../_libs/framer-motion.mjs";
import { FiActivity, FiAlertCircle, FiAlertTriangle, FiBarChart2, FiBell, FiBookOpen, FiBriefcase, FiCalendar, FiCheck, FiChevronDown, FiChevronLeft, FiChevronRight, FiChevronUp, FiChevronsLeft, FiClock, FiDownload, FiEdit2, FiExternalLink, FiEye, FiEyeOff, FiFileText, FiGlobe, FiGrid, FiHelpCircle, FiHome, FiImage, FiInbox, FiLayout, FiLock, FiLogOut, FiMail, FiMessageSquare, FiPackage, FiPhone, FiPlus, FiRadio, FiRefreshCw, FiSearch, FiSettings, FiShield, FiStar, FiTag, FiToggleLeft, FiToggleRight, FiTrash2, FiTrendingUp, FiUser, FiX, FiZap } from "../_libs/react-icons.mjs";
import { axios } from "../_libs/axios+[...].mjs";
import { changePassword, changeUsername, getCredentials } from "./cmsAuth-B_i6idnL.mjs";
import { SitePublishContext } from "./SitePublishContextInstance-CHsmS2ZD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-B3aJqVLS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
/**
* CMSHomeNewsBar.jsx
* Admin section — Home News Bar.
* Only fields: description (EN/SI/TA) + status (Active / Draft).
* Max 2 Active items shown on the home page ticker.
*/
var MAROON$11 = "#4A0918";
var GOLD$8 = "#C79A2B";
var API_BASE$1 = "";
async function fetchItems() {
	const res = await fetch(`${API_BASE$1}/api/news-bar`);
	if (!res.ok) throw new Error("Failed to load");
	return res.json();
}
async function persistItems(items) {
	if (!(await fetch(`${API_BASE$1}/api/news-bar`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(items)
	})).ok) throw new Error("Failed to save");
}
var EMPTY_FORM$9 = {
	descriptionEn: "",
	descriptionSi: "",
	descriptionTa: "",
	status: "Active"
};
function CMSHomeNewsBar({ search = "", setSearch = () => {} }) {
	const [items, setItems] = (0, import_react.useState)([]);
	const [formModal, setFormModal] = (0, import_react.useState)(false);
	const [editData, setEditData] = (0, import_react.useState)(null);
	const [viewData, setViewData] = (0, import_react.useState)(null);
	const [deleteModal, setDeleteModal] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		fetchItems().then(setItems).catch(() => toast.error("Could not load news bar items"));
	}, []);
	const saveAndSet = (0, import_react.useCallback)(async (updated, successMsg) => {
		try {
			await persistItems(updated);
			setItems(updated);
			if (successMsg) toast.success(successMsg);
		} catch {
			toast.error("Save failed — check your connection");
		}
	}, []);
	const addItem = (0, import_react.useCallback)(async (form) => {
		const newItem = {
			...EMPTY_FORM$9,
			...form,
			id: Date.now(),
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		await saveAndSet([newItem, ...items], "News bar item added");
		setFormModal(false);
	}, [items, saveAndSet]);
	const updateItem = (0, import_react.useCallback)(async (form) => {
		const updated = items.map((it) => it.id === editData.id ? {
			...it,
			...form,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		} : it);
		await saveAndSet(updated, "News bar item updated");
		setEditData(null);
	}, [
		items,
		editData,
		saveAndSet
	]);
	const toggleStatus = (0, import_react.useCallback)(async (id) => {
		const updated = items.map((it) => it.id === id ? {
			...it,
			status: it.status === "Active" ? "Draft" : "Active",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		} : it);
		await saveAndSet(updated, null);
	}, [items, saveAndSet]);
	const confirmDelete = (id) => {
		const preview = (items.find((r) => r.id === id)?.descriptionEn || "").slice(0, 50) || "this item";
		setDeleteModal({
			id,
			title: preview
		});
	};
	const executeDelete = async () => {
		if (!deleteModal) return;
		const updated = items.filter((it) => it.id !== deleteModal.id);
		await saveAndSet(updated, "Item deleted");
		setDeleteModal(null);
	};
	const q = search.toLowerCase();
	const filtered = items.filter((it) => !q || (it.descriptionEn || "").toLowerCase().includes(q) || (it.status || "").toLowerCase().includes(q));
	const activeCount = items.filter((it) => it.status === "Active").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "flex-start",
				justifyContent: "space-between",
				marginBottom: "1.25rem",
				flexWrap: "wrap",
				gap: 12
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				style: {
					fontFamily: "'Playfair Display', serif",
					fontSize: "1.35rem",
					fontWeight: 800,
					color: MAROON$11,
					marginBottom: 4
				},
				children: "Home News Bar"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				style: {
					fontSize: "0.78rem",
					color: "rgba(74,9,24,0.45)"
				},
				children: [
					items.length,
					" item",
					items.length !== 1 ? "s" : "",
					" total \xA0·\xA0",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						style: {
							color: "#16a34a",
							fontWeight: 600
						},
						children: [
							Math.min(activeCount, 2),
							" of ",
							activeCount,
							" active shown on home"
						]
					})
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					gap: 10,
					alignItems: "center",
					flexWrap: "wrap"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 8,
						background: "#fff",
						border: "1px solid rgba(74,9,24,0.12)",
						borderRadius: 10,
						padding: "7px 12px"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiSearch, {
							size: 13,
							color: "rgba(74,9,24,0.36)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: search,
							onChange: (e) => setSearch(e.target.value),
							placeholder: "Search…",
							style: {
								border: "none",
								outline: "none",
								fontSize: "0.8rem",
								color: MAROON$11,
								background: "transparent",
								width: 140,
								fontFamily: "Inter, sans-serif"
							}
						}),
						search && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSearch(""),
							style: {
								background: "none",
								border: "none",
								cursor: "pointer",
								color: "rgba(74,9,24,0.38)",
								padding: 0,
								display: "flex"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 13 })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
					whileHover: {
						y: -1.5,
						boxShadow: "0 8px 22px rgba(74,9,24,0.34)"
					},
					whileTap: { scale: .97 },
					onClick: () => setFormModal(true),
					style: {
						display: "flex",
						alignItems: "center",
						gap: 7,
						padding: "8px 17px",
						borderRadius: 10,
						border: "none",
						background: `linear-gradient(135deg, ${MAROON$11} 0%, #6E1528 100%)`,
						color: "#fff",
						fontSize: "0.8rem",
						fontWeight: 600,
						cursor: "pointer",
						fontFamily: "Inter, sans-serif",
						boxShadow: "0 3px 12px rgba(74,9,24,0.28)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPlus, { size: 13 }), " Add News Item"]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				background: "rgba(199,154,43,0.07)",
				border: "1px solid rgba(199,154,43,0.22)",
				borderRadius: 12,
				padding: "10px 16px",
				marginBottom: "1.25rem",
				display: "flex",
				gap: 10,
				alignItems: "flex-start"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiStar, {
				size: 14,
				color: GOLD$8,
				style: {
					marginTop: 1,
					flexShrink: 0
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				style: {
					fontSize: "0.77rem",
					color: "rgba(74,9,24,0.65)",
					margin: 0,
					lineHeight: 1.6
				},
				children: [
					"The ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "2 most recently added Active items" }),
					" scroll as a running ticker below the hero section on the home page. Set an item to ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Draft" }),
					" to hide it."
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				background: "#fff",
				borderRadius: 16,
				overflow: "hidden",
				border: "1px solid rgba(74,9,24,0.07)",
				boxShadow: "0 2px 12px rgba(74,9,24,0.05)"
			},
			children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					padding: "4rem",
					textAlign: "center"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							width: 56,
							height: 56,
							borderRadius: 18,
							background: "rgba(74,9,24,0.06)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							margin: "0 auto 1rem"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiFileText, {
							size: 24,
							color: "rgba(74,9,24,0.28)"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontSize: "0.88rem",
							fontWeight: 600,
							color: "rgba(74,9,24,0.38)",
							marginBottom: 6
						},
						children: search ? "No items match your search" : "No news bar items yet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontSize: "0.76rem",
							color: "rgba(74,9,24,0.28)"
						},
						children: search ? "Try a different keyword" : "Click \"Add News Item\" to get started"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { overflowX: "auto" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					style: {
						width: "100%",
						borderCollapse: "collapse"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						style: {
							background: "rgba(74,9,24,0.025)",
							borderBottom: "1px solid rgba(74,9,24,0.08)"
						},
						children: [
							"#",
							"Description (English)",
							"Status",
							"Added",
							"Actions"
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							style: {
								padding: "11px 14px",
								textAlign: "left",
								fontSize: "0.67rem",
								fontWeight: 700,
								color: "rgba(74,9,24,0.42)",
								textTransform: "uppercase",
								letterSpacing: "0.09em",
								whiteSpace: "nowrap"
							},
							children: h
						}, h))
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.tr, {
						initial: {
							opacity: 0,
							y: 6
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: i * .04 },
						style: {
							borderBottom: i < filtered.length - 1 ? "1px solid rgba(74,9,24,0.05)" : "none",
							transition: "background 0.12s"
						},
						onMouseEnter: (e) => e.currentTarget.style.background = "rgba(74,9,24,0.02)",
						onMouseLeave: (e) => e.currentTarget.style.background = "transparent",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									padding: "11px 14px",
									fontSize: "0.76rem",
									color: "rgba(74,9,24,0.32)",
									fontWeight: 600,
									width: 36
								},
								children: i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								style: {
									padding: "11px 14px",
									maxWidth: 360
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: "0.83rem",
										fontWeight: 500,
										color: MAROON$11,
										overflow: "hidden",
										textOverflow: "ellipsis",
										whiteSpace: "nowrap"
									},
									children: item.descriptionEn || /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											color: "rgba(74,9,24,0.3)",
											fontStyle: "italic"
										},
										children: "No English description"
									})
								}), item.descriptionSi && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										fontSize: "0.72rem",
										color: "rgba(74,9,24,0.42)",
										marginTop: 2,
										overflow: "hidden",
										textOverflow: "ellipsis",
										whiteSpace: "nowrap"
									},
									children: ["SI: ", item.descriptionSi]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: { padding: "11px 14px" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => toggleStatus(item.id),
									title: "Click to toggle Active / Draft",
									style: {
										display: "inline-flex",
										alignItems: "center",
										gap: 6,
										padding: "5px 12px",
										borderRadius: 100,
										border: "none",
										cursor: "pointer",
										background: item.status === "Active" ? "rgba(22,101,52,0.1)" : "rgba(180,83,9,0.1)",
										color: item.status === "Active" ? "#166534" : "#92400e",
										fontSize: "0.72rem",
										fontWeight: 700,
										fontFamily: "Inter, sans-serif",
										transition: "all 0.15s"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
										width: 6,
										height: 6,
										borderRadius: "50%",
										flexShrink: 0,
										background: item.status === "Active" ? "#16a34a" : "#d97706"
									} }), item.status]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									padding: "11px 14px",
									fontSize: "0.76rem",
									color: "#9ca3af",
									whiteSpace: "nowrap"
								},
								children: item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-GB", {
									day: "2-digit",
									month: "short",
									year: "numeric"
								}) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: { padding: "11px 14px" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										gap: 6
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setViewData(item),
											title: "View",
											style: iconBtn$6,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEye, { size: 13 })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setEditData(item),
											title: "Edit",
											style: {
												...iconBtn$6,
												color: GOLD$8,
												border: `1px solid ${GOLD$8}38`,
												background: `${GOLD$8}0e`
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEdit2, { size: 13 })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => confirmDelete(item.id),
											title: "Delete",
											style: {
												...iconBtn$6,
												color: "#DC2626",
												border: "1px solid rgba(220,38,38,0.22)",
												background: "rgba(220,38,38,0.07)"
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, { size: 13 })
										})
									]
								})
							})
						]
					}, item.id)) })]
				})
			})
		}),
		(0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: formModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsBarFormModal, {
			onClose: () => setFormModal(false),
			onSave: addItem
		}) }), document.body),
		(0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: editData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsBarFormModal, {
			initialData: editData,
			onClose: () => setEditData(null),
			onSave: updateItem
		}) }), document.body),
		(0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: viewData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewNewsBarModal, {
			item: viewData,
			onClose: () => setViewData(null),
			onEdit: (it) => {
				setViewData(null);
				setEditData(it);
			}
		}) }), document.body),
		(0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: deleteModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			style: overlay,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					scale: .93,
					opacity: 0,
					y: 16
				},
				animate: {
					scale: 1,
					opacity: 1,
					y: 0
				},
				exit: {
					scale: .93,
					opacity: 0,
					y: 16
				},
				transition: {
					duration: .2,
					ease: [
						.16,
						1,
						.3,
						1
					]
				},
				style: {
					background: "#fff",
					borderRadius: 18,
					padding: "1.75rem",
					maxWidth: 420,
					width: "100%",
					boxShadow: "0 24px 64px rgba(0,0,0,0.22)"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						gap: 14,
						alignItems: "flex-start",
						marginBottom: "1.5rem"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							width: 46,
							height: 46,
							borderRadius: 13,
							flexShrink: 0,
							background: "rgba(220,38,38,0.1)",
							border: "1px solid rgba(220,38,38,0.15)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, {
							size: 20,
							color: "#DC2626"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						style: {
							fontFamily: "'Playfair Display', serif",
							fontSize: "1.1rem",
							fontWeight: 800,
							color: MAROON$11,
							marginBottom: "0.3rem"
						},
						children: "Delete Item"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						style: {
							fontSize: "0.83rem",
							color: "rgba(74,9,24,0.55)",
							lineHeight: 1.65
						},
						children: [
							"Delete ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
								style: { color: MAROON$11 },
								children: [
									"\"",
									deleteModal.title,
									"\""
								]
							}),
							"? This cannot be undone."
						]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						gap: 10,
						justifyContent: "flex-end"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setDeleteModal(null),
						style: cancelBtn,
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						whileHover: {
							y: -1,
							boxShadow: "0 6px 20px rgba(220,38,38,0.35)"
						},
						whileTap: { scale: .97 },
						onClick: executeDelete,
						style: deleteBtn,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, { size: 13 }), " Delete"]
					})]
				})]
			})
		}) }), document.body)
	] });
}
var iconBtn$6 = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: 30,
	height: 30,
	borderRadius: 8,
	border: "1px solid rgba(74,9,24,0.13)",
	background: "transparent",
	color: "rgba(74,9,24,0.48)",
	cursor: "pointer",
	transition: "all 0.15s"
};
var overlay = {
	position: "fixed",
	inset: 0,
	background: "rgba(0,0,0,0.48)",
	zIndex: 100,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "1rem"
};
var cancelBtn = {
	padding: "9px 20px",
	borderRadius: 10,
	border: "1px solid rgba(74,9,24,0.14)",
	background: "transparent",
	color: "rgba(74,9,24,0.55)",
	fontSize: "0.83rem",
	cursor: "pointer",
	fontFamily: "Inter, sans-serif",
	fontWeight: 500
};
var deleteBtn = {
	padding: "9px 20px",
	borderRadius: 10,
	border: "none",
	background: "linear-gradient(135deg, #DC2626 0%, #b91c1c 100%)",
	color: "#fff",
	fontSize: "0.83rem",
	cursor: "pointer",
	fontFamily: "Inter, sans-serif",
	fontWeight: 600,
	display: "flex",
	alignItems: "center",
	gap: 7,
	boxShadow: "0 3px 12px rgba(220,38,38,0.3)"
};
function NewsBarFormModal({ onClose, onSave, initialData = null }) {
	const isEdit = initialData !== null;
	const [form, setForm] = (0, import_react.useState)(() => ({
		...EMPTY_FORM$9,
		...initialData || {}
	}));
	const [langTab, setLangTab] = (0, import_react.useState)("en");
	const [error, setError] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const set = (k, v) => setForm((f) => ({
		...f,
		[k]: v
	}));
	(0, import_react.useEffect)(() => {
		const h = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", h);
		return () => window.removeEventListener("keydown", h);
	}, [onClose]);
	const handleSave = () => {
		if (!form.descriptionEn.trim()) {
			setError("English description is required");
			return;
		}
		setSaving(true);
		setTimeout(() => {
			onSave(form);
			setSaving(false);
		}, 120);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		style: overlay,
		onClick: (e) => e.target === e.currentTarget && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .93,
				opacity: 0,
				y: 20
			},
			animate: {
				scale: 1,
				opacity: 1,
				y: 0
			},
			exit: {
				scale: .93,
				opacity: 0,
				y: 20
			},
			transition: {
				duration: .22,
				ease: [
					.16,
					1,
					.3,
					1
				]
			},
			style: {
				background: "#fff",
				borderRadius: 20,
				width: "100%",
				maxWidth: 540,
				maxHeight: "88vh",
				overflow: "hidden",
				boxShadow: "0 30px 80px rgba(0,0,0,0.28)",
				display: "flex",
				flexDirection: "column"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						padding: "1.2rem 1.5rem",
						borderBottom: "1px solid rgba(74,9,24,0.08)",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						flexShrink: 0
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						style: {
							fontFamily: "'Playfair Display', serif",
							fontSize: "1.15rem",
							fontWeight: 800,
							color: MAROON$11,
							margin: 0
						},
						children: isEdit ? "Edit News Bar Text" : "Add News Bar Text"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							fontSize: "0.72rem",
							color: "rgba(74,9,24,0.42)",
							margin: "3px 0 0"
						},
						children: "Running ticker · Home page hero"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						style: {
							background: "none",
							border: "none",
							cursor: "pointer",
							color: "rgba(74,9,24,0.42)",
							display: "flex",
							padding: 6,
							borderRadius: 8
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 18 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						flex: 1,
						overflowY: "auto",
						padding: "1.25rem 1.5rem",
						display: "flex",
						flexDirection: "column",
						gap: "1.1rem"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl$10, { children: "News Text" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									display: "flex",
									gap: 4,
									marginBottom: "0.75rem",
									background: "rgba(74,9,24,0.05)",
									borderRadius: 10,
									padding: 4,
									width: "fit-content"
								},
								children: [
									["en", "English"],
									["si", "සිංහල"],
									["ta", "தமிழ்"]
								].map(([code, lbl]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setLangTab(code),
									style: {
										padding: "5px 14px",
										borderRadius: 7,
										border: "none",
										cursor: "pointer",
										background: langTab === code ? "#fff" : "transparent",
										color: langTab === code ? MAROON$11 : "rgba(74,9,24,0.42)",
										fontWeight: langTab === code ? 700 : 400,
										fontSize: "0.76rem",
										fontFamily: "Inter, sans-serif",
										boxShadow: langTab === code ? "0 1px 4px rgba(74,9,24,0.12)" : "none",
										transition: "all 0.15s"
									},
									children: lbl
								}, code))
							}),
							langTab === "en" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldTextarea$6, {
								label: "Description (English) *",
								value: form.descriptionEn,
								onChange: (v) => {
									set("descriptionEn", v);
									setError("");
								},
								placeholder: "Type the news text that will scroll on the home page…"
							}),
							langTab === "si" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldTextarea$6, {
								label: "විස්තරය (සිංහල)",
								value: form.descriptionSi,
								onChange: (v) => set("descriptionSi", v),
								placeholder: "ගෙදර පිටුවේ ධාවනය වන පුවත් පෙළ ටයිප් කරන්න…"
							}),
							langTab === "ta" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldTextarea$6, {
								label: "விளக்கம் (தமிழ்)",
								value: form.descriptionTa,
								onChange: (v) => set("descriptionTa", v),
								placeholder: "முகப்புப் பக்கத்தில் ஓடும் செய்தி உரையை உள்ளிடவும்…"
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl$10, { children: "Status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "flex",
								gap: 8
							},
							children: ["Active", "Draft"].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => set("status", s),
								style: {
									flex: 1,
									padding: "10px 0",
									borderRadius: 10,
									cursor: "pointer",
									fontFamily: "Inter, sans-serif",
									fontSize: "0.82rem",
									fontWeight: form.status === s ? 700 : 400,
									border: `1.5px solid ${form.status === s ? s === "Active" ? "#16a34a" : "#d97706" : "rgba(74,9,24,0.12)"}`,
									background: form.status === s ? s === "Active" ? "rgba(22,101,52,0.1)" : "rgba(180,83,9,0.1)" : "transparent",
									color: form.status === s ? s === "Active" ? "#166534" : "#92400e" : "rgba(74,9,24,0.42)",
									transition: "all 0.15s"
								},
								children: s === "Active" ? "● Active — shows on home" : "○ Draft — hidden"
							}, s))
						})] }),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								color: "#DC2626",
								fontSize: "0.78rem",
								margin: 0,
								fontFamily: "Inter, sans-serif"
							},
							children: error
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						padding: "0.9rem 1.5rem",
						borderTop: "1px solid rgba(74,9,24,0.07)",
						display: "flex",
						justifyContent: "flex-end",
						gap: 10,
						flexShrink: 0,
						background: "rgba(252,251,250,0.6)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						style: cancelBtn,
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						whileHover: {
							y: -1.5,
							boxShadow: "0 8px 22px rgba(74,9,24,0.34)"
						},
						whileTap: { scale: .97 },
						onClick: handleSave,
						disabled: saving,
						style: {
							display: "flex",
							alignItems: "center",
							gap: 7,
							padding: "9px 22px",
							borderRadius: 10,
							border: "none",
							background: `linear-gradient(135deg, ${MAROON$11} 0%, #6E1528 100%)`,
							color: "#fff",
							fontSize: "0.83rem",
							fontWeight: 700,
							cursor: saving ? "not-allowed" : "pointer",
							fontFamily: "Inter, sans-serif",
							opacity: saving ? .7 : 1,
							boxShadow: "0 3px 12px rgba(74,9,24,0.28)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, { size: 14 }), saving ? "Saving…" : isEdit ? "Save Changes" : "Add Item"]
					})]
				})
			]
		})
	});
}
function ViewNewsBarModal({ item, onClose, onEdit }) {
	(0, import_react.useEffect)(() => {
		const h = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", h);
		return () => window.removeEventListener("keydown", h);
	}, [onClose]);
	const Row = ({ label, value }) => value ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			gap: 12,
			padding: "9px 0",
			borderBottom: "1px solid rgba(74,9,24,0.05)"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			style: {
				fontSize: "0.72rem",
				color: "rgba(74,9,24,0.42)",
				fontWeight: 600,
				minWidth: 130,
				textTransform: "uppercase",
				letterSpacing: "0.07em"
			},
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			style: {
				fontSize: "0.83rem",
				color: MAROON$11,
				fontWeight: 500,
				flex: 1,
				lineHeight: 1.6
			},
			children: value
		})]
	}) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		style: overlay,
		onClick: (e) => e.target === e.currentTarget && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .93,
				opacity: 0,
				y: 20
			},
			animate: {
				scale: 1,
				opacity: 1,
				y: 0
			},
			exit: {
				scale: .93,
				opacity: 0,
				y: 20
			},
			transition: {
				duration: .22,
				ease: [
					.16,
					1,
					.3,
					1
				]
			},
			style: {
				background: "#fff",
				borderRadius: 20,
				width: "100%",
				maxWidth: 500,
				maxHeight: "82vh",
				overflow: "hidden",
				boxShadow: "0 30px 80px rgba(0,0,0,0.28)",
				display: "flex",
				flexDirection: "column"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						padding: "1.2rem 1.5rem",
						borderBottom: "1px solid rgba(74,9,24,0.08)",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						flexShrink: 0
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						style: {
							fontFamily: "'Playfair Display', serif",
							fontSize: "1.1rem",
							fontWeight: 800,
							color: MAROON$11,
							margin: 0
						},
						children: "News Bar Item"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						style: {
							background: "none",
							border: "none",
							cursor: "pointer",
							color: "rgba(74,9,24,0.42)",
							display: "flex",
							padding: 6,
							borderRadius: 8
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 18 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						flex: 1,
						overflowY: "auto",
						padding: "1.25rem 1.5rem"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Description (EN)",
							value: item.descriptionEn
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Description (SI)",
							value: item.descriptionSi
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Description (TA)",
							value: item.descriptionTa
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Status",
							value: item.status
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Added",
							value: item.createdAt ? new Date(item.createdAt).toLocaleString() : ""
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Updated",
							value: item.updatedAt ? new Date(item.updatedAt).toLocaleString() : ""
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						padding: "0.9rem 1.5rem",
						borderTop: "1px solid rgba(74,9,24,0.07)",
						display: "flex",
						justifyContent: "flex-end",
						gap: 10,
						background: "rgba(252,251,250,0.6)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						style: cancelBtn,
						children: "Close"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						whileHover: { y: -1.5 },
						whileTap: { scale: .97 },
						onClick: () => onEdit(item),
						style: {
							display: "flex",
							alignItems: "center",
							gap: 7,
							padding: "9px 22px",
							borderRadius: 10,
							border: "none",
							background: `linear-gradient(135deg, ${MAROON$11} 0%, #6E1528 100%)`,
							color: "#fff",
							fontSize: "0.83rem",
							fontWeight: 700,
							cursor: "pointer",
							fontFamily: "Inter, sans-serif",
							boxShadow: "0 3px 12px rgba(74,9,24,0.28)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEdit2, { size: 14 }), " Edit"]
					})]
				})
			]
		})
	});
}
var inputStyle = {
	width: "100%",
	padding: "9px 12px",
	borderRadius: 10,
	boxSizing: "border-box",
	border: "1px solid rgba(74,9,24,0.14)",
	outline: "none",
	fontSize: "0.82rem",
	color: MAROON$11,
	fontFamily: "Inter, sans-serif",
	background: "#fff"
};
function LabelEl$10({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		style: {
			display: "block",
			fontSize: "0.72rem",
			fontWeight: 700,
			color: "rgba(74,9,24,0.55)",
			textTransform: "uppercase",
			letterSpacing: "0.08em",
			marginBottom: "0.4rem",
			fontFamily: "Inter, sans-serif"
		},
		children
	});
}
function FieldTextarea$6({ label, value, onChange, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: { marginBottom: "0.75rem" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl$10, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			value,
			onChange: (e) => onChange(e.target.value),
			placeholder,
			rows: 4,
			style: {
				...inputStyle,
				resize: "vertical",
				lineHeight: 1.6
			}
		})]
	});
}
function useSitePublish() {
	const ctx = (0, import_react.useContext)(SitePublishContext);
	if (!ctx) throw new Error("useSitePublish must be used inside SitePublishProvider");
	return ctx;
}
var api = axios.create({ baseURL: `/api/uploads` });
var uploadImage = (file) => {
	const formData = new FormData();
	formData.append("file", file);
	return api.post("/image", formData);
};
var MAROON$10 = "#4A0918";
var GOLD$7 = "#C79A2B";
var LS_KEY = "cms_home_events";
var _evChannel = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("cms_home_events") : null;
function notifyUpdated() {
	window.dispatchEvent(new Event("cms_home_events_updated"));
	_evChannel?.postMessage("updated");
}
function loadFromStorage() {
	try {
		const raw = typeof window !== "undefined" ? localStorage.getItem(LS_KEY) : null;
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}
function saveToStorage(items) {
	localStorage.setItem(LS_KEY, JSON.stringify(items));
	notifyUpdated();
}
var EMPTY_FORM$8 = {
	titleEn: "",
	titleSi: "",
	titleTa: "",
	date: "",
	time: "",
	status: "Active"
};
function CMSHomeEvents({ search = "", setSearch = () => {} }) {
	const [items, setItems] = (0, import_react.useState)([]);
	const [formModal, setFormModal] = (0, import_react.useState)(false);
	const [editData, setEditData] = (0, import_react.useState)(null);
	const [deleteModal, setDeleteModal] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setItems(loadFromStorage());
	}, []);
	const persistAndSet = (0, import_react.useCallback)((updated, msg) => {
		saveToStorage(updated);
		setItems(updated);
		if (msg) toast.success(msg);
	}, []);
	const addItem = (0, import_react.useCallback)((form) => {
		const item = {
			...EMPTY_FORM$8,
			...form,
			id: Date.now(),
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		persistAndSet([item, ...items], "Event added");
		setFormModal(false);
	}, [items, persistAndSet]);
	const updateItem = (0, import_react.useCallback)((form) => {
		const updated = items.map((it) => it.id === editData.id ? {
			...it,
			...form,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		} : it);
		persistAndSet(updated, "Event updated");
		setEditData(null);
	}, [
		items,
		editData,
		persistAndSet
	]);
	const confirmDelete = (id) => {
		const row = items.find((r) => r.id === id);
		setDeleteModal({
			id,
			title: row?.titleEn || "this event"
		});
	};
	const executeDelete = () => {
		if (!deleteModal) return;
		persistAndSet(items.filter((it) => it.id !== deleteModal.id), "Event deleted");
		setDeleteModal(null);
	};
	const q = (search || "").toLowerCase();
	const filtered = items.filter((it) => !q || (it.titleEn || "").toLowerCase().includes(q) || (it.titleSi || "").toLowerCase().includes(q) || (it.titleTa || "").toLowerCase().includes(q));
	const activeCount = items.filter((it) => it.status === "Active").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "flex-start",
				justifyContent: "space-between",
				marginBottom: "1.25rem",
				flexWrap: "wrap",
				gap: 12
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				style: {
					fontFamily: "'Playfair Display', serif",
					fontSize: "1.35rem",
					fontWeight: 800,
					color: MAROON$10,
					marginBottom: 4
				},
				children: "Home Events Calendar"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				style: {
					fontSize: "0.78rem",
					color: "rgba(74,9,24,0.45)",
					margin: 0
				},
				children: [
					items.length,
					" event",
					items.length !== 1 ? "s" : "",
					" total \xA0·\xA0",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						style: {
							color: "#16a34a",
							fontWeight: 600
						},
						children: [activeCount, " active"]
					})
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					gap: 10,
					alignItems: "center",
					flexWrap: "wrap"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 8,
						background: "#fff",
						border: "1px solid rgba(74,9,24,0.12)",
						borderRadius: 10,
						padding: "7px 12px"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiSearch, {
							size: 13,
							color: "rgba(74,9,24,0.36)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: search,
							onChange: (e) => setSearch(e.target.value),
							placeholder: "Search events…",
							style: {
								border: "none",
								outline: "none",
								fontSize: "0.8rem",
								color: MAROON$10,
								background: "transparent",
								width: 150,
								fontFamily: "Inter, sans-serif"
							}
						}),
						search && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSearch(""),
							style: {
								background: "none",
								border: "none",
								cursor: "pointer",
								color: "rgba(74,9,24,0.38)",
								padding: 0,
								display: "flex"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 13 })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
					whileHover: {
						y: -1.5,
						boxShadow: "0 8px 22px rgba(74,9,24,0.34)"
					},
					whileTap: { scale: .97 },
					onClick: () => setFormModal(true),
					style: {
						display: "flex",
						alignItems: "center",
						gap: 7,
						padding: "8px 17px",
						borderRadius: 10,
						border: "none",
						background: `linear-gradient(135deg, ${MAROON$10} 0%, #6E1528 100%)`,
						color: "#fff",
						fontSize: "0.8rem",
						fontWeight: 600,
						cursor: "pointer",
						fontFamily: "Inter, sans-serif",
						boxShadow: "0 3px 12px rgba(74,9,24,0.28)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPlus, { size: 13 }), " Add Event"]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				background: "rgba(199,154,43,0.07)",
				border: "1px solid rgba(199,154,43,0.22)",
				borderRadius: 12,
				padding: "10px 16px",
				marginBottom: "1.25rem",
				display: "flex",
				gap: 10,
				alignItems: "flex-start"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCalendar, {
				size: 14,
				color: GOLD$7,
				style: {
					marginTop: 1,
					flexShrink: 0
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: {
					fontSize: "0.77rem",
					color: "rgba(74,9,24,0.65)",
					margin: 0,
					lineHeight: 1.6
				},
				children: "Events added here appear on the home page calendar. Sinhala and Tamil titles are optional."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				background: "#fff",
				borderRadius: 16,
				overflow: "hidden",
				border: "1px solid rgba(74,9,24,0.07)",
				boxShadow: "0 2px 12px rgba(74,9,24,0.05)"
			},
			children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				search,
				onAdd: () => setFormModal(true)
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { overflowX: "auto" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					style: {
						width: "100%",
						borderCollapse: "collapse",
						minWidth: 560
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						style: {
							background: "rgba(74,9,24,0.025)",
							borderBottom: "1px solid rgba(74,9,24,0.08)"
						},
						children: [
							"#",
							"Event Name",
							"Date",
							"Time",
							"Actions"
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							style: {
								padding: "11px 14px",
								textAlign: "left",
								fontSize: "0.67rem",
								fontWeight: 700,
								color: "rgba(74,9,24,0.42)",
								textTransform: "uppercase",
								letterSpacing: "0.09em",
								whiteSpace: "nowrap"
							},
							children: h
						}, h))
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.tr, {
						initial: {
							opacity: 0,
							y: 6
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: i * .04 },
						style: {
							borderBottom: i < filtered.length - 1 ? "1px solid rgba(74,9,24,0.05)" : "none",
							transition: "background 0.12s"
						},
						onMouseEnter: (e) => e.currentTarget.style.background = "rgba(74,9,24,0.02)",
						onMouseLeave: (e) => e.currentTarget.style.background = "transparent",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									padding: "11px 14px",
									fontSize: "0.76rem",
									color: "rgba(74,9,24,0.32)",
									fontWeight: 600,
									width: 36
								},
								children: i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								style: {
									padding: "11px 14px",
									maxWidth: 320
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: "0.83rem",
										fontWeight: 600,
										color: MAROON$10,
										overflow: "hidden",
										textOverflow: "ellipsis",
										whiteSpace: "nowrap"
									},
									children: item.titleEn || /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											color: "rgba(74,9,24,0.3)",
											fontStyle: "italic"
										},
										children: "No title"
									})
								}), (item.titleSi || item.titleTa) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										fontSize: "0.71rem",
										color: "rgba(74,9,24,0.42)",
										marginTop: 2,
										overflow: "hidden",
										textOverflow: "ellipsis",
										whiteSpace: "nowrap"
									},
									children: [
										item.titleSi && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.titleSi }),
										item.titleSi && item.titleTa && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: { margin: "0 4px" },
											children: "·"
										}),
										item.titleTa && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.titleTa })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									padding: "11px 14px",
									whiteSpace: "nowrap"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										alignItems: "center",
										gap: 5,
										fontSize: "0.8rem",
										fontWeight: 600,
										color: MAROON$10
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCalendar, {
										size: 11,
										color: GOLD$7
									}), item.date ? (/* @__PURE__ */ new Date(item.date + "T00:00:00")).toLocaleDateString("en-GB", {
										day: "2-digit",
										month: "short",
										year: "numeric"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											color: "rgba(74,9,24,0.3)",
											fontStyle: "italic",
											fontWeight: 400
										},
										children: "—"
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									padding: "11px 14px",
									whiteSpace: "nowrap"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										alignItems: "center",
										gap: 5,
										fontSize: "0.8rem",
										color: "rgba(74,9,24,0.65)"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiClock, {
										size: 11,
										color: GOLD$7
									}), item.time || /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											color: "rgba(74,9,24,0.28)",
											fontStyle: "italic"
										},
										children: "—"
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: { padding: "11px 14px" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										gap: 6
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setEditData(item),
										title: "Edit",
										style: {
											...iconBtn$5,
											color: GOLD$7,
											border: `1px solid ${GOLD$7}38`,
											background: `${GOLD$7}0e`
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEdit2, { size: 13 })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => confirmDelete(item.id),
										title: "Delete",
										style: {
											...iconBtn$5,
											color: "#DC2626",
											border: "1px solid rgba(220,38,38,0.22)",
											background: "rgba(220,38,38,0.07)"
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, { size: 13 })
									})]
								})
							})
						]
					}, item.id)) })]
				})
			})
		}),
		(0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: formModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventFormModal, {
			onClose: () => setFormModal(false),
			onSave: addItem
		}) }), document.body),
		(0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: editData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventFormModal, {
			initialData: editData,
			onClose: () => setEditData(null),
			onSave: updateItem
		}) }), document.body),
		(0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: deleteModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			style: overlayStyle$3,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					scale: .93,
					opacity: 0,
					y: 16
				},
				animate: {
					scale: 1,
					opacity: 1,
					y: 0
				},
				exit: {
					scale: .93,
					opacity: 0,
					y: 16
				},
				transition: {
					duration: .2,
					ease: [
						.16,
						1,
						.3,
						1
					]
				},
				style: {
					background: "#fff",
					borderRadius: 18,
					padding: "1.75rem",
					maxWidth: 420,
					width: "100%",
					boxShadow: "0 24px 64px rgba(0,0,0,0.22)"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						gap: 14,
						alignItems: "flex-start",
						marginBottom: "1.5rem"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							width: 46,
							height: 46,
							borderRadius: 13,
							flexShrink: 0,
							background: "rgba(220,38,38,0.1)",
							border: "1px solid rgba(220,38,38,0.15)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, {
							size: 20,
							color: "#DC2626"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						style: {
							fontFamily: "'Playfair Display', serif",
							fontSize: "1.1rem",
							fontWeight: 800,
							color: MAROON$10,
							marginBottom: "0.3rem"
						},
						children: "Delete Event"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						style: {
							fontSize: "0.83rem",
							color: "rgba(74,9,24,0.55)",
							lineHeight: 1.65
						},
						children: [
							"Delete ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
								style: { color: MAROON$10 },
								children: [
									"\"",
									deleteModal.title,
									"\""
								]
							}),
							"? This cannot be undone."
						]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						gap: 10,
						justifyContent: "flex-end"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setDeleteModal(null),
						style: cancelBtnStyle$3,
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						whileHover: {
							y: -1,
							boxShadow: "0 6px 20px rgba(220,38,38,0.35)"
						},
						whileTap: { scale: .97 },
						onClick: executeDelete,
						style: deleteBtnStyle$3,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, { size: 13 }), " Delete"]
					})]
				})]
			})
		}) }), document.body)
	] });
}
function EmptyState({ search, onAdd }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			padding: "4rem",
			textAlign: "center"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					width: 56,
					height: 56,
					borderRadius: 18,
					background: "rgba(74,9,24,0.06)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					margin: "0 auto 1rem"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCalendar, {
					size: 24,
					color: "rgba(74,9,24,0.28)"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					fontSize: "0.88rem",
					fontWeight: 600,
					color: "rgba(74,9,24,0.38)",
					marginBottom: 6
				},
				children: search ? "No events match your search" : "No events yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					fontSize: "0.76rem",
					color: "rgba(74,9,24,0.28)",
					marginBottom: search ? 0 : "1rem"
				},
				children: search ? "Try a different keyword" : "Add your first event to show it on the home calendar."
			}),
			!search && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
				whileHover: { y: -1.5 },
				whileTap: { scale: .97 },
				onClick: onAdd,
				style: {
					display: "inline-flex",
					alignItems: "center",
					gap: 7,
					padding: "9px 20px",
					borderRadius: 10,
					border: "none",
					background: `linear-gradient(135deg, ${MAROON$10} 0%, #6E1528 100%)`,
					color: "#fff",
					fontSize: "0.82rem",
					fontWeight: 600,
					cursor: "pointer",
					fontFamily: "Inter, sans-serif",
					boxShadow: "0 3px 12px rgba(74,9,24,0.28)"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPlus, { size: 13 }), " Add Event"]
			})
		]
	});
}
function EventFormModal({ onClose, onSave, initialData = null }) {
	const isEdit = initialData !== null;
	const [form, setForm] = (0, import_react.useState)(() => ({
		...EMPTY_FORM$8,
		...initialData || {}
	}));
	const [langTab, setLangTab] = (0, import_react.useState)("en");
	const [error, setError] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const set = (k, v) => setForm((f) => ({
		...f,
		[k]: v
	}));
	(0, import_react.useEffect)(() => {
		const h = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", h);
		return () => window.removeEventListener("keydown", h);
	}, [onClose]);
	const handleSave = () => {
		if (!form.titleEn.trim()) {
			setError("English event name is required");
			return;
		}
		if (!form.date) {
			setError("Date is required");
			return;
		}
		setSaving(true);
		setTimeout(() => {
			onSave(form);
			setSaving(false);
		}, 120);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		style: overlayStyle$3,
		onClick: (e) => e.target === e.currentTarget && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .93,
				opacity: 0,
				y: 20
			},
			animate: {
				scale: 1,
				opacity: 1,
				y: 0
			},
			exit: {
				scale: .93,
				opacity: 0,
				y: 20
			},
			transition: {
				duration: .22,
				ease: [
					.16,
					1,
					.3,
					1
				]
			},
			style: {
				background: "#fff",
				borderRadius: 20,
				width: "100%",
				maxWidth: 500,
				maxHeight: "90vh",
				overflow: "hidden",
				boxShadow: "0 30px 80px rgba(0,0,0,0.28)",
				display: "flex",
				flexDirection: "column"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						padding: "1.2rem 1.5rem",
						borderBottom: "1px solid rgba(74,9,24,0.08)",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						flexShrink: 0
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						style: {
							fontFamily: "'Playfair Display', serif",
							fontSize: "1.15rem",
							fontWeight: 800,
							color: MAROON$10,
							margin: 0
						},
						children: isEdit ? "Edit Event" : "Add New Event"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							fontSize: "0.72rem",
							color: "rgba(74,9,24,0.42)",
							margin: "3px 0 0"
						},
						children: "Home Events Calendar · Southern Province"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						style: {
							background: "none",
							border: "none",
							cursor: "pointer",
							color: "rgba(74,9,24,0.42)",
							display: "flex",
							padding: 6,
							borderRadius: 8
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 18 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						flex: 1,
						overflowY: "auto",
						padding: "1.25rem 1.5rem",
						display: "flex",
						flexDirection: "column",
						gap: "1rem"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl$9, { children: "Event Name" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									display: "flex",
									gap: 4,
									marginBottom: "0.75rem",
									background: "rgba(74,9,24,0.05)",
									borderRadius: 10,
									padding: 4,
									width: "fit-content"
								},
								children: [
									["en", "English"],
									["si", "සිංහල"],
									["ta", "தமிழ்"]
								].map(([code, lbl]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setLangTab(code),
									style: {
										padding: "5px 14px",
										borderRadius: 7,
										border: "none",
										cursor: "pointer",
										background: langTab === code ? "#fff" : "transparent",
										color: langTab === code ? MAROON$10 : "rgba(74,9,24,0.42)",
										fontWeight: langTab === code ? 700 : 400,
										fontSize: "0.76rem",
										fontFamily: "Inter, sans-serif",
										boxShadow: langTab === code ? "0 1px 4px rgba(74,9,24,0.12)" : "none",
										transition: "all 0.15s"
									},
									children: lbl
								}, code))
							}),
							langTab === "en" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$8, {
								label: "Event Name (English) *",
								value: form.titleEn,
								onChange: (v) => {
									set("titleEn", v);
									setError("");
								},
								placeholder: "e.g. Provincial Development Meeting"
							}),
							langTab === "si" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$8, {
								label: "සිදුවීමේ නම (සිංහල)",
								value: form.titleSi,
								onChange: (v) => set("titleSi", v),
								placeholder: "සිදුවීමේ නම සිංහලෙන් ටයිප් කරන්න…"
							}),
							langTab === "ta" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$8, {
								label: "நிகழ்வின் பெயர் (தமிழ்)",
								value: form.titleTa,
								onChange: (v) => set("titleTa", v),
								placeholder: "நிகழ்வின் பெயரை தமிழில் உள்ளிடவும்…"
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: "0.75rem"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$8, {
								label: "Date *",
								type: "date",
								value: form.date,
								onChange: (v) => {
									set("date", v);
									setError("");
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$8, {
								label: "Time",
								value: form.time,
								onChange: (v) => set("time", v),
								placeholder: "e.g. 09:00 AM",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiClock, { size: 13 })
							})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							style: {
								color: "#DC2626",
								fontSize: "0.78rem",
								margin: 0,
								fontFamily: "Inter, sans-serif"
							},
							children: ["⚠ ", error]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						padding: "0.9rem 1.5rem",
						borderTop: "1px solid rgba(74,9,24,0.07)",
						display: "flex",
						justifyContent: "flex-end",
						gap: 10,
						flexShrink: 0,
						background: "rgba(252,251,250,0.6)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						style: cancelBtnStyle$3,
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						whileHover: {
							y: -1.5,
							boxShadow: "0 8px 22px rgba(74,9,24,0.34)"
						},
						whileTap: { scale: .97 },
						onClick: handleSave,
						disabled: saving,
						style: {
							display: "flex",
							alignItems: "center",
							gap: 7,
							padding: "9px 22px",
							borderRadius: 10,
							border: "none",
							background: `linear-gradient(135deg, ${MAROON$10} 0%, #6E1528 100%)`,
							color: "#fff",
							fontSize: "0.83rem",
							fontWeight: 700,
							cursor: saving ? "not-allowed" : "pointer",
							fontFamily: "Inter, sans-serif",
							opacity: saving ? .7 : 1,
							boxShadow: "0 3px 12px rgba(74,9,24,0.28)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, { size: 14 }), saving ? "Saving…" : isEdit ? "Save Changes" : "Add Event"]
					})]
				})
			]
		})
	});
}
var iconBtn$5 = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: 30,
	height: 30,
	borderRadius: 8,
	border: "1px solid rgba(74,9,24,0.13)",
	background: "transparent",
	color: "rgba(74,9,24,0.48)",
	cursor: "pointer",
	transition: "all 0.15s"
};
var overlayStyle$3 = {
	position: "fixed",
	inset: 0,
	background: "rgba(0,0,0,0.48)",
	zIndex: 200,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "1rem"
};
var cancelBtnStyle$3 = {
	padding: "9px 20px",
	borderRadius: 10,
	border: "1px solid rgba(74,9,24,0.14)",
	background: "transparent",
	color: "rgba(74,9,24,0.55)",
	fontSize: "0.83rem",
	cursor: "pointer",
	fontFamily: "Inter, sans-serif",
	fontWeight: 500
};
var deleteBtnStyle$3 = {
	padding: "9px 20px",
	borderRadius: 10,
	border: "none",
	background: "linear-gradient(135deg, #DC2626 0%, #b91c1c 100%)",
	color: "#fff",
	fontSize: "0.83rem",
	cursor: "pointer",
	fontFamily: "Inter, sans-serif",
	fontWeight: 600,
	display: "flex",
	alignItems: "center",
	gap: 7,
	boxShadow: "0 3px 12px rgba(220,38,38,0.3)"
};
function LabelEl$9({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		style: {
			display: "block",
			fontSize: "0.72rem",
			fontWeight: 700,
			color: "rgba(74,9,24,0.55)",
			textTransform: "uppercase",
			letterSpacing: "0.08em",
			marginBottom: "0.4rem",
			fontFamily: "Inter, sans-serif"
		},
		children
	});
}
function FieldInput$8({ label, value, onChange, placeholder, type = "text", icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: { marginBottom: "0.75rem" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl$9, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: { position: "relative" },
			children: [icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: {
					position: "absolute",
					left: 10,
					top: "50%",
					transform: "translateY(-50%)",
					color: "rgba(74,9,24,0.35)"
				},
				children: icon
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type,
				value,
				onChange: (e) => onChange(e.target.value),
				placeholder,
				style: {
					width: "100%",
					padding: icon ? "9px 12px 9px 30px" : "9px 12px",
					borderRadius: 10,
					boxSizing: "border-box",
					border: "1px solid rgba(74,9,24,0.14)",
					outline: "none",
					fontSize: "0.82rem",
					color: MAROON$10,
					fontFamily: "Inter, sans-serif",
					background: "#fff"
				}
			})]
		})]
	});
}
var MAROON$9 = "#4A0918";
var GOLD$6 = "#C79A2B";
var TIERS$1 = [
	{
		value: "deputy-secretary",
		label: "Deputy Secretary"
	},
	{
		value: "director",
		label: "Director"
	},
	{
		value: "deputy-director",
		label: "Deputy Director"
	},
	{
		value: "department-head",
		label: "Department Head"
	}
];
var EMPTY_FORM$7 = {
	name: {
		en: "",
		si: "",
		ta: ""
	},
	position: {
		en: "",
		si: "",
		ta: ""
	},
	photo: "",
	phone: "",
	email: "",
	office: "",
	bio: {
		en: "",
		si: "",
		ta: ""
	},
	experience: {
		en: "",
		si: "",
		ta: ""
	},
	responsibilities: {
		en: [],
		si: [],
		ta: []
	},
	departmentId: null,
	tier: "department-head",
	positionRank: "",
	positionNumber: "",
	featured: false,
	showInDirectory: true,
	order: 0,
	slug: ""
};
function CMSStaff({ search = "", setSearch = () => {} }) {
	const [items, setItems] = (0, import_react.useState)([]);
	const [departments, setDepartments] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [formModal, setFormModal] = (0, import_react.useState)(false);
	const [editData, setEditData] = (0, import_react.useState)(null);
	const [deleteModal, setDeleteModal] = (0, import_react.useState)(null);
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		try {
			const [staffRes, deptRes] = await Promise.all([staffApi.list(), departmentsApi.list()]);
			setItems(staffRes.data);
			setDepartments(deptRes.data);
		} catch {
			toast.error("Failed to load staff directory.");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	const addItem = (0, import_react.useCallback)(async (form) => {
		try {
			await staffApi.create(form);
			toast.success("Staff member added");
			setFormModal(false);
			load();
		} catch (err) {
			toast.error(err.response?.data?.error || "Failed to add staff member.");
		}
	}, [load]);
	const updateItem = (0, import_react.useCallback)(async (form) => {
		try {
			await staffApi.update(editData.id, form);
			toast.success("Staff member updated");
			setEditData(null);
			load();
		} catch (err) {
			toast.error(err.response?.data?.error || "Failed to update staff member.");
		}
	}, [editData, load]);
	const confirmDelete = (id) => {
		const row = items.find((r) => r.id === id);
		setDeleteModal({
			id,
			name: row?.name?.en || "this staff member"
		});
	};
	const executeDelete = async () => {
		if (!deleteModal) return;
		try {
			await staffApi.remove(deleteModal.id);
			toast.success("Staff member deleted");
			setDeleteModal(null);
			load();
		} catch {
			toast.error("Failed to delete staff member.");
		}
	};
	const q = (search || "").toLowerCase();
	const filtered = items.filter((it) => !q || (it.name?.en || "").toLowerCase().includes(q) || (it.position?.en || "").toLowerCase().includes(q));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "flex-start",
				justifyContent: "space-between",
				marginBottom: "1.25rem",
				flexWrap: "wrap",
				gap: 12
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				style: {
					fontFamily: "'Playfair Display', serif",
					fontSize: "1.35rem",
					fontWeight: 800,
					color: MAROON$9,
					marginBottom: 4
				},
				children: "Staff Directory"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				style: {
					fontSize: "0.78rem",
					color: "rgba(74,9,24,0.45)",
					margin: 0
				},
				children: [
					items.length,
					" staff member",
					items.length !== 1 ? "s" : "",
					" · single source of truth for Navbar, Home, About & Contact"
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					gap: 10,
					alignItems: "center",
					flexWrap: "wrap"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 8,
						background: "#fff",
						border: "1px solid rgba(74,9,24,0.12)",
						borderRadius: 10,
						padding: "7px 12px"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiSearch, {
							size: 13,
							color: "rgba(74,9,24,0.36)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: search,
							onChange: (e) => setSearch(e.target.value),
							placeholder: "Search staff…",
							style: {
								border: "none",
								outline: "none",
								fontSize: "0.8rem",
								color: MAROON$9,
								background: "transparent",
								width: 150,
								fontFamily: "Inter, sans-serif"
							}
						}),
						search && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSearch(""),
							style: {
								background: "none",
								border: "none",
								cursor: "pointer",
								color: "rgba(74,9,24,0.38)",
								padding: 0,
								display: "flex"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 13 })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
					whileHover: {
						y: -1.5,
						boxShadow: "0 8px 22px rgba(74,9,24,0.34)"
					},
					whileTap: { scale: .97 },
					onClick: () => setFormModal(true),
					style: {
						display: "flex",
						alignItems: "center",
						gap: 7,
						padding: "8px 17px",
						borderRadius: 10,
						border: "none",
						background: `linear-gradient(135deg, ${MAROON$9} 0%, #6E1528 100%)`,
						color: "#fff",
						fontSize: "0.8rem",
						fontWeight: 600,
						cursor: "pointer",
						fontFamily: "Inter, sans-serif",
						boxShadow: "0 3px 12px rgba(74,9,24,0.28)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPlus, { size: 13 }), " Add Staff Member"]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				background: "#fff",
				borderRadius: 16,
				overflow: "hidden",
				border: "1px solid rgba(74,9,24,0.07)",
				boxShadow: "0 2px 12px rgba(74,9,24,0.05)"
			},
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					padding: "4rem",
					textAlign: "center",
					color: "rgba(74,9,24,0.4)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiRefreshCw, {
					size: 22,
					style: { animation: "spin 0.9s linear infinite" }
				})
			}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					padding: "4rem",
					textAlign: "center"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						width: 56,
						height: 56,
						borderRadius: 18,
						background: "rgba(74,9,24,0.06)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						margin: "0 auto 1rem"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiUser, {
						size: 24,
						color: "rgba(74,9,24,0.28)"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						fontSize: "0.88rem",
						fontWeight: 600,
						color: "rgba(74,9,24,0.38)"
					},
					children: search ? "No staff match your search" : "No staff members yet"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { overflowX: "auto" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					style: {
						width: "100%",
						borderCollapse: "collapse",
						minWidth: 720
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						style: {
							background: "rgba(74,9,24,0.025)",
							borderBottom: "1px solid rgba(74,9,24,0.08)"
						},
						children: [
							"",
							"Name",
							"Position",
							"Tier",
							"Featured",
							"Directory",
							"Actions"
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							style: {
								padding: "11px 14px",
								textAlign: "left",
								fontSize: "0.67rem",
								fontWeight: 700,
								color: "rgba(74,9,24,0.42)",
								textTransform: "uppercase",
								letterSpacing: "0.09em",
								whiteSpace: "nowrap"
							},
							children: h
						}, h))
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.tr, {
						initial: {
							opacity: 0,
							y: 6
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: i * .03 },
						style: { borderBottom: i < filtered.length - 1 ? "1px solid rgba(74,9,24,0.05)" : "none" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: { padding: "9px 14px" },
								children: item.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: resolveUploadUrl(item.photo),
									alt: "",
									style: {
										width: 34,
										height: 34,
										borderRadius: "50%",
										objectFit: "cover"
									}
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										width: 34,
										height: 34,
										borderRadius: "50%",
										background: "rgba(74,9,24,0.08)",
										display: "flex",
										alignItems: "center",
										justifyContent: "center"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiUser, {
										size: 14,
										color: "rgba(74,9,24,0.35)"
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									padding: "11px 14px",
									fontSize: "0.83rem",
									fontWeight: 600,
									color: MAROON$9
								},
								children: item.name?.en
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									padding: "11px 14px",
									fontSize: "0.78rem",
									color: "rgba(74,9,24,0.6)"
								},
								children: item.position?.en
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									padding: "11px 14px",
									fontSize: "0.72rem",
									color: "rgba(74,9,24,0.5)"
								},
								children: TIERS$1.find((t) => t.value === item.tier)?.label || item.tier
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: { padding: "11px 14px" },
								children: item.featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, {
									size: 13,
									color: "#16a34a"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: { padding: "11px 14px" },
								children: item.showInDirectory && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, {
									size: 13,
									color: "#16a34a"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: { padding: "11px 14px" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										gap: 6
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setEditData(item),
										title: "Edit",
										style: {
											...iconBtn$4,
											color: GOLD$6,
											border: `1px solid ${GOLD$6}38`,
											background: `${GOLD$6}0e`
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEdit2, { size: 13 })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => confirmDelete(item.id),
										title: "Delete",
										style: {
											...iconBtn$4,
											color: "#DC2626",
											border: "1px solid rgba(220,38,38,0.22)",
											background: "rgba(220,38,38,0.07)"
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, { size: 13 })
									})]
								})
							})
						]
					}, item.id)) })]
				})
			})
		}),
		(0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: formModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaffFormModal, {
			departments,
			onClose: () => setFormModal(false),
			onSave: addItem
		}) }), document.body),
		(0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: editData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaffFormModal, {
			departments,
			initialData: editData,
			onClose: () => setEditData(null),
			onSave: updateItem
		}) }), document.body),
		(0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: deleteModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			style: overlayStyle$2,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					scale: .93,
					opacity: 0,
					y: 16
				},
				animate: {
					scale: 1,
					opacity: 1,
					y: 0
				},
				exit: {
					scale: .93,
					opacity: 0,
					y: 16
				},
				transition: {
					duration: .2,
					ease: [
						.16,
						1,
						.3,
						1
					]
				},
				style: {
					background: "#fff",
					borderRadius: 18,
					padding: "1.75rem",
					maxWidth: 420,
					width: "100%",
					boxShadow: "0 24px 64px rgba(0,0,0,0.22)"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						gap: 14,
						alignItems: "flex-start",
						marginBottom: "1.5rem"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							width: 46,
							height: 46,
							borderRadius: 13,
							flexShrink: 0,
							background: "rgba(220,38,38,0.1)",
							border: "1px solid rgba(220,38,38,0.15)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, {
							size: 20,
							color: "#DC2626"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						style: {
							fontFamily: "'Playfair Display', serif",
							fontSize: "1.1rem",
							fontWeight: 800,
							color: MAROON$9,
							marginBottom: "0.3rem"
						},
						children: "Delete Staff Member"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						style: {
							fontSize: "0.83rem",
							color: "rgba(74,9,24,0.55)",
							lineHeight: 1.65
						},
						children: [
							"Delete ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
								style: { color: MAROON$9 },
								children: [
									"\"",
									deleteModal.name,
									"\""
								]
							}),
							"? This cannot be undone and will remove them from all pages referencing this record."
						]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						gap: 10,
						justifyContent: "flex-end"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setDeleteModal(null),
						style: cancelBtnStyle$2,
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						whileHover: {
							y: -1,
							boxShadow: "0 6px 20px rgba(220,38,38,0.35)"
						},
						whileTap: { scale: .97 },
						onClick: executeDelete,
						style: deleteBtnStyle$2,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, { size: 13 }), " Delete"]
					})]
				})]
			})
		}) }), document.body)
	] });
}
function StaffFormModal({ departments, onClose, onSave, initialData = null }) {
	const isEdit = initialData !== null;
	const [form, setForm] = (0, import_react.useState)(() => ({
		...EMPTY_FORM$7,
		...initialData || {},
		responsibilities: {
			en: (initialData?.responsibilities?.en || []).map((r) => typeof r === "string" ? r : r.text).join("\n"),
			si: (initialData?.responsibilities?.si || []).map((r) => typeof r === "string" ? r : r.text).join("\n"),
			ta: (initialData?.responsibilities?.ta || []).map((r) => typeof r === "string" ? r : r.text).join("\n")
		}
	}));
	const [langTab, setLangTab] = (0, import_react.useState)("en");
	const [error, setError] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const set = (k, v) => setForm((f) => ({
		...f,
		[k]: v
	}));
	const setLang = (k, lang, v) => setForm((f) => ({
		...f,
		[k]: {
			...f[k],
			[lang]: v
		}
	}));
	(0, import_react.useEffect)(() => {
		const h = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", h);
		return () => window.removeEventListener("keydown", h);
	}, [onClose]);
	const handlePhoto = async (e) => {
		const file = e.target.files?.[0];
		e.target.value = "";
		if (!file || !file.type.startsWith("image/")) return;
		setUploading(true);
		try {
			const res = await uploadImage(file);
			set("photo", res.data.url);
		} catch (err) {
			toast.error(err.response?.data?.error || "Failed to upload photo.");
		} finally {
			setUploading(false);
		}
	};
	const handleSave = () => {
		if (!form.name.en.trim()) {
			setError("English name is required.");
			return;
		}
		if (!form.position.en.trim()) {
			setError("English position is required.");
			return;
		}
		if (uploading) {
			setError("Please wait for the photo to finish uploading.");
			return;
		}
		setSaving(true);
		const payload = {
			...form,
			responsibilities: {
				en: form.responsibilities.en.split("\n").map((s) => s.trim()).filter(Boolean),
				si: form.responsibilities.si.split("\n").map((s) => s.trim()).filter(Boolean),
				ta: form.responsibilities.ta.split("\n").map((s) => s.trim()).filter(Boolean)
			}
		};
		setTimeout(() => {
			onSave(payload);
			setSaving(false);
		}, 150);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		style: overlayStyle$2,
		onClick: (e) => e.target === e.currentTarget && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .93,
				opacity: 0,
				y: 20
			},
			animate: {
				scale: 1,
				opacity: 1,
				y: 0
			},
			exit: {
				scale: .93,
				opacity: 0,
				y: 20
			},
			transition: {
				duration: .22,
				ease: [
					.16,
					1,
					.3,
					1
				]
			},
			style: {
				background: "#fff",
				borderRadius: 20,
				width: "100%",
				maxWidth: 620,
				maxHeight: "90vh",
				overflow: "hidden",
				boxShadow: "0 30px 80px rgba(0,0,0,0.28)",
				display: "flex",
				flexDirection: "column"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						padding: "1.2rem 1.5rem",
						borderBottom: "1px solid rgba(74,9,24,0.08)",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						flexShrink: 0
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						style: {
							fontFamily: "'Playfair Display', serif",
							fontSize: "1.15rem",
							fontWeight: 800,
							color: MAROON$9,
							margin: 0
						},
						children: isEdit ? "Edit Staff Member" : "Add Staff Member"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						style: {
							background: "none",
							border: "none",
							cursor: "pointer",
							color: "rgba(74,9,24,0.42)",
							display: "flex",
							padding: 6,
							borderRadius: 8
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 18 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						flex: 1,
						overflowY: "auto",
						padding: "1.25rem 1.5rem",
						display: "flex",
						flexDirection: "column",
						gap: "1rem"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl$8, { children: "Photo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 12
							},
							children: [uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									width: 64,
									height: 64,
									borderRadius: "50%",
									background: "rgba(74,9,24,0.05)",
									display: "flex",
									alignItems: "center",
									justifyContent: "center"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiRefreshCw, {
									size: 18,
									color: GOLD$6,
									style: { animation: "spin 0.9s linear infinite" }
								})
							}) : form.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: resolveUploadUrl(form.photo),
								alt: "",
								style: {
									width: 64,
									height: 64,
									borderRadius: "50%",
									objectFit: "cover"
								}
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									width: 64,
									height: 64,
									borderRadius: "50%",
									background: "rgba(74,9,24,0.06)",
									display: "flex",
									alignItems: "center",
									justifyContent: "center"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiUser, {
									size: 24,
									color: "rgba(74,9,24,0.28)"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								style: {
									padding: "7px 14px",
									borderRadius: 9,
									border: "1px solid rgba(74,9,24,0.14)",
									fontSize: "0.78rem",
									fontWeight: 600,
									color: MAROON$9,
									cursor: "pointer",
									display: "flex",
									alignItems: "center",
									gap: 6
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiImage, { size: 12 }),
									" ",
									form.photo ? "Change" : "Upload",
									" Photo",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "file",
										accept: "image/*",
										onChange: handlePhoto,
										style: { display: "none" }
									})
								]
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "flex",
								gap: 4,
								background: "rgba(74,9,24,0.05)",
								borderRadius: 10,
								padding: 4,
								width: "fit-content"
							},
							children: [
								["en", "English"],
								["si", "සිංහල"],
								["ta", "தமிழ்"]
							].map(([code, lbl]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setLangTab(code),
								style: {
									padding: "5px 14px",
									borderRadius: 7,
									border: "none",
									cursor: "pointer",
									background: langTab === code ? "#fff" : "transparent",
									color: langTab === code ? MAROON$9 : "rgba(74,9,24,0.42)",
									fontWeight: langTab === code ? 700 : 400,
									fontSize: "0.76rem",
									fontFamily: "Inter, sans-serif"
								},
								children: lbl
							}, code))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$7, {
							label: `Name (${langTab.toUpperCase()})${langTab === "en" ? " *" : ""}`,
							value: form.name[langTab],
							onChange: (v) => setLang("name", langTab, v),
							placeholder: "e.g. Mr. M.K.G.S.P.K. Jayasekara"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$7, {
							label: `Position (${langTab.toUpperCase()})${langTab === "en" ? " *" : ""}`,
							value: form.position[langTab],
							onChange: (v) => setLang("position", langTab, v),
							placeholder: "e.g. Deputy Chief Secretary – Planning"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldTextarea$5, {
							label: `Bio (${langTab.toUpperCase()})`,
							value: form.bio[langTab],
							onChange: (v) => setLang("bio", langTab, v),
							rows: 3
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldTextarea$5, {
							label: `Responsibilities (${langTab.toUpperCase()}) — one per line`,
							value: form.responsibilities[langTab],
							onChange: (v) => setLang("responsibilities", langTab, v),
							rows: 4
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: "0.75rem"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$7, {
								label: "Phone",
								value: form.phone,
								onChange: (v) => set("phone", v)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$7, {
								label: "Email",
								value: form.email,
								onChange: (v) => set("email", v)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: "0.75rem"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl$8, { children: "Tier" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: form.tier,
								onChange: (e) => set("tier", e.target.value),
								style: selectStyle$4,
								children: TIERS$1.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: t.value,
									children: t.label
								}, t.value))
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl$8, { children: "Department" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: form.departmentId || "",
								onChange: (e) => set("departmentId", e.target.value || null),
								style: selectStyle$4,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "— None —"
								}), departments.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: d.id,
									children: d.label?.en
								}, d.id))]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: 20
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: 8,
									cursor: "pointer",
									fontSize: "0.82rem",
									color: "rgba(74,9,24,0.65)"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: form.featured,
									onChange: (e) => set("featured", e.target.checked)
								}), "Featured (Navbar / Home widgets)"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: 8,
									cursor: "pointer",
									fontSize: "0.82rem",
									color: "rgba(74,9,24,0.65)"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: form.showInDirectory,
									onChange: (e) => set("showInDirectory", e.target.checked)
								}), "Show in Contact Directory"]
							})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 8,
								padding: "9px 12px",
								borderRadius: 9,
								background: "rgba(220,38,38,0.07)",
								border: "1px solid rgba(220,38,38,0.18)"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: "0.78rem",
									color: "#dc2626"
								},
								children: error
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						padding: "0.9rem 1.5rem",
						borderTop: "1px solid rgba(74,9,24,0.07)",
						display: "flex",
						justifyContent: "flex-end",
						gap: 10,
						flexShrink: 0,
						background: "rgba(252,251,250,0.6)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						style: cancelBtnStyle$2,
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						whileHover: !saving && !uploading ? {
							y: -1.5,
							boxShadow: "0 8px 22px rgba(74,9,24,0.34)"
						} : {},
						whileTap: !saving && !uploading ? { scale: .97 } : {},
						onClick: handleSave,
						disabled: saving || uploading,
						style: {
							display: "flex",
							alignItems: "center",
							gap: 7,
							padding: "9px 22px",
							borderRadius: 10,
							border: "none",
							background: `linear-gradient(135deg, ${MAROON$9} 0%, #6E1528 100%)`,
							color: "#fff",
							fontSize: "0.83rem",
							fontWeight: 700,
							cursor: saving || uploading ? "not-allowed" : "pointer",
							fontFamily: "Inter, sans-serif",
							opacity: saving || uploading ? .7 : 1,
							boxShadow: "0 3px 12px rgba(74,9,24,0.28)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, { size: 14 }), saving ? "Saving…" : isEdit ? "Save Changes" : "Add Staff Member"]
					})]
				})
			]
		})
	});
}
var iconBtn$4 = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: 30,
	height: 30,
	borderRadius: 8,
	border: "1px solid rgba(74,9,24,0.13)",
	background: "transparent",
	color: "rgba(74,9,24,0.48)",
	cursor: "pointer",
	transition: "all 0.15s"
};
var overlayStyle$2 = {
	position: "fixed",
	inset: 0,
	background: "rgba(0,0,0,0.48)",
	zIndex: 200,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "1rem"
};
var cancelBtnStyle$2 = {
	padding: "9px 20px",
	borderRadius: 10,
	border: "1px solid rgba(74,9,24,0.14)",
	background: "transparent",
	color: "rgba(74,9,24,0.55)",
	fontSize: "0.83rem",
	cursor: "pointer",
	fontFamily: "Inter, sans-serif",
	fontWeight: 500
};
var deleteBtnStyle$2 = {
	padding: "9px 20px",
	borderRadius: 10,
	border: "none",
	background: "linear-gradient(135deg, #DC2626 0%, #b91c1c 100%)",
	color: "#fff",
	fontSize: "0.83rem",
	cursor: "pointer",
	fontFamily: "Inter, sans-serif",
	fontWeight: 600,
	display: "flex",
	alignItems: "center",
	gap: 7,
	boxShadow: "0 3px 12px rgba(220,38,38,0.3)"
};
var selectStyle$4 = {
	width: "100%",
	padding: "9px 12px",
	border: "1.5px solid rgba(74,9,24,0.15)",
	borderRadius: 9,
	fontSize: "0.83rem",
	fontFamily: "Inter, sans-serif",
	color: MAROON$9,
	background: "#fff",
	outline: "none",
	cursor: "pointer",
	appearance: "none",
	boxSizing: "border-box"
};
function LabelEl$8({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		style: {
			display: "block",
			fontSize: "0.72rem",
			fontWeight: 700,
			color: "rgba(74,9,24,0.55)",
			textTransform: "uppercase",
			letterSpacing: "0.08em",
			marginBottom: "0.4rem",
			fontFamily: "Inter, sans-serif"
		},
		children
	});
}
function FieldInput$7({ label, value, onChange, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl$8, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "text",
		value,
		onChange: (e) => onChange(e.target.value),
		placeholder,
		style: {
			width: "100%",
			padding: "9px 12px",
			borderRadius: 10,
			boxSizing: "border-box",
			border: "1px solid rgba(74,9,24,0.14)",
			outline: "none",
			fontSize: "0.82rem",
			color: MAROON$9,
			fontFamily: "Inter, sans-serif",
			background: "#fff"
		}
	})] });
}
function FieldTextarea$5({ label, value, onChange, rows = 3 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl$8, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		value,
		onChange: (e) => onChange(e.target.value),
		rows,
		style: {
			width: "100%",
			padding: "9px 12px",
			borderRadius: 10,
			boxSizing: "border-box",
			border: "1px solid rgba(74,9,24,0.14)",
			outline: "none",
			fontSize: "0.82rem",
			color: MAROON$9,
			fontFamily: "Inter, sans-serif",
			background: "#fff",
			resize: "vertical"
		}
	})] });
}
var MAROON$8 = "#4A0918";
var GOLD$5 = "#C79A2B";
var CATEGORIES = [
	"general",
	"planning",
	"downloads",
	"reports",
	"departments",
	"tech"
];
var EMPTY_FORM$6 = {
	category: "general",
	question: {
		en: "",
		si: "",
		ta: ""
	},
	answer: {
		en: "",
		si: "",
		ta: ""
	},
	featured: false,
	order: 0
};
function CMSFaqs({ search = "", setSearch = () => {} }) {
	const [items, setItems] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [formModal, setFormModal] = (0, import_react.useState)(false);
	const [editData, setEditData] = (0, import_react.useState)(null);
	const [deleteModal, setDeleteModal] = (0, import_react.useState)(null);
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		try {
			const res = await faqsApi.list();
			setItems(res.data);
		} catch {
			toast.error("Failed to load FAQs.");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	const addItem = (0, import_react.useCallback)(async (form) => {
		try {
			await faqsApi.create(form);
			toast.success("FAQ added");
			setFormModal(false);
			load();
		} catch (err) {
			toast.error(err.response?.data?.error || "Failed to add FAQ.");
		}
	}, [load]);
	const updateItem = (0, import_react.useCallback)(async (form) => {
		try {
			await faqsApi.update(editData.id, form);
			toast.success("FAQ updated");
			setEditData(null);
			load();
		} catch (err) {
			toast.error(err.response?.data?.error || "Failed to update FAQ.");
		}
	}, [editData, load]);
	const confirmDelete = (id) => {
		const row = items.find((r) => r.id === id);
		setDeleteModal({
			id,
			question: row?.question?.en || "this FAQ"
		});
	};
	const executeDelete = async () => {
		if (!deleteModal) return;
		try {
			await faqsApi.remove(deleteModal.id);
			toast.success("FAQ deleted");
			setDeleteModal(null);
			load();
		} catch {
			toast.error("Failed to delete FAQ.");
		}
	};
	const q = (search || "").toLowerCase();
	const filtered = items.filter((it) => !q || (it.question?.en || "").toLowerCase().includes(q));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "flex-start",
				justifyContent: "space-between",
				marginBottom: "1.25rem",
				flexWrap: "wrap",
				gap: 12
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				style: {
					fontFamily: "'Playfair Display', serif",
					fontSize: "1.35rem",
					fontWeight: 800,
					color: MAROON$8,
					marginBottom: 4
				},
				children: "FAQs"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				style: {
					fontSize: "0.78rem",
					color: "rgba(74,9,24,0.45)",
					margin: 0
				},
				children: [
					items.length,
					" question",
					items.length !== 1 ? "s" : "",
					" · featured items appear in the Home FAQ teaser"
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					gap: 10,
					alignItems: "center",
					flexWrap: "wrap"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 8,
						background: "#fff",
						border: "1px solid rgba(74,9,24,0.12)",
						borderRadius: 10,
						padding: "7px 12px"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiSearch, {
							size: 13,
							color: "rgba(74,9,24,0.36)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: search,
							onChange: (e) => setSearch(e.target.value),
							placeholder: "Search FAQs…",
							style: {
								border: "none",
								outline: "none",
								fontSize: "0.8rem",
								color: MAROON$8,
								background: "transparent",
								width: 150,
								fontFamily: "Inter, sans-serif"
							}
						}),
						search && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSearch(""),
							style: {
								background: "none",
								border: "none",
								cursor: "pointer",
								color: "rgba(74,9,24,0.38)",
								padding: 0,
								display: "flex"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 13 })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
					whileHover: {
						y: -1.5,
						boxShadow: "0 8px 22px rgba(74,9,24,0.34)"
					},
					whileTap: { scale: .97 },
					onClick: () => setFormModal(true),
					style: {
						display: "flex",
						alignItems: "center",
						gap: 7,
						padding: "8px 17px",
						borderRadius: 10,
						border: "none",
						background: `linear-gradient(135deg, ${MAROON$8} 0%, #6E1528 100%)`,
						color: "#fff",
						fontSize: "0.8rem",
						fontWeight: 600,
						cursor: "pointer",
						fontFamily: "Inter, sans-serif",
						boxShadow: "0 3px 12px rgba(74,9,24,0.28)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPlus, { size: 13 }), " Add FAQ"]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				background: "#fff",
				borderRadius: 16,
				overflow: "hidden",
				border: "1px solid rgba(74,9,24,0.07)",
				boxShadow: "0 2px 12px rgba(74,9,24,0.05)"
			},
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					padding: "4rem",
					textAlign: "center",
					color: "rgba(74,9,24,0.4)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiRefreshCw, {
					size: 22,
					style: { animation: "spin 0.9s linear infinite" }
				})
			}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					padding: "4rem",
					textAlign: "center"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						width: 56,
						height: 56,
						borderRadius: 18,
						background: "rgba(74,9,24,0.06)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						margin: "0 auto 1rem"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiHelpCircle, {
						size: 24,
						color: "rgba(74,9,24,0.28)"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						fontSize: "0.88rem",
						fontWeight: 600,
						color: "rgba(74,9,24,0.38)"
					},
					children: search ? "No FAQs match your search" : "No FAQs yet"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { overflowX: "auto" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					style: {
						width: "100%",
						borderCollapse: "collapse",
						minWidth: 680
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						style: {
							background: "rgba(74,9,24,0.025)",
							borderBottom: "1px solid rgba(74,9,24,0.08)"
						},
						children: [
							"Question",
							"Category",
							"Featured",
							"Actions"
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							style: {
								padding: "11px 14px",
								textAlign: "left",
								fontSize: "0.67rem",
								fontWeight: 700,
								color: "rgba(74,9,24,0.42)",
								textTransform: "uppercase",
								letterSpacing: "0.09em",
								whiteSpace: "nowrap"
							},
							children: h
						}, h))
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.tr, {
						initial: {
							opacity: 0,
							y: 6
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: i * .03 },
						style: { borderBottom: i < filtered.length - 1 ? "1px solid rgba(74,9,24,0.05)" : "none" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									padding: "11px 14px",
									fontSize: "0.82rem",
									fontWeight: 600,
									color: MAROON$8,
									maxWidth: 340,
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap"
								},
								children: item.question?.en
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									padding: "11px 14px",
									fontSize: "0.75rem",
									color: "rgba(74,9,24,0.55)"
								},
								children: item.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: { padding: "11px 14px" },
								children: item.featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, {
									size: 13,
									color: "#16a34a"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: { padding: "11px 14px" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										gap: 6
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setEditData(item),
										title: "Edit",
										style: {
											...iconBtn$3,
											color: GOLD$5,
											border: `1px solid ${GOLD$5}38`,
											background: `${GOLD$5}0e`
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEdit2, { size: 13 })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => confirmDelete(item.id),
										title: "Delete",
										style: {
											...iconBtn$3,
											color: "#DC2626",
											border: "1px solid rgba(220,38,38,0.22)",
											background: "rgba(220,38,38,0.07)"
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, { size: 13 })
									})]
								})
							})
						]
					}, item.id)) })]
				})
			})
		}),
		(0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: formModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqFormModal, {
			onClose: () => setFormModal(false),
			onSave: addItem
		}) }), document.body),
		(0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: editData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqFormModal, {
			initialData: editData,
			onClose: () => setEditData(null),
			onSave: updateItem
		}) }), document.body),
		(0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: deleteModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			style: overlayStyle$1,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					scale: .93,
					opacity: 0,
					y: 16
				},
				animate: {
					scale: 1,
					opacity: 1,
					y: 0
				},
				exit: {
					scale: .93,
					opacity: 0,
					y: 16
				},
				transition: {
					duration: .2,
					ease: [
						.16,
						1,
						.3,
						1
					]
				},
				style: {
					background: "#fff",
					borderRadius: 18,
					padding: "1.75rem",
					maxWidth: 420,
					width: "100%",
					boxShadow: "0 24px 64px rgba(0,0,0,0.22)"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						gap: 14,
						alignItems: "flex-start",
						marginBottom: "1.5rem"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							width: 46,
							height: 46,
							borderRadius: 13,
							flexShrink: 0,
							background: "rgba(220,38,38,0.1)",
							border: "1px solid rgba(220,38,38,0.15)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, {
							size: 20,
							color: "#DC2626"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						style: {
							fontFamily: "'Playfair Display', serif",
							fontSize: "1.1rem",
							fontWeight: 800,
							color: MAROON$8,
							marginBottom: "0.3rem"
						},
						children: "Delete FAQ"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						style: {
							fontSize: "0.83rem",
							color: "rgba(74,9,24,0.55)",
							lineHeight: 1.65
						},
						children: [
							"Delete ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
								style: { color: MAROON$8 },
								children: [
									"\"",
									deleteModal.question,
									"\""
								]
							}),
							"? This cannot be undone."
						]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						gap: 10,
						justifyContent: "flex-end"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setDeleteModal(null),
						style: cancelBtnStyle$1,
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						whileHover: {
							y: -1,
							boxShadow: "0 6px 20px rgba(220,38,38,0.35)"
						},
						whileTap: { scale: .97 },
						onClick: executeDelete,
						style: deleteBtnStyle$1,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, { size: 13 }), " Delete"]
					})]
				})]
			})
		}) }), document.body)
	] });
}
function FaqFormModal({ onClose, onSave, initialData = null }) {
	const isEdit = initialData !== null;
	const [form, setForm] = (0, import_react.useState)(() => ({
		...EMPTY_FORM$6,
		...initialData || {}
	}));
	const [langTab, setLangTab] = (0, import_react.useState)("en");
	const [error, setError] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const set = (k, v) => setForm((f) => ({
		...f,
		[k]: v
	}));
	const setLang = (k, lang, v) => setForm((f) => ({
		...f,
		[k]: {
			...f[k],
			[lang]: v
		}
	}));
	(0, import_react.useEffect)(() => {
		const h = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", h);
		return () => window.removeEventListener("keydown", h);
	}, [onClose]);
	const handleSave = () => {
		if (!form.question.en.trim()) {
			setError("English question is required.");
			return;
		}
		if (!form.answer.en.trim()) {
			setError("English answer is required.");
			return;
		}
		setSaving(true);
		setTimeout(() => {
			onSave(form);
			setSaving(false);
		}, 150);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		style: overlayStyle$1,
		onClick: (e) => e.target === e.currentTarget && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .93,
				opacity: 0,
				y: 20
			},
			animate: {
				scale: 1,
				opacity: 1,
				y: 0
			},
			exit: {
				scale: .93,
				opacity: 0,
				y: 20
			},
			transition: {
				duration: .22,
				ease: [
					.16,
					1,
					.3,
					1
				]
			},
			style: {
				background: "#fff",
				borderRadius: 20,
				width: "100%",
				maxWidth: 560,
				maxHeight: "90vh",
				overflow: "hidden",
				boxShadow: "0 30px 80px rgba(0,0,0,0.28)",
				display: "flex",
				flexDirection: "column"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						padding: "1.2rem 1.5rem",
						borderBottom: "1px solid rgba(74,9,24,0.08)",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						flexShrink: 0
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						style: {
							fontFamily: "'Playfair Display', serif",
							fontSize: "1.15rem",
							fontWeight: 800,
							color: MAROON$8,
							margin: 0
						},
						children: isEdit ? "Edit FAQ" : "Add FAQ"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						style: {
							background: "none",
							border: "none",
							cursor: "pointer",
							color: "rgba(74,9,24,0.42)",
							display: "flex",
							padding: 6,
							borderRadius: 8
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 18 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						flex: 1,
						overflowY: "auto",
						padding: "1.25rem 1.5rem",
						display: "flex",
						flexDirection: "column",
						gap: "1rem"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl$7, { children: "Category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: form.category,
							onChange: (e) => set("category", e.target.value),
							style: selectStyle$3,
							children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c,
								children: c
							}, c))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "flex",
								gap: 4,
								background: "rgba(74,9,24,0.05)",
								borderRadius: 10,
								padding: 4,
								width: "fit-content"
							},
							children: [
								["en", "English"],
								["si", "සිංහල"],
								["ta", "தமிழ்"]
							].map(([code, lbl]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setLangTab(code),
								style: {
									padding: "5px 14px",
									borderRadius: 7,
									border: "none",
									cursor: "pointer",
									background: langTab === code ? "#fff" : "transparent",
									color: langTab === code ? MAROON$8 : "rgba(74,9,24,0.42)",
									fontWeight: langTab === code ? 700 : 400,
									fontSize: "0.76rem",
									fontFamily: "Inter, sans-serif"
								},
								children: lbl
							}, code))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldTextarea$4, {
							label: `Question (${langTab.toUpperCase()})${langTab === "en" ? " *" : ""}`,
							value: form.question[langTab],
							onChange: (v) => setLang("question", langTab, v),
							rows: 2
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldTextarea$4, {
							label: `Answer (${langTab.toUpperCase()})${langTab === "en" ? " *" : ""}`,
							value: form.answer[langTab],
							onChange: (v) => setLang("answer", langTab, v),
							rows: 4
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 8,
								cursor: "pointer",
								fontSize: "0.82rem",
								color: "rgba(74,9,24,0.65)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: form.featured,
								onChange: (e) => set("featured", e.target.checked)
							}), "Featured (shown in Home FAQ teaser)"]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 8,
								padding: "9px 12px",
								borderRadius: 9,
								background: "rgba(220,38,38,0.07)",
								border: "1px solid rgba(220,38,38,0.18)"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: "0.78rem",
									color: "#dc2626"
								},
								children: error
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						padding: "0.9rem 1.5rem",
						borderTop: "1px solid rgba(74,9,24,0.07)",
						display: "flex",
						justifyContent: "flex-end",
						gap: 10,
						flexShrink: 0,
						background: "rgba(252,251,250,0.6)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						style: cancelBtnStyle$1,
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						whileHover: !saving ? {
							y: -1.5,
							boxShadow: "0 8px 22px rgba(74,9,24,0.34)"
						} : {},
						whileTap: !saving ? { scale: .97 } : {},
						onClick: handleSave,
						disabled: saving,
						style: {
							display: "flex",
							alignItems: "center",
							gap: 7,
							padding: "9px 22px",
							borderRadius: 10,
							border: "none",
							background: `linear-gradient(135deg, ${MAROON$8} 0%, #6E1528 100%)`,
							color: "#fff",
							fontSize: "0.83rem",
							fontWeight: 700,
							cursor: saving ? "not-allowed" : "pointer",
							fontFamily: "Inter, sans-serif",
							opacity: saving ? .7 : 1,
							boxShadow: "0 3px 12px rgba(74,9,24,0.28)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, { size: 14 }), saving ? "Saving…" : isEdit ? "Save Changes" : "Add FAQ"]
					})]
				})
			]
		})
	});
}
var iconBtn$3 = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: 30,
	height: 30,
	borderRadius: 8,
	border: "1px solid rgba(74,9,24,0.13)",
	background: "transparent",
	color: "rgba(74,9,24,0.48)",
	cursor: "pointer",
	transition: "all 0.15s"
};
var overlayStyle$1 = {
	position: "fixed",
	inset: 0,
	background: "rgba(0,0,0,0.48)",
	zIndex: 200,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "1rem"
};
var cancelBtnStyle$1 = {
	padding: "9px 20px",
	borderRadius: 10,
	border: "1px solid rgba(74,9,24,0.14)",
	background: "transparent",
	color: "rgba(74,9,24,0.55)",
	fontSize: "0.83rem",
	cursor: "pointer",
	fontFamily: "Inter, sans-serif",
	fontWeight: 500
};
var deleteBtnStyle$1 = {
	padding: "9px 20px",
	borderRadius: 10,
	border: "none",
	background: "linear-gradient(135deg, #DC2626 0%, #b91c1c 100%)",
	color: "#fff",
	fontSize: "0.83rem",
	cursor: "pointer",
	fontFamily: "Inter, sans-serif",
	fontWeight: 600,
	display: "flex",
	alignItems: "center",
	gap: 7,
	boxShadow: "0 3px 12px rgba(220,38,38,0.3)"
};
var selectStyle$3 = {
	width: "100%",
	padding: "9px 12px",
	border: "1.5px solid rgba(74,9,24,0.15)",
	borderRadius: 9,
	fontSize: "0.83rem",
	fontFamily: "Inter, sans-serif",
	color: MAROON$8,
	background: "#fff",
	outline: "none",
	cursor: "pointer",
	appearance: "none",
	boxSizing: "border-box"
};
function LabelEl$7({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		style: {
			display: "block",
			fontSize: "0.72rem",
			fontWeight: 700,
			color: "rgba(74,9,24,0.55)",
			textTransform: "uppercase",
			letterSpacing: "0.08em",
			marginBottom: "0.4rem",
			fontFamily: "Inter, sans-serif"
		},
		children
	});
}
function FieldTextarea$4({ label, value, onChange, rows = 3 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl$7, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		value,
		onChange: (e) => onChange(e.target.value),
		rows,
		style: {
			width: "100%",
			padding: "9px 12px",
			borderRadius: 10,
			boxSizing: "border-box",
			border: "1px solid rgba(74,9,24,0.14)",
			outline: "none",
			fontSize: "0.82rem",
			color: MAROON$8,
			fontFamily: "Inter, sans-serif",
			background: "#fff",
			resize: "vertical"
		}
	})] });
}
var MAROON$7 = "#4A0918";
var GOLD$4 = "#C79A2B";
var EMPTY_LANG$2 = {
	en: "",
	si: "",
	ta: ""
};
var EMPTY_SLIDE = {
	image: "",
	accent: { ...EMPTY_LANG$2 },
	line1: { ...EMPTY_LANG$2 },
	line2: { ...EMPTY_LANG$2 },
	line3: { ...EMPTY_LANG$2 },
	body: { ...EMPTY_LANG$2 },
	btn1: {
		label: { ...EMPTY_LANG$2 },
		path: ""
	},
	btn2: {
		label: { ...EMPTY_LANG$2 },
		path: ""
	}
};
var EMPTY_FORM$5 = {
	heroSlides: [
		{ ...EMPTY_SLIDE },
		{ ...EMPTY_SLIDE },
		{ ...EMPTY_SLIDE }
	],
	aboutSecretariat: {
		eyebrow: { ...EMPTY_LANG$2 },
		title: { ...EMPTY_LANG$2 },
		subtitle: { ...EMPTY_LANG$2 },
		body: { ...EMPTY_LANG$2 },
		image: "",
		statCard: {
			value: "",
			label: { ...EMPTY_LANG$2 }
		}
	},
	deputySecretaryStaffId: null,
	deputySecretaryMessage: { ...EMPTY_LANG$2 }
};
function CMSHomeContent() {
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM$5);
	const [staff, setStaff] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [openSlide, setOpenSlide] = (0, import_react.useState)(0);
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		try {
			const [homeRes, staffRes] = await Promise.all([homeContentApi.get(), staffApi.list()]);
			const data = homeRes.data;
			setForm({
				...EMPTY_FORM$5,
				...data,
				heroSlides: data.heroSlides?.length ? data.heroSlides : EMPTY_FORM$5.heroSlides,
				aboutSecretariat: {
					...EMPTY_FORM$5.aboutSecretariat,
					...data.aboutSecretariat
				},
				deputySecretaryMessage: {
					...EMPTY_LANG$2,
					...data.deputySecretaryMessage
				}
			});
			setStaff(staffRes.data);
		} catch {
			toast.error("Failed to load home content.");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	const updateSlide = (idx, patch) => {
		setForm((f) => ({
			...f,
			heroSlides: f.heroSlides.map((s, i) => i === idx ? {
				...s,
				...patch
			} : s)
		}));
	};
	const updateSlideLang = (idx, key, lang, v) => {
		setForm((f) => ({
			...f,
			heroSlides: f.heroSlides.map((s, i) => i === idx ? {
				...s,
				[key]: {
					...s[key],
					[lang]: v
				}
			} : s)
		}));
	};
	const updateSlideBtn = (idx, btnKey, field, v) => {
		setForm((f) => ({
			...f,
			heroSlides: f.heroSlides.map((s, i) => i === idx ? {
				...s,
				[btnKey]: {
					...s[btnKey],
					[field]: v
				}
			} : s)
		}));
	};
	const updateSlideBtnLabel = (idx, btnKey, lang, v) => {
		setForm((f) => ({
			...f,
			heroSlides: f.heroSlides.map((s, i) => i === idx ? {
				...s,
				[btnKey]: {
					...s[btnKey],
					label: {
						...s[btnKey].label,
						[lang]: v
					}
				}
			} : s)
		}));
	};
	const uploadSlideImage = async (idx, file) => {
		try {
			const res = await uploadImage(file);
			updateSlide(idx, { image: res.data.url });
		} catch {
			toast.error("Failed to upload hero image.");
		}
	};
	const setAbout = (patch) => setForm((f) => ({
		...f,
		aboutSecretariat: {
			...f.aboutSecretariat,
			...patch
		}
	}));
	const setAboutLang = (key, lang, v) => setForm((f) => ({
		...f,
		aboutSecretariat: {
			...f.aboutSecretariat,
			[key]: {
				...f.aboutSecretariat[key],
				[lang]: v
			}
		}
	}));
	const uploadAboutImage = async (file) => {
		try {
			const res = await uploadImage(file);
			setAbout({ image: res.data.url });
		} catch {
			toast.error("Failed to upload about-section image.");
		}
	};
	const setMessage = (lang, v) => setForm((f) => ({
		...f,
		deputySecretaryMessage: {
			...f.deputySecretaryMessage,
			[lang]: v
		}
	}));
	const handleSave = async () => {
		setSaving(true);
		try {
			await homeContentApi.save(form);
			toast.success("Home content saved");
		} catch {
			toast.error("Failed to save home content.");
		} finally {
			setSaving(false);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			padding: "4rem",
			textAlign: "center",
			color: "rgba(74,9,24,0.4)"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiRefreshCw, {
			size: 22,
			style: { animation: "spin 0.9s linear infinite" }
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: { maxWidth: 720 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: { marginBottom: "1.25rem" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					style: {
						fontFamily: "'Playfair Display', serif",
						fontSize: "1.35rem",
						fontWeight: 800,
						color: MAROON$7,
						marginBottom: 4
					},
					children: "Home Page Content"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: {
						fontSize: "0.78rem",
						color: "rgba(74,9,24,0.45)",
						margin: 0
					},
					children: "Hero slider, about-secretariat blurb, and the Deputy Secretary's message."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard$3, {
				title: "Hero Slides",
				children: form.heroSlides.map((slide, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlideEditor, {
					idx,
					slide,
					open: openSlide === idx,
					onToggle: () => setOpenSlide(openSlide === idx ? -1 : idx),
					onChangeLang: (key, lang, v) => updateSlideLang(idx, key, lang, v),
					onChangeBtn: (btnKey, field, v) => updateSlideBtn(idx, btnKey, field, v),
					onChangeBtnLabel: (btnKey, lang, v) => updateSlideBtnLabel(idx, btnKey, lang, v),
					onUploadImage: (file) => uploadSlideImage(idx, file)
				}, idx))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard$3, {
				title: "About Secretariat (Home Page)",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePicker$2, {
						image: form.aboutSecretariat.image,
						onUpload: uploadAboutImage
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField$2, {
						label: "Eyebrow",
						value: form.aboutSecretariat.eyebrow,
						onChange: (lang, v) => setAboutLang("eyebrow", lang, v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField$2, {
						label: "Title",
						value: form.aboutSecretariat.title,
						onChange: (lang, v) => setAboutLang("title", lang, v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField$2, {
						label: "Subtitle",
						value: form.aboutSecretariat.subtitle,
						onChange: (lang, v) => setAboutLang("subtitle", lang, v),
						textarea: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField$2, {
						label: "Body",
						value: form.aboutSecretariat.body,
						onChange: (lang, v) => setAboutLang("body", lang, v),
						textarea: true,
						rows: 4
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "grid",
							gridTemplateColumns: "1fr 2fr",
							gap: "0.75rem"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$6, {
							label: "Stat Value",
							value: form.aboutSecretariat.statCard?.value || "",
							onChange: (v) => setAbout({ statCard: {
								...form.aboutSecretariat.statCard,
								value: v
							} }),
							placeholder: "e.g. 3 Divisions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField$2, {
							label: "Stat Label",
							value: form.aboutSecretariat.statCard?.label || EMPTY_LANG$2,
							onChange: (lang, v) => setAbout({ statCard: {
								...form.aboutSecretariat.statCard,
								label: {
									...form.aboutSecretariat.statCard?.label,
									[lang]: v
								}
							} })
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard$3, {
				title: "Deputy Secretary's Message (Home Page)",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl$6, { children: "Deputy Secretary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: form.deputySecretaryStaffId || "",
						onChange: (e) => setForm((f) => ({
							...f,
							deputySecretaryStaffId: e.target.value || null
						})),
						style: selectStyle$2,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "— Select from Staff Directory —"
						}), staff.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: s.id,
							children: [
								s.name?.en,
								" — ",
								s.position?.en
							]
						}, s.id))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							fontSize: "0.72rem",
							color: "rgba(74,9,24,0.4)",
							marginTop: 6
						},
						children: "Name, position, and photo are pulled from the selected Staff Directory record."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField$2, {
					label: "Message",
					value: form.deputySecretaryMessage,
					onChange: setMessage,
					textarea: true,
					rows: 5
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					display: "flex",
					justifyContent: "flex-end"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
					whileHover: !saving ? {
						y: -1.5,
						boxShadow: "0 8px 22px rgba(74,9,24,0.34)"
					} : {},
					whileTap: !saving ? { scale: .97 } : {},
					onClick: handleSave,
					disabled: saving,
					style: {
						display: "flex",
						alignItems: "center",
						gap: 7,
						padding: "10px 26px",
						borderRadius: 10,
						border: "none",
						background: `linear-gradient(135deg, ${MAROON$7} 0%, #6E1528 100%)`,
						color: "#fff",
						fontSize: "0.85rem",
						fontWeight: 700,
						cursor: saving ? "not-allowed" : "pointer",
						fontFamily: "Inter, sans-serif",
						opacity: saving ? .7 : 1,
						boxShadow: "0 3px 12px rgba(74,9,24,0.28)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, { size: 14 }), saving ? "Saving…" : "Save Home Content"]
				})
			})
		]
	});
}
function SlideEditor({ idx, slide, open, onToggle, onChangeLang, onChangeBtn, onChangeBtnLabel, onUploadImage }) {
	const [langTab, setLangTab] = (0, import_react.useState)("en");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			border: "1px solid rgba(74,9,24,0.1)",
			borderRadius: 12,
			marginBottom: 10,
			overflow: "hidden"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: onToggle,
			style: {
				width: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "10px 14px",
				background: "rgba(74,9,24,0.03)",
				border: "none",
				cursor: "pointer"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				style: {
					fontSize: "0.82rem",
					fontWeight: 700,
					color: MAROON$7
				},
				children: ["Slide ", idx + 1]
			}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronUp, {
				size: 14,
				color: MAROON$7
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronDown, {
				size: 14,
				color: MAROON$7
			})]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				padding: "1rem",
				display: "flex",
				flexDirection: "column",
				gap: "0.85rem"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePicker$2, {
					image: slide.image,
					onUpload: onUploadImage
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "flex",
						gap: 4,
						background: "rgba(74,9,24,0.05)",
						borderRadius: 10,
						padding: 4,
						width: "fit-content"
					},
					children: [
						["en", "English"],
						["si", "සිංහල"],
						["ta", "தமிழ்"]
					].map(([code, lbl]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setLangTab(code),
						style: {
							padding: "5px 14px",
							borderRadius: 7,
							border: "none",
							cursor: "pointer",
							background: langTab === code ? "#fff" : "transparent",
							color: langTab === code ? MAROON$7 : "rgba(74,9,24,0.42)",
							fontWeight: langTab === code ? 700 : 400,
							fontSize: "0.76rem",
							fontFamily: "Inter, sans-serif"
						},
						children: lbl
					}, code))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$6, {
					label: `Accent (${langTab.toUpperCase()})`,
					value: slide.accent[langTab],
					onChange: (v) => onChangeLang("accent", langTab, v)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "1fr 1fr 1fr",
						gap: "0.6rem"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$6, {
							label: "Heading Line 1",
							value: slide.line1[langTab],
							onChange: (v) => onChangeLang("line1", langTab, v)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$6, {
							label: "Heading Line 2",
							value: slide.line2[langTab],
							onChange: (v) => onChangeLang("line2", langTab, v)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$6, {
							label: "Heading Line 3",
							value: slide.line3[langTab],
							onChange: (v) => onChangeLang("line3", langTab, v)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldTextarea$3, {
					label: "Body",
					value: slide.body[langTab],
					onChange: (v) => onChangeLang("body", langTab, v),
					rows: 2
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: "0.75rem"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$6, {
						label: "Button 1 Label",
						value: slide.btn1.label[langTab],
						onChange: (v) => onChangeBtnLabel("btn1", langTab, v)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: { marginTop: 6 },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$6, {
							label: "Button 1 Path",
							value: slide.btn1.path,
							onChange: (v) => onChangeBtn("btn1", "path", v),
							placeholder: "/departments"
						})
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$6, {
						label: "Button 2 Label",
						value: slide.btn2.label[langTab],
						onChange: (v) => onChangeBtnLabel("btn2", langTab, v)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: { marginTop: 6 },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$6, {
							label: "Button 2 Path",
							value: slide.btn2.path,
							onChange: (v) => onChangeBtn("btn2", "path", v),
							placeholder: "/services"
						})
					})] })]
				})
			]
		})]
	});
}
function SectionCard$3({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			background: "#fff",
			borderRadius: 16,
			border: "1px solid rgba(74,9,24,0.07)",
			boxShadow: "0 2px 12px rgba(74,9,24,0.05)",
			padding: "1.5rem",
			marginBottom: "1.25rem",
			display: "flex",
			flexDirection: "column",
			gap: "0.9rem"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			style: {
				fontFamily: "'Playfair Display', serif",
				fontSize: "1.02rem",
				fontWeight: 800,
				color: MAROON$7,
				margin: 0
			},
			children: title
		}), children]
	});
}
function ImagePicker$2({ image, onUpload }) {
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const handleFile = async (e) => {
		const file = e.target.files?.[0];
		e.target.value = "";
		if (!file) return;
		setUploading(true);
		await onUpload(file);
		setUploading(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			alignItems: "center",
			gap: 12
		},
		children: [uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				width: 80,
				height: 50,
				borderRadius: 8,
				background: "rgba(74,9,24,0.05)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiRefreshCw, {
				size: 16,
				color: GOLD$4,
				style: { animation: "spin 0.9s linear infinite" }
			})
		}) : image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: resolveUploadUrl(image),
			alt: "",
			style: {
				width: 80,
				height: 50,
				borderRadius: 8,
				objectFit: "cover"
			}
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				width: 80,
				height: 50,
				borderRadius: 8,
				background: "rgba(74,9,24,0.06)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiImage, {
				size: 16,
				color: "rgba(74,9,24,0.28)"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			style: {
				padding: "7px 14px",
				borderRadius: 9,
				border: "1px solid rgba(74,9,24,0.14)",
				fontSize: "0.76rem",
				fontWeight: 600,
				color: MAROON$7,
				cursor: "pointer"
			},
			children: [image ? "Change Image" : "Upload Image", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "file",
				accept: "image/*",
				onChange: handleFile,
				style: { display: "none" }
			})]
		})]
	});
}
function LangTabbedField$2({ label, value, onChange, textarea = false, rows = 2 }) {
	const [langTab, setLangTab] = (0, import_react.useState)("en");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			marginBottom: 6
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl$6, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				display: "flex",
				gap: 2,
				background: "rgba(74,9,24,0.05)",
				borderRadius: 8,
				padding: 3
			},
			children: [
				["en", "EN"],
				["si", "SI"],
				["ta", "TA"]
			].map(([code, lbl]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setLangTab(code),
				style: {
					padding: "3px 9px",
					borderRadius: 6,
					border: "none",
					cursor: "pointer",
					background: langTab === code ? "#fff" : "transparent",
					color: langTab === code ? MAROON$7 : "rgba(74,9,24,0.42)",
					fontWeight: langTab === code ? 700 : 400,
					fontSize: "0.68rem",
					fontFamily: "Inter, sans-serif"
				},
				children: lbl
			}, code))
		})]
	}), textarea ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		value: value[langTab],
		onChange: (e) => onChange(langTab, e.target.value),
		rows,
		style: {
			width: "100%",
			padding: "9px 12px",
			borderRadius: 10,
			boxSizing: "border-box",
			border: "1px solid rgba(74,9,24,0.14)",
			outline: "none",
			fontSize: "0.82rem",
			color: MAROON$7,
			fontFamily: "Inter, sans-serif",
			background: "#fff",
			resize: "vertical"
		}
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "text",
		value: value[langTab],
		onChange: (e) => onChange(langTab, e.target.value),
		style: {
			width: "100%",
			padding: "9px 12px",
			borderRadius: 10,
			boxSizing: "border-box",
			border: "1px solid rgba(74,9,24,0.14)",
			outline: "none",
			fontSize: "0.82rem",
			color: MAROON$7,
			fontFamily: "Inter, sans-serif",
			background: "#fff"
		}
	})] });
}
var selectStyle$2 = {
	width: "100%",
	padding: "9px 12px",
	border: "1.5px solid rgba(74,9,24,0.15)",
	borderRadius: 9,
	fontSize: "0.83rem",
	fontFamily: "Inter, sans-serif",
	color: MAROON$7,
	background: "#fff",
	outline: "none",
	cursor: "pointer",
	appearance: "none",
	boxSizing: "border-box"
};
function LabelEl$6({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		style: {
			display: "block",
			fontSize: "0.72rem",
			fontWeight: 700,
			color: "rgba(74,9,24,0.55)",
			textTransform: "uppercase",
			letterSpacing: "0.08em",
			marginBottom: "0.4rem",
			fontFamily: "Inter, sans-serif"
		},
		children
	});
}
function FieldInput$6({ label, value, onChange, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl$6, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "text",
		value,
		onChange: (e) => onChange(e.target.value),
		placeholder,
		style: {
			width: "100%",
			padding: "9px 12px",
			borderRadius: 10,
			boxSizing: "border-box",
			border: "1px solid rgba(74,9,24,0.14)",
			outline: "none",
			fontSize: "0.82rem",
			color: MAROON$7,
			fontFamily: "Inter, sans-serif",
			background: "#fff"
		}
	})] });
}
function FieldTextarea$3({ label, value, onChange, rows = 3 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl$6, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		value,
		onChange: (e) => onChange(e.target.value),
		rows,
		style: {
			width: "100%",
			padding: "9px 12px",
			borderRadius: 10,
			boxSizing: "border-box",
			border: "1px solid rgba(74,9,24,0.14)",
			outline: "none",
			fontSize: "0.82rem",
			color: MAROON$7,
			fontFamily: "Inter, sans-serif",
			background: "#fff",
			resize: "vertical"
		}
	})] });
}
var MAROON$6 = "#4A0918";
var GOLD$3 = "#C79A2B";
var ICONS = [
	"Building2",
	"Wallet",
	"Settings",
	"TrendingUp",
	"BookOpen",
	"ClipboardList",
	"Users",
	"Landmark"
];
var EMPTY_FORM$4 = {
	key: "",
	icon: "Building2",
	accentColor: "#C79A2B",
	staffCount: "",
	label: {
		en: "",
		si: "",
		ta: ""
	},
	shortLabel: {
		en: "",
		si: "",
		ta: ""
	},
	desc: {
		en: "",
		si: "",
		ta: ""
	},
	badge: {
		en: "",
		si: "",
		ta: ""
	},
	subtitle: {
		en: "",
		si: "",
		ta: ""
	},
	overview: {
		en: "",
		si: "",
		ta: ""
	},
	functions: {
		en: [],
		si: [],
		ta: []
	},
	responsibilities: {
		en: [],
		si: [],
		ta: []
	},
	services: {
		en: [],
		si: [],
		ta: []
	},
	order: 0
};
var listToText$3 = (arr) => (arr || []).join("\n");
var textToList$3 = (text) => text.split("\n").map((s) => s.trim()).filter(Boolean);
function CMSDepartments({ search = "", setSearch = () => {} }) {
	const [items, setItems] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [formModal, setFormModal] = (0, import_react.useState)(false);
	const [editData, setEditData] = (0, import_react.useState)(null);
	const [deleteModal, setDeleteModal] = (0, import_react.useState)(null);
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		try {
			const res = await departmentsApi.list();
			setItems(res.data);
		} catch {
			toast.error("Failed to load departments.");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	const addItem = (0, import_react.useCallback)(async (form) => {
		try {
			await departmentsApi.create(form);
			toast.success("Department added");
			setFormModal(false);
			load();
		} catch (err) {
			toast.error(err.response?.data?.error || "Failed to add department.");
		}
	}, [load]);
	const updateItem = (0, import_react.useCallback)(async (form) => {
		try {
			await departmentsApi.update(editData.id, form);
			toast.success("Department updated");
			setEditData(null);
			load();
		} catch (err) {
			toast.error(err.response?.data?.error || "Failed to update department.");
		}
	}, [editData, load]);
	const confirmDelete = (id) => {
		const row = items.find((r) => r.id === id);
		setDeleteModal({
			id,
			label: row?.label?.en || "this department"
		});
	};
	const executeDelete = async () => {
		if (!deleteModal) return;
		try {
			await departmentsApi.remove(deleteModal.id);
			toast.success("Department deleted");
			setDeleteModal(null);
			load();
		} catch {
			toast.error("Failed to delete department.");
		}
	};
	const q = (search || "").toLowerCase();
	const filtered = items.filter((it) => !q || (it.label?.en || "").toLowerCase().includes(q));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "flex-start",
				justifyContent: "space-between",
				marginBottom: "1.25rem",
				flexWrap: "wrap",
				gap: 12
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				style: {
					fontFamily: "'Playfair Display', serif",
					fontSize: "1.35rem",
					fontWeight: 800,
					color: MAROON$6,
					marginBottom: 4
				},
				children: "Departments"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				style: {
					fontSize: "0.78rem",
					color: "rgba(74,9,24,0.45)",
					margin: 0
				},
				children: [
					items.length,
					" division",
					items.length !== 1 ? "s" : ""
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					gap: 10,
					alignItems: "center",
					flexWrap: "wrap"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 8,
						background: "#fff",
						border: "1px solid rgba(74,9,24,0.12)",
						borderRadius: 10,
						padding: "7px 12px"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiSearch, {
							size: 13,
							color: "rgba(74,9,24,0.36)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: search,
							onChange: (e) => setSearch(e.target.value),
							placeholder: "Search departments…",
							style: {
								border: "none",
								outline: "none",
								fontSize: "0.8rem",
								color: MAROON$6,
								background: "transparent",
								width: 150,
								fontFamily: "Inter, sans-serif"
							}
						}),
						search && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSearch(""),
							style: {
								background: "none",
								border: "none",
								cursor: "pointer",
								color: "rgba(74,9,24,0.38)",
								padding: 0,
								display: "flex"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 13 })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
					whileHover: {
						y: -1.5,
						boxShadow: "0 8px 22px rgba(74,9,24,0.34)"
					},
					whileTap: { scale: .97 },
					onClick: () => setFormModal(true),
					style: {
						display: "flex",
						alignItems: "center",
						gap: 7,
						padding: "8px 17px",
						borderRadius: 10,
						border: "none",
						background: `linear-gradient(135deg, ${MAROON$6} 0%, #6E1528 100%)`,
						color: "#fff",
						fontSize: "0.8rem",
						fontWeight: 600,
						cursor: "pointer",
						fontFamily: "Inter, sans-serif",
						boxShadow: "0 3px 12px rgba(74,9,24,0.28)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPlus, { size: 13 }), " Add Department"]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				background: "#fff",
				borderRadius: 16,
				overflow: "hidden",
				border: "1px solid rgba(74,9,24,0.07)",
				boxShadow: "0 2px 12px rgba(74,9,24,0.05)"
			},
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					padding: "4rem",
					textAlign: "center",
					color: "rgba(74,9,24,0.4)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiRefreshCw, {
					size: 22,
					style: { animation: "spin 0.9s linear infinite" }
				})
			}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					padding: "4rem",
					textAlign: "center"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						width: 56,
						height: 56,
						borderRadius: 18,
						background: "rgba(74,9,24,0.06)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						margin: "0 auto 1rem"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiBriefcase, {
						size: 24,
						color: "rgba(74,9,24,0.28)"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						fontSize: "0.88rem",
						fontWeight: 600,
						color: "rgba(74,9,24,0.38)"
					},
					children: search ? "No departments match your search" : "No departments yet"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { overflowX: "auto" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					style: {
						width: "100%",
						borderCollapse: "collapse",
						minWidth: 600
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						style: {
							background: "rgba(74,9,24,0.025)",
							borderBottom: "1px solid rgba(74,9,24,0.08)"
						},
						children: [
							"Key",
							"Label",
							"Icon",
							"Actions"
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							style: {
								padding: "11px 14px",
								textAlign: "left",
								fontSize: "0.67rem",
								fontWeight: 700,
								color: "rgba(74,9,24,0.42)",
								textTransform: "uppercase",
								letterSpacing: "0.09em",
								whiteSpace: "nowrap"
							},
							children: h
						}, h))
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.tr, {
						initial: {
							opacity: 0,
							y: 6
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: i * .03 },
						style: { borderBottom: i < filtered.length - 1 ? "1px solid rgba(74,9,24,0.05)" : "none" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									padding: "11px 14px",
									fontSize: "0.78rem",
									color: "rgba(74,9,24,0.55)"
								},
								children: item.key
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									padding: "11px 14px",
									fontSize: "0.83rem",
									fontWeight: 600,
									color: MAROON$6
								},
								children: item.label?.en
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									padding: "11px 14px",
									fontSize: "0.75rem",
									color: "rgba(74,9,24,0.5)"
								},
								children: item.icon
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: { padding: "11px 14px" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										gap: 6
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setEditData(item),
										title: "Edit",
										style: {
											...iconBtn$2,
											color: GOLD$3,
											border: `1px solid ${GOLD$3}38`,
											background: `${GOLD$3}0e`
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEdit2, { size: 13 })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => confirmDelete(item.id),
										title: "Delete",
										style: {
											...iconBtn$2,
											color: "#DC2626",
											border: "1px solid rgba(220,38,38,0.22)",
											background: "rgba(220,38,38,0.07)"
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, { size: 13 })
									})]
								})
							})
						]
					}, item.id)) })]
				})
			})
		}),
		(0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: formModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeptFormModal, {
			onClose: () => setFormModal(false),
			onSave: addItem
		}) }), document.body),
		(0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: editData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeptFormModal, {
			initialData: editData,
			onClose: () => setEditData(null),
			onSave: updateItem
		}) }), document.body),
		(0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: deleteModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			style: overlayStyle,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					scale: .93,
					opacity: 0,
					y: 16
				},
				animate: {
					scale: 1,
					opacity: 1,
					y: 0
				},
				exit: {
					scale: .93,
					opacity: 0,
					y: 16
				},
				transition: {
					duration: .2,
					ease: [
						.16,
						1,
						.3,
						1
					]
				},
				style: {
					background: "#fff",
					borderRadius: 18,
					padding: "1.75rem",
					maxWidth: 420,
					width: "100%",
					boxShadow: "0 24px 64px rgba(0,0,0,0.22)"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						gap: 14,
						alignItems: "flex-start",
						marginBottom: "1.5rem"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							width: 46,
							height: 46,
							borderRadius: 13,
							flexShrink: 0,
							background: "rgba(220,38,38,0.1)",
							border: "1px solid rgba(220,38,38,0.15)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, {
							size: 20,
							color: "#DC2626"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						style: {
							fontFamily: "'Playfair Display', serif",
							fontSize: "1.1rem",
							fontWeight: 800,
							color: MAROON$6,
							marginBottom: "0.3rem"
						},
						children: "Delete Department"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						style: {
							fontSize: "0.83rem",
							color: "rgba(74,9,24,0.55)",
							lineHeight: 1.65
						},
						children: [
							"Delete ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
								style: { color: MAROON$6 },
								children: [
									"\"",
									deleteModal.label,
									"\""
								]
							}),
							"? This cannot be undone."
						]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						gap: 10,
						justifyContent: "flex-end"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setDeleteModal(null),
						style: cancelBtnStyle,
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						whileHover: {
							y: -1,
							boxShadow: "0 6px 20px rgba(220,38,38,0.35)"
						},
						whileTap: { scale: .97 },
						onClick: executeDelete,
						style: deleteBtnStyle,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, { size: 13 }), " Delete"]
					})]
				})]
			})
		}) }), document.body)
	] });
}
function DeptFormModal({ onClose, onSave, initialData = null }) {
	const isEdit = initialData !== null;
	const [form, setForm] = (0, import_react.useState)(() => ({
		...EMPTY_FORM$4,
		...initialData || {},
		functions: {
			en: listToText$3(initialData?.functions?.en),
			si: listToText$3(initialData?.functions?.si),
			ta: listToText$3(initialData?.functions?.ta)
		},
		responsibilities: {
			en: listToText$3(initialData?.responsibilities?.en),
			si: listToText$3(initialData?.responsibilities?.si),
			ta: listToText$3(initialData?.responsibilities?.ta)
		},
		services: {
			en: listToText$3(initialData?.services?.en),
			si: listToText$3(initialData?.services?.si),
			ta: listToText$3(initialData?.services?.ta)
		}
	}));
	const [langTab, setLangTab] = (0, import_react.useState)("en");
	const [error, setError] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const set = (k, v) => setForm((f) => ({
		...f,
		[k]: v
	}));
	const setLang = (k, lang, v) => setForm((f) => ({
		...f,
		[k]: {
			...f[k],
			[lang]: v
		}
	}));
	(0, import_react.useEffect)(() => {
		const h = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", h);
		return () => window.removeEventListener("keydown", h);
	}, [onClose]);
	const handleSave = () => {
		if (!form.key.trim()) {
			setError("Key is required (e.g. \"accounts\").");
			return;
		}
		if (!form.label.en.trim()) {
			setError("English label is required.");
			return;
		}
		setSaving(true);
		const payload = {
			...form,
			functions: {
				en: textToList$3(form.functions.en),
				si: textToList$3(form.functions.si),
				ta: textToList$3(form.functions.ta)
			},
			responsibilities: {
				en: textToList$3(form.responsibilities.en),
				si: textToList$3(form.responsibilities.si),
				ta: textToList$3(form.responsibilities.ta)
			},
			services: {
				en: textToList$3(form.services.en),
				si: textToList$3(form.services.si),
				ta: textToList$3(form.services.ta)
			}
		};
		setTimeout(() => {
			onSave(payload);
			setSaving(false);
		}, 150);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		style: overlayStyle,
		onClick: (e) => e.target === e.currentTarget && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .93,
				opacity: 0,
				y: 20
			},
			animate: {
				scale: 1,
				opacity: 1,
				y: 0
			},
			exit: {
				scale: .93,
				opacity: 0,
				y: 20
			},
			transition: {
				duration: .22,
				ease: [
					.16,
					1,
					.3,
					1
				]
			},
			style: {
				background: "#fff",
				borderRadius: 20,
				width: "100%",
				maxWidth: 640,
				maxHeight: "90vh",
				overflow: "hidden",
				boxShadow: "0 30px 80px rgba(0,0,0,0.28)",
				display: "flex",
				flexDirection: "column"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						padding: "1.2rem 1.5rem",
						borderBottom: "1px solid rgba(74,9,24,0.08)",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						flexShrink: 0
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						style: {
							fontFamily: "'Playfair Display', serif",
							fontSize: "1.15rem",
							fontWeight: 800,
							color: MAROON$6,
							margin: 0
						},
						children: isEdit ? "Edit Department" : "Add Department"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						style: {
							background: "none",
							border: "none",
							cursor: "pointer",
							color: "rgba(74,9,24,0.42)",
							display: "flex",
							padding: 6,
							borderRadius: 8
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 18 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						flex: 1,
						overflowY: "auto",
						padding: "1.25rem 1.5rem",
						display: "flex",
						flexDirection: "column",
						gap: "1rem"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: "0.75rem"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$5, {
								label: "Key (route slug) *",
								value: form.key,
								onChange: (v) => set("key", v),
								placeholder: "accounts"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl$5, { children: "Icon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: form.icon,
								onChange: (e) => set("icon", e.target.value),
								style: selectStyle$1,
								children: ICONS.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: i,
									children: i
								}, i))
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "flex",
								gap: 4,
								background: "rgba(74,9,24,0.05)",
								borderRadius: 10,
								padding: 4,
								width: "fit-content"
							},
							children: [
								["en", "English"],
								["si", "සිංහල"],
								["ta", "தமிழ்"]
							].map(([code, lbl]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setLangTab(code),
								style: {
									padding: "5px 14px",
									borderRadius: 7,
									border: "none",
									cursor: "pointer",
									background: langTab === code ? "#fff" : "transparent",
									color: langTab === code ? MAROON$6 : "rgba(74,9,24,0.42)",
									fontWeight: langTab === code ? 700 : 400,
									fontSize: "0.76rem",
									fontFamily: "Inter, sans-serif"
								},
								children: lbl
							}, code))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$5, {
							label: `Label (${langTab.toUpperCase()})${langTab === "en" ? " *" : ""}`,
							value: form.label[langTab],
							onChange: (v) => setLang("label", langTab, v)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$5, {
							label: `Short Label (${langTab.toUpperCase()})`,
							value: form.shortLabel[langTab],
							onChange: (v) => setLang("shortLabel", langTab, v)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldTextarea$2, {
							label: `Card Description (${langTab.toUpperCase()})`,
							value: form.desc[langTab],
							onChange: (v) => setLang("desc", langTab, v),
							rows: 2
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$5, {
							label: `Badge (${langTab.toUpperCase()})`,
							value: form.badge[langTab],
							onChange: (v) => setLang("badge", langTab, v)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldTextarea$2, {
							label: `Subtitle (${langTab.toUpperCase()})`,
							value: form.subtitle[langTab],
							onChange: (v) => setLang("subtitle", langTab, v),
							rows: 2
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldTextarea$2, {
							label: `Overview (${langTab.toUpperCase()})`,
							value: form.overview[langTab],
							onChange: (v) => setLang("overview", langTab, v),
							rows: 4
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldTextarea$2, {
							label: `Functions (${langTab.toUpperCase()}) — one per line`,
							value: form.functions[langTab],
							onChange: (v) => setLang("functions", langTab, v),
							rows: 4
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldTextarea$2, {
							label: `Responsibilities (${langTab.toUpperCase()}) — one per line`,
							value: form.responsibilities[langTab],
							onChange: (v) => setLang("responsibilities", langTab, v),
							rows: 4
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldTextarea$2, {
							label: `Services (${langTab.toUpperCase()}) — one per line`,
							value: form.services[langTab],
							onChange: (v) => setLang("services", langTab, v),
							rows: 2
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 8,
								padding: "9px 12px",
								borderRadius: 9,
								background: "rgba(220,38,38,0.07)",
								border: "1px solid rgba(220,38,38,0.18)"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: "0.78rem",
									color: "#dc2626"
								},
								children: error
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						padding: "0.9rem 1.5rem",
						borderTop: "1px solid rgba(74,9,24,0.07)",
						display: "flex",
						justifyContent: "flex-end",
						gap: 10,
						flexShrink: 0,
						background: "rgba(252,251,250,0.6)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						style: cancelBtnStyle,
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						whileHover: !saving ? {
							y: -1.5,
							boxShadow: "0 8px 22px rgba(74,9,24,0.34)"
						} : {},
						whileTap: !saving ? { scale: .97 } : {},
						onClick: handleSave,
						disabled: saving,
						style: {
							display: "flex",
							alignItems: "center",
							gap: 7,
							padding: "9px 22px",
							borderRadius: 10,
							border: "none",
							background: `linear-gradient(135deg, ${MAROON$6} 0%, #6E1528 100%)`,
							color: "#fff",
							fontSize: "0.83rem",
							fontWeight: 700,
							cursor: saving ? "not-allowed" : "pointer",
							fontFamily: "Inter, sans-serif",
							opacity: saving ? .7 : 1,
							boxShadow: "0 3px 12px rgba(74,9,24,0.28)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, { size: 14 }), saving ? "Saving…" : isEdit ? "Save Changes" : "Add Department"]
					})]
				})
			]
		})
	});
}
var iconBtn$2 = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: 30,
	height: 30,
	borderRadius: 8,
	border: "1px solid rgba(74,9,24,0.13)",
	background: "transparent",
	color: "rgba(74,9,24,0.48)",
	cursor: "pointer",
	transition: "all 0.15s"
};
var overlayStyle = {
	position: "fixed",
	inset: 0,
	background: "rgba(0,0,0,0.48)",
	zIndex: 200,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "1rem"
};
var cancelBtnStyle = {
	padding: "9px 20px",
	borderRadius: 10,
	border: "1px solid rgba(74,9,24,0.14)",
	background: "transparent",
	color: "rgba(74,9,24,0.55)",
	fontSize: "0.83rem",
	cursor: "pointer",
	fontFamily: "Inter, sans-serif",
	fontWeight: 500
};
var deleteBtnStyle = {
	padding: "9px 20px",
	borderRadius: 10,
	border: "none",
	background: "linear-gradient(135deg, #DC2626 0%, #b91c1c 100%)",
	color: "#fff",
	fontSize: "0.83rem",
	cursor: "pointer",
	fontFamily: "Inter, sans-serif",
	fontWeight: 600,
	display: "flex",
	alignItems: "center",
	gap: 7,
	boxShadow: "0 3px 12px rgba(220,38,38,0.3)"
};
var selectStyle$1 = {
	width: "100%",
	padding: "9px 12px",
	border: "1.5px solid rgba(74,9,24,0.15)",
	borderRadius: 9,
	fontSize: "0.83rem",
	fontFamily: "Inter, sans-serif",
	color: MAROON$6,
	background: "#fff",
	outline: "none",
	cursor: "pointer",
	appearance: "none",
	boxSizing: "border-box"
};
function LabelEl$5({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		style: {
			display: "block",
			fontSize: "0.72rem",
			fontWeight: 700,
			color: "rgba(74,9,24,0.55)",
			textTransform: "uppercase",
			letterSpacing: "0.08em",
			marginBottom: "0.4rem",
			fontFamily: "Inter, sans-serif"
		},
		children
	});
}
function FieldInput$5({ label, value, onChange, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl$5, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "text",
		value,
		onChange: (e) => onChange(e.target.value),
		placeholder,
		style: {
			width: "100%",
			padding: "9px 12px",
			borderRadius: 10,
			boxSizing: "border-box",
			border: "1px solid rgba(74,9,24,0.14)",
			outline: "none",
			fontSize: "0.82rem",
			color: MAROON$6,
			fontFamily: "Inter, sans-serif",
			background: "#fff"
		}
	})] });
}
function FieldTextarea$2({ label, value, onChange, rows = 3 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl$5, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		value,
		onChange: (e) => onChange(e.target.value),
		rows,
		style: {
			width: "100%",
			padding: "9px 12px",
			borderRadius: 10,
			boxSizing: "border-box",
			border: "1px solid rgba(74,9,24,0.14)",
			outline: "none",
			fontSize: "0.82rem",
			color: MAROON$6,
			fontFamily: "Inter, sans-serif",
			background: "#fff",
			resize: "vertical"
		}
	})] });
}
var MAROON$5 = "#4A0918";
var EMPTY = {
	address: "",
	phone: "",
	fax: "",
	email: "",
	hours: {
		en: "",
		si: "",
		ta: ""
	},
	socialLinks: {
		facebook: "",
		youtube: "",
		linkedin: ""
	}
};
function CMSSiteSettings() {
	const [form, setForm] = (0, import_react.useState)(EMPTY);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [langTab, setLangTab] = (0, import_react.useState)("en");
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		try {
			const res = await siteSettingsApi.get();
			setForm({
				...EMPTY,
				...res.data
			});
		} catch {
			toast.error("Failed to load site settings.");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	const set = (k, v) => setForm((f) => ({
		...f,
		[k]: v
	}));
	const setLang = (k, lang, v) => setForm((f) => ({
		...f,
		[k]: {
			...f[k],
			[lang]: v
		}
	}));
	const setSocial = (k, v) => setForm((f) => ({
		...f,
		socialLinks: {
			...f.socialLinks,
			[k]: v
		}
	}));
	const handleSave = async () => {
		setSaving(true);
		try {
			await siteSettingsApi.save(form);
			toast.success("Site settings saved");
		} catch {
			toast.error("Failed to save site settings.");
		} finally {
			setSaving(false);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			padding: "4rem",
			textAlign: "center",
			color: "rgba(74,9,24,0.4)"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiRefreshCw, {
			size: 22,
			style: { animation: "spin 0.9s linear infinite" }
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: { maxWidth: 640 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: { marginBottom: "1.25rem" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				style: {
					fontFamily: "'Playfair Display', serif",
					fontSize: "1.35rem",
					fontWeight: 800,
					color: MAROON$5,
					marginBottom: 4
				},
				children: "Site Settings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: {
					fontSize: "0.78rem",
					color: "rgba(74,9,24,0.45)",
					margin: 0
				},
				children: "Office contact info shown in the Navbar, Footer, and Contact page — edited once, used everywhere."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				background: "#fff",
				borderRadius: 16,
				border: "1px solid rgba(74,9,24,0.07)",
				boxShadow: "0 2px 12px rgba(74,9,24,0.05)",
				padding: "1.5rem",
				display: "flex",
				flexDirection: "column",
				gap: "1rem"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$4, {
					label: "Address",
					value: form.address,
					onChange: (v) => set("address", v),
					placeholder: "153B, S.H. Dahanayaka Mawatha, Galle, Sri Lanka"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: "0.75rem"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$4, {
						label: "Phone",
						value: form.phone,
						onChange: (v) => set("phone", v),
						placeholder: "+94 912234503"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$4, {
						label: "Fax",
						value: form.fax,
						onChange: (v) => set("fax", v),
						placeholder: "+94 912246554"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$4, {
					label: "Email",
					value: form.email,
					onChange: (v) => set("email", v),
					placeholder: "spdcsp@gmail.com"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl$4, { children: "Office Hours" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							display: "flex",
							gap: 4,
							background: "rgba(74,9,24,0.05)",
							borderRadius: 10,
							padding: 4,
							width: "fit-content",
							marginBottom: 8
						},
						children: [
							["en", "English"],
							["si", "සිංහල"],
							["ta", "தமிழ்"]
						].map(([code, lbl]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setLangTab(code),
							style: {
								padding: "5px 14px",
								borderRadius: 7,
								border: "none",
								cursor: "pointer",
								background: langTab === code ? "#fff" : "transparent",
								color: langTab === code ? MAROON$5 : "rgba(74,9,24,0.42)",
								fontWeight: langTab === code ? 700 : 400,
								fontSize: "0.76rem",
								fontFamily: "Inter, sans-serif"
							},
							children: lbl
						}, code))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: form.hours[langTab],
						onChange: (e) => setLang("hours", langTab, e.target.value),
						placeholder: "Mon – Fri: 8:30 AM – 4:30 PM",
						style: {
							width: "100%",
							padding: "9px 12px",
							borderRadius: 10,
							boxSizing: "border-box",
							border: "1px solid rgba(74,9,24,0.14)",
							outline: "none",
							fontSize: "0.82rem",
							color: MAROON$5,
							fontFamily: "Inter, sans-serif",
							background: "#fff"
						}
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						borderTop: "1px dashed rgba(74,9,24,0.15)",
						paddingTop: "1rem"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl$4, { children: "Social Media Links" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							flexDirection: "column",
							gap: 8,
							marginTop: 8
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$4, {
								label: "Facebook",
								value: form.socialLinks.facebook,
								onChange: (v) => setSocial("facebook", v),
								placeholder: "https://www.facebook.com/..."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$4, {
								label: "YouTube",
								value: form.socialLinks.youtube,
								onChange: (v) => setSocial("youtube", v),
								placeholder: "https://www.youtube.com/..."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$4, {
								label: "LinkedIn",
								value: form.socialLinks.linkedin,
								onChange: (v) => setSocial("linkedin", v),
								placeholder: "https://www.linkedin.com/..."
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "flex",
						justifyContent: "flex-end",
						paddingTop: "0.5rem"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						whileHover: !saving ? {
							y: -1.5,
							boxShadow: "0 8px 22px rgba(74,9,24,0.34)"
						} : {},
						whileTap: !saving ? { scale: .97 } : {},
						onClick: handleSave,
						disabled: saving,
						style: {
							display: "flex",
							alignItems: "center",
							gap: 7,
							padding: "9px 22px",
							borderRadius: 10,
							border: "none",
							background: `linear-gradient(135deg, ${MAROON$5} 0%, #6E1528 100%)`,
							color: "#fff",
							fontSize: "0.83rem",
							fontWeight: 700,
							cursor: saving ? "not-allowed" : "pointer",
							fontFamily: "Inter, sans-serif",
							opacity: saving ? .7 : 1,
							boxShadow: "0 3px 12px rgba(74,9,24,0.28)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, { size: 14 }), saving ? "Saving…" : "Save Settings"]
					})
				})
			]
		})]
	});
}
function LabelEl$4({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		style: {
			display: "block",
			fontSize: "0.72rem",
			fontWeight: 700,
			color: "rgba(74,9,24,0.55)",
			textTransform: "uppercase",
			letterSpacing: "0.08em",
			marginBottom: "0.4rem",
			fontFamily: "Inter, sans-serif"
		},
		children
	});
}
function FieldInput$4({ label, value, onChange, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl$4, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "text",
		value,
		onChange: (e) => onChange(e.target.value),
		placeholder,
		style: {
			width: "100%",
			padding: "9px 12px",
			borderRadius: 10,
			boxSizing: "border-box",
			border: "1px solid rgba(74,9,24,0.14)",
			outline: "none",
			fontSize: "0.82rem",
			color: MAROON$5,
			fontFamily: "Inter, sans-serif",
			background: "#fff"
		}
	})] });
}
var MAROON$4 = "#4A0918";
var GOLD$2 = "#C79A2B";
var EMPTY_LANG$1 = {
	en: "",
	si: "",
	ta: ""
};
var EMPTY_INTRO_LANG = {
	introLabel: "",
	introTitle: "",
	introParagraphs: "",
	visionLabel: "",
	visionText: "",
	missionLabel: "",
	missionText: "",
	imageAlt: "",
	officialGovt: "",
	officialGovtSub: ""
};
var EMPTY_LIST_LANG = {
	sectionLabel: "",
	items: ""
};
var EMPTY_AWARD = {
	id: "",
	img: "",
	title: { ...EMPTY_LANG$1 },
	year: "",
	desc: { ...EMPTY_LANG$1 }
};
var EMPTY_FORM$3 = {
	intro: {
		en: { ...EMPTY_INTRO_LANG },
		si: { ...EMPTY_INTRO_LANG },
		ta: { ...EMPTY_INTRO_LANG }
	},
	image: "",
	establishedBadge: { ...EMPTY_LANG$1 },
	values: {
		en: { ...EMPTY_LIST_LANG },
		si: { ...EMPTY_LIST_LANG },
		ta: { ...EMPTY_LIST_LANG }
	},
	objectives: {
		en: { ...EMPTY_LIST_LANG },
		si: { ...EMPTY_LIST_LANG },
		ta: { ...EMPTY_LIST_LANG }
	},
	awards: {
		sectionLabel: { ...EMPTY_LANG$1 },
		items: [
			{ ...EMPTY_AWARD },
			{ ...EMPTY_AWARD },
			{ ...EMPTY_AWARD }
		]
	}
};
var listToText$2 = (arr) => (arr || []).join("\n");
var textToList$2 = (text) => text.split("\n").map((s) => s.trim()).filter(Boolean);
function CMSAboutOverview() {
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM$3);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [openAward, setOpenAward] = (0, import_react.useState)(0);
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		try {
			const { data } = await aboutOverviewApi.get();
			setForm({
				intro: {
					en: {
						...EMPTY_INTRO_LANG,
						...data.intro?.en,
						introParagraphs: listToText$2(data.intro?.en?.introParagraphs)
					},
					si: {
						...EMPTY_INTRO_LANG,
						...data.intro?.si,
						introParagraphs: listToText$2(data.intro?.si?.introParagraphs)
					},
					ta: {
						...EMPTY_INTRO_LANG,
						...data.intro?.ta,
						introParagraphs: listToText$2(data.intro?.ta?.introParagraphs)
					}
				},
				image: data.image || "",
				establishedBadge: {
					...EMPTY_LANG$1,
					...data.establishedBadge
				},
				values: {
					en: {
						sectionLabel: data.values?.en?.sectionLabel || "",
						items: listToText$2(data.values?.en?.items)
					},
					si: {
						sectionLabel: data.values?.si?.sectionLabel || "",
						items: listToText$2(data.values?.si?.items)
					},
					ta: {
						sectionLabel: data.values?.ta?.sectionLabel || "",
						items: listToText$2(data.values?.ta?.items)
					}
				},
				objectives: {
					en: {
						sectionLabel: data.objectives?.en?.sectionLabel || "",
						items: listToText$2(data.objectives?.en?.items)
					},
					si: {
						sectionLabel: data.objectives?.si?.sectionLabel || "",
						items: listToText$2(data.objectives?.si?.items)
					},
					ta: {
						sectionLabel: data.objectives?.ta?.sectionLabel || "",
						items: listToText$2(data.objectives?.ta?.items)
					}
				},
				awards: {
					sectionLabel: {
						...EMPTY_LANG$1,
						...data.awards?.sectionLabel
					},
					items: data.awards?.items?.length ? data.awards.items.map((a) => ({
						...EMPTY_AWARD,
						...a,
						title: {
							...EMPTY_LANG$1,
							...a.title
						},
						desc: {
							...EMPTY_LANG$1,
							...a.desc
						}
					})) : [
						{ ...EMPTY_AWARD },
						{ ...EMPTY_AWARD },
						{ ...EMPTY_AWARD }
					]
				}
			});
		} catch {
			toast.error("Failed to load Overview content.");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	const setIntroLang = (lang, key, v) => setForm((f) => ({
		...f,
		intro: {
			...f.intro,
			[lang]: {
				...f.intro[lang],
				[key]: v
			}
		}
	}));
	const setValuesLang = (lang, key, v) => setForm((f) => ({
		...f,
		values: {
			...f.values,
			[lang]: {
				...f.values[lang],
				[key]: v
			}
		}
	}));
	const setObjectivesLang = (lang, key, v) => setForm((f) => ({
		...f,
		objectives: {
			...f.objectives,
			[lang]: {
				...f.objectives[lang],
				[key]: v
			}
		}
	}));
	const setEstablishedBadge = (lang, v) => setForm((f) => ({
		...f,
		establishedBadge: {
			...f.establishedBadge,
			[lang]: v
		}
	}));
	const setAwardsSectionLabel = (lang, v) => setForm((f) => ({
		...f,
		awards: {
			...f.awards,
			sectionLabel: {
				...f.awards.sectionLabel,
				[lang]: v
			}
		}
	}));
	const updateAward = (idx, patch) => setForm((f) => ({
		...f,
		awards: {
			...f.awards,
			items: f.awards.items.map((a, i) => i === idx ? {
				...a,
				...patch
			} : a)
		}
	}));
	const updateAwardLang = (idx, key, lang, v) => setForm((f) => ({
		...f,
		awards: {
			...f.awards,
			items: f.awards.items.map((a, i) => i === idx ? {
				...a,
				[key]: {
					...a[key],
					[lang]: v
				}
			} : a)
		}
	}));
	const uploadIntroImage = async (file) => {
		try {
			const { data } = await uploadImage(file);
			setForm((f) => ({
				...f,
				image: data.url
			}));
		} catch {
			toast.error("Failed to upload intro image.");
		}
	};
	const uploadAwardImage = async (idx, file) => {
		try {
			const { data } = await uploadImage(file);
			updateAward(idx, { img: data.url });
		} catch {
			toast.error("Failed to upload award image.");
		}
	};
	const handleSave = async () => {
		setSaving(true);
		try {
			const payload = {
				intro: {
					en: {
						...form.intro.en,
						introParagraphs: textToList$2(form.intro.en.introParagraphs)
					},
					si: {
						...form.intro.si,
						introParagraphs: textToList$2(form.intro.si.introParagraphs)
					},
					ta: {
						...form.intro.ta,
						introParagraphs: textToList$2(form.intro.ta.introParagraphs)
					}
				},
				image: form.image,
				establishedBadge: form.establishedBadge,
				values: {
					en: {
						sectionLabel: form.values.en.sectionLabel,
						items: textToList$2(form.values.en.items)
					},
					si: {
						sectionLabel: form.values.si.sectionLabel,
						items: textToList$2(form.values.si.items)
					},
					ta: {
						sectionLabel: form.values.ta.sectionLabel,
						items: textToList$2(form.values.ta.items)
					}
				},
				objectives: {
					en: {
						sectionLabel: form.objectives.en.sectionLabel,
						items: textToList$2(form.objectives.en.items)
					},
					si: {
						sectionLabel: form.objectives.si.sectionLabel,
						items: textToList$2(form.objectives.si.items)
					},
					ta: {
						sectionLabel: form.objectives.ta.sectionLabel,
						items: textToList$2(form.objectives.ta.items)
					}
				},
				awards: form.awards
			};
			await aboutOverviewApi.save(payload);
			toast.success("Overview content saved");
		} catch {
			toast.error("Failed to save Overview content.");
		} finally {
			setSaving(false);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			padding: "4rem",
			textAlign: "center",
			color: "rgba(74,9,24,0.4)"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiRefreshCw, {
			size: 22,
			style: { animation: "spin 0.9s linear infinite" }
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: { maxWidth: 720 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: { marginBottom: "1.25rem" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					style: {
						fontFamily: "'Playfair Display', serif",
						fontSize: "1.35rem",
						fontWeight: 800,
						color: MAROON$4,
						marginBottom: 4
					},
					children: "About: Overview"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: {
						fontSize: "0.78rem",
						color: "rgba(74,9,24,0.45)",
						margin: 0
					},
					children: "Introduction, vision/mission, values, objectives, and awards on the About Overview page."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard$2, {
				title: "Introduction",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePicker$1, {
						image: form.image,
						onUpload: uploadIntroImage
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$3, {
						label: "Established Badge (EN)",
						value: form.establishedBadge.en,
						onChange: (v) => setEstablishedBadge("en", v),
						placeholder: "e.g. Est. 1978"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							gap: "0.75rem"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$3, {
							label: "Established Badge (SI)",
							value: form.establishedBadge.si,
							onChange: (v) => setEstablishedBadge("si", v)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$3, {
							label: "Established Badge (TA)",
							value: form.establishedBadge.ta,
							onChange: (v) => setEstablishedBadge("ta", v)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField$1, {
						label: "Intro Label",
						value: {
							en: form.intro.en.introLabel,
							si: form.intro.si.introLabel,
							ta: form.intro.ta.introLabel
						},
						onChange: (lang, v) => setIntroLang(lang, "introLabel", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField$1, {
						label: "Intro Title",
						value: {
							en: form.intro.en.introTitle,
							si: form.intro.si.introTitle,
							ta: form.intro.ta.introTitle
						},
						onChange: (lang, v) => setIntroLang(lang, "introTitle", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField$1, {
						label: "Intro Paragraphs — one per line",
						value: {
							en: form.intro.en.introParagraphs,
							si: form.intro.si.introParagraphs,
							ta: form.intro.ta.introParagraphs
						},
						onChange: (lang, v) => setIntroLang(lang, "introParagraphs", v),
						textarea: true,
						rows: 8
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField$1, {
						label: "Image Alt Text",
						value: {
							en: form.intro.en.imageAlt,
							si: form.intro.si.imageAlt,
							ta: form.intro.ta.imageAlt
						},
						onChange: (lang, v) => setIntroLang(lang, "imageAlt", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField$1, {
						label: "Official Government Label",
						value: {
							en: form.intro.en.officialGovt,
							si: form.intro.si.officialGovt,
							ta: form.intro.ta.officialGovt
						},
						onChange: (lang, v) => setIntroLang(lang, "officialGovt", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField$1, {
						label: "Official Government Sub-label",
						value: {
							en: form.intro.en.officialGovtSub,
							si: form.intro.si.officialGovtSub,
							ta: form.intro.ta.officialGovtSub
						},
						onChange: (lang, v) => setIntroLang(lang, "officialGovtSub", v)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard$2, {
				title: "Vision & Mission",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField$1, {
						label: "Vision Label",
						value: {
							en: form.intro.en.visionLabel,
							si: form.intro.si.visionLabel,
							ta: form.intro.ta.visionLabel
						},
						onChange: (lang, v) => setIntroLang(lang, "visionLabel", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField$1, {
						label: "Vision Text",
						value: {
							en: form.intro.en.visionText,
							si: form.intro.si.visionText,
							ta: form.intro.ta.visionText
						},
						onChange: (lang, v) => setIntroLang(lang, "visionText", v),
						textarea: true,
						rows: 3
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField$1, {
						label: "Mission Label",
						value: {
							en: form.intro.en.missionLabel,
							si: form.intro.si.missionLabel,
							ta: form.intro.ta.missionLabel
						},
						onChange: (lang, v) => setIntroLang(lang, "missionLabel", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField$1, {
						label: "Mission Text",
						value: {
							en: form.intro.en.missionText,
							si: form.intro.si.missionText,
							ta: form.intro.ta.missionText
						},
						onChange: (lang, v) => setIntroLang(lang, "missionText", v),
						textarea: true,
						rows: 3
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard$2, {
				title: "Values",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField$1, {
					label: "Section Label",
					value: {
						en: form.values.en.sectionLabel,
						si: form.values.si.sectionLabel,
						ta: form.values.ta.sectionLabel
					},
					onChange: (lang, v) => setValuesLang(lang, "sectionLabel", v)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField$1, {
					label: "Values — one per line",
					value: {
						en: form.values.en.items,
						si: form.values.si.items,
						ta: form.values.ta.items
					},
					onChange: (lang, v) => setValuesLang(lang, "items", v),
					textarea: true,
					rows: 8
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard$2, {
				title: "Objectives",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField$1, {
					label: "Section Label",
					value: {
						en: form.objectives.en.sectionLabel,
						si: form.objectives.si.sectionLabel,
						ta: form.objectives.ta.sectionLabel
					},
					onChange: (lang, v) => setObjectivesLang(lang, "sectionLabel", v)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField$1, {
					label: "Objectives — one per line",
					value: {
						en: form.objectives.en.items,
						si: form.objectives.si.items,
						ta: form.objectives.ta.items
					},
					onChange: (lang, v) => setObjectivesLang(lang, "items", v),
					textarea: true,
					rows: 5
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard$2, {
				title: "Awards",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField$1, {
					label: "Section Label",
					value: form.awards.sectionLabel,
					onChange: setAwardsSectionLabel
				}), form.awards.items.map((award, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AwardEditor, {
					idx,
					award,
					open: openAward === idx,
					onToggle: () => setOpenAward(openAward === idx ? -1 : idx),
					onChangeField: (key, v) => updateAward(idx, { [key]: v }),
					onChangeLang: (key, lang, v) => updateAwardLang(idx, key, lang, v),
					onUploadImage: (file) => uploadAwardImage(idx, file)
				}, idx))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					display: "flex",
					justifyContent: "flex-end"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
					whileHover: !saving ? {
						y: -1.5,
						boxShadow: "0 8px 22px rgba(74,9,24,0.34)"
					} : {},
					whileTap: !saving ? { scale: .97 } : {},
					onClick: handleSave,
					disabled: saving,
					style: {
						display: "flex",
						alignItems: "center",
						gap: 7,
						padding: "10px 26px",
						borderRadius: 10,
						border: "none",
						background: `linear-gradient(135deg, ${MAROON$4} 0%, #6E1528 100%)`,
						color: "#fff",
						fontSize: "0.85rem",
						fontWeight: 700,
						cursor: saving ? "not-allowed" : "pointer",
						fontFamily: "Inter, sans-serif",
						opacity: saving ? .7 : 1,
						boxShadow: "0 3px 12px rgba(74,9,24,0.28)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, { size: 14 }), saving ? "Saving…" : "Save Overview Content"]
				})
			})
		]
	});
}
function AwardEditor({ idx, award, open, onToggle, onChangeField, onChangeLang, onUploadImage }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			border: "1px solid rgba(74,9,24,0.1)",
			borderRadius: 12,
			marginBottom: 10,
			overflow: "hidden"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: onToggle,
			style: {
				width: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "10px 14px",
				background: "rgba(74,9,24,0.03)",
				border: "none",
				cursor: "pointer"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				style: {
					fontSize: "0.82rem",
					fontWeight: 700,
					color: MAROON$4
				},
				children: [
					"Award ",
					idx + 1,
					award.title?.en ? ` — ${award.title.en}` : ""
				]
			}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronUp, {
				size: 14,
				color: MAROON$4
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronDown, {
				size: 14,
				color: MAROON$4
			})]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				padding: "1rem",
				display: "flex",
				flexDirection: "column",
				gap: "0.85rem"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePicker$1, {
					image: award.img,
					onUpload: onUploadImage
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField$1, {
					label: "Title",
					value: award.title,
					onChange: (lang, v) => onChangeLang("title", lang, v)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$3, {
					label: "Year",
					value: award.year,
					onChange: (v) => onChangeField("year", v),
					placeholder: "e.g. 2023"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField$1, {
					label: "Description",
					value: award.desc,
					onChange: (lang, v) => onChangeLang("desc", lang, v),
					textarea: true,
					rows: 3
				})
			]
		})]
	});
}
function SectionCard$2({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			background: "#fff",
			borderRadius: 16,
			border: "1px solid rgba(74,9,24,0.07)",
			boxShadow: "0 2px 12px rgba(74,9,24,0.05)",
			padding: "1.5rem",
			marginBottom: "1.25rem",
			display: "flex",
			flexDirection: "column",
			gap: "0.9rem"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			style: {
				fontFamily: "'Playfair Display', serif",
				fontSize: "1.02rem",
				fontWeight: 800,
				color: MAROON$4,
				margin: 0
			},
			children: title
		}), children]
	});
}
function ImagePicker$1({ image, onUpload }) {
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const handleFile = async (e) => {
		const file = e.target.files?.[0];
		e.target.value = "";
		if (!file) return;
		setUploading(true);
		await onUpload(file);
		setUploading(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			alignItems: "center",
			gap: 12
		},
		children: [uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				width: 80,
				height: 50,
				borderRadius: 8,
				background: "rgba(74,9,24,0.05)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiRefreshCw, {
				size: 16,
				color: GOLD$2,
				style: { animation: "spin 0.9s linear infinite" }
			})
		}) : image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: resolveUploadUrl(image),
			alt: "",
			style: {
				width: 80,
				height: 50,
				borderRadius: 8,
				objectFit: "cover"
			}
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				width: 80,
				height: 50,
				borderRadius: 8,
				background: "rgba(74,9,24,0.06)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiImage, {
				size: 16,
				color: "rgba(74,9,24,0.28)"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			style: {
				padding: "7px 14px",
				borderRadius: 9,
				border: "1px solid rgba(74,9,24,0.14)",
				fontSize: "0.76rem",
				fontWeight: 600,
				color: MAROON$4,
				cursor: "pointer"
			},
			children: [image ? "Change Image" : "Upload Image", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "file",
				accept: "image/*",
				onChange: handleFile,
				style: { display: "none" }
			})]
		})]
	});
}
function LangTabbedField$1({ label, value, onChange, textarea = false, rows = 2 }) {
	const [langTab, setLangTab] = (0, import_react.useState)("en");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			marginBottom: 6
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl$3, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				display: "flex",
				gap: 2,
				background: "rgba(74,9,24,0.05)",
				borderRadius: 8,
				padding: 3
			},
			children: [
				["en", "EN"],
				["si", "SI"],
				["ta", "TA"]
			].map(([code, lbl]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setLangTab(code),
				style: {
					padding: "3px 9px",
					borderRadius: 6,
					border: "none",
					cursor: "pointer",
					background: langTab === code ? "#fff" : "transparent",
					color: langTab === code ? MAROON$4 : "rgba(74,9,24,0.42)",
					fontWeight: langTab === code ? 700 : 400,
					fontSize: "0.68rem",
					fontFamily: "Inter, sans-serif"
				},
				children: lbl
			}, code))
		})]
	}), textarea ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		value: value[langTab],
		onChange: (e) => onChange(langTab, e.target.value),
		rows,
		style: {
			width: "100%",
			padding: "9px 12px",
			borderRadius: 10,
			boxSizing: "border-box",
			border: "1px solid rgba(74,9,24,0.14)",
			outline: "none",
			fontSize: "0.82rem",
			color: MAROON$4,
			fontFamily: "Inter, sans-serif",
			background: "#fff",
			resize: "vertical"
		}
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "text",
		value: value[langTab],
		onChange: (e) => onChange(langTab, e.target.value),
		style: {
			width: "100%",
			padding: "9px 12px",
			borderRadius: 10,
			boxSizing: "border-box",
			border: "1px solid rgba(74,9,24,0.14)",
			outline: "none",
			fontSize: "0.82rem",
			color: MAROON$4,
			fontFamily: "Inter, sans-serif",
			background: "#fff"
		}
	})] });
}
function LabelEl$3({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		style: {
			display: "block",
			fontSize: "0.72rem",
			fontWeight: 700,
			color: "rgba(74,9,24,0.55)",
			textTransform: "uppercase",
			letterSpacing: "0.08em",
			marginBottom: "0.4rem",
			fontFamily: "Inter, sans-serif"
		},
		children
	});
}
function FieldInput$3({ label, value, onChange, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl$3, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "text",
		value,
		onChange: (e) => onChange(e.target.value),
		placeholder,
		style: {
			width: "100%",
			padding: "9px 12px",
			borderRadius: 10,
			boxSizing: "border-box",
			border: "1px solid rgba(74,9,24,0.14)",
			outline: "none",
			fontSize: "0.82rem",
			color: MAROON$4,
			fontFamily: "Inter, sans-serif",
			background: "#fff"
		}
	})] });
}
var MAROON$3 = "#4A0918";
var EMPTY_LANG_BLOCK$1 = {
	sectionLabel: "",
	intro: "",
	duties: ""
};
var EMPTY_FORM$2 = {
	en: { ...EMPTY_LANG_BLOCK$1 },
	si: { ...EMPTY_LANG_BLOCK$1 },
	ta: { ...EMPTY_LANG_BLOCK$1 }
};
var listToText$1 = (arr) => (arr || []).join("\n");
var textToList$1 = (text) => text.split("\n").map((s) => s.trim()).filter(Boolean);
function CMSAboutFunctions() {
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM$2);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [langTab, setLangTab] = (0, import_react.useState)("en");
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		try {
			const data = (await aboutFunctionsApi.get()).data;
			setForm({
				en: {
					sectionLabel: data.en?.sectionLabel || "",
					intro: data.en?.intro || "",
					duties: listToText$1(data.en?.duties)
				},
				si: {
					sectionLabel: data.si?.sectionLabel || "",
					intro: data.si?.intro || "",
					duties: listToText$1(data.si?.duties)
				},
				ta: {
					sectionLabel: data.ta?.sectionLabel || "",
					intro: data.ta?.intro || "",
					duties: listToText$1(data.ta?.duties)
				}
			});
		} catch {
			toast.error("Failed to load Functions & Duties content.");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	const setLang = (lang, key, v) => setForm((f) => ({
		...f,
		[lang]: {
			...f[lang],
			[key]: v
		}
	}));
	const handleSave = async () => {
		setSaving(true);
		try {
			const payload = {
				en: {
					sectionLabel: form.en.sectionLabel,
					intro: form.en.intro,
					duties: textToList$1(form.en.duties)
				},
				si: {
					sectionLabel: form.si.sectionLabel,
					intro: form.si.intro,
					duties: textToList$1(form.si.duties)
				},
				ta: {
					sectionLabel: form.ta.sectionLabel,
					intro: form.ta.intro,
					duties: textToList$1(form.ta.duties)
				}
			};
			await aboutFunctionsApi.save(payload);
			toast.success("Functions & Duties content saved");
		} catch {
			toast.error("Failed to save Functions & Duties content.");
		} finally {
			setSaving(false);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			padding: "4rem",
			textAlign: "center",
			color: "rgba(74,9,24,0.4)"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiRefreshCw, {
			size: 22,
			style: { animation: "spin 0.9s linear infinite" }
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: { maxWidth: 640 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: { marginBottom: "1.25rem" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				style: {
					fontFamily: "'Playfair Display', serif",
					fontSize: "1.35rem",
					fontWeight: 800,
					color: MAROON$3,
					marginBottom: 4
				},
				children: "About: Functions & Duties"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: {
					fontSize: "0.78rem",
					color: "rgba(74,9,24,0.45)",
					margin: 0
				},
				children: "Edits the \"Functions & Duties\" page under About."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				background: "#fff",
				borderRadius: 16,
				border: "1px solid rgba(74,9,24,0.07)",
				boxShadow: "0 2px 12px rgba(74,9,24,0.05)",
				padding: "1.5rem",
				display: "flex",
				flexDirection: "column",
				gap: "1rem"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "flex",
						gap: 4,
						background: "rgba(74,9,24,0.05)",
						borderRadius: 10,
						padding: 4,
						width: "fit-content"
					},
					children: [
						["en", "English"],
						["si", "සිංහල"],
						["ta", "தமிழ்"]
					].map(([code, lbl]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setLangTab(code),
						style: {
							padding: "5px 14px",
							borderRadius: 7,
							border: "none",
							cursor: "pointer",
							background: langTab === code ? "#fff" : "transparent",
							color: langTab === code ? MAROON$3 : "rgba(74,9,24,0.42)",
							fontWeight: langTab === code ? 700 : 400,
							fontSize: "0.76rem",
							fontFamily: "Inter, sans-serif"
						},
						children: lbl
					}, code))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$2, {
					label: `Section Label (${langTab.toUpperCase()})`,
					value: form[langTab].sectionLabel,
					onChange: (v) => setLang(langTab, "sectionLabel", v)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldTextarea$1, {
					label: `Intro Paragraph (${langTab.toUpperCase()})`,
					value: form[langTab].intro,
					onChange: (v) => setLang(langTab, "intro", v),
					rows: 3
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldTextarea$1, {
					label: `Duties (${langTab.toUpperCase()}) — one per line`,
					value: form[langTab].duties,
					onChange: (v) => setLang(langTab, "duties", v),
					rows: 10
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "flex",
						justifyContent: "flex-end",
						paddingTop: "0.5rem"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						whileHover: !saving ? {
							y: -1.5,
							boxShadow: "0 8px 22px rgba(74,9,24,0.34)"
						} : {},
						whileTap: !saving ? { scale: .97 } : {},
						onClick: handleSave,
						disabled: saving,
						style: {
							display: "flex",
							alignItems: "center",
							gap: 7,
							padding: "9px 22px",
							borderRadius: 10,
							border: "none",
							background: `linear-gradient(135deg, ${MAROON$3} 0%, #6E1528 100%)`,
							color: "#fff",
							fontSize: "0.83rem",
							fontWeight: 700,
							cursor: saving ? "not-allowed" : "pointer",
							fontFamily: "Inter, sans-serif",
							opacity: saving ? .7 : 1,
							boxShadow: "0 3px 12px rgba(74,9,24,0.28)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, { size: 14 }), saving ? "Saving…" : "Save"]
					})
				})
			]
		})]
	});
}
function LabelEl$2({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		style: {
			display: "block",
			fontSize: "0.72rem",
			fontWeight: 700,
			color: "rgba(74,9,24,0.55)",
			textTransform: "uppercase",
			letterSpacing: "0.08em",
			marginBottom: "0.4rem",
			fontFamily: "Inter, sans-serif"
		},
		children
	});
}
function FieldInput$2({ label, value, onChange, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl$2, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "text",
		value,
		onChange: (e) => onChange(e.target.value),
		placeholder,
		style: {
			width: "100%",
			padding: "9px 12px",
			borderRadius: 10,
			boxSizing: "border-box",
			border: "1px solid rgba(74,9,24,0.14)",
			outline: "none",
			fontSize: "0.82rem",
			color: MAROON$3,
			fontFamily: "Inter, sans-serif",
			background: "#fff"
		}
	})] });
}
function FieldTextarea$1({ label, value, onChange, rows = 3 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl$2, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		value,
		onChange: (e) => onChange(e.target.value),
		rows,
		style: {
			width: "100%",
			padding: "9px 12px",
			borderRadius: 10,
			boxSizing: "border-box",
			border: "1px solid rgba(74,9,24,0.14)",
			outline: "none",
			fontSize: "0.82rem",
			color: MAROON$3,
			fontFamily: "Inter, sans-serif",
			background: "#fff",
			resize: "vertical"
		}
	})] });
}
var MAROON$2 = "#4A0918";
var TIERS = [
	"apex",
	"director",
	"division",
	"dd",
	"stat",
	"officer",
	"admin",
	"support"
];
var EMPTY_LANG = {
	en: "",
	si: "",
	ta: ""
};
var EMPTY_NODE = {
	id: "",
	parentId: null,
	tier: "officer",
	order: 0,
	title: { ...EMPTY_LANG },
	sub: { ...EMPTY_LANG },
	count: { ...EMPTY_LANG }
};
var EMPTY_UI = {
	intro: {
		en: {
			title: "",
			text: ""
		},
		si: {
			title: "",
			text: ""
		},
		ta: {
			title: "",
			text: ""
		}
	},
	cardHeader: {
		en: {
			title: "",
			sub: ""
		},
		si: {
			title: "",
			sub: ""
		},
		ta: {
			title: "",
			sub: ""
		}
	},
	scrollHints: {
		en: {
			mobile: "",
			mobileBottom: "",
			desktop: ""
		},
		si: {
			mobile: "",
			mobileBottom: "",
			desktop: ""
		},
		ta: {
			mobile: "",
			mobileBottom: "",
			desktop: ""
		}
	},
	legend: {
		en: [],
		si: [],
		ta: []
	},
	footer: {
		en: {
			title: "",
			sub: ""
		},
		si: {
			title: "",
			sub: ""
		},
		ta: {
			title: "",
			sub: ""
		}
	},
	imgFallbackLabel: { ...EMPTY_LANG }
};
var EMPTY_FORM$1 = {
	nodes: [],
	ui: EMPTY_UI
};
var listToText = (arr) => (arr || []).join("\n");
var textToList = (text) => text.split("\n").map((s) => s.trim()).filter(Boolean);
function CMSOrgStructure() {
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM$1);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [openNode, setOpenNode] = (0, import_react.useState)(-1);
	const [legendText, setLegendText] = (0, import_react.useState)({
		en: "",
		si: "",
		ta: ""
	});
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		try {
			const { data } = await orgStructureApi.get();
			setForm({
				nodes: data.nodes?.length ? data.nodes.map((n) => ({
					...EMPTY_NODE,
					...n,
					title: {
						...EMPTY_LANG,
						...n.title
					},
					sub: {
						...EMPTY_LANG,
						...n.sub
					},
					count: {
						...EMPTY_LANG,
						...n.count
					}
				})) : [],
				ui: {
					intro: {
						...EMPTY_UI.intro,
						...data.ui?.intro
					},
					cardHeader: {
						...EMPTY_UI.cardHeader,
						...data.ui?.cardHeader
					},
					scrollHints: {
						...EMPTY_UI.scrollHints,
						...data.ui?.scrollHints
					},
					legend: {
						...EMPTY_UI.legend,
						...data.ui?.legend
					},
					footer: {
						...EMPTY_UI.footer,
						...data.ui?.footer
					},
					imgFallbackLabel: {
						...EMPTY_LANG,
						...data.ui?.imgFallbackLabel
					}
				}
			});
			setLegendText({
				en: listToText(data.ui?.legend?.en),
				si: listToText(data.ui?.legend?.si),
				ta: listToText(data.ui?.legend?.ta)
			});
		} catch {
			toast.error("Failed to load Organization Structure content.");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	const updateNode = (idx, patch) => setForm((f) => ({
		...f,
		nodes: f.nodes.map((n, i) => i === idx ? {
			...n,
			...patch
		} : n)
	}));
	const updateNodeLang = (idx, key, lang, v) => setForm((f) => ({
		...f,
		nodes: f.nodes.map((n, i) => i === idx ? {
			...n,
			[key]: {
				...n[key],
				[lang]: v
			}
		} : n)
	}));
	const addNode = () => setForm((f) => ({
		...f,
		nodes: [...f.nodes, {
			...EMPTY_NODE,
			id: `node-${Date.now()}`,
			order: f.nodes.length
		}]
	}));
	const removeNode = (idx) => setForm((f) => ({
		...f,
		nodes: f.nodes.filter((_, i) => i !== idx)
	}));
	const setUiField = (section, lang, key, v) => setForm((f) => ({
		...f,
		ui: {
			...f.ui,
			[section]: {
				...f.ui[section],
				[lang]: {
					...f.ui[section][lang],
					[key]: v
				}
			}
		}
	}));
	const setImgFallback = (lang, v) => setForm((f) => ({
		...f,
		ui: {
			...f.ui,
			imgFallbackLabel: {
				...f.ui.imgFallbackLabel,
				[lang]: v
			}
		}
	}));
	const handleSave = async () => {
		setSaving(true);
		try {
			const payload = {
				nodes: form.nodes,
				ui: {
					...form.ui,
					legend: {
						en: textToList(legendText.en),
						si: textToList(legendText.si),
						ta: textToList(legendText.ta)
					}
				}
			};
			await orgStructureApi.save(payload);
			toast.success("Organization Structure saved");
		} catch {
			toast.error("Failed to save Organization Structure.");
		} finally {
			setSaving(false);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			padding: "4rem",
			textAlign: "center",
			color: "rgba(74,9,24,0.4)"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiRefreshCw, {
			size: 22,
			style: { animation: "spin 0.9s linear infinite" }
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: { maxWidth: 760 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					marginBottom: "1.25rem",
					display: "flex",
					alignItems: "flex-start",
					justifyContent: "space-between",
					flexWrap: "wrap",
					gap: 12
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					style: {
						fontFamily: "'Playfair Display', serif",
						fontSize: "1.35rem",
						fontWeight: 800,
						color: MAROON$2,
						marginBottom: 4
					},
					children: "About: Organization Structure"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					style: {
						fontSize: "0.78rem",
						color: "rgba(74,9,24,0.45)",
						margin: 0
					},
					children: [
						form.nodes.length,
						" node",
						form.nodes.length !== 1 ? "s" : "",
						" in the org chart tree."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: addNode,
					style: {
						display: "flex",
						alignItems: "center",
						gap: 6,
						padding: "8px 16px",
						borderRadius: 10,
						border: "none",
						background: `linear-gradient(135deg, ${MAROON$2} 0%, #6E1528 100%)`,
						color: "#fff",
						fontSize: "0.8rem",
						fontWeight: 600,
						cursor: "pointer"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPlus, { size: 13 }), " Add Node"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard$1, {
				title: "Nodes",
				children: [form.nodes.map((node, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NodeEditor, {
					idx,
					node,
					allNodes: form.nodes,
					open: openNode === idx,
					onToggle: () => setOpenNode(openNode === idx ? -1 : idx),
					onChangeField: (key, v) => updateNode(idx, { [key]: v }),
					onChangeLang: (key, lang, v) => updateNodeLang(idx, key, lang, v),
					onRemove: () => removeNode(idx)
				}, idx)), form.nodes.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: {
						fontSize: "0.82rem",
						color: "rgba(74,9,24,0.4)",
						textAlign: "center",
						padding: "1.5rem 0"
					},
					children: "No nodes yet. Click \"Add Node\" to start building the chart."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard$1, {
				title: "UI Chrome",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField, {
						label: "Intro Title",
						value: {
							en: form.ui.intro.en.title,
							si: form.ui.intro.si.title,
							ta: form.ui.intro.ta.title
						},
						onChange: (lang, v) => setUiField("intro", lang, "title", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField, {
						label: "Intro Text",
						value: {
							en: form.ui.intro.en.text,
							si: form.ui.intro.si.text,
							ta: form.ui.intro.ta.text
						},
						onChange: (lang, v) => setUiField("intro", lang, "text", v),
						textarea: true,
						rows: 3
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField, {
						label: "Card Header Title",
						value: {
							en: form.ui.cardHeader.en.title,
							si: form.ui.cardHeader.si.title,
							ta: form.ui.cardHeader.ta.title
						},
						onChange: (lang, v) => setUiField("cardHeader", lang, "title", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField, {
						label: "Card Header Subtitle",
						value: {
							en: form.ui.cardHeader.en.sub,
							si: form.ui.cardHeader.si.sub,
							ta: form.ui.cardHeader.ta.sub
						},
						onChange: (lang, v) => setUiField("cardHeader", lang, "sub", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField, {
						label: "Scroll Hint (Mobile)",
						value: {
							en: form.ui.scrollHints.en.mobile,
							si: form.ui.scrollHints.si.mobile,
							ta: form.ui.scrollHints.ta.mobile
						},
						onChange: (lang, v) => setUiField("scrollHints", lang, "mobile", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField, {
						label: "Scroll Hint (Mobile Bottom)",
						value: {
							en: form.ui.scrollHints.en.mobileBottom,
							si: form.ui.scrollHints.si.mobileBottom,
							ta: form.ui.scrollHints.ta.mobileBottom
						},
						onChange: (lang, v) => setUiField("scrollHints", lang, "mobileBottom", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField, {
						label: "Scroll Hint (Desktop)",
						value: {
							en: form.ui.scrollHints.en.desktop,
							si: form.ui.scrollHints.si.desktop,
							ta: form.ui.scrollHints.ta.desktop
						},
						onChange: (lang, v) => setUiField("scrollHints", lang, "desktop", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField, {
						label: "Legend Labels — one per line",
						value: legendText,
						onChange: (lang, v) => setLegendText((t) => ({
							...t,
							[lang]: v
						})),
						textarea: true,
						rows: 7
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField, {
						label: "Footer Title",
						value: {
							en: form.ui.footer.en.title,
							si: form.ui.footer.si.title,
							ta: form.ui.footer.ta.title
						},
						onChange: (lang, v) => setUiField("footer", lang, "title", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField, {
						label: "Footer Subtitle",
						value: {
							en: form.ui.footer.en.sub,
							si: form.ui.footer.si.sub,
							ta: form.ui.footer.ta.sub
						},
						onChange: (lang, v) => setUiField("footer", lang, "sub", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField, {
						label: "Image Fallback Label",
						value: form.ui.imgFallbackLabel,
						onChange: setImgFallback
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					display: "flex",
					justifyContent: "flex-end"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
					whileHover: !saving ? {
						y: -1.5,
						boxShadow: "0 8px 22px rgba(74,9,24,0.34)"
					} : {},
					whileTap: !saving ? { scale: .97 } : {},
					onClick: handleSave,
					disabled: saving,
					style: {
						display: "flex",
						alignItems: "center",
						gap: 7,
						padding: "10px 26px",
						borderRadius: 10,
						border: "none",
						background: `linear-gradient(135deg, ${MAROON$2} 0%, #6E1528 100%)`,
						color: "#fff",
						fontSize: "0.85rem",
						fontWeight: 700,
						cursor: saving ? "not-allowed" : "pointer",
						fontFamily: "Inter, sans-serif",
						opacity: saving ? .7 : 1,
						boxShadow: "0 3px 12px rgba(74,9,24,0.28)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, { size: 14 }), saving ? "Saving…" : "Save Org Chart"]
				})
			})
		]
	});
}
function NodeEditor({ idx, node, allNodes, open, onToggle, onChangeField, onChangeLang, onRemove }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			border: "1px solid rgba(74,9,24,0.1)",
			borderRadius: 12,
			marginBottom: 10,
			overflow: "hidden"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "center"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: onToggle,
				style: {
					flex: 1,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "10px 14px",
					background: "rgba(74,9,24,0.03)",
					border: "none",
					cursor: "pointer"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					style: {
						fontSize: "0.82rem",
						fontWeight: 700,
						color: MAROON$2
					},
					children: [node.id || `Node ${idx + 1}`, node.title?.en ? ` — ${node.title.en}` : ""]
				}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronUp, {
					size: 14,
					color: MAROON$2
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronDown, {
					size: 14,
					color: MAROON$2
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onRemove,
				style: {
					...iconBtn$1,
					borderRadius: 0
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, { size: 13 })
			})]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				padding: "1rem",
				display: "flex",
				flexDirection: "column",
				gap: "0.85rem"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "1fr 1fr 1fr",
						gap: "0.75rem"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$1, {
							label: "Node ID",
							value: node.id,
							onChange: (v) => onChangeField("id", v),
							placeholder: "e.g. apex"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl$1, { children: "Parent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: node.parentId || "",
							onChange: (e) => onChangeField("parentId", e.target.value || null),
							style: selectStyle,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "— None (root) —"
							}), allNodes.filter((n) => n.id !== node.id).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: n.id,
								children: n.id
							}, n.id))]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl$1, { children: "Tier" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: node.tier,
							onChange: (e) => onChangeField("tier", e.target.value),
							style: selectStyle,
							children: TIERS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: t,
								children: t
							}, t))
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput$1, {
					label: "Order (sibling position)",
					value: String(node.order ?? 0),
					onChange: (v) => onChangeField("order", Number(v) || 0)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField, {
					label: "Title",
					value: node.title,
					onChange: (lang, v) => onChangeLang("title", lang, v)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField, {
					label: "Subtitle",
					value: node.sub,
					onChange: (lang, v) => onChangeLang("sub", lang, v)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangTabbedField, {
					label: "Headcount",
					value: node.count,
					onChange: (lang, v) => onChangeLang("count", lang, v)
				})
			]
		})]
	});
}
function SectionCard$1({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			background: "#fff",
			borderRadius: 16,
			border: "1px solid rgba(74,9,24,0.07)",
			boxShadow: "0 2px 12px rgba(74,9,24,0.05)",
			padding: "1.5rem",
			marginBottom: "1.25rem",
			display: "flex",
			flexDirection: "column",
			gap: "0.9rem"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			style: {
				fontFamily: "'Playfair Display', serif",
				fontSize: "1.02rem",
				fontWeight: 800,
				color: MAROON$2,
				margin: 0
			},
			children: title
		}), children]
	});
}
function LangTabbedField({ label, value, onChange, textarea = false, rows = 2 }) {
	const [langTab, setLangTab] = (0, import_react.useState)("en");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			marginBottom: 6
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl$1, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				display: "flex",
				gap: 2,
				background: "rgba(74,9,24,0.05)",
				borderRadius: 8,
				padding: 3
			},
			children: [
				["en", "EN"],
				["si", "SI"],
				["ta", "TA"]
			].map(([code, lbl]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setLangTab(code),
				style: {
					padding: "3px 9px",
					borderRadius: 6,
					border: "none",
					cursor: "pointer",
					background: langTab === code ? "#fff" : "transparent",
					color: langTab === code ? MAROON$2 : "rgba(74,9,24,0.42)",
					fontWeight: langTab === code ? 700 : 400,
					fontSize: "0.68rem",
					fontFamily: "Inter, sans-serif"
				},
				children: lbl
			}, code))
		})]
	}), textarea ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		value: value[langTab],
		onChange: (e) => onChange(langTab, e.target.value),
		rows,
		style: {
			width: "100%",
			padding: "9px 12px",
			borderRadius: 10,
			boxSizing: "border-box",
			border: "1px solid rgba(74,9,24,0.14)",
			outline: "none",
			fontSize: "0.82rem",
			color: MAROON$2,
			fontFamily: "Inter, sans-serif",
			background: "#fff",
			resize: "vertical"
		}
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "text",
		value: value[langTab],
		onChange: (e) => onChange(langTab, e.target.value),
		style: {
			width: "100%",
			padding: "9px 12px",
			borderRadius: 10,
			boxSizing: "border-box",
			border: "1px solid rgba(74,9,24,0.14)",
			outline: "none",
			fontSize: "0.82rem",
			color: MAROON$2,
			fontFamily: "Inter, sans-serif",
			background: "#fff"
		}
	})] });
}
var iconBtn$1 = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: 40,
	alignSelf: "stretch",
	border: "none",
	borderLeft: "1px solid rgba(220,38,38,0.15)",
	background: "rgba(220,38,38,0.07)",
	color: "#DC2626",
	cursor: "pointer",
	flexShrink: 0
};
var selectStyle = {
	width: "100%",
	padding: "9px 12px",
	border: "1.5px solid rgba(74,9,24,0.15)",
	borderRadius: 9,
	fontSize: "0.83rem",
	fontFamily: "Inter, sans-serif",
	color: MAROON$2,
	background: "#fff",
	outline: "none",
	cursor: "pointer",
	appearance: "none",
	boxSizing: "border-box"
};
function LabelEl$1({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		style: {
			display: "block",
			fontSize: "0.72rem",
			fontWeight: 700,
			color: "rgba(74,9,24,0.55)",
			textTransform: "uppercase",
			letterSpacing: "0.08em",
			marginBottom: "0.4rem",
			fontFamily: "Inter, sans-serif"
		},
		children
	});
}
function FieldInput$1({ label, value, onChange, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl$1, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "text",
		value,
		onChange: (e) => onChange(e.target.value),
		placeholder,
		style: {
			width: "100%",
			padding: "9px 12px",
			borderRadius: 10,
			boxSizing: "border-box",
			border: "1px solid rgba(74,9,24,0.14)",
			outline: "none",
			fontSize: "0.82rem",
			color: MAROON$2,
			fontFamily: "Inter, sans-serif",
			background: "#fff"
		}
	})] });
}
var MAROON$1 = "#4A0918";
var GOLD$1 = "#C79A2B";
var EMPTY_LANG_BLOCK = {
	introLabel: "",
	introTitle: "",
	introPara1: "",
	introPara2: "",
	tableTitle: "",
	tableName: "",
	tableService: "",
	projectsTitle: "",
	projectsRead: "",
	officialGovt: "",
	officialGovtSub: "",
	directors: [],
	projects: []
};
var EMPTY_PROJECT = {
	id: "",
	img: "",
	title: "",
	abbr: "",
	desc: "",
	year: ""
};
var EMPTY_FORM = {
	en: { ...EMPTY_LANG_BLOCK },
	si: { ...EMPTY_LANG_BLOCK },
	ta: { ...EMPTY_LANG_BLOCK },
	stats: {
		established: "",
		province: "",
		districts: "",
		yearsOfService: "",
		labels: {
			en: {},
			si: {},
			ta: {}
		}
	}
};
function CMSAboutHistory() {
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [langTab, setLangTab] = (0, import_react.useState)("en");
	const [openProject, setOpenProject] = (0, import_react.useState)(0);
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		try {
			const { data } = await aboutHistoryApi.get();
			setForm({
				en: {
					...EMPTY_LANG_BLOCK,
					...data.en,
					directors: data.en?.directors?.length ? data.en.directors : [],
					projects: data.en?.projects?.length ? data.en.projects : [
						{ ...EMPTY_PROJECT },
						{ ...EMPTY_PROJECT },
						{ ...EMPTY_PROJECT }
					]
				},
				si: {
					...EMPTY_LANG_BLOCK,
					...data.si,
					directors: data.si?.directors?.length ? data.si.directors : [],
					projects: data.si?.projects?.length ? data.si.projects : [
						{ ...EMPTY_PROJECT },
						{ ...EMPTY_PROJECT },
						{ ...EMPTY_PROJECT }
					]
				},
				ta: {
					...EMPTY_LANG_BLOCK,
					...data.ta,
					directors: data.ta?.directors?.length ? data.ta.directors : [],
					projects: data.ta?.projects?.length ? data.ta.projects : [
						{ ...EMPTY_PROJECT },
						{ ...EMPTY_PROJECT },
						{ ...EMPTY_PROJECT }
					]
				},
				stats: {
					established: "",
					province: "",
					districts: "",
					yearsOfService: "",
					labels: {
						en: {},
						si: {},
						ta: {}
					},
					...data.stats
				}
			});
		} catch {
			toast.error("Failed to load History content.");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	const setField = (lang, key, v) => setForm((f) => ({
		...f,
		[lang]: {
			...f[lang],
			[key]: v
		}
	}));
	const setStat = (key, v) => setForm((f) => ({
		...f,
		stats: {
			...f.stats,
			[key]: v
		}
	}));
	const setStatLabel = (lang, key, v) => setForm((f) => ({
		...f,
		stats: {
			...f.stats,
			labels: {
				...f.stats.labels,
				[lang]: {
					...f.stats.labels[lang],
					[key]: v
				}
			}
		}
	}));
	const addDirector = () => setForm((f) => ({
		...f,
		[langTab]: {
			...f[langTab],
			directors: [...f[langTab].directors, {
				name: "",
				period: ""
			}]
		}
	}));
	const removeDirector = (idx) => setForm((f) => ({
		...f,
		[langTab]: {
			...f[langTab],
			directors: f[langTab].directors.filter((_, i) => i !== idx)
		}
	}));
	const updateDirector = (idx, key, v) => setForm((f) => ({
		...f,
		[langTab]: {
			...f[langTab],
			directors: f[langTab].directors.map((d, i) => i === idx ? {
				...d,
				[key]: v
			} : d)
		}
	}));
	const updateProjectField = (lang, idx, key, v) => setForm((f) => ({
		...f,
		[lang]: {
			...f[lang],
			projects: f[lang].projects.map((p, i) => i === idx ? {
				...p,
				[key]: v
			} : p)
		}
	}));
	const uploadProjectImage = async (idx, file) => {
		try {
			const { data } = await uploadImage(file);
			setForm((f) => ({
				en: {
					...f.en,
					projects: f.en.projects.map((p, i) => i === idx ? {
						...p,
						img: data.url
					} : p)
				},
				si: {
					...f.si,
					projects: f.si.projects.map((p, i) => i === idx ? {
						...p,
						img: data.url
					} : p)
				},
				ta: {
					...f.ta,
					projects: f.ta.projects.map((p, i) => i === idx ? {
						...p,
						img: data.url
					} : p)
				},
				stats: f.stats
			}));
		} catch {
			toast.error("Failed to upload project image.");
		}
	};
	const handleSave = async () => {
		setSaving(true);
		try {
			await aboutHistoryApi.save(form);
			toast.success("History content saved");
		} catch {
			toast.error("Failed to save History content.");
		} finally {
			setSaving(false);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			padding: "4rem",
			textAlign: "center",
			color: "rgba(74,9,24,0.4)"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiRefreshCw, {
			size: 22,
			style: { animation: "spin 0.9s linear infinite" }
		})
	});
	const t = form[langTab];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: { maxWidth: 720 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: { marginBottom: "1.25rem" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					style: {
						fontFamily: "'Playfair Display', serif",
						fontSize: "1.35rem",
						fontWeight: 800,
						color: MAROON$1,
						marginBottom: 4
					},
					children: "About: History"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: {
						fontSize: "0.78rem",
						color: "rgba(74,9,24,0.45)",
						margin: 0
					},
					children: "Edits the History page under About."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					display: "flex",
					gap: 4,
					background: "rgba(74,9,24,0.05)",
					borderRadius: 10,
					padding: 4,
					width: "fit-content",
					marginBottom: "1rem"
				},
				children: [
					["en", "English"],
					["si", "සිංහල"],
					["ta", "தமிழ்"]
				].map(([code, lbl]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setLangTab(code),
					style: {
						padding: "5px 14px",
						borderRadius: 7,
						border: "none",
						cursor: "pointer",
						background: langTab === code ? "#fff" : "transparent",
						color: langTab === code ? MAROON$1 : "rgba(74,9,24,0.42)",
						fontWeight: langTab === code ? 700 : 400,
						fontSize: "0.76rem",
						fontFamily: "Inter, sans-serif"
					},
					children: lbl
				}, code))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
				title: "Introduction",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
						label: "Intro Label",
						value: t.introLabel,
						onChange: (v) => setField(langTab, "introLabel", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
						label: "Intro Title",
						value: t.introTitle,
						onChange: (v) => setField(langTab, "introTitle", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldTextarea, {
						label: "Intro Paragraph 1",
						value: t.introPara1,
						onChange: (v) => setField(langTab, "introPara1", v),
						rows: 3
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldTextarea, {
						label: "Intro Paragraph 2",
						value: t.introPara2,
						onChange: (v) => setField(langTab, "introPara2", v),
						rows: 3
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				title: "Stat Strip",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: "0.75rem"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
							label: `Established Label (${langTab.toUpperCase()})`,
							value: form.stats.labels[langTab]?.established || "",
							onChange: (v) => setStatLabel(langTab, "established", v)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
							label: "Established Value",
							value: form.stats.established,
							onChange: (v) => setStat("established", v),
							placeholder: "1987"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
							label: `Province Label (${langTab.toUpperCase()})`,
							value: form.stats.labels[langTab]?.province || "",
							onChange: (v) => setStatLabel(langTab, "province", v)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
							label: "Province Value",
							value: form.stats.province,
							onChange: (v) => setStat("province", v),
							placeholder: "Southern"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
							label: `Districts Label (${langTab.toUpperCase()})`,
							value: form.stats.labels[langTab]?.districts || "",
							onChange: (v) => setStatLabel(langTab, "districts", v)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
							label: "Districts Value",
							value: form.stats.districts,
							onChange: (v) => setStat("districts", v),
							placeholder: "3"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
							label: `Years of Service Label (${langTab.toUpperCase()})`,
							value: form.stats.labels[langTab]?.yearsOfService || "",
							onChange: (v) => setStatLabel(langTab, "yearsOfService", v)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
							label: "Years of Service Value",
							value: form.stats.yearsOfService,
							onChange: (v) => setStat("yearsOfService", v),
							placeholder: "37+"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
				title: "Table Headers",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
					label: "Table Title",
					value: t.tableTitle,
					onChange: (v) => setField(langTab, "tableTitle", v)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: "0.75rem"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
						label: "Column: Name",
						value: t.tableName,
						onChange: (v) => setField(langTab, "tableName", v)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
						label: "Column: Service Period",
						value: t.tableService,
						onChange: (v) => setField(langTab, "tableService", v)
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
				title: `Past Heads of Division (${langTab.toUpperCase()})`,
				children: [t.directors.map((d, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						gap: 8,
						alignItems: "flex-end"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: { flex: 2 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
								label: `#${idx + 1} Name`,
								value: d.name,
								onChange: (v) => updateDirector(idx, "name", v)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: { flex: 1 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
								label: "Period",
								value: d.period,
								onChange: (v) => updateDirector(idx, "period", v),
								placeholder: "e.g. 2015 – 2018"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => removeDirector(idx),
							style: {
								...iconBtn,
								marginBottom: 2
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, { size: 13 })
						})
					]
				}, idx)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: addDirector,
					style: {
						display: "flex",
						alignItems: "center",
						gap: 6,
						padding: "7px 14px",
						borderRadius: 9,
						border: "1px dashed rgba(74,9,24,0.25)",
						background: "transparent",
						color: MAROON$1,
						fontSize: "0.78rem",
						fontWeight: 600,
						cursor: "pointer",
						width: "fit-content"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPlus, { size: 12 }), " Add Director"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
				title: "Special Development Projects",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: 8,
							alignItems: "flex-start",
							padding: "10px 14px",
							borderRadius: 10,
							background: "rgba(217,119,6,0.08)",
							border: "1px solid rgba(217,119,6,0.25)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAlertTriangle, {
							size: 14,
							color: "#b45309",
							style: {
								flexShrink: 0,
								marginTop: 1
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontSize: "0.76rem",
								color: "#92400e",
								margin: 0,
								lineHeight: 1.5
							},
							children: "This section is currently hidden on the public site. Editing it here does not make it visible again."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
						label: "Section Title",
						value: t.projectsTitle,
						onChange: (v) => setField(langTab, "projectsTitle", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
						label: "\"Read More\" Label",
						value: t.projectsRead,
						onChange: (v) => setField(langTab, "projectsRead", v)
					}),
					t.projects.map((p, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectEditor, {
						idx,
						project: p,
						open: openProject === idx,
						onToggle: () => setOpenProject(openProject === idx ? -1 : idx),
						onChangeField: (key, v) => updateProjectField(langTab, idx, key, v),
						onUploadImage: (file) => uploadProjectImage(idx, file)
					}, idx))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
				title: "Official Government Footer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
					label: "Label",
					value: t.officialGovt,
					onChange: (v) => setField(langTab, "officialGovt", v)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
					label: "Sub-label",
					value: t.officialGovtSub,
					onChange: (v) => setField(langTab, "officialGovtSub", v)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					display: "flex",
					justifyContent: "flex-end"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
					whileHover: !saving ? {
						y: -1.5,
						boxShadow: "0 8px 22px rgba(74,9,24,0.34)"
					} : {},
					whileTap: !saving ? { scale: .97 } : {},
					onClick: handleSave,
					disabled: saving,
					style: {
						display: "flex",
						alignItems: "center",
						gap: 7,
						padding: "10px 26px",
						borderRadius: 10,
						border: "none",
						background: `linear-gradient(135deg, ${MAROON$1} 0%, #6E1528 100%)`,
						color: "#fff",
						fontSize: "0.85rem",
						fontWeight: 700,
						cursor: saving ? "not-allowed" : "pointer",
						fontFamily: "Inter, sans-serif",
						opacity: saving ? .7 : 1,
						boxShadow: "0 3px 12px rgba(74,9,24,0.28)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, { size: 14 }), saving ? "Saving…" : "Save History Content"]
				})
			})
		]
	});
}
function ProjectEditor({ idx, project, open, onToggle, onChangeField, onUploadImage }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			border: "1px solid rgba(74,9,24,0.1)",
			borderRadius: 12,
			marginBottom: 10,
			overflow: "hidden"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: onToggle,
			style: {
				width: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "10px 14px",
				background: "rgba(74,9,24,0.03)",
				border: "none",
				cursor: "pointer"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				style: {
					fontSize: "0.82rem",
					fontWeight: 700,
					color: MAROON$1
				},
				children: [
					"Project ",
					idx + 1,
					project.title ? ` — ${project.title}` : ""
				]
			}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronUp, {
				size: 14,
				color: MAROON$1
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronDown, {
				size: 14,
				color: MAROON$1
			})]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				padding: "1rem",
				display: "flex",
				flexDirection: "column",
				gap: "0.85rem"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePicker, {
					image: project.img,
					onUpload: onUploadImage
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
					label: "Title",
					value: project.title,
					onChange: (v) => onChangeField("title", v)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: "0.75rem"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
						label: "Abbreviation",
						value: project.abbr,
						onChange: (v) => onChangeField("abbr", v),
						placeholder: "e.g. IRDP"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
						label: "Year",
						value: project.year,
						onChange: (v) => onChangeField("year", v)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldTextarea, {
					label: "Description",
					value: project.desc,
					onChange: (v) => onChangeField("desc", v),
					rows: 3
				})
			]
		})]
	});
}
function SectionCard({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			background: "#fff",
			borderRadius: 16,
			border: "1px solid rgba(74,9,24,0.07)",
			boxShadow: "0 2px 12px rgba(74,9,24,0.05)",
			padding: "1.5rem",
			marginBottom: "1.25rem",
			display: "flex",
			flexDirection: "column",
			gap: "0.9rem"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			style: {
				fontFamily: "'Playfair Display', serif",
				fontSize: "1.02rem",
				fontWeight: 800,
				color: MAROON$1,
				margin: 0
			},
			children: title
		}), children]
	});
}
function ImagePicker({ image, onUpload }) {
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const handleFile = async (e) => {
		const file = e.target.files?.[0];
		e.target.value = "";
		if (!file) return;
		setUploading(true);
		await onUpload(file);
		setUploading(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			alignItems: "center",
			gap: 12
		},
		children: [uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				width: 80,
				height: 50,
				borderRadius: 8,
				background: "rgba(74,9,24,0.05)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiRefreshCw, {
				size: 16,
				color: GOLD$1,
				style: { animation: "spin 0.9s linear infinite" }
			})
		}) : image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: resolveUploadUrl(image),
			alt: "",
			style: {
				width: 80,
				height: 50,
				borderRadius: 8,
				objectFit: "cover"
			}
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				width: 80,
				height: 50,
				borderRadius: 8,
				background: "rgba(74,9,24,0.06)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiImage, {
				size: 16,
				color: "rgba(74,9,24,0.28)"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			style: {
				padding: "7px 14px",
				borderRadius: 9,
				border: "1px solid rgba(74,9,24,0.14)",
				fontSize: "0.76rem",
				fontWeight: 600,
				color: MAROON$1,
				cursor: "pointer"
			},
			children: [image ? "Change Image" : "Upload Image", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "file",
				accept: "image/*",
				onChange: handleFile,
				style: { display: "none" }
			})]
		})]
	});
}
var iconBtn = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: 32,
	height: 32,
	borderRadius: 8,
	border: "1px solid rgba(220,38,38,0.22)",
	background: "rgba(220,38,38,0.07)",
	color: "#DC2626",
	cursor: "pointer",
	flexShrink: 0
};
function LabelEl({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		style: {
			display: "block",
			fontSize: "0.72rem",
			fontWeight: 700,
			color: "rgba(74,9,24,0.55)",
			textTransform: "uppercase",
			letterSpacing: "0.08em",
			marginBottom: "0.4rem",
			fontFamily: "Inter, sans-serif"
		},
		children
	});
}
function FieldInput({ label, value, onChange, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "text",
		value,
		onChange: (e) => onChange(e.target.value),
		placeholder,
		style: {
			width: "100%",
			padding: "9px 12px",
			borderRadius: 10,
			boxSizing: "border-box",
			border: "1px solid rgba(74,9,24,0.14)",
			outline: "none",
			fontSize: "0.82rem",
			color: MAROON$1,
			fontFamily: "Inter, sans-serif",
			background: "#fff"
		}
	})] });
}
function FieldTextarea({ label, value, onChange, rows = 3 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelEl, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		value,
		onChange: (e) => onChange(e.target.value),
		rows,
		style: {
			width: "100%",
			padding: "9px 12px",
			borderRadius: 10,
			boxSizing: "border-box",
			border: "1px solid rgba(74,9,24,0.14)",
			outline: "none",
			fontSize: "0.82rem",
			color: MAROON$1,
			fontFamily: "Inter, sans-serif",
			background: "#fff",
			resize: "vertical"
		}
	})] });
}
var MAROON = "#4A0918";
var MAROON2 = "#3A0712";
var GOLD = "#C79A2B";
var SIDEBAR_FULL = 242;
var SIDEBAR_MINI = 66;
var MOCK = {
	news: [],
	notices: [],
	gallery: [],
	downloads: []
};
var STATUS_COLORS = {
	Published: {
		bg: "rgba(22,101,52,0.1)",
		text: "#166534",
		dot: "#16a34a"
	},
	Draft: {
		bg: "rgba(180,83,9,0.1)",
		text: "#92400e",
		dot: "#d97706"
	},
	Active: {
		bg: "rgba(22,101,52,0.1)",
		text: "#166534",
		dot: "#16a34a"
	},
	Expired: {
		bg: "rgba(127,29,29,0.1)",
		text: "#7f1d1d",
		dot: "#dc2626"
	}
};
var NAV_GROUPS = [
	{
		label: "Content",
		items: [
			{
				id: "overview",
				label: "Overview",
				icon: FiGrid
			},
			{
				id: "news",
				label: "News",
				icon: FiFileText
			},
			{
				id: "homenewsbar",
				label: "Home News Bar",
				icon: FiRadio
			},
			{
				id: "homeevents",
				label: "Home Events",
				icon: FiCalendar
			},
			{
				id: "notices",
				label: "Notices",
				icon: FiBell
			},
			{
				id: "staff",
				label: "Staff Directory",
				icon: FiUser
			},
			{
				id: "faqs",
				label: "FAQs",
				icon: FiHelpCircle
			},
			{
				id: "homecontent",
				label: "Home Content",
				icon: FiHome
			},
			{
				id: "departments",
				label: "Departments",
				icon: FiPackage
			},
			{
				id: "aboutoverview",
				label: "About: Overview",
				icon: FiGrid
			},
			{
				id: "aboutfunctions",
				label: "About: Functions & Duties",
				icon: FiFileText
			},
			{
				id: "orgstructure",
				label: "About: Org Structure",
				icon: FiActivity
			},
			{
				id: "abouthistory",
				label: "About: History",
				icon: FiClock
			}
		]
	},
	{
		label: "Media",
		items: [{
			id: "downloads",
			label: "Downloads",
			icon: FiDownload
		}, {
			id: "gallery",
			label: "Gallery",
			icon: FiImage
		}]
	},
	{
		label: "Feedback",
		items: [{
			id: "complaints",
			label: "Complaints & Feedback",
			icon: FiMessageSquare
		}]
	},
	{
		label: "Pages",
		items: [{
			id: "pages",
			label: "Page Visibility",
			icon: FiLayout
		}]
	},
	{
		label: "System",
		items: [
			{
				id: "publish",
				label: "Publish Site",
				icon: FiGlobe
			},
			{
				id: "sitesettings",
				label: "Site Contact Info",
				icon: FiUser
			},
			{
				id: "settings",
				label: "Settings",
				icon: FiSettings
			},
			{
				id: "policy",
				label: "Policy & Privacy",
				icon: FiBookOpen
			}
		]
	}
];
var NOTIFICATIONS = [];
function getGreeting() {
	const h = (/* @__PURE__ */ new Date()).getHours();
	if (h < 12) return "Good morning";
	if (h < 17) return "Good afternoon";
	return "Good evening";
}
function friendlyDate() {
	return (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric"
	});
}
var _noticeChannel = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("cms_notices") : null;
function notifyNoticesUpdated() {
	window.dispatchEvent(new Event("cms_notices_updated"));
	_noticeChannel?.postMessage("updated");
}
var _downloadChannel = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("cms_downloads") : null;
function notifyDownloadsUpdated() {
	window.dispatchEvent(new Event("cms_downloads_updated"));
	_downloadChannel?.postMessage("updated");
}
function CMSDashboard() {
	const navigate = useNavigate$1();
	const [active, setActive] = (0, import_react.useState)("overview");
	const [collapsed, setCollapsed] = (0, import_react.useState)(false);
	const [search, setSearch] = (0, import_react.useState)("");
	const [data, setData] = (0, import_react.useState)(() => {
		try {
			return {
				notices: JSON.parse((typeof window !== "undefined" ? localStorage.getItem("cms_notices") : null) || "[]"),
				news: JSON.parse((typeof window !== "undefined" ? localStorage.getItem("cms_news") : null) || "[]"),
				downloads: JSON.parse((typeof window !== "undefined" ? localStorage.getItem("cms_downloads") : null) || "[]"),
				gallery: JSON.parse((typeof window !== "undefined" ? localStorage.getItem("cms_gallery_albums") : null) || "[]")
			};
		} catch {}
		return MOCK;
	});
	const [deleteModal, setDeleteModal] = (0, import_react.useState)(null);
	const [albumModal, setAlbumModal] = (0, import_react.useState)(false);
	const [editAlbumData, setEditAlbumData] = (0, import_react.useState)(null);
	const [viewAlbumData, setViewAlbumData] = (0, import_react.useState)(null);
	const [noticeModal, setNoticeModal] = (0, import_react.useState)(false);
	const [editNoticeData, setEditNoticeData] = (0, import_react.useState)(null);
	const [viewNoticeData, setViewNoticeData] = (0, import_react.useState)(null);
	const [newsModal, setNewsModal] = (0, import_react.useState)(false);
	const [editNewsData, setEditNewsData] = (0, import_react.useState)(null);
	const [viewNewsData, setViewNewsData] = (0, import_react.useState)(null);
	const [downloadModal, setDownloadModal] = (0, import_react.useState)(false);
	const [editDownloadData, setEditDownloadData] = (0, import_react.useState)(null);
	const [notifOpen, setNotifOpen] = (0, import_react.useState)(false);
	const [adminName, setAdminName] = (0, import_react.useState)(() => getCredentials()?.username ?? "Admin");
	const notifRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!sessionStorage.getItem("cms_auth")) navigate("/cms", { replace: true });
	}, [navigate]);
	(0, import_react.useEffect)(() => {
		const fn = (e) => {
			if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
		};
		document.addEventListener("mousedown", fn);
		return () => document.removeEventListener("mousedown", fn);
	}, []);
	const logout = () => {
		sessionStorage.removeItem("cms_auth");
		navigate("/cms", { replace: true });
	};
	const confirmDelete = (section, id) => {
		const row = data[section].find((r) => r.id === id);
		setDeleteModal({
			section,
			id,
			title: row?.title ?? "this item"
		});
	};
	const executeDelete = () => {
		if (!deleteModal) return;
		setData((d) => ({
			...d,
			[deleteModal.section]: d[deleteModal.section].filter((r) => r.id !== deleteModal.id)
		}));
		if (deleteModal.section === "gallery") {
			const stored = JSON.parse((typeof window !== "undefined" ? localStorage.getItem("cms_gallery_albums") : null) || "[]");
			localStorage.setItem("cms_gallery_albums", JSON.stringify(stored.filter((a) => a.id !== deleteModal.id)));
		}
		if (deleteModal.section === "notices") {
			const stored = JSON.parse((typeof window !== "undefined" ? localStorage.getItem("cms_notices") : null) || "[]");
			localStorage.setItem("cms_notices", JSON.stringify(stored.filter((n) => n.id !== deleteModal.id)));
			notifyNoticesUpdated();
		}
		if (deleteModal.section === "downloads") {
			const stored = JSON.parse((typeof window !== "undefined" ? localStorage.getItem("cms_downloads") : null) || "[]");
			localStorage.setItem("cms_downloads", JSON.stringify(stored.filter((d) => d.id !== deleteModal.id)));
			notifyDownloadsUpdated();
		}
		toast.success("Record deleted successfully");
		setDeleteModal(null);
	};
	const addDownload = (form) => {
		const newItem = {
			id: Date.now(),
			titleEn: form.titleEn,
			titleSi: form.titleSi,
			titleTa: form.titleTa,
			title: form.titleEn || form.titleSi || form.titleTa || "Untitled",
			description: form.description,
			category: form.category,
			fileUrl: form.fileUrl,
			fileName: form.fileName,
			fileType: form.fileType,
			fileSize: form.fileSize,
			date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
			status: form.status || "Active",
			downloadAccess: form.downloadAccess || "Everyone"
		};
		setData((d) => ({
			...d,
			downloads: [newItem, ...d.downloads]
		}));
		try {
			const stored = JSON.parse((typeof window !== "undefined" ? localStorage.getItem("cms_downloads") : null) || "[]");
			localStorage.setItem("cms_downloads", JSON.stringify([newItem, ...stored]));
			notifyDownloadsUpdated();
		} catch {
			toast.error("Storage full — saved in session only");
		}
		toast.success("Download item added successfully");
		setDownloadModal(false);
	};
	const updateDownload = (form) => {
		const updated = {
			...editDownloadData,
			titleEn: form.titleEn,
			titleSi: form.titleSi,
			titleTa: form.titleTa,
			title: form.titleEn || form.titleSi || form.titleTa || "Untitled",
			description: form.description,
			category: form.category,
			fileUrl: form.fileUrl,
			fileName: form.fileName,
			fileType: form.fileType,
			fileSize: form.fileSize,
			status: form.status || "Active",
			downloadAccess: form.downloadAccess || "Everyone"
		};
		setData((d) => ({
			...d,
			downloads: d.downloads.map((it) => it.id === updated.id ? updated : it)
		}));
		try {
			const stored = JSON.parse((typeof window !== "undefined" ? localStorage.getItem("cms_downloads") : null) || "[]");
			localStorage.setItem("cms_downloads", JSON.stringify(stored.map((it) => it.id === updated.id ? updated : it)));
			notifyDownloadsUpdated();
		} catch {}
		toast.success("Download item updated");
		setEditDownloadData(null);
	};
	const addAlbum = (form) => {
		const displayTitle = form.titleEn || form.titleSi || form.titleTa || "Untitled Album";
		const newAlbum = {
			id: Date.now(),
			title: displayTitle,
			titleEn: form.titleEn,
			titleSi: form.titleSi,
			titleTa: form.titleTa,
			category: form.category,
			date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
			photos: form.images.length,
			imageUrl: form.images[0] || null,
			images: form.images
		};
		setData((d) => ({
			...d,
			gallery: [newAlbum, ...d.gallery]
		}));
		try {
			const stored = JSON.parse((typeof window !== "undefined" ? localStorage.getItem("cms_gallery_albums") : null) || "[]");
			localStorage.setItem("cms_gallery_albums", JSON.stringify([newAlbum, ...stored]));
		} catch {
			toast.error("Storage full — album saved in session only");
		}
		toast.success("Album created successfully");
		setAlbumModal(false);
	};
	const updateAlbum = (form) => {
		const displayTitle = form.titleEn || form.titleSi || form.titleTa || "Untitled Album";
		const updated = {
			...editAlbumData,
			title: displayTitle,
			titleEn: form.titleEn,
			titleSi: form.titleSi,
			titleTa: form.titleTa,
			category: form.category,
			photos: form.images.length,
			imageUrl: form.images[0] || null,
			images: form.images
		};
		setData((d) => ({
			...d,
			gallery: d.gallery.map((a) => a.id === updated.id ? updated : a)
		}));
		try {
			const stored = JSON.parse((typeof window !== "undefined" ? localStorage.getItem("cms_gallery_albums") : null) || "[]");
			localStorage.setItem("cms_gallery_albums", JSON.stringify(stored.map((a) => a.id === updated.id ? updated : a)));
		} catch {
			toast.error("Storage full — changes saved in session only");
		}
		toast.success("Album updated successfully");
		setEditAlbumData(null);
	};
	const addNotice = (form) => {
		console.debug("[CMS] addNotice called", form);
		const newNotice = {
			id: Date.now(),
			title: form.title,
			titleSi: form.titleSi || "",
			titleTa: form.titleTa || "",
			type: form.type,
			category: form.type,
			ref: form.ref,
			date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
			deadline: form.deadline || null,
			status: form.status,
			isNew: true,
			fileName: form.fileName || null,
			fileUrl: form.fileUrl || null,
			fileMimeType: form.fileMimeType || null,
			description: form.description || "",
			descriptionSi: form.descriptionSi || "",
			descriptionTa: form.descriptionTa || "",
			downloadAccess: form.downloadAccess || "Everyone"
		};
		setData((d) => ({
			...d,
			notices: [newNotice, ...d.notices]
		}));
		try {
			const stored = JSON.parse((typeof window !== "undefined" ? localStorage.getItem("cms_notices") : null) || "[]");
			localStorage.setItem("cms_notices", JSON.stringify([newNotice, ...stored]));
			notifyNoticesUpdated();
		} catch {
			toast.error("Storage full — notice saved in session only");
		}
		toast.success("Notice added successfully");
		setNoticeModal(false);
	};
	const updateNotice = (form) => {
		console.debug("[CMS] updateNotice called", form);
		const updated = {
			...editNoticeData,
			title: form.title,
			titleSi: form.titleSi || "",
			titleTa: form.titleTa || "",
			type: form.type,
			category: form.type,
			ref: form.ref,
			deadline: form.deadline || null,
			status: form.status,
			fileName: form.fileName || editNoticeData?.fileName || null,
			fileUrl: form.fileUrl || editNoticeData?.fileUrl || null,
			fileMimeType: form.fileMimeType || editNoticeData?.fileMimeType || null,
			description: form.description || "",
			descriptionSi: form.descriptionSi || "",
			descriptionTa: form.descriptionTa || "",
			downloadAccess: form.downloadAccess || editNoticeData?.downloadAccess || "Everyone"
		};
		setData((d) => ({
			...d,
			notices: d.notices.map((n) => n.id === updated.id ? updated : n)
		}));
		try {
			const stored = JSON.parse((typeof window !== "undefined" ? localStorage.getItem("cms_notices") : null) || "[]");
			const exists = stored.some((n) => n.id === updated.id);
			localStorage.setItem("cms_notices", JSON.stringify(exists ? stored.map((n) => n.id === updated.id ? updated : n) : [updated, ...stored]));
			notifyNoticesUpdated();
		} catch {
			toast.error("Storage full — changes saved in session only");
		}
		toast.success("Notice updated successfully");
		setEditNoticeData(null);
	};
	const addNews = (form) => {
		const newArticle = {
			id: Date.now(),
			title: form.title,
			titleSi: form.titleSi || "",
			titleTa: form.titleTa || "",
			category: form.category,
			date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
			status: form.status,
			excerpt: form.excerpt || "",
			imageUrl: form.imageUrl || "",
			featured: form.featured || false
		};
		setData((d) => ({
			...d,
			news: [newArticle, ...d.news]
		}));
		try {
			const stored = JSON.parse((typeof window !== "undefined" ? localStorage.getItem("cms_news") : null) || "[]");
			localStorage.setItem("cms_news", JSON.stringify([newArticle, ...stored]));
		} catch {
			toast.error("Storage full — article saved in session only");
		}
		toast.success("News article added successfully");
		setNewsModal(false);
	};
	const updateNews = (form) => {
		const updated = {
			...editNewsData,
			title: form.title,
			titleSi: form.titleSi || "",
			titleTa: form.titleTa || "",
			category: form.category,
			status: form.status,
			excerpt: form.excerpt || "",
			imageUrl: form.imageUrl || editNewsData?.imageUrl || "",
			featured: form.featured || false
		};
		setData((d) => ({
			...d,
			news: d.news.map((a) => a.id === updated.id ? updated : a)
		}));
		try {
			const stored = JSON.parse((typeof window !== "undefined" ? localStorage.getItem("cms_news") : null) || "[]");
			const exists = stored.some((a) => a.id === updated.id);
			localStorage.setItem("cms_news", JSON.stringify(exists ? stored.map((a) => a.id === updated.id ? updated : a) : [updated, ...stored]));
		} catch {
			toast.error("Storage full — changes saved in session only");
		}
		toast.success("News article updated successfully");
		setEditNewsData(null);
	};
	const allNavItems = NAV_GROUPS.flatMap((g) => g.items);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			position: "top-right",
			richColors: true,
			expand: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				minHeight: "100vh",
				fontFamily: "Inter, sans-serif",
				background: "#F0EBE3",
				backgroundImage: `radial-gradient(circle at 1px 1px, rgba(74,9,24,0.055) 1px, transparent 0)`,
				backgroundSize: "28px 28px"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.aside, {
				animate: { width: collapsed ? SIDEBAR_MINI : SIDEBAR_FULL },
				transition: {
					duration: .25,
					ease: [
						.4,
						0,
						.2,
						1
					]
				},
				style: {
					background: `linear-gradient(170deg, #2A0510 0%, ${MAROON2} 35%, ${MAROON} 70%, #6E1528 100%)`,
					display: "flex",
					flexDirection: "column",
					overflow: "hidden",
					flexShrink: 0,
					position: "sticky",
					top: 0,
					height: "100vh",
					zIndex: 40,
					boxShadow: "6px 0 40px rgba(0,0,0,0.28), 2px 0 0 rgba(199,154,43,0.08)"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { flexShrink: 0 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
							height: 2,
							background: `linear-gradient(90deg, transparent 0%, ${GOLD} 30%, #F0D060 50%, ${GOLD} 70%, transparent 100%)`
						} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
							height: 1,
							background: "rgba(255,255,255,0.06)"
						} })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							padding: collapsed ? "1.1rem 0" : "1.2rem 1rem 1rem",
							borderBottom: "1px solid rgba(255,255,255,0.06)",
							display: "flex",
							alignItems: "center",
							justifyContent: collapsed ? "center" : "space-between",
							gap: 8,
							flexShrink: 0,
							background: "rgba(0,0,0,0.12)"
						},
						children: [
							!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									x: -12
								},
								animate: {
									opacity: 1,
									x: 0
								},
								transition: { duration: .22 },
								style: {
									overflow: "hidden",
									minWidth: 0,
									display: "flex",
									alignItems: "center",
									gap: 10
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										width: 32,
										height: 32,
										borderRadius: 9,
										flexShrink: 0,
										background: `linear-gradient(135deg, ${GOLD} 0%, #9A7520 100%)`,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										boxShadow: `0 2px 10px rgba(199,154,43,0.4)`,
										fontSize: "0.75rem",
										color: "#fff",
										fontWeight: 900,
										fontFamily: "'Cinzel', serif",
										letterSpacing: "-0.02em"
									},
									children: "P"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										color: "#fff",
										fontFamily: "'Cinzel', serif",
										fontSize: "0.66rem",
										fontWeight: 700,
										letterSpacing: "0.1em",
										whiteSpace: "nowrap"
									},
									children: "Planning Secretariat"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										color: GOLD,
										fontSize: "0.56rem",
										letterSpacing: "0.08em",
										marginTop: 2,
										whiteSpace: "nowrap",
										opacity: .9
									},
									children: "Content Management System"
								})] })]
							}),
							collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									width: 32,
									height: 32,
									borderRadius: 9,
									background: `linear-gradient(135deg, ${GOLD} 0%, #9A7520 100%)`,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									boxShadow: `0 2px 10px rgba(199,154,43,0.4)`,
									fontSize: "0.75rem",
									color: "#fff",
									fontWeight: 900,
									fontFamily: "'Cinzel', serif"
								},
								children: "P"
							}),
							!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setCollapsed((v) => !v),
								style: {
									background: "rgba(255,255,255,0.08)",
									border: "1px solid rgba(255,255,255,0.12)",
									borderRadius: 8,
									padding: 7,
									cursor: "pointer",
									color: "rgba(255,255,255,0.6)",
									display: "flex",
									flexShrink: 0,
									transition: "background 0.15s"
								},
								onMouseEnter: (e) => e.currentTarget.style.background = "rgba(255,255,255,0.16)",
								onMouseLeave: (e) => e.currentTarget.style.background = "rgba(255,255,255,0.08)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronsLeft, { size: 14 })
							}),
							collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setCollapsed((v) => !v),
								style: {
									position: "absolute",
									top: 60,
									right: -10,
									zIndex: 50,
									width: 20,
									height: 20,
									borderRadius: "50%",
									background: GOLD,
									border: `2px solid ${MAROON}`,
									cursor: "pointer",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									boxShadow: "0 2px 8px rgba(0,0,0,0.25)"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronsLeft, {
									size: 10,
									color: "#fff",
									style: { transform: "rotate(180deg)" }
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						style: {
							flex: 1,
							overflowY: "auto",
							overflowX: "hidden",
							padding: "0.7rem 0"
						},
						children: NAV_GROUPS.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { marginBottom: "0.35rem" },
							children: [
								!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										padding: "0.65rem 1rem 0.28rem",
										fontSize: "0.56rem",
										fontWeight: 700,
										letterSpacing: "0.18em",
										textTransform: "uppercase",
										color: "rgba(255,255,255,0.22)",
										display: "flex",
										alignItems: "center",
										gap: 8
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
											flex: 1,
											height: 1,
											background: "rgba(255,255,255,0.06)",
											borderRadius: 1
										} }),
										group.label,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
											flex: 1,
											height: 1,
											background: "rgba(255,255,255,0.06)",
											borderRadius: 1
										} })
									]
								}),
								collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: 10 } }),
								group.items.map((item) => {
									const isActive = active === item.id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => {
											setActive(item.id);
											setSearch("");
										},
										title: collapsed ? item.label : void 0,
										style: {
											width: "100%",
											display: "flex",
											alignItems: "center",
											gap: collapsed ? 0 : 10,
											justifyContent: collapsed ? "center" : "flex-start",
											padding: collapsed ? "11px 0" : "10px 1rem",
											background: isActive ? "linear-gradient(90deg, rgba(199,154,43,0.18) 0%, rgba(199,154,43,0.08) 100%)" : "transparent",
											border: "none",
											borderLeft: `3px solid ${isActive ? GOLD : "transparent"}`,
											color: isActive ? GOLD : "rgba(255,255,255,0.5)",
											fontSize: "0.81rem",
											fontWeight: isActive ? 600 : 400,
											cursor: "pointer",
											fontFamily: "Inter, sans-serif",
											transition: "all 0.15s",
											textAlign: "left",
											position: "relative"
										},
										onMouseEnter: (e) => {
											if (!isActive) {
												e.currentTarget.style.background = "rgba(255,255,255,0.07)";
												e.currentTarget.style.color = "rgba(255,255,255,0.9)";
											}
										},
										onMouseLeave: (e) => {
											e.currentTarget.style.background = isActive ? "linear-gradient(90deg, rgba(199,154,43,0.18) 0%, rgba(199,154,43,0.08) 100%)" : "transparent";
											e.currentTarget.style.color = isActive ? GOLD : "rgba(255,255,255,0.5)";
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
												size: 15,
												style: { flexShrink: 0 }
											}),
											!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												style: {
													overflow: "hidden",
													textOverflow: "ellipsis",
													whiteSpace: "nowrap",
													flex: 1
												},
												children: item.label
											}), isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
												width: 6,
												height: 6,
												borderRadius: "50%",
												background: GOLD,
												flexShrink: 0,
												opacity: .8,
												boxShadow: `0 0 6px ${GOLD}`
											} })] }),
											collapsed && isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
												position: "absolute",
												right: 0,
												top: "50%",
												transform: "translateY(-50%)",
												width: 3,
												height: 20,
												borderRadius: "2px 0 0 2px",
												background: GOLD,
												boxShadow: `0 0 8px ${GOLD}`
											} })
										]
									}, item.id);
								})
							]
						}, group.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							borderTop: "1px solid rgba(255,255,255,0.07)",
							padding: collapsed ? "0.9rem 0" : "0.85rem 0.9rem",
							flexShrink: 0,
							background: "rgba(0,0,0,0.1)"
						},
						children: [!collapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 10,
								marginBottom: "0.7rem",
								padding: "8px 10px",
								borderRadius: 12,
								background: "rgba(255,255,255,0.07)",
								border: "1px solid rgba(255,255,255,0.08)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									width: 32,
									height: 32,
									borderRadius: 9,
									flexShrink: 0,
									background: `linear-gradient(135deg, ${GOLD}88 0%, ${GOLD}44 100%)`,
									border: `1.5px solid ${GOLD}55`,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontSize: "0.78rem",
									fontWeight: 800,
									color: GOLD,
									fontFamily: "'Cinzel', serif"
								},
								children: (adminName[0] || "A").toUpperCase()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									overflow: "hidden",
									minWidth: 0
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										color: "#fff",
										fontSize: "0.8rem",
										fontWeight: 600,
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "ellipsis"
									},
									children: adminName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										color: GOLD,
										fontSize: "0.58rem",
										whiteSpace: "nowrap",
										marginTop: 1,
										opacity: .85
									},
									children: "Admin"
								})]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "flex",
								justifyContent: "center",
								marginBottom: "0.7rem"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									width: 32,
									height: 32,
									borderRadius: 9,
									background: `linear-gradient(135deg, ${GOLD}88 0%, ${GOLD}44 100%)`,
									border: `1.5px solid ${GOLD}55`,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontSize: "0.78rem",
									fontWeight: 800,
									color: GOLD,
									fontFamily: "'Cinzel', serif"
								},
								children: (adminName[0] || "A").toUpperCase()
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: logout,
							style: {
								width: "100%",
								display: "flex",
								alignItems: "center",
								justifyContent: collapsed ? "center" : "flex-start",
								gap: 8,
								padding: collapsed ? "8px 0" : "8px 10px",
								borderRadius: 9,
								background: "rgba(255,255,255,0.05)",
								border: "1px solid rgba(255,255,255,0.09)",
								color: "rgba(255,255,255,0.42)",
								fontSize: "0.79rem",
								cursor: "pointer",
								fontFamily: "Inter, sans-serif",
								transition: "all 0.15s"
							},
							onMouseEnter: (e) => {
								e.currentTarget.style.background = "rgba(220,38,38,0.16)";
								e.currentTarget.style.color = "#fca5a5";
								e.currentTarget.style.borderColor = "rgba(220,38,38,0.3)";
							},
							onMouseLeave: (e) => {
								e.currentTarget.style.background = "rgba(255,255,255,0.05)";
								e.currentTarget.style.color = "rgba(255,255,255,0.42)";
								e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiLogOut, { size: 13 }), !collapsed && "Sign Out"]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					flex: 1,
					display: "flex",
					flexDirection: "column",
					minWidth: 0
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					style: {
						background: "rgba(248,244,239,0.94)",
						backdropFilter: "blur(20px)",
						WebkitBackdropFilter: "blur(20px)",
						borderBottom: "1px solid rgba(74,9,24,0.09)",
						padding: "0 1.5rem",
						height: 60,
						display: "flex",
						alignItems: "center",
						gap: 12,
						position: "sticky",
						top: 0,
						zIndex: 20,
						boxShadow: "0 1px 0 rgba(74,9,24,0.06), 0 4px 20px rgba(74,9,24,0.05)"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 7
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: "0.65rem",
										color: "rgba(74,9,24,0.32)",
										fontWeight: 600,
										letterSpacing: "0.08em",
										textTransform: "uppercase"
									},
									children: "CMS"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronRight, {
									size: 9,
									color: "rgba(74,9,24,0.2)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: "0.84rem",
										fontWeight: 700,
										color: MAROON,
										borderBottom: `2px solid ${GOLD}`,
										paddingBottom: 1,
										lineHeight: 1.3
									},
									children: allNavItems.find((n) => n.id === active)?.label
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { flex: 1 } }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							ref: notifRef,
							style: { position: "relative" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setNotifOpen((v) => !v),
								style: {
									position: "relative",
									background: notifOpen ? "rgba(74,9,24,0.06)" : "none",
									border: "1px solid rgba(74,9,24,0.1)",
									borderRadius: 9,
									padding: "7px 8px",
									cursor: "pointer",
									color: MAROON,
									display: "flex",
									alignItems: "center",
									transition: "all 0.15s"
								},
								onMouseEnter: (e) => e.currentTarget.style.background = "rgba(74,9,24,0.05)",
								onMouseLeave: (e) => e.currentTarget.style.background = notifOpen ? "rgba(74,9,24,0.06)" : "none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiBell, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
									position: "absolute",
									top: 6,
									right: 6,
									width: 7,
									height: 7,
									borderRadius: "50%",
									background: "#ef4444",
									border: "1.5px solid #FCFBFA"
								} })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: notifOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 8,
									scale: .97
								},
								animate: {
									opacity: 1,
									y: 0,
									scale: 1
								},
								exit: {
									opacity: 0,
									y: 8,
									scale: .97
								},
								transition: { duration: .15 },
								style: {
									position: "absolute",
									top: "calc(100% + 8px)",
									right: 0,
									width: 296,
									background: "#fff",
									borderRadius: 14,
									boxShadow: "0 10px 40px rgba(74,9,24,0.15)",
									border: "1px solid rgba(74,9,24,0.08)",
									overflow: "hidden",
									zIndex: 50
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										padding: "10px 14px",
										borderBottom: "1px solid rgba(74,9,24,0.07)",
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											alignItems: "center",
											gap: 7
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												fontSize: "0.8rem",
												fontWeight: 700,
												color: MAROON
											},
											children: "Notifications"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												background: "#ef4444",
												color: "#fff",
												fontSize: "0.6rem",
												fontWeight: 700,
												padding: "1px 6px",
												borderRadius: 100
											},
											children: "2"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											fontSize: "0.65rem",
											color: GOLD,
											fontWeight: 600,
											cursor: "pointer"
										},
										children: "Mark all read"
									})]
								}), NOTIFICATIONS.map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										padding: "10px 14px",
										borderBottom: i < NOTIFICATIONS.length - 1 ? "1px solid rgba(74,9,24,0.05)" : "none",
										display: "flex",
										gap: 10,
										alignItems: "flex-start",
										background: n.unread ? "rgba(199,154,43,0.04)" : "transparent",
										cursor: "pointer",
										transition: "background 0.12s"
									},
									onMouseEnter: (e) => e.currentTarget.style.background = "rgba(74,9,24,0.03)",
									onMouseLeave: (e) => e.currentTarget.style.background = n.unread ? "rgba(199,154,43,0.04)" : "transparent",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
										width: 7,
										height: 7,
										borderRadius: "50%",
										background: n.unread ? GOLD : "transparent",
										flexShrink: 0,
										marginTop: 6
									} }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontSize: "0.78rem",
											color: MAROON,
											fontWeight: n.unread ? 600 : 400
										},
										children: n.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontSize: "0.67rem",
											color: "rgba(74,9,24,0.38)",
											marginTop: 3
										},
										children: n.time
									})] })]
								}, i))]
							}) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActive("settings"),
							style: {
								display: "flex",
								alignItems: "center",
								gap: 8,
								padding: "5px 12px 5px 6px",
								borderRadius: 10,
								border: "1px solid rgba(74,9,24,0.1)",
								background: "rgba(74,9,24,0.02)",
								cursor: "pointer",
								fontFamily: "Inter, sans-serif",
								transition: "all 0.15s",
								boxShadow: "0 1px 4px rgba(74,9,24,0.06)"
							},
							onMouseEnter: (e) => e.currentTarget.style.background = "rgba(74,9,24,0.055)",
							onMouseLeave: (e) => e.currentTarget.style.background = "rgba(74,9,24,0.02)",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									width: 26,
									height: 26,
									borderRadius: 7,
									background: `linear-gradient(135deg, ${GOLD} 0%, #9A7520 100%)`,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontSize: "0.65rem",
									fontWeight: 800,
									color: "#fff",
									fontFamily: "'Cinzel', serif"
								},
								children: (adminName[0] || "A").toUpperCase()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: "0.79rem",
									fontWeight: 600,
									color: MAROON
								},
								children: adminName
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "/home",
							target: "_blank",
							rel: "noopener noreferrer",
							style: {
								display: "flex",
								alignItems: "center",
								gap: 5,
								padding: "6px 11px",
								borderRadius: 9,
								border: "1px solid rgba(74,9,24,0.1)",
								textDecoration: "none",
								color: "rgba(74,9,24,0.45)",
								fontSize: "0.75rem",
								transition: "all 0.15s",
								boxShadow: "0 1px 4px rgba(74,9,24,0.05)"
							},
							onMouseEnter: (e) => {
								e.currentTarget.style.background = MAROON;
								e.currentTarget.style.color = "#fff";
								e.currentTarget.style.borderColor = MAROON;
							},
							onMouseLeave: (e) => {
								e.currentTarget.style.background = "transparent";
								e.currentTarget.style.color = "rgba(74,9,24,0.45)";
								e.currentTarget.style.borderColor = "rgba(74,9,24,0.1)";
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiHome, { size: 13 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { display: "none" },
								className: "sm:inline",
								children: "Portal"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					style: {
						flex: 1,
						padding: "1.6rem 1.75rem",
						overflowY: "auto"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "wait",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 10
							},
							animate: {
								opacity: 1,
								y: 0
							},
							exit: {
								opacity: 0,
								y: -6
							},
							transition: { duration: .18 },
							children: [
								active === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overview, {
									data,
									setActive
								}),
								active === "news" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContentSection, {
									section: "news",
									rows: data.news,
									onDelete: (id) => confirmDelete("news", id),
									onAdd: () => setNewsModal(true),
									onEdit: (row) => setEditNewsData(row),
									onView: (row) => setViewNewsData(row),
									search,
									setSearch,
									columns: [
										"Title",
										"Category",
										"Date",
										"Status"
									],
									rowCells: (r) => [
										r.title,
										r.category,
										r.date,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { s: r.status }, "s")
									]
								}),
								active === "homenewsbar" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CMSHomeNewsBar, {
									search,
									setSearch
								}),
								active === "homeevents" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CMSHomeEvents, {
									search,
									setSearch
								}),
								active === "staff" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CMSStaff, {
									search,
									setSearch
								}),
								active === "faqs" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CMSFaqs, {
									search,
									setSearch
								}),
								active === "homecontent" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CMSHomeContent, {}),
								active === "departments" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CMSDepartments, {
									search,
									setSearch
								}),
								active === "sitesettings" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CMSSiteSettings, {}),
								active === "aboutoverview" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CMSAboutOverview, {}),
								active === "aboutfunctions" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CMSAboutFunctions, {}),
								active === "orgstructure" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CMSOrgStructure, {}),
								active === "abouthistory" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CMSAboutHistory, {}),
								active === "notices" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContentSection, {
									section: "notices",
									rows: data.notices,
									onDelete: (id) => confirmDelete("notices", id),
									onAdd: () => setNoticeModal(true),
									onEdit: (row) => setEditNoticeData(row),
									onView: (row) => setViewNoticeData(row),
									search,
									setSearch,
									columns: [
										"Title",
										"Type",
										"Date",
										"Status"
									],
									rowCells: (r) => [
										r.title,
										r.type || r.category,
										r.date,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { s: r.status }, "s")
									]
								}),
								active === "downloads" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DownloadsSection, {
									rows: data.downloads,
									onDelete: (id) => confirmDelete("downloads", id),
									onAdd: () => setDownloadModal(true),
									onEdit: (item) => setEditDownloadData(item),
									search,
									setSearch
								}),
								active === "gallery" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GallerySection, {
									rows: data.gallery,
									onDelete: (id) => confirmDelete("gallery", id),
									onAdd: () => setAlbumModal(true),
									onEdit: (album) => setEditAlbumData(album),
									onView: (album) => setViewAlbumData(album)
								}),
								active === "complaints" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComplaintsSection, {}),
								active === "pages" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagesSection, {}),
								active === "publish" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublishSiteSection, {}),
								active === "settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSection, { onUsernameChange: (name) => setAdminName(name) }),
								active === "policy" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolicySection, {})
							]
						}, active)
					})
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: newsModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundary, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsFormModal, {
			onClose: () => setNewsModal(false),
			onSave: addNews
		}) }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: editNewsData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundary, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsFormModal, {
			initialData: editNewsData,
			onClose: () => setEditNewsData(null),
			onSave: updateNews
		}) }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: viewNewsData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundary, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewNewsModal, {
			article: viewNewsData,
			onClose: () => setViewNewsData(null),
			onEdit: (a) => {
				setViewNewsData(null);
				setEditNewsData(a);
			}
		}) }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: noticeModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundary, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoticeFormModal, {
			onClose: () => setNoticeModal(false),
			onSave: addNotice
		}) }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: editNoticeData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundary, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoticeFormModal, {
			initialData: editNoticeData,
			onClose: () => setEditNoticeData(null),
			onSave: updateNotice
		}) }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: viewNoticeData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundary, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewNoticeModal, {
			notice: viewNoticeData,
			onClose: () => setViewNoticeData(null),
			onEdit: (n) => {
				setViewNoticeData(null);
				setEditNoticeData(n);
			}
		}) }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: albumModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewAlbumModal, {
			onClose: () => setAlbumModal(false),
			onSave: addAlbum
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: editAlbumData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewAlbumModal, {
			initialData: editAlbumData,
			onClose: () => setEditAlbumData(null),
			onSave: updateAlbum
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: viewAlbumData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewAlbumModal, {
			album: viewAlbumData,
			onClose: () => setViewAlbumData(null),
			onEdit: (album) => {
				setViewAlbumData(null);
				setEditAlbumData(album);
			}
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: downloadModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DownloadFormModal, {
			onClose: () => setDownloadModal(false),
			onSave: addDownload
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: editDownloadData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DownloadFormModal, {
			initialData: editDownloadData,
			onClose: () => setEditDownloadData(null),
			onSave: updateDownload
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: deleteModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			style: {
				position: "fixed",
				inset: 0,
				background: "rgba(0,0,0,0.48)",
				zIndex: 100,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "1rem"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					scale: .93,
					opacity: 0,
					y: 16
				},
				animate: {
					scale: 1,
					opacity: 1,
					y: 0
				},
				exit: {
					scale: .93,
					opacity: 0,
					y: 16
				},
				transition: {
					duration: .2,
					ease: [
						.16,
						1,
						.3,
						1
					]
				},
				style: {
					background: "#fff",
					borderRadius: 18,
					padding: "1.75rem",
					maxWidth: 420,
					width: "100%",
					boxShadow: "0 24px 64px rgba(0,0,0,0.22)"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: 14,
							alignItems: "flex-start",
							marginBottom: "1.5rem"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								width: 46,
								height: 46,
								borderRadius: 13,
								flexShrink: 0,
								background: "rgba(220,38,38,0.1)",
								border: "1px solid rgba(220,38,38,0.15)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, {
								size: 20,
								color: "#DC2626"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							style: {
								fontFamily: "'Playfair Display', serif",
								fontSize: "1.15rem",
								fontWeight: 800,
								color: MAROON,
								marginBottom: "0.35rem"
							},
							children: "Delete Record"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							style: {
								fontSize: "0.83rem",
								color: "rgba(74,9,24,0.55)",
								lineHeight: 1.65
							},
							children: [
								"Are you sure you want to delete",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									style: { color: MAROON },
									children: [
										"\"",
										deleteModal.title,
										"\""
									]
								}),
								"?",
								" ",
								"This action cannot be undone."
							]
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
						height: 1,
						background: "rgba(74,9,24,0.06)",
						marginBottom: "1.25rem"
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: 10,
							justifyContent: "flex-end"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setDeleteModal(null),
							style: {
								padding: "9px 20px",
								borderRadius: 10,
								border: "1px solid rgba(74,9,24,0.14)",
								background: "transparent",
								color: "rgba(74,9,24,0.55)",
								fontSize: "0.83rem",
								cursor: "pointer",
								fontFamily: "Inter, sans-serif",
								fontWeight: 500,
								transition: "all 0.15s"
							},
							onMouseEnter: (e) => e.currentTarget.style.background = "rgba(74,9,24,0.04)",
							onMouseLeave: (e) => e.currentTarget.style.background = "transparent",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
							whileHover: {
								y: -1,
								boxShadow: "0 6px 20px rgba(220,38,38,0.35)"
							},
							whileTap: { scale: .97 },
							onClick: executeDelete,
							style: {
								padding: "9px 20px",
								borderRadius: 10,
								border: "none",
								background: "linear-gradient(135deg, #DC2626 0%, #b91c1c 100%)",
								color: "#fff",
								fontSize: "0.83rem",
								cursor: "pointer",
								fontFamily: "Inter, sans-serif",
								fontWeight: 600,
								display: "flex",
								alignItems: "center",
								gap: 7,
								boxShadow: "0 3px 12px rgba(220,38,38,0.3)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, { size: 13 }), " Delete"]
						})]
					})
				]
			})
		}) })
	] });
}
function Overview({ data, setActive }) {
	const { isLive } = useSitePublish();
	const publishedNews = data.news.filter((n) => n.status === "Published").length;
	const publishedNotices = data.notices.filter((n) => n.status === "Active").length;
	const publishedDownloads = data.downloads.filter((d) => d.status === "Active" || d.status === "Published").length;
	const publishedCount = publishedNews + publishedNotices;
	const draftNews = data.news.filter((n) => n.status === "Draft").length;
	const draftNotices = data.notices.filter((n) => n.status === "Draft").length;
	const draftDownloads = data.downloads.filter((d) => d.status === "Draft").length;
	const totalDraft = draftNews + draftNotices + draftDownloads;
	const holdMap = (() => {
		try {
			return JSON.parse((typeof window !== "undefined" ? localStorage.getItem("cms_page_hold") : null) || "{}");
		} catch {
			return {};
		}
	})();
	const pendingPages = Object.values(holdMap).filter(Boolean).length;
	const totalContent = data.news.length + data.notices.length + data.downloads.length + data.gallery.length;
	const healthScore = totalContent === 0 ? 0 : Math.round(publishedCount / Math.max(data.news.length + data.notices.length, 1) * 100);
	const METRIC_CARDS = [
		{
			label: "Published Content",
			value: publishedCount,
			total: Math.max(data.news.length + data.notices.length, 1),
			icon: FiActivity,
			color: "#fff",
			iconBg: "rgba(255,255,255,0.18)",
			gradient: `linear-gradient(135deg, ${MAROON} 0%, #7C1A32 60%, #9A2540 100%)`,
			border: "rgba(199,154,43,0.3)",
			trend: totalDraft > 0 ? `${totalDraft} awaiting publish` : "All content live",
			trendColor: totalDraft > 0 ? "#FCD34D" : "#6EE7B7",
			featured: true,
			onClick: null
		},
		{
			label: "News Articles",
			value: data.news.length,
			total: Math.max(data.news.length, 1),
			icon: FiFileText,
			color: "#1e40af",
			iconBg: "rgba(30,64,175,0.1)",
			gradient: null,
			border: "rgba(74,9,24,0.07)",
			trend: draftNews > 0 ? `${draftNews} draft${draftNews > 1 ? "s" : ""}` : `${publishedNews} published`,
			trendColor: draftNews > 0 ? "#b45309" : "#166534",
			onClick: "news"
		},
		{
			label: "Active Notices",
			value: publishedNotices,
			total: Math.max(data.notices.length, 1),
			icon: FiBell,
			color: "#166534",
			iconBg: "rgba(22,101,52,0.1)",
			gradient: null,
			border: "rgba(74,9,24,0.07)",
			trend: draftNotices > 0 ? `${draftNotices} pending` : `${data.notices.length} total`,
			trendColor: draftNotices > 0 ? "#b45309" : "#166534",
			onClick: "notices"
		},
		{
			label: "Pages On Hold",
			value: pendingPages,
			total: 39,
			icon: FiLayout,
			color: pendingPages > 0 ? "#dc2626" : "#7c3aed",
			iconBg: pendingPages > 0 ? "rgba(220,38,38,0.1)" : "rgba(124,58,237,0.1)",
			gradient: null,
			border: pendingPages > 0 ? "rgba(220,38,38,0.18)" : "rgba(74,9,24,0.07)",
			trend: pendingPages > 0 ? "Hidden from public" : "All pages visible",
			trendColor: pendingPages > 0 ? "#dc2626" : "#166534",
			onClick: "pages"
		},
		{
			label: "Total Assets",
			value: totalContent,
			total: Math.max(totalContent, 1),
			icon: FiPackage,
			color: "#7c3aed",
			iconBg: "rgba(124,58,237,0.1)",
			gradient: null,
			border: "rgba(74,9,24,0.07)",
			trend: `${data.gallery.length} albums · ${data.downloads.length} files`,
			trendColor: "#7c3aed",
			onClick: null
		},
		{
			label: "Downloads",
			value: data.downloads.length,
			total: Math.max(data.downloads.length, 1),
			icon: FiDownload,
			color: "#0e7490",
			iconBg: "rgba(14,116,144,0.1)",
			gradient: null,
			border: "rgba(74,9,24,0.07)",
			trend: draftDownloads > 0 ? `${draftDownloads} not published` : `${publishedDownloads} active`,
			trendColor: draftDownloads > 0 ? "#b45309" : "#0e7490",
			onClick: "downloads"
		}
	];
	const QUICK_ACTIONS = [
		{
			label: "Add News",
			icon: FiPlus,
			section: "news"
		},
		{
			label: "Post Notice",
			icon: FiBell,
			section: "notices"
		},
		{
			label: "News Bar",
			icon: FiRadio,
			section: "homenewsbar"
		},
		{
			label: "Gallery",
			icon: FiImage,
			section: "gallery"
		},
		{
			label: "Page Hold",
			icon: FiLayout,
			section: "pages"
		},
		{
			label: "Publish Site",
			icon: FiGlobe,
			section: "publish"
		}
	];
	const waitingItems = [
		...data.news.filter((n) => n.status === "Draft").map((n) => ({
			...n,
			_type: "News",
			_section: "news"
		})),
		...data.notices.filter((n) => n.status === "Draft").map((n) => ({
			...n,
			_type: "Notice",
			_section: "notices"
		})),
		...data.downloads.filter((d) => d.status === "Draft").map((d) => ({
			...d,
			_type: "Download",
			_section: "downloads"
		}))
	];
	const heldPageKeys = Object.entries(holdMap).filter(([, v]) => v).map(([k]) => k);
	const PAGE_LABELS = {
		"about": "About Us",
		"about__overview": "Overview",
		"about__organization-structure": "Organization Structure",
		"about__functions-duties": "Functions & Duties",
		"about__history": "History",
		"about__deputy-secretary-planning": "Deputy Chief Secretary",
		"about__director-planning": "Director – Planning",
		"about__deputy-directors": "Deputy Directors",
		"about__deputy-directors__1": "DD I",
		"about__deputy-directors__2": "DD II",
		"about__deputy-directors__3": "DD III",
		"about__deputy-directors__4": "DD IV",
		"about__deputy-directors__5": "DD V",
		"about__deputy-directors__6": "DD VI",
		"about-deputy-secretary": "About Deputy Secretary",
		"departments": "Departments",
		"departments__accounts": "Accounts Division",
		"departments__administration": "Administration Division",
		"departments__development": "Development Division",
		"departments__head-administration": "Head of Administration",
		"departments__head-accounts": "Head of Accounts",
		"news": "Media Center",
		"notices": "Official Notices",
		"downloads": "Downloads",
		"gallery": "Photo Gallery",
		"documents": "Documents",
		"contact": "Contact Us"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: -12
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: { duration: .32 },
			style: {
				background: `linear-gradient(130deg, ${MAROON2} 0%, ${MAROON} 55%, #7C1A32 100%)`,
				borderRadius: 22,
				padding: "1.6rem 2rem",
				marginBottom: "1.4rem",
				overflow: "hidden",
				position: "relative",
				boxShadow: `0 8px 40px rgba(74,9,24,0.24), 0 2px 0 rgba(199,154,43,0.3) inset`
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					height: 2,
					background: `linear-gradient(90deg, transparent 0%, ${GOLD} 30%, #F0D060 50%, ${GOLD} 70%, transparent 100%)`
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					position: "absolute",
					right: -50,
					top: -50,
					width: 220,
					height: 220,
					borderRadius: "50%",
					background: "rgba(199,154,43,0.06)",
					pointerEvents: "none"
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					position: "absolute",
					right: 80,
					bottom: -70,
					width: 180,
					height: 180,
					borderRadius: "50%",
					background: "rgba(255,255,255,0.03)",
					pointerEvents: "none"
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					position: "absolute",
					left: -30,
					bottom: -40,
					width: 140,
					height: 140,
					borderRadius: "50%",
					background: "rgba(199,154,43,0.04)",
					pointerEvents: "none"
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						position: "relative",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						flexWrap: "wrap",
						gap: 16
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontSize: "0.63rem",
								fontWeight: 700,
								color: GOLD,
								letterSpacing: "0.16em",
								textTransform: "uppercase",
								margin: "0 0 7px"
							},
							children: "Content Management System"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							style: {
								fontFamily: "'Playfair Display', serif",
								fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)",
								fontWeight: 800,
								color: "#fff",
								margin: "0 0 8px",
								lineHeight: 1.2
							},
							children: [
								getGreeting(),
								",",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: { color: GOLD },
									children: (typeof window !== "undefined" ? localStorage.getItem("cms_username") : null) || "Admin"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 14,
								flexWrap: "wrap"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									style: {
										fontSize: "0.74rem",
										color: "rgba(255,255,255,0.5)",
										margin: 0,
										display: "flex",
										alignItems: "center",
										gap: 6
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCalendar, {
											size: 11,
											style: { color: GOLD }
										}),
										" ",
										friendlyDate()
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									style: {
										display: "inline-flex",
										alignItems: "center",
										gap: 5,
										fontSize: "0.65rem",
										fontWeight: 700,
										letterSpacing: "0.08em",
										padding: "3px 10px",
										borderRadius: 100,
										background: isLive ? "rgba(34,197,94,0.18)" : "rgba(239,68,68,0.18)",
										border: `1px solid ${isLive ? "rgba(34,197,94,0.35)" : "rgba(239,68,68,0.35)"}`,
										color: isLive ? "#86efac" : "#fca5a5"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
										width: 5,
										height: 5,
										borderRadius: "50%",
										background: isLive ? "#22c55e" : "#ef4444",
										display: "inline-block",
										boxShadow: isLive ? "0 0 6px #22c55e" : "0 0 6px #ef4444"
									} }), isLive ? "Site Live" : "Coming Soon"]
								}),
								totalDraft > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									style: {
										display: "inline-flex",
										alignItems: "center",
										gap: 5,
										fontSize: "0.65rem",
										fontWeight: 700,
										padding: "3px 10px",
										borderRadius: 100,
										background: "rgba(251,191,36,0.18)",
										border: "1px solid rgba(251,191,36,0.35)",
										color: "#fde68a"
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiClock, { size: 9 }),
										" ",
										totalDraft,
										" Awaiting Publish"
									]
								}),
								pendingPages > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									style: {
										display: "inline-flex",
										alignItems: "center",
										gap: 5,
										fontSize: "0.65rem",
										fontWeight: 700,
										padding: "3px 10px",
										borderRadius: 100,
										background: "rgba(239,68,68,0.18)",
										border: "1px solid rgba(239,68,68,0.35)",
										color: "#fca5a5"
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiLayout, { size: 9 }),
										" ",
										pendingPages,
										" Pages On Hold"
									]
								})
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							display: "flex",
							gap: 7,
							flexWrap: "wrap"
						},
						children: QUICK_ACTIONS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
							whileHover: {
								y: -2,
								boxShadow: "0 6px 20px rgba(0,0,0,0.3)"
							},
							whileTap: { scale: .95 },
							onClick: () => setActive(a.section),
							style: {
								display: "flex",
								alignItems: "center",
								gap: 6,
								padding: "7px 13px",
								borderRadius: 10,
								border: "1px solid rgba(255,255,255,0.16)",
								background: "rgba(255,255,255,0.09)",
								backdropFilter: "blur(8px)",
								color: "#fff",
								fontSize: "0.73rem",
								fontWeight: 600,
								cursor: "pointer",
								fontFamily: "Inter, sans-serif",
								transition: "all 0.15s",
								whiteSpace: "nowrap"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(a.icon, { size: 11 }),
								" ",
								a.label
							]
						}, a.label))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						position: "relative",
						marginTop: 18,
						paddingTop: 14,
						borderTop: "1px solid rgba(255,255,255,0.08)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							marginBottom: 7
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								fontSize: "0.63rem",
								color: "rgba(255,255,255,0.45)",
								fontWeight: 600,
								letterSpacing: "0.1em",
								textTransform: "uppercase"
							},
							children: "Content Health"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							style: {
								fontSize: "0.68rem",
								color: GOLD,
								fontWeight: 700
							},
							children: [healthScore, "%"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							height: 4,
							background: "rgba(255,255,255,0.1)",
							borderRadius: 100,
							overflow: "hidden"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: { width: 0 },
							animate: { width: `${healthScore}%` },
							transition: {
								delay: .5,
								duration: 1.2,
								ease: "easeOut"
							},
							style: {
								height: "100%",
								borderRadius: 100,
								background: `linear-gradient(90deg, ${GOLD} 0%, #F0D060 60%, #FFF7CD 100%)`,
								boxShadow: `0 0 10px ${GOLD}`
							}
						})
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				display: "grid",
				gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
				gap: "1rem",
				marginBottom: "1.4rem"
			},
			children: METRIC_CARDS.map((mc, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { delay: i * .06 },
				whileHover: {
					y: -4,
					boxShadow: mc.featured ? "0 18px 50px rgba(74,9,24,0.3)" : "0 12px 36px rgba(74,9,24,0.13)"
				},
				onClick: () => mc.onClick && setActive(mc.onClick),
				style: {
					background: mc.gradient || "#fff",
					borderRadius: 18,
					padding: "1.25rem 1.35rem",
					border: `1px solid ${mc.border}`,
					boxShadow: mc.featured ? "0 8px 28px rgba(74,9,24,0.2)" : "0 2px 14px rgba(74,9,24,0.06)",
					overflow: "hidden",
					position: "relative",
					cursor: mc.onClick ? "pointer" : "default",
					transition: "box-shadow 0.2s, transform 0.2s"
				},
				children: [
					mc.featured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						height: 2,
						background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`
					} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
						position: "absolute",
						right: -24,
						bottom: -24,
						width: 100,
						height: 100,
						borderRadius: "50%",
						background: "rgba(255,255,255,0.04)",
						pointerEvents: "none"
					} })] }),
					mc.label === "Pages On Hold" && mc.value > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						height: 2,
						background: "linear-gradient(90deg, transparent, #dc2626, transparent)"
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							alignItems: "flex-start",
							justifyContent: "space-between",
							marginBottom: "1rem"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								width: 44,
								height: 44,
								borderRadius: 13,
								background: mc.featured ? "rgba(255,255,255,0.16)" : mc.iconBg,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								border: mc.featured ? "1px solid rgba(255,255,255,0.2)" : "none"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(mc.icon, {
								size: 19,
								color: mc.featured ? "#fff" : mc.color
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								fontSize: "0.61rem",
								fontWeight: 700,
								color: mc.trendColor,
								textAlign: "right",
								lineHeight: 1.5,
								maxWidth: 108,
								background: mc.featured ? "rgba(199,154,43,0.15)" : `${mc.color}12`,
								padding: "2px 8px",
								borderRadius: 6
							},
							children: mc.trend
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontSize: "2.1rem",
							fontWeight: 900,
							lineHeight: 1,
							marginBottom: 4,
							color: mc.featured ? "#fff" : mc.label === "Pages On Hold" && mc.value > 0 ? "#dc2626" : MAROON,
							fontFamily: "'Cinzel', serif"
						},
						children: String(mc.value).padStart(2, "0")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontSize: "0.73rem",
							color: mc.featured ? "rgba(255,255,255,0.65)" : "rgba(74,9,24,0.48)",
							marginBottom: "0.85rem",
							fontWeight: 500
						},
						children: mc.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							height: 3,
							background: mc.featured ? "rgba(255,255,255,0.15)" : "rgba(74,9,24,0.07)",
							borderRadius: 100,
							overflow: "hidden"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: { width: 0 },
							animate: { width: `${Math.min(Math.round(mc.value / mc.total * 100), 100)}%` },
							transition: {
								delay: i * .06 + .4,
								duration: 1.1,
								ease: "easeOut"
							},
							style: {
								height: "100%",
								borderRadius: 100,
								background: mc.featured ? `linear-gradient(90deg, ${GOLD}, #F0D060)` : mc.label === "Pages On Hold" && mc.value > 0 ? "#dc2626" : mc.color,
								boxShadow: mc.featured ? `0 0 8px ${GOLD}` : "none"
							}
						})
					})
				]
			}, mc.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "grid",
				gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
				gap: "1rem",
				marginBottom: "1.4rem"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 16
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { delay: .3 },
				style: {
					background: "#fff",
					borderRadius: 18,
					border: waitingItems.length > 0 ? "1px solid rgba(180,83,9,0.22)" : "1px solid rgba(74,9,24,0.07)",
					boxShadow: waitingItems.length > 0 ? "0 4px 20px rgba(180,83,9,0.09)" : "0 2px 14px rgba(74,9,24,0.06)",
					overflow: "hidden"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							padding: "0.95rem 1.25rem",
							borderBottom: "1px solid rgba(74,9,24,0.06)",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							background: waitingItems.length > 0 ? "rgba(180,83,9,0.04)" : "rgba(74,9,24,0.015)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 9
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
									width: 3,
									height: 16,
									borderRadius: 2,
									background: waitingItems.length > 0 ? "linear-gradient(#b45309, #d97706)" : `linear-gradient(${MAROON}, ${GOLD})`
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiInbox, {
									size: 13,
									color: waitingItems.length > 0 ? "#b45309" : GOLD
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: "0.82rem",
										fontWeight: 700,
										color: waitingItems.length > 0 ? "#92400e" : MAROON
									},
									children: "Waiting for Publish"
								}),
								waitingItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: "0.62rem",
										fontWeight: 800,
										background: "#b45309",
										color: "#fff",
										borderRadius: 100,
										padding: "1px 7px",
										minWidth: 18,
										textAlign: "center"
									},
									children: waitingItems.length
								})
							]
						}), waitingItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								fontSize: "0.67rem",
								color: "#92400e",
								fontWeight: 600,
								background: "rgba(180,83,9,0.1)",
								padding: "2px 8px",
								borderRadius: 6
							},
							children: "Draft"
						})]
					}),
					waitingItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							padding: "2rem 1.2rem",
							textAlign: "center"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									width: 46,
									height: 46,
									borderRadius: 13,
									margin: "0 auto 10px",
									background: "rgba(22,101,52,0.08)",
									border: "1px dashed rgba(22,101,52,0.2)",
									display: "flex",
									alignItems: "center",
									justifyContent: "center"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, {
									size: 20,
									color: "#16a34a"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "0.83rem",
									fontWeight: 700,
									color: "#166534",
									marginBottom: 4
								},
								children: "All content is published"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "0.71rem",
									color: "rgba(74,9,24,0.3)"
								},
								children: "No drafts waiting for approval"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							maxHeight: 260,
							overflowY: "auto"
						},
						children: waitingItems.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								x: -8
							},
							animate: {
								opacity: 1,
								x: 0
							},
							transition: { delay: idx * .04 },
							onClick: () => setActive(item._section),
							style: {
								padding: "0.75rem 1.25rem",
								borderBottom: idx < waitingItems.length - 1 ? "1px solid rgba(74,9,24,0.04)" : "none",
								display: "flex",
								alignItems: "center",
								gap: 10,
								cursor: "pointer",
								transition: "background 0.12s"
							},
							onMouseEnter: (e) => e.currentTarget.style.background = "rgba(180,83,9,0.04)",
							onMouseLeave: (e) => e.currentTarget.style.background = "transparent",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: "0.57rem",
										fontWeight: 800,
										letterSpacing: "0.08em",
										textTransform: "uppercase",
										padding: "2px 7px",
										borderRadius: 5,
										flexShrink: 0,
										background: item._type === "News" ? "rgba(30,64,175,0.1)" : item._type === "Notice" ? "rgba(22,101,52,0.1)" : "rgba(14,116,144,0.1)",
										color: item._type === "News" ? "#1e40af" : item._type === "Notice" ? "#166534" : "#0e7490"
									},
									children: item._type
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										overflow: "hidden",
										textOverflow: "ellipsis",
										whiteSpace: "nowrap",
										flex: 1,
										fontSize: "0.8rem",
										fontWeight: 500,
										color: MAROON
									},
									children: item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: "0.62rem",
										fontWeight: 700,
										background: "rgba(180,83,9,0.1)",
										color: "#92400e",
										padding: "2px 7px",
										borderRadius: 5,
										flexShrink: 0
									},
									children: "Draft"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronRight, {
									size: 13,
									color: "rgba(74,9,24,0.3)",
									style: { flexShrink: 0 }
								})
							]
						}, `${item._type}-${item.id}`))
					}),
					waitingItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							padding: "8px 1.25rem",
							borderTop: "1px solid rgba(74,9,24,0.05)",
							display: "flex",
							gap: 12,
							background: "rgba(74,9,24,0.01)"
						},
						children: [
							{
								label: "News",
								count: draftNews,
								color: "#1e40af"
							},
							{
								label: "Notices",
								count: draftNotices,
								color: "#166534"
							},
							{
								label: "Downloads",
								count: draftDownloads,
								color: "#0e7490"
							}
						].filter((s) => s.count > 0).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							style: {
								fontSize: "0.68rem",
								color: s.color,
								fontWeight: 600
							},
							children: [
								s.count,
								" ",
								s.label
							]
						}, s.label))
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 16
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { delay: .38 },
				style: {
					background: "#fff",
					borderRadius: 18,
					border: heldPageKeys.length > 0 ? "1px solid rgba(220,38,38,0.2)" : "1px solid rgba(74,9,24,0.07)",
					boxShadow: heldPageKeys.length > 0 ? "0 4px 20px rgba(220,38,38,0.08)" : "0 2px 14px rgba(74,9,24,0.06)",
					overflow: "hidden"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							padding: "0.95rem 1.25rem",
							borderBottom: "1px solid rgba(74,9,24,0.06)",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							background: heldPageKeys.length > 0 ? "rgba(220,38,38,0.03)" : "rgba(74,9,24,0.015)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 9
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
									width: 3,
									height: 16,
									borderRadius: 2,
									background: heldPageKeys.length > 0 ? "linear-gradient(#dc2626, #ef4444)" : `linear-gradient(${MAROON}, ${GOLD})`
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiLayout, {
									size: 13,
									color: heldPageKeys.length > 0 ? "#dc2626" : GOLD
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: "0.82rem",
										fontWeight: 700,
										color: heldPageKeys.length > 0 ? "#991b1b" : MAROON
									},
									children: "Pending Pages"
								}),
								heldPageKeys.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: "0.62rem",
										fontWeight: 800,
										background: "#dc2626",
										color: "#fff",
										borderRadius: 100,
										padding: "1px 7px",
										minWidth: 18,
										textAlign: "center"
									},
									children: heldPageKeys.length
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActive("pages"),
							style: {
								background: "none",
								border: "none",
								cursor: "pointer",
								fontSize: "0.7rem",
								color: GOLD,
								fontWeight: 700,
								fontFamily: "Inter, sans-serif"
							},
							children: "Manage →"
						})]
					}),
					heldPageKeys.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							padding: "2rem 1.2rem",
							textAlign: "center"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									width: 46,
									height: 46,
									borderRadius: 13,
									margin: "0 auto 10px",
									background: "rgba(22,101,52,0.08)",
									border: "1px dashed rgba(22,101,52,0.2)",
									display: "flex",
									alignItems: "center",
									justifyContent: "center"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiGlobe, {
									size: 20,
									color: "#16a34a"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "0.83rem",
									fontWeight: 700,
									color: "#166534",
									marginBottom: 4
								},
								children: "All pages are live"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "0.71rem",
									color: "rgba(74,9,24,0.3)"
								},
								children: "No pages are hidden from the public"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							maxHeight: 260,
							overflowY: "auto"
						},
						children: [heldPageKeys.slice(0, 10).map((key, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								x: -8
							},
							animate: {
								opacity: 1,
								x: 0
							},
							transition: { delay: idx * .04 },
							onClick: () => setActive("pages"),
							style: {
								padding: "0.72rem 1.25rem",
								borderBottom: idx < Math.min(heldPageKeys.length, 10) - 1 ? "1px solid rgba(74,9,24,0.04)" : "none",
								display: "flex",
								alignItems: "center",
								gap: 10,
								cursor: "pointer",
								transition: "background 0.12s"
							},
							onMouseEnter: (e) => e.currentTarget.style.background = "rgba(220,38,38,0.03)",
							onMouseLeave: (e) => e.currentTarget.style.background = "transparent",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
									width: 5,
									height: 5,
									borderRadius: "50%",
									background: "#dc2626",
									flexShrink: 0
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										flex: 1,
										fontSize: "0.8rem",
										fontWeight: 500,
										color: "#991b1b",
										overflow: "hidden",
										textOverflow: "ellipsis",
										whiteSpace: "nowrap"
									},
									children: PAGE_LABELS[key] || key
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: "0.6rem",
										fontWeight: 700,
										textTransform: "uppercase",
										letterSpacing: "0.06em",
										background: "rgba(220,38,38,0.1)",
										color: "#dc2626",
										border: "1px solid rgba(220,38,38,0.2)",
										borderRadius: 100,
										padding: "1px 7px",
										flexShrink: 0
									},
									children: "On Hold"
								})
							]
						}, key)), heldPageKeys.length > 10 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								padding: "8px 1.25rem",
								fontSize: "0.72rem",
								color: "rgba(74,9,24,0.4)",
								textAlign: "center"
							},
							children: [
								"+",
								heldPageKeys.length - 10,
								" more pages on hold"
							]
						})]
					}),
					heldPageKeys.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							padding: "8px 1.25rem",
							borderTop: "1px solid rgba(74,9,24,0.05)",
							background: "rgba(220,38,38,0.02)",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							style: {
								fontSize: "0.68rem",
								color: "#991b1b",
								fontWeight: 600
							},
							children: [heldPageKeys.length, " of 39 pages hidden"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								height: 4,
								width: 80,
								background: "rgba(220,38,38,0.12)",
								borderRadius: 100,
								overflow: "hidden"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
								height: "100%",
								borderRadius: 100,
								background: "#dc2626",
								width: `${Math.min(heldPageKeys.length / 39 * 100, 100)}%`,
								transition: "width 0.8s ease"
							} })
						})]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "grid",
				gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
				gap: "1rem",
				marginBottom: "1.4rem"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 16
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { delay: .44 },
				style: {
					background: "#fff",
					borderRadius: 18,
					border: "1px solid rgba(74,9,24,0.07)",
					boxShadow: "0 2px 14px rgba(74,9,24,0.06)",
					overflow: "hidden"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						padding: "0.95rem 1.25rem",
						borderBottom: "1px solid rgba(74,9,24,0.06)",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						background: "rgba(74,9,24,0.015)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							alignItems: "center",
							gap: 9
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
								width: 3,
								height: 16,
								borderRadius: 2,
								background: `linear-gradient(${MAROON}, ${GOLD})`
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiBarChart2, {
								size: 13,
								color: GOLD
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: "0.82rem",
									fontWeight: 700,
									color: MAROON
								},
								children: "Content Breakdown"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						style: {
							fontSize: "0.66rem",
							color: "rgba(74,9,24,0.35)",
							fontWeight: 500
						},
						children: [totalContent, " total items"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: { padding: "1.25rem" },
					children: [
						{
							label: "News",
							published: publishedNews,
							draft: draftNews,
							total: data.news.length,
							color: "#1e40af",
							section: "news"
						},
						{
							label: "Notices",
							published: publishedNotices,
							draft: draftNotices,
							total: data.notices.length,
							color: "#166534",
							section: "notices"
						},
						{
							label: "Downloads",
							published: publishedDownloads,
							draft: draftDownloads,
							total: data.downloads.length,
							color: "#0e7490",
							section: "downloads"
						},
						{
							label: "Gallery",
							published: data.gallery.length,
							draft: 0,
							total: data.gallery.length,
							color: "#7c3aed",
							section: "gallery"
						}
					].map((row, ri) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: () => setActive(row.section),
						style: {
							marginBottom: ri < 3 ? 14 : 0,
							cursor: "pointer"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								marginBottom: 5
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: 7
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
										width: 8,
										height: 8,
										borderRadius: "50%",
										background: row.color,
										display: "inline-block"
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											fontSize: "0.77rem",
											fontWeight: 600,
											color: MAROON
										},
										children: row.label
									}),
									row.draft > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										style: {
											fontSize: "0.58rem",
											fontWeight: 700,
											background: "rgba(180,83,9,0.1)",
											color: "#92400e",
											padding: "1px 6px",
											borderRadius: 4
										},
										children: [row.draft, " draft"]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								style: {
									fontSize: "0.72rem",
									fontWeight: 700,
									color: "rgba(74,9,24,0.5)"
								},
								children: [
									row.published,
									"/",
									row.total
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								height: 6,
								background: "rgba(74,9,24,0.06)",
								borderRadius: 100,
								overflow: "hidden"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: { width: 0 },
								animate: { width: `${row.total > 0 ? Math.round(row.published / row.total * 100) : 0}%` },
								transition: {
									delay: .5 + ri * .1,
									duration: 1,
									ease: "easeOut"
								},
								style: {
									height: "100%",
									background: row.color,
									borderRadius: 100
								}
							})
						})]
					}, row.label))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					display: "flex",
					flexDirection: "column",
					gap: "1rem"
				},
				children: [{
					label: "Latest News",
					key: "news",
					items: data.news.slice(0, 3),
					icon: FiFileText
				}, {
					label: "Recent Notices",
					key: "notices",
					items: data.notices.slice(0, 2),
					icon: FiBell
				}].map((pcard) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 12
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { delay: .5 },
					style: {
						background: "#fff",
						borderRadius: 18,
						flex: 1,
						border: "1px solid rgba(74,9,24,0.07)",
						boxShadow: "0 2px 14px rgba(74,9,24,0.06)",
						overflow: "hidden"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							padding: "0.9rem 1.2rem",
							borderBottom: "1px solid rgba(74,9,24,0.06)",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							background: "rgba(74,9,24,0.015)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 8
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
									width: 3,
									height: 16,
									borderRadius: 2,
									background: `linear-gradient(${MAROON}, ${GOLD})`
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(pcard.icon, {
									size: 13,
									color: GOLD
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: "0.8rem",
										fontWeight: 700,
										color: MAROON
									},
									children: pcard.label
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActive(pcard.key),
							style: {
								background: "none",
								border: "none",
								cursor: "pointer",
								fontSize: "0.7rem",
								color: GOLD,
								fontWeight: 700,
								fontFamily: "Inter, sans-serif",
								letterSpacing: "0.02em"
							},
							children: "View all →"
						})]
					}), pcard.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							padding: "1.1rem 1.2rem",
							fontSize: "0.78rem",
							color: "rgba(74,9,24,0.3)",
							textAlign: "center"
						},
						children: "No records yet"
					}) : pcard.items.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							padding: "0.7rem 1.2rem",
							borderBottom: idx < pcard.items.length - 1 ? "1px solid rgba(74,9,24,0.04)" : "none",
							display: "flex",
							alignItems: "center",
							gap: 9,
							transition: "background 0.12s"
						},
						onMouseEnter: (e) => e.currentTarget.style.background = "rgba(74,9,24,0.02)",
						onMouseLeave: (e) => e.currentTarget.style.background = "transparent",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
								width: 5,
								height: 5,
								borderRadius: "50%",
								background: GOLD,
								flexShrink: 0,
								opacity: .8
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap",
									flex: 1,
									fontWeight: 500,
									fontSize: "0.78rem",
									color: MAROON
								},
								children: item.title
							}),
							item.status && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { s: item.status })
						]
					}, item.id))]
				}, pcard.key))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 12
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: { delay: .55 },
			style: {
				background: `linear-gradient(135deg, rgba(74,9,24,0.04) 0%, rgba(199,154,43,0.04) 100%)`,
				borderRadius: 16,
				padding: "1rem 1.5rem",
				border: "1px solid rgba(74,9,24,0.07)",
				display: "flex",
				alignItems: "center",
				flexWrap: "wrap",
				gap: 20
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					alignItems: "center",
					gap: 8,
					flex: 1,
					minWidth: 160
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrendingUp, {
					size: 14,
					color: GOLD
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: {
						fontSize: "0.74rem",
						fontWeight: 700,
						color: MAROON
					},
					children: "System Status"
				})]
			}), [
				{
					label: "Site",
					value: isLive ? "Live" : "Offline",
					ok: isLive
				},
				{
					label: "Drafts",
					value: `${totalDraft} pending`,
					ok: totalDraft === 0
				},
				{
					label: "Pages",
					value: `${pendingPages} on hold`,
					ok: pendingPages === 0
				},
				{
					label: "Content",
					value: `${totalContent} items`,
					ok: true
				},
				{
					label: "Health",
					value: `${healthScore}%`,
					ok: healthScore >= 80
				}
			].map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					alignItems: "center",
					gap: 6
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
						width: 6,
						height: 6,
						borderRadius: "50%",
						background: stat.ok ? "#22c55e" : "#f59e0b",
						display: "inline-block",
						flexShrink: 0,
						boxShadow: stat.ok ? "0 0 5px #22c55e" : "0 0 5px #f59e0b"
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						style: {
							fontSize: "0.67rem",
							color: "rgba(74,9,24,0.45)",
							fontWeight: 500
						},
						children: [stat.label, ":"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							fontSize: "0.7rem",
							fontWeight: 700,
							color: stat.ok ? "#166534" : "#92400e"
						},
						children: stat.value
					})
				]
			}, stat.label))]
		})
	] });
}
function ContentSection({ section, rows, onDelete, onAdd, onEdit, onView, columns, rowCells, search, setSearch }) {
	const label = section.charAt(0).toUpperCase() + section.slice(1);
	const [selected, setSelected] = (0, import_react.useState)([]);
	const filtered = rows.filter((r) => Object.values(r).some((v) => String(v).toLowerCase().includes(search.toLowerCase())));
	const toggleSelect = (id) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
	const allSelected = filtered.length > 0 && filtered.every((r) => selected.includes(r.id));
	const toggleAll = () => setSelected(allSelected ? [] : filtered.map((r) => r.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			alignItems: "flex-start",
			justifyContent: "space-between",
			marginBottom: "1.4rem",
			flexWrap: "wrap",
			gap: 12
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "center",
				gap: 10,
				marginBottom: 5
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
				width: 3,
				height: 24,
				borderRadius: 2,
				background: `linear-gradient(${MAROON}, ${GOLD})`,
				flexShrink: 0
			} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				style: {
					fontFamily: "'Playfair Display', serif",
					fontSize: "1.35rem",
					fontWeight: 800,
					color: MAROON,
					margin: 0
				},
				children: label
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			style: {
				fontSize: "0.76rem",
				color: "rgba(74,9,24,0.4)",
				marginLeft: 13
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: {
						fontWeight: 700,
						color: MAROON
					},
					children: rows.length
				}),
				" record",
				rows.length !== 1 ? "s" : "",
				" total",
				selected.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					style: {
						color: GOLD,
						fontWeight: 600,
						marginLeft: 8,
						background: "rgba(199,154,43,0.1)",
						padding: "1px 8px",
						borderRadius: 5
					},
					children: [
						"· ",
						selected.length,
						" selected"
					]
				})
			]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				gap: 10,
				alignItems: "center",
				flexWrap: "wrap"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					alignItems: "center",
					gap: 8,
					background: "#fff",
					border: "1px solid rgba(74,9,24,0.11)",
					borderRadius: 11,
					padding: "8px 13px",
					boxShadow: "0 1px 6px rgba(74,9,24,0.05)"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiSearch, {
						size: 13,
						color: "rgba(74,9,24,0.32)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: search,
						onChange: (e) => setSearch(e.target.value),
						placeholder: "Search records…",
						style: {
							border: "none",
							outline: "none",
							fontSize: "0.8rem",
							color: MAROON,
							background: "transparent",
							width: 165,
							fontFamily: "Inter, sans-serif"
						}
					}),
					search && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setSearch(""),
						style: {
							background: "none",
							border: "none",
							cursor: "pointer",
							color: "rgba(74,9,24,0.38)",
							padding: 0,
							display: "flex"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 13 })
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
				whileHover: {
					y: -2,
					boxShadow: "0 10px 28px rgba(74,9,24,0.36)"
				},
				whileTap: { scale: .97 },
				onClick: onAdd,
				style: {
					display: "flex",
					alignItems: "center",
					gap: 7,
					padding: "9px 18px",
					borderRadius: 11,
					border: "none",
					background: `linear-gradient(135deg, ${MAROON} 0%, #7C1A32 100%)`,
					color: "#fff",
					fontSize: "0.8rem",
					fontWeight: 600,
					cursor: "pointer",
					fontFamily: "Inter, sans-serif",
					boxShadow: "0 4px 16px rgba(74,9,24,0.3)",
					position: "relative",
					overflow: "hidden"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						height: 1,
						background: "rgba(255,255,255,0.2)"
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPlus, { size: 14 }),
					" Add New"
				]
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			background: "#fff",
			borderRadius: 18,
			overflow: "hidden",
			border: "1px solid rgba(74,9,24,0.07)",
			boxShadow: "0 4px 20px rgba(74,9,24,0.07)"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: { overflowX: "auto" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				style: {
					width: "100%",
					borderCollapse: "collapse"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					style: {
						background: `linear-gradient(90deg, rgba(74,9,24,0.03) 0%, rgba(74,9,24,0.02) 100%)`,
						borderBottom: "1px solid rgba(74,9,24,0.07)"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							style: {
								padding: "12px 16px",
								width: 40
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								onClick: toggleAll,
								style: {
									width: 17,
									height: 17,
									borderRadius: 5,
									border: `2px solid ${allSelected ? GOLD : "rgba(74,9,24,0.18)"}`,
									background: allSelected ? GOLD : "transparent",
									cursor: "pointer",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									transition: "all 0.15s"
								},
								children: allSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, {
									size: 9,
									color: "#fff",
									strokeWidth: 3
								})
							})
						}),
						columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							style: {
								padding: "12px 16px",
								textAlign: "left",
								fontSize: "0.63rem",
								fontWeight: 800,
								color: "rgba(74,9,24,0.38)",
								textTransform: "uppercase",
								letterSpacing: "0.11em",
								whiteSpace: "nowrap"
							},
							children: c
						}, c)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							style: {
								padding: "12px 16px",
								textAlign: "right",
								fontSize: "0.63rem",
								fontWeight: 800,
								color: "rgba(74,9,24,0.38)",
								textTransform: "uppercase",
								letterSpacing: "0.11em"
							},
							children: "Actions"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: columns.length + 2,
					style: {
						padding: "4rem",
						textAlign: "center"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: 12
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									width: 60,
									height: 60,
									borderRadius: 18,
									background: "rgba(74,9,24,0.05)",
									border: "1px dashed rgba(74,9,24,0.14)",
									display: "flex",
									alignItems: "center",
									justifyContent: "center"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiSearch, {
									size: 24,
									color: "rgba(74,9,24,0.22)"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "0.88rem",
									fontWeight: 700,
									color: "rgba(74,9,24,0.35)"
								},
								children: "No records found"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "0.74rem",
									color: "rgba(74,9,24,0.25)"
								},
								children: "Try adjusting your search query"
							})
						]
					})
				}) }), filtered.map((row, i) => {
					const isSel = selected.includes(row.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.tr, {
						initial: {
							opacity: 0,
							y: 5
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: i * .035 },
						style: {
							borderBottom: i < filtered.length - 1 ? "1px solid rgba(74,9,24,0.045)" : "none",
							background: isSel ? "rgba(199,154,43,0.05)" : "transparent",
							transition: "background 0.12s"
						},
						onMouseEnter: (e) => {
							if (!isSel) e.currentTarget.style.background = "rgba(74,9,24,0.018)";
						},
						onMouseLeave: (e) => {
							e.currentTarget.style.background = isSel ? "rgba(199,154,43,0.05)" : "transparent";
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: { padding: "12px 16px" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									onClick: () => toggleSelect(row.id),
									style: {
										width: 17,
										height: 17,
										borderRadius: 5,
										border: `2px solid ${isSel ? GOLD : "rgba(74,9,24,0.16)"}`,
										background: isSel ? GOLD : "transparent",
										cursor: "pointer",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										transition: "all 0.15s"
									},
									children: isSel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, {
										size: 9,
										color: "#fff",
										strokeWidth: 3
									})
								})
							}),
							rowCells(row).map((cell, ci) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									padding: "12px 16px",
									fontSize: "0.82rem",
									color: ci === 0 ? MAROON : "#4b5563",
									fontWeight: ci === 0 ? 600 : 400,
									maxWidth: ci === 0 ? 260 : void 0,
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: ci === 0 ? "nowrap" : void 0
								},
								children: cell
							}, ci)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: { padding: "12px 16px" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										gap: 5,
										justifyContent: "flex-end"
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionBtn, {
											icon: FiEye,
											title: "View",
											color: "rgba(74,9,24,0.45)",
											onClick: () => onView ? onView(row) : toast.info(`Viewing: ${row.title}`)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionBtn, {
											icon: FiEdit2,
											title: "Edit",
											color: GOLD,
											onClick: () => onEdit ? onEdit(row) : toast.info(`Editing: ${row.title}`)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionBtn, {
											icon: FiTrash2,
											title: "Delete",
											color: "#DC2626",
											onClick: () => onDelete(row.id)
										})
									]
								})
							})
						]
					}, row.id);
				})] })]
			})
		}), filtered.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				padding: "10px 18px",
				borderTop: "1px solid rgba(74,9,24,0.06)",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				background: "rgba(74,9,24,0.012)"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				style: {
					fontSize: "0.71rem",
					color: "rgba(74,9,24,0.38)",
					fontWeight: 500
				},
				children: [
					"Showing ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						style: { color: MAROON },
						children: filtered.length
					}),
					" of ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						style: { color: MAROON },
						children: rows.length
					}),
					" records"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					display: "flex",
					gap: 4
				},
				children: [FiChevronLeft, FiChevronRight].map((Icon, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					style: {
						width: 30,
						height: 30,
						borderRadius: 8,
						border: "1px solid rgba(74,9,24,0.11)",
						background: "#fff",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						cursor: "pointer",
						color: "rgba(74,9,24,0.4)",
						transition: "all 0.12s",
						boxShadow: "0 1px 4px rgba(74,9,24,0.05)"
					},
					onMouseEnter: (e) => {
						e.currentTarget.style.background = MAROON;
						e.currentTarget.style.color = "#fff";
						e.currentTarget.style.borderColor = MAROON;
					},
					onMouseLeave: (e) => {
						e.currentTarget.style.background = "#fff";
						e.currentTarget.style.color = "rgba(74,9,24,0.4)";
						e.currentTarget.style.borderColor = "rgba(74,9,24,0.11)";
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 13 })
				}, i))
			})]
		})]
	})] });
}
function GallerySection({ rows, onDelete, onAdd, onEdit, onView }) {
	const PALETTE = [
		`linear-gradient(135deg, rgba(74,9,24,0.14) 0%, rgba(199,154,43,0.1) 100%)`,
		`linear-gradient(135deg, rgba(30,64,175,0.12) 0%, rgba(124,58,237,0.08) 100%)`,
		`linear-gradient(135deg, rgba(22,101,52,0.12) 0%, rgba(199,154,43,0.08) 100%)`
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			alignItems: "flex-start",
			justifyContent: "space-between",
			marginBottom: "1.4rem",
			flexWrap: "wrap",
			gap: 12
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "center",
				gap: 10,
				marginBottom: 5
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
				width: 3,
				height: 24,
				borderRadius: 2,
				background: `linear-gradient(${MAROON}, ${GOLD})`,
				flexShrink: 0
			} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				style: {
					fontFamily: "'Playfair Display', serif",
					fontSize: "1.35rem",
					fontWeight: 800,
					color: MAROON,
					margin: 0
				},
				children: "Gallery"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			style: {
				fontSize: "0.76rem",
				color: "rgba(74,9,24,0.4)",
				marginLeft: 13
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: {
						fontWeight: 700,
						color: MAROON
					},
					children: rows.length
				}),
				" album",
				rows.length !== 1 ? "s" : ""
			]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
			whileHover: {
				y: -2,
				boxShadow: "0 10px 28px rgba(74,9,24,0.36)"
			},
			whileTap: { scale: .97 },
			onClick: onAdd,
			style: {
				display: "flex",
				alignItems: "center",
				gap: 7,
				padding: "9px 18px",
				borderRadius: 11,
				border: "none",
				background: `linear-gradient(135deg, ${MAROON} 0%, #7C1A32 100%)`,
				color: "#fff",
				fontSize: "0.8rem",
				fontWeight: 600,
				cursor: "pointer",
				fontFamily: "Inter, sans-serif",
				boxShadow: "0 4px 16px rgba(74,9,24,0.3)"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPlus, { size: 14 }), " New Album"]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			display: "grid",
			gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
			gap: "1.1rem"
		},
		children: rows.map((album, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				scale: .95,
				y: 8
			},
			animate: {
				opacity: 1,
				scale: 1,
				y: 0
			},
			transition: { delay: i * .07 },
			whileHover: {
				y: -5,
				boxShadow: "0 16px 48px rgba(74,9,24,0.16)"
			},
			style: {
				background: "#fff",
				borderRadius: 18,
				overflow: "hidden",
				border: "1px solid rgba(74,9,24,0.07)",
				boxShadow: "0 3px 16px rgba(74,9,24,0.07)",
				transition: "box-shadow 0.22s, transform 0.22s"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					height: 158,
					background: PALETTE[i % PALETTE.length],
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					position: "relative",
					overflow: "hidden"
				},
				children: [
					album.imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: resolveUploadUrl(album.imageUrl),
						alt: album.title,
						style: {
							position: "absolute",
							inset: 0,
							width: "100%",
							height: "100%",
							objectFit: "cover"
						}
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: 8,
							opacity: .5
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiImage, {
							size: 36,
							color: MAROON
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								fontSize: "0.68rem",
								color: MAROON,
								fontWeight: 600
							},
							children: "No cover image"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
						position: "absolute",
						inset: 0,
						background: "linear-gradient(to top, rgba(42,5,16,0.55) 0%, transparent 55%)"
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							position: "absolute",
							top: 10,
							right: 10
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							style: {
								background: "rgba(0,0,0,0.45)",
								backdropFilter: "blur(8px)",
								color: "#fff",
								fontSize: "0.61rem",
								fontWeight: 700,
								padding: "3px 10px",
								borderRadius: 100,
								border: "1px solid rgba(255,255,255,0.15)"
							},
							children: [album.photos, " photos"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							position: "absolute",
							bottom: 10,
							left: 10
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								background: `linear-gradient(135deg, ${GOLD} 0%, #9A7520 100%)`,
								color: "#fff",
								fontSize: "0.6rem",
								fontWeight: 700,
								padding: "3px 11px",
								borderRadius: 100,
								boxShadow: `0 2px 8px rgba(199,154,43,0.4)`
							},
							children: album.category
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: { padding: "1rem 1.1rem" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontSize: "0.87rem",
							fontWeight: 700,
							color: MAROON,
							marginBottom: 4,
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap"
						},
						children: album.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							fontSize: "0.7rem",
							color: "rgba(74,9,24,0.38)",
							display: "flex",
							alignItems: "center",
							gap: 5,
							marginBottom: "0.95rem",
							fontWeight: 500
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCalendar, { size: 10 }),
							" ",
							album.date
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: 7
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => onView(album),
								style: {
									flex: 1,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									gap: 5,
									padding: "7px 0",
									borderRadius: 9,
									border: "1px solid rgba(74,9,24,0.12)",
									background: "rgba(74,9,24,0.02)",
									color: "rgba(74,9,24,0.52)",
									fontSize: "0.75rem",
									cursor: "pointer",
									fontFamily: "Inter, sans-serif",
									fontWeight: 600,
									transition: "all 0.15s"
								},
								onMouseEnter: (e) => {
									e.currentTarget.style.background = MAROON;
									e.currentTarget.style.color = "#fff";
									e.currentTarget.style.borderColor = MAROON;
								},
								onMouseLeave: (e) => {
									e.currentTarget.style.background = "rgba(74,9,24,0.02)";
									e.currentTarget.style.color = "rgba(74,9,24,0.52)";
									e.currentTarget.style.borderColor = "rgba(74,9,24,0.12)";
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEye, { size: 12 }), " View"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => onEdit(album),
								style: {
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									width: 35,
									borderRadius: 9,
									border: `1px solid ${GOLD}40`,
									background: `${GOLD}0e`,
									color: GOLD,
									cursor: "pointer",
									transition: "all 0.15s"
								},
								onMouseEnter: (e) => {
									e.currentTarget.style.background = GOLD;
									e.currentTarget.style.color = "#fff";
								},
								onMouseLeave: (e) => {
									e.currentTarget.style.background = `${GOLD}0e`;
									e.currentTarget.style.color = GOLD;
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEdit2, { size: 12 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => onDelete(album.id),
								style: {
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									width: 35,
									borderRadius: 9,
									border: "1px solid rgba(220,38,38,0.2)",
									background: "rgba(220,38,38,0.05)",
									color: "#DC2626",
									cursor: "pointer",
									transition: "all 0.15s"
								},
								onMouseEnter: (e) => {
									e.currentTarget.style.background = "#DC2626";
									e.currentTarget.style.color = "#fff";
								},
								onMouseLeave: (e) => {
									e.currentTarget.style.background = "rgba(220,38,38,0.05)";
									e.currentTarget.style.color = "#DC2626";
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, { size: 12 })
							})
						]
					})
				]
			})]
		}, album.id))
	})] });
}
var ALBUM_CATEGORIES = [
	"Events",
	"Infrastructure",
	"Community",
	"Planning",
	"Environment",
	"Other"
];
var NEWS_CATEGORIES = [
	"Announcement",
	"Event",
	"Press Release",
	"Development",
	"Infrastructure",
	"Planning",
	"Community",
	"Environment"
];
var NEWS_STATUSES = ["Published", "Draft"];
function NewsFormModal({ onClose, onSave, initialData = null }) {
	const isEdit = initialData !== null;
	const [title, setTitle] = (0, import_react.useState)(initialData?.title ?? "");
	const [titleSi, setTitleSi] = (0, import_react.useState)(initialData?.titleSi ?? "");
	const [titleTa, setTitleTa] = (0, import_react.useState)(initialData?.titleTa ?? "");
	const [category, setCategory] = (0, import_react.useState)(initialData?.category ?? "Announcement");
	const [status, setStatus] = (0, import_react.useState)(initialData?.status ?? "Published");
	const [excerpt, setExcerpt] = (0, import_react.useState)(initialData?.excerpt ?? "");
	const [imageUrl, setImageUrl] = (0, import_react.useState)(initialData?.imageUrl ?? "");
	const [featured, setFeatured] = (0, import_react.useState)(initialData?.featured ?? false);
	const [langExpanded, setLangExpanded] = (0, import_react.useState)(!!(initialData?.titleSi || initialData?.titleTa));
	const [error, setError] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [dragOver, setDragOver] = (0, import_react.useState)(false);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const fileRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const h = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", h);
		return () => window.removeEventListener("keydown", h);
	}, [onClose]);
	const readFile = async (file) => {
		if (!file || !file.type.startsWith("image/")) return;
		setUploading(true);
		try {
			const res = await uploadImage(file);
			setImageUrl(res.data.url);
		} catch (err) {
			toast.error(err.response?.data?.error || "Failed to upload image. Please try again.");
		} finally {
			setUploading(false);
		}
	};
	const handleFiles = (e) => {
		const file = e.target.files?.[0];
		if (file) readFile(file);
		e.target.value = "";
	};
	const handleDrop = (e) => {
		e.preventDefault();
		setDragOver(false);
		const file = Array.from(e.dataTransfer.files).find((f) => f.type.startsWith("image/"));
		if (file) readFile(file);
	};
	const handleSubmit = (0, import_react.useCallback)((e) => {
		e.preventDefault();
		if (!title.trim()) {
			setError("Title is required.");
			return;
		}
		if (uploading) {
			setError("Please wait for the image to finish uploading.");
			return;
		}
		setSaving(true);
		setTimeout(() => {
			onSave({
				title: title.trim(),
				titleSi: titleSi.trim(),
				titleTa: titleTa.trim(),
				category,
				status,
				excerpt: excerpt.trim(),
				imageUrl,
				featured
			});
		}, 280);
	}, [
		title,
		titleSi,
		titleTa,
		category,
		status,
		excerpt,
		imageUrl,
		featured,
		uploading,
		onSave
	]);
	const selectStyle = {
		width: "100%",
		padding: "9px 12px",
		border: "1.5px solid rgba(74,9,24,0.15)",
		borderRadius: 9,
		fontSize: "0.83rem",
		fontFamily: "Inter, sans-serif",
		color: MAROON,
		background: "#fff",
		outline: "none",
		cursor: "pointer",
		appearance: "none",
		boxSizing: "border-box"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		style: {
			position: "fixed",
			inset: 0,
			background: "rgba(0,0,0,0.52)",
			zIndex: 100,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			padding: "1.5rem 1rem"
		},
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .93,
				opacity: 0,
				y: 20
			},
			animate: {
				scale: 1,
				opacity: 1,
				y: 0
			},
			exit: {
				scale: .93,
				opacity: 0,
				y: 20
			},
			transition: {
				duration: .22,
				ease: [
					.16,
					1,
					.3,
					1
				]
			},
			style: {
				background: "#fff",
				borderRadius: 20,
				width: "100%",
				maxWidth: 520,
				boxShadow: "0 28px 72px rgba(0,0,0,0.24)",
				display: "flex",
				flexDirection: "column",
				maxHeight: "calc(100vh - 3rem)",
				overflow: "hidden"
			},
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					height: 3,
					flexShrink: 0,
					background: `linear-gradient(90deg, ${GOLD} 0%, #E8C55A 50%, ${GOLD} 100%)`
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						flexShrink: 0,
						padding: "1.25rem 1.5rem 1rem",
						borderBottom: "1px solid rgba(74,9,24,0.07)",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "flex-start"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						style: {
							fontFamily: "'Playfair Display', serif",
							fontSize: "1.15rem",
							fontWeight: 800,
							color: MAROON,
							marginBottom: 3
						},
						children: isEdit ? "Edit News Article" : "Add News Article"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							fontSize: "0.73rem",
							color: "rgba(74,9,24,0.42)",
							lineHeight: 1.5
						},
						children: isEdit ? "Update the article details below." : "Fill in the article details. Title is required."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						style: {
							background: "rgba(74,9,24,0.06)",
							border: "none",
							borderRadius: 8,
							width: 32,
							height: 32,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							cursor: "pointer",
							color: MAROON,
							flexShrink: 0,
							marginLeft: 12,
							transition: "background 0.15s"
						},
						onMouseEnter: (e) => e.currentTarget.style.background = "rgba(74,9,24,0.12)",
						onMouseLeave: (e) => e.currentTarget.style.background = "rgba(74,9,24,0.06)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 15 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					style: {
						flex: 1,
						overflowY: "auto",
						padding: "1.2rem 1.5rem 1.4rem"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Title",
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusInput, {
								value: title,
								onChange: setTitle,
								placeholder: "e.g. Annual Planning Review 2025 Completed"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: "0.75rem"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Category",
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: category,
									onChange: (e) => setCategory(e.target.value),
									style: selectStyle,
									children: NEWS_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: c,
										children: c
									}, c))
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Status",
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: status,
									onChange: (e) => setStatus(e.target.value),
									style: selectStyle,
									children: NEWS_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: s,
										children: s
									}, s))
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Excerpt / Summary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusTextarea, {
								value: excerpt,
								onChange: setExcerpt,
								placeholder: "Brief summary shown in article listings…",
								rows: 3
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							label: "Cover Image",
							children: [uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									borderRadius: 10,
									height: 100,
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
									gap: 7,
									background: "rgba(74,9,24,0.03)"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiRefreshCw, {
									size: 20,
									color: GOLD,
									style: { animation: "spin 0.9s linear infinite" }
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: "0.78rem",
										color: "rgba(74,9,24,0.5)",
										fontWeight: 500
									},
									children: "Uploading image…"
								})]
							}) : imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									position: "relative",
									borderRadius: 10,
									overflow: "hidden",
									height: 130
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: resolveUploadUrl(imageUrl),
										alt: "cover preview",
										style: {
											width: "100%",
											height: "100%",
											objectFit: "cover",
											display: "block"
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
										position: "absolute",
										inset: 0,
										background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)"
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											position: "absolute",
											bottom: 8,
											left: 10,
											right: 10,
											display: "flex",
											gap: 6
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => fileRef.current?.click(),
											style: {
												flex: 1,
												padding: "5px 10px",
												borderRadius: 7,
												border: "1px solid rgba(255,255,255,0.4)",
												background: "rgba(255,255,255,0.18)",
												backdropFilter: "blur(6px)",
												color: "#fff",
												fontSize: "0.72rem",
												fontWeight: 600,
												cursor: "pointer",
												fontFamily: "Inter, sans-serif",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												gap: 5
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiImage, { size: 11 }), " Change Image"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setImageUrl(""),
											style: {
												padding: "5px 10px",
												borderRadius: 7,
												border: "1px solid rgba(255,255,255,0.3)",
												background: "rgba(220,38,38,0.55)",
												backdropFilter: "blur(6px)",
												color: "#fff",
												fontSize: "0.72rem",
												fontWeight: 600,
												cursor: "pointer",
												fontFamily: "Inter, sans-serif",
												display: "flex",
												alignItems: "center",
												gap: 5
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 11 }), " Remove"]
										})]
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onDragOver: (e) => {
									e.preventDefault();
									setDragOver(true);
								},
								onDragLeave: () => setDragOver(false),
								onDrop: handleDrop,
								onClick: () => fileRef.current?.click(),
								style: {
									border: `2px dashed ${dragOver ? GOLD : "rgba(74,9,24,0.2)"}`,
									borderRadius: 10,
									height: 100,
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
									gap: 7,
									cursor: "pointer",
									background: dragOver ? "rgba(199,154,43,0.06)" : "rgba(74,9,24,0.015)",
									transition: "all 0.18s"
								},
								onMouseEnter: (e) => {
									if (!dragOver) e.currentTarget.style.background = "rgba(74,9,24,0.03)";
								},
								onMouseLeave: (e) => {
									if (!dragOver) e.currentTarget.style.background = "rgba(74,9,24,0.015)";
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiImage, {
										size: 22,
										color: dragOver ? GOLD : "rgba(74,9,24,0.28)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											fontSize: "0.78rem",
											color: "rgba(74,9,24,0.42)",
											fontWeight: 500,
											pointerEvents: "none"
										},
										children: "Click or drag & drop an image"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											fontSize: "0.67rem",
											color: "rgba(74,9,24,0.28)",
											pointerEvents: "none"
										},
										children: "JPG, PNG, WebP, GIF — converted to WebP automatically"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileRef,
								type: "file",
								accept: "image/*",
								onChange: handleFiles,
								style: { display: "none" }
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: 9,
									cursor: "pointer",
									userSelect: "none"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									onClick: () => setFeatured((v) => !v),
									style: {
										width: 18,
										height: 18,
										borderRadius: 5,
										border: `1.5px solid ${featured ? GOLD : "rgba(74,9,24,0.2)"}`,
										background: featured ? GOLD : "transparent",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										transition: "all 0.15s",
										flexShrink: 0,
										cursor: "pointer"
									},
									children: featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, {
										size: 10,
										color: "#fff"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: "0.82rem",
										color: "rgba(74,9,24,0.65)",
										fontWeight: 500
									},
									children: "Mark as featured article"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								borderRadius: 10,
								border: "1px dashed rgba(199,154,43,0.35)",
								overflow: "hidden",
								marginBottom: "0.9rem"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setLangExpanded((v) => !v),
								style: {
									width: "100%",
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									padding: "8px 12px",
									background: "rgba(199,154,43,0.05)",
									border: "none",
									cursor: "pointer",
									color: MAROON,
									fontFamily: "Inter, sans-serif"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									style: {
										fontSize: "0.72rem",
										fontWeight: 700,
										textTransform: "uppercase",
										letterSpacing: "0.08em",
										color: "rgba(74,9,24,0.55)"
									},
									children: ["Sinhala / Tamil Translation ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											color: "rgba(74,9,24,0.35)",
											fontWeight: 400
										},
										children: "(optional)"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: "0.7rem",
										color: GOLD,
										fontWeight: 600
									},
									children: langExpanded ? "▲ Hide" : "▼ Show"
								})]
							}), langExpanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: { padding: "0.9rem 1rem 0.2rem" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Title — සිංහල",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusInput, {
										value: titleSi,
										onChange: setTitleSi,
										placeholder: "සිංහල මාතෘකාව"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Title — தமிழ்",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusInput, {
										value: titleTa,
										onChange: setTitleTa,
										placeholder: "தமிழ் தலைப்பு"
									})
								})]
							})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 8,
								padding: "9px 12px",
								borderRadius: 9,
								marginBottom: "1rem",
								background: "rgba(220,38,38,0.07)",
								border: "1px solid rgba(220,38,38,0.18)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAlertCircle, {
								size: 14,
								color: "#dc2626"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: "0.78rem",
									color: "#dc2626"
								},
								children: error
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: 10,
								justifyContent: "flex-end"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: onClose,
								style: {
									padding: "9px 20px",
									borderRadius: 10,
									border: "1px solid rgba(74,9,24,0.14)",
									background: "transparent",
									color: "rgba(74,9,24,0.55)",
									fontSize: "0.83rem",
									cursor: "pointer",
									fontFamily: "Inter, sans-serif",
									fontWeight: 500,
									transition: "all 0.15s"
								},
								onMouseEnter: (e) => e.currentTarget.style.background = "rgba(74,9,24,0.04)",
								onMouseLeave: (e) => e.currentTarget.style.background = "transparent",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
								type: "submit",
								disabled: saving || uploading,
								whileHover: !saving && !uploading ? {
									y: -1,
									boxShadow: "0 6px 20px rgba(74,9,24,0.34)"
								} : {},
								whileTap: !saving && !uploading ? { scale: .97 } : {},
								style: {
									padding: "9px 22px",
									borderRadius: 10,
									border: "none",
									background: saving || uploading ? "rgba(74,9,24,0.4)" : `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`,
									color: "#fff",
									fontSize: "0.83rem",
									cursor: saving || uploading ? "default" : "pointer",
									fontFamily: "Inter, sans-serif",
									fontWeight: 600,
									display: "flex",
									alignItems: "center",
									gap: 7,
									boxShadow: "0 3px 12px rgba(74,9,24,0.28)",
									transition: "background 0.15s"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiFileText, { size: 13 }), saving ? "Saving…" : isEdit ? "Save Changes" : "Add Article"]
							})]
						})
					]
				})
			]
		})
	});
}
function ViewNewsModal({ article, onClose, onEdit }) {
	const categoryColor = {
		bg: "rgba(74,9,24,0.10)",
		text: MAROON,
		border: "rgba(74,9,24,0.22)"
	};
	const statusColors = STATUS_COLORS[article.status] ?? STATUS_COLORS.Draft;
	(0, import_react.useEffect)(() => {
		const h = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", h);
		return () => window.removeEventListener("keydown", h);
	}, [onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		style: {
			position: "fixed",
			inset: 0,
			background: "rgba(0,0,0,0.52)",
			zIndex: 100,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			padding: "1.5rem 1rem"
		},
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .93,
				opacity: 0,
				y: 20
			},
			animate: {
				scale: 1,
				opacity: 1,
				y: 0
			},
			exit: {
				scale: .93,
				opacity: 0,
				y: 20
			},
			transition: {
				duration: .22,
				ease: [
					.16,
					1,
					.3,
					1
				]
			},
			style: {
				background: "#fff",
				borderRadius: 20,
				width: "100%",
				maxWidth: 520,
				boxShadow: "0 28px 72px rgba(0,0,0,0.24)",
				display: "flex",
				flexDirection: "column",
				maxHeight: "calc(100vh - 3rem)",
				overflow: "hidden"
			},
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					height: 3,
					flexShrink: 0,
					background: `linear-gradient(90deg, ${GOLD} 0%, #E8C55A 50%, ${GOLD} 100%)`
				} }),
				article.imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						height: 160,
						overflow: "hidden",
						flexShrink: 0,
						position: "relative"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: resolveUploadUrl(article.imageUrl),
						alt: article.title,
						style: {
							width: "100%",
							height: "100%",
							objectFit: "cover"
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
						position: "absolute",
						inset: 0,
						background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)"
					} })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						flexShrink: 0,
						padding: "1.3rem 1.5rem 1.1rem",
						borderBottom: "1px solid rgba(74,9,24,0.07)"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							justifyContent: "space-between",
							alignItems: "flex-start",
							gap: 12
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { minWidth: 0 },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										alignItems: "center",
										gap: 8,
										marginBottom: 8,
										flexWrap: "wrap"
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												fontSize: "0.65rem",
												fontWeight: 700,
												padding: "3px 10px",
												borderRadius: 100,
												background: categoryColor.bg,
												color: categoryColor.text,
												border: `1px solid ${categoryColor.border}`
											},
											children: article.category
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											style: {
												display: "inline-flex",
												alignItems: "center",
												gap: 5,
												padding: "3px 9px",
												borderRadius: 100,
												background: statusColors.bg,
												color: statusColors.text,
												fontSize: "0.65rem",
												fontWeight: 600
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
												width: 5,
												height: 5,
												borderRadius: "50%",
												background: statusColors.dot
											} }), article.status]
										}),
										article.featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												fontSize: "0.6rem",
												fontWeight: 700,
												padding: "2px 7px",
												borderRadius: 100,
												background: "rgba(199,154,43,0.12)",
												color: "#92400e",
												border: "1px solid rgba(199,154,43,0.3)"
											},
											children: "FEATURED"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									style: {
										fontFamily: "'Playfair Display', serif",
										fontSize: "1.05rem",
										fontWeight: 800,
										color: MAROON,
										lineHeight: 1.3,
										margin: 0
									},
									children: article.title
								}),
								(article.titleSi || article.titleTa) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										marginTop: 6,
										display: "flex",
										flexDirection: "column",
										gap: 2
									},
									children: [article.titleSi && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										style: {
											margin: 0,
											fontSize: "0.82rem",
											color: "rgba(74,9,24,0.55)",
											fontFamily: "'Noto Sans Sinhala', sans-serif",
											lineHeight: 1.45
										},
										children: article.titleSi
									}), article.titleTa && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										style: {
											margin: 0,
											fontSize: "0.82rem",
											color: "rgba(74,9,24,0.55)",
											fontFamily: "'Noto Sans Tamil', sans-serif",
											lineHeight: 1.45
										},
										children: article.titleTa
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onClose,
							style: {
								background: "rgba(74,9,24,0.06)",
								border: "none",
								borderRadius: 8,
								width: 32,
								height: 32,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								cursor: "pointer",
								color: MAROON,
								flexShrink: 0,
								transition: "background 0.15s"
							},
							onMouseEnter: (e) => e.currentTarget.style.background = "rgba(74,9,24,0.12)",
							onMouseLeave: (e) => e.currentTarget.style.background = "rgba(74,9,24,0.06)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 15 })
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						flex: 1,
						overflowY: "auto",
						padding: "1rem 1.5rem"
					},
					children: [
						article.excerpt && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								marginBottom: "1rem",
								padding: "0.8rem 1rem",
								background: "rgba(74,9,24,0.025)",
								borderRadius: 9,
								borderLeft: `3px solid ${GOLD}`
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									margin: 0,
									fontSize: "0.83rem",
									color: "#4b5563",
									lineHeight: 1.65
								},
								children: article.excerpt
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: 10,
								alignItems: "flex-start",
								padding: "0.6rem 0",
								borderBottom: "1px solid rgba(74,9,24,0.05)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCalendar, {
								size: 14,
								style: {
									color: GOLD,
									flexShrink: 0,
									marginTop: 2
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "0.65rem",
									fontWeight: 700,
									color: "rgba(74,9,24,0.38)",
									textTransform: "uppercase",
									letterSpacing: "0.08em",
									marginBottom: 2
								},
								children: "Date Published"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "0.83rem",
									color: MAROON,
									fontWeight: 500
								},
								children: article.date
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: 10,
								alignItems: "flex-start",
								padding: "0.6rem 0",
								borderBottom: "1px solid rgba(74,9,24,0.05)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTag, {
								size: 14,
								style: {
									color: GOLD,
									flexShrink: 0,
									marginTop: 2
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "0.65rem",
									fontWeight: 700,
									color: "rgba(74,9,24,0.38)",
									textTransform: "uppercase",
									letterSpacing: "0.08em",
									marginBottom: 2
								},
								children: "Category"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "0.83rem",
									color: MAROON,
									fontWeight: 500
								},
								children: article.category
							})] })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						flexShrink: 0,
						padding: "1rem 1.5rem 1.4rem",
						display: "flex",
						gap: 10,
						justifyContent: "flex-end",
						borderTop: "1px solid rgba(74,9,24,0.06)",
						flexWrap: "wrap"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						style: {
							padding: "8px 18px",
							borderRadius: 10,
							border: "1px solid rgba(74,9,24,0.14)",
							background: "transparent",
							color: "rgba(74,9,24,0.55)",
							fontSize: "0.83rem",
							cursor: "pointer",
							fontFamily: "Inter, sans-serif",
							fontWeight: 500,
							transition: "all 0.15s"
						},
						onMouseEnter: (e) => e.currentTarget.style.background = "rgba(74,9,24,0.04)",
						onMouseLeave: (e) => e.currentTarget.style.background = "transparent",
						children: "Close"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						whileHover: {
							y: -1,
							boxShadow: "0 6px 20px rgba(74,9,24,0.3)"
						},
						whileTap: { scale: .97 },
						onClick: () => onEdit(article),
						style: {
							padding: "8px 18px",
							borderRadius: 10,
							border: "none",
							background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`,
							color: "#fff",
							fontSize: "0.83rem",
							cursor: "pointer",
							fontFamily: "Inter, sans-serif",
							fontWeight: 600,
							display: "flex",
							alignItems: "center",
							gap: 7,
							boxShadow: "0 3px 12px rgba(74,9,24,0.28)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEdit2, { size: 13 }), " Edit Article"]
					})]
				})
			]
		})
	});
}
var NOTICE_TYPES_FORM = ["Circular", "Notice"];
var NOTICE_STATUSES = [
	"Active",
	"Draft",
	"Expired"
];
function FocusInput({ value, onChange, placeholder, type: inputType = "text" }) {
	const [focused, setFocused] = (0, import_react.useState)(false);
	const inputRef = (0, import_react.useRef)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		ref: inputRef,
		type: inputType,
		value,
		onChange: (e) => onChange(e.target.value),
		placeholder,
		onFocus: () => setFocused(true),
		onBlur: () => setFocused(false),
		style: {
			width: "100%",
			padding: "9px 12px",
			border: `1.5px solid ${focused ? GOLD : "rgba(74,9,24,0.15)"}`,
			borderRadius: 9,
			fontSize: "0.83rem",
			fontFamily: "Inter, sans-serif",
			color: MAROON,
			background: "#fff",
			outline: "none",
			transition: "border-color 0.15s",
			boxSizing: "border-box"
		}
	});
}
function DateInput({ value, onChange, placeholder }) {
	const [focused, setFocused] = (0, import_react.useState)(false);
	const inputRef = (0, import_react.useRef)(null);
	const handleChange = (e) => {
		let input = e.target.value.replace(/\D/g, "");
		if (input.length > 8) input = input.slice(0, 8);
		let formatted = input;
		if (input.length >= 2) formatted = input.slice(0, 2) + "/" + input.slice(2);
		if (input.length >= 4) formatted = input.slice(0, 2) + "/" + input.slice(2, 4) + "/" + input.slice(4);
		onChange(formatted);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		ref: inputRef,
		type: "text",
		value,
		onChange: handleChange,
		placeholder,
		maxLength: "10",
		onFocus: () => setFocused(true),
		onBlur: () => setFocused(false),
		style: {
			width: "100%",
			padding: "9px 12px",
			border: `1.5px solid ${focused ? GOLD : "rgba(74,9,24,0.15)"}`,
			borderRadius: 9,
			fontSize: "0.83rem",
			fontFamily: "Inter, sans-serif",
			color: MAROON,
			background: "#fff",
			outline: "none",
			transition: "border-color 0.15s",
			boxSizing: "border-box"
		}
	});
}
function FocusTextarea({ value, onChange, placeholder, rows = 3 }) {
	const [focused, setFocused] = (0, import_react.useState)(false);
	const inputRef = (0, import_react.useRef)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		ref: inputRef,
		value,
		onChange: (e) => onChange(e.target.value),
		placeholder,
		rows,
		onFocus: () => setFocused(true),
		onBlur: () => setFocused(false),
		style: {
			width: "100%",
			padding: "9px 12px",
			border: `1.5px solid ${focused ? GOLD : "rgba(74,9,24,0.15)"}`,
			borderRadius: 9,
			fontSize: "0.83rem",
			fontFamily: "Inter, sans-serif",
			color: MAROON,
			background: "#fff",
			outline: "none",
			transition: "border-color 0.15s",
			boxSizing: "border-box",
			resize: "vertical",
			minHeight: 72,
			lineHeight: 1.55
		}
	});
}
function Field({ label, required, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: { marginBottom: "0.9rem" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			style: {
				display: "block",
				fontSize: "0.72rem",
				fontWeight: 600,
				color: "rgba(74,9,24,0.55)",
				textTransform: "uppercase",
				letterSpacing: "0.08em",
				marginBottom: 5
			},
			children: [
				label,
				" ",
				required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: { color: "#dc2626" },
					children: "*"
				})
			]
		}), children]
	});
}
function NoticeFormModal({ onClose, onSave, initialData = null }) {
	const isEdit = initialData !== null;
	const [title, setTitle] = (0, import_react.useState)(initialData?.title ?? "");
	const [titleSi, setTitleSi] = (0, import_react.useState)(initialData?.titleSi ?? "");
	const [titleTa, setTitleTa] = (0, import_react.useState)(initialData?.titleTa ?? "");
	const [type, setType] = (0, import_react.useState)(initialData?.type ?? initialData?.category ?? "Circular");
	const [ref, setRef] = (0, import_react.useState)(initialData?.ref ?? "");
	const [deadline, setDeadline] = (0, import_react.useState)(initialData?.deadline ?? "");
	const [status, setStatus] = (0, import_react.useState)(initialData?.status ?? "Active");
	const [description, setDescription] = (0, import_react.useState)(initialData?.description ?? "");
	const [descriptionSi, setDescriptionSi] = (0, import_react.useState)(initialData?.descriptionSi ?? "");
	const [descriptionTa, setDescriptionTa] = (0, import_react.useState)(initialData?.descriptionTa ?? "");
	const [attachment, setAttachment] = (0, import_react.useState)(initialData?.fileUrl ? {
		name: initialData.fileName ?? "Attached file",
		url: initialData.fileUrl,
		type: initialData.fileMimeType ?? ""
	} : null);
	const [langExpanded, setLangExpanded] = (0, import_react.useState)(!!(initialData?.titleSi || initialData?.titleTa || initialData?.descriptionSi || initialData?.descriptionTa));
	const [downloadAccess, setDownloadAccess] = (0, import_react.useState)(initialData?.downloadAccess ?? "Everyone");
	const [error, setError] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const handleSubmit = (0, import_react.useCallback)((e) => {
		e.preventDefault();
		console.debug("[CMS] NoticeFormModal submit", {
			title,
			deadline,
			attachment
		});
		if (!title.trim()) {
			setError("Title is required.");
			return;
		}
		if (deadline) {
			const parts = deadline.split("/");
			const [mm, dd, yyyy] = parts.map(Number);
			const d = new Date(yyyy, mm - 1, dd);
			if (parts.length !== 3 || deadline.length !== 10 || isNaN(d) || d.getFullYear() !== yyyy || d.getMonth() !== mm - 1 || d.getDate() !== dd) {
				setError("Closing date is not a valid date (mm/dd/yyyy).");
				return;
			}
		}
		setSaving(true);
		setTimeout(() => {
			onSave({
				title: title.trim(),
				titleSi: titleSi.trim(),
				titleTa: titleTa.trim(),
				type,
				ref: ref.trim(),
				deadline,
				status,
				description: description.trim(),
				descriptionSi: descriptionSi.trim(),
				descriptionTa: descriptionTa.trim(),
				fileName: attachment?.name ?? initialData?.fileName ?? "",
				fileUrl: attachment?.url ?? initialData?.fileUrl ?? "",
				fileMimeType: attachment?.type ?? initialData?.fileMimeType ?? "",
				downloadAccess: attachment ? downloadAccess : "Everyone"
			});
		}, 280);
	}, [
		title,
		titleSi,
		titleTa,
		type,
		ref,
		deadline,
		status,
		description,
		descriptionSi,
		descriptionTa,
		attachment,
		initialData,
		onSave,
		downloadAccess
	]);
	const selectStyle = {
		width: "100%",
		padding: "9px 12px",
		border: "1.5px solid rgba(74,9,24,0.15)",
		borderRadius: 9,
		fontSize: "0.83rem",
		fontFamily: "Inter, sans-serif",
		color: MAROON,
		background: "#fff",
		outline: "none",
		cursor: "pointer",
		appearance: "none",
		boxSizing: "border-box"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		style: {
			position: "fixed",
			inset: 0,
			background: "rgba(0,0,0,0.52)",
			zIndex: 100,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			padding: "1.5rem 1rem"
		},
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .93,
				opacity: 0,
				y: 20
			},
			animate: {
				scale: 1,
				opacity: 1,
				y: 0
			},
			exit: {
				scale: .93,
				opacity: 0,
				y: 20
			},
			transition: {
				duration: .22,
				ease: [
					.16,
					1,
					.3,
					1
				]
			},
			style: {
				background: "#fff",
				borderRadius: 20,
				width: "100%",
				maxWidth: 520,
				boxShadow: "0 28px 72px rgba(0,0,0,0.24)",
				display: "flex",
				flexDirection: "column",
				maxHeight: "calc(100vh - 3rem)",
				overflow: "hidden"
			},
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					height: 3,
					flexShrink: 0,
					background: `linear-gradient(90deg, ${GOLD} 0%, #E8C55A 50%, ${GOLD} 100%)`
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						flexShrink: 0,
						padding: "1.25rem 1.5rem 1rem",
						borderBottom: "1px solid rgba(74,9,24,0.07)",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "flex-start"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						style: {
							fontFamily: "'Playfair Display', serif",
							fontSize: "1.15rem",
							fontWeight: 800,
							color: MAROON,
							marginBottom: 3
						},
						children: isEdit ? "Edit Notice" : "Add Notice"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							fontSize: "0.73rem",
							color: "rgba(74,9,24,0.42)",
							lineHeight: 1.5
						},
						children: isEdit ? "Update the notice details below." : "Fill in the notice details. Title is required."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						style: {
							background: "rgba(74,9,24,0.06)",
							border: "none",
							borderRadius: 8,
							width: 32,
							height: 32,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							cursor: "pointer",
							color: MAROON,
							flexShrink: 0,
							marginLeft: 12,
							transition: "background 0.15s"
						},
						onMouseEnter: (e) => e.currentTarget.style.background = "rgba(74,9,24,0.12)",
						onMouseLeave: (e) => e.currentTarget.style.background = "rgba(74,9,24,0.06)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 15 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					style: {
						flex: 1,
						overflowY: "auto",
						padding: "1.2rem 1.5rem 1.4rem"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Title",
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusInput, {
								value: title,
								onChange: setTitle,
								placeholder: "e.g. Annual Performance Appraisal Guidelines"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: "0.75rem"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Type",
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: type,
									onChange: (e) => setType(e.target.value),
									style: selectStyle,
									children: NOTICE_TYPES_FORM.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: t,
										children: t
									}, t))
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Status",
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: status,
									onChange: (e) => setStatus(e.target.value),
									style: selectStyle,
									children: NOTICE_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: s,
										children: s
									}, s))
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Reference Number",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusInput, {
								value: ref,
								onChange: setRef,
								placeholder: "e.g. SPPS/CIR/2026/014"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Closing / Deadline Date",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateInput, {
								value: deadline,
								onChange: setDeadline,
								placeholder: "mm/dd/yyyy"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							label: "Attachment (Drive link)",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "grid",
									gridTemplateColumns: "1fr",
									gap: 8
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: attachment?.url ?? "",
									onChange: (e) => setAttachment((prev) => prev ? {
										...prev,
										url: e.target.value
									} : {
										name: "",
										url: e.target.value,
										type: ""
									}),
									placeholder: "Paste a public Drive/Dropbox/OneDrive link here",
									style: {
										width: "100%",
										padding: "9px 12px",
										border: "1.5px solid rgba(74,9,24,0.15)",
										borderRadius: 9,
										fontSize: "0.83rem",
										color: MAROON,
										background: "#fff"
									}
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: attachment?.name ?? "",
									onChange: (e) => setAttachment((prev) => prev ? {
										...prev,
										name: e.target.value
									} : {
										name: e.target.value,
										url: "",
										type: ""
									}),
									placeholder: "Display name (optional)",
									style: {
										width: "100%",
										padding: "9px 12px",
										border: "1.5px solid rgba(74,9,24,0.12)",
										borderRadius: 9,
										fontSize: "0.83rem",
										color: MAROON,
										background: "#fff"
									}
								})]
							}), attachment?.url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									marginTop: 6,
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									gap: 12
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: "0.72rem",
										color: "rgba(74,9,24,0.48)"
									},
									children: "Link will be used as the attachment URL on the public portal."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
									whileHover: {
										y: -1,
										boxShadow: "0 4px 12px rgba(199,154,43,0.2)"
									},
									whileTap: { scale: .97 },
									onClick: () => window.open(attachment.url, "_blank", "noopener,noreferrer"),
									style: {
										padding: "6px 14px",
										borderRadius: 7,
										border: "1px solid rgba(199,154,43,0.3)",
										background: "rgba(199,154,43,0.12)",
										color: MAROON,
										fontSize: "0.72rem",
										cursor: "pointer",
										fontFamily: "Inter, sans-serif",
										fontWeight: 600,
										display: "flex",
										alignItems: "center",
										gap: 5,
										flexShrink: 0,
										whiteSpace: "nowrap"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiDownload, { size: 12 }), " Open Link"]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							label: "Download Access",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: downloadAccess,
								onChange: (e) => setDownloadAccess(e.target.value),
								style: selectStyle,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Everyone",
										children: "Everyone can download"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "RegisteredOnly",
										children: "Registered users only"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "AdminOnly",
										children: "Admin only"
									})
								]
							}), attachment && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									marginTop: 6,
									fontSize: "0.72rem",
									color: "rgba(74,9,24,0.48)"
								},
								children: ["Only applies when a file is attached. Download will be available to: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: downloadAccess === "Everyone" ? "All visitors" : downloadAccess === "RegisteredOnly" ? "Registered users" : "Administrators only" })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Description",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusTextarea, {
								value: description,
								onChange: setDescription,
								placeholder: "Optional — brief description of this notice…"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								borderRadius: 10,
								border: "1px dashed rgba(199,154,43,0.35)",
								overflow: "hidden",
								marginBottom: "0.9rem"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setLangExpanded((v) => !v),
								style: {
									width: "100%",
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									padding: "8px 12px",
									background: "rgba(199,154,43,0.05)",
									border: "none",
									cursor: "pointer",
									color: MAROON,
									fontFamily: "Inter, sans-serif"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									style: {
										fontSize: "0.72rem",
										fontWeight: 700,
										textTransform: "uppercase",
										letterSpacing: "0.08em",
										color: "rgba(74,9,24,0.55)"
									},
									children: ["Sinhala / Tamil Translation ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											color: "rgba(74,9,24,0.35)",
											fontWeight: 400
										},
										children: "(optional)"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: "0.7rem",
										color: GOLD,
										fontWeight: 600
									},
									children: langExpanded ? "▲ Hide" : "▼ Show"
								})]
							}), langExpanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: { padding: "0.9rem 1rem 0.2rem" },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Title — සිංහල",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusInput, {
											value: titleSi,
											onChange: setTitleSi,
											placeholder: "සිංහල මාතෘකාව"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Description — සිංහල",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusTextarea, {
											value: descriptionSi,
											onChange: setDescriptionSi,
											placeholder: "සිංහල විස්තරය (අවශ්‍ය නොවේ)…",
											rows: 2
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Title — தமிழ்",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusInput, {
											value: titleTa,
											onChange: setTitleTa,
											placeholder: "தமிழ் தலைப்பு"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Description — தமிழ்",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusTextarea, {
											value: descriptionTa,
											onChange: setDescriptionTa,
											placeholder: "தமிழ் விவரம் (தேவையில்லை)…",
											rows: 2
										})
									})
								]
							})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 8,
								padding: "9px 12px",
								borderRadius: 9,
								marginBottom: "1rem",
								background: "rgba(220,38,38,0.07)",
								border: "1px solid rgba(220,38,38,0.18)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAlertCircle, {
								size: 14,
								color: "#dc2626"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: "0.78rem",
									color: "#dc2626"
								},
								children: error
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: 10,
								justifyContent: "flex-end"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: onClose,
								style: {
									padding: "9px 20px",
									borderRadius: 10,
									border: "1px solid rgba(74,9,24,0.14)",
									background: "transparent",
									color: "rgba(74,9,24,0.55)",
									fontSize: "0.83rem",
									cursor: "pointer",
									fontFamily: "Inter, sans-serif",
									fontWeight: 500,
									transition: "all 0.15s"
								},
								onMouseEnter: (e) => e.currentTarget.style.background = "rgba(74,9,24,0.04)",
								onMouseLeave: (e) => e.currentTarget.style.background = "transparent",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
								type: "submit",
								disabled: saving,
								whileHover: !saving ? {
									y: -1,
									boxShadow: "0 6px 20px rgba(74,9,24,0.34)"
								} : {},
								whileTap: !saving ? { scale: .97 } : {},
								style: {
									padding: "9px 22px",
									borderRadius: 10,
									border: "none",
									background: saving ? "rgba(74,9,24,0.4)" : `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`,
									color: "#fff",
									fontSize: "0.83rem",
									cursor: saving ? "default" : "pointer",
									fontFamily: "Inter, sans-serif",
									fontWeight: 600,
									display: "flex",
									alignItems: "center",
									gap: 7,
									boxShadow: "0 3px 12px rgba(74,9,24,0.28)",
									transition: "background 0.15s"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiBell, { size: 13 }), saving ? "Saving…" : isEdit ? "Save Changes" : "Add Notice"]
							})]
						})
					]
				})
			]
		})
	});
}
function ViewNoticeModal({ notice, onClose, onEdit }) {
	const typeColors = {
		Circular: {
			bg: "rgba(74,9,24,0.10)",
			text: MAROON,
			border: "rgba(74,9,24,0.22)"
		},
		Notice: {
			bg: "rgba(154,117,32,0.10)",
			text: "#9A7520",
			border: "rgba(154,117,32,0.30)"
		}
	};
	const colors = typeColors[notice.type || notice.category] ?? typeColors.Notice;
	const statusColors = STATUS_COLORS[notice.status] ?? STATUS_COLORS.Draft;
	(0, import_react.useEffect)(() => {
		const h = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", h);
		return () => window.removeEventListener("keydown", h);
	}, [onClose]);
	const Row = ({ icon: Icon, label, value }) => value ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			gap: 10,
			alignItems: "flex-start",
			padding: "0.6rem 0",
			borderBottom: "1px solid rgba(74,9,24,0.05)"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			size: 14,
			style: {
				color: GOLD,
				flexShrink: 0,
				marginTop: 2
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				fontSize: "0.65rem",
				fontWeight: 700,
				color: "rgba(74,9,24,0.38)",
				textTransform: "uppercase",
				letterSpacing: "0.08em",
				marginBottom: 2
			},
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				fontSize: "0.83rem",
				color: MAROON,
				fontWeight: 500
			},
			children: value
		})] })]
	}) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		style: {
			position: "fixed",
			inset: 0,
			background: "rgba(0,0,0,0.52)",
			zIndex: 100,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			padding: "1.5rem 1rem"
		},
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .93,
				opacity: 0,
				y: 20
			},
			animate: {
				scale: 1,
				opacity: 1,
				y: 0
			},
			exit: {
				scale: .93,
				opacity: 0,
				y: 20
			},
			transition: {
				duration: .22,
				ease: [
					.16,
					1,
					.3,
					1
				]
			},
			style: {
				background: "#fff",
				borderRadius: 20,
				width: "100%",
				maxWidth: 500,
				boxShadow: "0 28px 72px rgba(0,0,0,0.24)",
				display: "flex",
				flexDirection: "column",
				maxHeight: "calc(100vh - 3rem)",
				overflow: "hidden"
			},
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					height: 3,
					flexShrink: 0,
					background: `linear-gradient(90deg, ${GOLD} 0%, #E8C55A 50%, ${GOLD} 100%)`
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						flexShrink: 0,
						padding: "1.3rem 1.5rem 1.1rem",
						borderBottom: "1px solid rgba(74,9,24,0.07)"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							justifyContent: "space-between",
							alignItems: "flex-start",
							gap: 12
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { minWidth: 0 },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										alignItems: "center",
										gap: 8,
										marginBottom: 8,
										flexWrap: "wrap"
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												fontSize: "0.65rem",
												fontWeight: 700,
												padding: "3px 10px",
												borderRadius: 100,
												background: colors.bg,
												color: colors.text,
												border: `1px solid ${colors.border}`
											},
											children: notice.type || notice.category
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											style: {
												display: "inline-flex",
												alignItems: "center",
												gap: 5,
												padding: "3px 9px",
												borderRadius: 100,
												background: statusColors.bg,
												color: statusColors.text,
												fontSize: "0.65rem",
												fontWeight: 600
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
												width: 5,
												height: 5,
												borderRadius: "50%",
												background: statusColors.dot
											} }), notice.status]
										}),
										notice.isNew && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												fontSize: "0.6rem",
												fontWeight: 700,
												padding: "2px 7px",
												borderRadius: 100,
												background: "rgba(22,101,52,0.1)",
												color: "#166534",
												border: "1px solid rgba(22,101,52,0.2)"
											},
											children: "NEW"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									style: {
										fontFamily: "'Playfair Display', serif",
										fontSize: "1.05rem",
										fontWeight: 800,
										color: MAROON,
										lineHeight: 1.3,
										margin: 0
									},
									children: notice.title
								}),
								(notice.titleSi || notice.titleTa) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										marginTop: 6,
										display: "flex",
										flexDirection: "column",
										gap: 2
									},
									children: [notice.titleSi && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										style: {
											margin: 0,
											fontSize: "0.82rem",
											color: "rgba(74,9,24,0.55)",
											fontFamily: "'Noto Sans Sinhala', sans-serif",
											lineHeight: 1.45
										},
										children: notice.titleSi
									}), notice.titleTa && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										style: {
											margin: 0,
											fontSize: "0.82rem",
											color: "rgba(74,9,24,0.55)",
											fontFamily: "'Noto Sans Tamil', sans-serif",
											lineHeight: 1.45
										},
										children: notice.titleTa
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onClose,
							style: {
								background: "rgba(74,9,24,0.06)",
								border: "none",
								borderRadius: 8,
								width: 32,
								height: 32,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								cursor: "pointer",
								color: MAROON,
								flexShrink: 0,
								transition: "background 0.15s"
							},
							onMouseEnter: (e) => e.currentTarget.style.background = "rgba(74,9,24,0.12)",
							onMouseLeave: (e) => e.currentTarget.style.background = "rgba(74,9,24,0.06)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 15 })
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						flex: 1,
						overflowY: "auto",
						padding: "1rem 1.5rem"
					},
					children: [
						(notice.description || notice.descriptionSi || notice.descriptionTa) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								marginBottom: "1rem",
								padding: "0.8rem 1rem",
								background: "rgba(74,9,24,0.025)",
								borderRadius: 9,
								borderLeft: `3px solid ${GOLD}`,
								display: "flex",
								flexDirection: "column",
								gap: 6
							},
							children: [
								notice.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									style: {
										margin: 0,
										fontSize: "0.83rem",
										color: "#4b5563",
										lineHeight: 1.65
									},
									children: notice.description
								}),
								notice.descriptionSi && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									style: {
										margin: 0,
										fontSize: "0.81rem",
										color: "rgba(74,9,24,0.55)",
										lineHeight: 1.6,
										fontFamily: "'Noto Sans Sinhala', sans-serif"
									},
									children: notice.descriptionSi
								}),
								notice.descriptionTa && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									style: {
										margin: 0,
										fontSize: "0.81rem",
										color: "rgba(74,9,24,0.55)",
										lineHeight: 1.6,
										fontFamily: "'Noto Sans Tamil', sans-serif"
									},
									children: notice.descriptionTa
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							icon: FiFileText,
							label: "Reference Number",
							value: notice.ref
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							icon: FiCalendar,
							label: "Date Issued",
							value: notice.date
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							icon: FiClock,
							label: "Closing Date",
							value: notice.deadline
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							icon: FiDownload,
							label: "Attachment",
							value: notice.fileName || null
						}),
						notice.fileUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							icon: FiLock,
							label: "Download Access",
							value: notice.downloadAccess === "Everyone" ? "All visitors" : notice.downloadAccess === "RegisteredOnly" ? "Registered users only" : "Administrators only"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						flexShrink: 0,
						padding: "1rem 1.5rem 1.4rem",
						display: "flex",
						gap: 10,
						justifyContent: "flex-end",
						borderTop: "1px solid rgba(74,9,24,0.06)",
						flexWrap: "wrap"
					},
					children: [
						notice.fileUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
							whileHover: {
								y: -1,
								boxShadow: "0 6px 20px rgba(74,9,24,0.18)"
							},
							whileTap: { scale: .97 },
							onClick: () => window.open(notice.fileUrl, "_blank", "noopener,noreferrer"),
							style: {
								padding: "8px 18px",
								borderRadius: 10,
								border: "1px solid rgba(199,154,43,0.22)",
								background: "rgba(199,154,43,0.08)",
								color: MAROON,
								fontSize: "0.83rem",
								cursor: "pointer",
								fontFamily: "Inter, sans-serif",
								fontWeight: 600,
								display: "flex",
								alignItems: "center",
								gap: 7
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiDownload, { size: 13 }), " Open Attachment Link"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onClose,
							style: {
								padding: "8px 18px",
								borderRadius: 10,
								border: "1px solid rgba(74,9,24,0.14)",
								background: "transparent",
								color: "rgba(74,9,24,0.55)",
								fontSize: "0.83rem",
								cursor: "pointer",
								fontFamily: "Inter, sans-serif",
								fontWeight: 500,
								transition: "all 0.15s"
							},
							onMouseEnter: (e) => e.currentTarget.style.background = "rgba(74,9,24,0.04)",
							onMouseLeave: (e) => e.currentTarget.style.background = "transparent",
							children: "Close"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
							whileHover: {
								y: -1,
								boxShadow: "0 6px 20px rgba(74,9,24,0.3)"
							},
							whileTap: { scale: .97 },
							onClick: () => onEdit(notice),
							style: {
								padding: "8px 18px",
								borderRadius: 10,
								border: "none",
								background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`,
								color: "#fff",
								fontSize: "0.83rem",
								cursor: "pointer",
								fontFamily: "Inter, sans-serif",
								fontWeight: 600,
								display: "flex",
								alignItems: "center",
								gap: 7,
								boxShadow: "0 3px 12px rgba(74,9,24,0.28)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEdit2, { size: 13 }), " Edit Notice"]
						})
					]
				})
			]
		})
	});
}
function ViewAlbumModal({ album, onClose, onEdit }) {
	const images = album.images?.length ? album.images : album.imageUrl ? [album.imageUrl] : [];
	const [lightIdx, setLightIdx] = (0, import_react.useState)(null);
	const openLight = (i) => setLightIdx(i);
	const closeLight = () => setLightIdx(null);
	const prevImg = (0, import_react.useCallback)(() => setLightIdx((i) => (i - 1 + images.length) % images.length), [images.length]);
	const nextImg = (0, import_react.useCallback)(() => setLightIdx((i) => (i + 1) % images.length), [images.length]);
	(0, import_react.useEffect)(() => {
		const h = (e) => {
			if (e.key === "Escape") lightIdx !== null ? closeLight() : onClose();
			if (e.key === "ArrowLeft") prevImg();
			if (e.key === "ArrowRight") nextImg();
		};
		window.addEventListener("keydown", h);
		return () => window.removeEventListener("keydown", h);
	}, [
		lightIdx,
		prevImg,
		nextImg,
		onClose
	]);
	const hasImages = images.length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		style: {
			position: "fixed",
			inset: 0,
			background: "rgba(0,0,0,0.58)",
			zIndex: 100,
			display: "flex",
			alignItems: "flex-start",
			justifyContent: "center",
			padding: "1.5rem 1rem",
			overflowY: "auto"
		},
		onClick: onClose,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .94,
				opacity: 0,
				y: 22
			},
			animate: {
				scale: 1,
				opacity: 1,
				y: 0
			},
			exit: {
				scale: .94,
				opacity: 0,
				y: 22
			},
			transition: {
				duration: .24,
				ease: [
					.16,
					1,
					.3,
					1
				]
			},
			style: {
				background: "#fff",
				borderRadius: 20,
				width: "100%",
				maxWidth: 680,
				boxShadow: "0 32px 80px rgba(0,0,0,0.28)",
				overflow: "hidden"
			},
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					height: 3,
					background: `linear-gradient(90deg, ${GOLD} 0%, #E8C55A 50%, ${GOLD} 100%)`
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						height: 200,
						position: "relative",
						overflow: "hidden",
						background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`,
						display: "flex",
						alignItems: "flex-end"
					},
					children: [
						hasImages && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: resolveUploadUrl(images[0]),
							alt: album.title,
							style: {
								position: "absolute",
								inset: 0,
								width: "100%",
								height: "100%",
								objectFit: "cover",
								opacity: .55
							}
						}),
						!hasImages && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								position: "absolute",
								inset: 0,
								display: "flex",
								alignItems: "center",
								justifyContent: "center"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiImage, {
								size: 56,
								color: "rgba(255,255,255,0.15)"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
							position: "absolute",
							inset: 0,
							background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 60%)"
						} }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								position: "relative",
								padding: "1.1rem 1.4rem",
								width: "100%",
								zIndex: 1
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "flex-end",
									justifyContent: "space-between",
									gap: 12
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: { minWidth: 0 },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												display: "inline-block",
												background: GOLD,
												color: "#fff",
												fontSize: "0.6rem",
												fontWeight: 700,
												padding: "2px 9px",
												borderRadius: 100,
												marginBottom: 6,
												letterSpacing: "0.06em"
											},
											children: album.category
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											style: {
												fontFamily: "'Playfair Display', serif",
												fontSize: "1.25rem",
												fontWeight: 800,
												color: "#fff",
												margin: 0,
												lineHeight: 1.25,
												overflow: "hidden",
												textOverflow: "ellipsis",
												whiteSpace: "nowrap"
											},
											children: album.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: {
												display: "flex",
												gap: 14,
												marginTop: 5,
												color: "rgba(255,255,255,0.62)",
												fontSize: "0.72rem"
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												style: {
													display: "flex",
													alignItems: "center",
													gap: 4
												},
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCalendar, { size: 11 }),
													" ",
													album.date
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												style: {
													display: "flex",
													alignItems: "center",
													gap: 4
												},
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiImage, { size: 11 }),
													" ",
													images.length,
													" photo",
													images.length !== 1 ? "s" : ""
												]
											})]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										display: "flex",
										gap: 7,
										flexShrink: 0
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
										whileHover: { scale: 1.06 },
										whileTap: { scale: .95 },
										onClick: () => onEdit(album),
										style: {
											display: "flex",
											alignItems: "center",
											gap: 6,
											padding: "7px 14px",
											borderRadius: 9,
											border: "none",
											background: GOLD,
											color: "#fff",
											fontSize: "0.75rem",
											fontWeight: 600,
											cursor: "pointer",
											fontFamily: "Inter, sans-serif"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEdit2, { size: 12 }), " Edit"]
									})
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onClose,
							style: {
								position: "absolute",
								top: 12,
								right: 12,
								zIndex: 2,
								width: 32,
								height: 32,
								borderRadius: "50%",
								background: "rgba(0,0,0,0.45)",
								border: "none",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								cursor: "pointer",
								color: "#fff",
								transition: "background 0.15s"
							},
							onMouseEnter: (e) => e.currentTarget.style.background = "rgba(0,0,0,0.7)",
							onMouseLeave: (e) => e.currentTarget.style.background = "rgba(0,0,0,0.45)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 15 })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: { padding: "1.25rem 1.4rem 1.5rem" },
					children: hasImages ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							fontSize: "0.65rem",
							fontWeight: 700,
							color: "rgba(74,9,24,0.38)",
							textTransform: "uppercase",
							letterSpacing: "0.12em",
							marginBottom: "0.9rem",
							display: "flex",
							alignItems: "center",
							gap: 6
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiImage, { size: 11 }), " Photos"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							display: "grid",
							gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
							gap: 10
						},
						children: images.map((src, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							whileHover: {
								scale: 1.03,
								boxShadow: "0 6px 20px rgba(0,0,0,0.18)"
							},
							onClick: () => openLight(idx),
							style: {
								position: "relative",
								aspectRatio: "1",
								borderRadius: 10,
								overflow: "hidden",
								cursor: "pointer",
								background: "rgba(74,9,24,0.05)"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: resolveUploadUrl(src),
									alt: `Photo ${idx + 1}`,
									style: {
										width: "100%",
										height: "100%",
										objectFit: "cover",
										display: "block"
									}
								}),
								idx === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										position: "absolute",
										bottom: 5,
										left: 5,
										background: GOLD,
										color: "#fff",
										fontSize: "0.52rem",
										fontWeight: 700,
										padding: "2px 6px",
										borderRadius: 4
									},
									children: "COVER"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										position: "absolute",
										inset: 0,
										background: "rgba(0,0,0,0)",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										transition: "background 0.18s"
									},
									onMouseEnter: (e) => e.currentTarget.style.background = "rgba(0,0,0,0.28)",
									onMouseLeave: (e) => e.currentTarget.style.background = "rgba(0,0,0,0)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEye, {
										size: 18,
										color: "rgba(255,255,255,0)",
										style: { transition: "color 0.18s" },
										onMouseEnter: (e) => e.currentTarget.style.color = "#fff"
									})
								})
							]
						}, idx))
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							padding: "2.5rem 1rem",
							gap: 10
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									width: 56,
									height: 56,
									borderRadius: 16,
									background: "rgba(74,9,24,0.06)",
									display: "flex",
									alignItems: "center",
									justifyContent: "center"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiImage, {
									size: 24,
									color: "rgba(74,9,24,0.28)"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									fontSize: "0.88rem",
									fontWeight: 600,
									color: "rgba(74,9,24,0.45)",
									margin: 0
								},
								children: "No photos uploaded yet"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								style: {
									fontSize: "0.75rem",
									color: "rgba(74,9,24,0.3)",
									margin: 0
								},
								children: [
									"Click ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Edit" }),
									" to add up to ",
									MAX_IMAGES,
									" photos to this album."
								]
							})
						]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: lightIdx !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			style: {
				position: "fixed",
				inset: 0,
				background: "rgba(0,0,0,0.88)",
				zIndex: 200,
				display: "flex",
				alignItems: "center",
				justifyContent: "center"
			},
			onClick: closeLight,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					scale: .9,
					opacity: 0
				},
				animate: {
					scale: 1,
					opacity: 1
				},
				exit: {
					scale: .9,
					opacity: 0
				},
				transition: {
					duration: .22,
					ease: [
						.16,
						1,
						.3,
						1
					]
				},
				style: {
					position: "relative",
					maxWidth: "88vw",
					maxHeight: "88vh"
				},
				onClick: (e) => e.stopPropagation(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "wait",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
							src: resolveUploadUrl(images[lightIdx]),
							alt: `Photo ${lightIdx + 1}`,
							initial: {
								opacity: 0,
								scale: 1.04
							},
							animate: {
								opacity: 1,
								scale: 1
							},
							exit: {
								opacity: 0,
								scale: .96
							},
							transition: { duration: .2 },
							style: {
								maxWidth: "88vw",
								maxHeight: "80vh",
								borderRadius: 12,
								display: "block",
								boxShadow: "0 24px 64px rgba(0,0,0,0.5)"
							}
						}, lightIdx)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							position: "absolute",
							bottom: -36,
							left: 0,
							right: 0,
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								color: "rgba(255,255,255,0.6)",
								fontSize: "0.78rem"
							},
							children: album.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							style: {
								color: "rgba(255,255,255,0.45)",
								fontSize: "0.75rem"
							},
							children: [
								lightIdx + 1,
								" / ",
								images.length
							]
						})]
					}),
					images.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							position: "absolute",
							bottom: -60,
							left: "50%",
							transform: "translateX(-50%)",
							display: "flex",
							gap: 6
						},
						children: images.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: (e) => {
								e.stopPropagation();
								setLightIdx(i);
							},
							style: {
								width: i === lightIdx ? 18 : 7,
								height: 7,
								borderRadius: 4,
								background: i === lightIdx ? "#fff" : "rgba(255,255,255,0.32)",
								border: "none",
								padding: 0,
								cursor: "pointer",
								transition: "all 0.2s"
							}
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: closeLight,
						style: {
							position: "fixed",
							top: 18,
							right: 18,
							width: 36,
							height: 36,
							borderRadius: "50%",
							background: "rgba(255,255,255,0.12)",
							border: "none",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							cursor: "pointer",
							color: "#fff",
							transition: "background 0.15s"
						},
						onMouseEnter: (e) => e.currentTarget.style.background = "rgba(255,255,255,0.22)",
						onMouseLeave: (e) => e.currentTarget.style.background = "rgba(255,255,255,0.12)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 16 })
					}),
					images.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: prevImg,
						style: {
							position: "fixed",
							left: 20,
							top: "50%",
							transform: "translateY(-50%)",
							width: 42,
							height: 42,
							borderRadius: "50%",
							background: "rgba(255,255,255,0.1)",
							border: "none",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							cursor: "pointer",
							color: "#fff",
							transition: "background 0.15s"
						},
						onMouseEnter: (e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)",
						onMouseLeave: (e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronLeft, { size: 22 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: nextImg,
						style: {
							position: "fixed",
							right: 20,
							top: "50%",
							transform: "translateY(-50%)",
							width: 42,
							height: 42,
							borderRadius: "50%",
							background: "rgba(255,255,255,0.1)",
							border: "none",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							cursor: "pointer",
							color: "#fff",
							transition: "background 0.15s"
						},
						onMouseEnter: (e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)",
						onMouseLeave: (e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronRight, { size: 22 })
					})] })
				]
			})
		}) })]
	});
}
var MAX_IMAGES = 10;
function albumLangFieldStyle(focused) {
	return {
		width: "100%",
		padding: "10px 12px",
		border: `1.5px solid ${focused ? GOLD : "rgba(74,9,24,0.15)"}`,
		borderRadius: 9,
		fontSize: "0.83rem",
		fontFamily: "Inter, sans-serif",
		color: MAROON,
		background: "#fff",
		outline: "none",
		transition: "border-color 0.15s",
		boxSizing: "border-box"
	};
}
function LangField({ label, langLabel, value, onChange, placeholder }) {
	const [focused, setFocused] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: { marginBottom: "0.85rem" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				marginBottom: 5
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				style: {
					fontSize: "0.72rem",
					fontWeight: 600,
					color: "rgba(74,9,24,0.58)",
					textTransform: "uppercase",
					letterSpacing: "0.08em"
				},
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				style: {
					fontSize: "0.63rem",
					padding: "2px 8px",
					borderRadius: 100,
					background: "rgba(199,154,43,0.1)",
					color: GOLD,
					fontWeight: 600
				},
				children: [langLabel, " · optional"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value,
			onChange: (e) => onChange(e.target.value),
			placeholder,
			onFocus: () => setFocused(true),
			onBlur: () => setFocused(false),
			style: albumLangFieldStyle(focused)
		})]
	});
}
function NewAlbumModal({ onClose, onSave, initialData = null }) {
	const isEdit = initialData !== null;
	const [titleEn, setTitleEn] = (0, import_react.useState)(initialData?.titleEn ?? "");
	const [titleSi, setTitleSi] = (0, import_react.useState)(initialData?.titleSi ?? "");
	const [titleTa, setTitleTa] = (0, import_react.useState)(initialData?.titleTa ?? "");
	const [category, setCategory] = (0, import_react.useState)(initialData?.category ?? "Events");
	const [images, setImages] = (0, import_react.useState)(() => {
		if (initialData?.images?.length) return initialData.images;
		if (initialData?.imageUrl) return [initialData.imageUrl];
		return [];
	});
	const [error, setError] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const fileRef = (0, import_react.useRef)(null);
	const remaining = MAX_IMAGES - images.length;
	const readFiles = async (files) => {
		const toUpload = files.slice(0, remaining);
		if (!toUpload.length) return;
		setUploading(true);
		const results = await Promise.allSettled(toUpload.map((file) => uploadImage(file)));
		const uploaded = results.filter((r) => r.status === "fulfilled").map((r) => r.value.data.url);
		const failedCount = results.length - uploaded.length;
		if (uploaded.length) setImages((prev) => [...prev, ...uploaded].slice(0, MAX_IMAGES));
		if (failedCount > 0) toast.error(`${failedCount} photo${failedCount !== 1 ? "s" : ""} failed to upload.`);
		setUploading(false);
	};
	const handleFiles = (e) => {
		const files = Array.from(e.target.files);
		if (!files.length) return;
		readFiles(files);
		e.target.value = "";
	};
	const removeImage = (idx) => setImages((prev) => prev.filter((_, i) => i !== idx));
	const handleDrop = (e) => {
		e.preventDefault();
		const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
		readFiles(files);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!titleEn.trim() && !titleSi.trim() && !titleTa.trim()) {
			setError("Please enter a topic title in at least one language.");
			return;
		}
		if (uploading) {
			setError("Please wait for photos to finish uploading.");
			return;
		}
		setSaving(true);
		setTimeout(() => {
			onSave({
				titleEn: titleEn.trim(),
				titleSi: titleSi.trim(),
				titleTa: titleTa.trim(),
				category,
				images
			});
		}, 320);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		style: {
			position: "fixed",
			inset: 0,
			background: "rgba(0,0,0,0.52)",
			zIndex: 100,
			display: "flex",
			alignItems: "flex-start",
			justifyContent: "center",
			padding: "1.5rem 1rem",
			overflowY: "auto"
		},
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .93,
				opacity: 0,
				y: 20
			},
			animate: {
				scale: 1,
				opacity: 1,
				y: 0
			},
			exit: {
				scale: .93,
				opacity: 0,
				y: 20
			},
			transition: {
				duration: .22,
				ease: [
					.16,
					1,
					.3,
					1
				]
			},
			style: {
				background: "#fff",
				borderRadius: 20,
				width: "100%",
				maxWidth: 560,
				boxShadow: "0 28px 72px rgba(0,0,0,0.24)",
				overflow: "hidden",
				position: "relative"
			},
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					height: 3,
					background: `linear-gradient(90deg, ${GOLD} 0%, #E8C55A 50%, ${GOLD} 100%)`
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						padding: "1.3rem 1.5rem 1rem",
						borderBottom: "1px solid rgba(74,9,24,0.07)",
						display: "flex",
						alignItems: "flex-start",
						justifyContent: "space-between"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						style: {
							fontFamily: "'Playfair Display', serif",
							fontSize: "1.2rem",
							fontWeight: 800,
							color: MAROON,
							marginBottom: 3
						},
						children: isEdit ? "Edit Album" : "Upload Gallery Album"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							fontSize: "0.74rem",
							color: "rgba(74,9,24,0.44)",
							lineHeight: 1.55
						},
						children: isEdit ? "Update the album details and photos below." : `Add up to ${MAX_IMAGES} photos. Topic titles are optional in each language.`
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						style: {
							background: "rgba(74,9,24,0.06)",
							border: "none",
							borderRadius: 8,
							width: 32,
							height: 32,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							cursor: "pointer",
							color: MAROON,
							flexShrink: 0,
							marginLeft: 12,
							transition: "background 0.15s"
						},
						onMouseEnter: (e) => e.currentTarget.style.background = "rgba(74,9,24,0.12)",
						onMouseLeave: (e) => e.currentTarget.style.background = "rgba(74,9,24,0.06)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 15 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					style: { padding: "1.2rem 1.5rem 1.4rem" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { marginBottom: "1.2rem" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										marginBottom: 8
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										style: {
											fontSize: "0.72rem",
											fontWeight: 600,
											color: "rgba(74,9,24,0.58)",
											textTransform: "uppercase",
											letterSpacing: "0.08em"
										},
										children: "Photos"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										style: {
											fontSize: "0.68rem",
											color: images.length >= MAX_IMAGES ? "#dc2626" : "rgba(74,9,24,0.38)",
											fontWeight: 600
										},
										children: [
											images.length,
											" / ",
											MAX_IMAGES
										]
									})]
								}),
								remaining > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									onDragOver: (e) => e.preventDefault(),
									onDrop: uploading ? void 0 : handleDrop,
									onClick: () => !uploading && fileRef.current?.click(),
									style: {
										border: `2px dashed ${images.length > 0 ? "rgba(74,9,24,0.15)" : "rgba(74,9,24,0.2)"}`,
										borderRadius: 12,
										height: images.length > 0 ? 60 : 90,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										gap: 10,
										cursor: uploading ? "default" : "pointer",
										background: "rgba(74,9,24,0.015)",
										transition: "all 0.18s",
										marginBottom: images.length > 0 ? "0.75rem" : 0
									},
									onMouseEnter: (e) => {
										if (!uploading) e.currentTarget.style.background = "rgba(74,9,24,0.035)";
									},
									onMouseLeave: (e) => {
										if (!uploading) e.currentTarget.style.background = "rgba(74,9,24,0.015)";
									},
									children: uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiRefreshCw, {
										size: 16,
										color: GOLD,
										style: { animation: "spin 0.9s linear infinite" }
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											fontSize: "0.78rem",
											color: "rgba(74,9,24,0.5)",
											fontWeight: 500,
											pointerEvents: "none"
										},
										children: "Uploading photos…"
									})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPlus, {
										size: 16,
										color: "rgba(74,9,24,0.35)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											fontSize: "0.78rem",
											color: "rgba(74,9,24,0.42)",
											fontWeight: 500,
											pointerEvents: "none"
										},
										children: images.length === 0 ? `Click or drag to add photos (up to ${MAX_IMAGES})` : `Add more — ${remaining} slot${remaining !== 1 ? "s" : ""} left`
									})] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									ref: fileRef,
									type: "file",
									accept: "image/*",
									multiple: true,
									onChange: handleFiles,
									style: { display: "none" }
								}),
								images.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										display: "grid",
										gridTemplateColumns: "repeat(5, 1fr)",
										gap: 8
									},
									children: images.map((src, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											position: "relative",
											aspectRatio: "1",
											borderRadius: 10,
											overflow: "hidden"
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: resolveUploadUrl(src),
												alt: `photo ${idx + 1}`,
												style: {
													width: "100%",
													height: "100%",
													objectFit: "cover",
													display: "block"
												}
											}),
											idx === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												style: {
													position: "absolute",
													bottom: 4,
													left: 4,
													background: GOLD,
													color: "#fff",
													fontSize: "0.52rem",
													fontWeight: 700,
													padding: "2px 5px",
													borderRadius: 4,
													letterSpacing: "0.05em"
												},
												children: "COVER"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => removeImage(idx),
												style: {
													position: "absolute",
													top: 4,
													right: 4,
													width: 20,
													height: 20,
													borderRadius: "50%",
													background: "rgba(0,0,0,0.6)",
													border: "none",
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													cursor: "pointer",
													color: "#fff",
													padding: 0,
													transition: "background 0.12s"
												},
												onMouseEnter: (e) => e.currentTarget.style.background = "rgba(220,38,38,0.85)",
												onMouseLeave: (e) => e.currentTarget.style.background = "rgba(0,0,0,0.6)",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 10 })
											})
										]
									}, idx))
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { marginBottom: "0.2rem" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										fontSize: "0.72rem",
										fontWeight: 700,
										color: "rgba(74,9,24,0.42)",
										textTransform: "uppercase",
										letterSpacing: "0.1em",
										marginBottom: "0.75rem",
										display: "flex",
										alignItems: "center",
										gap: 6
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTag, { size: 11 }), " Topic Title"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangField, {
									label: "English",
									langLabel: "EN",
									value: titleEn,
									onChange: setTitleEn,
									placeholder: "e.g. Annual Planning Review 2026"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangField, {
									label: "Sinhala",
									langLabel: "SI",
									value: titleSi,
									onChange: setTitleSi,
									placeholder: "e.g. වාර්ෂික සැලසුම් සමාලෝචනය"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangField, {
									label: "Tamil",
									langLabel: "TA",
									value: titleTa,
									onChange: setTitleTa,
									placeholder: "e.g. ஆண்டு திட்டமிடல் மதிப்பாய்வு"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { marginBottom: "1.1rem" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								style: {
									fontSize: "0.72rem",
									fontWeight: 600,
									color: "rgba(74,9,24,0.58)",
									textTransform: "uppercase",
									letterSpacing: "0.08em",
									display: "block",
									marginBottom: 5
								},
								children: "Category"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: category,
								onChange: (e) => setCategory(e.target.value),
								style: {
									width: "100%",
									padding: "10px 12px",
									border: "1.5px solid rgba(74,9,24,0.15)",
									borderRadius: 9,
									fontSize: "0.83rem",
									fontFamily: "Inter, sans-serif",
									color: MAROON,
									background: "#fff",
									outline: "none",
									cursor: "pointer",
									appearance: "none",
									boxSizing: "border-box"
								},
								children: ALBUM_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c,
									children: c
								}, c))
							})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 8,
								padding: "9px 12px",
								borderRadius: 9,
								marginBottom: "1rem",
								background: "rgba(220,38,38,0.07)",
								border: "1px solid rgba(220,38,38,0.18)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAlertCircle, {
								size: 14,
								color: "#dc2626"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: "0.78rem",
									color: "#dc2626"
								},
								children: error
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: 10,
								justifyContent: "flex-end"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: onClose,
								style: {
									padding: "9px 20px",
									borderRadius: 10,
									border: "1px solid rgba(74,9,24,0.14)",
									background: "transparent",
									color: "rgba(74,9,24,0.55)",
									fontSize: "0.83rem",
									cursor: "pointer",
									fontFamily: "Inter, sans-serif",
									fontWeight: 500,
									transition: "all 0.15s"
								},
								onMouseEnter: (e) => e.currentTarget.style.background = "rgba(74,9,24,0.04)",
								onMouseLeave: (e) => e.currentTarget.style.background = "transparent",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
								type: "submit",
								disabled: saving || uploading,
								whileHover: !saving && !uploading ? {
									y: -1,
									boxShadow: "0 6px 20px rgba(74,9,24,0.34)"
								} : {},
								whileTap: !saving && !uploading ? { scale: .97 } : {},
								style: {
									padding: "9px 22px",
									borderRadius: 10,
									border: "none",
									background: saving || uploading ? "rgba(74,9,24,0.4)" : `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`,
									color: "#fff",
									fontSize: "0.83rem",
									cursor: saving || uploading ? "default" : "pointer",
									fontFamily: "Inter, sans-serif",
									fontWeight: 600,
									display: "flex",
									alignItems: "center",
									gap: 7,
									boxShadow: "0 3px 12px rgba(74,9,24,0.28)",
									transition: "background 0.15s"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiImage, { size: 13 }), saving ? "Saving…" : isEdit ? "Save Changes" : "Create Album"]
							})]
						})
					]
				})
			]
		})
	});
}
var ErrorBoundary = class extends import_react.Component {
	constructor(props) {
		super(props);
		this.state = { error: null };
	}
	static getDerivedStateFromError(error) {
		return { error };
	}
	componentDidCatch(error, info) {
		console.error("[ErrorBoundary] Caught error in modal:", error, info);
	}
	render() {
		if (this.state.error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				position: "fixed",
				inset: 0,
				background: "rgba(0,0,0,0.52)",
				zIndex: 120,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "1.5rem"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					background: "#fff",
					borderRadius: 12,
					padding: "1.25rem",
					maxWidth: 640,
					width: "100%"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						style: {
							marginTop: 0,
							color: "#b91c1c"
						},
						children: "An error occurred"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: { color: "#374151" },
						children: "Something went wrong while opening this dialog. Check the console for details."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						style: {
							background: "#f8fafc",
							padding: 10,
							borderRadius: 8,
							overflowX: "auto"
						},
						children: String(this.state.error)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							display: "flex",
							justifyContent: "flex-end",
							marginTop: 12
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => this.setState({ error: null }),
							style: {
								padding: "8px 14px",
								borderRadius: 8,
								border: "1px solid rgba(74,9,24,0.12)",
								background: "transparent",
								cursor: "pointer"
							},
							children: "Dismiss"
						})
					})
				]
			})
		});
		return this.props.children;
	}
};
function ActionBtn({ icon: Icon, title, color, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		title,
		onClick,
		style: {
			width: 32,
			height: 32,
			borderRadius: 9,
			border: `1px solid ${color}22`,
			background: `${color}08`,
			color,
			cursor: "pointer",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			transition: "all 0.15s",
			boxShadow: `0 1px 4px ${color}14`
		},
		onMouseEnter: (e) => {
			e.currentTarget.style.background = color;
			e.currentTarget.style.color = "#fff";
			e.currentTarget.style.borderColor = color;
			e.currentTarget.style.transform = "scale(1.06)";
			e.currentTarget.style.boxShadow = `0 4px 12px ${color}44`;
		},
		onMouseLeave: (e) => {
			e.currentTarget.style.background = `${color}08`;
			e.currentTarget.style.color = color;
			e.currentTarget.style.borderColor = `${color}22`;
			e.currentTarget.style.transform = "scale(1)";
			e.currentTarget.style.boxShadow = `0 1px 4px ${color}14`;
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 13 })
	});
}
function StatusBadge({ s }) {
	const c = STATUS_COLORS[s] ?? {
		bg: "rgba(0,0,0,0.06)",
		text: "#374151",
		dot: "#9ca3af"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		style: {
			display: "inline-flex",
			alignItems: "center",
			gap: 5,
			padding: "3px 10px",
			borderRadius: 100,
			background: c.bg,
			color: c.text,
			fontSize: "0.66rem",
			fontWeight: 700,
			letterSpacing: "0.03em",
			whiteSpace: "nowrap",
			border: `1px solid ${c.dot}22`
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
			width: 5,
			height: 5,
			borderRadius: "50%",
			background: c.dot,
			boxShadow: `0 0 5px ${c.dot}88`
		} }), s]
	});
}
function secureInt(max) {
	const a = /* @__PURE__ */ new Uint32Array(1);
	crypto.getRandomValues(a);
	return a[0] % max;
}
function generateUsername() {
	return `${[
		"Plan",
		"Admin",
		"Gov",
		"SP",
		"Sec",
		"PS"
	][secureInt(6)]}${[
		"Officer",
		"Admin",
		"User",
		"Staff",
		"Mgr",
		"Lead"
	][secureInt(6)]}${100 + secureInt(900)}`;
}
function generatePassword() {
	const U = "ABCDEFGHJKLMNPQRSTUVWXYZ";
	const L = "abcdefghjkmnpqrstuvwxyz";
	const D = "23456789";
	const S = "@#$!%^&*";
	const A = U + L + D + S;
	const pool = [
		U,
		U,
		L,
		L,
		D,
		D,
		S,
		S
	].map((s) => s[secureInt(s.length)]);
	for (let i = pool.length; i < 16; i++) pool.push(A[secureInt(63)]);
	for (let i = pool.length - 1; i > 0; i--) {
		const j = secureInt(i + 1);
		[pool[i], pool[j]] = [pool[j], pool[i]];
	}
	return pool.join("");
}
function passwordStrength(pw) {
	if (!pw) return {
		level: 0,
		label: "",
		color: "transparent"
	};
	let score = 0;
	if (pw.length >= 8) score++;
	if (pw.length >= 12) score++;
	if (/[A-Z]/.test(pw)) score++;
	if (/[0-9]/.test(pw)) score++;
	if (/[^A-Za-z0-9]/.test(pw)) score++;
	if (score <= 1) return {
		level: 1,
		label: "Weak",
		color: "#dc2626"
	};
	if (score === 2) return {
		level: 2,
		label: "Fair",
		color: "#d97706"
	};
	if (score === 3) return {
		level: 3,
		label: "Good",
		color: "#2563eb"
	};
	return {
		level: 4,
		label: "Strong",
		color: "#16a34a"
	};
}
var sInputBase = {
	width: "100%",
	border: "none",
	outline: "none",
	padding: "11px 14px 11px 38px",
	fontSize: "0.83rem",
	fontFamily: "Inter, sans-serif",
	background: "transparent",
	borderRadius: 9,
	color: MAROON
};
function PublishSiteSection() {
	const { isLive, setLive } = useSitePublish();
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	const [pending, setPending] = (0, import_react.useState)(null);
	const requestToggle = (goLive) => {
		setPending(goLive ? "live" : "soon");
		setConfirm(true);
	};
	const executeToggle = () => {
		const goLive = pending === "live";
		setLive(goLive);
		toast.success(goLive ? "Site is now LIVE — visible to the public!" : "Site set to Coming Soon — portal hidden from public.");
		setConfirm(false);
		setPending(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: { marginBottom: "1.5rem" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					alignItems: "center",
					gap: 10,
					marginBottom: 5
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					width: 3,
					height: 24,
					borderRadius: 2,
					background: `linear-gradient(${MAROON}, ${GOLD})`,
					flexShrink: 0
				} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					style: {
						fontFamily: "'Playfair Display', serif",
						fontSize: "1.35rem",
						fontWeight: 800,
						color: MAROON,
						margin: 0
					},
					children: "Publish Site"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: {
					fontSize: "0.76rem",
					color: "rgba(74,9,24,0.4)",
					marginLeft: 13
				},
				children: "Control public visibility of the Southern Province Planning Secretariat Portal"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 14,
				scale: .98
			},
			animate: {
				opacity: 1,
				y: 0,
				scale: 1
			},
			transition: {
				duration: .45,
				ease: [
					.16,
					1,
					.3,
					1
				]
			},
			style: {
				borderRadius: 20,
				padding: "1.6rem 1.8rem",
				marginBottom: "1.4rem",
				position: "relative",
				overflow: "hidden",
				background: isLive ? `linear-gradient(135deg, #0d5e2e 0%, #166534 60%, #14532d 100%)` : `linear-gradient(135deg, ${MAROON2} 0%, ${MAROON} 60%, #7C1A32 100%)`,
				border: `1px solid ${isLive ? "rgba(74,222,128,0.25)" : "rgba(199,154,43,0.2)"}`,
				boxShadow: isLive ? "0 6px 32px rgba(22,101,52,0.28)" : "0 6px 28px rgba(74,9,24,0.22)"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					height: 2,
					background: isLive ? "linear-gradient(90deg, transparent, #4ade80, transparent)" : `linear-gradient(90deg, transparent, ${GOLD}, transparent)`
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					position: "absolute",
					right: -40,
					bottom: -40,
					width: 160,
					height: 160,
					borderRadius: "50%",
					background: "rgba(255,255,255,0.04)",
					pointerEvents: "none"
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 16,
						position: "relative",
						zIndex: 1
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							width: 58,
							height: 58,
							borderRadius: 16,
							flexShrink: 0,
							background: isLive ? "rgba(74,222,128,0.2)" : `rgba(199,154,43,0.18)`,
							border: `1.5px solid ${isLive ? "rgba(74,222,128,0.4)" : "rgba(199,154,43,0.35)"}`,
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						},
						children: isLive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiGlobe, {
							size: 24,
							color: "#4ade80"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiZap, {
							size: 24,
							color: GOLD
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							flex: 1,
							minWidth: 0
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 10,
								marginBottom: 4
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: "1.1rem",
									fontWeight: 700,
									color: "#fff"
								},
								children: isLive ? "Site is Live" : "Coming Soon Mode"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								style: {
									display: "inline-flex",
									alignItems: "center",
									gap: 5,
									background: isLive ? "rgba(74,222,128,0.18)" : "rgba(255,255,255,0.1)",
									border: `1px solid ${isLive ? "rgba(74,222,128,0.4)" : "rgba(255,255,255,0.2)"}`,
									borderRadius: 100,
									padding: "2px 10px",
									fontSize: "0.62rem",
									fontWeight: 700,
									color: isLive ? "#4ade80" : "rgba(255,255,255,0.7)",
									letterSpacing: "0.06em",
									textTransform: "uppercase"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
									animate: isLive ? {
										scale: [
											1,
											1.7,
											1
										],
										opacity: [
											1,
											.2,
											1
										]
									} : {},
									transition: {
										duration: 1.6,
										repeat: Infinity,
										ease: "easeInOut"
									},
									style: {
										width: 5,
										height: 5,
										borderRadius: "50%",
										background: isLive ? "#4ade80" : "rgba(255,255,255,0.5)",
										display: "inline-block"
									}
								}), isLive ? "Live" : "Hidden"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: "0.74rem",
								color: "rgba(255,255,255,0.62)",
								lineHeight: 1.6
							},
							children: isLive ? "The portal is publicly accessible. All pages are visible to visitors." : "The portal is hidden. Visitors see a Coming Soon screen instead."
						})]
					})]
				})
			]
		}, isLive ? "live" : "soon"),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "grid",
				gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
				gap: "1rem",
				marginBottom: "1.4rem"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					background: "#fff",
					borderRadius: 18,
					border: isLive ? "1.5px solid rgba(22,163,74,0.35)" : "1px solid rgba(74,9,24,0.07)",
					boxShadow: isLive ? "0 2px 12px rgba(22,163,74,0.1)" : "0 3px 16px rgba(74,9,24,0.06)",
					overflow: "hidden",
					opacity: isLive ? .65 : 1
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						padding: "1rem 1.2rem",
						borderBottom: "1px solid rgba(74,9,24,0.06)",
						background: "rgba(22,163,74,0.03)",
						display: "flex",
						alignItems: "center",
						gap: 12
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							width: 36,
							height: 36,
							borderRadius: 10,
							background: "rgba(22,163,74,0.1)",
							border: "1px solid rgba(22,163,74,0.2)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexShrink: 0
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiGlobe, {
							size: 16,
							color: "#16a34a"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontSize: "0.86rem",
							fontWeight: 700,
							color: MAROON
						},
						children: "Set Site Live"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontSize: "0.68rem",
							color: "rgba(74,9,24,0.42)",
							marginTop: 1
						},
						children: "Publish to public internet"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { padding: "1.1rem 1.2rem" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							fontSize: "0.73rem",
							color: "rgba(74,9,24,0.55)",
							lineHeight: 1.7,
							margin: "0 0 1rem"
						},
						children: "The entire portal becomes publicly visible. All pages — Home, About, Departments, Documents, News, Gallery — are accessible to anyone."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						whileHover: !isLive ? {
							y: -2,
							scale: 1.02
						} : {},
						whileTap: !isLive ? { scale: .97 } : {},
						onClick: () => !isLive && requestToggle(true),
						disabled: isLive,
						style: {
							width: "100%",
							padding: "10px 0",
							borderRadius: 10,
							background: isLive ? "rgba(22,163,74,0.08)" : "linear-gradient(135deg, #16a34a 0%, #14532d 100%)",
							border: isLive ? "1.5px solid rgba(22,163,74,0.3)" : "none",
							color: isLive ? "#16a34a" : "#fff",
							fontFamily: "Inter, sans-serif",
							fontWeight: 700,
							fontSize: "0.82rem",
							cursor: isLive ? "default" : "pointer",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							gap: 7,
							boxShadow: isLive ? "none" : "0 4px 16px rgba(22,163,74,0.28)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiGlobe, { size: 14 }), isLive ? "Currently Live" : "Go Live Now"]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					background: "#fff",
					borderRadius: 18,
					border: !isLive ? `1.5px solid rgba(199,154,43,0.35)` : "1px solid rgba(74,9,24,0.07)",
					boxShadow: !isLive ? `0 2px 12px rgba(199,154,43,0.12)` : "0 3px 16px rgba(74,9,24,0.06)",
					overflow: "hidden",
					opacity: !isLive ? .65 : 1
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						padding: "1rem 1.2rem",
						borderBottom: "1px solid rgba(74,9,24,0.06)",
						background: "rgba(199,154,43,0.03)",
						display: "flex",
						alignItems: "center",
						gap: 12
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							width: 36,
							height: 36,
							borderRadius: 10,
							background: "rgba(199,154,43,0.1)",
							border: `1px solid rgba(199,154,43,0.25)`,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexShrink: 0
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiZap, {
							size: 16,
							color: GOLD
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontSize: "0.86rem",
							fontWeight: 700,
							color: MAROON
						},
						children: "Coming Soon Mode"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontSize: "0.68rem",
							color: "rgba(74,9,24,0.42)",
							marginTop: 1
						},
						children: "Hide portal from public"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { padding: "1.1rem 1.2rem" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							fontSize: "0.73rem",
							color: "rgba(74,9,24,0.55)",
							lineHeight: 1.7,
							margin: "0 0 1rem"
						},
						children: "All portal pages are replaced with an animated Coming Soon screen. PMS New and PMS Old buttons remain accessible to staff."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						whileHover: isLive ? {
							y: -2,
							scale: 1.02
						} : {},
						whileTap: isLive ? { scale: .97 } : {},
						onClick: () => isLive && requestToggle(false),
						disabled: !isLive,
						style: {
							width: "100%",
							padding: "10px 0",
							borderRadius: 10,
							background: !isLive ? `rgba(199,154,43,0.08)` : `linear-gradient(135deg, ${GOLD} 0%, #9A7520 100%)`,
							border: !isLive ? `1.5px solid rgba(199,154,43,0.3)` : "none",
							color: !isLive ? GOLD : "#fff",
							fontFamily: "Inter, sans-serif",
							fontWeight: 700,
							fontSize: "0.82rem",
							cursor: !isLive ? "default" : "pointer",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							gap: 7,
							boxShadow: !isLive ? "none" : `0 4px 16px rgba(199,154,43,0.3)`
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiZap, { size: 14 }), !isLive ? "Currently in Coming Soon" : "Switch to Coming Soon"]
					})]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				background: "#fff",
				borderRadius: 18,
				border: "1px solid rgba(74,9,24,0.07)",
				boxShadow: "0 3px 16px rgba(74,9,24,0.06)",
				overflow: "hidden",
				marginBottom: "1.1rem"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					padding: "1rem 1.2rem",
					borderBottom: "1px solid rgba(74,9,24,0.06)",
					background: "rgba(74,9,24,0.015)",
					display: "flex",
					alignItems: "center",
					gap: 12
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						width: 36,
						height: 36,
						borderRadius: 10,
						background: `rgba(74,9,24,0.07)`,
						border: `1px solid rgba(74,9,24,0.12)`,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						flexShrink: 0
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiExternalLink, {
						size: 16,
						color: MAROON
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						fontSize: "0.86rem",
						fontWeight: 700,
						color: MAROON
					},
					children: "PMS Quick Links"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						fontSize: "0.68rem",
						color: "rgba(74,9,24,0.42)",
						marginTop: 1
					},
					children: "Shown on the Coming Soon screen for staff access"
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					padding: "1.1rem 1.2rem",
					display: "flex",
					gap: 10,
					flexWrap: "wrap"
				},
				children: [{
					label: "PMS New",
					sub: "Latest version",
					href: "https://pms.planning.gov.lk"
				}, {
					label: "PMS Old",
					sub: "Previous version",
					href: "https://pmsold.planning.gov.lk"
				}].map(({ label, sub, href }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href,
					target: "_blank",
					rel: "noopener noreferrer",
					style: {
						display: "inline-flex",
						flexDirection: "column",
						alignItems: "center",
						gap: 1,
						padding: "10px 22px",
						borderRadius: 10,
						background: "rgba(74,9,24,0.04)",
						border: "1.5px solid rgba(74,9,24,0.1)",
						textDecoration: "none",
						cursor: "pointer"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						style: {
							fontSize: "0.8rem",
							fontWeight: 700,
							color: MAROON,
							display: "flex",
							alignItems: "center",
							gap: 5
						},
						children: [
							label,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiExternalLink, { size: 11 })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							fontSize: "0.63rem",
							color: "rgba(74,9,24,0.45)"
						},
						children: sub
					})]
				}, label))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				padding: "0.9rem 1.1rem",
				borderRadius: 12,
				background: "rgba(180,83,9,0.05)",
				border: "1px solid rgba(180,83,9,0.15)",
				display: "flex",
				alignItems: "flex-start",
				gap: 10
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAlertTriangle, {
				size: 14,
				color: "#d97706",
				style: {
					marginTop: 2,
					flexShrink: 0
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				style: {
					fontSize: "0.73rem",
					color: "rgba(74,9,24,0.55)",
					lineHeight: 1.7,
					margin: 0
				},
				children: [
					"Switching to ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Live" }),
					" makes the entire portal accessible to the public immediately. Ensure all content is reviewed and approved before publishing. The CMS, SMP, and Admin sections are ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "not affected" }),
					" by this setting."
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: confirm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			style: {
				position: "fixed",
				inset: 0,
				zIndex: 9999,
				background: "rgba(10,4,8,0.55)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "1rem"
			},
			onClick: () => setConfirm(false),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					scale: .9,
					y: 20,
					opacity: 0
				},
				animate: {
					scale: 1,
					y: 0,
					opacity: 1
				},
				exit: {
					scale: .9,
					y: 10,
					opacity: 0
				},
				transition: {
					type: "spring",
					stiffness: 300,
					damping: 26
				},
				onClick: (e) => e.stopPropagation(),
				style: {
					background: "#fff",
					borderRadius: 22,
					width: "100%",
					maxWidth: 440,
					boxShadow: "0 24px 80px rgba(10,4,8,0.28)",
					overflow: "hidden",
					border: "1px solid rgba(74,9,24,0.08)"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						padding: "1.3rem 1.5rem",
						borderBottom: "1px solid rgba(74,9,24,0.07)",
						background: pending === "live" ? "rgba(22,163,74,0.04)" : `rgba(199,154,43,0.04)`,
						display: "flex",
						alignItems: "center",
						gap: 12
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							width: 44,
							height: 44,
							borderRadius: 13,
							flexShrink: 0,
							background: pending === "live" ? "rgba(22,163,74,0.12)" : `rgba(199,154,43,0.12)`,
							border: `1.5px solid ${pending === "live" ? "rgba(22,163,74,0.3)" : "rgba(199,154,43,0.3)"}`,
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						},
						children: pending === "live" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiGlobe, {
							size: 20,
							color: "#16a34a"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiZap, {
							size: 20,
							color: GOLD
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontSize: "0.95rem",
							fontWeight: 700,
							color: MAROON
						},
						children: pending === "live" ? "Publish Site Live?" : "Switch to Coming Soon?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontSize: "0.7rem",
							color: "rgba(74,9,24,0.45)",
							marginTop: 2
						},
						children: "This action takes effect immediately"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { padding: "1.3rem 1.5rem" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							fontSize: "0.83rem",
							color: "rgba(74,9,24,0.7)",
							lineHeight: 1.75,
							margin: "0 0 1.4rem"
						},
						children: pending === "live" ? "The portal will become fully visible to the public. All pages will be accessible immediately. Are you sure you want to publish now?" : "The portal will be hidden from the public and replaced with the Coming Soon screen. Staff can still access PMS systems via the Coming Soon page. Continue?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: 10,
							justifyContent: "flex-end"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
							whileHover: { y: -1 },
							whileTap: { scale: .97 },
							onClick: () => setConfirm(false),
							style: {
								padding: "9px 20px",
								borderRadius: 9,
								background: "transparent",
								border: "1.5px solid rgba(74,9,24,0.15)",
								color: "rgba(74,9,24,0.6)",
								fontFamily: "Inter, sans-serif",
								fontWeight: 600,
								fontSize: "0.82rem",
								cursor: "pointer"
							},
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
							whileHover: {
								y: -2,
								scale: 1.02
							},
							whileTap: { scale: .97 },
							onClick: executeToggle,
							style: {
								padding: "9px 22px",
								borderRadius: 9,
								border: "none",
								background: pending === "live" ? "linear-gradient(135deg, #16a34a 0%, #14532d 100%)" : `linear-gradient(135deg, ${GOLD} 0%, #9A7520 100%)`,
								color: "#fff",
								fontFamily: "Inter, sans-serif",
								fontWeight: 700,
								fontSize: "0.82rem",
								cursor: "pointer",
								boxShadow: pending === "live" ? "0 4px 16px rgba(22,163,74,0.3)" : `0 4px 16px rgba(199,154,43,0.3)`
							},
							children: pending === "live" ? "Yes, Go Live" : "Yes, Hide Site"
						})]
					})]
				})]
			})
		}) })
	] });
}
function SettingsSection({ onUsernameChange }) {
	const [creds, setCreds] = (0, import_react.useState)(() => getCredentials());
	const [newUser, setNewUser] = (0, import_react.useState)("");
	const [userPass, setUserPass] = (0, import_react.useState)("");
	const [showUserPass, setShowUserPass] = (0, import_react.useState)(false);
	const [userLoading, setUserLoading] = (0, import_react.useState)(false);
	const [userError, setUserError] = (0, import_react.useState)("");
	const [curPass, setCurPass] = (0, import_react.useState)("");
	const [newPass, setNewPass] = (0, import_react.useState)("");
	const [confirmPass, setConfirmPass] = (0, import_react.useState)("");
	const [showCur, setShowCur] = (0, import_react.useState)(false);
	const [showNew, setShowNew] = (0, import_react.useState)(false);
	const [showConfirm, setShowConfirm] = (0, import_react.useState)(false);
	const [passLoading, setPassLoading] = (0, import_react.useState)(false);
	const [passError, setPassError] = (0, import_react.useState)("");
	const strength = passwordStrength(newPass);
	const passMatch = confirmPass && confirmPass === newPass;
	const handleUsernameChange = async (e) => {
		e.preventDefault();
		if (!newUser.trim()) return setUserError("Please enter a new username");
		if (newUser.trim() === creds?.username) return setUserError("New username must be different from current");
		if (!userPass) return setUserError("Please enter your current password to verify");
		setUserLoading(true);
		setUserError("");
		try {
			await changeUsername(newUser.trim(), userPass);
			const updated = getCredentials();
			setCreds(updated);
			onUsernameChange(updated.username);
			toast.success(`Username changed to "${updated.username}"`);
			setNewUser("");
			setUserPass("");
		} catch (err) {
			setUserError(err.message);
		} finally {
			setUserLoading(false);
		}
	};
	const handlePasswordChange = async (e) => {
		e.preventDefault();
		if (!curPass) return setPassError("Please enter your current password");
		if (!newPass) return setPassError("Please enter a new password");
		if (newPass.length < 8) return setPassError("Password must be at least 8 characters");
		if (newPass !== confirmPass) return setPassError("Passwords do not match");
		setPassLoading(true);
		setPassError("");
		try {
			await changePassword(curPass, newPass);
			toast.success("Password updated and re-encrypted successfully");
			setCurPass("");
			setNewPass("");
			setConfirmPass("");
		} catch (err) {
			setPassError(err.message);
		} finally {
			setPassLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: { marginBottom: "1.5rem" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					alignItems: "center",
					gap: 10,
					marginBottom: 5
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					width: 3,
					height: 24,
					borderRadius: 2,
					background: `linear-gradient(${MAROON}, ${GOLD})`,
					flexShrink: 0
				} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					style: {
						fontFamily: "'Playfair Display', serif",
						fontSize: "1.35rem",
						fontWeight: 800,
						color: MAROON,
						margin: 0
					},
					children: "Settings"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: {
					fontSize: "0.76rem",
					color: "rgba(74,9,24,0.4)",
					marginLeft: 13
				},
				children: "Manage your account credentials and security"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				background: `linear-gradient(135deg, ${MAROON2} 0%, ${MAROON} 60%, #7C1A32 100%)`,
				borderRadius: 18,
				padding: "1.4rem 1.6rem",
				marginBottom: "1.4rem",
				border: "1px solid rgba(199,154,43,0.2)",
				boxShadow: "0 6px 28px rgba(74,9,24,0.2)",
				display: "flex",
				alignItems: "center",
				gap: 18,
				position: "relative",
				overflow: "hidden"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					height: 2,
					background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					position: "absolute",
					right: -30,
					bottom: -30,
					width: 120,
					height: 120,
					borderRadius: "50%",
					background: "rgba(255,255,255,0.04)",
					pointerEvents: "none"
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						width: 62,
						height: 62,
						borderRadius: 16,
						flexShrink: 0,
						background: `linear-gradient(135deg, ${GOLD} 0%, #9A7520 100%)`,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: "#fff",
						fontSize: "1.5rem",
						fontWeight: 800,
						fontFamily: "'Cinzel', serif",
						boxShadow: `0 4px 16px rgba(199,154,43,0.4), 0 0 0 3px rgba(199,154,43,0.2)`
					},
					children: (creds?.username?.[0] ?? "A").toUpperCase()
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						flex: 1,
						minWidth: 0,
						position: "relative",
						zIndex: 1
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: "1.1rem",
								fontWeight: 700,
								color: "#fff"
							},
							children: creds?.username ?? "Admin"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: "0.74rem",
								color: GOLD,
								marginTop: 3,
								fontWeight: 600
							},
							children: "Super Administrator"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 8,
								marginTop: 10,
								flexWrap: "wrap"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								style: {
									display: "inline-flex",
									alignItems: "center",
									gap: 5,
									background: "rgba(255,255,255,0.12)",
									border: "1px solid rgba(255,255,255,0.2)",
									borderRadius: 100,
									padding: "3px 10px",
									fontSize: "0.63rem",
									fontWeight: 600,
									color: "rgba(255,255,255,0.85)"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
									width: 5,
									height: 5,
									borderRadius: "50%",
									background: "#4ade80",
									boxShadow: "0 0 6px #4ade80"
								} }), "SHA-256 Encrypted"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								style: {
									display: "inline-flex",
									alignItems: "center",
									gap: 5,
									background: "rgba(255,255,255,0.1)",
									border: "1px solid rgba(255,255,255,0.15)",
									borderRadius: 100,
									padding: "3px 10px",
									fontSize: "0.63rem",
									fontWeight: 600,
									color: "rgba(255,255,255,0.7)"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiShield, { size: 10 }), " Stored locally"]
							})]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "grid",
				gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
				gap: "1.1rem",
				marginBottom: "1.1rem"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					background: "#fff",
					borderRadius: 18,
					border: "1px solid rgba(74,9,24,0.07)",
					boxShadow: "0 3px 16px rgba(74,9,24,0.07)",
					overflow: "hidden"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						padding: "1.05rem 1.3rem",
						borderBottom: "1px solid rgba(74,9,24,0.06)",
						display: "flex",
						alignItems: "center",
						gap: 12,
						background: "rgba(74,9,24,0.015)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							width: 38,
							height: 38,
							borderRadius: 11,
							background: `linear-gradient(135deg, ${MAROON}18, ${MAROON}0a)`,
							border: `1px solid ${MAROON}18`,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexShrink: 0
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiUser, {
							size: 16,
							color: MAROON
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontSize: "0.87rem",
							fontWeight: 700,
							color: MAROON
						},
						children: "Change Username"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							fontSize: "0.69rem",
							color: "rgba(74,9,24,0.42)",
							marginTop: 1
						},
						children: ["Current: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: creds?.username ?? "Admin" })]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleUsernameChange,
					style: {
						padding: "1.25rem",
						display: "flex",
						flexDirection: "column",
						gap: "0.9rem"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsField, {
							label: "New Username",
							icon: FiUser,
							action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [newUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyBtn, { text: newUser }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenBtn, { onClick: () => {
								const u = generateUsername();
								setNewUser(u);
								toast.success(`Generated username: ${u}`);
							} })] }),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: newUser,
								onChange: (e) => setNewUser(e.target.value),
								placeholder: "Enter or generate a username",
								autoComplete: "off",
								style: sInputBase
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsField, {
							label: "Current Password (to verify)",
							icon: FiLock,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: showUserPass ? "text" : "password",
								value: userPass,
								onChange: (e) => setUserPass(e.target.value),
								placeholder: "Enter current password",
								autoComplete: "current-password",
								style: {
									...sInputBase,
									paddingRight: 40
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeToggle, {
								show: showUserPass,
								onToggle: () => setShowUserPass((v) => !v)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: userError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsError, { msg: userError }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSubmit, {
							loading: userLoading,
							icon: FiUser,
							label: "Update Username"
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					background: "#fff",
					borderRadius: 18,
					border: "1px solid rgba(74,9,24,0.07)",
					boxShadow: "0 3px 16px rgba(74,9,24,0.07)",
					overflow: "hidden"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						padding: "1.05rem 1.3rem",
						borderBottom: "1px solid rgba(74,9,24,0.06)",
						display: "flex",
						alignItems: "center",
						gap: 12,
						background: "rgba(74,9,24,0.015)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							width: 38,
							height: 38,
							borderRadius: 11,
							background: `linear-gradient(135deg, ${GOLD}22, ${GOLD}0e)`,
							border: `1px solid ${GOLD}30`,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexShrink: 0
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiLock, {
							size: 16,
							color: GOLD
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontSize: "0.87rem",
							fontWeight: 700,
							color: MAROON
						},
						children: "Change Password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontSize: "0.69rem",
							color: "rgba(74,9,24,0.42)",
							marginTop: 1
						},
						children: "SHA-256 re-encrypted on save"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handlePasswordChange,
					style: {
						padding: "1.25rem",
						display: "flex",
						flexDirection: "column",
						gap: "0.9rem"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsField, {
							label: "Current Password",
							icon: FiLock,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: showCur ? "text" : "password",
								value: curPass,
								onChange: (e) => setCurPass(e.target.value),
								placeholder: "Enter current password",
								autoComplete: "current-password",
								style: {
									...sInputBase,
									paddingRight: 40
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeToggle, {
								show: showCur,
								onToggle: () => setShowCur((v) => !v)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsField, {
							label: "New Password",
							icon: FiLock,
							action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [newPass && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyBtn, { text: newPass }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenBtn, { onClick: () => {
								const p = generatePassword();
								setNewPass(p);
								setConfirmPass(p);
								setShowNew(true);
								toast.success("Strong password generated — remember to save it!");
							} })] }),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: showNew ? "text" : "password",
									value: newPass,
									onChange: (e) => setNewPass(e.target.value),
									placeholder: "Enter or generate a password",
									autoComplete: "new-password",
									style: {
										...sInputBase,
										paddingRight: 40
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeToggle, {
									show: showNew,
									onToggle: () => setShowNew((v) => !v)
								}),
								newPass && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: { marginTop: 7 },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											display: "flex",
											gap: 4,
											marginBottom: 4
										},
										children: [
											1,
											2,
											3,
											4
										].map((lvl) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
											flex: 1,
											height: 3,
											borderRadius: 100,
											background: lvl <= strength.level ? strength.color : "rgba(74,9,24,0.08)",
											transition: "background 0.25s"
										} }, lvl))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											fontSize: "0.65rem",
											fontWeight: 600,
											color: strength.color
										},
										children: strength.label
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsField, {
							label: "Confirm New Password",
							icon: FiShield,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: showConfirm ? "text" : "password",
									value: confirmPass,
									onChange: (e) => setConfirmPass(e.target.value),
									placeholder: "Re-enter new password",
									autoComplete: "new-password",
									style: {
										...sInputBase,
										paddingRight: 40,
										...confirmPass && !passMatch ? { color: "#dc2626" } : {}
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeToggle, {
									show: showConfirm,
									onToggle: () => setShowConfirm((v) => !v)
								}),
								passMatch && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										position: "absolute",
										right: 40,
										top: "50%",
										transform: "translateY(-50%)",
										pointerEvents: "none"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, {
										size: 14,
										color: "#16a34a"
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: passError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsError, { msg: passError }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSubmit, {
							loading: passLoading,
							icon: FiLock,
							label: "Update Password",
							gold: true
						})
					]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				padding: "0.9rem 1.1rem",
				borderRadius: 12,
				background: "rgba(74,9,24,0.04)",
				border: "1px solid rgba(74,9,24,0.08)",
				display: "flex",
				alignItems: "flex-start",
				gap: 10
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiShield, {
				size: 14,
				color: GOLD,
				style: {
					marginTop: 2,
					flexShrink: 0
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				style: {
					fontSize: "0.73rem",
					color: "rgba(74,9,24,0.5)",
					lineHeight: 1.7,
					margin: 0
				},
				children: [
					"All passwords are hashed with ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "SHA-256" }),
					" using the browser's built-in Web Crypto API before being stored in ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						style: {
							fontSize: "0.7rem",
							background: "rgba(74,9,24,0.07)",
							padding: "1px 5px",
							borderRadius: 4
						},
						children: "localStorage"
					}),
					". Plain-text passwords are never saved. After changing credentials, your current session remains active."
				]
			})]
		})
	] });
}
function SettingsField({ label, icon: Icon, children, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			marginBottom: "0.4rem"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			style: {
				fontSize: "0.7rem",
				fontWeight: 600,
				color: "rgba(74,9,24,0.55)",
				letterSpacing: "0.07em",
				textTransform: "uppercase"
			},
			children: label
		}), action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				display: "flex",
				gap: 8,
				alignItems: "center"
			},
			children: action
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			position: "relative",
			border: "1.5px solid rgba(74,9,24,0.14)",
			borderRadius: 9,
			background: "#fff",
			display: "flex",
			alignItems: "center",
			transition: "border-color 0.18s, box-shadow 0.18s"
		},
		onFocusCapture: (e) => {
			e.currentTarget.style.borderColor = GOLD;
			e.currentTarget.style.boxShadow = "0 0 0 3px rgba(199,154,43,0.12)";
		},
		onBlurCapture: (e) => {
			e.currentTarget.style.borderColor = "rgba(74,9,24,0.14)";
			e.currentTarget.style.boxShadow = "none";
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			size: 14,
			color: "rgba(74,9,24,0.35)",
			style: {
				position: "absolute",
				left: 13,
				pointerEvents: "none"
			}
		}), children]
	})] });
}
function EyeToggle({ show, onToggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: onToggle,
		style: {
			position: "absolute",
			right: 12,
			top: "50%",
			transform: "translateY(-50%)",
			background: "none",
			border: "none",
			cursor: "pointer",
			padding: 2,
			color: "rgba(74,9,24,0.38)",
			display: "flex",
			alignItems: "center"
		},
		children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEyeOff, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEye, { size: 14 })
	});
}
function SettingsError({ msg }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: -6,
			height: 0
		},
		animate: {
			opacity: 1,
			y: 0,
			height: "auto"
		},
		exit: {
			opacity: 0,
			y: -6,
			height: 0
		},
		style: {
			display: "flex",
			alignItems: "center",
			gap: 8,
			background: "rgba(220,38,38,0.07)",
			border: "1px solid rgba(220,38,38,0.2)",
			borderRadius: 8,
			padding: "8px 12px",
			overflow: "hidden"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAlertCircle, {
			size: 13,
			color: "#DC2626"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			style: {
				fontSize: "0.78rem",
				color: "#DC2626"
			},
			children: msg
		})]
	});
}
function SettingsSubmit({ loading, icon: Icon, label, gold }) {
	const bg = gold ? `linear-gradient(135deg, ${GOLD} 0%, #9A7520 100%)` : `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
		type: "submit",
		whileHover: !loading ? {
			y: -1.5,
			boxShadow: gold ? "0 8px 22px rgba(199,154,43,0.38)" : "0 8px 22px rgba(74,9,24,0.34)"
		} : {},
		whileTap: !loading ? { scale: .97 } : {},
		disabled: loading,
		style: {
			width: "100%",
			padding: "11px",
			borderRadius: 10,
			border: "none",
			background: loading ? "rgba(74,9,24,0.35)" : bg,
			color: "#fff",
			fontSize: "0.8rem",
			fontWeight: 600,
			cursor: loading ? "not-allowed" : "pointer",
			fontFamily: "Inter, sans-serif",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			gap: 8,
			boxShadow: loading ? "none" : gold ? "0 3px 12px rgba(199,154,43,0.3)" : "0 3px 12px rgba(74,9,24,0.28)",
			transition: "background 0.2s, box-shadow 0.2s",
			marginTop: "0.25rem"
		},
		children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniSpinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 13 }),
			" ",
			label
		] })
	});
}
function MiniSpinner() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		animate: { rotate: 360 },
		transition: {
			duration: .85,
			repeat: Infinity,
			ease: "linear"
		},
		style: {
			width: 16,
			height: 16,
			borderRadius: "50%",
			border: "2px solid rgba(255,255,255,0.28)",
			borderTopColor: "#fff"
		}
	});
}
function GenBtn({ onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
		type: "button",
		whileHover: { scale: 1.04 },
		whileTap: { scale: .96 },
		onClick,
		style: {
			display: "inline-flex",
			alignItems: "center",
			gap: 4,
			padding: "3px 9px",
			borderRadius: 6,
			border: `1px solid ${GOLD}55`,
			background: `${GOLD}12`,
			color: GOLD,
			fontSize: "0.65rem",
			fontWeight: 700,
			cursor: "pointer",
			fontFamily: "Inter, sans-serif",
			letterSpacing: "0.04em",
			whiteSpace: "nowrap",
			transition: "background 0.15s"
		},
		onMouseEnter: (e) => e.currentTarget.style.background = `${GOLD}22`,
		onMouseLeave: (e) => e.currentTarget.style.background = `${GOLD}12`,
		children: "↻ Generate"
	});
}
function CopyBtn({ text }) {
	const [done, setDone] = (0, import_react.useState)(false);
	const handle = () => {
		navigator.clipboard.writeText(text).then(() => {
			setDone(true);
			setTimeout(() => setDone(false), 2e3);
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
		type: "button",
		whileTap: { scale: .95 },
		onClick: handle,
		style: {
			display: "inline-flex",
			alignItems: "center",
			gap: 4,
			padding: "3px 9px",
			borderRadius: 6,
			border: `1px solid ${done ? "#16a34a" : "rgba(74,9,24,0.18)"}`,
			background: done ? "rgba(22,101,52,0.1)" : "rgba(74,9,24,0.05)",
			color: done ? "#166534" : "rgba(74,9,24,0.5)",
			fontSize: "0.65rem",
			fontWeight: 700,
			cursor: "pointer",
			fontFamily: "Inter, sans-serif",
			letterSpacing: "0.04em",
			whiteSpace: "nowrap",
			transition: "all 0.2s"
		},
		children: done ? "✓ Copied" : "⎘ Copy"
	});
}
var DL_CATEGORIES = [
	"Circulars",
	"Forms",
	"Reports",
	"Notices",
	"Guidelines",
	"Applications",
	"Other"
];
var DL_FILE_TYPES = [
	"PDF",
	"DOC",
	"DOCX",
	"XLS",
	"XLSX",
	"PNG",
	"JPG",
	"Other"
];
var dlLabelStyle = {
	fontSize: "0.72rem",
	fontWeight: 600,
	color: "rgba(74,9,24,0.55)",
	textTransform: "uppercase",
	letterSpacing: "0.06em",
	fontFamily: "Inter, sans-serif",
	display: "block",
	marginBottom: 5
};
var dlInputStyle = {
	width: "100%",
	padding: "9px 12px",
	border: "1px solid rgba(74,9,24,0.15)",
	borderRadius: 8,
	fontSize: "0.84rem",
	fontFamily: "Inter, sans-serif",
	color: MAROON,
	background: "#fff",
	outline: "none",
	boxSizing: "border-box"
};
var dlSelectStyle = {
	...dlInputStyle,
	appearance: "none",
	backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%234A0918' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
	backgroundRepeat: "no-repeat",
	backgroundPosition: "right 10px center",
	paddingRight: 30
};
function DownloadsSection({ rows, onDelete, onAdd, onEdit, search, setSearch }) {
	const filtered = (rows || []).filter((r) => {
		if (!search.trim()) return true;
		const q = search.toLowerCase();
		return (r.titleEn || r.title || "").toLowerCase().includes(q) || (r.category || "").toLowerCase().includes(q) || (r.fileType || "").toLowerCase().includes(q) || (r.status || "").toLowerCase().includes(q);
	});
	const statusColors = {
		Active: {
			bg: "rgba(22,101,52,0.1)",
			text: "#166534",
			dot: "#16a34a"
		},
		Inactive: {
			bg: "rgba(107,114,128,0.1)",
			text: "#374151",
			dot: "#6b7280"
		},
		Draft: {
			bg: "rgba(180,83,9,0.1)",
			text: "#92400e",
			dot: "#d97706"
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "flex-start",
				justifyContent: "space-between",
				marginBottom: "1.4rem",
				flexWrap: "wrap",
				gap: 12
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					alignItems: "center",
					gap: 10,
					marginBottom: 5
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					width: 3,
					height: 24,
					borderRadius: 2,
					background: `linear-gradient(${MAROON}, ${GOLD})`,
					flexShrink: 0
				} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					style: {
						fontFamily: "'Playfair Display', serif",
						fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
						fontWeight: 800,
						color: MAROON,
						margin: 0
					},
					children: "Downloads"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: {
					fontSize: "0.76rem",
					color: "rgba(74,9,24,0.45)",
					marginLeft: 13,
					fontFamily: "Inter, sans-serif"
				},
				children: "Manage downloadable files visible on the public Downloads page"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
				whileHover: {
					y: -2,
					boxShadow: "0 10px 28px rgba(74,9,24,0.36)"
				},
				whileTap: { scale: .97 },
				onClick: onAdd,
				style: {
					display: "flex",
					alignItems: "center",
					gap: 7,
					background: `linear-gradient(135deg, ${MAROON} 0%, #7C1A32 100%)`,
					color: "#fff",
					border: "none",
					borderRadius: 11,
					padding: "9px 18px",
					fontSize: "0.8rem",
					fontWeight: 600,
					cursor: "pointer",
					fontFamily: "Inter, sans-serif",
					boxShadow: `0 4px 16px rgba(74,9,24,0.3)`
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPlus, { size: 14 }), " Add Download"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				position: "relative",
				marginBottom: "1rem"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiSearch, {
				size: 14,
				style: {
					position: "absolute",
					left: 11,
					top: "50%",
					transform: "translateY(-50%)",
					color: "rgba(74,9,24,0.38)",
					pointerEvents: "none"
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: search,
				onChange: (e) => setSearch(e.target.value),
				placeholder: "Search downloads…",
				style: {
					...dlInputStyle,
					paddingLeft: 32
				}
			})]
		}),
		filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				textAlign: "center",
				padding: "3rem 1rem",
				color: "rgba(74,9,24,0.4)",
				fontFamily: "Inter, sans-serif",
				fontSize: "0.9rem"
			},
			children: rows.length === 0 ? "No downloads yet. Click \"Add Download\" to publish the first file." : "No matches found."
		}),
		filtered.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				overflowX: "auto",
				borderRadius: 12,
				border: "1px solid rgba(74,9,24,0.08)"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				style: {
					width: "100%",
					borderCollapse: "collapse",
					fontFamily: "Inter, sans-serif",
					fontSize: "0.83rem"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
					style: {
						background: "rgba(74,9,24,0.04)",
						borderBottom: "1px solid rgba(74,9,24,0.08)"
					},
					children: [
						"Title",
						"Category",
						"Type",
						"Date",
						"Status",
						""
					].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						style: {
							padding: "10px 12px",
							textAlign: "left",
							color: "rgba(74,9,24,0.5)",
							fontWeight: 600,
							fontSize: "0.72rem",
							textTransform: "uppercase",
							letterSpacing: "0.05em",
							whiteSpace: "nowrap"
						},
						children: h
					}, h))
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((r, i) => {
					const sc = statusColors[r.status] || statusColors.Draft;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						style: {
							background: i % 2 === 0 ? "#fff" : "rgba(74,9,24,0.016)",
							borderBottom: "1px solid rgba(74,9,24,0.06)",
							transition: "background 0.15s"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								style: {
									padding: "10px 12px",
									color: MAROON,
									fontWeight: 600,
									maxWidth: 220
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										overflow: "hidden",
										textOverflow: "ellipsis",
										whiteSpace: "nowrap"
									},
									children: r.titleEn || r.title || "—"
								}), r.titleSi && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: "0.7rem",
										color: "rgba(74,9,24,0.4)",
										marginTop: 2,
										fontFamily: "'Noto Sans Sinhala', sans-serif"
									},
									children: r.titleSi
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									padding: "10px 12px",
									color: "rgba(74,9,24,0.65)",
									whiteSpace: "nowrap"
								},
								children: r.category || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: { padding: "10px 12px" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										background: `${GOLD}18`,
										color: GOLD,
										border: `1px solid ${GOLD}30`,
										borderRadius: 5,
										padding: "2px 8px",
										fontSize: "0.68rem",
										fontWeight: 700,
										fontFamily: "DM Mono, monospace",
										letterSpacing: "0.06em"
									},
									children: (r.fileType || "—").toUpperCase()
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									padding: "10px 12px",
									color: "rgba(74,9,24,0.5)",
									whiteSpace: "nowrap"
								},
								children: r.date || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: { padding: "10px 12px" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									style: {
										background: sc.bg,
										color: sc.text,
										borderRadius: 20,
										padding: "3px 10px",
										fontSize: "0.7rem",
										fontWeight: 600,
										display: "inline-flex",
										alignItems: "center",
										gap: 5,
										whiteSpace: "nowrap"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
										width: 6,
										height: 6,
										borderRadius: "50%",
										background: sc.dot,
										flexShrink: 0
									} }), r.status || "Draft"]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: { padding: "10px 12px" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										gap: 6
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
										whileTap: { scale: .93 },
										onClick: () => onEdit(r),
										style: {
											background: "none",
											border: `1px solid ${GOLD}40`,
											borderRadius: 7,
											padding: "5px 8px",
											cursor: "pointer",
											color: GOLD,
											display: "flex",
											alignItems: "center"
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEdit2, { size: 13 })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
										whileTap: { scale: .93 },
										onClick: () => onDelete(r.id),
										style: {
											background: "none",
											border: "1px solid rgba(220,38,38,0.25)",
											borderRadius: 7,
											padding: "5px 8px",
											cursor: "pointer",
											color: "#dc2626",
											display: "flex",
											alignItems: "center"
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, { size: 13 })
									})]
								})
							})
						]
					}, r.id);
				}) })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			style: {
				fontSize: "0.72rem",
				color: "rgba(74,9,24,0.38)",
				marginTop: 10,
				fontFamily: "Inter, sans-serif"
			},
			children: [
				filtered.length,
				" of ",
				rows.length,
				" items shown · Only ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Active" }),
				" items appear on the public Downloads page"
			]
		})
	] });
}
function DownloadFormModal({ initialData, onClose, onSave }) {
	const isEdit = !!initialData;
	const [form, setForm] = (0, import_react.useState)({
		titleEn: initialData?.titleEn || "",
		titleSi: initialData?.titleSi || "",
		titleTa: initialData?.titleTa || "",
		description: initialData?.description || "",
		category: initialData?.category || "Reports",
		fileUrl: initialData?.fileUrl || "",
		fileName: initialData?.fileName || "",
		fileType: initialData?.fileType || "PDF",
		fileSize: initialData?.fileSize || "",
		status: initialData?.status || "Active",
		downloadAccess: initialData?.downloadAccess || "Everyone"
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const set = (k, v) => setForm((f) => ({
		...f,
		[k]: v
	}));
	const validate = () => {
		const e = {};
		if (!form.titleEn.trim()) e.titleEn = "English title is required";
		if (!form.fileUrl.trim()) e.fileUrl = "File URL is required";
		if (!form.category) e.category = "Category is required";
		setErrors(e);
		return Object.keys(e).length === 0;
	};
	const handleSave = () => {
		if (validate()) onSave(form);
	};
	const inputStyle = {
		...dlInputStyle,
		marginTop: 2
	};
	const selectStyle = {
		...dlSelectStyle,
		marginTop: 2
	};
	const fieldStyle = {
		display: "flex",
		flexDirection: "column",
		gap: 0
	};
	const errStyle = {
		fontSize: "0.72rem",
		color: "#dc2626",
		marginTop: 3,
		fontFamily: "Inter, sans-serif"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		onClick: onClose,
		style: {
			position: "fixed",
			inset: 0,
			background: "rgba(0,0,0,0.52)",
			zIndex: 100,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			padding: "1rem"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .93,
				opacity: 0,
				y: 20
			},
			animate: {
				scale: 1,
				opacity: 1,
				y: 0
			},
			exit: {
				scale: .93,
				opacity: 0,
				y: 20
			},
			transition: {
				duration: .22,
				ease: [
					.16,
					1,
					.3,
					1
				]
			},
			onClick: (e) => e.stopPropagation(),
			style: {
				background: "#fff",
				borderRadius: 20,
				padding: "clamp(1.25rem, 3vw, 1.75rem)",
				maxWidth: 600,
				width: "100%",
				maxHeight: "90vh",
				overflowY: "auto",
				boxShadow: "0 24px 64px rgba(0,0,0,0.24)"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						marginBottom: "1.5rem"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							alignItems: "center",
							gap: 12
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								width: 42,
								height: 42,
								borderRadius: 12,
								background: `${MAROON}12`,
								border: `1px solid ${MAROON}20`,
								display: "flex",
								alignItems: "center",
								justifyContent: "center"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiDownload, {
								size: 18,
								color: MAROON
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							style: {
								fontFamily: "'Playfair Display', serif",
								fontSize: "1.1rem",
								fontWeight: 800,
								color: MAROON,
								margin: 0
							},
							children: isEdit ? "Edit Download" : "Add Download"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontSize: "0.72rem",
								color: "rgba(74,9,24,0.45)",
								margin: "2px 0 0",
								fontFamily: "Inter, sans-serif"
							},
							children: isEdit ? "Update the download item" : "Publish a new downloadable file"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						style: {
							background: "none",
							border: "none",
							cursor: "pointer",
							color: "rgba(74,9,24,0.45)",
							padding: 4,
							borderRadius: 6,
							display: "flex",
							alignItems: "center"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 18 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: "1rem"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								...fieldStyle,
								gridColumn: "1 / -1"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									style: dlLabelStyle,
									children: ["Title (English) ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { color: "#dc2626" },
										children: "*"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: form.titleEn,
									onChange: (e) => set("titleEn", e.target.value),
									placeholder: "Enter English title",
									style: {
										...inputStyle,
										borderColor: errors.titleEn ? "#dc2626" : void 0
									}
								}),
								errors.titleEn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: errStyle,
									children: errors.titleEn
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: fieldStyle,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								style: dlLabelStyle,
								children: "Title (Sinhala)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.titleSi,
								onChange: (e) => set("titleSi", e.target.value),
								placeholder: "සිංහල මාතෘකාව",
								style: {
									...inputStyle,
									fontFamily: "'Noto Sans Sinhala', sans-serif"
								}
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: fieldStyle,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								style: dlLabelStyle,
								children: "Title (Tamil)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.titleTa,
								onChange: (e) => set("titleTa", e.target.value),
								placeholder: "தமிழ் தலைப்பு",
								style: {
									...inputStyle,
									fontFamily: "'Noto Sans Tamil', sans-serif"
								}
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								...fieldStyle,
								gridColumn: "1 / -1"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								style: dlLabelStyle,
								children: "Description"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: form.description,
								onChange: (e) => set("description", e.target.value),
								placeholder: "Brief description of this document (optional)",
								rows: 2,
								style: {
									...inputStyle,
									resize: "vertical",
									lineHeight: 1.6
								}
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								...fieldStyle,
								gridColumn: "1 / -1"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									style: dlLabelStyle,
									children: ["File URL ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { color: "#dc2626" },
										children: "*"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: form.fileUrl,
									onChange: (e) => set("fileUrl", e.target.value),
									placeholder: "https://drive.google.com/… or direct file URL",
									style: {
										...inputStyle,
										borderColor: errors.fileUrl ? "#dc2626" : void 0
									}
								}),
								errors.fileUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: errStyle,
									children: errors.fileUrl
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: "0.69rem",
										color: "rgba(74,9,24,0.38)",
										marginTop: 3,
										fontFamily: "Inter, sans-serif"
									},
									children: "Use a Google Drive share link, OneDrive link, or direct URL to the file."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: fieldStyle,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								style: dlLabelStyle,
								children: "File Name (download as)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.fileName,
								onChange: (e) => set("fileName", e.target.value),
								placeholder: "annual-report-2025.pdf",
								style: inputStyle
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: fieldStyle,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								style: dlLabelStyle,
								children: "File Type"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: { position: "relative" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: form.fileType,
									onChange: (e) => set("fileType", e.target.value),
									style: selectStyle,
									children: DL_FILE_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: t,
										children: t
									}, t))
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: fieldStyle,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									style: dlLabelStyle,
									children: ["Category ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { color: "#dc2626" },
										children: "*"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: { position: "relative" },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: form.category,
										onChange: (e) => set("category", e.target.value),
										style: {
											...selectStyle,
											borderColor: errors.category ? "#dc2626" : void 0
										},
										children: DL_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: c,
											children: c
										}, c))
									})
								}),
								errors.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: errStyle,
									children: errors.category
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: fieldStyle,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								style: dlLabelStyle,
								children: "Status"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: { position: "relative" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: form.status,
									onChange: (e) => set("status", e.target.value),
									style: selectStyle,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Active",
											children: "Active (visible)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Draft",
											children: "Draft (hidden)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Inactive",
											children: "Inactive (hidden)"
										})
									]
								})
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						justifyContent: "flex-end",
						gap: 10,
						marginTop: "1.5rem",
						paddingTop: "1.25rem",
						borderTop: "1px solid rgba(74,9,24,0.08)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
						whileTap: { scale: .97 },
						onClick: onClose,
						style: {
							background: "none",
							border: "1px solid rgba(74,9,24,0.18)",
							borderRadius: 9,
							padding: "9px 20px",
							fontSize: "0.84rem",
							fontWeight: 600,
							cursor: "pointer",
							color: "rgba(74,9,24,0.6)",
							fontFamily: "Inter, sans-serif"
						},
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						whileHover: { y: -1 },
						whileTap: { scale: .97 },
						onClick: handleSave,
						style: {
							background: `linear-gradient(135deg, ${MAROON}, #7c1730)`,
							border: "none",
							borderRadius: 9,
							padding: "9px 22px",
							fontSize: "0.84rem",
							fontWeight: 600,
							cursor: "pointer",
							color: "#fff",
							fontFamily: "Inter, sans-serif",
							boxShadow: `0 4px 14px rgba(74,9,24,0.28)`,
							display: "flex",
							alignItems: "center",
							gap: 7
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheck, { size: 14 }), isEdit ? "Save Changes" : "Add Download"]
					})]
				})
			]
		})
	});
}
var API_BASE = "";
var COMPLAINT_STATUS_OPTIONS = [
	"New",
	"In Review",
	"Resolved",
	"Closed"
];
var COMPLAINT_STATUS_STYLE = {
	New: {
		bg: "rgba(239,68,68,0.1)",
		text: "#b91c1c",
		dot: "#ef4444"
	},
	"In Review": {
		bg: "rgba(234,179,8,0.1)",
		text: "#854d0e",
		dot: "#eab308"
	},
	Resolved: {
		bg: "rgba(22,163,74,0.1)",
		text: "#166534",
		dot: "#16a34a"
	},
	Closed: {
		bg: "rgba(107,114,128,0.1)",
		text: "#374151",
		dot: "#6b7280"
	}
};
var COMPLAINT_TYPE_COLORS = {
	"Complaint": {
		bg: "rgba(239,68,68,0.08)",
		text: "#b91c1c"
	},
	"Suggestion": {
		bg: "rgba(16,185,129,0.08)",
		text: "#065f46"
	},
	"General Inquiry": {
		bg: "rgba(59,130,246,0.08)",
		text: "#1e40af"
	},
	"Service Feedback": {
		bg: "rgba(139,92,246,0.08)",
		text: "#4c1d95"
	},
	"Right to Information (RTI)": {
		bg: "rgba(245,158,11,0.08)",
		text: "#78350f"
	}
};
function ComplaintsSection() {
	const [items, setItems] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [fetchError, setFetchError] = (0, import_react.useState)("");
	const [search, setSearch] = (0, import_react.useState)("");
	const [filterType, setFilterType] = (0, import_react.useState)("");
	const [filterStatus, setFilterStatus] = (0, import_react.useState)("");
	const [filterDept, setFilterDept] = (0, import_react.useState)("");
	const [viewItem, setViewItem] = (0, import_react.useState)(null);
	const fetchComplaints = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setFetchError("");
		try {
			const res = await fetch(`${API_BASE}/api/contact`);
			if (!res.ok) throw new Error("Failed to load submissions.");
			setItems(await res.json());
		} catch (e) {
			setFetchError(e.message);
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		fetchComplaints();
	}, [fetchComplaints]);
	const updateStatus = async (id, status) => {
		try {
			if (!(await fetch(`${API_BASE}/api/contact/${id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ status })
			})).ok) throw new Error();
			setItems((prev) => prev.map((c) => c.id === id ? {
				...c,
				status
			} : c));
			setViewItem((v) => v?.id === id ? {
				...v,
				status
			} : v);
			toast.success(`Status updated to "${status}"`);
		} catch {
			toast.error("Failed to update status.");
		}
	};
	const deleteItem = async (id) => {
		if (!confirm("Delete this submission? This cannot be undone.")) return;
		try {
			if (!(await fetch(`${API_BASE}/api/contact/${id}`, { method: "DELETE" })).ok) throw new Error();
			setItems((prev) => prev.filter((c) => c.id !== id));
			setViewItem((v) => v?.id === id ? null : v);
			toast.success("Submission deleted.");
		} catch {
			toast.error("Failed to delete submission.");
		}
	};
	const filtered = items.filter((c) => {
		const q = search.toLowerCase();
		const matchSearch = !q || [
			c.name,
			c.email,
			c.subject,
			c.type,
			c.dept,
			c.message
		].some((v) => (v || "").toLowerCase().includes(q));
		const matchType = !filterType || c.type === filterType;
		const matchStatus = !filterStatus || c.status === filterStatus;
		const matchDept = !filterDept || c.dept === filterDept;
		return matchSearch && matchType && matchStatus && matchDept;
	});
	const types = [...new Set(items.map((c) => c.type).filter(Boolean))];
	const depts = [
		"Development",
		"Accounts",
		"Administration"
	];
	const statCounts = {
		total: items.length,
		new: items.filter((c) => c.status === "New").length,
		inReview: items.filter((c) => c.status === "In Review").length,
		resolved: items.filter((c) => c.status === "Resolved").length
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				marginBottom: "1.5rem",
				display: "flex",
				alignItems: "flex-start",
				justifyContent: "space-between",
				flexWrap: "wrap",
				gap: 12
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					alignItems: "center",
					gap: 10,
					marginBottom: 5
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					width: 3,
					height: 28,
					borderRadius: 2,
					background: `linear-gradient(${MAROON}, ${GOLD})`,
					flexShrink: 0
				} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					style: {
						fontFamily: "'Playfair Display', serif",
						fontSize: "1.45rem",
						fontWeight: 800,
						color: MAROON,
						margin: 0
					},
					children: "Complaints & Feedback"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: {
					fontSize: "0.76rem",
					color: "rgba(74,9,24,0.45)",
					marginLeft: 13
				},
				children: "Submissions received through the public contact form"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
				whileHover: {
					y: -1,
					boxShadow: "0 6px 18px rgba(74,9,24,0.14)"
				},
				whileTap: { scale: .97 },
				onClick: fetchComplaints,
				style: {
					display: "flex",
					alignItems: "center",
					gap: 7,
					padding: "9px 16px",
					borderRadius: 10,
					border: "1px solid rgba(74,9,24,0.12)",
					background: "#fff",
					color: MAROON,
					fontSize: "0.8rem",
					fontWeight: 600,
					cursor: "pointer",
					fontFamily: "Inter, sans-serif",
					transition: "all 0.15s",
					boxShadow: "0 2px 10px rgba(74,9,24,0.06)"
				},
				onMouseEnter: (e) => e.currentTarget.style.background = "rgba(74,9,24,0.04)",
				onMouseLeave: (e) => e.currentTarget.style.background = "#fff",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiRefreshCw, { size: 13 }), " Refresh"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				display: "grid",
				gridTemplateColumns: "repeat(4,1fr)",
				gap: 12,
				marginBottom: "1.4rem"
			},
			children: [
				{
					label: "Total",
					value: statCounts.total,
					color: MAROON,
					bg: `linear-gradient(135deg, ${MAROON} 0%, #7C1A32 100%)`,
					featured: true
				},
				{
					label: "New",
					value: statCounts.new,
					color: "#ef4444",
					bg: null
				},
				{
					label: "In Review",
					value: statCounts.inReview,
					color: "#d97706",
					bg: null
				},
				{
					label: "Resolved",
					value: statCounts.resolved,
					color: "#16a34a",
					bg: null
				}
			].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				whileHover: {
					y: -2,
					boxShadow: s.featured ? "0 10px 32px rgba(74,9,24,0.25)" : "0 6px 20px rgba(74,9,24,0.1)"
				},
				style: {
					background: s.featured ? s.bg : "#fff",
					borderRadius: 16,
					padding: "1.1rem 1.3rem",
					border: s.featured ? "1px solid rgba(199,154,43,0.25)" : "1px solid rgba(74,9,24,0.07)",
					boxShadow: s.featured ? "0 4px 18px rgba(74,9,24,0.18)" : "0 2px 10px rgba(74,9,24,0.05)",
					position: "relative",
					overflow: "hidden",
					transition: "box-shadow 0.2s"
				},
				children: [
					s.featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						height: 2,
						background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontSize: "1.75rem",
							fontWeight: 900,
							lineHeight: 1,
							color: s.featured ? "#fff" : s.color,
							fontFamily: "'Cinzel', serif"
						},
						children: String(s.value).padStart(2, "0")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontSize: "0.7rem",
							marginTop: 6,
							fontWeight: 600,
							color: s.featured ? "rgba(255,255,255,0.65)" : "rgba(74,9,24,0.45)"
						},
						children: s.label
					})
				]
			}, s.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				gap: 10,
				marginBottom: "1rem",
				flexWrap: "wrap"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						position: "relative",
						flex: 1,
						minWidth: 200
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiSearch, {
						size: 13,
						style: {
							position: "absolute",
							left: 11,
							top: "50%",
							transform: "translateY(-50%)",
							color: "rgba(74,9,24,0.35)",
							pointerEvents: "none"
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: search,
						onChange: (e) => setSearch(e.target.value),
						placeholder: "Search name, email, subject…",
						style: {
							width: "100%",
							paddingLeft: 32,
							paddingRight: 12,
							paddingTop: 8,
							paddingBottom: 8,
							border: "1px solid rgba(74,9,24,0.14)",
							borderRadius: 10,
							fontFamily: "Inter, sans-serif",
							fontSize: "0.82rem",
							color: MAROON,
							background: "#fff",
							outline: "none",
							boxSizing: "border-box"
						}
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: filterType,
					onChange: (e) => setFilterType(e.target.value),
					style: {
						padding: "8px 12px",
						border: "1px solid rgba(74,9,24,0.14)",
						borderRadius: 10,
						fontFamily: "Inter, sans-serif",
						fontSize: "0.82rem",
						color: filterType ? MAROON : "rgba(74,9,24,0.4)",
						background: "#fff",
						cursor: "pointer"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "All Types"
					}), types.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: t,
						children: t
					}, t))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: filterStatus,
					onChange: (e) => setFilterStatus(e.target.value),
					style: {
						padding: "8px 12px",
						border: "1px solid rgba(74,9,24,0.14)",
						borderRadius: 10,
						fontFamily: "Inter, sans-serif",
						fontSize: "0.82rem",
						color: filterStatus ? MAROON : "rgba(74,9,24,0.4)",
						background: "#fff",
						cursor: "pointer"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "All Statuses"
					}), COMPLAINT_STATUS_OPTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: s,
						children: s
					}, s))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: filterDept,
					onChange: (e) => setFilterDept(e.target.value),
					style: {
						padding: "8px 12px",
						border: "1px solid rgba(74,9,24,0.14)",
						borderRadius: 10,
						fontFamily: "Inter, sans-serif",
						fontSize: "0.82rem",
						color: filterDept ? MAROON : "rgba(74,9,24,0.4)",
						background: "#fff",
						cursor: "pointer"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "All Divisions"
					}), depts.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: d,
						children: d
					}, d))]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				background: "#fff",
				borderRadius: 16,
				border: "1px solid rgba(74,9,24,0.08)",
				overflow: "hidden",
				boxShadow: "0 2px 12px rgba(74,9,24,0.05)"
			},
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					padding: "3rem",
					textAlign: "center",
					color: "rgba(74,9,24,0.35)",
					fontSize: "0.85rem"
				},
				children: "Loading submissions…"
			}) : fetchError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					padding: "3rem",
					textAlign: "center"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAlertCircle, {
						size: 28,
						style: {
							color: "#ef4444",
							display: "block",
							margin: "0 auto 8px"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							color: "#b91c1c",
							fontSize: "0.85rem",
							marginBottom: 12
						},
						children: fetchError
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: fetchComplaints,
						style: {
							padding: "7px 18px",
							borderRadius: 8,
							border: "1px solid rgba(74,9,24,0.2)",
							background: "#fff",
							cursor: "pointer",
							fontSize: "0.8rem",
							color: MAROON,
							fontFamily: "Inter, sans-serif"
						},
						children: "Retry"
					})
				]
			}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					padding: "3rem",
					textAlign: "center",
					color: "rgba(74,9,24,0.35)",
					fontSize: "0.85rem"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMessageSquare, {
					size: 28,
					style: {
						display: "block",
						margin: "0 auto 8px",
						opacity: .25
					}
				}), items.length === 0 ? "No submissions received yet." : "No submissions match your filters."]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { overflowX: "auto" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					style: {
						width: "100%",
						borderCollapse: "collapse",
						fontSize: "0.82rem"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						style: {
							borderBottom: "1px solid rgba(74,9,24,0.08)",
							background: "rgba(74,9,24,0.02)"
						},
						children: [
							"Date",
							"Name",
							"Type",
							"Division",
							"Subject",
							"Status",
							"Actions"
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							style: {
								padding: "10px 14px",
								textAlign: "left",
								fontFamily: "'Cinzel', serif",
								fontSize: "0.65rem",
								letterSpacing: "0.08em",
								color: "rgba(74,9,24,0.45)",
								fontWeight: 700,
								whiteSpace: "nowrap"
							},
							children: h
						}, h))
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((c, i) => {
						const sc = COMPLAINT_STATUS_STYLE[c.status] || COMPLAINT_STATUS_STYLE.New;
						const tc = COMPLAINT_TYPE_COLORS[c.type] || {};
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							style: {
								borderBottom: i < filtered.length - 1 ? "1px solid rgba(74,9,24,0.05)" : "none",
								transition: "background 0.12s"
							},
							onMouseEnter: (e) => e.currentTarget.style.background = "rgba(74,9,24,0.02)",
							onMouseLeave: (e) => e.currentTarget.style.background = "transparent",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: {
										padding: "10px 14px",
										color: "rgba(74,9,24,0.45)",
										whiteSpace: "nowrap"
									},
									children: new Date(c.createdAt).toLocaleDateString("en-LK")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									style: { padding: "10px 14px" },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontWeight: 600,
											color: MAROON
										},
										children: c.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontSize: "0.72rem",
											color: "rgba(74,9,24,0.45)"
										},
										children: c.email
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: { padding: "10px 14px" },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											background: tc.bg || "rgba(74,9,24,0.06)",
											color: tc.text || MAROON,
											padding: "2px 8px",
											borderRadius: 6,
											fontSize: "0.72rem",
											fontWeight: 600,
											whiteSpace: "nowrap"
										},
										children: c.type
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: {
										padding: "10px 14px",
										whiteSpace: "nowrap"
									},
									children: c.dept ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											background: "rgba(74,9,24,0.06)",
											color: MAROON,
											padding: "2px 8px",
											borderRadius: 6,
											fontSize: "0.72rem",
											fontWeight: 600
										},
										children: c.dept
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											fontSize: "0.72rem",
											color: "rgba(74,9,24,0.25)"
										},
										children: "—"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: {
										padding: "10px 14px",
										maxWidth: 200
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											overflow: "hidden",
											textOverflow: "ellipsis",
											whiteSpace: "nowrap",
											color: MAROON
										},
										children: c.subject
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: { padding: "10px 14px" },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: c.status,
										onChange: (e) => updateStatus(c.id, e.target.value),
										style: {
											background: sc.bg,
											color: sc.text,
											border: "none",
											borderRadius: 6,
											padding: "3px 8px",
											fontSize: "0.72rem",
											fontWeight: 600,
											cursor: "pointer",
											fontFamily: "Inter, sans-serif"
										},
										children: COMPLAINT_STATUS_OPTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: s,
											children: s
										}, s))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: { padding: "10px 14px" },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											gap: 6
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setViewItem(c),
											title: "View details",
											style: {
												padding: "5px 8px",
												borderRadius: 7,
												border: "1px solid rgba(74,9,24,0.14)",
												background: "#fff",
												color: MAROON,
												cursor: "pointer",
												display: "flex",
												alignItems: "center",
												transition: "all 0.12s"
											},
											onMouseEnter: (e) => e.currentTarget.style.background = "rgba(74,9,24,0.05)",
											onMouseLeave: (e) => e.currentTarget.style.background = "#fff",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEye, { size: 13 })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => deleteItem(c.id),
											title: "Delete",
											style: {
												padding: "5px 8px",
												borderRadius: 7,
												border: "1px solid rgba(220,38,38,0.18)",
												background: "#fff",
												color: "#dc2626",
												cursor: "pointer",
												display: "flex",
												alignItems: "center",
												transition: "all 0.12s"
											},
											onMouseEnter: (e) => e.currentTarget.style.background = "rgba(220,38,38,0.06)",
											onMouseLeave: (e) => e.currentTarget.style.background = "#fff",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, { size: 13 })
										})]
									})
								})
							]
						}, c.id);
					}) })]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: viewItem && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			style: {
				position: "fixed",
				inset: 0,
				background: "rgba(0,0,0,0.48)",
				zIndex: 100,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "1rem"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					scale: .94,
					opacity: 0,
					y: 20
				},
				animate: {
					scale: 1,
					opacity: 1,
					y: 0
				},
				exit: {
					scale: .94,
					opacity: 0,
					y: 20
				},
				transition: {
					duration: .2,
					ease: [
						.16,
						1,
						.3,
						1
					]
				},
				style: {
					background: "#fff",
					borderRadius: 20,
					maxWidth: 560,
					width: "100%",
					maxHeight: "90vh",
					overflowY: "auto",
					boxShadow: "0 24px 64px rgba(0,0,0,0.22)"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							padding: "1.25rem 1.5rem",
							borderBottom: "1px solid rgba(74,9,24,0.08)",
							display: "flex",
							alignItems: "flex-start",
							justifyContent: "space-between",
							gap: 12
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 8,
								marginBottom: 4
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									background: (COMPLAINT_TYPE_COLORS[viewItem.type] || {}).bg || "rgba(74,9,24,0.06)",
									color: (COMPLAINT_TYPE_COLORS[viewItem.type] || {}).text || MAROON,
									padding: "2px 9px",
									borderRadius: 6,
									fontSize: "0.72rem",
									fontWeight: 600
								},
								children: viewItem.type
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								style: {
									fontSize: "0.72rem",
									color: "rgba(74,9,24,0.38)"
								},
								children: ["#", viewItem.id]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							style: {
								fontFamily: "'Playfair Display', serif",
								fontSize: "1.05rem",
								fontWeight: 800,
								color: MAROON,
								margin: 0
							},
							children: viewItem.subject
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setViewItem(null),
							style: {
								background: "none",
								border: "none",
								cursor: "pointer",
								color: "rgba(74,9,24,0.4)",
								padding: 4,
								flexShrink: 0
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 18 })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							padding: "1rem 1.5rem",
							borderBottom: "1px solid rgba(74,9,24,0.06)",
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							gap: 12
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 8
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									width: 32,
									height: 32,
									borderRadius: "50%",
									background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									color: "#fff",
									fontSize: "0.75rem",
									fontWeight: 800,
									flexShrink: 0
								},
								children: viewItem.name[0].toUpperCase()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontWeight: 600,
									color: MAROON,
									fontSize: "0.85rem"
								},
								children: viewItem.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "0.7rem",
									color: "rgba(74,9,24,0.45)"
								},
								children: new Date(viewItem.createdAt).toLocaleString("en-LK", { timeZone: "Asia/Colombo" })
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								flexDirection: "column",
								gap: 4
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: `mailto:${viewItem.email}`,
									style: {
										display: "flex",
										alignItems: "center",
										gap: 5,
										color: MAROON,
										fontSize: "0.78rem",
										textDecoration: "none"
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMail, {
											size: 12,
											style: { color: GOLD }
										}),
										" ",
										viewItem.email
									]
								}),
								viewItem.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: `tel:${viewItem.phone}`,
									style: {
										display: "flex",
										alignItems: "center",
										gap: 5,
										color: MAROON,
										fontSize: "0.78rem",
										textDecoration: "none"
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPhone, {
											size: 12,
											style: { color: GOLD }
										}),
										" ",
										viewItem.phone
									]
								}),
								viewItem.dept ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										alignItems: "center",
										gap: 5,
										fontSize: "0.75rem"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											color: "rgba(74,9,24,0.45)",
											fontWeight: 600
										},
										children: "Dept:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											background: "rgba(74,9,24,0.06)",
											color: MAROON,
											padding: "1px 8px",
											borderRadius: 5,
											fontWeight: 600
										},
										children: viewItem.dept
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: "0.72rem",
										color: "rgba(74,9,24,0.3)"
									},
									children: "No department selected"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							padding: "1.25rem 1.5rem",
							borderBottom: "1px solid rgba(74,9,24,0.06)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontSize: "0.7rem",
								fontWeight: 700,
								color: GOLD,
								letterSpacing: "0.08em",
								textTransform: "uppercase",
								marginBottom: 8
							},
							children: "Message"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontSize: "0.88rem",
								color: MAROON,
								lineHeight: 1.75,
								whiteSpace: "pre-wrap",
								margin: 0
							},
							children: viewItem.message
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							padding: "1rem 1.5rem",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							gap: 12,
							flexWrap: "wrap"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 6,
								flexWrap: "wrap"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: "0.78rem",
									color: "rgba(74,9,24,0.5)",
									fontWeight: 600
								},
								children: "Status:"
							}), COMPLAINT_STATUS_OPTIONS.map((s) => {
								const sc2 = COMPLAINT_STATUS_STYLE[s];
								const isActive = viewItem.status === s;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => updateStatus(viewItem.id, s),
									style: {
										padding: "4px 12px",
										borderRadius: 8,
										fontSize: "0.72rem",
										fontWeight: 600,
										cursor: "pointer",
										border: isActive ? "none" : "1px solid rgba(74,9,24,0.14)",
										background: isActive ? sc2.bg : "transparent",
										color: isActive ? sc2.text : "rgba(74,9,24,0.45)",
										fontFamily: "Inter, sans-serif",
										transition: "all 0.12s"
									},
									children: s
								}, s);
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: 8
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `mailto:${viewItem.email}?subject=Re: ${encodeURIComponent(viewItem.subject)} (Ref #${viewItem.id})`,
								style: {
									display: "flex",
									alignItems: "center",
									gap: 6,
									padding: "8px 14px",
									borderRadius: 10,
									fontSize: "0.8rem",
									fontWeight: 600,
									background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`,
									color: "#fff",
									textDecoration: "none",
									boxShadow: "0 3px 10px rgba(74,9,24,0.25)"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMail, { size: 13 }), " Reply"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => deleteItem(viewItem.id),
								style: {
									display: "flex",
									alignItems: "center",
									gap: 6,
									padding: "8px 14px",
									borderRadius: 10,
									fontSize: "0.8rem",
									fontWeight: 600,
									background: "rgba(220,38,38,0.08)",
									color: "#dc2626",
									border: "1px solid rgba(220,38,38,0.18)",
									cursor: "pointer",
									fontFamily: "Inter, sans-serif"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, { size: 13 }), " Delete"]
							})]
						})]
					})
				]
			})
		}) })
	] });
}
var POLICY_SECTIONS = [
	{
		n: "1",
		title: "Purpose of This Policy",
		body: "The purpose of this policy is to protect the integrity and security of the official website, ensure all website modifications are properly authorized, establish a secure development and deployment process, maintain accurate records of all updates and modifications, and prevent unauthorized publishing or misuse of source code and system resources."
	},
	{
		n: "2",
		title: "Authorized Personnel",
		body: "Only officially approved personnel are permitted to access website administration systems, modify website content or source code, upload files or deploy updates, and manage databases or hosting systems. All developers, maintainers, and technical staff must receive proper authorization before performing any work on the website."
	},
	{
		n: "3",
		title: "Mandatory Approval Requirement",
		highlight: "All website updates, developments, modifications, maintenance activities, or system changes must receive prior written or official approval from the Deputy Chief Secretary – (Planning & Monitoring) before any development or modification process begins. No developer, maintainer, or technical officer is permitted to perform any modification without official approval."
	},
	{
		n: "4",
		title: "Development and Modification Procedures",
		steps: [
			{
				label: "Step 1 — Approval",
				text: "Developer submits the requested modification details. Approval must be obtained from the Deputy Chief Secretary – (Planning & Monitoring)."
			},
			{
				label: "Step 2 — Development Process",
				text: "Changes must be implemented only within the authorized development environment. Direct modifications to the live/public website are strictly prohibited."
			},
			{
				label: "Step 3 — Change Recording",
				text: "All updates must be individually recorded: date & time, developer name, description, affected sections, version details, and approval reference. Records must be securely maintained for auditing."
			}
		]
	},
	{
		n: "5",
		title: "Testing and Quality Assurance Policy",
		body: "After development is completed, developers are NOT allowed to directly publish the website to the public. The completed development must be submitted for testing and review. The system must undergo:",
		list: [
			"Functional testing",
			"Security testing",
			"Performance testing",
			"Content verification",
			"Compatibility testing"
		],
		listNote: "A formal Testing Document / Testing Report must be attached and submitted during the testing process."
	},
	{
		n: "6",
		title: "Final Approval and Public Release",
		body: "The website or modification can only be published after all testing processes are successfully completed, testing reports are reviewed, and final approval is granted by the Deputy Chief Secretary – (Planning & Monitoring). Without final approval, no system, update, or modification may be released to the public environment."
	},
	{
		n: "7",
		title: "Source Code Protection Policy",
		highlight: "The official website source code, design structure, database systems, configurations, and internal resources must remain confidential, cannot be copied, reused, distributed, or shared, cannot be used as templates for other projects, and cannot be resold, transferred, or reproduced for personal or commercial purposes. This restriction applies even after project completion or termination of employment/contract."
	},
	{
		n: "8",
		title: "Data Privacy and Confidentiality",
		body: "All developers and maintainers must protect official government data, maintain confidentiality of internal systems, prevent unauthorized access to sensitive information, and avoid sharing credentials, server access, or confidential documents. Any data breach or unauthorized disclosure must be reported immediately to the administration."
	},
	{
		n: "9",
		title: "Security Responsibilities",
		body: "Developers and maintainers must ensure secure coding practices, protection against cyber threats, proper password management, regular system updates and backups, and restricted access control mechanisms. Unauthorized software, plugins, or third-party integrations are prohibited unless officially approved."
	},
	{
		n: "10",
		title: "Backup and Recovery",
		body: "Before implementing major modifications, full system backups must be created, database backups must be securely stored, and recovery procedures must be verified. This is required to ensure system restoration in case of failure or security incidents."
	},
	{
		n: "11",
		title: "Audit and Monitoring",
		body: "The Secretariat reserves the right to monitor all website activities, review modification logs, audit developer actions and system access, and investigate security incidents or unauthorized changes. All technical staff must cooperate during official audits or investigations."
	},
	{
		n: "12",
		title: "Violation of Policy",
		body: "Failure to comply with this policy may result in:",
		list: [
			"Removal of system access",
			"Suspension of development privileges",
			"Administrative disciplinary action",
			"Legal action under applicable laws and government regulations"
		]
	},
	{
		n: "13",
		title: "Policy Enforcement",
		body: "This policy applies to internal developers, contract developers, website maintainers, IT officers, and third-party technical service providers. All personnel involved with the website are required to comply fully with these policies and procedures."
	},
	{
		n: "14",
		title: "Official Ownership",
		highlight: "The official website, systems, source code, content, databases, designs, and associated digital resources are the exclusive property of the Provincial Planning Secretariat – Southern Province, Sri Lanka. All rights reserved."
	},
	{
		n: "15",
		title: "Policy Updates",
		body: "The Secretariat reserves the right to revise or update this policy at any time based on administrative, technical, or legal requirements. Updated versions shall become effective immediately upon official publication."
	}
];
function PolicySection() {
	const card = {
		background: "#fff",
		borderRadius: 14,
		border: "1px solid rgba(74,9,24,0.08)",
		boxShadow: "0 2px 12px rgba(74,9,24,0.05)",
		padding: "1.25rem 1.5rem",
		marginBottom: "0.75rem",
		fontFamily: "Inter, sans-serif"
	};
	const highlightBox = {
		background: "rgba(199,154,43,0.07)",
		border: "1px solid rgba(199,154,43,0.25)",
		borderLeft: `3px solid ${GOLD}`,
		borderRadius: "0 8px 8px 0",
		padding: "12px 16px",
		fontSize: "0.84rem",
		lineHeight: 1.75,
		color: MAROON,
		marginTop: 8
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: { marginBottom: "1.6rem" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					alignItems: "center",
					gap: 10,
					marginBottom: 5
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					width: 3,
					height: 24,
					borderRadius: 2,
					background: `linear-gradient(${MAROON}, ${GOLD})`,
					flexShrink: 0
				} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					style: {
						fontFamily: "'Playfair Display', serif",
						fontSize: "1.35rem",
						fontWeight: 800,
						color: MAROON,
						margin: 0
					},
					children: "Policy & Privacy"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: {
					fontSize: "0.76rem",
					color: "rgba(74,9,24,0.4)",
					margin: 0,
					marginLeft: 13
				},
				children: "Website Maintenance, Development, Privacy & Security Policy — Effective 21 May 2026"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				...card,
				background: `linear-gradient(135deg, ${MAROON} 0%, #2A0510 100%)`,
				color: "#FCFBFA",
				marginBottom: "1.25rem"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					fontSize: "0.72rem",
					fontWeight: 700,
					letterSpacing: "0.1em",
					textTransform: "uppercase",
					color: GOLD,
					marginBottom: 6
				},
				children: "Provincial Planning Secretariat – Southern Province"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					fontSize: "0.92rem",
					lineHeight: 1.75,
					color: "rgba(252,251,250,0.82)"
				},
				children: "This policy defines the official procedures, responsibilities, security requirements, and development standards related to the maintenance, updating, modification, testing, deployment, and protection of the official website."
			})]
		}),
		POLICY_SECTIONS.map((sec) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: card,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 10,
						marginBottom: 10
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							flexShrink: 0,
							width: 28,
							height: 28,
							borderRadius: 8,
							background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`,
							color: "#fff",
							fontSize: "0.68rem",
							fontWeight: 700,
							display: "inline-flex",
							alignItems: "center",
							justifyContent: "center"
						},
						children: sec.n
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						style: {
							margin: 0,
							fontSize: "0.95rem",
							fontWeight: 700,
							color: MAROON,
							fontFamily: "'Playfair Display', serif"
						},
						children: sec.title
					})]
				}),
				sec.highlight && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: highlightBox,
					children: sec.highlight
				}),
				sec.body && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: {
						margin: sec.highlight ? "10px 0 0" : 0,
						fontSize: "0.84rem",
						lineHeight: 1.75,
						color: "#444"
					},
					children: sec.body
				}),
				sec.steps && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 8,
						marginTop: 6
					},
					children: sec.steps.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							background: "rgba(74,9,24,0.03)",
							border: "1px solid rgba(74,9,24,0.07)",
							borderRadius: 8,
							padding: "10px 14px"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: "0.75rem",
								fontWeight: 700,
								color: GOLD,
								marginBottom: 4,
								letterSpacing: "0.02em"
							},
							children: step.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: "0.83rem",
								lineHeight: 1.7,
								color: "#444"
							},
							children: step.text
						})]
					}, step.label))
				}),
				sec.list && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					style: {
						margin: sec.body ? "6px 0 0" : 0,
						paddingLeft: 20
					},
					children: sec.list.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						style: {
							fontSize: "0.83rem",
							lineHeight: 1.8,
							color: "#444"
						},
						children: item
					}, item))
				}),
				sec.listNote && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: {
						margin: "8px 0 0",
						fontSize: "0.8rem",
						color: "rgba(74,9,24,0.5)",
						fontStyle: "italic"
					},
					children: sec.listNote
				})
			]
		}, sec.n)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				textAlign: "center",
				padding: "16px 0 8px",
				borderTop: "1px solid rgba(74,9,24,0.08)",
				marginTop: 8
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: {
					fontSize: "0.75rem",
					color: "rgba(74,9,24,0.35)",
					fontFamily: "Inter, sans-serif"
				},
				children: "© 2026 Provincial Planning Secretariat – Southern Province. All Rights Reserved."
			})
		})
	] });
}
var PAGE_HOLD_KEY = "cms_page_hold";
function getPageHoldMap() {
	try {
		return JSON.parse((typeof window !== "undefined" ? localStorage.getItem(PAGE_HOLD_KEY) : null) || "{}");
	} catch {
		return {};
	}
}
function savePageHoldMap(map) {
	localStorage.setItem(PAGE_HOLD_KEY, JSON.stringify(map));
	window.dispatchEvent(new Event("cms_page_hold_updated"));
}
var HOLDABLE_PAGES = [
	{
		key: "about",
		label: "About Us",
		path: "/about",
		group: "About",
		subPages: [
			{
				key: "about__overview",
				label: "Overview",
				path: "/about/overview"
			},
			{
				key: "about__organization-structure",
				label: "Organization Structure",
				path: "/about/organization-structure"
			},
			{
				key: "about__functions-duties",
				label: "Functions & Duties",
				path: "/about/functions-duties"
			},
			{
				key: "about__history",
				label: "History",
				path: "/about/history"
			},
			{
				key: "about__deputy-secretary-planning",
				label: "Deputy Chief Secretary – (Planning & Monitoring)",
				path: "/about/deputy-secretary-planning"
			},
			{
				key: "about__director-planning",
				label: "Director – Planning",
				path: "/about/director-planning"
			},
			{
				key: "about__deputy-directors",
				label: "Deputy Directors",
				path: "/about/deputy-directors",
				subPages: [
					{
						key: "about__deputy-directors__1",
						label: "DD I – Mrs. M.A.K.N. Gunawardana",
						path: "/about/deputy-directors/1"
					},
					{
						key: "about__deputy-directors__2",
						label: "DD II – Mrs. Chandrika Malepathirana",
						path: "/about/deputy-directors/2"
					},
					{
						key: "about__deputy-directors__3",
						label: "DD III – Mrs. N.C. Dissanayake",
						path: "/about/deputy-directors/3"
					},
					{
						key: "about__deputy-directors__4",
						label: "DD IV – Mrs. H.I.H. Salgamuwa",
						path: "/about/deputy-directors/4"
					},
					{
						key: "about__deputy-directors__5",
						label: "DD V – Mrs. A.K.E. Madusarani",
						path: "/about/deputy-directors/5"
					},
					{
						key: "about__deputy-directors__6",
						label: "DD VI – Mrs. A.D.S. Priyadarshani",
						path: "/about/deputy-directors/6"
					}
				]
			}
		]
	},
	{
		key: "about-deputy-secretary",
		label: "About Deputy Secretary",
		path: "/about-deputy-secretary",
		group: "About"
	},
	{
		key: "departments",
		label: "Departments & Divisions",
		path: "/departments",
		group: "Departments",
		subPages: [
			{
				key: "departments__accounts",
				label: "Accounts Division",
				path: "/departments/accounts"
			},
			{
				key: "departments__administration",
				label: "Administration Division",
				path: "/departments/administration"
			},
			{
				key: "departments__development",
				label: "Development Division",
				path: "/departments/development"
			},
			{
				key: "departments__head-administration",
				label: "Head of Administration",
				path: "/departments/head-administration"
			},
			{
				key: "departments__head-accounts",
				label: "Head of Accounts",
				path: "/departments/head-accounts"
			}
		]
	},
	{
		key: "news",
		label: "Media Center (News)",
		path: "/news",
		group: "Content"
	},
	{
		key: "notices",
		label: "Official Notices",
		path: "/notices",
		group: "Content"
	},
	{
		key: "downloads",
		label: "Downloads",
		path: "/downloads",
		group: "Content"
	},
	{
		key: "gallery",
		label: "Photo Gallery",
		path: "/gallery",
		group: "Content"
	},
	{
		key: "documents",
		label: "Documents",
		path: "/documents",
		group: "Content"
	},
	{
		key: "contact",
		label: "Contact Us",
		path: "/contact",
		group: "General"
	}
];
var ALL_PAGE_LABELS = HOLDABLE_PAGES.reduce((acc, p) => {
	acc[p.key] = p.label;
	p.subPages?.forEach((s) => {
		acc[s.key] = s.label;
		s.subPages?.forEach((ss) => {
			acc[ss.key] = ss.label;
		});
	});
	return acc;
}, {});
var card = {
	background: "#fff",
	borderRadius: 14,
	border: "1px solid rgba(74,9,24,0.07)",
	padding: "1.1rem 1.25rem",
	marginBottom: "1rem",
	boxShadow: "0 1px 6px rgba(74,9,24,0.04)"
};
function HoldToggle({ isHeld, onToggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: onToggle,
		title: isHeld ? "Click to make page visible to public" : "Click to put page on hold",
		style: {
			background: "none",
			border: "none",
			cursor: "pointer",
			padding: 0,
			display: "flex",
			alignItems: "center",
			flexShrink: 0,
			color: isHeld ? "#dc2626" : "#16a34a",
			transition: "color 0.15s"
		},
		children: isHeld ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiToggleRight, {
			size: 28,
			style: { filter: "drop-shadow(0 0 3px rgba(220,38,38,0.3))" }
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiToggleLeft, {
			size: 28,
			style: { filter: "drop-shadow(0 0 3px rgba(22,163,74,0.3))" }
		})
	});
}
function StatusBadgeHold({ isHeld }) {
	return isHeld ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
		initial: {
			opacity: 0,
			scale: .8
		},
		animate: {
			opacity: 1,
			scale: 1
		},
		style: {
			fontSize: "0.65rem",
			fontWeight: 700,
			letterSpacing: "0.06em",
			textTransform: "uppercase",
			background: "rgba(220,38,38,0.1)",
			color: "#dc2626",
			border: "1px solid rgba(220,38,38,0.2)",
			borderRadius: 100,
			padding: "2px 8px"
		},
		children: "On Hold"
	}, "held") : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
		initial: {
			opacity: 0,
			scale: .8
		},
		animate: {
			opacity: 1,
			scale: 1
		},
		style: {
			fontSize: "0.65rem",
			fontWeight: 700,
			letterSpacing: "0.06em",
			textTransform: "uppercase",
			background: "rgba(22,163,74,0.1)",
			color: "#15803d",
			border: "1px solid rgba(22,163,74,0.2)",
			borderRadius: 100,
			padding: "2px 8px"
		},
		children: "Live"
	}, "live");
}
function PageRow({ page, isHeld, onToggle, indent = false, deepIndent = false, hasSubPages = false, expanded = false, onExpandToggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		layout: true,
		style: {
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			padding: deepIndent ? "7px 12px 7px 12px" : indent ? "8px 12px 8px 36px" : "10px 12px",
			borderRadius: 9,
			background: isHeld ? "rgba(220,38,38,0.04)" : deepIndent ? "rgba(199,154,43,0.04)" : indent ? "rgba(74,9,24,0.015)" : "transparent",
			border: isHeld ? "1px solid rgba(220,38,38,0.12)" : "1px solid transparent",
			transition: "background 0.2s, border-color 0.2s"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "center",
				gap: 10,
				minWidth: 0
			},
			children: [
				hasSubPages ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onExpandToggle,
					style: {
						background: "none",
						border: "none",
						cursor: "pointer",
						padding: 2,
						color: "rgba(74,9,24,0.45)",
						display: "flex",
						alignItems: "center",
						flexShrink: 0,
						transition: "color 0.15s"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
						animate: { rotate: expanded ? 90 : 0 },
						transition: { duration: .18 },
						style: { display: "flex" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronRight, { size: 14 })
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
					width: indent || deepIndent ? 0 : 18,
					flexShrink: 0
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiLayout, {
					size: deepIndent ? 12 : 13,
					color: isHeld ? "#dc2626" : deepIndent ? "rgba(199,154,43,0.6)" : indent ? "rgba(74,9,24,0.25)" : "rgba(74,9,24,0.35)",
					style: { flexShrink: 0 }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { minWidth: 0 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontSize: deepIndent ? "0.79rem" : indent ? "0.82rem" : "0.87rem",
							fontWeight: deepIndent ? 500 : indent ? 500 : 600,
							color: isHeld ? "#991b1b" : MAROON,
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis"
						},
						children: page.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontSize: "0.68rem",
							color: "rgba(74,9,24,0.35)",
							marginTop: 1
						},
						children: page.path
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "center",
				gap: 10,
				flexShrink: 0
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadgeHold, { isHeld }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldToggle, {
				isHeld,
				onToggle
			})]
		})]
	});
}
function PagesSection() {
	const [holdMap, setHoldMap] = (0, import_react.useState)(getPageHoldMap);
	const [expanded, setExpanded] = (0, import_react.useState)({});
	const toggle = (key) => {
		const next = {
			...holdMap,
			[key]: !holdMap[key]
		};
		setHoldMap(next);
		savePageHoldMap(next);
		const label = ALL_PAGE_LABELS[key] || key;
		toast.success(next[key] ? `"${label}" is now hidden from public` : `"${label}" is now visible to public`);
	};
	const toggleExpand = (key) => setExpanded((e) => ({
		...e,
		[key]: !e[key]
	}));
	const holdCount = Object.values(holdMap).filter(Boolean).length;
	const groups = [...new Set(HOLDABLE_PAGES.map((p) => p.group))];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: { marginBottom: "1.5rem" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					alignItems: "center",
					gap: 10,
					marginBottom: 5
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					width: 3,
					height: 24,
					borderRadius: 2,
					background: `linear-gradient(${MAROON}, ${GOLD})`,
					flexShrink: 0
				} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					style: {
						fontFamily: "'Playfair Display', serif",
						fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
						fontWeight: 800,
						color: MAROON,
						margin: 0
					},
					children: "Page Visibility"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: {
					fontSize: "0.76rem",
					color: "rgba(74,9,24,0.4)",
					margin: 0,
					marginLeft: 13
				},
				children: "Control which portal pages are visible to the public. Pages with sub-pages can be expanded to hold individual sub-pages."
			})]
		}),
		holdCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: -6
			},
			animate: {
				opacity: 1,
				y: 0
			},
			style: {
				background: "linear-gradient(135deg, rgba(220,38,38,0.08) 0%, rgba(220,38,38,0.04) 100%)",
				border: "1px solid rgba(220,38,38,0.18)",
				borderRadius: 12,
				padding: "10px 16px",
				display: "flex",
				alignItems: "center",
				gap: 10,
				marginBottom: "1.25rem"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAlertCircle, {
				size: 15,
				color: "#dc2626",
				style: { flexShrink: 0 }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				style: {
					fontSize: "0.8rem",
					color: "#991b1b",
					fontWeight: 600
				},
				children: [
					holdCount,
					" page",
					holdCount > 1 ? "s are" : " is",
					" currently on hold — hidden from the public."
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				...card,
				background: `linear-gradient(135deg, ${MAROON} 0%, #2A0510 100%)`,
				color: "#FCFBFA",
				marginBottom: "1.5rem"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					fontSize: "0.72rem",
					fontWeight: 700,
					letterSpacing: "0.1em",
					textTransform: "uppercase",
					color: GOLD,
					marginBottom: 6
				},
				children: "How Page Hold Works"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					fontSize: "0.84rem",
					lineHeight: 1.75,
					color: "rgba(252,251,250,0.82)"
				},
				children: [
					"Toggle a page to hide it from the public — visitors will see a branded",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						style: { color: GOLD },
						children: "\"Page Under Development\""
					}),
					" screen. Pages marked with ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronRight, {
						size: 12,
						style: {
							verticalAlign: "middle",
							opacity: .7
						}
					}),
					" can be expanded to hold individual sub-pages without affecting the parent page."
				]
			})]
		}),
		groups.map((group) => {
			const pages = HOLDABLE_PAGES.filter((p) => p.group === group);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: card,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						fontSize: "0.68rem",
						fontWeight: 700,
						letterSpacing: "0.12em",
						textTransform: "uppercase",
						color: GOLD,
						marginBottom: "0.75rem",
						paddingBottom: "0.5rem",
						borderBottom: "1px solid rgba(74,9,24,0.07)"
					},
					children: group
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 2
					},
					children: pages.map((page) => {
						const isHeld = !!holdMap[page.key];
						const hasSubPages = !!page.subPages?.length;
						const isExpanded = !!expanded[page.key];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageRow, {
							page,
							isHeld,
							onToggle: () => toggle(page.key),
							hasSubPages,
							expanded: isExpanded,
							onExpandToggle: () => toggleExpand(page.key)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
							initial: false,
							children: hasSubPages && isExpanded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
								transition: {
									duration: .22,
									ease: [
										.4,
										0,
										.2,
										1
									]
								},
								style: { overflow: "hidden" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										marginLeft: 36,
										marginRight: 4,
										marginBottom: 4,
										borderLeft: `2px solid rgba(74,9,24,0.08)`,
										paddingLeft: 12,
										display: "flex",
										flexDirection: "column",
										gap: 2
									},
									children: page.subPages.map((sub) => {
										const subHasChildren = !!sub.subPages?.length;
										const subIsExpanded = !!expanded[sub.key];
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageRow, {
											page: sub,
											isHeld: !!holdMap[sub.key],
											onToggle: () => toggle(sub.key),
											indent: true,
											hasSubPages: subHasChildren,
											expanded: subIsExpanded,
											onExpandToggle: () => toggleExpand(sub.key)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
											initial: false,
											children: subHasChildren && subIsExpanded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
												transition: {
													duration: .2,
													ease: [
														.4,
														0,
														.2,
														1
													]
												},
												style: { overflow: "hidden" },
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													style: {
														marginLeft: 24,
														marginRight: 4,
														marginBottom: 4,
														borderLeft: `2px solid rgba(199,154,43,0.18)`,
														paddingLeft: 12,
														display: "flex",
														flexDirection: "column",
														gap: 2
													},
													children: sub.subPages.map((ss) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageRow, {
														page: ss,
														isHeld: !!holdMap[ss.key],
														onToggle: () => toggle(ss.key),
														indent: true,
														deepIndent: true
													}, ss.key))
												})
											}, "subsubs")
										})] }, sub.key);
									})
								})
							}, "subs")
						})] }, page.key);
					})
				})]
			}, group);
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				...card,
				opacity: .7
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					fontSize: "0.68rem",
					fontWeight: 700,
					letterSpacing: "0.12em",
					textTransform: "uppercase",
					color: GOLD,
					marginBottom: "0.75rem",
					paddingBottom: "0.5rem",
					borderBottom: "1px solid rgba(74,9,24,0.07)"
				},
				children: "Core"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "10px 12px",
					borderRadius: 9,
					background: "rgba(22,163,74,0.04)",
					border: "1px solid rgba(22,163,74,0.1)"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 10
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
							width: 18,
							flexShrink: 0
						} }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiHome, {
							size: 13,
							color: "rgba(74,9,24,0.35)",
							style: { flexShrink: 0 }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: "0.87rem",
								fontWeight: 600,
								color: MAROON
							},
							children: "Home"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: "0.68rem",
								color: "rgba(74,9,24,0.35)",
								marginTop: 1
							},
							children: "/home"
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 10
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							fontSize: "0.65rem",
							fontWeight: 700,
							letterSpacing: "0.06em",
							textTransform: "uppercase",
							background: "rgba(22,163,74,0.1)",
							color: "#15803d",
							border: "1px solid rgba(22,163,74,0.2)",
							borderRadius: 100,
							padding: "2px 8px"
						},
						children: "Always Live"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiShield, {
						size: 18,
						color: "rgba(74,9,24,0.25)",
						title: "Home page cannot be put on hold"
					})]
				})]
			})]
		})
	] });
}
var SplitComponent = CMSDashboard;
//#endregion
export { SplitComponent as component };
