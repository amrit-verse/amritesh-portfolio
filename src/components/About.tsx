import { ScrollReveal } from '@/components/ScrollReveal';

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 md:py-32" aria-label="About Me">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="mb-8 sm:mb-12">
            <p className="section-number mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              01 // ORIGIN &amp; TIMELINE
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
              Where I Started &amp; How I Build
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              From taking apart old PCs in Nepal to writing backend APIs and tinkering with Linux in Chennai.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] items-start">
          <ScrollReveal delay={100}>
            <div className="space-y-6">
              {/* Natural Human Story Timeline */}
              <div className="glass-card p-4 sm:p-6 relative">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  The Journey So Far
                </p>
                <div className="space-y-6 relative before:absolute before:inset-0 before:left-3 md:before:left-1/2 before:-translate-x-1/2 before:h-full before:w-px before:bg-gradient-to-b before:from-zinc-500/40 before:via-white/10 before:to-transparent">
                  {[
                    { 
                      title: "First Old Computer & Discovering Linux", 
                      period: "Nepal // 2018-2022",
                      desc: "Tore down an old family desktop at 14 just to see how the motherboard worked. Windows was painfully slow on it, so I flashed a lightweight Linux distro. That was my first introduction to the terminal, package managers, and bash." 
                    },
                    { 
                      title: "Secondary Schooling & +2 Science", 
                      period: "Rautahat to Kathmandu",
                      desc: "Finished 10th grade at Jana Jyoti (SEE: 3.60/4.00) in Rautahat, then moved to Kathmandu for +2 Science (Physics, Chemistry, Maths) at Xavier International (GPA: 3.27/4.00). Started writing basic Python and C scripts." 
                    },
                    { 
                      title: "College in Chennai & Debian Daily Driver", 
                      period: "2025 — Present",
                      desc: "Joined Excel Engineering College (affiliated with Anna University, Chennai) for B.E. in Computer Science. Switched full-time to Debian Linux as my daily operating system and automated my entire workflow." 
                    },
                    { 
                      title: "Building Real Tools Instead of Toy Clones", 
                      period: "Projects // 2025-2026",
                      desc: "Built TeLSA when law students needed a real membership and article publishing portal. Built Attendance OS because our university detains anyone under 75% attendance and people needed mathematical proof before skipping a class." 
                    },
                    { 
                      title: "Hackathons & Virtual Systems Lab", 
                      period: "Current Focus",
                      desc: "Leading Team Sudo in the Smart India Hackathon (Problem SIH26145 - NTRO). Running QEMU/KVM virtual networks on my machine with virbr0 isolated testbeds to audit ports with Nmap 7.95 and analyze network threat patterns." 
                    },
                  ].map((item, index) => (
                    <div key={item.title} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className={`flex items-center justify-center w-3 h-3 rounded-full border absolute left-3 md:left-1/2 -translate-x-1/2 z-10 ${
                        index === 4
                          ? "border-emerald-400 bg-emerald-950 shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                          : "border-zinc-500 bg-zinc-900"
                      }`} />
                      <div className="w-[calc(100%-1.75rem)] md:w-[calc(50%-2rem)] pl-6 md:pl-0">
                        <div className={`p-4 rounded-xl bg-[#090c12] border transition-colors ${
                          index === 4
                            ? "border-emerald-500/30 group-hover:border-emerald-500/60"
                            : "border-zinc-800/80 group-hover:border-zinc-600"
                        } ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}>
                          <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5 mb-1">
                            <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                            <span className={`text-[0.6875rem] font-mono shrink-0 ${index === 4 ? "text-emerald-400 font-semibold" : "text-zinc-400"}`}>{item.period}</span>
                          </div>
                          <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="space-y-4">
              {/* How I Work */}
              <div className="glass-card p-5 sm:p-6 border-zinc-800/90">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                  How I Approach Code
                </p>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-3">
                  I don&apos;t enjoy tutorial hell or copy-pasting code I don&apos;t understand. When building a backend, I want to know why a database query is slow, how authentication cookies should be secured, and how edge cases actually behave.
                </p>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  I care about typed schemas (TypeScript, Zod), clean migrations (Prisma, PostgreSQL), and predictable error handling. If a tool doesn&apos;t solve a real problem for someone, it&apos;s not worth shipping.
                </p>
              </div>

              {/* Academic Snapshot */}
              <div className="glass-card p-5 sm:p-6 border-zinc-800/90">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 mb-2">College Coordinates</p>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
                  B.E. Computer Science Engineering
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
                  Excel Engineering College (Affiliated with Anna University, Chennai)
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-[#090c12] p-3.5 border border-zinc-800/80">
                    <p className="text-[0.6875rem] font-mono uppercase tracking-wider text-zinc-400 mb-1">Current CGPA</p>
                    <p className="text-xl font-bold text-white tracking-tight">8.88 / 10</p>
                    <p className="text-[0.6875rem] text-emerald-400 mt-0.5">Verified Academic Record</p>
                  </div>
                  <div className="rounded-xl bg-[#090c12] p-3.5 border border-zinc-800/80">
                    <p className="text-[0.6875rem] font-mono uppercase tracking-wider text-zinc-400 mb-1">Graduation</p>
                    <p className="text-xl font-bold text-white tracking-tight">May 2029</p>
                    <p className="text-[0.6875rem] text-zinc-400 mt-0.5">Progressing 2nd year</p>
                  </div>
                </div>
              </div>

              {/* Human Language Card */}
              <div className="glass-card p-5 sm:p-6 border-zinc-800/90">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 mb-2">Languages I Speak</p>
                <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
                  Raised speaking Nepali, Hindi, Bhojpuri, and Maithili. Professional fluency in English, conversational Tamil, and self-studied elementary Japanese.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#090c12] border border-emerald-500/25 text-emerald-300">
                    JL-NAT N5 (Japanese)
                  </span>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#090c12] border border-emerald-500/25 text-emerald-300">
                    Duolingo English: 105
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
