import { SITE_CONFIG } from "@/lib/config";

const NAV_LINKS = [
  { label: "Dossier", href: "#dossier" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Systems Lab", href: "#learning" },
  { label: "Skills", href: "#skills" },
  { label: "Timeline", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  {
    label: "GitHub Profile",
    href: SITE_CONFIG.links.github,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn Profile",
    href: SITE_CONFIG.links.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "TryHackMe Profile",
    href: SITE_CONFIG.links.tryhackme,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-zinc-300" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    label: "HackerRank Profile",
    href: SITE_CONFIG.links.hackerrank,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-emerald-400" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    label: "Direct Email",
    href: `mailto:${SITE_CONFIG.email}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-zinc-300" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      className="py-12 sm:py-16 border-t border-zinc-800/80 bg-[#050609] pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main Footer Row: Brand, Nav Pills, and Socials */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-10">
          {/* Brand & Dark Motif */}
          <div className="flex flex-col items-center lg:items-start gap-1.5 text-center lg:text-left">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
              <span className="text-base font-bold font-mono tracking-wider text-white">
                AMRITESH MISHRA <span className="text-zinc-600">{"//"}</span> <span className="text-zinc-400 font-normal">2026</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono">
              Debian Linux · Backend Systems · Virtualized Labs · Chennai, India
            </p>
          </div>

          {/* Nav Links: Beautiful touch-friendly pills that wrap symmetrically */}
          <nav aria-label="Footer navigation" className="w-full lg:w-auto">
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-2.5 max-w-xl mx-auto lg:mx-0">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3 py-1.5 text-xs font-mono rounded-lg border border-zinc-800/80 bg-[#090b11] text-zinc-300 hover:text-white hover:border-zinc-600 active:bg-zinc-800 transition-all text-center"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Social Links & Back-To-Top */}
          <div className="flex items-center gap-2.5">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="w-10 h-10 rounded-xl bg-[#0c0f16] border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 active:scale-95 transition-all"
                aria-label={item.label}
              >
                {item.icon}
              </a>
            ))}

            <a
              href="#"
              className="hidden sm:inline-flex items-center gap-1.5 h-10 px-3 rounded-xl bg-[#0c0f16] border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-white hover:border-zinc-600 active:scale-95 transition-all ml-1"
              aria-label="Scroll back to top of page"
            >
              <span>Top</span>
              <span className="text-zinc-400">↑</span>
            </a>
          </div>
        </div>

        {/* Mobile-Only Back to Top Link */}
        <div className="sm:hidden flex justify-center mb-8">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0c0f16] border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-white hover:border-zinc-600 active:scale-95 transition-all"
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <span className="text-zinc-400">↑</span>
          </a>
        </div>

        {/* Cinematic DARK quote & Bottom Bar */}
        <div className="pt-6 border-t border-zinc-800/60 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-zinc-500 font-mono text-center sm:text-left">
          <p className="italic text-zinc-400">
            &ldquo;What we know is a drop, what we don&apos;t know is an ocean.&rdquo; — Winden, 2026
          </p>
          <p>© 2026 Amritesh Mishra. Built with Next.js &amp; Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
