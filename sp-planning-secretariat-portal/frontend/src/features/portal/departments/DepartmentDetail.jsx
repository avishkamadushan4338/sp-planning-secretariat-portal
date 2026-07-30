import { useState, useEffect, useMemo } from 'react'
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom'
import { usePageHold } from '@/shared/hooks/usePageHold'
import ComingSoon from '@/shared/components/ComingSoon'
import { motion } from 'framer-motion'
import {
  BookOpen, Settings, TrendingUp, Users, ChevronRight,
  FileText, UserCircle2,
  ClipboardList, Shield, Briefcase, Landmark,
  PieChart, CheckCircle, Globe
} from 'lucide-react'
import './Departments.css'

/* ─── Constants ──────────────────────────────────────────────────── */

const MAROON = '#4A0918'
const GOLD   = '#C79A2B'
const CREAM  = '#FCFBFA'

const LANG_META = {
  en: { font: 'Inter, sans-serif',               headFont: "'Playfair Display', Georgia, serif", isNonLatin: false },
  si: { font: "'Noto Sans Sinhala', sans-serif", headFont: "'Noto Sans Sinhala', sans-serif",   isNonLatin: true  },
  ta: { font: "'Noto Sans Tamil', sans-serif",   headFont: "'Noto Sans Tamil', sans-serif",     isNonLatin: true  },
}

/* ─── UI Translations ────────────────────────────────────────────── */

const UI = {
  en: {
    backBtn:        'Back to Divisions',
    breadHome:      'Home',
    breadDepts:     'Divisions',
    overview:       'Division Overview',
    functions:      'Key Functions',
    responsibilities: 'Responsibilities',
    downloads:      'Downloads & Resources',
    headCard:       'Head of Division',
    viewProfile:    'View Profile',
    contactDept:    'Contact Division',
    staffLabel:     'Staff Members',
    locationLabel:  'Location',
    staffPlaceholder: '—',
    locationValue:  'Southern Province Planning Secretariat - Galle',
    services:       'Division Services',
    noHead:         'Head of Division information is being updated.',
  },
  si: {
    backBtn:        'අංශ වෙත ආපසු',
    breadHome:      'මුල් පිටුව',
    breadDepts:     'අංශ',
    overview:       'අංශ දළ විශ්ලේෂණය',
    functions:      'ප්‍රධාන කාර්යයන්',
    responsibilities: 'වගකීම්',
    downloads:      'බාගැනීම් හා සම්පත්',
    headCard:       'අංශ ප්‍රධානී',
    viewProfile:    'පැතිකඩ බලන්න',
    contactDept:    'අංශය අමතන්න',
    staffLabel:     'කාර්ය මණ්ඩලය',
    locationLabel:  'ස්ථානය',
    staffPlaceholder: '—',
    locationValue:  'ලේකම් ගොඩනැගිල්ල, ගාල්ල',
    services:       'අංශ සේවාවන්',
    noHead:         'අංශ ප්‍රධානීගේ තොරතුරු යාවත්කාලීන කෙරෙමින් පවතී.',
  },
  ta: {
    backBtn:        'துறைகளுக்கு திரும்பு',
    breadHome:      'முகப்பு',
    breadDepts:     'துறைகள்',
    overview:       'துறை கண்ணோட்டம்',
    functions:      'முக்கிய செயல்பாடுகள்',
    responsibilities: 'பொறுப்புகள்',
    downloads:      'பதிவிறக்கங்கள் & வளங்கள்',
    headCard:       'துறை தலைவர்',
    viewProfile:    'சுயவிவரம் காண்க',
    contactDept:    'துறையை தொடர்பு கொள்',
    staffLabel:     'ஊழியர்கள்',
    locationLabel:  'இடம்',
    staffPlaceholder: '—',
    locationValue:  'செயலக கட்டிடம், காலி',
    services:       'துறை சேவைகள்',
    noHead:         'துறை தலைவர் தகவல்கள் புதுப்பிக்கப்படுகின்றன.',
  },
}

/* ─── Department Content Data ────────────────────────────────────── */

const DEPT_DATA = {
  accounts: {
    icon: BookOpen,
    accentColor: '#C79A2B',
    staff: '7',
    profilePath: '/departments/head-accounts',
    headName:    { en: 'Mrs. D.V. Dishani', si: 'ඩී.වී. දිශානි මහත්මිය', ta: 'திருமதி. டி.வி. திஷானி' },
    headPosition:{ en: 'Accountant (Acting)', si: 'ගණකාධිකාරී (වැඩබලන)', ta: 'கணக்காளர் (பொ.)' },
    title: {
      en: 'Accounts Division',
      si: 'ගිණුම් අංශය',
      ta: 'கணக்குத் துறை',
    },
    badge: { en: 'Finance & Accounts', si: 'මූල්‍ය හා ගිණුම්', ta: 'நிதி & கணக்குகள்' },
    subtitle: {
      en: 'Managing the financial operations, budgeting, and fiscal accountability of the Planning Secretariat.',
      si: 'සැලසුම් ලේකම් කාර්යාලයේ මූල්‍ය ක්‍රියාකාරිත්වය, අයවැය සහ මූල්‍ය වගවීම කළමනාකරණය.',
      ta: 'திட்டமிடல் செயலகத்தின் நிதி செயல்பாடுகள், பட்ஜெட் மற்றும் நிதி பொறுப்புணர்வை நிர்வகித்தல்.',
    },
    overview: {
      en: 'The Accounts Division of the Planning Secretariat is responsible for maintaining accurate financial records, preparing annual budgets, and ensuring compliance with government financial regulations. It serves as the financial backbone of the organisation, overseeing all expenditures, revenue management, and audit coordination across all departments. The department ensures transparency, accountability, and efficient use of public funds in alignment with national financial policies.',
      si: 'සැලසුම් ලේකම් කාර්යාලයේ ගිණුම් අංශය නිවැරදි මූල්‍ය වාර්තා පවත්වා ගැනීමට, වාර්ෂික අයවැය සකස් කිරීමට සහ රජයේ මූල්‍ය නියාමනවලට අනුකූලව සිටීමට වගකිව යුතු වේ. ජාතික මූල්‍ය ප්‍රතිපත්තිවලට අනුකූලව රාජ්‍ය අරමුදල්වල විනිවිදභාවය, වගවීම සහ කාර්යක්ෂම භාවිතය සහතික කරයි.',
      ta: 'திட்டமிடல் செயலகத்தின் கணக்குத் துறை துல்லியமான நிதி பதிவுகளை பராமரிக்கவும், ஆண்டு பட்ஜெட்களை தயாரிக்கவும், அரசாங்க நிதி விதிமுறைகளுக்கு இணங்கவும் பொறுப்பாகும். தேசிய நிதி கொள்கைகளுக்கு இணங்க பொது நிதியின் வெளிப்படைத்தன்மை, பொறுப்புணர்வு மற்றும் திறமையான பயன்பாட்டை உறுதி செய்கிறது.',
    },
    functions: {
      en: [
        'Payment for vouchers',
        'All matters relating to the salaries of the officers of the Southern Provincial Planning Secretariat',
        'Activities related to the security deposit of the officers of the Planning Secretariat',
        'All activities related to monthly account summaries and monthly account comparisons',
        'Preparation of annual estimates',
        'Preparation of annual financial statements',
        'Dealing with Supplementary Estimates / Monetary Regulations 66',
        'Maintaining the advance account of government officials',
        'Carrying out all the duties related to the property loans of the officers working in the Planning Secretariat',
        'Ensuring accountability and transparency in fiscal management',
        'Audit Management',
        'Asset Management',
      ],
      si: [
        'වවුචර් සඳහා ගෙවීම්',
        'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලයේ නිලධාරීන්ගේ වැටුප් සම්බන්ධ සියලු කාරණා',
        'සැලසුම් ලේකම් කාර්යාලයේ නිලධාරීන්ගේ ආරක්ෂා තැන්පතු සම්බන්ධ කටයුතු',
        'මාසික ගිණුම් සාරාංශ සහ මාසික ගිණුම් සංසන්දනය සම්බන්ධ සියලු කටයුතු',
        'වාර්ෂික ඇස්තමේන්තු සකස් කිරීම',
        'වාර්ෂික මූල්‍ය ප්‍රකාශ සකස් කිරීම',
        'අතිරේක ඇස්තමේන්තු / මුල්‍ය රෙගුලාසි 66 සමඟ කටයුතු කිරීම',
        'රාජ්‍ය නිලධාරීන්ගේ අත්තිකාරම් ගිණුම නඩත්තු කිරීම',
        'සැලසුම් ලේකම් කාර්යාලයේ කටයුතු කරන නිලධාරීන්ගේ දේපළ ණය සම්බන්ධ සියලු රාජකාරි ඉටු කිරීම',
        'මූල්‍ය කළමනාකරණයේ වගවීම සහ විනිවිදභාවය සහතික කිරීම',
        'විගණන කළමනාකරණය',
        'වත්කම් කළමනාකරණය',
      ],
      ta: [
        'வவுச்சர்களுக்கான கொடுப்பனவு',
        'தென் மாகாண திட்டமிடல் செயலகத்தின் அதிகாரிகளின் சம்பளம் தொடர்பான அனைத்து விஷயங்களும்',
        'திட்டமிடல் செயலகத்தின் அதிகாரிகளின் பாதுகாப்பு வைப்பு தொடர்பான செயல்பாடுகள்',
        'மாதாந்திர கணக்கு சுருக்கங்கள் மற்றும் மாதாந்திர கணக்கு ஒப்பீடுகள் தொடர்பான அனைத்து செயல்பாடுகளும்',
        'ஆண்டு மதிப்பீடுகளை தயாரித்தல்',
        'ஆண்டு நிதி அறிக்கைகளை தயாரித்தல்',
        'துணை மதிப்பீடுகள் / நிதி விதிமுறைகள் 66 ஐ கையாளுதல்',
        'அரசாங்க அதிகாரிகளின் முன்பண கணக்கை பராமரித்தல்',
        'திட்டமிடல் செயலகத்தில் பணிபுரியும் அதிகாரிகளின் சொத்து கடன்கள் தொடர்பான அனைத்து கடமைகளையும் மேற்கொள்ளுதல்',
        'நிதி மேலாண்மையில் பொறுப்புணர்வு மற்றும் வெளிப்படைத்தன்மையை உறுதி செய்தல்',
        'தணிக்கை மேலாண்மை',
        'சொத்து மேலாண்மை',
      ],
    },
    responsibilities: {
      en: [
        'Payment for vouchers',
        'All matters relating to the salaries of the officers of the Southern Provincial Planning Secretariat',
        'Activities related to the security deposit of the officers of the Planning Secretariat',
        'All activities related to monthly account summaries and monthly account comparisons',
        'Preparation of annual estimates',
        'Preparation of annual financial statements',
        'Dealing with Supplementary Estimates / Monetary Regulations 66',
        'Maintaining the advance account of government officials',
        'Carrying out all the duties related to the property loans of the officers working in the Planning Secretariat',
        'Ensuring accountability and transparency in fiscal management',
        'Conducting Board of Survey',
        'Asset Management Activities',
        'Report to Internal Audit Department & General Audit',
      ],
      si: [
        'වවුචර් සඳහා ගෙවීම්',
        'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලයේ නිලධාරීන්ගේ වැටුප් සම්බන්ධ සියලු කාරණා',
        'සැලසුම් ලේකම් කාර්යාලයේ නිලධාරීන්ගේ ආරක්ෂා තැන්පතු සම්බන්ධ කටයුතු',
        'මාසික ගිණුම් සාරාංශ සහ මාසික ගිණුම් සංසන්දනය සම්බන්ධ සියලු කටයුතු',
        'වාර්ෂික ඇස්තමේන්තු සකස් කිරීම',
        'වාර්ෂික මූල්‍ය ප්‍රකාශ සකස් කිරීම',
        'අතිරේක ඇස්තමේන්තු / මුල්‍ය රෙගුලාසි 66 සමඟ කටයුතු කිරීම',
        'රාජ්‍ය නිලධාරීන්ගේ අත්තිකාරම් ගිණුම නඩත්තු කිරීම',
        'සැලසුම් ලේකම් කාර්යාලයේ කටයුතු කරන නිලධාරීන්ගේ දේපළ ණය සම්බන්ධ සියලු රාජකාරි ඉටු කිරීම',
        'මූල්‍ය කළමනාකරණයේ වගවීම සහ විනිවිදභාවය සහතික කිරීම',
        'සමීක්ෂණ මණ්ඩල පැවැත්වීම',
        'වත්කම් කළමනාකරණ කටයුතු',
        'අභ්‍යන්තර විගණන අංශය සහ ජනරාල් විගණනයට වාර්තා කිරීම',
      ],
      ta: [
        'வவுச்சர்களுக்கான கொடுப்பனவு',
        'தென் மாகாண திட்டமிடல் செயலகத்தின் அதிகாரிகளின் சம்பளம் தொடர்பான அனைத்து விஷயங்களும்',
        'திட்டமிடல் செயலகத்தின் அதிகாரிகளின் பாதுகாப்பு வைப்பு தொடர்பான செயல்பாடுகள்',
        'மாதாந்திர கணக்கு சுருக்கங்கள் மற்றும் மாதாந்திர கணக்கு ஒப்பீடுகள் தொடர்பான அனைத்து செயல்பாடுகளும்',
        'ஆண்டு மதிப்பீடுகளை தயாரித்தல்',
        'ஆண்டு நிதி அறிக்கைகளை தயாரித்தல்',
        'துணை மதிப்பீடுகள் / நிதி விதிமுறைகள் 66 ஐ கையாளுதல்',
        'அரசாங்க அதிகாரிகளின் முன்பண கணக்கை பராமரித்தல்',
        'திட்டமிடல் செயலகத்தில் பணிபுரியும் அதிகாரிகளின் சொத்து கடன்கள் தொடர்பான அனைத்து கடமைகளையும் மேற்கொள்ளுதல்',
        'நிதி மேலாண்மையில் பொறுப்புணர்வு மற்றும் வெளிப்படைத்தன்மையை உறுதி செய்தல்',
        'கணக்காய்வு குழுவை நடத்துதல்',
        'சொத்து மேலாண்மை நடவடிக்கைகள்',
        'உள் தணிக்கை துறை மற்றும் பொது தணிக்கைக்கு அறிக்கை செய்தல்',
      ],
    },
    services: {
      en: ['Budget Preparation', 'Salary Processing', 'Audit Coordination', 'Advance Management', 'Financial Reporting', 'Asset Management', 'Procurement and Stores Management'],
      si: ['අයවැය සකස් කිරීම', 'වැටුප් සැකසීම', 'විගණන සම්බන්ධීකරණය', 'අත්තිකාරම් කළමනාකරණය', 'මූල්‍ය වාර්තාකරණය', 'වත්කම් කළමනාකරණය', 'ප්‍රසම්පාදන හා ගබඩා කළමනාකරණය'],
      ta: ['பட்ஜெட் தயாரிப்பு', 'சம்பள செயலாக்கம்', 'தணிக்கை ஒருங்கிணைப்பு', 'முன்பண மேலாண்மை', 'நிதி அறிக்கையிடல்', 'சொத்து மேலாண்மை', 'கொள்முதல் மற்றும் கடை மேலாண்மை'],
    },
  },

  administration: {
    icon: Settings,
    accentColor: '#4A0918',
    staff: '8+',
    profilePath: '/departments/head-administration',
    headName:    { en: 'Mrs. K.K.G. Chandrika', si: 'කේ.ජී. චන්ද්‍රිකා මහත්මිය', ta: 'திருமதி. கே.கே.ஜி. சந்திரிகா' },
    headPosition:{ en: 'Administrative Officer', si: 'පරිපාලන නිලධාරී', ta: 'நிர்வாக அலுவலர்' },
    title: {
      en: 'Administration Division',
      si: 'පරිපාලන අංශය',
      ta: 'நிர்வாகத் துறை',
    },
    badge: { en: 'Administration & HR', si: 'පරිපාලන සහ HR', ta: 'நிர்வாகம் & மனிட வளங்கள்' },
    subtitle: {
      en: 'Overseeing administrative operations, human resources, and institutional management of the Planning Secretariat.',
      si: 'සැලසුම් ලේකම් කාර්යාලයේ පරිපාලන ක්‍රියාකාරිත්වය, මානව සම්පත් සහ ආයතනික කළමනාකරණය අධීක්ෂණය.',
      ta: 'திட்டமிடல் செயலகத்தின் நிர்வாக செயல்பாடுகள், மனிதவளங்கள் மற்றும் நிறுவன மேலாண்மையை மேற்பார்வையிடுதல்.',
    },
    overview: {
      en: 'The Administration Division is the operational hub of the Planning Secretariat, managing all internal administrative processes, human resource functions, office management, and institutional coordination. It ensures that the Secretariat runs efficiently, staff welfare is maintained, and government administrative standards are upheld at all times. The department handles recruitment, training, leave administration, procurement, and correspondence management to support the seamless functioning of all departments.',
      si: 'පරිපාලන අංශය සැලසුම් ලේකම් කාර්යාලයේ ක්‍රියාකාරී මූලස්ථානය වන අතර, සියලු අභ්‍යන්තර පරිපාලන ක්‍රියාවලීන්, මානව සම්පත් කාර්යයන්, කාර්යාල කළමනාකරණය සහ ආයතනික සම්බන්ධීකරණය පරිපාලනය කරයි. ලේකම් කාර්යාලය කාර්යක්ෂමව ක්‍රියාත්මක වීම, කාර්ය මණ්ඩල සුභසාධනය නඩත්තු කිරීම සහ රාජ්‍ය පරිපාලන ප්‍රමිතීන් සෑම විටම ඉහළ සිටීම සහතික කරයි.',
      ta: 'நிர்வாகத் துறை திட்டமிடல் செயலகத்தின் செயல்பாட்டு மையமாகும், அனைத்து உள் நிர்வாக செயல்முறைகள், மனிதவள செயல்பாடுகள், அலுவலக நிர்வாகம் மற்றும் நிறுவன ஒருங்கிணைப்பை நிர்வகிக்கிறது. செயலகம் திறமையாக செயல்படுவதையும், ஊழியர் நலனை பராமரிப்பதையும், அரசாங்க நிர்வாக தரங்களை எப்போதும் நிலைநிறுத்துவதையும் உறுதி செய்கிறது.',
    },
    functions: {
      en: [
        'Daily mail received by the Southern Provincial Planning Secretariat to the relevant divisions and expeditious delivery of letters sent by the Southern Provincial Planning Secretariat',
        'Maintaining the personal files of the officers of the Southern Provincial Planning Secretariat and all the related corporate activities',
        'All matters relating to vehicles such as reservation and maintenance of vehicles of the Southern Provincial Planning Secretariat',
        'All activities related to car accidents',
        'Activities related to auctioning and disposal of vehicles belonging to the Southern Provincial Planning Secretariat',
        'All matters related to the daily attendance and leave of all the officers of the Planning Secretariat',
        'All activities related to foreign holidays',
        'Activities related to issuance of vehicle licenses on concessionary basis as per Trade Investment and Policy Circulars for Officers of Vehicle License Planning Secretariat',
        'Activities related to payment of railway licenses and agrahara insurance claims',
        'Activities related to overtime and holiday pay approval of the officers of the Planning Secretariat',
        'All matters related to payment of water, electricity and telephone bills of the Planning Secretariat',
        'Preparation of monthly report of vacancies belonging to the Planning Secretariat',
        'Maintaining and maintaining the archives properly',
        'Maintain productivity activities properly',
        'All matters relating to security, sanitation and maintenance of the Planning Secretariat',
        'All duties related to the official quarters belonging to the Planning Secretariat',
        'Carrying out repairs and maintenance of office buildings, machinery and equipment',
        'Activities related to providing information related to the Right to Information Act No. 12 of 2016',
        'All activities required to maintain the library of the Southern Provincial Planning Secretariat',
        'All activities related to asset management',
      ],
      si: [
        'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලයට ලැබෙන දෛනික තැපෑල අදාළ අංශ වෙත ලබා දීම සහ ලේකම් කාර්යාලය මඟින් යවන ලිපි ඉක්මනින් ලබා දීම',
        'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලයේ නිලධාරීන්ගේ පෞද්ගලික ගොනු නඩත්තු කිරීම සහ ඒ සම්බන්ධ සියලු ආයතනික කටයුතු',
        'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලයේ රථවාහන වෙන් කිරීම සහ නඩත්තු කිරීම ඇතුළු රථවාහන සම්බන්ධ සියලු කරුණු',
        'රිය අනතුරු සම්බන්ධ සියලු කටයුතු',
        'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලයට අයත් වාහන වෙන්දේසි කිරීම සහ බැහැර කිරීම සම්බන්ධ කටයුතු',
        'සැලසුම් ලේකම් කාර්යාලයේ සියලු නිලධාරීන්ගේ දෛනික පැමිණීම සහ නිවාඩු සම්බන්ධ සියලු කරුණු',
        'විදේශ නිවාඩු සම්බන්ධ සියලු කටයුතු',
        'වාහන බලපත්‍ර සැලසුම් ලේකම් කාර්යාලයේ නිලධාරීන් සඳහා වෙළඳ ආයෝජන හා ප්‍රතිපත්ති චක්‍ර ලේඛ අනුව සහන පදනමින් වාහන බලපත්‍ර නිකුත් කිරීම සම්බන්ධ කටයුතු',
        'දුම්රිය බලපත්‍ර ගෙවීම් සහ අග්‍රහාර රක්ෂණ හිමිකම් සම්බන්ධ කටයුතු',
        'සැලසුම් ලේකම් කාර්යාලයේ නිලධාරීන්ගේ අතිකාල හා නිවාඩු දින ගෙවීම් අනුමැතිය සම්බන්ධ කටයුතු',
        'සැලසුම් ලේකම් කාර්යාලයේ ජල, විදුලි සහ දුරකථන බිල්පත් ගෙවීම් සම්බන්ධ සියලු කරුණු',
        'සැලසුම් ලේකම් කාර්යාලයට අයත් පුරප්පාඩු පිළිබඳ මාසික වාර්තාව සකස් කිරීම',
        'ලිපිකාර කාර්යාලය නිසි ලෙස නඩත්තු කිරීම',
        'ඵලදායිතා කටයුතු නිසි ලෙස නඩත්තු කිරීම',
        'සැලසුම් ලේකම් කාර්යාලයේ ආරක්ෂාව, සනීපාරක්ෂාව සහ නඩත්තු සම්බන්ධ සියලු කරුණු',
        'සැලසුම් ලේකම් කාර්යාලයට අයත් නිල නිවාස සම්බන්ධ සියලු රාජකාරි',
        'කාර්යාල ගොඩනැගිලි, යන්ත්‍ර සහ උපකරණ අලුත්වැඩියා කිරීම සහ නඩත්තු කිරීම',
        '2016 අංක 12 දරන තොරතුරු දැනගැනීමේ අයිතිවාසිකම් පනත සම්බන්ධ තොරතුරු සැපයීමේ කටයුතු',
        'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලයේ පුස්තකාලය නඩත්තු කිරීමට අවශ්‍ය සියලු කටයුතු',
        'වත්කම් කළමනාකරණය සම්බන්ධ සියලු කටයුතු',
      ],
      ta: [
        'தென் மாகாண திட்டமிடல் செயலகத்திற்கு வரும் தினசரி அஞ்சலை உரிய பிரிவுகளுக்கு வழங்குதல் மற்றும் திட்டமிடல் செயலகம் அனுப்பும் கடிதங்களை விரைவாக வழங்குதல்',
        'தென் மாகாண திட்டமிடல் செயலகத்தின் அதிகாரிகளின் தனிப்பட்ட கோப்புகளை பராமரித்தல் மற்றும் அதன் அனைத்து நிறுவன செயல்பாடுகளும்',
        'தென் மாகாண திட்டமிடல் செயலகத்தின் வாகனங்களை முன்பதிவு செய்தல் மற்றும் பராமரிப்பு உள்ளிட்ட அனைத்து வாகன விஷயங்களும்',
        'வாகன விபத்துகள் தொடர்பான அனைத்து செயல்பாடுகளும்',
        'தென் மாகாண திட்டமிடல் செயலகத்திற்கு சொந்தமான வாகனங்களை ஏலம் விடுதல் மற்றும் அகற்றுதல் தொடர்பான செயல்பாடுகள்',
        'திட்டமிடல் செயலகத்தின் அனைத்து அதிகாரிகளின் தினசரி வருகை மற்றும் விடுப்பு தொடர்பான அனைத்து விஷயங்களும்',
        'வெளிநாட்டு விடுமுறைகள் தொடர்பான அனைத்து செயல்பாடுகளும்',
        'வாகன உரிம திட்டமிடல் செயலகத்தின் அதிகாரிகளுக்கு வர்த்தக முதலீடு மற்றும் கொள்கை சுற்றறிக்கைகளின்படி சலுகை அடிப்படையில் வாகன உரிமங்களை வழங்குதல் தொடர்பான செயல்பாடுகள்',
        'இரயில்வே உரிமங்கள் மற்றும் அக்ரஹார காப்பீட்டு கோரல்களுக்கான கொடுப்பனவு தொடர்பான செயல்பாடுகள்',
        'திட்டமிடல் செயலகத்தின் அதிகாரிகளின் மேலதிக நேரம் மற்றும் விடுமுறை ஊதிய அனுமதி தொடர்பான செயல்பாடுகள்',
        'திட்டமிடல் செயலகத்தின் நீர், மின்சாரம் மற்றும் தொலைபேசி கட்டணங்களை செலுத்துதல் தொடர்பான அனைத்து விஷயங்களும்',
        'திட்டமிடல் செயலகத்திற்கு சொந்தமான காலியிடங்கள் பற்றிய மாதாந்திர அறிக்கையை தயாரித்தல்',
        'காப்பகங்களை முறையாக பராமரித்தல்',
        'உற்பத்தித்திறன் செயல்பாடுகளை முறையாக பராமரித்தல்',
        'திட்டமிடல் செயலகத்தின் பாதுகாப்பு, சுகாதாரம் மற்றும் பராமரிப்பு தொடர்பான அனைத்து விஷயங்களும்',
        'திட்டமிடல் செயலகத்திற்கு சொந்தமான அதிகாரப்பூர்வ குடியிருப்புகள் தொடர்பான அனைத்து கடமைகளும்',
        'அலுவலக கட்டிடங்கள், இயந்திரங்கள் மற்றும் உபகரணங்களின் பழுதுபார்ப்பு மற்றும் பராமரிப்பு',
        '2016 ஆம் ஆண்டு எண் 12 தகவல் அறியும் உரிமைச் சட்டம் தொடர்பான தகவல்களை வழங்குதல் தொடர்பான செயல்பாடுகள்',
        'தென் மாகாண திட்டமிடல் செயலகத்தின் நூலகத்தை பராமரிக்க தேவையான அனைத்து செயல்பாடுகளும்',
        'சொத்து மேலாண்மை தொடர்பான அனைத்து செயல்பாடுகளும்',
      ],
    },
    responsibilities: {
      en: [
        'Daily mail received by the Southern Provincial Planning Secretariat to the relevant divisions and expeditious delivery of letters sent by the Southern Provincial Planning Secretariat',
        'Maintaining the personal files of the officers of the Southern Provincial Planning Secretariat and all the related corporate activities',
        'All matters relating to vehicles such as reservation and maintenance of vehicles of the Southern Provincial Planning Secretariat',
        'All activities related to car accidents',
        'Activities related to auctioning and disposal of vehicles belonging to the Southern Provincial Planning Secretariat',
        'All matters related to the daily attendance and leave of all the officers of the Planning Secretariat',
        'All activities related to foreign holidays',
        'Activities related to issuance of vehicle licenses on concessionary basis as per Trade Investment and Policy Circulars for Officers of Vehicle License Planning Secretariat',
        'Activities related to payment of railway licenses and agrahara insurance claims',
        'Activities related to overtime and holiday pay approval of the officers of the Planning Secretariat',
        'All matters related to payment of water, electricity and telephone bills of the Planning Secretariat',
        'Preparation of monthly report of vacancies belonging to the Planning Secretariat',
        'Maintaining and maintaining the archives properly',
        'Maintain productivity activities properly',
        'All matters relating to security, sanitation and maintenance of the Planning Secretariat',
        'All duties related to the official quarters belonging to the Planning Secretariat',
        'Performing all procurement activities of the Southern Provincial Planning Secretariat',
        'Carrying out repairs and maintenance of office buildings, machinery and equipment',
        'Activities related to providing information related to the Right to Information Act No. 12 of 2016',
        'All activities required to maintain the library of the Southern Provincial Planning Secretariat',
        'Activities related to documents related to the Southern Province Rural Development Project',
        'All activities related to keeping the store up to date and issuing stationery',
        'All activities related to asset management',
        'Answering audit queries',
        'Responding to the Annual Auditor General\'s Report',
      ],
      si: [
        'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලයට ලැබෙන දෛනික තැපෑල අදාළ අංශ වෙත ලබා දීම සහ ලේකම් කාර්යාලය මඟින් යවන ලිපි ඉක්මනින් ලබා දීම',
        'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලයේ නිලධාරීන්ගේ පෞද්ගලික ගොනු නඩත්තු කිරීම සහ ඒ සම්බන්ධ සියලු ආයතනික කටයුතු',
        'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලයේ රථවාහන වෙන් කිරීම සහ නඩත්තු කිරීම ඇතුළු රථවාහන සම්බන්ධ සියලු කරුණු',
        'රිය අනතුරු සම්බන්ධ සියලු කටයුතු',
        'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලයට අයත් වාහන වෙන්දේසි කිරීම සහ බැහැර කිරීම සම්බන්ධ කටයුතු',
        'සැලසුම් ලේකම් කාර්යාලයේ සියලු නිලධාරීන්ගේ දෛනික පැමිණීම සහ නිවාඩු සම්බන්ධ සියලු කරුණු',
        'විදේශ නිවාඩු සම්බන්ධ සියලු කටයුතු',
        'වාහන බලපත්‍ර සැලසුම් ලේකම් කාර්යාලයේ නිලධාරීන් සඳහා වෙළඳ ආයෝජන හා ප්‍රතිපත්ති චක්‍ර ලේඛ අනුව සහන පදනමින් වාහන බලපත්‍ර නිකුත් කිරීම සම්බන්ධ කටයුතු',
        'දුම්රිය බලපත්‍ර ගෙවීම් සහ අග්‍රහාර රක්ෂණ හිමිකම් සම්බන්ධ කටයුතු',
        'සැලසුම් ලේකම් කාර්යාලයේ නිලධාරීන්ගේ අතිකාල හා නිවාඩු දින ගෙවීම් අනුමැතිය සම්බන්ධ කටයුතු',
        'සැලසුම් ලේකම් කාර්යාලයේ ජල, විදුලි සහ දුරකථන බිල්පත් ගෙවීම් සම්බන්ධ සියලු කරුණු',
        'සැලසුම් ලේකම් කාර්යාලයට අයත් පුරප්පාඩු පිළිබඳ මාසික වාර්තාව සකස් කිරීම',
        'ලිපිකාර කාර්යාලය නිසි ලෙස නඩත්තු කිරීම',
        'ඵලදායිතා කටයුතු නිසි ලෙස නඩත්තු කිරීම',
        'සැලසුම් ලේකම් කාර්යාලයේ ආරක්ෂාව, සනීපාරක්ෂාව සහ නඩත්තු සම්බන්ධ සියලු කරුණු',
        'සැලසුම් ලේකම් කාර්යාලයට අයත් නිල නිවාස සම්බන්ධ සියලු රාජකාරි',
        'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලයේ සියලු ප්‍රසම්පාදන කටයුතු සිදු කිරීම',
        'කාර්යාල ගොඩනැගිලි, යන්ත්‍ර සහ උපකරණ අලුත්වැඩියා කිරීම සහ නඩත්තු කිරීම',
        '2016 අංක 12 දරන තොරතුරු දැනගැනීමේ අයිතිවාසිකම් පනත සම්බන්ධ තොරතුරු සැපයීමේ කටයුතු',
        'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලයේ පුස්තකාලය නඩත්තු කිරීමට අවශ්‍ය සියලු කටයුතු',
        'දකුණු පළාත් ග්‍රාමීය සංවර්ධන ව්‍යාපෘතිය සම්බන්ධ ලේඛන සම්බන්ධ කටයුතු',
        'ගබඩාව යාවත්කාලීනව තබා ගැනීම සහ කෙළෙඹ ද්‍රව්‍ය නිකුත් කිරීම සම්බන්ධ සියලු කටයුතු',
        'වත්කම් කළමනාකරණය සම්බන්ධ සියලු කටයුතු',
        'විගණන විමසීම්වලට පිළිතුරු දීම',
        'වාර්ෂික විගණන අධිකාරී ජනරාල්ගේ වාර්තාවට ප්‍රතිචාර දැක්වීම',
      ],
      ta: [
        'தென் மாகாண திட்டமிடல் செயலகத்திற்கு வரும் தினசரி அஞ்சலை உரிய பிரிவுகளுக்கு வழங்குதல் மற்றும் திட்டமிடல் செயலகம் அனுப்பும் கடிதங்களை விரைவாக வழங்குதல்',
        'தென் மாகாண திட்டமிடல் செயலகத்தின் அதிகாரிகளின் தனிப்பட்ட கோப்புகளை பராமரித்தல் மற்றும் அதன் அனைத்து நிறுவன செயல்பாடுகளும்',
        'தென் மாகாண திட்டமிடல் செயலகத்தின் வாகனங்களை முன்பதிவு செய்தல் மற்றும் பராமரிப்பு உள்ளிட்ட அனைத்து வாகன விஷயங்களும்',
        'வாகன விபத்துகள் தொடர்பான அனைத்து செயல்பாடுகளும்',
        'தென் மாகாண திட்டமிடல் செயலகத்திற்கு சொந்தமான வாகனங்களை ஏலம் விடுதல் மற்றும் அகற்றுதல் தொடர்பான செயல்பாடுகள்',
        'திட்டமிடல் செயலகத்தின் அனைத்து அதிகாரிகளின் தினசரி வருகை மற்றும் விடுப்பு தொடர்பான அனைத்து விஷயங்களும்',
        'வெளிநாட்டு விடுமுறைகள் தொடர்பான அனைத்து செயல்பாடுகளும்',
        'வாகன உரிம திட்டமிடல் செயலகத்தின் அதிகாரிகளுக்கு வர்த்தக முதலீடு மற்றும் கொள்கை சுற்றறிக்கைகளின்படி சலுகை அடிப்படையில் வாகன உரிமங்களை வழங்குதல் தொடர்பான செயல்பாடுகள்',
        'இரயில்வே உரிமங்கள் மற்றும் அக்ரஹார காப்பீட்டு கோரல்களுக்கான கொடுப்பனவு தொடர்பான செயல்பாடுகள்',
        'திட்டமிடல் செயலகத்தின் அதிகாரிகளின் மேலதிக நேரம் மற்றும் விடுமுறை ஊதிய அனுமதி தொடர்பான செயல்பாடுகள்',
        'திட்டமிடல் செயலகத்தின் நீர், மின்சாரம் மற்றும் தொலைபேசி கட்டணங்களை செலுத்துதல் தொடர்பான அனைத்து விஷயங்களும்',
        'திட்டமிடல் செயலகத்திற்கு சொந்தமான காலியிடங்கள் பற்றிய மாதாந்திர அறிக்கையை தயாரித்தல்',
        'காப்பகங்களை முறையாக பராமரித்தல்',
        'உற்பத்தித்திறன் செயல்பாடுகளை முறையாக பராமரித்தல்',
        'திட்டமிடல் செயலகத்தின் பாதுகாப்பு, சுகாதாரம் மற்றும் பராமரிப்பு தொடர்பான அனைத்து விஷயங்களும்',
        'திட்டமிடல் செயலகத்திற்கு சொந்தமான அதிகாரப்பூர்வ குடியிருப்புகள் தொடர்பான அனைத்து கடமைகளும்',
        'தென் மாகாண திட்டமிடல் செயலகத்தின் அனைத்து கொள்முதல் செயல்பாடுகளையும் மேற்கொள்ளுதல்',
        'அலுவலக கட்டிடங்கள், இயந்திரங்கள் மற்றும் உபகரணங்களின் பழுதுபார்ப்பு மற்றும் பராமரிப்பு',
        '2016 ஆம் ஆண்டு எண் 12 தகவல் அறியும் உரிமைச் சட்டம் தொடர்பான தகவல்களை வழங்குதல் தொடர்பான செயல்பாடுகள்',
        'தென் மாகாண திட்டமிடல் செயலகத்தின் நூலகத்தை பராமரிக்க தேவையான அனைத்து செயல்பாடுகளும்',
        'தென் மாகாண கிராமிய வளர்ச்சி திட்டம் தொடர்பான ஆவணங்கள் தொடர்பான செயல்பாடுகள்',
        'கடையை புதுப்பித்த நிலையில் வைத்திருத்தல் மற்றும் எழுதுபொருட்களை வழங்குதல் தொடர்பான அனைத்து செயல்பாடுகளும்',
        'சொத்து மேலாண்மை தொடர்பான அனைத்து செயல்பாடுகளும்',
        'தணிக்கை கேள்விகளுக்கு பதிலளித்தல்',
        'ஆண்டு தணிக்கையாளர் நாயக அறிக்கைக்கு பதிலளித்தல்',
      ],
    },
    services: {
      en: ['Human Resource Management', 'Leave Administration', 'Records Management'],
      si: ['මානව සම්පත් කළමනාකරණය', 'නිවාඩු පරිපාලනය', 'ලේඛන කළමනාකරණය'],
      ta: ['மனித வள மேலாண்மை', 'விடுப்பு நிர்வாகம்', 'பதிவு மேலாண்மை'],
    },
  },

  development: {
    icon: TrendingUp,
    accentColor: '#2E6830',
    staff: '30+',
    profilePath: null,
    headName:    null,
    headPosition: null,
    title: {
      en: 'Development Division',
      si: 'සංවර්ධන අංශය',
      ta: 'வளர்ச்சித் துறை',
    },
    badge: { en: 'Development & Planning', si: 'සංවර්ධන හා සැලසුම්', ta: 'வளர்ச்சி & திட்டமிடல்' },
    subtitle: {
      en: 'Driving development planning, project implementation, and monitoring across the Southern Province.',
      si: 'දකුණු පළාත හරහා සංවර්ධන සැලසුම්, ව්‍යාපෘති ක්‍රියාත්මක කිරීම සහ නිරීක්ෂණය ශක්තිමත් කිරීම.',
      ta: 'தென் மாகாணம் முழுவதும் வளர்ச்சி திட்டமிடல், திட்ட செயல்படுத்தல் மற்றும் கண்காணிப்பை மேம்படுத்துதல்.',
    },
    overview: {
      en: 'The Development Division is the strategic core of the Planning Secretariat, responsible for coordinating, monitoring, and evaluating development programmes and projects across the Southern Province. It works closely with government ministries, district secretariats, local authorities, and development agencies to ensure that provincial development plans are aligned with national policies and effectively implemented. The department champions evidence-based planning, data management, and performance monitoring to maximise the impact of public investments.',
      si: 'සංවර්ධන අංශය සැලසුම් ලේකම් කාර්යාලයේ උපායමාර්ගික මූලය වන අතර, දකුණු පළාත හරහා සංවර්ධන වැඩසටහන් සහ ව්‍යාපෘති සම්බන්ධීකරණය, නිරීක්ෂණය සහ ඇගයීම සඳහා වගකිව යුතු වේ. ජාතික ප්‍රතිපත්තිවලට අනුකූලව පළාත් සංවර්ධන සැලසුම් ඵලදායී ලෙස ක්‍රියාත්මක කිරීම සහතික කිරීමට රජයේ අමාත්‍යාංශ, දිස්ත්‍රික් ලේකම් කාර්යාල, ප්‍රාදේශීය බලධාරීන් සහ සංවර්ධන ආයතන සමඟ සමීපව කටයුතු කරයි.',
      ta: 'வளர்ச்சித் துறை திட்டமிடல் செயலகத்தின் மூலோபாய மையமாகும், தென் மாகாணம் முழுவதும் வளர்ச்சி திட்டங்கள் மற்றும் திட்டங்களை ஒருங்கிணைக்கவும், கண்காணிக்கவும், மதிப்பீடு செய்யவும் பொறுப்பாகும். தேசிய கொள்கைகளுக்கு இணங்க மாகாண வளர்ச்சி திட்டங்கள் திறம்பட செயல்படுத்தப்படுவதை உறுதி செய்ய அரசாங்க அமைச்சகங்கள், மாவட்ட செயலகங்கள், உள்ளாட்சி அமைப்புகள் மற்றும் வளர்ச்சி நிறுவனங்களுடன் நெருக்கமாக செயல்படுகிறது.',
    },
    functions: {
      en: [
        'Preparation of annual and medium-term development plans',
        'Coordination of capital expenditure programmes and projects',
        'Monitoring and evaluation of ongoing development projects',
        'Data collection, analysis, and development statistics management',
        'Liaison with national line ministries on development matters',
        'Preparation of the Provincial Annual Report and progress reviews',
        'Coordination of special development initiatives and programmes',
        'Facilitation of donor-funded and foreign-aided projects',
      ],
      si: [
        'වාර්ෂික හා මධ්‍යකාලීන සංවර්ධන සැලසුම් සකස් කිරීම',
        'ප්‍රාග්ධන වියදම් වැඩසටහන් සහ ව්‍යාපෘති සම්බන්ධීකරණය',
        'ක්‍රියාත්මකවෙමින් පවතින සංවර්ධන ව්‍යාපෘති නිරීක්ෂණය සහ ඇගයීම',
        'දත්ත සංකලනය, විශ්ලේෂණය සහ සංවර්ධන සංඛ්‍යාලේඛන කළමනාකරණය',
        'සංවර්ධන කරුණු පිළිබඳ ජාතික රේඛා අමාත්‍යාංශ සමඟ සම්බන්ධකාරිත්වය',
        'පළාත් වාර්ෂික වාර්තාව සහ ප්‍රගති සමීක්ෂණ සකස් කිරීම',
        'විශේෂ සංවර්ධන මුලපිරීම් සහ වැඩසටහන් සම්බන්ධීකරණය',
        'ශිෂ්‍යත්ව ලද සහ විදේශ ආධාරලද ව්‍යාපෘති සඳහා සහල් කිරීම',
      ],
      ta: [
        'ஆண்டு மற்றும் நடுத்தர கால வளர்ச்சி திட்டங்களை தயாரித்தல்',
        'மூலதன செலவு திட்டங்கள் மற்றும் திட்டங்களை ஒருங்கிணைத்தல்',
        'நடந்துகொண்டிருக்கும் வளர்ச்சி திட்டங்களை கண்காணித்தல் மற்றும் மதிப்பீடு',
        'தரவு சேகரிப்பு, பகுப்பாய்வு மற்றும் வளர்ச்சி புள்ளியியல் மேலாண்மை',
        'வளர்ச்சி விஷயங்களில் தேசிய வரிசை அமைச்சகங்களுடன் தொடர்பு',
        'மாகாண ஆண்டு அறிக்கை மற்றும் முன்னேற்ற மதிப்பாய்வுகளை தயாரித்தல்',
        'சிறப்பு வளர்ச்சி முன்முயற்சிகள் மற்றும் திட்டங்களை ஒருங்கிணைத்தல்',
        'நன்கொடையாளர் நிதியளிக்கப்பட்ட திட்டங்களை எளிதாக்குதல்',
      ],
    },
    responsibilities: {
      en: [
        'Ensuring alignment of provincial plans with national development priorities',
        'Monitoring project implementation timelines and deliverables',
        'Reporting progress of capital projects to the Governor and Council',
        'Coordinating with district and divisional secretariats on development',
        'Maintaining a comprehensive database of all development projects',
        'Conducting field visits and inspections to verify project progress',
        'Preparation of sectoral analysis and thematic development reports',
      ],
      si: [
        'ජාතික සංවර්ධන ප්‍රාධාන්‍යයන් සමඟ පළාත් සැලසුම් සංසර්ජනය සහතික',
        'ව්‍යාපෘති ක්‍රියාත්මක කාලසීමාවන් සහ නිමෙවිලි නිරීක්ෂණය',
        'ආණ්ඩුකාර සහ සභාවට ප්‍රාග්ධන ව්‍යාපෘතිවල ප්‍රගතිය වාර්තා කිරීම',
        'සංවර්ධනය පිළිබඳ දිස්ත්‍රික් සහ ප්‍රාදේශීය ලේකම් කාර්යාල සමඟ සම්බන්ධීකරණය',
        'සියලු සංවර්ධන ව්‍යාපෘතිවල ස්ථාවර දත්ත සමුදා නඩත්තු',
        'ව්‍යාපෘති ප්‍රගතිය සත්‍යාපනය කිරීම සඳහා ක්ෂේත්‍ර සංචාර සහ පරීක්ෂාවන් පැවැත්වීම',
        'අංශීය විශ්ලේෂණය සහ තේමාව සංවර්ධන වාර්තා සකස් කිරීම',
      ],
      ta: [
        'தேசிய வளர்ச்சி முன்னுரிமைகளுடன் மாகாண திட்டங்களை சீரமைப்பதை உறுதி செய்தல்',
        'திட்ட செயல்படுத்தல் காலவரிசைகள் மற்றும் வழங்கல்களை கண்காணித்தல்',
        'ஆளுநர் மற்றும் சபைக்கு மூலதன திட்டங்களின் முன்னேற்றத்தை அறிவித்தல்',
        'வளர்ச்சியில் மாவட்ட மற்றும் பிரிவு செயலகங்களுடன் ஒருங்கிணைப்பு',
        'அனைத்து வளர்ச்சி திட்டங்களின் விரிவான தரவுத்தளத்தை பராமரித்தல்',
        'திட்ட முன்னேற்றத்தை சரிபார்க்க கள வருகைகள் மற்றும் ஆய்வுகளை நடத்துதல்',
        'துறை சார் பகுப்பாய்வு மற்றும் கருப்பொருள் வளர்ச்சி அறிக்கைகளை தயாரித்தல்',
      ],
    },
    services: {
      en: ['Development Planning', 'Project Monitoring', 'Data Analytics', 'Annual Reports', 'Field Inspection', 'Donor Coordination'],
      si: ['සංවර්ධන සැලසුම', 'ව්‍යාපෘති නිරීක්ෂණය', 'දත්ත විශ්ලේෂණය', 'වාර්ෂික වාර්තා', 'ක්ෂේත්‍ර පරීක්ෂාව', 'ශිෂ්‍යත්ව සම්බන්ධීකරණය'],
      ta: ['வளர்ச்சி திட்டமிடல்', 'திட்ட கண்காணிப்பு', 'தரவு பகுப்பாய்வு', 'ஆண்டு அறிக்கைகள்', 'கள ஆய்வு', 'நன்கொடை ஒருங்கிணைப்பு'],
    },
  },
}

/* ─── Quick-nav links ────────────────────────────────────────────── */

const QUICK_LINKS = [
  { key: 'accounts',       path: '/departments/accounts',         labelKey: 'navAccounts',  icon: BookOpen      },
  { key: 'administration', path: '/departments/administration',    labelKey: 'navAdmin',     icon: Settings      },
  { key: 'development',    path: '/departments/development',       labelKey: 'navDev',       icon: TrendingUp    },
  { key: 'head-admin',     path: '/departments/head-administration',labelKey: 'navHeadAdmin',icon: Users         },
  { key: 'head-accounts',  path: '/departments/head-accounts',     labelKey: 'navHeadAcc',  icon: ClipboardList },
]

const NAV_T = {
  en: { navAccounts: 'Accounts', navAdmin: 'Administration', navDev: 'Development', navHeadAdmin: 'Head of Administration', navHeadAcc: 'Head of Accounts', quickNav: 'Quick Navigation' },
  si: { navAccounts: 'ගිණුම්',   navAdmin: 'පරිපාලන',       navDev: 'සංවර්ධන',     navHeadAdmin: 'පරිපාලන ප්‍රධානී',      navHeadAcc: 'ගිණුම් ප්‍රධානී',  quickNav: 'ශීඝ්‍ර සංචලනය' },
  ta: { navAccounts: 'கணக்குகள்',navAdmin: 'நிர்வாகம்',    navDev: 'வளர்ச்சி',    navHeadAdmin: 'நிர்வாக தலைவர்',         navHeadAcc: 'கணக்கு தலைவர்', quickNav: 'விரைவு வழிசெலுத்தல்' },
}

/* ─── Animation variants ─────────────────────────────────────────── */

const fadeUpV  = (delay = 0) => ({ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] } } })
const staggerV = { hidden: {}, visible: { transition: { staggerChildren: 0.10 } } }
const itemV    = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }
const slideRV  = { hidden: { opacity: 0, x: 36 }, visible: { opacity: 1, x: 0, transition: { duration: 0.70, ease: [0.16, 1, 0.3, 1] } } }

/* ─── Honeycomb ─────────────────────────────────────────────────── */

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

/* ─── Sub-components ────────────────────────────────────────────── */

function DetailHero({ dept, lang, meta }) {
  return (
    <section className="dep-hero" aria-labelledby="dep-detail-title">
      <div className="dep-hero__bg"         aria-hidden="true" />
      <div className="dep-hero__noise"       aria-hidden="true" />
      <div className="dep-hero__grid-lines"  aria-hidden="true" />
      <div className="dep-hero__glow dep-hero__glow--gold"   aria-hidden="true" />
      <div className="dep-hero__glow dep-hero__glow--maroon" aria-hidden="true" />
      <div className="dep-hero__glow dep-hero__glow--right"  aria-hidden="true" />
      <div className="dep-hero__watermark" aria-hidden="true">{dept.key.toUpperCase().slice(0,4)}</div>
      <div className="dep-hero__hc" aria-hidden="true"><HoneycombBg /></div>
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`dep-hero__dot dep-hero__dot--${i + 1}`} aria-hidden="true" />
      ))}

      <div className="dep-hero__inner">
        <motion.div className="dep-hero__left" initial="hidden" animate="visible" variants={staggerV}>
          <motion.div className="dep-hero__badge" variants={itemV}>
            <span className="dep-hero__badge-dot" aria-hidden="true" />
            <span style={{
              fontFamily:    meta.isNonLatin ? meta.font : "'Cinzel', serif",
              letterSpacing: meta.isNonLatin ? 0 : '0.13em',
              textTransform: meta.isNonLatin ? 'none' : 'uppercase',
            }}>
              {dept.badge[lang]}
            </span>
          </motion.div>

          <motion.h1
            id="dep-detail-title"
            className="dep-hero__title"
            style={{ fontFamily: meta.headFont, lineHeight: meta.isNonLatin ? 1.35 : 1.06 }}
            variants={itemV}
          >
            {dept.title[lang]}
          </motion.h1>

          <motion.div
            className="dep-hero__rule"
            variants={{ hidden: { scaleX: 0, opacity: 0 }, visible: { scaleX: 1, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
            aria-hidden="true"
          />

          <motion.p className="dep-hero__sub" style={{ fontFamily: meta.font }} variants={itemV}>
            {dept.subtitle[lang]}
          </motion.p>
        </motion.div>

        <motion.div className="dep-hero__right" initial="hidden" animate="visible" variants={slideRV} aria-hidden="true">
          <img
            src="/branding/f-logo.svg"
            alt=""
            className="dep-hero__logo"
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
        </motion.div>
      </div>

      <svg className="dep-hero__wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,80 C240,20 480,60 720,40 C960,20 1200,60 1440,30 L1440,80 Z" fill={CREAM} />
      </svg>
    </section>
  )
}

function QuickNav({ lang, meta, activePath }) {
  const nav  = useNavigate()
  const navT = NAV_T[lang] || NAV_T.en
  return (
    <nav className="dep-ql" aria-label={navT.quickNav}>
      <div className="dep-ql__inner">
        {QUICK_LINKS.map(({ key, path, labelKey, icon: Icon }) => (
          <button
            key={key}
            className={`dep-ql__pill${activePath === path ? ' active' : ''}`}
            onClick={() => nav(path)}
            style={{ fontFamily: meta.font }}
            aria-current={activePath === path ? 'page' : undefined}
          >
            <Icon size={14} aria-hidden="true" />
            {navT[labelKey]}
          </button>
        ))}
      </div>
    </nav>
  )
}

function OverviewSection({ dept, lang, meta, ui }) {
  const serviceIcons = [Shield, Briefcase, Landmark, PieChart, Globe, CheckCircle]
  return (
    <section className="dep-section" aria-labelledby="dep-overview-heading">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={fadeUpV(0)}
      >
        <div className="dep-section__eyebrow" style={{ fontFamily: "'Cinzel', serif" }} aria-hidden="true">
          {ui.overview}
        </div>

        <div className="dep-overview">
          <div className="dep-overview__grid">
            <div>
              <h2
                id="dep-overview-heading"
                className="dep-overview__heading"
                style={{ fontFamily: meta.headFont, lineHeight: meta.isNonLatin ? 1.45 : 1.2 }}
              >
                {dept.title[lang]}
              </h2>
              <p className="dep-overview__body" style={{ fontFamily: meta.font }}>
                {dept.overview[lang]}
              </p>
            </div>
            <div className="dep-overview__stats">
              <div className="dep-stat">
                <div className="dep-stat__icon"><Users size={18} color={GOLD} aria-hidden="true" /></div>
                <div>
                  <div className="dep-stat__label" style={{ fontFamily: meta.font }}>{ui.staffLabel}</div>
                  <div className="dep-stat__value" style={{ fontFamily: "'Cinzel', serif" }}>{dept.staff}</div>
                </div>
              </div>

              <div className="dep-stat">
                <div className="dep-stat__icon"><Globe size={18} color={GOLD} aria-hidden="true" /></div>
                <div>
                  <div className="dep-stat__label" style={{ fontFamily: meta.font }}>{ui.locationLabel}</div>
                  <div className="dep-stat__value" style={{ fontFamily: meta.font, fontSize: '0.88rem' }}>{ui.locationValue}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Services tags */}
          <div style={{ marginTop: '1.75rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(199,154,43,0.10)' }}>
            <div className="dep-section__eyebrow" style={{ fontFamily: "'Cinzel', serif", marginBottom: '0.75rem' }} aria-hidden="true">
              {ui.services}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {(dept.services?.[lang] ?? []).map((s, i) => {
                const SIcon = serviceIcons[i % serviceIcons.length]
                return (
                  <span key={i} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '6px 14px',
                    background: 'rgba(199,154,43,0.07)',
                    border: '1px solid rgba(199,154,43,0.18)',
                    borderRadius: '50px',
                    fontSize: 'clamp(0.70rem,0.88vw,0.78rem)',
                    fontWeight: 600,
                    color: MAROON,
                    fontFamily: meta.font,
                  }}>
                    <SIcon size={12} color={GOLD} aria-hidden="true" />
                    {s}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function FunctionsSection({ dept, lang, meta, ui }) {
  return (
    <section className="dep-section" style={{ paddingTop: 0 }} aria-labelledby="dep-functions-heading">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={staggerV}
      >
        <motion.div variants={itemV} style={{ marginBottom: '1.5rem' }}>
          <div className="dep-section__eyebrow" style={{ fontFamily: "'Cinzel', serif" }} aria-hidden="true">
            {ui.functions}
          </div>
          <h2
            id="dep-functions-heading"
            className="dep-section__heading"
            style={{ fontFamily: meta.headFont, lineHeight: meta.isNonLatin ? 1.45 : 1.15 }}
          >
            {ui.functions}
          </h2>
        </motion.div>

        <motion.div className="dep-func-grid" variants={staggerV}>
          {dept.functions[lang].map((fn, i) => (
            <motion.div key={i} className="dep-func-card" variants={itemV}>
              <div className="dep-func-card__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </div>
              <p className="dep-func-card__text" style={{ fontFamily: meta.font }}>
                {fn}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

function ResponsibilitiesSection({ dept, lang, meta, ui }) {
  return (
    <section className="dep-section" style={{ paddingTop: 0 }} aria-labelledby="dep-resp-heading">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={staggerV}
      >
        <motion.div variants={itemV} style={{ marginBottom: '1.5rem' }}>
          <div className="dep-section__eyebrow" style={{ fontFamily: "'Cinzel', serif" }} aria-hidden="true">
            {ui.responsibilities}
          </div>
          <h2
            id="dep-resp-heading"
            className="dep-section__heading"
            style={{ fontFamily: meta.headFont, lineHeight: meta.isNonLatin ? 1.45 : 1.15 }}
          >
            {ui.responsibilities}
          </h2>
        </motion.div>

        <motion.ul className="dep-resp-list" variants={staggerV} role="list">
          {dept.responsibilities[lang].map((r, i) => (
            <motion.li key={i} className="dep-resp-item" variants={itemV}>
              <span className="dep-resp-item__dot" aria-hidden="true" />
              <span style={{ fontFamily: meta.font }}>{r}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  )
}

function HeadCard({ dept, lang, meta, ui }) {
  if (!dept.profilePath) return null
  return (
    <section className="dep-section" style={{ paddingTop: 0 }} aria-labelledby="dep-head-heading">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={fadeUpV(0)}
      >
        <div className="dep-section__eyebrow" style={{ fontFamily: "'Cinzel', serif", marginBottom: '1rem' }} aria-hidden="true">
          {ui.headCard}
        </div>
        <div className="dep-head-card" role="region" aria-labelledby="dep-head-heading">
          <img
            src={dept.key === 'accounts' ? '/staff/head-accounts.jpg' : '/branding/ao.png'}
            alt={dept.headName[lang]}
            className="dep-head-card__avatar"
            onError={e => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextElementSibling.style.display = 'flex'
            }}
          />
          <div className="dep-head-card__avatar-placeholder" style={{ display: 'none' }} aria-hidden="true">
            <UserCircle2 size={36} color="rgba(199,154,43,0.7)" />
          </div>
          <div className="dep-head-card__info">
            <div className="dep-head-card__role" aria-hidden="true">{ui.headCard}</div>
            <h3 id="dep-head-heading" className="dep-head-card__name" style={{ fontFamily: meta.headFont }}>
              {dept.headName[lang]}
            </h3>
            <p className="dep-head-card__position" style={{ fontFamily: meta.font }}>
              {dept.headPosition[lang]}
            </p>
          </div>
          <Link to={dept.profilePath} className="dep-head-card__btn" style={{ fontFamily: meta.font }}>
            <UserCircle2 size={15} aria-hidden="true" />
            {ui.viewProfile}
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

function DownloadsSection({ dept, lang, meta, ui }) {
  const typeColors = { PDF: '#C73A3A', DOCX: '#1A73E8', XLSX: '#1E7C3E' }
  return (
    <section className="dep-section" style={{ paddingTop: 0 }} aria-labelledby="dep-dl-heading">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={fadeUpV(0)}
      >
        <div className="dep-section__eyebrow" style={{ fontFamily: "'Cinzel', serif", marginBottom: '1rem' }} aria-hidden="true">
          {ui.downloads}
        </div>
        <h2
          id="dep-dl-heading"
          className="dep-section__heading"
          style={{ fontFamily: meta.headFont, marginBottom: '1.25rem', lineHeight: meta.isNonLatin ? 1.45 : 1.15 }}
        >
          {ui.downloads}
        </h2>
        <div className="dep-downloads-grid">
          {dept.downloads[lang].map((dl, i) => (
            <a
              key={i}
              href="#"
              className="dep-dl-item"
              aria-label={`${dl.name} (${dl.type}, ${dl.size})`}
              onClick={e => e.preventDefault()}
            >
              <div className="dep-dl-icon">
                <FileText size={18} color={typeColors[dl.type] || GOLD} aria-hidden="true" />
              </div>
              <div>
                <div className="dep-dl-name" style={{ fontFamily: meta.font }}>{dl.name}</div>
                <div className="dep-dl-meta" style={{ fontFamily: "'Cinzel', serif" }}>
                  <span style={{ color: typeColors[dl.type] || GOLD }}>{dl.type}</span>
                  <span style={{ margin: '0 6px', color: '#BBA090' }}>·</span>
                  <span>{dl.size}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

/* ─── Main export ────────────────────────────────────────────────── */

export default function DepartmentDetail() {
  const heldParent = usePageHold('departments')
  const { slug: deptKey } = useParams()
  const heldSub = usePageHold(`departments__${deptKey}`)
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')

  useEffect(() => {
    const h = (e) => setLang(e.detail || 'en')
    window.addEventListener('langChange', h)
    return () => window.removeEventListener('langChange', h)
  }, [])

  const meta = useMemo(() => LANG_META[lang] || LANG_META.en, [lang])
  const ui   = useMemo(() => UI[lang]        || UI.en,        [lang])
  const dept = DEPT_DATA[deptKey]

  if (heldParent || heldSub) return <ComingSoon pageKey="departments" />
  if (!dept) return <Navigate to="/departments" replace />

  const activePath = `/departments/${deptKey}`

  return (
    <div className="dep-wrap">
      <DetailHero dept={{ ...dept, key: deptKey }} lang={lang} meta={meta} />
      <QuickNav lang={lang} meta={meta} activePath={activePath} />

      {/* Breadcrumb */}
      <nav className="dep-breadcrumb" aria-label="Breadcrumb">
        <div className="dep-breadcrumb__inner">
          <Link to="/home"        style={{ fontFamily: meta.font }}>{ui.breadHome}</Link>
          <span className="dep-breadcrumb__sep" aria-hidden="true"><ChevronRight size={12} /></span>
          <Link to="/departments" style={{ fontFamily: meta.font }}>{ui.breadDepts}</Link>
          <span className="dep-breadcrumb__sep" aria-hidden="true"><ChevronRight size={12} /></span>
          <span className="dep-breadcrumb__cur" style={{ fontFamily: meta.font }}>{dept.title[lang]}</span>
        </div>
      </nav>

      <div className="dep-divider" />

      <OverviewSection         dept={{ ...dept, key: deptKey }} lang={lang} meta={meta} ui={ui} />
      <div className="dep-divider" />
      <FunctionsSection        dept={{ ...dept, key: deptKey }} lang={lang} meta={meta} ui={ui} />
      <div className="dep-divider" />
      <ResponsibilitiesSection dept={{ ...dept, key: deptKey }} lang={lang} meta={meta} ui={ui} />
      {dept.profilePath && <div className="dep-divider" />}
      <HeadCard                dept={{ ...dept, key: deptKey }} lang={lang} meta={meta} ui={ui} />
    </div>
  )
}
