import { ScrollReveal } from '@/components/ScrollReveal';

const focusCards = [
  {
    title: 'Backend & Database Architecture',
    tag: 'APIs & Schemas',
    tagColor: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
    iconColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25 group-hover:border-emerald-500/50',
    description:
      'Writing backend services in Node.js/Express and Java (Spring Boot). Getting relational schemas right with PostgreSQL and Prisma, managing data types, and writing structured REST APIs with input validation.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M2 15h10" />
        <path d="M2 18h10" />
      </svg>
    ),
  },
  {
    title: 'Debian Linux & Terminal Workflows',
    tag: 'Daily OS & Shell',
    tagColor: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
    iconColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25 group-hover:border-emerald-500/50',
    description:
      'Debian is my daily operating system. I write modular Bash scripts for system maintenance, manage dotfiles via git, and experiment with systemd services, process trees, and Linux memory management.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
  },
  {
    title: 'QEMU/KVM Virtual Systems Lab',
    tag: 'Isolated Hypervisor',
    tagColor: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
    iconColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25 group-hover:border-emerald-500/50',
    description:
      'Running an isolated hypervisor testbed with a debian13 guest VM on a virbr0 virtual NAT bridge. Auditing open services with Nmap 7.95 and studying network isolation without touching production.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Full-Stack Next.js Applications',
    tag: 'Production Web Apps',
    tagColor: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
    iconColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25 group-hover:border-emerald-500/50',
    description:
      'Building production apps like TeLSA using Next.js App Router, Server Actions, Auth.js role-based access, and Cloudinary media storage — focusing on fast load times, clean code, and zero bloated packages.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    ),
  },
];

export default function CurrentFocus() {
  return (
    <section
      id="focus"
      className="py-16 sm:py-24 md:py-32 bg-[#090b10]/60 border-y border-zinc-800/60"
      aria-label="Current Focus"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="mb-8 sm:mb-12">
            <p className="section-number mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
              02 // CURRENT FOCUS
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
              What I Spend My Time On
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              The four core engineering areas where I spend my time coding, configuring systems, and learning every day.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 reveal-stagger">
          {focusCards.map((card, index) => (
            <ScrollReveal key={card.title} delay={index * 80}>
              <div className="glass-card p-5 sm:p-6 group cursor-default border border-zinc-800/80 hover:border-zinc-700 transition-colors">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg border flex items-center justify-center group-hover:scale-105 transition-all duration-200 ${card.iconColor}`}>
                    {card.icon}
                  </div>
                  <span className={`text-[0.6875rem] font-mono px-2 py-0.5 rounded border shrink-0 ${card.tagColor}`}>
                    {card.tag}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
