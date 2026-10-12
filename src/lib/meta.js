import { useEffect } from 'react'
import { site } from '../data/site'

const setMeta = (selector, attr, value) => {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

// Sets the browser title, description, canonical URL and share tags for a page.
// `page` is one entry from `seo` in src/data/site.js.
export function usePageMeta(page) {
  useEffect(() => {
    const { title, description, path } = page
    document.title = title
    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[name="twitter:title"]', 'content', title)
    setMeta('meta[name="twitter:description"]', 'content', description)
    if (path) {
      const url = `${site.url}${path}`
      setMeta('link[rel="canonical"]', 'href', url)
      setMeta('meta[property="og:url"]', 'content', url)
    }
  }, [page])
}
