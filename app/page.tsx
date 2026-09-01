"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { usePreloaderContext } from "@/components/preloader-wrapper"

import { Github, Linkedin, Mail } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ExperienceStack } from "@/components/experience-stack"
import { Navbar } from "@/components/navbar"

const ProjectsSection = dynamic(
  () => import("@/components/projects-section").then((m) => ({ default: m.ProjectsSection })),
  { ssr: false },
)

export default function Portfolio() {
  const { preloaderComplete } = usePreloaderContext()
  const [activeSection, setActiveSection] = useState("home")
  const activeSectionRef = useRef("home")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible && visible.target.id !== activeSectionRef.current) {
          activeSectionRef.current = visible.target.id
          setActiveSection(visible.target.id)
        }
      },
      { rootMargin: "-20% 0px -60%", threshold: [0, 0.25, 0.5] },
    )
    ;["home", "about", "tech", "experience", "projects"].forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])


  const projectsRef = useRef<HTMLElement>(null)

  const projects = [
    {
      id: 1,
      title: "GitOrg",
      description: "Built a web dashboard to search GitHub organizations and explore their repositories using the GitHub API. Focused on efficient API usage with caching to minimize redundant requests and improve performance. Implemented graceful handling of empty states, loading states, and API errors for a smooth user experience.",
      image: "gitorg.png",
      tags: ["Web Dashboard", "GitHub API", "API Caching", "Performance"],
      category: "web",
      link: "https://github.com/s4yashh/GitHubDashboard",
      demo: "https://gitorg.suyashh.me",
    },
    {
      id: 2,
      title: "Habit Tracker Web App",
      description: "Built a full-stack habit tracking application with daily and weekly check-ins. Implemented JWT-based authentication and protected routes. Added social features including activity feeds and habit streaks. Designed a modern responsive UI using Tailwind CSS and shadcn/ui. Deployed on Vercel with cloud-hosted PostgreSQL.",
      image: "habit-tracker.png",
      tags: ["Next.js 14", "Tailwind CSS", "PostgreSQL", "Prisma", "JWT", "shadcn/ui"],
      category: "web",
      link: "https://github.com/s4yashh/Health-Tracker",
      demo: "https://healthmatters.vercel.app",
    },
  ]

  const experiences = [
    {
      id: 1,
      company: "Jol Energy",
      role: "Software Developer Intern",
      period: "Sep 2025 – Present",
      location: "Remote",
      description: "Built AI-powered interview platform with real-time feedback system. Designed and optimized Supabase database schema for user authentication and interview data. Integrated Gemini API for advanced speech-to-text transcription and analysis.",
      tech: ["Next.js", "Supabase", "NextAuth.js", "Gemini API", "TypeScript"],
    },
    {
      id: 2,
      company: "Unified Mentor Private Limited",
      role: "Full Stack Web Development Intern",
      period: "Oct 2025 – Present",
      location: "Remote",
      description: "Developed SuperMall marketplace platform with 15+ product management features. Created vendor dashboard with analytics and order management system. Implemented RESTful APIs and integrated payment gateway integration.",
      tech: ["React", "Node.js", "MongoDB", "Express", "TypeScript"],
    },
    {
      id: 3,
      company: "Hacktoberfest",
      role: "Open Source Contributor",
      period: "Oct 2025 – Oct 2025",
      location: "Remote",
      description: "Successfully contributed to Hacktoberfest 2024 with 6 pull requests merged across cross-platform open-source repositories, fixing bugs, and solving issues.",
     
    },
    {
      id: 4,
      company: "ADG-VIT",
      role: "Junior Core Member",
      period: "Jan 2024 – Present",
      location: "Vellore, India",
      description: "Organized hackathons and coding workshops for 100+ students. Built and maintained club website and internal tools for event management.",
      tech: [],
    },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setActiveSection(sectionId)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation Bar */}
      {preloaderComplete && <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />}

      {/* Main Layout */}
      <div className="w-full">
        {/* Hero Section - Takes full viewport height so About is hidden initially */}
        <section id="home" className="w-full scroll-mt-20 bg-background pt-20 sm:pt-24 md:pt-32 min-h-screen flex items-center">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <motion.div
              className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12 lg:gap-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* LEFT SECTION — TEXT CONTENT */}
              <div className="w-full md:w-1/2 flex flex-col text-center md:text-left">
                {/* "Hi" - appears first */}
                {preloaderComplete && (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0 }}
                    className="mb-2 sm:mb-4 md:mb-6"
                  >
                    <h1 className="text-6xl xs:text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-light tracking-tighter leading-tight">
                      <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
                        Hi,
                      </span>
                    </h1>
                  </motion.div>
                )}

                {/* "I'm Suyash" - appears smoothly after Hi */}
                {preloaderComplete && (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mb-6 sm:mb-8 md:mb-12 relative inline-block"
                  >
                  <h2 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-semibold tracking-tighter leading-tight relative sm:whitespace-nowrap">
                    I'm{" "}
                    <span className="relative inline">
                      {/* Black text background */}
                      <span className="text-black dark:text-black relative z-10" style={{ color: "#0232B8" }}>
                        Suyash
                      </span>
                      
                      {/* Light brown fill rectangle (#EDE4D9) */}
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{ backgroundColor: "#D9E2ED", originX: 0 }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
                      />
                    </span>
                  </h2>
                </motion.div>
                )}

                {/* "Aspiring Software Engineer" - appears last with stagger */}
                {preloaderComplete && (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="mb-8 sm:mb-10 md:mb-12"
                  >
                    <p className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-foreground/80 tracking-tight leading-snug sm:whitespace-nowrap">
                   <span style={{ color: "#880808", fontFamily: "var(--font-vt323), monospace", fontWeight: 400 }}>Full Stack Developer</span> 
                    </p>
                  </motion.div>
                )}

                {/* Subtitle with smooth entry */}
                {preloaderComplete && (
                  <motion.p
                    className="text-lg sm:text-xl text-foreground/60 mb-12 max-w-2xl leading-relaxed"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.6 }}
                  >
                  </motion.p>
                )}
              </div>

              {/* RIGHT SECTION — IMAGE + LET'S CONNECT */}
              {preloaderComplete && (
                <div className="w-full md:w-1/2 flex flex-col items-center gap-6 sm:gap-8 md:gap-10">
                  {/* Image */}
                  <div
                    className="w-full flex justify-center"
                    style={{ paddingRight: "clamp(0rem, 6vw, 8rem)" }}
                  >
                    <motion.div
                      className="relative w-[clamp(220px,35vw,420px)] aspect-square rounded-full overflow-hidden shadow-2xl hover:shadow-primary/30 transition-shadow duration-300"
                      initial={{ opacity: 0, scale: 0.8, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.8 }}
                    >
                      <Image
                        src="/suyash1.png"
                        alt="Suyash Singh"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 90vw,
                               (max-width: 1024px) 60vw,
                               50vw"
                        priority
                      />
                    </motion.div>
                  </div>

                  {/* Let's Connect Section Below Image - Centered */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.2 }}
                    className="flex flex-col items-center gap-3 sm:gap-4"
                    style={{ paddingRight: "clamp(0rem, 6vw, 8rem)" }}
                  >
                    <p style={{ fontSize: "clamp(2rem, 2.5vw, 1.3rem)", fontWeight: 400, color: "white" }}>
                      Let's <span style={{ fontFamily: "var(--font-vt323), monospace", fontWeight: 400, color: "#0232B8" }}>Connect-</span>
                    </p>
                    {/* Social Icons */}
                    <div className="flex items-center gap-4 sm:gap-6">
                      <a
                        href="https://github.com/s4yashh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer hover:text-primary transition-all duration-300 hover:scale-110"
                      >
                        <Github size={24} className="text-foreground/70 hover:text-foreground" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/s4yashh/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer hover:text-primary transition-all duration-300 hover:scale-110"
                      >
                        <Linkedin size={24} className="text-foreground/70 hover:text-foreground" />
                      </a>
                      <a
                        href="mailto:singhsuyash012@gmail.com"
                        className="cursor-pointer hover:text-primary transition-all duration-300 hover:scale-110"
                      >
                        <Mail size={24} className="text-foreground/70 hover:text-foreground" />
                      </a>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="scroll-mt-28 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="mb-10 sm:mb-14">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">A little about me</p>
              <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">About</h2>
            </div>
            <div className="grid gap-8 border-y border-foreground/10 py-8 sm:grid-cols-[1fr_1.2fr] sm:gap-16 sm:py-12">
              <p className="max-w-lg text-xl leading-relaxed text-foreground sm:text-2xl">
                I&apos;m Suyash Singh, a Computer Science student and full stack developer based in Vellore, India.
              </p>
              <div className="space-y-4 text-sm leading-7 text-foreground/65 sm:text-base">
                <p>I build reliable web applications and enjoy turning thoughtful ideas into clear, useful products.</p>
                <p>My strengths are practical problem solving, learning quickly, and working across the frontend, backend, and cloud.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section id="tech" className="scroll-mt-28 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="mb-10 sm:mb-14">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">Tools I use</p>
              <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">Tech Stack</h2>
            </div>
            <div className="divide-y border-y border-foreground/10 sm:grid sm:grid-cols-2 sm:divide-y-0 sm:gap-x-12 sm:gap-y-0 lg:grid-cols-3">
              {[
                ["Languages", ["HTML", "CSS", "JavaScript", "Swift", "SQL"]],
                ["Frontend", ["React", "React Native", "SwiftUI", "Tailwind CSS"]],
                ["Backend", ["Node.js", "REST APIs", "MVC", "Authentication"]],
                ["Databases", ["MongoDB"]],
                ["DevOps & Cloud", ["AWS", "Docker", "Kubernetes", "CI/CD", "Caching"]],
                ["Tools", ["Git", "GitHub", "Unit Testing"]],
              ].map(([category, technologies]) => (
                <div key={category} className="py-5 first:pt-6 last:pb-6 sm:border-b sm:border-foreground/10 sm:py-6 sm:last:border-b-0">
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/50">{category}</h3>
                  <p className="text-base leading-7 text-foreground/75">{(technologies as string[]).join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <ExperienceStack experiences={experiences} />

        {/* Projects Section */}
        <ProjectsSection
          projectsRef={projectsRef}
          projects={projects}
        />
      </div>

      {/* Footer - Exact 94vh, no scroll below this */}
      <footer style={{ 
        height: "94vh", 
        maxHeight: "94vh", 
        backgroundColor: "#000000",
        flexShrink: 0,
        position: "relative"
      }}>

        {/* Content Container */}
        <div className="h-full flex flex-col items-start justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 md:py-16 relative">

          {/* Social Links - Bottom Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 md:bottom-16 md:left-16 flex items-center gap-4"
          >
            <a href="https://twitter.com/S4yash" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7"></path>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/s4yashh/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="https://github.com/s4yashh" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
              </svg>
            </a>
          </motion.div>

          {/* Main "THANKYOU" Heading with Phone Number */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-full ml-0 sm:ml-1 md:ml-2 mt-2 sm:mt-3 md:mt-4 overflow-visible flex flex-col"
          >
            {/* Phone Number - Above THANKYOU, between text and right side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-1 mb-2 sm:mb-3 md:mb-4 ml-auto mr-5"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
              <span style={{ color: "white", fontFamily: "var(--font-vt323), monospace", fontSize: "clamp(0.7rem, 1.5vw, 0.95rem)", fontWeight: 400 }}>
                +917985043880
              </span>
            </motion.div>

            {/* THANKYOU Heading */}
            <h2 className="sayhi">
              THANKYOU
            </h2>
          </motion.div>

          {/* Description text - Below heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 sm:mt-12 md:mt-16 max-w-2xl"
          >
            <p style={{
              fontSize: "clamp(1rem, 3vw, 1.5rem)",
              fontWeight: 700,
              fontFamily: "var(--font-vt323), monospace",
              lineHeight: 1.6,
              margin: "0 0 4px 0",
              color: "white",
              WebkitTextFillColor: "white",
              mixBlendMode: "normal",
              opacity: 1
            }}>
              Tell us about your project.
            </p>
            <p style={{
              fontSize: "clamp(1rem, 3vw, 1.5rem)",
              fontWeight: 400,
              fontFamily: "var(--font-vt323), monospace",
              lineHeight: 1.6,
              margin: "0 0 4px 0",
              color: "white",
              WebkitTextFillColor: "white",
              mixBlendMode: "normal",
              opacity: 1
            }}>
              Let's collaborate and make great stuff.

            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
