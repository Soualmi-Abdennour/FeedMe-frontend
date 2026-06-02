'use client'

import { useEffect } from 'react'

export default function ScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const section = entry.target.closest('section, footer')
          const siblings = section
            ? [...section.querySelectorAll('.reveal, .reveal-left, .reveal-right')]
            : []
          const idx = siblings.indexOf(entry.target as HTMLElement)
          const delay = idx >= 0 ? idx * 90 : 0

          setTimeout(() => entry.target.classList.add('visible'), delay)
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.1 }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
