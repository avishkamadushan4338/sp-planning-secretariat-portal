import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './MainLayout.css'

export default function MainLayout() {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content pt-[114px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
