'use client';

import { useState, useEffect, useCallback } from 'react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
] as const;

const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/amrit-verse',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/amrit2004/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
] as const;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Track scroll position for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section using IntersectionObserver
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean
    ) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Pick the one with the highest intersection ratio
          const mostVisible = visibleEntries.reduce((prev, curr) =>
            curr.intersectionRatio > prev.intersectionRatio ? curr : prev
          );
          setActiveSection(mostVisible.target.id);
        }
      },
      {
        rootMargin: '-80px 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Close mobile menu on Escape key
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (!isMobileOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [isMobileOpen]);

  const handleLinkClick = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isScrolled
          ? 'backdrop-blur-xl bg-bg-glass border-b border-border-subtle'
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="gradient-text font-bold text-xl tracking-tight transition-opacity duration-300 hover:opacity-80"
          aria-label="Amritesh Mishra — Home"
        >
          AM
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.slice(1);
            const isActive = activeSection === sectionId;

            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ease-out ${
                    isActive
                      ? 'text-accent-blue'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {link.label}
                  {/* Active indicator dot */}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-blue transition-all duration-300 ${
                      isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    }`}
                    aria-hidden="true"
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg text-text-secondary hover:text-text-primary transition-colors duration-300"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          aria-label={isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-menu"
        >
          <div className="w-5 h-4 relative flex flex-col justify-between">
            <span
              className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ease-out origin-center ${
                isMobileOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ease-out ${
                isMobileOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ease-out origin-center ${
                isMobileOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 z-[100] transition-opacity duration-300 ease-out ${
          isMobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMobileOpen}
      >
        {/* Backdrop */}
        <button
          type="button"
          className={`absolute inset-0 bg-bg-primary/80 backdrop-blur-sm transition-opacity duration-300 ease-out ${
            isMobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileOpen(false)}
          aria-label="Close navigation menu"
          tabIndex={isMobileOpen ? 0 : -1}
        />

        {/* Menu Content */}
        <div
          className={`fixed right-0 top-0 z-[101] flex h-dvh w-full flex-col bg-bg-secondary/90 px-6 py-5 shadow-2xl ring-1 ring-border-hover backdrop-blur-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:max-w-md ${
            isMobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between">
            <a
              href="#"
              onClick={handleLinkClick}
              className="gradient-text font-bold text-xl tracking-tight transition-opacity duration-300 hover:opacity-80"
              aria-label="Amritesh Mishra — Home"
              tabIndex={isMobileOpen ? 0 : -1}
            >
              AM
            </a>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-bg-card/70 text-text-secondary transition-all duration-300 ease-out hover:border-border-hover hover:bg-bg-card-hover hover:text-text-primary active:scale-95"
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

          <ul className="flex flex-1 flex-col items-stretch justify-center gap-3" role="list">
            {NAV_LINKS.map((link, index) => {
              const sectionId = link.href.slice(1);
              const isActive = activeSection === sectionId;

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={handleLinkClick}
                    className={`flex min-h-14 items-center justify-center rounded-2xl border px-6 py-4 text-2xl font-semibold transition-all duration-300 ease-out active:scale-[0.98] ${
                      isActive
                        ? 'border-border-hover bg-accent-blue-dim text-accent-blue shadow-[0_0_24px_rgba(79,143,247,0.14)]'
                        : 'border-transparent text-text-secondary hover:border-border-subtle hover:bg-bg-card/70 hover:text-text-primary'
                    }`}
                    style={{
                      transitionDelay: isMobileOpen ? `${index * 50}ms` : '0ms',
                      transform: isMobileOpen ? 'translateY(0)' : 'translateY(18px)',
                      opacity: isMobileOpen ? 1 : 0,
                    }}
                    aria-current={isActive ? 'true' : undefined}
                    tabIndex={isMobileOpen ? 0 : -1}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div
            className={`border-t border-border-subtle pt-5 transition-all duration-500 ease-out ${
              isMobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <div className="mb-4 flex items-center justify-center gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-border-subtle bg-bg-card/70 text-text-secondary transition-all duration-300 ease-out hover:border-border-hover hover:bg-bg-card-hover hover:text-text-primary active:scale-95"
                  aria-label={`Visit ${link.label} profile`}
                  tabIndex={isMobileOpen ? 0 : -1}
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <a
              href="/resume/Amritesh_Mishra.pdf"
              download
              onClick={handleLinkClick}
              className="flex min-h-12 w-full items-center justify-center rounded-2xl bg-accent-blue px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(79,143,247,0.24)] transition-all duration-300 ease-out hover:bg-[#6aa2ff] active:scale-[0.98]"
              tabIndex={isMobileOpen ? 0 : -1}
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
