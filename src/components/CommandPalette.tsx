'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

export type CommandCategory = 'Actions' | 'Projects' | 'Navigation' | 'Sic Mundus';

export interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: CommandCategory;
  badge?: string;
  keywords: string[];
  icon: 'resume' | 'mail' | 'chat' | 'terminal' | 'github' | 'linkedin' | 'triquetra' | 'code' | 'compass' | 'cycle';
  run: (ctx: { close: () => void; setCopied: (val: boolean) => void }) => void;
}

export function openSicMundus() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-sic-mundus'));
  }
}

/**
 * Geometric Triquetra (Trinity / Time-Loop Knot) SVG Icon
 * Authentic symbol of Sic Mundus from the DARK series
 */
export function TriquetraIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.5C7.5 7 5.5 12 7.5 16.5 9.5 21 14.5 21 16.5 16.5 18.5 12 16.5 7 12 2.5Z" />
      <path d="M4 17.5C6 13 10 10.5 15 11.5 20 12.5 21 17.5 17 20 13 22.5 7 21 4 17.5Z" />
      <path d="M20 17.5C18 13 14 10.5 9 11.5 4 12.5 3 17.5 7 20 11 22.5 17 21 20 17.5Z" />
      <circle cx="12" cy="14" r="4.5" strokeDasharray="1.5 1.5" className="opacity-40" />
    </svg>
  );
}

/**
 * Der Anfang (Infinity / Lemniscate) SVG Icon
 */
export function InfinityIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.178 8c5.096 0 5.096 8 0 8-2.673 0-4.66-2.585-6.178-4 1.518-1.415 3.505-4 6.178-4zm-12.356 0c-5.096 0-5.096 8 0 8 2.673 0 4.66-2.585 6.178-4-1.518-1.415-3.505-4-6.178-4z" />
    </svg>
  );
}

const COMMANDS: CommandItem[] = [
  // ─── High-Utility Quick Actions ───
  {
    id: 'act-resume',
    title: 'Download Resume (PDF)',
    subtitle: 'Direct PDF download: verified coursework, systems engineering & project record',
    category: 'Actions',
    badge: 'PDF',
    keywords: ['resume', 'cv', 'download', 'pdf', 'academics', 'grades', 'hire', 'pdf resume'],
    icon: 'resume',
    run: ({ close }) => {
      close();
      window.open('/resume/Amritesh_Mishra.pdf', '_blank', 'noopener,noreferrer');
    },
  },
  {
    id: 'act-email',
    title: 'Copy Direct Email Address',
    subtitle: 'contact@amritesh.com.np — 1-click clipboard copy for recruiters',
    category: 'Actions',
    badge: 'Copy',
    keywords: ['email', 'contact', 'mail', 'write', 'reach', 'address', 'gmail', 'hire'],
    icon: 'mail',
    run: ({ setCopied }) => {
      navigator.clipboard.writeText('contact@amritesh.com.np');
      setCopied(true);
    },
  },
  {
    id: 'act-chat',
    title: 'Summon AI Intelligence Layer',
    subtitle: 'Ask Amrit\'s portfolio AI assistant about projects, stack, or background',
    category: 'Actions',
    badge: 'Gemini AI',
    keywords: ['ai', 'chat', 'assistant', 'bot', 'gemini', 'ask', 'prompt', 'dossier'],
    icon: 'chat',
    run: ({ close }) => {
      close();
      window.dispatchEvent(new CustomEvent('open-chatbot'));
    },
  },
  {
    id: 'act-workstation',
    title: 'Inspect Workstation ($ fastfetch)',
    subtitle: 'Hardware specs, Debian 12 environment, KVM/QEMU virbr0 virtual lab',
    category: 'Actions',
    badge: 'Dossier',
    keywords: ['fastfetch', 'specs', 'debian', 'workstation', 'hardware', 'system', 'kvm', 'linux'],
    icon: 'terminal',
    run: ({ close }) => {
      close();
      window.dispatchEvent(new CustomEvent('select-dossier-tab', { detail: 'workstation' }));
      const el = document.getElementById('dossier');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
  },
  {
    id: 'act-github',
    title: 'Visit GitHub Profile (@amrit-verse)',
    subtitle: 'Open source repositories, bash scripts, and backend architectures',
    category: 'Actions',
    badge: 'External',
    keywords: ['github', 'git', 'repo', 'commits', 'code', 'open source'],
    icon: 'github',
    run: ({ close }) => {
      close();
      window.open('https://github.com/amrit-verse', '_blank', 'noopener,noreferrer');
    },
  },
  {
    id: 'act-linkedin',
    title: 'Connect on LinkedIn',
    subtitle: 'Professional profile and academic updates',
    category: 'Actions',
    badge: 'External',
    keywords: ['linkedin', 'profile', 'connect', 'networking'],
    icon: 'linkedin',
    run: ({ close }) => {
      close();
      window.open('https://www.linkedin.com/in/amriteshmishra0', '_blank', 'noopener,noreferrer');
    },
  },

  // ─── Direct Project Jumps (Auto-expands project in Projects section) ───
  {
    id: 'proj-telsa',
    title: '01 // Terai Law Students Association (TeLSA)',
    subtitle: 'Production CMS & legal publishing portal (Next.js 16, Prisma, Auth.js RBAC)',
    category: 'Projects',
    badge: 'Full-Stack',
    keywords: ['telsa', 'law', 'cms', 'nextjs', 'prisma', 'postgresql', 'authjs', 'rbac'],
    icon: 'code',
    run: ({ close }) => {
      close();
      window.dispatchEvent(new CustomEvent('select-project', { detail: '01' }));
      const el = document.getElementById('projects');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
  },
  {
    id: 'proj-edutrack',
    title: '02 // EduTrack (Attendance & OD Calculator)',
    subtitle: 'Anna University 75% statutory detention calculator & timetable engine',
    category: 'Projects',
    badge: 'Systems',
    keywords: ['edutrack', 'attendance', 'guardian', '75', 'calculator', 'anna university', 'bunk'],
    icon: 'code',
    run: ({ close }) => {
      close();
      window.dispatchEvent(new CustomEvent('select-project', { detail: '02' }));
      const el = document.getElementById('projects');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
  },
  {
    id: 'proj-expense',
    title: '03 // Smart Expense Tracker',
    subtitle: 'Financial analytics engine with MongoDB aggregation pipelines ($match, $group)',
    category: 'Projects',
    badge: 'Backend',
    keywords: ['expense', 'finance', 'tracker', 'mongodb', 'aggregation', 'jwt', 'chartjs'],
    icon: 'code',
    run: ({ close }) => {
      close();
      window.dispatchEvent(new CustomEvent('select-project', { detail: '03' }));
      const el = document.getElementById('projects');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
  },
  {
    id: 'proj-library',
    title: '04 // Academic Library Management System',
    subtitle: 'Tiered Spring Boot Java REST backend deployed on Railway, Render & Vercel',
    category: 'Projects',
    badge: 'Spring Boot',
    keywords: ['library', 'spring boot', 'java', 'mysql', 'railway', 'render', 'rest api'],
    icon: 'code',
    run: ({ close }) => {
      close();
      window.dispatchEvent(new CustomEvent('select-project', { detail: '04' }));
      const el = document.getElementById('projects');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
  },
  {
    id: 'proj-shopease',
    title: '05 // ShopEase E-Commerce Platform',
    subtitle: 'MERN cart state machine with Razorpay cryptographic webhook verification',
    category: 'Projects',
    badge: 'Payments',
    keywords: ['shopease', 'ecommerce', 'store', 'cart', 'razorpay', 'webhooks', 'mern'],
    icon: 'code',
    run: ({ close }) => {
      close();
      window.dispatchEvent(new CustomEvent('select-project', { detail: '05' }));
      const el = document.getElementById('projects');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
  },
  {
    id: 'proj-lawyers',
    title: '06 // Entertain Lawyers CMS Architecture',
    subtitle: 'WordPress to Next.js 16 migration, Backblaze B2 S3 storage & Prisma 6',
    category: 'Projects',
    badge: 'Migration',
    keywords: ['entertain lawyers', 'lawyers', 'wordpress migration', 'backblaze', 's3', 'prisma'],
    icon: 'code',
    run: ({ close }) => {
      close();
      window.dispatchEvent(new CustomEvent('select-project', { detail: '06' }));
      const el = document.getElementById('projects');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
  },
  {
    id: 'proj-diodescan',
    title: '07 // DIODESCAN — Smart India Hackathon 2026',
    subtitle: 'Team Leader for Team Sudo tackling NTRO Threat Detection challenge SIH26145',
    category: 'Projects',
    badge: 'SIH 2026',
    keywords: ['diodescan', 'sih', 'hackathon', 'ntro', 'team sudo', 'threat detection', 'cybersecurity'],
    icon: 'code',
    run: ({ close }) => {
      close();
      window.dispatchEvent(new CustomEvent('select-project', { detail: '07' }));
      const el = document.getElementById('projects');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
  },

  // ─── Section Navigation ───
  {
    id: 'nav-dossier',
    title: '00 // System Inspector & Dossier',
    subtitle: 'Interactive hardware specs, 30s skim, virtual lab, and certifications',
    category: 'Navigation',
    badge: 'Hero',
    keywords: ['dossier', 'hero', 'top', 'inspector', 'specs', 'home'],
    icon: 'compass',
    run: ({ close }) => {
      close();
      document.getElementById('dossier')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
  },
  {
    id: 'nav-about',
    title: '01 // The Three Cycles Timeline (About)',
    subtitle: 'Cycle I (Nepal Origin) → Cycle II (Debian & Chennai) → Cycle III (2029 Horizon)',
    category: 'Navigation',
    badge: 'Timeline',
    keywords: ['about', 'origin', 'timeline', 'three cycles', 'journey', 'nepal', 'chennai'],
    icon: 'cycle',
    run: ({ close }) => {
      close();
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
  },
  {
    id: 'nav-focus',
    title: '02 // Current Technical Focus',
    subtitle: 'Software engineering, Linux internals, cybersecurity foundations, and algorithms',
    category: 'Navigation',
    badge: 'Focus',
    keywords: ['focus', 'pillars', 'kernel', 'cybersecurity', 'engineering'],
    icon: 'compass',
    run: ({ close }) => {
      close();
      document.getElementById('focus')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
  },
  {
    id: 'nav-projects',
    title: '03 // Featured 7 Projects Showcase',
    subtitle: 'Case studies, architectural diagrams, data flows, and code links',
    category: 'Navigation',
    badge: 'Showcase',
    keywords: ['projects', 'work', 'portfolio', 'apps', 'code'],
    icon: 'code',
    run: ({ close }) => {
      close();
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
  },
  {
    id: 'nav-learning',
    title: '04 // Systems Lab & Hands-On Practice',
    subtitle: 'TryHackMe penetration testing, HackerRank, QEMU/KVM virtual networks',
    category: 'Navigation',
    badge: 'Lab',
    keywords: ['learning', 'lab', 'tryhackme', 'hackerrank', 'virtual labs', 'qemu', 'kvm'],
    icon: 'terminal',
    run: ({ close }) => {
      close();
      document.getElementById('learning')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
  },
  {
    id: 'nav-skills',
    title: '05 // Technical Skills Stack',
    subtitle: 'Languages, frameworks, databases, Linux tools, and systems comfort',
    category: 'Navigation',
    badge: 'Skills',
    keywords: ['skills', 'tech', 'stack', 'languages', 'python', 'java', 'typescript', 'linux'],
    icon: 'compass',
    run: ({ close }) => {
      close();
      document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
  },
  {
    id: 'nav-education',
    title: '06 // Academic Credentials & Education',
    subtitle: 'Excel Engineering College (Anna University), Xavier International, Jana Jyoti',
    category: 'Navigation',
    badge: 'Academics',
    keywords: ['education', 'college', 'school', 'anna university', 'degree', 'cgpa', 'grades'],
    icon: 'compass',
    run: ({ close }) => {
      close();
      document.getElementById('education')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
  },
  {
    id: 'nav-contact',
    title: '07 // Direct Contact & Inquiries',
    subtitle: 'Get in touch for internships, engineering roles, or tech collaborations',
    category: 'Navigation',
    badge: 'Contact',
    keywords: ['contact', 'reach', 'inquiry', 'message', 'email', 'social'],
    icon: 'mail',
    run: ({ close }) => {
      close();
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
  },

  // ─── DARK Series / Sic Mundus Lore & Easter Eggs ───
  {
    id: 'sm-cave',
    title: 'Sic Mundus Creatus Est // The Winden Cave Passage',
    subtitle: '"Thus the world was created." Loop back to the origin of the portfolio.',
    category: 'Sic Mundus',
    badge: '∞ Loop to Origin',
    keywords: ['sic mundus', 'sic mundus creatus est', 'dark', 'winden', 'cave', 'loop', 'jonas', 'noah', 'origin'],
    icon: 'triquetra',
    run: ({ close }) => {
      close();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
  {
    id: 'sm-cycles',
    title: 'The Three Cycles of Amrit\'s Engineering Path',
    subtitle: 'Cycle I (Nepal Origin) → Cycle II (Debian & Chennai) → Cycle III (Distributed Systems)',
    category: 'Sic Mundus',
    badge: 'Three Cycles',
    keywords: ['three cycles', 'cycle', '33 years', 'time', 'dark series', 'causal loop', 'about'],
    icon: 'cycle',
    run: ({ close }) => {
      close();
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
  },
  {
    id: 'sm-apparatus',
    title: 'The Clockmaker\'s Apparatus (HG Tannhaus)',
    subtitle: 'Deterministic state machine. Inspect the workstation fastfetch diagnostics.',
    category: 'Sic Mundus',
    badge: 'Tannhaus Device',
    keywords: ['tannhaus', 'apparatus', 'machine', 'clockmaker', 'brass', 'device', 'fastfetch'],
    icon: 'terminal',
    run: ({ close }) => {
      close();
      window.dispatchEvent(new CustomEvent('select-dossier-tab', { detail: 'workstation' }));
      document.getElementById('dossier')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
  },
  {
    id: 'sm-quote',
    title: '"What we know is a drop, what we don\'t know is an ocean"',
    subtitle: 'Winden timeline quote carved in the footer. Jump to the bottom loop.',
    category: 'Sic Mundus',
    badge: 'Winden 2026',
    keywords: ['quote', 'drop ocean', 'winden', 'footer', 'dark', 'tannhaus quote'],
    icon: 'triquetra',
    run: ({ close }) => {
      close();
      const footer = document.querySelector('footer');
      footer?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
  },
  {
    id: 'sm-chat-easter-egg',
    title: 'Ask AI: "Sic Mundus Creatus Est"',
    subtitle: 'Unlock the AI\'s perspective on DARK, deterministic state loops, and backend systems.',
    category: 'Sic Mundus',
    badge: 'Secret Lore',
    keywords: ['secret', 'easter egg', 'ask dark', 'sic mundus prompt', 'chat lore'],
    icon: 'chat',
    run: ({ close }) => {
      close();
      window.dispatchEvent(new CustomEvent('open-chatbot-with-prompt', { detail: 'Sic Mundus Creatus Est' }));
    },
  },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const openPalette = useCallback(() => {
    setQuery('');
    setSelectedIndex(0);
    setCopied(false);
    setIsOpen(true);
  }, []);

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setSelectedIndex(0);
    setCopied(false);
  }, []);

  // Global Keyboard Shortcuts (⌘K / Ctrl+K and Custom Events)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          closePalette();
        } else {
          openPalette();
        }
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        closePalette();
      }
    };

    const handleOpenEvent = () => {
      openPalette();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-sic-mundus', handleOpenEvent);

    // Deep link query parameter support (deferred to avoid synchronous cascading render)
    let deepLinkTimer: NodeJS.Timeout | null = null;
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('palette') === '1' || params.get('sic-mundus') === '1') {
        deepLinkTimer = setTimeout(() => {
          openPalette();
        }, 50);
      }
    }

    return () => {
      if (deepLinkTimer) clearTimeout(deepLinkTimer);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-sic-mundus', handleOpenEvent);
    };
  }, [isOpen, openPalette, closePalette]);

  // Lock body scroll while palette is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }
    document.body.style.overflow = '';
  }, [isOpen]);

  // Reset copied status after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2200);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  // Filter commands by query
  const filteredCommands = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMANDS;

    return COMMANDS.filter((cmd) => {
      if (cmd.title.toLowerCase().includes(q)) return true;
      if (cmd.subtitle.toLowerCase().includes(q)) return true;
      if (cmd.category.toLowerCase().includes(q)) return true;
      if (cmd.badge && cmd.badge.toLowerCase().includes(q)) return true;
      return cmd.keywords.some((k) => k.toLowerCase().includes(q));
    });
  }, [query]);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector<HTMLElement>(`[data-cmd-index="${selectedIndex}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  // Keyboard navigation within the palette
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const current = filteredCommands[selectedIndex];
      if (current) {
        current.run({
          close: () => setIsOpen(false),
          setCopied,
        });
      }
    }
  };

  const executeItem = useCallback(
    (cmd: CommandItem) => {
      cmd.run({
        close: () => setIsOpen(false),
        setCopied,
      });
    },
    []
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-24 bg-black/80 backdrop-blur-md transition-all duration-200"
      onClick={() => closePalette()}
      role="dialog"
      aria-modal="true"
      aria-label="Sic Mundus Command Palette"
    >
      <div
        className="w-full max-w-2xl bg-[#090b11] border border-zinc-800 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_25px_rgba(52,211,153,0.12)] overflow-hidden flex flex-col max-h-[82vh] animate-in fade-in-0 zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ─── Header: Sic Mundus Brand & Latin Motto ─── */}
        <div className="px-4 sm:px-5 py-3 border-b border-zinc-800/80 bg-[#07080d] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <TriquetraIcon className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold tracking-wider text-white">
                  SIC MUNDUS CREATUS EST
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800/90 text-zinc-300 border border-zinc-700">
                  COMMAND PALETTE
                </span>
              </div>
              <p className="text-[10px] font-mono text-zinc-300 italic">
                &ldquo;Der Anfang ist das Ende und das Ende ist der Anfang&rdquo;
              </p>
            </div>
          </div>

          {/* Close Pill Button */}
          <button
            type="button"
            onClick={() => closePalette()}
            className="px-2 py-1 rounded bg-[#10131d] border border-zinc-800 text-[11px] font-mono text-zinc-400 hover:text-white transition-colors"
            aria-label="Close command palette (Escape)"
          >
            Esc
          </button>
        </div>

        {/* ─── Search Input Bar ─── */}
        <div className="px-4 sm:px-5 py-3.5 border-b border-zinc-800/80 bg-[#0a0d14] flex items-center gap-3">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-emerald-400 shrink-0"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Type a command, project, action, or DARK lore... (e.g. 'resume', 'telsa', 'dark', 'email')"
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none font-mono"
            aria-label="Search commands"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSelectedIndex(0);
              }}
              className="text-xs text-zinc-500 hover:text-zinc-300 font-mono px-1.5 py-0.5 rounded"
              aria-label="Clear search query"
            >
              Clear
            </button>
          )}
        </div>

        {/* ─── Copied Toast Indicator (Transient Feedback) ─── */}
        {copied && (
          <div className="bg-emerald-500/15 border-b border-emerald-500/30 px-4 py-2 flex items-center justify-between text-xs font-mono text-emerald-300 animate-in fade-in">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Copied <strong>contact@amritesh.com.np</strong> to clipboard!
            </span>
            <span className="text-[10px] text-emerald-400/80">Ready to paste</span>
          </div>
        )}

        {/* ─── Filtered Commands List ─── */}
        <div ref={listRef} className="overflow-y-auto p-2 sm:p-3 space-y-1 divide-y divide-zinc-900/60 max-h-[55vh]">
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center">
              <TriquetraIcon className="w-8 h-8 text-zinc-700 mx-auto mb-3" />
              <p className="text-sm font-mono text-zinc-400">No matching command in the timeline.</p>
              <p className="text-xs font-mono text-zinc-600 mt-1">
                Try searching for &quot;resume&quot;, &quot;telsa&quot;, &quot;dark&quot;, &quot;email&quot;, or &quot;about&quot;.
              </p>
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={cmd.id}
                  data-cmd-index={idx}
                  onClick={() => executeItem(cmd)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`group flex items-center justify-between gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-zinc-800/90 text-white shadow-sm border border-emerald-500/40'
                      : 'text-zinc-300 hover:bg-zinc-900/80 border border-transparent'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="flex items-start sm:items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 transition-colors ${
                        isSelected
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-[#121520] text-zinc-400 border border-zinc-800 group-hover:text-zinc-200'
                      }`}
                    >
                      {cmd.icon === 'resume' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                        </svg>
                      )}
                      {cmd.icon === 'mail' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      )}
                      {cmd.icon === 'chat' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      )}
                      {cmd.icon === 'terminal' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
                          <polyline points="4 17 10 11 4 5" />
                          <line x1="12" y1="19" x2="20" y2="19" />
                        </svg>
                      )}
                      {cmd.icon === 'github' && (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      )}
                      {cmd.icon === 'linkedin' && (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      )}
                      {cmd.icon === 'triquetra' && <TriquetraIcon className="w-4 h-4" />}
                      {cmd.icon === 'code' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
                          <polyline points="16 18 22 12 16 6" />
                          <polyline points="8 6 2 12 8 18" />
                        </svg>
                      )}
                      {cmd.icon === 'compass' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
                          <circle cx="12" cy="12" r="10" />
                          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                        </svg>
                      )}
                      {cmd.icon === 'cycle' && <InfinityIcon className="w-4 h-4" />}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs sm:text-sm font-medium tracking-tight truncate text-white">
                          {cmd.title}
                        </p>
                        {cmd.badge && (
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0 ${
                              cmd.category === 'Sic Mundus'
                                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                                : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                            }`}
                          >
                            {cmd.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] sm:text-xs text-zinc-400 truncate mt-0.5 font-mono">
                        {cmd.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Right Action Hint */}
                  <div className="shrink-0 flex items-center gap-1.5 pl-2">
                    <span className="hidden sm:inline-block text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      {cmd.category}
                    </span>
                    <span
                      className={`text-[11px] font-mono px-1.5 py-0.5 rounded transition-colors ${
                        isSelected ? 'bg-white text-black font-semibold' : 'text-zinc-600 bg-zinc-900 border border-zinc-800'
                      }`}
                    >
                      ↵
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ─── Footer: Keyboard Navigation Hints ─── */}
        <div className="px-4 py-2.5 bg-[#07090e] border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">↑↓</kbd>
              <span>to navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">↵</kbd>
              <span>to select</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">esc</kbd>
              <span>to close</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <TriquetraIcon className="w-3 h-3 text-emerald-400" />
            <span>Sic Mundus // Causal Command Center</span>
          </div>
        </div>
      </div>
    </div>
  );
}
