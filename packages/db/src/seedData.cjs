/* ─────────────────────────────────────────────────────────────────────────────
   seedData.js — Southern Province Planning Secretariat
   Literal transcription of hardcoded frontend content into MySQL seed records.
   Each export is an array/object of records ready for db.insert(key, record).
   IDs are stable, hand-picked kebab-case strings (not uuid()) for idempotent,
   debuggable seeding.

   Sources transcribed (verbatim text, no paraphrasing):
     - frontend/src/features/portal/about/aboutData.js
     - frontend/src/features/portal/about-deputy-secretary/AboutDeputySecretary.jsx
     - frontend/src/features/portal/departments/DepartmentProfile.jsx
     - frontend/src/features/portal/departments/Departments.jsx
     - frontend/src/features/portal/departments/DepartmentDetail.jsx
     - frontend/src/features/portal/home/Home.jsx
     - frontend/src/features/portal/home/HomeAboutSecretariat.jsx
     - frontend/src/features/portal/home/HomeDeputySecretaryMessage.jsx
     - frontend/src/features/portal/faq/FAQ.jsx
     - frontend/src/features/portal/home/HomeFAQHighlights.jsx
     - frontend/src/shared/components/Navbar.jsx
     - frontend/src/shared/components/Footer.jsx
     - frontend/src/features/portal/contact/Contact.jsx
───────────────────────────────────────────────────────────────────────────── */

/* ═══════════════════════════════════════════════════════════════════════════
   staffSeed
   Tiers: deputy-secretary (1), director (1), deputy-director (6),
          department-head (2)
═══════════════════════════════════════════════════════════════════════════ */
const staffSeed = [
  /* ── Deputy Chief Secretary – Planning ──────────────────────────────────
     Richer bio/experience/responsibilities sourced from
     AboutDeputySecretary.jsx (T.en/si/ta), which the task instructions say
     to prefer over aboutData.js's shorter KEY_OFFICIALS[0] entry. */
  {
    id: 'deputy-secretary-planning',
    name: {
      en: 'Mr. M.K.G.S.P.K. Jayasekara',
      si: 'එම්.කේ.ජී.එස්.පී.කේ. ජයසේකර මහතා',
      ta: 'திரு எம்.கே.ஜி.எஸ்.பி.கே. ஜயசேகர',
    },
    position: {
      en: 'Deputy Chief Secretary – Planning',
      si: 'නියෝජ්‍ය ප්‍රධාන ලේකම් – සැලසුම්',
      ta: 'துணை தலைமை செயலர் – திட்டமிடல்',
    },
    photo: '/branding/sec-prof.webp',
    phone: '+94 91 450 0656',
    email: 'spdcsp@gmail.com',
    office: 'Southern Province Planning Secretariat, Galle',
    bio: {
      en: 'Mr. M.K.G.S.P.K. Jayasekara serves as the Deputy Chief Secretary (Planning and Monitoring) of the Southern Provincial Council. With more than two decades of experience in development planning, and organizational management, pertaining to the development disciplines he has made significant contributions to regional and national development initiatives throughout his distinguished career as a senior officer of the Sri Lanka Planning Service (SLPS).\n\nSince joining the public service in 2002, he has held several key leadership positions, including Assistant Director (Planning), District Samurdhi Commissioner, Director (Planning) at the Ministry of Agriculture, Director (Planning) of the Southern Provincial Council, Director (Planning) at the District Secretariat Galle, and the Director General (Planning) of the Ministry of Education, Higher Education Division.\n\nHe holds a Bachelor of Science (Agriculture) degree from the University of Ruhuna, a Postgraduate Diploma in Public Management from SLIDA in collaboration with the University of Sri Jayewardenepura, a Postgraduate Diploma in Regional Development and Planning from the University of Kelaniya, and a Master of Human Resources Planning and Development from the Guru Gobind Singh Indraprastha University, New Delhi, India.\n\nRenowned for his expertise in strategic planning, policy implementation, project monitoring, and public sector management, he continues to provide leadership in advancing sustainable development, effective governance, and socio-economic progress across the Southern Province.',
      si: 'එම්.කේ.ජී.එස්.පී.කේ. ජයසේකර මහතා දකුණු පළාත් සභාවේ නියෝජ්‍ය ප්‍රධාන ලේකම් (සැලසුම් හා අධීක්ෂණ) ධුරය දරයි. රාජ්‍ය පරිපාලනය සහ සංවර්ධන සැලසුම් ක්ෂේත්‍රවල දශක දෙකකට වැඩි කාලය, ශ්‍රී ලංකා සැලසුම් සේවයේ (SLPS) ඔහු දිස්ත්‍රික්ක හා ජාතික සංවර්ධන මුලපිරීම්වලට සැලකිය යුතු දායකත්වයක් ලබා දී ඇත.\n\nඔහු 2002 දී රාජ්‍ය සේවයට බැඳී, සහකාර අධ්‍යක්ෂ (සැලසුම්), දිස්ත්‍රික් සමෘද්ධි කොමසාරිස්, කෘෂිකර්ම අමාත්‍යාංශයේ අධ්‍යක්ෂ (සැලසුම්), දකුණු පළාත් සභාවේ අධ්‍යක්ෂ (සැලසුම්), ගාල්ල දිස්ත්‍රික් ලේකම් කාර්යාලයේ අධ්‍යක්ෂ (සැලසුම්) සහ අධ්‍යාපන අමාත්‍යාංශයේ (උසස් අධ්‍යාපන අංශය) අධ්‍යක්ෂ ජනරාල් (සැලසුම්) ඇතුළු ප්‍රධාන නායකත්ව තනතුරු දරා ඇත.\n\nඔහු රුහුණ විශ්වවිද්‍යාලයෙන් කෘෂිකර්ම විද්‍යා ගෞරව විශේෂ (B.Sc. Agriculture) උපාධිය, SLIDA හා ශ්‍රී ජයවර්ධනපුර විශ්වවිද්‍යාලය ඒකාබද්ධව රාජ්‍ය කළමනාකරණ පශ්චාත් උපාධි ඩිප්ලෝමාව, කැළණිය විශ්වවිද්‍යාලයෙන් ප්‍රාදේශීය සංවර්ධනය සහ සැලසුම්කරණය පිළිබද පශ්චාත් උපාධි ඩිප්ලෝමාව සහ ඉන්දියාවේ Guru Gobind Singh Indraprastha University හි මානවසම්පත් සැලසුම්කරණය හා සංවර්ධනය පිළිබඳ ශාස්ත්‍රපති උපාධිය ලබා ඇත.\n\nඋපාය මාර්ගික සැලසුම්, ප්‍රතිපත්ති ක්‍රියාත්මක කිරීම, ව්‍යාපෘති අධීක්ෂණය සහ රාජ්‍ය අංශ කළමනාකරණ ක්ෂේත්‍රවල ප්‍රවීණතාව සඳහා ප්‍රකට ඔහු, දකුණු පළාතේ තිරසාර සංවර්ධනය, ඵලදායි පාලනය සහ සමාජ-ආර්ථික ප්‍රගතිය ඉදිරිපත් කිරීමේ නායකත්වය නිරන්තරව ලබා දෙයි.',
      ta: 'திரு. எம்.கே.ஜி.எஸ்.பி.கே. ஜயசேகர தென் மாகாண சபையின் துணை தலைமை செயலர் (திட்டமிடல் மற்றும் கண்காணிப்பு) பதவியில் பணியாற்றுகிறார். பொது நிர்வாகம் மற்றும் வளர்ச்சித் திட்டமிடல் துறைகளில் இரண்டு தசாப்தங்களுக்கும் மேலான அனுபவத்துடன், இலங்கை திட்டமிடல் சேவையில் (SLPS) தனது சிறந்த தொழில் வாழ்க்கையில் பிராந்திய மற்றும் தேசிய வளர்ச்சி முயற்சிகளுக்கு குறிப்பிடத்தக்க பங்களிப்பை வழங்கியுள்ளார்.\n\n2002 ஆம் ஆண்டு பொதுச் சேவையில் இணைந்தது முதல், உதவி இயக்குநர் (திட்டமிடல்), மாவட்ட சமுர்த்தி ஆணையர், விவசாய அமைச்சகத்தில் இயக்குநர் (திட்டமிடல்), தென் மாகாண சபையில் இயக்குநர் (திட்டமிடல்), காலி மாவட்ட செயலகத்தில் இயக்குநர் (திட்டமிடல்) மற்றும் கல்வி அமைச்சகத்தில் (உயர்கல்வி பிரிவு) இயக்குநர் ஜெனரல் (திட்டமிடல்) உள்ளிட்ட முக்கிய தலைமை பதவிகளை வகித்துள்ளார்.\n\nரஹுண பல்கலைக்கழகத்தில் இருந்து விவசாயவியல் இளங்கலை (B.Sc.) பட்டம், SLIDA மற்றும் ஸ்ரீ ஜயவர்தனபுர பல்கலைக்கழகம் இணைந்து வழங்கும் பொது நிர்வாகத்தில் பட்டமேற்படிப்பு டிப்ளோமா, கேளணிய பல்கலைக்கழகத்தில் பிராந்திய வளர்ச்சி மற்றும் திட்டமிடலில் பட்டமேற்படிப்பு டிப்ளோமா மற்றும் இந்தியாவில் குரு கோவிந்த் சிங் இந்திரப்பிரஸ்த பல்கலைக்கழகத்தில் மனித வள திட்டமிடல் மற்றும் மேம்பாட்டில் முதுகலைப் பட்டம் பெற்றுள்ளார்.\n\nமூலோபாய திட்டமிடல், கொள்கை செயலாக்கம், திட்ட கண்காணிப்பு மற்றும் பொதுத் துறை மேலாண்மை ஆகியவற்றில் தனது நிபுணத்துவத்திற்காக பெயர் பெற்ற அவர், தென் மாகாணம் முழுவதும் நிலையான வளர்ச்சி, திறமையான ஆட்சி மற்றும் சமூக-பொருளாதார முன்னேற்றத்தை மேம்படுத்துவதில் தலைமை வழங்கி வருகிறார்.',
    },
    experience: {
      en: 'Over two decades of distinguished service in public administration and development planning since joining the Sri Lanka Planning Service (SLPS) in 2002.',
      si: 'ශ්‍රී ලංකා සැලසුම් සේවයට (SLPS) 2002 දී බැඳී, රාජ්‍ය පරිපාලනය සහ සංවර්ධන සැලසුම් ක්ෂේත්‍රවල දශක දෙකකට වැඩි කාලයක් කැපවූ සේවාව.',
      ta: '2002 ஆம் ஆண்டு இலங்கை திட்டமிடல் சேவையில் (SLPS) இணைந்து, பொது நிர்வாகம் மற்றும் வளர்ச்சித் திட்டமிடல் துறைகளில் இரண்டு தசாப்தங்களுக்கும் மேலான சேவை.',
    },
    responsibilities: {
      en: [
        'Strategic planning oversight and information for the provincial policy formulation endeavors.',
        'Coordination with provincial and national level planning bodies to delivering an effectful and Results oriented Development Planning Approach.',
        'Administrative supervision of all planning divisions in the provincial setups.',
        'Budget planning, resource allocation and financial oversight of all department endeavors of the Southern Provincial Council.',
        'Monitoring and evaluation of provincial development projects.',
        'Liaison with Finance Commission and Relevant central government agencies.',
        'Representing the Secretariat at official inter-agency Discussions.',
      ],
      si: [
        'උපායමාර්ගික සැලසුම් අධීක්ෂණය සහ පළාත් ප්‍රතිපත්ති සකස් කිරීම',
        'පළාත් හා ජාතික සැලසුම් ආයතන සමඟ සම්බන්ධීකරණය',
        'සියලු සැලසුම් අංශවල පරිපාලන අධීක්ෂණය',
        'අයවැය සැලසුම්, සම්පත් බෙදාහැරීම සහ මූල්‍ය අධීක්ෂණය',
        'පළාත් සංවර්ධන ව්‍යාපෘති අධීක්ෂණය සහ ඇගයීම',
        'මුදල් කොමිෂන් සභාව සහ මධ්‍යම රජයේ ආයතන සමඟ සම්බන්ධතා',
        'නිල ආයතන අතර රැස්වීම්වලදී ලේකම් කාර්යාලය නියෝජනය',
      ],
      ta: [
        'மூலோபாய திட்டமிடல் மேற்பார்வை மற்றும் மாகாண கொள்கை உருவாக்கம்',
        'மாகாண மற்றும் தேசிய திட்டமிடல் அமைப்புகளுடன் ஒருங்கிணைப்பு',
        'அனைத்து திட்டமிடல் பிரிவுகளின் நிர்வாக மேற்பார்வை',
        'பட்ஜெட் திட்டமிடல், வள ஒதுக்கீடு மற்றும் நிதி மேற்பார்வை',
        'மாகாண வளர்ச்சி திட்டங்களை கண்காணித்தல் மற்றும் மதிப்பீடு',
        'நிதி ஆணையம் மற்றும் மத்திய அரசு நிறுவனங்களுடன் தொடர்பு',
        'அதிகாரப்பூர்வ நிறுவனங்களுக்கிடையான கூட்டங்களில் செயலகத்தை பிரதிநிதித்துவப்படுத்துதல்',
      ],
    },
    departmentId: null,
    tier: 'deputy-secretary',
    positionRank: 'Senior Executive',
    positionNumber: null,
    featured: true,
    showInDirectory: true,
    order: 0,
    slug: 'deputy-secretary-planning',
  },

  /* ── Director – Planning ──────────────────────────────────────────────── */
  {
    id: 'director-planning',
    name: { en: 'Mrs. K.S.S. Weerawardhane', si: '', ta: '' },
    position: { en: 'Director – Planning', si: '', ta: '' },
    photo: '/branding/dir.webp',
    phone: '+94 91 222 3868',
    email: 'spdcsp@gmail.com',
    office: 'Southern Province Planning Secretariat, Galle',
    bio: { en: '', si: '', ta: '' },
    experience: { en: '', si: '', ta: '' },
    responsibilities: {
      en: [
        {
          text: 'Planning, Development and Monitoring',
          subItems: [
            'Assist in the implementation of development and social welfare programmes at the Divisional Secretariat and Grama Niladhari Division levels.',
            'Coordinate and facilitate the implementation of development and social welfare programmes at the Divisional Secretariat level through relevant government institutions, community organizations, and other stakeholders.',
            'Assist in the implementation, follow-up, monitoring, and evaluation of poverty alleviation and development programmes.',
            'Conduct surveys and maintain related records.',
            'Facilitate the implementation of social welfare programmes and maintain coordination with beneficiary groups and relevant institutions.',
            'Maintain and update beneficiary information through the relevant software system (MS Software), prepare reports, and perform other related duties as assigned.',
          ],
        },
        {
          text: 'Community Participation and Empowerment',
          subItems: [
            'Assist in organizing and conducting awareness programmes at the community level.',
            'Facilitate community participation in development activities and maintain records related to community-based organizations and welfare programmes.',
            'Assist in identifying community needs and issues.',
            'Maintain relevant documentation and reports.',
            'Assist in coordinating with government and non-government organizations engaged in development and welfare activities at the Divisional Secretariat level.',
            'Perform any other duties assigned by the Divisional Secretary or other authorized officers in relation to social welfare, development, poverty alleviation, and community empowerment programmes.',
          ],
        },
      ],
      si: [],
      ta: [],
    },
    departmentId: null,
    tier: 'director',
    positionRank: 'Director Grade',
    positionNumber: null,
    featured: true,
    showInDirectory: true,
    order: 0,
    slug: 'director-planning',
  },

  /* ── Deputy Directors I–VI ───────────────────────────────────────────── */
  {
    id: 'dd-1',
    name: { en: 'Mrs. M.A.K.N. Gunawardana', si: '', ta: '' },
    position: { en: 'Deputy Director – Planning', si: '', ta: '' },
    photo: '/branding/ddsp1.webp',
    phone: '+94 91 222 XXXX',
    email: 'spdcsp@gmail.com',
    office: 'Planning Division I, Southern Province',
    bio: { en: '', si: '', ta: '' },
    experience: { en: '', si: '', ta: '' },
    responsibilities: {
      en: [
        'Coordination of planning activities in assigned district',
        'Preparation of divisional planning reports',
        'Field supervision of development projects',
        'Data collection and statistical analysis',
        'Liaison with local government authorities',
      ],
      si: [],
      ta: [],
    },
    departmentId: null,
    tier: 'deputy-director',
    positionRank: null,
    positionNumber: 'I',
    featured: false,
    showInDirectory: true,
    order: 0,
    slug: 'deputy-directors/1',
  },
  {
    id: 'dd-2',
    name: { en: 'Mrs. Chandrika Malepathirana', si: '', ta: '' },
    position: { en: 'Deputy Director – Planning', si: '', ta: '' },
    photo: '/branding/ddsp2.webp',
    phone: '0912227882',
    email: 'spdcsp@gmail.com',
    office: 'Planning Secretariat, Southern Province',
    bio: { en: '', si: '', ta: '' },
    experience: { en: '', si: '', ta: '' },
    responsibilities: {
      en: [
        {
          text: 'Planning and coordinating development initiatives in the following ministry and relevant sectors:',
          subItems: [
            'Education Ministry',
            'Education Department',
            'Southern Province Road Development Authority',
            'Land and Land Development Authority',
            'School Nutrition Programme',
            'Rural Bridges Development',
            'Clean Sri Lanka Programme of Education Sector',
          ],
        },
        'Monitoring of the annual development plan in the above sectors',
        'Reporting, reviewing and referring progress of the annual development plan to the relevant institutions',
      ],
      si: [],
      ta: [],
    },
    departmentId: null,
    tier: 'deputy-director',
    positionRank: null,
    positionNumber: 'II',
    featured: false,
    showInDirectory: true,
    order: 1,
    slug: 'deputy-directors/2',
  },
  {
    id: 'dd-3',
    name: { en: 'Mrs. N.C. Dissanayake', si: '', ta: '' },
    position: { en: 'Deputy Director – Planning', si: '', ta: '' },
    photo: '/branding/ddsp3.webp',
    phone: '0912231197',
    email: 'spdcsp@gmail.com',
    office: 'Planning Secretariat, Southern Province',
    bio: { en: '', si: '', ta: '' },
    experience: { en: '', si: '', ta: '' },
    responsibilities: {
      en: [
        'Planning and coordinating Agriculture sector development initiatives in the province',
        'Facilitating implementation and monitoring of Agriculture sector projects',
        'Managing Provincial Climate Unit activities effectively',
        'Coordinating Provincial Adaptation Plan implementation activities',
        'Field supervision of development projects',
      ],
      si: [],
      ta: [],
    },
    departmentId: null,
    tier: 'deputy-director',
    positionRank: null,
    positionNumber: 'III',
    featured: false,
    showInDirectory: true,
    order: 2,
    slug: 'deputy-directors/3',
  },
  {
    id: 'dd-4',
    name: { en: 'Mrs. H.I.H. Salgamuwa', si: '', ta: '' },
    position: { en: 'Deputy Director – Planning', si: '', ta: '' },
    photo: '/branding/ddsp4.webp',
    phone: '0912248750',
    email: 'spdcsp@gmail.com',
    office: 'Planning Secretariat, Southern Province',
    bio: { en: '', si: '', ta: '' },
    experience: { en: '', si: '', ta: '' },
    responsibilities: {
      en: [
        {
          text: 'Planning and controlling development initiatives in the following sectors in the province:',
          subItems: [
            'Inland Fisheries',
            'Estate Infrastructure',
            'Rural Electrification',
            'Livestock',
            'Environment',
            'Small Industries',
          ],
        },
        'Monitoring of the annual development plan relevant to the above sectors',
        'Reporting progress of the annual development plan',
      ],
      si: [],
      ta: [],
    },
    departmentId: null,
    tier: 'deputy-director',
    positionRank: null,
    positionNumber: 'IV',
    featured: false,
    showInDirectory: true,
    order: 3,
    slug: 'deputy-directors/4',
  },
  {
    id: 'dd-5',
    name: { en: 'Mrs. A.K.E. Madusarani', si: '', ta: '' },
    position: { en: 'Deputy Director – Planning', si: '', ta: '' },
    photo: '/branding/ddsp5.webp',
    phone: '+94 91 223 1943',
    email: 'spdcsp@gmail.com',
    office: 'Planning Secretariat, Southern Province',
    bio: { en: '', si: '', ta: '' },
    experience: { en: '', si: '', ta: '' },
    responsibilities: {
      en: [
        'Coordination of planning and monitoring implementation activities in Southern Province Chief Ministry',
        'Preparation of provincial annual development estimate and plans for PSDG and CBG',
        'Coordination of the Provincial Planning Committee',
        'Coordination and fund allocation for Special Grants, Flexible Grants, and related grants',
        'Field supervision of development projects under Chief Ministry, Special and Flexible Grants',
        'Preparation of the annual weightages for PSDG sectors and coordination of Budget Allocations',
      ],
      si: [],
      ta: [],
    },
    departmentId: null,
    tier: 'deputy-director',
    positionRank: null,
    positionNumber: 'V',
    featured: false,
    showInDirectory: true,
    order: 4,
    slug: 'deputy-directors/5',
  },
  {
    id: 'dd-6',
    name: { en: 'Mrs. A.D.S. Priyadarshani', si: '', ta: '' },
    position: { en: 'Deputy Director – Planning', si: '', ta: '' },
    photo: '/branding/ddsp6.webp',
    phone: '0912248750',
    email: 'spdcsp@gmail.com',
    office: 'Planning Secretariat, Southern Province',
    bio: { en: '', si: '', ta: '' },
    experience: { en: '', si: '', ta: '' },
    responsibilities: {
      en: [
        {
          text: 'Planning and coordinating the following sectors\' development initiatives in the province:',
          subItems: [
            'Sports',
            'Rural Development',
            'Social Welfare',
            'Cultural and Art Affairs',
            'Probation and Child Care Services',
            'Housing and Construction',
            'Youth Affairs',
            'Women\'s Affairs',
            'Manpower and Employment',
            'Home Economy Enhancement',
          ],
        },
        'Monitoring of the annual development plan relevant to the above sectors',
        'Field supervision of development projects',
      ],
      si: [],
      ta: [],
    },
    departmentId: null,
    tier: 'deputy-director',
    positionRank: null,
    positionNumber: 'VI',
    featured: false,
    showInDirectory: true,
    order: 5,
    slug: 'deputy-directors/6',
  },

  /* ── Department Heads ───────────────────────────────────────────────────
     Sourced from DepartmentProfile.jsx PROFILES (head-administration,
     head-accounts). Note: head-accounts imgSrc in source is
     '/staff/head-accounts.jpg' (NOT under /branding/, NOT .webp) —
     transcribed verbatim as this is a distinct asset path, not one of the
     /branding/*.png|jpg cases the webp-rename rule targets. */
  {
    id: 'dept-head-administration',
    name: {
      en: 'Mrs. K.K.G. Chandrika',
      si: 'කේ.ජී. චන්ද්‍රිකා මහත්මිය',
      ta: 'திருமதி. கே.கே.ஜி. சந்திரிகா',
    },
    position: {
      en: 'Administrative Officer',
      si: 'පරිපාලන නිලධාරී',
      ta: 'நிர்வாக அலுவலர்',
    },
    photo: '/branding/ao.webp',
    phone: '+94 91 223 1943',
    email: 'spdcsp@gmail.com',
    office: 'Administration Wing, Planning Secretariat, Galle',
    bio: { en: '', si: '', ta: '' },
    experience: { en: '', si: '', ta: '' },
    responsibilities: {
      en: [
        'Overall administration and institutional management of the Secretariat',
        'Strategic human resource planning and staff development',
        'Policy implementation and compliance oversight',
        'Budget coordination and resource management for the department',
        'Stakeholder liaison and inter-departmental coordination',
        'Performance management and appraisal systems',
        'Ensuring adherence to government service procedures and regulations',
      ],
      si: [
        'ලේකම් කාර්යාලයේ සමස්ත පරිපාලනය සහ ආයතනික කළමනාකරණය',
        'උපායමාර්ගික මානව සම්පත් සැලසුම් සහ කාර්ය මණ්ඩල සංවර්ධනය',
        'ප්‍රතිපත්ති ක්‍රියාත්මක කිරීම සහ අනුකූලතා අධීක්ෂණය',
        'අංශය සඳහා අයවැය සම්බන්ධීකරණය සහ සම්පත් කළමනාකරණය',
        'මූලධාරා ස්ථාවරධාරියන් සම්බන්ධ කිරීම සහ අංශ අතර සම්බන්ධීකරණය',
        'ක්‍රියාකාරිත්ව කළමනාකරණය සහ ඇගයීම් පද්ධති',
        'රාජ්‍ය සේවා ක්‍රියා පටිපාටි සහ නීති රීතිවලට අනුකූලව සිටීම සහතික',
      ],
      ta: [
        'செயலகத்தின் ஒட்டுமொத்த நிர்வாகம் மற்றும் நிறுவன மேலாண்மை',
        'மூலோபாய மனிதவள திட்டமிடல் மற்றும் ஊழியர் மேம்பாடு',
        'கொள்கை செயல்படுத்தல் மற்றும் இணக்கம் மேற்பார்வை',
        'துறைக்கான பட்ஜெட் ஒருங்கிணைப்பு மற்றும் வள மேலாண்மை',
        'பங்குதாரர் தொடர்பு மற்றும் துறைகளுக்கிடையேயான ஒருங்கிணைப்பு',
        'செயல்திறன் மேலாண்மை மற்றும் மதிப்பீட்டு அமைப்புகள்',
        'அரசாங்க சேவை நடைமுறைகள் மற்றும் விதிமுறைகளை கடைப்பிடிப்பதை உறுதி செய்தல்',
      ],
    },
    departmentId: 'dept-administration',
    tier: 'department-head',
    positionRank: null,
    positionNumber: null,
    featured: false,
    showInDirectory: true,
    order: 0,
    slug: 'departments/head-administration',
    /* extra field preserved from source, not in the core shape */
    badge: {
      en: 'Administrative Officer',
      si: 'පරිපාලන නිලධාරී',
      ta: 'நிர்வாக அலுவலர்',
    },
  },
  {
    id: 'dept-head-accounts',
    name: {
      en: 'Mrs. D.V. Dishani',
      si: 'ඩී.වී. දිශානි මහත්මිය',
      ta: 'திருமதி. டி.வி. திஷானி',
    },
    position: {
      en: 'Accountant (Acting)',
      si: 'ගණකාධිකාරී (වැඩබලන)',
      ta: 'கணக்காளர் (பொ.)',
    },
    photo: '/staff/head-accounts.jpg',
    phone: '+94 91 212 1317',
    email: 'spdcsp@gmail.com',
    office: 'Planning Secretariat, Galle',
    bio: { en: '', si: '', ta: '' },
    experience: { en: '', si: '', ta: '' },
    responsibilities: {
      en: [
        'Overall financial management and budget oversight of the Secretariat',
        'Ensuring timely and accurate preparation of all financial statements',
        'Coordination with the Auditor General and Treasury officials',
        'Implementation of government financial regulations and Treasury circulars',
        'Management of all accounts staff and capacity development',
        'Preparation and submission of annual budget estimates',
        'Supervision of advances, imprest accounts, and deposits management',
      ],
      si: [
        'ලේකම් කාර්යාලයේ සමස්ත මූල්‍ය කළමනාකරණය සහ අයවැය අධීක්ෂණය',
        'සියලු මූල්‍ය ප්‍රකාශ කාලෝචිත හා නිවැරදිව සකස් කිරීම සහතික',
        'ශ්‍රේෂ්ඨාධිකාරී සහ භාණ්ඩාගාර නිලධාරීන් සමඟ සම්බන්ධීකරණය',
        'රාජ්‍ය මූල්‍ය නියාමන සහ භාණ්ඩාගාර චක්‍ර ලේඛ ක්‍රියාත්මක කිරීම',
        'සියලු ගිණුම් කාර්ය මණ්ඩල කළමනාකරණය සහ ධාරිතා සංවර්ධනය',
        'වාර්ෂික අයවැය ඇස්තමේන්තු සකස් කිරීම සහ ඉදිරිපත් කිරීම',
        'අත්තිකාරම්, ඉම්ප්‍රෙස්ට් ගිණුම් සහ තැන්පතු කළමනාකරණය අධීක්ෂණය',
      ],
      ta: [
        'செயலகத்தின் ஒட்டுமொத்த நிதி மேலாண்மை மற்றும் பட்ஜெட் மேற்பார்வை',
        'அனைத்து நிதி அறிக்கைகளும் சரியான நேரத்தில் துல்லியமாக தயாரிக்கப்படுவதை உறுதி செய்தல்',
        'தணிக்கையாளர் நாயகம் மற்றும் கருவூல அதிகாரிகளுடன் ஒருங்கிணைப்பு',
        'அரசாங்க நிதி விதிமுறைகள் மற்றும் கருவூல சுற்றறிக்கைகளை செயல்படுத்துதல்',
        'அனைத்து கணக்கு ஊழியர்களை நிர்வகித்தல் மற்றும் திறன் மேம்பாடு',
        'ஆண்டு பட்ஜெட் மதிப்பீடுகளை தயாரித்தல் மற்றும் சமர்ப்பித்தல்',
        'முன்பணங்கள், இம்ப்ரெஸ்ட் கணக்குகள் மற்றும் வைப்பு மேலாண்மையை மேற்பார்வையிடுதல்',
      ],
    },
    departmentId: 'dept-accounts',
    tier: 'department-head',
    positionRank: null,
    positionNumber: null,
    featured: false,
    showInDirectory: true,
    order: 1,
    slug: 'departments/head-accounts',
    badge: {
      en: 'Accountant (Acting)',
      si: 'ගණකාධිකාරී (වැඩබලන)',
      ta: 'கணக்காளர் (பொ.)',
    },
  },
]

/* ═══════════════════════════════════════════════════════════════════════════
   faqsSeed
   Zipped from FAQ.jsx's separate en/si/ta arrays by matching `id` — all ids
   verified 1:1 across all three language arrays (g1-g6, p0-p5, d1-d5, r1-r5,
   dep1-dep5, t1-t5 = 6 categories: general, planning, downloads, reports,
   departments, tech). No id mismatches found.

   `featured: true` applied to g6 and p0 because their EN question text is an
   exact match to two of HomeFAQHighlights.jsx's 5 teaser questions. The
   remaining 3 HomeFAQHighlights teaser questions do not text-match any
   FAQ.jsx entry closely enough (different phrasing/answers), so per
   instructions they are added below as new featured rows (faq-home-1,
   faq-home-2, faq-home-3) rather than dropped.
═══════════════════════════════════════════════════════════════════════════ */
const faqsSeed = [
  /* ── General ── */
  {
    id: 'faq-g1',
    category: 'general',
    question: {
      en: 'What is the Southern Province Planning Secretariat?',
      si: 'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය කුමක්ද?',
      ta: 'தென் மாகாண திட்டமிடல் செயலகம் என்றால் என்ன?',
    },
    answer: {
      en: 'The Southern Province Planning Secretariat is the apex planning body responsible for coordinating, monitoring, and evaluating the development activities within the Southern Province. It operates under the Southern Provincial Council.',
      si: 'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය යනු දකුණු පළාත් සංවර්ධන කටයුතු සම්බන්ධීකරණය, අධීක්ෂණය සහ ඇගයීම සඳහා වගකිව යුතු ශ්‍රේෂ්ඨ සැලසුම් ආයතනයයි. එය දකුණු පළාත් සභාව යටතේ ක්‍රියාත්මක වේ.',
      ta: 'தென் மாகாண திட்டமிடல் செயலகம் என்பது தென் மாகாணத்தில் உள்ள வளர்ச்சி நடவடிக்கைகளை ஒருங்கிணைத்தல், கண்காணித்தல் மற்றும் மதிப்பீடு செய்தலுக்கு பொறுப்பான உயர்நிலை திட்டமிடல் அமைப்பாகும். இது தென் மாகாண சபையின் கீழ் செயல்படுகிறது.',
    },
    featured: false,
    order: 0,
  },
  {
    id: 'faq-g2',
    category: 'general',
    question: {
      en: 'Where is the Planning Secretariat located?',
      si: 'සැලසුම් ලේකම් කාර්යාලය පිහිටා ඇත්තේ කොතැනද?',
      ta: 'திட்டமிடல் செயலகம் எங்கு அமைந்துள்ளது?',
    },
    answer: {
      en: 'The Planning Secretariat is located in Galle, the provincial capital of the Southern Province. The exact address and directions can be found on our Contact page.',
      si: 'දකුණු පළාතේ පළාත් අගනුවර වන ගාල්ලෙහි සැලසුම් ලේකම් කාර්යාලය පිහිටා ඇත. නිශ්චිත ලිපිනය සහ දිශාවන් අප අමතන්න පිටුවෙහි ඇත.',
      ta: 'திட்டமிடல் செயலகம் தென் மாகாணத்தின் மாகாண தலைநகரான காலியில் அமைந்துள்ளது. சரியான முகவரி மற்றும் வழிகளை தொடர்பு பக்கத்தில் காணலாம்.',
    },
    featured: false,
    order: 1,
  },
  {
    id: 'faq-g3',
    category: 'general',
    question: {
      en: 'What are the office hours of the Planning Secretariat?',
      si: 'සැලසුම් ලේකම් කාර්යාලයේ කාර්යාල වේලාවන් මොනවාද?',
      ta: 'திட்டமிடல் செயலகத்தின் அலுவலக நேரங்கள் என்ன?',
    },
    answer: {
      en: 'Our office is open Monday to Friday from 8:30 AM to 4:15 PM. We are closed on public holidays and Mercantile holidays. For urgent matters, please use the Contact page to send an inquiry.',
      si: 'අපගේ කාර්යාලය සඳුදා සිට සිකුරාදා දක්වා පෙ.ව. 8:30 සිට ප.ව. 4:15 දක්වා විවෘතව ඇත. රජයේ නිවාඩු දිනවල අපි වසා ඇත.',
      ta: 'எங்கள் அலுவலகம் திங்கள் முதல் வெள்ளி வரை காலை 8:30 மணி முதல் மாலை 4:15 மணி வரை திறந்திருக்கும். பொது விடுமுறை நாட்களில் மூடப்பட்டிருக்கும்.',
    },
    featured: false,
    order: 2,
  },
  {
    id: 'faq-g4',
    category: 'general',
    question: {
      en: 'How can I contact the Planning Secretariat?',
      si: 'සැලසුම් ලේකම් කාර්යාලය ඇමතිය හැකි ආකාරය කෙසේද?',
      ta: 'திட்டமிடல் செயலகத்தை எவ்வாறு தொடர்பு கொள்ளலாம்?',
    },
    answer: {
      en: 'You may contact us through the Contact page on this website, by telephone using numbers listed in the Telephone Directory, or by visiting the office in person during working hours.',
      si: 'මෙම වෙබ් අඩවියේ අප අමතන්න පිටුව හරහා, දුරකථන නාමාවලියේ ඇති අංකවලට ඇමතීමෙන්, හෝ කාර්යාල වේලාවන්හිදී ශාරීරිකව පැමිණීමෙන් ඔබට අපව ඇමතිය හැකිය.',
      ta: 'இந்த இணையதளத்தில் உள்ள தொடர்பு பக்கம் மூலம், தொலைபேசி அட்டவணையில் உள்ள எண்களில் அழைப்பதன் மூலம், அல்லது அலுவலக நேரங்களில் நேரில் வருவதன் மூலம் தொடர்பு கொள்ளலாம்.',
    },
    featured: false,
    order: 3,
  },
  {
    id: 'faq-g5',
    category: 'general',
    question: {
      en: 'Is this portal available in Sinhala and Tamil?',
      si: 'මෙම ද්වාරය සිංහල සහ දමිළ භාෂාවලින් ලබා ගත හැකිද?',
      ta: 'இந்த தளம் சிங்களம் மற்றும் தமிழில் கிடைக்கிறதா?',
    },
    answer: {
      en: 'Yes. This portal supports three languages — English, Sinhala, and Tamil. You can switch languages using the language selector in the navigation bar at the top of the page.',
      si: 'ඔව්. මෙම ද්වාරය ඉංග්‍රීසි, සිංහල සහ දමිළ යන භාෂා තිනකට සහය දක්වයි. ගොනුව ඉහළින් ඇති සංචාලන තීරුවේ භාෂා තෝරාගෙනීමෙන් ඔබට භාෂාව වෙනස් කළ හැකිය.',
      ta: 'ஆம். இந்த தளம் ஆங்கிலம், சிங்களம் மற்றும் தமிழ் என மூன்று மொழிகளை ஆதரிக்கிறது. பக்கத்தின் மேல் உள்ள வழிசெலுத்தல் பட்டியில் உள்ள மொழி தேர்வியைப் பயன்படுத்தி மொழியை மாற்றலாம்.',
    },
    featured: false,
    order: 4,
  },
  {
    id: 'faq-g6',
    category: 'general',
    question: {
      en: 'What is the key role of the Planning Secretariat?',
      si: 'සැලසුම් ලේකම් කාර්යාලයේ ප්‍රධාන කාර්යභාරය කුමක්ද?',
      ta: 'திட்டமிடல் செயலகத்தின் முக்கிய பங்கு என்ன?',
    },
    answer: {
      en: 'The key role of the Southern Province Planning Secretariat is to coordinate, monitor, and evaluate all development activities within the Southern Province. It formulates provincial development plans, allocates resources across provincial ministries and departments, provides technical planning guidance, and ensures that development goals align with national and provincial policies. It also serves as the central body for compiling and publishing provincial statistics, reports, and development data.',
      si: 'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලයේ ප්‍රධාන කාර්යභාරය වන්නේ දකුණු පළාත තුළ සියලු සංවර්ධන කටයුතු සම්බන්ධීකරණය, අධීක්ෂණය සහ ඇගයීමයි. එය පළාත් සංවර්ධන සැලසුම් සකස් කිරීම, පළාත් අමාත්‍යාංශ හා අංශ හරහා සම්පත් වෙන් කිරීම, තාක්ෂණික සැලසුම් මඟ පෙන්වීම ලබා දීම සහ සංවර්ධන ඉලක්ක ජාතික හා පළාත් ප්‍රතිපත්තිවලට අනුකූල බව සහතික කිරීම ඇතුළත් කරයි.',
      ta: 'தென் மாகாண திட்டமிடல் செயலகத்தின் முக்கிய பங்கு தென் மாகாணத்தில் உள்ள அனைத்து வளர்ச்சி நடவடிக்கைகளையும் ஒருங்கிணைத்தல், கண்காணித்தல் மற்றும் மதிப்பீடு செய்தலாகும். இது மாகாண வளர்ச்சி திட்டங்களை உருவாக்குதல், மாகாண அமைச்சகங்கள் மற்றும் திணைக்களங்களுக்கு வளங்களை ஒதுக்குதல், தொழில்நுட்ப திட்டமிடல் வழிகாட்டுதல் வழங்குதல் மற்றும் வளர்ச்சி இலக்குகள் தேசிய மற்றும் மாகாண கொள்கைகளுக்கு இணங்குவதை உறுதி செய்தல் ஆகியவற்றை உள்ளடக்குகிறது.',
    },
    featured: true,
    order: 5,
  },

  /* ── Planning ── */
  {
    id: 'faq-p0',
    category: 'planning',
    question: {
      en: 'How do I find out about development projects in the Southern Province?',
      si: 'දකුණු පළාතේ සංවර්ධන ව්‍යාපෘති ගැන දැනගත හැකි ආකාරය කෙසේද?',
      ta: 'தென் மாகாணத்தில் உள்ள வளர்ச்சி திட்டங்களை எவ்வாறு அறிந்துகொள்வது?',
    },
    answer: {
      en: 'You can find information about development projects through several channels on this portal. The Projects section lists current and past special development programmes. The Reports section contains progress reports and annual summaries of ongoing provincial projects. You may also visit the Downloads section for project-related publications, or contact the Planning Secretariat directly for specific project inquiries.',
      si: 'මෙම ද්වාරයේ ව්‍යාපෘති කොටස, වාර්තා කොටස සහ බාගත කිරීමේ කොටස හරහා සංවර්ධන ව්‍යාපෘති ගැන තොරතුරු ලබා ගත හැකිය. නිශ්චිත ව්‍යාපෘති විමසීම් සඳහා සැලසුම් ලේකම් කාර්යාලය සෙirect ද ඇමතිය හැකිය.',
      ta: 'இந்த தளத்தில் உள்ள திட்டங்கள் பிரிவு, அறிக்கைகள் பிரிவு மற்றும் பதிவிறக்கங்கள் பிரிவு மூலம் வளர்ச்சி திட்டங்கள் பற்றிய தகவல்களை பெறலாம். குறிப்பிட்ட திட்ட விசாரணைகளுக்கு திட்டமிடல் செயலகத்தை நேரடியாகவும் தொடர்பு கொள்ளலாம்.',
    },
    featured: true,
    order: 0,
  },
  {
    id: 'faq-p1',
    category: 'planning',
    question: {
      en: 'What is the Annual Development Plan?',
      si: 'වාර්ෂික සංවර්ධන සැලැස්ම යනු කුමක්ද?',
      ta: 'ஆண்டு வளர்ச்சி திட்டம் என்றால் என்ன?',
    },
    answer: {
      en: 'The Annual Development Plan (ADP) is a comprehensive document prepared each fiscal year outlining the capital and recurrent expenditure proposals for all provincial departments and institutions. It guides resource allocation within the Southern Province.',
      si: 'වාර්ෂික සංවර්ධන සැලැස්ම (ADP) යනු සෑම මූල්‍ය වර්ෂයකම සකස් කරන ලද ප්‍රාන්ත අංශ සහ ආයතන සඳහා ප්‍රාග්ධන සහ ජංගම වියදම් යෝජනා ඉදිරිපත් කරන ලියවිල්ලකි.',
      ta: 'ஆண்டு வளர்ச்சி திட்டம் (ADP) என்பது ஒவ்வொரு நிதியாண்டிலும் தயாரிக்கப்படும் ஒரு விரிவான ஆவணமாகும். இது அனைத்து மாகாண துறைகளுக்கான மூலதன மற்றும் நடப்பு செலவு முன்மொழிவுகளை கோடிட்டுக் காட்டுகிறது.',
    },
    featured: false,
    order: 1,
  },
  {
    id: 'faq-p2',
    category: 'planning',
    question: {
      en: 'How is the Provincial Development Plan prepared?',
      si: 'පළාත් සංවර්ධන සැලැස්ම සකස් කරන ආකාරය කෙසේද?',
      ta: 'மாகாண வளர்ச்சி திட்டம் எவ்வாறு தயாரிக்கப்படுகிறது?',
    },
    answer: {
      en: 'The Provincial Development Plan is prepared through a consultative process involving all provincial line ministries, departments, divisional secretariats, and public stakeholders. The Planning Secretariat coordinates this process and consolidates the final plan.',
      si: 'පළාත් සංවර්ධන සැලැස්ම සාකච්ඡා ක්‍රියාවලියක් හරහා සකස් කෙරේ. සැලසුම් ලේකම් කාර්යාලය මෙම ක්‍රියාවලිය සම්බන්ධීකරණය කර අවසාන සැලැස්ම ඒකාබද්ධ කරයි.',
      ta: 'மாகாண வளர்ச்சி திட்டம் ஆலோசனை செயல்முறை மூலம் தயாரிக்கப்படுகிறது. திட்டமிடல் செயலகம் இந்த செயல்முறையை ஒருங்கிணைக்கிறது.',
    },
    featured: false,
    order: 2,
  },
  {
    id: 'faq-p3',
    category: 'planning',
    question: {
      en: 'How can I submit a development proposal to the Secretariat?',
      si: 'සංවර්ධන යෝජනාවක් ලේකම් කාර්යාලයට ඉදිරිපත් කළ හැකිද?',
      ta: 'வளர்ச்சி முன்மொழிவை செயலகத்திற்கு சமர்ப்பிக்க முடியுமா?',
    },
    answer: {
      en: 'Development proposals should be submitted through the relevant provincial ministry or divisional secretariat. Community organisations and NGOs may also submit proposals using the formal request procedure outlined on the Contact page.',
      si: 'සංවර්ධන යෝජනා අදාළ පළාත් අමාත්‍යාංශය හෝ ප්‍රාදේශීය ලේකම් කාර්යාලය හරහා ඉදිරිපත් කළ යුතුය. ප්‍රජා සංවිධාන සහ රාජ්‍ය නොවන සංවිධාන වෙනත් ක්‍රමවේදයක් හරහා යෝජනා ඉදිරිපත් කළ හැකිය.',
      ta: 'வளர்ச்சி முன்மொழிவுகள் தொடர்புடைய மாகாண அமைச்சகம் அல்லது பிரிவு செயலகம் மூலம் சமர்ப்பிக்கப்பட வேண்டும்.',
    },
    featured: false,
    order: 3,
  },
  {
    id: 'faq-p4',
    category: 'planning',
    question: {
      en: 'What development projects are currently active in the Southern Province?',
      si: 'දකුණු පළාතේ දැනට ක්‍රියාත්මක සංවර්ධන ව්‍යාපෘති මොනවාද?',
      ta: 'தென் மாகாணத்தில் தற்போது செயலில் உள்ள வளர்ச்சி திட்டங்கள் யாவை?',
    },
    answer: {
      en: 'A list of active development projects is updated periodically. Please refer to the Projects section or the Reports section for the latest updates on ongoing provincial development activities.',
      si: 'ක්‍රියාකාරී සංවර්ධන ව්‍යාපෘතිවල ලැයිස්තුව කාලීනව යාවත්කාලීන කෙරේ. නවතම තොරතුරු සඳහා ව්‍යාපෘති කොටස හෝ වාර්තා කොටස බලන්න.',
      ta: 'செயலில் உள்ள வளர்ச்சி திட்டங்களின் பட்டியல் அவ்வப்போது புதுப்பிக்கப்படுகிறது. புதிய தகவல்களுக்கு திட்டங்கள் அல்லது அறிக்கைகள் பிரிவைப் பார்க்கவும்.',
    },
    featured: false,
    order: 4,
  },
  {
    id: 'faq-p5',
    category: 'planning',
    question: {
      en: 'How does the Planning Secretariat monitor development projects?',
      si: 'සැලසුම් ලේකම් කාර්යාලය ව්‍යාපෘති නිරීක්ෂණය කරන ආකාරය කෙසේද?',
      ta: 'திட்டமிடல் செயலகம் வளர்ச்சி திட்டங்களை எவ்வாறு கண்காணிக்கிறது?',
    },
    answer: {
      en: 'The Secretariat conducts regular physical and financial monitoring of all approved provincial development projects. Monthly, quarterly, and annual progress reports are compiled and submitted to the Provincial Council and line ministries.',
      si: 'ලේකම් කාර්යාලය අනුමත ව්‍යාපෘතිවල ශාරීරික සහ මූල්‍ය නිරීක්ෂණය නිතිපතා සිදු කරයි. මාසික, ත්‍රෛමාසික සහ වාර්ෂික ප්‍රගති වාර්තා සකස් කෙරේ.',
      ta: 'செயலகம் அங்கீகரிக்கப்பட்ட அனைத்து மாகாண வளர்ச்சி திட்டங்களின் உடல் மற்றும் நிதி கண்காணிப்பை தொடர்ந்து நடத்துகிறது.',
    },
    featured: false,
    order: 5,
  },

  /* ── Downloads ── */
  {
    id: 'faq-d1',
    category: 'downloads',
    question: {
      en: 'What types of documents are available for download?',
      si: 'බාගත කිරීමට ලබා ගත හැකි ලේඛනවල වර්ග මොනවාද?',
      ta: 'பதிவிறக்கத்திற்கு கிடைக்கும் ஆவணங்கள் என்ன வகையானவை?',
    },
    answer: {
      en: 'The Downloads section provides access to provincial development plans, annual reports, statistical publications, forms, circulars, guidelines, and other official government documents relevant to the Southern Province.',
      si: 'බාගත කිරීමේ කොටස හරහා පළාත් සංවර්ධන සැලසුම්, වාර්ෂික වාර්තා, සංඛ්‍යාන ප්‍රකාශන, ආකෘති, චක්‍රලේඛ, මාර්ගෝපදේශ සහ නිල ලේඛන ලබා ගත හැකිය.',
      ta: 'பதிவிறக்கங்கள் பிரிவில் மாகாண வளர்ச்சி திட்டங்கள், வருடாந்திர அறிக்கைகள், புள்ளிவிவர வெளியீடுகள், படிவங்கள், சுற்றறிக்கைகள் மற்றும் மார்க்கோட்டுகள் கிடைக்கின்றன.',
    },
    featured: false,
    order: 0,
  },
  {
    id: 'faq-d2',
    category: 'downloads',
    question: {
      en: 'How can I download provincial reports?',
      si: 'පළාත් වාර්තා බාගත කර ගත හැකි ආකාරය කෙසේද?',
      ta: 'மாகாண அறிக்கைகளை எவ்வாறு பதிவிறக்கலாம்?',
    },
    answer: {
      en: 'Reports can be downloaded through the Downloads section available on this website. Select the relevant category, choose the year, and click the download button to save the PDF document.',
      si: 'මෙම වෙබ් අඩවියේ ඇති බාගත කිරීමේ කොටස හරහා වාර්තා බාගත කර ගත හැකිය. අදාළ ප්‍රවර්ගය, වර්ෂය තෝරා, PDF ලේඛනය සුරැකීමට බාගත කිරීමේ බොත්තම ක්ලික් කරන්න.',
      ta: 'இந்த இணையதளத்தில் கிடைக்கும் பதிவிறக்கங்கள் பிரிவு மூலம் அறிக்கைகளை பதிவிறக்கலாம். தொடர்புடைய வகையைத் தேர்ந்தெடுத்து, ஆண்டைத் தேர்ந்தெடுத்து, PDF ஐ சேமிக்க பதிவிறக்க பொத்தானை கிளிக் செய்யுங்கள்.',
    },
    featured: false,
    order: 1,
  },
  {
    id: 'faq-d3',
    category: 'downloads',
    question: {
      en: 'Are the downloads free of charge?',
      si: 'බාගත කිරීම් නොමිලේ ලබා ගත හැකිද?',
      ta: 'பதிவிறக்கங்கள் இலவசமா?',
    },
    answer: {
      en: 'Yes. All documents and reports made available through this portal are provided free of charge as part of our public information service.',
      si: 'ඔව්. මෙම ද්වාරය හරහා ලබා ගත හැකි සියලු ලේඛන සහ වාර්තා මහජන තොරතුරු සේවාවේ කොටසක් ලෙස නොමිලේ ලබා දෙනු ලැබේ.',
      ta: 'ஆம். இந்த தளம் மூலம் கிடைக்கும் அனைத்து ஆவணங்களும் அறிக்கைகளும் பொது தகவல் சேவையின் ஒரு பகுதியாக இலவசமாக வழங்கப்படுகின்றன.',
    },
    featured: false,
    order: 2,
  },
  {
    id: 'faq-d4',
    category: 'downloads',
    question: {
      en: 'The download link is not working. What should I do?',
      si: 'බාගත කිරීමේ සබැඳිය ක්‍රියාත්මක නොවේ. කුමක් කළ යුතුද?',
      ta: 'பதிவிறக்க இணைப்பு வேலை செய்யவில்லை. என்ன செய்வது?',
    },
    answer: {
      en: 'If you experience difficulty downloading a document, please try refreshing the page or clearing your browser cache. If the issue persists, contact the Technical Support team using the Contact page.',
      si: 'ලේඛනයක් බාගත කිරීමේ දුෂ්කරතා ඇත්නම් පිටුව නැවත ලෝඩ් කිරීමට හෝ බ්‍රව්සරයේ හැඹිලිය ඉවත් කිරීමට උත්සාහ කරන්න. ගැටළුව දිගටම පවතී නම්, අප අමතන්න.',
      ta: 'தயவுசெய்து பக்கத்தை புதுப்பிக்க முயற்சிக்கவும் அல்லது உலாவியின் தற்காலிக சேமிப்பை அழிக்கவும். சிக்கல் தொடர்ந்தால் தொடர்பு பக்கம் மூலம் தொழில்நுட்ப ஆதரவு குழுவை தொடர்பு கொள்ளுங்கள்.',
    },
    featured: false,
    order: 3,
  },
  {
    id: 'faq-d5',
    category: 'downloads',
    question: {
      en: 'Can I request a document that is not listed in the Downloads section?',
      si: 'ලැයිස්තුවේ නොමැති ලේඛනයක් ඉල්ලීම් කළ හැකිද?',
      ta: 'பதிவிறக்கங்கள் பிரிவில் இல்லாத ஆவணத்தை கோரலாமா?',
    },
    answer: {
      en: 'Yes. For documents not currently listed, please submit a request through the Contact page. Requests are handled in accordance with the Right to Information (RTI) Act where applicable.',
      si: 'ඔව්. දැනට ලැයිස්තු නොකළ ලේඛන සඳහා අප අමතන්න පිටුව හරහා ඉල්ලීමක් ඉදිරිපත් කරන්න. ඉල්ලීම් RTI පනත අනුව හැසිරවීමට ලක් කෙරේ.',
      ta: 'ஆம். தற்போது பட்டியலிடப்படாத ஆவணங்களுக்கு தொடர்பு பக்கம் மூலம் கோரிக்கை சமர்ப்பிக்கவும். கோரிக்கைகள் RTI சட்டத்திற்கு அமைய கையாளப்படும்.',
    },
    featured: false,
    order: 4,
  },

  /* ── Reports ── */
  {
    id: 'faq-r1',
    category: 'reports',
    question: {
      en: 'Where can I find the Annual Report of the Planning Secretariat?',
      si: 'සැලසුම් ලේකම් කාර්යාලයේ වාර්ෂික වාර්තාව කොතැනින් ලබා ගත හැකිද?',
      ta: 'திட்டமிடல் செயலகத்தின் வருடாந்திர அறிக்கையை எங்கு காணலாம்?',
    },
    answer: {
      en: 'The Annual Report is available in the Reports section of this portal. Reports are published annually after the financial year concludes and are subject to auditing before publication.',
      si: 'වාර්ෂික වාර්තාව මෙම ද්වාරයේ වාර්තා කොටසෙහි ඇත. වාර්තා, මූල්‍ය වර්ෂය නිමාවෙන් පසු, විගණනයට ලක් කිරීමෙන් පසු ප්‍රකාශිත කෙරේ.',
      ta: 'வருடாந்திர அறிக்கை இந்த தளத்தின் அறிக்கைகள் பிரிவில் கிடைக்கிறது. நிதியாண்டு முடிந்தவுடன் தணிக்கைக்கு உட்பட்டு வருடாந்திரமாக வெளியிடப்படுகிறது.',
    },
    featured: false,
    order: 0,
  },
  {
    id: 'faq-r2',
    category: 'reports',
    question: {
      en: 'How often are progress reports published?',
      si: 'ප්‍රගති වාර්තා කොතරම් නිතරක් ප්‍රකාශිත කෙරේද?',
      ta: 'முன்னேற்ற அறிக்கைகள் எவ்வளவு அடிக்கடி வெளியிடப்படுகின்றன?',
    },
    answer: {
      en: 'The Planning Secretariat publishes quarterly progress reports and an annual consolidated report. Special reports may also be published for specific development programmes or ministerial directives.',
      si: 'සැලසුම් ලේකම් කාර්යාලය ත්‍රෛමාසික ප්‍රගති වාර්තා සහ වාර්ෂික ඒකාබද්ධ වාර්තාව ප්‍රකාශිත කරයි. විශේෂ ව්‍යාපෘතිවලට ගැළපෙන ලෙස විශේෂ වාර්තා ද ප්‍රකාශිත කෙරිය හැකිය.',
      ta: 'திட்டமிடல் செயலகம் காலாண்டு முன்னேற்ற அறிக்கைகளையும் ஆண்டு ஒருங்கிணைந்த அறிக்கையையும் வெளியிடுகிறது.',
    },
    featured: false,
    order: 1,
  },
  {
    id: 'faq-r3',
    category: 'reports',
    question: {
      en: 'Are statistical data reports available to the public?',
      si: 'සංඛ්‍යාන දත්ත වාර්තා මහජනයාට ලබා ගත හැකිද?',
      ta: 'புள்ளியியல் தரவு அறிக்கைகள் பொதுமக்களுக்கு கிடைக்குமா?',
    },
    answer: {
      en: 'Yes. Provincial statistical data, including population, land use, economic indicators, and sector-specific data, are published periodically and available through the Downloads section.',
      si: 'ඔව්. ජනගහනය, ඉඩම් භාවිතය, ආර්ථික දර්ශකයන් ඇතුළු පළාත් සංඛ්‍යාන දත්ත කාලීනව ප්‍රකාශිත කෙරෙන අතර බාගත කිරීමේ කොටස හරහා ලබා ගත හැකිය.',
      ta: 'ஆம். மக்கள்தொகை, நில பயன்பாடு, பொருளாதார குறியீடுகள் உட்பட மாகாண புள்ளியியல் தரவுகள் அவ்வப்போது வெளியிடப்பட்டு பதிவிறக்கங்கள் பிரிவு மூலம் கிடைக்கின்றன.',
    },
    featured: false,
    order: 2,
  },
  {
    id: 'faq-r4',
    category: 'reports',
    question: {
      en: 'Who audits the financial reports of the Planning Secretariat?',
      si: 'සැලසුම් ලේකම් කාර්යාලයේ මූල්‍ය වාර්තා විගණනය කරන්නේ කවුද?',
      ta: 'திட்டமிடல் செயலகத்தின் நிதி அறிக்கைகளை யார் தணிக்கை செய்கிறார்கள்?',
    },
    answer: {
      en: 'All financial statements and reports of the Planning Secretariat are subject to audit by the Auditor General\'s Department under the provisions of the Finance Act and the Constitution of Sri Lanka.',
      si: 'සැලසුම් ලේකම් කාර්යාලයේ සියලු මූල්‍ය ප්‍රකාශ සහ වාර්තා ශ්‍රී ලංකාවේ ආණ්ඩුක්‍රම ව්‍යවස්ථාව සහ මූල්‍ය පනතේ විධිවිධාන යටතේ ගාණකාධිකාරී අංශය මඟින් විගණනය කෙරේ.',
      ta: 'திட்டமிடல் செயலகத்தின் அனைத்து நிதி அறிக்கைகளும் இலங்கை அரசியலமைப்பு மற்றும் நிதிச் சட்டத்தின் கீழ் தணிக்கையர் நாயக வழங்கலர் திணைக்களத்தால் தணிக்கை செய்யப்படுகின்றன.',
    },
    featured: false,
    order: 3,
  },
  {
    id: 'faq-r5',
    category: 'reports',
    question: {
      en: 'Can I access historical reports from previous years?',
      si: 'පෙර වර්ෂවල ඓතිහාසික වාර්තා ලබා ගත හැකිද?',
      ta: 'முந்தைய ஆண்டுகளின் வரலாற்று அறிக்கைகளை அணுகலாமா?',
    },
    answer: {
      en: 'Historical reports from previous years are archived and can be accessed through the Reports section. If older documents are not available online, a formal request can be submitted through the Contact page.',
      si: 'පෙර වර්ෂවල ඓතිහාසික වාර්තා ලේඛනාගාරගත කෙරෙන අතර වාර්තා කොටස හරහා ලබා ගත හැකිය. පැරණි ලේඛන මාර්ගගතව නොමැති නම්, අප අමතන්න.',
      ta: 'முந்தைய ஆண்டுகளின் வரலாற்று அறிக்கைகள் காப்பகப்படுத்தப்பட்டு அறிக்கைகள் பிரிவு மூலம் அணுகலாம். பழைய ஆவணங்கள் ஆன்லைனில் இல்லாவிட்டால் தொடர்பு பக்கம் மூலம் கோரிக்கை சமர்ப்பிக்கலாம்.',
    },
    featured: false,
    order: 4,
  },

  /* ── Divisions/Departments ── */
  {
    id: 'faq-dep1',
    category: 'departments',
    question: {
      en: 'Which divisions come under the Southern Provincial Council?',
      si: 'දකුණු පළාත් සභාව යටතේ ඇති අංශ මොනවාද?',
      ta: 'தென் மாகாண சபையின் கீழ் எந்த துறைகள் வருகின்றன?',
    },
    answer: {
      en: 'The Southern Provincial Council oversees a wide range of divisions including Education, Health, Agriculture, Local Government, Roads & Bridges, Irrigation, Industries, and Cultural Affairs, among others.',
      si: 'දකුණු පළාත් සභාව යටතේ අධ්‍යාපනය, සෞඛ්‍ය, කෘෂිකර්මය, පළාත් පාලනය, මාර්ග හා පාලම්, වාරිමාර්ග, කර්මාන්ත සහ සංස්කෘතික කටයුතු ඇතුළු අංශ රාශියක් ඇත.',
      ta: 'தென் மாகாண சபையின் கீழ் கல்வி, சுகாதாரம், வேளாண்மை, உள்ளாட்சி, சாலைகள் & பாலங்கள், நீர்ப்பாசனம், தொழில்கள் மற்றும் கலாச்சார விவகாரங்கள் உட்பட பல துறைகள் உள்ளன.',
    },
    featured: false,
    order: 0,
  },
  {
    id: 'faq-dep2',
    category: 'departments',
    question: {
      en: 'How do I contact a specific division?',
      si: 'නිශ්චිත අංශයකට ඇමතිය හැකි ආකාරය කෙසේද?',
      ta: 'குறிப்பிட்ட துறையை எவ்வாறு தொடர்பு கொள்வது?',
    },
    answer: {
      en: 'Contact details for all provincial divisions, including telephone numbers, email addresses, and physical locations, are listed in the Telephone Directory available through the Contact page.',
      si: 'සියලු පළාත් අංශ සඳහා දුරකථන අංකද ඇතුළු ඇමතිය හැකි විස්තර, අප අමතන්න පිටුවෙහි ඇති දුරකථන නාමාවලියෙහි ලැයිස්තු ගත කෙරේ.',
      ta: 'அனைத்து மாகாண துறைகளுக்கான தொடர்பு விவரங்கள், தொலைபேசி எண்கள் உட்பட, தொடர்பு பக்கத்தில் உள்ள தொலைபேசி அட்டவணையில் பட்டியலிடப்பட்டுள்ளன.',
    },
    featured: false,
    order: 1,
  },
  {
    id: 'faq-dep3',
    category: 'departments',
    question: {
      en: 'What services does the Division of Agriculture provide to the public?',
      si: 'කෘෂිකර්ම අංශය මහජනයාට ලබා දෙන සේවා මොනවාද?',
      ta: 'வேளாண்மை திணைக்களம் பொதுமக்களுக்கு என்ன சேவைகளை வழங்குகிறது?',
    },
    answer: {
      en: 'The Provincial Division of Agriculture provides advisory services, fertiliser subsidies, seed distribution, training programmes, and technical support to farmers within the Southern Province.',
      si: 'පළාත් කෘෂිකර්ම අංශය උපදේශන සේවා, පොහොර සහනාධාර, බීජ බෙදා හැරීම, පුහුණු වැඩසටහන් සහ කෘෂිකරුවන්ට තාක්ෂණික සහාය ලබා දේ.',
      ta: 'மாகாண வேளாண்மை திணைக்களம் தென் மாகாணத்தில் உள்ள விவசாயிகளுக்கு ஆலோசனை சேவைகள், உரம் மானியங்கள், விதை விநியோகம், பயிற்சி திட்டங்கள் மற்றும் தொழில்நுட்ப ஆதரவு வழங்குகிறது.',
    },
    featured: false,
    order: 2,
  },
  {
    id: 'faq-dep4',
    category: 'departments',
    question: {
      en: 'How can I find information about educational institutions under the Southern Province?',
      si: 'දකුණු පළාත යටතේ ශිෂ්‍ය ආයතන ගැන තොරතුරු ලබා ගත හැකිද?',
      ta: 'தென் மாகாணத்தின் கீழ் உள்ள கல்வி நிறுவனங்கள் பற்றிய தகவல்களை எங்கே பெறலாம்?',
    },
    answer: {
      en: 'Information on government schools, technical colleges, and educational institutions under the Southern Provincial Education Division is available through the Divisions section of this portal.',
      si: 'දකුණු පළාත් අධ්‍යාපන අංශය යටතේ ඇති රාජ්‍ය පාසල්, තාක්ෂණික විද්‍යාලද ඇතුළු ශිෂ්‍ය ආයතන ගැන මෙම ද්වාරයේ අංශ කොටස හරහා ලබා ගත හැකිය.',
      ta: 'தென் மாகாண கல்வித் திணைக்களத்தின் கீழ் உள்ள அரசு பள்ளிகள், தொழில்நுட்ப கல்லூரிகள் மற்றும் கல்வி நிறுவனங்கள் பற்றிய தகவல்கள் இந்த தளத்தின் துறைகள் பிரிவில் கிடைக்கின்றன.',
    },
    featured: false,
    order: 3,
  },
  {
    id: 'faq-dep5',
    category: 'departments',
    question: {
      en: 'Can citizens submit complaints about a specific division?',
      si: 'නිශ්චිත අංශයකට ගැන පෙත්සම් ගොනු කළ හැකිද?',
      ta: 'குடிமக்கள் குறிப்பிட்ட துறையைப் பற்றி புகார் அளிக்கலாமா?',
    },
    answer: {
      en: 'Yes. Complaints can be submitted in writing to the relevant provincial ministry or to the Planning Secretariat. You may also use the Contact page to send your inquiry, and it will be directed to the relevant authority.',
      si: 'ඔව්. පෙත්සම් අදාළ පළාත් අමාත්‍යාංශයට හෝ සැලසුම් ලේකම් කාර්යාලයට ලිඛිතව ඉදිරිපත් කළ හැකිය. ඔබේ විමසීම යොමු කිරීමට අප අමතන්න පිටුව ද භාවිතා කළ හැකිය.',
      ta: 'ஆம். புகார்கள் தொடர்புடைய மாகாண அமைச்சகம் அல்லது திட்டமிடல் செயலகத்திற்கு எழுத்துப்பூர்வமாக சமர்ப்பிக்கலாம். தொடர்பு பக்கம் மூலமும் விசாரணை அனுப்பலாம்.',
    },
    featured: false,
    order: 4,
  },

  /* ── Technical Support ── */
  {
    id: 'faq-t1',
    category: 'tech',
    question: {
      en: 'The website is not loading properly. What should I do?',
      si: 'වෙබ් අඩවිය නිවැරදිව ලෝඩ් නොවේ. කුමක් කළ යුතුද?',
      ta: 'இணையதளம் சரியாக ஏற்றப்படவில்லை. என்ன செய்வது?',
    },
    answer: {
      en: 'Please try refreshing the page or clearing your browser\'s cache and cookies. Ensure your browser is up to date. If the problem persists, contact our Technical Support team through the Contact page.',
      si: 'කරුණාකර පිටුව නැවත ලෝඩ් කිරීමට හෝ බ්‍රව්සරයේ හැඹිලිය ඉවත් කිරීමට උත්සාහ කරන්න. ගැටළුව දිගටම පවතී නම්, අප අමතන්න.',
      ta: 'தயவுசெய்து பக்கத்தை புதுப்பிக்க முயற்சிக்கவும் அல்லது உலாவியின் தற்காலிக சேமிப்பு மற்றும் குக்கீகளை அழிக்கவும். சிக்கல் தொடர்ந்தால் தொடர்பு பக்கம் மூலம் ஆதரவு குழுவை தொடர்பு கொள்ளுங்கள்.',
    },
    featured: false,
    order: 0,
  },
  {
    id: 'faq-t2',
    category: 'tech',
    question: {
      en: 'Which browsers are supported by this portal?',
      si: 'මෙම ද්වාරය සඳහා සහාය දක්වන බ්‍රව්සර මොනවාද?',
      ta: 'இந்த தளத்தை ஆதரிக்கும் உலாவிகள் எவை?',
    },
    answer: {
      en: 'This portal is optimised for modern browsers including Google Chrome, Mozilla Firefox, Microsoft Edge, and Apple Safari. For the best experience, use the latest version of your preferred browser.',
      si: 'Google Chrome, Mozilla Firefox, Microsoft Edge, Apple Safari ඇතුළු නවීන බ්‍රව්සර සඳහා ද්වාරය ප්‍රශස්ත කෙරේ. හොඳම අත්දැකීම සඳහා නවතම අනුවාදය භාවිතා කරන්න.',
      ta: 'Google Chrome, Mozilla Firefox, Microsoft Edge மற்றும் Apple Safari உட்பட நவீன உலாவிகளுக்கு தளம் உகந்ததாக உள்ளது. சிறந்த அனுபவத்திற்கு உங்கள் உலாவியின் சமீபத்திய பதிப்பைப் பயன்படுத்துங்கள்.',
    },
    featured: false,
    order: 1,
  },
  {
    id: 'faq-t3',
    category: 'tech',
    question: {
      en: 'How do I report a broken link or missing document?',
      si: 'කැඩුණු සබැඳියක් හෝ අස්ථිතිත ලේඛනයක් වාර්තා කිරීම.',
      ta: 'உடைந்த இணைப்பு அல்லது காணாமல் போன ஆவணத்தை எவ்வாறு புகாரளிப்பது?',
    },
    answer: {
      en: 'If you find a broken link or missing document, please report it using the Contact page. Include the page name and the nature of the issue so our technical team can address it promptly.',
      si: 'ඔබ කැඩුණු සබැඳියක් හෝ නොතිබෙන ලේඛනයක් සොයා ගත්හොත් කරුණාකර අප අමතන්න හරහා වාර්තා කරන්න.',
      ta: 'நீங்கள் உடைந்த இணைப்பை அல்லது காணாமல் போன ஆவணத்தைக் கண்டால் தொடர்பு பக்கம் மூலம் புகாரளிக்கவும்.',
    },
    featured: false,
    order: 2,
  },
  {
    id: 'faq-t4',
    category: 'tech',
    question: {
      en: 'Is the portal accessible on mobile devices?',
      si: 'ජංගම උපාංගවල ද්වාරය ක්‍රියාකාරීද?',
      ta: 'கைப்பேசிகளில் தளம் அணுகலாமா?',
    },
    answer: {
      en: 'Yes. This portal is fully responsive and designed to work on all device types including smartphones, tablets, laptops, desktops, and large screens.',
      si: 'ඔව්. ස්මාර්ට්ෆෝන, ටැබ්ලට, ලැප්ටොප්, ඩෙස්ක්ටොප් ඇතුළු සියලු උපාංග සඳහා ද්වාරය ප්‍රශස්ත කෙරේ.',
      ta: 'ஆம். இந்த தளம் முழுமையாக பதிலளிக்கக்கூடியது மற்றும் ஸ்மார்ட்போன்கள், டேப்லெட்டுகள், லேப்டாப்கள், டெஸ்க்டாப்கள் உட்பட அனைத்து சாதன வகைகளிலும் வேலை செய்யும்.',
    },
    featured: false,
    order: 3,
  },
  {
    id: 'faq-t5',
    category: 'tech',
    question: {
      en: 'How do I change the language of the portal?',
      si: 'ද්වාරයේ භාෂාව වෙනස් කළ හැකි ආකාරය කෙසේද?',
      ta: 'தளத்தின் மொழியை எவ்வாறு மாற்றுவது?',
    },
    answer: {
      en: 'Click the language selector in the navigation bar at the top of the page and choose your preferred language — English, Sinhala, or Tamil. The selection is saved for future visits.',
      si: 'ගොනුවේ ඉහළින් ඇති සංචාලන තීරුවේ ඇති භාෂා තෝරාගෙනීම ක්ලික් කර ඔබ කැමති භාෂාව — ඉංග්‍රීසි, සිංහල හෝ දමිළ — තෝරාගන්න.',
      ta: 'பக்கத்தின் மேல் உள்ள வழிசெலுத்தல் பட்டியலில் உள்ள மொழி தேர்வியை கிளிக் செய்து உங்கள் விருப்பமான மொழியை — ஆங்கிலம், சிங்களம், அல்லது தமிழ் — தேர்ந்தெடுங்கள்.',
    },
    featured: false,
    order: 4,
  },

  /* ── HomeFAQHighlights extras (no clean text-match to FAQ.jsx entries) ──
     Questions #1 ("download provincial reports AND publications"),
     #2 ("How is the Annual Development Plan prepared?"), and
     #3 ("Can I submit a development proposal...") from
     HomeFAQHighlights.jsx have different wording/answers than their nearest
     FAQ.jsx counterparts (d2, p2, p3 respectively), so they are preserved
     here as distinct featured rows rather than merged. */
  {
    id: 'faq-home-1',
    category: 'downloads',
    question: {
      en: 'How can I download provincial reports and publications?',
      si: 'පළාත් වාර්තා සහ ප්‍රකාශන බාගත කළ හැකි ආකාරය කෙසේද?',
      ta: 'மாகாண அறிக்கைகள் மற்றும் வெளியீடுகளை எவ்வாறு பதிவிறக்கலாம்?',
    },
    answer: {
      en: 'All reports and publications are available free of charge through the Downloads section. Select a category, choose the year, and click the download button to save the PDF.',
      si: 'සියලු වාර්තා සහ ප්‍රකාශන බාගත කිරීමේ කොටස හරහා නොමිලේ ලබා ගත හැකිය. ප්‍රවර්ගයක් තෝරා, වර්ෂය තෝරා, PDF සුරැකීමට බාගත කිරීමේ බොත්තම ක්ලික් කරන්න.',
      ta: 'அனைத்து அறிக்கைகளும் வெளியீடுகளும் பதிவிறக்கங்கள் பிரிவு மூலம் இலவசமாக கிடைக்கின்றன. வகையை தேர்ந்தெடுத்து, ஆண்டை தேர்ந்தெடுத்து, PDF ஐ சேமிக்க பதிவிறக்க பொத்தானை கிளிக் செய்யுங்கள்.',
    },
    featured: true,
    order: 5,
  },
  {
    id: 'faq-home-2',
    category: 'planning',
    question: {
      en: 'How is the Annual Development Plan prepared?',
      si: 'වාර්ෂික සංවර්ධන සැලැස්ම සකස් කරන ආකාරය කෙසේද?',
      ta: 'ஆண்டு வளர்ச்சி திட்டம் எவ்வாறு தயாரிக்கப்படுகிறது?',
    },
    answer: {
      en: 'The Annual Development Plan is prepared through a consultative process with all provincial line ministries, departments, and public stakeholders, coordinated by the Planning Secretariat.',
      si: 'සාකච්ඡා ක්‍රියාවලියක් හරහා, සෑම පළාත් රේඛීය අමාත්‍යාංශ, අංශ, සහ මහජන ලාභාංශිකයන් සමඟ, සැලසුම් ලේකම් කාර්යාලය සම්බන්ධීකරණය කරයි.',
      ta: 'ஆண்டு வளர்ச்சி திட்டம் அனைத்து மாகாண துறைகள் மற்றும் பொது பங்குதாரர்களுடன் ஆலோசனை செயல்முறை மூலம் திட்டமிடல் செயலகத்தால் ஒருங்கிணைக்கப்படுகிறது.',
    },
    featured: true,
    order: 6,
  },
  {
    id: 'faq-home-3',
    category: 'planning',
    question: {
      en: 'Can I submit a development proposal to the Secretariat?',
      si: 'ලේකම් කාර්යාලයට සංවර්ධන යෝජනාවක් ඉදිරිපත් කළ හැකිද?',
      ta: 'செயலகத்திற்கு வளர்ச்சி முன்மொழிவை சமர்ப்பிக்க முடியுமா?',
    },
    answer: {
      en: 'Yes. Proposals should be submitted through the relevant provincial ministry or divisional secretariat. Community organisations may also submit formal requests via the Contact page.',
      si: 'ඔව්. අදාළ පළාත් අමාත්‍යාංශය හෝ ප්‍රාදේශීය ලේකම් කාර්යාලය හරහා ඉදිරිපත් කළ හැකිය. ප්‍රජා සංවිධාන, අප අමතන්න පිටුව හරහා ද ඉදිරිපත් කළ හැකිය.',
      ta: 'ஆம். தொடர்புடைய மாகாண அமைச்சகம் அல்லது பிரிவு செயலகம் மூலம் சமர்ப்பிக்கலாம். சமூக அமைப்புகளும் தொடர்பு பக்கம் மூலம் சமர்ப்பிக்கலாம்.',
    },
    featured: true,
    order: 7,
  },
]

/* ═══════════════════════════════════════════════════════════════════════════
   homeContentSeed — single object, id: 'home'
═══════════════════════════════════════════════════════════════════════════ */
const homeContentSeed = {
  id: 'home',
  heroSlides: [
    {
      image: '/branding/hero.webp',
      accent: {
        en: 'Towards a Prosperous Southern Province',
        si: 'සමෘද්ධිමත් දකුණු පළාතක් කරා',
        ta: 'வளமான தென் மாகாணத்தை நோக்கி',
      },
      line1: { en: 'Planning for', si: 'තිරසාර සංවර්ධනය', ta: 'திட்டமிடல்' },
      line2: { en: 'Sustainable Development', si: 'හා දීප්තිමත් හෙටක් සඳහා', ta: 'நிலையான வளர்ச்சி' },
      line3: { en: '& A Brighter Tomorrow', si: 'සැලසුම් කිරීම', ta: 'ஒரு பிரகாசமான நாளை' },
      body: {
        en: 'The Planning Secretariat – Southern Province is committed to effective planning, coordination, and implementation to ensure sustainable development and improved quality of life for all.',
        si: 'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය, සියලු දෙනාට තිරසාර සංවර්ධනය හා ජීවන තත්ත්වය ඉහළ නැංවීම සඳහා ඵලදායී සැලසුම් කිරීම, සම්බන්ධීකරණය හා ක්‍රියාත්මක කිරීමට කැපවී සිටී.',
        ta: 'தென் மாகாண திட்டமிடல் செயலகம், அனைவருக்கும் நிலையான வளர்ச்சியையும் மேம்பட்ட வாழ்க்கைத் தரத்தையும் உறுதிப்படுத்த அர்ப்பணிக்கப்பட்டுள்ளது.',
      },
      btn1: {
        label: { en: 'Our Divisions', si: 'අපගේ අංශ', ta: 'எங்கள் பிரிவுகள்' },
        path: '/departments',
      },
      btn2: {
        label: { en: 'Explore Services', si: 'සේවාවන් බලන්න', ta: 'சேவைகளை காண்க' },
        path: '/services',
      },
    },
    {
      image: '/branding/hero2.webp',
      accent: {
        en: 'Coordinating Growth Across the Province',
        si: 'පළාත පුරා සංවර්ධනය සම්බන්ධීකරණය',
        ta: 'மாகாணம் முழுவதும் வளர்ச்சியை ஒருங்கிணைத்தல்',
      },
      line1: { en: 'Governing with', si: 'ඉලක්කයක් සහිතව', ta: 'நோக்கத்துடன்' },
      line2: { en: 'Purpose & Vision', si: 'අංශ 03 හරහා', ta: 'நிர்வகித்தல்' },
      line3: { en: 'Across 03 Divisions', si: 'පාලනය කිරීම', ta: '03 பிரிவுகள் வழியாக' },
      body: {
        en: 'Twelve specialised divisions work in harmony to drive economic progress, infrastructure development, and social welfare throughout the Southern Province.',
        si: 'දකුණු පළාතේ ආර්ථික සංවර්ධනය, යටිතල පහසුකම් සංවර්ධනය සහ සමාජ සුබසාධනය ඉදිරියට ගෙනයාමට විශේෂිත අංශ 3 ක් එකිනෙකා සමඟ කාර්යක්ෂමව ක්‍රියා කරයි.',
        ta: 'பன்னிரண்டு சிறப்பு பிரிவுகள் இணைந்து தென் மாகாணத்தின் பொருளாதார முன்னேற்றம், உள்கட்டமைப்பு மேம்பாடு மற்றும் சமூக நலனை இயக்குகின்றன.',
      },
      btn1: {
        label: { en: 'Our Divisions', si: 'අපගේ අංශ', ta: 'எங்கள் பிரிவுகள்' },
        path: '/departments',
      },
      btn2: {
        label: { en: 'Learn More', si: 'ලේඛන බලන්න', ta: 'மேலும் பார்க்க' },
        path: '/documents',
      },
    },
    {
      image: '/branding/hero3.webp',
      accent: {
        en: 'Empowering Every Community',
        si: 'සෑම ප්‍රජාවක්ම සවිබලගන්වමින්',
        ta: 'ஒவ்வொரு சமுதாயத்தையும் வலுப்படுத்துதல்',
      },
      line1: { en: 'Serving Over', si: 'ජනතාව', ta: '2,600,000 க்கும் அதிகமான' },
      line2: { en: '2,600,000 Citizens', si: '2,600,000 කට අධිකව', ta: 'குடிமக்களுக்கு' },
      line3: { en: 'With Pride & Dedication', si: 'සේවය කිරීම', ta: 'சேவை செய்கிறோம்' },
      body: {
        en: 'From Galle to Hambantota, our secretariat delivers inclusive public services, transparent governance, and community-driven development to every corner of the Southern Province.',
        si: 'ගාල්ලේ සිට හම්බන්තොට දක්වා, අපගේ ලේකම් කාර්යාලය දකුණු පළාතේ සෑම කෙළවරකම සියලු ජනතාවට සේවාවන් ලබා දේ.',
        ta: 'காலி முதல் அம்பாந்தோட்டை வரை, தென் மாகாணத்தின் ஒவ்வொரு மூலையிலும் அனைவருக்கும் சேவைகளை வழங்குகிறோம்.',
      },
      btn1: {
        label: { en: 'Our Services', si: 'සේවාවන්', ta: 'சேவைகள்' },
        path: '/services',
      },
      btn2: {
        label: { en: 'Contact Us', si: 'අප අමතන්න', ta: 'தொடர்பு கொள்' },
        path: '/contact',
      },
    },
  ],
  aboutSecretariat: {
    eyebrow: {
      en: 'About the Secretariat',
      si: 'ලේකම් කාර්යාලය ගැන',
      ta: 'செயலகம் பற்றி',
    },
    title: {
      en: 'Planning Secretariat – Southern Province',
      si: 'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය',
      ta: 'தென் மாகாண திட்டமிடல் செயலகம்',
    },
    subtitle: {
      en: 'Coordinating development, monitoring progress, and guiding sustainable growth across the Southern Province.',
      si: 'දකුණු පළාත පුරා සංවර්ධනය සම්බන්ධීකරණය, ප්‍රගතිය අධීක්ෂණය සහ තිරසාර වර්ධනයට මඟ පෙන්වීම.',
      ta: 'தென் மாகாணம் முழுவதும் வளர்ச்சியை ஒருங்கிணைத்து, முன்னேற்றத்தை கண்காணித்து, நிலையான வளர்ச்சிக்கு வழிகாட்டுதல்.',
    },
    body: {
      en: 'The Planning Secretariat of the Southern Province serves as the key provincial institution responsible for development planning, policy coordination, and the strategic management of public investment across the districts of Galle, Matara, and Hambantota. Established under the 13th Amendment of the Constitution — the Provincial Councils Act — the Secretariat plays a leading role in guiding the socio-economic development of the Southern Province through integrated planning, evidence-based policy formulation, and effective resource allocation.',
      si: 'දකුණු පළාතේ සැලසුම් ලේකම් කාර්යාලය, ගාල්ල, මාතර සහ හම්බන්තොට දිස්ත්‍රික්ක හරහා සංවර්ධන සැලසුම් කිරීම, ප්‍රතිපත්ති සම්බන්ධීකරණය සහ රාජ්‍ය ආයෝජනවල උපාය මාර්ගික කළමනාකරණය සඳහා වගකිව යුතු ප්‍රධාන පළාත් ආයතනය ලෙස කටයුතු කරයි. ව්‍යවස්ථාවේ 13 වැනි සංශෝධනය — පළාත් සභා පනත — යටතේ ස්ථාපිත කරන ලද මෙම ලේකම් කාර්යාලය, ඒකාබද්ධ සැලසුම් කිරීම, සාක්ෂි-පදනම් ප්‍රතිපත්ති සම්පාදනය සහ ඵලදායී සම්පත් බෙදා හැරීම හරහා දකුණු පළාතේ සමාජ-ආර්ථික සංවර්ධනය මෙහෙයවීමේ ප්‍රමුඛ භූමිකාවක් ඉටු කරයි.',
      ta: 'தென் மாகாண திட்டமிடல் செயலகம், காலி, மாத்தறை மற்றும் ஹம்பாந்தோட்டை மாவட்டங்கள் முழுவதும் வளர்ச்சி திட்டமிடல், கொள்கை ஒருங்கிணைப்பு மற்றும் பொது முதலீட்டின் மூலோபாய மேலாண்மைக்கு பொறுப்பான முக்கிய மாகாண நிறுவனமாக செயல்படுகிறது. அரசியலமைப்பின் 13வது திருத்தம் — மாகாண சபைகள் சட்டம் — இன் கீழ் நிறுவப்பட்ட இச்செயலகம், ஒருங்கிணைந்த திட்டமிடல், சான்றுகள் அடிப்படையிலான கொள்கை வகுப்பு மற்றும் திறமையான வள ஒதுக்கீடு மூலம் தென் மாகாணத்தின் சமூக-பொருளாதார வளர்ச்சியை வழிநடத்துவதில் முன்னணி பங்கை வகிக்கிறது.',
    },
    image: '/branding/office.webp',
    statCard: {
      value: '3',
      label: { en: 'Divisions', si: 'අංශ', ta: 'திணைக்களங்கள்' },
    },
  },
  deputySecretaryStaffId: 'deputy-secretary-planning',
  deputySecretaryMessage: {
    en: 'As the Planning Secretariat of the Southern Province, our responsibility is to guide development with clarity, coordination, and accountability. We work closely with provincial ministries, departments, divisional secretariats, and local authorities as well as government-based and non-government based organizations to ensure that development initiatives respond to public needs and support long-term sustainable growth. Through effective planning, monitoring, and evaluation, we remain committed to building a more progressive and resilient to the Southern Province.',
    si: 'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය ලෙස, සංවර්ධනය පැහැදිලි දැක්මක්, සම්බන්ධීකරණයක් සහ වගකීමක් සමඟ ඉදිරියට ගෙන යාම අපගේ ප්‍රධාන වගකීමකි. පළාත් අමාත්‍යාංශ, අංශ, ප්‍රාදේශීය ලේකම් කාර්යාල සහ පළාත් පාලන ආයතන සමඟ සමීපව කටයුතු කරමින්, ජනතා අවශ්‍යතාවයන්ට ප්‍රතිචාර දක්වන සහ දිගුකාලීන තිරසාර වර්ධනයට සහාය වන සංවර්ධන වැඩසටහන් ක්‍රියාත්මක කිරීමට අපි කැපවී සිටිමු.',
    ta: 'தென் மாகாண திட்டமிடல் செயலகமாக, தெளிவான நோக்கம், ஒருங்கிணைப்பு மற்றும் பொறுப்புணர்வுடன் வளர்ச்சியை வழிநடத்துவது எங்கள் முக்கிய பொறுப்பாகும். மாகாண அமைச்சகங்கள், துறைகள், பிரதேச செயலகங்கள் மற்றும் உள்ளாட்சி நிறுவனங்களுடன் இணைந்து, பொதுமக்களின் தேவைகளுக்கு பதிலளிக்கும் மற்றும் நீண்டகால நிலையான வளர்ச்சியை ஆதரிக்கும் வளர்ச்சி முயற்சிகளை முன்னெடுக்க நாங்கள் அர்ப்பணிக்கப்பட்டுள்ளோம்.',
  },
}

/* ═══════════════════════════════════════════════════════════════════════════
   departmentsSeed
   Merged from Departments.jsx (DEPARTMENTS: label/shortLabel/desc/icon/
   color/staff) and DepartmentDetail.jsx (DEPT_DATA: badge/subtitle/overview/
   functions/responsibilities/services/accentColor/staff/headName/
   headPosition). `services` IS present as a distinct array in
   DepartmentDetail.jsx's DEPT_DATA (separate from functions/responsibilities)
   for all three divisions, so it is transcribed verbatim, not left empty.
═══════════════════════════════════════════════════════════════════════════ */
const departmentsSeed = [
  {
    id: 'dept-accounts',
    key: 'accounts',
    icon: 'BookOpen',
    accentColor: '#C79A2B',
    staffCount: '7',
    label: { en: 'Accounts Division', si: 'ගිණුම් අංශය', ta: 'கணக்குத் துறை' },
    shortLabel: { en: 'Accounts', si: 'ගිණුම්', ta: 'கணக்குகள்' },
    desc: {
      en: 'Handles budgeting, financial reporting, accounting coordination, and expenditure monitoring across the Province.',
      si: 'පළාත් පුරා අයවැය, මූල්‍ය වාර්තාකරණය, ගිණුම්කරණ සම්බන්ධීකරණය සහ වියදම් නිරීක්ෂණය සිදු කරයි.',
      ta: 'மாகாணம் முழுவதும் பட்ஜெட், நிதி அறிக்கையிடல், கணக்கியல் ஒருங்கிணைப்பு மற்றும் செலவு கண்காணிப்பு கையாளுகிறது.',
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
    headStaffId: 'dept-head-accounts',
    order: 0,
  },

  {
    id: 'dept-administration',
    key: 'administration',
    icon: 'Settings',
    accentColor: '#4A0918',
    staffCount: '8+',
    label: { en: 'Administration Division', si: 'පරිපාලන අංශය', ta: 'நிர்வாகத் துறை' },
    shortLabel: { en: 'Administration', si: 'පරිපාලන', ta: 'நிர்வாகம்' },
    desc: {
      en: 'Responsible for administration, HR coordination, office operations, and institutional management of the Secretariat.',
      si: 'ලේකම් කාර්යාලයේ පරිපාලනය, HR සම්බන්ධීකරණය, කාර්යාල ක්‍රියාකාරිත්වය සහ ආයතනික කළමනාකරණය සඳහා වගකිව යුතු වේ.',
      ta: 'செயலகத்தின் நிர்வாகம், HR ஒருங்கிணைப்பு, அலுவலக நடவடிக்கைகள் மற்றும் நிறுவன மேலாண்மைக்கு பொறுப்பாகும்.',
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
    headStaffId: 'dept-head-administration',
    order: 1,
  },

  {
    id: 'dept-development',
    key: 'development',
    icon: 'TrendingUp',
    accentColor: '#2E6830',
    staffCount: '30+',
    label: { en: 'Development Division', si: 'සංවර්ධන අංශය', ta: 'வளர்ச்சித் துறை' },
    shortLabel: { en: 'Development', si: 'සංවර්ධන', ta: 'வளர்ச்சி' },
    desc: {
      en: 'Coordinates development planning, monitoring, evaluation, and project implementation activities in the Southern Province.',
      si: 'දකුණු පළාතේ සංවර්ධන සැලසුම්, අධීක්ෂණය, ඇගයීම සහ ව්‍යාපෘති ක්‍රියාත්මක කිරීමේ කාර්යයන් සම්බන්ධ කරයි.',
      ta: 'தென் மாகாணத்தில் வளர்ச்சி திட்டமிடல், கண்காணிப்பு, மதிப்பீடு மற்றும் திட்ட செயல்படுத்தல் நடவடிக்கைகளை ஒருங்கிணைக்கிறது.',
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
    /* DEPT_DATA.development has profilePath: null, headName: null in the
       source — no head of division is currently assigned/published for
       this division, so headStaffId is left null rather than invented. */
    headStaffId: null,
    order: 2,
  },
]

/* ═══════════════════════════════════════════════════════════════════════════
   siteSettingsSeed — single object, id: 'org'
   Canonical source: Contact.jsx's T.en mapAddress/mapPhone/mapFax/mapEmail/
   mapHours fields (most detailed/dedicated source per task instructions).
   Minor drift observed vs Navbar/Footer (documented below) was NOT
   reconciled further, per instructions — Contact.jsx wins.
═══════════════════════════════════════════════════════════════════════════ */
const siteSettingsSeed = {
  id: 'org',
  address: '153B, S.H. Dahanayaka Mawatha, Galle, Sri Lanka.',
  phone: '+94 912234503',
  fax: '+94 912246554',
  email: 'spdcsp@gmail.com',
  hours: {
    en: 'Monday – Friday: 8:30 AM – 4:30 PM',
    si: 'සඳු – සිකු: 8:30 – 16:30',
    ta: 'திங்கள் – வெள்ளி: 8:30 மு.ப – 4:30 பி.ப',
  },
  socialLinks: {
    facebook: 'https://www.facebook.com',
    youtube: 'https://www.youtube.com',
    linkedin: 'https://www.linkedin.com',
  },
}

/* ═══════════════════════════════════════════════════════════════════════════
   aboutOverviewSeed — single object, id: 'overview'
   Canonical source: frontend/src/features/portal/about/About.jsx
     - overviewContent   (~line 1423) — trilingual intro/vision/mission
     - overviewValues    (~line 1085) — trilingual values list
     - overviewObjectives(~line 1130) — trilingual objectives list
     - overviewAwards    (~line 1163) — awards (labels trilingual, images/ids/year verbatim)
     - OverviewIntro component (~line 1483) — hardcoded image path + "Est. 1978" badge

   NOTE: The "Est. 1978" badge is English-only in the source (hardcoded JSX
   text, not part of a translated data object). The si/ta values below are
   NEW short translations written during this migration (not transcribed
   from any existing source string) — see final report for explicit callout.
═══════════════════════════════════════════════════════════════════════════ */
const aboutOverviewSeed = {
  id: 'overview',
  intro: {
    en: {
      introLabel: 'Introduction',
      introTitle: 'Planning Secretariat of the Southern Province',
      introParagraphs: [
        'The Planning Secretariat of the Southern Province serves as the key provincial institution responsible for the development planning, policy coordination and the strategic management of public investment across the districts of Galle, Matara, and Hambantota. The Secretariat, established under the 13th Amendment of the Constitution which was the Provincial Councils Act, plays a leading role in guiding the socio-economic development of the Southern Province through integrated planning, evidence-based policy formulation, and effective resource allocation throughout the province.',
        'The Secretariat works in close collaboration with provincial ministries, national government agencies, district and divisional administrative bodies, and development partners to formulate, implement, monitor, and evaluate development programs and projects that address the needs and aspirations of the people of the province. Its core responsibilities include the preparation of provincial development plans, appraisal of development proposals, coordination of annual and medium-term investment programs, monitoring project progress, and ensuring alignment with national development priorities and sustainable development goals.',
        'With a multidisciplinary team of professional planners, statisticians, and technical staff, the Planning Secretariat promotes data-driven decision-making approaches and direction for efficient utilization of public resources. The institution also facilitates inter-agency coordination, policy integration, and development research to strengthen good governance and improve service delivery within the province.',
        'Over the years, the Planning Secretariat has made significant contributions to regional development by supporting infrastructure improvement, rural development initiatives, climate adaptation planning, livelihood enhancement programmes, and environmentally sustainable projects. The Secretariat has also played a key role in introducing modern planning approaches, and strengthening project monitoring and evaluation systems.',
        'Committed to transparency, sustainability, and inclusive growth, the Planning Secretariat continues to work towards building a resilient, prosperous, and people-centered province for future generations.',
      ],
      visionLabel: 'Vision',
      visionText: 'Towards a prosperous Southern Province through balanced development.',
      missionLabel: 'Mission',
      missionText: 'To provide support and guidance to the institutions operating in the province to achieve sustainable development by optimally utilizing the limited resources available in the province.',
      imageAlt: 'Southern Province Planning Secretariat office building',
      officialGovt: 'Official Government Content',
      officialGovtSub: 'Official portal for provincial development planning, policy coordination, and institutional oversight.',
    },
    si: {
      introLabel: 'හැඳින්වීම',
      introTitle: 'දකුණු පළාතේ සැලසුම් ලේකම් කාර්යාලය',
      introParagraphs: [
        'දකුණු පළාතේ සැලසුම් ලේකම් කාර්යාලය, ගාල්ල, මාතර සහ හම්බන්තොට යන දිස්ත්‍රික් තුන හරහා සංවර්ධන සැලසුම් කිරීම, ප්‍රතිපත්ති සම්බන්ධීකරණය සහ රාජ්‍ය ආයෝජන කළමනාකරණය සඳහා වගකිව යුතු ප්‍රධාන පළාත් ආයතනය ලෙස සේවය කරයි. ව්‍යවස්ථාවේ 13 වැනි සංශෝධනය වන පළාත් සභා පනත යටතේ ස්ථාපිත කරන ලද මෙම ලේකම් කාර්යාලය, ඒකාබද්ධ සැලසුම් කිරීම, සාක්ෂි මත පදනම් වූ ප්‍රතිපත්ති සකස් කිරීම සහ ඵලදායී සම්පත් වෙන් කිරීම හරහා දකුණු පළාතේ සමාජ-ආර්ථික සංවර්ධනය මෙහෙයවීමේ ප්‍රමුඛ භූමිකාවක් ඉටු කරයි.',
        'ලේකම් කාර්යාලය, පළාත් අමාත්‍යාංශ, ජාතික රජයේ ආයතන, දිස්ත්‍රික් හා ප්‍රාදේශීය පරිපාලන ආයතන සහ සංවර්ධන හවුල්කරුවන් සමඟ සමීප සහයෝගිතාවෙන් ක්‍රියා කරමින් පළාතේ ජනතාගේ අවශ්‍යතා හා අභිලාෂයන් සපුරාලන සංවර්ධන වැඩසටහන් හා ව්‍යාපෘති සකස් කිරීම, ක්‍රියාත්මක කිරීම, අධීක්ෂණය කිරීම සහ ඇගයීම සිදු කරයි. එහි මූලික වගකීම් අතර පළාත් සංවර්ධන සැලසුම් සකස් කිරීම, සංවර්ධන යෝජනා ඇගයීම, වාර්ෂික හා මධ්‍යකාලීන ආයෝජන වැඩසටහන් සම්බන්ධීකරණය, ව්‍යාපෘති ප්‍රගතිය අධීක්ෂණය කිරීම සහ ජාතික සංවර්ධන ප්‍රමුඛතා හා තිරසාර සංවර්ධන ඉලක්ක සමඟ සමතුලිතතාව සහතික කිරීම ඇතුළත් වේ.',
        'වෘත්තීය සැලසුම්කරුවන්, සංඛ්‍යාන විශේෂඥයන් සහ තාක්ෂණික කාර්ය මණ්ඩලයෙන් සමන්විත බහු-විෂය අධ්‍යයන කණ්ඩායමක් සහිතව, සැලසුම් ලේකම් කාර්යාලය රාජ්‍ය සම්පත් ඵලදායිව භාවිතා කිරීම සඳහා දත්ත-ක්‍රමවේදයන් හා දිශාවන් ප්‍රවර්ධනය කරයි. මෙම ආයතනය ද ඒජන්සි අතර සම්බන්ධීකරණය, ප්‍රතිපත්ති ඒකාබද්ධ කිරීම සහ සංවර්ධන පර්යේෂණ සඳහා පහසුකම් සපයමින් පළාත තුළ යහ පාලනය ශක්තිමත් කිරීමට හා සේවා ලබාදීම වැඩිදියුණු කිරීමට ද දායක වේ.',
        'වසර ගණනාවක් පුරා, සැලසුම් ලේකම් කාර්යාලය යටිතල පහසුකම් වැඩිදියුණු කිරීමට, ග්‍රාමීය සංවර්ධන මුලපිරීම්, දේශගුණ අනුවර්තනය සැලසුම් කිරීම, ජීවන ශක්තිය ඉහළ නැංවීමේ වැඩසටහන් සහ පරිසර හිතකාමී ව්‍යාපෘති සඳහා සහාය ලබා දෙමින් ප්‍රාදේශීය සංවර්ධනයට සැලකිය යුතු දායකත්වයක් ලබා දී ඇත. නූතන සැලසුම් ක්‍රමවේද හඳුන්වාදීමේදී සහ ව්‍යාපෘති අධීක්ෂණ හා ඇගයීම් ක්‍රමවේද ශක්තිමත් කිරීමේදී ද ලේකම් කාර්යාලය ප්‍රධාන භූමිකාවක් ඉටු කර ඇත.',
        'විනිවිදභාවය, තිරසාරභාවය සහ ඇතුළත් සංවර්ධනය කෙරෙහි කැපවූ සැලසුම් ලේකම් කාර්යාලය, අනාගත පරම්පරාවන් සඳහා ශක්තිමත්, සෞභාග්‍යමත් සහ ජනතා-කේන්ද්‍රීය පළාතක් ගොඩ නැංවීම සඳහා කටයුතු කිරීම ඉදිරියටත් සිදු කරයි.',
      ],
      visionLabel: 'දැක්ම',
      visionText: 'තුලිත සංවර්ධනය තුළින් සෞභාග්‍යමත් දකුණක් කරා.',
      missionLabel: 'මෙහෙවර',
      missionText: 'පළාතේ ඇති සීමිත සම්පත් ප්‍රශස්ත ලෙස භාවිතා කිරීමෙන් තිරසාර සංවර්ධනයක් අත්කර ගැනීම සඳහා පළාතේ ක්‍රියාත්මක ආයතනවලට සහය ලබා දීම සහ මග පෙන්වීම.',
      imageAlt: 'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාල ගොඩනැගිල්ල',
      officialGovt: 'නිල රජයේ අන්තර්ගතය',
      officialGovtSub: 'පළාත් සංවර්ධන සැලසුම් කිරීම, ප්‍රතිපත්ති සම්බන්ධීකරණය සහ ආයතනික අධීක්ෂණය සඳහා නිල ද්වාරය.',
    },
    ta: {
      introLabel: 'அறிமுகம்',
      introTitle: 'தென் மாகாண திட்டமிடல் செயலகம்',
      introParagraphs: [
        'தென் மாகாண திட்டமிடல் செயலகம், காலி, மாத்தறை மற்றும் ஹம்பாந்தோட்டை என்ற மூன்று மாவட்டங்கள் முழுவதும் வளர்ச்சித் திட்டமிடல், கொள்கை ஒருங்கிணைப்பு மற்றும் பொது முதலீட்டின் மூலோபாய மேலாண்மைக்கு பொறுப்பான முக்கிய மாகாண நிறுவனமாக செயல்படுகிறது. அரசியலமைப்பின் 13ஆவது திருத்தமாகிய மாகாண சபைகள் சட்டத்தின் கீழ் நிறுவப்பட்ட இந்த செயலகம், ஒருங்கிணைந்த திட்டமிடல், சான்று சார்ந்த கொள்கை உருவாக்கம் மற்றும் பயனுள்ள வள ஒதுக்கீடு மூலம் தென் மாகாணத்தின் சமூக-பொருளாதார வளர்ச்சியை வழிநடத்துவதில் முன்னணி பங்கு வகிக்கிறது.',
        'செயலகம், மாகாண அமைச்சகங்கள், தேசிய அரசு நிறுவனங்கள், மாவட்ட மற்றும் பிரிவு நிர்வாக அமைப்புகள் மற்றும் வளர்ச்சி கூட்டாளிகளுடன் நெருங்கிய ஒத்துழைப்புடன் செயல்பட்டு, மாகாண மக்களின் தேவைகள் மற்றும் அபிலாஷைகளை நிறைவேற்றும் வளர்ச்சித் திட்டங்கள் மற்றும் திட்டப்பணிகளை உருவாக்கவும், செயல்படுத்தவும், கண்காணிக்கவும் மற்றும் மதிப்பீடு செய்யவும் பணியாற்றுகிறது. மாகாண வளர்ச்சித் திட்டங்களை தயாரித்தல், வளர்ச்சி முன்மொழிவுகளை மதிப்பீடு செய்தல், வாரிய மற்றும் நடுத்தர கால முதலீட்டு திட்டங்களை ஒருங்கிணைத்தல், திட்டப்பணி முன்னேற்றத்தை கண்காணித்தல் மற்றும் தேசிய வளர்ச்சி முன்னுரிமைகள் மற்றும் நிலையான வளர்ச்சி இலக்குகளுடன் இணைவை உறுதி செய்தல் ஆகியவை இதன் முக்கிய பொறுப்புகளில் அடங்கும்.',
        'தொழில்முறை திட்டமிடல் வல்லுநர்கள், புள்ளியியல் நிபுணர்கள் மற்றும் தொழில்நுட்ப ஊழியர்களை உள்ளடக்கிய பல்துறை குழுவுடன், திட்டமிடல் செயலகம் பொது வளங்களை திறமையாகப் பயன்படுத்துவதற்கான தரவு சார்ந்த முடிவெடுத்தல் அணுகுமுறைகளை மேம்படுத்துகிறது. இந்த நிறுவனம் நிறுவனங்களுக்கிடையிலான ஒருங்கிணைப்பு, கொள்கை ஒருங்கிணைப்பு மற்றும் வளர்ச்சி ஆராய்ச்சிக்கும் வசதிகளை வழங்கி, மாகாணத்தில் நல்லாட்சியை வலுப்படுத்தவும் சேவை வழங்கலை மேம்படுத்தவும் உதவுகிறது.',
        'பல ஆண்டுகளாக, திட்டமிடல் செயலகம் உள்கட்டமைப்பு மேம்பாடு, கிராமப்புற வளர்ச்சி முன்முயற்சிகள், காலநிலை தகவமைப்பு திட்டமிடல், வாழ்வாதார மேம்பாட்டு திட்டங்கள் மற்றும் சுற்றுச்சூழல் நிலையான திட்டப்பணிகளை ஆதரிப்பதன் மூலம் பிராந்திய வளர்ச்சிக்கு குறிப்பிடத்தக்க பங்களிப்புகளை வழங்கியுள்ளது. நவீன திட்டமிடல் அணுகுமுறைகளை அறிமுகப்படுத்துவதிலும், திட்டப்பணி கண்காணிப்பு மற்றும் மதிப்பீட்டு முறைமைகளை வலுப்படுத்துவதிலும் செயலகம் முக்கிய பங்கு வகித்துள்ளது.',
        'வெளிப்படைத்தன்மை, நிலைத்தன்மை மற்றும் உள்ளடக்கிய வளர்ச்சிக்கு அர்ப்பணிக்கப்பட்ட திட்டமிடல் செயலகம், எதிர்கால தலைமுறைகளுக்கு ஒரு நெகிழ்திறன் மிக்க, வளமான மற்றும் மக்கள் மையமான மாகாணத்தை கட்டியெழுப்புவதற்காக தொடர்ந்து பணியாற்றுகிறது.',
      ],
      visionLabel: 'பார்வை',
      visionText: 'சமச்சீரான வளர்ச்சியின் மூலம் ஒரு வளமான தென்பகுதியை நோக்கி.',
      missionLabel: 'நோக்கம்',
      missionText: 'மாகாணத்தில் உள்ள வரையறுக்கப்பட்ட வளங்களை உகந்த முறையில் பயன்படுத்தி, நிலையான வளர்ச்சியை அடைவதற்கு, மாகாணத்தில் செயல்படும் நிறுவனங்களுக்கு ஆதரவும் வழிகாட்டுதலும் வழங்குதல்.',
      imageAlt: 'தென் மாகாண திட்டமிடல் செயலக அலுவலக கட்டிடம்',
      officialGovt: 'அரசு உத்தியோகபூர்வ உள்ளடக்கம்',
      officialGovtSub: 'மாகாண வளர்ச்சித் திட்டமிடல், கொள்கை ஒருங்கிணைப்பு மற்றும் நிறுவன மேற்பார்வைக்கான உத்தியோகபூர்வ போர்டல்.',
    },
  },
  image: '/branding/office.webp',
  /* NEW (not transcribed): si/ta translations of the English-only "Est. 1978" badge. */
  establishedBadge: {
    en: 'Est. 1978',
    si: 'ස්ථාපිත 1978',
    ta: 'நிறுவப்பட்டது 1978',
  },
  values: {
    en: {
      sectionLabel: 'Values',
      items: ['Compassion', 'Working with integrity', 'Teamwork', 'Impartiality', 'Respect', 'Responsibility', 'Leadership', 'Integrity'],
    },
    si: {
      sectionLabel: 'අගයන්',
      items: ['සායානුකම්පාව', 'අවංකව වැඩ කිරීම', 'සාමුහිකව කටයුතු කිරීම', 'අපක්ෂපාතීත්වය', 'ගරු කිරීම', 'වගවීම', 'නායකත්වය', 'අඛණ්ඩතාවය'],
    },
    ta: {
      sectionLabel: 'விழுமியங்கள்',
      items: ['கருணை', 'நேர்மையுடன் பணியாற்றுதல்', 'குழுப்பணி', 'பாரபட்சமின்மை', 'மரியாதை', 'பொறுப்பு', 'தலைமைத்துவம்', 'ஒருங்கிணைப்பு'],
    },
  },
  objectives: {
    en: {
      sectionLabel: 'Objectives',
      items: [
        'To control the provincial planning process in line with the national policies and guidelines of the Finance Commission.',
        'To maintain a systematic operational and reporting process.',
        'To coordinate the planning values of provincial ministries, departments, other institutions as well as the planning departments and line ministries of other provincial councils.',
        'To develop the human resource capacity of the Planning and Accounting Office with the aim of providing solutions to the pressing problems of the province and especially in the neglected areas.',
      ],
    },
    si: {
      sectionLabel: 'අරමුණු',
      items: [
        'මුදල් කොමිසමේ ජාතික ප්‍රතිපත්ති හා මගපෙන්වීම් වලට අනුගත වෙමින් පළාත් සැලසුම් ක්‍රියාවලිය පාලනය කිරීම.',
        'විධිමත් මෙහෙයුම් හා අහයුම් ක්‍රියාවලියක් පවත්වාගෙන යාම.',
        'පළාත් අමාත්‍යාශ, අංශ, අනෙකුත් ආයතනවල මෙන්ම අනෙකුත් පළාත් සභාවල සැලසුම් අංශ හා රේඛීය අමාත්‍යංශවල සැලසුම් අගයන් සම්බන්ධීකරණය.',
        'පළාතේ සහ විශේෂයෙන්ම අවධානයට ලක් නොවූ ප්‍රදේශවල දැවෙන ගැටළු සඳහා විසඳුම් සැපයීමේ අරමුණෙන් සැලසුම් හා ගිණුම් කාර්යාලයේ මානව සම්පත් ධාරිතාව සංවර්ධනය කිරීම.',
      ],
    },
    ta: {
      sectionLabel: 'நோக்கங்கள்',
      items: [
        'தேசியக் கொள்கைகள் மற்றும் நிதி ஆணையத்தின் வழிகாட்டுதல்களுக்கு இணங்க மாகாணத் திட்டமிடல் செயல்முறையைக் கட்டுப்படுத்துதல்.',
        'ஒரு முறையான செயல்பாட்டு மற்றும் அறிக்கையிடல் செயல்முறையைப் பராமரித்தல்.',
        'மாகாண அமைச்சகங்கள், துறைகள், பிற நிறுவனங்கள் மற்றும் பிற மாகாண சபைகளின் திட்டமிடல் துறைகள் மற்றும் தொடர்புடைய அமைச்சகங்களின் திட்டமிடல் மதிப்புகளை ஒருங்கிணைத்தல்.',
        'மாகாணத்தின், குறிப்பாகப் புறக்கணிக்கப்பட்ட பகுதிகளின், அவசரப் பிரச்சினைகளுக்குத் தீர்வு காணும் நோக்கில் திட்டமிடல் மற்றும் கணக்குப்பதிவு அலுவலகத்தின் மனிதவளத் திறனை மேம்படுத்துதல்.',
      ],
    },
  },
  awards: {
    sectionLabel: { en: 'Our Awards', si: 'අපගේ සම්මාන', ta: 'எங்கள் විருதுகள்' },
    items: [
      {
        id: 'award-1',
        img: '/branding/tp1.webp',
        title: { en: 'National Productivity Award 2020', si: 'ජාතික ඵලදායිතා සම්මානය 2020', ta: 'தேசிய உற்பத்தித்திறன் விருது 2020' },
        year: '2020',
        desc: {
          en: 'Inter Departments Special Commendation',
          si: 'අන්තර් දෙපාර්තමේන්තු විශේෂ ප්‍රශංසා සම්මානය',
          ta: 'துறைகளுக்கிடையிலான சிறப்பு பாராட்டு',
        },
      },
      {
        id: 'award-2',
        img: '/branding/tp2.webp',
        title: { en: 'Best Annual Reports and Accounts - 2022', si: 'හොඳම වාර්ෂික වාර්තා සහ ගිණුම් - 2022', ta: 'சிறந்த வருடாந்திர அறிக்கைகள் மற்றும் கணக்குகள் - 2022' },
        year: '2022',
        desc: {
          en: 'Best Annual Reports and Accounts - 2022',
          si: 'හොඳම වාර්ෂික වාර්තා සහ ගිණුම් - 2022',
          ta: 'சிறந்த வருடாந்திர அறிக்கைகள் மற்றும் கணக்குகள் - 2022',
        },
      },
      {
        id: 'award-3',
        img: '/branding/tp3.webp',
        title: { en: 'Unmodified Audit Opinion - 2022', si: 'අකෙලෙස් විගණන මතය - 2022', ta: 'மாற்றப்படாத தணிக்கை கருத்து - 2022' },
        year: '2022',
        desc: {
          en: 'Unmodified Audit Opinion for Financial Statement of the year 2022 from National Audit Office',
          si: '2022 වර්ෂයේ මූල්‍ය ප්‍රකාශය සඳහා ජාතික විගණන කාර්යාලයෙන් ලැබූ අකෙලෙස් විගණන මතය',
          ta: '2022 ஆண்டின் நிதி அறிக்கைக்கான தேசிய தணிக்கை அலுவலகத்திடமிருந்து மாற்றப்படாத தணிக்கை கருத்து',
        },
      },
    ],
  },
}

/* ═══════════════════════════════════════════════════════════════════════════
   aboutFunctionsSeed — single object, id: 'functions'
   Canonical source: About.jsx's FD_DATA (~line 421).
   The `font` field from FD_DATA is a frontend-only CSS font-family lookup
   and is intentionally dropped — not content, not seeded.
═══════════════════════════════════════════════════════════════════════════ */
const aboutFunctionsSeed = {
  id: 'functions',
  en: {
    sectionLabel: 'Functions & Duties',
    intro: 'The Planning Secretariat performs key responsibilities in development planning, coordination, monitoring, evaluation, reporting, and policy guidance.',
    duties: [
      'Obtaining estimates related to the development plan for the coming year from the 05 Provincial Ministries and submitting them to the Finance Commission.',
      'Obtaining the allocations allocated to each ministry for the coming year from the Finance Commission and preparing the development plan accordingly.',
      'Evaluating the projects included in the development plan for the coming year prepared and submitted by the ministries and discussing them with the Finance Commission.',
      'Submitting the prepared development plan for the coming year for approval from the Finance Commission.',
      'Giving approval to the relevant ministries for implementation after obtaining the approval of the Finance Commission for the development plan.',
      'Preparing the provincial development plan and district development plans related to the year and submitting them to the relevant institutions.',
      'Monitoring and following up on the projects implemented by the ministries, departments and other affiliated institutions.',
      'Monthly physical and financial progress review of the ongoing annual development plan and holding progress review meetings.',
      'Preparing quarterly progress reports and submitting them to the relevant institutions.',
      'Collecting information on bills and pending projects at the end of the year (as of December 31).',
      'Identifying development objectives, strategies, methodologies and formulating policy recommendations.',
      'Preparing appropriate medium and long-term investment programs for the Southern Province through coordination with national level policy-making departments and obtaining technical advice.',
      'Studying, analyzing and compiling information on the socio-economic conditions, resource potential, problems and needs in the province.',
      'Coordinating with the planning units of the Divisional Secretariats and Local Government Institutions in preparing the Provincial Development Plan and providing necessary guidance.',
    ],
  },
  si: {
    sectionLabel: 'කාර්යයන්',
    intro: 'සැලසුම් ලේකම් කාර්යාලය සංවර්ධන සැලසුම් කිරීම, සම්බන්ධීකරණය, අධීක්‍ෂණය, ඇගයීම, වාර්තා කිරීම සහ ප්‍රතිපත්ති මාර්ගෝපදේශ ක්ෂේත්‍රවල ප්‍රධාන වගකීම් ඉටු කරයි.',
    duties: [
      'ඉදිරි වර්ෂය සඳහා සංවර්ධන සැලැස්මට අදාල ඇස්තමේන්තු පළාත් අමාත්‍යාංශ 05 මගින් ගෙන්වා ගැනීම හා මුදල් කොමිෂන් සභාව වෙත ඉදිරිපත් කිරිම.',
      'ඉදිරි වර්ෂය සඳහා එක් එක් අමාත්‍යාංශ වෙත වෙන් කරන ලද ප්‍රතිපාදන මුදල් කොමිෂන් සභාව මගින් ගෙන්වා ගැනීම හා ඒ අනුව සංවර්ධන සැලැස්ම සකස් කිරිම.',
      'අමාත්‍යාංශ මගින් සකස් කර යොමු කරනු ලබන ඉදිරි වර්ෂයේ සංවර්ධන සැලැස්මේ ඇතුලත් ව්‍යාපෘති සම්බන්ධව ඇගයුම් කිරීම හා මුදල් කොමිෂන් සභාව සමඟ සාකච්ඡා කිරීම.',
      'සකස් කරන ලද ඉදිරි වර්ෂයේ සංවර්ධන සැලැස්ම සඳහා මුදල් කොම්ෂන් සභාවේ එකඟතාවය ලබා ගැනීම සඳහා යොමු කිරීම.',
      'සංවර්ධන සැලැස්ම සඳහා මුදල් කොම්ෂන් සභාවේ එකඟතාවය ලැබිමෙන් අනතුරුව ක්‍රියාත්මක කිරීම සඳහා අදාල අමාත්‍යාංශ වලට අනුමැතිය ලබා දීම.',
      'වර්ෂයට අදාල පළාත් සංවර්ධන සැලැස්ම, දිස්ත්‍රික් සංවර්ධන සැලසුම් පිළියෙල කර අදාල ආයතන වෙත යොමු කිරීම.',
      'අමාත්‍යාංශ අංශ හා අනෙකුත් අනුබද්ධිත ආයතන මගින් ක්‍රියාත්මක ව්‍යාපෘති අධීක්ෂණය හා පසු විපරම් කිරිම.',
      'ක්‍රියාත්මක වාර්ෂික සංවර්ධන සැලැස්මේ භෞතික හා මුල්‍ය ප්‍රගතිය මාසිකව ගෙන්වා ගැනීම හා ප්‍රගති සමාලෝචන රැස්වීම් පැවැත්වීම.',
      'කාර්තුමය ප්‍රගති වාර්තා සකස් කිරිම හා අදාල ආයතන වෙත යොමු කිරිම.',
      'වර්ෂ අවසානයේ දී (දෙසැම්බර් 31 දිනට) අතැති බිල් හා අවිච්ඡේද ව්‍යාපෘති පිළිබඳ තොරතුරු රැස් කිරීම.',
      'සංවර්ධන අරමුණු, උපායමාර්ග, ක්‍රමවේද හඳුනා ගැනිම හා ප්‍රතිපත්ති නිර්දේශ සම්පාදනය.',
      'ජාතික මට්ටමේ ප්‍රතිපත්ති සම්පාදන අංශ සමඟ සම්බන්ධිකරණය හා තාක්ෂණික උපදෙස් ලබාගැනිම තුළින් දකුණු පළාත සඳහා උචිත මධ්‍ය කාලින හා දිර්ඝ කාලින ආයෝජන වැඩසටහන් පිළියෙළ කිරිම.',
      'පළාත තුළ පවතින සමාජ ආර්ථික තත්ත්වයන් සම්පත් විභවතාවයන්, ගැටළු හා අවශ්‍යතාවයන් අධ්‍යනය කිරිම, විශ්ලේෂණය කිරිම හා තොරතුරු සම්පාදනය කිරිම.',
      'පළාත් සංවර්ධන සැලැස්ම සකස් කිරීමේදී, ප්‍රාදේශිය ලේකම් කාර්යාල සහ පළාත් පාලන ආයතන සැලසුම් ඒකක සම්බන්ධීකරණය හා අවශ්‍ය මාර්ගෝපදේශකත්වය සැපයීම.',
    ],
  },
  ta: {
    sectionLabel: 'பணிகள்',
    intro: 'திட்டமிடல் செயலகம் வளர்ச்சித் திட்டமிடல், ஒருங்கிணைப்பு, கண்காணிப்பு, மதிப்பீடு, அறிக்கையிடல் மற்றும் கொள்கை வழிகாட்டுதல் ஆகிய முக்கிய பொறுப்புகளை நிறைவேற்றுகிறது.',
    duties: [
      'வரும் ஆண்டிற்கான வளர்ச்சித் திட்டம் தொடர்பான மதிப்பீடுகளை 05 மாகாண அமைச்சகங்களிடமிருந்து பெற்று, அவற்றை நிதி ஆணையத்திடம் சமர்ப்பித்தல்.',
      'வரும் ஆண்டிற்காக ஒவ்வொரு அமைச்சகத்திற்கும் ஒதுக்கப்பட்ட நிதி ஒதுக்கீடுகளை நிதி ஆணையத்திடமிருந்து பெற்று, அதற்கேற்ப வளர்ச்சித் திட்டத்தைத் தயாரித்தல்.',
      'அமைச்சகங்களால் தயாரிக்கப்பட்டு சமர்ப்பிக்கப்பட்ட, வரும் ஆண்டிற்கான வளர்ச்சித் திட்டத்தில் உள்ள திட்டங்களை மதிப்பீடு செய்து, நிதி ஆணையத்துடன் விவாதித்தல்.',
      'தயாரிக்கப்பட்ட, வரும் ஆண்டிற்கான வளர்ச்சித் திட்டத்தை நிதி ஆணையத்தின் ஒப்புதலுக்காகச் சமர்ப்பித்தல்.',
      'வளர்ச்சித் திட்டத்திற்கு நிதி ஆணையத்தின் ஒப்புதலைப் பெற்ற பிறகு, அதனைச் செயல்படுத்துவதற்காக சம்பந்தப்பட்ட அமைச்சகங்களுக்கு ஒப்புதல் அளித்தல்.',
      'அந்த ஆண்டிற்கான மாகாண வளர்ச்சித் திட்டம் மற்றும் மாவட்ட வளர்ச்சித் திட்டங்களைத் தயாரித்து, அவற்றை சம்பந்தப்பட்ட நிறுவனங்களுக்குச் சமர்ப்பித்தல்.',
      'அமைச்சகங்கள், துறைகள் மற்றும் பிற இணைக்கப்பட்ட நிறுவனங்களால் செயல்படுத்தப்படும் திட்டங்களைக் கண்காணித்து, பின்தொடர்தல்.',
      'நடைபெற்று வரும் ஆண்டு வளர்ச்சித் திட்டத்தின் மாதாந்திர கள மற்றும் நிதி முன்னேற்றத்தைக் கண்காணித்து, முன்னேற்ற ஆய்வுக் கூட்டங்களை நடத்துதல்.',
      'காலாண்டு முன்னேற்ற அறிக்கைகளைத் தயாரித்து, அவற்றை சம்பந்தப்பட்ட நிறுவனங்களுக்குச் சமர்ப்பித்தல்.',
      'ஆண்டின் இறுதியில் (டிசம்பர் 31 நிலவரப்படி) மசோதாக்கள் மற்றும் நிலுவையில் உள்ள திட்டங்கள் குறித்த தகவல்களைச் சேகரித்தல்.',
      'வளர்ச்சி நோக்கங்கள், உத்திகள், வழிமுறைகளைக் கண்டறிந்து, கொள்கைப் பரிந்துரைகளை உருவாக்குதல்.',
      'தேசிய அளவிலான கொள்கை வகுக்கும் துறைகளுடன் ஒருங்கிணைந்து மற்றும் தொழில்நுட்ப ஆலோசனைகளைப் பெற்று, தெற்கு மாகாணத்திற்கான பொருத்தமான நடுத்தர மற்றும் நீண்ட கால முதலீட்டுத் திட்டங்களைத் தயாரித்தல்.',
      'மாகாணத்தின் சமூக-பொருளாதார நிலைமைகள், வள ஆற்றல், பிரச்சினைகள் மற்றும் தேவைகள் குறித்த தகவல்களை ஆய்வு செய்தல், பகுப்பாய்வு செய்தல் மற்றும் தொகுத்தல்.',
      'மாகாண வளர்ச்சித் திட்டத்தைத் தயாரிப்பதில் பிரதேச செயலகங்கள் மற்றும் உள்ளாட்சி நிறுவனங்களின் திட்டமிடல் பிரிவுகளுடன் ஒருங்கிணைந்து, தேவையான வழிகாட்டுதலை வழங்குதல்.',
    ],
  },
}

/* ═══════════════════════════════════════════════════════════════════════════
   orgStructureSeed — single object, id: 'org'
   Canonical source: frontend/src/features/portal/about/OrganizationStructureChart.jsx
     - NODES (~line 46) — 13-node flat map, en/si verbatim
     - MOBILE_TREE (~line 133) — hand-verified parent/child hierarchy (matches
       the hierarchy summary supplied in the task; no discrepancies found)
     - UI chrome strings (intro, card header, scroll hints, legend, footer,
       image-fallback label) — extracted from inline EN/SI ternaries

   ⚠ TRANSLATION NOTICE: Tamil (ta) text for org-chart node titles and surrounding UI
   copy below is a best-effort approximate translation produced during Phase 2 migration
   (no source Tamil existed for this component previously — it was EN/SI-only on the
   live site). It has NOT been reviewed by a native Tamil speaker or the client. It is
   seeded so the CMS ships with no visibly-broken/missing Tamil, and should be corrected
   by the client via the new Org Structure CMS tab at the client's convenience.
═══════════════════════════════════════════════════════════════════════════ */
const orgStructureSeed = {
  id: 'org',
  nodes: [
    {
      id: 'apex', parentId: null, tier: 'apex', order: 0,
      title: { en: 'Deputy Chief Secretary', si: 'නියෝජ්‍ය ප්‍රධාන ලේකම්', ta: 'துணை தலைமை செயலாளர்' },
      sub: { en: '(Planning & Monitoring)', si: '(සැලසුම් හා අධීක්ෂණ)', ta: '(திட்டமிடல் மற்றும் கண்காணிப்பு)' },
    },
    {
      id: 'dir', parentId: 'apex', tier: 'director', order: 0,
      title: { en: 'Director', si: 'අධ්‍යක්‍ෂ', ta: 'பணிப்பாளர்' },
      sub: { en: 'Planning', si: 'සැලසුම්', ta: 'திட்டமிடல்' },
    },
    {
      id: 'dev', parentId: 'dir', tier: 'division', order: 0,
      title: { en: 'Development Division', si: 'සංවර්ධන අංශය', ta: 'அபிவிருத்தி பிரிவு' },
    },
    {
      id: 'fin', parentId: 'dir', tier: 'division', order: 1,
      title: { en: 'Finance & Accounts Branch', si: 'ගිණුම් සහ පිළිතුරීම් ශාඛාව', ta: 'நிதி மற்றும் கணக்குகள் கிளை' },
    },
    {
      id: 'dd8', parentId: 'dev', tier: 'dd', order: 0,
      title: { en: 'Deputy Director', si: 'නියෝජ්‍ය අධ්‍යක්‍ෂ', ta: 'துணைப் பணிப்பாளர்' },
      sub: { en: 'Planning (Programme)', si: 'ක්‍රමසම්පාදන', ta: 'திட்டமிடல் (திட்டம்)' },
      count: { en: '— 08', si: '— 08', ta: '— 08' },
    },
    {
      id: 'stat', parentId: 'dev', tier: 'stat', order: 1,
      title: { en: 'Statistics', si: 'සංඛ්‍යාලේඛනය', ta: 'புள்ளியியல்' },
    },
    {
      id: 'dn22', parentId: 'dd8', tier: 'officer', order: 0,
      title: { en: 'Development Officer', si: 'සංවර්ධන නිලධාරී', ta: 'அபிவிருத்தி அலுவலர்' },
      count: { en: '— 22', si: '— 22', ta: '— 22' },
    },
    {
      id: 'da50', parentId: 'dd8', tier: 'officer', order: 1,
      title: { en: 'Dev. Assistant (Planning) / Dev. Officer', si: 'සංවර්ධන සහකාර (සැලසුම්) / සංවර්ධන නිලධාරී', ta: 'அபிவிருத்தி உதவியாளர் (திட்டமிடல்) / அபிவிருத்தி அலுவலர்' },
      count: { en: '— 50', si: '— 50', ta: '— 50' },
    },
    {
      id: 'drv', parentId: 'da50', tier: 'support', order: 0,
      title: { en: 'Driver', si: 'රියදුරු', ta: 'ஓட்டுநர்' },
      count: { en: '— 04', si: '— 04', ta: '— 04' },
    },
    {
      id: 'oa', parentId: 'da50', tier: 'support', order: 1,
      title: { en: 'Office Aid', si: 'කාර්යාල කාර්යය සහායක', ta: 'அலுவலக உதவியாளர்' },
      count: { en: '— 04', si: '— 04', ta: '— 04' },
    },
    {
      id: 'adm', parentId: 'fin', tier: 'admin', order: 0,
      title: { en: 'Administrative Officer', si: 'පරිපාලන නිලධාරී', ta: 'நிர்வாக அலுவலர்' },
    },
    {
      id: 'chief', parentId: 'adm', tier: 'admin', order: 0,
      title: { en: 'Chief Mgmt. Service Officer', si: 'ප්‍රධාන කළමනාකරණ සේවා නිලධාරී', ta: 'முதன்மை முகாமைத்துவ சேவை அலுவலர்' },
    },
    {
      id: 'ms10', parentId: 'chief', tier: 'support', order: 0,
      title: { en: 'Mgmt. Service Officer', si: 'කළමනාකරණ සේවා නිලධාරී', ta: 'முகாமைத்துவ சேவை அலுவலர்' },
      count: { en: '— 10', si: '— 10', ta: '— 10' },
    },
  ],
  ui: {
    intro: {
      en: { title: 'Organization Structure', text: 'The organizational structure of the Planning Secretariat illustrates the leadership, administrative divisions, planning units, and supporting staff roles that coordinate provincial development activities.' },
      si: { title: 'සංවිධාන ව්‍යූහය', text: 'සැලසුම් ලේකම් කාර්යාලයේ සංවිධාන ව්‍යූහය නායකත්වය, පරිපාලන අංශ, සැලසුම් ඒකක සහ පළාත් සංවර්ධන ක්‍රියාකාරකම් සම්බන්ධීකරණය කරන සහාය කාර්ය මණ්ඩල භූමිකාවන් නිදර්ශනය කරයි.' },
      ta: { title: 'நிறுவன கட்டமைப்பு', text: 'திட்டமிடல் செயலகத்தின் நிறுவன கட்டமைப்பு, மாகாண அபிவிருத்தி நடவடிக்கைகளை ஒருங்கிணைக்கும் தலைமைத்துவம், நிர்வாகப் பிரிவுகள், திட்டமிடல் அலகுகள் மற்றும் ஆதரவு ஊழியர் பணிகளை விளக்குகிறது.' },
    },
    cardHeader: {
      en: { title: 'Planning Secretariat', sub: 'Southern Province' },
      si: { title: 'සැලසුම් ලේකම් කාර්යාලය', sub: 'දකුණු පළාත' },
      ta: { title: 'திட்டமிடல் செயலகம்', sub: 'தென் மாகாணம்' },
    },
    scrollHints: {
      en: { mobile: '↕ Scroll to view · Tap nodes to expand', mobileBottom: '← Swipe left / right to see more →', desktop: '← Scroll left / right · ↕ Scroll up / down →' },
      si: { mobile: '↕ බැලීමට අනුචලනය කරන්න · පුළුල් කිරීමට නෝඩ ස්පර්ශ කරන්න', mobileBottom: '← තව බැලීමට වම / දකුණ ස්වයිප් කරන්න →', desktop: '← වම / දකුණ අනුචලනය කරන්න · ↕ ඉහළ / පහළ අනුචලනය කරන්න →' },
      ta: { mobile: '↕ காண ஸ்க்ரோல் செய்யவும் · விரிவாக்க முனைகளைத் தட்டவும்', mobileBottom: '← மேலும் காண இடது / வலது ஸ்வைப் செய்யவும் →', desktop: '← இடது / வலது ஸ்க்ரோல் · ↕ மேலே / கீழே ஸ்க்ரோல் →' },
    },
    legend: {
      en: ['Deputy Chief Secretary', 'Director', 'Division / Branch', 'Deputy Director', 'Officer', 'Admin / Management', 'Support Staff'],
      si: ['නියෝජ්‍ය ප්‍රධාන ලේකම්', 'අධ්‍යක්‍ෂ', 'අංශය / ශාඛාව', 'නියෝජ්‍ය අධ්‍යක්‍ෂ', 'නිලධාරී', 'පරිපාලන / කළමනාකරණ', 'සහාය කාර්ය'],
      ta: ['துணை தலைமை செயலாளர்', 'பணிப்பாளர்', 'பிரிவு / கிளை', 'துணைப் பணிப்பாளர்', 'அலுவலர்', 'நிர்வாகம் / முகாமைத்துவம்', 'ஆதரவு ஊழியர்கள்'],
    },
    footer: {
      en: { title: 'Official Government Structure', sub: 'This organizational structure is based on official information issued by the Southern Province Planning Secretariat and is subject to periodic review.' },
      si: { title: 'නිල රජයේ ව්‍යූහය', sub: 'මෙම සංවිධාන ව්‍යූහය දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය විසින් නිකුත් කරන ලද නිල තොරතුරු මත පදනම් වේ.' },
      ta: { title: 'உத்தியோகபூர்வ அரசாங்க கட்டமைப்பு', sub: 'இந்த நிறுவன கட்டமைப்பு தென் மாகாண திட்டமிடல் செயலகத்தால் வெளியிடப்பட்ட உத்தியோகபூர்வ தகவலின் அடிப்படையில் அமைந்துள்ளது, மேலும் இது அவ்வப்போது மறுஆய்வுக்கு உட்படுத்தப்படும்.' },
    },
    imgFallbackLabel: {
      en: 'Official Organization Chart Reference',
      si: 'නිල සංවිධාන රූප සටහන',
      ta: 'உத்தியோகபூர்வ நிறுவன அமைப்பு விளக்கப்படம்',
    },
  },
}

/* ═══════════════════════════════════════════════════════════════════════════
   aboutHistorySeed — single object, id: 'history'
   Canonical source: frontend/src/features/portal/about/History.jsx
     - historyData (~line 57) — trilingual intro/table/projects/directors
     - HistoryIntro's hardcoded stat strip (~line 268) — English-only labels
       and fact values ("Established: 1987", "Province: Southern",
       "Districts: 3", "Years of Service: 37+")

   NOTE: The 4 stat values (1987 / Southern / 3 / 37+) are facts, transcribed
   as-is. The si/ta stat LABELS below are NEW short translations written
   during this migration (the source only has English labels for this
   strip) — see final report for explicit callout.
═══════════════════════════════════════════════════════════════════════════ */
const aboutHistorySeed = {
  id: 'history',
  en: {
    introLabel: 'Institutional History',
    introTitle: 'A Legacy of Planning Excellence',
    introPara1: 'The Southern Province Planning Secretariat stands as one of Sri Lanka\'s premier provincial planning bodies, established in 1987 following the enactment of the Provincial Council Act No. 42. Since its founding, the Secretariat has served as the central hub for development planning, resource coordination, and policy formulation across the Southern Province.',
    introPara2: 'Over more than three decades of dedicated public service, the institution has evolved through transformative phases — from its early administrative structure under the Deputy Chief Secretary to the modern, technology-driven governance model it employs today. Its work spans the districts of Galle, Matara, and Hambantota, delivering impactful development plans and rehabilitation programs.',
    tableTitle: 'Past Heads of Division',
    tableName: 'Name',
    tableService: 'Service Period',
    projectsTitle: 'Special Development Projects',
    projectsRead: 'Read More',
    officialGovt: 'Official Government Content',
    officialGovtSub: 'All information on this page is sourced from the Southern Province Planning Secretariat and is subject to official review before publication.',
    directors: [
      { name: 'Mr. T.G. Jayasinghe', period: '1988 – 1997' },
      { name: 'Mr. H. A. S. Imbulgoda', period: '1997 – 2005' },
      { name: 'Mrs. K. K. Abeywickrama', period: '2005 – 2007' },
      { name: 'Mr. W. Seelarathna de Silva', period: '2007 – 2009' },
      { name: 'Mrs. I. V. N. Preethika Kumuduni', period: '2009 – 2019' },
      { name: 'Mr. S. G. Vidura Prasanna', period: '2019 – 2024' },
      { name: 'Mr. M.K.G.S.P.K. Jayasekara', period: '2025 – Present' },
    ],
    projects: [
      {
        id: 'irdp',
        img: '/projects/irdp.jpg',
        title: 'Integrated Rural Development Project',
        abbr: 'IRDP',
        desc: 'A comprehensive rural development initiative aimed at uplifting rural communities through infrastructure improvements, livelihood support, and community empowerment programmes across the Southern Province.',
        year: '1988 – 1999',
      },
      {
        id: 'spreap',
        img: '/projects/spreap.jpg',
        title: 'SPREAP',
        abbr: 'SPREAP',
        desc: 'Southern Province Rural Economic Advancement Programme — a targeted initiative to promote economic growth and rural enterprise development, strengthening agricultural and small business sectors.',
        year: '2000 – 2010',
      },
      {
        id: 'taarp',
        img: '/projects/taarp.jpg',
        title: 'Tsunami Affected Areas Rehabilitation Project',
        abbr: 'TAARP',
        desc: 'Following the 2004 Indian Ocean Tsunami, TAARP was launched to rehabilitate affected coastal areas. The project restored housing, infrastructure, and livelihoods for thousands of families along the Southern coastline.',
        year: '2005 – 2012',
      },
    ],
  },
  si: {
    introLabel: 'ආයතනික ඉතිහාසය',
    introTitle: 'සැලසුම් විශිෂ්ටතාවයේ උරුමය',
    introPara1: 'දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලය, 1987 දී පළාත් සභා පනත් අංක 42 ප්‍රකාරව ස්ථාපිත කරන ලද ශ්‍රී ලංකාවේ ප්‍රමුඛ පළාත් සැලසුම් ආයතනයකි. ආරම්භ සිටම, ලේකම් කාර්යාලය දකුණු පළාත පුරා සංවර්ධන සැලසුම්, සම්පත් සම්බන්ධීකරණය සහ ප්‍රතිපත්ති සම්පාදනය සඳහා කේන්ද්‍රීය කේන්ද්‍රයක් ලෙස සේවය කර ඇත.',
    introPara2: 'දශක තුනකට අධික කාලයක් පුරා, ආයතනය නිළධාරි ප්‍රධාන ලේකම් (සැලසුම්) යටතේ ආරම්භක පරිපාලන ව්‍යුහයේ සිට නවීන, තාක්ෂණ-ප්‍රේරිත රාජ්‍ය පාලන ආකෘතිය දක්වා විකාශනය වී ඇත. එහි කාර්ය ගාල්ල, මාතර සහ හම්බන්තොට දිස්ත්‍රික් ආවරණය කරයි.',
    tableTitle: 'හිටපු අංශ ප්‍රධානීන්',
    tableName: 'නම',
    tableService: 'සේවා කාලය',
    projectsTitle: 'විශේෂ සංවර්ධන ව්‍යාපෘති',
    projectsRead: 'තව කියවන්න',
    officialGovt: 'නිල රජයේ අන්තර්ගතය',
    officialGovtSub: 'මෙම පිටුවේ ඇති සියලු තොරතුරු දකුණු පළාත් සැලසුම් ලේකම් කාර්යාලයෙන් ලබාගත් ඒවා වන අතර ප්‍රකාශනයට පෙර නිල සමාලෝචනයකට යටත් වේ.',
    directors: [
      { name: 'ටී.ජී. ජයසිංහ මහතා ', period: '1988 – 1997' },
      { name: 'එච්.ඒ.එස්. ඉඹුල්ගොඩ මහතා ', period: '1997 – 2005' },
      { name: 'කේ.කේ. අබේවික්‍රම මහත්මිය ', period: '2005 – 2007' },
      { name: 'ඩබ්. සීලරත්න ද සිල්වා මහතා ', period: '2007 – 2009' },
      { name: 'අයි.වී.එන්. ප්‍රීතිකා කුමුදුනී මහත්මිය', period: '2009 – 2019' },
      { name: 'එස්.ජී. විදුර ප්‍රසන්න මහතා ', period: '2019 – 2024' },
      { name: 'එම්.කේ.ජී.එස්.පී.කේ. ජයසේකර මහතා ', period: '2025 – දැනට' },
    ],
    projects: [
      {
        id: 'irdp',
        img: '/projects/irdp.jpg',
        title: 'ඒකාබද්ධ ග්‍රාමීය සංවර්ධන ව්‍යාපෘතිය',
        abbr: 'IRDP',
        desc: 'දකුණු පළාත පුරා යටිතල පහසුකම් වැඩිදියුණු කිරීම, ජීවිකා සහාය සහ ප්‍රජා සවිබලගැන්වීම හරහා ග්‍රාමීය ප්‍රජාවන් ඔසවා තැබීම සඳහා ව්‍යාපෘතිය.',
        year: '1988 – 1999',
      },
      {
        id: 'spreap',
        img: '/projects/spreap.jpg',
        title: 'SPREAP',
        abbr: 'SPREAP',
        desc: 'දකුණු පළාත් ග්‍රාමීය ආර්ථික ප්‍රගති වැඩසටහන — කෘෂිකර්ම හා කුඩා ව්‍යාපාර අංශ ශක්තිමත් කිරිම, ආර්ථික වර්ධනය ප්‍රවර්ධනය.',
        year: '2000 – 2010',
      },
      {
        id: 'taarp',
        img: '/projects/taarp.jpg',
        title: 'සුනාමි ආපදා ප්‍රදේශ ප්‍රතිසංස්කරණ ව්‍යාපෘතිය',
        abbr: 'TAARP',
        desc: '2004 ඉන්දියන් සාගර සුනාමියෙන් පසු ආපදාවෙන් පීඩිත වෙරළ ප්‍රදේශ ප්‍රතිසංස්කරණය සඳහා TAARP ආරම්භ කරන ලදී.',
        year: '2005 – 2012',
      },
    ],
  },
  ta: {
    introLabel: 'நிறுவன வரலாறு',
    introTitle: 'திட்டமிடல் சிறப்பின் மரபு',
    introPara1: 'தெற்கு மாகாண திட்டமிடல் செயலகம், 1987 ஆம் ஆண்டு மாகாண சபை சட்டம் எண் 42 இன் கீழ் நிறுவப்பட்ட இலங்கையின் முன்னணி மாகாண திட்டமிடல் அமைப்புகளில் ஒன்றாகும். ஆரம்பத்திலிருந்தே, செயலகம் தெற்கு மாகாணம் முழுவதும் வளர்ச்சித் திட்டமிடல், வள ஒருங்கிணைப்பு மற்றும் கொள்கை உருவாக்கத்திற்கான மைய மையமாக செயல்படுகிறது.',
    introPara2: 'மூன்று தசாப்தங்களுக்கும் மேலான அர்ப்பணிப்பான பொது சேவையில், நிறுவனம் துணை தலைமை செயலர் கீழ் ஆரம்பகால நிர்வாக கட்டமைப்பிலிருந்து நவீன, தொழில்நுட்ப-இயக்கப்படும் ஆட்சி மாதிரி வரை வளர்ந்துள்ளது.',
    tableTitle: 'முன்னாள் துறைத் தலைவர்கள்',
    tableName: 'பெயர்',
    tableService: 'சேவைக் காலம்',
    projectsTitle: 'சிறப்பு வளர்ச்சித் திட்டங்கள்',
    projectsRead: 'மேலும் படிக்க',
    officialGovt: 'அதிகாரப்பூர்வ அரசாங்க உள்ளடக்கம்',
    officialGovtSub: 'இந்தப் பக்கத்தில் உள்ள அனைத்து தகவல்களும் தெற்கு மாகாண திட்டமிடல் செயலகத்திலிருந்து பெறப்பட்டவை மற்றும் வெளியீட்டிற்கு முன் அதிகாரப்பூர்வ மதிப்பாய்விற்கு உட்படுத்தப்படும்.',
    directors: [
      { name: 'திரு. டி.ஜி. ஜயசிங்க', period: '1988 – 1997' },
      { name: 'திரு. எச்.ஏ.எஸ். இம்புல்கொட', period: '1997 – 2005' },
      { name: 'திருமதி. கே.கே. அபேவிக்கிரம', period: '2005 – 2007' },
      { name: 'திரு. டபிள்யு. சீலரத்ன டி சில்வா', period: '2007 – 2009' },
      { name: 'திருமதி. ஐ.வி.என். பிரீதிகா குமுதுனி', period: '2009 – 2019' },
      { name: 'திரு. எஸ்.ஜி. விதுர பிரசன்னா', period: '2019 – 2024' },
      { name: 'திரு. எம்.கே.ஜி.எஸ்.பி.கே. ஜயசேகர', period: '2025 – தற்போது' },
    ],
    projects: [
      {
        id: 'irdp',
        img: '/projects/irdp.jpg',
        title: 'ஒருங்கிணைந்த கிராமப்புற வளர்ச்சி திட்டம்',
        abbr: 'IRDP',
        desc: 'தெற்கு மாகாணம் முழுவதும் உள்கட்டமைப்பு மேம்பாடு, வாழ்வாதார ஆதரவு மற்றும் சமூக மேம்பாட்டு திட்டங்கள் மூலம் கிராமப்புற சமூகங்களை உயர்த்துவதை நோக்கமாக கொண்ட ஒரு விரிவான திட்டம்.',
        year: '1988 – 1999',
      },
      {
        id: 'spreap',
        img: '/projects/spreap.jpg',
        title: 'SPREAP',
        abbr: 'SPREAP',
        desc: 'தெற்கு மாகாண கிராமப்புற பொருளாதார மேம்பாட்டு திட்டம் — விவசாய மற்றும் சிறு தொழில் துறைகளை வலுப்படுத்துவதற்கான குறிவைக்கப்பட்ட முன்முயற்சி.',
        year: '2000 – 2010',
      },
      {
        id: 'taarp',
        img: '/projects/taarp.jpg',
        title: 'சுனாமி பாதிக்கப்பட்ட பகுதிகள் மறுவாழ்வு திட்டம்',
        abbr: 'TAARP',
        desc: '2004 இந்தியப் பெருங்கடல் சுனாமிக்குப் பிறகு, TAARP பாதிக்கப்பட்ட கடலோரப் பகுதிகளை மறுவாழ்வு செய்ய தொடங்கப்பட்டது.',
        year: '2005 – 2012',
      },
    ],
  },
  stats: {
    established: '1987',
    province: 'Southern',
    districts: '3',
    yearsOfService: '37+',
    /* NEW (not transcribed): si/ta labels for the stat strip. Source only
       provided English labels for these facts. */
    labels: {
      en: { established: 'Established', province: 'Province', districts: 'Districts', yearsOfService: 'Years of Service' },
      si: { established: 'ස්ථාපිත', province: 'පළාත', districts: 'දිස්ත්‍රික්ක', yearsOfService: 'සේවා වර්ෂ' },
      ta: { established: 'நிறுவப்பட்டது', province: 'மாகாணம்', districts: 'மாவட்டங்கள்', yearsOfService: 'சேவை ஆண்டுகள்' },
    },
  },
}

module.exports = {
  staffSeed,
  faqsSeed,
  homeContentSeed,
  departmentsSeed,
  siteSettingsSeed,
  aboutOverviewSeed,
  aboutFunctionsSeed,
  orgStructureSeed,
  aboutHistorySeed,
}
