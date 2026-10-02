import { Outlet } from 'react-router-dom'
import { Component } from 'react'
import Navbar from '@/shared/components/Navbar'
import Footer from '@/shared/components/Footer'
import { useFooter } from '@/shared/contexts/FooterContext'
import ScrollProgress from '@/shared/animation/ScrollProgress'
import PageTransition from '@/shared/animation/PageTransition'
import './MainLayout.css'

class PageErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null } }
  static getDerivedStateFromError(error) { return { error } }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '4rem 2rem', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
          <h2 style={{ color: '#4A0918', marginBottom: '1rem' }}>Something went wrong</h2>
          <pre style={{ color: '#666', fontSize: '0.8rem', whiteSpace: 'pre-wrap', maxWidth: 600, margin: '0 auto' }}>
            {this.state.error?.message}
            {'\n\n'}
            {this.state.error?.stack}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

export default function MainLayout() {
  const { hidden } = useFooter()
  return (
    <div className="layout">
      <ScrollProgress height={2} zIndex={9998} />
      <Navbar />
      <main className="main-content">
        <PageTransition>
          <PageErrorBoundary>
            <Outlet />
          </PageErrorBoundary>
        </PageTransition>
      </main>
      {!hidden && <Footer />}
    </div>
  )
}
