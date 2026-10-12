import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Privacy from './pages/Privacy'
import NotFound from './pages/NotFound'
import { ThemeProvider } from './lib/theme'
import { SmoothScroll } from './lib/scroll'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <SmoothScroll>
          <ScrollToTop />
          <Nav />
          <main id="main" tabIndex={-1} className="outline-none">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </SmoothScroll>
      </MotionConfig>
    </ThemeProvider>
  )
}
