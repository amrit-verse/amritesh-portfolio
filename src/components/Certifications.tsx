import { ScrollReveal } from "@/components/ScrollReveal";

const CERTIFICATIONS = [
  {
    title: "JL-NAT N5",
    subtitle: "Japanese Language Proficiency",
    detail: "Elementary Japanese reading and listening skills.",
  },
  {
    title: "Duolingo English Test",
    subtitle: "English Language Proficiency",
    detail: "Score: 105 — strong academic reading and listening skills.",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-16 sm:py-24 md:py-32" aria-labelledby="certifications-title">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="mb-12">
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

        <div className="grid sm:grid-cols-2 gap-6">
          {CERTIFICATIONS.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 100}>
              <div className="glass-card p-6">
                <div className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-blue mb-3">
                  {item.title}
                </div>
                <p className="text-sm font-medium text-text-primary mb-2">{item.subtitle}</p>
                <p className="text-sm text-text-secondary leading-relaxed">{item.detail}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
