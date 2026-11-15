import { ScrollReveal } from '@/components/ScrollReveal';

const focusCards = [
  {
    title: 'Backend & Database Architecture',
    tag: 'APIs & Relational Schemas',
    points: [
      'Type-safe REST APIs in Node.js/Express, Python 3.13, and Java (Spring Boot).',
      'Normalized PostgreSQL schemas, Prisma ORM, low-latency indexing, and MongoDB aggregations.'
    ],
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
    title: 'Debian Linux & Terminal Systems',
    tag: 'Daily OS & Bash Workflows',
    points: [
      'Debian 13 daily driver with custom systemd units, process monitoring, and bash automation.',
      'Git-managed dotfiles, terminal ergonomics, and Linux memory & syscall observation.'
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
  },
  {
    title: 'QEMU/KVM Virtual Systems Lab',
    tag: 'Isolated Hypervisor Testbed',
    points: [
      'Isolated debian13 guest on virbr0 virtual NAT bridge (192.168.122.0/24).',
      'Defensive port audits with Nmap 7.95 and passive traffic extraction without touching host OS.'
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Production Platforms & Threat Defense',
    tag: 'SIEM & Audit Engines',
    points: [
      'ReleaseTrace: dual-store engine with automated release diffing & cryptographic evidence.',
      'ThreatDesk: 66 deterministic detection rules with 357 passing automated test suites.'
    ],
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
      className="py-16 sm:py-24 md:py-32 bg-bg-primary border-y border-border-subtle"
      aria-label="Current Focus"
    >
      <div className="max-w-[1520px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <ScrollReveal>
          <div className="mb-8 sm:mb-12">
            <p className="section-number mb-2 flex items-center gap-2 text-xs font-mono tracking-wider text-accent-bronze">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-bronze shadow-[0_0_8px_var(--color-accent-bronze-glow)]" />
              DIMENSION 02 // SYSTEMS &amp; CORE CAPABILITIES
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-text-primary mb-3">
              What I Spend My Time On
            </h2>
            <p className="text-text-secondary text-xs sm:text-sm max-w-2xl leading-relaxed">
              Core engineering specializations where I build backend services, configure Linux kernels, and model security threats.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 reveal-stagger">
          {focusCards.map((card, index) => (
            <ScrollReveal key={card.title} delay={index * 80}>
              <div className="corner-hud h-full p-5 sm:p-6 rounded-2xl bg-bg-card border border-border-subtle hover:border-accent-bronze/50 shadow-card transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg border border-border-subtle bg-bg-secondary text-accent-bronze flex items-center justify-center">
                      {card.icon}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-border-subtle bg-bg-primary text-accent-bronze shrink-0">
                      {card.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-display font-semibold text-text-primary mb-3">
                    {card.title}
                  </h3>
                  <ul className="space-y-2 text-xs font-mono text-text-secondary">
                    {card.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-accent-bronze mt-0.5">›</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
