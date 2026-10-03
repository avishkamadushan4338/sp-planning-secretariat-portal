import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react+tanstack__react-query.mjs";
import { useSearchParams } from "./react-router-dom-shim-Y_PNYd7n.mjs";
import { resolveUploadUrl } from "./resolveUploadUrl-Bmb9GHFy.mjs";
import { AnimatePresence, motion } from "../_libs/framer-motion.mjs";
import { FiArrowRight, FiBell, FiCalendar, FiChevronLeft, FiChevronRight, FiDownload, FiExternalLink, FiEye, FiFileText, FiImage, FiSearch, FiX, HiOutlineNewspaper } from "../_libs/react-icons.mjs";
import { ComingSoon, usePageHold } from "./ComingSoon-BKqHq8HT.mjs";
import { SeoHead } from "./seo-9D_r0kof.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/news-BHmm_wHR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAROON = "#4A0918";
var GOLD = "#C79A2B";
var CREAM = "#FCFBFA";
var T = {
	en: {
		heroTitle: "Media Center",
		heroSub: "News · Gallery · Notices",
		heroBody: "Stay informed with the latest updates, announcements, and visual stories from the Southern Province Planning Secretariat.",
		tabNews: "News & Updates",
		tabGallery: "Photo Gallery",
		tabNotices: "Official Notices",
		searchPh: "Search news…",
		allCats: "All Categories",
		featured: "Featured",
		readMore: "Read More",
		viewAll: "View All",
		download: "Download",
		noticeDl: "Download Notice",
		galleryView: "View Photo",
		prevImg: "Previous",
		nextImg: "Next",
		closeLight: "Close",
		loadMore: "Load More",
		newBadge: "New"
	},
	si: {
		heroTitle: "මාධ්‍ය මධ්‍යස්ථානය",
		heroSub: "පුවත් · ඡායාරූප · නිවේදන",
		heroBody: "දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලයේ නවතම තොරතුරු, නිවේදන සහ දෘශ්‍ය කතා සමඟ යාවත්කාලීන වන්න.",
		tabNews: "පුවත් සහ යාවත්කාලීන",
		tabGallery: "ඡායාරූප ගැලරිය",
		tabNotices: "නිල නිවේදන",
		searchPh: "පුවත් සොයන්න…",
		allCats: "සියලු කාණ්ඩ",
		featured: "විශේෂාංග",
		readMore: "තවත් කියවන්න",
		viewAll: "සියල්ල බලන්න",
		download: "බාගන්න",
		noticeDl: "නිවේදනය බාගන්න",
		galleryView: "ඡායාරූපය බලන්න",
		prevImg: "පෙර",
		nextImg: "ඊළඟ",
		closeLight: "වසන්න",
		loadMore: "තවත් පූරණය කරන්න",
		newBadge: "නව"
	},
	ta: {
		heroTitle: "ஊடக மையம்",
		heroSub: "செய்திகள் · தொகுப்பு · அறிவிப்புகள்",
		heroBody: "தென் மாகாண திட்டமிடல் செயலகத்தின் சமீபத்திய புதுப்பிப்புகள், அறிவிப்புகள் மற்றும் காட்சிக் கதைகளுடன் தகவல் பெறுங்கள்.",
		tabNews: "செய்திகள் & புதுப்பிப்புகள்",
		tabGallery: "புகைப்பட தொகுப்பு",
		tabNotices: "அதிகாரப்பூர்வ அறிவிப்புகள்",
		searchPh: "செய்திகளைத் தேடுங்கள்…",
		allCats: "அனைத்து வகைகளும்",
		featured: "சிறப்பு",
		readMore: "மேலும் படிக்க",
		viewAll: "அனைத்தையும் காண்க",
		download: "பதிவிறக்கம்",
		noticeDl: "அறிவிப்பை பதிவிறக்கவும்",
		galleryView: "புகைப்படம் காண்க",
		prevImg: "முந்தையது",
		nextImg: "அடுத்தது",
		closeLight: "மூடு",
		loadMore: "மேலும் ஏற்றவும்",
		newBadge: "புதிய"
	}
};
var LANG_FONT = {
	en: "'Plus Jakarta Sans', Inter, sans-serif",
	si: "'Noto Sans Sinhala', sans-serif",
	ta: "'Noto Sans Tamil', sans-serif"
};
var CATEGORIES = [
	"All Categories",
	"Development",
	"Infrastructure",
	"Planning",
	"Community",
	"Environment"
];
var NOTICE_TYPES = [
	"All",
	"Circular",
	"Notice"
];
var NOTICE_TYPE_COLORS = {
	Circular: {
		bg: "rgba(74,9,24,0.09)",
		text: MAROON,
		border: "rgba(74,9,24,0.20)"
	},
	Notice: {
		bg: "rgba(154,117,32,0.09)",
		text: "#9A7520",
		border: "rgba(154,117,32,0.28)"
	}
};
var fadeUp = {
	hidden: {
		opacity: 0,
		y: 22
	},
	visible: (i = 0) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: .48,
			delay: i * .065,
			ease: [
				.16,
				1,
				.3,
				1
			]
		}
	})
};
var tabContent = {
	hidden: {
		opacity: 0,
		y: 14
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .36,
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
		y: -10,
		transition: {
			duration: .2,
			ease: [
				.4,
				0,
				1,
				1
			]
		}
	}
};
function formatDate(iso) {
	if (!iso) return "";
	const d = new Date(iso);
	if (isNaN(d.getTime())) return "";
	return d.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
function DiamondDivider() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nc-divider",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "nc-divider__line" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				width: "10",
				height: "10",
				viewBox: "0 0 10 10",
				fill: "none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M5 0.5 L9.5 5 L5 9.5 L0.5 5 Z",
					fill: GOLD
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "nc-divider__line" })
		]
	});
}
function SectionLabel({ icon: Icon, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nc-section-label",
		children: [Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			size: 13,
			style: { color: GOLD },
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
	});
}
function useIsMobile() {
	const [mobile, setMobile] = (0, import_react.useState)(() => window.matchMedia("(max-width: 640px)").matches);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(max-width: 640px)");
		const h = (e) => setMobile(e.matches);
		mq.addEventListener("change", h);
		return () => mq.removeEventListener("change", h);
	}, []);
	return mobile;
}
var VALID_TABS = [
	"news",
	"gallery",
	"notices"
];
function News() {
	const held = usePageHold("news");
	const [lang, setLang] = (0, import_react.useState)(() => (typeof window !== "undefined" ? localStorage.getItem("lang") : null) || "en");
	const [searchParams] = useSearchParams();
	const [activeTab, setActiveTab] = (0, import_react.useState)(() => {
		const tab = searchParams.get("tab");
		return VALID_TABS.includes(tab) ? tab : "news";
	});
	(0, import_react.useEffect)(() => {
		const tab = searchParams.get("tab");
		if (VALID_TABS.includes(tab)) setActiveTab(tab);
	}, [searchParams]);
	(0, import_react.useEffect)(() => {
		const h = (e) => setLang(e.detail || "en");
		window.addEventListener("langChange", h);
		return () => window.removeEventListener("langChange", h);
	}, []);
	const t = T[lang] || T.en;
	const font = LANG_FONT[lang] || LANG_FONT.en;
	if (held) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComingSoon, { pageKey: "news" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeoHead, { page: "news" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nc-page",
		style: {
			background: CREAM,
			fontFamily: font
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaHero, {
				t,
				font
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabNav, {
				activeTab,
				setActiveTab,
				t,
				font
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "nc-tab-body",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, {
					mode: "wait",
					children: [
						activeTab === "news" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							variants: tabContent,
							initial: "hidden",
							animate: "visible",
							exit: "exit",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsSection, {
								t,
								font,
								lang
							})
						}, "news"),
						activeTab === "gallery" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							variants: tabContent,
							initial: "hidden",
							animate: "visible",
							exit: "exit",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GallerySection, {
								t,
								font
							})
						}, "gallery"),
						activeTab === "notices" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							variants: tabContent,
							initial: "hidden",
							animate: "visible",
							exit: "exit",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoticesSection, {
								t,
								font,
								lang
							})
						}, "notices")
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageFooterRibbon, {})
		]
	})] });
}
function NcHoneycomb() {
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
function MediaHero({ t, font }) {
	const isNonLatin = font.includes("Noto Sans Sinhala") || font.includes("Noto Sans Tamil");
	const headFont = isNonLatin ? font : "'Playfair Display', Georgia, serif";
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
		className: "nc-hero",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "nc-hero__bg",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "nc-hero__noise",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "nc-hero__grid-lines",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "nc-hero__glow nc-hero__glow--gold",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "nc-hero__glow nc-hero__glow--maroon",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "nc-hero__glow nc-hero__glow--right",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "nc-hero__watermark",
				"aria-hidden": "true",
				children: "MEDIA"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "nc-hero__hc",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NcHoneycomb, {})
			}),
			[...Array(6)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `nc-hero__dot nc-hero__dot--${i + 1}`,
				"aria-hidden": "true"
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nc-hero__inner",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "nc-hero__left",
					initial: "hidden",
					animate: "visible",
					variants: stagger,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							className: "nc-hero__badge",
							variants: itemV,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "nc-hero__badge-dot",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontFamily: isNonLatin ? font : "'Cinzel', serif",
									letterSpacing: isNonLatin ? 0 : "0.13em",
									textTransform: isNonLatin ? "none" : "uppercase"
								},
								children: t.heroTitle
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
							className: "nc-hero__title",
							style: {
								fontFamily: headFont,
								lineHeight: isNonLatin ? 1.35 : 1.08
							},
							variants: itemV,
							children: t.heroTitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "nc-hero__rule",
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
							className: "nc-hero__body",
							style: { fontFamily: font },
							variants: itemV,
							children: t.heroBody
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "nc-hero__quick",
							variants: itemV,
							"aria-hidden": "true",
							children: [
								t.tabNews,
								t.tabGallery,
								t.tabNotices
							].map((label, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "nc-hero__quick-pill",
								style: { fontFamily: font },
								children: label
							}, i))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "nc-hero__right",
					initial: "hidden",
					animate: "visible",
					variants: slideR,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/branding/f-logo.svg",
						alt: "Southern Province Planning Secretariat",
						className: "nc-hero__logo",
						onError: (e) => {
							e.currentTarget.style.display = "none";
						}
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: "nc-hero__wave",
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
function TabNav({ activeTab, setActiveTab, t, font }) {
	const tabsRef = (0, import_react.useRef)(null);
	const tabs = [
		{
			id: "news",
			label: t.tabNews,
			icon: HiOutlineNewspaper
		},
		{
			id: "gallery",
			label: t.tabGallery,
			icon: FiImage
		},
		{
			id: "notices",
			label: t.tabNotices,
			icon: FiBell
		}
	];
	(0, import_react.useEffect)(() => {
		if (!tabsRef.current) return;
		const activeEl = tabsRef.current.querySelector(".nc-tabnav__btn--active");
		if (activeEl) activeEl.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
			inline: "center"
		});
	}, [activeTab]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "nc-tabnav",
		"aria-label": "Media Center tabs",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "nc-tabnav__inner",
			ref: tabsRef,
			role: "tablist",
			children: tabs.map(({ id, label, icon: Icon }) => {
				const active = activeTab === id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					role: "tab",
					"aria-selected": active,
					"aria-controls": `nc-panel-${id}`,
					id: `nc-tab-${id}`,
					className: `nc-tabnav__btn ${active ? "nc-tabnav__btn--active" : ""}`,
					onClick: () => setActiveTab(id),
					style: { fontFamily: font },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							size: 15,
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }),
						active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
							layoutId: "tab-indicator",
							className: "nc-tabnav__indicator",
							"aria-hidden": "true"
						})
					]
				}, id);
			})
		})
	});
}
function NewsSection({ t, font, lang = "en" }) {
	const isMobile = useIsMobile();
	const [query, setQuery] = (0, import_react.useState)("");
	const [activeCat, setActiveCat] = (0, import_react.useState)("All Categories");
	const [cmsNews, setCmsNews] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const load = () => {
			try {
				const saved = JSON.parse((typeof window !== "undefined" ? localStorage.getItem("cms_news") : null) || "[]");
				setCmsNews(saved.filter((n) => n.status === "Active" || n.status === "Published"));
			} catch {}
		};
		load();
		window.addEventListener("storage", load);
		return () => window.removeEventListener("storage", load);
	}, []);
	const filtered = cmsNews.map((n) => ({
		id: n.id,
		featured: n.featured || false,
		category: n.category,
		date: n.date,
		title: n.title,
		titleSi: n.titleSi || "",
		titleTa: n.titleTa || "",
		excerpt: n.excerpt || "",
		image: resolveUploadUrl(n.imageUrl) || "",
		tag: null
	})).filter((n) => {
		const matchCat = activeCat === "All Categories" || n.category === activeCat;
		const matchQ = !query || n.title.toLowerCase().includes(query.toLowerCase());
		return matchCat && matchQ;
	});
	const featured = filtered.find((n) => n.featured);
	const rest = filtered.filter((n) => !n.featured);
	const hoverProps = isMobile ? {} : { whileHover: {
		y: -5,
		transition: { duration: .22 }
	} };
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "nc-section",
		id: "nc-panel-news",
		role: "tabpanel",
		"aria-labelledby": "nc-tab-news",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "nc-section__inner",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "nc-news-toolbar",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "nc-search",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiSearch, {
								size: 15,
								className: "nc-search__icon",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "nc-search__input",
								style: { fontFamily: font },
								placeholder: t.searchPh,
								value: query,
								onChange: (e) => setQuery(e.target.value),
								"aria-label": t.searchPh,
								type: "search"
							}),
							query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "nc-search__clear",
								onClick: () => setQuery(""),
								"aria-label": "Clear search",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 13 })
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "nc-cats",
						role: "group",
						"aria-label": "Filter by category",
						children: CATEGORIES.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: `nc-cats__btn ${activeCat === cat ? "nc-cats__btn--active" : ""}`,
							style: { fontFamily: font },
							onClick: () => setActiveCat(cat),
							"aria-pressed": activeCat === cat,
							children: cat
						}, cat))
					})]
				}),
				filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "nc-empty-state",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HiOutlineNewspaper, {
						size: 40,
						style: {
							color: GOLD,
							opacity: .5
						},
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: { fontFamily: font },
						children: "No data found."
					})]
				}),
				featured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "nc-featured",
					variants: fadeUp,
					initial: "hidden",
					whileInView: "visible",
					viewport: {
						once: true,
						amount: .12
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "nc-featured__img-wrap",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: featured.image,
								alt: featured.title,
								className: "nc-featured__img",
								onError: (e) => {
									e.currentTarget.style.opacity = "0";
								},
								loading: "lazy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "nc-featured__img-overlay",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "nc-featured__badge",
								"aria-label": "Featured article",
								children: t.featured
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "nc-featured__body",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "nc-featured__meta",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "nc-cat-pill",
									children: featured.category
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "nc-date",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCalendar, {
											size: 11,
											"aria-hidden": "true"
										}),
										" ",
										formatDate(featured.date)
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "nc-featured__title",
								style: { fontFamily: font },
								children: lang === "si" && featured.titleSi || lang === "ta" && featured.titleTa || featured.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "nc-featured__excerpt",
								style: { fontFamily: font },
								children: featured.excerpt
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "nc-btn-primary",
								style: { fontFamily: font },
								children: [
									t.readMore,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, {
										size: 14,
										"aria-hidden": "true"
									})
								]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiamondDivider, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
					icon: HiOutlineNewspaper,
					label: "Latest Updates"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "nc-news-grid",
					role: "list",
					children: rest.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
						className: "nc-news-card",
						variants: fadeUp,
						custom: i % 3,
						initial: "hidden",
						whileInView: "visible",
						viewport: {
							once: true,
							amount: .08
						},
						role: "listitem",
						tabIndex: 0,
						...hoverProps,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "nc-news-card__img-wrap",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.image,
									alt: item.title,
									className: "nc-news-card__img",
									onError: (e) => {
										e.currentTarget.style.opacity = "0";
									},
									loading: "lazy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "nc-news-card__img-overlay",
									"aria-hidden": "true"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "nc-cat-pill nc-cat-pill--over",
									children: item.category
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "nc-news-card__body",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "nc-date",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCalendar, {
											size: 11,
											"aria-hidden": "true"
										}),
										" ",
										formatDate(item.date)
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "nc-news-card__title",
									style: { fontFamily: font },
									children: lang === "si" && item.titleSi || lang === "ta" && item.titleTa || item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "nc-news-card__excerpt",
									style: { fontFamily: font },
									children: item.excerpt
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "nc-news-card__link",
									style: { fontFamily: font },
									children: [
										t.readMore,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, {
											size: 12,
											"aria-hidden": "true"
										})
									]
								})
							]
						})]
					}, item.id))
				})
			]
		})
	});
}
var SPAN_CYCLE = [
	"wide",
	"normal",
	"tall",
	"normal",
	"normal",
	"wide"
];
function AlbumViewer({ album, font, t, onClose }) {
	const images = (album.images?.length ? album.images : album.imageUrl ? [album.imageUrl] : []).map(resolveUploadUrl);
	const [idx, setIdx] = (0, import_react.useState)(0);
	const prev = (0, import_react.useCallback)(() => setIdx((i) => (i - 1 + images.length) % images.length), [images.length]);
	const next = (0, import_react.useCallback)(() => setIdx((i) => (i + 1) % images.length), [images.length]);
	const caption = font.includes("Sinhala") && album.titleSi ? album.titleSi : font.includes("Tamil") && album.titleTa ? album.titleTa : album.titleEn || album.titleSi || album.titleTa || "Gallery Album";
	(0, import_react.useEffect)(() => {
		const h = (e) => {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowLeft") prev();
			if (e.key === "ArrowRight") next();
		};
		window.addEventListener("keydown", h);
		return () => window.removeEventListener("keydown", h);
	}, [
		prev,
		next,
		onClose
	]);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "";
		};
	}, []);
	if (!images.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: "nc-lightbox",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: .22 },
		onClick: onClose,
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Album viewer",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			className: "nc-lightbox__card",
			initial: {
				scale: .93,
				opacity: 0
			},
			animate: {
				scale: 1,
				opacity: 1
			},
			exit: {
				scale: .93,
				opacity: 0
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
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "wait",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
						src: images[idx],
						alt: `${caption} — image ${idx + 1} of ${images.length}`,
						className: "nc-lightbox__img",
						initial: {
							opacity: 0,
							scale: 1.03
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						exit: {
							opacity: 0,
							scale: .97
						},
						transition: { duration: .2 }
					}, idx)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "nc-lightbox__footer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "nc-lightbox__caption",
						style: { fontFamily: font },
						children: caption
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "nc-lightbox__counter",
						children: [
							idx + 1,
							" / ",
							images.length
						]
					})]
				}),
				images.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						position: "absolute",
						bottom: 56,
						left: "50%",
						transform: "translateX(-50%)",
						display: "flex",
						gap: 6,
						zIndex: 2
					},
					"aria-hidden": "true",
					children: images.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: (e) => {
							e.stopPropagation();
							setIdx(i);
						},
						style: {
							width: i === idx ? 18 : 7,
							height: 7,
							borderRadius: 4,
							background: i === idx ? "#fff" : "rgba(255,255,255,0.35)",
							border: "none",
							padding: 0,
							cursor: "pointer",
							transition: "all 0.2s"
						}
					}, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "nc-lightbox__close",
					onClick: onClose,
					"aria-label": t.closeLight,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 17 })
				}),
				images.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "nc-lightbox__prev",
					onClick: prev,
					"aria-label": t.prevImg,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronLeft, { size: 21 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "nc-lightbox__next",
					onClick: next,
					"aria-label": t.nextImg,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronRight, { size: 21 })
				})] })
			]
		})
	});
}
function GallerySection({ t, font }) {
	const isMobile = useIsMobile();
	const [lightboxIdx, setLightboxIdx] = (0, import_react.useState)(null);
	const [albumViewer, setAlbumViewer] = (0, import_react.useState)(null);
	const [cmsAlbums, setCmsAlbums] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		try {
			const saved = JSON.parse((typeof window !== "undefined" ? localStorage.getItem("cms_gallery_albums") : null) || "[]");
			setCmsAlbums(saved);
		} catch {}
	}, []);
	const cmsItems = cmsAlbums.map((a, i) => ({
		id: `cms-${a.id}`,
		caption: a.titleEn || a.titleSi || a.titleTa || "Gallery Album",
		captionSi: a.titleSi,
		captionTa: a.titleTa,
		image: resolveUploadUrl(a.imageUrl) || "/branding/hero.webp",
		span: SPAN_CYCLE[i % SPAN_CYCLE.length],
		isAlbum: true,
		albumData: a,
		photoCount: a.photos || 0
	}));
	const allItems = (0, import_react.useMemo)(() => [...cmsItems], [cmsItems]);
	const openItem = (item) => {
		if (item.isAlbum) setAlbumViewer(item.albumData);
		else {
			const flatIdx = allItems.findIndex((x) => x.id === item.id);
			setLightboxIdx(flatIdx);
		}
	};
	const closeLight = (0, import_react.useCallback)(() => setLightboxIdx(null), []);
	const closeAlbum = (0, import_react.useCallback)(() => setAlbumViewer(null), []);
	const regularItems = allItems.filter((x) => !x.isAlbum);
	const lightItem = lightboxIdx !== null ? allItems[lightboxIdx] : null;
	const prevLight = (0, import_react.useCallback)(() => {
		setLightboxIdx((i) => {
			let next = (i - 1 + allItems.length) % allItems.length;
			while (allItems[next]?.isAlbum) next = (next - 1 + allItems.length) % allItems.length;
			return next;
		});
	}, [allItems]);
	const nextLight = (0, import_react.useCallback)(() => {
		setLightboxIdx((i) => {
			let next = (i + 1) % allItems.length;
			while (allItems[next]?.isAlbum) next = (next + 1) % allItems.length;
			return next;
		});
	}, [allItems]);
	(0, import_react.useEffect)(() => {
		if (lightboxIdx === null) return;
		const h = (e) => {
			if (e.key === "Escape") closeLight();
			if (e.key === "ArrowLeft") prevLight();
			if (e.key === "ArrowRight") nextLight();
		};
		window.addEventListener("keydown", h);
		return () => window.removeEventListener("keydown", h);
	}, [
		lightboxIdx,
		prevLight,
		nextLight,
		closeLight
	]);
	(0, import_react.useEffect)(() => {
		if (lightItem) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [lightItem]);
	const getCaption = (item) => {
		if (!item) return "";
		if (font.includes("Sinhala") && item.captionSi) return item.captionSi;
		if (font.includes("Tamil") && item.captionTa) return item.captionTa;
		return item.caption;
	};
	const hoverProps = isMobile ? {} : { whileHover: {
		scale: 1.01,
		transition: { duration: .22 }
	} };
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "nc-section",
		id: "nc-panel-gallery",
		role: "tabpanel",
		"aria-labelledby": "nc-tab-gallery",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nc-section__inner",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
						icon: FiImage,
						label: "Photo Gallery"
					}),
					allItems.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "nc-empty-state",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiImage, {
							size: 40,
							style: {
								color: GOLD,
								opacity: .5
							},
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: { fontFamily: font },
							children: "No data found."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "nc-gallery-grid",
						role: "list",
						children: allItems.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							className: `nc-gallery-item nc-gallery-item--${item.span}`,
							variants: fadeUp,
							custom: i % 4,
							initial: "hidden",
							whileInView: "visible",
							viewport: {
								once: true,
								amount: .08
							},
							onClick: () => openItem(item),
							role: "listitem",
							tabIndex: 0,
							onKeyDown: (e) => {
								if (e.key === "Enter" || e.key === " ") openItem(item);
							},
							"aria-label": `${getCaption(item)}${item.isAlbum ? " (album)" : ""} — press to open`,
							...hoverProps,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.image,
									alt: getCaption(item),
									className: "nc-gallery-item__img",
									onError: (e) => {
										e.currentTarget.style.opacity = "0";
									},
									loading: "lazy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "nc-gallery-item__overlay",
									"aria-hidden": "true",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "nc-gallery-item__icon",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEye, {
											size: 20,
											style: { color: "#fff" }
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "nc-gallery-item__caption",
										style: { fontFamily: font },
										children: getCaption(item)
									})]
								}),
								item.isAlbum && item.photoCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										position: "absolute",
										top: 10,
										right: 10,
										background: "rgba(0,0,0,0.52)",
										backdropFilter: "blur(4px)",
										WebkitBackdropFilter: "blur(4px)",
										borderRadius: 6,
										padding: "3px 8px",
										display: "flex",
										alignItems: "center",
										gap: 4,
										fontSize: "0.65rem",
										fontWeight: 700,
										color: "#fff",
										pointerEvents: "none"
									},
									"aria-hidden": "true",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiImage, { size: 10 }),
										" ",
										item.photoCount
									]
								})
							]
						}, item.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: albumViewer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlbumViewer, {
				album: albumViewer,
				font,
				t,
				onClose: closeAlbum
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: lightItem && !lightItem.isAlbum && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "nc-lightbox",
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				transition: { duration: .22 },
				onClick: closeLight,
				role: "dialog",
				"aria-modal": "true",
				"aria-label": "Photo viewer",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "nc-lightbox__card",
					initial: {
						scale: .93,
						opacity: 0
					},
					animate: {
						scale: 1,
						opacity: 1
					},
					exit: {
						scale: .93,
						opacity: 0
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
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: lightItem.image,
							alt: getCaption(lightItem),
							className: "nc-lightbox__img"
						}, lightboxIdx),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "nc-lightbox__footer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "nc-lightbox__caption",
								style: { fontFamily: font },
								children: getCaption(lightItem)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "nc-lightbox__counter",
								children: [
									regularItems.findIndex((x) => x.id === lightItem.id) + 1,
									" / ",
									regularItems.length
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "nc-lightbox__close",
							onClick: closeLight,
							"aria-label": t.closeLight,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 17 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "nc-lightbox__prev",
							onClick: prevLight,
							"aria-label": t.prevImg,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronLeft, { size: 21 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "nc-lightbox__next",
							onClick: nextLight,
							"aria-label": t.nextImg,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronRight, { size: 21 })
						})
					]
				})
			}) })
		]
	});
}
async function openSignedUrl(fileUrl, forceDownload = false, fileName = "notice-attachment") {
	try {
		if (!fileUrl) throw new Error("No file URL provided");
		if (forceDownload) {
			const a = document.createElement("a");
			a.href = fileUrl;
			a.download = fileName;
			a.rel = "noopener noreferrer";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		} else window.open(fileUrl, "_blank", "noopener,noreferrer");
	} catch (err) {
		alert(`Download failed: ${err.message}`);
	}
}
function canDownload(notice) {
	if (!notice.fileUrl) return false;
	const access = notice.downloadAccess || "Everyone";
	if (access === "Everyone") return true;
	if (access === "RegisteredOnly") return !!sessionStorage.getItem("cms_auth");
	if (access === "AdminOnly") return !!sessionStorage.getItem("cms_auth");
	return false;
}
function NoticesSection({ t, font, lang = "en" }) {
	const [activeType, setActiveType] = (0, import_react.useState)("All");
	const [cmsNotices, setCmsNotices] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const load = () => {
			try {
				const saved = JSON.parse((typeof window !== "undefined" ? localStorage.getItem("cms_notices") : null) || "[]");
				const sevenDaysAgo = Date.now() - 6048e5;
				setCmsNotices(saved.filter((n) => n.status === "Active").map((n) => ({
					...n,
					isNew: n.isNew || new Date(n.date).getTime() > sevenDaysAgo
				})));
			} catch {}
		};
		load();
		const bc = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("cms_notices") : null;
		if (bc) bc.onmessage = load;
		window.addEventListener("storage", load);
		window.addEventListener("cms_notices_updated", load);
		return () => {
			bc?.close();
			window.removeEventListener("storage", load);
			window.removeEventListener("cms_notices_updated", load);
		};
	}, []);
	const filtered = cmsNotices.filter((n) => activeType === "All" || n.type === activeType);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "nc-section",
		id: "nc-panel-notices",
		role: "tabpanel",
		"aria-labelledby": "nc-tab-notices",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "nc-section__inner",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
					icon: FiBell,
					label: "Official Notices"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "nc-notice-filter",
					role: "group",
					"aria-label": "Filter by notice type",
					children: NOTICE_TYPES.map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: `nc-cats__btn ${activeType === type ? "nc-cats__btn--active" : ""}`,
						style: { fontFamily: font },
						onClick: () => setActiveType(type),
						"aria-pressed": activeType === type,
						children: type
					}, type))
				}),
				filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "nc-empty-state",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiBell, {
						size: 40,
						style: {
							color: GOLD,
							opacity: .5
						},
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: { fontFamily: font },
						children: "No data found."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "nc-notice-list",
					role: "list",
					children: filtered.map((notice, i) => {
						const colors = NOTICE_TYPE_COLORS[notice.type] || NOTICE_TYPE_COLORS.Notice;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							className: `nc-notice-row ${notice.isNew ? "nc-notice-row--new" : ""}`,
							variants: fadeUp,
							custom: i % 4,
							initial: "hidden",
							whileInView: "visible",
							viewport: {
								once: true,
								amount: .08
							},
							role: "listitem",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "nc-notice-row__bar",
									style: { background: colors.text },
									"aria-hidden": "true"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "nc-notice-row__icon-wrap",
									style: {
										background: colors.bg,
										border: `1px solid ${colors.border}`
									},
									"aria-hidden": "true",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiFileText, {
										size: 18,
										style: { color: colors.text }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "nc-notice-row__content",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "nc-notice-row__meta",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "nc-notice-type-pill",
													style: {
														background: colors.bg,
														color: colors.text,
														border: `1px solid ${colors.border}`
													},
													children: notice.type
												}),
												notice.isNew && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "nc-notice-new-badge",
													children: t.newBadge
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "nc-date",
													style: { marginLeft: "auto" },
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCalendar, {
															size: 11,
															"aria-hidden": "true"
														}),
														" ",
														formatDate(notice.date)
													]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "nc-notice-row__ref",
											style: { fontFamily: font },
											children: notice.ref
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "nc-notice-row__title",
											style: { fontFamily: font },
											children: lang === "si" && notice.titleSi || lang === "ta" && notice.titleTa || notice.title
										}),
										notice.deadline && formatDate(notice.deadline) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "nc-notice-row__deadline",
											style: { fontFamily: font },
											children: ["Closing Date: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatDate(notice.deadline) })]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "nc-notice-row__actions",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: `nc-btn-dl ${notice.fileUrl ? "" : "nc-btn-dl--disabled"}`,
										onClick: () => notice.fileUrl ? openSignedUrl(notice.fileUrl, false) : null,
										style: { fontFamily: font },
										"aria-label": "View document",
										disabled: !notice.fileUrl,
										title: notice.fileUrl ? "View document" : "No document link available",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiExternalLink, {
											size: 13,
											"aria-hidden": "true"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View" })]
									}), canDownload(notice) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "nc-btn-dl",
										onClick: () => openSignedUrl(notice.fileUrl, true, notice.fileName),
										style: { fontFamily: font },
										"aria-label": t.noticeDl,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiDownload, {
											size: 13,
											"aria-hidden": "true"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.download })]
									})]
								})
							]
						}, notice.id);
					})
				})
			]
		})
	});
}
function PageFooterRibbon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "nc-footer-ribbon",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 1440 80",
			preserveAspectRatio: "none",
			style: {
				width: "100%",
				height: 80,
				display: "block"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "ncRibbon",
					x1: "0",
					y1: "0",
					x2: "1",
					y2: "0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "#7A5A10",
							stopOpacity: "0.8"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "50%",
							stopColor: GOLD,
							stopOpacity: "0.65"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "#7A5A10",
							stopOpacity: "0.8"
						})
					]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M-40,55 Q360,12 800,38 Q1100,58 1480,18 L1480,80 L-40,80 Z",
					fill: "url(#ncRibbon)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M-40,65 Q300,28 720,48 Q1080,65 1480,32 L1480,80 L-40,80 Z",
					fill: MAROON
				})
			]
		})
	});
}
var SplitComponent = News;
//#endregion
export { SplitComponent as component };
