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
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion"

// Skill Tag Component for Horizontal Marquee
function SkillTag({ skill, index }: { skill: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={isHovered ? { y: -8 } : { y: 0 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
      className="relative group flex-shrink-0"
    >
      <div className="relative px-6 py-3 rounded-full border border-white/20 bg-gradient-to-r from-white/8 to-white/3 backdrop-blur-md group-hover:border-white/40 transition-all duration-300 cursor-pointer overflow-hidden">
        
        {/* Animated background on hover */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/15 via-transparent to-secondary/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        />

        {/* Content */}
        <div className="relative z-10 flex items-center gap-2">
          <motion.div
            animate={isHovered ? { scale: 1.15, rotate: 10 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
            className="text-white/70 group-hover:text-white transition-colors"
          >
            {skill.icon}
          </motion.div>
          <motion.span
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-sm font-light text-white/80 group-hover:text-white transition-colors whitespace-nowrap"
          >
            {skill.name}
          </motion.span>
        </div>

        {/* Glow effect on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-lg -z-10"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        )}
      </div>
    </motion.div>
  )
}

// Skill Card Component with Advanced Animations - Stacked Layout
// Skill Card Component with Advanced Animations - Stacked Layout
// (Kept for reference, but using SkillTag for marquee)

// Skills Headline Hover Component
function SkillsHeadlineHover({ isInView }: { isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative mb-12"
    >
      <div
        className="relative inline-block cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Original gradient text that stays visible */}
        <h3 className="relative z-20 text-3xl font-light tracking-tight mb-8 inline-block">
          <motion.span
            className="inline-block relative"
          > 
            <span className="bg-gradient-to-r from-primary via-white to-secondary bg-clip-text text-transparent">
              Skills & Expertise
            </span>
            
            {/* Covering light grey rectangle - perfectly centered on text */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-500 pointer-events-none"
              animate={{ scaleX: isHovered ? 1 : 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              style={{ originX: 0 }}
            />

            {/* White text on top of grey */}
            {isHovered && (
              <motion.span
                className="absolute inset-0 text-white font-light tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Skills & Expertise
              </motion.span>
            )}
          </motion.span>
        </h3>
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
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-6 sm:mb-8 tracking-tight">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About Me
          </span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed max-w-3xl font-light">
          I'm a <strong className="font-normal text-white/90">2nd-year Computer Science student</strong> at <strong className="font-normal text-white/90">VIT Vellore</strong> with a passion for building <strong className="font-normal text-white/90">clean, scalable web apps</strong> and solving <strong className="font-normal text-white/90">real-world problems through code</strong>.
          I actively work on <strong className="font-normal text-white/90">personal projects</strong>, regularly push my progress to <strong className="font-normal text-white/90">GitHub</strong>, and solve <strong className="font-normal text-white/90">Data Structures & Algorithms (DSA)</strong> problems on platforms like <strong className="font-normal text-white/90">LeetCode</strong> and <strong className="font-normal text-white/90">Codeforces</strong>.
        </p>

        <div className="mt-10 sm:mt-12 md:mt-16">
          {/* Enhanced Skills Section Header with Hover Cover Animation on Text */}
          <SkillsHeadlineHover isInView={isInView} />

          {/* Horizontal Scrolling Skills with Parallel Lines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Top parallel line with fill animation */}
            <motion.div
              className="h-0.5 bg-gradient-to-r from-primary/0 via-primary/80 to-primary/0 mb-4 sm:mb-6"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
              style={{ originX: 0 }}
            />

            {/* Skills Container with Rectangle Background Fill */}
            <div className="relative overflow-hidden rounded-lg">
              {/* Animated Background Fill Rectangle */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/15 via-secondary/10 to-primary/10 rounded-lg"
                initial={{ scaleX: 0, originX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
                style={{ originX: 0 }}
              />

              {/* Inner border that fills */}
              <motion.div
                className="absolute inset-0 rounded-lg border-2 border-primary/50"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
              />

              {/* Skills Marquee Container */}
              <div className="relative py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8">
                {/* Left gradient fade */}
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none rounded-l-lg" />
                
                {/* Right gradient fade */}
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none rounded-r-lg" />

                {/* Scrolling Skills Container */}
                <motion.div
                  className="flex gap-8 min-w-min"
                  animate={{ x: [-2000, 0] }}
                  transition={{
                    duration: 35,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                    delay: 1.8,
                  }}
                >
                  {/* First loop of skills */}
                  {skills.map((skill, index) => (
                    <SkillTag key={`${skill.name}-1`} skill={skill} index={index} />
                  ))}
                  
                  {/* Duplicate for seamless loop */}
                  {skills.map((skill, index) => (
                    <SkillTag key={`${skill.name}-2`} skill={skill} index={index} />
                  ))}
                  
                  {/* Third loop for extra smoothness */}
                  {skills.map((skill, index) => (
                    <SkillTag key={`${skill.name}-3`} skill={skill} index={index} />
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Bottom parallel line with fill animation */}
            <motion.div
              className="h-0.5 bg-gradient-to-r from-primary/0 via-primary/80 to-primary/0 mt-4 sm:mt-6"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
              style={{ originX: 0 }}
            />
          </motion.div>
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
      className="mb-16 sm:mb-20"
      initial={{ opacity: 1 }}
      animate={isInView ? { opacity: 1 } : { opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-6 sm:mb-8 tracking-tight">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Projects
          </span>
        </h2>

        <div className="flex flex-wrap gap-2 mb-8 sm:mb-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedFilter("all")}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-light text-xs sm:text-sm transition-all ${
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
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-light text-xs sm:text-sm transition-all ${
                selectedFilter === tech
                  ? "bg-white/20 text-white"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {tech}
            </motion.button>
          ))}
        </div>

        <div className="space-y-6 sm:space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 1, y: 0 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="border border-white/10 rounded-lg p-4 sm:p-6 hover:border-white/20 transition-all"
            >
              <h3 className="text-lg sm:text-xl font-light mb-2 text-white">{project.title}</h3>
              <p className="text-white/70 text-xs sm:text-sm mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                {project.tags.map((tag: string) => (
                  <Badge key={tag} className="bg-white/10 text-white/80 text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2 sm:gap-3">
                <Link href={project.link} target="_blank">
                  <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white text-xs">
                    <Github size={14} className="mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Code</span>
                    <span className="sm:hidden">Code</span>
                  </Button>
                </Link>
                <Link href={project.demo} target="_blank">
                  <Button size="sm" variant="outline" className="text-white text-xs">
                    <ExternalLink size={14} className="mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Demo</span>
                    <span className="sm:hidden">Demo</span>
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

// Experience Section Component
function ExperienceSection({ experienceRef, experiences }: { experienceRef: React.RefObject<HTMLElement>; experiences: any[] }) {
  const isInView = useInView(experienceRef, { once: true, margin: "-100px" })

  return (
    <motion.section
      id="experience"
      ref={experienceRef}
      className="mb-16 sm:mb-20"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-6 sm:mb-8 tracking-tight">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Experience
          </span>
        </h2>

        <div className="space-y-4 sm:space-y-6">
          {experiences.map((exp: any, idx: number) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.1 + idx * 0.12 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative p-4 sm:p-6 rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm hover:border-white/20 transition-all duration-300 overflow-hidden">
                
                {/* Animated background on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Header: Role @ Company | Period • Location */}
                  <div className="mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">
                      {exp.role} <span className="text-white/60 font-normal">@ {exp.company}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-white/50 flex items-center gap-2 flex-wrap">
                      <span>{exp.period}</span>
                      <span>•</span>
                      <span>{exp.location}</span>
                    </p>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                    {exp.bullets.map((bullet: string, i: number) => (
                      <li key={i} className="text-xs sm:text-sm text-white/70 flex gap-2 sm:gap-3">
                        <span className="text-primary/80 mt-0.5 sm:mt-1 flex-shrink-0">▸</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {exp.tech.map((tech: string) => (
                      <motion.div
                        key={tech}
                        whileHover={{ scale: 1.05 }}
                        className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/10 border border-white/20 text-xs text-white/80 font-light hover:border-primary/50 transition-colors duration-300"
                      >
                        {tech}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Left accent bar */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
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
  const experienceRef = useRef<HTMLElement>(null)
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

  const experiences = [
    {
      id: 1,
      company: "Jol Energy",
      role: "Software Developer Intern",
      period: "Sep 2025 – Present",
      location: "Remote",
      bullets: [
        "Built AI-powered interview platform with real-time feedback system",
        "Designed and optimized Supabase database schema for user authentication and interview data",
        "Integrated Gemini API for advanced speech-to-text transcription and analysis",
      ],
      tech: ["Next.js", "Supabase", "NextAuth.js", "Gemini API", "TypeScript"],
    },
    {
      id: 2,
      company: "Unified Mentor Private Limited",
      role: "Full Stack Web Development Intern",
      period: "Oct 2025 – Present",
      location: "Remote",
      bullets: [
        "Developed SuperMall marketplace platform with 15+ product management features",
        "Created vendor dashboard with analytics and order management system",
        "Implemented RESTful APIs and integrated payment gateway integration",
      ],
      tech: ["React", "Node.js", "MongoDB", "Express", "TypeScript"],
    },
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

      {/* Horizontal Navigation Bar */}
      <nav className="sticky top-0 left-0 right-0 z-40 bg-background/60 backdrop-blur-md transition-colors duration-300">
        <div className="flex items-center justify-between w-full px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 gap-4 sm:gap-6 md:gap-8">
          {/* Left Navigation Items */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide">
            {navigationItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => scrollToSection(item.id)}
                className={`font-light text-xs sm:text-sm md:text-base tracking-wide transition-all duration-300 pb-2 relative group whitespace-nowrap ${
                  activeSection === item.id
                    ? "text-foreground"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {item.label}
                <motion.div
                  layoutId="underline"
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary ${
                    activeSection === item.id ? "block" : "hidden"
                  }`}
                />
              </motion.button>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Music Player */}
            <div className="flex flex-col items-center gap-1 sm:gap-2 cursor-pointer" onClick={() => {
                if (audioRef.current) {
                  if (isAudioPlaying) {
                    audioRef.current.pause()
                  } else {
                    audioRef.current.play()
                  }
                }
              }}>
                {/* Wave SVG */}
                <svg 
                  width="45" 
                  height="14" 
                  viewBox="0 0 55 16"
                  className="flex-shrink-0 opacity-100 sm:w-14"
                >
                  <defs>
                    <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#000000" />
                      <stop offset="100%" stopColor="#5a5a5a" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    stroke="url(#waveGradient)"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    animate={isAudioPlaying ? {
                      d: [
                        "M 0 8 Q 7 2 14 8 T 28 8 T 42 8 T 56 8",
                        "M 0 8 Q 7 14 14 8 T 28 8 T 42 8 T 56 8",
                        "M 0 8 Q 7 2 14 8 T 28 8 T 42 8 T 56 8"
                      ]
                    } : {
                      d: "M 0 8 L 55 8"
                    }}
                    transition={isAudioPlaying ? { 
                      duration: 0.6, 
                      repeat: Number.POSITIVE_INFINITY, 
                      ease: "easeInOut" 
                    } : { 
                      duration: 1.2, 
                      ease: "easeInOut" 
                    }}
                  />
                </svg>

                {/* Song Name Below Wave */}
                <AnimatePresence mode="wait">
                  {isAudioPlaying && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="text-xs sm:text-sm whitespace-nowrap font-light"
                      style={{
                        color: "#0EA5E9",
                        fontWeight: 500,
                        letterSpacing: "0.05em"
                      }}
                    >
                      Lose My Mind
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="w-full pb-20">
        {/* Hero Section */}
        <div className="min-h-screen flex items-center px-4 sm:px-6 md:px-8 lg:px-12 pt-20 sm:pt-24 md:pt-28">
          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Main Content - Left Aligned */}
            <div className="w-full max-w-6xl">
              {/* "Hi" - appears first */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0 }}
                className="mb-2 sm:mb-4 md:mb-6"
              >
                <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-light tracking-tighter leading-tight">
                  <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
                    Hi,
                  </span>
                </h1>
              </motion.div>

              {/* "I'm Suyash" - appears smoothly after Hi */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mb-6 sm:mb-8 md:mb-12 relative inline-block"
              >
                <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-semibold tracking-tighter leading-tight relative">
                  I'm{" "}
                  <span className="relative inline-block">
                    {/* Black text background */}
                    <span className="text-black dark:text-black relative z-10">
                      Suyash
                    </span>
                    
                    {/* Light brown fill rectangle (#EDE4D9) */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{ backgroundColor: "#D9E2ED", originX: 0 }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1.5, delay: 1.4, ease: "easeOut" }}
                    />
                  </span>
                </h2>
              </motion.div>

              {/* "Pushing ideas into reality" - appears last with stagger */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="mb-8 sm:mb-10 md:mb-12"
              >
                <p className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-foreground/80 tracking-tight leading-snug">
                  Pushing <span style={{ color: "#880808", fontFamily: "Dancing Script, cursive", fontWeight: 600 }}>ideas</span> into <span style={{ color: "#880808", fontFamily: "Dancing Script, cursive", fontWeight: 600 }}>reality</span>
                </p>
              </motion.div>

              {/* Subtitle with smooth entry */}
              <motion.p
                className="text-lg sm:text-xl text-foreground/60 mb-12 max-w-2xl leading-relaxed"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
              </motion.p>

              {/* Let's Connect Section */}
              <motion.div
                className="mt-12 sm:mt-16 md:mt-20 flex flex-col gap-4 sm:gap-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 2 }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8">
                  <div></div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    <h3 className="text-xl xs:text-2xl sm:text-2xl md:text-3xl font-light text-foreground/80 whitespace-nowrap">
                      Let's{" "}
                      <span style={{ color: "#0232B8", fontFamily: "Dancing Script, cursive", fontWeight: 600, textDecoration: "underline", textDecorationColor: "#880808", textDecorationThickness: "2px", textUnderlineOffset: "4px" }}>
                        Connect
                      </span>
                    </h3>
                    
                    {/* Social Icons */}
                    <div className="flex items-center gap-3 sm:gap-4">
                      <motion.a
                        href="https://github.com/SUYASHSINGH7985"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, y: -2 }}
                        className="text-foreground/60 hover:text-foreground transition-colors duration-300"
                      >
                        <Github size={20} className="sm:w-6 sm:h-6" />
                      </motion.a>
                      
                      <motion.a
                        href="https://linkedin.com/in/s4yashh"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, y: -2 }}
                        className="text-foreground/60 hover:text-foreground transition-colors duration-300"
                      >
                        <Linkedin size={20} className="sm:w-6 sm:h-6" />
                      </motion.a>
                      
                      <motion.a
                        href="mailto:singhsuyash012@gmail.com"
                        whileHover={{ scale: 1.2, y: -2 }}
                        className="text-foreground/60 hover:text-foreground transition-colors duration-300"
                      >
                        <Mail size={20} className="sm:w-6 sm:h-6" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* About Section */}
        <div id="about" className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl pt-6 sm:pt-8 md:pt-10">
          <AboutSection aboutRef={aboutRef} skills={skills} />
        </div>

        {/* Projects Section */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl">
          <ProjectsSection
            projectsRef={projectsRef}
            projects={filteredProjects}
            allTechnologies={allTechnologies}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        </div>

        {/* Experience Section */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl">
          <ExperienceSection experienceRef={experienceRef} experiences={experiences} />
        </div>

        {/* Resume Section */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl">
          <ResumeSection resumeRef={resumeRef} />
        </div>

        {/* Contact Section */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl">
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
      <footer className="py-6 sm:py-8 px-4 sm:px-6 md:px-8 text-center border-t border-white/10">
        <p className="text-xs sm:text-sm text-white/50">© {new Date().getFullYear()} Suyash Singh</p>
      </footer>
    </div>
  )
}
