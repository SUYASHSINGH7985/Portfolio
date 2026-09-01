import { MapPin } from "lucide-react"

interface Experience {
  id: number
  company: string
  role: string
  period: string
  location: string
  description: string
  tech: string[]
}

export function ExperienceStack({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experience" className="section-shell content-section">
      <div className="section-heading"><p className="eyebrow">04 / Experience</p><h2>Where I&apos;ve been building.</h2></div>
      <div className="experience-list">
        {experiences.map((experience) => (
          <article className="experience-item" key={experience.id}>
            <div className="experience-date">{experience.period}</div>
            <div className="experience-content">
              <h3>{experience.role}</h3>
              <p className="experience-company">{experience.company}<span><MapPin size={13} />{experience.location}</span></p>
              <p className="body-copy">{experience.description}</p>
              {experience.tech.length > 0 && <p className="experience-tech">{experience.tech.join(" · ")}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
