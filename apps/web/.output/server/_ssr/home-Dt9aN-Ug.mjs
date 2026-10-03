import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react+tanstack__react-query.mjs";
import { Link$1 } from "./react-router-dom-shim-Y_PNYd7n.mjs";
import { faqsApi, homeContentApi, staffApi } from "./cmsContentApi-C5pJ-eT_.mjs";
import { resolveUploadUrl } from "./resolveUploadUrl-Bmb9GHFy.mjs";
import { AnimatePresence, motion, useInView } from "../_libs/framer-motion.mjs";
import { FiActivity, FiArrowRight, FiBell, FiChevronDown, FiDownload, FiExternalLink, FiFileText, FiImage, FiMapPin, FiMessageCircle, FiMonitor, FiPhone, FiTrendingUp, FiUsers, HiOutlineNewspaper, HiOutlineOfficeBuilding } from "../_libs/react-icons.mjs";
import { SeoHead } from "./seo-9D_r0kof.mjs";
import { ArrowRight, BadgeCheck, Calendar, ChevronLeft, ChevronRight, Clock, MapPin, PenLine, Quote, Star, X } from "../_libs/lucide-react.mjs";
import { useInView as useInView$1 } from "../_libs/react-intersection-observer.mjs";
import { require_build } from "../_libs/react-countup.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/home-Dt9aN-Ug.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_build = /* @__PURE__ */ __toESM(require_build());
var API_BASE = "";
async function loadItems() {
	try {
		const res = await fetch(`${API_BASE}/api/news-bar`);
		if (!res.ok) return [];
		return (await res.json()).filter((n) => n.status === "Active").sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)).slice(0, 2);
	} catch {
		return [];
	}
}
function HomeNewsBar({ lang = "en" }) {
	const [items, setItems] = (0, import_react.useState)([]);
	const [reduced, setReduced] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReduced(mq.matches);
		const h = (e) => setReduced(e.matches);
		mq.addEventListener("change", h);
		return () => mq.removeEventListener("change", h);
	}, []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const run = () => loadItems().then((data) => {
			if (!cancelled) setItems(data);
		});
		run();
		const id = setInterval(run, 3e4);
		return () => {
			cancelled = true;
			clearInterval(id);
		};
	}, []);
	const descKey = lang === "si" ? "descriptionSi" : lang === "ta" ? "descriptionTa" : "descriptionEn";
	const texts = (0, import_react.useMemo)(() => items.map((it) => (it[descKey] || "").trim()).filter(Boolean), [items, descKey]);
	if (texts.length === 0) return null;
	const separator = "   ◆   ";
	const ticker = texts.join(separator) + separator;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "hnb",
		role: "marquee",
		"aria-label": "Latest news",
		"aria-live": "off",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hnb__shell",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hnb__label",
					"aria-hidden": "true",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hnb__dot" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hnb__label-text",
						children: "Latest News"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hnb__divider",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hnb__track-wrap",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `hnb__track${reduced ? " hnb__track--paused" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hnb__text",
							children: ticker
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hnb__text",
							"aria-hidden": "true",
							children: ticker
						})]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "hnb__sr-only",
			children: texts.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t }, i))
		})]
	});
}
var LINKS = {
	en: [
		{
			key: "notice",
			label: "Notice",
			Icon: FiBell,
			to: "/news?tab=notices"
		},
		{
			key: "news",
			label: "News",
			Icon: HiOutlineNewspaper,
			to: "/news?tab=news"
		},
		{
			key: "gallery",
			label: "Gallery",
			Icon: FiImage,
			to: "/news?tab=gallery"
		},
		{
			key: "downloads",
			label: "Downloads",
			Icon: FiDownload,
			to: "/downloads"
		},
		{
			key: "pms-old",
			label: "PMS Old",
			Icon: FiActivity,
			href: "https://progress.spfeedback.lk/index.php"
		},
		{
			key: "pms-new",
			label: "PMS New",
			Icon: FiMonitor,
			href: "https://planningsec.lk/login"
		}
	],
	si: [
		{
			key: "notice",
			label: "නිවේදන",
			Icon: FiBell,
			to: "/news?tab=notices"
		},
		{
			key: "news",
			label: "පුවත්",
			Icon: HiOutlineNewspaper,
			to: "/news?tab=news"
		},
		{
			key: "gallery",
			label: "ඡායාරූප ගැලරිය",
			Icon: FiImage,
			to: "/news?tab=gallery"
		},
		{
			key: "downloads",
			label: "බාගත කිරීම්",
			Icon: FiDownload,
			to: "/downloads"
		},
		{
			key: "pms-old",
			label: "PMS Old",
			Icon: FiActivity,
			href: "https://progress.spfeedback.lk/index.php"
		},
		{
			key: "pms-new",
			label: "PMS New",
			Icon: FiMonitor,
			href: "https://planningsec.lk/login"
		}
	],
	ta: [
		{
			key: "notice",
			label: "அறிவிப்புகள்",
			Icon: FiBell,
			to: "/news?tab=notices"
		},
		{
			key: "news",
			label: "செய்திகள்",
			Icon: HiOutlineNewspaper,
			to: "/news?tab=news"
		},
		{
			key: "gallery",
			label: "புகைப்பட தொகுப்பு",
			Icon: FiImage,
			to: "/news?tab=gallery"
		},
		{
			key: "downloads",
			label: "பதிவிறக்கங்கள்",
			Icon: FiDownload,
			to: "/downloads"
		},
		{
			key: "pms-old",
			label: "PMS Old",
			Icon: FiActivity,
			href: "https://progress.spfeedback.lk/index.php"
		},
		{
			key: "pms-new",
			label: "PMS New",
			Icon: FiMonitor,
			href: "https://planningsec.lk/login"
		}
	]
};
var cardVariants$1 = {
	hidden: {
		opacity: 0,
		y: 32,
		filter: "blur(8px)",
		scale: .97
	},
	visible: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		scale: 1,
		transition: {
			duration: .7,
			ease: [
				.22,
				1,
				.36,
				1
			]
		}
	}
};
var itemVariants = {
	hidden: {
		opacity: 0,
		y: 20,
		filter: "blur(4px)"
	},
	visible: (i) => ({
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: .55,
			delay: .08 + i * .07,
			ease: [
				.22,
				1,
				.36,
				1
			]
		}
	})
};
function HomeQuickLinks({ lang }) {
	const [activeLang, setActiveLang] = (0, import_react.useState)(lang || (typeof window !== "undefined" ? localStorage.getItem("lang") : null) || "en");
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, {
		once: true,
		amount: .2
	});
	(0, import_react.useEffect)(() => {
		const handler = (e) => setActiveLang(e.detail || "en");
		window.addEventListener("langChange", handler);
		return () => window.removeEventListener("langChange", handler);
	}, []);
	(0, import_react.useEffect)(() => {
		if (lang) setActiveLang(lang);
	}, [lang]);
	const links = LINKS[activeLang] || LINKS.en;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref,
		className: "hql",
		"aria-label": "Quick Links",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hql__glow",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				className: "hql__art",
				"aria-hidden": "true",
				xmlns: "http://www.w3.org/2000/svg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("pattern", {
							id: "hql-grid",
							x: "0",
							y: "0",
							width: "28",
							height: "28",
							patternUnits: "userSpaceOnUse",
							patternTransform: "rotate(45)",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "28",
								stroke: "rgba(199,154,43,0.10)",
								strokeWidth: "0.5"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: "0",
								y1: "0",
								x2: "28",
								y2: "0",
								stroke: "rgba(199,154,43,0.10)",
								strokeWidth: "0.5"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("pattern", {
							id: "hql-diamond",
							x: "0",
							y: "0",
							width: "40",
							height: "40",
							patternUnits: "userSpaceOnUse",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
								points: "20,2 38,20 20,38 2,20",
								fill: "none",
								stroke: "rgba(74,9,24,0.07)",
								strokeWidth: "0.8"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "20",
								cy: "20",
								r: "1.5",
								fill: "rgba(199,154,43,0.18)"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
							id: "hql-vignette",
							cx: "50%",
							cy: "50%",
							r: "55%",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0%",
								stopColor: "white",
								stopOpacity: "0"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "100%",
								stopColor: "white",
								stopOpacity: "0.55"
							})]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						width: "100%",
						height: "100%",
						fill: "url(#hql-grid)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						width: "100%",
						height: "100%",
						fill: "url(#hql-diamond)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						width: "100%",
						height: "100%",
						fill: "url(#hql-vignette)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: "0",
						y1: "30%",
						x2: "100%",
						y2: "30%",
						stroke: "rgba(199,154,43,0.08)",
						strokeWidth: "1",
						strokeDasharray: "6 10"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: "0",
						y1: "70%",
						x2: "100%",
						y2: "70%",
						stroke: "rgba(199,154,43,0.08)",
						strokeWidth: "1",
						strokeDasharray: "6 10"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						className: "hql__ornament hql__ornament--l",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: "0",
								y1: "-32",
								x2: "0",
								y2: "32",
								stroke: "rgba(199,154,43,0.30)",
								strokeWidth: "1.2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: "-32",
								y1: "0",
								x2: "32",
								y2: "0",
								stroke: "rgba(199,154,43,0.30)",
								strokeWidth: "1.2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
								points: "0,-10 10,0 0,10 -10,0",
								fill: "none",
								stroke: "rgba(199,154,43,0.45)",
								strokeWidth: "1.1"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "0",
								cy: "0",
								r: "2.5",
								fill: "rgba(199,154,43,0.55)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "0",
								cy: "-32",
								r: "1.5",
								fill: "rgba(199,154,43,0.30)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "0",
								cy: "32",
								r: "1.5",
								fill: "rgba(199,154,43,0.30)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "-32",
								cy: "0",
								r: "1.5",
								fill: "rgba(199,154,43,0.30)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "32",
								cy: "0",
								r: "1.5",
								fill: "rgba(199,154,43,0.30)"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						className: "hql__ornament hql__ornament--r",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: "0",
								y1: "-32",
								x2: "0",
								y2: "32",
								stroke: "rgba(199,154,43,0.30)",
								strokeWidth: "1.2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: "-32",
								y1: "0",
								x2: "32",
								y2: "0",
								stroke: "rgba(199,154,43,0.30)",
								strokeWidth: "1.2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
								points: "0,-10 10,0 0,10 -10,0",
								fill: "none",
								stroke: "rgba(199,154,43,0.45)",
								strokeWidth: "1.1"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "0",
								cy: "0",
								r: "2.5",
								fill: "rgba(199,154,43,0.55)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "0",
								cy: "-32",
								r: "1.5",
								fill: "rgba(199,154,43,0.30)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "0",
								cy: "32",
								r: "1.5",
								fill: "rgba(199,154,43,0.30)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "-32",
								cy: "0",
								r: "1.5",
								fill: "rgba(199,154,43,0.30)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "32",
								cy: "0",
								r: "1.5",
								fill: "rgba(199,154,43,0.30)"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
						className: "hql__float hql__float--a",
						points: "0,-7 7,0 0,7 -7,0",
						fill: "rgba(199,154,43,0.18)",
						stroke: "rgba(199,154,43,0.40)",
						strokeWidth: "0.8"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
						className: "hql__float hql__float--b",
						points: "0,-5 5,0 0,5 -5,0",
						fill: "rgba(74,9,24,0.10)",
						stroke: "rgba(74,9,24,0.25)",
						strokeWidth: "0.8"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
						className: "hql__float hql__float--c",
						points: "0,-4 4,0 0,4 -4,0",
						fill: "rgba(199,154,43,0.14)",
						stroke: "rgba(199,154,43,0.32)",
						strokeWidth: "0.7"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
						className: "hql__float hql__float--d",
						points: "0,-6 6,0 0,6 -6,0",
						fill: "rgba(199,154,43,0.12)",
						stroke: "rgba(199,154,43,0.28)",
						strokeWidth: "0.7"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
						className: "hql__float hql__float--e",
						points: "0,-5 5,0 0,5 -5,0",
						fill: "rgba(74,9,24,0.08)",
						stroke: "rgba(74,9,24,0.20)",
						strokeWidth: "0.7"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						className: "hql__arc",
						d: "M -20 110 Q 960 20 1940 110",
						fill: "none",
						stroke: "rgba(199,154,43,0.09)",
						strokeWidth: "1.2"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hql__container",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "hql__card",
					role: "list",
					variants: cardVariants$1,
					initial: "hidden",
					animate: inView ? "visible" : "hidden",
					children: links.map(({ key, label, Icon, to, href }, i) => {
						const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							i > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hql__divider",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
								className: "hql__icon-wrap",
								"aria-hidden": "true",
								variants: itemVariants,
								custom: i,
								initial: "hidden",
								animate: inView ? "visible" : "hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 22 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
								className: "hql__label",
								variants: itemVariants,
								custom: i,
								initial: "hidden",
								animate: inView ? "visible" : "hidden",
								children: label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hql__bar",
								"aria-hidden": "true"
							})
						] });
						return href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "hql__item",
							role: "listitem",
							"aria-label": label,
							children: inner
						}, key) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
							to,
							className: "hql__item",
							role: "listitem",
							"aria-label": label,
							children: inner
						}, key);
					})
				})
			})
		]
	});
}
/**
* Drop-in <img> replacement with a gold shimmer skeleton.
*
* Props (all standard <img> props, plus):
*   fill      — true (default): wrapper fills parent, img covers it (for framed images)
*               false: wrapper is inline, img is sized by its className (for logos, signatures)
*   fallback  — JSX shown on load error (optional)
*   radius    — CSS border-radius override (optional)
*/
function ProgressiveImage({ src, alt, className = "", fallback, fill = true, radius, style, ...rest }) {
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	const [errored, setErrored] = (0, import_react.useState)(false);
	const imgRef = (0, import_react.useRef)(null);
	const wrapStyle = radius ? { borderRadius: radius } : void 0;
	const imgStyle = {
		opacity: loaded ? 1 : 0,
		transition: "opacity 0.45s cubic-bezier(0.16,1,0.3,1)",
		...radius ? { borderRadius: radius } : {},
		...style
	};
	if (errored) return fallback ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pi-error",
		style: wrapStyle,
		"aria-label": alt,
		role: "img",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 48 48",
			fill: "none",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "4",
					y: "10",
					width: "40",
					height: "28",
					rx: "3",
					stroke: "#C79A2B",
					strokeWidth: "1.8"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "16",
					cy: "20",
					r: "4",
					stroke: "#C79A2B",
					strokeWidth: "1.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M4 32 L14 22 L22 30 L30 22 L44 34",
					stroke: "#C79A2B",
					strokeWidth: "1.5",
					strokeLinejoin: "round"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `pi-wrap${fill ? " pi-wrap--fill" : ""}${loaded ? " pi-wrap--loaded" : ""}`,
		style: wrapStyle,
		children: [!loaded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pi-skeleton",
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			ref: imgRef,
			src,
			alt,
			className: `pi-img${className ? ` ${className}` : ""}`,
			style: imgStyle,
			onLoad: () => setLoaded(true),
			onError: () => setErrored(true),
			decoding: "async",
			...rest
		})]
	});
}
var T$3 = {
	en: {
		eyebrow: "About the Secretariat",
		title: "Planning Secretariat\xA0– Southern Province",
		subtitle: "Coordinating development, monitoring progress, and guiding sustainable growth across the Southern Province.",
		body: "The Planning Secretariat of the Southern Province serves as the key provincial institution responsible for development planning, policy coordination, and the strategic management of public investment across the districts of Galle, Matara, and Hambantota. Established under the 13th Amendment of the Constitution — the Provincial Councils Act — the Secretariat plays a leading role in guiding the socio-economic development of the Southern Province through integrated planning, evidence-based policy formulation, and effective resource allocation.",
		imgAlt: "Planning Secretariat Image",
		readMore: "Read More",
		telDir: "Telephone Directory"
	},
	si: {
		eyebrow: "ලේකම් කාර්යාලය ගැන",
		title: "දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය",
		subtitle: "දකුණු පළාත පුරා සංවර්ධනය සම්බන්ධීකරණය, ප්‍රගතිය අධීක්ෂණය සහ තිරසාර වර්ධනයට මඟ පෙන්වීම.",
		body: "දකුණු පළාතේ සැලසුම් ලේකම් කාර්යාලය, ගාල්ල, මාතර සහ හම්බන්තොට දිස්ත්‍රික්ක හරහා සංවර්ධන සැලසුම් කිරීම, ප්‍රතිපත්ති සම්බන්ධීකරණය සහ රාජ්‍ය ආයෝජනවල උපාය මාර්ගික කළමනාකරණය සඳහා වගකිව යුතු ප්‍රධාන පළාත් ආයතනය ලෙස කටයුතු කරයි. ව්‍යවස්ථාවේ 13 වැනි සංශෝධනය — පළාත් සභා පනත — යටතේ ස්ථාපිත කරන ලද මෙම ලේකම් කාර්යාලය, ඒකාබද්ධ සැලසුම් කිරීම, සාක්ෂි-පදනම් ප්‍රතිපත්ති සම්පාදනය සහ ඵලදායී සම්පත් බෙදා හැරීම හරහා දකුණු පළාතේ සමාජ-ආර්ථික සංවර්ධනය මෙහෙයවීමේ ප්‍රමුඛ භූමිකාවක් ඉටු කරයි.",
		imgAlt: "සැලසුම් ලේකම් කාර්යාල රූපය",
		readMore: "තව කියවන්න",
		telDir: "දූරකථන නාමාවලිය"
	},
	ta: {
		eyebrow: "செயலகம் பற்றி",
		title: "தென் மாகாண திட்டமிடல் செயலகம்",
		subtitle: "தென் மாகாணம் முழுவதும் வளர்ச்சியை ஒருங்கிணைத்து, முன்னேற்றத்தை கண்காணித்து, நிலையான வளர்ச்சிக்கு வழிகாட்டுதல்.",
		body: "தென் மாகாண திட்டமிடல் செயலகம், காலி, மாத்தறை மற்றும் ஹம்பாந்தோட்டை மாவட்டங்கள் முழுவதும் வளர்ச்சி திட்டமிடல், கொள்கை ஒருங்கிணைப்பு மற்றும் பொது முதலீட்டின் மூலோபாய மேலாண்மைக்கு பொறுப்பான முக்கிய மாகாண நிறுவனமாக செயல்படுகிறது. அரசியலமைப்பின் 13வது திருத்தம் — மாகாண சபைகள் சட்டம் — இன் கீழ் நிறுவப்பட்ட இச்செயலகம், ஒருங்கிணைந்த திட்டமிடல், சான்றுகள் அடிப்படையிலான கொள்கை வகுப்பு மற்றும் திறமையான வள ஒதுக்கீடு மூலம் தென் மாகாணத்தின் சமூக-பொருளாதார வளர்ச்சியை வழிநடத்துவதில் முன்னணி பங்கை வகிக்கிறது.",
		imgAlt: "திட்டமிடல் செயலக படம்",
		readMore: "மேலும் படிக்க",
		telDir: "தொலைபேசி அடைவு"
	}
};
var fadeUp$2 = (delay = 0) => ({
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
			duration: .65,
			delay,
			ease: [
				.22,
				1,
				.36,
				1
			]
		}
	}
});
var stagger$2 = {
	hidden: {},
	visible: { transition: {
		staggerChildren: .1,
		delayChildren: .15
	} }
};
function HomeAboutSecretariat({ lang: propLang }) {
	const [lang, setLang] = (0, import_react.useState)(() => propLang || (typeof window !== "undefined" ? localStorage.getItem("lang") : null) || "en");
	const [reduced, setReduced] = (0, import_react.useState)(false);
	const [about, setAbout] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const h = (e) => setLang(e.detail || "en");
		window.addEventListener("langChange", h);
		return () => window.removeEventListener("langChange", h);
	}, []);
	(0, import_react.useEffect)(() => {
		if (propLang) setLang(propLang);
	}, [propLang]);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReduced(mq.matches);
		const h = (e) => setReduced(e.matches);
		mq.addEventListener("change", h);
		return () => mq.removeEventListener("change", h);
	}, []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		homeContentApi.get().then(({ data }) => {
			if (cancelled || !data?.aboutSecretariat) return;
			setAbout(data.aboutSecretariat);
		}).catch((err) => console.error("HomeAboutSecretariat: failed to load content", err));
		return () => {
			cancelled = true;
		};
	}, []);
	const fallback = T$3[lang] || T$3.en;
	const t = about ? {
		eyebrow: about.eyebrow?.[lang] || about.eyebrow?.en || fallback.eyebrow,
		title: about.title?.[lang] || about.title?.en || fallback.title,
		subtitle: about.subtitle?.[lang] || about.subtitle?.en || fallback.subtitle,
		body: about.body?.[lang] || about.body?.en || fallback.body,
		imgAlt: fallback.imgAlt,
		readMore: fallback.readMore,
		telDir: fallback.telDir
	} : fallback;
	const isNonLatin = lang === "si" || lang === "ta";
	const imgSrc = resolveUploadUrl(about?.image || "/branding/office.webp");
	const statValue = about?.statCard?.value ?? "3";
	const statLabel = about?.statCard?.label?.[lang] || about?.statCard?.label?.en || "Divisions";
	const sectionRef = (0, import_react.useRef)(null);
	const inView = useInView(sectionRef, {
		once: true,
		amount: .15
	});
	const animState = !reduced && inView ? "visible" : reduced ? "visible" : "hidden";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref: sectionRef,
		className: "has",
		"aria-label": t.eyebrow,
		lang: lang === "si" ? "si" : lang === "ta" ? "ta" : "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "has__bg-art",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "has__orb has__orb--a" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "has__orb has__orb--b" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "has__orb has__orb--c" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					className: "has__lattice",
					"aria-hidden": "true",
					xmlns: "http://www.w3.org/2000/svg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", {
						id: "hasGrid",
						x: "0",
						y: "0",
						width: "40",
						height: "40",
						patternUnits: "userSpaceOnUse",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M40 0L0 0L0 40",
							fill: "none",
							stroke: "rgba(199,154,43,0.07)",
							strokeWidth: "0.8"
						})
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						width: "100%",
						height: "100%",
						fill: "url(#hasGrid)"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "has__shimmer-line has__shimmer-line--top",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "has__shimmer-line has__shimmer-line--bottom",
					"aria-hidden": "true"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "has__container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				className: "has__content",
				variants: stagger$2,
				initial: "hidden",
				animate: animState,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						className: "has__eyebrow",
						variants: fadeUp$2(0),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "has__eyebrow-diamond",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "has__eyebrow-text",
							children: t.eyebrow
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h2, {
						className: `has__title${isNonLatin ? " has__title--nl" : ""}`,
						variants: fadeUp$2(.08),
						children: t.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "has__rule",
						initial: {
							scaleX: 0,
							opacity: 0
						},
						animate: animState === "visible" ? {
							scaleX: 1,
							opacity: 1,
							transition: {
								duration: .55,
								delay: .22,
								ease: [
									.16,
									1,
									.3,
									1
								]
							}
						} : {
							scaleX: 0,
							opacity: 0
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						className: `has__subtitle${isNonLatin ? " has__subtitle--nl" : ""}`,
						variants: fadeUp$2(.18),
						children: t.subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						className: `has__body${isNonLatin ? " has__body--nl" : ""}`,
						variants: fadeUp$2(.28),
						children: t.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						className: "has__cta-row",
						variants: fadeUp$2(.42),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
							to: "/about/secretariat-overview",
							className: "has__btn has__btn--primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.readMore }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, {
								size: 14,
								"aria-hidden": "true"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
							to: "/contact#contact-info",
							className: "has__btn has__btn--ghost",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPhone, {
									size: 14,
									"aria-hidden": "true"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.telDir }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiExternalLink, {
									size: 13,
									"aria-hidden": "true"
								})
							]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				className: "has__media",
				variants: fadeUp$2(.12),
				initial: "hidden",
				animate: animState,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "has__img-frame",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "has__corner has__corner--tl",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "has__corner has__corner--tr",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "has__corner has__corner--bl",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "has__corner has__corner--br",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressiveImage, {
							src: imgSrc,
							alt: t.imgAlt,
							className: "has__img",
							loading: "lazy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "has__img-badge",
							"aria-hidden": "true",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "has__badge-dot" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "has__badge-text",
								children: "Southern Province"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "has__stat-card",
					"aria-hidden": "true",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "has__stat-num",
						children: statValue
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "has__stat-lbl",
						children: statLabel
					})]
				})]
			})]
		})]
	});
}
var T$2 = {
	en: {
		eyebrow: "Leadership Message",
		title: "Message from the Deputy Chief Secretary – Planning",
		position: "Deputy Chief Secretary – Planning",
		name: "Mr. M.K.G.S.P.K. Jayasekara",
		message: "As the Planning Secretariat of the Southern Province, our responsibility is to guide development with clarity, coordination, and accountability. We work closely with provincial ministries, departments, divisional secretariats, and local authorities as well as government-based and non-government based organizations to ensure that development initiatives respond to public needs and support long-term sustainable growth. Through effective planning, monitoring, and evaluation, we remain committed to building a more progressive and resilient to the Southern Province.",
		imgAlt: "Deputy Secretary Image",
		sigAlt: "Deputy Secretary Signature"
	},
	si: {
		eyebrow: "නායකත්ව පණිවිඩය",
		title: "නියෝජ්‍ය ප්‍රධාන ලේකම්තුමාගේ පණිවිඩය ",
		position: "නියෝජ්‍ය ප්‍රධාන ලේකම් – සැලසුම්",
		name: "Mr. M.K.G.S.P.K. Jayasekara",
		message: "දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය ලෙස, සංවර්ධනය පැහැදිලි දැක්මක්, සම්බන්ධීකරණයක් සහ වගකීමක් සමඟ ඉදිරියට ගෙන යාම අපගේ ප්‍රධාන වගකීමකි. පළාත් අමාත්‍යාංශ, අංශ, ප්‍රාදේශීය ලේකම් කාර්යාල සහ පළාත් පාලන ආයතන සමඟ සමීපව කටයුතු කරමින්, ජනතා අවශ්‍යතාවයන්ට ප්‍රතිචාර දක්වන සහ දිගුකාලීන තිරසාර වර්ධනයට සහාය වන සංවර්ධන වැඩසටහන් ක්‍රියාත්මක කිරීමට අපි කැපවී සිටිමු.",
		imgAlt: "නියෝජ්‍ය ප්‍රධාන ලේකම් රූපය",
		sigAlt: "නියෝජ්‍ය ප්‍රධාන ලේකම් අත්සන"
	},
	ta: {
		eyebrow: "தலைமைச் செய்தி",
		title: "துணை தலைமை செயலர் – திட்டமிடல் அவர்களிடமிருந்து செய்தி",
		position: "துணை தலைமை செயலர் – திட்டமிடல்",
		name: "Mr. M.K.G.S.P.K. Jayasekara",
		message: "தென் மாகாண திட்டமிடல் செயலகமாக, தெளிவான நோக்கம், ஒருங்கிணைப்பு மற்றும் பொறுப்புணர்வுடன் வளர்ச்சியை வழிநடத்துவது எங்கள் முக்கிய பொறுப்பாகும். மாகாண அமைச்சகங்கள், துறைகள், பிரதேச செயலகங்கள் மற்றும் உள்ளாட்சி நிறுவனங்களுடன் இணைந்து, பொதுமக்களின் தேவைகளுக்கு பதிலளிக்கும் மற்றும் நீண்டகால நிலையான வளர்ச்சியை ஆதரிக்கும் வளர்ச்சி முயற்சிகளை முன்னெடுக்க நாங்கள் அர்ப்பணிக்கப்பட்டுள்ளோம்.",
		imgAlt: "துணை தலைமை செயலர் படம்",
		sigAlt: "துணை தலைமை செயலர் கையொப்பம்"
	}
};
var fadeUp$1 = (delay = 0) => ({
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
			duration: .65,
			delay,
			ease: [
				.22,
				1,
				.36,
				1
			]
		}
	}
});
var stagger$1 = {
	hidden: {},
	visible: { transition: {
		staggerChildren: .1,
		delayChildren: .12
	} }
};
function HomeDeputySecretaryMessage({ lang: propLang }) {
	const [lang, setLang] = (0, import_react.useState)(() => propLang || (typeof window !== "undefined" ? localStorage.getItem("lang") : null) || "en");
	const [reduced, setReduced] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)(null);
	const [staff, setStaff] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const h = (e) => setLang(e.detail || "en");
		window.addEventListener("langChange", h);
		return () => window.removeEventListener("langChange", h);
	}, []);
	(0, import_react.useEffect)(() => {
		if (propLang) setLang(propLang);
	}, [propLang]);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReduced(mq.matches);
		const h = (e) => setReduced(e.matches);
		mq.addEventListener("change", h);
		return () => mq.removeEventListener("change", h);
	}, []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		homeContentApi.get().then(({ data }) => {
			if (cancelled || !data) return;
			if (data.deputySecretaryMessage) setMessage(data.deputySecretaryMessage);
			const staffId = data.deputySecretaryStaffId;
			if (!staffId) return;
			return staffApi.get(staffId).then(({ data: staffData }) => {
				if (!cancelled && staffData) setStaff(staffData);
			});
		}).catch((err) => console.error("HomeDeputySecretaryMessage: failed to load content", err));
		return () => {
			cancelled = true;
		};
	}, []);
	const fallback = T$2[lang] || T$2.en;
	const t = {
		eyebrow: fallback.eyebrow,
		title: fallback.title,
		position: staff?.position?.[lang] || staff?.position?.en || fallback.position,
		name: staff?.name?.[lang] || staff?.name?.en || fallback.name,
		message: message?.[lang] || message?.en || fallback.message,
		imgAlt: fallback.imgAlt,
		sigAlt: fallback.sigAlt
	};
	const imgSrc = resolveUploadUrl(staff?.photo || "/branding/sec-ho.webp");
	const isNonLatin = lang === "si" || lang === "ta";
	const sectionRef = (0, import_react.useRef)(null);
	const inView = useInView(sectionRef, {
		once: true,
		amount: .12
	});
	const animState = !reduced && inView ? "visible" : reduced ? "visible" : "hidden";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref: sectionRef,
		className: "dsm",
		"aria-label": t.eyebrow,
		lang: lang === "si" ? "si" : lang === "ta" ? "ta" : "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "dsm__bg-art",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsm__orb dsm__orb--a" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsm__orb dsm__orb--b" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsm__orb dsm__orb--c" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					className: "dsm__lattice",
					"aria-hidden": "true",
					xmlns: "http://www.w3.org/2000/svg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", {
						id: "dsmGrid",
						x: "0",
						y: "0",
						width: "40",
						height: "40",
						patternUnits: "userSpaceOnUse",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M40 0L0 0L0 40",
							fill: "none",
							stroke: "rgba(199,154,43,0.065)",
							strokeWidth: "0.8"
						})
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						width: "100%",
						height: "100%",
						fill: "url(#dsmGrid)"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "dsm__shimmer-line dsm__shimmer-line--top",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "dsm__shimmer-line dsm__shimmer-line--bottom",
					"aria-hidden": "true"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "dsm__container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				className: "dsm__profile",
				variants: fadeUp$1(.1),
				initial: "hidden",
				animate: animState,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "dsm__glow-ring",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dsm__img-frame",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "dsm__corner dsm__corner--tl",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "dsm__corner dsm__corner--tr",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "dsm__corner dsm__corner--bl",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "dsm__corner dsm__corner--br",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressiveImage, {
								src: imgSrc,
								alt: t.imgAlt,
								className: "dsm__img",
								loading: "lazy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "dsm__verified-badge",
								"aria-hidden": "true",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
									size: 13,
									className: "dsm__badge-icon"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "dsm__badge-text",
									children: "Southern Province"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dsm__nameplate",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `dsm__person-name${isNonLatin ? " dsm__nl" : ""}`,
							children: t.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `dsm__person-pos${isNonLatin ? " dsm__nl" : ""}`,
							children: t.position
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				className: "dsm__message-col",
				variants: stagger$1,
				initial: "hidden",
				animate: animState,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						className: "dsm__eyebrow",
						variants: fadeUp$1(0),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "dsm__eyebrow-diamond",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `dsm__eyebrow-text${isNonLatin ? " dsm__nl" : ""}`,
							children: t.eyebrow
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h2, {
						className: `dsm__title${isNonLatin ? " dsm__title--nl" : ""}`,
						variants: fadeUp$1(.08),
						children: t.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "dsm__rule",
						initial: {
							scaleX: 0,
							opacity: 0
						},
						animate: animState === "visible" ? {
							scaleX: 1,
							opacity: 1,
							transition: {
								duration: .55,
								delay: .22,
								ease: [
									.16,
									1,
									.3,
									1
								]
							}
						} : {
							scaleX: 0,
							opacity: 0
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						className: "dsm__card",
						variants: fadeUp$1(.22),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, {
								size: 52,
								className: "dsm__quote-mark",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `dsm__message-text${isNonLatin ? " dsm__message-text--nl" : ""}`,
								children: t.message
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "dsm__sig-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "dsm__sig-divider",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "dsm__sig-block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "dsm__sig-img-wrap",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressiveImage, {
											src: "/staff/deputy-secretary-signature.png",
											alt: t.sigAlt,
											className: "dsm__sig-img",
											loading: "lazy",
											fill: false,
											fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "dsm__sig-fallback",
												"aria-label": t.sigAlt,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, {
													size: 16,
													className: "dsm__sig-icon",
													"aria-hidden": "true"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "dsm__sig-fallback-text",
													children: "Signature"
												})]
											})
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "dsm__sig-meta",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `dsm__sig-name${isNonLatin ? " dsm__nl" : ""}`,
											children: t.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `dsm__sig-position${isNonLatin ? " dsm__nl" : ""}`,
											children: t.position
										})]
									})]
								})]
							})
						]
					})
				]
			})]
		})]
	});
}
var MAROON = "#4A0918";
var GOLD$1 = "#C79A2B";
var T$1 = {
	en: {
		sectionEyebrow: "What's On",
		sectionTitle: "Events Calendar",
		upcomingLabel: "Upcoming Events",
		readMore: "Read More",
		noEvents: "No events scheduled",
		noUpcoming: "No upcoming events",
		close: "Close",
		viewAll: "View All Events",
		featured: "Featured",
		location: "Location",
		time: "Time",
		institutesTitle: "Affiliated Institutes",
		visitSite: "Visit Site"
	},
	si: {
		sectionEyebrow: "සිදුවීම්",
		sectionTitle: "සිදුවීම් දින දර්ශනය",
		upcomingLabel: "ඉදිරි සිදුවීම්",
		readMore: "තව කියවන්න",
		noEvents: "කිසිදු සිදුවීමක් නොමැත",
		noUpcoming: "ඉදිරි සිදුවීම් නොමැත",
		close: "වසන්න",
		viewAll: "සියලු සිදුවීම් බලන්න",
		featured: "විශේෂ",
		location: "ස්ථානය",
		time: "වේලාව",
		institutesTitle: "අනුබද්ධිත ආයතන",
		visitSite: "වෙබ් අඩවිය"
	},
	ta: {
		sectionEyebrow: "நிகழ்வுகள்",
		sectionTitle: "நிகழ்வு நாட்காட்டி",
		upcomingLabel: "வரவிருக்கும் நிகழ்வுகள்",
		readMore: "மேலும் படிக்க",
		noEvents: "நிகழ்வுகள் இல்லை",
		noUpcoming: "வரவிருக்கும் நிகழ்வுகள் இல்லை",
		close: "மூடு",
		viewAll: "அனைத்து நிகழ்வுகளையும் காண்க",
		featured: "சிறப்பு",
		location: "இடம்",
		time: "நேரம்",
		institutesTitle: "இணைந்த நிறுவனங்கள்",
		visitSite: "தளம் பார்க்க"
	}
};
var DUMMY_EVENTS = [];
var INSTITUTES = [
	{
		id: 1,
		name: "Southern Development Authority",
		url: "https://www.southern.gov.lk",
		logo: "/branding/af1.webp"
	},
	{
		id: 2,
		name: "Provincial Planning Unit",
		url: "https://www.southern.gov.lk",
		logo: "/branding/af2.webp"
	},
	{
		id: 3,
		name: "Education Development Center",
		url: "https://www.moe.gov.lk",
		logo: "/branding/af3.webp"
	},
	{
		id: 4,
		name: "Infrastructure Division",
		url: "https://www.southern.gov.lk",
		logo: "/branding/af4.webp"
	},
	{
		id: 5,
		name: "Agriculture Planning Board",
		url: "https://www.doa.gov.lk",
		logo: "/branding/af5.webp"
	},
	{
		id: 6,
		name: "Affiliated Institute",
		url: "https://www.southern.gov.lk",
		logo: "/branding/af6.webp"
	}
];
var DAYS_SHORT = [
	"Su",
	"Mo",
	"Tu",
	"We",
	"Th",
	"Fr",
	"Sa"
];
var MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
function parseDate(str) {
	const [y, m, d] = str.split("-").map(Number);
	return new Date(y, m - 1, d);
}
function isSameDay(a, b) {
	return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
var fadeUp = (delay = 0) => ({
	hidden: {
		opacity: 0,
		y: 24,
		filter: "blur(5px)"
	},
	visible: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: .62,
			delay,
			ease: [
				.22,
				1,
				.36,
				1
			]
		}
	}
});
var stagger = {
	hidden: {},
	visible: { transition: {
		staggerChildren: .09,
		delayChildren: .1
	} }
};
function HomeEventsAndInstitutes({ lang: propLang }) {
	const [lang, setLang] = (0, import_react.useState)(() => propLang || (typeof window !== "undefined" ? localStorage.getItem("lang") : null) || "en");
	const [reduced, setReduced] = (0, import_react.useState)(false);
	const [events, setEvents] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const h = (e) => setLang(e.detail || "en");
		window.addEventListener("langChange", h);
		return () => window.removeEventListener("langChange", h);
	}, []);
	(0, import_react.useEffect)(() => {
		if (propLang) setLang(propLang);
	}, [propLang]);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReduced(mq.matches);
		const h = (e) => setReduced(e.matches);
		mq.addEventListener("change", h);
		return () => mq.removeEventListener("change", h);
	}, []);
	const loadEvents = (0, import_react.useCallback)(() => {
		try {
			const raw = typeof window !== "undefined" ? localStorage.getItem("cms_home_events") : null;
			if (raw) {
				const active = JSON.parse(raw).filter((ev) => ev.status === "Active");
				setEvents(active.length ? active : DUMMY_EVENTS);
			} else setEvents(DUMMY_EVENTS);
		} catch {
			setEvents(DUMMY_EVENTS);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		loadEvents();
		const onStorage = (e) => {
			if (e.key === "cms_home_events") loadEvents();
		};
		const onCustom = () => loadEvents();
		window.addEventListener("storage", onStorage);
		window.addEventListener("cms_home_events_updated", onCustom);
		let bc;
		try {
			bc = new BroadcastChannel("cms_home_events");
			bc.onmessage = loadEvents;
		} catch (_) {}
		return () => {
			window.removeEventListener("storage", onStorage);
			window.removeEventListener("cms_home_events_updated", onCustom);
			bc?.close();
		};
	}, [loadEvents]);
	const t = T$1[lang] || T$1.en;
	const isNonLatin = lang === "si" || lang === "ta";
	const sectionRef = (0, import_react.useRef)(null);
	const [inView, setInView] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = sectionRef.current;
		if (!el) return;
		const obs = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) setInView(true);
		}, { threshold: .08 });
		obs.observe(el);
		return () => obs.disconnect();
	}, []);
	const animState = reduced ? "visible" : inView ? "visible" : "hidden";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref: sectionRef,
		className: "hei",
		"aria-label": t.sectionTitle,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hei__bg-art",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hei__orb hei__orb--a" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hei__orb hei__orb--b" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hei__orb hei__orb--c" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					className: "hei__lattice",
					xmlns: "http://www.w3.org/2000/svg",
					"aria-hidden": "true",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", {
						id: "heiGrid",
						x: "0",
						y: "0",
						width: "44",
						height: "44",
						patternUnits: "userSpaceOnUse",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M44 0L0 0L0 44",
							fill: "none",
							stroke: "rgba(199,154,43,0.055)",
							strokeWidth: "0.7"
						})
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						width: "100%",
						height: "100%",
						fill: "url(#heiGrid)"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hei__shimmer-line hei__shimmer-line--top" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hei__shimmer-line hei__shimmer-line--bottom" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hei__container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				className: "hei__header",
				variants: stagger,
				initial: "hidden",
				animate: animState,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						className: "hei__eyebrow",
						variants: fadeUp(0),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hei__eyebrow-diamond",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `hei__eyebrow-text${isNonLatin ? " hei__nl" : ""}`,
							children: t.sectionEyebrow
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h2, {
						className: `hei__section-title${isNonLatin ? " hei__section-title--nl" : ""}`,
						variants: fadeUp(.08),
						children: t.sectionTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "hei__rule",
						initial: {
							scaleX: 0,
							opacity: 0
						},
						animate: animState === "visible" ? {
							scaleX: 1,
							opacity: 1,
							transition: {
								duration: .55,
								delay: .18,
								ease: [
									.16,
									1,
									.3,
									1
								]
							}
						} : {
							scaleX: 0,
							opacity: 0
						}
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hei__body",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "hei__left",
					variants: fadeUp(.12),
					initial: "hidden",
					animate: animState,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCalendarPanel, {
						events,
						lang,
						t,
						isNonLatin,
						reduced
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "hei__right",
					variants: fadeUp(.22),
					initial: "hidden",
					animate: animState,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AffiliatedInstitutes, {
						t,
						reduced
					})
				})]
			})]
		})]
	});
}
function EventCalendarPanel({ events, lang, t, isNonLatin, reduced }) {
	const today = (0, import_react.useMemo)(() => {
		const d = /* @__PURE__ */ new Date();
		d.setHours(0, 0, 0, 0);
		return d;
	}, []);
	const [viewYear, setViewYear] = (0, import_react.useState)(today.getFullYear());
	const [viewMonth, setViewMonth] = (0, import_react.useState)(today.getMonth());
	const [selected, setSelected] = (0, import_react.useState)(() => {
		const d = /* @__PURE__ */ new Date();
		d.setHours(0, 0, 0, 0);
		return d;
	});
	const [popup, setPopup] = (0, import_react.useState)(null);
	const { cells, eventDates } = (0, import_react.useMemo)(() => {
		const first = new Date(viewYear, viewMonth, 1);
		const lastDay = new Date(viewYear, viewMonth + 1, 0).getDate();
		const startDow = first.getDay();
		const cells = [];
		for (let i = 0; i < startDow; i++) cells.push(null);
		for (let d = 1; d <= lastDay; d++) cells.push(new Date(viewYear, viewMonth, d));
		return {
			cells,
			eventDates: new Set(events.filter((ev) => ev.status === "Active").map((ev) => ev.date))
		};
	}, [
		viewYear,
		viewMonth,
		events
	]);
	const selectedEvents = (0, import_react.useMemo)(() => {
		if (!selected) return [];
		const key = `${selected.getFullYear()}-${String(selected.getMonth() + 1).padStart(2, "0")}-${String(selected.getDate()).padStart(2, "0")}`;
		return events.filter((ev) => ev.date === key && ev.status === "Active");
	}, [selected, events]);
	const prevMonth = () => {
		if (viewMonth === 0) {
			setViewYear((y) => y - 1);
			setViewMonth(11);
		} else setViewMonth((m) => m - 1);
		setSelected(null);
	};
	const nextMonth = () => {
		if (viewMonth === 11) {
			setViewYear((y) => y + 1);
			setViewMonth(0);
		} else setViewMonth((m) => m + 1);
		setSelected(null);
	};
	const handleDayClick = (date) => {
		if (!date) return;
		setSelected((prev) => prev && isSameDay(prev, date) ? null : date);
	};
	const getTitle = (ev) => {
		if (lang === "si" && ev.titleSi) return ev.titleSi;
		if (lang === "ta" && ev.titleTa) return ev.titleTa;
		return ev.titleEn;
	};
	const categoryColor = (cat) => {
		return {
			Meeting: {
				bg: "rgba(74,9,24,0.10)",
				dot: MAROON
			},
			Workshop: {
				bg: "rgba(199,154,43,0.14)",
				dot: GOLD$1
			},
			Conference: {
				bg: "rgba(74,9,24,0.10)",
				dot: MAROON
			},
			Evaluation: {
				bg: "rgba(120,80,20,0.12)",
				dot: "#8B5E10"
			},
			Training: {
				bg: "rgba(50,100,50,0.10)",
				dot: "#2E7D32"
			}
		}[cat] || {
			bg: "rgba(74,9,24,0.08)",
			dot: MAROON
		};
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "hei__cal-wrap",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hei__cal-card",
				role: "region",
				"aria-label": "Event calendar",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hei__cal-nav",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "hei__cal-nav-btn",
								onClick: prevMonth,
								"aria-label": "Previous month",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 16 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "hei__cal-month-label",
								children: [
									MONTHS[viewMonth],
									" ",
									viewYear
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "hei__cal-nav-btn",
								onClick: nextMonth,
								"aria-label": "Next month",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hei__cal-dow-row",
						role: "row",
						children: DAYS_SHORT.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hei__cal-dow",
							role: "columnheader",
							"aria-label": d,
							children: d
						}, d))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hei__cal-grid",
						role: "grid",
						"aria-label": `${MONTHS[viewMonth]} ${viewYear}`,
						children: cells.map((date, idx) => {
							if (!date) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hei__cal-cell hei__cal-cell--empty",
								"aria-hidden": "true"
							}, `e-${idx}`);
							const isToday = isSameDay(date, today);
							const isSelected = selected && isSameDay(date, selected);
							const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
							const hasEvent = eventDates.has(dateKey);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: [
									"hei__cal-cell",
									isToday ? "hei__cal-cell--today" : "",
									isSelected ? "hei__cal-cell--selected" : "",
									hasEvent ? "hei__cal-cell--event" : ""
								].join(" "),
								onClick: () => handleDayClick(date),
								"aria-label": `${date.getDate()} ${MONTHS[viewMonth]}${hasEvent ? ", has events" : ""}`,
								"aria-pressed": isSelected,
								role: "gridcell",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hei__cal-cell-num",
									children: date.getDate()
								}), hasEvent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hei__cal-event-dot",
									"aria-hidden": "true"
								})]
							}, dateKey);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hei__cal-legend",
						"aria-hidden": "true",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "hei__legend-item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hei__legend-dot hei__legend-dot--today" }), "Today"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "hei__legend-item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hei__legend-dot hei__legend-dot--event" }), "Event"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "hei__legend-item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hei__legend-dot hei__legend-dot--selected" }), "Selected"]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
				mode: "wait",
				children: selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "hei__day-events",
					initial: reduced ? {} : {
						opacity: 0,
						y: 10
					},
					animate: {
						opacity: 1,
						y: 0
					},
					exit: reduced ? {} : {
						opacity: 0,
						y: -8
					},
					transition: {
						duration: .28,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "hei__day-events-heading",
						children: [
							selected.getDate(),
							" ",
							MONTHS[selected.getMonth()],
							" ",
							selected.getFullYear()
						]
					}), selectedEvents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hei__day-events-empty",
						children: t.noEvents
					}) : selectedEvents.map((ev) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "hei__day-event-chip",
						onClick: () => setPopup(ev),
						"aria-label": `${getTitle(ev)} — click to view details`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hei__chip-dot",
								style: { background: categoryColor(ev.category).dot },
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `hei__chip-title${isNonLatin ? " hei__nl" : ""}`,
								children: getTitle(ev)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hei__chip-time",
								children: ev.time
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
								size: 13,
								className: "hei__chip-arrow",
								"aria-hidden": "true"
							})
						]
					}, ev.id))]
				}, selected.toISOString())
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: popup && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventPopup, {
				ev: popup,
				lang,
				t,
				isNonLatin,
				onClose: () => setPopup(null),
				reduced
			}) })
		]
	});
}
function EventPopup({ ev, lang, t, isNonLatin, onClose, reduced }) {
	const getTitle = (e) => {
		if (lang === "si" && e.titleSi) return e.titleSi;
		if (lang === "ta" && e.titleTa) return e.titleTa;
		return e.titleEn;
	};
	const getDesc = (e) => {
		if (lang === "si" && e.descriptionSi) return e.descriptionSi;
		if (lang === "ta" && e.descriptionTa) return e.descriptionTa;
		return e.descriptionEn;
	};
	(0, import_react.useEffect)(() => {
		const h = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", h);
		return () => window.removeEventListener("keydown", h);
	}, [onClose]);
	const d = parseDate(ev.date);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: "hei__popup-overlay",
		initial: reduced ? {} : { opacity: 0 },
		animate: { opacity: 1 },
		exit: reduced ? {} : { opacity: 0 },
		onClick: (e) => e.target === e.currentTarget && onClose(),
		role: "dialog",
		"aria-modal": "true",
		"aria-label": getTitle(ev),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			className: "hei__popup",
			initial: reduced ? {} : {
				scale: .92,
				opacity: 0,
				y: 20
			},
			animate: {
				scale: 1,
				opacity: 1,
				y: 0
			},
			exit: reduced ? {} : {
				scale: .92,
				opacity: 0,
				y: 20
			},
			transition: {
				duration: .26,
				ease: [
					.16,
					1,
					.3,
					1
				]
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hei__popup-img-wrap",
				children: [
					ev.imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressiveImage, {
						src: ev.imageUrl,
						alt: getTitle(ev),
						className: "hei__popup-img",
						loading: "lazy",
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hei__popup-img-placeholder",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
								size: 32,
								color: GOLD$1
							})
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hei__popup-img-placeholder",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
							size: 32,
							color: GOLD$1
						})
					}),
					ev.featured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "hei__popup-featured-badge",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
								size: 11,
								"aria-hidden": "true"
							}),
							" ",
							t.featured
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "hei__popup-close",
						onClick: onClose,
						"aria-label": t.close,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hei__popup-body",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hei__popup-cat",
						children: ev.category
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: `hei__popup-title${isNonLatin ? " hei__nl" : ""}`,
						children: getTitle(ev)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hei__popup-meta-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "hei__popup-meta-item",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
										size: 13,
										"aria-hidden": "true"
									}),
									d.getDate(),
									" ",
									MONTHS[d.getMonth()],
									" ",
									d.getFullYear()
								]
							}),
							ev.time && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "hei__popup-meta-item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
									size: 13,
									"aria-hidden": "true"
								}), ev.time]
							}),
							ev.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "hei__popup-meta-item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
									size: 13,
									"aria-hidden": "true"
								}), ev.location]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `hei__popup-desc${isNonLatin ? " hei__nl" : ""}`,
						children: getDesc(ev)
					})
				]
			})]
		})
	});
}
function AffiliatedInstitutes({ t, reduced }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "hei__inst-wrap",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hei__inst-header",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hei__inst-eyebrow-line" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hei__inst-eyebrow-text",
					children: t.institutesTitle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hei__inst-eyebrow-line" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "hei__inst-grid",
			role: "list",
			"aria-label": t.institutesTitle,
			children: INSTITUTES.map((inst, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstCard, {
				inst,
				t,
				index: i,
				reduced
			}, inst.id))
		})]
	});
}
function InstCard({ inst, t, index, reduced }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.a, {
		href: inst.url,
		target: "_blank",
		rel: "noopener noreferrer",
		className: "hei__inst-card",
		role: "listitem",
		"aria-label": `${inst.name} — ${t.visitSite}`,
		initial: reduced ? {} : {
			opacity: 0,
			y: 20,
			filter: "blur(4px)"
		},
		whileInView: reduced ? {} : {
			opacity: 1,
			y: 0,
			filter: "blur(0px)"
		},
		viewport: {
			once: true,
			amount: .2
		},
		transition: {
			delay: .05 + index * .08,
			duration: .5,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		whileHover: reduced ? {} : {
			y: -4,
			scale: 1.04
		},
		whileTap: { scale: .97 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressiveImage, {
			src: inst.logo,
			alt: inst.name,
			className: "hei__inst-logo",
			loading: "lazy",
			fill: false,
			fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hei__inst-logo-fallback",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					viewBox: "0 0 48 48",
					fill: "none",
					width: "48",
					height: "48",
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "24",
							cy: "24",
							r: "20",
							stroke: GOLD$1,
							strokeWidth: "1.4",
							fill: "none",
							opacity: "0.5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "10",
							y: "18",
							width: "28",
							height: "18",
							rx: "3",
							stroke: GOLD$1,
							strokeWidth: "1.4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M18 18V15a6 6 0 0 1 12 0v3",
							stroke: GOLD$1,
							strokeWidth: "1.4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "24",
							cy: "26",
							r: "3",
							stroke: GOLD$1,
							strokeWidth: "1.4"
						})
					]
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "hei__inst-glow-border",
			"aria-hidden": "true"
		})]
	});
}
var LANG_META$1 = {
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
		eyebrow: "Knowledge Base",
		title: "Common Questions",
		subtitle: "Everything you need to know about the Planning Secretariat — answered clearly.",
		moreQ: "Still have questions?",
		contactUs: "Reach our team"
	},
	si: {
		eyebrow: "දැනුම් පදනම",
		title: "සාමාන්‍ය ප්‍රශ්න",
		subtitle: "සැලසුම් ලේකම් කාර්යාලය ගැන ඔබ දැනගත යුතු සෑම දෙයක්ම — පැහැදිලිව පිළිතුරු දෙනු ලැබේ.",
		moreQ: "තවත් ප්‍රශ්න තිබේද?",
		contactUs: "අප අමතන්න"
	},
	ta: {
		eyebrow: "அறிவுத் தளம்",
		title: "பொதுவான கேள்விகள்",
		subtitle: "திட்டமிடல் செயலகம் பற்றி நீங்கள் தெரிந்துகொள்ள வேண்டிய அனைத்தும் — தெளிவாக பதிலளிக்கப்பட்டது.",
		moreQ: "மேலும் கேள்விகள் உள்ளதா?",
		contactUs: "எங்கள் குழுவை அணுகுங்கள்"
	}
};
function FAQItem({ faq, isOpen, onToggle, meta, index }) {
	const id = `home-faq-panel-${index}`;
	const btnId = `home-faq-btn-${index}`;
	const num = String(index + 1).padStart(2, "0");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `hfaq__item${isOpen ? " hfaq__item--open" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			id: btnId,
			className: "hfaq__trigger",
			"aria-expanded": isOpen,
			"aria-controls": id,
			onClick: onToggle,
			style: { fontFamily: meta.font },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hfaq__num",
					"aria-hidden": "true",
					children: num
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hfaq__q",
					style: { fontFamily: meta.headFont },
					children: faq.q
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hfaq__arrow",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronDown, { size: 16 })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
			initial: false,
			children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				id,
				role: "region",
				"aria-labelledby": btnId,
				initial: {
					height: 0,
					opacity: 0
				},
				animate: {
					height: "auto",
					opacity: 1
				},
				exit: {
					height: 0,
					opacity: 0
				},
				transition: {
					duration: .38,
					ease: [
						.16,
						1,
						.3,
						1
					]
				},
				style: { overflow: "hidden" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "hfaq__a",
					style: { fontFamily: meta.font },
					children: faq.a
				})
			}, "panel")
		})]
	});
}
function HomeFAQHighlights({ lang: langProp }) {
	const [lang, setLang] = (0, import_react.useState)(() => langProp || (typeof window !== "undefined" ? localStorage.getItem("lang") : null) || "en");
	const [openIdx, setOpenIdx] = (0, import_react.useState)(0);
	const [faqs, setFaqs] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const h = (e) => {
			setLang(e.detail || "en");
			setOpenIdx(0);
		};
		window.addEventListener("langChange", h);
		return () => window.removeEventListener("langChange", h);
	}, []);
	(0, import_react.useEffect)(() => {
		if (langProp) setLang(langProp);
	}, [langProp]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		faqsApi.list().then(({ data }) => {
			if (cancelled || !Array.isArray(data)) return;
			const featured = data.filter((f) => f.featured === true).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
			setFaqs(featured);
		}).catch((err) => console.error("HomeFAQHighlights: failed to load FAQs", err));
		return () => {
			cancelled = true;
		};
	}, []);
	const meta = LANG_META$1[lang] || LANG_META$1.en;
	const t = T[lang] || T.en;
	const items = faqs.map((f) => ({
		q: f.question?.[lang] || f.question?.en || "",
		a: f.answer?.[lang] || f.answer?.en || ""
	}));
	const toggle = (i) => setOpenIdx((prev) => prev === i ? null : i);
	const fadeUp = (delay = 0) => ({
		hidden: {
			opacity: 0,
			y: 24
		},
		visible: {
			opacity: 1,
			y: 0,
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "hfaq",
		"aria-label": t.title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hfaq__noise",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hfaq__glow hfaq__glow--a",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hfaq__glow hfaq__glow--b",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hfaq__grid",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hfaq__rule",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hfaq__inner",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.aside, {
					className: "hfaq__aside",
					initial: "hidden",
					whileInView: "visible",
					viewport: {
						once: true,
						amount: .25
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
							className: "hfaq__eyebrow",
							variants: fadeUp(0),
							style: {
								fontFamily: meta.isNonLatin ? meta.font : "'Cinzel', serif",
								letterSpacing: meta.isNonLatin ? 0 : "0.14em"
							},
							children: t.eyebrow
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h2, {
							className: "hfaq__title",
							style: {
								fontFamily: meta.headFont,
								lineHeight: meta.isNonLatin ? 1.4 : 1.1
							},
							variants: fadeUp(.08),
							children: t.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "hfaq__divider",
							variants: fadeUp(.14),
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							className: "hfaq__subtitle",
							style: { fontFamily: meta.font },
							variants: fadeUp(.18),
							children: t.subtitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							className: "hfaq__cta-card",
							variants: fadeUp(.26),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "hfaq__cta-icon",
									"aria-hidden": "true",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMessageCircle, { size: 20 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "hfaq__cta-label",
									style: { fontFamily: meta.font },
									children: t.moreQ
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
									to: "/contact",
									className: "hfaq__cta-btn",
									style: { fontFamily: meta.font },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.contactUs }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, { size: 14 })]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "hfaq__list",
					role: "list",
					initial: "hidden",
					whileInView: "visible",
					viewport: {
						once: true,
						amount: .1
					},
					variants: {
						hidden: {},
						visible: { transition: { staggerChildren: .07 } }
					},
					children: items.map((faq, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						role: "listitem",
						variants: fadeUp(),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQItem, {
							faq,
							isOpen: openIdx === i,
							onToggle: () => toggle(i),
							meta,
							index: i
						})
					}, i))
				})]
			})
		]
	});
}
function getSafeLocalStorage(key, fallback = null) {
	if (typeof window === "undefined" || typeof localStorage === "undefined") return fallback;
	try {
		const val = typeof window !== "undefined" ? localStorage.getItem(key) : null;
		return val !== null ? val : fallback;
	} catch {
		return fallback;
	}
}
function getSafeLang(defaultLang = "en") {
	return getSafeLocalStorage("lang", defaultLang);
}
var CountUp = typeof import_build.default === "function" ? import_build.default : typeof import_build.default?.default === "function" ? import_build.default.default : import_build.default?.default?.default || import_build.default;
var GOLD = "#C79A2B";
var SLIDE_INTERVAL = 6e3;
var SLIDES_FALLBACK = {
	en: [
		{
			img: "/branding/hero.webp",
			accent: "Towards a Prosperous Southern Province",
			line1: "Planning for",
			line2: "Sustainable Development",
			line3: "& A Brighter Tomorrow",
			body: "The Planning Secretariat – Southern Province is committed to effective planning, coordination, and implementation to ensure sustainable development and improved quality of life for all.",
			btn1: {
				label: "Our Divisions",
				path: "/departments"
			},
			btn2: {
				label: "Explore Services",
				path: "/services"
			}
		},
		{
			img: "/branding/hero2.webp",
			accent: "Coordinating Growth Across the Province",
			line1: "Governing with",
			line2: "Purpose & Vision",
			line3: "Across 03 Divisions",
			body: "Twelve specialised divisions work in harmony to drive economic progress, infrastructure development, and social welfare throughout the Southern Province.",
			btn1: {
				label: "Our Divisions",
				path: "/departments"
			},
			btn2: {
				label: "Learn More",
				path: "/documents"
			}
		},
		{
			img: "/branding/hero3.webp",
			accent: "Empowering Every Community",
			line1: "Serving Over",
			line2: "2,600,000 Citizens",
			line3: "With Pride & Dedication",
			body: "From Galle to Hambantota, our secretariat delivers inclusive public services, transparent governance, and community-driven development to every corner of the Southern Province.",
			btn1: {
				label: "Our Services",
				path: "/services"
			},
			btn2: {
				label: "Contact Us",
				path: "/contact"
			}
		}
	],
	si: [
		{
			img: "/branding/hero.webp",
			accent: "සමෘද්ධිමත් දකුණු පළාතක් කරා",
			line1: "තිරසාර සංවර්ධනය",
			line2: "හා දීප්තිමත් හෙටක් සඳහා",
			line3: "සැලසුම් කිරීම",
			body: "දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය, සියලු දෙනාට තිරසාර සංවර්ධනය හා ජීවන තත්ත්වය ඉහළ නැංවීම සඳහා ඵලදායී සැලසුම් කිරීම, සම්බන්ධීකරණය හා ක්‍රියාත්මක කිරීමට කැපවී සිටී.",
			btn1: {
				label: "අපගේ අංශ",
				path: "/departments"
			},
			btn2: {
				label: "සේවාවන් බලන්න",
				path: "/services"
			}
		},
		{
			img: "/branding/hero2.webp",
			accent: "පළාත පුරා සංවර්ධනය සම්බන්ධීකරණය",
			line1: "ඉලක්කයක් සහිතව",
			line2: "අංශ 03 හරහා",
			line3: "පාලනය කිරීම",
			body: "දකුණු පළාතේ ආර්ථික සංවර්ධනය, යටිතල පහසුකම් සංවර්ධනය සහ සමාජ සුබසාධනය ඉදිරියට ගෙනයාමට විශේෂිත අංශ 3 ක් එකිනෙකා සමඟ කාර්යක්ෂමව ක්‍රියා කරයි.",
			btn1: {
				label: "අපගේ අංශ",
				path: "/departments"
			},
			btn2: {
				label: "ලේඛන බලන්න",
				path: "/documents"
			}
		},
		{
			img: "/branding/hero3.webp",
			accent: "සෑම ප්‍රජාවක්ම සවිබලගන්වමින්",
			line1: "ජනතාව",
			line2: "2,600,000 කට අධිකව",
			line3: "සේවය කිරීම",
			body: "ගාල්ලේ සිට හම්බන්තොට දක්වා, අපගේ ලේකම් කාර්යාලය දකුණු පළාතේ සෑම කෙළවරකම සියලු ජනතාවට සේවාවන් ලබා දේ.",
			btn1: {
				label: "සේවාවන්",
				path: "/services"
			},
			btn2: {
				label: "අප අමතන්න",
				path: "/contact"
			}
		}
	],
	ta: [
		{
			img: "/branding/hero.webp",
			accent: "வளமான தென் மாகாணத்தை நோக்கி",
			line1: "திட்டமிடல்",
			line2: "நிலையான வளர்ச்சி",
			line3: "ஒரு பிரகாசமான நாளை",
			body: "தென் மாகாண திட்டமிடல் செயலகம், அனைவருக்கும் நிலையான வளர்ச்சியையும் மேம்பட்ட வாழ்க்கைத் தரத்தையும் உறுதிப்படுத்த அர்ப்பணிக்கப்பட்டுள்ளது.",
			btn1: {
				label: "எங்கள் பிரிவுகள்",
				path: "/departments"
			},
			btn2: {
				label: "சேவைகளை காண்க",
				path: "/services"
			}
		},
		{
			img: "/branding/hero2.webp",
			accent: "மாகாணம் முழுவதும் வளர்ச்சியை ஒருங்கிணைத்தல்",
			line1: "நோக்கத்துடன்",
			line2: "நிர்வகித்தல்",
			line3: "03 பிரிவுகள் வழியாக",
			body: "பன்னிரண்டு சிறப்பு பிரிவுகள் இணைந்து தென் மாகாணத்தின் பொருளாதார முன்னேற்றம், உள்கட்டமைப்பு மேம்பாடு மற்றும் சமூக நலனை இயக்குகின்றன.",
			btn1: {
				label: "எங்கள் பிரிவுகள்",
				path: "/departments"
			},
			btn2: {
				label: "மேலும் பார்க்க",
				path: "/documents"
			}
		},
		{
			img: "/branding/hero3.webp",
			accent: "ஒவ்வொரு சமுதாயத்தையும் வலுப்படுத்துதல்",
			line1: "2,600,000 க்கும் அதிகமான",
			line2: "குடிமக்களுக்கு",
			line3: "சேவை செய்கிறோம்",
			body: "காலி முதல் அம்பாந்தோட்டை வரை, தென் மாகாணத்தின் ஒவ்வொரு மூலையிலும் அனைவருக்கும் சேவைகளை வழங்குகிறோம்.",
			btn1: {
				label: "சேவைகள்",
				path: "/services"
			},
			btn2: {
				label: "தொடர்பு கொள்",
				path: "/contact"
			}
		}
	]
};
var LANG_META = {
	en: {
		font: "Inter, sans-serif",
		headFont: "'Playfair Display', Georgia, serif",
		stats: [
			"Divisions",
			"District",
			"Beneficiaries",
			"Project Success Rate"
		]
	},
	si: {
		font: "'Noto Sans Sinhala', sans-serif",
		headFont: "'Noto Sans Sinhala', sans-serif",
		stats: [
			"අංශ",
			"දිස්ත්‍රික්කය",
			"ප්‍රතිලාභීන්",
			"සාර්ථකත්වය"
		]
	},
	ta: {
		font: "'Noto Sans Tamil', sans-serif",
		headFont: "'Noto Sans Tamil', sans-serif",
		stats: [
			"திணைக்களங்கள்",
			"மாவட்டம்",
			"பயனாளிகள்",
			"வெற்றி விகிதம்"
		]
	}
};
var STAT_ICONS = [
	HiOutlineOfficeBuilding,
	FiMapPin,
	FiUsers,
	FiTrendingUp
];
var STAT_DATA = [
	{
		end: 3,
		suffix: "",
		decimals: 0
	},
	{
		end: 3,
		suffix: "",
		decimals: 0
	},
	{
		end: 500,
		suffix: "K+",
		decimals: 0
	},
	{
		end: 85,
		suffix: "%",
		decimals: 0
	}
];
var cardVariants = {
	hidden: {
		opacity: 0,
		y: 28,
		filter: "blur(6px)"
	},
	visible: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: .72,
			ease: [
				.22,
				1,
				.36,
				1
			]
		}
	},
	exit: {
		opacity: 0,
		y: -16,
		filter: "blur(4px)",
		transition: {
			duration: .42,
			ease: [
				.4,
				0,
				1,
				1
			]
		}
	}
};
var mkLine = (delay) => ({
	hidden: {
		opacity: 0,
		y: 22,
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
				.22,
				1,
				.36,
				1
			]
		}
	}
});
var LINE_ENTER = [
	mkLine(.1),
	mkLine(.2),
	mkLine(.3),
	mkLine(.42),
	mkLine(.54)
];
var eyebrowVariants = {
	hidden: {
		opacity: 0,
		x: -16,
		scale: .92
	},
	visible: {
		opacity: 1,
		x: 0,
		scale: 1,
		transition: {
			duration: .55,
			delay: .02,
			ease: [
				.22,
				1,
				.36,
				1
			]
		}
	}
};
var countUpEasing = (t, b, c, d) => c * (1 - Math.pow(2, -10 * t / d)) + b;
function transformHeroSlides(heroSlides) {
	if (!Array.isArray(heroSlides) || !heroSlides.length) return null;
	const byLang = {
		en: [],
		si: [],
		ta: []
	};
	for (const slide of heroSlides) for (const lang of [
		"en",
		"si",
		"ta"
	]) byLang[lang].push({
		img: slide.image,
		accent: slide.accent?.[lang] || slide.accent?.en || "",
		line1: slide.line1?.[lang] || slide.line1?.en || "",
		line2: slide.line2?.[lang] || slide.line2?.en || "",
		line3: slide.line3?.[lang] || slide.line3?.en || "",
		body: slide.body?.[lang] || slide.body?.en || "",
		btn1: {
			label: slide.btn1?.label?.[lang] || slide.btn1?.label?.en || "",
			path: slide.btn1?.path || "/departments"
		},
		btn2: {
			label: slide.btn2?.label?.[lang] || slide.btn2?.label?.en || "",
			path: slide.btn2?.path || "/services"
		}
	});
	return byLang;
}
function Home() {
	const [lang, setLang] = (0, import_react.useState)(() => getSafeLang("en"));
	const [slidesByLang, setSlidesByLang] = (0, import_react.useState)(SLIDES_FALLBACK);
	(0, import_react.useEffect)(() => {
		const h = (e) => setLang(e.detail || "en");
		window.addEventListener("langChange", h);
		return () => window.removeEventListener("langChange", h);
	}, []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		homeContentApi.get().then(({ data }) => {
			if (cancelled) return;
			const transformed = transformHeroSlides(data?.heroSlides);
			if (transformed) setSlidesByLang(transformed);
		}).catch((err) => console.error("Home: failed to load hero slides", err));
		return () => {
			cancelled = true;
		};
	}, []);
	const meta = LANG_META[lang] || LANG_META.en;
	const slides = slidesByLang[lang] || slidesByLang.en;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeoHead, { page: "home" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "home-wrap",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroSection, {
				slides,
				meta
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeNewsBar, { lang }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeQuickLinks, { lang }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeAboutSecretariat, { lang }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeDeputySecretaryMessage, { lang }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeFAQHighlights, { lang }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeEventsAndInstitutes, { lang })
		]
	})] });
}
function HeroSection({ slides, meta }) {
	const [idx, setIdx] = (0, import_react.useState)(0);
	const total = slides.length;
	const slide = slides[idx];
	const isNonLatin = meta.headFont.includes("Sinhala") || meta.headFont.includes("Tamil");
	const goTo = (0, import_react.useCallback)((n) => setIdx((n + total) % total), [total]);
	(0, import_react.useEffect)(() => {
		slides.forEach((s) => {
			const img = new Image();
			img.src = s.img;
			img.decode().catch(() => {});
		});
	}, [slides]);
	(0, import_react.useEffect)(() => {
		const id = setTimeout(() => goTo(idx + 1), SLIDE_INTERVAL);
		return () => clearTimeout(id);
	}, [idx, goTo]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "hero",
		"aria-label": "Hero carousel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hero__progress",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "hero__progress-fill",
					initial: { scaleX: 0 },
					animate: { scaleX: 1 },
					transition: {
						duration: SLIDE_INTERVAL / 1e3,
						ease: "linear"
					}
				}, idx)
			}),
			slides.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `hero__bg${i === idx ? " hero__bg--active" : ""}`,
				"aria-hidden": "true",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
					src: s.img,
					alt: "",
					className: "hero__bg-img",
					animate: i === idx ? { scale: 1.06 } : { scale: 1 },
					initial: { scale: 1 },
					transition: {
						duration: SLIDE_INTERVAL / 1e3,
						ease: "linear"
					},
					onError: (e) => {
						e.currentTarget.style.opacity = "0";
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero__bg-overlay" })]
			}, s.img)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hero__honeycomb",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombPanel, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hero__orb hero__orb--a",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hero__orb hero__orb--b",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hero__beams",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hero__main",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "wait",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						className: "hero__glass",
						variants: cardVariants,
						initial: "hidden",
						animate: "visible",
						exit: "exit",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								className: "hero__eyebrow",
								variants: eyebrowVariants,
								initial: "hidden",
								animate: "visible",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiamondIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `hero__accent${isNonLatin ? " hero__accent--nl" : ""}`,
									style: { fontFamily: isNonLatin ? meta.font : "'Cinzel', serif" },
									children: slide.accent
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: `hero__heading${isNonLatin ? " hero__heading--nl" : ""}`,
								style: { fontFamily: meta.headFont },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
										className: "hero__line",
										variants: LINE_ENTER[0],
										initial: "hidden",
										animate: "visible",
										children: slide.line1
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
										className: "hero__line hero__line--gold",
										variants: LINE_ENTER[1],
										initial: "hidden",
										animate: "visible",
										children: slide.line2
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
										className: "hero__line",
										variants: LINE_ENTER[2],
										initial: "hidden",
										animate: "visible",
										children: slide.line3
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								className: "hero__rule",
								initial: {
									scaleX: 0,
									opacity: 0
								},
								animate: {
									scaleX: 1,
									opacity: 1
								},
								transition: {
									duration: .5,
									delay: .28,
									ease: [
										.16,
										1,
										.3,
										1
									]
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
								className: "hero__body",
								style: { fontFamily: meta.font },
								variants: LINE_ENTER[3],
								initial: "hidden",
								animate: "visible",
								children: slide.body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								className: "hero__actions",
								variants: LINE_ENTER[4],
								initial: "hidden",
								animate: "visible",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroBtn, {
									to: slide.btn1.path,
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiUsers, { size: 15 }),
									solid: true,
									font: meta.font,
									children: slide.btn1.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroBtn, {
									to: slide.btn2.path,
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiFileText, { size: 15 }),
									font: meta.font,
									children: slide.btn2.label
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "hero__dots",
								role: "tablist",
								"aria-label": "Slide navigation",
								children: slides.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									role: "tab",
									"aria-selected": i === idx,
									"aria-label": `Go to slide ${i + 1}`,
									className: `hero__dot${i === idx ? " hero__dot--on" : ""}`,
									onClick: () => goTo(i)
								}, i))
							})
						]
					}, `text-${idx}`)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsBar, {
				labels: meta.stats,
				font: meta.font
			})
		]
	});
}
function StatsBar({ labels, font }) {
	const { ref, inView } = useInView$1({
		threshold: .4,
		triggerOnce: true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stats-bar",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "stats-bar__inner",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref,
					className: "stats-grid",
					children: STAT_DATA.map(({ end, suffix, decimals }, i) => {
						const Icon = STAT_ICONS[i];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "stat-item",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "stat-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									size: 20,
									style: { color: GOLD }
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "stat-text",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "stat-num",
									style: { fontFamily: "'Playfair Display', serif" },
									children: inView ? typeof CountUp === "function" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountUp, {
										start: 0,
										end,
										duration: 2.2,
										delay: i * .15,
										decimals,
										suffix,
										useEasing: true,
										easingFn: countUpEasing
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [end, suffix] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["0", suffix] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "stat-lbl",
									style: { fontFamily: font },
									children: labels[i]
								})]
							})]
						}, i);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				className: "stats-wave stats-wave--gold",
				viewBox: "0 0 1440 110",
				preserveAspectRatio: "none",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "wg1",
						x1: "0",
						y1: "0",
						x2: "1",
						y2: "0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0%",
								stopColor: "#7A5A10",
								stopOpacity: "0.7"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "50%",
								stopColor: "#C79A2B",
								stopOpacity: "0.55"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "100%",
								stopColor: "#7A5A10",
								stopOpacity: "0.7"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "wg2",
						x1: "0",
						y1: "0",
						x2: "1",
						y2: "0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0%",
								stopColor: "#9A7520"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "35%",
								stopColor: "#C79A2B"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "65%",
								stopColor: "#E8C55A"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "100%",
								stopColor: "#9A7520"
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M-40,75 Q360,18 800,52 Q1100,75 1480,30 L1480,110 L-40,110 Z",
						fill: "url(#wg1)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M-40,88 Q300,42 720,62 Q1080,80 1480,45 L1480,110 L-40,110 Z",
						fill: "url(#wg2)",
						opacity: "0.92"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M-40,88 Q300,42 720,62 Q1080,80 1480,45",
						stroke: "rgba(255,240,180,0.5)",
						strokeWidth: "1.5",
						fill: "none"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: "stats-wave stats-wave--maroon",
				viewBox: "0 0 1440 55",
				preserveAspectRatio: "none",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M0,55 Q360,8 720,28 Q1080,48 1440,12 L1440,55 Z",
					fill: "#4A0918"
				})
			})
		]
	});
}
function HeroBtn({ to, icon, solid, font, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
		to,
		className: `hbtn${solid ? " hbtn--solid" : " hbtn--gold"}`,
		style: { fontFamily: font || "Inter, sans-serif" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.span, {
			className: "hbtn__inner",
			whileHover: {
				y: -2,
				scale: 1.02
			},
			whileTap: { scale: .97 },
			children: [
				icon,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, {
					size: 14,
					strokeWidth: 2.5
				})
			]
		})
	});
}
function DiamondIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "13",
		height: "13",
		viewBox: "0 0 14 14",
		fill: "none",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M7 0.5 L13.5 7 L7 13.5 L0.5 7 Z",
			fill: "#C79A2B",
			opacity: "0.9"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M7 3 L11 7 L7 11 L3 7 Z",
			fill: "#FCFBFA",
			opacity: "0.7"
		})]
	});
}
function HoneycombPanel() {
	const r = 18, hx = r * Math.sqrt(3), vy = r * 1.5;
	const pts = (cx, cy) => Array.from({ length: 6 }, (_, i) => {
		const a = Math.PI / 180 * (60 * i);
		return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
	}).join(" ");
	const cells = [];
	for (let row = 0; row < 14; row++) for (let col = 0; col < 4; col++) cells.push({
		cx: col * hx + (row % 2 ? hx / 2 : 0) + r,
		cy: row * vy + r
	});
	const W = 4 * hx + r + 4, H = 391;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: W,
		height: H,
		viewBox: `0 0 ${W} ${H}`,
		fill: "none",
		"aria-hidden": "true",
		children: cells.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: pts(p.cx, p.cy),
			stroke: "#C79A2B",
			strokeWidth: "1.4",
			fill: "none"
		}, i))
	});
}
var SplitComponent = Home;
//#endregion
export { SplitComponent as component };
