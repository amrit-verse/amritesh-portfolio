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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
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

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 top-0 z-40 transition-all duration-300 ease-out ${
          isMobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMobileOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-bg-primary/95 backdrop-blur-xl"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />

        {/* Menu Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
          <ul className="flex flex-col items-center gap-2" role="list">
            {NAV_LINKS.map((link, index) => {
              const sectionId = link.href.slice(1);
              const isActive = activeSection === sectionId;

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={handleLinkClick}
                    className={`block px-6 py-3 text-2xl font-medium rounded-xl transition-all duration-300 ease-out ${
                      isActive
                        ? 'text-accent-blue'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                    style={{
                      transitionDelay: isMobileOpen ? `${index * 50}ms` : '0ms',
                      transform: isMobileOpen ? 'translateY(0)' : 'translateY(16px)',
                      opacity: isMobileOpen ? 1 : 0,
                    }}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
