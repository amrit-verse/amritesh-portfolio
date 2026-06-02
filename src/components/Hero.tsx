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
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-medium rounded-xl px-6 py-3 transition-all duration-300 ease-out hover:shadow-lg hover:shadow-accent-blue/20 hover:scale-[1.02] active:scale-[0.98]"
                aria-label="Download resume"
              >
                Resume
              </a>
              <a
                href="https://github.com/amrit-verse"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-bg-card border border-border-subtle text-text-primary font-medium rounded-xl px-5 py-3 transition-all duration-300 ease-out hover:border-border-hover hover:bg-bg-card-hover hover:scale-[1.02] active:scale-[0.98]"
                aria-label="Visit GitHub profile"
              >
                GitHub
              </a>
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
                  src="/avatar.svg"
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
