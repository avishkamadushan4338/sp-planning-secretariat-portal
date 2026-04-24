import { Routes, Route } from 'react-router-dom'
import { FooterProvider } from './contexts/FooterContext'
import MainLayout from './layouts/MainLayout'
import LandingPage from './pages/Landing/LandingPage'
import Home from './pages/Home/Home'
import AboutSecretary from './pages/AboutSecretary/AboutSecretary'
import Departments from './pages/Departments/Departments'
import Documents from './pages/Documents/Documents'
import News from './pages/News/News'
import Notices from './pages/Notices/Notices'
import Tenders from './pages/Tenders/Tenders'
import Gallery from './pages/Gallery/Gallery'
import FAQ from './pages/FAQ/FAQ'
import Contact from './pages/Contact/Contact'
import ComingSoon from './components/ComingSoon'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <FooterProvider>
    <Routes>
      {/* Language-selection gateway – standalone, no Navbar/Footer */}
      <Route path="/" element={<LandingPage />} />

      {/* Main site – wrapped in Navbar + Footer layout */}
      <Route element={<MainLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="about-secretary" element={<AboutSecretary />} />
        <Route path="about/ministry-overview" element={<ComingSoon pageKey="aboutMinistryOverview" />} />
        <Route path="about/minister" element={<ComingSoon pageKey="aboutMinister" />} />
        <Route path="about/deputy-minister-education" element={<ComingSoon pageKey="aboutDeputyMinisterEducation" />} />
        <Route path="about/deputy-minister-vocational" element={<ComingSoon pageKey="aboutDeputyMinisterVocational" />} />
        <Route path="about/secretary" element={<AboutSecretary />} />
        <Route path="about/organization-structure" element={<ComingSoon pageKey="aboutOrganizationStructure" />} />
        <Route path="about/functions-duties" element={<ComingSoon pageKey="aboutFunctionsDuties" />} />
        <Route path="about/history" element={<ComingSoon pageKey="aboutHistory" />} />
        <Route path="about/affiliated-institutions" element={<ComingSoon pageKey="aboutAffiliatedInstitutions" />} />
        <Route path="departments" element={<Departments />} />
        <Route path="documents" element={<Documents />} />
        <Route path="news" element={<News />} />
        <Route path="notices" element={<Notices />} />
        <Route path="tenders" element={<Tenders />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    </FooterProvider>
  )
}
