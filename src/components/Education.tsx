import { ScrollReveal } from "@/components/ScrollReveal";

const TIMELINE = [
  {
    period: "Rautahat, Nepal",
    title: "SEE (2018-2020)",
    institution: "Jana Jyoti Secondary School",
    detail: "GPA 3.60 / 4.00",
  },
  {
    period: "Kathmandu, Nepal",
    title: "+2 (PCM) (2020-2022)",
    institution: "Xavier International Secondary School",
    detail: "GPA 3.27 / 4.00",
  },
  {
    period: "Language Learning & Personal Development",
    title: "JL-NAT N5 Certified",
    institution: "Duolingo English Test: 105",
    detail: "Focused preparation in language and academic readiness.",
  },
  {
    period: "India",
    title: "B.E. Computer Science Engineering",
    institution: "Excel Engineering College — Anna University",
    detail: "Current CGPA 8.55 • Expected Graduation 2029",
    current: true,
  },
];

export default function Education() {
  return (
    <section id="education" className="py-16 sm:py-24 md:py-32" aria-labelledby="education-title">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="mb-8 sm:mb-12">
            <span className="section-number">05</span>
            <h2 id="education-title" className="font-bold mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw + 0.5rem, 2.25rem)' }}>
              Education
            </h2>
            <p className="text-text-secondary max-w-2xl">
              A clear progression from early studies to engineering and language development.
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-accent-blue to-accent-purple mt-4" />
          </div>
        </ScrollReveal>

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-2.5 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue to-transparent" aria-hidden="true" />
          <div className="space-y-10">
            {TIMELINE.map((item, i) => (
              <ScrollReveal key={`${item.title}-${i}`} delay={i * 100}>
                <div className="relative pl-8 sm:pl-12">
                  <div className="absolute left-0 top-2 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-bg-tertiary border-2 border-text-tertiary" aria-hidden="true" />
                  <div className="glass-card p-4 sm:p-6 border-border-subtle">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-mono uppercase tracking-[0.24em] text-text-secondary">
                          {item.period}
                        </p>
                        <h3 className="text-xl font-semibold text-text-primary mt-3">{item.title}</h3>
                      </div>
                      {item.current && (
                        <span className="inline-flex items-center rounded-full bg-accent-blue/10 text-accent-blue text-xs font-medium uppercase tracking-[0.24em] px-3 py-2">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary mt-4">{item.institution}</p>
                    <p className="text-sm text-text-tertiary mt-2 font-mono">{item.detail}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
