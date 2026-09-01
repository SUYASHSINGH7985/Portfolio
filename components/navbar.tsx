"use client"

import { useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ExternalLink, Menu, X } from "lucide-react"

const navItems = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "tech", label: "TECH STACK" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "projects", label: "PROJECTS" },
]

export function Navbar({
  activeSection,
  scrollToSection,
}: {
  activeSection: string
  scrollToSection: (id: string) => void
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const home = document.getElementById("home")
    if (!home) return
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-30px 0px 0px" },
    )
    observer.observe(home)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const handleNavClick = useCallback((id: string) => {
    scrollToSection(id)
    setMobileOpen(false)
  }, [scrollToSection])

  return (
    <nav className="portfolio-nav fixed inset-x-0 top-0 z-50" aria-label="Primary navigation">
      <div className={`liquid-glass flex w-full items-center justify-between gap-2 p-2 sm:gap-4 sm:p-3 transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}>
        <button onClick={() => handleNavClick("home")} className="min-w-0 shrink-0 px-3 py-2 text-left" aria-label="Back to top">
          <span className="block text-base font-semibold tracking-tight text-foreground">SUYASH</span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative z-10 whitespace-nowrap rounded-full px-3 py-2 text-[11px] font-medium transition-all duration-200 hover:scale-105 sm:px-4 sm:text-sm ${activeSection === item.id ? "text-foreground" : "text-foreground/58 hover:text-foreground"}`}
            >
              {activeSection === item.id && (
                <motion.span layoutId="active-navigation" transition={{ type: "spring", bounce: 0.18, duration: 0.45 }} className="absolute inset-0 -z-10 rounded-full border border-foreground/10 bg-white/70 shadow-sm" />
              )}
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <a href="https://drive.google.com/file/d/1JwV4WLSdgRs7sdy3rRG0P5nUzjZiqjIP/view?usp=share_link" target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/70 transition-all duration-200 hover:bg-foreground/[0.03] hover:text-foreground">
            RESUME <ExternalLink size={12} className="opacity-50" />
          </a>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-white/60 text-foreground/70 transition-colors duration-200 hover:text-foreground md:hidden" aria-label={mobileOpen ? "Close menu" : "Open menu"}>
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2, ease: "easeOut" }} className="mx-2 mt-1 overflow-hidden rounded-2xl border border-foreground/10 bg-white shadow-[0_12px_40px_rgba(30,35,43,0.1)] sm:mx-3 md:hidden">
            <div className="space-y-1 p-3">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => handleNavClick(item.id)} className={`flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${activeSection === item.id ? "bg-foreground/[0.06] text-foreground" : "text-foreground/70 hover:bg-foreground/[0.03] hover:text-foreground"}`}>
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
