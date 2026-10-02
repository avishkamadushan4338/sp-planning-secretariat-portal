import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react+tanstack__react-query.mjs";
import { AnimatePresence, motion } from "../_libs/framer-motion.mjs";
import { FiAlertCircle, FiCalendar, FiChevronDown, FiDownload, FiExternalLink, FiFile, FiFilter, FiGrid, FiInbox, FiList, FiSearch, FiTag, FiX, HiOutlineDocument, HiOutlineDocumentDuplicate, HiOutlineDocumentReport, HiOutlineDocumentText } from "../_libs/react-icons.mjs";
import { ComingSoon, usePageHold } from "./ComingSoon-BKqHq8HT.mjs";
import { SeoHead } from "./seo-9D_r0kof.mjs";
import { useInView } from "../_libs/react-intersection-observer.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/downloads-DFwjzVWL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var GOLD = "#C79A2B";
var LANG_META = {
	en: {
		font: "Inter, sans-serif",
		headFont: "'Cinzel', 'Playfair Display', Georgia, serif",
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
		pageTitle: "Downloads",
		pageSub: "Official documents, circulars, forms, reports and public resources",
		searchPh: "Search documents, circulars, forms…",
		filterLabel: "Category",
		sortLabel: "Sort by",
		typeLabel: "File Type",
		resultsOf: "of",
		resultsFound: "documents found",
		noResults: "No documents match your search.",
		noResultsSub: "Try adjusting your filters or search terms.",
		emptyState: "No downloads available yet.",
		emptyStateSub: "Check back soon — documents will appear here once published.",
		badgeNew: "New",
		btnDownload: "Download",
		btnPreview: "Preview",
		lblCategory: "Category",
		lblFileType: "File Type",
		lblDate: "Published",
		allCats: "All",
		allTypes: "All Types",
		sortNewest: "Newest First",
		sortOldest: "Oldest First",
		sortAZ: "A – Z",
		cats: [
			"All",
			"Circulars",
			"Forms",
			"Reports",
			"Notices",
			"Guidelines",
			"Applications",
			"Other"
		],
		types: [
			"All Types",
			"PDF",
			"DOC/DOCX",
			"XLS/XLSX",
			"Images",
			"Other"
		],
		gridView: "Grid view",
		listView: "List view",
		clearFilters: "Clear filters"
	},
	si: {
		heroAccent: "දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය",
		pageTitle: "බාගැනීම්",
		pageSub: "නිල ලේඛන, චක්‍රලේඛ, ෆෝරම, වාර්තා සහ පොදු සම්පත්",
		searchPh: "ලේඛන, චක්‍රලේඛ, ෆෝරම සොයන්න…",
		filterLabel: "ප්‍රවර්ගය",
		sortLabel: "අනුව වර්ග කරන්න",
		typeLabel: "ගොනු වර්ගය",
		resultsOf: "න්",
		resultsFound: "ලේඛන හමු විය",
		noResults: "ඔබගේ සෙවීමට ගැළපෙන ලේඛන නොමැත.",
		noResultsSub: "ෆිල්ටර හෝ සෙවුම් පද සකස් කිරීමට උත්සාහ කරන්න.",
		emptyState: "තවම බාගැනීම් නොමැත.",
		emptyStateSub: "ලේඛන ප්‍රකාශිත වූ පසු මෙහි දිස් වනු ඇත.",
		badgeNew: "නව",
		btnDownload: "බාගන්න",
		btnPreview: "පෙරදසුන",
		lblCategory: "ප්‍රවර්ගය",
		lblFileType: "ගොනු වර්ගය",
		lblDate: "ප්‍රකාශිතයි",
		allCats: "සියල්ල",
		allTypes: "සියලු වර්ග",
		sortNewest: "අලුත්ම පළමු",
		sortOldest: "පැරණිම පළමු",
		sortAZ: "A – Z",
		cats: [
			"සියල්ල",
			"චක්‍රලේඛ",
			"ෆෝරම",
			"වාර්තා",
			"නිවේදන",
			"මාර්ගෝපදේශ",
			"අයදුම්පත්",
			"වෙනත්"
		],
		types: [
			"සියලු වර්ග",
			"PDF",
			"DOC/DOCX",
			"XLS/XLSX",
			"රූප",
			"වෙනත්"
		],
		gridView: "ජාල දර්ශනය",
		listView: "ලැයිස්තු දර්ශනය",
		clearFilters: "පෙරහන් හිස් කරන්න"
	},
	ta: {
		heroAccent: "தென் மாகாண திட்டமிடல் செயலகம்",
		pageTitle: "பதிவிறக்கங்கள்",
		pageSub: "அதிகாரப்பூர்வ ஆவணங்கள், சுற்றறிக்கைகள், படிவங்கள், அறிக்கைகள் மற்றும் பொது வளங்கள்",
		searchPh: "ஆவணங்கள், சுற்றறிக்கைகள், படிவங்கள் தேடுக…",
		filterLabel: "வகை",
		sortLabel: "வரிசைப்படுத்து",
		typeLabel: "கோப்பு வகை",
		resultsOf: "இல்",
		resultsFound: "ஆவணங்கள் கண்டறியப்பட்டன",
		noResults: "உங்கள் தேடலுக்கு பொருந்தும் ஆவணங்கள் இல்லை.",
		noResultsSub: "வடிகட்டிகளை அல்லது தேடல் சொற்களை சரிசெய்யவும்.",
		emptyState: "இன்னும் பதிவிறக்கங்கள் இல்லை.",
		emptyStateSub: "ஆவணங்கள் வெளியிடப்பட்டதும் இங்கே தோன்றும்.",
		badgeNew: "புதியது",
		btnDownload: "பதிவிறக்கு",
		btnPreview: "முன்னோட்டம்",
		lblCategory: "வகை",
		lblFileType: "கோப்பு வகை",
		lblDate: "வெளியிடப்பட்டது",
		allCats: "அனைத்தும்",
		allTypes: "அனைத்து வகைகள்",
		sortNewest: "புதியது முதலில்",
		sortOldest: "பழையது முதலில்",
		sortAZ: "A – Z",
		cats: [
			"அனைத்தும்",
			"சுற்றறிக்கைகள்",
			"படிவங்கள்",
			"அறிக்கைகள்",
			"அறிவிப்புகள்",
			"வழிகாட்டுதல்கள்",
			"விண்ணப்பங்கள்",
			"மற்றவை"
		],
		types: [
			"அனைத்து வகைகள்",
			"PDF",
			"DOC/DOCX",
			"XLS/XLSX",
			"படங்கள்",
			"மற்றவை"
		],
		gridView: "கட்டம் காட்சி",
		listView: "பட்டியல் காட்சி",
		clearFilters: "வடிகட்டிகளை அழி"
	}
};
var CAT_EN = [
	"All",
	"Circulars",
	"Forms",
	"Reports",
	"Notices",
	"Guidelines",
	"Applications",
	"Other"
];
var TYPE_EN = [
	"All Types",
	"PDF",
	"DOC/DOCX",
	"XLS/XLSX",
	"Images",
	"Other"
];
function getFileTypeGroup(fileType = "") {
	const ft = fileType.toUpperCase();
	if (ft === "PDF") return "PDF";
	if (ft === "DOC" || ft === "DOCX") return "DOC/DOCX";
	if (ft === "XLS" || ft === "XLSX") return "XLS/XLSX";
	if ([
		"PNG",
		"JPG",
		"JPEG",
		"GIF",
		"WEBP",
		"SVG"
	].includes(ft)) return "Images";
	return "Other";
}
function FileIcon({ fileType, size = 22 }) {
	const ft = (fileType || "").toUpperCase();
	const color = ft === "PDF" ? "#e74c3c" : ft === "DOC" || ft === "DOCX" ? "#2980b9" : ft === "XLS" || ft === "XLSX" ? "#27ae60" : GOLD;
	if (ft === "PDF") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HiOutlineDocumentReport, { style: {
		color,
		fontSize: size
	} });
	if (ft === "DOC" || ft === "DOCX") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HiOutlineDocumentText, { style: {
		color,
		fontSize: size
	} });
	if (ft === "XLS" || ft === "XLSX") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HiOutlineDocumentDuplicate, { style: {
		color,
		fontSize: size
	} });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HiOutlineDocument, { style: {
		color: GOLD,
		fontSize: size
	} });
}
function isNew(dateStr) {
	if (!dateStr) return false;
	return Date.now() - new Date(dateStr).getTime() < 12096e5;
}
function fmtDate(dateStr) {
	if (!dateStr) return "—";
	try {
		return new Date(dateStr).toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "short",
			year: "numeric"
		});
	} catch {
		return dateStr;
	}
}
var _bc = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("cms_downloads") : null;
function loadDownloads() {
	try {
		const raw = typeof window !== "undefined" ? localStorage.getItem("cms_downloads") : null;
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
function DlHoneycomb() {
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
function DownloadsHero({ lang }) {
	const t = T[lang] || T.en;
	const lm = LANG_META[lang] || LANG_META.en;
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
	const pills = [
		t.cats[1],
		t.cats[2],
		t.cats[3],
		t.cats[4]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "dl-hero",
		style: { fontFamily: lm.font },
		"aria-label": "Downloads hero",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dl-hero__bg",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dl-hero__noise",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dl-hero__grid-lines",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dl-hero__glow dl-hero__glow--gold",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dl-hero__glow dl-hero__glow--maroon",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dl-hero__glow dl-hero__glow--right",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dl-hero__hc",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DlHoneycomb, {})
			}),
			[...Array(6)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `dl-hero__dot dl-hero__dot--${i + 1}`,
				"aria-hidden": "true"
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dl-hero__watermark",
				"aria-hidden": "true",
				children: "DOWNLOADS"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dl-hero__inner",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "dl-hero__left",
					initial: "hidden",
					animate: "visible",
					variants: stagger,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							className: "dl-hero__badge",
							variants: itemV,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "dl-hero__badge-dot",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontFamily: lm.isNonLatin ? lm.font : "'Cinzel', serif",
									letterSpacing: lm.isNonLatin ? 0 : "0.13em",
									textTransform: lm.isNonLatin ? "none" : "uppercase"
								},
								children: t.pageTitle
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
							className: "dl-hero__title",
							style: {
								fontFamily: lm.headFont,
								lineHeight: lm.isNonLatin ? 1.35 : 1.08
							},
							variants: itemV,
							children: t.pageTitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "dl-hero__rule",
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
							className: "dl-hero__body",
							style: { fontFamily: lm.font },
							variants: itemV,
							children: t.pageSub
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "dl-hero__quick",
							variants: itemV,
							"aria-hidden": "true",
							children: pills.map((label) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "dl-hero__quick-pill",
								style: { fontFamily: lm.font },
								children: label
							}, label))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "dl-hero__right",
					initial: "hidden",
					animate: "visible",
					variants: slideR,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/branding/f-logo.svg",
						alt: "Southern Province Planning Secretariat",
						className: "dl-hero__logo",
						onError: (e) => {
							e.currentTarget.style.display = "none";
						}
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: "dl-hero__wave",
				viewBox: "0 0 1440 80",
				preserveAspectRatio: "none",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M0,80 C240,20 480,60 720,40 C960,20 1200,60 1440,30 L1440,80 Z",
					fill: "var(--dl-bg)"
				})
			})
		]
	});
}
function Toolbar({ t, lm, search, setSearch, catIdx, setCatIdx, typeIdx, setTypeIdx, sortIdx, setSortIdx, view, setView, total, filtered, hasActiveFilter, clearAll }) {
	const [mobileFiltersOpen, setMobileFiltersOpen] = (0, import_react.useState)(false);
	const sortOptions = [
		t.sortNewest,
		t.sortOldest,
		t.sortAZ
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "dl-toolbar",
		role: "search",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "dl-toolbar__row1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dl-toolbar__search-wrap",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiSearch, {
						className: "dl-toolbar__search-icon",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "search",
						className: "dl-toolbar__search",
						placeholder: t.searchPh,
						value: search,
						onChange: (e) => setSearch(e.target.value),
						"aria-label": t.searchPh,
						style: { fontFamily: lm.font }
					}),
					search && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "dl-toolbar__search-clear",
						onClick: () => setSearch(""),
						"aria-label": "Clear search",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, {})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dl-toolbar__right",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "dl-toolbar__count",
						"aria-live": "polite",
						style: { fontFamily: lm.font },
						children: [
							filtered,
							" ",
							t.resultsOf,
							" ",
							total,
							" ",
							t.resultsFound
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dl-toolbar__view-toggle",
						role: "group",
						"aria-label": "View mode",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: `dl-toolbar__view-btn ${view === "grid" ? "dl-toolbar__view-btn--active" : ""}`,
							onClick: () => setView("grid"),
							"aria-label": t.gridView,
							"aria-pressed": view === "grid",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiGrid, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: `dl-toolbar__view-btn ${view === "list" ? "dl-toolbar__view-btn--active" : ""}`,
							onClick: () => setView("list"),
							"aria-label": t.listView,
							"aria-pressed": view === "list",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiList, {})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: `dl-toolbar__mobile-filter-btn ${mobileFiltersOpen ? "dl-toolbar__mobile-filter-btn--active" : ""}`,
						onClick: () => setMobileFiltersOpen((v) => !v),
						"aria-expanded": mobileFiltersOpen,
						"aria-controls": "dl-filters-panel",
						"aria-label": "Toggle filters",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiFilter, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Filters" }),
							hasActiveFilter && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "dl-toolbar__filter-dot",
								"aria-hidden": "true"
							})
						]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			id: "dl-filters-panel",
			className: `dl-toolbar__filters ${mobileFiltersOpen ? "dl-toolbar__filters--open" : ""}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dl-toolbar__cats",
				role: "group",
				"aria-label": "Category filter",
				children: t.cats.map((cat, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: `dl-toolbar__cat ${catIdx === i ? "dl-toolbar__cat--active" : ""}`,
					onClick: () => setCatIdx(i),
					"aria-pressed": catIdx === i,
					style: { fontFamily: lm.font },
					children: cat
				}, cat))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dl-toolbar__selects",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dl-toolbar__select-wrap",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiFile, {
								className: "dl-toolbar__select-icon",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "dl-toolbar__select",
								value: typeIdx,
								onChange: (e) => setTypeIdx(Number(e.target.value)),
								"aria-label": t.typeLabel,
								style: { fontFamily: lm.font },
								children: t.types.map((tp, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: i,
									children: tp
								}, tp))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronDown, {
								className: "dl-toolbar__select-chevron",
								"aria-hidden": "true"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dl-toolbar__select-wrap",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCalendar, {
								className: "dl-toolbar__select-icon",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "dl-toolbar__select",
								value: sortIdx,
								onChange: (e) => setSortIdx(Number(e.target.value)),
								"aria-label": t.sortLabel,
								style: { fontFamily: lm.font },
								children: sortOptions.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: i,
									children: s
								}, s))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronDown, {
								className: "dl-toolbar__select-chevron",
								"aria-hidden": "true"
							})
						]
					}),
					hasActiveFilter && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "dl-toolbar__clear-btn",
						onClick: clearAll,
						"aria-label": t.clearFilters,
						style: { fontFamily: lm.font },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiX, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.clearFilters })]
					})
				]
			})]
		})]
	});
}
function DownloadCard({ item, lang, t, lm, index }) {
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: .08
	});
	const fresh = isNew(item.date);
	const displayTitle = lang === "si" && item.titleSi ? item.titleSi : lang === "ta" && item.titleTa ? item.titleTa : item.titleEn || item.title || "Untitled Document";
	function handleDownload(e) {
		e.preventDefault();
		if (!item.fileUrl) return;
		const a = document.createElement("a");
		a.href = item.fileUrl;
		a.download = item.fileName || displayTitle;
		a.target = "_blank";
		a.rel = "noopener noreferrer";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}
	function handlePreview(e) {
		e.preventDefault();
		if (!item.fileUrl) return;
		window.open(item.fileUrl, "_blank", "noopener,noreferrer");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
		ref,
		className: "dl-card",
		initial: {
			opacity: 0,
			y: 24
		},
		animate: inView ? {
			opacity: 1,
			y: 0
		} : {},
		transition: {
			duration: .48,
			delay: Math.min(index * .06, .4),
			ease: [
				.16,
				1,
				.3,
				1
			]
		},
		"aria-label": `${displayTitle} — ${item.category || ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dl-card__badges",
				children: fresh && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "dl-card__badge dl-card__badge--new",
					"aria-label": t.badgeNew,
					children: t.badgeNew
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dl-card__icon-wrap",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "dl-card__icon-bg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileIcon, {
						fileType: item.fileType || item.type,
						size: 28
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "dl-card__filetype-tag",
					children: (item.fileType || item.type || "FILE").toUpperCase()
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dl-card__body",
				children: [
					item.category && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "dl-card__category",
						style: { fontFamily: lm.font },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTag, {
							style: { fontSize: 11 },
							"aria-hidden": "true"
						}), item.category]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "dl-card__title",
						style: { fontFamily: lm.font },
						children: displayTitle
					}),
					item.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "dl-card__desc",
						style: { fontFamily: lm.font },
						children: item.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "dl-card__meta-list",
						children: item.date && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dl-card__meta-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
								className: "dl-card__meta-label",
								style: { fontFamily: lm.font },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCalendar, { "aria-hidden": "true" }), t.lblDate]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "dl-card__meta-val",
								children: fmtDate(item.date)
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dl-card__actions",
				children: [item.fileUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "dl-card__btn dl-card__btn--preview",
					onClick: handlePreview,
					"aria-label": `${t.btnPreview}: ${displayTitle}`,
					disabled: !item.fileUrl,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiExternalLink, { "aria-hidden": "true" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.btnPreview })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "dl-card__btn dl-card__btn--download",
					onClick: handleDownload,
					"aria-label": `${t.btnDownload}: ${displayTitle}`,
					disabled: !item.fileUrl,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiDownload, { "aria-hidden": "true" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.btnDownload })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dl-card__hover-glow",
				"aria-hidden": "true"
			})
		]
	});
}
function DownloadRow({ item, lang, t, lm, index }) {
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: .05
	});
	const fresh = isNew(item.date);
	const displayTitle = lang === "si" && item.titleSi ? item.titleSi : lang === "ta" && item.titleTa ? item.titleTa : item.titleEn || item.title || "Untitled Document";
	function handleDownload(e) {
		e.preventDefault();
		if (!item.fileUrl) return;
		const a = document.createElement("a");
		a.href = item.fileUrl;
		a.download = item.fileName || displayTitle;
		a.target = "_blank";
		a.rel = "noopener noreferrer";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
		ref,
		className: "dl-row",
		initial: {
			opacity: 0,
			x: -16
		},
		animate: inView ? {
			opacity: 1,
			x: 0
		} : {},
		transition: {
			duration: .4,
			delay: Math.min(index * .04, .28),
			ease: [
				.16,
				1,
				.3,
				1
			]
		},
		"aria-label": displayTitle,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dl-row__icon",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileIcon, {
					fileType: item.fileType || item.type,
					size: 20
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dl-row__info",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dl-row__title-line",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "dl-row__title",
							style: { fontFamily: lm.font },
							children: displayTitle
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "dl-row__badges",
							children: fresh && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "dl-card__badge dl-card__badge--new",
								"aria-label": t.badgeNew,
								children: t.badgeNew
							})
						})]
					}),
					item.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "dl-row__desc",
						style: { fontFamily: lm.font },
						children: item.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dl-row__chips",
						children: [
							item.category && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "dl-row__chip dl-row__chip--cat",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTag, {
									style: { fontSize: 10 },
									"aria-hidden": "true"
								}), item.category]
							}),
							(item.fileType || item.type) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "dl-row__chip dl-row__chip--type",
								children: (item.fileType || item.type).toUpperCase()
							}),
							item.date && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "dl-row__chip",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCalendar, {
									style: { fontSize: 10 },
									"aria-hidden": "true"
								}), fmtDate(item.date)]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dl-row__actions",
				children: [item.fileUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "dl-card__btn dl-card__btn--preview dl-card__btn--sm",
					onClick: () => window.open(item.fileUrl, "_blank", "noopener,noreferrer"),
					"aria-label": `${t.btnPreview}: ${displayTitle}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiExternalLink, { "aria-hidden": "true" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "dl-row__btn-label",
						children: t.btnPreview
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "dl-card__btn dl-card__btn--download dl-card__btn--sm",
					onClick: handleDownload,
					"aria-label": `${t.btnDownload}: ${displayTitle}`,
					disabled: !item.fileUrl,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiDownload, { "aria-hidden": "true" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "dl-row__btn-label",
						children: t.btnDownload
					})]
				})]
			})
		]
	});
}
function EmptyState({ hasSearch, t, lm }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "dl-empty",
		initial: {
			opacity: 0,
			y: 20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: { duration: .5 },
		role: "status",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dl-empty__icon-wrap",
				"aria-hidden": "true",
				children: hasSearch ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAlertCircle, { className: "dl-empty__icon dl-empty__icon--search" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiInbox, { className: "dl-empty__icon" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "dl-empty__title",
				style: { fontFamily: lm.font },
				children: hasSearch ? t.noResults : t.emptyState
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "dl-empty__sub",
				style: { fontFamily: lm.font },
				children: hasSearch ? t.noResultsSub : t.emptyStateSub
			})
		]
	});
}
function Downloads() {
	const held = usePageHold("downloads");
	const [lang, setLang] = (0, import_react.useState)(() => (typeof window !== "undefined" ? localStorage.getItem("lang") : null) || "en");
	const [downloads, setDownloads] = (0, import_react.useState)([]);
	const [search, setSearch] = (0, import_react.useState)("");
	const [catIdx, setCatIdx] = (0, import_react.useState)(0);
	const [typeIdx, setTypeIdx] = (0, import_react.useState)(0);
	const [sortIdx, setSortIdx] = (0, import_react.useState)(0);
	const [view, setView] = (0, import_react.useState)("grid");
	const t = T[lang] || T.en;
	const lm = LANG_META[lang] || LANG_META.en;
	(0, import_react.useEffect)(() => {
		const onLang = (e) => setLang(e.detail || (typeof window !== "undefined" ? localStorage.getItem("lang") : null) || "en");
		window.addEventListener("langChange", onLang);
		return () => window.removeEventListener("langChange", onLang);
	}, []);
	const refresh = (0, import_react.useCallback)(() => {
		const items = loadDownloads().filter((d) => d.status === "Active" || d.status === "Published");
		setDownloads(items);
	}, []);
	(0, import_react.useEffect)(() => {
		refresh();
		const onStorage = (e) => {
			if (e.key === "cms_downloads") refresh();
		};
		const onCustom = () => refresh();
		window.addEventListener("storage", onStorage);
		window.addEventListener("cms_downloads_updated", onCustom);
		_bc?.addEventListener("message", onCustom);
		return () => {
			window.removeEventListener("storage", onStorage);
			window.removeEventListener("cms_downloads_updated", onCustom);
			_bc?.removeEventListener("message", onCustom);
		};
	}, [refresh]);
	const filtered = (0, import_react.useMemo)(() => {
		let list = [...downloads];
		if (catIdx > 0) {
			const catEn = CAT_EN[catIdx];
			list = list.filter((d) => d.category === catEn);
		}
		if (typeIdx > 0) {
			const typeEn = TYPE_EN[typeIdx];
			list = list.filter((d) => getFileTypeGroup(d.fileType || d.type) === typeEn);
		}
		if (search.trim()) {
			const q = search.toLowerCase();
			list = list.filter((d) => {
				const title = (d.titleEn || d.title || "").toLowerCase();
				const titleSi = (d.titleSi || "").toLowerCase();
				const titleTa = (d.titleTa || "").toLowerCase();
				const desc = (d.description || "").toLowerCase();
				const cat = (d.category || "").toLowerCase();
				const ft = (d.fileType || d.type || "").toLowerCase();
				return title.includes(q) || titleSi.includes(q) || titleTa.includes(q) || desc.includes(q) || cat.includes(q) || ft.includes(q);
			});
		}
		if (sortIdx === 0) list.sort((a, b) => new Date(b.date) - new Date(a.date));
		else if (sortIdx === 1) list.sort((a, b) => new Date(a.date) - new Date(b.date));
		else if (sortIdx === 2) list.sort((a, b) => {
			const ta = (a.titleEn || a.title || "").toLowerCase();
			const tb = (b.titleEn || b.title || "").toLowerCase();
			return ta < tb ? -1 : ta > tb ? 1 : 0;
		});
		return list;
	}, [
		downloads,
		catIdx,
		typeIdx,
		search,
		sortIdx
	]);
	const hasActiveFilter = catIdx > 0 || typeIdx > 0 || search.trim().length > 0;
	function clearAll() {
		setSearch("");
		setCatIdx(0);
		setTypeIdx(0);
		setSortIdx(0);
	}
	if (held) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComingSoon, { pageKey: "downloads" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeoHead, { page: "downloads" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "dl-page",
		style: { fontFamily: lm.font },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DownloadsHero, { lang }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "dl-main",
			"aria-label": "Downloads listing",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dl-container",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toolbar, {
					lang,
					t,
					lm,
					search,
					setSearch,
					catIdx,
					setCatIdx,
					typeIdx,
					setTypeIdx,
					sortIdx,
					setSortIdx,
					view,
					setView,
					total: downloads.length,
					filtered: filtered.length,
					hasActiveFilter,
					clearAll
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "dl-content",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "wait",
						children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							hasSearch: hasActiveFilter,
							t,
							lm
						}, "empty") : view === "grid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "dl-grid",
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							exit: { opacity: 0 },
							transition: { duration: .28 },
							role: "list",
							"aria-label": "Downloads grid",
							children: filtered.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DownloadCard, {
								item,
								lang,
								t,
								lm,
								index: i
							}, item.id || i))
						}, "grid") : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "dl-list",
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							exit: { opacity: 0 },
							transition: { duration: .28 },
							role: "list",
							"aria-label": "Downloads list",
							children: filtered.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DownloadRow, {
								item,
								lang,
								t,
								lm,
								index: i
							}, item.id || i))
						}, "list")
					})
				})]
			})
		})]
	})] });
}
var SplitComponent = Downloads;
//#endregion
export { SplitComponent as component };
