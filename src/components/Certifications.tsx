import { ScrollReveal } from "@/components/ScrollReveal";

const CERTIFICATIONS = [
  {
    title: "JL-NAT N5 Certified",
    subtitle: "Japanese Language Proficiency Examination",
    issuer: "JL-NAT Examination Board",
    date: "Dec 2023",
    skills: ["Linguistic Analysis", "Grammar Deconstruction", "Kanji & Listening"],
    whyItMatters:
      "Taught myself Japanese out of an interest in linguistics and kanji, then validated elementary reading and listening in the formal JL-NAT N5 exam. Breaking down unfamiliar grammar systems from scratch is the exact same discipline I use when learning new programming languages or systems architectures.",
    relevance:
      "Demonstrates independent self-study discipline and the ability to systematically master unfamiliar concepts.",
  },
  {
    title: "Duolingo English Test (Score: 105)",
    subtitle: "Certified Academic & Professional English Proficiency",
    issuer: "Duolingo International Examination",
    date: "2023",
    skills: ["Technical Composition", "Documentation Writing", "Verbal Fluency"],
    whyItMatters:
      "Standardized examination measuring reading comprehension, writing, and conversational English under proctored test conditions, achieving a competitive 105 score.",
    relevance:
      "Ensures clear communication for writing architectural docs, READMEs, pull requests, and working within international engineering teams.",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-16 sm:py-24 md:py-32" aria-labelledby="certifications-title">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="mb-8 sm:mb-12">
            <p className="section-number mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
              07 // CREDENTIALS &amp; CERTIFICATIONS
            </p>
            <h2 id="certifications-title" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
              Language &amp; Independent Credentials
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Standardized language accreditations reflecting autodidactic learning discipline and global communication standards.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
          {CERTIFICATIONS.map((item) => (
            <ScrollReveal key={item.title} delay={80}>
              <div className="glass-card p-5 sm:p-6 relative overflow-hidden flex flex-col justify-between border border-zinc-800/80 hover:border-zinc-700">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border text-emerald-300 bg-emerald-500/10 border-emerald-500/25">
                      {item.title}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#090c12] border border-zinc-800 text-zinc-400">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white mb-1">{item.subtitle}</h3>
                  <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-4">Issued by {item.issuer}</p>

                  <div className="space-y-3.5 mb-5 text-xs sm:text-sm">
                    <div>
                      <p className="text-[0.6875rem] font-mono uppercase tracking-wider text-zinc-300 mb-1">
                        The Real Story Behind It
                      </p>
                      <p className="text-zinc-400 leading-relaxed text-xs sm:text-sm">{item.whyItMatters}</p>
                    </div>
                    <div>
                      <p className="text-[0.6875rem] font-mono uppercase tracking-wider text-zinc-300 mb-1">
                        Practical Relevance
                      </p>
                      <p className="text-zinc-400 leading-relaxed text-xs sm:text-sm">{item.relevance}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-zinc-800/80 pt-4 mt-auto">
                  <p className="text-[0.6875rem] font-mono uppercase tracking-wider text-zinc-500 mb-2">Verified Competencies</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.skills.map((skill) => (
                      <span key={skill} className="text-xs font-mono px-2.5 py-1 rounded bg-[#0b0e14] border border-zinc-800 text-zinc-300">
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
