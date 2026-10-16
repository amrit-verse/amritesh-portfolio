"use client";

import { useState, useCallback, type ReactNode } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

type ContactLink = {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  external: boolean;
  download?: boolean;
  copyable?: boolean;
};

const CONTACTS: ContactLink[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-emerald-400" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Direct Email",
    value: "contact@amritesh.com.np",
    href: "mailto:contact@amritesh.com.np",
    external: false,
    copyable: true,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    label: "GitHub",
    value: "@amrit-verse",
    href: "https://github.com/amrit-verse",
    external: true,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: "LinkedIn",
    value: "amriteshmishra0",
    href: "https://www.linkedin.com/in/amriteshmishra0",
    external: true,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-emerald-400" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: "TryHackMe",
    value: "@amriteshmishra729",
    href: "https://tryhackme.com/p/amriteshmishra729",
    external: true,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-emerald-400" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    label: "HackerRank",
    value: "@amriteshmishra71",
    href: "https://www.hackerrank.com/profile/amriteshmishra71",
    external: true,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-zinc-300" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
    label: "Resume (PDF)",
    value: "Amritesh_Mishra.pdf",
    href: "/resume/Amritesh_Mishra.pdf",
    external: false,
    download: true,
  },
];

export default function Contact() {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  }, []);

  const handleCopyEmail = useCallback(
    async (e: React.MouseEvent, email: string) => {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(email);
        showToast("Email address copied to clipboard!");
      } catch {
        window.location.href = `mailto:${email}`;
      }
    },
    [showToast]
  );

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32" aria-labelledby="contact-title">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="mb-8 sm:mb-12">
            <p className="section-number mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              09 // DIRECT CONTACT
            </p>
            <h2 id="contact-title" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
              Get in Touch
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm sm:text-base max-w-2xl leading-relaxed">
              Open for software engineering internships, technical collaborations, and discussions about backend systems or Linux.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-start">
          {/* Left: Natural Pitch */}
          <ScrollReveal delay={100}>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">Let&apos;s Build Something</h3>
              <p className="text-xs sm:text-sm sm:text-base text-zinc-300 leading-relaxed mb-4 sm:mb-6">
                I am actively seeking software engineering, backend, or systems internship opportunities. If you need someone who understands Linux, writes clean typed code, and genuinely enjoys solving tricky technical problems — my inbox is open.
              </p>

              {/* Availability Indicator */}
              <div className="flex items-center gap-2.5 mb-6 px-4 py-3 rounded-xl bg-[#090c12] border border-emerald-500/20">
                <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-pulse-dot" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-xs sm:text-sm font-mono text-zinc-200">Available for Summer / Fall 2026 Opportunities</span>
              </div>

              {/* Prominent Direct Email Block */}
              <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-[#0a0d14] border border-zinc-800 hover:border-emerald-500/40 transition-colors group">
                <p className="text-xs text-emerald-400 uppercase tracking-wider mb-2 font-mono">Direct Email</p>
                <a 
                  href="mailto:contact@amritesh.com.np"
                  className="inline-flex items-center gap-3 text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors break-all"
                >
                  contact@amritesh.com.np
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-zinc-400 group-hover:text-emerald-300 transition-all shrink-0" aria-hidden="true">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-zinc-400 cursor-default" title="Based in Chennai, India">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-xs sm:text-sm font-mono">Chennai, India • Anna University</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Contact Links */}
          <ScrollReveal delay={200}>
            <div className="grid gap-2.5">
              {CONTACTS.map((c) => (
                <div key={c.label} className="relative">
                  <a
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    download={c.download || undefined}
                    className="glass-card p-3 sm:p-4 flex items-center gap-3 sm:gap-4 group active:scale-[0.98] transition-all duration-200 border border-zinc-800/80 hover:border-zinc-700"
                    aria-label={
                      c.download
                        ? `Download ${c.label}`
                        : c.external
                        ? `Visit ${c.label} (opens in new tab)`
                        : `Send email to ${c.value}`
                    }
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 bg-[#0c0f16] border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                      {c.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-zinc-200 transition-colors truncate">
                        {c.label}
                      </p>
                      <p className="text-xs text-zinc-400 truncate font-mono mt-0.5">{c.value}</p>
                    </div>

                    {c.copyable ? (
                      <button
                        type="button"
                        onClick={(e) => handleCopyEmail(e, c.value)}
                        className="px-2.5 py-1 text-xs font-mono rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
                        aria-label="Copy email address"
                      >
                        Copy
                      </button>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors shrink-0" aria-hidden="true">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    )}
                  </a>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Copy Toast */}
      <div
        className={`toast ${toastVisible ? "toast-visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span>{toastMessage}</span>
      </div>
    </section>
  );
}
