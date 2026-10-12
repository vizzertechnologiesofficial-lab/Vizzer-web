import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({ theme: 'dark', toggle: () => {} })

const readInitial = () =>
  typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readInitial)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.style.colorScheme = theme
    const meta = document.querySelectorAll('meta[name="theme-color"]')
    meta.forEach((m) => m.setAttribute('content', theme === 'dark' ? '#131209' : '#FAFAF7'))
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem('vizzer-theme', next)
      } catch (e) {
        /* storage unavailable: theme still switches for this visit */
      }
      return next
    })
  }, [])

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
