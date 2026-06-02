import { ScrollReveal } from "@/components/ScrollReveal";

const SKILLS = {
  comfortable: ["Python", "Java", "HTML", "CSS", "JavaScript", "MongoDB", "Git", "Linux"],
  familiar: ["React", "TypeScript", "Node.js", "Express", "Spring Boot", "MySQL", "Railway", "Render", "Vercel"],
  learning: ["Linux Internals", "Cybersecurity", "Network Security", "Virtual Labs", "Offensive Security"],
};

const CATEGORIES: { key: keyof typeof SKILLS; label: string; colorClass: string; tagClass: string }[] = [
  { key: "comfortable", label: "Comfortable With", colorClass: "text-accent-blue", tagClass: "skill-comfortable" },
  { key: "familiar", label: "Familiar With", colorClass: "text-[#a78bfa]", tagClass: "skill-familiar" },
  { key: "learning", label: "Currently Learning", colorClass: "text-[#6ee7b7]", tagClass: "skill-learning" },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 bg-bg-secondary/50" aria-labelledby="skills-title">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="mb-12">
            <span className="section-number">04</span>
            <h2 id="skills-title" className="text-3xl md:text-4xl font-bold mb-3">
              Technical Skills
            </h2>
            <p className="text-text-secondary max-w-2xl">
              Technologies and tools I work with
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-accent-blue to-accent-purple mt-4" />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
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
