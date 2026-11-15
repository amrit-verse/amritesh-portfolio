import { ScrollReveal } from "@/components/ScrollReveal";
import ProjectCard3D from "@/components/ProjectCard3D";

const TIMELINE = [
  {
    period: "2025 — 2029 (Current)",
    location: "Chennai, India",
    title: "B.E. Computer Science & Engineering",
    institution: "Excel Engineering College (Anna University affiliated)",
    metrics: "Current CGPA: 8.88 / 10.00 • Progressing into 2nd Year",
    current: true,
  },
  {
    period: "2022 — 2024",
    location: "Kathmandu, Nepal",
    title: "+2 Higher Secondary — Science (PCM)",
    institution: "Xavier International Secondary School",
    metrics: "Final GPA: 3.27 / 4.00 • Physics, Chemistry & Mathematics",
    current: false,
  },
  {
    period: "2020 — 2022",
    location: "Rautahat, Nepal",
    title: "Secondary Education Examination (SEE)",
    institution: "Jana Jyoti Secondary School",
    metrics: "Final GPA: 3.60 / 4.00 • Mathematics & General Science",
    current: false,
  },
];

export default function Education() {
  return (
    <section id="education" className="py-16 sm:py-24 md:py-32 bg-bg-primary border-y border-border-subtle" aria-labelledby="education-title">
      <div className="max-w-[1520px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <ScrollReveal>
          <div className="mb-8 sm:mb-12">
            <p className="section-number mb-2 flex items-center gap-2 text-xs font-mono tracking-wider text-accent-bronze">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-bronze shadow-[0_0_8px_var(--color-accent-bronze-glow)]" />
              06 // ACADEMIC TIMELINE &amp; QUALIFICATIONS
            </p>
            <h2 id="education-title" className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-text-primary mb-3">
              Education &amp; Qualifications
            </h2>
            <p className="text-text-secondary text-xs sm:text-sm max-w-2xl leading-relaxed">
              Formal education timeline from Rautahat and Kathmandu in Nepal to computer science engineering in Chennai, India.
            </p>
          </div>
        </ScrollReveal>

        {/* Full-width 3-column timeline array */}
        <div className="grid md:grid-cols-3 gap-5">
          {TIMELINE.map((item, i) => (
            <ScrollReveal key={`${item.title}-${i}`} delay={i * 80}>
              <ProjectCard3D intensity={4} className="h-full">
              <div className="corner-hud h-full p-5 sm:p-6 rounded-2xl bg-bg-card border border-border-subtle hover:border-accent-bronze/50 shadow-card transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      item.current
                        ? 'bg-accent-bronze/15 border-accent-bronze/40 text-accent-bronze font-bold'
                        : 'bg-bg-secondary border-border-subtle text-text-secondary'
                    }`}>
                      {item.period}
                    </span>
                    <span className="text-[11px] font-mono text-text-secondary">{item.location}</span>
                  </div>

                  <h3 className="text-base font-display font-bold text-text-primary mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-text-secondary mb-4 font-mono">
                    {item.institution}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-bg-primary border border-border-subtle mt-3">
                  <p className="text-xs font-mono text-text-primary">{item.metrics}</p>
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
