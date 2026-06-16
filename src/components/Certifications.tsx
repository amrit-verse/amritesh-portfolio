import { ScrollReveal } from "@/components/ScrollReveal";

const CERTIFICATIONS = [
  {
    title: "JL-NAT N5",
    subtitle: "Japanese Language Proficiency",
    issuer: "JL-NAT Board",
    date: "Dec 2023",
    skills: ["Language Discipline", "Cross-cultural Communication", "Linguistic Analysis"],
    highlight: "Validated elementary Japanese reading and listening skills.",
    relevance: "Demonstrates strong discipline and adaptability, essential traits for continuous learning in rapidly evolving backend and cybersecurity landscapes.",
  },
  {
    title: "Duolingo English Test",
    subtitle: "English Language Proficiency (Score: 105)",
    issuer: "Duolingo",
    date: "2023",
    skills: ["Technical Reading", "Professional Writing", "Verbal Communication"],
    highlight: "Achieved a highly competitive score of 105.",
    relevance: "Validates the academic reading and writing skills necessary for consuming complex technical documentation, RFCs, and communicating architecture decisions globally.",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-16 sm:py-24 md:py-32" aria-labelledby="certifications-title">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="mb-8 sm:mb-12">
            <span className="section-number">06</span>
            <h2 id="certifications-title" className="font-bold mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw + 0.5rem, 2.25rem)' }}>
              Certifications
            </h2>
            <p className="text-text-secondary max-w-2xl">
              Validated language and readiness credentials.
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-accent-blue to-accent-purple mt-4" />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {CERTIFICATIONS.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 100}>
              <div className="glass-card p-6 relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-accent-blue/5 rounded-full blur-2xl group-hover:bg-accent-blue/10 transition-colors duration-500" />
                
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4 relative">
                  <div className="text-sm font-bold uppercase tracking-wider text-accent-blue">
                    {item.title}
                  </div>
                  <div className="text-xs font-mono px-2.5 py-1 rounded-full bg-bg-tertiary border border-border-subtle text-text-tertiary">
                    {item.date}
                  </div>
                </div>

                <div className="relative mb-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-1">{item.subtitle}</h3>
                  <p className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-4">Issued by {item.issuer}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-accent-blue uppercase tracking-wider mb-1">Achievement Highlight</p>
                      <p className="text-sm text-text-secondary leading-relaxed">{item.highlight}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-accent-blue uppercase tracking-wider mb-1">Professional Relevance</p>
                      <p className="text-sm text-text-secondary leading-relaxed">{item.relevance}</p>
                    </div>
                  </div>
                </div>

                <div className="relative border-t border-border-subtle pt-4 mt-auto">
                  <p className="text-xs font-semibold text-text-primary mb-3">KEY SKILLS VALIDATED</p>
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <span key={skill} className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent-blue-dim text-accent-blue border border-accent-blue/10">
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
