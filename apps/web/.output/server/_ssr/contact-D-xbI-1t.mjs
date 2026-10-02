import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/react+tanstack__react-query.mjs";
import { useLocation$1 } from "./react-router-dom-shim-Y_PNYd7n.mjs";
import { siteSettingsApi, staffApi } from "./cmsContentApi-C5pJ-eT_.mjs";
import { motion } from "../_libs/framer-motion.mjs";
import { FiAlertCircle, FiArrowRight, FiCheckCircle, FiChevronDown, FiExternalLink, FiMail, FiMapPin, FiMessageSquare, FiPhone, FiSearch, FiSend, FiUser, HiOutlineOfficeBuilding } from "../_libs/react-icons.mjs";
import { ComingSoon, usePageHold } from "./ComingSoon-BKqHq8HT.mjs";
import { SeoHead } from "./seo-9D_r0kof.mjs";
import { useInView } from "../_libs/react-intersection-observer.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-D-xbI-1t.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAROON = "#4A0918";
var GOLD = "#C79A2B";
var CREAM = "#FCFBFA";
var DEEP = "#2A0510";
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
		heroAccent: "Planning Secretariat – Southern Province",
		pageTitle: "Contact Us",
		pageSub: "We are here to assist you with dedication and professionalism.",
		mapTitle: "Find Our Office",
		mapSub: "Planning Secretariat – Southern Province Headquarters",
		mapAddress: "153B, S.H. Dahanayaka Mawatha, Galle, Sri Lanka.",
		mapPhone: "+94 912234503",
		mapFax: "+94 912246554",
		mapEmail: "spdcsp@gmail.com",
		mapHours: "Monday – Friday: 8:30 AM – 4:30 PM",
		mapHoursLbl: "Office Hours",
		mapAddressLbl: "Address",
		mapDirections: "Get Directions",
		mapFaxLbl: "Fax",
		dirCount: "divisions",
		dirTitle: "Telephone Directory",
		dirSub: "Direct contact numbers for all divisions",
		dirSearch: "Search division…",
		dirDept: "Division",
		dirPerson: "Contact Person",
		dirPhone: "Direct Line",
		dirEmpty: "No divisions match your search.",
		frmTitle: "Complaint & Feedback",
		frmSub: "Submit your complaint, suggestion, or inquiry. We respond within 3 working days.",
		frmName: "Full Name",
		frmNamePh: "Enter your full name",
		frmEmail: "Email Address",
		frmEmailPh: "Enter your email address",
		frmPhone: "Contact Number",
		frmPhonePh: "+94 77 123 4567 (optional)",
		frmType: "Type of Request",
		frmTypes: [
			"Complaint",
			"Suggestion",
			"General Inquiry",
			"Service Feedback",
			"Right to Information (RTI)"
		],
		frmDept: "Related Division",
		frmDeptDef: "Select division (optional)",
		frmSubject: "Subject",
		frmSubjectPh: "Brief subject of your message",
		frmMsg: "Message",
		frmMsgPh: "Describe your complaint or feedback in detail (minimum 20 characters)…",
		frmSubmit: "Send Message",
		frmNote: "Sent to: spdcsp@gmail.com",
		frmSuccess: "Your submission has been received. A confirmation email has been sent to your inbox. We will respond within 3 working days.",
		frmErrName: "Full name is required.",
		frmErrEmail: "A valid email address is required.",
		frmErrSubj: "Subject is required.",
		frmErrMsg: "Message must be at least 20 characters."
	},
	si: {
		heroAccent: "දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය",
		pageTitle: "අප අමතන්න",
		pageSub: "ඔබට ආධාර කිරීමට අපි සූදානම්. පහත ඕනෑම නාලිකාවක් හරහා අප හා සම්බන්ධ වන්න.",
		mapTitle: "අපගේ කාර්යාලය සොයා ගන්න",
		mapSub: "දකුණු පළාත් සැලසුම් ලේකම් ප්‍රධාන කාර්යාලය",
		mapAddress: "153B, එස්.එච්. දහනායක මාවත, ගාල්ල, ශ්‍රී ලංකාව.",
		mapPhone: "+94 912234503",
		mapFax: "+94 912246554",
		mapEmail: "spdcsp@gmail.com",
		mapHours: "සඳු – සිකු: 8:30 – 16:30",
		mapHoursLbl: "කාර්යාල වේලාවන්",
		mapAddressLbl: "ලිපිනය",
		mapDirections: "මාර්ගය ලබා ගන්න",
		mapFaxLbl: "ෆැක්ස්",
		dirCount: "අංශ",
		dirTitle: "දූරකථන නාමාවලිය",
		dirSub: "සියලු අංශ හා අංශ සඳහා සෘජු සම්බන්ධතා අංක",
		dirSearch: "අංශය සොයන්න…",
		dirDept: "අංශය / අංශය",
		dirPerson: "සම්බන්ධ පුද්ගලයා",
		dirPhone: "සෘජු රේඛාව",
		dirEmpty: "ගැළපෙන අංශ හමු නොවීය.",
		frmTitle: "පැමිණිලි හා ප්‍රතිපෝෂණ",
		frmSub: "ඔබගේ පැමිණිල්ල, යෝජනාව හෝ විමසුම ඉදිරිපත් කරන්න. කාර්යාල දිනයන් 3ක් ඇතුළත ප්‍රතිචාර දනවන්නෙමු.",
		frmName: "සම්පූර්ණ නම",
		frmNamePh: "ඔබේ සම්පූර්ණ නම ඇතුළු කරන්න",
		frmEmail: "විද්‍යුත් ලිපිනය",
		frmEmailPh: "ඔබේ විද්‍යුත් ලිපිනය ඇතුළු කරන්න",
		frmPhone: "සම්බන්ධතා අංකය",
		frmPhonePh: "+94 77 123 4567 (අත්‍යවශ්‍ය නොවේ)",
		frmType: "ඉල්ලීමේ වර්ගය",
		frmTypes: [
			"පැමිණිල්ල",
			"යෝජනාව",
			"සාමාන්‍ය විමසුම",
			"සේවා ප්‍රතිපෝෂණ",
			"තොරතුරු ලබා ගැනීමේ අයිතිය (RTI)"
		],
		frmDept: "සම්බන්ධිත අංශය",
		frmDeptDef: "අංශයක් තෝරන්න (අත්‍යවශ්‍ය නොවේ)",
		frmSubject: "විෂය",
		frmSubjectPh: "ඔබේ පණිවිඩයේ කෙටි විෂයය",
		frmMsg: "පණිවිඩය",
		frmMsgPh: "ඔබේ පැමිණිල්ල හෝ ප්‍රතිපෝෂණය විස්තරාත්මකව ලියන්න (අවම අකුරු 20)…",
		frmSubmit: "පණිවිඩය යවන්න",
		frmNote: "යවනු ලබන්නේ: spdcsp@gmail.com",
		frmSuccess: "ඔබේ ඉදිරිපත් කිරීම ලැබී ඇත. ඔබගේ ඊමේල් ලිපිනයට තහවුරු කිරීමේ ඊමේලයක් යවා ඇත. කාර්යාල දිනයන් 3ක් ඇතුළත ප්‍රතිචාර දනවන්නෙමු.",
		frmErrName: "සම්පූර්ණ නම අවශ්‍ය වේ.",
		frmErrEmail: "වලංගු විද්‍යුත් ලිපිනයක් අවශ්‍ය වේ.",
		frmErrSubj: "විෂය අවශ්‍ය වේ.",
		frmErrMsg: "පණිවිඩය අවම අකුරු 20 ක් විය යුතුය."
	},
	ta: {
		heroAccent: "தென் மாகாண திட்டமிடல் செயலகம்",
		pageTitle: "தொடர்பு கொள்ளுங்கள்",
		pageSub: "நாங்கள் உங்களுக்கு உதவ இங்கே இருக்கிறோம். கீழேயுள்ள ஏதேனும் ஒரு வழிமுறை மூலம் எங்களை தொடர்பு கொள்ளுங்கள்.",
		mapTitle: "எங்கள் அலுவலகத்தை கண்டுபிடியுங்கள்",
		mapSub: "தென் மாகாண திட்டமிடல் செயலக தலைமையகம்",
		mapAddress: "153B, எஸ்.எச். தஹநாயக மாவத்தை, காலி, இலங்கை.",
		mapPhone: "+94 912234503",
		mapFax: "+94 912246554",
		mapEmail: "spdcsp@gmail.com",
		mapHours: "திங்கள் – வெள்ளி: 8:30 மு.ப – 4:30 பி.ப",
		mapHoursLbl: "அலுவலக நேரம்",
		mapAddressLbl: "முகவரி",
		mapDirections: "வழிகாட்டுதல் பெறுங்கள்",
		mapFaxLbl: "தொலைநகல்",
		dirCount: "திணைக்களங்கள்",
		dirTitle: "தொலைபேசி அடைவு",
		dirSub: "அனைத்து பிரிவுகள் மற்றும் திணைக்களங்களுக்கான நேரடி தொடர்பு எண்கள்",
		dirSearch: "பிரிவை தேடுங்கள்…",
		dirDept: "திணைக்களம் / பிரிவு",
		dirPerson: "தொடர்பு நபர்",
		dirPhone: "நேரடி இணைப்பு",
		dirEmpty: "பொருந்தும் திணைக்களங்கள் இல்லை.",
		frmTitle: "புகார் & கருத்து",
		frmSub: "உங்கள் புகார், ஆலோசனை அல்லது விசாரணையை சமர்ப்பியுங்கள். 3 வேலை நாட்களுக்குள் பதிலளிப்போம்.",
		frmName: "முழு பெயர்",
		frmNamePh: "உங்கள் முழு பெயரை உள்ளிடுங்கள்",
		frmEmail: "மின்னஞ்சல் முகவரி",
		frmEmailPh: "உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடுங்கள்",
		frmPhone: "தொடர்பு எண்",
		frmPhonePh: "+94 77 123 4567 (விருப்பமானது)",
		frmType: "கோரிக்கையின் வகை",
		frmTypes: [
			"புகார்",
			"ஆலோசனை",
			"பொது விசாரணை",
			"சேவை கருத்து",
			"தகவல் உரிமை (RTI)"
		],
		frmDept: "தொடர்புடைய பிரிவு",
		frmDeptDef: "ஒரு பிரிவை தேர்ந்தெடுக்கவும் (விருப்பமானது)",
		frmSubject: "விஷயம்",
		frmSubjectPh: "உங்கள் செய்தியின் சுருக்கமான விஷயம்",
		frmMsg: "செய்தி",
		frmMsgPh: "உங்கள் புகார் அல்லது கருத்தை விரிவாக விளக்குங்கள் (குறைந்தது 20 எழுத்துக்கள்)…",
		frmSubmit: "செய்தி அனுப்புங்கள்",
		frmNote: "அனுப்பப்படும்: spdcsp@gmail.com",
		frmSuccess: "உங்கள் சமர்ப்பிப்பு பெறப்பட்டது. உங்கள் மின்னஞ்சலுக்கு உறுதிப்படுத்தல் அனுப்பப்பட்டுள்ளது. 3 வேலை நாட்களுக்குள் பதிலளிப்போம்.",
		frmErrName: "முழு பெயர் தேவை.",
		frmErrEmail: "சரியான மின்னஞ்சல் முகவரி தேவை.",
		frmErrSubj: "விஷயம் தேவை.",
		frmErrMsg: "செய்தி குறைந்தது 20 எழுத்துக்கள் இருக்க வேண்டும்."
	}
};
var fadeUp = {
	hidden: {
		opacity: 0,
		y: 24
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
var MAP_URL = "https://www.google.com/maps/place/Planning+Secretariat+Southern+Province/@6.0454187,80.2060789,18.45z/data=!4m6!3m5!1s0x3ae173fb2f6cce29:0x496be10f9a8fef84!8m2!3d6.0454558!4d80.2072194!16s%2Fg%2F11j9cdfv3b";
function Contact() {
	const held = usePageHold("contact");
	const [lang, setLang] = (0, import_react.useState)(() => (typeof window !== "undefined" ? localStorage.getItem("lang") : null) || "en");
	const [directory, setDirectory] = (0, import_react.useState)([]);
	const [dirLoading, setDirLoading] = (0, import_react.useState)(true);
	const [officeInfo, setOfficeInfo] = (0, import_react.useState)(null);
	const location = useLocation$1();
	(0, import_react.useEffect)(() => {
		const h = (e) => setLang(e.detail || "en");
		window.addEventListener("langChange", h);
		return () => window.removeEventListener("langChange", h);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!location.hash) return;
		const id = location.hash.slice(1);
		const timer = setTimeout(() => {
			const el = document.getElementById(id);
			if (!el) return;
			const top = el.getBoundingClientRect().top + window.scrollY - 90;
			window.scrollTo({
				top,
				behavior: "smooth"
			});
		}, 150);
		return () => clearTimeout(timer);
	}, [location.hash]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		setDirLoading(true);
		staffApi.list().then(({ data }) => {
			if (cancelled || !Array.isArray(data)) return;
			const dir = data.filter((s) => s.showInDirectory === true).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((s) => ({
				en: s.position?.en || "",
				si: s.position?.si || "",
				ta: s.position?.ta || "",
				person: s.name?.en || "",
				phone: s.phone || ""
			}));
			setDirectory(dir);
		}).catch((err) => console.error("Contact: failed to load staff directory", err)).finally(() => {
			if (!cancelled) setDirLoading(false);
		});
		siteSettingsApi.get().then(({ data }) => {
			if (cancelled || !data) return;
			setOfficeInfo(data);
		}).catch((err) => console.error("Contact: failed to load site settings", err));
		return () => {
			cancelled = true;
		};
	}, []);
	const meta = LANG_META[lang] || LANG_META.en;
	const baseT = T[lang] || T.en;
	const t = officeInfo ? {
		...baseT,
		mapAddress: officeInfo.address || baseT.mapAddress,
		mapPhone: officeInfo.phone || baseT.mapPhone,
		mapFax: officeInfo.fax || baseT.mapFax,
		mapEmail: officeInfo.email || baseT.mapEmail,
		mapHours: officeInfo.hours && (officeInfo.hours[lang] || officeInfo.hours.en) || baseT.mapHours
	} : baseT;
	if (held) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComingSoon, { pageKey: "contact" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeoHead, { page: "contact" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			background: CREAM,
			minHeight: "100vh"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
				t,
				meta
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "find-office",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapSection, {
					t,
					meta
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "contact-info",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DirectorySection, {
					t,
					meta,
					lang,
					directory,
					loading: dirLoading
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "feedback",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComplaintForm, {
					t,
					meta,
					lang
				})
			})
		]
	})] });
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
		className: "ch-hero",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ch-hero__bg" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ch-hero__noise" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ch-hero__grid-lines",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ch-hero__glow ch-hero__glow--gold",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ch-hero__glow ch-hero__glow--maroon",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ch-hero__glow ch-hero__glow--right",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ch-hero__watermark",
				"aria-hidden": "true",
				children: "CONTACT"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ch-hero__hc",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombBg, {})
			}),
			[...Array(6)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `ch-hero__dot ch-hero__dot--${i + 1}`,
				"aria-hidden": "true"
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ch-hero__inner",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "ch-hero__left",
					initial: "hidden",
					animate: "visible",
					variants: stagger,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							className: "ch-hero__badge",
							variants: itemV,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ch-hero__badge-dot" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontFamily: meta.isNonLatin ? meta.font : "'Cinzel', serif",
									letterSpacing: meta.isNonLatin ? 0 : "0.13em",
									textTransform: meta.isNonLatin ? "none" : "uppercase"
								},
								children: t.pageTitle
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
							className: "ch-hero__title",
							style: {
								fontFamily: meta.headFont,
								lineHeight: meta.isNonLatin ? 1.35 : 1.08
							},
							variants: itemV,
							children: t.pageTitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "ch-hero__rule",
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
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							className: "ch-hero__sub",
							style: { fontFamily: meta.font },
							variants: itemV,
							children: t.pageSub
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							className: "ch-hero__actions",
							variants: itemV,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `tel:${t.mapPhone}`,
								className: "ch-hero__btn ch-hero__btn--gold",
								style: { fontFamily: meta.font },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPhone, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.mapPhone })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: MAP_URL,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "ch-hero__btn ch-hero__btn--ghost",
								style: { fontFamily: meta.font },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMapPin, { size: 15 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.mapDirections }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, {
										size: 13,
										className: "ch-hero__btn-arrow"
									})
								]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "ch-hero__right",
					initial: "hidden",
					animate: "visible",
					variants: slideR,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/branding/f-logo.svg",
						alt: "Southern Province Planning Secretariat",
						className: "ch-hero__logo",
						onError: (e) => {
							e.currentTarget.style.display = "none";
						}
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: "ch-hero__wave",
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
function MapSection({ t, meta }) {
	const { ref, inView } = useInView({
		threshold: .1,
		triggerOnce: true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		ref,
		style: {
			background: CREAM,
			padding: "clamp(3rem,7vw,5rem) 0"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				variants: fadeUp,
				initial: "hidden",
				animate: inView ? "visible" : "hidden",
				style: {
					textAlign: "center",
					marginBottom: "clamp(1.5rem,3vw,2.5rem)"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMapPin, { size: 14 }),
						meta,
						children: t.mapTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						style: {
							fontFamily: meta.headFont,
							fontSize: "clamp(1.5rem,3.2vw,2.2rem)",
							fontWeight: 800,
							color: MAROON,
							lineHeight: meta.isNonLatin ? 1.45 : 1.2,
							marginBottom: "0.4rem"
						},
						children: t.mapTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							fontFamily: meta.font,
							fontSize: "0.92rem",
							color: "#6B3545"
						},
						children: t.mapSub
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				variants: fadeUp,
				initial: "hidden",
				animate: inView ? "visible" : "hidden",
				transition: { delay: .1 },
				className: "map-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "map-info-panel",
					style: { background: `linear-gradient(150deg, ${MAROON}, ${DEEP})` },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "map-logo",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/branding/f-logo.svg",
								alt: "Southern Province Planning Secretariat logo",
								onError: (e) => {
									e.currentTarget.style.display = "none";
								}
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapInfoRow, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMapPin, { size: 16 }),
							label: t.mapAddress,
							meta
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapInfoRow, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPhone, { size: 16 }),
							label: t.mapPhone,
							meta,
							href: `tel:${t.mapPhone}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapInfoRow, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPhone, { size: 16 }),
							label: `${t.mapFaxLbl}: ${t.mapFax}`,
							meta
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapInfoRow, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMail, { size: 16 }),
							label: t.mapEmail,
							meta,
							href: `mailto:${t.mapEmail}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "map-hours-box",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									fontFamily: meta.font,
									fontSize: "0.82rem",
									color: GOLD,
									fontWeight: 700,
									letterSpacing: "0.04em",
									textTransform: "uppercase",
									marginBottom: 4
								},
								children: t.mapHoursLbl
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									fontFamily: meta.font,
									fontSize: "1rem",
									color: "rgba(252,251,250,0.9)",
									margin: 0
								},
								children: t.mapHours
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: MAP_URL,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "map-directions-btn",
							style: { fontFamily: meta.font },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiExternalLink, { size: 15 }), t.mapDirections]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "map-embed-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						title: "Office Location",
						src: "https://maps.google.com/maps?q=6.0454558,80.2072194&z=18&output=embed",
						style: {
							width: "100%",
							height: "100%",
							border: 0
						},
						allowFullScreen: true,
						loading: "lazy",
						referrerPolicy: "no-referrer-when-downgrade"
					})
				})]
			})]
		})
	});
}
function MapInfoRow({ icon, label, meta, href }) {
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			gap: 10,
			alignItems: "flex-start",
			marginBottom: "0.9rem"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			style: {
				color: GOLD,
				marginTop: 2,
				flexShrink: 0
			},
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			style: {
				fontFamily: meta.font,
				fontSize: "clamp(0.88rem, 1.1vw, 1rem)",
				color: "rgba(252,251,250,0.85)",
				lineHeight: 1.6,
				whiteSpace: "pre-line",
				wordBreak: "break-word"
			},
			children: label
		})]
	});
	if (!href) return inner;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		style: {
			textDecoration: "none",
			display: "block"
		},
		onMouseEnter: (e) => e.currentTarget.querySelector("span:last-child").style.color = "#fff",
		onMouseLeave: (e) => e.currentTarget.querySelector("span:last-child").style.color = "rgba(252,251,250,0.85)",
		children: inner
	});
}
function DirectorySection({ t, meta, lang, directory, loading }) {
	const [query, setQuery] = (0, import_react.useState)("");
	const { ref, inView } = useInView({
		threshold: .06,
		triggerOnce: true
	});
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.toLowerCase().trim();
		if (!q) return directory;
		return directory.filter((d) => d.en.toLowerCase().includes(q) || d[lang]?.toLowerCase().includes(q) || d.person.toLowerCase().includes(q) || d.phone.includes(q));
	}, [
		query,
		lang,
		directory
	]);
	const thFont = {
		fontFamily: meta.isNonLatin ? meta.font : "'Cinzel', serif",
		letterSpacing: meta.isNonLatin ? 0 : "0.06em"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref,
		className: "dir-section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "dir-section__glow",
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-container",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					variants: fadeUp,
					initial: "hidden",
					animate: inView ? "visible" : "hidden",
					className: "dir-header",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPhone, { size: 14 }),
							meta,
							children: t.dirTitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "dir-header__title",
							style: {
								fontFamily: meta.headFont,
								lineHeight: meta.isNonLatin ? 1.45 : 1.15
							},
							children: t.dirTitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "dir-header__sub",
							style: { fontFamily: meta.font },
							children: t.dirSub
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dir-search-wrap",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "dir-search-icon",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiSearch, { size: 16 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									className: "dir-search-input",
									value: query,
									onChange: (e) => setQuery(e.target.value),
									placeholder: t.dirSearch,
									style: { fontFamily: meta.font },
									"aria-label": t.dirSearch
								}),
								query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "dir-search-clear",
									onClick: () => setQuery(""),
									"aria-label": "Clear search",
									children: "×"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					variants: fadeUp,
					initial: "hidden",
					animate: inView ? "visible" : "hidden",
					transition: { delay: .08 },
					className: "dir-stats",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dir-stats__item",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "dir-stats__num",
								children: directory.length
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "dir-stats__lbl",
								style: { fontFamily: meta.font },
								children: t.dirCount
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dir-stats__divider" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dir-stats__item",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "dir-stats__num",
								children: filtered.length
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "dir-stats__lbl",
								style: { fontFamily: meta.font },
								children: query ? "results found" : "total listed"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					variants: fadeUp,
					initial: "hidden",
					animate: inView ? "visible" : "hidden",
					transition: { delay: .14 },
					className: "dir-table-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "dir-table-scroll",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "dir-table",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										style: thFont,
										children: t.dirDept
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										style: thFont,
										children: t.dirPerson
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										style: thFont,
										children: t.dirPhone
									})
								] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: 3,
									className: "dir-table__empty",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { fontFamily: meta.font },
										children: "…"
									})
								}) }) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									colSpan: 3,
									className: "dir-table__empty",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiSearch, {
										size: 28,
										style: {
											opacity: .25,
											marginBottom: 8,
											display: "block",
											margin: "0 auto 8px"
										}
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { fontFamily: meta.font },
										children: t.dirEmpty
									})]
								}) }) : filtered.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.tr, {
									className: "dir-table__row",
									initial: {
										opacity: 0,
										x: -10
									},
									animate: {
										opacity: 1,
										x: 0
									},
									transition: {
										delay: i * .03,
										duration: .3
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											style: { fontFamily: meta.font },
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "dir-dept-name",
												children: d[lang] || d.en
											}), lang !== "en" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "dir-dept-en",
												children: d.en
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "dir-person-name",
											style: { fontFamily: meta.font },
											children: d.person
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: `tel:${d.phone}`,
											className: "dir-link",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPhone, { size: 12 }), d.phone]
										}) })
									]
								}, `${d.phone}-${i}`)) })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "dir-cards-mobile",
							children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "dir-table__empty",
								style: { fontFamily: meta.font },
								children: t.dirEmpty
							}) : filtered.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								className: "dir-mobile-card",
								initial: {
									opacity: 0,
									y: 12
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: {
									delay: i * .04,
									duration: .3
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "dir-mobile-card__name",
										style: { fontFamily: meta.font },
										children: d[lang] || d.en
									}),
									lang !== "en" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "dir-mobile-card__en",
										children: d.en
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "dir-mobile-card__person",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiUser, {
											size: 12,
											style: {
												color: "#C79A2B",
												flexShrink: 0
											}
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: { fontFamily: meta.font },
											children: d.person
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "dir-mobile-card__links",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: `tel:${d.phone}`,
											className: "dir-mobile-card__link",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "dir-mobile-card__link-icon",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPhone, { size: 13 })
											}), d.phone]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dir-mobile-card__bar" })
								]
							}, `m-${d.phone}-${i}`))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dir-footer",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HiOutlineOfficeBuilding, {
									size: 14,
									style: { color: GOLD }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									style: {
										fontFamily: "Inter, sans-serif",
										fontSize: "0.75rem",
										color: "#9B7A82"
									},
									children: [
										filtered.length,
										" / ",
										directory.length,
										" ",
										t.dirCount
									]
								}),
								query && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "dir-footer__query",
									style: { fontFamily: meta.font },
									children: [
										"— filtered by “",
										query,
										"”"
									]
								})
							]
						})
					]
				})
			]
		})]
	});
}
var EMPTY_FORM = {
	name: "",
	email: "",
	phone: "",
	type: "",
	dept: "",
	subject: "",
	message: ""
};
var API_BASE = "";
function ComplaintForm({ t, meta, lang }) {
	const { ref, inView } = useInView({
		threshold: .08,
		triggerOnce: true
	});
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [serverErr, setServerErr] = (0, import_react.useState)("");
	const set = (k) => (e) => setForm((prev) => ({
		...prev,
		[k]: e.target.value
	}));
	const validate = () => {
		const e = {};
		if (!form.name.trim()) e.name = t.frmErrName;
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t.frmErrEmail;
		if (!form.subject.trim()) e.subject = t.frmErrSubj;
		if (form.message.trim().length < 20) e.message = t.frmErrMsg;
		setErrors(e);
		return Object.keys(e).length === 0;
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validate()) return;
		setStatus("submitting");
		setServerErr("");
		try {
			const res = await fetch(`${API_BASE}/api/contact`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form)
			});
			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				throw new Error(data.error || "Submission failed. Please try again.");
			}
			setStatus("success");
			setForm(EMPTY_FORM);
		} catch (err) {
			setServerErr(err.message);
			setStatus("error");
		}
	};
	const DEPT_OPTIONS = {
		en: [
			"Development",
			"Accounts",
			"Administration"
		],
		si: [
			"සංවර්ධන",
			"ගිණුම්",
			"පරිපාලන"
		],
		ta: [
			"வளர்ச்சி",
			"கணக்குகள்",
			"நிர்வாகம்"
		]
	};
	const deptNames = DEPT_OPTIONS[lang] || DEPT_OPTIONS.en;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		ref,
		style: {
			background: CREAM,
			padding: "clamp(3rem,7vw,5rem) 0"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				variants: fadeUp,
				initial: "hidden",
				animate: inView ? "visible" : "hidden",
				style: {
					textAlign: "center",
					marginBottom: "clamp(1.5rem,3vw,2rem)"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMail, { size: 14 }),
						meta,
						children: t.frmTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						style: {
							fontFamily: meta.headFont,
							fontSize: "clamp(1.5rem,3.2vw,2.2rem)",
							fontWeight: 800,
							color: MAROON,
							lineHeight: meta.isNonLatin ? 1.45 : 1.2,
							marginBottom: "0.4rem"
						},
						children: t.frmTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							fontFamily: meta.font,
							fontSize: "0.92rem",
							color: "#6B3545"
						},
						children: t.frmSub
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				variants: fadeUp,
				initial: "hidden",
				animate: inView ? "visible" : "hidden",
				transition: { delay: .1 },
				style: {
					maxWidth: 820,
					margin: "0 auto",
					background: "#fff",
					borderRadius: 20,
					border: "1px solid rgba(199,154,43,0.18)",
					boxShadow: "0 4px 24px rgba(74,9,24,0.06), 0 16px 48px rgba(74,9,24,0.07)",
					padding: "clamp(1.5rem,4vw,2.5rem)"
				},
				children: [status === "success" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						scale: .95
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					className: "form-success-panel",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCheckCircle, {
							size: 52,
							style: { color: "#27AE60" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontFamily: meta.font,
								fontSize: "1rem",
								color: "#1a4a2a",
								lineHeight: 1.75,
								maxWidth: 460
							},
							children: t.frmSuccess
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setStatus("idle"),
							className: "form-success-again-btn",
							style: { fontFamily: meta.font },
							children: lang === "en" ? "Submit Another" : lang === "si" ? "නැවත යවන්න" : "மீண்டும் அனுப்புக"
						})
					]
				}), status !== "success" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					noValidate: true,
					children: [
						status === "error" && serverErr && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 8,
								background: "rgba(192,57,43,0.07)",
								border: "1px solid rgba(192,57,43,0.25)",
								borderRadius: 8,
								padding: "10px 14px",
								marginBottom: "1rem",
								fontFamily: meta.font,
								fontSize: "0.88rem",
								color: "#C0392B"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAlertCircle, {
								size: 15,
								style: { flexShrink: 0 }
							}), serverErr]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: t.frmName,
								error: errors.name,
								required: true,
								meta,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-icon-wrap",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "form-icon",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiUser, { size: 14 })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										className: `form-input${errors.name ? " has-error" : ""}`,
										value: form.name,
										onChange: set("name"),
										placeholder: t.frmNamePh,
										style: { fontFamily: meta.font },
										"aria-required": "true",
										"aria-invalid": !!errors.name
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: t.frmEmail,
								error: errors.email,
								required: true,
								meta,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-icon-wrap",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "form-icon",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMail, { size: 14 })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										className: `form-input${errors.email ? " has-error" : ""}`,
										value: form.email,
										onChange: set("email"),
										placeholder: t.frmEmailPh,
										style: { fontFamily: meta.font },
										"aria-required": "true",
										"aria-invalid": !!errors.email
									})]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: t.frmPhone,
								meta,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-icon-wrap",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "form-icon",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPhone, { size: 14 })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "tel",
										className: "form-input",
										value: form.phone,
										onChange: set("phone"),
										placeholder: t.frmPhonePh,
										style: { fontFamily: meta.font }
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: t.frmType,
								meta,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "select-wrap",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: "form-select",
										value: form.type,
										onChange: set("type"),
										style: {
											fontFamily: meta.font,
											color: form.type ? "#1a1a1a" : "#9B7A82"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: lang === "en" ? "Select type…" : lang === "si" ? "වර්ගය තෝරන්න…" : "வகையை தேர்ந்தெடுக்கவும்…"
										}), t.frmTypes.map((tp) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: tp,
											children: tp
										}, tp))]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "select-arrow",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronDown, { size: 15 })
									})]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: t.frmDept,
							meta,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "select-wrap",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "form-select",
									value: form.dept,
									onChange: set("dept"),
									style: {
										fontFamily: meta.font,
										color: form.dept ? "#1a1a1a" : "#9B7A82"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: t.frmDeptDef
									}), deptNames.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: n,
										children: n
									}, n))]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "select-arrow",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronDown, { size: 15 })
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: t.frmSubject,
							error: errors.subject,
							required: true,
							meta,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								className: `form-input${errors.subject ? " has-error" : ""}`,
								value: form.subject,
								onChange: set("subject"),
								placeholder: t.frmSubjectPh,
								style: { fontFamily: meta.font },
								"aria-required": "true",
								"aria-invalid": !!errors.subject
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: t.frmMsg,
							error: errors.message,
							required: true,
							meta,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-icon-wrap",
								style: { position: "relative" },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "form-icon form-icon--top",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMessageSquare, { size: 14 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										className: `form-textarea${errors.message ? " has-error" : ""}`,
										value: form.message,
										onChange: set("message"),
										placeholder: t.frmMsgPh,
										rows: 5,
										style: { fontFamily: meta.font },
										"aria-required": "true",
										"aria-invalid": !!errors.message
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "form-char-count",
										style: { color: form.message.length < 20 ? "#C0392B" : "#27AE60" },
										children: [form.message.length, "/20+"]
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-bottom-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "form-note",
								style: { fontFamily: meta.font },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiMail, {
									size: 12,
									style: { color: GOLD }
								}), t.frmNote]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
								type: "submit",
								className: "form-submit-btn",
								whileHover: status !== "submitting" ? {
									y: -2,
									scale: 1.02
								} : {},
								whileTap: status !== "submitting" ? { scale: .97 } : {},
								disabled: status === "submitting",
								style: {
									fontFamily: meta.font,
									opacity: status === "submitting" ? .75 : 1,
									cursor: status === "submitting" ? "not-allowed" : "pointer"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiSend, {
									size: 15,
									style: status === "submitting" ? { animation: "spin 1s linear infinite" } : {}
								}), status === "submitting" ? lang === "en" ? "Sending…" : lang === "si" ? "යවමින්…" : "அனுப்புகிறது…" : t.frmSubmit]
							})]
						})
					]
				})]
			})]
		})
	});
}
function FormField({ label, children, error, required, meta }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "form-field",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "form-label",
				style: { fontFamily: meta.font },
				children: [label, required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: {
						color: GOLD,
						marginLeft: 3
					},
					"aria-hidden": "true",
					children: "*"
				})]
			}),
			children,
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "form-error-msg",
				style: { fontFamily: meta.font },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAlertCircle, { size: 12 }),
					" ",
					error
				]
			})
		]
	});
}
function SectionLabel({ icon, children, meta }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "inline-flex",
			alignItems: "center",
			gap: 7,
			marginBottom: "0.6rem"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			style: { color: GOLD },
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			style: {
				fontFamily: meta.isNonLatin ? meta.font : "'Cinzel', serif",
				fontSize: "0.68rem",
				color: GOLD,
				fontWeight: 600,
				letterSpacing: meta.isNonLatin ? 0 : "0.1em",
				textTransform: meta.isNonLatin ? "none" : "uppercase"
			},
			children
		})]
	});
}
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
var SplitComponent = Contact;
//#endregion
export { SplitComponent as component };
