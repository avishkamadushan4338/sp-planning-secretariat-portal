import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Departments from './pages/Departments/Departments'
import Documents from './pages/Documents/Documents'
import News from './pages/News/News'
import Notices from './pages/Notices/Notices'
import Tenders from './pages/Tenders/Tenders'
import Gallery from './pages/Gallery/Gallery'
import FAQ from './pages/FAQ/FAQ'
import Contact from './pages/Contact/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
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
  )
}
