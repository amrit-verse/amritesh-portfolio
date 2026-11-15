'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { TriquetraIcon, openSicMundus } from '@/components/CommandPalette';
import { BrandMark } from '@/components/BrandMark';
import { SoundToggle, useSound } from '@/components/SoundSystem';
import { useExperience } from '@/components/ExperienceContext';

const NAV_LINKS = [
  { label: 'Dossier', href: '#dossier', shortcut: 'D' },
  { label: 'About', href: '#about', shortcut: 'A' },
  { label: 'Projects', href: '#projects', shortcut: 'P' },
  { label: 'Graph', href: '#graph', shortcut: 'G' },
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#9C8058]" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
] as const;

export default function Navbar() {
  const { theme, toggleTheme, renderMode, toggleRenderMode } = useExperience();
  const { playClick } = useSound();
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

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      measurePill();
    });
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        requestAnimationFrame(measurePill);
      });
    }
    return () => cancelAnimationFrame(rafId);
  }, [measurePill]);

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

  const navigateToSection = useCallback((sectionId: string) => {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    setIsMobileOpen(false);
    setActiveSection(sectionId);

    isClickScrollingRef.current = true;
    if (clickScrollTimeoutRef.current) {
      clearTimeout(clickScrollTimeoutRef.current);
    }
    clickScrollTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 850);

    if (sectionId === 'dossier') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 70;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, elementPosition - navOffset),
        behavior: 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (isClickScrollingRef.current) return;

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY + windowHeight;

      if (documentHeight - scrollPosition < 140) {
        setActiveSection('contact');
        return;
      }

      if (window.scrollY < 160) {
        setActiveSection('dossier');
        return;
      }

      const sections = NAV_LINKS.map((link) => link.href.slice(1));
      let currentSection = sections[0];

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180) {
            currentSection = section;
          }
        }
      }

      setActiveSection(currentSection);
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
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

  useEffect(() => {
    const handleGlobalKeys = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const key = e.key.toLowerCase();
      const shortcutMap: Record<string, string> = {
        d: 'dossier',
        a: 'about',
        p: 'projects',
        g: 'graph',
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
          ? 'backdrop-blur-xl bg-bg-glass border-b border-border-subtle shadow-hud'
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-[1520px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-3 sm:py-3.5 flex items-center justify-between">
        {/* Brand Mark with Browser-Tab 'A' logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigateToSection('dossier');
          }}
          className="flex items-center gap-2 group tracking-tight"
          aria-label="Amritesh Mishra — Architecture Home"
        >
          <BrandMark size={28} showText={true} />
        </a>

        {/* Desktop Navigation with Smooth Sliding Warm Ivory Pill */}
        <ul
          ref={navRef}
          className="relative hidden lg:flex items-center gap-1 bg-bg-glass-card border border-border-subtle rounded-full p-1.5 backdrop-blur-md shadow-sm"
          role="list"
        >
          {/* Hardware-accelerated sliding warm ivory pill */}
          <div
            className={`absolute top-0 left-0 rounded-full bg-accent-primary shadow-sm pointer-events-none ${
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
            {/* Bronze indicator dot in bottom middle of nav pill */}
            <span
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-bronze shadow-[0_0_8px_var(--color-accent-bronze)]"
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
                      ? 'text-bg-primary font-semibold'
                      : 'text-text-secondary hover:text-text-primary'
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
        <div className="hidden lg:flex items-center gap-2">
          {/* CONTROL A: Dark / Light Mode Toggle */}
          <button
            type="button"
            onClick={() => {
              playClick();
              toggleTheme();
            }}
            className="w-9 h-9 rounded-lg border border-border-subtle bg-bg-card hover:bg-bg-tertiary flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent-bronze/60 transition-all cursor-pointer"
            aria-label={`Toggle Theme (Current: ${theme === 'dark' ? 'Dark' : 'Light'})`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-accent-bronze">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-accent-bronze">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* CONTROL B: 2D / 3D Rendering Mode Toggle */}
          <button
            type="button"
            onClick={() => {
              playClick();
              toggleRenderMode();
            }}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
              renderMode === '3d'
                ? 'border-accent-bronze/60 bg-accent-bronze/10 text-accent-bronze shadow-[0_0_12px_rgba(156,128,88,0.2)]'
                : 'border-border-subtle bg-bg-card text-text-secondary hover:text-text-primary hover:border-accent-bronze/50'
            }`}
            aria-label={`Toggle Rendering Mode (Current: ${renderMode.toUpperCase()})`}
            title={`Switch to ${renderMode === '3d' ? '2D Lightweight' : '3D Spatial'} rendering`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
              <path d="M12 3l9 4.5-9 4.5-9-4.5L12 3z" />
              <path d="M3 12l9 4.5 9-4.5" />
              <path d="M3 16.5l9 4.5 9-4.5" />
            </svg>
            <span className="font-bold">{renderMode.toUpperCase()}</span>
          </button>

          <SoundToggle />

          <button
            type="button"
            onClick={() => openSicMundus()}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border-subtle bg-bg-card text-xs font-mono text-text-primary hover:border-accent-bronze/60 active:scale-95 transition-all cursor-pointer"
            aria-label="Open Sic Mundus Command Palette (Cmd+K)"
          >
            <TriquetraIcon className="w-3.5 h-3.5 text-accent-bronze" />
            <span>Sic Mundus</span>
            <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-bg-primary border border-border-subtle text-text-secondary font-sans">⌘K</kbd>
          </button>

          <a
            href="https://github.com/amrit-verse"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg border border-border-subtle bg-bg-card flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent-bronze/50 transition-colors"
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
            className="text-xs font-mono font-semibold px-4 py-2 rounded-lg bg-text-primary text-bg-primary hover:bg-accent-bronze hover:text-bg-primary transition-all shadow-sm active:scale-[0.98]"
          >
            Resume (PDF)
          </a>
        </div>

        {/* Mobile Fast Action & Hamburger Button */}
        <div className="lg:hidden flex items-center gap-1.5">
          {/* Mobile Theme Toggle */}
          <button
            type="button"
            onClick={() => {
              playClick();
              toggleTheme();
            }}
            className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl text-text-primary border border-border-subtle bg-bg-card active:scale-95 transition-all"
            aria-label={`Toggle Theme (${theme})`}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-accent-bronze">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-accent-bronze">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Mobile 2D/3D Mode Toggle */}
          <button
            type="button"
            onClick={() => {
              playClick();
              toggleRenderMode();
            }}
            className="h-10 px-2.5 flex items-center gap-1 rounded-xl text-xs font-mono font-bold text-accent-bronze border border-border-subtle bg-bg-card active:scale-95 transition-all"
            aria-label={`Toggle 3D/2D (${renderMode.toUpperCase()})`}
          >
            <span>{renderMode.toUpperCase()}</span>
          </button>

          <SoundToggle />

          <button
            type="button"
            onClick={() => openSicMundus()}
            className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl text-text-primary border border-border-subtle bg-bg-card active:scale-95 transition-all duration-200"
            aria-label="Open Sic Mundus Command Palette (Cmd+K)"
          >
            <TriquetraIcon className="w-4 h-4 text-accent-bronze" />
          </button>

          <button
            type="button"
            className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl text-text-primary border border-border-subtle bg-bg-card active:scale-95 transition-all duration-200"
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
          className={`fixed right-0 top-0 z-[101] flex h-dvh w-full flex-col bg-bg-primary px-4 sm:px-6 pt-[calc(1.25rem+env(safe-area-inset-top))] pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-2xl border-l border-border-subtle backdrop-blur-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] sm:max-w-md ${
            isMobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('dossier');
              }}
              className="flex items-center gap-2"
              aria-label="Amritesh Mishra — Home"
              tabIndex={isMobileOpen ? 0 : -1}
            >
              <BrandMark size={28} showText={true} />
            </a>
            <button
              type="button"
              className="flex h-11 w-11 min-w-[44px] min-h-[44px] items-center justify-center rounded-full border border-border-subtle bg-bg-secondary text-text-secondary transition-all duration-200 hover:border-accent-bronze hover:text-text-primary active:scale-95 cursor-pointer"
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

          {/* Mobile Experience Preference Bar */}
          <div className="grid grid-cols-2 gap-2 pt-3">
            <button
              type="button"
              onClick={() => {
                playClick();
                toggleTheme();
              }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-border-subtle bg-bg-card text-xs font-mono text-text-primary active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              <span className="text-accent-bronze">{theme === 'dark' ? '☀️' : '🌙'}</span>
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playClick();
                toggleRenderMode();
              }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-border-subtle bg-bg-card text-xs font-mono text-text-primary active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              <span className="text-accent-bronze font-bold">{renderMode.toUpperCase()}</span>
              <span>{renderMode === '3d' ? '2D Fast' : '3D Spatial'}</span>
            </button>
          </div>

          {/* Quick Sic Mundus Access in Mobile Drawer */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setIsMobileOpen(false);
                setTimeout(() => {
                  openSicMundus();
                }, 300);
              }}
              className="flex min-h-12 w-full items-center justify-between rounded-xl border border-accent-bronze/40 bg-bg-secondary px-4 py-3 text-sm font-mono text-text-primary hover:bg-bg-tertiary transition-all active:scale-[0.98] cursor-pointer shadow-sm"
              tabIndex={isMobileOpen ? 0 : -1}
            >
              <div className="flex items-center gap-2.5">
                <TriquetraIcon className="w-4 h-4 text-accent-bronze" />
                <span className="font-semibold text-text-primary">Sic Mundus Command Palette</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-bg-primary border border-border-subtle text-accent-bronze font-sans">
                ⌘K
              </span>
            </button>
          </div>

          {/* Mobile Nav Links */}
          <ul className="flex flex-1 flex-col items-stretch justify-center gap-2 py-4" role="list">
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
                        ? 'border-accent-bronze bg-accent-primary text-bg-primary font-semibold shadow-sm'
                        : 'border-transparent text-text-secondary hover:border-border-subtle hover:bg-bg-secondary hover:text-text-primary'
                    }`}
                    style={{
                      transitionDelay: isMobileOpen ? `${index * 30}ms` : '0ms',
                    }}
                    aria-current={isActive ? 'true' : undefined}
                    tabIndex={isMobileOpen ? 0 : -1}
                  >
                    <div className="flex items-center gap-2">
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-bronze" aria-hidden="true" />
                      )}
                      <span>{link.label}</span>
                    </div>
                    <span
                      className={`text-xs font-mono tracking-wider ${
                        isActive ? 'text-accent-bronze' : 'text-text-tertiary'
                      }`}
                    >
                      [{link.shortcut}] →
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Drawer Footer Actions */}
          <div className="border-t border-border-subtle pt-4 space-y-3">
            <div className="flex items-center justify-center gap-3">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 min-w-[44px] min-h-[44px] items-center justify-center rounded-xl border border-border-subtle bg-bg-secondary text-text-secondary transition-all duration-200 hover:border-accent-bronze hover:text-text-primary active:scale-95 shadow-sm"
                  aria-label={`Visit ${item.label} profile`}
                  tabIndex={isMobileOpen ? 0 : -1}
                >
                  {item.icon}
                </a>
              ))}
            </div>

            <a
              href="/resume/Amritesh_Mishra.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 w-full items-center justify-center rounded-xl bg-accent-primary px-5 py-2.5 text-sm font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-bronze hover:text-bg-primary active:scale-[0.98] shadow-md cursor-pointer"
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
