"use client"

import { useEffect, useRef } from "react"

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simple smooth scroll implementation using CSS scroll-behavior
    // This works across all modern browsers without GSAP ScrollSmoother complications
    
    if (typeof window !== 'undefined') {
      document.documentElement.style.scrollBehavior = 'smooth'
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.documentElement.style.scrollBehavior = 'auto'
      }
    }
  }, [])

  return (
    <div id="smooth-content" ref={contentRef}>
      {children}
    </div>
  )
}
