import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useFooter } from '../contexts/FooterContext'
import './MainLayout.css'

export default function MainLayout() {
  const { hidden } = useFooter()
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content pt-[76px]">
        <Outlet />
      </main>
      {!hidden && <Footer />}
    </div>
  )
}
