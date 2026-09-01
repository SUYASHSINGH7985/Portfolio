import { Github, ExternalLink, ArrowUpRight } from "lucide-react"
import Image from "next/image"

interface Project {
  id: number
  title: string
  description: string
  contribution: string
  image: string
  tags: string[]
  link: string
  demo: string
}

interface ProjectsSectionProps {
  projects: Project[]
}

function ProjectCard({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  return (
    <article className={`project-item ${index === 0 ? "project-featured" : ""}`}>
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
              loading={index === 0 ? "eager" : "lazy"}
              priority={index === 0}
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

          <p className="project-tags">{project.tags.join(" · ")}</p>

          {/* Description */}
          <p className="mt-4 text-sm leading-7 text-foreground/68 sm:text-base">
            {project.description}
          </p>
          <p className="project-contribution"><span>Contribution</span>{project.contribution}</p>

          {/* Actions */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border-b border-foreground/20 pb-1 text-sm font-medium text-foreground/70 transition-colors duration-200 hover:border-foreground hover:text-foreground"
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
                className="inline-flex items-center gap-1.5 border-b border-foreground/20 pb-1 text-sm font-medium text-foreground/60 transition-colors duration-200 hover:border-foreground hover:text-foreground"
              >
                <ExternalLink size={14} />
                Live
                <ArrowUpRight size={12} className="opacity-50" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="section-shell content-section">
      <div className="section-heading"><p className="eyebrow">03 / Selected work</p><h2>Projects with a purpose.</h2></div>
      <div className="projects-list">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
      </div>
    </section>
  )
}
