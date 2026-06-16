import { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SeoHead } from '@/shared/seo'
import {
  FiHelpCircle, FiArrowRight, FiHome, FiMail, FiSearch, FiX,
  FiChevronDown, FiPhone, FiMessageSquare,
} from 'react-icons/fi'
import './FAQ.css'

/* ─── Brand tokens ──────────────────────────────────────────────────────────── */
const GOLD  = '#C79A2B'
const CREAM = '#FCFBFA'

/* ─── Lang meta ─────────────────────────────────────────────────────────────── */
const LANG_META = {
  en: { font: 'Inter, sans-serif',               headFont: "'Playfair Display', Georgia, serif", isNonLatin: false },
  si: { font: "'Noto Sans Sinhala', sans-serif", headFont: "'Noto Sans Sinhala', sans-serif",   isNonLatin: true  },
  ta: { font: "'Noto Sans Tamil', sans-serif",   headFont: "'Noto Sans Tamil', sans-serif",     isNonLatin: true  },
}

/* ─── UI Strings ────────────────────────────────────────────────────────────── */
const T = {
  en: {
    heroAccent:   'Southern Province Planning Secretariat',
    pageTitle:    'FAQ',
    badgeLabel:   'FAQ',
    pageSub:      'Find answers to common questions about the Southern Province Planning Secretariat, our services, and how to interact with our office.',
    breadHome:    'Home',
    breadCur:     'FAQ',
    backHome:     'Back to Home',
    contactUs:    'Contact Us',
    /* intro */
    introTitle:   'Frequently Asked Questions',
    introSub:     'Find answers to common questions related to services, planning, reports, downloads, departments, and public information.',
    /* search */
    searchPh:     'Search questions…',
    searchLabel:  'Search FAQ',
    noResults:    'No questions match your search.',
    noResultsSub: 'Try a different keyword or browse a category.',
    /* categories */
    catAll:       'All',
    catGeneral:   'General',
    catPlanning:  'Planning',
    catDownloads: 'Downloads',
    catReports:   'Reports',
    catDepts:     'Divisions',
    catTech:      'Technical Support',
    /* help card */
    helpTitle:    'Need More Assistance?',
    helpSub:      'Contact the Planning Secretariat for further guidance.',
    helpContact:  'Contact Us',
    helpDir:      'Telephone Directory',
    /* still need help */
    snhTitle:     'Still Haven\'t Found Your Answer?',
    snhSub:       'Our team is available during office hours to assist you with any questions.',
    snhBtn:       'Send Us a Message',
    snhHours:     'Office Hours: Mon – Fri · 8:30 AM – 4:15 PM',
    snhEmail:     'info@sppsgn.lk',
  },
  si: {
    heroAccent:   'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය',
    pageTitle:    'FAQ',
    badgeLabel:   'නිතර අසන පැන',
    pageSub:      'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය, අපගේ සේවාවන් සහ කාර්යාලය සමඟ ක්‍රියා කිරීම ගැන පොදු ප්‍රශ්නවලට පිළිතුරු සොයා ගන්න.',
    breadHome:    'මුල් පිටුව',
    breadCur:     'නිතර අසන පැන',
    backHome:     'මුල් පිටුවට',
    contactUs:    'අප අමතන්න',
    introTitle:   'නිතර අසන ප්‍රශ්න',
    introSub:     'සේවාවන්, සැලසුම්, වාර්තා, බාගත කිරීම්, අංශ සහ මහජන තොරතුරු සම්බන්ධ පොදු ප්‍රශ්න සඳහා පිළිතුරු සොයා ගන්න.',
    searchPh:     'ප්‍රශ්න සොයන්න…',
    searchLabel:  'FAQ සොයන්න',
    noResults:    'ඔබගේ සෙවුමට ගැලපෙන ප්‍රශ්න නොමැත.',
    noResultsSub: 'වෙනත් මූල පදයක් උත්සාහ කරන්න.',
    catAll:       'සියල්ල',
    catGeneral:   'සාමාන්‍ය',
    catPlanning:  'සැලසුම්',
    catDownloads: 'බාගත කිරීම්',
    catReports:   'වාර්තා',
    catDepts:     'අංශ',
    catTech:      'තාක්ෂණික සහාය',
    helpTitle:    'තවත් සහාය අවශ්‍යද?',
    helpSub:      'තවදුරටත් මඟ පෙන්වීම සඳහා සැලසුම් ලේකම් කාර්යාලය අමතන්න.',
    helpContact:  'අප අමතන්න',
    helpDir:      'දුරකථන නාමාවලිය',
    snhTitle:     'තවමත් පිළිතුර සොයාගත නොහැකිද?',
    snhSub:       'කාර්යාල වේලාවන් තුළ ඔබගේ ඕනෑම ප්‍රශ්නයකට සහාය දීමට අපගේ කණ්ඩායම සූදානම්.',
    snhBtn:       'පණිවිඩයක් එවන්න',
    snhHours:     'කාර්යාල වේලාවන්: සඳු – සිකු · පෙ.ව. 8:30 – ප.ව. 4:15',
    snhEmail:     'info@sppsgn.lk',
  },
  ta: {
    heroAccent:   'தென் மாகாண திட்டமிடல் செயலகம்',
    pageTitle:    'FAQ',
    badgeLabel:   'கேள்வி-பதில்',
    pageSub:      'தென் மாகாண திட்டமிடல் செயலகம், எங்கள் சேவைகள் மற்றும் அலுவலகத்துடன் தொடர்புகொள்வது பற்றிய பொதுவான கேள்விகளுக்கு பதில்கள் காணுங்கள்.',
    breadHome:    'முகப்பு',
    breadCur:     'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    backHome:     'முகப்புக்கு',
    contactUs:    'தொடர்பு கொள்ளுங்கள்',
    introTitle:   'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    introSub:     'சேவைகள், திட்டமிடல், அறிக்கைகள், பதிவிறக்கங்கள், துறைகள் மற்றும் பொதுத் தகவல்கள் தொடர்பான பொதுவான கேள்விகளுக்கான பதில்களை கண்டறியுங்கள்.',
    searchPh:     'கேள்விகளை தேடுங்கள்…',
    searchLabel:  'FAQ தேடுக',
    noResults:    'உங்கள் தேடலுக்கு பொருந்தும் கேள்விகள் இல்லை.',
    noResultsSub: 'வேறு முக்கிய வார்த்தையை முயற்சிக்கவும்.',
    catAll:       'அனைத்தும்',
    catGeneral:   'பொது',
    catPlanning:  'திட்டமிடல்',
    catDownloads: 'பதிவிறக்கங்கள்',
    catReports:   'அறிக்கைகள்',
    catDepts:     'துறைகள்',
    catTech:      'தொழில்நுட்ப ஆதரவு',
    helpTitle:    'மேலும் உதவி தேவையா?',
    helpSub:      'மேலும் வழிகாட்டுதலுக்கு திட்டமிடல் செயலகத்தை தொடர்பு கொள்ளுங்கள்.',
    helpContact:  'தொடர்பு கொள்ளுங்கள்',
    helpDir:      'தொலைபேசி அட்டவணை',
    snhTitle:     'இன்னும் உங்கள் பதிலைக் காணவில்லையா?',
    snhSub:       'அலுவலக நேரங்களில் உங்கள் கேள்விகளுக்கு உதவ எங்கள் குழு தயாராக உள்ளது.',
    snhBtn:       'செய்தி அனுப்புங்கள்',
    snhHours:     'அலுவலக நேரம்: திங் – வெள் · 8:30 AM – 4:15 PM',
    snhEmail:     'info@sppsgn.lk',
  },
}

/* ─── FAQ Data ──────────────────────────────────────────────────────────────── */
const faqData = {
  en: [
    /* General */
    {
      id:       'g1',
      category: 'general',
      q:        'What is the Southern Province Planning Secretariat?',
      a:        'The Southern Province Planning Secretariat is the apex planning body responsible for coordinating, monitoring, and evaluating the development activities within the Southern Province. It operates under the Southern Provincial Council.',
    },
    {
      id:       'g2',
      category: 'general',
      q:        'Where is the Planning Secretariat located?',
      a:        'The Planning Secretariat is located in Galle, the provincial capital of the Southern Province. The exact address and directions can be found on our Contact page.',
    },
    {
      id:       'g3',
      category: 'general',
      q:        'What are the office hours of the Planning Secretariat?',
      a:        'Our office is open Monday to Friday from 8:30 AM to 4:15 PM. We are closed on public holidays and Mercantile holidays. For urgent matters, please use the Contact page to send an inquiry.',
    },
    {
      id:       'g4',
      category: 'general',
      q:        'How can I contact the Planning Secretariat?',
      a:        'You may contact us through the Contact page on this website, by telephone using numbers listed in the Telephone Directory, or by visiting the office in person during working hours.',
    },
    {
      id:       'g5',
      category: 'general',
      q:        'Is this portal available in Sinhala and Tamil?',
      a:        'Yes. This portal supports three languages — English, Sinhala, and Tamil. You can switch languages using the language selector in the navigation bar at the top of the page.',
    },
    {
      id:       'g6',
      category: 'general',
      q:        'What is the key role of the Planning Secretariat?',
      a:        'The key role of the Southern Province Planning Secretariat is to coordinate, monitor, and evaluate all development activities within the Southern Province. It formulates provincial development plans, allocates resources across provincial ministries and departments, provides technical planning guidance, and ensures that development goals align with national and provincial policies. It also serves as the central body for compiling and publishing provincial statistics, reports, and development data.',
    },
    /* Planning */
    {
      id:       'p0',
      category: 'planning',
      q:        'How do I find out about development projects in the Southern Province?',
      a:        'You can find information about development projects through several channels on this portal. The Projects section lists current and past special development programmes. The Reports section contains progress reports and annual summaries of ongoing provincial projects. You may also visit the Downloads section for project-related publications, or contact the Planning Secretariat directly for specific project inquiries.',
    },
    {
      id:       'p1',
      category: 'planning',
      q:        'What is the Annual Development Plan?',
      a:        'The Annual Development Plan (ADP) is a comprehensive document prepared each fiscal year outlining the capital and recurrent expenditure proposals for all provincial departments and institutions. It guides resource allocation within the Southern Province.',
    },
    {
      id:       'p2',
      category: 'planning',
      q:        'How is the Provincial Development Plan prepared?',
      a:        'The Provincial Development Plan is prepared through a consultative process involving all provincial line ministries, departments, divisional secretariats, and public stakeholders. The Planning Secretariat coordinates this process and consolidates the final plan.',
    },
    {
      id:       'p3',
      category: 'planning',
      q:        'How can I submit a development proposal to the Secretariat?',
      a:        'Development proposals should be submitted through the relevant provincial ministry or divisional secretariat. Community organisations and NGOs may also submit proposals using the formal request procedure outlined on the Contact page.',
    },
    {
      id:       'p4',
      category: 'planning',
      q:        'What development projects are currently active in the Southern Province?',
      a:        'A list of active development projects is updated periodically. Please refer to the Projects section or the Reports section for the latest updates on ongoing provincial development activities.',
    },
    {
      id:       'p5',
      category: 'planning',
      q:        'How does the Planning Secretariat monitor development projects?',
      a:        'The Secretariat conducts regular physical and financial monitoring of all approved provincial development projects. Monthly, quarterly, and annual progress reports are compiled and submitted to the Provincial Council and line ministries.',
    },
    /* Downloads */
    {
      id:       'd1',
      category: 'downloads',
      q:        'What types of documents are available for download?',
      a:        'The Downloads section provides access to provincial development plans, annual reports, statistical publications, forms, circulars, guidelines, and other official government documents relevant to the Southern Province.',
    },
    {
      id:       'd2',
      category: 'downloads',
      q:        'How can I download provincial reports?',
      a:        'Reports can be downloaded through the Downloads section available on this website. Select the relevant category, choose the year, and click the download button to save the PDF document.',
    },
    {
      id:       'd3',
      category: 'downloads',
      q:        'Are the downloads free of charge?',
      a:        'Yes. All documents and reports made available through this portal are provided free of charge as part of our public information service.',
    },
    {
      id:       'd4',
      category: 'downloads',
      q:        'The download link is not working. What should I do?',
      a:        'If you experience difficulty downloading a document, please try refreshing the page or clearing your browser cache. If the issue persists, contact the Technical Support team using the Contact page.',
    },
    {
      id:       'd5',
      category: 'downloads',
      q:        'Can I request a document that is not listed in the Downloads section?',
      a:        'Yes. For documents not currently listed, please submit a request through the Contact page. Requests are handled in accordance with the Right to Information (RTI) Act where applicable.',
    },
    /* Reports */
    {
      id:       'r1',
      category: 'reports',
      q:        'Where can I find the Annual Report of the Planning Secretariat?',
      a:        'The Annual Report is available in the Reports section of this portal. Reports are published annually after the financial year concludes and are subject to auditing before publication.',
    },
    {
      id:       'r2',
      category: 'reports',
      q:        'How often are progress reports published?',
      a:        'The Planning Secretariat publishes quarterly progress reports and an annual consolidated report. Special reports may also be published for specific development programmes or ministerial directives.',
    },
    {
      id:       'r3',
      category: 'reports',
      q:        'Are statistical data reports available to the public?',
      a:        'Yes. Provincial statistical data, including population, land use, economic indicators, and sector-specific data, are published periodically and available through the Downloads section.',
    },
    {
      id:       'r4',
      category: 'reports',
      q:        'Who audits the financial reports of the Planning Secretariat?',
      a:        'All financial statements and reports of the Planning Secretariat are subject to audit by the Auditor General\'s Department under the provisions of the Finance Act and the Constitution of Sri Lanka.',
    },
    {
      id:       'r5',
      category: 'reports',
      q:        'Can I access historical reports from previous years?',
      a:        'Historical reports from previous years are archived and can be accessed through the Reports section. If older documents are not available online, a formal request can be submitted through the Contact page.',
    },
    /* Departments */
    {
      id:       'dep1',
      category: 'departments',
      q:        'Which divisions come under the Southern Provincial Council?',
      a:        'The Southern Provincial Council oversees a wide range of divisions including Education, Health, Agriculture, Local Government, Roads & Bridges, Irrigation, Industries, and Cultural Affairs, among others.',
    },
    {
      id:       'dep2',
      category: 'departments',
      q:        'How do I contact a specific division?',
      a:        'Contact details for all provincial divisions, including telephone numbers, email addresses, and physical locations, are listed in the Telephone Directory available through the Contact page.',
    },
    {
      id:       'dep3',
      category: 'departments',
      q:        'What services does the Division of Agriculture provide to the public?',
      a:        'The Provincial Division of Agriculture provides advisory services, fertiliser subsidies, seed distribution, training programmes, and technical support to farmers within the Southern Province.',
    },
    {
      id:       'dep4',
      category: 'departments',
      q:        'How can I find information about educational institutions under the Southern Province?',
      a:        'Information on government schools, technical colleges, and educational institutions under the Southern Provincial Education Division is available through the Divisions section of this portal.',
    },
    {
      id:       'dep5',
      category: 'departments',
      q:        'Can citizens submit complaints about a specific division?',
      a:        'Yes. Complaints can be submitted in writing to the relevant provincial ministry or to the Planning Secretariat. You may also use the Contact page to send your inquiry, and it will be directed to the relevant authority.',
    },
    /* Technical Support */
    {
      id:       't1',
      category: 'tech',
      q:        'The website is not loading properly. What should I do?',
      a:        'Please try refreshing the page or clearing your browser\'s cache and cookies. Ensure your browser is up to date. If the problem persists, contact our Technical Support team through the Contact page.',
    },
    {
      id:       't2',
      category: 'tech',
      q:        'Which browsers are supported by this portal?',
      a:        'This portal is optimised for modern browsers including Google Chrome, Mozilla Firefox, Microsoft Edge, and Apple Safari. For the best experience, use the latest version of your preferred browser.',
    },
    {
      id:       't3',
      category: 'tech',
      q:        'How do I report a broken link or missing document?',
      a:        'If you find a broken link or missing document, please report it using the Contact page. Include the page name and the nature of the issue so our technical team can address it promptly.',
    },
    {
      id:       't4',
      category: 'tech',
      q:        'Is the portal accessible on mobile devices?',
      a:        'Yes. This portal is fully responsive and designed to work on all device types including smartphones, tablets, laptops, desktops, and large screens.',
    },
    {
      id:       't5',
      category: 'tech',
      q:        'How do I change the language of the portal?',
      a:        'Click the language selector in the navigation bar at the top of the page and choose your preferred language — English, Sinhala, or Tamil. The selection is saved for future visits.',
    },
  ],
  si: [
    /* General */
    {
      id:       'g1',
      category: 'general',
      q:        'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය කුමක්ද?',
      a:        'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය යනු දකුණු පළාත් සංවර්ධන කටයුතු සම්බන්ධීකරණය, අධීක්ෂණය සහ ඇගයීම සඳහා වගකිව යුතු ශ්‍රේෂ්ඨ සැලසුම් ආයතනයයි. එය දකුණු පළාත් සභාව යටතේ ක්‍රියාත්මක වේ.',
    },
    {
      id:       'g2',
      category: 'general',
      q:        'සැලසුම් ලේකම් කාර්යාලය පිහිටා ඇත්තේ කොතැනද?',
      a:        'දකුණු පළාතේ පළාත් අගනුවර වන ගාල්ලෙහි සැලසුම් ලේකම් කාර්යාලය පිහිටා ඇත. නිශ්චිත ලිපිනය සහ දිශාවන් අප අමතන්න පිටුවෙහි ඇත.',
    },
    {
      id:       'g3',
      category: 'general',
      q:        'සැලසුම් ලේකම් කාර්යාලයේ කාර්යාල වේලාවන් මොනවාද?',
      a:        'අපගේ කාර්යාලය සඳුදා සිට සිකුරාදා දක්වා පෙ.ව. 8:30 සිට ප.ව. 4:15 දක්වා විවෘතව ඇත. රජයේ නිවාඩු දිනවල අපි වසා ඇත.',
    },
    {
      id:       'g4',
      category: 'general',
      q:        'සැලසුම් ලේකම් කාර්යාලය ඇමතිය හැකි ආකාරය කෙසේද?',
      a:        'මෙම වෙබ් අඩවියේ අප අමතන්න පිටුව හරහා, දුරකථන නාමාවලියේ ඇති අංකවලට ඇමතීමෙන්, හෝ කාර්යාල වේලාවන්හිදී ශාරීරිකව පැමිණීමෙන් ඔබට අපව ඇමතිය හැකිය.',
    },
    {
      id:       'g5',
      category: 'general',
      q:        'මෙම ද්වාරය සිංහල සහ දමිළ භාෂාවලින් ලබා ගත හැකිද?',
      a:        'ඔව්. මෙම ද්වාරය ඉංග්‍රීසි, සිංහල සහ දමිළ යන භාෂා තිනකට සහය දක්වයි. ගොනුව ඉහළින් ඇති සංචාලන තීරුවේ භාෂා තෝරාගෙනීමෙන් ඔබට භාෂාව වෙනස් කළ හැකිය.',
    },
    {
      id:       'g6',
      category: 'general',
      q:        'සැලසුම් ලේකම් කාර්යාලයේ ප්‍රධාන කාර්යභාරය කුමක්ද?',
      a:        'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලයේ ප්‍රධාන කාර්යභාරය වන්නේ දකුණු පළාත තුළ සියලු සංවර්ධන කටයුතු සම්බන්ධීකරණය, අධීක්ෂණය සහ ඇගයීමයි. එය පළාත් සංවර්ධන සැලසුම් සකස් කිරීම, පළාත් අමාත්‍යාංශ හා අංශ හරහා සම්පත් වෙන් කිරීම, තාක්ෂණික සැලසුම් මඟ පෙන්වීම ලබා දීම සහ සංවර්ධන ඉලක්ක ජාතික හා පළාත් ප්‍රතිපත්තිවලට අනුකූල බව සහතික කිරීම ඇතුළත් කරයි.',
    },
    /* Planning */
    {
      id:       'p0',
      category: 'planning',
      q:        'දකුණු පළාතේ සංවර්ධන ව්‍යාපෘති ගැන දැනගත හැකි ආකාරය කෙසේද?',
      a:        'මෙම ද්වාරයේ ව්‍යාපෘති කොටස, වාර්තා කොටස සහ බාගත කිරීමේ කොටස හරහා සංවර්ධන ව්‍යාපෘති ගැන තොරතුරු ලබා ගත හැකිය. නිශ්චිත ව්‍යාපෘති විමසීම් සඳහා සැලසුම් ලේකම් කාර්යාලය සෙirect ද ඇමතිය හැකිය.',
    },
    {
      id:       'p1',
      category: 'planning',
      q:        'වාර්ෂික සංවර්ධන සැලැස්ම යනු කුමක්ද?',
      a:        'වාර්ෂික සංවර්ධන සැලැස්ම (ADP) යනු සෑම මූල්‍ය වර්ෂයකම සකස් කරන ලද ප්‍රාන්ත අංශ සහ ආයතන සඳහා ප්‍රාග්ධන සහ ජංගම වියදම් යෝජනා ඉදිරිපත් කරන ලියවිල්ලකි.',
    },
    {
      id:       'p2',
      category: 'planning',
      q:        'පළාත් සංවර්ධන සැලැස්ම සකස් කරන ආකාරය කෙසේද?',
      a:        'පළාත් සංවර්ධන සැලැස්ම සාකච්ඡා ක්‍රියාවලියක් හරහා සකස් කෙරේ. සැලසුම් ලේකම් කාර්යාලය මෙම ක්‍රියාවලිය සම්බන්ධීකරණය කර අවසාන සැලැස්ම ඒකාබද්ධ කරයි.',
    },
    {
      id:       'p3',
      category: 'planning',
      q:        'සංවර්ධන යෝජනාවක් ලේකම් කාර්යාලයට ඉදිරිපත් කළ හැකිද?',
      a:        'සංවර්ධන යෝජනා අදාළ පළාත් අමාත්‍යාංශය හෝ ප්‍රාදේශීය ලේකම් කාර්යාලය හරහා ඉදිරිපත් කළ යුතුය. ප්‍රජා සංවිධාන සහ රාජ්‍ය නොවන සංවිධාන වෙනත් ක්‍රමවේදයක් හරහා යෝජනා ඉදිරිපත් කළ හැකිය.',
    },
    {
      id:       'p4',
      category: 'planning',
      q:        'දකුණු පළාතේ දැනට ක්‍රියාත්මක සංවර්ධන ව්‍යාපෘති මොනවාද?',
      a:        'ක්‍රියාකාරී සංවර්ධන ව්‍යාපෘතිවල ලැයිස්තුව කාලීනව යාවත්කාලීන කෙරේ. නවතම තොරතුරු සඳහා ව්‍යාපෘති කොටස හෝ වාර්තා කොටස බලන්න.',
    },
    {
      id:       'p5',
      category: 'planning',
      q:        'සැලසුම් ලේකම් කාර්යාලය ව්‍යාපෘති නිරීක්ෂණය කරන ආකාරය කෙසේද?',
      a:        'ලේකම් කාර්යාලය අනුමත ව්‍යාපෘතිවල ශාරීරික සහ මූල්‍ය නිරීක්ෂණය නිතිපතා සිදු කරයි. මාසික, ත්‍රෛමාසික සහ වාර්ෂික ප්‍රගති වාර්තා සකස් කෙරේ.',
    },
    /* Downloads */
    {
      id:       'd1',
      category: 'downloads',
      q:        'බාගත කිරීමට ලබා ගත හැකි ලේඛනවල වර්ග මොනවාද?',
      a:        'බාගත කිරීමේ කොටස හරහා පළාත් සංවර්ධන සැලසුම්, වාර්ෂික වාර්තා, සංඛ්‍යාන ප්‍රකාශන, ආකෘති, චක්‍රලේඛ, මාර්ගෝපදේශ සහ නිල ලේඛන ලබා ගත හැකිය.',
    },
    {
      id:       'd2',
      category: 'downloads',
      q:        'පළාත් වාර්තා බාගත කර ගත හැකි ආකාරය කෙසේද?',
      a:        'මෙම වෙබ් අඩවියේ ඇති බාගත කිරීමේ කොටස හරහා වාර්තා බාගත කර ගත හැකිය. අදාළ ප්‍රවර්ගය, වර්ෂය තෝරා, PDF ලේඛනය සුරැකීමට බාගත කිරීමේ බොත්තම ක්ලික් කරන්න.',
    },
    {
      id:       'd3',
      category: 'downloads',
      q:        'බාගත කිරීම් නොමිලේ ලබා ගත හැකිද?',
      a:        'ඔව්. මෙම ද්වාරය හරහා ලබා ගත හැකි සියලු ලේඛන සහ වාර්තා මහජන තොරතුරු සේවාවේ කොටසක් ලෙස නොමිලේ ලබා දෙනු ලැබේ.',
    },
    {
      id:       'd4',
      category: 'downloads',
      q:        'බාගත කිරීමේ සබැඳිය ක්‍රියාත්මක නොවේ. කුමක් කළ යුතුද?',
      a:        'ලේඛනයක් බාගත කිරීමේ දුෂ්කරතා ඇත්නම් පිටුව නැවත ලෝඩ් කිරීමට හෝ බ්‍රව්සරයේ හැඹිලිය ඉවත් කිරීමට උත්සාහ කරන්න. ගැටළුව දිගටම පවතී නම්, අප අමතන්න.',
    },
    {
      id:       'd5',
      category: 'downloads',
      q:        'ලැයිස්තුවේ නොමැති ලේඛනයක් ඉල්ලීම් කළ හැකිද?',
      a:        'ඔව්. දැනට ලැයිස්තු නොකළ ලේඛන සඳහා අප අමතන්න පිටුව හරහා ඉල්ලීමක් ඉදිරිපත් කරන්න. ඉල්ලීම් RTI පනත අනුව හැසිරවීමට ලක් කෙරේ.',
    },
    /* Reports */
    {
      id:       'r1',
      category: 'reports',
      q:        'සැලසුම් ලේකම් කාර්යාලයේ වාර්ෂික වාර්තාව කොතැනින් ලබා ගත හැකිද?',
      a:        'වාර්ෂික වාර්තාව මෙම ද්වාරයේ වාර්තා කොටසෙහි ඇත. වාර්තා, මූල්‍ය වර්ෂය නිමාවෙන් පසු, විගණනයට ලක් කිරීමෙන් පසු ප්‍රකාශිත කෙරේ.',
    },
    {
      id:       'r2',
      category: 'reports',
      q:        'ප්‍රගති වාර්තා කොතරම් නිතරක් ප්‍රකාශිත කෙරේද?',
      a:        'සැලසුම් ලේකම් කාර්යාලය ත්‍රෛමාසික ප්‍රගති වාර්තා සහ වාර්ෂික ඒකාබද්ධ වාර්තාව ප්‍රකාශිත කරයි. විශේෂ ව්‍යාපෘතිවලට ගැළපෙන ලෙස විශේෂ වාර්තා ද ප්‍රකාශිත කෙරිය හැකිය.',
    },
    {
      id:       'r3',
      category: 'reports',
      q:        'සංඛ්‍යාන දත්ත වාර්තා මහජනයාට ලබා ගත හැකිද?',
      a:        'ඔව්. ජනගහනය, ඉඩම් භාවිතය, ආර්ථික දර්ශකයන් ඇතුළු පළාත් සංඛ්‍යාන දත්ත කාලීනව ප්‍රකාශිත කෙරෙන අතර බාගත කිරීමේ කොටස හරහා ලබා ගත හැකිය.',
    },
    {
      id:       'r4',
      category: 'reports',
      q:        'සැලසුම් ලේකම් කාර්යාලයේ මූල්‍ය වාර්තා විගණනය කරන්නේ කවුද?',
      a:        'සැලසුම් ලේකම් කාර්යාලයේ සියලු මූල්‍ය ප්‍රකාශ සහ වාර්තා ශ්‍රී ලංකාවේ ආණ්ඩුක්‍රම ව්‍යවස්ථාව සහ මූල්‍ය පනතේ විධිවිධාන යටතේ ගාණකාධිකාරී අංශය මඟින් විගණනය කෙරේ.',
    },
    {
      id:       'r5',
      category: 'reports',
      q:        'පෙර වර්ෂවල ඓතිහාසික වාර්තා ලබා ගත හැකිද?',
      a:        'පෙර වර්ෂවල ඓතිහාසික වාර්තා ලේඛනාගාරගත කෙරෙන අතර වාර්තා කොටස හරහා ලබා ගත හැකිය. පැරණි ලේඛන මාර්ගගතව නොමැති නම්, අප අමතන්න.',
    },
    /* Departments */
    {
      id:       'dep1',
      category: 'departments',
      q:        'දකුණු පළාත් සභාව යටතේ ඇති අංශ මොනවාද?',
      a:        'දකුණු පළාත් සභාව යටතේ අධ්‍යාපනය, සෞඛ්‍ය, කෘෂිකර්මය, පළාත් පාලනය, මාර්ග හා පාලම්, වාරිමාර්ග, කර්මාන්ත සහ සංස්කෘතික කටයුතු ඇතුළු අංශ රාශියක් ඇත.',
    },
    {
      id:       'dep2',
      category: 'departments',
      q:        'නිශ්චිත අංශයකට ඇමතිය හැකි ආකාරය කෙසේද?',
      a:        'සියලු පළාත් අංශ සඳහා දුරකථන අංකද ඇතුළු ඇමතිය හැකි විස්තර, අප අමතන්න පිටුවෙහි ඇති දුරකථන නාමාවලියෙහි ලැයිස්තු ගත කෙරේ.',
    },
    {
      id:       'dep3',
      category: 'departments',
      q:        'කෘෂිකර්ම අංශය මහජනයාට ලබා දෙන සේවා මොනවාද?',
      a:        'පළාත් කෘෂිකර්ම අංශය උපදේශන සේවා, පොහොර සහනාධාර, බීජ බෙදා හැරීම, පුහුණු වැඩසටහන් සහ කෘෂිකරුවන්ට තාක්ෂණික සහාය ලබා දේ.',
    },
    {
      id:       'dep4',
      category: 'departments',
      q:        'දකුණු පළාත යටතේ ශිෂ්‍ය ආයතන ගැන තොරතුරු ලබා ගත හැකිද?',
      a:        'දකුණු පළාත් අධ්‍යාපන අංශය යටතේ ඇති රාජ්‍ය පාසල්, තාක්ෂණික විද්‍යාලද ඇතුළු ශිෂ්‍ය ආයතන ගැන මෙම ද්වාරයේ අංශ කොටස හරහා ලබා ගත හැකිය.',
    },
    {
      id:       'dep5',
      category: 'departments',
      q:        'නිශ්චිත අංශයකට ගැන පෙත්සම් ගොනු කළ හැකිද?',
      a:        'ඔව්. පෙත්සම් අදාළ පළාත් අමාත්‍යාංශයට හෝ සැලසුම් ලේකම් කාර්යාලයට ලිඛිතව ඉදිරිපත් කළ හැකිය. ඔබේ විමසීම යොමු කිරීමට අප අමතන්න පිටුව ද භාවිතා කළ හැකිය.',
    },
    /* Tech */
    {
      id:       't1',
      category: 'tech',
      q:        'වෙබ් අඩවිය නිවැරදිව ලෝඩ් නොවේ. කුමක් කළ යුතුද?',
      a:        'කරුණාකර පිටුව නැවත ලෝඩ් කිරීමට හෝ බ්‍රව්සරයේ හැඹිලිය ඉවත් කිරීමට උත්සාහ කරන්න. ගැටළුව දිගටම පවතී නම්, අප අමතන්න.',
    },
    {
      id:       't2',
      category: 'tech',
      q:        'මෙම ද්වාරය සඳහා සහාය දක්වන බ්‍රව්සර මොනවාද?',
      a:        'Google Chrome, Mozilla Firefox, Microsoft Edge, Apple Safari ඇතුළු නවීන බ්‍රව්සර සඳහා ද්වාරය ප්‍රශස්ත කෙරේ. හොඳම අත්දැකීම සඳහා නවතම අනුවාදය භාවිතා කරන්න.',
    },
    {
      id:       't3',
      category: 'tech',
      q:        'කැඩුණු සබැඳියක් හෝ අස්ථිතිත ලේඛනයක් වාර්තා කිරීම.',
      a:        'ඔබ කැඩුණු සබැඳියක් හෝ නොතිබෙන ලේඛනයක් සොයා ගත්හොත් කරුණාකර අප අමතන්න හරහා වාර්තා කරන්න.',
    },
    {
      id:       't4',
      category: 'tech',
      q:        'ජංගම උපාංගවල ද්වාරය ක්‍රියාකාරීද?',
      a:        'ඔව්. ස්මාර්ට්ෆෝන, ටැබ්ලට, ලැප්ටොප්, ඩෙස්ක්ටොප් ඇතුළු සියලු උපාංග සඳහා ද්වාරය ප්‍රශස්ත කෙරේ.',
    },
    {
      id:       't5',
      category: 'tech',
      q:        'ද්වාරයේ භාෂාව වෙනස් කළ හැකි ආකාරය කෙසේද?',
      a:        'ගොනුවේ ඉහළින් ඇති සංචාලන තීරුවේ ඇති භාෂා තෝරාගෙනීම ක්ලික් කර ඔබ කැමති භාෂාව — ඉංග්‍රීසි, සිංහල හෝ දමිළ — තෝරාගන්න.',
    },
  ],
  ta: [
    /* General */
    {
      id:       'g1',
      category: 'general',
      q:        'தென் மாகாண திட்டமிடல் செயலகம் என்றால் என்ன?',
      a:        'தென் மாகாண திட்டமிடல் செயலகம் என்பது தென் மாகாணத்தில் உள்ள வளர்ச்சி நடவடிக்கைகளை ஒருங்கிணைத்தல், கண்காணித்தல் மற்றும் மதிப்பீடு செய்தலுக்கு பொறுப்பான உயர்நிலை திட்டமிடல் அமைப்பாகும். இது தென் மாகாண சபையின் கீழ் செயல்படுகிறது.',
    },
    {
      id:       'g2',
      category: 'general',
      q:        'திட்டமிடல் செயலகம் எங்கு அமைந்துள்ளது?',
      a:        'திட்டமிடல் செயலகம் தென் மாகாணத்தின் மாகாண தலைநகரான காலியில் அமைந்துள்ளது. சரியான முகவரி மற்றும் வழிகளை தொடர்பு பக்கத்தில் காணலாம்.',
    },
    {
      id:       'g3',
      category: 'general',
      q:        'திட்டமிடல் செயலகத்தின் அலுவலக நேரங்கள் என்ன?',
      a:        'எங்கள் அலுவலகம் திங்கள் முதல் வெள்ளி வரை காலை 8:30 மணி முதல் மாலை 4:15 மணி வரை திறந்திருக்கும். பொது விடுமுறை நாட்களில் மூடப்பட்டிருக்கும்.',
    },
    {
      id:       'g4',
      category: 'general',
      q:        'திட்டமிடல் செயலகத்தை எவ்வாறு தொடர்பு கொள்ளலாம்?',
      a:        'இந்த இணையதளத்தில் உள்ள தொடர்பு பக்கம் மூலம், தொலைபேசி அட்டவணையில் உள்ள எண்களில் அழைப்பதன் மூலம், அல்லது அலுவலக நேரங்களில் நேரில் வருவதன் மூலம் தொடர்பு கொள்ளலாம்.',
    },
    {
      id:       'g5',
      category: 'general',
      q:        'இந்த தளம் சிங்களம் மற்றும் தமிழில் கிடைக்கிறதா?',
      a:        'ஆம். இந்த தளம் ஆங்கிலம், சிங்களம் மற்றும் தமிழ் என மூன்று மொழிகளை ஆதரிக்கிறது. பக்கத்தின் மேல் உள்ள வழிசெலுத்தல் பட்டியில் உள்ள மொழி தேர்வியைப் பயன்படுத்தி மொழியை மாற்றலாம்.',
    },
    {
      id:       'g6',
      category: 'general',
      q:        'திட்டமிடல் செயலகத்தின் முக்கிய பங்கு என்ன?',
      a:        'தென் மாகாண திட்டமிடல் செயலகத்தின் முக்கிய பங்கு தென் மாகாணத்தில் உள்ள அனைத்து வளர்ச்சி நடவடிக்கைகளையும் ஒருங்கிணைத்தல், கண்காணித்தல் மற்றும் மதிப்பீடு செய்தலாகும். இது மாகாண வளர்ச்சி திட்டங்களை உருவாக்குதல், மாகாண அமைச்சகங்கள் மற்றும் திணைக்களங்களுக்கு வளங்களை ஒதுக்குதல், தொழில்நுட்ப திட்டமிடல் வழிகாட்டுதல் வழங்குதல் மற்றும் வளர்ச்சி இலக்குகள் தேசிய மற்றும் மாகாண கொள்கைகளுக்கு இணங்குவதை உறுதி செய்தல் ஆகியவற்றை உள்ளடக்குகிறது.',
    },
    /* Planning */
    {
      id:       'p0',
      category: 'planning',
      q:        'தென் மாகாணத்தில் உள்ள வளர்ச்சி திட்டங்களை எவ்வாறு அறிந்துகொள்வது?',
      a:        'இந்த தளத்தில் உள்ள திட்டங்கள் பிரிவு, அறிக்கைகள் பிரிவு மற்றும் பதிவிறக்கங்கள் பிரிவு மூலம் வளர்ச்சி திட்டங்கள் பற்றிய தகவல்களை பெறலாம். குறிப்பிட்ட திட்ட விசாரணைகளுக்கு திட்டமிடல் செயலகத்தை நேரடியாகவும் தொடர்பு கொள்ளலாம்.',
    },
    {
      id:       'p1',
      category: 'planning',
      q:        'ஆண்டு வளர்ச்சி திட்டம் என்றால் என்ன?',
      a:        'ஆண்டு வளர்ச்சி திட்டம் (ADP) என்பது ஒவ்வொரு நிதியாண்டிலும் தயாரிக்கப்படும் ஒரு விரிவான ஆவணமாகும். இது அனைத்து மாகாண துறைகளுக்கான மூலதன மற்றும் நடப்பு செலவு முன்மொழிவுகளை கோடிட்டுக் காட்டுகிறது.',
    },
    {
      id:       'p2',
      category: 'planning',
      q:        'மாகாண வளர்ச்சி திட்டம் எவ்வாறு தயாரிக்கப்படுகிறது?',
      a:        'மாகாண வளர்ச்சி திட்டம் ஆலோசனை செயல்முறை மூலம் தயாரிக்கப்படுகிறது. திட்டமிடல் செயலகம் இந்த செயல்முறையை ஒருங்கிணைக்கிறது.',
    },
    {
      id:       'p3',
      category: 'planning',
      q:        'வளர்ச்சி முன்மொழிவை செயலகத்திற்கு சமர்ப்பிக்க முடியுமா?',
      a:        'வளர்ச்சி முன்மொழிவுகள் தொடர்புடைய மாகாண அமைச்சகம் அல்லது பிரிவு செயலகம் மூலம் சமர்ப்பிக்கப்பட வேண்டும்.',
    },
    {
      id:       'p4',
      category: 'planning',
      q:        'தென் மாகாணத்தில் தற்போது செயலில் உள்ள வளர்ச்சி திட்டங்கள் யாவை?',
      a:        'செயலில் உள்ள வளர்ச்சி திட்டங்களின் பட்டியல் அவ்வப்போது புதுப்பிக்கப்படுகிறது. புதிய தகவல்களுக்கு திட்டங்கள் அல்லது அறிக்கைகள் பிரிவைப் பார்க்கவும்.',
    },
    {
      id:       'p5',
      category: 'planning',
      q:        'திட்டமிடல் செயலகம் வளர்ச்சி திட்டங்களை எவ்வாறு கண்காணிக்கிறது?',
      a:        'செயலகம் அங்கீகரிக்கப்பட்ட அனைத்து மாகாண வளர்ச்சி திட்டங்களின் உடல் மற்றும் நிதி கண்காணிப்பை தொடர்ந்து நடத்துகிறது.',
    },
    /* Downloads */
    {
      id:       'd1',
      category: 'downloads',
      q:        'பதிவிறக்கத்திற்கு கிடைக்கும் ஆவணங்கள் என்ன வகையானவை?',
      a:        'பதிவிறக்கங்கள் பிரிவில் மாகாண வளர்ச்சி திட்டங்கள், வருடாந்திர அறிக்கைகள், புள்ளிவிவர வெளியீடுகள், படிவங்கள், சுற்றறிக்கைகள் மற்றும் மார்க்கோட்டுகள் கிடைக்கின்றன.',
    },
    {
      id:       'd2',
      category: 'downloads',
      q:        'மாகாண அறிக்கைகளை எவ்வாறு பதிவிறக்கலாம்?',
      a:        'இந்த இணையதளத்தில் கிடைக்கும் பதிவிறக்கங்கள் பிரிவு மூலம் அறிக்கைகளை பதிவிறக்கலாம். தொடர்புடைய வகையைத் தேர்ந்தெடுத்து, ஆண்டைத் தேர்ந்தெடுத்து, PDF ஐ சேமிக்க பதிவிறக்க பொத்தானை கிளிக் செய்யுங்கள்.',
    },
    {
      id:       'd3',
      category: 'downloads',
      q:        'பதிவிறக்கங்கள் இலவசமா?',
      a:        'ஆம். இந்த தளம் மூலம் கிடைக்கும் அனைத்து ஆவணங்களும் அறிக்கைகளும் பொது தகவல் சேவையின் ஒரு பகுதியாக இலவசமாக வழங்கப்படுகின்றன.',
    },
    {
      id:       'd4',
      category: 'downloads',
      q:        'பதிவிறக்க இணைப்பு வேலை செய்யவில்லை. என்ன செய்வது?',
      a:        'தயவுசெய்து பக்கத்தை புதுப்பிக்க முயற்சிக்கவும் அல்லது உலாவியின் தற்காலிக சேமிப்பை அழிக்கவும். சிக்கல் தொடர்ந்தால் தொடர்பு பக்கம் மூலம் தொழில்நுட்ப ஆதரவு குழுவை தொடர்பு கொள்ளுங்கள்.',
    },
    {
      id:       'd5',
      category: 'downloads',
      q:        'பதிவிறக்கங்கள் பிரிவில் இல்லாத ஆவணத்தை கோரலாமா?',
      a:        'ஆம். தற்போது பட்டியலிடப்படாத ஆவணங்களுக்கு தொடர்பு பக்கம் மூலம் கோரிக்கை சமர்ப்பிக்கவும். கோரிக்கைகள் RTI சட்டத்திற்கு அமைய கையாளப்படும்.',
    },
    /* Reports */
    {
      id:       'r1',
      category: 'reports',
      q:        'திட்டமிடல் செயலகத்தின் வருடாந்திர அறிக்கையை எங்கு காணலாம்?',
      a:        'வருடாந்திர அறிக்கை இந்த தளத்தின் அறிக்கைகள் பிரிவில் கிடைக்கிறது. நிதியாண்டு முடிந்தவுடன் தணிக்கைக்கு உட்பட்டு வருடாந்திரமாக வெளியிடப்படுகிறது.',
    },
    {
      id:       'r2',
      category: 'reports',
      q:        'முன்னேற்ற அறிக்கைகள் எவ்வளவு அடிக்கடி வெளியிடப்படுகின்றன?',
      a:        'திட்டமிடல் செயலகம் காலாண்டு முன்னேற்ற அறிக்கைகளையும் ஆண்டு ஒருங்கிணைந்த அறிக்கையையும் வெளியிடுகிறது.',
    },
    {
      id:       'r3',
      category: 'reports',
      q:        'புள்ளியியல் தரவு அறிக்கைகள் பொதுமக்களுக்கு கிடைக்குமா?',
      a:        'ஆம். மக்கள்தொகை, நில பயன்பாடு, பொருளாதார குறியீடுகள் உட்பட மாகாண புள்ளியியல் தரவுகள் அவ்வப்போது வெளியிடப்பட்டு பதிவிறக்கங்கள் பிரிவு மூலம் கிடைக்கின்றன.',
    },
    {
      id:       'r4',
      category: 'reports',
      q:        'திட்டமிடல் செயலகத்தின் நிதி அறிக்கைகளை யார் தணிக்கை செய்கிறார்கள்?',
      a:        'திட்டமிடல் செயலகத்தின் அனைத்து நிதி அறிக்கைகளும் இலங்கை அரசியலமைப்பு மற்றும் நிதிச் சட்டத்தின் கீழ் தணிக்கையர் நாயக வழங்கலர் திணைக்களத்தால் தணிக்கை செய்யப்படுகின்றன.',
    },
    {
      id:       'r5',
      category: 'reports',
      q:        'முந்தைய ஆண்டுகளின் வரலாற்று அறிக்கைகளை அணுகலாமா?',
      a:        'முந்தைய ஆண்டுகளின் வரலாற்று அறிக்கைகள் காப்பகப்படுத்தப்பட்டு அறிக்கைகள் பிரிவு மூலம் அணுகலாம். பழைய ஆவணங்கள் ஆன்லைனில் இல்லாவிட்டால் தொடர்பு பக்கம் மூலம் கோரிக்கை சமர்ப்பிக்கலாம்.',
    },
    /* Departments */
    {
      id:       'dep1',
      category: 'departments',
      q:        'தென் மாகாண சபையின் கீழ் எந்த துறைகள் வருகின்றன?',
      a:        'தென் மாகாண சபையின் கீழ் கல்வி, சுகாதாரம், வேளாண்மை, உள்ளாட்சி, சாலைகள் & பாலங்கள், நீர்ப்பாசனம், தொழில்கள் மற்றும் கலாச்சார விவகாரங்கள் உட்பட பல துறைகள் உள்ளன.',
    },
    {
      id:       'dep2',
      category: 'departments',
      q:        'குறிப்பிட்ட துறையை எவ்வாறு தொடர்பு கொள்வது?',
      a:        'அனைத்து மாகாண துறைகளுக்கான தொடர்பு விவரங்கள், தொலைபேசி எண்கள் உட்பட, தொடர்பு பக்கத்தில் உள்ள தொலைபேசி அட்டவணையில் பட்டியலிடப்பட்டுள்ளன.',
    },
    {
      id:       'dep3',
      category: 'departments',
      q:        'வேளாண்மை திணைக்களம் பொதுமக்களுக்கு என்ன சேவைகளை வழங்குகிறது?',
      a:        'மாகாண வேளாண்மை திணைக்களம் தென் மாகாணத்தில் உள்ள விவசாயிகளுக்கு ஆலோசனை சேவைகள், உரம் மானியங்கள், விதை விநியோகம், பயிற்சி திட்டங்கள் மற்றும் தொழில்நுட்ப ஆதரவு வழங்குகிறது.',
    },
    {
      id:       'dep4',
      category: 'departments',
      q:        'தென் மாகாணத்தின் கீழ் உள்ள கல்வி நிறுவனங்கள் பற்றிய தகவல்களை எங்கே பெறலாம்?',
      a:        'தென் மாகாண கல்வித் திணைக்களத்தின் கீழ் உள்ள அரசு பள்ளிகள், தொழில்நுட்ப கல்லூரிகள் மற்றும் கல்வி நிறுவனங்கள் பற்றிய தகவல்கள் இந்த தளத்தின் துறைகள் பிரிவில் கிடைக்கின்றன.',
    },
    {
      id:       'dep5',
      category: 'departments',
      q:        'குடிமக்கள் குறிப்பிட்ட துறையைப் பற்றி புகார் அளிக்கலாமா?',
      a:        'ஆம். புகார்கள் தொடர்புடைய மாகாண அமைச்சகம் அல்லது திட்டமிடல் செயலகத்திற்கு எழுத்துப்பூர்வமாக சமர்ப்பிக்கலாம். தொடர்பு பக்கம் மூலமும் விசாரணை அனுப்பலாம்.',
    },
    /* Tech */
    {
      id:       't1',
      category: 'tech',
      q:        'இணையதளம் சரியாக ஏற்றப்படவில்லை. என்ன செய்வது?',
      a:        'தயவுசெய்து பக்கத்தை புதுப்பிக்க முயற்சிக்கவும் அல்லது உலாவியின் தற்காலிக சேமிப்பு மற்றும் குக்கீகளை அழிக்கவும். சிக்கல் தொடர்ந்தால் தொடர்பு பக்கம் மூலம் ஆதரவு குழுவை தொடர்பு கொள்ளுங்கள்.',
    },
    {
      id:       't2',
      category: 'tech',
      q:        'இந்த தளத்தை ஆதரிக்கும் உலாவிகள் எவை?',
      a:        'Google Chrome, Mozilla Firefox, Microsoft Edge மற்றும் Apple Safari உட்பட நவீன உலாவிகளுக்கு தளம் உகந்ததாக உள்ளது. சிறந்த அனுபவத்திற்கு உங்கள் உலாவியின் சமீபத்திய பதிப்பைப் பயன்படுத்துங்கள்.',
    },
    {
      id:       't3',
      category: 'tech',
      q:        'உடைந்த இணைப்பு அல்லது காணாமல் போன ஆவணத்தை எவ்வாறு புகாரளிப்பது?',
      a:        'நீங்கள் உடைந்த இணைப்பை அல்லது காணாமல் போன ஆவணத்தைக் கண்டால் தொடர்பு பக்கம் மூலம் புகாரளிக்கவும்.',
    },
    {
      id:       't4',
      category: 'tech',
      q:        'கைப்பேசிகளில் தளம் அணுகலாமா?',
      a:        'ஆம். இந்த தளம் முழுமையாக பதிலளிக்கக்கூடியது மற்றும் ஸ்மார்ட்போன்கள், டேப்லெட்டுகள், லேப்டாப்கள், டெஸ்க்டாப்கள் உட்பட அனைத்து சாதன வகைகளிலும் வேலை செய்யும்.',
    },
    {
      id:       't5',
      category: 'tech',
      q:        'தளத்தின் மொழியை எவ்வாறு மாற்றுவது?',
      a:        'பக்கத்தின் மேல் உள்ள வழிசெலுத்தல் பட்டியலில் உள்ள மொழி தேர்வியை கிளிக் செய்து உங்கள் விருப்பமான மொழியை — ஆங்கிலம், சிங்களம், அல்லது தமிழ் — தேர்ந்தெடுங்கள்.',
    },
  ],
}

/* ─── Category definitions ──────────────────────────────────────────────────── */
const CATEGORIES = [
  { id: 'all',       labelKey: 'catAll'       },
  { id: 'general',   labelKey: 'catGeneral'   },
  { id: 'planning',  labelKey: 'catPlanning'  },
  { id: 'downloads', labelKey: 'catDownloads' },
  { id: 'reports',   labelKey: 'catReports'   },
  { id: 'departments', labelKey: 'catDepts'   },
  { id: 'tech',      labelKey: 'catTech'      },
]

/* ─── HoneycombBg (kept from original) ─────────────────────────────────────── */
function HoneycombBg() {
  const r = 20, hx = r * Math.sqrt(3), vy = r * 1.5
  const cells = []
  for (let row = 0; row < 10; row++)
    for (let col = 0; col < 20; col++) {
      const cx = col * hx + (row % 2 ? hx / 2 : 0) + r
      const cy = row * vy + r
      const pts = Array.from({ length: 6 }, (_, i) => {
        const a = (Math.PI / 180) * (60 * i)
        return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`
      }).join(' ')
      cells.push(<polygon key={`${row}-${col}`} points={pts} stroke={GOLD} strokeWidth="1" fill="none" />)
    }
  const W = 20 * hx + r + 4, H = 9 * vy + r * 2 + 4
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" fill="none">
      {cells}
    </svg>
  )
}

/* ─── PageHero (original, unchanged) ───────────────────────────────────────── */
function PageHero({ t, meta }) {
  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.10 } } }
  const itemV   = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.60, ease: [0.16, 1, 0.3, 1] } } }
  const slideR  = { hidden: { opacity: 0, x: 36 }, visible: { opacity: 1, x: 0, transition: { duration: 0.70, ease: [0.16, 1, 0.3, 1] } } }

  return (
    <section className="faq-hero">
      <div className="faq-hero__bg" aria-hidden="true" />
      <div className="faq-hero__noise" aria-hidden="true" />
      <div className="faq-hero__grid-lines" aria-hidden="true" />
      <div className="faq-hero__glow faq-hero__glow--gold"   aria-hidden="true" />
      <div className="faq-hero__glow faq-hero__glow--maroon" aria-hidden="true" />
      <div className="faq-hero__glow faq-hero__glow--right"  aria-hidden="true" />
      <div className="faq-hero__watermark" aria-hidden="true">FAQ</div>
      <div className="faq-hero__hc" aria-hidden="true"><HoneycombBg /></div>
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`faq-hero__dot faq-hero__dot--${i + 1}`} aria-hidden="true" />
      ))}

      <div className="faq-hero__inner">
        <motion.div className="faq-hero__left" initial="hidden" animate="visible" variants={stagger}>
          <motion.div className="faq-hero__badge" variants={itemV}>
            <span className="faq-hero__badge-dot" aria-hidden="true" />
            <span style={{
              fontFamily:    meta.isNonLatin ? meta.font : "'Cinzel', serif",
              letterSpacing: meta.isNonLatin ? 0 : '0.13em',
              textTransform: meta.isNonLatin ? 'none' : 'uppercase',
            }}>
              {t.badgeLabel}
            </span>
          </motion.div>

          <motion.h1
            className="faq-hero__title"
            style={{ fontFamily: meta.headFont, lineHeight: meta.isNonLatin ? 1.35 : 1.08 }}
            variants={itemV}
          >
            {t.pageTitle}
          </motion.h1>

          <motion.div
            className="faq-hero__rule"
            variants={{ hidden: { scaleX: 0, opacity: 0 }, visible: { scaleX: 1, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
            aria-hidden="true"
          />

          <motion.p className="faq-hero__sub" style={{ fontFamily: meta.font }} variants={itemV}>
            {t.pageSub}
          </motion.p>

          <motion.div className="faq-hero__actions" variants={itemV}>
            <Link to="/contact" className="faq-hero__btn faq-hero__btn--gold" style={{ fontFamily: meta.font }}>
              <FiMail size={15} /><span>{t.contactUs}</span>
            </Link>
            <Link to="/home" className="faq-hero__btn faq-hero__btn--ghost" style={{ fontFamily: meta.font }}>
              <FiHome size={15} /><span>{t.backHome}</span><FiArrowRight size={13} className="faq-hero__btn-arrow" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div className="faq-hero__right" initial="hidden" animate="visible" variants={slideR}>
          <img
            src="/branding/f-logo.svg"
            alt="Southern Province Planning Secretariat"
            className="faq-hero__logo"
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
        </motion.div>
      </div>

      <svg className="faq-hero__wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,80 C240,20 480,60 720,40 C960,20 1200,60 1440,30 L1440,80 Z" fill={CREAM} />
      </svg>
    </section>
  )
}

/* ─── FAQHero intro card ────────────────────────────────────────────────────── */
function FAQHero({ t, meta }) {
  return (
    <motion.div
      className="faq-intro"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="faq-intro__icon" aria-hidden="true">
        <FiHelpCircle size={28} color={GOLD} />
      </div>
      <h2 className="faq-intro__title" style={{ fontFamily: meta.headFont, lineHeight: meta.isNonLatin ? 1.4 : 1.18 }}>
        {t.introTitle}
      </h2>
      <p className="faq-intro__sub" style={{ fontFamily: meta.font }}>
        {t.introSub}
      </p>
    </motion.div>
  )
}

/* ─── FAQSearch ─────────────────────────────────────────────────────────────── */
function FAQSearch({ query, setQuery, t, meta }) {
  const inputRef = useRef(null)
  return (
    <div className="faq-search" role="search" aria-label={t.searchLabel}>
      <span className="faq-search__icon" aria-hidden="true"><FiSearch size={18} /></span>
      <input
        ref={inputRef}
        className="faq-search__input"
        type="search"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={t.searchPh}
        aria-label={t.searchLabel}
        style={{ fontFamily: meta.font }}
        autoComplete="off"
        spellCheck={false}
      />
      {query && (
        <button
          className="faq-search__clear"
          onClick={() => { setQuery(''); inputRef.current?.focus() }}
          aria-label="Clear search"
          type="button"
        >
          <FiX size={16} />
        </button>
      )}
    </div>
  )
}

/* ─── FAQCategories ─────────────────────────────────────────────────────────── */
function FAQCategories({ activeCategory, setActiveCategory, t, meta }) {
  const tabsRef = useRef(null)

  const scrollActive = (id) => {
    setActiveCategory(id)
    const el = tabsRef.current?.querySelector(`[data-cat="${id}"]`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }

  return (
    <div className="faq-cats" role="tablist" aria-label="FAQ categories">
      <div className="faq-cats__track" ref={tabsRef}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            data-cat={cat.id}
            className={`faq-cats__pill${activeCategory === cat.id ? ' faq-cats__pill--active' : ''}`}
            role="tab"
            aria-selected={activeCategory === cat.id}
            onClick={() => scrollActive(cat.id)}
            style={{ fontFamily: meta.font }}
          >
            {t[cat.labelKey]}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─── FAQ Accordion item ────────────────────────────────────────────────────── */
function FAQItem({ item, isOpen, onToggle, meta }) {
  const contentRef = useRef(null)
  const id = `faq-panel-${item.id}`
  const btnId = `faq-btn-${item.id}`

  return (
    <div className={`faq-item${isOpen ? ' faq-item--open' : ''}`}>
      <button
        id={btnId}
        className="faq-item__trigger"
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={onToggle}
        style={{ fontFamily: meta.headFont }}
      >
        <span className="faq-item__q">{item.q}</span>
        <span className="faq-item__arrow" aria-hidden="true">
          <FiChevronDown size={20} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={id}
            role="region"
            aria-labelledby={btnId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="faq-item__body" ref={contentRef} style={{ fontFamily: meta.font }}>
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── FAQAccordion ──────────────────────────────────────────────────────────── */
function FAQAccordion({ items, meta, t }) {
  const [openId, setOpenId] = useState(null)

  useEffect(() => { setOpenId(null) }, [items])

  const toggle = (id) => setOpenId(prev => prev === id ? null : id)

  if (!items.length) {
    return (
      <div className="faq-empty">
        <FiSearch size={32} color={GOLD} style={{ opacity: 0.5 }} />
        <p className="faq-empty__msg" style={{ fontFamily: meta.headFont }}>{t.noResults}</p>
        <p className="faq-empty__sub" style={{ fontFamily: meta.font }}>{t.noResultsSub}</p>
      </div>
    )
  }

  return (
    <div className="faq-accordion" role="list">
      {items.map((item, idx) => (
        <motion.div
          key={item.id}
          role="listitem"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.40, delay: idx * 0.045, ease: [0.16, 1, 0.3, 1] }}
        >
          <FAQItem
            item={item}
            isOpen={openId === item.id}
            onToggle={() => toggle(item.id)}
            meta={meta}
          />
        </motion.div>
      ))}
    </div>
  )
}

/* ─── FAQHelpCard ───────────────────────────────────────────────────────────── */
function FAQHelpCard({ t, meta }) {
  return (
    <aside className="faq-help" aria-label="Quick Help">
      <div className="faq-help__glow" aria-hidden="true" />
      <div className="faq-help__icon" aria-hidden="true">
        <FiMessageSquare size={22} color={GOLD} />
      </div>
      <h3 className="faq-help__title" style={{ fontFamily: meta.headFont, lineHeight: meta.isNonLatin ? 1.5 : 1.2 }}>
        {t.helpTitle}
      </h3>
      <p className="faq-help__sub" style={{ fontFamily: meta.font }}>
        {t.helpSub}
      </p>
      <div className="faq-help__actions">
        <Link to="/contact" className="faq-help__btn faq-help__btn--primary" style={{ fontFamily: meta.font }}>
          <FiMail size={14} /><span>{t.helpContact}</span>
        </Link>
        <Link to="/contact#directory" className="faq-help__btn faq-help__btn--ghost" style={{ fontFamily: meta.font }}>
          <FiPhone size={14} /><span>{t.helpDir}</span>
        </Link>
      </div>
      <div className="faq-help__divider" aria-hidden="true" />
      <div className="faq-help__hours">
        <span className="faq-help__hours-dot" aria-hidden="true" />
        <span style={{ fontFamily: meta.font, fontSize: '0.78rem', color: '#7A4558' }}>
          Mon – Fri · 8:30 AM – 4:15 PM
        </span>
      </div>
    </aside>
  )
}

/* ─── StillNeedHelp ─────────────────────────────────────────────────────────── */
function StillNeedHelp({ t, meta }) {
  return (
    <section className="faq-snh" aria-label={t.snhTitle}>
      <div className="faq-snh__glass" />
      <div className="faq-snh__inner">
        <div className="faq-snh__left">
          <h3 className="faq-snh__title" style={{ fontFamily: meta.headFont, lineHeight: meta.isNonLatin ? 1.5 : 1.2 }}>
            {t.snhTitle}
          </h3>
          <p className="faq-snh__sub" style={{ fontFamily: meta.font }}>{t.snhSub}</p>
          <p className="faq-snh__hours" style={{ fontFamily: meta.font }}>{t.snhHours}</p>
        </div>
        <div className="faq-snh__right">
          <Link to="/contact" className="faq-snh__btn" style={{ fontFamily: meta.font }}>
            <FiMail size={16} /><span>{t.snhBtn}</span><FiArrowRight size={14} />
          </Link>
          <a href={`mailto:${t.snhEmail}`} className="faq-snh__email" style={{ fontFamily: meta.font }}>
            {t.snhEmail}
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─── Main export ───────────────────────────────────────────────────────────── */
export default function FAQ() {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')
  const [query, setQuery]           = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    const h = (e) => { setLang(e.detail || 'en'); setQuery(''); setActiveCategory('all') }
    window.addEventListener('langChange', h)
    return () => window.removeEventListener('langChange', h)
  }, [])

  const meta = LANG_META[lang] || LANG_META.en
  const t    = T[lang]         || T.en
  const data = faqData[lang]   || faqData.en

  const filtered = useMemo(() => {
    let list = activeCategory === 'all' ? data : data.filter(i => i.category === activeCategory)
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter(i => i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q))
    }
    return list
  }, [data, activeCategory, query])

  return (
    <>
      <SeoHead page="faq" />
      <div className="faq-page" style={{ background: CREAM, minHeight: '100vh' }}>
      <PageHero t={t} meta={meta} />

      <main className="faq-main">
        <div className="faq-layout">

          {/* ── Left / main content column ── */}
          <div className="faq-content">
            <FAQHero t={t} meta={meta} />
            <FAQSearch query={query} setQuery={setQuery} t={t} meta={meta} />
            <FAQCategories activeCategory={activeCategory} setActiveCategory={setActiveCategory} t={t} meta={meta} />
            <FAQAccordion items={filtered} meta={meta} t={t} />
          </div>

          {/* ── Right sidebar / help card ── */}
          <div className="faq-sidebar">
            <FAQHelpCard t={t} meta={meta} />
          </div>

        </div>
      </main>

      <StillNeedHelp t={t} meta={meta} />
    </div>
    </>
  )
}
