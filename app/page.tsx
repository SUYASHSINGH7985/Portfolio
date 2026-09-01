import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { ExperienceStack } from "@/components/experience-stack"
import { ProjectsSection } from "@/components/projects-section"

const projects = [
  {
    id: 1,
    title: "GitOrg",
    description: "A web dashboard for searching GitHub organizations and exploring their repositories through the GitHub API.",
    contribution: "Designed the dashboard experience, API integration, caching, loading states, and error handling.",
    image: "gitorg.png",
    tags: ["Web Dashboard", "GitHub API", "API Caching"],
    link: "https://github.com/s4yashh/GitHubDashboard",
    demo: "https://gitorg.suyashh.me",
  },
  {
    id: 2,
    title: "Habit Tracker Web App",
    description: "A full-stack habit tracking application with daily and weekly check-ins, streaks, and social activity feeds.",
    contribution: "Built authentication, protected routes, product features, and the responsive interface.",
    image: "habit-tracker.png",
    tags: ["Next.js 14", "PostgreSQL", "Prisma", "JWT"],
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
    description: "Built an AI-powered interview platform with real-time feedback. Optimized the Supabase schema for authentication and interview data, and integrated Gemini for speech-to-text transcription and analysis.",
    tech: ["Next.js", "Supabase", "NextAuth.js", "Gemini API", "TypeScript"],
  },
  {
    id: 2,
    company: "Unified Mentor Private Limited",
    role: "Full Stack Web Development Intern",
    period: "Oct 2025 – Present",
    location: "Remote",
    description: "Developed SuperMall, a marketplace platform with product management, vendor analytics, order management, RESTful APIs, and payment gateway integration.",
    tech: ["React", "Node.js", "MongoDB", "Express", "TypeScript"],
  },
  {
    id: 3,
    company: "Hacktoberfest",
    role: "Open Source Contributor",
    period: "Oct 2025",
    location: "Remote",
    description: "Contributed six merged pull requests across cross-platform open-source repositories, fixing bugs and solving issues.",
    tech: [],
  },
  {
    id: 4,
    company: "ADG-VIT",
    role: "Junior Core Member",
    period: "Jan 2024 – Present",
    location: "Vellore, India",
    description: "Organized hackathons and coding workshops for 100+ students, and built and maintained the club website and internal event tools.",
    tech: [],
  },
]

const skillGroups = [
  ["Languages", "HTML · CSS · JavaScript · Swift · SQL"],
  ["Frontend", "React · React Native · SwiftUI · Tailwind CSS"],
  ["Backend", "Node.js · REST APIs · MVC · Authentication"],
  ["Databases", "MongoDB"],
  ["DevOps & Cloud", "AWS · Docker · Kubernetes · CI/CD · Caching"],
  ["Tools", "Git · GitHub · Unit Testing"],
]

export default function Portfolio() {
  return (
    <div className="site-layout">
      <Navbar />
      <main>
        <section id="home" className="hero section-shell">
          <div className="hero-copy">
            <p className="eyebrow">Software Developer · Computer Science Student</p>
            <h1><span>SUYASH</span><span>SINGH</span></h1>
            <p className="hero-role">Full Stack Developer <span>/</span> Computer Science Student</p>
            <p className="hero-intro">I build software, web applications, and practical digital experiences while exploring technology and solving real problems.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#projects">View my work <ArrowUpRight size={16} /></a>
              <a className="text-link" href="/Suyash_Resume 2.pdf" target="_blank" rel="noreferrer">Resume <ArrowUpRight size={15} /></a>
            </div>
          </div>
          <div className="hero-meta">
            <span className="status-dot" />
            <span>Available for opportunities</span>
            <span className="hero-location">Vellore, India · Interested in full stack development, AI, and system design</span>
          </div>
        </section>

        <ExperienceStack experiences={experiences} />
        <ProjectsSection projects={projects} />

        <section id="skills" className="section-shell content-section">
          <div className="section-heading"><p className="eyebrow">03 / Skills</p><h2>Tools for building well.</h2></div>
          <div className="skill-list">{skillGroups.map(([category, skills]) => <div className="skill-row" key={category}><span>{category}</span><strong>{skills}</strong></div>)}</div>
        </section>

        <section id="contact" className="section-shell contact-section">
          <div className="section-heading"><p className="eyebrow">04 / Contact</p><h2>Let&apos;s make something useful.</h2></div>
          <div className="contact-row"><p className="lead-copy">Have a project, opportunity, or idea in mind? I&apos;d be glad to hear from you.</p><div className="contact-links"><a href="mailto:singhsuyash012@gmail.com">Email <ArrowUpRight size={15} /></a><a href="tel:+917985043880">+91 79850 43880 <ArrowUpRight size={15} /></a><a href="https://github.com/s4yashh" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a><a href="https://www.linkedin.com/in/s4yashh/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={15} /></a><a href="https://twitter.com/S4yash" target="_blank" rel="noreferrer">Twitter <ArrowUpRight size={15} /></a></div></div>
        </section>
      </main>

      <footer className="site-footer"><span>Suyash Singh</span><span>© {new Date().getFullYear()}</span><div><a href="mailto:singhsuyash012@gmail.com"><Mail size={15} /></a><a href="https://github.com/s4yashh" target="_blank" rel="noreferrer"><Github size={15} /></a><a href="https://www.linkedin.com/in/s4yashh/" target="_blank" rel="noreferrer"><Linkedin size={15} /></a></div></footer>
    </div>
  )
}
