"use client"

import { useEffect, useState } from "react"
import { Github, Linkedin, Menu, X } from "lucide-react"

const navItems = [
  ["Home", "home"],
  ["Experience", "experience"],
  ["Work", "projects"],
  ["Skills", "skills"],
  ["Contact", "contact"],
]

const resumeHref = "https://drive.google.com/file/d/1_bTiCSB2bz_Kvl9ZA_QSBh0G1ulrAA5x/view?usp=sharing"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const closeMenu = () => setMobileOpen(false)

  return (
    <>
      <aside className="site-sidebar" aria-label="Primary navigation">
        <a href="#home" className="sidebar-brand">
          <span>SUYASH</span>
          <span>SINGH<span className="brand-dot">.</span></span>
        </a>

        <nav className="sidebar-nav">
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>

        <div className="sidebar-bottom">
          <a className="sidebar-resume" href={resumeHref} target="_blank" rel="noreferrer">Resume <span>↗</span></a>
          <div className="sidebar-socials">
            <a href="https://github.com/s4yashh" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={15} /></a>
            <a href="https://www.linkedin.com/in/s4yashh/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={15} /></a>
          </div>
          <p>Software Developer<br />Full Stack Development</p>
        </div>
      </aside>

      <header className="mobile-header">
        <a href="#home" className="mobile-brand" onClick={closeMenu}>SUYASH SINGH<span className="brand-dot">.</span></a>
        <button className="menu-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-label={mobileOpen ? "Close menu" : "Open menu"}>
          {mobileOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </header>

      {mobileOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>)}
          <a href={resumeHref} target="_blank" rel="noreferrer" onClick={closeMenu}>Resume ↗</a>
          <div className="mobile-socials">
            <a href="https://github.com/s4yashh" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/s4yashh/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </nav>
      )}
    </>
  )
}
