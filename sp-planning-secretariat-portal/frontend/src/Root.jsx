import { useState, useCallback } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'
import App from './App'
import LoadingScreen from '@/shared/animation/LoadingScreen'
import { SitePublishProvider } from '@/shared/contexts/SitePublishContext'

export default function Root() {
  const [appReady, setAppReady] = useState(false)
  const handleDone = useCallback(() => setAppReady(true), [])

  return (
    <>
      <LoadingScreen onDone={handleDone} />
      <div
        style={{
          opacity:       appReady ? 1 : 0,
          transition:    'opacity 0.5s cubic-bezier(0.22,1,0.36,1)',
          pointerEvents: appReady ? 'auto' : 'none',
        }}
      >
        <HelmetProvider>
          <BrowserRouter>
            <SitePublishProvider>
              <App />
            </SitePublishProvider>
            <Toaster
              position="top-right"
              richColors
              closeButton
              toastOptions={{
                style: {
                  fontFamily: 'Inter, sans-serif',
                  fontSize:   '0.88rem',
                },
              }}
            />
          </BrowserRouter>
        </HelmetProvider>
      </div>
    </>
  )
}
