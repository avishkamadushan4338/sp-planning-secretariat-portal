import { __toESM } from "./_runtime.mjs";
import { require_jsx_runtime, require_react } from "./_libs/react+tanstack__react-query.mjs";
import { NavLink, Outlet$1, useLocation$1, useNavigate$1 } from "./_ssr/react-router-dom-shim-Y_PNYd7n.mjs";
import { AnimatePresence, motion } from "./_libs/framer-motion.mjs";
import { FiActivity, FiAlertCircle, FiCheckCircle, FiChevronRight, FiEye, FiEyeOff, FiFileText, FiGrid, FiKey, FiList, FiLogOut, FiMenu, FiPackage, FiShield, FiTrash2, FiUser, FiUsers, FiX } from "./_libs/react-icons.mjs";
import { changePassword } from "./_ssr/smpApi-B7J5_1vM.mjs";
import { SMPProvider, useSMP } from "./_ssr/SMPContext-082lc8Y9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_layout-D8TM6G8u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAROON = "#4A0918";
var MAROON2 = "#3A0712";
var GOLD = "#C79A2B";
var SIDEBAR_W = 248;
function buildNav(isAdmin, _isStorekeeper) {
	return [
		{
			label: "Dashboard",
			icon: FiGrid,
			path: "/smp/dashboard"
		},
		{
			label: "Inventory",
			icon: FiPackage,
			path: "/smp/inventory"
		},
		{
			label: "Disposal",
			icon: FiTrash2,
			path: "/smp/disposal"
		},
		{
			label: "Transactions",
			icon: FiList,
			path: "/smp/transactions"
		},
		{
			label: "Reports",
			icon: FiFileText,
			path: "/smp/reports"
		},
		...isAdmin ? [{
			label: "Login Logs",
			icon: FiActivity,
			path: "/smp/login-logs"
		}, {
			label: "Users",
			icon: FiUsers,
			path: "/smp/users"
		}] : []
	];
}
function Sidebar({ open, onClose }) {
	const { user, signOut, isAdmin, isStorekeeper } = useSMP();
	const navigate = useNavigate$1();
	const nav = buildNav(isAdmin, isStorekeeper);
	const [pwModal, setPwModal] = (0, import_react.useState)(false);
	const [pwForm, setPwForm] = (0, import_react.useState)({
		current: "",
		next: "",
		confirm: ""
	});
	const [pwShow, setPwShow] = (0, import_react.useState)({
		current: false,
		next: false,
		confirm: false
	});
	const [pwSaving, setPwSaving] = (0, import_react.useState)(false);
	const [pwErr, setPwErr] = (0, import_react.useState)("");
	const [pwOk, setPwOk] = (0, import_react.useState)(false);
	const openPwModal = () => {
		setPwForm({
			current: "",
			next: "",
			confirm: ""
		});
		setPwErr("");
		setPwOk(false);
		setPwModal(true);
	};
	const handlePwChange = async (e) => {
		e.preventDefault();
		if (!pwForm.current) return setPwErr("Current password is required");
		if (pwForm.next.length < 6) return setPwErr("New password must be at least 6 characters");
		if (pwForm.next !== pwForm.confirm) return setPwErr("New passwords do not match");
		setPwSaving(true);
		setPwErr("");
		try {
			await changePassword({
				currentPassword: pwForm.current,
				newPassword: pwForm.next
			});
			setPwOk(true);
			setTimeout(() => {
				setPwModal(false);
				setPwOk(false);
			}, 1800);
		} catch (err) {
			setPwErr(err.response?.data?.error || "Failed to change password");
		} finally {
			setPwSaving(false);
		}
	};
	const handleLogout = async () => {
		await signOut();
		navigate("/smp", { replace: true });
	};
	const roleColor = {
		admin: "#DC2626",
		storekeeper: GOLD,
		viewer: "#6366F1"
	}[user?.role] || GOLD;
	const sidebarContent = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			width: SIDEBAR_W,
			height: "100%",
			background: MAROON2,
			display: "flex",
			flexDirection: "column",
			position: "relative",
			overflow: "hidden"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				style: {
					position: "absolute",
					inset: 0,
					width: "100%",
					height: "100%",
					opacity: .04,
					pointerEvents: "none"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", {
					id: "sg",
					width: "32",
					height: "32",
					patternUnits: "userSpaceOnUse",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 32 0 L 0 0 0 32",
						fill: "none",
						stroke: GOLD,
						strokeWidth: "0.5"
					})
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					width: "100%",
					height: "100%",
					fill: "url(#sg)"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					padding: "1.5rem 1.25rem 1rem",
					borderBottom: "1px solid rgba(199,154,43,0.15)",
					position: "relative",
					zIndex: 1
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 10
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								width: 36,
								height: 36,
								borderRadius: 10,
								background: `linear-gradient(135deg, ${GOLD} 0%, #E8C55A 100%)`,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								flexShrink: 0
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPackage, {
								size: 18,
								color: MAROON2
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontFamily: "'Cinzel', serif",
								fontSize: "0.62rem",
								letterSpacing: "0.12em",
								color: GOLD,
								fontWeight: 700
							},
							children: "SMP"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontSize: "0.7rem",
								color: "rgba(255,255,255,0.5)",
								lineHeight: 1.2
							},
							children: "Store Management"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onClose,
							className: "lg:hidden",
							style: {
								marginLeft: "auto",
								background: "none",
								border: "none",
								cursor: "pointer",
								color: "rgba(255,255,255,0.5)",
								display: "flex"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 18 })
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				style: {
					flex: 1,
					overflowY: "auto",
					padding: "0.75rem 0.75rem",
					position: "relative",
					zIndex: 1
				},
				children: nav.map(({ label, icon: Icon, path }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
					to: path,
					onClick: onClose,
					style: { textDecoration: "none" },
					children: ({ isActive }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							alignItems: "center",
							gap: 10,
							padding: "9px 12px",
							borderRadius: 9,
							marginBottom: 2,
							background: isActive ? `rgba(199,154,43,0.15)` : "transparent",
							border: isActive ? `1px solid rgba(199,154,43,0.25)` : "1px solid transparent",
							color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
							transition: "all 0.15s",
							cursor: "pointer"
						},
						onMouseEnter: (e) => {
							if (!isActive) {
								e.currentTarget.style.background = "rgba(255,255,255,0.06)";
								e.currentTarget.style.color = "#fff";
							}
						},
						onMouseLeave: (e) => {
							if (!isActive) {
								e.currentTarget.style.background = "transparent";
								e.currentTarget.style.color = "rgba(255,255,255,0.5)";
							}
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								size: 15,
								style: {
									color: isActive ? GOLD : "inherit",
									flexShrink: 0
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: "0.82rem",
									fontWeight: isActive ? 600 : 400
								},
								children: label
							}),
							isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronRight, {
								size: 12,
								style: {
									marginLeft: "auto",
									color: GOLD,
									opacity: .7
								}
							})
						]
					})
				}, path))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					padding: "0.75rem",
					borderTop: "1px solid rgba(199,154,43,0.15)",
					position: "relative",
					zIndex: 1
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							alignItems: "center",
							gap: 10,
							padding: "10px 12px",
							background: "rgba(255,255,255,0.05)",
							borderRadius: 10,
							marginBottom: 8
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								width: 32,
								height: 32,
								borderRadius: "50%",
								background: `${roleColor}22`,
								border: `1.5px solid ${roleColor}55`,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								flexShrink: 0
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiUser, {
								size: 14,
								color: roleColor
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								flex: 1,
								overflow: "hidden"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									fontSize: "0.8rem",
									fontWeight: 600,
									color: "#fff",
									whiteSpace: "nowrap",
									overflow: "hidden",
									textOverflow: "ellipsis"
								},
								children: user?.name || user?.username
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									fontSize: "0.68rem",
									color: roleColor,
									fontWeight: 600,
									textTransform: "capitalize"
								},
								children: user?.role
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: openPwModal,
						style: {
							width: "100%",
							display: "flex",
							alignItems: "center",
							gap: 9,
							padding: "9px 12px",
							borderRadius: 9,
							border: `1px solid rgba(199,154,43,0.2)`,
							background: "rgba(199,154,43,0.07)",
							color: GOLD,
							cursor: "pointer",
							fontSize: "0.82rem",
							fontWeight: 500,
							fontFamily: "Inter, sans-serif",
							marginBottom: 8,
							transition: "all 0.15s"
						},
						onMouseEnter: (e) => {
							e.currentTarget.style.background = "rgba(199,154,43,0.15)";
						},
						onMouseLeave: (e) => {
							e.currentTarget.style.background = "rgba(199,154,43,0.07)";
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiKey, { size: 14 }), " Change Password"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleLogout,
						style: {
							width: "100%",
							display: "flex",
							alignItems: "center",
							gap: 9,
							padding: "9px 12px",
							borderRadius: 9,
							border: "1px solid rgba(220,38,38,0.2)",
							background: "rgba(220,38,38,0.07)",
							color: "rgba(255,100,100,0.85)",
							cursor: "pointer",
							fontSize: "0.82rem",
							fontWeight: 500,
							fontFamily: "Inter, sans-serif",
							transition: "all 0.15s"
						},
						onMouseEnter: (e) => {
							e.currentTarget.style.background = "rgba(220,38,38,0.15)";
						},
						onMouseLeave: (e) => {
							e.currentTarget.style.background = "rgba(220,38,38,0.07)";
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiLogOut, { size: 14 }), " Sign Out"]
					})
				]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "hidden lg:block",
			style: {
				width: SIDEBAR_W,
				flexShrink: 0,
				height: "100vh",
				position: "sticky",
				top: 0
			},
			children: sidebarContent
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			style: {
				position: "fixed",
				inset: 0,
				background: "rgba(0,0,0,0.5)",
				zIndex: 100
			},
			onClick: onClose,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { x: -248 },
				animate: { x: 0 },
				exit: { x: -248 },
				transition: {
					type: "spring",
					stiffness: 320,
					damping: 32
				},
				style: {
					width: SIDEBAR_W,
					height: "100%",
					position: "absolute",
					left: 0
				},
				onClick: (e) => e.stopPropagation(),
				children: sidebarContent
			})
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: pwModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			style: {
				position: "fixed",
				inset: 0,
				background: "rgba(0,0,0,0.55)",
				zIndex: 200,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "1rem"
			},
			onClick: () => setPwModal(false),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					scale: .94,
					opacity: 0
				},
				animate: {
					scale: 1,
					opacity: 1
				},
				exit: {
					scale: .94,
					opacity: 0
				},
				transition: {
					type: "spring",
					stiffness: 340,
					damping: 30
				},
				style: {
					background: "#fff",
					borderRadius: 16,
					width: "100%",
					maxWidth: 380,
					padding: "1.75rem",
					boxShadow: "0 20px 60px rgba(74,9,24,0.18)"
				},
				onClick: (e) => e.stopPropagation(),
				children: pwOk ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: 12,
						padding: "1rem 0"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								width: 52,
								height: 52,
								borderRadius: "50%",
								background: "rgba(34,197,94,0.1)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheckCircle, {
								size: 26,
								color: "#22C55E"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontFamily: "'Playfair Display', serif",
								fontSize: "1.05rem",
								fontWeight: 700,
								color: MAROON
							},
							children: "Password Changed"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontSize: "0.8rem",
								color: "rgba(74,9,24,0.55)",
								textAlign: "center"
							},
							children: "Your password has been updated successfully."
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 10,
						marginBottom: "1.25rem"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								width: 38,
								height: 38,
								borderRadius: 10,
								background: `rgba(199,154,43,0.12)`,
								display: "flex",
								alignItems: "center",
								justifyContent: "center"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiKey, {
								size: 18,
								color: GOLD
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							style: {
								fontFamily: "'Playfair Display', serif",
								fontSize: "1rem",
								fontWeight: 700,
								color: MAROON,
								margin: 0
							},
							children: "Change Password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontSize: "0.7rem",
								color: "rgba(74,9,24,0.45)",
								margin: 0
							},
							children: "Update your account password"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setPwModal(false),
							style: {
								marginLeft: "auto",
								background: "none",
								border: "none",
								cursor: "pointer",
								color: "rgba(74,9,24,0.4)",
								display: "flex",
								padding: 4
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 18 })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handlePwChange,
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 12
					},
					children: [
						[
							{
								key: "current",
								label: "Current Password"
							},
							{
								key: "next",
								label: "New Password"
							},
							{
								key: "confirm",
								label: "Confirm New Password"
							}
						].map(({ key, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							style: {
								fontSize: "0.73rem",
								fontWeight: 600,
								color: MAROON,
								display: "block",
								marginBottom: 5
							},
							children: label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { position: "relative" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: pwShow[key] ? "text" : "password",
								value: pwForm[key],
								onChange: (e) => setPwForm((f) => ({
									...f,
									[key]: e.target.value
								})),
								placeholder: label,
								style: {
									width: "100%",
									padding: "9px 36px 9px 12px",
									border: "1.5px solid rgba(74,9,24,0.15)",
									borderRadius: 8,
									fontSize: "0.82rem",
									color: MAROON,
									background: "#FAFAFA",
									outline: "none",
									boxSizing: "border-box",
									fontFamily: "Inter, sans-serif"
								},
								onFocus: (e) => {
									e.target.style.borderColor = GOLD;
								},
								onBlur: (e) => {
									e.target.style.borderColor = "rgba(74,9,24,0.15)";
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setPwShow((s) => ({
									...s,
									[key]: !s[key]
								})),
								style: {
									position: "absolute",
									right: 10,
									top: "50%",
									transform: "translateY(-50%)",
									background: "none",
									border: "none",
									cursor: "pointer",
									color: "rgba(74,9,24,0.4)",
									display: "flex",
									padding: 0
								},
								children: pwShow[key] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEyeOff, { size: 15 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEye, { size: 15 })
							})]
						})] }, key)),
						pwErr && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 7,
								background: "rgba(220,38,38,0.07)",
								border: "1px solid rgba(220,38,38,0.2)",
								borderRadius: 8,
								padding: "8px 10px"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAlertCircle, {
								size: 14,
								color: "#DC2626",
								style: { flexShrink: 0 }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: "0.75rem",
									color: "#DC2626"
								},
								children: pwErr
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: 8,
								marginTop: 4
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setPwModal(false),
								style: {
									flex: 1,
									padding: "9px",
									borderRadius: 8,
									border: "1.5px solid rgba(74,9,24,0.15)",
									background: "#fff",
									color: "rgba(74,9,24,0.6)",
									cursor: "pointer",
									fontSize: "0.82rem",
									fontWeight: 500,
									fontFamily: "Inter, sans-serif"
								},
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: pwSaving,
								style: {
									flex: 1,
									padding: "9px",
									borderRadius: 8,
									border: "none",
									background: pwSaving ? "rgba(74,9,24,0.4)" : MAROON,
									color: "#fff",
									cursor: pwSaving ? "not-allowed" : "pointer",
									fontSize: "0.82rem",
									fontWeight: 600,
									fontFamily: "Inter, sans-serif"
								},
								children: pwSaving ? "Saving…" : "Update Password"
							})]
						})
					]
				})] })
			})
		}) })
	] });
}
function Topbar({ onMenuClick }) {
	const { user } = useSMP();
	const pageTitle = {
		"/smp/dashboard": "Dashboard",
		"/smp/inventory": "Inventory",
		"/smp/disposal": "Disposal Management",
		"/smp/transactions": "Transaction History",
		"/smp/reports": "Reports",
		"/smp/login-logs": "Login Logs",
		"/smp/users": "User Management"
	}[useLocation$1().pathname] || "Store Management";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			height: 60,
			background: "#fff",
			borderBottom: "1px solid rgba(74,9,24,0.1)",
			display: "flex",
			alignItems: "center",
			paddingInline: "1.25rem",
			gap: 14,
			flexShrink: 0,
			position: "sticky",
			top: 0,
			zIndex: 50,
			boxShadow: "0 1px 8px rgba(74,9,24,0.06)"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "lg:hidden",
				onClick: onMenuClick,
				style: {
					background: "none",
					border: "none",
					cursor: "pointer",
					color: MAROON,
					display: "flex",
					padding: 4
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMenu, { size: 20 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					alignItems: "center",
					gap: 8
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					width: 6,
					height: 6,
					borderRadius: "50%",
					background: GOLD
				} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					style: {
						fontFamily: "'Playfair Display', serif",
						fontSize: "1.05rem",
						fontWeight: 700,
						color: MAROON
					},
					children: pageTitle
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					marginLeft: "auto",
					display: "flex",
					alignItems: "center",
					gap: 10
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "inline-flex",
						alignItems: "center",
						gap: 6,
						background: "rgba(74,9,24,0.05)",
						border: "1px solid rgba(74,9,24,0.1)",
						borderRadius: 100,
						padding: "4px 12px"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiShield, {
						size: 11,
						color: GOLD
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							fontSize: "0.7rem",
							color: MAROON,
							fontWeight: 600,
							textTransform: "capitalize"
						},
						children: user?.role
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						fontSize: "0.78rem",
						color: "rgba(74,9,24,0.5)",
						fontWeight: 500
					},
					children: user?.name
				})]
			})
		]
	});
}
function Guard({ children }) {
	const { user } = useSMP();
	const navigate = useNavigate$1();
	(0, import_react.useEffect)(() => {
		if (!user) navigate("/smp", { replace: true });
	}, [user, navigate]);
	if (!user) return null;
	return children;
}
function Shell() {
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			minHeight: "100vh",
			background: "#F3F0EE",
			fontFamily: "Inter, sans-serif"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {
			open: menuOpen,
			onClose: () => setMenuOpen(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				flex: 1,
				display: "flex",
				flexDirection: "column",
				minWidth: 0,
				overflow: "hidden"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Topbar, { onMenuClick: () => setMenuOpen(true) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				style: {
					flex: 1,
					overflowY: "auto",
					padding: "1.5rem"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet$1, {})
			})]
		})]
	}) });
}
function SMPLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SMPProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {}) });
}
var SplitComponent = SMPLayout;
//#endregion
export { SplitComponent as component };
