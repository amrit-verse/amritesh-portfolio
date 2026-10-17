import { ScrollReveal } from "@/components/ScrollReveal";

const TIMELINE = [
  {
    period: "2025 — 2029 (Current)",
    location: "Chennai, India",
    title: "B.E. Computer Science & Engineering",
    institution: "Excel Engineering College (Affiliated with Anna University, Chennai)",
    detail: "Current CGPA: 8.88 / 10.00 • Progressing into 2nd Year • Expected May 2029",
    current: true,
  },
  {
    period: "2022 — 2024",
    location: "Kathmandu, Nepal",
    title: "+2 Higher Secondary — Science (PCM)",
    institution: "Xavier International Secondary School",
    detail: "Final GPA: 3.27 / 4.00 • Major in Physics, Chemistry, and Mathematics",
  },
  {
    period: "2020 — 2022",
    location: "Rautahat, Nepal",
    title: "Secondary Education Examination (SEE)",
    institution: "Jana Jyoti Secondary School",
    detail: "Final GPA: 3.60 / 4.00 • Strong foundation in mathematics and general sciences",
  },
];

export default function Education() {
  return (
    <section id="education" className="py-16 sm:py-24 md:py-32 bg-[#080a0f]/60 border-y border-zinc-800/60" aria-labelledby="education-title">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="mb-8 sm:mb-12">
            <p className="section-number mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              06 // ACADEMIC TIMELINE
            </p>
            <h2 id="education-title" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
              Education &amp; Qualifications
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Formal education from Rautahat and Kathmandu in Nepal to engineering in Chennai, India.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-2 sm:left-2.5 top-0 bottom-0 w-px bg-gradient-to-b from-zinc-500/50 via-zinc-800 to-transparent" aria-hidden="true" />
          <div className="space-y-6 sm:space-y-8">
            {TIMELINE.map((item, i) => (
              <ScrollReveal key={`${item.title}-${i}`} delay={i * 80}>
                <div className="relative pl-7 sm:pl-10">
                  <div className={`absolute left-2 sm:left-2.5 -translate-x-1/2 top-2.5 w-3 h-3 rounded-full z-10 ${
                    item.current
                      ? "bg-emerald-950 border-2 border-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                      : "bg-[#050608] border-2 border-zinc-500"
                  }`} aria-hidden="true" />
                  <div className="glass-card p-5 sm:p-6 border-zinc-800/80 hover:border-zinc-700">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-1">
                          <span className={`text-xs font-mono font-semibold ${item.current ? "text-emerald-400" : "text-zinc-300"}`}>
                            {item.period}
                          </span>
                          <span className="text-zinc-600 font-mono text-xs">•</span>
                          <span className="text-xs font-mono text-zinc-400">
                            {item.location}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-white">{item.title}</h3>
                      </div>
                      {item.current && (
                        <span className="self-start inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-[0.6875rem] font-mono uppercase tracking-wider px-2.5 py-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                          In Progress
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 mt-2 font-medium">{item.institution}</p>
                    <p className="text-xs text-zinc-400 mt-1.5 font-mono break-words">{item.detail}</p>
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
