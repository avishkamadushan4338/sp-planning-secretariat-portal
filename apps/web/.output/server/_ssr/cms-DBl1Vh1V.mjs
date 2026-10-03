import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react+tanstack__react-query.mjs";
import { useNavigate$1 } from "./react-router-dom-shim-Y_PNYd7n.mjs";
import { AnimatePresence, motion } from "../_libs/framer-motion.mjs";
import { FiAlertCircle, FiEye, FiEyeOff, FiLock, FiShield, FiUser } from "../_libs/react-icons.mjs";
import { verifyLogin } from "./cmsAuth-B_i6idnL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cms-DBl1Vh1V.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAROON = "#4A0918";
var MAROON2 = "#3A0712";
var GOLD = "#C79A2B";
var CREAM = "#FCFBFA";
var fadeUp = (delay = 0) => ({
	hidden: {
		opacity: 0,
		y: 24,
		filter: "blur(4px)"
	},
	visible: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: .65,
			delay,
			ease: [
				.16,
				1,
				.3,
				1
			]
		}
	}
});
var PARTICLES = Array.from({ length: 18 }, (_, i) => ({
	id: i,
	x: Math.random() * 100,
	y: Math.random() * 100,
	size: 1.5 + Math.random() * 2.5,
	duration: 6 + Math.random() * 8,
	delay: Math.random() * 4
}));
function CMSLogin() {
	const [username, setUsername] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPass, setShowPass] = (0, import_react.useState)(false);
	const [remember, setRemember] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [userFocus, setUserFocus] = (0, import_react.useState)(false);
	const [passFocus, setPassFocus] = (0, import_react.useState)(false);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const navigate = useNavigate$1();
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!username.trim() || !password.trim()) {
			setError("Please enter both username and password.");
			return;
		}
		setError("");
		setLoading(true);
		try {
			if (!await verifyLogin(username.trim(), password)) {
				setError("Invalid username or password.");
				setLoading(false);
				return;
			}
			sessionStorage.setItem("cms_auth", "1");
			navigate("/cms/dashboard");
		} catch {
			setError("Authentication error. Please try again.");
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			minHeight: "100vh",
			display: "flex",
			fontFamily: "Inter, sans-serif",
			background: MAROON2,
			overflow: "hidden",
			position: "relative"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hidden lg:flex",
			style: {
				width: "52%",
				flexDirection: "column",
				justifyContent: "space-between",
				position: "relative",
				overflow: "hidden",
				background: `linear-gradient(155deg, ${MAROON2} 0%, #5C1428 55%, #3A0710 100%)`,
				padding: "3rem 3.5rem"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					style: {
						position: "absolute",
						inset: 0,
						width: "100%",
						height: "100%",
						opacity: .06,
						pointerEvents: "none"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", {
						id: "grid",
						width: "48",
						height: "48",
						patternUnits: "userSpaceOnUse",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M 48 0 L 0 0 0 48",
							fill: "none",
							stroke: GOLD,
							strokeWidth: "0.6"
						})
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						width: "100%",
						height: "100%",
						fill: "url(#grid)"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					position: "absolute",
					top: "30%",
					left: "20%",
					width: 500,
					height: 500,
					borderRadius: "50%",
					background: `radial-gradient(circle, rgba(199,154,43,0.12) 0%, transparent 70%)`,
					pointerEvents: "none"
				} }),
				mounted && PARTICLES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					style: {
						position: "absolute",
						left: `${p.x}%`,
						top: `${p.y}%`,
						width: p.size,
						height: p.size,
						borderRadius: "50%",
						background: GOLD,
						opacity: .25,
						pointerEvents: "none"
					},
					animate: {
						y: [
							0,
							-18,
							0
						],
						opacity: [
							.15,
							.4,
							.15
						]
					},
					transition: {
						duration: p.duration,
						delay: p.delay,
						repeat: Infinity,
						ease: "easeInOut"
					}
				}, p.id)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					style: {
						position: "absolute",
						right: -120,
						top: "50%",
						transform: "translateY(-50%)",
						opacity: .08,
						pointerEvents: "none"
					},
					width: "520",
					height: "520",
					viewBox: "0 0 520 520",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "260",
							cy: "260",
							r: "240",
							stroke: GOLD,
							strokeWidth: "1.2",
							fill: "none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "260",
							cy: "260",
							r: "190",
							stroke: GOLD,
							strokeWidth: "0.7",
							fill: "none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "260",
							cy: "260",
							r: "130",
							stroke: GOLD,
							strokeWidth: "0.5",
							fill: "none"
						}),
						Array.from({ length: 12 }, (_, i) => {
							const a = i / 12 * Math.PI * 2;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: 260 + 130 * Math.cos(a),
								y1: 260 + 130 * Math.sin(a),
								x2: 260 + 240 * Math.cos(a),
								y2: 260 + 240 * Math.sin(a),
								stroke: GOLD,
								strokeWidth: "0.5"
							}, i);
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					variants: fadeUp(.1),
					initial: "hidden",
					animate: "visible",
					style: {
						position: "relative",
						zIndex: 1
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/branding/f-logo.svg",
						alt: "Planning Secretariat",
						style: {
							height: 200,
							width: "auto",
							objectFit: "contain",
							opacity: .92
						}
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					variants: fadeUp(.2),
					initial: "hidden",
					animate: "visible",
					style: {
						position: "relative",
						zIndex: 1
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "inline-flex",
								alignItems: "center",
								gap: 8,
								background: "rgba(199,154,43,0.12)",
								border: "1px solid rgba(199,154,43,0.3)",
								borderRadius: 100,
								padding: "5px 14px",
								marginBottom: "1.5rem"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiShield, {
								size: 11,
								color: GOLD
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontFamily: "'Cinzel', serif",
									fontSize: "0.65rem",
									letterSpacing: "0.14em",
									color: GOLD,
									fontWeight: 600
								},
								children: "SECURE ADMIN PORTAL"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							style: {
								fontFamily: "'Playfair Display', serif",
								fontSize: "clamp(2rem, 3vw, 2.8rem)",
								fontWeight: 800,
								color: "#fff",
								lineHeight: 1.2,
								marginBottom: "1.1rem"
							},
							children: [
								"Content Management",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: { color: GOLD },
									children: "System"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontSize: "0.9rem",
								color: "rgba(255,255,255,0.52)",
								lineHeight: 1.8,
								maxWidth: 360
							},
							children: "Manage official content, publications, and announcements for the Planning Secretariat web portal from a single secure dashboard."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "flex",
								flexWrap: "wrap",
								gap: 10,
								marginTop: "2rem"
							},
							children: [
								"Content Editor",
								"Media Library",
								"User Roles",
								"Audit Logs",
								"Multilingual"
							].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: "0.73rem",
									fontWeight: 500,
									color: "rgba(255,255,255,0.55)",
									background: "rgba(255,255,255,0.06)",
									border: "1px solid rgba(255,255,255,0.1)",
									borderRadius: 6,
									padding: "4px 11px"
								},
								children: f
							}, f))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.p, {
					variants: fadeUp(.3),
					initial: "hidden",
					animate: "visible",
					style: {
						position: "relative",
						zIndex: 1,
						fontSize: "0.72rem",
						color: "rgba(255,255,255,0.28)",
						letterSpacing: "0.04em"
					},
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Planning Secretariat – Southern Province, Sri Lanka."
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				flex: 1,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: CREAM,
				position: "relative",
				overflow: "hidden",
				padding: "2rem 1.5rem"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					style: {
						position: "absolute",
						inset: 0,
						width: "100%",
						height: "100%",
						opacity: .025,
						pointerEvents: "none"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", {
						id: "dots",
						width: "24",
						height: "24",
						patternUnits: "userSpaceOnUse",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "2",
							cy: "2",
							r: "1.2",
							fill: MAROON
						})
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						width: "100%",
						height: "100%",
						fill: "url(#dots)"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					position: "absolute",
					top: -100,
					right: -100,
					width: 360,
					height: 360,
					borderRadius: "50%",
					background: `radial-gradient(circle, rgba(199,154,43,0.1) 0%, transparent 70%)`,
					pointerEvents: "none"
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/home",
					style: {
						position: "absolute",
						top: "1.25rem",
						right: "1.5rem",
						display: "flex",
						alignItems: "center",
						gap: 5,
						fontSize: "0.72rem",
						color: "rgba(74,9,24,0.42)",
						textDecoration: "none",
						fontWeight: 500,
						zIndex: 2,
						padding: "5px 10px",
						borderRadius: 8,
						border: "1px solid rgba(74,9,24,0.1)",
						transition: "all 0.15s"
					},
					onMouseEnter: (e) => {
						e.currentTarget.style.color = MAROON;
						e.currentTarget.style.background = "rgba(74,9,24,0.04)";
					},
					onMouseLeave: (e) => {
						e.currentTarget.style.color = "rgba(74,9,24,0.42)";
						e.currentTarget.style.background = "transparent";
					},
					children: "← Public Portal"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						width: "100%",
						maxWidth: 420,
						position: "relative",
						zIndex: 1
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "flex lg:hidden",
							variants: fadeUp(0),
							initial: "hidden",
							animate: "visible",
							style: {
								justifyContent: "center",
								marginBottom: "2rem"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/branding/f-logo.svg",
								alt: "Planning Secretariat",
								style: {
									height: 110,
									width: "auto",
									objectFit: "contain"
								}
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							variants: fadeUp(.05),
							initial: "hidden",
							animate: "visible",
							style: {
								display: "flex",
								justifyContent: "center",
								marginBottom: "1.5rem"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									width: 56,
									height: 56,
									borderRadius: 16,
									background: `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									boxShadow: `0 8px 28px rgba(74,9,24,0.28)`
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiShield, {
									size: 24,
									color: "#fff"
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							variants: fadeUp(.1),
							initial: "hidden",
							animate: "visible",
							style: {
								textAlign: "center",
								marginBottom: "2rem"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								style: {
									fontFamily: "'Playfair Display', serif",
									fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
									fontWeight: 800,
									color: MAROON,
									marginBottom: "0.4rem"
								},
								children: "Administrator Sign In"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									fontSize: "0.83rem",
									color: "rgba(74,9,24,0.5)",
									lineHeight: 1.5
								},
								children: "Authorized personnel only — all access is monitored and logged"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							variants: fadeUp(.13),
							initial: "hidden",
							animate: "visible",
							style: {
								display: "flex",
								alignItems: "center",
								gap: 12,
								marginBottom: "1.75rem"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
									flex: 1,
									height: 1,
									background: "rgba(74,9,24,0.1)"
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrnamentDot, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
									flex: 1,
									height: 1,
									background: "rgba(74,9,24,0.1)"
								} })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
							variants: fadeUp(.16),
							initial: "hidden",
							animate: "visible",
							onSubmit: handleSubmit,
							autoComplete: "off",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: { marginBottom: "1.1rem" },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										style: {
											display: "block",
											fontSize: "0.75rem",
											fontWeight: 600,
											color: MAROON,
											letterSpacing: "0.06em",
											textTransform: "uppercase",
											marginBottom: "0.5rem"
										},
										children: "Username"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											position: "relative",
											border: `1.5px solid ${userFocus ? GOLD : "rgba(74,9,24,0.18)"}`,
											borderRadius: 10,
											background: userFocus ? "rgba(199,154,43,0.03)" : "#fff",
											transition: "border-color 0.2s, background 0.2s",
											boxShadow: userFocus ? `0 0 0 3px rgba(199,154,43,0.12)` : "none"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiUser, {
											size: 15,
											style: {
												position: "absolute",
												left: 14,
												top: "50%",
												transform: "translateY(-50%)",
												color: userFocus ? GOLD : "rgba(74,9,24,0.35)",
												transition: "color 0.2s"
											}
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: username,
											onChange: (e) => setUsername(e.target.value),
											onFocus: () => setUserFocus(true),
											onBlur: () => setUserFocus(false),
											placeholder: "Enter your username",
											autoComplete: "username",
											style: {
												width: "100%",
												border: "none",
												outline: "none",
												padding: "12px 14px 12px 40px",
												fontSize: "0.875rem",
												color: MAROON,
												background: "transparent",
												borderRadius: 10,
												fontFamily: "Inter, sans-serif"
											}
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: { marginBottom: "1.1rem" },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										style: {
											display: "block",
											fontSize: "0.75rem",
											fontWeight: 600,
											color: MAROON,
											letterSpacing: "0.06em",
											textTransform: "uppercase",
											marginBottom: "0.5rem"
										},
										children: "Password"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											position: "relative",
											border: `1.5px solid ${passFocus ? GOLD : "rgba(74,9,24,0.18)"}`,
											borderRadius: 10,
											background: passFocus ? "rgba(199,154,43,0.03)" : "#fff",
											transition: "border-color 0.2s, background 0.2s",
											boxShadow: passFocus ? `0 0 0 3px rgba(199,154,43,0.12)` : "none"
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiLock, {
												size: 15,
												style: {
													position: "absolute",
													left: 14,
													top: "50%",
													transform: "translateY(-50%)",
													color: passFocus ? GOLD : "rgba(74,9,24,0.35)",
													transition: "color 0.2s"
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: showPass ? "text" : "password",
												value: password,
												onChange: (e) => setPassword(e.target.value),
												onFocus: () => setPassFocus(true),
												onBlur: () => setPassFocus(false),
												placeholder: "Enter your password",
												autoComplete: "current-password",
												style: {
													width: "100%",
													border: "none",
													outline: "none",
													padding: "12px 44px 12px 40px",
													fontSize: "0.875rem",
													color: MAROON,
													background: "transparent",
													borderRadius: 10,
													fontFamily: "Inter, sans-serif"
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setShowPass((v) => !v),
												style: {
													position: "absolute",
													right: 13,
													top: "50%",
													transform: "translateY(-50%)",
													background: "none",
													border: "none",
													cursor: "pointer",
													padding: 2,
													color: "rgba(74,9,24,0.4)",
													display: "flex",
													alignItems: "center"
												},
												children: showPass ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEyeOff, { size: 15 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEye, { size: 15 })
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										marginBottom: "1.5rem"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										style: {
											display: "flex",
											alignItems: "center",
											gap: 8,
											cursor: "pointer"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											onClick: () => setRemember((v) => !v),
											style: {
												width: 18,
												height: 18,
												borderRadius: 5,
												border: `1.5px solid ${remember ? GOLD : "rgba(74,9,24,0.25)"}`,
												background: remember ? GOLD : "transparent",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												transition: "all 0.18s",
												cursor: "pointer",
												flexShrink: 0
											},
											children: remember && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
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
												fontSize: "0.8rem",
												color: "rgba(74,9,24,0.6)",
												userSelect: "none"
											},
											children: "Keep me signed in"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: {
										opacity: 0,
										y: -8,
										height: 0
									},
									animate: {
										opacity: 1,
										y: 0,
										height: "auto"
									},
									exit: {
										opacity: 0,
										y: -8,
										height: 0
									},
									style: {
										display: "flex",
										alignItems: "center",
										gap: 8,
										background: "rgba(220,38,38,0.07)",
										border: "1px solid rgba(220,38,38,0.2)",
										borderRadius: 8,
										padding: "9px 13px",
										marginBottom: "1rem"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAlertCircle, {
										size: 14,
										color: "#DC2626"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											fontSize: "0.8rem",
											color: "#DC2626"
										},
										children: error
									})]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
									type: "submit",
									whileHover: !loading ? {
										y: -2,
										boxShadow: `0 10px 32px rgba(74,9,24,0.38)`
									} : {},
									whileTap: !loading ? { scale: .98 } : {},
									disabled: loading,
									style: {
										width: "100%",
										padding: "13px",
										borderRadius: 10,
										border: "none",
										cursor: loading ? "not-allowed" : "pointer",
										background: loading ? "rgba(74,9,24,0.5)" : `linear-gradient(135deg, ${MAROON} 0%, #6E1528 100%)`,
										color: "#fff",
										fontFamily: "'Cinzel', serif",
										fontSize: "0.82rem",
										fontWeight: 700,
										letterSpacing: "0.1em",
										textTransform: "uppercase",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										gap: 10,
										boxShadow: loading ? "none" : `0 6px 22px rgba(74,9,24,0.3)`,
										transition: "background 0.2s, box-shadow 0.2s"
									},
									children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiShield, { size: 14 }), " Sign In to Portal"] })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							variants: fadeUp(.28),
							initial: "hidden",
							animate: "visible",
							style: {
								marginTop: "2rem",
								textAlign: "center"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								style: {
									fontSize: "0.72rem",
									color: "rgba(74,9,24,0.35)",
									lineHeight: 1.7
								},
								children: [
									"This is a restricted system. Unauthorized access is prohibited and",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"subject to disciplinary and/or legal action."
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							variants: fadeUp(.34),
							initial: "hidden",
							animate: "visible",
							style: {
								marginTop: "1.25rem",
								display: "flex",
								alignItems: "center",
								gap: 10
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
									flex: 1,
									height: 1,
									background: "rgba(74,9,24,0.08)"
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: "0.68rem",
										color: "rgba(74,9,24,0.28)",
										fontFamily: "'Cinzel', serif",
										letterSpacing: "0.1em"
									},
									children: "CMS v1.0"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
									flex: 1,
									height: 1,
									background: "rgba(74,9,24,0.08)"
								} })
							]
						})
					]
				})
			]
		})]
	});
}
function Spinner() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		animate: { rotate: 360 },
		transition: {
			duration: .9,
			repeat: Infinity,
			ease: "linear"
		},
		style: {
			width: 18,
			height: 18,
			borderRadius: "50%",
			border: "2px solid rgba(255,255,255,0.25)",
			borderTopColor: "#fff"
		}
	});
}
function OrnamentDot() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "18",
		height: "10",
		viewBox: "0 0 18 10",
		fill: "none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "9",
				cy: "5",
				r: "3",
				fill: GOLD,
				opacity: "0.7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "3",
				cy: "5",
				r: "1.5",
				fill: GOLD,
				opacity: "0.35"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "15",
				cy: "5",
				r: "1.5",
				fill: GOLD,
				opacity: "0.35"
			})
		]
	});
}
var SplitComponent = CMSLogin;
//#endregion
export { SplitComponent as component };
