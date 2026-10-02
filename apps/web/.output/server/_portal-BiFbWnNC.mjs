import { __toESM } from "./_runtime.mjs";
import { require_jsx_runtime, require_react } from "./_libs/react+tanstack__react-query.mjs";
import { Link$1, Outlet$1, getCurrentLang, localizePath, useLocation$1, useNavigate$1 } from "./_ssr/react-router-dom-shim-Y_PNYd7n.mjs";
import { siteSettingsApi, staffApi } from "./_ssr/cmsContentApi-C5pJ-eT_.mjs";
import { resolveUploadUrl } from "./_ssr/resolveUploadUrl-Bmb9GHFy.mjs";
import { useFooter } from "./_ssr/FooterContext-BhxD5FhT.mjs";
import { AnimatePresence, motion, useScroll, useSpring } from "./_libs/framer-motion.mjs";
import { FaBars, FaChevronDown, FaFacebookF, FaLinkedinIn, FaTimes, FaYoutube, FiChevronRight, FiMail, FiMapPin, FiPhone } from "./_libs/react-icons.mjs";
import { Bell, BookOpen, BuildingComplex, Camera, CircleUserRound, ClipboardList, Clock, Mail, MapPin, Network, Newspaper, Phone, Users } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_portal-BiFbWnNC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SITE_LOGO_PATH = "/branding/logo.webp";
var ABOUT_US_MENU = [
	{
		title: {
			en: "Planning Secretariat Overview",
			si: "සැලසුම් ලේකම් කාර්යාලය දළ විශ්ලේෂණය",
			ta: "திட்டமிடல் செயலக கண்ணோட்டம்"
		},
		description: {
			en: "Vision, Mission, Mandate and Scope of the Planning Secretariat",
			si: "සැලසුම් ලේකම් කාර්යාලයේ දැක්ම, මෙහෙවර, බලය සහ විෂය පථය",
			ta: "திட்டமிடல் செயலகத்தின் தொலைநோக்கு, நோக்கம், ஆணை மற்றும் நோக்கெல்லை"
		},
		path: "/about/secretariat-overview",
		icon: BuildingComplex
	},
	{
		title: {
			en: "Organization Structure",
			si: "සංවිධාන ව්‍යුහය",
			ta: "நிறுவன அமைப்பு"
		},
		description: {
			en: "Organizational setup of the Planning Secretariat",
			si: "සැලසුම් ලේකම් කාර්යාලයේ සංවිධානාත්මක සැකැස්ම",
			ta: "திட்டமிடல் செயலகத்தின் நிறுவன அமைப்பு"
		},
		path: "/about/organization-structure",
		icon: Network
	},
	{
		title: {
			en: "Functions & Duties",
			si: "කාර්යයන් හා රාජකාරි",
			ta: "செயல்பாடுகள் & கடமைகள்"
		},
		description: {
			en: "Key functions and responsibilities of the Secretariat",
			si: "ලේකම් කාර්යාලයේ ප්‍රධාන කාර්යයන් සහ වගකීම්",
			ta: "செயலகத்தின் முக்கிய செயல்பாடுகள் மற்றும் பொறுப்புகள்"
		},
		path: "/about/functions-duties",
		icon: ClipboardList
	},
	{
		title: {
			en: "History",
			si: "ඉතිහාසය",
			ta: "வரலாறு"
		},
		description: {
			en: "Journey and milestones of the Planning Secretariat",
			si: "සැලසුම් ලේකම් කාර්යාලයේ ගමන් මග සහ ජයග්‍රහණ",
			ta: "திட்டமிடல் செயலகத்தின் பயணம் மற்றும் மைல்கற்கள்"
		},
		path: "/about/history",
		icon: BookOpen
	}
];
var FEATURED_OFFICIALS_FALLBACK = [{
	role: {
		en: "Deputy Chief Secretary – Planning",
		si: "නියෝජ්‍ය ප්‍රධාන ලේකම් – සැලසුම්",
		ta: "துணை தலைமை செயலர் – திட்டமிடல்"
	},
	name: "Mr. M.K.G.S.P.K. Jayasekara",
	path: "/about-deputy-secretary",
	photo: "/branding/sec-prof.webp"
}, {
	role: {
		en: "Director – Planning",
		si: "අධ්‍යක්ෂ – සැලසුම්",
		ta: "இயக்குநர் – திட்டமிடல்"
	},
	name: "Mrs. K.S. Weerawardhane",
	path: "/about/director-planning",
	photo: "/branding/dir.webp"
}];
var NEWS_MENU = [
	{
		title: {
			en: "News & Updates",
			si: "පුවත් සහ යාවත්කාලීන",
			ta: "செய்திகள் & புதுப்பிப்புகள்"
		},
		description: {
			en: "Latest announcements, press releases and secretariat updates",
			si: "නවතම නිවේදන, මාධ්‍ය නිවේදන සහ ලේකම් කාර්යාල යාවත්කාලීන",
			ta: "சமீபத்திய அறிவிப்புகள், செய்தி வெளியீடுகள் மற்றும் செயலக புதுப்பிப்புகள்"
		},
		path: "/news?tab=news",
		icon: Newspaper
	},
	{
		title: {
			en: "Photo Gallery",
			si: "ඡායාරූප ගැලරිය",
			ta: "புகைப்பட தொகுப்பு"
		},
		description: {
			en: "Events, official programs and captured moments",
			si: "සිදුවීම්, නිල වැඩසටහන් සහ ස්මරණීය මොහොත",
			ta: "நிகழ்வுகள், உத்தியோகபூர்வ நிகழ்ச்சிகள் மற்றும் கைப்பற்றப்பட்ட தருணங்கள்"
		},
		path: "/news?tab=gallery",
		icon: Camera
	},
	{
		title: {
			en: "Official Notices",
			si: "නිල නිවේදන",
			ta: "அதிகாரப்பூர்வ அறிவிப்புகள்"
		},
		description: {
			en: "Circulars, tenders, gazette and formal notifications",
			si: "චක්‍රලේඛ, ටෙන්ඩර්, ගැසට් සහ නිල දැනුම්දීම්",
			ta: "சுற்றறிக்கைகள், டெண்டர்கள், வர்த்தமானி மற்றும் முறையான அறிவிப்புகள்"
		},
		path: "/news?tab=notices",
		icon: Bell
	}
];
var CONTACT_DETAILS_FALLBACK = {
	address: "153B, S.H. Dahanayaka Mawatha, Galle, Sri Lanka",
	phone: "+94 912234503",
	email: "spdcsp@gmail.com",
	hours: {
		en: "Mon – Fri: 8:30 AM – 4:30 PM",
		si: "සඳු – සිකු: 8:30 – 16:30",
		ta: "திங்கள் – வெள்ளி: 8:30 மு.ப – 4:30 பி.ப"
	}
};
var DOWNLOADS_PORTALS = [{
	label: "PMS New",
	href: "https://planningsec.lk/login"
}, {
	label: "PMS Old",
	href: "https://progress.spfeedback.lk/index.php"
}];
var NAV_TRANSLATIONS = {
	en: [
		{
			id: "home",
			label: "HOME",
			path: "/home"
		},
		{
			id: "about",
			label: "ABOUT US",
			path: "/about",
			megaMenu: true,
			dropdown: ABOUT_US_MENU
		},
		{
			id: "divs",
			label: "DIVISIONS",
			path: "/departments"
		},
		{
			id: "media",
			label: "MEDIA CENTER",
			path: "/news",
			newsPanel: true,
			dropdown: NEWS_MENU
		},
		{
			id: "docs",
			label: "DOWNLOADS",
			path: "/downloads",
			portalsPanel: true,
			dropdown: DOWNLOADS_PORTALS
		},
		{
			id: "contact",
			label: "CONTACT US",
			path: "/contact",
			contactPanel: true,
			dropdown: [
				{
					label: "Find Our Office",
					path: "/contact#find-office"
				},
				{
					label: "Telephone Directory",
					path: "/contact#contact-info"
				},
				{
					label: "Complaint & Feedback",
					path: "/contact#feedback"
				}
			]
		}
	],
	si: [
		{
			id: "home",
			label: "මුල් පිටුව",
			path: "/home"
		},
		{
			id: "about",
			label: "අප ගැන",
			path: "/about",
			megaMenu: true,
			dropdown: ABOUT_US_MENU
		},
		{
			id: "divs",
			label: "අංශ",
			path: "/departments"
		},
		{
			id: "media",
			label: "මාධ්‍ය මධ්‍යස්ථානය",
			path: "/news",
			newsPanel: true,
			dropdown: NEWS_MENU
		},
		{
			id: "docs",
			label: "බාගත කිරීම්",
			path: "/downloads",
			portalsPanel: true,
			dropdown: DOWNLOADS_PORTALS
		},
		{
			id: "contact",
			label: "අප අමතන්න",
			path: "/contact",
			contactPanel: true,
			dropdown: [
				{
					label: "කාර්යාලය සොයා ගන්න",
					path: "/contact#find-office"
				},
				{
					label: "දූරකථන නාමාවලිය",
					path: "/contact#contact-info"
				},
				{
					label: "පැමිණිලි සහ ප්‍රතිපෝෂණ",
					path: "/contact#feedback"
				}
			]
		}
	],
	ta: [
		{
			id: "home",
			label: "முகப்பு",
			path: "/home"
		},
		{
			id: "about",
			label: "எங்களைப் பற்றி",
			path: "/about",
			megaMenu: true,
			dropdown: ABOUT_US_MENU
		},
		{
			id: "divs",
			label: "பிரிவுகள்",
			path: "/departments"
		},
		{
			id: "media",
			label: "ஊடக மையம்",
			path: "/news",
			newsPanel: true,
			dropdown: NEWS_MENU
		},
		{
			id: "docs",
			label: "பதிவிறக்கங்கள்",
			path: "/downloads",
			portalsPanel: true,
			dropdown: DOWNLOADS_PORTALS
		},
		{
			id: "contact",
			label: "தொடர்பு கொள்ளுங்கள்",
			path: "/contact",
			contactPanel: true,
			dropdown: [
				{
					label: "எங்கள் அலுவலகத்தைக் கண்டறியுங்கள்",
					path: "/contact#find-office"
				},
				{
					label: "தொலைபேசி அடைவு",
					path: "/contact#contact-info"
				},
				{
					label: "புகார் & கருத்து",
					path: "/contact#feedback"
				}
			]
		}
	]
};
var LANG_FONT = {
	en: "inherit",
	si: "'Noto Sans Sinhala', sans-serif",
	ta: "'Noto Sans Tamil', sans-serif"
};
var NAVBAR_UI = {
	en: {
		contactTitle: "Planning Secretariat",
		quickLinks: "Quick Links",
		keyOfficials: "Key Officials",
		planningTeam: "Planning Team",
		deputyDirectors: "Deputy Directors",
		deputyDirectorsSub: "6 Deputy Directors – Planning",
		readMore: "Read More →",
		viewAll: "View All →"
	},
	si: {
		contactTitle: "සැලසුම් ලේකම් කාර්යාලය",
		quickLinks: "ඉක්මන් සබැඳි",
		keyOfficials: "ප්‍රධාන නිලධාරීන්",
		planningTeam: "සැලසුම් කණ්ඩායම",
		deputyDirectors: "නියෝජ්‍ය අධ්‍යක්ෂවරුන්",
		deputyDirectorsSub: "නියෝජ්‍ය අධ්‍යක්ෂවරු 6 – සැලසුම්",
		readMore: "තව කියවන්න →",
		viewAll: "සියල්ල බලන්න →"
	},
	ta: {
		contactTitle: "திட்டமிடல் செயலகம்",
		quickLinks: "விரைவு இணைப்புகள்",
		keyOfficials: "முக்கிய அதிகாரிகள்",
		planningTeam: "திட்டமிடல் குழு",
		deputyDirectors: "உதவி இயக்குநர்கள்",
		deputyDirectorsSub: "6 உதவி இயக்குநர்கள் – திட்டமிடல்",
		readMore: "மேலும் படிக்கவும் →",
		viewAll: "அனைத்தையும் காண்க →"
	}
};
var LANGUAGES = [
	{
		code: "si",
		label: "සිංහල"
	},
	{
		code: "ta",
		label: "தமிழ்"
	},
	{
		code: "en",
		label: "English"
	}
];
function OfficialAvatar({ photo, name }) {
	const [err, setErr] = (0, import_react.useState)(false);
	if (!err) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: resolveUploadUrl(photo),
		alt: name,
		className: "w-full h-full object-cover object-top",
		onError: () => setErr(true)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "w-full h-full flex items-center justify-center bg-[rgba(199,154,43,0.12)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleUserRound, {
			size: 32,
			className: "text-gold/60"
		})
	});
}
function GovernmentEmblem() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "navbar-emblem flex-shrink-0 rounded-full border-[2.5px] border-gold bg-white flex items-center justify-center relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-[5px] rounded-full border border-gold opacity-30 pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-[10px] rounded-full border border-maroon opacity-20 pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex flex-col items-center justify-center text-center gap-[2px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-[6px] font-bold text-maroon uppercase tracking-[0.18em] leading-none",
						children: "ශ්‍රී ලංකා"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-5 h-px bg-gold opacity-80" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-[5.5px] font-bold text-deep-maroon uppercase tracking-[0.14em] leading-none",
						children: "SRI LANKA"
					})
				]
			})
		]
	});
}
function SiteLogo() {
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(false);
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GovernmentEmblem, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [!loaded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "navbar-logo-skeleton",
		"aria-hidden": "true"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: SITE_LOGO_PATH,
		alt: "Southern Province Planning Secretariat logo",
		className: "navbar-logo-image",
		onLoad: () => setLoaded(true),
		onError: () => setError(true),
		style: {
			opacity: loaded ? 1 : 0,
			transition: "opacity 0.4s ease"
		}
	})] });
}
function DesktopNavItem({ item, lang, isActive, activeDropdown, onEnter, onLeave, onToggle, contactDetails }) {
	const dropOpen = activeDropdown === item.id;
	const fontFamily = LANG_FONT[lang];
	const isDisabled = item.disabled === true;
	const hasDropdown = Array.isArray(item.dropdown) && item.dropdown.length > 0;
	const isAboutMega = item.megaMenu === true;
	const isPortalPanel = item.portalsPanel === true;
	const active = (isAboutMega ? isActive("/about") : isActive(item.path)) || dropOpen;
	const ui = NAVBAR_UI[lang] || NAVBAR_UI.en;
	const sharedLinkCls = `
    nav-item-bold relative flex items-center gap-1.5
    nav-px
    font-sans nav-label-size font-extrabold tracking-[0.07em] uppercase
    transition-colors duration-200 group whitespace-nowrap
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1
  `;
	const underbar = (isOn) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `
        absolute bottom-0 left-0 right-0 h-[3px] bg-gold
        transition-all duration-200 origin-center
        ${isOn ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"}
      ` });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "relative h-full flex items-stretch",
		onMouseEnter: () => hasDropdown && onEnter(item.id),
		onMouseLeave: () => hasDropdown && onLeave(),
		role: "none",
		children: [
			isDisabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				role: "menuitem",
				"aria-disabled": "true",
				tabIndex: -1,
				className: `${sharedLinkCls} text-prem-black/50 cursor-default`,
				style: { fontFamily },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })
			}) : isAboutMega ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "menuitem",
				"aria-haspopup": "menu",
				"aria-expanded": dropOpen,
				"aria-label": `${item.label} menu`,
				onClick: () => onToggle(item.id),
				className: `
            ${sharedLinkCls}
            ${dropOpen ? "bg-maroon text-white rounded-t-md" : active ? "text-maroon" : "text-prem-black hover:text-maroon"}
          `,
				style: { fontFamily },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaChevronDown, { className: `nav-chevron transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}` }),
					underbar(active)
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
				to: item.path,
				role: "menuitem",
				"aria-haspopup": hasDropdown ? "menu" : void 0,
				"aria-expanded": hasDropdown ? dropOpen : void 0,
				className: `${sharedLinkCls} ${active ? "text-maroon" : "text-prem-black hover:text-maroon"}`,
				style: { fontFamily },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label }),
					hasDropdown && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaChevronDown, { className: `nav-chevron transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}` }),
					underbar(active)
				]
			}),
			hasDropdown && !isAboutMega && !item.contactPanel && !item.newsPanel && !isPortalPanel && dropOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "nav-plain-drop absolute top-full left-0 bg-white border-t-[3px] border-gold z-50",
				role: "menu",
				"aria-label": `${item.label} submenu`,
				onMouseEnter: () => onEnter(item.id),
				onMouseLeave: onLeave,
				children: item.dropdown.map((sub) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
					to: sub.path,
					role: "menuitem",
					className: "\r\n                flex items-center gap-3 px-5 py-3\r\n                font-sans text-[11px] font-bold tracking-[0.06em] uppercase text-prem-black\r\n                hover:text-maroon hover:bg-ivory hover:pl-7\r\n                border-b border-warm-neutral last:border-0\r\n                transition-all duration-150\r\n                focus-visible:outline-none focus-visible:bg-ivory focus-visible:text-maroon\r\n              ",
					style: { fontFamily },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1 h-1 rounded-full bg-gold flex-shrink-0 opacity-70" }), sub.label]
				}, sub.path))
			}),
			isPortalPanel && dropOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "nav-plain-drop absolute top-full left-0 bg-white border-t-[3px] border-gold z-50",
				role: "menu",
				"aria-label": "Downloads submenu",
				onMouseEnter: () => onEnter(item.id),
				onMouseLeave: onLeave,
				children: item.dropdown.map((sub) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: sub.href,
					role: "menuitem",
					target: "_blank",
					rel: "noopener noreferrer",
					className: "\r\n                flex items-center gap-3 px-5 py-3\r\n                font-sans text-[11px] font-bold tracking-[0.06em] uppercase text-prem-black\r\n                hover:text-maroon hover:bg-ivory hover:pl-7\r\n                border-b border-warm-neutral last:border-0\r\n                transition-all duration-150\r\n                focus-visible:outline-none focus-visible:bg-ivory focus-visible:text-maroon\r\n              ",
					style: { fontFamily },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1 h-1 rounded-full bg-gold flex-shrink-0 opacity-70" }), sub.label]
				}, sub.label))
			}),
			item.newsPanel && dropOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "nav-news-drop absolute top-full left-0 z-50",
				role: "menu",
				"aria-label": "Media centre submenu",
				onMouseEnter: () => onEnter(item.id),
				onMouseLeave: onLeave,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-b-2xl border-t-[3px] border-gold shadow-[0_24px_48px_rgba(0,0,0,0.32)] bg-gradient-to-br from-maroon to-deep-maroon",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(199,154,43,0.15),transparent_55%)] pointer-events-none" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative px-6 pt-5 pb-3 border-b border-white/10 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] font-bold tracking-[0.22em] uppercase text-gold/70",
								style: { fontFamily },
								children: item.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-white/25 tracking-widest select-none",
								children: "— Official Communications"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative flex flex-col",
							children: NEWS_MENU.map((newsItem, idx) => {
								const Icon = newsItem.icon;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
									to: newsItem.path,
									role: "menuitem",
									className: `
                      group flex items-center gap-5 px-6 py-[18px]
                      hover:bg-white/10 transition-all duration-200
                      focus-visible:outline-none focus-visible:bg-white/10
                      ${idx < NEWS_MENU.length - 1 ? "border-b border-white/10" : ""}
                    `,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-gold/60 text-gold group-hover:shadow-[0_0_18px_rgba(199,154,43,0.55)] transition-shadow duration-200",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
												size: 19,
												strokeWidth: 1.75
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex-1 min-w-0",
											style: { fontFamily: LANG_FONT[lang] },
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block text-[15px] font-semibold text-white leading-snug mb-0.5",
												children: newsItem.title[lang] || newsItem.title.en
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block text-[12px] text-[#f0ddd0]/65 leading-relaxed",
												children: newsItem.description[lang] || newsItem.description.en
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[17px] text-gold/35 group-hover:text-gold group-hover:translate-x-1.5 transition-all duration-200 flex-shrink-0 font-light",
											"aria-hidden": "true",
											children: "→"
										})
									]
								}, newsItem.path);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative px-6 py-3 bg-black/20 border-t border-white/10 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
								to: "/news?tab=news",
								className: "text-[11px] font-semibold text-gold/70 hover:text-gold tracking-wide transition-colors duration-150 focus-visible:outline-none focus-visible:text-gold",
								style: { fontFamily },
								children: [ui.viewAll, " Media"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-white/20 tracking-widest select-none",
								"aria-hidden": "true",
								children: "✦"
							})]
						})
					]
				})
			}),
			item.contactPanel && dropOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "nav-contact-drop absolute top-full right-0 z-50",
				role: "menu",
				"aria-label": "Contact submenu",
				onMouseEnter: () => onEnter(item.id),
				onMouseLeave: onLeave,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-b-2xl border-t-[3px] border-gold shadow-[0_20px_44px_rgba(0,0,0,0.3)] bg-gradient-to-b from-maroon to-deep-maroon",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(199,154,43,0.10),transparent_50%)] pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative grid nav-contact-grid",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-6 py-6 border-r border-white/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] font-bold tracking-[0.22em] uppercase text-gold/70 mb-4",
								style: { fontFamily: LANG_FONT[lang] },
								children: ui.contactTitle
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-3.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-gold/60 text-gold mt-0.5",
											"aria-hidden": "true",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
												size: 14,
												strokeWidth: 2
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[12.5px] text-white/85 leading-snug",
											children: contactDetails.address
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-gold/60 text-gold",
											"aria-hidden": "true",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
												size: 14,
												strokeWidth: 2
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: `tel:${contactDetails.phone.replace(/\s/g, "")}`,
											className: "text-[12.5px] text-white/85 hover:text-gold transition-colors duration-150 focus-visible:outline-none focus-visible:text-gold",
											children: contactDetails.phone
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-gold/60 text-gold",
											"aria-hidden": "true",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
												size: 14,
												strokeWidth: 2
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: `mailto:${contactDetails.email}`,
											className: "text-[12.5px] text-white/85 hover:text-gold transition-colors duration-150 focus-visible:outline-none focus-visible:text-gold",
											children: contactDetails.email
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-gold/60 text-gold",
											"aria-hidden": "true",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
												size: 14,
												strokeWidth: 2
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[12.5px] text-white/85",
											style: { fontFamily: LANG_FONT[lang] },
											children: contactDetails.hours[lang] || contactDetails.hours.en
										})]
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col justify-center px-5 py-6 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] font-bold tracking-[0.22em] uppercase text-gold/70 mb-1",
								style: { fontFamily: LANG_FONT[lang] },
								children: ui.quickLinks
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-row flex-wrap gap-1.5",
								children: item.dropdown.map((sub) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
									to: sub.path,
									role: "menuitem",
									className: "\r\n                        group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg\r\n                        text-[13px] font-semibold tracking-wide text-white/80 whitespace-nowrap\r\n                        hover:bg-white/10 hover:text-white\r\n                        transition-all duration-150\r\n                        focus-visible:outline-none focus-visible:bg-white/10 focus-visible:text-white\r\n                      ",
									style: { fontFamily },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity",
										"aria-hidden": "true"
									}), sub.label]
								}, sub.path))
							})]
						})]
					})]
				})
			})
		]
	});
}
function MobileNavItem({ item, lang, isActive, onClose }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const hasDropdown = Array.isArray(item.dropdown) && item.dropdown.length > 0;
	const active = (item.megaMenu === true ? isActive("/about") : isActive(item.path)) || open;
	const fontFamily = LANG_FONT[lang];
	const isDisabled = item.disabled === true;
	const toggleOpen = () => setOpen((v) => !v);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "border-b border-warm-neutral last:border-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-stretch",
			children: [isDisabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-disabled": "true",
				tabIndex: -1,
				className: "flex-1 px-5 py-4 text-left font-sans mobile-nav-label font-extrabold tracking-[0.07em] uppercase text-prem-black/50 cursor-default",
				style: { fontFamily },
				children: item.label
			}) : hasDropdown && !item.newsPanel && !item.contactPanel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: toggleOpen,
				className: `
              flex-1 px-5 py-4 text-left
              font-sans mobile-nav-label font-extrabold tracking-[0.07em] uppercase
              transition-colors duration-200
              focus-visible:outline-none focus-visible:bg-ivory
              ${active ? "bg-maroon text-white" : "text-prem-black hover:bg-ivory/60"}
            `,
				style: { fontFamily },
				"aria-expanded": open,
				"aria-haspopup": "menu",
				"aria-label": `${item.label} — toggle submenu`,
				children: item.label
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
				to: item.path,
				onClick: onClose,
				className: `
              flex-1 px-5 py-4
              font-sans mobile-nav-label font-extrabold tracking-[0.07em] uppercase
              transition-colors duration-200
              focus-visible:outline-none focus-visible:bg-ivory
              ${active ? "text-maroon" : "text-prem-black hover:text-maroon"}
            `,
				style: { fontFamily },
				children: item.label
			}), hasDropdown && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: toggleOpen,
				className: `
              flex items-center justify-center w-14 flex-shrink-0
              transition-colors duration-200
              focus-visible:outline-none focus-visible:bg-ivory
              ${active ? "bg-maroon text-white" : "text-pro-gray hover:bg-ivory hover:text-maroon"}
            `,
				"aria-label": open ? `Collapse ${item.label}` : `Expand ${item.label}`,
				"aria-expanded": open,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaChevronDown, { className: `text-[11px] transition-transform duration-200 ${open ? "rotate-180" : ""}` })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
			initial: false,
			children: hasDropdown && open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "bg-ivory border-t border-warm-neutral overflow-hidden",
				role: "menu",
				"aria-label": `${item.label} submenu`,
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
					duration: .22,
					ease: [
						.16,
						1,
						.3,
						1
					]
				},
				children: item.dropdown.map((sub) => {
					const Icon = sub.icon;
					const sharedCls = `
                flex items-start gap-3 px-6 py-3.5
                font-sans text-[12px] font-medium tracking-wide text-pro-gray
                hover:text-maroon hover:bg-warm-neutral
                border-b border-warm-neutral last:border-0
                transition-colors duration-150
                focus-visible:outline-none focus-visible:bg-warm-neutral focus-visible:text-maroon
              `;
					const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [Icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						size: 14,
						className: "text-gold mt-0.5 flex-shrink-0",
						"aria-hidden": "true"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-[7px]",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "leading-snug min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-prem-black font-semibold",
							children: typeof sub.title === "object" ? sub.title[lang] || sub.title.en : sub.title || sub.label
						}), sub.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-[11px] text-pro-gray/90 mt-0.5",
							children: typeof sub.description === "object" ? sub.description[lang] || sub.description.en : sub.description
						})]
					})] });
					return sub.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: sub.href,
						role: "menuitem",
						target: "_blank",
						rel: "noopener noreferrer",
						onClick: onClose,
						className: sharedCls,
						style: { fontFamily },
						children: inner
					}, sub.label) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
						to: sub.path,
						role: "menuitem",
						onClick: onClose,
						className: sharedCls,
						style: { fontFamily },
						children: inner
					}, sub.path);
				})
			})
		})]
	});
}
function Navbar() {
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const [activeDropdown, setActiveDropdown] = (0, import_react.useState)(null);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [navbarHeight, setNavbarHeight] = (0, import_react.useState)(68);
	const [activeLang, setActiveLang] = (0, import_react.useState)(() => (typeof window !== "undefined" ? typeof window !== "undefined" ? localStorage.getItem("lang") : null : null) || "en");
	const [officials, setOfficials] = (0, import_react.useState)(FEATURED_OFFICIALS_FALLBACK);
	const [contactDetails, setContactDetails] = (0, import_react.useState)(CONTACT_DETAILS_FALLBACK);
	const navigate = useNavigate$1();
	const location = useLocation$1();
	const headerRef = (0, import_react.useRef)(null);
	const dropTimerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const lang = getCurrentLang();
		setActiveLang(lang);
	}, [location.rawPathname]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		staffApi.list().then(({ data }) => {
			if (cancelled || !Array.isArray(data)) return;
			const featured = data.filter((s) => s.featured === true).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).slice(0, FEATURED_OFFICIALS_FALLBACK.length).map((s) => ({
				role: s.position,
				name: s.name?.en || "",
				path: s.tier === "deputy-secretary" ? "/about-deputy-secretary" : `/about/${s.slug}`,
				photo: s.photo
			}));
			if (featured.length) setOfficials(featured);
		}).catch((err) => console.error("Navbar: failed to load featured staff", err));
		siteSettingsApi.get().then(({ data }) => {
			if (cancelled || !data) return;
			setContactDetails({
				address: data.address || CONTACT_DETAILS_FALLBACK.address,
				phone: data.phone || CONTACT_DETAILS_FALLBACK.phone,
				email: data.email || CONTACT_DETAILS_FALLBACK.email,
				hours: data.hours && (data.hours.en || data.hours.si || data.hours.ta) ? data.hours : CONTACT_DETAILS_FALLBACK.hours
			});
		}).catch((err) => console.error("Navbar: failed to load site settings", err));
		return () => {
			cancelled = true;
		};
	}, []);
	const navItems = NAV_TRANSLATIONS[activeLang] || NAV_TRANSLATIONS.en;
	const activeMegaItem = navItems.find((item) => item.id === activeDropdown && item.megaMenu);
	(0, import_react.useEffect)(() => {
		if (!headerRef.current) return;
		const ro = new ResizeObserver(() => {
			setNavbarHeight(headerRef.current.getBoundingClientRect().height);
		});
		ro.observe(headerRef.current);
		setNavbarHeight(headerRef.current.getBoundingClientRect().height);
		return () => ro.disconnect();
	}, []);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		setMobileOpen(false);
		setActiveDropdown(null);
	}, [location.pathname, location.hash]);
	(0, import_react.useEffect)(() => {
		const handler = (e) => {
			if (headerRef.current && !headerRef.current.contains(e.target)) {
				setActiveDropdown(null);
				setMobileOpen(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);
	(0, import_react.useEffect)(() => {
		const handler = (e) => {
			if (e.key === "Escape") {
				setActiveDropdown(null);
				setMobileOpen(false);
			}
		};
		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, []);
	(0, import_react.useEffect)(() => {}, [mobileOpen]);
	const handleLangChange = (0, import_react.useCallback)((code) => {
		localStorage.setItem("lang", code);
		setActiveLang(code);
		window.dispatchEvent(new CustomEvent("langChange", { detail: code }));
		const targetPath = localizePath(location.pathname, code);
		const search = location.search ? `?${location.search}` : "";
		const hash = location.hash ? `#${location.hash}` : "";
		navigate(`${targetPath}${search}${hash}`, { replace: true });
	}, [
		location.pathname,
		location.search,
		location.hash,
		navigate
	]);
	const isActive = (0, import_react.useCallback)((path) => path === "/" ? location.pathname === "/" : location.pathname.startsWith(path), [location.pathname]);
	const handleDropEnter = (0, import_react.useCallback)((id) => {
		clearTimeout(dropTimerRef.current);
		setActiveDropdown(id);
	}, []);
	const handleDropLeave = (0, import_react.useCallback)(() => {
		dropTimerRef.current = setTimeout(() => setActiveDropdown(null), 180);
	}, []);
	const handleDropToggle = (0, import_react.useCallback)((id) => {
		clearTimeout(dropTimerRef.current);
		setActiveDropdown((cur) => cur === id ? null : id);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		ref: headerRef,
		id: "site-header",
		role: "banner",
		className: `fixed top-0 left-0 right-0 z-[9999] w-full transition-shadow duration-300 ${scrolled ? "shadow-nav" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white border-b border-warm-neutral relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden lg:flex absolute top-0 right-0 z-10 bg-maroon items-center px-3 py-[5px] select-none",
					style: { borderBottomLeftRadius: "10px" },
					role: "navigation",
					"aria-label": "Language selector",
					children: LANGUAGES.map((lang, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => handleLangChange(lang.code),
							"aria-label": `Switch to ${lang.label}`,
							"aria-pressed": activeLang === lang.code,
							className: `
                    px-3 py-1 text-[12px] font-medium tracking-wide
                    transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold
                    ${activeLang === lang.code ? "text-gold font-semibold" : "text-white/75 hover:text-gold"}
                  `,
							style: { fontFamily: LANG_FONT[lang.code] },
							children: lang.label
						}), idx < LANGUAGES.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gold opacity-30 text-[11px] select-none",
							"aria-hidden": "true",
							children: "│"
						})]
					}, lang.code))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "navbar-inner",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "navbar-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								to: "/",
								className: "navbar-logo-link group outline-none focus-visible:ring-2 focus-visible:ring-gold",
								"aria-label": "Southern Province Planning Secretariat — Home",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLogo, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
								className: "hidden lg:flex items-stretch self-stretch navbar-nav-gap",
								"aria-label": "Main navigation",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "flex items-stretch h-full",
									role: "menubar",
									children: navItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopNavItem, {
										item,
										lang: activeLang,
										isActive,
										activeDropdown,
										onEnter: handleDropEnter,
										onLeave: handleDropLeave,
										onToggle: handleDropToggle,
										contactDetails
									}, item.id))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "\r\n                  lg:hidden flex items-center justify-center\r\n                  hamburger-btn\r\n                  text-maroon hover:bg-ivory border border-transparent\r\n                  hover:border-warm-neutral rounded\r\n                  transition-all duration-200\r\n                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold\r\n                ",
								onClick: () => setMobileOpen((v) => !v),
								"aria-label": mobileOpen ? "Close navigation menu" : "Open navigation menu",
								"aria-expanded": mobileOpen,
								"aria-controls": "mobile-menu",
								children: mobileOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaTimes, {
									className: "text-[17px]",
									"aria-hidden": "true"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBars, {
									className: "text-[17px]",
									"aria-hidden": "true"
								})
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: activeMegaItem && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "hidden lg:block absolute top-full z-[60] mega-menu-positioner",
				onMouseEnter: () => handleDropEnter(activeMegaItem.id),
				onMouseLeave: handleDropLeave,
				initial: {
					opacity: 0,
					y: -10
				},
				animate: {
					opacity: 1,
					y: 0
				},
				exit: {
					opacity: 0,
					y: -8
				},
				transition: {
					duration: .22,
					ease: [
						.16,
						1,
						.3,
						1
					]
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden border-t border-gold rounded-b-2xl shadow-[0_28px_50px_rgba(0,0,0,0.32)] bg-gradient-to-b from-maroon to-deep-maroon",
					role: "menu",
					"aria-label": "About Us menu",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(199,154,43,0.13),transparent_42%),radial-gradient(circle_at_80%_90%,rgba(255,255,255,0.05),transparent_36%)] pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mega-grid",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-r border-white/10",
							children: activeMegaItem.dropdown.map((menuItem, rowIndex) => {
								const Icon = menuItem.icon;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
									to: menuItem.path,
									role: "menuitem",
									className: `
                            group flex items-center gap-4 px-6 py-[14px]
                            transition-colors duration-200 hover:bg-[#7a1a30]/65
                            focus-visible:outline-none focus-visible:bg-[#7a1a30]/65
                            ${rowIndex < activeMegaItem.dropdown.length - 1 ? "border-b border-white/10" : ""}
                          `,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-gold/80 text-gold group-hover:shadow-[0_0_14px_rgba(199,154,43,0.55)] transition-shadow duration-200",
										"aria-hidden": "true",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											size: 14,
											strokeWidth: 2
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0",
										style: { fontFamily: LANG_FONT[activeLang] },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block mega-title font-semibold tracking-wide text-white leading-snug",
											children: menuItem.title[activeLang] || menuItem.title.en
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-1 block mega-desc leading-relaxed text-[#f0ddd0]/80",
											children: menuItem.description[activeLang] || menuItem.description.en
										})]
									})]
								}, menuItem.path);
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4 px-5 py-5 bg-black/25 border-l border-gold/20",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-bold tracking-[0.2em] uppercase text-gold/70",
									style: { fontFamily: LANG_FONT[activeLang] },
									children: (NAVBAR_UI[activeLang] || NAVBAR_UI.en).keyOfficials
								}),
								officials.map((official) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
									to: official.path,
									role: "menuitem",
									className: "group flex items-center gap-4 p-4 rounded-2xl border border-white/10 hover:border-gold/50 hover:bg-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:border-gold/50 focus-visible:bg-white/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "official-avatar-wrap rounded-2xl flex-shrink-0 overflow-hidden border-2 border-gold/50 group-hover:border-gold transition-colors duration-200",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficialAvatar, {
											photo: official.photo,
											name: official.name
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-gold font-bold tracking-[0.14em] leading-none mb-2 uppercase",
												style: { fontFamily: LANG_FONT[activeLang] },
												children: official.role[activeLang] || official.role.en
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "official-name font-bold text-white leading-snug mb-2",
												children: official.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[13px] text-white/40 group-hover:text-gold transition-colors duration-200 font-medium",
												style: { fontFamily: LANG_FONT[activeLang] },
												children: (NAVBAR_UI[activeLang] || NAVBAR_UI.en).readMore
											})
										]
									})]
								}, official.path)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 border-t border-white/10 pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] font-bold tracking-[0.2em] uppercase text-gold/70 mb-2",
										style: { fontFamily: LANG_FONT[activeLang] },
										children: (NAVBAR_UI[activeLang] || NAVBAR_UI.en).planningTeam
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
										to: "/about/deputy-directors",
										role: "menuitem",
										className: "group flex items-center gap-4 p-4 rounded-2xl border border-white/10 hover:border-gold/50 hover:bg-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:border-gold/50 focus-visible:bg-white/10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center border-2 border-gold/40 group-hover:border-gold bg-[rgba(199,154,43,0.08)] transition-colors duration-200",
											"aria-hidden": "true",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
												size: 22,
												className: "text-gold"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[15px] font-bold text-white leading-snug mb-1",
													style: { fontFamily: LANG_FONT[activeLang] },
													children: (NAVBAR_UI[activeLang] || NAVBAR_UI.en).deputyDirectors
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[12.5px] text-[#f0ddd0]/70 leading-snug mb-1.5",
													style: { fontFamily: LANG_FONT[activeLang] },
													children: (NAVBAR_UI[activeLang] || NAVBAR_UI.en).deputyDirectorsSub
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[12.5px] text-white/40 group-hover:text-gold transition-colors duration-200 font-medium",
													style: { fontFamily: LANG_FONT[activeLang] },
													children: (NAVBAR_UI[activeLang] || NAVBAR_UI.en).viewAll
												})
											]
										})]
									})]
								})
							]
						})]
					})]
				})
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "mobile-menu",
				className: `
            lg:hidden bg-white
            mobile-menu-container
            transition-[opacity,visibility] duration-300
            ${mobileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
          `,
				style: { top: navbarHeight },
				"aria-hidden": !mobileOpen,
				"aria-label": "Mobile navigation",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mobile-menu-inner",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						"aria-label": "Mobile navigation menu",
						className: "border-t border-warm-neutral",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							role: "menubar",
							children: navItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileNavItem, {
								item,
								lang: activeLang,
								isActive,
								onClose: () => setMobileOpen(false)
							}, item.id))
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-ivory border-t-2 border-warm-neutral px-5 py-4",
						role: "navigation",
						"aria-label": "Language selector",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: LANGUAGES.map((lang) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleLangChange(lang.code),
								"aria-label": `Switch to ${lang.label}`,
								"aria-pressed": activeLang === lang.code,
								className: `
                      text-[13px] px-5 py-2.5 rounded-lg transition-all duration-200
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold
                      ${activeLang === lang.code ? "bg-maroon text-white font-semibold shadow-sm" : "text-pro-gray border border-warm-neutral hover:border-maroon hover:text-maroon"}
                    `,
								style: { fontFamily: LANG_FONT[lang.code] },
								children: lang.label
							}, lang.code))
						})
					})]
				})
			})
		]
	}) });
}
var CONTACT_FALLBACK = {
	phone: "+94 912234503",
	email: "spdcsp@gmail.com"
};
var FOOTER_T = {
	en: {
		font: "Inter, system-ui, sans-serif",
		headFont: "'Cinzel', Georgia, serif",
		headStyle: {
			letterSpacing: "0.08em",
			textTransform: "uppercase"
		},
		address: "153B, S.H. Dahanayaka Mawatha, Galle, Sri Lanka.",
		navHeading: "Site Navigations",
		mediaHeading: "Media Center",
		navLinks: [
			{
				label: "About Secretary",
				path: "/about"
			},
			{
				label: "Divisions",
				path: "/departments"
			},
			{
				label: "Downloads",
				path: "/downloads"
			},
			{
				label: "FAQs",
				path: "/faq"
			},
			{
				label: "Contact Us",
				path: "/contact"
			}
		],
		mediaLinks: [
			{
				label: "Latest News",
				path: "/news"
			},
			{
				label: "Photo Gallery",
				path: "/gallery"
			},
			{
				label: "Official Notices",
				path: "/news?tab=notices"
			},
			{
				label: "Downloads",
				path: "/downloads"
			}
		],
		copyright: (y) => `© ${y} Planning Secretariat – Southern Province, Sri Lanka. All Rights Reserved.`,
		creditPre: "Designed & Maintained by the",
		creditBold: "ICT Division",
		creditPost: "",
		terms: "Terms & Services"
	},
	si: {
		font: "'Noto Sans Sinhala', sans-serif",
		headFont: "'Noto Sans Sinhala', sans-serif",
		headStyle: {
			letterSpacing: 0,
			textTransform: "none"
		},
		address: "153B, එස්.එච්. දහනායක මාවත, ගාල්ල, ශ්‍රී ලංකාව.",
		navHeading: "වෙබ් සිතියම",
		mediaHeading: "මාධ්‍ය මධ්‍යස්ථානය",
		navLinks: [
			{
				label: "අප ගැන",
				path: "/about"
			},
			{
				label: "අංශ",
				path: "/departments"
			},
			{
				label: "බාගත කිරීම්",
				path: "/downloads"
			},
			{
				label: "නිතර අසන ප්‍රශ්න",
				path: "/faq"
			},
			{
				label: "අප අමතන්න",
				path: "/contact"
			}
		],
		mediaLinks: [
			{
				label: "නවතම ප්‍රවෘත්ති",
				path: "/news"
			},
			{
				label: "ඡායාරූප ගැලරිය",
				path: "/gallery"
			},
			{
				label: "නිල නිවේදන",
				path: "/news?tab=notices"
			},
			{
				label: "බාගත කිරීම්",
				path: "/downloads"
			}
		],
		copyright: (y) => `© ${y} දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය. සියලු හිමිකම් ඇවිරිණි.`,
		creditPre: "",
		creditBold: "ICT",
		creditPost: " අංශය විසින් සැලසුම් කර නඩත්තු කරනු ලැබේ",
		terms: "නියම හා සේවා"
	},
	ta: {
		font: "'Noto Sans Tamil', sans-serif",
		headFont: "'Noto Sans Tamil', sans-serif",
		headStyle: {
			letterSpacing: 0,
			textTransform: "none"
		},
		address: "153B, எஸ்.எச். தஹநாயக மாவத்தை, காலி, இலங்கை.",
		navHeading: "தள வழிசெலுத்தல்",
		mediaHeading: "ஊடக மையம்",
		navLinks: [
			{
				label: "எங்களைப் பற்றி",
				path: "/about"
			},
			{
				label: "திணைக்களங்கள்",
				path: "/departments"
			},
			{
				label: "பதிவிறக்கங்கள்",
				path: "/downloads"
			},
			{
				label: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
				path: "/faq"
			},
			{
				label: "தொடர்பு கொள்ளுங்கள்",
				path: "/contact"
			}
		],
		mediaLinks: [
			{
				label: "சமீபத்திய செய்திகள்",
				path: "/news"
			},
			{
				label: "புகைப்பட தொகுப்பு",
				path: "/gallery"
			},
			{
				label: "அதிகாரப்பூர்வ அறிவிப்புகள்",
				path: "/news?tab=notices"
			},
			{
				label: "பதிவிறக்கங்கள்",
				path: "/downloads"
			}
		],
		copyright: (y) => `© ${y} தென் மாகாண திட்டமிடல் செயலகம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.`,
		creditPre: "",
		creditBold: "ICT",
		creditPost: " பிரிவால் வடிவமைக்கப்பட்டு பராமரிக்கப்படுகிறது",
		terms: "விதிமுறைகள் & சேவைகள்"
	}
};
function Footer() {
	const [lang, setLang] = (0, import_react.useState)(() => (typeof window !== "undefined" ? localStorage.getItem("lang") : null) || "en");
	const [contact, setContact] = (0, import_react.useState)(CONTACT_FALLBACK);
	const year = (/* @__PURE__ */ new Date()).getFullYear();
	(0, import_react.useEffect)(() => {
		const h = (e) => setLang(e.detail || "en");
		window.addEventListener("langChange", h);
		return () => window.removeEventListener("langChange", h);
	}, []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		siteSettingsApi.get().then(({ data }) => {
			if (cancelled || !data) return;
			setContact({
				phone: data.phone || CONTACT_FALLBACK.phone,
				email: data.email || CONTACT_FALLBACK.email
			});
		}).catch((err) => console.error("Footer: failed to load site settings", err));
		return () => {
			cancelled = true;
		};
	}, []);
	const t = FOOTER_T[lang] || FOOTER_T.en;
	const en = FOOTER_T.en;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "footer",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "footer-main",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "footer-arc",
				"aria-hidden": "true"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "footer-container",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "footer-grid",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "footer-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "footer-logo-wrap",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: "/branding/f-logo.svg",
										alt: "Planning Secretariat – Southern Province, Sri Lanka",
										className: "footer-logo",
										onError: (e) => {
											e.currentTarget.src = "/branding/logo.webp";
										}
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "footer-contact-list",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "footer-contact-item",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "footer-contact-icon-wrap",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMapPin, { size: 15 })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "footer-contact-text",
												style: { fontFamily: t.font },
												children: t.address
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "footer-contact-item",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "footer-contact-icon-wrap",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPhone, { size: 15 })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "footer-contact-text",
												children: contact.phone
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "footer-contact-item",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "footer-contact-icon-wrap",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMail, { size: 15 })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "footer-contact-text",
												children: contact.email
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "footer-socials",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "https://www.facebook.com",
											target: "_blank",
											rel: "noopener noreferrer",
											className: "footer-social-btn",
											"aria-label": "Facebook",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFacebookF, { size: 13 })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "https://www.youtube.com",
											target: "_blank",
											rel: "noopener noreferrer",
											className: "footer-social-btn",
											"aria-label": "YouTube",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaYoutube, { size: 15 })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "https://www.linkedin.com",
											target: "_blank",
											rel: "noopener noreferrer",
											className: "footer-social-btn",
											"aria-label": "LinkedIn",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaLinkedinIn, { size: 13 })
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "footer-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "footer-card-heading",
								style: {
									fontFamily: t.headFont,
									...t.headStyle
								},
								children: t.navHeading
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "footer-nav-list",
								children: t.navLinks.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
									to: l.path,
									className: "footer-nav-link",
									style: { fontFamily: t.font },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronRight, {
										size: 14,
										className: "footer-chevron"
									}), l.label]
								}) }, l.path + l.label))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "footer-card footer-card--media",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "footer-card-heading",
								style: {
									fontFamily: t.headFont,
									...t.headStyle
								},
								children: t.mediaHeading
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "footer-nav-list",
								children: t.mediaLinks.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
									to: l.path,
									className: "footer-nav-link",
									style: { fontFamily: t.font },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronRight, {
										size: 14,
										className: "footer-chevron"
									}), l.label]
								}) }, l.path + l.label))
							})]
						})
					]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "footer-bottom-bar",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "footer-bottom-inner",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "footer-copyright",
						style: { fontFamily: en.font },
						children: en.copyright(year)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "footer-credit",
						style: { fontFamily: en.font },
						children: [
							en.creditPre && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [en.creditPre, " "] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: en.creditBold }),
							en.creditPost
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
						to: "/terms",
						className: "footer-terms",
						style: { fontFamily: en.font },
						children: en.terms
					})
				]
			})
		})]
	});
}
function useReducedMotion() {
	const [reduced, setReduced] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return false;
		return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	});
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const handler = (e) => setReduced(e.matches);
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, []);
	return reduced;
}
function ScrollProgress({ height = 2, zIndex = 9999 }) {
	const reduced = useReducedMotion();
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 200,
		damping: 30,
		restDelta: .001
	});
	if (reduced) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		"aria-hidden": "true",
		style: {
			scaleX,
			height,
			position: "fixed",
			top: 0,
			left: 0,
			right: 0,
			zIndex,
			originX: 0,
			background: "linear-gradient(90deg, #9A7520, #E8C55A, #C79A2B)",
			boxShadow: "0 0 8px rgba(199,154,43,0.5)",
			pointerEvents: "none",
			willChange: "transform"
		}
	});
}
var variants = {
	initial: {
		opacity: 0,
		y: 8,
		filter: "blur(3px)"
	},
	animate: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: .35,
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
		filter: "blur(2px)",
		transition: {
			duration: .18,
			ease: [
				.4,
				0,
				.2,
				1
			]
		}
	}
};
var reducedVariants = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
		transition: { duration: .15 }
	},
	exit: {
		opacity: 0,
		transition: { duration: .1 }
	}
};
function PageTransition({ children }) {
	const location = useLocation$1();
	const v = useReducedMotion() ? reducedVariants : variants;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		variants: v,
		initial: "initial",
		animate: "animate",
		style: { willChange: "opacity, filter" },
		children
	}, location.pathname);
}
var PageErrorBoundary = class extends import_react.Component {
	constructor(props) {
		super(props);
		this.state = { error: null };
	}
	static getDerivedStateFromError(error) {
		return { error };
	}
	render() {
		if (this.state.error) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				padding: "4rem 2rem",
				textAlign: "center",
				fontFamily: "Inter, sans-serif"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				style: {
					color: "#4A0918",
					marginBottom: "1rem"
				},
				children: "Something went wrong"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("pre", {
				style: {
					color: "#666",
					fontSize: "0.8rem",
					whiteSpace: "pre-wrap",
					maxWidth: 600,
					margin: "0 auto"
				},
				children: [
					this.state.error?.message,
					"\n\n",
					this.state.error?.stack
				]
			})]
		});
		return this.props.children;
	}
};
function MainLayout() {
	const { hidden } = useFooter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "layout",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollProgress, {
				height: 2,
				zIndex: 9998
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "main-content",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTransition, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageErrorBoundary, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet$1, {}) }) })
			}),
			!hidden && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
var SplitComponent = MainLayout;
//#endregion
export { SplitComponent as component };
