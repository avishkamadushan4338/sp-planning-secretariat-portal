import { Routes, Route, useParams, Navigate } from 'react-router-dom'
import { FooterProvider } from '@/shared/contexts/FooterContext'
import { useSitePublish } from '@/shared/contexts/useSitePublish'
import MainLayout from '@/shared/layouts/MainLayout'
import ComingSoonPage from '@/features/portal/coming-soon/ComingSoonPage'
import LandingPage from '@/features/portal/landing/LandingPage'
import Home from '@/features/portal/home/Home'
import AboutDeputySecretary from '@/features/portal/about-deputy-secretary/AboutDeputySecretary'
import About from '@/features/portal/about/About'
import Departments from '@/features/portal/departments/Departments'
import DepartmentDetail from '@/features/portal/departments/DepartmentDetail'
import DepartmentProfile from '@/features/portal/departments/DepartmentProfile'
import Documents from '@/features/portal/documents/Documents'
import News from '@/features/portal/news/News'
import Notices from '@/features/portal/notices/Notices'
import Gallery from '@/features/portal/gallery/Gallery'
import Contact from '@/features/portal/contact/Contact'
import Downloads from '@/features/portal/downloads/Downloads'
import CMSLogin from '@/features/cms/CMSLogin'
import CMSDashboard from '@/features/cms/CMSDashboard'
import NotFound from '@/features/portal/not-found/NotFound'
import TermsAndServices from '@/features/portal/terms/TermsAndServices'

// SMP – Store Management System
import SMPLogin from '@/features/smp/SMPLogin'
import SMPLayout from '@/features/smp/SMPLayout'
import SMPDashboard from '@/features/smp/SMPDashboard'
import SMPInventory from '@/features/smp/SMPInventory'
import SMPDisposal from '@/features/smp/SMPDisposal'
import SMPTransactions from '@/features/smp/SMPTransactions'
import SMPReports from '@/features/smp/SMPReports'
import SMPLoginLogs from '@/features/smp/SMPLoginLogs'
import SMPUsers from '@/features/smp/SMPUsers'

const DEPT_KEYS    = new Set(['accounts', 'administration', 'development'])
const PROFILE_KEYS = new Set(['head-administration', 'head-accounts'])

function DepartmentRouter() {
  const { slug } = useParams()
  if (DEPT_KEYS.has(slug))    return <DepartmentDetail />
  if (PROFILE_KEYS.has(slug)) return <DepartmentProfile />
  return <Navigate to="/departments" replace />
}

function PortalGate({ children }) {
  const { isLive } = useSitePublish()
  return isLive ? children : <ComingSoonPage />
}

export default function App() {
  return (
    <FooterProvider>
      <Routes>
          {/* Language-selection gateway – standalone, no Navbar/Footer */}
          <Route path="/" element={<PortalGate><LandingPage /></PortalGate>} />

          {/* Terms & Services – standalone, no Navbar/Footer */}
          <Route path="/terms" element={<PortalGate><TermsAndServices /></PortalGate>} />

          {/* CMS Admin Portal – standalone, no Navbar/Footer */}
          <Route path="/cms" element={<CMSLogin />} />
          <Route path="/cms/dashboard" element={<CMSDashboard />} />

          {/* SMP Login – standalone */}
          <Route path="/smp" element={<SMPLogin />} />

          {/* SMP Dashboard – sidebar layout, no main Navbar/Footer */}
          <Route path="/smp" element={<SMPLayout />}>
            <Route path="dashboard"    element={<SMPDashboard />} />
            <Route path="inventory"    element={<SMPInventory />} />
            <Route path="disposal"     element={<SMPDisposal />} />
            <Route path="transactions" element={<SMPTransactions />} />
            <Route path="reports"      element={<SMPReports />} />
            <Route path="login-logs"   element={<SMPLoginLogs />} />
            <Route path="users"        element={<SMPUsers />} />
          </Route>

          {/* Main site – wrapped in Navbar + Footer layout (gated by publish mode) */}
          <Route element={<PortalGate><MainLayout /></PortalGate>}>
            <Route path="home" element={<Home />} />
            <Route path="about-deputy-secretary" element={<AboutDeputySecretary />} />

            {/* About section — all nested routes handled inside About.jsx */}
            <Route path="about/*" element={<About />} />

            <Route path="departments"       element={<Departments />} />
            <Route path="departments/:slug" element={<DepartmentRouter />} />

            <Route path="documents" element={<Documents />} />
            <Route path="news" element={<News />} />
            <Route path="notices" element={<Notices />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="contact" element={<Contact />} />
            <Route path="downloads" element={<Downloads />} />
<Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
    </FooterProvider>
  )
}
