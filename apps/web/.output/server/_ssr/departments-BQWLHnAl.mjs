import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react+tanstack__react-query.mjs";
import { Link$1, useNavigate$1 } from "./react-router-dom-shim-Y_PNYd7n.mjs";
import { departmentsApi } from "./cmsContentApi-C5pJ-eT_.mjs";
import { motion } from "../_libs/framer-motion.mjs";
import { ComingSoon, usePageHold } from "./ComingSoon-BKqHq8HT.mjs";
import { SeoHead } from "./seo-9D_r0kof.mjs";
import { ArrowRight, BookOpen, BuildingComplex, ClipboardList, Settings, TrendingUp, Users } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/departments-BQWLHnAl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ICON_MAP = {
	BookOpen,
	Settings,
	TrendingUp,
	Users,
	ClipboardList
};
var DEFAULT_ICON = BuildingComplex;
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
		badgeLabel: "Divisions",
		pageTitle: "Divisions",
		pageSub: "Explore the key divisions of the Planning Secretariat and their responsibilities.",
		pageSub2: "සැලසුම් ලේකම් කාර්යාලයේ ප්‍රධාන අංශ සහ ඒවායේ වගකීම්",
		pageSub3: "திட்டமிடல் செயலகத்தின் முக்கிய துறைகள் மற்றும் அவற்றின் பொறுப்புகள்",
		allDepts: "All Divisions",
		staffLabel: "Staff Members",
		readMore: "Read More",
		quickNav: "Quick Navigation",
		navAccounts: "Accounts",
		navAdmin: "Administration",
		navDev: "Development",
		navHeadAdmin: "Head of Administration",
		navHeadAcc: "Head of Accounts",
		deptEyebrow: "Our Divisions",
		deptHeading: "Organisational Units",
		deptSub: "Each division plays a vital role in fulfilling the mandate of the Planning Secretariat across the Southern Province."
	},
	si: {
		badgeLabel: "අංශ",
		pageTitle: "අංශ",
		pageSub: "සැලසුම් ලේකම් කාර්යාලයේ ප්‍රධාන අංශ සහ ඒවායේ වගකීම් පිළිබඳව දැනගන්න.",
		pageSub2: "Explore the key departments of the Planning Secretariat.",
		pageSub3: "திட்டமிடல் செயலகத்தின் முக்கிய துறைகள்",
		allDepts: "සියලු අංශ",
		staffLabel: "කාර්ය මණ්ඩලය",
		readMore: "තව කියවන්න",
		quickNav: "ශීඝ්‍ර සංචලනය",
		navAccounts: "ගිණුම්",
		navAdmin: "පරිපාලන",
		navDev: "සංවර්ධන",
		navHeadAdmin: "පරිපාලන ප්‍රධානී",
		navHeadAcc: "ගිණුම් ප්‍රධානී",
		deptEyebrow: "අපේ අංශ",
		deptHeading: "සංවිධාන ඒකක",
		deptSub: "සෑම අංශයක්ම දකුණු පළාතේ සැලසුම් ලේකම් කාර්යාලයේ කාර්යභාරය ඉටු කිරීමේදී ඉතා වැදගත් කාර්යභාරයක් ඉටු කරයි."
	},
	ta: {
		badgeLabel: "துறைகள்",
		pageTitle: "துறைகள்",
		pageSub: "திட்டமிடல் செயலகத்தின் முக்கிய துறைகள் மற்றும் அவற்றின் பொறுப்புகளை அறிந்துகொள்ளுங்கள்.",
		pageSub2: "சைலசும் லேகம் காரியாலயத்தின் முக்கிய துறைகள்",
		pageSub3: "Explore the key departments of the Planning Secretariat.",
		allDepts: "அனைத்து துறைகள்",
		staffLabel: "ஊழியர்கள்",
		readMore: "மேலும் படிக்க",
		quickNav: "விரைவு வழிசெலுத்தல்",
		navAccounts: "கணக்குகள்",
		navAdmin: "நிர்வாகம்",
		navDev: "வளர்ச்சி",
		navHeadAdmin: "நிர்வாக தலைவர்",
		navHeadAcc: "கணக்கு தலைவர்",
		deptEyebrow: "எங்கள் துறைகள்",
		deptHeading: "நிறுவன பிரிவுகள்",
		deptSub: "ஒவ்வொரு துறையும் தென் மாகாண திட்டமிடல் செயலகத்தின் ஆணையை நிறைவேற்றுவதில் முக்கிய பங்கு வகிக்கிறது."
	}
};
var QUICK_LINKS = [
	{
		key: "accounts",
		pathKey: "/departments/accounts",
		icon: BookOpen,
		labelKey: "navAccounts"
	},
	{
		key: "administration",
		pathKey: "/departments/administration",
		icon: Settings,
		labelKey: "navAdmin"
	},
	{
		key: "development",
		pathKey: "/departments/development",
		icon: TrendingUp,
		labelKey: "navDev"
	},
	{
		key: "head-admin",
		pathKey: "/departments/head-administration",
		icon: Users,
		labelKey: "navHeadAdmin"
	},
	{
		key: "head-accounts",
		pathKey: "/departments/head-accounts",
		icon: ClipboardList,
		labelKey: "navHeadAcc"
	}
];
var staggerV = {
	hidden: {},
	visible: { transition: { staggerChildren: .1 } }
};
var itemV = {
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
var slideRV = {
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
var cardV = {
	hidden: {
		opacity: 0,
		y: 30
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
var cardContV = {
	hidden: {},
	visible: { transition: { staggerChildren: .12 } }
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "dep-hero",
		"aria-labelledby": "dep-hero-title",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dep-hero__bg",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dep-hero__noise",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dep-hero__grid-lines",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dep-hero__glow dep-hero__glow--gold",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dep-hero__glow dep-hero__glow--maroon",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dep-hero__glow dep-hero__glow--right",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dep-hero__watermark",
				"aria-hidden": "true",
				children: "DEPT"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dep-hero__hc",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombBg, {})
			}),
			[...Array(6)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `dep-hero__dot dep-hero__dot--${i + 1}`,
				"aria-hidden": "true"
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dep-hero__inner",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "dep-hero__left",
					initial: "hidden",
					animate: "visible",
					variants: staggerV,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							className: "dep-hero__badge",
							variants: itemV,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "dep-hero__badge-dot",
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
							id: "dep-hero-title",
							className: "dep-hero__title",
							style: {
								fontFamily: meta.headFont,
								lineHeight: meta.isNonLatin ? 1.35 : 1.06
							},
							variants: itemV,
							children: t.pageTitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "dep-hero__rule",
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							className: "dep-hero__langs",
							variants: itemV,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "dep-hero__sub",
								style: { fontFamily: meta.font },
								children: t.pageSub
							}), !meta.isNonLatin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "dep-hero__lang-sub",
								style: { fontFamily: "'Noto Sans Sinhala', sans-serif" },
								children: t.pageSub2
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "dep-hero__lang-sub",
								style: { fontFamily: "'Noto Sans Tamil', sans-serif" },
								children: t.pageSub3
							})] })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "dep-hero__right",
					initial: "hidden",
					animate: "visible",
					variants: slideRV,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/branding/f-logo.svg",
						alt: "Southern Province Planning Secretariat",
						className: "dep-hero__logo",
						onError: (e) => {
							e.currentTarget.style.display = "none";
						}
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: "dep-hero__wave",
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
function QuickNav({ t, meta, activePath }) {
	const navigate = useNavigate$1();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "dep-ql",
		"aria-label": t.quickNav,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "dep-ql__inner",
			children: QUICK_LINKS.map(({ key, pathKey, icon: Icon, labelKey }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: `dep-ql__pill${activePath === pathKey ? " active" : ""}`,
				onClick: () => navigate(pathKey),
				style: { fontFamily: meta.font },
				"aria-current": activePath === pathKey ? "page" : void 0,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					size: 14,
					"aria-hidden": "true"
				}), t[labelKey]]
			}, key))
		})
	});
}
function DepartmentCard({ dept, lang, meta, t, index }) {
	const Icon = dept.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		variants: cardV,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
			to: dept.path,
			className: "dep-card",
			"aria-label": `${dept.label[lang]} — ${t.readMore}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dep-card__header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "dep-card__icon-wrap",
						style: { color: dept.color },
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							size: clamp(22, 26, 30),
							style: { color: dept.color }
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dep-card__title-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "dep-card__label",
							"aria-hidden": "true",
							children: meta.isNonLatin ? "" : `Div. ${String(index + 1).padStart(2, "0")}`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "dep-card__title",
							style: {
								fontFamily: meta.headFont,
								lineHeight: meta.isNonLatin ? 1.45 : 1.25
							},
							children: dept.label[lang]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "dep-card__desc",
					style: { fontFamily: meta.font },
					children: dept.desc[lang]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dep-card__meta",
					style: { fontFamily: meta.font },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
						size: 13,
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						t.staffLabel,
						": ",
						dept.staff
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "dep-card__footer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "dep-card__btn",
						style: { fontFamily: meta.font },
						"aria-hidden": "true",
						children: [t.readMore, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
							size: 14,
							className: "dep-card__btn-arrow",
							"aria-hidden": "true"
						})]
					})
				})
			]
		})
	});
}
function clamp(min, val, max) {
	return Math.min(max, Math.max(min, val));
}
function DepartmentsSection({ lang, meta, t, departments, loading }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "dep-cards-section",
		"aria-labelledby": "dep-cards-heading",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "dep-cards-section__inner",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 20
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: {
					once: true,
					margin: "-60px"
				},
				transition: {
					duration: .55,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				style: { marginBottom: "clamp(1.5rem,3vw,2.5rem)" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "dep-section__eyebrow",
						style: { fontFamily: "'Cinzel', serif" },
						"aria-hidden": "true",
						children: t.deptEyebrow
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "dep-cards-heading",
						className: "dep-section__heading",
						style: {
							fontFamily: meta.headFont,
							lineHeight: meta.isNonLatin ? 1.45 : 1.15
						},
						children: t.deptHeading
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "dep-section__sub",
						style: { fontFamily: meta.font },
						children: t.deptSub
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "dep-cards-grid",
				initial: "hidden",
				whileInView: "visible",
				viewport: {
					once: true,
					margin: "-40px"
				},
				variants: cardContV,
				children: loading ? null : departments.map((dept, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepartmentCard, {
					dept,
					lang,
					meta,
					t,
					index: i
				}, dept.key))
			})]
		})
	});
}
function Departments() {
	const held = usePageHold("departments");
	const [lang, setLang] = (0, import_react.useState)(() => (typeof window !== "undefined" ? localStorage.getItem("lang") : null) || "en");
	const [departments, setDepartments] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const h = (e) => setLang(e.detail || "en");
		window.addEventListener("langChange", h);
		return () => window.removeEventListener("langChange", h);
	}, []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		setLoading(true);
		departmentsApi.list().then(({ data }) => {
			if (cancelled || !Array.isArray(data)) return;
			const normalized = [...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((d) => ({
				key: d.key,
				path: `/departments/${d.key}`,
				icon: ICON_MAP[d.icon] || DEFAULT_ICON,
				color: d.accentColor,
				staff: d.staffCount,
				label: d.label,
				desc: d.desc,
				shortLabel: d.shortLabel
			}));
			setDepartments(normalized);
		}).catch((err) => console.error("Departments: failed to load departments", err)).finally(() => {
			if (!cancelled) setLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, []);
	const meta = (0, import_react.useMemo)(() => LANG_META[lang] || LANG_META.en, [lang]);
	const t = (0, import_react.useMemo)(() => T[lang] || T.en, [lang]);
	if (held) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComingSoon, { pageKey: "departments" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeoHead, { page: "departments" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			background: CREAM,
			minHeight: "100vh"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
				t,
				meta
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickNav, {
				t,
				meta,
				activePath: "/departments"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepartmentsSection, {
				lang,
				meta,
				t,
				departments,
				loading
			})
		]
	})] });
}
var SplitComponent = Departments;
//#endregion
export { SplitComponent as component };
