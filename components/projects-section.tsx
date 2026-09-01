"use client"

import { useState, useCallback, memo, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, ExternalLink, ArrowUpRight } from "lucide-react"
import Image from "next/image"

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  category: string
  link: string
  demo: string
}

interface ProjectsSectionProps {
  projectsRef: React.RefObject<HTMLElement>
  projects: Project[]
}

const SectionHeading = memo(function SectionHeading() {
  return (
    <div className="mb-10 sm:mb-14 lg:flex lg:items-end lg:justify-between">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
          Featured work
        </p>
        <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Projects
        </h2>
      </div>
      <p className="mt-2 max-w-md text-sm leading-7 text-foreground/65 lg:mt-0 lg:text-right">
        A selection of things I&apos;ve built — from full-stack apps to open-source contributions.
      </p>
    </div>
  )
})

const TechBadge = memo(function TechBadge({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-foreground/10 bg-foreground/[0.035] px-3 py-1.5 text-xs font-medium text-foreground/70">
      {label}
    </span>
  )
})

function ProjectCard({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const descriptionLimit = 140
  const needsTruncation = project.description.length > descriptionLimit
  const displayText =
    isExpanded || !needsTruncation
      ? project.description
      : project.description.slice(0, descriptionLimit) + "..."

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-card transition-colors duration-300 hover:border-foreground/20"
    >
      <div className="relative flex flex-col md:flex-row">
        {/* Image panel */}
        <div className="relative w-full md:w-[38%] shrink-0 p-5 md:p-6 md:pr-0">
          <div className="relative aspect-video md:aspect-[4/3] w-full overflow-hidden rounded-xl border border-foreground/8 bg-foreground/[0.02]">
            <Image
              src={`/${project.image}`}
              alt={`${project.title} preview`}
              fill
              className="object-contain p-3 md:p-4"
              sizes="(max-width: 768px) 100vw, 38vw"
              loading="lazy"
            />
          </div>
        </div>

        {/* Content panel */}
        <div className="flex flex-col justify-center px-5 pb-6 pt-1 md:px-8 md:py-10 md:pl-6 md:w-[62%]">
          {/* Title and tags row */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl md:text-3xl">
                {project.title}
              </h3>
              {index === 0 && (
                <span className="mt-1.5 inline-flex items-center gap-1 rounded-full border border-foreground/10 bg-foreground/[0.03] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-foreground/50">
                  Featured
                </span>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <TechBadge key={tag} label={tag} />
            ))}
          </div>

          {/* Description */}
          <p className="mt-4 text-sm leading-7 text-foreground/68 sm:text-base">
            {displayText}
          </p>
          {needsTruncation && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(!isExpanded)
              }}
              className="mt-1 self-start text-xs font-medium text-foreground/50 hover:text-foreground transition-colors duration-200"
            >
              {isExpanded ? "Show less" : "Read more"}
            </button>
          )}

          {/* Actions */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-white/70 px-4 py-2 text-sm font-medium text-foreground/70 shadow-sm transition-all duration-200 hover:scale-105 hover:border-foreground/20 hover:bg-white/90 hover:text-foreground hover:shadow-md"
              >
                <Github size={14} />
                Code
                <ArrowUpRight size={12} className="opacity-50" />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/[0.03] px-4 py-2 text-sm font-medium text-foreground/60 transition-all duration-200 hover:scale-105 hover:border-foreground/20 hover:bg-foreground/[0.06] hover:text-foreground"
              >
                <ExternalLink size={14} />
                Live
                <ArrowUpRight size={12} className="opacity-50" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function ProjectsSection({ projectsRef, projects }: ProjectsSectionProps) {
  return (
    <section id="projects" ref={projectsRef} className="scroll-mt-28 py-12 sm:py-16">
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto">
        <SectionHeading />

        <div className="flex flex-col gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
