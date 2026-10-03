import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react+tanstack__react-query.mjs";
import { useNavigate$1 } from "./react-router-dom-shim-Y_PNYd7n.mjs";
import { AnimatePresence, motion } from "../_libs/framer-motion.mjs";
import { FiAlertCircle, FiEye, FiEyeOff, FiLock, FiPackage, FiShield, FiUser } from "../_libs/react-icons.mjs";
import { SMPProvider, useSMP } from "./SMPContext-082lc8Y9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/smp-mIN0AXTg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAROON = "#4A0918";
var MAROON2 = "#3A0712";
var GOLD = "#C79A2B";
var CREAM = "#FCFBFA";
var PARTICLES = Array.from({ length: 14 }, (_, i) => ({
	id: i,
	x: Math.random() * 100,
	y: Math.random() * 100,
	size: 1.5 + Math.random() * 2,
	duration: 6 + Math.random() * 8,
	delay: Math.random() * 4
}));
var fadeUp = (delay = 0) => ({
	hidden: {
		opacity: 0,
		y: 20,
		filter: "blur(4px)"
	},
	visible: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: .6,
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
function LoginForm() {
	const { signIn, loading, error } = useSMP();
	const navigate = useNavigate$1();
	const [username, setUsername] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPass, setShowPass] = (0, import_react.useState)(false);
	const [uFocus, setUFocus] = (0, import_react.useState)(false);
	const [pFocus, setPFocus] = (0, import_react.useState)(false);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
		if (typeof window !== "undefined" ? localStorage.getItem("smp_user") : null) navigate("/smp/dashboard", { replace: true });
	}, [navigate]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if ((await signIn(username.trim(), password)).ok) navigate("/smp/dashboard", { replace: true });
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
				width: "50%",
				flexDirection: "column",
				justifyContent: "space-between",
				position: "relative",
				overflow: "hidden",
				padding: "3rem 3.5rem",
				background: `linear-gradient(155deg, ${MAROON2} 0%, #5C1428 55%, #3A0710 100%)`
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
						id: "lg",
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
						fill: "url(#lg)"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					position: "absolute",
					top: "30%",
					left: "20%",
					width: 500,
					height: 500,
					borderRadius: "50%",
					background: `radial-gradient(circle, rgba(199,154,43,0.1) 0%, transparent 70%)`,
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
						opacity: .2,
						pointerEvents: "none"
					},
					animate: {
						y: [
							0,
							-16,
							0
						],
						opacity: [
							.12,
							.35,
							.12
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
						right: -100,
						top: "50%",
						transform: "translateY(-50%)",
						opacity: .07,
						pointerEvents: "none"
					},
					width: "480",
					height: "480",
					viewBox: "0 0 480 480",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "240",
							cy: "240",
							r: "220",
							stroke: GOLD,
							strokeWidth: "1",
							fill: "none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "240",
							cy: "240",
							r: "170",
							stroke: GOLD,
							strokeWidth: "0.6",
							fill: "none"
						}),
						Array.from({ length: 12 }, (_, i) => {
							const a = i / 12 * Math.PI * 2;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: 240 + 170 * Math.cos(a),
								y1: 240 + 170 * Math.sin(a),
								x2: 240 + 220 * Math.cos(a),
								y2: 240 + 220 * Math.sin(a),
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
							height: 180,
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
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPackage, {
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
								children: "STORE MANAGEMENT SYSTEM"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							style: {
								fontFamily: "'Playfair Display', serif",
								fontSize: "clamp(1.9rem, 2.8vw, 2.6rem)",
								fontWeight: 800,
								color: "#fff",
								lineHeight: 1.2,
								marginBottom: "1rem"
							},
							children: [
								"Store & Inventory",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: { color: GOLD },
									children: "Management"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontSize: "0.88rem",
								color: "rgba(255,255,255,0.5)",
								lineHeight: 1.8,
								maxWidth: 340
							},
							children: "Secure inventory tracking, stock control, borrowing management, and audit reporting for the Planning Secretariat."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "flex",
								flexWrap: "wrap",
								gap: 8,
								marginTop: "1.75rem"
							},
							children: [
								"Stock Control",
								"Borrow Track",
								"Issue Slips",
								"Audit Logs",
								"Reports"
							].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: "0.72rem",
									fontWeight: 500,
									color: "rgba(255,255,255,0.5)",
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
						fontSize: "0.7rem",
						color: "rgba(255,255,255,0.25)",
						letterSpacing: "0.04em"
					},
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Planning Secretariat — Southern Province, Sri Lanka."
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
						opacity: .022,
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
					top: -80,
					right: -80,
					width: 320,
					height: 320,
					borderRadius: "50%",
					background: `radial-gradient(circle, rgba(199,154,43,0.08) 0%, transparent 70%)`,
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
						maxWidth: 400,
						position: "relative",
						zIndex: 1
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex lg:hidden",
							style: {
								justifyContent: "center",
								marginBottom: "1.75rem"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/branding/f-logo.svg",
								alt: "logo",
								style: {
									height: 100,
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
									width: 54,
									height: 54,
									borderRadius: 15,
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
								marginBottom: "1.75rem"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								style: {
									fontFamily: "'Playfair Display', serif",
									fontSize: "clamp(1.4rem, 2.5vw, 1.75rem)",
									fontWeight: 800,
									color: MAROON,
									marginBottom: "0.35rem"
								},
								children: "Sign In to SMP"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									fontSize: "0.82rem",
									color: "rgba(74,9,24,0.48)",
									lineHeight: 1.5
								},
								children: "Authorized personnel only"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: -8
							},
							animate: {
								opacity: 1,
								y: 0
							},
							exit: { opacity: 0 },
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
							variants: fadeUp(.15),
							initial: "hidden",
							animate: "visible",
							onSubmit: handleSubmit,
							autoComplete: "off",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: { marginBottom: "1rem" },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										style: {
											display: "block",
											fontSize: "0.72rem",
											fontWeight: 600,
											color: MAROON,
											letterSpacing: "0.07em",
											textTransform: "uppercase",
											marginBottom: "0.45rem"
										},
										children: "Username"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											position: "relative",
											border: `1.5px solid ${uFocus ? GOLD : "rgba(74,9,24,0.18)"}`,
											borderRadius: 10,
											background: uFocus ? "rgba(199,154,43,0.02)" : "#fff",
											boxShadow: uFocus ? `0 0 0 3px rgba(199,154,43,0.1)` : "none",
											transition: "all 0.18s"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiUser, {
											size: 14,
											style: {
												position: "absolute",
												left: 13,
												top: "50%",
												transform: "translateY(-50%)",
												color: uFocus ? GOLD : "rgba(74,9,24,0.35)",
												transition: "color 0.18s"
											}
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: username,
											onChange: (e) => setUsername(e.target.value),
											onFocus: () => setUFocus(true),
											onBlur: () => setUFocus(false),
											placeholder: "Enter username",
											autoComplete: "username",
											style: {
												width: "100%",
												border: "none",
												outline: "none",
												padding: "12px 12px 12px 38px",
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
									style: { marginBottom: "1.5rem" },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										style: {
											display: "block",
											fontSize: "0.72rem",
											fontWeight: 600,
											color: MAROON,
											letterSpacing: "0.07em",
											textTransform: "uppercase",
											marginBottom: "0.45rem"
										},
										children: "Password"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											position: "relative",
											border: `1.5px solid ${pFocus ? GOLD : "rgba(74,9,24,0.18)"}`,
											borderRadius: 10,
											background: pFocus ? "rgba(199,154,43,0.02)" : "#fff",
											boxShadow: pFocus ? `0 0 0 3px rgba(199,154,43,0.1)` : "none",
											transition: "all 0.18s"
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiLock, {
												size: 14,
												style: {
													position: "absolute",
													left: 13,
													top: "50%",
													transform: "translateY(-50%)",
													color: pFocus ? GOLD : "rgba(74,9,24,0.35)",
													transition: "color 0.18s"
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: showPass ? "text" : "password",
												value: password,
												onChange: (e) => setPassword(e.target.value),
												onFocus: () => setPFocus(true),
												onBlur: () => setPFocus(false),
												placeholder: "Enter password",
												autoComplete: "current-password",
												style: {
													width: "100%",
													border: "none",
													outline: "none",
													padding: "12px 40px 12px 38px",
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
													right: 12,
													top: "50%",
													transform: "translateY(-50%)",
													background: "none",
													border: "none",
													cursor: "pointer",
													color: "rgba(74,9,24,0.38)",
													display: "flex"
												},
												children: showPass ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEyeOff, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEye, { size: 14 })
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
									type: "submit",
									disabled: loading,
									whileHover: !loading ? {
										y: -2,
										boxShadow: `0 10px 32px rgba(74,9,24,0.4)`
									} : {},
									whileTap: !loading ? { scale: .98 } : {},
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
										boxShadow: `0 6px 22px rgba(74,9,24,0.3)`,
										transition: "background 0.2s"
									},
									children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiShield, { size: 14 }), " Sign In"] })
								})
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
function SMPLogin() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SMPProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginForm, {}) });
}
var SplitComponent = SMPLogin;
//#endregion
export { SplitComponent as component };
