import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react+tanstack__react-query.mjs";
import { AnimatePresence, motion } from "../_libs/framer-motion.mjs";
import { FiEdit2, FiEye, FiPlus, FiShield, FiTrash2, FiUser, FiX } from "../_libs/react-icons.mjs";
import { createUser, deleteUser, getUsers, updateUser } from "./smpApi-B7J5_1vM.mjs";
import { useSMP } from "./SMPContext-082lc8Y9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/users-QJuNjYtf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAROON = "#4A0918";
var GOLD = "#C79A2B";
var ROLES = [
	"admin",
	"storekeeper",
	"viewer"
];
var ROLE_CFG = {
	admin: {
		label: "Admin",
		color: "#DC2626",
		icon: FiShield,
		bg: "rgba(220,38,38,0.1)"
	},
	storekeeper: {
		label: "Store Keeper",
		color: GOLD,
		icon: FiUser,
		bg: "rgba(199,154,43,0.1)"
	},
	viewer: {
		label: "Viewer",
		color: "#6366F1",
		icon: FiEye,
		bg: "rgba(99,102,241,0.1)"
	}
};
var BLANK = {
	username: "",
	password: "",
	name: "",
	email: "",
	role: "storekeeper",
	active: true
};
function Modal({ title, onClose, children }) {
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
				maxWidth: 460,
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
					maxHeight: "80vh",
					overflowY: "auto"
				},
				children
			})]
		})
	});
}
var FF = ({ label, value, onChange, placeholder, type = "text", required }) => {
	const [f, setF] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: { marginBottom: "0.85rem" },
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
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type,
			value,
			onChange: (e) => onChange(e.target.value),
			onFocus: () => setF(true),
			onBlur: () => setF(false),
			placeholder,
			required,
			style: {
				width: "100%",
				border: `1.5px solid ${f ? GOLD : "rgba(74,9,24,0.18)"}`,
				borderRadius: 8,
				outline: "none",
				padding: "8px 11px",
				fontSize: "0.845rem",
				color: MAROON,
				background: f ? "rgba(199,154,43,0.02)" : "#fff",
				fontFamily: "Inter,sans-serif",
				boxShadow: f ? `0 0 0 3px rgba(199,154,43,0.1)` : "none",
				transition: "all 0.18s"
			}
		})]
	});
};
function SMPUsers() {
	const { user: me } = useSMP();
	const [users, setUsers] = (0, import_react.useState)([]);
	const [loading, setLoad] = (0, import_react.useState)(true);
	const [modal, setModal] = (0, import_react.useState)(null);
	const [target, setTarget] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(BLANK);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)("");
	const [toast, setToast] = (0, import_react.useState)(null);
	const showToast = (msg, type = "success") => {
		setToast({
			msg,
			type
		});
		setTimeout(() => setToast(null), 3e3);
	};
	const load = async () => {
		setLoad(true);
		try {
			const { data } = await getUsers();
			setUsers(data);
		} finally {
			setLoad(false);
		}
	};
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const handleSave = async (e) => {
		e.preventDefault();
		setSaving(true);
		setErr("");
		try {
			if (modal === "add") {
				if (!form.username || !form.password || !form.name) {
					setErr("Username, password, and name are required");
					setSaving(false);
					return;
				}
				await createUser(form);
				showToast("User created");
			} else {
				const patch = {
					name: form.name,
					email: form.email,
					role: form.role,
					active: form.active
				};
				if (form.password) patch.password = form.password;
				await updateUser(target.id, patch);
				showToast("User updated");
			}
			setModal(null);
			load();
		} catch (e) {
			setErr(e.response?.data?.error || "Error");
		} finally {
			setSaving(false);
		}
	};
	const handleDelete = async () => {
		setSaving(true);
		try {
			await deleteUser(target.id);
			showToast("User deleted", "error");
			setModal(null);
			load();
		} catch (e) {
			setErr(e.response?.data?.error || "Error");
		} finally {
			setSaving(false);
		}
	};
	const openAdd = () => {
		setForm(BLANK);
		setErr("");
		setTarget(null);
		setModal("add");
	};
	const openEdit = (u) => {
		setForm({
			...u,
			password: ""
		});
		setErr("");
		setTarget(u);
		setModal("edit");
	};
	const openDel = (u) => {
		setTarget(u);
		setErr("");
		setModal("delete");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				display: "flex",
				justifyContent: "flex-end",
				marginBottom: "1rem"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: openAdd,
				style: {
					display: "inline-flex",
					alignItems: "center",
					gap: 7,
					padding: "8px 16px",
					borderRadius: 9,
					border: "none",
					cursor: "pointer",
					background: `linear-gradient(135deg,${MAROON} 0%,#6E1528 100%)`,
					color: "#fff",
					fontSize: "0.82rem",
					fontWeight: 600,
					boxShadow: `0 4px 14px rgba(74,9,24,0.25)`,
					fontFamily: "Inter,sans-serif"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPlus, { size: 14 }), " Add User"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				display: "grid",
				gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
				gap: 14
			},
			children: loading ? Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
				height: 140,
				background: "#fff",
				borderRadius: 12,
				border: "1px solid rgba(74,9,24,0.08)",
				animation: "pulse 1.5s ease-in-out infinite"
			} }, i)) : users.map((u) => {
				const rc = ROLE_CFG[u.role] || ROLE_CFG.viewer;
				const isMe = u.id === me?.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 10
					},
					animate: {
						opacity: 1,
						y: 0
					},
					style: {
						background: "#fff",
						borderRadius: 12,
						border: `1px solid ${isMe ? "rgba(199,154,43,0.3)" : "rgba(74,9,24,0.09)"}`,
						boxShadow: isMe ? "0 2px 14px rgba(199,154,43,0.12)" : "0 2px 10px rgba(74,9,24,0.05)",
						padding: "1.1rem 1.25rem",
						position: "relative",
						overflow: "hidden"
					},
					children: [
						isMe && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								position: "absolute",
								top: 10,
								right: 10,
								fontSize: "0.62rem",
								fontWeight: 700,
								color: GOLD,
								background: "rgba(199,154,43,0.12)",
								padding: "2px 7px",
								borderRadius: 100
							},
							children: "YOU"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 12,
								marginBottom: "0.9rem"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									width: 44,
									height: 44,
									borderRadius: "50%",
									background: rc.bg,
									border: `1.5px solid ${rc.color}33`,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									flexShrink: 0
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(rc.icon, {
									size: 19,
									color: rc.color
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									fontWeight: 700,
									color: MAROON,
									fontSize: "0.9rem"
								},
								children: u.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								style: {
									fontSize: "0.72rem",
									color: "rgba(74,9,24,0.5)"
								},
								children: ["@", u.username]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								marginBottom: "0.75rem"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: "0.7rem",
									fontWeight: 700,
									padding: "2px 10px",
									borderRadius: 100,
									background: rc.bg,
									color: rc.color
								},
								children: rc.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: "0.68rem",
									fontWeight: 600,
									padding: "2px 8px",
									borderRadius: 100,
									background: u.active ? "rgba(22,163,74,0.1)" : "rgba(220,38,38,0.1)",
									color: u.active ? "#15803D" : "#B91C1C"
								},
								children: u.active ? "Active" : "Inactive"
							})]
						}),
						u.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontSize: "0.72rem",
								color: "rgba(74,9,24,0.45)",
								marginBottom: "0.75rem"
							},
							children: u.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: 8
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => openEdit(u),
								style: {
									flex: 1,
									padding: "6px",
									borderRadius: 8,
									border: `1.5px solid ${GOLD}`,
									background: "transparent",
									color: GOLD,
									cursor: "pointer",
									fontSize: "0.75rem",
									fontWeight: 600,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									gap: 5,
									fontFamily: "Inter,sans-serif"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEdit2, { size: 12 }), " Edit"]
							}), !isMe && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => openDel(u),
								style: {
									flex: 1,
									padding: "6px",
									borderRadius: 8,
									border: "1.5px solid rgba(220,38,38,0.3)",
									background: "rgba(220,38,38,0.06)",
									color: "#DC2626",
									cursor: "pointer",
									fontSize: "0.75rem",
									fontWeight: 600,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									gap: 5,
									fontFamily: "Inter,sans-serif"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, { size: 12 }), " Delete"]
							})]
						})
					]
				}, u.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: (modal === "add" || modal === "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
			title: modal === "add" ? "Add New User" : "Edit User",
			onClose: () => setModal(null),
			children: [err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: {
					fontSize: "0.78rem",
					color: "#DC2626",
					marginBottom: "0.75rem",
					padding: "7px 11px",
					background: "rgba(220,38,38,0.07)",
					borderRadius: 7,
					border: "1px solid rgba(220,38,38,0.2)"
				},
				children: err
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSave,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FF, {
						label: "Full Name",
						value: form.name,
						onChange: (v) => setForm((f) => ({
							...f,
							name: v
						})),
						placeholder: "Full name",
						required: true
					}),
					modal === "add" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FF, {
						label: "Username",
						value: form.username,
						onChange: (v) => setForm((f) => ({
							...f,
							username: v
						})),
						placeholder: "Login username",
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FF, {
						label: modal === "edit" ? "New Password (leave blank to keep)" : "Password",
						value: form.password,
						onChange: (v) => setForm((f) => ({
							...f,
							password: v
						})),
						type: "password",
						placeholder: "••••••••",
						required: modal === "add"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FF, {
						label: "Email",
						value: form.email,
						onChange: (v) => setForm((f) => ({
							...f,
							email: v
						})),
						placeholder: "email@planning.lk",
						type: "email"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { marginBottom: "0.85rem" },
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
							children: "Role *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: form.role,
							onChange: (e) => setForm((f) => ({
								...f,
								role: e.target.value
							})),
							style: {
								width: "100%",
								border: "1.5px solid rgba(74,9,24,0.18)",
								borderRadius: 8,
								outline: "none",
								padding: "8px 11px",
								fontSize: "0.845rem",
								color: MAROON,
								background: "#fff",
								fontFamily: "Inter,sans-serif",
								cursor: "pointer"
							},
							children: ROLES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: r,
								children: ROLE_CFG[r].label
							}, r))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						style: {
							display: "flex",
							alignItems: "center",
							gap: 8,
							cursor: "pointer",
							marginBottom: "1rem"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							onClick: () => setForm((f) => ({
								...f,
								active: !f.active
							})),
							style: {
								width: 18,
								height: 18,
								borderRadius: 5,
								border: `1.5px solid ${form.active ? GOLD : "rgba(74,9,24,0.25)"}`,
								background: form.active ? GOLD : "transparent",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								transition: "all 0.18s",
								flexShrink: 0
							},
							children: form.active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								width: "10",
								height: "8",
								viewBox: "0 0 10 8",
								fill: "none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M1 4L3.5 6.5L9 1",
									stroke: "#fff",
									strokeWidth: "1.6",
									strokeLinecap: "round",
									strokeLinejoin: "round"
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								fontSize: "0.82rem",
								color: "rgba(74,9,24,0.7)"
							},
							children: "Account active"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							justifyContent: "flex-end",
							gap: 10,
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
							style: primaryBtn,
							children: saving ? "Saving…" : modal === "add" ? "Create User" : "Save Changes"
						})]
					})
				]
			})]
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: modal === "delete" && target && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
			title: "Delete User",
			onClose: () => setModal(null),
			children: [
				err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: {
						fontSize: "0.78rem",
						color: "#DC2626",
						marginBottom: "0.75rem"
					},
					children: err
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
							"Delete user ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								style: { color: MAROON },
								children: target.name
							}),
							" (@",
							target.username,
							")?",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"This cannot be undone."
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
						children: saving ? "Deleting…" : "Delete User"
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
	padding: "8px 18px",
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
var SplitComponent = SMPUsers;
//#endregion
export { SplitComponent as component };
