import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react+tanstack__react-query.mjs";
import { Link$1 } from "./react-router-dom-shim-Y_PNYd7n.mjs";
import { faqsApi } from "./cmsContentApi-C5pJ-eT_.mjs";
import { AnimatePresence, motion } from "../_libs/framer-motion.mjs";
import { FiArrowRight, FiChevronDown, FiHelpCircle, FiHome, FiMail, FiMessageSquare, FiPhone, FiSearch, FiX } from "../_libs/react-icons.mjs";
import { SeoHead } from "./seo-9D_r0kof.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/faq-Bs2_6Stz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
		pageTitle: "FAQ",
		badgeLabel: "FAQ",
		pageSub: "Find answers to common questions about the Southern Province Planning Secretariat, our services, and how to interact with our office.",
		breadHome: "Home",
		breadCur: "FAQ",
		backHome: "Back to Home",
		contactUs: "Contact Us",
		introTitle: "Frequently Asked Questions",
		introSub: "Find answers to common questions related to services, planning, reports, downloads, departments, and public information.",
		searchPh: "Search questions…",
		searchLabel: "Search FAQ",
		noResults: "No questions match your search.",
		noResultsSub: "Try a different keyword or browse a category.",
		catAll: "All",
		catGeneral: "General",
		catPlanning: "Planning",
		catDownloads: "Downloads",
		catReports: "Reports",
		catDepts: "Divisions",
		catTech: "Technical Support",
		helpTitle: "Need More Assistance?",
		helpSub: "Contact the Planning Secretariat for further guidance.",
		helpContact: "Contact Us",
		helpDir: "Telephone Directory",
		snhTitle: "Still Haven't Found Your Answer?",
		snhSub: "Our team is available during office hours to assist you with any questions.",
		snhBtn: "Send Us a Message",
		snhHours: "Office Hours: Mon – Fri · 8:30 AM – 4:15 PM",
		snhEmail: "info@sppsgn.lk"
	},
	si: {
		heroAccent: "දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය",
		pageTitle: "FAQ",
		badgeLabel: "නිතර අසන පැන",
		pageSub: "දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය, අපගේ සේවාවන් සහ කාර්යාලය සමඟ ක්‍රියා කිරීම ගැන පොදු ප්‍රශ්නවලට පිළිතුරු සොයා ගන්න.",
		breadHome: "මුල් පිටුව",
		breadCur: "නිතර අසන පැන",
		backHome: "මුල් පිටුවට",
		contactUs: "අප අමතන්න",
		introTitle: "නිතර අසන ප්‍රශ්න",
		introSub: "සේවාවන්, සැලසුම්, වාර්තා, බාගත කිරීම්, අංශ සහ මහජන තොරතුරු සම්බන්ධ පොදු ප්‍රශ්න සඳහා පිළිතුරු සොයා ගන්න.",
		searchPh: "ප්‍රශ්න සොයන්න…",
		searchLabel: "FAQ සොයන්න",
		noResults: "ඔබගේ සෙවුමට ගැලපෙන ප්‍රශ්න නොමැත.",
		noResultsSub: "වෙනත් මූල පදයක් උත්සාහ කරන්න.",
		catAll: "සියල්ල",
		catGeneral: "සාමාන්‍ය",
		catPlanning: "සැලසුම්",
		catDownloads: "බාගත කිරීම්",
		catReports: "වාර්තා",
		catDepts: "අංශ",
		catTech: "තාක්ෂණික සහාය",
		helpTitle: "තවත් සහාය අවශ්‍යද?",
		helpSub: "තවදුරටත් මඟ පෙන්වීම සඳහා සැලසුම් ලේකම් කාර්යාලය අමතන්න.",
		helpContact: "අප අමතන්න",
		helpDir: "දුරකථන නාමාවලිය",
		snhTitle: "තවමත් පිළිතුර සොයාගත නොහැකිද?",
		snhSub: "කාර්යාල වේලාවන් තුළ ඔබගේ ඕනෑම ප්‍රශ්නයකට සහාය දීමට අපගේ කණ්ඩායම සූදානම්.",
		snhBtn: "පණිවිඩයක් එවන්න",
		snhHours: "කාර්යාල වේලාවන්: සඳු – සිකු · පෙ.ව. 8:30 – ප.ව. 4:15",
		snhEmail: "info@sppsgn.lk"
	},
	ta: {
		heroAccent: "தென் மாகாண திட்டமிடல் செயலகம்",
		pageTitle: "FAQ",
		badgeLabel: "கேள்வி-பதில்",
		pageSub: "தென் மாகாண திட்டமிடல் செயலகம், எங்கள் சேவைகள் மற்றும் அலுவலகத்துடன் தொடர்புகொள்வது பற்றிய பொதுவான கேள்விகளுக்கு பதில்கள் காணுங்கள்.",
		breadHome: "முகப்பு",
		breadCur: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
		backHome: "முகப்புக்கு",
		contactUs: "தொடர்பு கொள்ளுங்கள்",
		introTitle: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
		introSub: "சேவைகள், திட்டமிடல், அறிக்கைகள், பதிவிறக்கங்கள், துறைகள் மற்றும் பொதுத் தகவல்கள் தொடர்பான பொதுவான கேள்விகளுக்கான பதில்களை கண்டறியுங்கள்.",
		searchPh: "கேள்விகளை தேடுங்கள்…",
		searchLabel: "FAQ தேடுக",
		noResults: "உங்கள் தேடலுக்கு பொருந்தும் கேள்விகள் இல்லை.",
		noResultsSub: "வேறு முக்கிய வார்த்தையை முயற்சிக்கவும்.",
		catAll: "அனைத்தும்",
		catGeneral: "பொது",
		catPlanning: "திட்டமிடல்",
		catDownloads: "பதிவிறக்கங்கள்",
		catReports: "அறிக்கைகள்",
		catDepts: "துறைகள்",
		catTech: "தொழில்நுட்ப ஆதரவு",
		helpTitle: "மேலும் உதவி தேவையா?",
		helpSub: "மேலும் வழிகாட்டுதலுக்கு திட்டமிடல் செயலகத்தை தொடர்பு கொள்ளுங்கள்.",
		helpContact: "தொடர்பு கொள்ளுங்கள்",
		helpDir: "தொலைபேசி அட்டவணை",
		snhTitle: "இன்னும் உங்கள் பதிலைக் காணவில்லையா?",
		snhSub: "அலுவலக நேரங்களில் உங்கள் கேள்விகளுக்கு உதவ எங்கள் குழு தயாராக உள்ளது.",
		snhBtn: "செய்தி அனுப்புங்கள்",
		snhHours: "அலுவலக நேரம்: திங் – வெள் · 8:30 AM – 4:15 PM",
		snhEmail: "info@sppsgn.lk"
	}
};
var CATEGORIES = [
	{
		id: "all",
		labelKey: "catAll"
	},
	{
		id: "general",
		labelKey: "catGeneral"
	},
	{
		id: "planning",
		labelKey: "catPlanning"
	},
	{
		id: "downloads",
		labelKey: "catDownloads"
	},
	{
		id: "reports",
		labelKey: "catReports"
	},
	{
		id: "departments",
		labelKey: "catDepts"
	},
	{
		id: "tech",
		labelKey: "catTech"
	}
];
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
		className: "faq-hero",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "faq-hero__bg",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "faq-hero__noise",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "faq-hero__grid-lines",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "faq-hero__glow faq-hero__glow--gold",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "faq-hero__glow faq-hero__glow--maroon",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "faq-hero__glow faq-hero__glow--right",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "faq-hero__watermark",
				"aria-hidden": "true",
				children: "FAQ"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "faq-hero__hc",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombBg, {})
			}),
			[...Array(6)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `faq-hero__dot faq-hero__dot--${i + 1}`,
				"aria-hidden": "true"
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "faq-hero__inner",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "faq-hero__left",
					initial: "hidden",
					animate: "visible",
					variants: stagger,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							className: "faq-hero__badge",
							variants: itemV,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "faq-hero__badge-dot",
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
							className: "faq-hero__title",
							style: {
								fontFamily: meta.headFont,
								lineHeight: meta.isNonLatin ? 1.35 : 1.08
							},
							variants: itemV,
							children: t.pageTitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "faq-hero__rule",
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
							className: "faq-hero__sub",
							style: { fontFamily: meta.font },
							variants: itemV,
							children: t.pageSub
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							className: "faq-hero__actions",
							variants: itemV,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
								to: "/contact",
								className: "faq-hero__btn faq-hero__btn--gold",
								style: { fontFamily: meta.font },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMail, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.contactUs })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
								to: "/home",
								className: "faq-hero__btn faq-hero__btn--ghost",
								style: { fontFamily: meta.font },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiHome, { size: 15 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.backHome }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, {
										size: 13,
										className: "faq-hero__btn-arrow"
									})
								]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "faq-hero__right",
					initial: "hidden",
					animate: "visible",
					variants: slideR,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/branding/f-logo.svg",
						alt: "Southern Province Planning Secretariat",
						className: "faq-hero__logo",
						onError: (e) => {
							e.currentTarget.style.display = "none";
						}
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: "faq-hero__wave",
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
function FAQHero({ t, meta }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "faq-intro",
		initial: {
			opacity: 0,
			y: 28
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .65,
			ease: [
				.16,
				1,
				.3,
				1
			]
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "faq-intro__icon",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiHelpCircle, {
					size: 28,
					color: GOLD
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "faq-intro__title",
				style: {
					fontFamily: meta.headFont,
					lineHeight: meta.isNonLatin ? 1.4 : 1.18
				},
				children: t.introTitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "faq-intro__sub",
				style: { fontFamily: meta.font },
				children: t.introSub
			})
		]
	});
}
function FAQSearch({ query, setQuery, t, meta }) {
	const inputRef = (0, import_react.useRef)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "faq-search",
		role: "search",
		"aria-label": t.searchLabel,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "faq-search__icon",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiSearch, { size: 18 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: inputRef,
				className: "faq-search__input",
				type: "search",
				value: query,
				onChange: (e) => setQuery(e.target.value),
				placeholder: t.searchPh,
				"aria-label": t.searchLabel,
				style: { fontFamily: meta.font },
				autoComplete: "off",
				spellCheck: false
			}),
			query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "faq-search__clear",
				onClick: () => {
					setQuery("");
					inputRef.current?.focus();
				},
				"aria-label": "Clear search",
				type: "button",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, { size: 16 })
			})
		]
	});
}
function FAQCategories({ activeCategory, setActiveCategory, t, meta }) {
	const tabsRef = (0, import_react.useRef)(null);
	const scrollActive = (id) => {
		setActiveCategory(id);
		const el = tabsRef.current?.querySelector(`[data-cat="${id}"]`);
		if (el) el.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
			inline: "center"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "faq-cats",
		role: "tablist",
		"aria-label": "FAQ categories",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "faq-cats__track",
			ref: tabsRef,
			children: CATEGORIES.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"data-cat": cat.id,
				className: `faq-cats__pill${activeCategory === cat.id ? " faq-cats__pill--active" : ""}`,
				role: "tab",
				"aria-selected": activeCategory === cat.id,
				onClick: () => scrollActive(cat.id),
				style: { fontFamily: meta.font },
				children: t[cat.labelKey]
			}, cat.id))
		})
	});
}
function FAQItem({ item, isOpen, onToggle, meta }) {
	const contentRef = (0, import_react.useRef)(null);
	const id = `faq-panel-${item.id}`;
	const btnId = `faq-btn-${item.id}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `faq-item${isOpen ? " faq-item--open" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			id: btnId,
			className: "faq-item__trigger",
			"aria-expanded": isOpen,
			"aria-controls": id,
			onClick: onToggle,
			style: { fontFamily: meta.headFont },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "faq-item__q",
				children: item.q
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "faq-item__arrow",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronDown, { size: 20 })
			})]
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
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "faq-item__body",
					ref: contentRef,
					style: { fontFamily: meta.font },
					children: item.a
				})
			}, "content")
		})]
	});
}
function FAQAccordion({ items, meta, t, loading }) {
	const [openId, setOpenId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setOpenId(null);
	}, [items]);
	const toggle = (id) => setOpenId((prev) => prev === id ? null : id);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "faq-empty",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiSearch, {
			size: 32,
			color: GOLD,
			style: {
				opacity: .35,
				animation: "spin 1.2s linear infinite"
			}
		})
	});
	if (!items.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "faq-empty",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiSearch, {
				size: 32,
				color: GOLD,
				style: { opacity: .5 }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "faq-empty__msg",
				style: { fontFamily: meta.headFont },
				children: t.noResults
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "faq-empty__sub",
				style: { fontFamily: meta.font },
				children: t.noResultsSub
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "faq-accordion",
		role: "list",
		children: items.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			role: "listitem",
			initial: {
				opacity: 0,
				y: 14
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: {
				duration: .4,
				delay: idx * .045,
				ease: [
					.16,
					1,
					.3,
					1
				]
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQItem, {
				item,
				isOpen: openId === item.id,
				onToggle: () => toggle(item.id),
				meta
			})
		}, item.id))
	});
}
function FAQHelpCard({ t, meta }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "faq-help",
		"aria-label": "Quick Help",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "faq-help__glow",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "faq-help__icon",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMessageSquare, {
					size: 22,
					color: GOLD
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "faq-help__title",
				style: {
					fontFamily: meta.headFont,
					lineHeight: meta.isNonLatin ? 1.5 : 1.2
				},
				children: t.helpTitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "faq-help__sub",
				style: { fontFamily: meta.font },
				children: t.helpSub
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "faq-help__actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
					to: "/contact",
					className: "faq-help__btn faq-help__btn--primary",
					style: { fontFamily: meta.font },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMail, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.helpContact })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
					to: "/contact#directory",
					className: "faq-help__btn faq-help__btn--ghost",
					style: { fontFamily: meta.font },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPhone, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.helpDir })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "faq-help__divider",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "faq-help__hours",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "faq-help__hours-dot",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: {
						fontFamily: meta.font,
						fontSize: "0.78rem",
						color: "#7A4558"
					},
					children: "Mon – Fri · 8:30 AM – 4:15 PM"
				})]
			})
		]
	});
}
function StillNeedHelp({ t, meta }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "faq-snh",
		"aria-label": t.snhTitle,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "faq-snh__glass" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "faq-snh__inner",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "faq-snh__left",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "faq-snh__title",
						style: {
							fontFamily: meta.headFont,
							lineHeight: meta.isNonLatin ? 1.5 : 1.2
						},
						children: t.snhTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "faq-snh__sub",
						style: { fontFamily: meta.font },
						children: t.snhSub
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "faq-snh__hours",
						style: { fontFamily: meta.font },
						children: t.snhHours
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "faq-snh__right",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
					to: "/contact",
					className: "faq-snh__btn",
					style: { fontFamily: meta.font },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMail, { size: 16 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.snhBtn }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, { size: 14 })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: `mailto:${t.snhEmail}`,
					className: "faq-snh__email",
					style: { fontFamily: meta.font },
					children: t.snhEmail
				})]
			})]
		})]
	});
}
function FAQ() {
	const [lang, setLang] = (0, import_react.useState)(() => (typeof window !== "undefined" ? localStorage.getItem("lang") : null) || "en");
	const [query, setQuery] = (0, import_react.useState)("");
	const [activeCategory, setActiveCategory] = (0, import_react.useState)("all");
	const [faqs, setFaqs] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const h = (e) => {
			setLang(e.detail || "en");
			setQuery("");
			setActiveCategory("all");
		};
		window.addEventListener("langChange", h);
		return () => window.removeEventListener("langChange", h);
	}, []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		setLoading(true);
		faqsApi.list().then(({ data }) => {
			if (cancelled || !Array.isArray(data)) return;
			setFaqs([...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
		}).catch((err) => console.error("FAQ: failed to load FAQs", err)).finally(() => {
			if (!cancelled) setLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, []);
	const meta = LANG_META[lang] || LANG_META.en;
	const t = T[lang] || T.en;
	const data = (0, import_react.useMemo)(() => faqs.map((f) => ({
		id: f.id,
		category: f.category,
		q: f.question?.[lang] || f.question?.en || "",
		a: f.answer?.[lang] || f.answer?.en || ""
	})), [faqs, lang]);
	const filtered = (0, import_react.useMemo)(() => {
		let list = activeCategory === "all" ? data : data.filter((i) => i.category === activeCategory);
		if (query.trim()) {
			const q = query.trim().toLowerCase();
			list = list.filter((i) => i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q));
		}
		return list;
	}, [
		data,
		activeCategory,
		query
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeoHead, { page: "faq" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "faq-page",
		style: {
			background: CREAM,
			minHeight: "100vh"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
				t,
				meta
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "faq-main",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "faq-layout",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "faq-content",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQHero, {
								t,
								meta
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQSearch, {
								query,
								setQuery,
								t,
								meta
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQCategories, {
								activeCategory,
								setActiveCategory,
								t,
								meta
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQAccordion, {
								items: filtered,
								meta,
								t,
								loading
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "faq-sidebar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQHelpCard, {
							t,
							meta
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StillNeedHelp, {
				t,
				meta
			})
		]
	})] });
}
var SplitComponent = FAQ;
//#endregion
export { SplitComponent as component };
