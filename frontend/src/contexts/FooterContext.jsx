import { createContext, useContext, useState } from 'react'

const FooterContext = createContext(null)

export function FooterProvider({ children }) {
  const [hidden, setHidden] = useState(false)
  return (
    <FooterContext.Provider value={{ hidden, setHidden }}>
      {children}
    </FooterContext.Provider>
  )
}

export function useFooter() {
  return useContext(FooterContext)
}
