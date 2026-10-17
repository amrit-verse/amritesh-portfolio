import { ScrollReveal } from "@/components/ScrollReveal";

const SKILL_CATEGORIES = [
  {
    label: "Languages",
    dotColor: "bg-emerald-400",
    description: "Languages I write for backend services, automation scripts, and problem solving.",
    skills: ["Java", "Python", "TypeScript", "JavaScript", "SQL", "Bash", "C"],
  },
  {
    label: "Backend & Databases",
    dotColor: "bg-emerald-400",
    description: "Frameworks, databases, and ORMs I use to build scalable REST APIs.",
    skills: ["Node.js", "Express.js", "Spring Boot", "PostgreSQL", "MongoDB", "Prisma ORM", "JPA / Hibernate", "REST APIs"],
  },
  {
    label: "Linux & Virtualization",
    dotColor: "bg-emerald-400",
    description: "My daily workstation environment, automation, and hypervisor testbeds.",
    skills: ["Debian Linux", "Bash Scripting", "QEMU / KVM", "Docker Engine", "systemd", "Git"],
  },
  {
    label: "Security & Networking",
    dotColor: "bg-emerald-400",
    description: "Diagnostic tools and authentication protocols I practice with.",
    skills: ["Nmap (7.95)", "Network Auditing", "Passive Flow Detection", "Auth.js (v5)", "JWT & Cookies", "RBAC", "Zod Validation"],
  },
  {
    label: "Frontend Engineering",
    dotColor: "bg-emerald-400",
    description: "Modern web tools for building responsive client interfaces.",
    skills: ["React", "Next.js (App Router)", "Tailwind CSS", "Recharts", "HTML5", "CSS3"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-24 md:py-32" aria-labelledby="skills-title">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="mb-8 sm:mb-12">
            <p className="section-number mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              05 // TOOLKIT &amp; TECHNOLOGIES
            </p>
            <h2 id="skills-title" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
              Technical Skills &amp; Everyday Tools
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Technologies I actively use in personal projects, coursework, and local virtual environments — no vanity tags.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {SKILL_CATEGORIES.map((cat, i) => (
            <ScrollReveal key={cat.label} delay={i * 50}>
              <div className="glass-card p-5 sm:p-6 h-full flex flex-col justify-between border border-zinc-800/80 hover:border-zinc-700">
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200 mb-1.5 flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${cat.dotColor}`} />
                    {cat.label}
                  </h3>
                  <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                    {cat.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#0b0e14] border border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:text-white transition-all duration-200"
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
