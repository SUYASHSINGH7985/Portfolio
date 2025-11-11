"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import {
  Moon,
  Sun,
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Smartphone,
  Globe,
  Database,
  ArrowDown,
} from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const { scrollY } = useScroll()
  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  // Parallax transforms
  const heroY = useTransform(scrollY, [0, 1000], [0, -200])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const backgroundY = useTransform(scrollY, [0, 2000], [0, -500])

  useEffect(() => {
    setMounted(true)
  }, [])

  const projects = [
    {
      id: 1,
      title: "SEED (Frontend Developer)",
      description:
        "Built a responsive startup platform with chatbot UI, dynamic listings, internship features, and seamless navigation.",
      image: "Screenshot 2025-07-30 at 2.47.24 PM.png",
      tags: ["React", "Node.js", "MongoDB", "Stripe", "TypeScript"],
      category: "web",
      link: "https://github.com/SUYASHSINGH7985/SEED",
      demo: "https://thecompanyseed.vercel.app/",
    },
    {
      id: 2,
      title: "Amazon Clone App",
      description:
        "Developed an iOS e-commerce app with SwiftUI, Firebase auth, real-time DB, cart, checkout, and order tracking.",
      image: "Screenshot 2025-07-30 at 2.56.51 PM.png",
      tags: ["Swift", "SwiftUI", "HealthKit", "Core Data", "iOS"],
      category: "ios",
      link: "https://github.com/SUYASHSINGH7985/Amazon-Clone",
      demo: "https://drive.google.com/file/d/1x1QwaK2j2Xg_4MJdXbX5CWN9Cll9cI3_/view",
    },
    {
      id: 3,
      title: "Apple Futuristic Landing Page",
      description:"Crafted a modern Apple-style landing page with 3D product visuals using Three.js and smooth animations for seamless UX.",
      image: "image.png",
      tags: ["React", "Socket.io", "Node.js"],
      category: "web",
      link: "https://github.com/SUYASHSINGH7985/APPLE-LandingPage-",
      demo: "https://suyashsingh7985.github.io/APPLE-LandingPage-/",
    },
  ]

  const skills = [
    { name: "React/Next.js",icon: <Globe className="w-5 h-5" /> },
    { name: "Swift/SwiftUI",icon: <Smartphone className="w-5 h-5" /> },
    { name: "Node.js",icon: <Code className="w-5 h-5" /> },
    { name: "iOS Development", icon: <Smartphone className="w-5 h-5" /> },
    { name: "TypeScript", icon: <Code className="w-5 h-5" /> },
    { name: "MongoDB", icon: <Database className="w-5 h-5" /> },
  ]

  // Get all unique technologies for filtering
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
      setIsMenuOpen(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

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
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Enhanced Glassmorphism Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 glass-nav"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="font-bold text-xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Suyash Singh
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["home", "about", "projects", "contact"].map((section, index) => (
                <motion.button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all duration-300 hover:text-primary ${
                    activeSection === section ? "text-primary font-medium" : "text-muted-foreground"
                  }`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {section}
                </motion.button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <motion.div whileHover={{ scale: 1.1, rotate: 180 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="glass-button transition-all duration-300"
                >
                  <AnimatePresence mode="wait">
                    {theme === "dark" ? (
                      <motion.div
                        key="sun"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Sun className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Moon className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden glass-button"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <AnimatePresence mode="wait">
                    {isMenuOpen ? (
                      <motion.div
                        key="x"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden glass-panel border-t border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-4 space-y-4">
                {["home", "about", "projects", "contact"].map((section, index) => (
                  <motion.button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`block w-full text-left capitalize transition-all duration-300 hover:text-primary ${
                      activeSection === section ? "text-primary font-medium" : "text-muted-foreground"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    {section}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Full Screen Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative"
      >
        <motion.div className="max-w-4xl mx-auto text-center z-10" style={{ y: heroY, opacity: heroOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            >
              Suyash Singh
            </motion.h1>
            <motion.p
              className="text-xl sm:text-2xl lg:text-4xl text-muted-foreground mb-8 font-semibold"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Developer 
            </motion.p>
           <motion.p
  className="text-base sm:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed opacity-90"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.6 }}
>
  I build <strong>scalable applications</strong> with <strong>clean code</strong> and <strong>intuitive user interfaces</strong>, solving <strong>complex problems</strong> using <strong>modern technologies</strong>.
</motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  onClick={() => scrollToSection("projects")}
                  className="glass-button text-blue-500 hover:text-blue-600 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 transition-all duration-300"
                >
                  View My Work
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                  className="glass-button text-blue-500 hover:text-blue-600 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 transition-all duration-300"
                >
                  Get In Touch
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Animated Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.div
            className="text-xs sm:text-sm text-muted-foreground mb-2 opacity-70"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            Scroll to explore
          </motion.div>
          <motion.div
            className="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section with Enhanced Animations */}
      <AboutSection aboutRef={aboutRef} skills={skills} />

      {/* Projects Section with Tech Filtering */}
      <ProjectsSection
        projectsRef={projectsRef}
        projects={filteredProjects}
        allTechnologies={allTechnologies}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      {/* Contact Section */}
      <ContactSection contactRef={contactRef} />

      {/* Footer */}
      <motion.footer
        className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 glass-panel border-t border-white/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm sm:text-base text-muted-foreground">
            © {new Date().getFullYear()} Suyash Singh
          </p>
        </div>
      </motion.footer>
    </div>
  )
}

// About Section Component
function AboutSection({ aboutRef, skills }: { aboutRef: React.RefObject<HTMLElement>; skills: any[] }) {
  const isInView = useInView(aboutRef, { once: true, margin: "-100px" })

  return (
    <motion.section
      id="about"
      ref={aboutRef}
      className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="glass-panel max-w-6xl mx-auto p-6 sm:p-8 rounded-3xl">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          I'm a <strong>2nd-year Computer Science student</strong> at <strong>VIT Vellore</strong> with a passion for building <strong>clean, scalable web apps</strong> and solving <strong>real-world problems through code</strong>.
          I actively work on <strong>personal projects</strong>, regularly push my progress to <strong>GitHub</strong>, and solve <strong>Data Structures & Algorithms (DSA)</strong> problems on platforms like <strong>LeetCode</strong> and <strong>Codeforces</strong>.
          </p>


        </motion.div>

        <div className="w-full flex justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
  
            <h3 className=" mt-20 text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-center">
              Skills & Expertise</h3>

            <div className="flex flex-wrap justify-center gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="flex items-center space-x-2 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <motion.div className="p-2 glass-button rounded-lg" whileHover={{ scale: 1.1, rotate: 5 }}>
                        {skill.icon}
                      </motion.div>
                      <span className="font-medium text-sm sm:text-base">{skill.name}</span>
                    </div>
                    <span className="text-xs sm:text-sm text-muted-foreground">{skill.level}</span>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-2 backdrop-blur-sm overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                      initial={{ width: 0 }}
                      transition={{ duration: 1, delay: 0.8 + index * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              
             
              
            ].map((item, index) => (
              <motion.div

                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="glass-card p-4 sm:p-6 transition-all duration-300 hover:shadow-xl">
                 
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
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
      className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A showcase of my recent work spanning web applications, iOS apps, and innovative solutions.
          </p>
        </motion.div>

        {/* Enhanced Filter Buttons */}
        <motion.div
          className="flex justify-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="glass-panel flex flex-wrap gap-2 p-2 rounded-2xl max-w-full overflow-x-auto">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant={selectedFilter === "all" ? "default" : "ghost"}
                onClick={() => setSelectedFilter("all")}
                className={`text-xs sm:text-sm transition-all duration-300 ${
                  selectedFilter === "all" ? "glass-button-active" : "glass-button hover:scale-105"
                }`}
              >
                All Projects
              </Button>
            </motion.div>
            {allTechnologies.map((tech) => (
              <motion.div key={tech} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={selectedFilter === tech ? "default" : "ghost"}
                  onClick={() => setSelectedFilter(tech)}
                  className={`text-xs sm:text-sm transition-all duration-300 ${
                    selectedFilter === tech ? "glass-button-active" : "glass-button hover:scale-105"
                  }`}
                >
                  {tech}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" layout>
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                transition={{
                  duration: 0.6,
                  delay: isInView ? index * 0.1 : 0,
                  layout: { duration: 0.3 },
                }}
                whileHover={{
                  y: -10,
                  rotateY: 5,
                  rotateX: 5,
                  scale: 1.02,
                }}
                className="perspective-1000"
              >
                <Card className="glass-card group overflow-hidden transition-all duration-500 hover:shadow-2xl h-full">
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="w-full h-40 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center space-x-4"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button size="sm" className="glass-button text-xs sm:text-sm" asChild>
                          <Link href={project.link} target="_blank">
                            <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            Code
                          </Link>
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button size="sm" className="glass-button-outline text-xs sm:text-sm" asChild>
                          <Link href={project.demo} target="_blank">
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            Demo
                          </Link>
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                  <CardContent className="p-4 sm:p-6 flex flex-col flex-grow">
                    <h3 className="text-lg sm:text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-3 flex-grow">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {project.tags.map((tag: string) => (
                        <motion.div key={tag} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Badge
                            className="glass-badge text-xs cursor-pointer hover:bg-primary/20 transition-colors duration-200"
                            onClick={() => setSelectedFilter(tag)}
                          >
                            {tag}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
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
      className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="glass-panel max-w-4xl mx-auto text-center p-6 sm:p-8 rounded-3xl"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Let's Work Together
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
          I'm always interested in new opportunities and exciting projects. Let's discuss how we can bring your ideas to
          life.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {[
            { icon: Mail, title: "Email", value: "singhsuyash012@gmail.com", href: "mailto:singhsuyash012@gmail.com" },
            {
              icon: Linkedin,
              title: "LinkedIn",
              value: "suyashsingh-dev",
              href: "https://linkedin.com/in/suyashsingh-dev",
            },
            { icon: Github, title: "GitHub", value: "SUYASHSINGH7985", href: "https://github.com/SUYASHSINGH7985" },
          ].map((contact, index) => (
            <motion.div
              key={contact.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className="glass-card p-4 sm:p-6 transition-all duration-300 hover:shadow-xl h-full">
                <motion.div
                  className="p-3 glass-button rounded-full w-fit mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <contact.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </motion.div>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">{contact.title}</h3>
                <Link
                  href={contact.href}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {contact.value}
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="lg"
            className="glass-button text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 transition-all duration-300 hover:shadow-xl"
            asChild
          >
            <Link href="mailto:singhsuyash012@gmail.com">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-#F8F9FA" />
              Send Message
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </motion.section>
  )
  
}
