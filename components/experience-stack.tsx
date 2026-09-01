"use client"

import { motion } from "framer-motion"
import { ArrowDown, Building2, MapPin } from "lucide-react"
import Image from "next/image"

const logos = ["/jolenergy.png", "/unifiedmentor.jpeg", "/hacktoberfest.png", "/adg.jpeg"]

export function ExperienceStack({ experiences = [] }: { experiences: any[] }) {
  return (
    <section id="experience" className="scroll-mt-28 py-12 sm:py-16">
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto">
        <div className="mb-10 sm:mb-14 lg:flex lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
              Career journey
            </p>
            <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Experience
            </h2>
          </div>
          <div className="flex items-center gap-3 lg:justify-end">
            <p className="mt-2 max-w-md text-sm leading-7 text-foreground/65 lg:mt-0 lg:text-right">
              Scroll to explore the teams, products, and communities that have shaped my work.
            </p>
            <ArrowDown className="h-4 w-4 shrink-0 text-foreground/45" aria-hidden="true" />
          </div>
        </div>

        <div className="flex flex-col gap-6 sm:gap-8">
          {experiences.map((exp: any, index: number) => (
            <motion.article
              key={exp.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="group relative overflow-hidden rounded-3xl border border-foreground/10 bg-card shadow-[0_18px_45px_rgba(30,35,43,0.08)] will-change-transform transition-all duration-500 hover:shadow-[0_24px_60px_rgba(30,35,43,0.12)] hover:-translate-y-0.5"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_0%,rgba(218,229,239,0.7),transparent_32%)] pointer-events-none" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent pointer-events-none" />

              <div className="relative flex flex-col p-6 sm:p-8 md:p-10">
                <div className="flex items-start justify-between gap-5">
                  <div className="min-w-0">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/48">
                      {exp.period}
                    </p>
                    <h3 className="max-w-2xl text-xl font-semibold tracking-tight text-foreground sm:text-2xl md:text-3xl">
                      {exp.role}
                    </h3>
                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-foreground/62">
                      <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                        <Building2 className="h-4 w-4" />
                        {exp.company}
                      </span>
                      <span className="hidden h-1 w-1 rounded-full bg-foreground/30 sm:block" />
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-foreground/10 bg-white shadow-sm">
                    {logos[index] ? (
                      <Image
                        src={logos[index]}
                        alt={`${exp.company} logo`}
                        width={96}
                        height={96}
                        loading="lazy"
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <Building2 className="h-6 w-6 text-foreground/60" />
                    )}
                  </div>
                </div>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-foreground/68 sm:text-base">
                  {exp.description}
                </p>

                {exp.tech?.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {exp.tech.map((tech: string) => (
                      <span
                        key={tech}
                        className="rounded-full border border-foreground/10 bg-foreground/[0.035] px-3 py-1.5 text-xs font-medium text-foreground/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
