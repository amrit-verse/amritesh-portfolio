'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-[100dvh] flex items-center relative overflow-hidden pt-24 pb-12 sm:py-0"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 hero-depth" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
          <div className="max-w-2xl">
            {/* Mobile Avatar — centered above content, visible below lg */}
            <div
              className={`lg:hidden flex justify-center mb-6 transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
              }`}
              style={{ transitionDelay: "50ms" }}
            >
              <div className="relative w-28 h-28 sm:w-32 sm:h-32">
                <div
                  className="absolute inset-[-3px] rounded-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-blue blur-sm opacity-60"
                  aria-hidden="true"
                />
                <div className="relative rounded-full overflow-hidden border-2 border-bg-tertiary w-full h-full shadow-[0_8px_32px_rgba(79,143,247,0.15)]">
                  <Image
                    src="/avatar.png"
                    alt="Amritesh Mishra"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 640px) 112px, 128px"
                  />
                </div>
              </div>
            </div>

            {/* Greeting */}
            <p
              className={`text-text-secondary text-xs sm:text-sm font-mono tracking-[0.22em] sm:tracking-[0.26em] uppercase mb-2 sm:mb-3 lg:text-left text-center transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              Hello, I&apos;m
            </p>

            {/* Name */}
            <h1
              className={`font-extrabold leading-[1.05] tracking-[-0.03em] mb-3 sm:mb-4 lg:text-left text-center transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{
                transitionDelay: "150ms",
                fontSize: "clamp(2.25rem, 5vw + 0.5rem, 4.5rem)",
              }}
            >
              <span className="gradient-text">Amritesh Mishra</span>
            </h1>

            {/* Tagline */}
            <h2
              className={`font-semibold leading-snug text-text-primary mb-3 sm:mb-4 text-center lg:text-left transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{
                transitionDelay: "200ms",
                fontSize: "clamp(1.0625rem, 2vw + 0.25rem, 1.875rem)",
              }}
            >
              Full-Stack Developer &amp; Aspiring Security Engineer
            </h2>

            {/* Description — two short lines, not one long string */}
            <div
              className={`space-y-1 mb-5 sm:mb-6 text-center lg:text-left transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "250ms" }}
            >
              <p className="text-[0.8125rem] sm:text-sm text-text-secondary leading-relaxed">
                Computer Science Engineering Student
              </p>
              <p className="text-[0.8125rem] sm:text-sm text-text-tertiary leading-relaxed">
                Linux · Backend Systems · Cybersecurity · Clean Architecture
              </p>
            </div>

            <div
              className={`flex justify-center lg:justify-start mb-6 sm:mb-7 transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 border border-emerald-400/20 px-3.5 py-2">
              <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-pulse-dot" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-xs sm:text-[0.8125rem] font-medium text-emerald-300">Open to Internships &amp; Opportunities</span>
              </span>
            </div>

            {/* CTA Buttons — 44px min touch targets */}
            <div
              className={`flex flex-wrap justify-center lg:justify-start gap-2.5 sm:gap-3 mb-6 sm:mb-8 transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "350ms" }}
            >
              {/* Primary CTA */}
              <a
                href="/resume/Amritesh_Mishra.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-accent-blue text-white font-semibold rounded-xl min-h-[2.75rem] px-5 sm:px-6 text-[0.8125rem] sm:text-sm transition-all duration-300 ease-out hover:bg-[#6aa2ff] hover:scale-[1.02] active:scale-[0.97] shadow-[0_4px_20px_rgba(79,143,247,0.3)]"
                aria-label="View resume PDF in a new tab"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                View Resume
              </a>
              {/* Secondary CTAs */}
              <a
                href="https://github.com/amrit-verse"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-bg-card border border-border-subtle text-text-primary font-medium rounded-xl min-h-[2.75rem] px-4 sm:px-5 text-[0.8125rem] sm:text-sm transition-all duration-300 ease-out hover:border-border-hover hover:bg-bg-card-hover active:scale-[0.97]"
                aria-label="Visit GitHub profile"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/amriteshmishra0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-bg-card border border-border-subtle text-text-primary font-medium rounded-xl min-h-[2.75rem] px-4 sm:px-5 text-[0.8125rem] sm:text-sm transition-all duration-300 ease-out hover:border-border-hover hover:bg-bg-card-hover active:scale-[0.97]"
                aria-label="Visit LinkedIn profile"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-1.5 text-accent-blue font-medium rounded-xl min-h-[2.75rem] px-4 text-[0.8125rem] sm:text-sm transition-all duration-300 ease-out hover:bg-accent-blue-dim active:scale-[0.97]"
                aria-label="Navigate to contact section"
              >
                Contact
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
            </div>

            {/* Quick Stats */}
            <div
              className={`grid grid-cols-4 gap-2.5 sm:gap-3 transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "400ms" }}
              aria-label="Quick stats"
            >
              {[
                { value: "4+", label: "Projects" },
                { value: "8.55", label: "CGPA" },
                { value: "5+", label: "Labs" },
                { value: "10+", label: "Repos" },
              ].map((stat) => (
                <div key={stat.label} className="text-center py-2.5 sm:py-3 rounded-xl bg-bg-card/50 border border-border-subtle backdrop-blur-sm">
                  <p className="text-sm sm:text-lg font-bold gradient-text leading-none">{stat.value}</p>
                  <p className="text-[0.625rem] sm:text-xs text-text-tertiary mt-1 uppercase tracking-wider leading-none">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Scroll indicator — mobile only */}
            <div
              className={`flex justify-center mt-8 sm:hidden transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "500ms" }}
              aria-hidden="true"
            >
              <div className="flex flex-col items-center gap-1.5 text-text-tertiary">
                <span className="text-[0.625rem] uppercase tracking-[0.2em] font-mono">Scroll</span>
                <svg className="w-4 h-4 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14" />
                  <path d="M19 12l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Avatar — desktop only */}
          <div
            className={`hidden lg:block transition-all duration-1000 ease-out ${
              isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <div className="relative w-80 h-80 xl:w-[22rem] xl:h-[22rem]">
              <div
                className="absolute inset-[-3px] rounded-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-blue blur-sm opacity-55"
                aria-hidden="true"
              />
              <div className="relative rounded-full overflow-hidden border-2 border-bg-tertiary w-full h-full">
                <Image
                  src="/avatar.png"
                  alt="Amritesh Mishra"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 0px, (max-width: 1280px) 320px, 352px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
