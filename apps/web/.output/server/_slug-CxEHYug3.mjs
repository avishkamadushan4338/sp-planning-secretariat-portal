import { __toESM } from "./_runtime.mjs";
import { require_jsx_runtime, require_react } from "./_libs/react+tanstack__react-query.mjs";
import { Navigate, useParams } from "./_libs/@tanstack/react-router+[...].mjs";
import { Link$1, Navigate$1, useNavigate$1, useParams$1 } from "./_ssr/react-router-dom-shim-Y_PNYd7n.mjs";
import { departmentsApi, staffApi } from "./_ssr/cmsContentApi-C5pJ-eT_.mjs";
import { resolveUploadUrl } from "./_ssr/resolveUploadUrl-Bmb9GHFy.mjs";
import { motion } from "./_libs/framer-motion.mjs";
import { ComingSoon, usePageHold } from "./_ssr/ComingSoon-BKqHq8HT.mjs";
import { ArrowRight, BookOpen, Briefcase, BuildingComplex, ChartPie, ChevronRight, CircleCheckBig, CircleUserRound, ClipboardList, Globe, Landmark, Mail, MapPin, Phone, Settings, Shield, TrendingUp, Users } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-CxEHYug3.js
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
var MAROON$1 = "#4A0918";
var GOLD$1 = "#C79A2B";
var CREAM$1 = "#FCFBFA";
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
var UI$1 = {
	en: {
		backBtn: "Back to Divisions",
		breadHome: "Home",
		breadDepts: "Divisions",
		overview: "Division Overview",
		functions: "Key Functions",
		responsibilities: "Responsibilities",
		downloads: "Downloads & Resources",
		headCard: "Head of Division",
		viewProfile: "View Profile",
		contactDept: "Contact Division",
		staffLabel: "Staff Members",
		locationLabel: "Location",
		staffPlaceholder: "—",
		locationValue: "Southern Province Planning Secretariat - Galle",
		services: "Division Services",
		noHead: "Head of Division information is being updated."
	},
	si: {
		backBtn: "අංශ වෙත ආපසු",
		breadHome: "මුල් පිටුව",
		breadDepts: "අංශ",
		overview: "අංශ දළ විශ්ලේෂණය",
		functions: "ප්‍රධාන කාර්යයන්",
		responsibilities: "වගකීම්",
		downloads: "බාගැනීම් හා සම්පත්",
		headCard: "අංශ ප්‍රධානී",
		viewProfile: "පැතිකඩ බලන්න",
		contactDept: "අංශය අමතන්න",
		staffLabel: "කාර්ය මණ්ඩලය",
		locationLabel: "ස්ථානය",
		staffPlaceholder: "—",
		locationValue: "ලේකම් ගොඩනැගිල්ල, ගාල්ල",
		services: "අංශ සේවාවන්",
		noHead: "අංශ ප්‍රධානීගේ තොරතුරු යාවත්කාලීන කෙරෙමින් පවතී."
	},
	ta: {
		backBtn: "துறைகளுக்கு திரும்பு",
		breadHome: "முகப்பு",
		breadDepts: "துறைகள்",
		overview: "துறை கண்ணோட்டம்",
		functions: "முக்கிய செயல்பாடுகள்",
		responsibilities: "பொறுப்புகள்",
		downloads: "பதிவிறக்கங்கள் & வளங்கள்",
		headCard: "துறை தலைவர்",
		viewProfile: "சுயவிவரம் காண்க",
		contactDept: "துறையை தொடர்பு கொள்",
		staffLabel: "ஊழியர்கள்",
		locationLabel: "இடம்",
		staffPlaceholder: "—",
		locationValue: "செயலக கட்டிடம், காலி",
		services: "துறை சேவைகள்",
		noHead: "துறை தலைவர் தகவல்கள் புதுப்பிக்கப்படுகின்றன."
	}
};
var QUICK_LINKS$1 = [
	{
		key: "accounts",
		path: "/departments/accounts",
		labelKey: "navAccounts",
		icon: BookOpen
	},
	{
		key: "administration",
		path: "/departments/administration",
		labelKey: "navAdmin",
		icon: Settings
	},
	{
		key: "development",
		path: "/departments/development",
		labelKey: "navDev",
		icon: TrendingUp
	},
	{
		key: "head-admin",
		path: "/departments/head-administration",
		labelKey: "navHeadAdmin",
		icon: Users
	},
	{
		key: "head-accounts",
		path: "/departments/head-accounts",
		labelKey: "navHeadAcc",
		icon: ClipboardList
	}
];
var NAV_T$1 = {
	en: {
		navAccounts: "Accounts",
		navAdmin: "Administration",
		navDev: "Development",
		navHeadAdmin: "Head of Administration",
		navHeadAcc: "Head of Accounts",
		quickNav: "Quick Navigation"
	},
	si: {
		navAccounts: "ගිණුම්",
		navAdmin: "පරිපාලන",
		navDev: "සංවර්ධන",
		navHeadAdmin: "පරිපාලන ප්‍රධානී",
		navHeadAcc: "ගිණුම් ප්‍රධානී",
		quickNav: "ශීඝ්‍ර සංචලනය"
	},
	ta: {
		navAccounts: "கணக்குகள்",
		navAdmin: "நிர்வாகம்",
		navDev: "வளர்ச்சி",
		navHeadAdmin: "நிர்வாக தலைவர்",
		navHeadAcc: "கணக்கு தலைவர்",
		quickNav: "விரைவு வழிசெலுத்தல்"
	}
};
var fadeUpV$1 = (delay = 0) => ({
	hidden: {
		opacity: 0,
		y: 24
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			delay,
			duration: .55,
			ease: [
				.22,
				1,
				.36,
				1
			]
		}
	}
});
var staggerV$1 = {
	hidden: {},
	visible: { transition: { staggerChildren: .1 } }
};
var itemV$1 = {
	hidden: {
		opacity: 0,
		y: 22
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .55,
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
function HoneycombBg$1() {
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
			stroke: GOLD$1,
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
function DetailHero({ dept, lang, meta }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "dep-hero",
		"aria-labelledby": "dep-detail-title",
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
				children: dept.key.toUpperCase().slice(0, 4)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dep-hero__hc",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombBg$1, {})
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
					variants: staggerV$1,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							className: "dep-hero__badge",
							variants: itemV$1,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "dep-hero__badge-dot",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontFamily: meta.isNonLatin ? meta.font : "'Cinzel', serif",
									letterSpacing: meta.isNonLatin ? 0 : "0.13em",
									textTransform: meta.isNonLatin ? "none" : "uppercase"
								},
								children: dept.badge[lang]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
							id: "dep-detail-title",
							className: "dep-hero__title",
							style: {
								fontFamily: meta.headFont,
								lineHeight: meta.isNonLatin ? 1.35 : 1.06
							},
							variants: itemV$1,
							children: dept.title[lang]
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							className: "dep-hero__sub",
							style: { fontFamily: meta.font },
							variants: itemV$1,
							children: dept.subtitle[lang]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "dep-hero__right",
					initial: "hidden",
					animate: "visible",
					variants: slideRV,
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/branding/f-logo.svg",
						alt: "",
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
					fill: CREAM$1
				})
			})
		]
	});
}
function QuickNav$1({ lang, meta, activePath }) {
	const nav = useNavigate$1();
	const navT = NAV_T$1[lang] || NAV_T$1.en;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "dep-ql",
		"aria-label": navT.quickNav,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "dep-ql__inner",
			children: QUICK_LINKS$1.map(({ key, path, labelKey, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: `dep-ql__pill${activePath === path ? " active" : ""}`,
				onClick: () => nav(path),
				style: { fontFamily: meta.font },
				"aria-current": activePath === path ? "page" : void 0,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					size: 14,
					"aria-hidden": "true"
				}), navT[labelKey]]
			}, key))
		})
	});
}
function OverviewSection({ dept, lang, meta, ui }) {
	const serviceIcons = [
		Shield,
		Briefcase,
		Landmark,
		ChartPie,
		Globe,
		CircleCheckBig
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "dep-section",
		"aria-labelledby": "dep-overview-heading",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: "hidden",
			whileInView: "visible",
			viewport: {
				once: true,
				margin: "-50px"
			},
			variants: fadeUpV$1(0),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dep-section__eyebrow",
				style: { fontFamily: "'Cinzel', serif" },
				"aria-hidden": "true",
				children: ui.overview
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dep-overview",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dep-overview__grid",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "dep-overview-heading",
						className: "dep-overview__heading",
						style: {
							fontFamily: meta.headFont,
							lineHeight: meta.isNonLatin ? 1.45 : 1.2
						},
						children: dept.title[lang]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "dep-overview__body",
						style: { fontFamily: meta.font },
						children: dept.overview[lang]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dep-overview__stats",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dep-stat",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dep-stat__icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
									size: 18,
									color: GOLD$1,
									"aria-hidden": "true"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dep-stat__label",
								style: { fontFamily: meta.font },
								children: ui.staffLabel
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dep-stat__value",
								style: { fontFamily: "'Cinzel', serif" },
								children: dept.staff
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dep-stat",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dep-stat__icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {
									size: 18,
									color: GOLD$1,
									"aria-hidden": "true"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dep-stat__label",
								style: { fontFamily: meta.font },
								children: ui.locationLabel
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dep-stat__value",
								style: {
									fontFamily: meta.font,
									fontSize: "0.88rem"
								},
								children: ui.locationValue
							})] })]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						marginTop: "1.75rem",
						paddingTop: "1.5rem",
						borderTop: "1px solid rgba(199,154,43,0.10)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "dep-section__eyebrow",
						style: {
							fontFamily: "'Cinzel', serif",
							marginBottom: "0.75rem"
						},
						"aria-hidden": "true",
						children: ui.services
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							display: "flex",
							flexWrap: "wrap",
							gap: "8px"
						},
						children: (dept.services?.[lang] ?? []).map((s, i) => {
							const SIcon = serviceIcons[i % serviceIcons.length];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								style: {
									display: "inline-flex",
									alignItems: "center",
									gap: "6px",
									padding: "6px 14px",
									background: "rgba(199,154,43,0.07)",
									border: "1px solid rgba(199,154,43,0.18)",
									borderRadius: "50px",
									fontSize: "clamp(0.70rem,0.88vw,0.78rem)",
									fontWeight: 600,
									color: MAROON$1,
									fontFamily: meta.font
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SIcon, {
									size: 12,
									color: GOLD$1,
									"aria-hidden": "true"
								}), s]
							}, i);
						})
					})]
				})]
			})]
		})
	});
}
function FunctionsSection({ dept, lang, meta, ui }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "dep-section",
		style: { paddingTop: 0 },
		"aria-labelledby": "dep-functions-heading",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: "hidden",
			whileInView: "visible",
			viewport: {
				once: true,
				margin: "-50px"
			},
			variants: staggerV$1,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				variants: itemV$1,
				style: { marginBottom: "1.5rem" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "dep-section__eyebrow",
					style: { fontFamily: "'Cinzel', serif" },
					"aria-hidden": "true",
					children: ui.functions
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "dep-functions-heading",
					className: "dep-section__heading",
					style: {
						fontFamily: meta.headFont,
						lineHeight: meta.isNonLatin ? 1.45 : 1.15
					},
					children: ui.functions
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "dep-func-grid",
				variants: staggerV$1,
				children: (dept.functions[lang]?.length ? dept.functions[lang] : dept.functions.en).map((fn, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "dep-func-card",
					variants: itemV$1,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "dep-func-card__num",
						"aria-hidden": "true",
						children: String(i + 1).padStart(2, "0")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "dep-func-card__text",
						style: { fontFamily: meta.font },
						children: fn
					})]
				}, i))
			})]
		})
	});
}
function ResponsibilitiesSection({ dept, lang, meta, ui }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "dep-section",
		style: { paddingTop: 0 },
		"aria-labelledby": "dep-resp-heading",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: "hidden",
			whileInView: "visible",
			viewport: {
				once: true,
				margin: "-50px"
			},
			variants: staggerV$1,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				variants: itemV$1,
				style: { marginBottom: "1.5rem" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "dep-section__eyebrow",
					style: { fontFamily: "'Cinzel', serif" },
					"aria-hidden": "true",
					children: ui.responsibilities
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "dep-resp-heading",
					className: "dep-section__heading",
					style: {
						fontFamily: meta.headFont,
						lineHeight: meta.isNonLatin ? 1.45 : 1.15
					},
					children: ui.responsibilities
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.ul, {
				className: "dep-resp-list",
				variants: staggerV$1,
				role: "list",
				children: (dept.responsibilities[lang]?.length ? dept.responsibilities[lang] : dept.responsibilities.en).map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.li, {
					className: "dep-resp-item",
					variants: itemV$1,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "dep-resp-item__dot",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: { fontFamily: meta.font },
						children: r
					})]
				}, i))
			})]
		})
	});
}
function HeadCard({ dept, lang, meta, ui }) {
	if (!dept.profilePath) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "dep-section",
		style: { paddingTop: 0 },
		"aria-labelledby": "dep-head-heading",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: "hidden",
			whileInView: "visible",
			viewport: {
				once: true,
				margin: "-40px"
			},
			variants: fadeUpV$1(0),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dep-section__eyebrow",
				style: {
					fontFamily: "'Cinzel', serif",
					marginBottom: "1rem"
				},
				"aria-hidden": "true",
				children: ui.headCard
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dep-head-card",
				role: "region",
				"aria-labelledby": "dep-head-heading",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: dept.headPhoto,
						alt: dept.headName[lang],
						className: "dep-head-card__avatar",
						onError: (e) => {
							e.currentTarget.style.display = "none";
							e.currentTarget.nextElementSibling.style.display = "flex";
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "dep-head-card__avatar-placeholder",
						style: { display: "none" },
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleUserRound, {
							size: 36,
							color: "rgba(199,154,43,0.7)"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dep-head-card__info",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dep-head-card__role",
								"aria-hidden": "true",
								children: ui.headCard
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								id: "dep-head-heading",
								className: "dep-head-card__name",
								style: { fontFamily: meta.headFont },
								children: dept.headName[lang]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "dep-head-card__position",
								style: { fontFamily: meta.font },
								children: dept.headPosition[lang]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
						to: dept.profilePath,
						className: "dep-head-card__btn",
						style: { fontFamily: meta.font },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleUserRound, {
							size: 15,
							"aria-hidden": "true"
						}), ui.viewProfile]
					})
				]
			})]
		})
	});
}
function DepartmentDetail() {
	const heldParent = usePageHold("departments");
	const { slug: deptKey } = useParams$1();
	const heldSub = usePageHold(`departments__${deptKey}`);
	const [lang, setLang] = (0, import_react.useState)(() => (typeof window !== "undefined" ? localStorage.getItem("lang") : null) || "en");
	const [dept, setDept] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const h = (e) => setLang(e.detail || "en");
		window.addEventListener("langChange", h);
		return () => window.removeEventListener("langChange", h);
	}, []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		setLoading(true);
		setDept(null);
		Promise.all([departmentsApi.list(), staffApi.list()]).then(([deptRes, staffRes]) => {
			if (cancelled) return;
			const found = (deptRes.data || []).find((d) => d.key === deptKey);
			if (!found) return;
			const head = (staffRes.data || []).find((s) => s.tier === "department-head" && s.departmentId === found.id);
			setDept({
				key: found.key,
				icon: ICON_MAP[found.icon] || DEFAULT_ICON,
				accentColor: found.accentColor,
				staff: found.staffCount,
				profilePath: head?.slug ? `/${head.slug}` : null,
				headName: head?.name,
				headPosition: head?.position,
				headPhoto: resolveUploadUrl(head?.photo || "/branding/ao.webp"),
				title: found.label,
				badge: found.badge,
				subtitle: found.subtitle,
				overview: found.overview,
				functions: found.functions,
				responsibilities: found.responsibilities,
				services: found.services
			});
		}).catch((err) => console.error("DepartmentDetail: failed to load department", err)).finally(() => {
			if (!cancelled) setLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, [deptKey]);
	const meta = (0, import_react.useMemo)(() => LANG_META$1[lang] || LANG_META$1.en, [lang]);
	const ui = (0, import_react.useMemo)(() => UI$1[lang] || UI$1.en, [lang]);
	if (heldParent || heldSub) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComingSoon, { pageKey: "departments" });
	if (!loading && !dept) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate$1, {
		to: "/departments",
		replace: true
	});
	if (!dept) return null;
	const activePath = `/departments/${deptKey}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "dep-wrap",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailHero, {
				dept: {
					...dept,
					key: deptKey
				},
				lang,
				meta
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickNav$1, {
				lang,
				meta,
				activePath
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "dep-breadcrumb",
				"aria-label": "Breadcrumb",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dep-breadcrumb__inner",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
							to: "/home",
							style: { fontFamily: meta.font },
							children: ui.breadHome
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "dep-breadcrumb__sep",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 12 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
							to: "/departments",
							style: { fontFamily: meta.font },
							children: ui.breadDepts
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "dep-breadcrumb__sep",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 12 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "dep-breadcrumb__cur",
							style: { fontFamily: meta.font },
							children: dept.title[lang]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dep-divider" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewSection, {
				dept: {
					...dept,
					key: deptKey
				},
				lang,
				meta,
				ui
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dep-divider" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FunctionsSection, {
				dept: {
					...dept,
					key: deptKey
				},
				lang,
				meta,
				ui
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dep-divider" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsibilitiesSection, {
				dept: {
					...dept,
					key: deptKey
				},
				lang,
				meta,
				ui
			}),
			dept.profilePath && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dep-divider" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadCard, {
				dept: {
					...dept,
					key: deptKey
				},
				lang,
				meta,
				ui
			})
		]
	});
}
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
var QUICK_LINKS = [
	{
		key: "accounts",
		path: "/departments/accounts",
		icon: BookOpen,
		labelKey: "navAccounts"
	},
	{
		key: "administration",
		path: "/departments/administration",
		icon: Settings,
		labelKey: "navAdmin"
	},
	{
		key: "development",
		path: "/departments/development",
		icon: TrendingUp,
		labelKey: "navDev"
	},
	{
		key: "head-admin",
		path: "/departments/head-administration",
		icon: Users,
		labelKey: "navHeadAdmin"
	},
	{
		key: "head-accounts",
		path: "/departments/head-accounts",
		icon: ClipboardList,
		labelKey: "navHeadAcc"
	}
];
var NAV_T = {
	en: {
		navAccounts: "Accounts",
		navAdmin: "Administration",
		navDev: "Development",
		navHeadAdmin: "Head of Administration",
		navHeadAcc: "Head of Accounts",
		quickNav: "Quick Navigation"
	},
	si: {
		navAccounts: "ගිණුම්",
		navAdmin: "පරිපාලන",
		navDev: "සංවර්ධන",
		navHeadAdmin: "පරිපාලන ප්‍රධානී",
		navHeadAcc: "ගිණුම් ප්‍රධානී",
		quickNav: "ශීඝ්‍ර සංචලනය"
	},
	ta: {
		navAccounts: "கணக்குகள்",
		navAdmin: "நிர்வாகம்",
		navDev: "வளர்ச்சி",
		navHeadAdmin: "நிர்வாக தலைவர்",
		navHeadAcc: "கணக்கு தலைவர்",
		quickNav: "விரைவு வழிசெலுத்தல்"
	}
};
var UI = {
	en: {
		breadHome: "Home",
		breadDepts: "Divisions",
		breadProfile: "Head Profile",
		responsTitle: "Responsibilities",
		expTitle: "Experience",
		contactTitle: "Contact Information",
		contactDeptBtn: "Contact Division",
		viewDeptBtn: "View Division",
		contactCTATitle: "Get in Touch",
		contactCTASub: "Reach out to the department for inquiries, assistance, or official correspondence.",
		phoneLbl: "Phone",
		emailLbl: "Email",
		locLbl: "Location",
		deptLbl: "Division"
	},
	si: {
		breadHome: "මුල් පිටුව",
		breadDepts: "අංශ",
		breadProfile: "ප්‍රධානී පැතිකඩ",
		responsTitle: "වගකීම්",
		expTitle: "අත්දැකීම",
		contactTitle: "සම්බන්ධතා තොරතුරු",
		contactDeptBtn: "අංශය අමතන්න",
		viewDeptBtn: "අංශය බලන්න",
		contactCTATitle: "සම්බන්ධ වන්න",
		contactCTASub: "විමසීම්, සහාය හෝ නිල ලිපි ලේඛන සඳහා අංශ සම්බන්ධ කරගන්න.",
		phoneLbl: "දුරකථනය",
		emailLbl: "විද්‍යුත් තැපෑල",
		locLbl: "ස්ථානය",
		deptLbl: "අංශය"
	},
	ta: {
		breadHome: "முகப்பு",
		breadDepts: "துறைகள்",
		breadProfile: "தலைவர் சுயவிவரம்",
		responsTitle: "பொறுப்புகள்",
		expTitle: "அனுபவம்",
		contactTitle: "தொடர்பு தகவல்",
		contactDeptBtn: "துறையை தொடர்பு கொள்",
		viewDeptBtn: "துறையை காண்க",
		contactCTATitle: "தொடர்பு கொள்ளுங்கள்",
		contactCTASub: "விசாரணைகள், உதவி அல்லது அதிகாரப்பூர்வ கடிதத்திற்கு துறையை அணுகவும்.",
		phoneLbl: "தொலைபேசி",
		emailLbl: "மின்னஞ்சல்",
		locLbl: "இடம்",
		deptLbl: "துறை"
	}
};
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
			duration: .55,
			ease: [
				.16,
				1,
				.3,
				1
			]
		}
	}
};
var fadeUpV = (delay = 0) => ({
	hidden: {
		opacity: 0,
		y: 24
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			delay,
			duration: .55,
			ease: [
				.22,
				1,
				.36,
				1
			]
		}
	}
});
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
function ProfileHero({ profile, lang, meta, ui }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "dprof-hero",
		"aria-labelledby": "dprof-name",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dprof-hero__noise",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dprof-hero__grid-lines",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dprof-hero__glow dprof-hero__glow--gold",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dprof-hero__glow dprof-hero__glow--right",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dep-hero__hc",
				"aria-hidden": "true",
				style: { opacity: .05 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombBg, {})
			}),
			[...Array(6)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `dep-hero__dot dep-hero__dot--${i + 1}`,
				"aria-hidden": "true"
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dprof-hero__inner",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "dprof__img-frame",
					initial: {
						opacity: 0,
						scale: .88
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					transition: {
						duration: .75,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: profile.imgSrc,
						alt: profile.name[lang],
						className: "dprof__img",
						onError: (e) => {
							e.currentTarget.style.display = "none";
							e.currentTarget.nextElementSibling.style.display = "flex";
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "dprof__img-placeholder",
						style: { display: "none" },
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleUserRound, {
							size: 64,
							color: "rgba(199,154,43,0.65)"
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "dprof-hero__content",
					initial: "hidden",
					animate: "visible",
					variants: staggerV,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							className: "dprof-hero__badge",
							variants: itemV,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "dprof-hero__badge-dot",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontFamily: meta.isNonLatin ? meta.font : "'Cinzel', serif",
									letterSpacing: meta.isNonLatin ? 0 : "0.12em",
									textTransform: meta.isNonLatin ? "none" : "uppercase"
								},
								children: profile.badge[lang]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
							id: "dprof-name",
							className: "dprof-hero__name",
							style: {
								fontFamily: meta.headFont,
								lineHeight: meta.isNonLatin ? 1.35 : 1.08
							},
							variants: itemV,
							children: profile.name[lang]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "dprof-hero__rule",
							variants: itemV,
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							className: "dprof-hero__position",
							style: { fontFamily: meta.font },
							variants: itemV,
							children: profile.position[lang]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							className: "dprof-hero__actions",
							variants: itemV,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
								to: "/contact",
								className: "dprof-hero__btn dprof-hero__btn--gold",
								style: { fontFamily: meta.font },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
									size: 14,
									"aria-hidden": "true"
								}), ui.contactDeptBtn]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
								to: profile.deptPath,
								className: "dprof-hero__btn dprof-hero__btn--ghost",
								style: { fontFamily: meta.font },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuildingComplex, {
									size: 14,
									"aria-hidden": "true"
								}), ui.viewDeptBtn]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: "dprof-hero__wave",
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
function QuickNav({ lang, meta, activePath }) {
	const nav = useNavigate$1();
	const navT = NAV_T[lang] || NAV_T.en;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "dep-ql",
		"aria-label": navT.quickNav,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "dep-ql__inner",
			children: QUICK_LINKS.map(({ key, path, labelKey, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: `dep-ql__pill${activePath === path ? " active" : ""}`,
				onClick: () => nav(path),
				style: { fontFamily: meta.font },
				"aria-current": activePath === path ? "page" : void 0,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					size: 14,
					"aria-hidden": "true"
				}), navT[labelKey]]
			}, key))
		})
	});
}
function ProfileSidebar({ profile, lang, meta, ui }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "dprof-sidebar",
		"aria-label": "Profile details",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dprof-info-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "dprof-info-card__heading",
						"aria-hidden": "true",
						children: ui.contactTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dprof-info-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "dprof-info-row__icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
								size: 14,
								color: GOLD,
								"aria-hidden": "true"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "dprof-info-row__label",
							style: { fontFamily: "'Cinzel', serif" },
							children: ui.phoneLbl
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "dprof-info-row__value",
							style: { fontFamily: meta.font },
							children: profile.contact.phone
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dprof-info-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "dprof-info-row__icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
								size: 14,
								color: GOLD,
								"aria-hidden": "true"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "dprof-info-row__label",
							style: { fontFamily: "'Cinzel', serif" },
							children: ui.emailLbl
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "dprof-info-row__value",
							style: {
								fontFamily: meta.font,
								wordBreak: "break-all"
							},
							children: profile.contact.email
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dprof-info-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "dprof-info-row__icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
								size: 14,
								color: GOLD,
								"aria-hidden": "true"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "dprof-info-row__label",
							style: { fontFamily: "'Cinzel', serif" },
							children: ui.locLbl
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "dprof-info-row__value",
							style: { fontFamily: meta.font },
							children: profile.contact.location
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dprof-info-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "dprof-info-row__icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuildingComplex, {
								size: 14,
								color: GOLD,
								"aria-hidden": "true"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "dprof-info-row__label",
							style: { fontFamily: "'Cinzel', serif" },
							children: ui.deptLbl
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "dprof-info-row__value",
							style: { fontFamily: meta.font },
							children: profile.dept[lang]
						})] })]
					})
				]
			}),
			profile.experience && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dprof-info-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dprof-info-card__heading",
					"aria-hidden": "true",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, {
						size: 11,
						color: GOLD,
						style: {
							display: "inline",
							marginRight: 6
						},
						"aria-hidden": "true"
					}), ui.expTitle]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "dprof-section-card__body",
					style: {
						fontFamily: meta.font,
						lineHeight: 1.8
					},
					children: profile.experience[lang]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
				to: profile.deptPath,
				style: {
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "14px 18px",
					background: `linear-gradient(135deg, ${MAROON} 0%, #2E0812 100%)`,
					borderRadius: "14px",
					textDecoration: "none",
					color: "#fff",
					fontFamily: meta.font,
					fontSize: "0.84rem",
					fontWeight: 700,
					boxShadow: "0 4px 18px rgba(74,9,24,0.22)",
					transition: "transform 0.22s ease, box-shadow 0.22s ease"
				},
				onMouseEnter: (e) => {
					e.currentTarget.style.transform = "translateY(-2px)";
					e.currentTarget.style.boxShadow = "0 8px 28px rgba(74,9,24,0.32)";
				},
				onMouseLeave: (e) => {
					e.currentTarget.style.transform = "";
					e.currentTarget.style.boxShadow = "0 4px 18px rgba(74,9,24,0.22)";
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 8
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuildingComplex, {
						size: 15,
						"aria-hidden": "true"
					}), ui.viewDeptBtn]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
					size: 14,
					"aria-hidden": "true"
				})]
			})
		]
	});
}
function ProfileMainContent({ profile, lang, meta, ui }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "dprof-main-content",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			className: "dprof-section-card",
			initial: "hidden",
			whileInView: "visible",
			viewport: {
				once: true,
				margin: "-40px"
			},
			variants: fadeUpV(0),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "dprof-section-card__heading",
				style: {
					fontFamily: meta.headFont,
					lineHeight: meta.isNonLatin ? 1.45 : 1.2
				},
				children: ui.responsTitle
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.ul, {
				className: "dprof-resp-list",
				initial: "hidden",
				whileInView: "visible",
				viewport: { once: true },
				variants: staggerV,
				role: "list",
				children: (profile.responsibilities[lang]?.length ? profile.responsibilities[lang] : profile.responsibilities.en).map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.li, {
					style: { fontFamily: meta.font },
					variants: itemV,
					children: r
				}, i))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			className: "dprof-contact-cta",
			initial: "hidden",
			whileInView: "visible",
			viewport: {
				once: true,
				margin: "-40px"
			},
			variants: fadeUpV(0),
			role: "region",
			"aria-label": "Contact section",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dprof-contact-cta__title",
				style: {
					fontFamily: meta.headFont,
					lineHeight: meta.isNonLatin ? 1.45 : 1.2
				},
				children: ui.contactCTATitle
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "dprof-contact-cta__text",
				style: { fontFamily: meta.font },
				children: ui.contactCTASub
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
				to: "/contact",
				className: "dprof-contact-cta__btn",
				style: { fontFamily: meta.font },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
					size: 15,
					"aria-hidden": "true"
				}), ui.contactDeptBtn]
			})]
		})]
	});
}
var DEPARTMENT_BY_ID = {
	"dept-administration": {
		path: "/departments/administration",
		dept: {
			en: "Administration Division",
			si: "පරිපාලන අංශය",
			ta: "நிர்வாகத் துறை"
		}
	},
	"dept-accounts": {
		path: "/departments/accounts",
		dept: {
			en: "Accounts Division",
			si: "ගිණුම් අංශය",
			ta: "கணக்குத் துறை"
		}
	},
	"dept-development": {
		path: "/departments/development",
		dept: {
			en: "Development Division",
			si: "සංවර්ධන අංශය",
			ta: "வளர்ச்சித் துறை"
		}
	}
};
function staffToProfile(s) {
	const deptMeta = DEPARTMENT_BY_ID[s.departmentId] || {
		path: "/departments",
		dept: {
			en: "",
			si: "",
			ta: ""
		}
	};
	return {
		imgSrc: resolveUploadUrl(s.photo),
		deptPath: deptMeta.path,
		badge: s.position,
		name: s.name,
		position: s.position,
		responsibilities: s.responsibilities,
		experience: s.experience?.en ? s.experience : null,
		contact: {
			phone: s.phone || "",
			email: s.email || "",
			location: s.office || ""
		},
		dept: deptMeta.dept
	};
}
function DepartmentProfile() {
	const heldParent = usePageHold("departments");
	const { slug: profileKey } = useParams$1();
	const heldSub = usePageHold(`departments__${profileKey}`);
	const [lang, setLang] = (0, import_react.useState)(() => (typeof window !== "undefined" ? localStorage.getItem("lang") : null) || "en");
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const h = (e) => setLang(e.detail || "en");
		window.addEventListener("langChange", h);
		return () => window.removeEventListener("langChange", h);
	}, []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		setLoading(true);
		setProfile(null);
		staffApi.list().then(({ data }) => {
			if (cancelled || !Array.isArray(data)) return;
			const found = data.find((s) => s.tier === "department-head" && s.slug && s.slug.endsWith(`/${profileKey}`));
			if (found) setProfile(staffToProfile(found));
		}).catch((err) => console.error("DepartmentProfile: failed to load staff", err)).finally(() => {
			if (!cancelled) setLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, [profileKey]);
	const meta = (0, import_react.useMemo)(() => LANG_META[lang] || LANG_META.en, [lang]);
	const ui = (0, import_react.useMemo)(() => UI[lang] || UI.en, [lang]);
	if (heldParent || heldSub) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComingSoon, { pageKey: "departments" });
	if (!loading && !profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate$1, {
		to: "/departments",
		replace: true
	});
	if (!profile) return null;
	const activePath = `/departments/${profileKey}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "dprof-wrap",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileHero, {
				profile,
				lang,
				meta,
				ui
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickNav, {
				lang,
				meta,
				activePath
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "dep-breadcrumb",
				"aria-label": "Breadcrumb",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dep-breadcrumb__inner",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
							to: "/home",
							style: { fontFamily: meta.font },
							children: ui.breadHome
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "dep-breadcrumb__sep",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 12 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
							to: "/departments",
							style: { fontFamily: meta.font },
							children: ui.breadDepts
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "dep-breadcrumb__sep",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 12 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
							to: profile.deptPath,
							style: { fontFamily: meta.font },
							children: profile.dept[lang]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "dep-breadcrumb__sep",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 12 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "dep-breadcrumb__cur",
							style: { fontFamily: meta.font },
							children: ui.breadProfile
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dep-divider" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "dprof-body",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileSidebar, {
					profile,
					lang,
					meta,
					ui
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileMainContent, {
					profile,
					lang,
					meta,
					ui
				})]
			})
		]
	});
}
var DEPT_KEYS = /* @__PURE__ */ new Set([
	"accounts",
	"administration",
	"development"
]);
var PROFILE_KEYS = /* @__PURE__ */ new Set(["head-administration", "head-accounts"]);
function DepartmentRouter() {
	const { slug } = useParams({ strict: false });
	if (slug && DEPT_KEYS.has(slug)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepartmentDetail, {});
	if (slug && PROFILE_KEYS.has(slug)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepartmentProfile, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/departments",
		replace: true
	});
}
//#endregion
export { DepartmentRouter as component };
