import { ScrollReveal } from '@/components/ScrollReveal';

const focusCards = [
  {
    title: 'Software Engineering',
    description:
      'Designing and building full-stack applications with clean architecture, RESTful APIs, and modern deployment practices.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 text-accent-blue"
        aria-hidden="true"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: 'Linux Systems',
    description:
      'Exploring Linux internals, kernel concepts, shell scripting, and system administration for deeper technical understanding.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 text-accent-blue"
        aria-hidden="true"
      >
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
  },
  {
    title: 'Cybersecurity Foundations',
    description:
      'Learning network security, penetration testing fundamentals, and security-first development through hands-on virtual labs.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 text-accent-blue"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Problem Solving',
    description:
      'Developing algorithmic thinking and structured approaches to complex engineering challenges.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 text-accent-blue"
        aria-hidden="true"
      >
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
      </svg>
    ),
  },
];

export default function CurrentFocus() {
  return (
    <section
      id="focus"
      className="py-16 sm:py-24 md:py-32 bg-bg-secondary/50"
      aria-label="Current Focus"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal>
          <span className="section-number">02</span>
          <h2 className="font-bold mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw + 0.5rem, 2.25rem)' }}>
            Current Focus
          </h2>
          <p className="text-text-secondary max-w-2xl">
            Where I&apos;m directing my energy and growth
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-accent-blue to-accent-purple mt-4 mb-12" />
        </ScrollReveal>

        {/* Focus Cards Grid */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 reveal-stagger">
          {focusCards.map((card, index) => (
            <ScrollReveal key={card.title} delay={index * 100}>
              <div className="glass-card p-4 sm:p-6 group cursor-default">
                <div className="w-10 h-10 rounded-lg bg-accent-blue-dim flex items-center justify-center mb-4 group-hover:bg-accent-blue/20 transition-colors duration-300 ease-out">
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
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
