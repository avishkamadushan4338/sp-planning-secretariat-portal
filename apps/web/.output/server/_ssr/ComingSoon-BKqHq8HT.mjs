import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react+tanstack__react-query.mjs";
import { Link$1, useNavigate$1 } from "./react-router-dom-shim-Y_PNYd7n.mjs";
import { useFooter } from "./FooterContext-BhxD5FhT.mjs";
import { motion } from "../_libs/framer-motion.mjs";
import { FiArrowLeft, FiHome, FiMail, FiPhone } from "../_libs/react-icons.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ComingSoon-BKqHq8HT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE_HOLD_KEY = "cms_page_hold";
function usePageHold(pageKey) {
	const [held, setHeld] = (0, import_react.useState)(() => {
		try {
			return !!JSON.parse((typeof window !== "undefined" ? localStorage.getItem(PAGE_HOLD_KEY) : null) || "{}")[pageKey];
		} catch {
			return false;
		}
	});
	(0, import_react.useEffect)(() => {
		const sync = () => {
			try {
				setHeld(!!JSON.parse((typeof window !== "undefined" ? localStorage.getItem(PAGE_HOLD_KEY) : null) || "{}")[pageKey]);
			} catch {}
		};
		window.addEventListener("cms_page_hold_updated", sync);
		window.addEventListener("storage", sync);
		return () => {
			window.removeEventListener("cms_page_hold_updated", sync);
			window.removeEventListener("storage", sync);
		};
	}, [pageKey]);
	return held;
}
var MAROON = "#4A0918";
var GOLD = "#C79A2B";
var CREAM = "#FCFBFA";
var floatUp = (delay = 0) => ({
	hidden: {
		opacity: 0,
		y: 28,
		filter: "blur(5px)"
	},
	visible: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: .75,
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
var LABELS = {
	en: {
		under: "Under Development",
		body: "This section is currently being built. We're working hard to bring it online soon.",
		back: "Go Back",
		home: "Back to Home"
	},
	si: {
		under: "සංවර්ධනය වෙමින් පවතී",
		body: "මෙම කොටස දැනට ගොඩනැගෙමින් පවතී. ඉක්මනින්ම ඔබ වෙත ලබා දීමට කටයුතු කරමින් සිටිමු.",
		back: "ආපසු යන්න",
		home: "මුල් පිටුව"
	},
	ta: {
		under: "அபிவிருத்தியில் உள்ளது",
		body: "இந்த பகுதி தற்போது உருவாக்கப்பட்டு வருகிறது. விரைவில் உங்களுக்கு கிடைக்கும்.",
		back: "திரும்பு",
		home: "முகப்பு"
	}
};
function ComingSoon({ pageKey }) {
	const navigate = useNavigate$1();
	const lang = (typeof window !== "undefined" ? localStorage.getItem("lang") : null) || "en";
	const t = LABELS[lang] || LABELS.en;
	const { setHidden } = useFooter();
	(0, import_react.useEffect)(() => {
		setHidden(true);
		return () => setHidden(false);
	}, [setHidden]);
	const PAGE_NAMES = {
		en: {
			about: "About Us",
			aboutMinistryOverview: "Secretariat Overview",
			aboutOrganizationStructure: "Organization Structure",
			aboutFunctionsDuties: "Functions & Duties",
			aboutHistory: "History",
			aboutAffiliatedInstitutions: "Affiliated Institutions",
			aboutSecretary: "About Secretary",
			aboutDeputySecretary: "About Deputy Secretary",
			contact: "Contact Us",
			departments: "Divisions",
			documents: "Documents",
			downloads: "Downloads",
			faq: "FAQ",
			gallery: "Gallery",
			news: "Media Center",
			notices: "Notices",
			cms: "Content Management System"
		},
		si: {
			about: "අප ගැන",
			aboutMinistryOverview: "කාර්යාලය පිළිබඳ සාරාංශය",
			aboutOrganizationStructure: "සංවිධාන ව්‍යුහය",
			aboutFunctionsDuties: "කාර්යයන් හා වගකීම්",
			aboutHistory: "ඉතිහාසය",
			aboutAffiliatedInstitutions: "අනුබද්ධ ආයතන",
			aboutSecretary: "ලේකම් පිළිබඳව",
			aboutDeputySecretary: "නියෝජ්‍ය ලේකම් පිළිබඳව",
			contact: "අප අමතන්න",
			departments: "අංශ",
			documents: "ලේඛන",
			downloads: "බාගත කිරීම්",
			faq: "නිතර අසන පැන",
			gallery: "ගැලරිය",
			news: "මාධ්‍ය මධ්‍යස්ථානය",
			notices: "නිවේදන",
			cms: "අන්තර්ගත කළමනාකරණ පද්ධතිය"
		},
		ta: {
			about: "எங்களைப் பற்றி",
			aboutMinistryOverview: "செயலகத்தின் அறிமுகம்",
			aboutOrganizationStructure: "அமைப்பு வடிவமைப்பு",
			aboutFunctionsDuties: "செயல்பாடுகள் மற்றும் கடமைகள்",
			aboutHistory: "வரலாறு",
			aboutAffiliatedInstitutions: "இணைப்பு நிறுவனங்கள்",
			aboutSecretary: "செயலாளர் பற்றி",
			aboutDeputySecretary: "துணை செயலாளர் பற்றி",
			contact: "தொடர்பு கொள்ளுங்கள்",
			departments: "பிரிவுகள்",
			documents: "ஆவணங்கள்",
			downloads: "பதிவிறக்கங்கள்",
			faq: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
			gallery: "தொகுப்பு",
			news: "ஊடக மையம்",
			notices: "அறிவிப்புகள்",
			cms: "உள்ளடக்க மேலாண்மை அமைப்பு"
		}
	};
	const pageName = (PAGE_NAMES[lang] || PAGE_NAMES.en)[pageKey] || pageKey;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "coming-soon-root",
		style: {
			background: CREAM,
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			position: "relative",
			overflow: "hidden",
			fontFamily: "Inter, sans-serif",
			padding: "1.5rem"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden md:block",
				style: {
					position: "absolute",
					top: 0,
					left: 0,
					opacity: .07,
					pointerEvents: "none"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombCorner, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden md:block",
				style: {
					position: "absolute",
					bottom: 0,
					right: 0,
					opacity: .07,
					pointerEvents: "none",
					transform: "rotate(180deg)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombCorner, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
				position: "absolute",
				inset: 0,
				pointerEvents: "none",
				background: `radial-gradient(ellipse 60% 50% at 50% 45%, rgba(199,154,43,0.06) 0%, transparent 70%)`
			} }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					position: "relative",
					zIndex: 1,
					textAlign: "center",
					maxWidth: 580
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						variants: floatUp(0),
						initial: "hidden",
						animate: "visible",
						style: {
							display: "flex",
							justifyContent: "center",
							marginBottom: "1.75rem"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/branding/logo.svg",
							alt: "Southern Province Planning Secretariat",
							onError: (e) => {
								e.currentTarget.src = "/branding/logo.webp";
							},
							style: {
								width: 520,
								height: "auto",
								objectFit: "contain"
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						variants: floatUp(.08),
						initial: "hidden",
						animate: "visible",
						style: {
							display: "flex",
							justifyContent: "center",
							marginBottom: "1rem"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								fontFamily: "'Cinzel', serif",
								fontSize: "0.72rem",
								fontWeight: 600,
								letterSpacing: "0.12em",
								textTransform: "uppercase",
								color: GOLD,
								background: "rgba(199,154,43,0.1)",
								border: "1px solid rgba(199,154,43,0.25)",
								borderRadius: 100,
								padding: "5px 16px"
							},
							children: pageName
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
						variants: floatUp(.16),
						initial: "hidden",
						animate: "visible",
						style: {
							fontFamily: "'Playfair Display', serif",
							fontSize: "clamp(2rem, 4.5vw, 3rem)",
							fontWeight: 800,
							color: MAROON,
							marginBottom: "1rem",
							lineHeight: 1.2
						},
						children: t.under
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						variants: floatUp(.22),
						initial: "hidden",
						animate: "visible",
						style: {
							display: "flex",
							justifyContent: "center",
							marginBottom: "1.25rem"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrnamentLine, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						variants: floatUp(.28),
						initial: "hidden",
						animate: "visible",
						style: {
							fontFamily: lang === "si" || lang === "ta" ? LABELS[lang].font : "Inter, sans-serif",
							fontSize: "clamp(1rem, 1.6vw, 1.13rem)",
							color: "#5A2030",
							opacity: .78,
							lineHeight: 1.9,
							marginBottom: "1.75rem"
						},
						children: t.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						variants: floatUp(.33),
						initial: "hidden",
						animate: "visible",
						style: {
							display: "flex",
							gap: 20,
							justifyContent: "center",
							flexWrap: "wrap",
							marginBottom: "1.5rem"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "tel:+94912234503",
							style: {
								display: "inline-flex",
								alignItems: "center",
								gap: 7,
								fontSize: "0.92rem",
								fontFamily: "Inter, sans-serif",
								fontWeight: 500,
								color: MAROON,
								textDecoration: "none",
								opacity: .8
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPhone, { size: 14 }), " +94 912 234 503"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "mailto:spdcsp@gmail.com",
							style: {
								display: "inline-flex",
								alignItems: "center",
								gap: 7,
								fontSize: "0.92rem",
								fontFamily: "Inter, sans-serif",
								fontWeight: 500,
								color: MAROON,
								textDecoration: "none",
								opacity: .8
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMail, { size: 14 }), " spdcsp@gmail.com"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						variants: floatUp(.44),
						initial: "hidden",
						animate: "visible",
						style: {
							display: "flex",
							gap: 12,
							justifyContent: "center",
							flexWrap: "wrap"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
							whileHover: {
								y: -2,
								scale: 1.02
							},
							whileTap: { scale: .97 },
							onClick: () => navigate(-1),
							style: {
								display: "inline-flex",
								alignItems: "center",
								gap: 7,
								padding: "12px 24px",
								borderRadius: 9,
								background: "transparent",
								border: `1.5px solid ${MAROON}`,
								color: MAROON,
								fontFamily: "Inter, sans-serif",
								fontWeight: 600,
								fontSize: "0.95rem",
								cursor: "pointer"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowLeft, { size: 15 }),
								" ",
								t.back
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
							to: "/home",
							style: { textDecoration: "none" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								whileHover: {
									y: -2,
									scale: 1.02
								},
								whileTap: { scale: .97 },
								style: {
									display: "inline-flex",
									alignItems: "center",
									gap: 7,
									padding: "12px 24px",
									borderRadius: 9,
									background: MAROON,
									color: "#fff",
									fontFamily: "Inter, sans-serif",
									fontWeight: 600,
									fontSize: "0.95rem",
									cursor: "pointer",
									boxShadow: "0 4px 16px rgba(74,9,24,0.26)"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiHome, { size: 15 }),
									" ",
									t.home
								]
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 1440 70",
				preserveAspectRatio: "none",
				style: {
					position: "absolute",
					bottom: 0,
					left: 0,
					width: "100%",
					height: 70,
					display: "block"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "csGold",
						x1: "0",
						y1: "0",
						x2: "1",
						y2: "0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0%",
								stopColor: "#9A7520",
								stopOpacity: "0.45"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "50%",
								stopColor: GOLD,
								stopOpacity: "0.65"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "100%",
								stopColor: "#9A7520",
								stopOpacity: "0.45"
							})
						]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M-40,48 Q360,8 720,28 Q1080,48 1480,18 L1480,70 L-40,70 Z",
						fill: MAROON,
						opacity: "0.07"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M-40,58 Q300,22 720,38 Q1080,54 1480,28 L1480,70 L-40,70 Z",
						fill: "url(#csGold)",
						opacity: "0.4"
					})
				]
			})
		]
	});
}
function OrnamentLine() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 200 16",
		fill: "none",
		style: {
			width: 180,
			height: "auto"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "0",
				y1: "8",
				x2: "82",
				y2: "8",
				stroke: GOLD,
				strokeWidth: "1",
				opacity: "0.3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "118",
				y1: "8",
				x2: "200",
				y2: "8",
				stroke: GOLD,
				strokeWidth: "1",
				opacity: "0.3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "100",
				cy: "8",
				r: "4",
				fill: GOLD,
				opacity: "0.8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "88",
				cy: "8",
				r: "2",
				fill: GOLD,
				opacity: "0.45"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "112",
				cy: "8",
				r: "2",
				fill: GOLD,
				opacity: "0.45"
			})
		]
	});
}
function HoneycombCorner() {
	const r = 15, hx = r * Math.sqrt(3), vy = r * 1.5;
	const pts = (cx, cy) => Array.from({ length: 6 }, (_, i) => {
		const a = Math.PI / 180 * (60 * i);
		return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
	}).join(" ");
	const cells = [];
	for (let row = 0; row < 5; row++) for (let col = 0; col < 5; col++) cells.push({
		cx: col * hx + (row % 2 ? hx / 2 : 0) + r,
		cy: row * vy + r
	});
	const W = 5 * hx + r, H = 120;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: W,
		height: H,
		viewBox: `0 0 ${W} ${H}`,
		fill: "none",
		children: cells.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: pts(p.cx, p.cy),
			stroke: GOLD,
			strokeWidth: "1.2",
			fill: "none"
		}, i))
	});
}
//#endregion
export { ComingSoon, usePageHold };
