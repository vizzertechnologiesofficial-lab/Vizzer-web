import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Technology from './pages/Technology'
import Partnerships from './pages/Partnerships'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'
import { ThemeProvider } from './lib/theme'
import { SmoothScroll, useSmoothScroll } from './lib/scroll'

// New page: start at the top. Link with a #hash (e.g. /products#product-gater): glide to that section.
function ScrollOnNavigate() {
  const { pathname, hash } = useLocation()
  const { scrollTo } = useSmoothScroll()
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return undefined
    }
    const t = setTimeout(() => scrollTo(decodeURIComponent(hash.slice(1))), 150)
    return () => clearTimeout(t)
  }, [pathname, hash, scrollTo])
  return null
}

export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <SmoothScroll>
          <ScrollOnNavigate />
          <Nav />
          <main id="main" tabIndex={-1} className="outline-none">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/partnerships" element={<Partnerships />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </SmoothScroll>
      </MotionConfig>
    </ThemeProvider>
  )
}
