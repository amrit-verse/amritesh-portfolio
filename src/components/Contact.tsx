import { ScrollReveal } from "@/components/ScrollReveal";

const CONTACTS = [
  {
    iconBg: "bg-accent-blue/10",
    iconColor: "text-accent-blue",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email",
    value: "m.amrit2004@gmail.com",
    href: "mailto:m.amrit2004@gmail.com",
    external: false,
  },
  {
    iconBg: "bg-[#333]/30",
    iconColor: "text-text-primary",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    label: "GitHub",
    value: "@amrit-verse",
    href: "https://github.com/amrit-verse",
    external: true,
  },
  {
    iconBg: "bg-[#0077b5]/10",
    iconColor: "text-[#0077b5]",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: "LinkedIn",
    value: "Amritesh Mishra",
    href: "https://www.linkedin.com/in/amrit2004/",
    external: true,
  },
  {
    iconBg: "bg-red-500/10",
    iconColor: "text-red-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: "TryHackMe",
    value: "@amriteshmishra729",
    href: "https://tryhackme.com/p/amriteshmishra729",
    external: true,
  },
  {
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    label: "HackerRank",
    value: "@amriteshmishra71",
    href: "https://www.hackerrank.com/profile/amriteshmishra71",
    external: true,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-bg-secondary/50" aria-labelledby="contact-title">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="mb-12">
            <span className="section-number">09</span>
            <h2 id="contact-title" className="text-3xl md:text-4xl font-bold mb-3">
              Get In Touch
            </h2>
            <p className="text-text-secondary max-w-2xl">
              Let&apos;s connect and build something together
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-accent-blue to-accent-purple mt-4" />
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-start">
          {/* Left: Message */}
          <ScrollReveal delay={100}>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-text-primary">Let&apos;s Talk</h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                I&apos;m always open to discussing new projects, collaborative opportunities,
                or just chatting about technology. Whether you have a question, a project
                idea, or want to connect — feel free to reach out.
              </p>
              <div className="flex items-center gap-3 text-text-secondary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-accent-blue" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-sm">Chennai, India</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Contact Links */}
          <ScrollReveal delay={200}>
            <div className="grid gap-3">
              {CONTACTS.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  className="glass-card p-4 flex items-center gap-4 group"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${c.iconBg} ${c.iconColor}`}>
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary group-hover:text-accent-blue transition-colors">
                      {c.label}
                    </p>
                    <p className="text-xs text-text-tertiary">{c.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
