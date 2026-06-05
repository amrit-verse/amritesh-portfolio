import { ScrollReveal } from "@/components/ScrollReveal";

const SKILLS = {
  frontendBackend: ["React", "TypeScript", "Node.js", "Express", "Spring Boot", "Java", "Python", "MongoDB", "MySQL"],
  systemsSecurity: ["Linux Internals", "Cybersecurity", "Network Security", "Virtual Labs", "Offensive Security"],
  toolsDeployment: ["Git", "Railway", "Render", "Vercel", "HTML", "CSS", "JavaScript"],
};

const CATEGORIES: { key: keyof typeof SKILLS; label: string; colorClass: string; tagClass: string }[] = [
  { key: "frontendBackend", label: "Frontend & Backend", colorClass: "text-accent-blue", tagClass: "skill-comfortable" },
  { key: "systemsSecurity", label: "Systems & Security", colorClass: "text-[#6ee7b7]", tagClass: "skill-learning" },
  { key: "toolsDeployment", label: "Tools & Deployment", colorClass: "text-[#a78bfa]", tagClass: "skill-familiar" },
];

export default function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-24 md:py-32 bg-bg-secondary/50" aria-labelledby="skills-title">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="mb-8 sm:mb-12">
            <span className="section-number">04</span>
            <h2 id="skills-title" className="font-bold mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw + 0.5rem, 2.25rem)' }}>
              Technical Skills
            </h2>
            <p className="text-text-secondary max-w-2xl">
              Technologies and tools I work with
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-accent-blue to-accent-purple mt-4" />
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES.map((cat, i) => (
            <ScrollReveal key={cat.key} delay={i * 120}>
              <div>
                <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${cat.colorClass}`}>
                  {cat.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {SKILLS[cat.key].map((skill) => (
                    <span
                      key={skill}
                      className={`${cat.tagClass} text-sm font-medium px-3 py-1.5 rounded-full`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
