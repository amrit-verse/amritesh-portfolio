import { ScrollReveal } from '@/components/ScrollReveal';
import ProjectCard3D from '@/components/ProjectCard3D';
import { TriquetraIcon } from '@/components/CommandPalette';

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 md:py-32" aria-label="About Me">
      <div className="max-w-[1520px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <ScrollReveal>
          <div className="mb-8 sm:mb-12">
            <p className="section-number mb-2 flex items-center gap-2 text-xs font-mono tracking-wider text-accent-bronze">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-bronze shadow-[0_0_8px_var(--color-accent-bronze-glow)]" />
              DIMENSION 04 // ORIGIN &amp; ARCHIVAL TIMELINE
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-text-primary mb-3">
              Where I Started &amp; How I Build
            </h2>
            <p className="text-text-secondary text-xs sm:text-sm max-w-2xl leading-relaxed">
              From hardware teardowns in Nepal to distributed backend architectures, Debian Linux, and SIEM security in Chennai.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr] items-start">
          <ScrollReveal delay={100}>
            <div className="space-y-6">
              {/* Natural Human Story Timeline — Three Cycles */}
              <ProjectCard3D intensity={4}>
              <div className="corner-hud p-5 sm:p-7 rounded-2xl bg-bg-card border border-border-subtle shadow-card">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent-bronze flex items-center gap-2 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-bronze" />
                    The Three Cycles of Engineering
                  </p>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-bg-secondary border border-border-subtle text-[10px] font-mono text-accent-bronze">
                    <TriquetraIcon className="w-3 h-3 text-accent-bronze" />
                    <span>SIC MUNDUS TIMELINE</span>
                  </span>
                </div>

                <div className="space-y-4">
                  {[
                    { 
                      cycle: "CYCLE I",
                      title: "Hardware Teardown & First Linux Install", 
                      period: "Nepal // 2018-2022",
                      points: [
                        "Disassembled first x86 machine at 14 to inspect motherboard and BIOS.",
                        "Replaced slow Windows with lightweight Linux — discovered bash & package managers.",
                        "SEE: 3.60/4.00 (Jana Jyoti) · +2 Science PCM: 3.27/4.00 (Xavier International)."
                      ]
                    },
                    { 
                      cycle: "CYCLE II",
                      title: "Anna University & Full-Time Debian OS", 
                      period: "Chennai // 2025 — Present",
                      points: [
                        "B.E. Computer Science Engineering · Excel Engineering College (8.88 CGPA).",
                        "Adopted Debian 13 as daily driver; automated terminal workflows and dotfiles.",
                        "Architected ReleaseTrace (Dual-Store engine), ThreatDesk (SIEM), and TeLSA (CMS)."
                      ]
                    },
                    { 
                      cycle: "CYCLE III",
                      title: "Hackathons, Virtual Labs & Distributed Systems", 
                      period: "Current Horizon // 2026-2029",
                      points: [
                        "Smart India Hackathon: Team Leader (Team Sudo) tackling NTRO challenge SIH26145.",
                        "Isolated QEMU/KVM virtual testbed on virbr0 NAT bridge with Nmap 7.95 audits.",
                        "Targeting high-scale distributed backend systems and cloud infrastructure roles."
                      ]
                    },
                  ].map((item) => (
                    <div key={item.title} className="p-4 rounded-xl bg-bg-secondary border border-border-subtle hover:border-accent-bronze/60 transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-bg-tertiary text-accent-bronze border border-border-subtle">
                            {item.cycle}
                          </span>
                          <h3 className="font-semibold text-text-primary text-sm sm:text-base">{item.title}</h3>
                        </div>
                        <span className="text-[11px] font-mono text-accent-bronze font-semibold">{item.period}</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-text-secondary font-mono pl-1">
                        {item.points.map((pt, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-accent-bronze mt-0.5">›</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              </ProjectCard3D>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="space-y-4">
              {/* Engineering Principles (Punchy, Visual Chips) */}
              <ProjectCard3D intensity={4}>
              <div className="corner-hud p-5 sm:p-6 rounded-2xl bg-bg-card border border-border-subtle shadow-card">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent-bronze mb-3 flex items-center gap-2 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-bronze" />
                  Engineering Principles
                </p>
                <div className="space-y-2.5 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-bg-secondary border border-border-subtle">
                    <p className="text-text-primary font-semibold mb-0.5">01 // Zero Toy Clones</p>
                    <p className="text-text-secondary">Build tools solving real operational problems with verifiable evidence.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-bg-secondary border border-border-subtle">
                    <p className="text-text-primary font-semibold mb-0.5">02 // Type-Safe Contracts</p>
                    <p className="text-text-secondary">Strict schemas with Zod, TypeScript strict mode, and deterministic migrations.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-bg-secondary border border-border-subtle">
                    <p className="text-text-primary font-semibold mb-0.5">03 // Deep Root-Cause Analysis</p>
                    <p className="text-text-secondary">Inspect SQL execution plans, kernel syscalls, and network packet traces.</p>
                  </div>
                </div>
              </div>
              </ProjectCard3D>

              {/* Academic Coordinates */}
              <ProjectCard3D intensity={4}>
              <div className="corner-hud p-5 sm:p-6 rounded-2xl bg-bg-card border border-border-subtle shadow-card">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent-bronze mb-2 font-bold">College Coordinates</p>
                <h3 className="text-base sm:text-lg font-display font-semibold text-text-primary mb-1">
                  B.E. Computer Science Engineering
                </h3>
                <p className="text-xs text-text-secondary mb-4">
                  Excel Engineering College (Affiliated with Anna University, Chennai)
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-bg-secondary p-3.5 border border-border-subtle">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-text-secondary mb-1">Current CGPA</p>
                    <p className="text-xl font-bold font-display text-text-primary tracking-tight">8.88 / 10</p>
                    <p className="text-[10px] font-mono text-accent-bronze mt-0.5">Verified Academic Record</p>
                  </div>
                  <div className="rounded-xl bg-bg-secondary p-3.5 border border-border-subtle">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-text-secondary mb-1">Graduation Target</p>
                    <p className="text-xl font-bold font-display text-text-primary tracking-tight">May 2029</p>
                    <p className="text-[10px] font-mono text-text-secondary mt-0.5">Progressing 2nd year</p>
                  </div>
                </div>
              </div>
              </ProjectCard3D>

              {/* Human Language Card */}
              <ProjectCard3D intensity={4}>
              <div className="corner-hud p-5 sm:p-6 rounded-2xl bg-bg-card border border-border-subtle shadow-card">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent-bronze mb-2 font-bold">Languages &amp; Global Communication</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-bg-secondary border border-accent-bronze/50 text-text-primary">
                    JL-NAT N5 (Japanese Certified)
                  </span>
                  <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-bg-secondary border border-accent-bronze/50 text-text-primary">
                    Duolingo English: 105 (B2 Professional)
                  </span>
                  <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-bg-secondary border border-border-subtle text-text-secondary">
                    Nepali · Hindi · Bhojpuri · Maithili
                  </span>
                </div>
              </div>
              </ProjectCard3D>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
