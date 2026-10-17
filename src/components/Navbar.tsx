'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const NAV_LINKS = [
  { label: 'Dossier', href: '#dossier', shortcut: 'D' },
  { label: 'About', href: '#about', shortcut: 'A' },
  { label: 'Projects', href: '#projects', shortcut: 'P' },
  { label: 'Systems Lab', href: '#learning', shortcut: 'L' },
  { label: 'Skills', href: '#skills', shortcut: 'S' },
  { label: 'Timeline', href: '#education', shortcut: 'T' },
  { label: 'Contact', href: '#contact', shortcut: 'C' },
] as const;

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/amrit-verse',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/amriteshmishra0',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'TryHackMe',
    href: 'https://tryhackme.com/p/amriteshmishra729',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-emerald-400" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
] as const;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('dossier');
  const [pillStyle, setPillStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });

  const navRef = useRef<HTMLUListElement | null>(null);
  const isClickScrollingRef = useRef(false);
  const clickScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Measure and update the sliding pill position
  const measurePill = useCallback(() => {
    if (!navRef.current) return;
    const activeLink = navRef.current.querySelector<HTMLAnchorElement>(
      `[data-section="${activeSection}"]`
    );
    if (!activeLink) return;

    const navRect = navRef.current.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    setPillStyle({
      left: linkRect.left - navRect.left,
      top: linkRect.top - navRect.top,
      width: linkRect.width,
      height: linkRect.height,
      opacity: 1,
    });
  }, [activeSection]);

  // Synchronize pill position using requestAnimationFrame to avoid synchronous cascading renders
  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      measurePill();
    });

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        requestAnimationFrame(measurePill);
      });
    }

    return () => cancelAnimationFrame(rafId);
  }, [measurePill]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      measurePill();
      if (window.innerWidth >= 1024 && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [measurePill, isMobileOpen]);

  // Centralized section navigation function
  const navigateToSection = useCallback((sectionId: string) => {
    // 1. Immediately unlock body/html overflow so scrolling is unimpeded
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    setIsMobileOpen(false);

    // 2. Immediately update active section for instant, buttery-smooth pill shift
    setActiveSection(sectionId);

    // 3. Lock scroll-spy updates during smooth scroll animation to prevent pill jitter
    isClickScrollingRef.current = true;
    if (clickScrollTimeoutRef.current) {
      clearTimeout(clickScrollTimeoutRef.current);
    }
    clickScrollTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 850);

    // 4. Smoothly scroll to the target section
    if (sectionId === 'dossier') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const target = document.getElementById(sectionId);
      if (target) {
        const navOffset = 70;
        const targetY = target.getBoundingClientRect().top + window.scrollY - navOffset;
        window.scrollTo({
          top: Math.max(0, targetY),
          behavior: 'smooth',
        });
      }
    }
  }, []);

  // Deterministic scroll-spy & header background handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Skip scroll-spy calculation if user just clicked a nav link
      if (isClickScrollingRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Bottom boundary guard: Contact section
      if (windowHeight + scrollY >= documentHeight - 80) {
        setActiveSection('contact');
        return;
      }

      // Top boundary guard: Dossier section
      if (scrollY < 160) {
        setActiveSection('dossier');
        return;
      }

      // Intermediate sections: determine current in-view section
      const headerOffset = 180;
      let currentSection = 'dossier';

      for (const link of NAV_LINKS) {
        const id = link.href.slice(1);
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= headerOffset) {
            currentSection = id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleGlobalKeys = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        (document.activeElement as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const key = e.key.toLowerCase();
      const shortcutMap: Record<string, string> = {
        d: 'dossier',
        a: 'about',
        p: 'projects',
        l: 'learning',
        s: 'skills',
        t: 'education',
        c: 'contact',
      };

      if (shortcutMap[key]) {
        e.preventDefault();
        navigateToSection(shortcutMap[key]);
      }
    };

    window.addEventListener('keydown', handleGlobalKeys);
    return () => window.removeEventListener('keydown', handleGlobalKeys);
  }, [navigateToSection]);

  // Mobile drawer Escape key handler
  useEffect(() => {
    if (!isMobileOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen]);

  // Mobile drawer body scroll lock
  useEffect(() => {
    if (!isMobileOpen) {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isScrolled
          ? 'backdrop-blur-xl bg-[#08090d]/90 border-b border-zinc-800/80 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between">
        {/* Logo / Developer Node Kicker */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigateToSection('dossier');
          }}
          className="flex items-center gap-2 group tracking-tight"
          aria-label="Amritesh Mishra — Home"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
          <span className="font-mono text-sm font-bold text-white group-hover:text-zinc-200 transition-colors">
            AMRITESH<span className="text-zinc-600">{" // "}</span><span className="text-zinc-400 text-xs font-normal">2026</span>
          </span>
        </a>

        {/* Desktop Navigation with Smooth Sliding White Pill */}
        <ul
          ref={navRef}
          className="relative hidden lg:flex items-center gap-1 bg-[#0c0f16]/70 border border-zinc-800/80 rounded-full p-1.5 backdrop-blur-md"
          role="list"
        >
          {/* Hardware-accelerated sliding white pill */}
          <div
            className={`absolute top-0 left-0 rounded-full bg-white shadow-sm shadow-white/20 pointer-events-none ${
              pillStyle.opacity > 0 ? 'transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]' : ''
            }`}
            style={{
              transform: `translate3d(${pillStyle.left}px, ${pillStyle.top}px, 0)`,
              width: `${pillStyle.width}px`,
              height: `${pillStyle.height}px`,
              opacity: pillStyle.opacity,
            }}
            aria-hidden="true"
          >
            {/* Green point in bottom middle of nav bar white pill */}
            <span
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.95)]"
              aria-hidden="true"
            />
          </div>

          {NAV_LINKS.map((link) => {
            const sectionId = link.href.slice(1);
            const isActive = activeSection === sectionId;

            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  data-section={sectionId}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToSection(sectionId);
                  }}
                  className={`relative z-10 px-3 py-1.5 text-xs font-mono rounded-full transition-colors duration-200 select-none block ${
                    isActive
                      ? 'text-black font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop Fast Actions */}
        <div className="hidden md:flex items-center gap-2.5">
          <a
            href="https://github.com/amrit-verse"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg border border-zinc-800 bg-[#0e1118] flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
            aria-label="GitHub Profile (@amrit-verse)"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a
            href="/resume/Amritesh_Mishra.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono font-semibold px-4 py-2 rounded-lg bg-white text-black hover:bg-zinc-200 transition-all shadow-sm active:scale-[0.98]"
          >
            Resume (PDF)
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="lg:hidden relative w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-zinc-300 hover:text-white border border-zinc-800 bg-[#0e1118] active:scale-95 transition-all duration-200"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          aria-label={isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-menu"
        >
          <div className="w-4 h-3.5 relative flex flex-col justify-between">
            <span
              className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ease-out origin-center ${
                isMobileOpen ? 'rotate-45 translate-y-[6px]' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ease-out ${
                isMobileOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ease-out origin-center ${
                isMobileOpen ? '-rotate-45 -translate-y-[6px]' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-0 z-[100] transition-opacity duration-300 ease-out ${
          isMobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMobileOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300 ease-out ${
            isMobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileOpen(false)}
          aria-label="Close navigation menu"
          tabIndex={isMobileOpen ? 0 : -1}
        />

        <div
          className={`fixed right-0 top-0 z-[101] flex h-dvh w-full flex-col bg-[#07090e] px-4 sm:px-6 pt-[calc(1.25rem+env(safe-area-inset-top))] pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-2xl border-l border-zinc-800 backdrop-blur-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] sm:max-w-md ${
            isMobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('dossier');
              }}
              className="flex items-center gap-2 font-mono text-sm font-bold text-white"
              aria-label="Amritesh Mishra — Home"
              tabIndex={isMobileOpen ? 0 : -1}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
              AMRITESH <span className="text-zinc-600">{"//"}</span> <span className="text-zinc-400 text-xs font-normal">2026</span>
            </a>
            <button
              type="button"
              className="flex h-11 w-11 min-w-[44px] min-h-[44px] items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all duration-200 hover:border-zinc-700 hover:text-white active:scale-95"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close navigation menu"
              tabIndex={isMobileOpen ? 0 : -1}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </svg>
            </button>
          </div>

          <ul className="flex flex-1 flex-col items-stretch justify-center gap-2 py-6" role="list">
            {NAV_LINKS.map((link, index) => {
              const sectionId = link.href.slice(1);
              const isActive = activeSection === sectionId;

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToSection(sectionId);
                    }}
                    className={`flex min-h-12 items-center justify-between rounded-xl border px-4 py-3 text-base font-mono transition-all duration-200 active:scale-[0.98] ${
                      isActive
                        ? 'border-white bg-white text-black font-semibold shadow-md shadow-white/5'
                        : 'border-transparent text-zinc-400 hover:border-zinc-800 hover:bg-zinc-900/60 hover:text-white'
                    }`}
                    style={{
                      transitionDelay: isMobileOpen ? `${index * 35}ms` : '0ms',
                    }}
                    aria-current={isActive ? 'true' : undefined}
                    tabIndex={isMobileOpen ? 0 : -1}
                  >
                    <div className="flex items-center gap-2">
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                      )}
                      <span>{link.label}</span>
                    </div>
                    <span className={`text-xs ${isActive ? 'text-zinc-600 font-semibold' : 'text-zinc-600'}`}>
                      [{link.shortcut}] →
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="border-t border-zinc-800/80 pt-5 space-y-3">
            <div className="flex items-center justify-center gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                    setIsMobileOpen(false);
                  }}
                  className="flex h-11 w-11 min-w-[44px] min-h-[44px] items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all duration-200 hover:border-zinc-700 hover:text-white active:scale-95"
                  aria-label={`Visit ${link.label} profile`}
                  tabIndex={isMobileOpen ? 0 : -1}
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <a
              href="/resume/Amritesh_Mishra.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
                setIsMobileOpen(false);
              }}
              className="flex min-h-12 w-full items-center justify-center rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition-all duration-200 hover:bg-zinc-200 active:scale-[0.98] shadow-md shadow-white/5"
              tabIndex={isMobileOpen ? 0 : -1}
            >
              Download Resume (PDF)
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
