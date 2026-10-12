import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import HeroProducts from '../sections/HeroProducts'
import Tagline from '../sections/Tagline'
import Capabilities from '../sections/Capabilities'
import Contact from '../sections/Contact'
import { useSmoothScroll } from '../lib/scroll'

export default function Home() {
  const location = useLocation()
  const navigate = useNavigate()
  const { scrollTo } = useSmoothScroll()

  // Arriving from another page with a section to jump to
  useEffect(() => {
    const id = location.state?.scrollTo
    if (!id) return undefined
    const t = setTimeout(() => {
      scrollTo(id)
      navigate('.', { replace: true, state: null })
    }, 120)
    return () => clearTimeout(t)
  }, [location.state, navigate, scrollTo])

  return (
    <>
      <HeroProducts />
      <Tagline />
      <Capabilities />
      <Contact />
    </>
  )
}
