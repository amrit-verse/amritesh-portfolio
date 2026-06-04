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
      className="min-h-screen flex items-center relative overflow-hidden"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 hero-depth" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
          <div className="max-w-2xl">
            <p
              className={`text-text-secondary text-sm font-mono tracking-[0.26em] uppercase mb-4 transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              Hello, I&apos;m
            </p>

            <h1
              className={`text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.02] tracking-[-0.03em] mb-5 transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "150ms" }}
            >
              <span className="gradient-text">Amritesh Mishra</span>
            </h1>

            <h2
              className={`text-2xl md:text-3xl font-semibold leading-snug text-text-primary mb-4 transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              Building practical software solutions while exploring Linux,
              systems, and cybersecurity.
            </h2>

            <p
              className={`text-base md:text-lg text-text-secondary max-w-xl mb-4 transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "250ms" }}
            >
              Computer Science Engineering Student
            </p>

            <p
              className={`text-sm md:text-base text-text-tertiary max-w-xl leading-7 mb-10 transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              Currently learning Linux Internals, Cybersecurity Fundamentals,
              and System Design.
            </p>

            <div
              className={`grid sm:grid-cols-[auto_1fr] gap-4 items-center mb-10 transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "350ms" }}
            >
              <span className="inline-flex items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300 text-xs font-semibold uppercase tracking-[0.22em] px-3 py-2">
                Available
              </span>
              <p className="text-sm text-text-secondary leading-relaxed">
                Focused on building career-ready systems software and security
                skills while delivering polished applications.
              </p>
            </div>

            <div
              className={`flex flex-wrap gap-3 transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              {/* View Resume — opens in new tab */}
              <a
                href="/resume/Amritesh_Mishra.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent-blue text-white font-medium rounded-xl px-5 py-3 transition-all duration-300 ease-out hover:bg-[#6aa2ff] hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_16px_rgba(79,143,247,0.25)]"
                aria-label="View resume PDF in a new tab"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                View Resume
              </a>
              {/* Download Resume — direct download */}
              <a
                href="/resume/Amritesh_Mishra.pdf"
                download
                className="inline-flex items-center gap-2 bg-bg-card border border-border-subtle text-text-primary font-medium rounded-xl px-5 py-3 transition-all duration-300 ease-out hover:border-border-hover hover:bg-bg-card-hover hover:scale-[1.02] active:scale-[0.98]"
                aria-label="Download resume PDF"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download
              </a>
              {/* GitHub */}
              <a
                href="https://github.com/amrit-verse"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-bg-card border border-border-subtle text-text-primary font-medium rounded-xl px-5 py-3 transition-all duration-300 ease-out hover:border-border-hover hover:bg-bg-card-hover hover:scale-[1.02] active:scale-[0.98]"
                aria-label="Visit GitHub profile"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
              {/* Contact */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-accent-blue font-medium rounded-xl px-5 py-3 transition-all duration-300 ease-out hover:bg-accent-blue-dim hover:scale-[1.02] active:scale-[0.98]"
                aria-label="Navigate to contact section"
              >
                Contact
              </a>
            </div>
          </div>

          <div
            className={`hidden lg:block transition-all duration-1000 ease-out ${
              isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
            }`}
            style={{ transitionDelay: "450ms" }}
          >
            <div className="relative w-64 h-64 xl:w-72 xl:h-72">
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
                  sizes="(max-width: 1024px) 0px, (max-width: 1280px) 256px, 288px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
