import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react+tanstack__react-query.mjs";
import { Link$1 } from "./react-router-dom-shim-Y_PNYd7n.mjs";
import { motion } from "../_libs/framer-motion.mjs";
import { FiArrowRight, FiDownload, FiFileText, FiHome } from "../_libs/react-icons.mjs";
import { ComingSoon, usePageHold } from "./ComingSoon-BKqHq8HT.mjs";
import { SeoHead } from "./seo-9D_r0kof.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/documents-DQ0bcarx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAROON = "#4A0918";
var GOLD = "#C79A2B";
var CREAM = "#FCFBFA";
var LANG_META = {
	en: {
		font: "Inter, sans-serif",
		headFont: "'Playfair Display', Georgia, serif",
		isNonLatin: false
	},
	si: {
		font: "'Noto Sans Sinhala', sans-serif",
		headFont: "'Noto Sans Sinhala', sans-serif",
		isNonLatin: true
	},
	ta: {
		font: "'Noto Sans Tamil', sans-serif",
		headFont: "'Noto Sans Tamil', sans-serif",
		isNonLatin: true
	}
};
var T = {
	en: {
		heroAccent: "Southern Province Planning Secretariat",
		pageTitle: "Documents & Reports",
		badgeLabel: "Documents",
		pageSub: "Access official documents, annual reports, policy papers, and publications issued by the Southern Province Planning Secretariat.",
		breadHome: "Home",
		breadCur: "Documents",
		comingSoon: "Document Repository Coming Soon",
		csSub: "We are digitising and cataloguing our document archive. Download access will be available soon.",
		backHome: "Back to Home",
		downloads: "Go to Downloads"
	},
	si: {
		heroAccent: "දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය",
		pageTitle: "ලේඛන හා වාර්තා",
		badgeLabel: "ලේඛන",
		pageSub: "දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය විසින් නිකුත් කරන ලද නිල ලේඛන, වාර්ෂික වාර්තා, ප්‍රතිපත්ති ලිපි හා ප්‍රකාශන.",
		breadHome: "මුල් පිටුව",
		breadCur: "ලේඛන",
		comingSoon: "ලේඛන ගබඩාව ළඟදීම",
		csSub: "අපගේ ලේඛන සංරක්‍ෂාගාරය ඩිජිටල් කරමින් සිටිමු.",
		backHome: "මුල් පිටුවට",
		downloads: "බාගත කිරීම් වෙත"
	},
	ta: {
		heroAccent: "தென் மாகாண திட்டமிடல் செயலகம்",
		pageTitle: "ஆவணங்கள் & அறிக்கைகள்",
		badgeLabel: "ஆவணங்கள்",
		pageSub: "தென் மாகாண திட்டமிடல் செயலகத்தால் வெளியிடப்பட்ட அதிகாரப்பூர்வ ஆவணங்கள், வருடாந்திர அறிக்கைகள் மற்றும் வெளியீடுகள்.",
		breadHome: "முகப்பு",
		breadCur: "ஆவணங்கள்",
		comingSoon: "ஆவண களஞ்சியம் விரைவில்",
		csSub: "எங்கள் ஆவகல மூலக்கூறை டிஜிட்டல் மயமாக்கி வருகிறோம்.",
		backHome: "முகப்புக்கு",
		downloads: "பதிவிறக்கங்களுக்கு"
	}
};
function HoneycombBg() {
	const r = 20, hx = r * Math.sqrt(3), vy = r * 1.5;
	const cells = [];
	for (let row = 0; row < 10; row++) for (let col = 0; col < 20; col++) {
		const cx = col * hx + (row % 2 ? hx / 2 : 0) + r;
		const cy = row * vy + r;
		const pts = Array.from({ length: 6 }, (_, i) => {
			const a = Math.PI / 180 * (60 * i);
			return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
		}).join(" ");
		cells.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: pts,
			stroke: GOLD,
			strokeWidth: "1",
			fill: "none"
		}, `${row}-${col}`));
	}
	const W = 20 * hx + r + 4;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "100%",
		height: "100%",
		viewBox: `0 0 ${W} 314`,
		preserveAspectRatio: "xMidYMid slice",
		fill: "none",
		children: cells
	});
}
function PageHero({ t, meta }) {
	const stagger = {
		hidden: {},
		visible: { transition: { staggerChildren: .1 } }
	};
	const itemV = {
		hidden: {
			opacity: 0,
			y: 22
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: .6,
				ease: [
					.16,
					1,
					.3,
					1
				]
			}
		}
	};
	const slideR = {
		hidden: {
			opacity: 0,
			x: 36
		},
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: .7,
				ease: [
					.16,
					1,
					.3,
					1
				]
			}
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "docs-hero",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "docs-hero__bg",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "docs-hero__noise",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "docs-hero__grid-lines",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "docs-hero__glow docs-hero__glow--gold",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "docs-hero__glow docs-hero__glow--maroon",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "docs-hero__glow docs-hero__glow--right",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "docs-hero__watermark",
				"aria-hidden": "true",
				children: "DOCUMENTS"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "docs-hero__hc",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombBg, {})
			}),
			[...Array(6)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `docs-hero__dot docs-hero__dot--${i + 1}`,
				"aria-hidden": "true"
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "docs-hero__inner",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "docs-hero__left",
					initial: "hidden",
					animate: "visible",
					variants: stagger,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							className: "docs-hero__badge",
							variants: itemV,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "docs-hero__badge-dot",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontFamily: meta.isNonLatin ? meta.font : "'Cinzel', serif",
									letterSpacing: meta.isNonLatin ? 0 : "0.13em",
									textTransform: meta.isNonLatin ? "none" : "uppercase"
								},
								children: t.badgeLabel
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
							className: "docs-hero__title",
							style: {
								fontFamily: meta.headFont,
								lineHeight: meta.isNonLatin ? 1.35 : 1.08
							},
							variants: itemV,
							children: t.pageTitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "docs-hero__rule",
							variants: {
								hidden: {
									scaleX: 0,
									opacity: 0
								},
								visible: {
									scaleX: 1,
									opacity: 1,
									transition: {
										duration: .6,
										ease: [
											.16,
											1,
											.3,
											1
										]
									}
								}
							},
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							className: "docs-hero__sub",
							style: { fontFamily: meta.font },
							variants: itemV,
							children: t.pageSub
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							className: "docs-hero__actions",
							variants: itemV,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
								to: "/downloads",
								className: "docs-hero__btn docs-hero__btn--gold",
								style: { fontFamily: meta.font },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiDownload, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.downloads })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
								to: "/home",
								className: "docs-hero__btn docs-hero__btn--ghost",
								style: { fontFamily: meta.font },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiHome, { size: 15 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.backHome }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, {
										size: 13,
										className: "docs-hero__btn-arrow"
									})
								]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "docs-hero__right",
					initial: "hidden",
					animate: "visible",
					variants: slideR,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/branding/f-logo.svg",
						alt: "Southern Province Planning Secretariat",
						className: "docs-hero__logo",
						onError: (e) => {
							e.currentTarget.style.display = "none";
						}
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: "docs-hero__wave",
				viewBox: "0 0 1440 80",
				preserveAspectRatio: "none",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M0,80 C240,20 480,60 720,40 C960,20 1200,60 1440,30 L1440,80 Z",
					fill: CREAM
				})
			})
		]
	});
}
function ComingSoonSection({ t, meta }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		style: {
			background: CREAM,
			padding: "clamp(4rem,10vw,7rem) clamp(1rem,4vw,3rem)",
			textAlign: "center"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				maxWidth: 560,
				margin: "0 auto"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						width: 64,
						height: 64,
						borderRadius: "50%",
						background: "rgba(199,154,43,0.10)",
						border: "1.5px solid rgba(199,154,43,0.28)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						margin: "0 auto 1.5rem"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiFileText, {
						size: 26,
						color: GOLD
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					style: {
						fontFamily: meta.headFont,
						fontSize: "clamp(1.4rem,3vw,2rem)",
						fontWeight: 800,
						color: MAROON,
						marginBottom: "0.75rem",
						lineHeight: meta.isNonLatin ? 1.4 : 1.2
					},
					children: t.comingSoon
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: {
						fontFamily: meta.font,
						color: "#6B3545",
						fontSize: "0.95rem",
						lineHeight: 1.8
					},
					children: t.csSub
				})
			]
		})
	});
}
function Documents() {
	const held = usePageHold("documents");
	const [lang, setLang] = (0, import_react.useState)(() => (typeof window !== "undefined" ? localStorage.getItem("lang") : null) || "en");
	(0, import_react.useEffect)(() => {
		const h = (e) => setLang(e.detail || "en");
		window.addEventListener("langChange", h);
		return () => window.removeEventListener("langChange", h);
	}, []);
	const meta = LANG_META[lang] || LANG_META.en;
	const t = T[lang] || T.en;
	if (held) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComingSoon, { pageKey: "documents" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeoHead, { page: "documents" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			background: CREAM,
			minHeight: "100vh"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			t,
			meta
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComingSoonSection, {
			t,
			meta
		})]
	})] });
}
var SplitComponent = Documents;
//#endregion
export { SplitComponent as component };
