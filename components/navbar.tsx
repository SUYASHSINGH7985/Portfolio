"use client"

import { useState, useRef, useEffect, useCallback, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  ChevronDown,
  ExternalLink,
  Github,
  Linkedin,
  Code2,
  Globe,
  Database,
  Smartphone,
  Cloud,
  Wrench,
  User,
  GraduationCap,
  Server,
  Container,
  GitBranch,
} from "lucide-react"

const techGroups = [
  {
    label: "Frontend",
    icon: Globe,
    items: ["HTML", "CSS", "Bootstrap", "Tailwind CSS", "JavaScript", "React", "React Native"],
  },
  {
    label: "Backend",
    icon: Server,
    items: ["Node.js", "REST APIs", "MVC", "Authentication"],
  },
  {
    label: "Databases",
    icon: Database,
    items: ["SQL", "MongoDB"],
  },
  {
    label: "Mobile",
    icon: Smartphone,
    items: ["Swift", "SwiftUI"],
  },
  {
    label: "DevOps & Cloud",
    icon: Cloud,
    items: ["AWS", "Docker", "Kubernetes", "CI/CD", "Caching"],
  },
  {
    label: "Tools",
    icon: Wrench,
    items: ["Git", "GitHub", "Unit Testing"],
  },
]

const navItems = [
  { id: "home", label: "HOME" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "projects", label: "PROJECTS" },
  { id: "tech", label: "TECH STACK", hasDropdown: true },
  { id: "about", label: "ABOUT", hasDropdown: true },
]

const techIconMap: Record<string, ReactNode> = {
  HTML: <Code2 size={12} />,
  CSS: <Code2 size={12} />,
  JavaScript: <Code2 size={12} />,
  React: <Code2 size={12} />,
  "React Native": <Smartphone size={12} />,
  "Node.js": <Server size={12} />,
  SQL: <Database size={12} />,
  MongoDB: <Database size={12} />,
  AWS: <Cloud size={12} />,
  Docker: <Container size={12} />,
  Git: <GitBranch size={12} />,
  GitHub: <Github size={12} />,
  Swift: <Smartphone size={12} />,
  SwiftUI: <Smartphone size={12} />,
}

export function Navbar({
  activeSection,
  scrollToSection,
}: {
  activeSection: string
  scrollToSection: (id: string) => void
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [dropdownTop, setDropdownTop] = useState(0)
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const triggerRefs = useRef<Record<string, HTMLDivElement | null>>({})

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
    if (mobileOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const handleNavClick = useCallback((id: string) => {
    if (id === "tech" || id === "about") return
    scrollToSection(id)
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [scrollToSection])

  const handleDropdownEnter = useCallback((id: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setOpenDropdown(id)
    const trigger = triggerRefs.current[id]
    if (trigger) {
      const rect = trigger.getBoundingClientRect()
      setDropdownTop(rect.bottom + 8)
    }
  }, [])

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150)
  }, [])

  return (
    <nav
      className="portfolio-nav fixed inset-x-0 top-0 z-50"
      aria-label="Primary navigation"
    >
      <div
        className={`liquid-glass flex w-full items-center justify-between gap-2 p-2 sm:p-3 sm:gap-4 transition-all duration-300 ${
          scrolled ? "shadow-lg" : ""
        }`}
      >
        {/* Left: Logo */}
        <button
          onClick={() => handleNavClick("home")}
          className="min-w-0 px-3 py-2 text-left shrink-0"
          aria-label="Back to top"
        >
          <span className="block text-base font-semibold tracking-tight text-foreground sm:text-base">
            SUYASH
          </span>
        </button>

        {/* Center: Desktop nav items */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) =>
            item.hasDropdown ? (
              <div
                key={item.id}
                ref={(el) => { triggerRefs.current[item.id] = el }}
                onMouseEnter={() => handleDropdownEnter(item.id)}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className="flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-[11px] font-medium transition-all duration-200 sm:px-4 sm:text-sm hover:scale-105 text-foreground/58 hover:text-foreground"
                >
                  {item.label}
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 ${
                      openDropdown === item.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            ) : (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative z-10 whitespace-nowrap rounded-full px-3 py-2 text-[11px] font-medium transition-all duration-200 sm:px-4 sm:text-sm hover:scale-105 ${
                  activeSection === item.id
                    ? "text-foreground"
                    : "text-foreground/58 hover:text-foreground"
                }`}
              >
                {activeSection === item.id && (
                  <motion.span
                    layoutId="active-navigation"
                    transition={{ type: "spring", bounce: 0.18, duration: 0.45 }}
                    className="absolute inset-0 -z-10 rounded-full border border-foreground/10 bg-white/70 shadow-sm"
                  />
                )}
                {item.label}
              </button>
            ),
          )}
        </div>

        {/* Right: Resume + Mobile toggle */}
        <div className="flex items-center gap-2 shrink-0">
        <a
           href="https://drive.google.com/file/d/1JwV4WLSdgRs7sdy3rRG0P5nUzjZiqjIP/view?usp=share_link"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-foreground/[0.03] transition-all duration-200 mt-2"
        >
          RESUME
          <ExternalLink size={12} className="opacity-50" />
        </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-white/60 text-foreground/70 hover:text-foreground transition-colors duration-200"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Desktop dropdowns - outside liquid-glass to avoid overflow clip */}
      <AnimatePresence>
        {openDropdown === "about" && (
          <div
            className="fixed left-1/2 -translate-x-1/2 z-50"
            style={{ top: dropdownTop }}
            onMouseEnter={() => handleDropdownEnter("about")}
            onMouseLeave={handleDropdownLeave}
          >
            <AboutDropdown />
          </div>
        )}
        {openDropdown === "tech" && (
          <div
            className="fixed left-1/2 -translate-x-1/2 z-50"
            style={{ top: dropdownTop }}
            onMouseEnter={() => handleDropdownEnter("tech")}
            onMouseLeave={handleDropdownLeave}
          >
            <TechDropdown />
          </div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu
            activeSection={activeSection}
            onNavClick={handleNavClick}
            onClose={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </nav>
  )
}

function AboutDropdown() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.96 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="w-80 overflow-hidden rounded-2xl border border-foreground/10 bg-white shadow-[0_12px_40px_rgba(30,35,43,0.1)]"
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-foreground/10 bg-foreground/[0.03]">
            <span className="text-sm font-semibold text-foreground/80">SS</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">Suyash Singh</p>
            <p className="mt-1 text-xs leading-5 text-foreground/60">
              Prefinal Year Computer Science Engineering student at VIT Vellore.
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-2.5">
          <div className="flex items-start gap-2.5">
            <GraduationCap size={14} className="mt-0.5 shrink-0 text-foreground/45" />
            <p className="text-xs leading-5 text-foreground/65">
              Passionate about building scalable web applications, mobile apps, and cloud-native software.
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <Code2 size={14} className="mt-0.5 shrink-0 text-foreground/45" />
            <p className="text-xs leading-5 text-foreground/65">
              Interested in Full Stack Development, AI, and System Design.
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <User size={14} className="mt-0.5 shrink-0 text-foreground/45" />
            <p className="text-xs leading-5 text-foreground/65">
              Always learning new technologies and solving real-world problems.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-foreground/8 px-5 py-3">
        <span className="text-[11px] font-medium text-foreground/45">Let&apos;s Connect</span>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/s4yashh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/45 hover:text-foreground transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github size={15} />
          </a>
          <a
            href="https://www.linkedin.com/in/s4yashh/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/45 hover:text-foreground transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin size={15} />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

function TechDropdown() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.96 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="overflow-hidden rounded-2xl border border-foreground/10 bg-white shadow-[0_12px_40px_rgba(30,35,43,0.1)]"
    >
      <div className="grid grid-cols-3 gap-px bg-foreground/8">
        {techGroups.map((group) => (
          <div key={group.label} className="bg-white p-4">
            <div className="flex items-center gap-1.5 mb-2.5">
              <group.icon size={13} className="text-foreground/45" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground/50">
                {group.label}
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {group.items.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 rounded-full border border-foreground/10 bg-foreground/[0.035] px-2.5 py-1 text-[11px] font-medium text-foreground/70"
                >
                  {techIconMap[tech] || null}
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function MobileMenu({
  activeSection,
  onNavClick,
  onClose,
}: {
  activeSection: string
  onNavClick: (id: string) => void
  onClose: () => void
}) {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="md:hidden mx-2 sm:mx-3 mt-1 overflow-hidden rounded-2xl border border-foreground/10 bg-white shadow-[0_12px_40px_rgba(30,35,43,0.1)]"
    >
      <div className="p-3 space-y-1">
        {navItems.map((item) => (
          <div key={item.id}>
            {item.hasDropdown ? (
              <>
                <button
                  onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-foreground/[0.03] transition-all duration-200"
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      expanded === item.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {expanded === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-3 pb-3 pt-1">
                        {item.id === "about" && <MobileAboutDropdown />}
                        {item.id === "tech" && <MobileTechDropdown />}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <button
                onClick={() => onNavClick(item.id)}
                className={`flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-foreground/[0.06] text-foreground"
                    : "text-foreground/70 hover:text-foreground hover:bg-foreground/[0.03]"
                }`}
              >
                {item.label}
              </button>
            )}
          </div>
        ))}

        {/* Resume in mobile */}
          <a
          href="https://drive.google.com/file/d/1JwV4WLSdgRs7sdy3rRG0P5nUzjZiqjIP/view?usp=share_link"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-[11px] font-medium text-foreground/58 hover:text-foreground transition-all duration-200 sm:text-sm"
          >
            Resume
            <ExternalLink size={10} className="opacity-50" />
          </a>
      </div>
    </motion.div>
  )
}

function MobileAboutDropdown() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-foreground/10 bg-foreground/[0.03]">
          <span className="text-xs font-semibold text-foreground/80">SS</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Suyash Singh</p>
          <p className="text-xs text-foreground/60">VIT Vellore</p>
        </div>
      </div>
      <p className="text-xs leading-6 text-foreground/65">
        Passionate about building scalable web applications, mobile apps, and cloud-native software.
        Interested in Full Stack Development, AI, and System Design. Always learning new technologies
        and solving real-world problems.
      </p>
      <div className="flex items-center gap-3 pt-1">
        <span className="text-[11px] font-medium text-foreground/45">Connect:</span>
        <a href="https://github.com/s4yashh" target="_blank" rel="noopener noreferrer" className="text-foreground/45 hover:text-foreground transition-colors">
          <Github size={15} />
        </a>
        <a href="https://www.linkedin.com/in/s4yashh/" target="_blank" rel="noopener noreferrer" className="text-foreground/45 hover:text-foreground transition-colors">
          <Linkedin size={15} />
        </a>
      </div>
    </div>
  )
}

function MobileTechDropdown() {
  return (
    <div className="space-y-3">
      {techGroups.map((group) => (
        <div key={group.label}>
          <div className="flex items-center gap-1.5 mb-1.5">
            <group.icon size={12} className="text-foreground/45" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-foreground/50">
              {group.label}
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {group.items.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1 rounded-full border border-foreground/10 bg-foreground/[0.035] px-2.5 py-1 text-[11px] font-medium text-foreground/70"
              >
                {techIconMap[tech] || null}
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
