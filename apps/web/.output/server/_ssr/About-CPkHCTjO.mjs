import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react+tanstack__react-query.mjs";
import { Link$1, Navigate$1, Route, Routes, useLocation$1, useParams$1 } from "./react-router-dom-shim-Y_PNYd7n.mjs";
import { aboutFunctionsApi, aboutHistoryApi, aboutOverviewApi, orgStructureApi, staffApi } from "./cmsContentApi-C5pJ-eT_.mjs";
import { resolveUploadUrl } from "./resolveUploadUrl-Bmb9GHFy.mjs";
import { AnimatePresence, motion } from "../_libs/framer-motion.mjs";
import { FiActivity, FiAlignLeft, FiAward, FiBarChart2, FiBook, FiBriefcase, FiCalendar, FiCheckCircle, FiChevronDown, FiChevronLeft, FiChevronRight, FiClipboard, FiClock, FiCompass, FiDatabase, FiExternalLink, FiEye, FiFileText, FiFlag, FiGlobe, FiGrid, FiHeart, FiLayers, FiLink, FiMail, FiMap, FiMapPin, FiMaximize2, FiMinimize2, FiPhone, FiSearch, FiSend, FiShield, FiStar, FiTarget, FiThumbsUp, FiTrendingUp, FiUnlock, FiUser, FiUsers, FiZap, FiZoomIn, FiZoomOut, HiOutlineChartBar, HiOutlineCollection, HiOutlineOfficeBuilding } from "../_libs/react-icons.mjs";
import { ComingSoon, usePageHold } from "./ComingSoon-BKqHq8HT.mjs";
import { SeoHead } from "./seo-9D_r0kof.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/About-CPkHCTjO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ABOUT_TOPICS = [
	{
		id: "overview",
		path: "/about/overview",
		label: "Planning Secretariat Overview",
		labelSi: "සැලසුම් ලේකම් කාර්යාල දළ විශ්ලේෂණය",
		labelTa: "திட்டமிடல் செயலாலய கண்ணோட்டம்",
		heroTitle: "Planning Secretariat Overview",
		heroSub: "Vision, mission, and the institutional mandate of the Southern Province Planning Secretariat.",
		icon: "overview"
	},
	{
		id: "organization-structure",
		path: "/about/organization-structure",
		label: "Organization Structure",
		labelSi: "සංවිධාන ව්‍යූහය",
		labelTa: "நிறுவன அமைப்பு",
		heroTitle: "Organization Structure",
		heroSub: "The hierarchical framework and administrative units of the Secretariat.",
		icon: "structure"
	},
	{
		id: "functions-duties",
		path: "/about/functions-duties",
		label: "Functions & Duties",
		labelSi: "කාර්ය සාධන හා යුතුකම්",
		labelTa: "செயல்பாடுகள் மற்றும் கடமைகள்",
		heroTitle: "Functions & Duties",
		heroSub: "Statutory responsibilities and core functions entrusted to the Secretariat.",
		icon: "functions"
	},
	{
		id: "history",
		path: "/about/history",
		label: "History",
		labelSi: "ඉතිහාසය",
		labelTa: "வரலாறு",
		heroTitle: "Our History",
		heroSub: "A chronicle of institutional milestones and development of the Planning Secretariat.",
		icon: "history"
	}
];
var fadeUp$2 = {
	hidden: {
		opacity: 0,
		y: 18
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .42,
			ease: [
				.16,
				1,
				.3,
				1
			]
		}
	}
};
var stagger$2 = (d = .07) => ({
	hidden: {},
	visible: { transition: { staggerChildren: d } }
});
/**
* Recursively attaches a `children` array to `node`, populated by every node
* in `nodes` whose `parentId` matches `node.id`, sorted by `order`. Matches
* the shape the old hardcoded MOBILE_TREE had (`{ ...node, children: [...] }`).
* A node with no children ends up with `children: []`.
*/
function attachChildren(nodes, node) {
	const children = nodes.filter((n) => n.parentId === node.id).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((n) => attachChildren(nodes, n));
	return {
		...node,
		children
	};
}
/**
* Builds the nested mobile tree from the flat `nodes` array, starting at the
* node whose `parentId` equals `rootId` (pass `null` to find the top-level
* root, e.g. 'apex'). Returns null if no such root node exists yet (e.g.
* before the fetch resolves, or in the unexpected case no root is found).
*/
function buildTree(nodes, rootId) {
	const root = nodes.find((n) => n.parentId === rootId);
	if (!root) return null;
	return attachChildren(nodes, root);
}
var TIER_CFG = {
	apex: {
		cls: "osc-node--apex",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiShield, { "aria-hidden": "true" })
	},
	director: {
		cls: "osc-node--director",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HiOutlineChartBar, { "aria-hidden": "true" })
	},
	division: {
		cls: "osc-node--division",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiLayers, { "aria-hidden": "true" })
	},
	dd: {
		cls: "osc-node--dd",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HiOutlineOfficeBuilding, { "aria-hidden": "true" })
	},
	stat: {
		cls: "osc-node--stat",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiGrid, { "aria-hidden": "true" })
	},
	officer: {
		cls: "osc-node--officer",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiUser, { "aria-hidden": "true" })
	},
	admin: {
		cls: "osc-node--admin",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiUser, { "aria-hidden": "true" })
	},
	support: {
		cls: "osc-node--support",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiUsers, { "aria-hidden": "true" })
	}
};
var OrgNode = (0, import_react.memo)(function OrgNode({ node, lang, compact = false }) {
	const cfg = TIER_CFG[node.tier] ?? TIER_CFG.support;
	const title = node.title?.[lang] ?? node.title?.en;
	const sub = node.sub?.[lang] ?? node.sub?.en;
	const count = node.count?.[lang] ?? node.count?.en;
	const altLang = lang !== "en" && node.title?.en ? `${node.title.en}${node.sub?.en ? ` (${node.sub.en})` : ""}${node.count?.en ? ` ${node.count.en}` : ""}` : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `osc-node ${cfg.cls}${compact ? " osc-node--compact" : ""}`,
		"data-id": node.id,
		role: "treeitem",
		"aria-label": `${title}${sub ? ` — ${sub}` : ""}${count ? ` ${count}` : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "osc-node__icon",
			"aria-hidden": "true",
			children: cfg.icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "osc-node__body",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "osc-node__title-row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "osc-node__title",
						children: title
					}),
					sub && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "osc-node__sub",
						children: [
							" (",
							sub,
							")"
						]
					}),
					count && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "osc-node__count",
						children: [" ", count]
					})
				]
			}), altLang && altLang !== `${title}${sub ? ` (${sub})` : ""}${count ? ` ${count}` : ""}` && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "osc-node__alt",
				lang: "en",
				children: altLang
			})]
		})]
	});
});
/**
* NOTE: this is a hand-positioned layout, not a generic tree renderer — it
* assumes the fetched `nodesById` lookup contains exactly these 13 node ids:
* apex, dir, dev, fin, dd8, stat, dn22, da50, drv, oa, adm, chief, ms10.
* If a future CMS edit renames/removes one of these ids, this component will
* need a matching manual update (accepted, known limitation — see task notes).
*/
function DesktopChart({ lang, nodesById: N }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "osc-chart",
		role: "tree",
		"aria-label": "Organization Structure Chart",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "osc-r osc-r--apex",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgNode, {
					node: N["apex"],
					lang
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "osc-vstem",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "osc-r osc-r--dir",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgNode, {
					node: N["dir"],
					lang
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "osc-vstem",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "osc-hbar osc-hbar--l2",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "osc-r osc-r--l2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "osc-col osc-col--dev",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "osc-vstem",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgNode, {
							node: N["dev"],
							lang
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "osc-vstem",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "osc-hbar osc-hbar--devl3",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "osc-r osc-r--devl3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "osc-col osc-col--dd8",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "osc-vstem",
										"aria-hidden": "true"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgNode, {
										node: N["dd8"],
										lang
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "osc-vstem",
										"aria-hidden": "true"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "osc-hbar osc-hbar--officers",
										"aria-hidden": "true"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "osc-r osc-r--officers",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "osc-col osc-col--officer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "osc-vstem",
												"aria-hidden": "true"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgNode, {
												node: N["dn22"],
												lang
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "osc-col osc-col--da50",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "osc-vstem",
													"aria-hidden": "true"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgNode, {
													node: N["da50"],
													lang
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "osc-vstem",
													"aria-hidden": "true"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "osc-hbar osc-hbar--ground",
													"aria-hidden": "true"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "osc-r osc-r--ground",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "osc-col osc-col--support",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "osc-vstem",
															"aria-hidden": "true"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgNode, {
															node: N["drv"],
															lang,
															compact: true
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "osc-col osc-col--support",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "osc-vstem",
															"aria-hidden": "true"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgNode, {
															node: N["oa"],
															lang,
															compact: true
														})]
													})]
												})
											]
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "osc-col osc-col--stat",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "osc-vstem",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgNode, {
									node: N["stat"],
									lang
								})]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "osc-col osc-col--fin",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "osc-vstem",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgNode, {
							node: N["fin"],
							lang
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "osc-vstem",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "osc-dashed-hint",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgNode, {
							node: N["adm"],
							lang
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "osc-vstem",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgNode, {
							node: N["chief"],
							lang
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "osc-vstem",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgNode, {
							node: N["ms10"],
							lang
						})
					]
				})]
			})
		]
	});
}
function MobileNode({ node, lang, depth = 0 }) {
	const [open, setOpen] = (0, import_react.useState)(depth < 2);
	const cfg = TIER_CFG[node.tier] ?? TIER_CFG.support;
	const hasChildren = (node.children ?? []).length > 0;
	const title = node.title?.[lang] ?? node.title?.en;
	const sub = node.sub?.[lang] ?? node.sub?.en;
	const count = node.count?.[lang] ?? node.count?.en;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `osc-m-node osc-m-node--d${Math.min(depth, 5)}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: "osc-m-node__header",
			onClick: () => hasChildren && setOpen((v) => !v),
			"aria-expanded": hasChildren ? open : void 0,
			"aria-label": `${title}${sub ? ` — ${sub}` : ""}${count ? ` ${count}` : ""}`,
			style: { cursor: hasChildren ? "pointer" : "default" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "osc-m-node__icon",
					"aria-hidden": "true",
					children: cfg.icon
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "osc-m-node__texts",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "osc-m-node__title",
							children: title
						}),
						sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "osc-m-node__sub",
							children: sub
						}),
						count && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "osc-m-node__count",
							children: count
						})
					]
				}),
				hasChildren && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "osc-m-node__chevron",
					"aria-hidden": "true",
					children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronDown, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronRight, {})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
			initial: false,
			children: hasChildren && open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "osc-m-node__children",
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
					duration: .26,
					ease: [
						.16,
						1,
						.3,
						1
					]
				},
				children: node.children.map((child) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileNode, {
					node: child,
					lang,
					depth: depth + 1
				}, child.id))
			})
		})]
	});
}
var ZOOM_STEPS = [
	.45,
	.6,
	.75,
	.9,
	1,
	1.15,
	1.3
];
function ZoomControls({ zoom, onZoomIn, onZoomOut, onFit, isFullSize }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "osc-zoom",
		role: "group",
		"aria-label": "Chart zoom controls",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "osc-zoom__btn",
				onClick: onZoomOut,
				disabled: zoom <= ZOOM_STEPS[0],
				"aria-label": "Zoom out",
				title: "Zoom out",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiZoomOut, { "aria-hidden": "true" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "osc-zoom__val",
				"aria-live": "polite",
				children: [Math.round(zoom * 100), "%"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "osc-zoom__btn",
				onClick: onZoomIn,
				disabled: zoom >= ZOOM_STEPS[ZOOM_STEPS.length - 1],
				"aria-label": "Zoom in",
				title: "Zoom in",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiZoomIn, { "aria-hidden": "true" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "osc-zoom__sep",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "osc-zoom__btn",
				onClick: onFit,
				"aria-label": isFullSize ? "Fit view" : "Full size",
				title: isFullSize ? "Fit view" : "Full size",
				children: isFullSize ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMinimize2, { "aria-hidden": "true" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMaximize2, { "aria-hidden": "true" })
			})
		]
	});
}
function OrganizationStructureChart({ lang = "en" }) {
	const [zoom, setZoom] = (0, import_react.useState)(.9);
	const [isFullSize, setFullSize] = (0, import_react.useState)(false);
	const [isMobile, setMobile] = (0, import_react.useState)(false);
	const [imgError, setImgError] = (0, import_react.useState)(false);
	const [data, setData] = (0, import_react.useState)(null);
	const scrollRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		orgStructureApi.get().then(({ data }) => {
			if (!cancelled) setData(data);
		}).catch((err) => console.error("OrganizationStructureChart: failed to load org structure", err));
		return () => {
			cancelled = true;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const check = () => {
			const w = window.innerWidth;
			setMobile(w < 640);
		};
		check();
		window.addEventListener("resize", check);
		return () => window.removeEventListener("resize", check);
	}, []);
	(0, import_react.useEffect)(() => {
		const el = scrollRef.current;
		if (!el) return;
		el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
	}, []);
	const zoomIn = (0, import_react.useCallback)(() => setZoom((z) => ZOOM_STEPS.find((s) => s > z) ?? z), []);
	const zoomOut = (0, import_react.useCallback)(() => setZoom((z) => [...ZOOM_STEPS].reverse().find((s) => s < z) ?? z), []);
	const toggleFit = (0, import_react.useCallback)(() => {
		setFullSize((v) => !v);
		setZoom(.9);
	}, []);
	const nodes = (0, import_react.useMemo)(() => data?.nodes ?? [], [data]);
	const nodesById = (0, import_react.useMemo)(() => Object.fromEntries(nodes.map((n) => [n.id, n])), [nodes]);
	const mobileTree = (0, import_react.useMemo)(() => buildTree(nodes, null), [nodes]);
	if (!data) return null;
	const ui = data.ui;
	const intro = ui.intro[lang] ?? ui.intro.en;
	const cardHeader = ui.cardHeader[lang] ?? ui.cardHeader.en;
	const scrollHints = ui.scrollHints[lang] ?? ui.scrollHints.en;
	const legend = ui.legend[lang] ?? ui.legend.en;
	const footer = ui.footer[lang] ?? ui.footer.en;
	const imgFallbackLabel = ui.imgFallbackLabel[lang] ?? ui.imgFallbackLabel.en;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "osc-shell",
		initial: "hidden",
		animate: "visible",
		variants: stagger$2(.08),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				className: "osc-intro",
				variants: fadeUp$2,
				role: "note",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "osc-intro__icon",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HiOutlineChartBar, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "osc-intro__body",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "osc-intro__title",
						children: intro.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "osc-intro__text",
						children: intro.text
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				className: `osc-card${isFullSize ? " osc-card--fullsize" : ""}`,
				variants: fadeUp$2,
				"aria-label": "Organizational chart container",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "osc-card__header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "osc-card__header-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HiOutlineChartBar, {
								className: "osc-card__header-icon",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "osc-card__header-title",
								children: cardHeader.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "osc-card__header-sub",
								children: cardHeader.sub
							})] })]
						}), !isMobile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomControls, {
							zoom,
							onZoomIn: zoomIn,
							onZoomOut: zoomOut,
							onFit: toggleFit,
							isFullSize
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "osc-card__divider",
						"aria-hidden": "true"
					}),
					isMobile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "osc-scroll-hint osc-scroll-hint--mobile",
							"aria-hidden": "true",
							children: scrollHints.mobile
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "osc-mobile-scroll",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "osc-mobile-tree",
								role: "tree",
								"aria-label": "Organization Structure Chart",
								children: mobileTree && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileNode, {
									node: mobileTree,
									lang,
									depth: 0
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "osc-scroll-hint osc-scroll-hint--mobile-bottom",
							"aria-hidden": "true",
							children: scrollHints.mobileBottom
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "osc-scroll-hint osc-scroll-hint--desktop",
						"aria-hidden": "true",
						children: scrollHints.desktop
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "osc-scroll-wrap",
						ref: scrollRef,
						tabIndex: 0,
						"aria-label": "Scrollable organization chart. Use arrow keys or scroll to navigate.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "osc-scale-wrap",
							style: {
								transform: `scale(${zoom})`,
								transformOrigin: "top center"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopChart, {
								lang,
								nodesById
							})
						})
					})] }),
					!imgError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "osc-img-fallback-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "osc-img-fallback-label",
							"aria-hidden": "true",
							children: imgFallbackLabel
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/branding/organization-structure.png",
							alt: "Official Organization Structure — Southern Province Planning Secretariat",
							className: "osc-img-fallback",
							onError: () => setImgError(true),
							loading: "lazy"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "osc-legend",
				variants: fadeUp$2,
				role: "list",
				"aria-label": "Chart legend",
				children: [
					{
						cls: "osc-legend__dot--apex",
						label: legend[0]
					},
					{
						cls: "osc-legend__dot--director",
						label: legend[1]
					},
					{
						cls: "osc-legend__dot--division",
						label: legend[2]
					},
					{
						cls: "osc-legend__dot--dd",
						label: legend[3]
					},
					{
						cls: "osc-legend__dot--officer",
						label: legend[4]
					},
					{
						cls: "osc-legend__dot--admin",
						label: legend[5]
					},
					{
						cls: "osc-legend__dot--support",
						label: legend[6]
					}
				].map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "osc-legend__item",
					role: "listitem",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `osc-legend__dot ${item.cls}`,
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "osc-legend__label",
						children: item.label
					})]
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				className: "ab-glass-accent",
				variants: fadeUp$2,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ab-glass-accent__icon",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiShield, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ab-glass-accent__content",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ab-glass-accent__title",
						children: footer.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ab-glass-accent__sub",
						children: footer.sub
					})]
				})]
			})
		]
	});
}
var fadeUp$1 = {
	hidden: {
		opacity: 0,
		y: 18
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .44,
			ease: [
				.16,
				1,
				.3,
				1
			]
		}
	}
};
var stagger$1 = (d = .07) => ({
	hidden: {},
	visible: { transition: { staggerChildren: d } }
});
var slideLeft = {
	hidden: {
		opacity: 0,
		x: -14
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: .38,
			ease: [
				.16,
				1,
				.3,
				1
			]
		}
	}
};
function useLang$1() {
	const [lang, setLang] = (0, import_react.useState)(() => {
		const stored = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
		return stored === "si" || stored === "ta" ? stored : "en";
	});
	(0, import_react.useEffect)(() => {
		const handler = () => {
			const stored = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
			setLang(stored === "si" || stored === "ta" ? stored : "en");
		};
		window.addEventListener("storage", handler);
		window.addEventListener("langChange", handler);
		return () => {
			window.removeEventListener("storage", handler);
			window.removeEventListener("langChange", handler);
		};
	}, []);
	return lang;
}
var HistoryIntro = (0, import_react.memo)(function HistoryIntro({ t, stats, statLabels }) {
	const isNonLatin = t.font !== "'Plus Jakarta Sans', sans-serif";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.section, {
		className: "hist-intro",
		variants: stagger$1(.09),
		initial: "hidden",
		animate: "visible",
		"aria-labelledby": "hist-intro-heading",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				className: "hist-section-label",
				variants: fadeUp$1,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hist-section-label__dot",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: { fontFamily: isNonLatin ? t.font : void 0 },
					children: t.introLabel
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				className: "hist-intro-card",
				variants: fadeUp$1,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hist-intro-card__accent",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hist-intro-card__inner",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hist-intro-card__icon-wrap",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HiOutlineOfficeBuilding, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hist-intro-card__body",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									id: "hist-intro-heading",
									className: "hist-intro-card__title",
									style: { fontFamily: isNonLatin ? t.font : void 0 },
									children: t.introTitle
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "hist-intro-card__rule",
									"aria-hidden": "true"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "hist-intro-card__text",
									style: { fontFamily: t.font },
									children: t.introPara1
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "hist-intro-card__text",
									style: { fontFamily: t.font },
									children: t.introPara2
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hist-intro-card__ornament",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							viewBox: "0 0 80 80",
							fill: "none",
							width: "80",
							height: "80",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "40",
									cy: "40",
									r: "36",
									stroke: "rgba(199,154,43,0.18)",
									strokeWidth: "1.5",
									strokeDasharray: "4 6"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "40",
									cy: "40",
									r: "24",
									stroke: "rgba(199,154,43,0.12)",
									strokeWidth: "1"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "40",
									cy: "40",
									r: "10",
									fill: "rgba(199,154,43,0.08)"
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "hist-stat-strip",
				variants: stagger$1(.07),
				role: "list",
				"aria-label": "Key facts",
				children: [
					{
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCalendar, {}),
						label: statLabels.established,
						value: stats.established
					},
					{
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HiOutlineOfficeBuilding, {}),
						label: statLabels.province,
						value: stats.province
					},
					{
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiUsers, {}),
						label: statLabels.districts,
						value: stats.districts
					},
					{
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAward, {}),
						label: statLabels.yearsOfService,
						value: stats.yearsOfService
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "hist-stat-card",
					variants: slideLeft,
					role: "listitem",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hist-stat-card__icon",
							"aria-hidden": "true",
							children: s.icon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hist-stat-card__value",
							children: s.value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hist-stat-card__label",
							children: s.label
						})
					]
				}, s.label))
			})
		]
	});
});
var HistoryDirectorsTable = (0, import_react.memo)(function HistoryDirectorsTable({ t }) {
	const isNonLatin = t.font !== "'Plus Jakarta Sans', sans-serif";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.section, {
		className: "hist-directors-section",
		"aria-labelledby": "hist-directors-heading",
		initial: "hidden",
		whileInView: "visible",
		viewport: {
			once: true,
			margin: "-60px"
		},
		variants: stagger$1(.08),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			className: "hist-section-label",
			variants: fadeUp$1,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hist-section-label__dot",
				"aria-hidden": "true"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				id: "hist-directors-heading",
				style: { fontFamily: isNonLatin ? t.font : void 0 },
				children: t.tableTitle
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			className: "hist-directors-card",
			variants: fadeUp$1,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hist-directors-table-wrap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "hist-directors-table",
					"aria-label": t.tableTitle,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							className: "hist-directors-table__th hist-directors-table__th--num",
							children: "#"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							className: "hist-directors-table__th",
							children: t.tableName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							className: "hist-directors-table__th",
							children: t.tableService
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: t.directors.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "hist-directors-table__row",
						tabIndex: 0,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "hist-directors-table__td hist-directors-table__td--num",
								children: i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "hist-directors-table__td hist-directors-table__td--name",
								style: { fontFamily: isNonLatin ? t.font : void 0 },
								children: d.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "hist-directors-table__td hist-directors-table__td--period",
								children: d.period
							})
						]
					}, i)) })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "hist-directors-cards",
				"aria-label": t.tableTitle,
				children: t.directors.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "hist-directors-card-item",
					tabIndex: 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hist-directors-card-item__num",
						children: i + 1
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hist-directors-card-item__body",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hist-directors-card-item__name",
							style: { fontFamily: isNonLatin ? t.font : void 0 },
							children: d.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hist-directors-card-item__period",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCalendar, {
								"aria-hidden": "true",
								style: { flexShrink: 0 }
							}), d.period]
						})]
					})]
				}, i))
			})]
		})]
	});
});
function ProjectCard({ project, t, isNonLatin }) {
	const [imgErr, setImgErr] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "hist-project-card",
		variants: fadeUp$1,
		tabIndex: 0,
		"aria-label": project.title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hist-project-card__img-wrap",
				"aria-hidden": "true",
				children: [!imgErr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: project.img,
					alt: project.title,
					className: "hist-project-card__img",
					onError: () => setImgErr(true),
					loading: "lazy"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hist-project-card__img-placeholder",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAward, {
						className: "hist-project-card__placeholder-icon",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hist-project-card__placeholder-abbr",
						children: project.abbr
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hist-project-card__img-overlay",
					"aria-hidden": "true"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hist-project-card__body",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hist-project-card__year",
						children: project.year
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "hist-project-card__title",
						style: { fontFamily: isNonLatin ? t.font : void 0 },
						children: project.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hist-project-card__desc",
						style: { fontFamily: t.font },
						children: project.desc
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "hist-project-card__btn",
						"aria-label": `${t.projectsRead}: ${project.title}`,
						children: [t.projectsRead, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiExternalLink, { "aria-hidden": "true" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hist-project-card__glow",
				"aria-hidden": "true"
			})
		]
	});
}
(0, import_react.memo)(function HistoryProjects({ t }) {
	const isNonLatin = t.font !== "'Plus Jakarta Sans', sans-serif";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.section, {
		className: "hist-projects-section",
		"aria-labelledby": "hist-projects-heading",
		initial: "hidden",
		whileInView: "visible",
		viewport: {
			once: true,
			margin: "-60px"
		},
		variants: stagger$1(.09),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			className: "hist-section-label",
			variants: fadeUp$1,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hist-section-label__dot",
				"aria-hidden": "true"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				id: "hist-projects-heading",
				style: { fontFamily: isNonLatin ? t.font : void 0 },
				children: t.projectsTitle
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			className: "hist-projects-grid",
			variants: stagger$1(.09),
			children: t.projects.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectCard, {
				project: p,
				t,
				isNonLatin
			}, p.id))
		})]
	});
});
var FONT_BY_LANG = {
	en: "'Plus Jakarta Sans', sans-serif",
	si: "'Noto Sans Sinhala', sans-serif",
	ta: "'Noto Sans Tamil', sans-serif"
};
function HistoryPage() {
	const lang = useLang$1();
	const [data, setData] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		aboutHistoryApi.get().then(({ data }) => {
			if (!cancelled) setData(data);
		}).catch((err) => console.error("HistoryPage: failed to load history", err));
		return () => {
			cancelled = true;
		};
	}, []);
	const t = (0, import_react.useMemo)(() => {
		if (!data) return null;
		return {
			...data[lang] ?? data.en,
			font: FONT_BY_LANG[lang] ?? FONT_BY_LANG.en
		};
	}, [data, lang]);
	if (!data || !t) return null;
	const stats = data.stats;
	const statLabels = stats.labels[lang] ?? stats.labels.en;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "hist-content",
		initial: "hidden",
		animate: "visible",
		variants: stagger$1(.06),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryIntro, {
				t,
				stats,
				statLabels
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryDirectorsTable, { t }),
			false,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				className: "ab-glass-accent",
				variants: fadeUp$1,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ab-glass-accent__icon",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiShield, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ab-glass-accent__content",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ab-glass-accent__title",
						children: t.officialGovt
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ab-glass-accent__sub",
						children: t.officialGovtSub
					})]
				})]
			})
		]
	});
}
function staffToOfficial(s) {
	return {
		id: s.id,
		path: `/about/${s.id}`,
		label: s.position?.en || "",
		labelSi: s.position?.si || "",
		labelTa: s.position?.ta || "",
		name: s.name?.en || "",
		position: s.position?.en || "",
		department: "Planning Secretariat, Southern Province",
		positionRank: s.positionRank || s.position?.en || "",
		photo: resolveUploadUrl(s.photo),
		heroTitle: s.position?.en || "",
		heroSub: "",
		icon: s.tier === "deputy-secretary" ? "deputy-sec" : "director",
		responsibilities: s.responsibilities?.en?.length ? s.responsibilities.en : [],
		contact: {
			phone: s.phone || "",
			email: s.email || "",
			office: s.office || "Planning Secretariat, Southern Province"
		}
	};
}
function staffToDeputyDirector(s, index) {
	const routeId = String(index + 1);
	return {
		id: routeId,
		path: `/about/deputy-directors/${routeId}`,
		label: `Deputy Director ${s.positionNumber || ""}`.trim(),
		name: s.name?.en || "",
		position: s.position?.en || "",
		positionNumber: s.positionNumber || "",
		department: `Planning Division – ${s.positionNumber || ""}`.trim(),
		photo: resolveUploadUrl(s.photo),
		heroTitle: s.position?.en || "",
		heroSub: "Deputy Director of the Southern Province Planning Secretariat.",
		responsibilities: s.responsibilities?.en?.length ? s.responsibilities.en : [],
		contact: {
			phone: s.phone || "",
			email: s.email || "",
			office: s.office || "Planning Secretariat, Southern Province"
		}
	};
}
var AboutStaffContext = (0, import_react.createContext)({
	keyOfficials: [],
	deputyDirectors: []
});
var TOPIC_ICONS = {
	overview: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HiOutlineOfficeBuilding, {}),
	structure: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HiOutlineChartBar, {}),
	functions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HiOutlineCollection, {}),
	history: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiClock, {}),
	divisions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiLayers, {}),
	"deputy-sec": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiShield, {}),
	director: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiBriefcase, {}),
	team: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiUsers, {})
};
function topicIcon(iconKey) {
	return TOPIC_ICONS[iconKey] ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiGrid, {});
}
var fadeUp = {
	hidden: {
		opacity: 0,
		y: 18
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .42,
			ease: [
				.16,
				1,
				.3,
				1
			]
		}
	}
};
var stagger = (delay = .07) => ({
	hidden: {},
	visible: { transition: { staggerChildren: delay } }
});
var slideIn = {
	hidden: {
		opacity: 0,
		x: -12
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: .36,
			ease: [
				.16,
				1,
				.3,
				1
			]
		}
	}
};
function AbHoneycomb() {
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
			stroke: "#C79A2B",
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
var AboutHero = (0, import_react.memo)(function AboutHero({ title, sub }) {
	const staggerV = {
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
		className: "ab-hero",
		"aria-label": `Hero: ${title}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ab-hero__bg",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ab-hero__noise",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ab-hero__grid-lines",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ab-hero__glow ab-hero__glow--gold",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ab-hero__glow ab-hero__glow--maroon",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ab-hero__glow ab-hero__glow--right",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ab-hero__hc",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AbHoneycomb, {})
			}),
			[...Array(6)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `ab-hero__dot ab-hero__dot--${i + 1}`,
				"aria-hidden": "true"
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ab-hero__watermark",
				"aria-hidden": "true",
				children: "ABOUT"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ab-hero__inner",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "ab-hero__left",
					initial: "hidden",
					animate: "visible",
					variants: staggerV,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							className: "ab-hero__badge",
							variants: itemV,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ab-hero__badge-dot",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontFamily: "'Cinzel', serif",
									letterSpacing: "0.13em",
									textTransform: "uppercase"
								},
								children: title
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
							className: "ab-hero__title",
							variants: itemV,
							children: title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "ab-hero__rule",
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
						sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							className: "ab-hero__sub",
							variants: itemV,
							children: sub
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "ab-hero__right",
					initial: "hidden",
					animate: "visible",
					variants: slideR,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/branding/f-logo.svg",
						alt: "Southern Province Planning Secretariat",
						className: "ab-hero__logo",
						onError: (e) => {
							e.currentTarget.style.display = "none";
						}
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: "ab-hero__wave",
				viewBox: "0 0 1440 80",
				preserveAspectRatio: "none",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M0,80 C240,20 480,60 720,40 C960,20 1200,60 1440,30 L1440,80 Z",
					fill: "#F9F6F1"
				})
			})
		]
	});
});
function useAllQuickLinks() {
	const { keyOfficials } = (0, import_react.useContext)(AboutStaffContext);
	return (0, import_react.useMemo)(() => [{
		group: "About",
		items: ABOUT_TOPICS
	}, {
		group: "Key Officials",
		items: [...keyOfficials, {
			id: "deputy-directors",
			path: "/about/deputy-directors",
			label: "Deputy Directors",
			labelSi: "නියෝජ්‍ය අධ්‍යක්ෂවරු",
			labelTa: "துணை இயக்குநர்கள்",
			heroTitle: "Deputy Directors",
			heroSub: "Planning team deputy directors of the Southern Province Planning Secretariat.",
			icon: "team"
		}]
	}], [keyOfficials]);
}
var AboutQuickLinks = (0, import_react.memo)(function AboutQuickLinks({ activePath }) {
	const allQuickLinks = useAllQuickLinks();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
		className: "ab-sidebar",
		"aria-label": "About quick links",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ab-sidebar__inner",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ab-sidebar__header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiGrid, {
					className: "ab-sidebar__header-icon",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ab-sidebar__header-title",
					children: "Quick Links"
				})]
			}), allQuickLinks.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ab-sidebar__group",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ab-sidebar__group-label",
					"aria-hidden": "true",
					children: group.group
				}), group.items.map((item) => {
					const isActive = activePath === item.path || item.path === "/about/deputy-directors" && activePath.startsWith("/about/deputy-directors");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
						to: item.path,
						className: `ab-sidebar__link${isActive ? " ab-sidebar__link--active" : ""}`,
						"aria-current": isActive ? "page" : void 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ab-sidebar__link-dot",
							"aria-hidden": "true"
						}), item.label]
					}, item.id);
				})]
			}, group.group))]
		})
	});
});
var AboutQuickLinksMobile = (0, import_react.memo)(function AboutQuickLinksMobile({ activePath }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const allQuickLinks = useAllQuickLinks();
	const toggle = (0, import_react.useCallback)(() => setOpen((v) => !v), []);
	const activeLabel = (0, import_react.useMemo)(() => {
		for (const g of allQuickLinks) for (const item of g.items) if (activePath === item.path || item.path === "/about/deputy-directors" && activePath.startsWith("/about/deputy-directors")) return item.label;
		return "Quick Links";
	}, [activePath, allQuickLinks]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "ab-quicklinks-mobile",
		"aria-label": "About navigation (mobile)",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: "ab-quicklinks-mobile__toggle",
			"aria-expanded": open,
			"aria-controls": "ql-mobile-panel",
			onClick: toggle,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: activeLabel }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronDown, {
				className: `ab-quicklinks-mobile__toggle-icon${open ? " ab-quicklinks-mobile__toggle-icon--open" : ""}`,
				"aria-hidden": "true"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
			initial: false,
			children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				id: "ql-mobile-panel",
				className: "ab-quicklinks-mobile__panel",
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
					duration: .26,
					ease: [
						.16,
						1,
						.3,
						1
					]
				},
				children: allQuickLinks.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ab-quicklinks-mobile__group-label",
					"aria-hidden": "true",
					children: group.group
				}), group.items.map((item) => {
					const isActive = activePath === item.path || item.path === "/about/deputy-directors" && activePath.startsWith("/about/deputy-directors");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
						to: item.path,
						className: `ab-quicklinks-mobile__link${isActive ? " ab-quicklinks-mobile__link--active" : ""}`,
						"aria-current": isActive ? "page" : void 0,
						onClick: () => setOpen(false),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ab-quicklinks-mobile__link-dot",
							"aria-hidden": "true"
						}), item.label]
					}, item.id);
				})] }, group.group))
			})
		})]
	});
});
var AboutQuickLinksTablet = (0, import_react.memo)(function AboutQuickLinksTablet({ activePath }) {
	const allQuickLinks = useAllQuickLinks();
	const allItems = (0, import_react.useMemo)(() => allQuickLinks.flatMap((g) => g.items), [allQuickLinks]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "ab-quicklinks-tablet",
		"aria-label": "About navigation (tablet)",
		children: allItems.map((item) => {
			const isActive = activePath === item.path || item.path === "/about/deputy-directors" && activePath.startsWith("/about/deputy-directors");
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
				to: item.path,
				className: `ab-quicklinks-tablet__pill${isActive ? " ab-quicklinks-tablet__pill--active" : ""}`,
				"aria-current": isActive ? "page" : void 0,
				children: item.label
			}, item.id);
		})
	});
});
function AboutLayout({ heroTitle, heroSub, children }) {
	const { pathname } = useLocation$1();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ab-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutHero, {
				title: heroTitle,
				sub: heroSub
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutQuickLinksTablet, { activePath: pathname }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutQuickLinksMobile, { activePath: pathname }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ab-body",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutQuickLinks, { activePath: pathname }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "ab-main",
					id: "main-content",
					tabIndex: -1,
					children
				})]
			})
		]
	});
}
var FD_ICON_COMPONENTS = [
	FiSend,
	FiClipboard,
	FiTarget,
	FiCheckCircle,
	FiThumbsUp,
	FiMap,
	FiActivity,
	FiBarChart2,
	FiFileText,
	FiDatabase,
	FiSearch,
	FiGlobe,
	FiAlignLeft,
	FiTrendingUp
];
function useLang() {
	const [lang, setLang] = (0, import_react.useState)(() => {
		const stored = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
		return stored === "si" || stored === "ta" ? stored : "en";
	});
	(0, import_react.useEffect)(() => {
		const handler = () => {
			const stored = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
			setLang(stored === "si" || stored === "ta" ? stored : "en");
		};
		window.addEventListener("storage", handler);
		window.addEventListener("langChange", handler);
		return () => {
			window.removeEventListener("storage", handler);
			window.removeEventListener("langChange", handler);
		};
	}, []);
	return lang;
}
function FunctionsDutiesPage({ topic }) {
	const lang = useLang();
	const [data, setData] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		aboutFunctionsApi.get().then(({ data }) => {
			if (!cancelled) setData(data);
		}).catch((err) => console.error("FunctionsDutiesPage: failed to load functions", err));
		return () => {
			cancelled = true;
		};
	}, []);
	if (!data) return null;
	const t = data[lang] ?? data.en;
	const isNonLatin = lang === "si" || lang === "ta";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutLayout, {
		heroTitle: topic.heroTitle,
		heroSub: topic.heroSub,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			className: "ab-content",
			initial: "hidden",
			animate: "visible",
			variants: stagger(.08),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "ab-fd-intro",
					variants: fadeUp,
					role: "note",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ab-fd-intro__icon",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HiOutlineCollection, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ab-fd-intro__body",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "ab-fd-intro__title",
							style: { fontFamily: isNonLatin ? t.font : void 0 },
							children: t.sectionLabel
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "ab-fd-intro__text",
							style: { fontFamily: t.font },
							children: t.intro
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.ol, {
					className: "ab-fd-grid",
					variants: stagger(.055),
					"aria-label": t.sectionLabel,
					children: t.duties.map((duty, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.li, {
						className: "ab-fd-card",
						variants: fadeUp,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ab-fd-card__left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ab-fd-card__icon-wrap",
								"aria-hidden": "true",
								children: (() => {
									const Icon = FD_ICON_COMPONENTS[i % FD_ICON_COMPONENTS.length];
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {});
								})()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ab-fd-card__number",
								"aria-hidden": "true",
								children: String(i + 1).padStart(2, "0")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "ab-fd-card__text",
							style: { fontFamily: t.font },
							children: duty
						})]
					}, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "ab-glass-accent",
					variants: fadeUp,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ab-glass-accent__icon",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiShield, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ab-glass-accent__content",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "ab-glass-accent__title",
							children: "Official Government Content"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "ab-glass-accent__sub",
							children: "All information published on this page is sourced from the Southern Province Planning Secretariat and is subject to official review before publication."
						})]
					})]
				})
			]
		})
	});
}
function AboutContentPage({ topic }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutLayout, {
		heroTitle: topic.heroTitle,
		heroSub: topic.heroSub,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			className: "ab-content",
			initial: "hidden",
			animate: "visible",
			variants: stagger(.1),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "ab-placeholder-card",
					variants: fadeUp,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "ab-placeholder-card__icon-wrap",
							"aria-hidden": "true",
							children: topicIcon(topic.icon)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "ab-placeholder-card__title",
							children: topic.heroTitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "ab-placeholder-card__sub",
							children: "Content for this section is being prepared and will be published soon. This page is part of the Southern Province Planning Secretariat's official About section."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ab-placeholder-card__badge",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiClock, { "aria-hidden": "true" }), " Coming Soon"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "ab-stat-row",
					variants: stagger(.06),
					role: "list",
					"aria-label": "Key statistics",
					children: [
						{
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiUsers, {}),
							label: "Established",
							value: "1978",
							desc: "Year of establishment"
						},
						{
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HiOutlineOfficeBuilding, {}),
							label: "Province",
							value: "Southern",
							desc: "Provincial coverage"
						},
						{
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiLayers, {}),
							label: "Divisions",
							value: "6",
							desc: "Planning divisions"
						},
						{
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiBook, {}),
							label: "Districts",
							value: "3",
							desc: "Districts covered"
						}
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						className: "ab-stat-card",
						variants: slideIn,
						role: "listitem",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ab-stat-card__icon",
								"aria-hidden": "true",
								children: s.icon
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ab-stat-card__label",
								children: s.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ab-stat-card__value",
								children: s.value
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ab-stat-card__desc",
								children: s.desc
							})
						]
					}, s.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "ab-glass-accent",
					variants: fadeUp,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ab-glass-accent__icon",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiShield, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ab-glass-accent__content",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "ab-glass-accent__title",
							children: "Official Government Content"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "ab-glass-accent__sub",
							children: "All information published on this page is sourced from the Southern Province Planning Secretariat and is subject to official review before publication."
						})]
					})]
				})
			]
		})
	});
}
function AbHoneycombProfile() {
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
			stroke: "#C79A2B",
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
function PremiumProfileHero({ name, position, badge, imgSrc, backPath, backLabel, contactPath }) {
	const staggerV = {
		hidden: {},
		visible: { transition: { staggerChildren: .09 } }
	};
	const itemV = {
		hidden: {
			opacity: 0,
			y: 20
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
	const imgV = {
		hidden: {
			opacity: 0,
			scale: .88
		},
		visible: {
			opacity: 1,
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
	const [imgOk, setImgOk] = (0, import_react.useState)(true);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "dprof-hero",
		"aria-label": `Profile: ${name}`,
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
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AbHoneycombProfile, {})
			}),
			[...Array(6)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `dep-hero__dot dep-hero__dot--${i + 1}`,
				"aria-hidden": "true"
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dprof-hero__inner",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: "hidden",
					animate: "visible",
					variants: imgV,
					style: {
						display: "flex",
						justifyContent: "center"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "dprof__img-frame",
						role: "img",
						"aria-label": name,
						children: imgSrc && imgOk ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: imgSrc,
							alt: name,
							className: "dprof__img",
							onError: () => setImgOk(false)
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "dprof__img-placeholder",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiUser, { size: 48 })
						})
					})
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
									fontFamily: "'Cinzel', serif",
									letterSpacing: "0.12em",
									textTransform: "uppercase",
									fontSize: "0.72rem"
								},
								children: badge
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
							className: "dprof-hero__name",
							style: { fontFamily: "'Playfair Display', Georgia, serif" },
							variants: itemV,
							children: name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "dprof-hero__rule",
							variants: {
								hidden: {
									scaleX: 0,
									opacity: 0
								},
								visible: {
									scaleX: 1,
									opacity: 1,
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
							},
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							className: "dprof-hero__position",
							variants: itemV,
							children: position
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							className: "dprof-hero__actions",
							variants: itemV,
							children: [contactPath && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
								to: contactPath,
								className: "dprof-hero__btn dprof-hero__btn--gold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPhone, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Contact Office" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
								to: backPath,
								className: "dprof-hero__btn dprof-hero__btn--ghost",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronLeft, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: backLabel })]
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
					fill: "#FCFBFA"
				})
			})
		]
	});
}
function OfficialProfilePage({ official }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "dprof-wrap",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PremiumProfileHero, {
			name: official.name,
			position: official.position,
			badge: official.positionRank ?? official.position,
			imgSrc: official.photo,
			backPath: "/about",
			backLabel: "Back to About",
			contactPath: "/contact"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "dprof-body",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "dprof-sidebar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "dprof-info-card",
					initial: {
						opacity: 0,
						y: 20
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: {
						duration: .45,
						ease: [
							.16,
							1,
							.3,
							1
						]
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dprof-info-card__heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPhone, {
								size: 15,
								style: { color: "#C79A2B" },
								"aria-hidden": "true"
							}), "Contact"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dprof-info-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dprof-info-row__icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPhone, { "aria-hidden": "true" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dprof-info-row__label",
								children: "Telephone"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dprof-info-row__value",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `tel:${official.contact.phone}`,
									children: official.contact.phone
								})
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dprof-info-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dprof-info-row__icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMail, { "aria-hidden": "true" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dprof-info-row__label",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dprof-info-row__value",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `mailto:${official.contact.email}`,
									children: official.contact.email
								})
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dprof-info-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dprof-info-row__icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMapPin, { "aria-hidden": "true" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dprof-info-row__label",
								children: "Office"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dprof-info-row__value",
								children: official.contact.office
							})] })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "dprof-info-card",
					initial: {
						opacity: 0,
						y: 20
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: {
						duration: .45,
						delay: .1,
						ease: [
							.16,
							1,
							.3,
							1
						]
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dprof-info-card__heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiBriefcase, {
							size: 15,
							style: { color: "#C79A2B" },
							"aria-hidden": "true"
						}), "Division"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dprof-info-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "dprof-info-row__icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiBriefcase, { "aria-hidden": "true" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "dprof-info-row__label",
							children: "Unit"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "dprof-info-row__value",
							children: official.department ?? "Planning Secretariat, Southern Province"
						})] })]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "dprof-main-content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "dprof-section-card",
					initial: {
						opacity: 0,
						y: 22
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: {
						duration: .48,
						ease: [
							.16,
							1,
							.3,
							1
						]
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "dprof-section-card__heading",
						children: "Key Responsibilities"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "dprof-section-card__body",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "dprof-resp-list",
							role: "list",
							children: official.responsibilities.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: typeof r !== "string" ? "dprof-resp-list__has-sub" : "",
								children: typeof r === "string" ? r : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.text }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "dprof-resp-sublist",
									children: r.subItems.map((s, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: s }, j))
								})] })
							}, i))
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "dprof-contact-cta",
					initial: {
						opacity: 0,
						y: 18
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: {
						duration: .45,
						delay: .1,
						ease: [
							.16,
							1,
							.3,
							1
						]
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dprof-contact-cta__text",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "dprof-contact-cta__title",
							children: "Get in touch with the Secretariat"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "For official correspondence, use the contact details provided or visit our Contact page." })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
						to: "/contact",
						className: "dprof-contact-cta__btn",
						children: ["Contact Office ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronRight, {
							size: 14,
							"aria-hidden": "true"
						})]
					})]
				})]
			})]
		})]
	});
}
function DeputyDirectorProfilePageWrapper() {
	const { id } = useParams$1();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubHold, {
		holdKey: `about__deputy-directors__${id}`,
		pageKey: "about__deputy-directors",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeputyDirectorProfilePage, {})
	});
}
function DeputyDirectorProfilePage() {
	const { id } = useParams$1();
	const { deputyDirectors } = (0, import_react.useContext)(AboutStaffContext);
	const dd = (0, import_react.useMemo)(() => deputyDirectors.find((d) => d.id === id), [id, deputyDirectors]);
	if (!dd) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate$1, {
		to: "/about/deputy-directors",
		replace: true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "dprof-wrap",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PremiumProfileHero, {
			name: dd.name,
			position: dd.position,
			badge: "Deputy Director – Planning",
			imgSrc: dd.photo,
			backPath: "/about/deputy-directors",
			backLabel: "Deputy Directors",
			contactPath: "/contact"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "dprof-body",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "dprof-sidebar",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "dprof-info-card",
					initial: {
						opacity: 0,
						y: 20
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: {
						duration: .45,
						ease: [
							.16,
							1,
							.3,
							1
						]
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dprof-info-card__heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPhone, {
								size: 15,
								style: { color: "#C79A2B" },
								"aria-hidden": "true"
							}), "Contact"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dprof-info-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dprof-info-row__icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPhone, { "aria-hidden": "true" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dprof-info-row__label",
								children: "Telephone"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dprof-info-row__value",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `tel:${dd.contact.phone}`,
									children: dd.contact.phone
								})
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dprof-info-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dprof-info-row__icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMail, { "aria-hidden": "true" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dprof-info-row__label",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dprof-info-row__value",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `mailto:${dd.contact.email}`,
									children: dd.contact.email
								})
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dprof-info-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dprof-info-row__icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMapPin, { "aria-hidden": "true" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dprof-info-row__label",
								children: "Office"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dprof-info-row__value",
								children: dd.contact.office
							})] })]
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "dprof-main-content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "dprof-section-card",
					initial: {
						opacity: 0,
						y: 22
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: {
						duration: .48,
						ease: [
							.16,
							1,
							.3,
							1
						]
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "dprof-section-card__heading",
						children: "Key Responsibilities"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "dprof-section-card__body",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "dprof-resp-list",
							role: "list",
							children: dd.responsibilities.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: typeof r !== "string" ? "dprof-resp-list__has-sub" : "",
								children: typeof r === "string" ? r : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.text }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "dprof-resp-sublist",
									children: r.subItems.map((s, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: s }, j))
								})] })
							}, i))
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "dprof-contact-cta",
					initial: {
						opacity: 0,
						y: 18
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: {
						duration: .45,
						delay: .1,
						ease: [
							.16,
							1,
							.3,
							1
						]
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dprof-contact-cta__text",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "dprof-contact-cta__title",
							children: "Get in touch with the Secretariat"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "For official correspondence, use the contact details provided or visit our Contact page." })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
						to: "/contact",
						className: "dprof-contact-cta__btn",
						children: ["Contact Office ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronRight, {
							size: 14,
							"aria-hidden": "true"
						})]
					})]
				})]
			})]
		})]
	});
}
function DeputyDirectorsListPage() {
	const { deputyDirectors } = (0, import_react.useContext)(AboutStaffContext);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutLayout, {
		heroTitle: "Deputy Directors – Planning",
		heroSub: "Meet the planning team's deputy directors of the Southern Province Planning Secretariat.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			className: "ab-content",
			initial: "hidden",
			animate: "visible",
			variants: stagger(.09),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					variants: fadeUp,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
						to: "/about",
						className: "ab-back-link",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronLeft, { "aria-hidden": "true" }), " About Overview"]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "ab-dd-list",
					variants: stagger(.07),
					role: "list",
					"aria-label": "Deputy Directors",
					children: deputyDirectors.map((dd) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						variants: fadeUp,
						role: "listitem",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
							to: dd.path,
							className: "ab-dd-card",
							"aria-label": `View profile: ${dd.position}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ab-dd-card__avatar",
									"aria-hidden": "true",
									role: "img",
									children: [dd.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: dd.photo,
										alt: dd.name,
										style: {
											width: "100%",
											height: "100%",
											objectFit: "cover",
											borderRadius: "inherit"
										},
										onError: (e) => {
											e.currentTarget.style.display = "none";
											e.currentTarget.nextSibling.style.display = "block";
										}
									}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiUser, { style: dd.photo ? { display: "none" } : {} })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ab-dd-card__name",
									children: dd.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ab-dd-card__cta",
									children: ["View Profile ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronRight, { "aria-hidden": "true" })]
								})
							]
						})
					}, dd.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "ab-glass-accent",
					variants: fadeUp,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ab-glass-accent__icon",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiUsers, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ab-glass-accent__content",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "ab-glass-accent__title",
							children: "Planning Team"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "ab-glass-accent__sub",
							children: "Six Deputy Directors lead the planning divisions across the Southern Province."
						})]
					})]
				})
			]
		})
	});
}
var VALUE_ICONS = [
	FiHeart,
	FiUnlock,
	FiUsers,
	FiEye,
	FiStar,
	FiShield,
	FiFlag,
	FiLink
];
function OverviewValues({ lang, data }) {
	const t = data[lang] ?? data.en;
	const fontFamily = lang === "si" ? "'Noto Sans Sinhala', sans-serif" : lang === "ta" ? "'Noto Sans Tamil', sans-serif" : "inherit";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.section, {
		className: "ab-ov-values",
		variants: fadeUp,
		"aria-labelledby": "ov-values-heading",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "ab-ov-section-header",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ab-ov-section-label",
				id: "ov-values-heading",
				"aria-label": t.sectionLabel,
				children: t.sectionLabel
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			className: "ab-ov-values__grid",
			variants: stagger(.06),
			role: "list",
			"aria-label": t.sectionLabel,
			children: t.items.map((value, i) => {
				const Icon = VALUE_ICONS[i % VALUE_ICONS.length];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "ab-ov-value-card",
					variants: fadeUp,
					role: "listitem",
					whileHover: {
						y: -4,
						transition: {
							duration: .22,
							ease: [
								.16,
								1,
								.3,
								1
							]
						}
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "ab-ov-value-card__icon-wrap",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "ab-ov-value-card__icon" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ab-ov-value-card__label",
							style: { fontFamily: lang !== "en" ? fontFamily : void 0 },
							children: value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "ab-ov-value-card__glow",
							"aria-hidden": "true"
						})
					]
				}, i);
			})
		})]
	});
}
var OBJ_ICONS = [
	FiCompass,
	FiClipboard,
	FiLink,
	FiZap
];
function OverviewObjectives({ lang, data }) {
	const t = data[lang] ?? data.en;
	const fontFamily = lang === "si" ? "'Noto Sans Sinhala', sans-serif" : lang === "ta" ? "'Noto Sans Tamil', sans-serif" : "inherit";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.section, {
		className: "ab-ov-objectives",
		variants: fadeUp,
		"aria-labelledby": "ov-objectives-heading",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "ab-ov-section-header",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ab-ov-section-label",
				id: "ov-objectives-heading",
				"aria-label": t.sectionLabel,
				children: t.sectionLabel
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.ol, {
			className: "ab-ov-obj-list",
			variants: stagger(.08),
			"aria-label": t.sectionLabel,
			children: t.items.map((obj, i) => {
				const Icon = OBJ_ICONS[i % OBJ_ICONS.length];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.li, {
					className: "ab-ov-obj-card",
					variants: fadeUp,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ab-ov-obj-card__left",
						"aria-hidden": "true",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ab-ov-obj-card__num",
								children: String(i + 1).padStart(2, "0")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ab-ov-obj-card__icon-wrap",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {})
							}),
							i < t.items.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ab-ov-obj-card__connector" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ab-ov-obj-card__body",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "ab-ov-obj-card__text",
							style: { fontFamily },
							children: obj
						})
					})]
				}, i);
			})
		})]
	});
}
function AwardCard({ award, lang }) {
	const [imgError, setImgError] = (0, import_react.useState)(false);
	const title = award.title[lang] ?? award.title.en;
	const desc = award.desc[lang] ?? award.desc.en;
	const fontFamily = lang === "si" ? "'Noto Sans Sinhala', sans-serif" : lang === "ta" ? "'Noto Sans Tamil', sans-serif" : "inherit";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
		className: "ab-award-card",
		variants: fadeUp,
		whileHover: {
			y: -6,
			transition: {
				duration: .24,
				ease: [
					.16,
					1,
					.3,
					1
				]
			}
		},
		"aria-labelledby": `award-title-${award.id}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ab-award-card__img-wrap",
				"aria-label": title,
				role: "img",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: award.img,
						alt: title,
						className: "ab-award-card__img",
						onError: (e) => {
							e.currentTarget.style.display = "none";
							setImgError(true);
						},
						onLoad: (e) => {
							e.currentTarget.style.display = "block";
							setImgError(false);
						},
						loading: "lazy",
						style: { display: "block" }
					}, award.img),
					imgError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ab-award-card__img-fallback",
						"aria-hidden": "true",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAward, { className: "ab-award-card__img-fallback-icon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ab-award-card__img-fallback-text",
							children: "Award Image"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ab-award-card__year-badge",
						"aria-label": `Year: ${award.year}`,
						children: award.year
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ab-award-card__body",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ab-award-card__badge-row",
						"aria-hidden": "true",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "ab-award-card__badge-icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAward, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ab-award-card__badge-line" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "ab-award-card__title",
						id: `award-title-${award.id}`,
						style: { fontFamily: lang !== "en" ? fontFamily : void 0 },
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ab-award-card__desc",
						style: { fontFamily },
						children: desc
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ab-award-card__glow",
				"aria-hidden": "true"
			})
		]
	});
}
function OverviewAwards({ lang, data }) {
	const sectionLabel = data.sectionLabel[lang] ?? data.sectionLabel.en;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.section, {
		className: "ab-ov-awards",
		variants: fadeUp,
		"aria-labelledby": "ov-awards-heading",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "ab-ov-section-header",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ab-ov-section-label",
				id: "ov-awards-heading",
				"aria-label": sectionLabel,
				children: sectionLabel
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			className: "ab-ov-awards__grid",
			variants: stagger(.09),
			role: "list",
			"aria-label": sectionLabel,
			children: data.items.map((award) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "listitem",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AwardCard, {
					award,
					lang
				})
			}, award.id))
		})]
	});
}
function OverviewIntro({ t, lang, image, establishedBadge }) {
	const [imgError, setImgError] = (0, import_react.useState)(false);
	const fontFamily = lang === "si" ? "'Noto Sans Sinhala', sans-serif" : lang === "ta" ? "'Noto Sans Tamil', sans-serif" : "inherit";
	const imgSrc = resolveUploadUrl(image);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.section, {
		className: "ab-ov-intro",
		variants: fadeUp,
		"aria-labelledby": "ov-intro-heading",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ab-ov-section-label",
				"aria-hidden": "true",
				children: t.introLabel
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ab-ov-intro__img-col",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ab-ov-intro__img-frame",
					"aria-label": t.imageAlt,
					role: "img",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: imgSrc,
							alt: t.imageAlt,
							className: "ab-ov-intro__img",
							onError: (e) => {
								e.currentTarget.style.display = "none";
								setImgError(true);
							},
							onLoad: (e) => {
								e.currentTarget.style.display = "block";
								setImgError(false);
							},
							loading: "lazy",
							style: { display: "block" }
						}),
						imgError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ab-ov-intro__img-fallback",
							"aria-hidden": "true",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HiOutlineOfficeBuilding, { className: "ab-ov-intro__img-fallback-icon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ab-ov-intro__img-fallback-text",
								children: [
									"Southern Province",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Planning Secretariat"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ab-ov-intro__img-badge",
							"aria-hidden": "true",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAward, { className: "ab-ov-intro__img-badge-icon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: establishedBadge })]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ab-ov-intro__text-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "ab-ov-intro__title",
						id: "ov-intro-heading",
						style: { fontFamily: lang !== "en" ? fontFamily : void 0 },
						children: t.introTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ab-ov-intro__divider",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ab-ov-intro__paras",
						children: t.introParagraphs.map((para, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "ab-ov-intro__para",
							style: { fontFamily },
							children: para
						}, i))
					})
				]
			})
		]
	});
}
function VisionMissionCards({ t, lang }) {
	const fontFamily = lang === "si" ? "'Noto Sans Sinhala', sans-serif" : lang === "ta" ? "'Noto Sans Tamil', sans-serif" : "inherit";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "ab-vm-row",
		variants: stagger(.1),
		role: "list",
		"aria-label": "Vision and Mission",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
			className: "ab-vm-card ab-vm-card--vision",
			variants: fadeUp,
			role: "listitem",
			"aria-labelledby": "vm-vision-title",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ab-vm-card__header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ab-vm-card__icon-wrap",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTarget, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ab-vm-card__label-group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ab-vm-card__eyebrow",
							"aria-hidden": "true",
							children: lang === "si" ? "දැක්ම" : lang === "ta" ? "பார்வை" : "Vision"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							id: "vm-vision-title",
							className: "ab-vm-card__title",
							children: t.visionLabel
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ab-vm-card__sep",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ab-vm-card__text",
					style: { fontFamily },
					children: t.visionText
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ab-vm-card__glow",
					"aria-hidden": "true"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
			className: "ab-vm-card ab-vm-card--mission",
			variants: fadeUp,
			role: "listitem",
			"aria-labelledby": "vm-mission-title",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ab-vm-card__header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ab-vm-card__icon-wrap",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiStar, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ab-vm-card__label-group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ab-vm-card__eyebrow",
							"aria-hidden": "true",
							children: lang === "si" ? "මෙහෙවර" : lang === "ta" ? "நோக்கம்" : "Mission"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							id: "vm-mission-title",
							className: "ab-vm-card__title",
							children: t.missionLabel
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ab-vm-card__sep",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ab-vm-card__text",
					style: { fontFamily },
					children: t.missionText
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ab-vm-card__glow ab-vm-card__glow--mission",
					"aria-hidden": "true"
				})
			]
		})]
	});
}
function OrganizationStructurePage({ topic }) {
	const lang = useLang();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutLayout, {
		heroTitle: topic.heroTitle,
		heroSub: topic.heroSub,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			className: "ab-content",
			initial: "hidden",
			animate: "visible",
			variants: stagger(.08),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrganizationStructureChart, { lang })
		})
	});
}
function AboutOverviewDashboard() {
	const lang = useLang();
	const [data, setData] = (0, import_react.useState)(null);
	const { keyOfficials, deputyDirectors } = (0, import_react.useContext)(AboutStaffContext);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		aboutOverviewApi.get().then(({ data }) => {
			if (!cancelled) setData(data);
		}).catch((err) => console.error("AboutOverviewDashboard: failed to load overview", err));
		return () => {
			cancelled = true;
		};
	}, []);
	if (!data) return null;
	const t = data.intro[lang] ?? data.intro.en;
	const establishedBadge = data.establishedBadge[lang] ?? data.establishedBadge.en;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutLayout, {
		heroTitle: "About the Secretariat",
		heroSub: "Learn about the Southern Province Planning Secretariat — its structure, history, functions, and key officials.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			className: "ab-ov-shell",
			initial: "hidden",
			animate: "visible",
			variants: stagger(.09),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewIntro, {
					t,
					lang,
					image: data.image,
					establishedBadge
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisionMissionCards, {
					t,
					lang
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewValues, {
					lang,
					data: data.values
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewAwards, {
					lang,
					data: data.awards
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewObjectives, {
					lang,
					data: data.objectives
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.section, {
					className: "ab-ov-officials",
					variants: stagger(.08),
					"aria-labelledby": "ov-officials-heading",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							id: "ov-officials-heading",
							className: "ab-ov-section-label",
							variants: fadeUp,
							children: "Key Officials"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "ab-ov-officials__row",
							variants: stagger(.07),
							children: keyOfficials.map((official) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								variants: fadeUp,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
									to: official.path,
									className: "ab-ov-official-card",
									"aria-label": `View profile: ${official.position}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "ab-ov-official-card__avatar",
											role: "img",
											"aria-label": `${official.name} avatar`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiUser, { "aria-hidden": "true" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "ab-ov-official-card__body",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "ab-ov-official-card__pos",
												children: official.position
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "ab-ov-official-card__name",
												children: official.name
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronRight, {
											className: "ab-ov-official-card__arrow",
											"aria-hidden": "true"
										})
									]
								})
							}, official.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							className: "ab-ov-dd-block",
							variants: fadeUp,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "ab-ov-section-label ab-ov-section-label--sub",
								children: "Planning Team — Deputy Directors"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ab-ov-dd-grid",
								role: "list",
								"aria-label": "Deputy Directors",
								children: deputyDirectors.map((dd) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									role: "listitem",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
										to: dd.path,
										className: "ab-ov-dd-pill",
										"aria-label": dd.label,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "ab-ov-dd-pill__avatar",
												"aria-hidden": "true",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiUser, {})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "ab-ov-dd-pill__text",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "ab-ov-dd-pill__num",
													children: dd.label
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronRight, {
												className: "ab-ov-dd-pill__arrow",
												"aria-hidden": "true"
											})
										]
									})
								}, dd.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							className: "ab-glass-accent",
							variants: fadeUp,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ab-glass-accent__icon",
								"aria-hidden": "true",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiShield, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ab-glass-accent__content",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "ab-glass-accent__title",
									children: t.officialGovt
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "ab-glass-accent__sub",
									children: t.officialGovtSub
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "ab-glass-accent ab-ov-glass-desktop",
					variants: fadeUp,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ab-glass-accent__icon",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiShield, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ab-glass-accent__content",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "ab-glass-accent__title",
							children: t.officialGovt
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "ab-glass-accent__sub",
							children: t.officialGovtSub
						})]
					})]
				})
			]
		})
	});
}
function SubHold({ holdKey, pageKey, children }) {
	if (usePageHold(holdKey)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComingSoon, { pageKey });
	return children;
}
function About() {
	const held = usePageHold("about");
	const [keyOfficials, setKeyOfficials] = (0, import_react.useState)([]);
	const [deputyDirectors, setDeputyDirectors] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		staffApi.list().then(({ data }) => {
			if (cancelled || !Array.isArray(data)) return;
			const officials = data.filter((s) => s.tier === "deputy-secretary" || s.tier === "director").sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map(staffToOfficial);
			const deputies = data.filter((s) => s.tier === "deputy-director").sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || String(a.positionNumber).localeCompare(String(b.positionNumber))).map(staffToDeputyDirector);
			setKeyOfficials(officials);
			setDeputyDirectors(deputies);
		}).catch((err) => console.error("About: failed to load staff", err));
		return () => {
			cancelled = true;
		};
	}, []);
	if (held) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComingSoon, { pageKey: "about" });
	const staffContextValue = {
		keyOfficials,
		deputyDirectors
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AboutStaffContext.Provider, {
		value: staffContextValue,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeoHead, { page: "about" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Routes, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
				index: true,
				element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubHold, {
					holdKey: "about__overview",
					pageKey: "about",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutOverviewDashboard, {})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
				path: "overview",
				element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubHold, {
					holdKey: "about__overview",
					pageKey: "about",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutOverviewDashboard, {})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
				path: "secretariat-overview",
				element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubHold, {
					holdKey: "about__overview",
					pageKey: "about",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutOverviewDashboard, {})
				})
			}),
			ABOUT_TOPICS.map((topic) => {
				const topicEl = topic.id === "functions-duties" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FunctionsDutiesPage, { topic }) : topic.id === "organization-structure" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrganizationStructurePage, { topic }) : topic.id === "history" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutLayout, {
					heroTitle: topic.heroTitle,
					heroSub: topic.heroSub,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryPage, {})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutContentPage, { topic });
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
					path: topic.id,
					element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubHold, {
						holdKey: `about__${topic.id}`,
						pageKey: "about",
						children: topicEl
					})
				}, topic.id);
			}),
			keyOfficials.map((official) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
				path: official.id,
				element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubHold, {
					holdKey: `about__${official.id}`,
					pageKey: "about",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficialProfilePage, { official })
				})
			}, official.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
				path: "deputy-directors",
				element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubHold, {
					holdKey: "about__deputy-directors",
					pageKey: "about",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeputyDirectorsListPage, {})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
				path: "deputy-directors/:id",
				element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubHold, {
					holdKey: "about__deputy-directors",
					pageKey: "about",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeputyDirectorProfilePageWrapper, {})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
				path: "*",
				element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate$1, {
					to: "/about",
					replace: true
				})
			})
		] })]
	});
}
//#endregion
export { About };
