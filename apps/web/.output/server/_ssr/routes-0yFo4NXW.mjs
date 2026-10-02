import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react+tanstack__react-query.mjs";
import { useNavigate$1 } from "./react-router-dom-shim-Y_PNYd7n.mjs";
import { AnimatePresence, motion } from "../_libs/framer-motion.mjs";
import { FiArrowRight, FiShield, FiStar, FiUsers } from "../_libs/react-icons.mjs";
import { SeoHead } from "./seo-9D_r0kof.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-0yFo4NXW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LANGUAGES = [
	{
		id: "si",
		symbol: "ඇ",
		native: "සිංහල",
		english: "Sinhala",
		nativeFont: "'Noto Sans Sinhala', sans-serif",
		symbolSize: "1.4rem",
		badgeColor: "#6E1024",
		nameColor: "#6E1024",
		btnColor: "#6E1024"
	},
	{
		id: "ta",
		symbol: "அ",
		native: "தமிழ்",
		english: "Tamil",
		nativeFont: "'Noto Sans Tamil', sans-serif",
		symbolSize: "1.45rem",
		badgeColor: "#C79A2B",
		nameColor: "#C79A2B",
		btnColor: "#C79A2B"
	},
	{
		id: "en",
		symbol: "En",
		native: "English",
		english: "English",
		nativeFont: "'Cinzel', serif",
		symbolSize: "1rem",
		badgeColor: "#4A0918",
		nameColor: "#4A0918",
		btnColor: "#4A0918"
	}
];
var FOOTER_ITEMS = [
	{
		Icon: FiShield,
		text: "අපගේ මෙහෙවර ඔබ වෙනුවෙන්"
	},
	{
		Icon: FiUsers,
		text: "Our Service is For You"
	},
	{
		Icon: FiStar,
		text: "எங்கள் சேவை உங்களுக்காக"
	}
];
var pageIn = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { duration: .5 }
	}
};
var stagger = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: .1,
			delayChildren: .2
		}
	}
};
var fadeUp = {
	hidden: {
		opacity: 0,
		y: 18
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .55,
			ease: [
				.22,
				1,
				.36,
				1
			]
		}
	}
};
var cardAnim = {
	hidden: {
		opacity: 0,
		y: 24,
		scale: .97
	},
	visible: (i) => ({
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: .6,
			delay: .35 + i * .1,
			ease: [
				.22,
				1,
				.36,
				1
			]
		}
	})
};
function LandingPage() {
	const navigate = useNavigate$1();
	const [entering, setEntering] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const style = document.createElement("style");
		style.id = "landing-no-scrollbar";
		style.textContent = `
      html, body {
        overflow: hidden !important;
        scrollbar-width: none !important;
      }
      html::-webkit-scrollbar,
      body::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
      }
    `;
		document.head.appendChild(style);
		return () => document.getElementById("landing-no-scrollbar")?.remove();
	}, []);
	const handleSelect = (langId) => {
		if (entering) return;
		setEntering(langId);
		localStorage.setItem("lang", langId);
		window.dispatchEvent(new CustomEvent("langChange", { detail: langId }));
		setTimeout(() => navigate(`/${langId}/home`), 850);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeoHead, { page: "home" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "h-screen flex flex-col relative overflow-hidden",
		style: {
			background: PAGE_BG,
			height: "100dvh"
		},
		variants: pageIn,
		initial: "hidden",
		animate: "visible",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden sm:block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombDecor, { corner: "top-left" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombDecor, { corner: "bottom-right" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 pointer-events-none",
				style: CENTER_GLOW
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.main, {
				className: "relative z-10 flex-1 min-h-0 flex flex-col items-center justify-center\r\n                     px-4 sm:px-6 pt-3 sm:pt-4 pb-10 sm:pb-16",
				variants: stagger,
				initial: "hidden",
				animate: "visible",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						variants: fadeUp,
						className: "mb-1 sm:mb-2 flex justify-center w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmblemBadge, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						variants: fadeUp,
						className: "text-center px-2 mb-0.5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "font-bold leading-snug",
							style: {
								fontFamily: "'Playfair Display', 'Noto Sans Sinhala', 'Noto Sans Tamil', serif",
								fontSize: "clamp(1.2rem, 5vw, 2.9rem)",
								color: "#4A0918"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ආයුබෝවන්" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										color: "#C79A2B",
										fontWeight: 400,
										margin: "0 0.3em"
									},
									children: "|"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "வணக்கம்" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										color: "#C79A2B",
										fontWeight: 400,
										margin: "0 0.3em"
									},
									children: "|"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Welcome" })
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						variants: fadeUp,
						className: "my-1 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrnamentDivider, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						variants: fadeUp,
						className: "text-center w-full max-w-xl mb-2 sm:mb-3 px-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: SUBTITLE_STYLE,
								className: "mb-0.5",
								children: "දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලයේ නිල වෙබ් අඩවියට පිළිගනිමු."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									...SUBTITLE_STYLE,
									fontSize: "clamp(0.58rem, 1.5vw, 0.78rem)"
								},
								className: "mb-0.5",
								children: "தென் மாகாண திட்டமிடல் செயலகத்தின் அதிகாரப்பூர்வ இணையத்தளத்திற்கு வருக."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									...SUBTITLE_STYLE,
									fontFamily: "Plus Jakarta Sans, sans-serif"
								},
								children: "Official Website of the Planning Secretariat, Southern Province."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-full max-w-2xl grid grid-cols-3 gap-2 sm:gap-4 md:gap-5 px-2 sm:px-2",
						children: LANGUAGES.map((lang, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageCard, {
							lang,
							index: i,
							entering,
							onSelect: handleSelect
						}, lang.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				className: "relative z-10 flex-shrink-0",
				initial: {
					opacity: 0,
					y: 16
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .75,
					delay: .9
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					viewBox: "0 0 1440 36",
					preserveAspectRatio: "none",
					className: "w-full block",
					style: {
						height: "28px",
						marginBottom: "-1px"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M0,36 Q720,0,1440,36 L1440,36 L0,36 Z",
						fill: "#4A0918"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-4 sm:px-6 pt-2.5 sm:pt-3",
					style: {
						background: "#4A0918",
						paddingBottom: "max(0.75rem, env(safe-area-inset-bottom, 0.75rem))"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col sm:flex-row items-center justify-center gap-y-1 sm:gap-y-0 sm:gap-x-8",
						children: FOOTER_ITEMS.map(({ Icon, text }, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								size: 14,
								style: {
									color: "#C79A2B",
									flexShrink: 0
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: FOOTER_TEXT,
								children: text
							})]
						}, i))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-center mt-1.5",
						style: FOOTER_COPYRIGHT,
						children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" Planning Secretariat – Southern Province, Sri Lanka. All Rights Reserved."
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: entering && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "fixed inset-0 z-50 pointer-events-none",
				style: { background: LANGUAGES.find((l) => l.id === entering)?.btnColor || "#4A0918" },
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				transition: {
					duration: .75,
					ease: "easeInOut"
				}
			}, "overlay") })
		]
	})] });
}
function LanguageCard({ lang, index, entering, onSelect }) {
	const [hovered, setHovered] = (0, import_react.useState)(false);
	const isActive = entering === lang.id;
	const isDimmed = entering && !isActive;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
		custom: index,
		variants: cardAnim,
		initial: "hidden",
		animate: "visible",
		whileHover: {
			y: -4,
			transition: {
				duration: .22,
				ease: [
					.22,
					1,
					.36,
					1
				]
			}
		},
		onHoverStart: () => setHovered(true),
		onHoverEnd: () => setHovered(false),
		onClick: () => onSelect(lang.id),
		className: "cursor-pointer select-none overflow-hidden rounded-xl sm:rounded-2xl flex flex-col",
		style: {
			background: "#FFFFFF",
			border: `1px solid ${hovered || isActive ? lang.btnColor + "55" : "rgba(110,16,36,0.1)"}`,
			boxShadow: hovered || isActive ? `0 12px 32px rgba(0,0,0,0.13), 0 0 0 1px ${lang.btnColor}33` : "0 3px 14px rgba(0,0,0,0.07)",
			opacity: isDimmed ? .3 : 1,
			transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)"
		},
		role: "button",
		"aria-label": `Select ${lang.english} language`,
		tabIndex: 0,
		onKeyDown: (e) => e.key === "Enter" && onSelect(lang.id),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 flex flex-col items-center text-center px-2 pt-3 pb-2 sm:px-4 sm:pt-5 sm:pb-3 md:px-5 md:pt-6 md:pb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "rounded-full flex items-center justify-center flex-shrink-0 mb-2 sm:mb-3",
					animate: { scale: hovered ? 1.07 : 1 },
					transition: {
						duration: .22,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					style: {
						width: "clamp(40px, 10vw, 68px)",
						height: "clamp(40px, 10vw, 68px)",
						background: lang.badgeColor,
						boxShadow: hovered || isActive ? `0 5px 16px ${lang.badgeColor}55` : `0 2px 8px ${lang.badgeColor}33`,
						transition: "box-shadow 0.28s ease"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							fontFamily: lang.nativeFont,
							fontSize: "clamp(0.85rem, 2.5vw, 1.4rem)",
							fontWeight: 700,
							color: "#FFFFFF",
							lineHeight: 1
						},
						children: lang.symbol
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-bold leading-tight",
					style: {
						fontFamily: lang.nativeFont,
						fontSize: "clamp(0.75rem, 2.5vw, 1.45rem)",
						color: lang.nameColor,
						letterSpacing: lang.id === "en" ? "0.03em" : "0"
					},
					children: lang.native
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden sm:block mt-1",
					style: {
						fontFamily: "Inter, sans-serif",
						fontSize: "0.68rem",
						letterSpacing: "0.1em",
						textTransform: "uppercase",
						color: "#777777"
					},
					children: lang.english
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			className: "flex items-center justify-center",
			animate: { backgroundColor: hovered || isActive ? lang.btnColor : lang.btnColor + "dd" },
			transition: { duration: .22 },
			style: {
				height: "clamp(30px, 5vw, 46px)",
				borderBottomLeftRadius: "inherit",
				borderBottomRightRadius: "inherit",
				cursor: "pointer"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				animate: { x: hovered ? 3 : 0 },
				transition: { duration: .18 },
				style: {
					display: "flex",
					alignItems: "center",
					color: "#FFFFFF"
				},
				children: isActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: {
						fontFamily: lang.nativeFont,
						fontSize: "0.65rem",
						fontWeight: 600,
						letterSpacing: "0.04em"
					},
					children: lang.id === "si" ? "විවෘත වෙමින්…" : lang.id === "ta" ? "திறக்கிறது…" : "Opening…"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, {
					size: 16,
					strokeWidth: 2.5
				})
			})
		})]
	});
}
function EmblemBadge() {
	const [imageError, setImageError] = (0, import_react.useState)(false);
	if (!imageError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/branding/logo.svg",
		alt: "Southern Province Planning Secretariat",
		onError: () => setImageError(true),
		style: {
			width: "clamp(180px, 55vw, 780px)",
			maxWidth: "100%",
			maxHeight: "clamp(80px, 22vh, 200px)",
			height: "auto",
			objectFit: "contain",
			display: "block"
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center gap-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-full flex items-center justify-center flex-shrink-0",
			style: {
				width: "clamp(56px, 14vw, 90px)",
				height: "clamp(56px, 14vw, 90px)",
				background: "linear-gradient(145deg, #fff9ee 0%, #fef3d5 100%)",
				border: "2.5px solid #C79A2B",
				boxShadow: "0 2px 12px rgba(199,154,43,0.22)"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmblemSVG, {})
		})
	});
}
function EmblemSVG() {
	const spokes = Array.from({ length: 8 }, (_, i) => {
		const a = i * 45 * Math.PI / 180;
		return {
			x1: 18 + 5 * Math.cos(a),
			y1: 18 + 5 * Math.sin(a),
			x2: 18 + 11 * Math.cos(a),
			y2: 18 + 11 * Math.sin(a)
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "34",
		height: "34",
		viewBox: "0 0 36 36",
		fill: "none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "18",
				cy: "18",
				r: "16",
				stroke: "#C79A2B",
				strokeWidth: "1.5",
				fill: "none",
				opacity: "0.9"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "18",
				cy: "18",
				r: "11.5",
				stroke: "#C79A2B",
				strokeWidth: "0.9",
				fill: "none",
				opacity: "0.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "18",
				cy: "18",
				r: "2.6",
				fill: "#C79A2B",
				opacity: "0.75"
			}),
			spokes.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: s.x1,
				y1: s.y1,
				x2: s.x2,
				y2: s.y2,
				stroke: "#C79A2B",
				strokeWidth: "1",
				opacity: "0.65"
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M15 23 C14 21 14 18 16 16.5 C17 15.5 18 15 18 15 C18 15 19 15.5 20 16.5 C22 18 22 21 21 23 Z",
				fill: "#6E1024",
				opacity: "0.9"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "18",
				cy: "13.8",
				r: "2.8",
				fill: "#6E1024",
				opacity: "0.9"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "18",
				cy: "13.8",
				r: "4.3",
				stroke: "#C79A2B",
				strokeWidth: "1",
				fill: "none",
				opacity: "0.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "21.2",
				y1: "11.6",
				x2: "25.5",
				y2: "7.5",
				stroke: "#C79A2B",
				strokeWidth: "1.5",
				strokeLinecap: "round",
				opacity: "0.8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "24.5",
				y1: "8",
				x2: "25.8",
				y2: "9.5",
				stroke: "#C79A2B",
				strokeWidth: "1",
				strokeLinecap: "round",
				opacity: "0.6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M21 22 C23.5 20 26 21.5 25 24.5",
				stroke: "#6E1024",
				strokeWidth: "1.3",
				fill: "none",
				strokeLinecap: "round",
				opacity: "0.65"
			})
		]
	});
}
function OrnamentDivider() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 260 28",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		style: {
			width: "clamp(140px, 60vw, 260px)",
			height: "auto"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M130 4 L135 14 L130 24 L125 14 Z",
				fill: "#C79A2B",
				opacity: "0.9"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M130 8 L133 14 L130 20 L127 14 Z",
				fill: "#FCFBFA",
				opacity: "0.8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "0",
				y1: "14",
				x2: "115",
				y2: "14",
				stroke: "#C79A2B",
				strokeWidth: "1",
				opacity: "0.35"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "145",
				y1: "14",
				x2: "260",
				y2: "14",
				stroke: "#C79A2B",
				strokeWidth: "1",
				opacity: "0.35"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M115 14 C104 14 98 7 90 9 C82 11 80 14 75 14 C70 14 68 10 64 12 C60 14 58 14 55 14",
				stroke: "#C79A2B",
				strokeWidth: "1.2",
				fill: "none",
				strokeLinecap: "round",
				opacity: "0.75"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M145 14 C156 14 162 7 170 9 C178 11 180 14 185 14 C190 14 192 10 196 12 C200 14 202 14 205 14",
				stroke: "#C79A2B",
				strokeWidth: "1.2",
				fill: "none",
				strokeLinecap: "round",
				opacity: "0.75"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "50",
				cy: "14",
				r: "1.8",
				fill: "#C79A2B",
				opacity: "0.55"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "44",
				cy: "14",
				r: "1.2",
				fill: "#C79A2B",
				opacity: "0.35"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "210",
				cy: "14",
				r: "1.8",
				fill: "#C79A2B",
				opacity: "0.55"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "216",
				cy: "14",
				r: "1.2",
				fill: "#C79A2B",
				opacity: "0.35"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M120 14 C118 11 116 11 115 14 C116 17 118 17 120 14 Z",
				fill: "#C79A2B",
				opacity: "0.6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M140 14 C142 11 144 11 145 14 C144 17 142 17 140 14 Z",
				fill: "#C79A2B",
				opacity: "0.6"
			})
		]
	});
}
function HoneycombDecor({ corner }) {
	const r = 20;
	const hx = r * Math.sqrt(3);
	const vy = r * 1.5;
	const hexPoints = (cx, cy) => Array.from({ length: 6 }, (_, i) => {
		const a = Math.PI / 180 * (60 * i);
		return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
	}).join(" ");
	const positions = [];
	for (let row = 0; row < 5; row++) for (let col = 0; col < 5; col++) positions.push({
		cx: col * hx + (row % 2 === 1 ? hx / 2 : 0) + r,
		cy: row * vy + r
	});
	const svgW = 5 * hx + r + 4;
	const svgH = 164;
	const isTop = corner.includes("top");
	const isLeft = corner.includes("left");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute pointer-events-none",
		style: {
			top: isTop ? 0 : "auto",
			bottom: isTop ? "auto" : 0,
			left: isLeft ? 0 : "auto",
			right: isLeft ? "auto" : 0,
			opacity: .15,
			transform: `scale(${isLeft ? 1 : -1}, ${isTop ? 1 : -1})`,
			transformOrigin: "center"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			width: svgW,
			height: svgH,
			viewBox: `0 0 ${svgW} ${svgH}`,
			fill: "none",
			children: positions.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: hexPoints(p.cx, p.cy),
				stroke: "#C79A2B",
				strokeWidth: "1.5",
				fill: "none"
			}, i))
		})
	});
}
var PAGE_BG = "#F8F5F0";
var CENTER_GLOW = { background: "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(201,166,70,0.08) 0%, transparent 70%)" };
var SUBTITLE_STYLE = {
	fontFamily: "'Noto Sans Sinhala', 'Noto Sans Tamil', Plus Jakarta Sans, sans-serif",
	fontSize: "clamp(0.68rem, 1.8vw, 0.82rem)",
	color: "#2B2B2B",
	lineHeight: 1.7,
	opacity: .82,
	overflowWrap: "break-word",
	wordBreak: "break-word"
};
var FOOTER_TEXT = {
	fontFamily: "'Noto Sans Sinhala', 'Noto Sans Tamil', Plus Jakarta Sans, sans-serif",
	fontSize: "clamp(0.68rem, 1.8vw, 0.88rem)",
	color: "rgba(248,245,240,0.86)"
};
var FOOTER_COPYRIGHT = {
	fontFamily: "Inter, sans-serif",
	fontSize: "0.65rem",
	letterSpacing: "0.05em",
	color: "rgba(201,166,70,0.65)"
};
var SplitComponent = LandingPage;
//#endregion
export { SplitComponent as component };
