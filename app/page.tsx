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

// Compact Music Player Component
interface CompactMusicPlayerProps {
  isVisible: boolean
}

function CompactMusicPlayer({ isVisible }: CompactMusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!audioRef.current || !isMounted) return

    const attemptAutoplay = async () => {
      try {
        audioRef.current!.muted = false
        const playPromise = audioRef.current!.play()
        if (playPromise !== undefined) {
          await playPromise
          setIsPlaying(true)
        }
      } catch (error) {
        const playOnInteraction = async () => {
          try {
            audioRef.current!.muted = false
            await audioRef.current!.play()
            setIsPlaying(true)
            document.removeEventListener('click', playOnInteraction)
            document.removeEventListener('touchstart', playOnInteraction)
            document.removeEventListener('keydown', playOnInteraction)
          } catch (e) {
            // Still blocked
          }
        }

        document.addEventListener('click', playOnInteraction, { once: true })
        document.addEventListener('touchstart', playOnInteraction, { once: true })
        document.addEventListener('keydown', playOnInteraction, { once: true })
      }
    }

    attemptAutoplay()
    const timer = setTimeout(attemptAutoplay, 1000)
    
    return () => clearTimeout(timer)
  }, [isMounted])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !isMounted) return

    const updateTime = () => {
      setCurrentTime(audio.currentTime)
    }

    const updateDuration = () => {
      setDuration(audio.duration || 0)
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('durationchange', updateDuration)

    if (audio.duration) {
      setDuration(audio.duration)
    }

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('durationchange', updateDuration)
    }
  }, [isMounted])

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.muted = false
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(() => {
        setIsPlaying(false)
      })
    }
  }

  const handleSkip = (direction: 'forward' | 'back', e: React.MouseEvent) => {
    e.stopPropagation()
    if (!audioRef.current || !duration) return

    const newTime = direction === 'forward' 
      ? Math.min(audioRef.current.currentTime + 10, duration)
      : Math.max(audioRef.current.currentTime - 10, 0)
    
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const formatTime = (time: number) => {
    if (!time || !isFinite(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  if (!isMounted) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
      transition={{ duration: 0.3 }}
      className={`backdrop-blur-md bg-black/40 border border-white/20 rounded-2xl shadow-lg overflow-hidden ${!isVisible ? 'pointer-events-none' : ''}`}
    >
      <audio
        ref={audioRef}
        src="/Losingmymind.mp3"
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        autoPlay
        crossOrigin="anonymous"
      />

      <div className="flex items-center justify-between px-3 py-2 gap-0">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="w-8 h-8 rounded-md overflow-hidden flex-shrink-0 shadow-lg bg-gradient-to-br from-pink-500 to-red-500">
            <img
              src="/losing.png"
              alt="Album"
              width="32"
              height="32"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate leading-tight">Lose My Mind</p>
            <p className="text-xs text-white/60 truncate leading-tight">Don Toliver</p>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0 -ml-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => handleSkip('back', e)}
            className="text-white/70 hover:text-white transition-all"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" />
            </svg>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePlayPause}
            className="w-7 h-7 rounded-full backdrop-blur-md bg-black/40 border border-white/20 flex items-center justify-center hover:bg-black/50 hover:border-white/30 transition-all shadow-lg"
          >
            {isPlaying ? (
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => handleSkip('forward', e)}
            className="text-white/70 hover:text-white transition-all"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 6v12l8.5-6L13 6zM4 18l8.5-6L4 6v12z" />
            </svg>
          </motion.button>

          <div className="hidden sm:flex items-center gap-0.5 text-xs font-mono text-white/60 min-w-14 ml-1">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

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

        <div className="mt-12">
          <h3 className="text-2xl font-light mb-8 tracking-tight">Skills & Expertise</h3>
          <div className="flex flex-wrap gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 1, y: 0 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all"
              >
                <span className="text-sm font-light text-white/80">{skill.name}</span>
              </motion.div>
            ))}
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
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 2000], [0, -500])

  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
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
      const sections = ["home", "about", "projects", "contact"]
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
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 overflow-x-hidden cursor-crosshair">
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md transition-colors duration-300">
        <div className="flex items-start justify-end w-full px-6 sm:px-8 lg:px-12 py-6">
          {/* Right - Social Links, Theme Toggle & Navigation (Flush to edge, vertical) */}
          <div className="flex flex-col items-end gap-4">
            {/* Top row: Social links and theme toggle */}
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
            </div>

            {/* Navigation items - Vertical layout with more opacity */}
            <nav className="flex flex-col items-end gap-2">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-light text-xs tracking-wide transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-foreground"
                      : "text-foreground/80 hover:text-foreground"
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
      <div className="w-full pt-24 pb-20">
        {/* Hero Section */}
        <section id="home" ref={heroRef} className="mb-32 px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white/90 mb-8 tracking-tight">
              Developer
            </h2>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-5xl font-light">
              I build <strong className="font-normal text-white/90">scalable applications</strong> with <strong className="font-normal text-white/90">clean code</strong> and <strong className="font-normal text-white/90">intuitive user interfaces</strong>, solving <strong className="font-normal text-white/90">complex problems</strong> using <strong className="font-normal text-white/90">modern technologies</strong>. From global e-commerce platforms to emerging Web3 products, I design frameworks that feel seamless, human, and ready for the future.
            </p>
          </motion.div>
        </section>

        {/* About Section */}
        <div className="px-6 sm:px-8 lg:px-12">
          <AboutSection aboutRef={aboutRef} skills={skills} />
        </div>

        {/* Projects Section */}
        <div className="px-6 sm:px-8 lg:px-12">
          <ProjectsSection
            projectsRef={projectsRef}
            projects={filteredProjects}
            allTechnologies={allTechnologies}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        </div>

        {/* Contact Section */}
        <div className="px-6 sm:px-8 lg:px-12">
          <ContactSection contactRef={contactRef} />
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 text-center border-t border-white/10">
        <p className="text-sm text-white/50">© {new Date().getFullYear()} Suyash Singh</p>
      </footer>
    </div>
  )
}
