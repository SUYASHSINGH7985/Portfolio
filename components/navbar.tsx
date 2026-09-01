"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

const navItems = [
  ["Work", "projects"],
  ["About", "about"],
  ["Experience", "experience"],
  ["Skills", "skills"],
  ["Contact", "contact"],
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const closeMenu = () => setMobileOpen(false)

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a href="#home" className="brand" onClick={closeMenu} aria-label="Suyash Singh home">
          SS<span className="brand-dot">.</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>

        <div className="header-actions">
          <a className="resume-link" href="/Suyash_Resume 2.pdf" target="_blank" rel="noreferrer">Resume</a>
          <button className="menu-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-label={mobileOpen ? "Close menu" : "Open menu"}>
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>)}
          <a href="/Suyash_Resume 2.pdf" target="_blank" rel="noreferrer" onClick={closeMenu}>Resume</a>
        </nav>
      )}
    </header>
  )
}
