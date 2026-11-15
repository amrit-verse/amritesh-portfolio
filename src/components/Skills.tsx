import { ScrollReveal } from "@/components/ScrollReveal";

const SKILL_CATEGORIES = [
  {
    label: "Languages",
    focus: "Backend · Automation · Problem Solving",
    skills: ["Java", "Python", "TypeScript", "JavaScript", "SQL", "Bash", "C"],
  },
  {
    label: "Backend & Databases",
    focus: "REST APIs · ORMs · SQL & NoSQL",
    skills: ["Node.js", "Express.js", "Spring Boot", "PostgreSQL", "MongoDB", "Prisma ORM", "JPA / Hibernate", "REST APIs"],
  },
  {
    label: "Linux & Virtualization",
    focus: "Daily Workstation · Hypervisors · systemd",
    skills: ["Debian Linux", "Bash Scripting", "QEMU / KVM", "Docker Engine", "systemd", "Git"],
  },
  {
    label: "Security & Networking",
    focus: "Deterministic Rules · Auth & RBAC · Auditing",
    skills: ["Nmap (7.95)", "ThreatDesk Scoring", "Passive Flow Detection", "Auth.js (v5)", "JWT & Cookies", "RBAC", "Zod Validation"],
  },
  {
    label: "Frontend Engineering",
    focus: "Next.js App Router · Tailwind · Data Viz",
    skills: ["React", "Next.js (App Router)", "Tailwind CSS", "Recharts", "HTML5", "CSS3"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-24 md:py-32" aria-labelledby="skills-title">
      <div className="max-w-[1520px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <ScrollReveal>
          <div className="mb-8 sm:mb-12">
            <p className="section-number mb-2 flex items-center gap-2 text-xs font-mono tracking-wider text-accent-bronze">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-bronze shadow-[0_0_8px_var(--color-accent-bronze-glow)]" />
              05 // TOOLKIT &amp; TECHNOLOGIES
            </p>
            <h2 id="skills-title" className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-text-primary mb-3">
              Technical Skills &amp; Everyday Tools
            </h2>
            <p className="text-text-secondary text-xs sm:text-sm max-w-2xl leading-relaxed">
              Everyday engineering toolkit across systems, backend, virtualization, and security testing.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          {SKILL_CATEGORIES.map((cat, i) => (
            <ScrollReveal key={cat.label} delay={i * 50}>
              <div className="corner-hud glass-card p-5 sm:p-6 h-full flex flex-col justify-between border border-border-subtle hover:border-accent-bronze/50 transition-colors bg-bg-card shadow-card rounded-2xl">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-text-primary flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-bronze" />
                      {cat.label}
                    </h3>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-bg-secondary text-accent-bronze border border-border-subtle">
                      {cat.skills.length} tools
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-accent-bronze mb-4 font-medium flex items-center gap-1.5">
                    <span>›</span>
                    <span>{cat.focus}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-bg-primary border border-border-subtle text-text-primary hover:border-accent-bronze hover:text-accent-bronze transition-all duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
