import { ScrollReveal } from "@/components/ScrollReveal";
import ProjectCard3D from "@/components/ProjectCard3D";

const CERTIFICATIONS = [
  {
    title: "JL-NAT N5 Certified",
    subtitle: "Japanese Language Proficiency Examination",
    issuer: "JL-NAT Examination Board (Tokyo, Japan)",
    date: "Dec 2023",
    skills: ["Linguistic Analysis", "Grammar Deconstruction", "Kanji & Listening"],
    points: [
      "Autodidactic Japanese study validating reading, vocabulary, and listening comprehension.",
      "Demonstrates systematic learning discipline and grammar pattern decomposition."
    ],
  },
  {
    title: "Duolingo English Test (Score: 105)",
    subtitle: "Certified Academic & Professional English Proficiency",
    issuer: "Duolingo International Examination",
    date: "2023",
    skills: ["Technical Composition", "Documentation Writing", "Verbal Fluency"],
    points: [
      "Proctored standardized test evaluating reading, technical composition, and verbal fluency.",
      "CEFR B2 Level certified for international engineering collaboration and technical documentation."
    ],
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-16 sm:py-24 md:py-32" aria-labelledby="certifications-title">
      <div className="max-w-[1520px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <ScrollReveal>
          <div className="mb-8 sm:mb-12">
            <p className="section-number mb-2 flex items-center gap-2 text-xs font-mono tracking-wider text-accent-bronze">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-bronze shadow-[0_0_8px_var(--color-accent-bronze-glow)]" />
              07 // CREDENTIALS &amp; CERTIFICATIONS
            </p>
            <h2 id="certifications-title" className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-text-primary mb-3">
              Language &amp; Independent Credentials
            </h2>
            <p className="text-text-secondary text-xs sm:text-sm max-w-2xl leading-relaxed">
              Standardized language accreditations reflecting autodidactic learning discipline and global communication standards.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
          {CERTIFICATIONS.map((item) => (
            <ScrollReveal key={item.title} delay={80}>
              <ProjectCard3D intensity={4} className="h-full">
              <div className="corner-hud h-full p-5 sm:p-6 rounded-2xl bg-bg-card border border-border-subtle hover:border-accent-bronze/50 shadow-card transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-lg border text-text-primary bg-bg-secondary border-accent-bronze/50">
                      {item.title}
                    </span>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-bg-primary border border-border-subtle text-text-secondary">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-base font-display font-semibold text-text-primary mb-1">
                    {item.subtitle}
                  </h3>
                  <p className="text-xs text-text-secondary font-mono mb-4">
                    Issuer: {item.issuer}
                  </p>

                  <ul className="space-y-2 text-xs font-mono text-text-secondary mb-4">
                    {item.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-accent-bronze mt-0.5">›</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border-subtle">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-bg-primary border border-border-subtle text-text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              </ProjectCard3D>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
