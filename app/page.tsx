"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Smartphone,
  Globe,
  Database,
  Sun,
  Moon,
} from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion"

// About Section Component
function AboutSection({ aboutRef, skills }: { aboutRef: React.RefObject<HTMLElement>; skills: any[] }) {
  const isInView = useInView(aboutRef, { once: true, margin: "-100px" })

  return (
    <motion.section
      id="about"
      ref={aboutRef}
      className="mb-20"
      initial={{ opacity: 1 }}
      animate={isInView ? { opacity: 1 } : { opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-3xl sm:text-4xl font-light mb-8 tracking-tight">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About Me
          </span>
        </h2>
        <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-3xl font-light">
          I'm a <strong className="font-normal text-white/90">2nd-year Computer Science student</strong> at <strong className="font-normal text-white/90">VIT Vellore</strong> with a passion for building <strong className="font-normal text-white/90">clean, scalable web apps</strong> and solving <strong className="font-normal text-white/90">real-world problems through code</strong>.
          I actively work on <strong className="font-normal text-white/90">personal projects</strong>, regularly push my progress to <strong className="font-normal text-white/90">GitHub</strong>, and solve <strong className="font-normal text-white/90">Data Structures & Algorithms (DSA)</strong> problems on platforms like <strong className="font-normal text-white/90">LeetCode</strong> and <strong className="font-normal text-white/90">Codeforces</strong>.
        </p>

        <div className="mt-16">
          {/* Skills Header with Horizontal Lines */}
          <div className="flex items-center gap-6 mb-12">
            <div className="flex-1 h-px bg-gradient-to-r from-white/20 via-white/10 to-transparent"></div>
            <h3 className="text-2xl font-light tracking-tight whitespace-nowrap px-4 text-white/90">
              -------<span className="mx-2">skills & expertise</span>-------
            </h3>
            <div className="flex-1 h-px bg-gradient-to-l from-white/20 via-white/10 to-transparent"></div>
          </div>

          {/* Horizontal Scrolling Skills Container */}
          <div className="relative">
            {/* Top decorative line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-white/10 via-white/20 to-white/10"></div>
            
            {/* Skills scroll container */}
            <div className="overflow-x-auto py-8 px-2 scrollbar-hide">
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex gap-6 min-w-min"
              >
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex flex-col items-center gap-3 px-6 py-4 rounded-lg bg-gradient-to-br from-white/8 to-white/3 border border-white/15 hover:border-white/30 backdrop-blur-sm transition-all cursor-pointer group"
                  >
                    <div className="text-white/70 group-hover:text-white/90 transition-colors">
                      {skill.icon}
                    </div>
                    <span className="text-sm font-light text-white/80 group-hover:text-white/90 transition-colors text-center whitespace-nowrap">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Bottom decorative line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-white/10 via-white/20 to-white/10"></div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}

// Projects Section Component
function ProjectsSection({
  projectsRef,
  projects,
  allTechnologies,
  selectedFilter,
  setSelectedFilter,
}: {
  projectsRef: React.RefObject<HTMLElement>
  projects: any[]
  allTechnologies: string[]
  selectedFilter: string
  setSelectedFilter: (filter: string) => void
}) {
  const isInView = useInView(projectsRef, { once: true, margin: "-100px" })

  return (
    <motion.section
      id="projects"
      ref={projectsRef}
      className="mb-20"
      initial={{ opacity: 1 }}
      animate={isInView ? { opacity: 1 } : { opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-3xl sm:text-4xl font-light mb-8 tracking-tight">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Projects
          </span>
        </h2>

        <div className="flex flex-wrap gap-2 mb-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedFilter("all")}
            className={`px-4 py-2 rounded-lg font-light transition-all ${
              selectedFilter === "all"
                ? "bg-white/20 text-white"
                : "bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            All
          </motion.button>
          {allTechnologies.map((tech) => (
            <motion.button
              key={tech}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedFilter(tech)}
              className={`px-4 py-2 rounded-lg font-light transition-all ${
                selectedFilter === tech
                  ? "bg-white/20 text-white"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {tech}
            </motion.button>
          ))}
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 1, y: 0 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="border border-white/10 rounded-lg p-6 hover:border-white/20 transition-all"
            >
              <h3 className="text-xl font-light mb-2 text-white">{project.title}</h3>
              <p className="text-white/70 text-sm mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag: string) => (
                  <Badge key={tag} className="bg-white/10 text-white/80 text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-3">
                <Link href={project.link} target="_blank">
                  <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white text-xs">
                    <Github size={14} className="mr-2" />
                    Code
                  </Button>
                </Link>
                <Link href={project.demo} target="_blank">
                  <Button size="sm" variant="outline" className="text-white text-xs">
                    <ExternalLink size={14} className="mr-2" />
                    Demo
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  )
}

// Resume Section Component
function ResumeSection({ resumeRef }: { resumeRef: React.RefObject<HTMLElement> }) {
  const isInView = useInView(resumeRef, { once: true, margin: "-100px" })

  return (
    <motion.section
      id="resume"
      ref={resumeRef}
      className="mb-20"
      initial={{ opacity: 1 }}
      animate={isInView ? { opacity: 1 } : { opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-3xl sm:text-4xl font-light mb-8 tracking-tight">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Resume
          </span>
        </h2>

        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4"
        >
          <p className="text-base sm:text-lg text-white/70 leading-relaxed font-light">
            Download my complete resume to see my full background, projects, and qualifications.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/Suyash_Resume 2.pdf" download target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-light transition-all hover:shadow-lg hover:shadow-primary/20"
              >
                <ExternalLink size={18} className="inline mr-3" />
                Download PDF
              </motion.button>
            </a>

            <a href="/Suyash_Resume 2.pdf" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white rounded-lg font-light transition-all hover:border-white/40 hover:bg-white/5"
              >
                View in Browser
              </motion.button>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

// Contact Section Component
function ContactSection({ contactRef }: { contactRef: React.RefObject<HTMLElement> }) {
  const isInView = useInView(contactRef, { once: true, margin: "-100px" })

  return (
    <motion.section
      id="contact"
      ref={contactRef}
      className="mb-20"
      initial={{ opacity: 1 }}
      animate={isInView ? { opacity: 1 } : { opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-3xl sm:text-4xl font-light mb-8 tracking-tight">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Get In Touch
          </span>
        </h2>
        <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mb-8 font-light">
          I'm always interested in new opportunities and exciting projects. Let's discuss how we can bring your ideas to life.
        </p>

        <div className="flex flex-col gap-4">
          <Link href="mailto:singhsuyash012@gmail.com">
            <Button className="bg-white/10 hover:bg-white/20 text-white w-full justify-start">
              <Mail size={18} className="mr-3" />
              singhsuyash012@gmail.com
            </Button>
          </Link>
          <Link href="https://linkedin.com/in/suyashsingh-dev" target="_blank">
            <Button variant="outline" className="text-white w-full justify-start">
              <Linkedin size={18} className="mr-3" />
              LinkedIn Profile
            </Button>
          </Link>
          <Link href="https://github.com/SUYASHSINGH7985" target="_blank">
            <Button variant="outline" className="text-white w-full justify-start">
              <Github size={18} className="mr-3" />
              GitHub Profile
            </Button>
          </Link>
        </div>
      </motion.div>
    </motion.section>
  )
}

export default function Portfolio() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [showMusicPlayer, setShowMusicPlayer] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Global click handler to play/pause music
  useEffect(() => {
    const handleGlobalClick = () => {
      if (audioRef.current) {
        if (isAudioPlaying) {
          audioRef.current.pause()
          setIsAudioPlaying(false)
        } else {
          audioRef.current.play().catch(e => console.log('Autoplay prevented:', e))
          setIsAudioPlaying(true)
        }
      }
    }

    // Don't trigger on button clicks or interactive elements
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('button, a, [role="button"]')) {
        handleGlobalClick()
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [isAudioPlaying])

  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 2000], [0, -500])

  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const resumeRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  const projects = [
    {
      id: 1,
      title: "SEED (Frontend Developer)",
      description: "Built a responsive startup platform with chatbot UI, dynamic listings, internship features, and seamless navigation.",
      image: "image.png",
      tags: ["React", "Node.js", "MongoDB", "Stripe", "TypeScript"],
      category: "web",
      link: "https://github.com/SUYASHSINGH7985/SEED",
      demo: "https://thecompanyseed.vercel.app/",
    },
    {
      id: 2,
      title: "Amazon Clone App",
      description: "Developed an iOS e-commerce app with SwiftUI, Firebase auth, real-time DB, cart, checkout, and order tracking.",
      image: "Screenshot 2025-07-30 at 2.56.51 PM.png",
      tags: ["Swift", "SwiftUI", "HealthKit", "Core Data", "iOS"],
      category: "ios",
      link: "https://github.com/SUYASHSINGH7985/Amazon-Clone",
      demo: "https://drive.google.com/file/d/1x1QwaK2j2Xg_4MJdXbX5CWN9Cll9cI3_/view",
    },
    {
      id: 3,
      title: "Apple Futuristic Landing Page",
      description: "Crafted a modern Apple-style landing page with 3D product visuals using Three.js and smooth animations for seamless UX.",
      image: "image.png",
      tags: ["React", "Socket.io", "Node.js"],
      category: "web",
      link: "https://github.com/SUYASHSINGH7985/APPLE-LandingPage-",
      demo: "https://suyashsingh7985.github.io/APPLE-LandingPage-/",
    },
  ]

  const skills = [
    { name: "React/Next.js", icon: <Globe className="w-5 h-5" /> },
    { name: "Swift/SwiftUI", icon: <Smartphone className="w-5 h-5" /> },
    { name: "Node.js", icon: <Code className="w-5 h-5" /> },
    { name: "iOS Development", icon: <Smartphone className="w-5 h-5" /> },
    { name: "TypeScript", icon: <Code className="w-5 h-5" /> },
    { name: "MongoDB", icon: <Database className="w-5 h-5" /> },
  ]

  const navigationItems = [
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "experience" },
    { label: "Resume", id: "resume" },
    { label: "Contact", id: "contact" },
  ]

  const allTechnologies = Array.from(new Set(projects.flatMap((project) => project.tags))).sort()

  const filteredProjects =
    selectedFilter === "all"
      ? projects
      : projects.filter((project) =>
          project.tags.some((tag) => tag.toLowerCase().includes(selectedFilter.toLowerCase())),
        )

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "resume", "contact"]
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 overflow-x-hidden">
      {/* Animated Background */}
      <motion.div className="fixed inset-0 -z-10" style={{ y: backgroundY }}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </motion.div>

      {/* Header Navigation */}
      <header className="sticky top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md transition-colors duration-300">
        <div className="flex items-start justify-end w-full px-4 sm:px-6 lg:px-8 py-6">
          {/* Right Column - Social Links at top, Navigation below */}
          <div className="flex flex-col items-end gap-4">
            {/* Social links and theme toggle row */}
            <div className="flex items-center gap-3">
              <motion.a
                href="https://github.com/SUYASHSINGH7985"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-foreground/60 hover:text-foreground transition-colors"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/suyashsingh-dev"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-foreground/60 hover:text-foreground transition-colors"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="mailto:singhsuyash012@gmail.com"
                whileHover={{ scale: 1.2 }}
                className="text-foreground/60 hover:text-foreground transition-colors"
              >
                <Mail size={20} />
              </motion.a>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setTheme(theme === 'dark' ? 'light' : 'dark')
                }}
                className="text-foreground/60 hover:text-foreground transition-colors"
              >
                {theme === 'dark' ? (
                  <Sun size={20} />
                ) : (
                  <Moon size={20} />
                )}
              </motion.button>

              {/* Music Player Wave Line */}
              <div className="relative group flex items-center gap-2">
                {isAudioPlaying ? (
                  <>
                    <svg 
                      width="48" 
                      height="12" 
                      viewBox="0 0 48 12" 
                      className="cursor-pointer hover:brightness-110"
                    >
                      <defs>
                        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(var(--primary))" />
                          <stop offset="100%" stopColor="hsl(var(--secondary))" />
                        </linearGradient>
                      </defs>
                      <motion.path
                        stroke="url(#waveGradient)"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                        animate={{
                          d: [
                            "M 0 6 Q 6 2 12 6 T 24 6 T 36 6 T 48 6",
                            "M 0 6 Q 6 10 12 6 T 24 6 T 36 6 T 48 6",
                            "M 0 6 Q 6 2 12 6 T 24 6 T 36 6 T 48 6"
                          ]
                        }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      />
                    </svg>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs font-light text-foreground/80 whitespace-nowrap"
                    >
                      ≪ Losing My Mind ≫
                    </motion.span>
                  </>
                ) : (
                  <div className="h-0.5 w-12 bg-gradient-to-r from-primary to-secondary opacity-60"></div>
                )}
                
                {/* Music Player Popup on Hover */}
                <AnimatePresence>
                  {showMusicPlayer && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-3 right-0 backdrop-blur-md bg-black/40 border border-white/20 rounded-lg shadow-lg overflow-hidden p-3 w-48 z-50"
                      onMouseEnter={() => setShowMusicPlayer(true)}
                      onMouseLeave={() => setShowMusicPlayer(false)}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 bg-gradient-to-br from-pink-500 to-red-500">
                          <img
                            src="/losing.png"
                            alt="Album"
                            width="40"
                            height="40"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-white truncate">Lose My Mind</p>
                          <p className="text-xs text-white/60 truncate">Don Toliver</p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            if (audioRef.current) {
                              if (isAudioPlaying) {
                                audioRef.current.pause()
                                setIsAudioPlaying(false)
                              } else {
                                audioRef.current.play()
                                setIsAudioPlaying(true)
                              }
                            }
                          }}
                          className="w-8 h-8 rounded-full backdrop-blur-md bg-white/20 border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all flex-shrink-0"
                        >
                          {isAudioPlaying ? (
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          )}
                        </motion.button>
                      </div>
                      <audio
                        ref={audioRef}
                        src="/Losingmymind.mp3"
                        onPlay={() => setIsAudioPlaying(true)}
                        onPause={() => setIsAudioPlaying(false)}
                        onEnded={() => setIsAudioPlaying(false)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation Items - Vertical below social links */}
            <nav className="flex flex-col items-end gap-2 pt-2">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-light text-xs tracking-wide transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-foreground"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="w-full pb-20">
        {/* Hero Section */}
        <section id="home" ref={heroRef} className="mb-32 px-0 sm:px-0 lg:px-0 pt-0 pl-4 sm:pl-6 lg:pl-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-6 mb-3">
              {/* Name */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
                  Suyash Singh
                </span>
              </h1>
            </div>
            <div className="flex items-center gap-8 mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground tracking-tight leading-normal">
                Software Developer
              </h2>
            </div>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-5xl font-light">
              I build <strong className="font-normal text-white/90">scalable applications</strong> with <strong className="font-normal text-white/90">clean code</strong> and <strong className="font-normal text-white/90">intuitive user interfaces</strong>, solving <strong className="font-normal text-white/90">complex problems</strong> using <strong className="font-normal text-white/90">modern technologies</strong>. From global e-commerce platforms to emerging Web3 products, I design frameworks that feel seamless, human, and ready for the future.
            </p>
          </motion.div>
        </section>

        {/* About Section */}
        <div className="px-0 sm:px-0 lg:px-0 pl-4 sm:pl-6 lg:pl-8">
          <AboutSection aboutRef={aboutRef} skills={skills} />
        </div>

        {/* Projects Section */}
        <div className="px-0 sm:px-0 lg:px-0 pl-4 sm:pl-6 lg:pl-8">
          <ProjectsSection
            projectsRef={projectsRef}
            projects={filteredProjects}
            allTechnologies={allTechnologies}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        </div>

        {/* Resume Section */}
        <div className="px-0 sm:px-0 lg:px-0 pl-4 sm:pl-6 lg:pl-8">
          <ResumeSection resumeRef={resumeRef} />
        </div>

        {/* Contact Section */}
        <div className="px-0 sm:px-0 lg:px-0 pl-4 sm:pl-6 lg:pl-8">
          <ContactSection contactRef={contactRef} />
        </div>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="/Losingmymind.mp3"
        onPlay={() => setIsAudioPlaying(true)}
        onPause={() => setIsAudioPlaying(false)}
        onEnded={() => setIsAudioPlaying(false)}
      />

      {/* Footer */}
      <footer className="py-8 px-6 text-center border-t border-white/10">
        <p className="text-sm text-white/50">© {new Date().getFullYear()} Suyash Singh</p>
      </footer>
    </div>
  )
}
