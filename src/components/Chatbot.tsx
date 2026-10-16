'use client';

import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { SITE_CONFIG, ACADEMIC_INFO } from '@/lib/config';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestions?: string[];
}

const DEFAULT_SUGGESTIONS = [
  'What is his tech stack?',
  'Tell me about TeLSA & projects',
  'What is his Linux lab setup?',
  'Academic CGPA & College',
  'Smart India Hackathon (SIH)',
  'How to contact Amritesh?',
];

// Rich, verified knowledge engine with 0ms latency and high-precision intent matching
function queryKnowledgeBase(query: string): { reply: string; suggestions: string[] } {
  const q = query.toLowerCase().trim();

  // 1. CGPA / Academic / College
  if (
    q.includes('cgpa') ||
    q.includes('gpa') ||
    q.includes('grade') ||
    q.includes('marks') ||
    q.includes('score') ||
    q.includes('anna university') ||
    q.includes('excel engineering') ||
    q.includes('college') ||
    q.includes('university') ||
    q.includes('education') ||
    q.includes('degree') ||
    q.includes('school')
  ) {
    return {
      reply: `**Academic Dossier & Qualifications**\n\n• **Current Degree**: ${ACADEMIC_INFO.degree} (${ACADEMIC_INFO.startYear} — ${ACADEMIC_INFO.graduationYear}, progressing into ${ACADEMIC_INFO.currentYearText})\n• **Institution**: ${ACADEMIC_INFO.college} (Affiliated with **${ACADEMIC_INFO.university}**)\n• **Verified CGPA**: **${ACADEMIC_INFO.cgpa} / ${ACADEMIC_INFO.cgpaScale}**\n\n**Prior Educational Background**:\n• **Higher Secondary (+2 Science PCM)**: Xavier International Secondary School, Kathmandu (GPA: **3.27 / 4.00**)\n• **Secondary Education Examination (SEE)**: Jana Jyoti Secondary School, Rautahat, Nepal (GPA: **3.60 / 4.00**)`,
      suggestions: [
        'What is his tech stack?',
        'Tell me about TeLSA & projects',
        'What is his Linux lab setup?',
        'Download Resume',
      ],
    };
  }

  // 2. Specific Project: TeLSA
  if (q.includes('telsa') || q.includes('terai') || q.includes('law student')) {
    return {
      reply: `**Terai Law Students Association (TeLSA) — Production Platform**\n\n• **Role**: Full-Stack Developer & Maintainer\n• **Problem Solved**: The association was previously managing student memberships, notices, and legal publications across scattered WhatsApp chats and disorganized spreadsheets.\n• **Architecture & Tech**: Next.js (App Router), React, Prisma ORM, PostgreSQL, Auth.js RBAC, Cloudflare R2, Cloudinary, Tailwind CSS.\n• **Standout Impact**: 100% role-based access control (RBAC) coverage for active law students, automated membership registration, and structured legal study resource taxonomy.`,
      suggestions: [
        'Tell me about Attendance OS',
        'Tell me about Smart Expense Tracker',
        'What is his tech stack?',
        'View on GitHub',
      ],
    };
  }

  // 3. Specific Project: Attendance Guardian / Attendance OS
  if (q.includes('attendance') || q.includes('guardian') || q.includes('bunk') || q.includes('75%')) {
    return {
      reply: `**Attendance OS / Attendance Guardian — Academic Utility**\n\n• **Role**: Creator & Systems Architect\n• **Problem Solved**: Anna University enforces strict 75% minimum attendance regulations with severe detention consequences. Students previously lacked real-time visibility into safe bunk margins and recovery requirements.\n• **Architecture & Tech**: Next.js, TypeScript, LocalStorage API, Tailwind CSS.\n• **Key Features**: 0ms client-side latency, deterministic bunk threshold predictor, and QR + geolocation validation prototype to eliminate proxy roll-calls.`,
      suggestions: [
        'Tell me about TeLSA & projects',
        'Tell me about Smart Expense Tracker',
        'Academic CGPA & College',
      ],
    };
  }

  // 4. Specific Project: Smart Expense Tracker
  if (q.includes('expense') || q.includes('tracker') || q.includes('finance') || q.includes('spending')) {
    return {
      reply: `**Smart Expense Tracker — Financial Analytics Service**\n\n• **Role**: Backend Developer\n• **Problem Solved**: Most budget apps rely on inefficient client-side data looping that lags as transaction records grow.\n• **Architecture & Tech**: Node.js, Express.js, MongoDB, Mongoose, JWT Auth, Chart.js.\n• **Standout Optimization**: Employs multi-stage MongoDB aggregation pipelines (\`$match\`, \`$group\`, \`$project\`) computing monthly categorized expenditures server-side with sub-50ms query response times and JWT session rotation.`,
      suggestions: [
        'Tell me about Library Management System',
        'Tell me about TeLSA & projects',
        'What is his tech stack?',
      ],
    };
  }

  // 5. Specific Project: Library Management System
  if (q.includes('library') || q.includes('spring boot') || q.includes('lms') || q.includes('book')) {
    return {
      reply: `**Library Management System — Full-Stack Academic Architecture**\n\n• **Role**: Backend & Systems Developer\n• **Architecture & Tech**: Spring Boot (Java), MySQL, JPA/Hibernate, HTML5, Vanilla JavaScript, Railway, Render, Vercel.\n• **Key Capabilities**: Tiered REST API architecture with full CRUD lifecycle, ACID-compliant database transaction isolation, role-based admin/student interfaces, and distributed multi-cloud deployment (Railway for DB, Render for Spring Boot API, Vercel for UI).`,
      suggestions: [
        'Tell me about ShopEase',
        'What is his tech stack?',
        'Tell me about TeLSA & projects',
      ],
    };
  }

  // 6. Specific Project: ShopEase
  if (q.includes('shopease') || q.includes('ecommerce') || q.includes('e-commerce') || q.includes('razorpay') || q.includes('cart')) {
    return {
      reply: `**ShopEase — Full-Featured E-Commerce System**\n\n• **Role**: Full-Stack Developer\n• **Tech Stack**: React, TypeScript, Node.js, Express, MongoDB, Razorpay Payment Gateway.\n• **Standout Implementation**: Decoupled client architecture with shopping cart state machines, dynamic product filters, and Razorpay payment gateway integration with cryptographic webhook signature verification (\`crypto.createHmac\`) against payment tampering.`,
      suggestions: [
        'Tell me about TeLSA & projects',
        'What is his tech stack?',
        'How to contact Amritesh?',
      ],
    };
  }

  // 7. Hackathon & Competitions: SIH / DIODESCAN / NTRO
  if (
    q.includes('sih') ||
    q.includes('hackathon') ||
    q.includes('diodescan') ||
    q.includes('ntro') ||
    q.includes('sudo') ||
    q.includes('smart india')
  ) {
    return {
      reply: `**Smart India Hackathon (SIH 2026) — DIODESCAN**\n\n• **Role**: Team Leader (Team Sudo)\n• **Challenge ID**: SIH26145 (National Technical Research Organisation - NTRO)\n• **Core Problem**: Identifying zero-day intrusion patterns and network-level anomalies passively without disrupting operational bandwidth.\n• **Solution Concept**: Combines raw packet sniffing principles with behavioral anomaly models to isolate malicious beacons and unauthorized port tunneling on Linux testbeds.`,
      suggestions: [
        'What is his Linux lab setup?',
        'What is his tech stack?',
        'Academic CGPA & College',
      ],
    };
  }

  // 8. General Projects Overview
  if (
    q.includes('project') ||
    q.includes('portfolio') ||
    q.includes('built') ||
    q.includes('apps') ||
    q.includes('applications') ||
    q.includes('work')
  ) {
    return {
      reply: `**Featured Production & Engineering Projects**\n\nAmritesh has engineered **7 verified software systems**:\n\n1. **TeLSA**: Production law association platform with Next.js, Prisma ORM, PostgreSQL & Auth.js RBAC.\n2. **Attendance OS**: Real-time Anna University 75% attendance detention predictor & QR validation prototype.\n3. **Smart Expense Tracker**: Financial analytics backend with multi-stage MongoDB aggregation pipelines & JWT.\n4. **Library Management System**: Full-stack Spring Boot (Java) + MySQL system with multi-cloud topology.\n5. **ShopEase**: Modern React + TypeScript e-commerce platform with Razorpay webhook verification.\n6. **Entertain Lawyers**: Legal editorial platform architecture with hierarchical resources taxonomy.\n7. **DIODESCAN (SIH '26)**: NTRO threat detection system developed as Team Leader of Team Sudo.\n\n*Click any project name or ask for details!*`,
      suggestions: [
        'Tell me about TeLSA & projects',
        'Tell me about Attendance OS',
        'What is his Linux lab setup?',
        'What is his tech stack?',
      ],
    };
  }

  // 9. Linux & Systems Lab Setup
  if (
    q.includes('linux') ||
    q.includes('debian') ||
    q.includes('lab') ||
    q.includes('kvm') ||
    q.includes('qemu') ||
    q.includes('virtual') ||
    q.includes('network') ||
    q.includes('nmap') ||
    q.includes('wireshark') ||
    q.includes('kernel') ||
    q.includes('virbr0') ||
    q.includes('os')
  ) {
    return {
      reply: `**Linux Workstation & Virtual Systems Lab**\n\n• **Primary Operating System**: Debian 12 (Bookworm) workstation configured with Bash automation and lightweight dotfiles.\n• **Virtual Security Testbed**: Local **QEMU/KVM** hypervisor running isolated guest machines on dedicated \`virbr0\` NAT bridges for safe network experimentation.\n• **Diagnostic & Inspection Tooling**: \n  - **Nmap 7.95**: Subnet host discovery, OS detection, and NSE script scans.\n  - **Wireshark**: Layer-3/4 packet dissection and TCP handshake analysis.\n  - **Docker**: Containerized service isolation and reproducible development.\n• **Engineering Philosophy**: Started experimenting with Linux at age 14 by reviving an old family PC, fostering a deep interest in process trees, memory footprint optimization, and kernel mechanics.`,
      suggestions: [
        'What is his tech stack?',
        'Tell me about TeLSA & projects',
        'TryHackMe & Certifications',
        'Academic CGPA & College',
      ],
    };
  }

  // 10. Technical Stack & Skills
  if (
    q.includes('skill') ||
    q.includes('stack') ||
    q.includes('technolog') ||
    q.includes('language') ||
    q.includes('backend') ||
    q.includes('frontend') ||
    q.includes('database') ||
    q.includes('python') ||
    q.includes('java') ||
    q.includes('javascript') ||
    q.includes('typescript') ||
    q.includes('tools')
  ) {
    return {
      reply: `**Technical Skills & Stack Summary**\n\n• **Core Languages**: Python, Java, TypeScript, JavaScript, SQL, Bash\n• **Backend & APIs**: Node.js, Express, Spring Boot (Java), RESTful Architecture, Auth.js, JWT, Prisma ORM\n• **Databases**: PostgreSQL, MongoDB (Aggregation Pipelines), MySQL\n• **Frontend & UI**: Next.js (App Router), React, Tailwind CSS\n• **Systems & DevOps**: Debian Linux, QEMU/KVM, Docker, Git/GitHub, Cloudflare R2, Render, Railway, Vercel\n• **Security & Diagnostics**: Wireshark, Nmap, Network Protocol Inspection, TryHackMe Labs`,
      suggestions: [
        'What is his Linux lab setup?',
        'Tell me about TeLSA & projects',
        'Academic CGPA & College',
        'Download Resume',
      ],
    };
  }

  // 11. Certifications & Competitive Platforms (TryHackMe, HackerRank)
  if (
    q.includes('certif') ||
    q.includes('tryhackme') ||
    q.includes('hackerrank') ||
    q.includes('security') ||
    q.includes('credential') ||
    q.includes('duolingo') ||
    q.includes('test')
  ) {
    return {
      reply: `**Certifications, Security Labs & Diagnostics**\n\n• **TryHackMe** (\`@amriteshmishra729\`): Completing structured cybersecurity learning paths with hands-on labs in network security, web vulnerabilities, and offensive fundamentals.\n• **HackerRank** (\`@amriteshmishra71\`): Skill certifications in Java, Python, and SQL problem solving.\n• **Duolingo English Test**: Score of **105** (Professional English Proficiency).\n• **Japanese Language**: Elementary proficiency (JL-NAT N5 level).`,
      suggestions: [
        'What is his Linux lab setup?',
        'What is his tech stack?',
        'How to contact Amritesh?',
      ],
    };
  }

  // 12. Contact, Resume & Social Profiles
  if (
    q.includes('contact') ||
    q.includes('email') ||
    q.includes('reach') ||
    q.includes('hire') ||
    q.includes('message') ||
    q.includes('resume') ||
    q.includes('cv') ||
    q.includes('github') ||
    q.includes('linkedin')
  ) {
    return {
      reply: `**Contact & Verified Profiles**\n\n• **Direct Email**: [${SITE_CONFIG.email}](mailto:${SITE_CONFIG.email})\n• **GitHub**: [github.com/amrit-verse](${SITE_CONFIG.links.github})\n• **LinkedIn**: [linkedin.com/in/amriteshmishra0](${SITE_CONFIG.links.linkedin})\n• **TryHackMe**: [tryhackme.com/p/amriteshmishra729](${SITE_CONFIG.links.tryhackme})\n• **HackerRank**: [hackerrank.com/profile/amriteshmishra71](${SITE_CONFIG.links.hackerrank})\n• **Resume**: [Download Official PDF](${SITE_CONFIG.resume})\n• **Location**: Chennai, India (Originally from Rautahat / Kathmandu, Nepal)`,
      suggestions: [
        'Tell me about TeLSA & projects',
        'What is his tech stack?',
        'Academic CGPA & College',
      ],
    };
  }

  // 13. Origin & Bio / Background
  if (
    q.includes('about') ||
    q.includes('who is') ||
    q.includes('bio') ||
    q.includes('origin') ||
    q.includes('nepal') ||
    q.includes('story') ||
    q.includes('journey')
  ) {
    return {
      reply: `**Background & Engineering Journey**\n\n• **Origins**: Born in Rautahat, Nepal, completed higher secondary schooling in Kathmandu, and is currently pursuing his B.E. in Computer Science & Engineering in Chennai, India.\n• **Early Spark**: Started tinkering with computers at age 14 when he revived an old family computer by installing Debian Linux. That curiosity transformed into a lasting passion for operating systems, command line scripting, and backend architecture.\n• **Current Trajectory**: Maintaining a verified **8.88 CGPA** at Excel Engineering College (Anna University) while architecting production web apps (TeLSA) and exploring system security.`,
      suggestions: [
        'Academic CGPA & College',
        'Tell me about TeLSA & projects',
        'What is his Linux lab setup?',
        'How to contact Amritesh?',
      ],
    };
  }

  // 14. Greetings
  if (
    q === 'hi' ||
    q === 'hello' ||
    q === 'hey' ||
    q.startsWith('hi ') ||
    q.startsWith('hello ') ||
    q.startsWith('hey ') ||
    q.includes('good morning') ||
    q.includes('good evening')
  ) {
    return {
      reply: `Hello! I'm Amritesh's AI Portfolio Assistant. I'm connected to his verified engineering dossier, academic transcripts, and systems lab documentation.\n\nYou can ask me about his:\n• **Verified Projects** (TeLSA, Attendance OS, Expense Tracker)\n• **Linux & QEMU Lab** (Debian 12, \`virbr0\`, Nmap, Wireshark)\n• **Academic Background** (Anna University, 8.88 CGPA)\n• **Technical Stack & Direct Contact**\n\nWhat would you like to see?`,
      suggestions: [
        'What is his tech stack?',
        'Tell me about TeLSA & projects',
        'Academic CGPA & College',
        'What is his Linux lab setup?',
      ],
    };
  }

  // 15. Default Fallback
  return {
    reply: `I have access to Amritesh's verified engineering portfolio and academic records. I can answer inquiries regarding:\n\n• **His Software Projects**: TeLSA (RBAC portal), Attendance OS (detention calculator), Smart Expense Tracker, Library Management System (Spring Boot).\n• **Systems Engineering**: Debian 12 workstation, QEMU/KVM virtual isolation lab, Wireshark, Nmap.\n• **Academics**: Anna University affiliation, 8.88 CGPA, B.E. Computer Science 2025–2029.\n• **Skills & Contact**: Backend APIs, databases, or direct email at [${SITE_CONFIG.email}](mailto:${SITE_CONFIG.email}).\n\nTry one of the suggested prompts below!`,
    suggestions: DEFAULT_SUGGESTIONS.slice(0, 4),
  };
}

// Lightweight Markdown Formatter (Bold, Code, Links, Lists)
const FormattedMessage = memo(function FormattedMessage({ content }: { content: string }) {
  const lines = content.split('\n');

  return (
    <div className="space-y-1.5 leading-relaxed text-xs sm:text-sm">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Render bullet lines
        const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-');
        const cleanLine = isBullet ? trimmed.replace(/^[•\-]\s*/, '') : line;

        // Parse inline formatting: **bold**, `code`, [link](url)
        const parts: (string | { type: 'bold' | 'code' | 'link'; text: string; url?: string })[] = [];
        let remaining = cleanLine;

        // Simple regex matcher for inline tokens
        while (remaining.length > 0) {
          const match = remaining.match(/(\*\*([^*]+)\*\*)|(`([^`]+)`)|(\[([^\]]+)\]\(([^)]+)\))/);
          if (!match || match.index === undefined) {
            parts.push(remaining);
            break;
          }

          if (match.index > 0) {
            parts.push(remaining.slice(0, match.index));
          }

          if (match[2]) {
            // Bold
            parts.push({ type: 'bold', text: match[2] });
          } else if (match[4]) {
            // Code
            parts.push({ type: 'code', text: match[4] });
          } else if (match[6] && match[7]) {
            // Link
            parts.push({ type: 'link', text: match[6], url: match[7] });
          }

          remaining = remaining.slice(match.index + match[0].length);
        }

        return (
          <div key={idx} className={isBullet ? 'flex items-start gap-2 pl-1' : ''}>
            {isBullet && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            )}
            <div className="flex-1">
              {parts.map((part, pIdx) => {
                if (typeof part === 'string') {
                  return <span key={pIdx}>{part}</span>;
                }
                if (part.type === 'bold') {
                  return (
                    <strong key={pIdx} className="font-semibold text-white">
                      {part.text}
                    </strong>
                  );
                }
                if (part.type === 'code') {
                  return (
                    <code
                      key={pIdx}
                      className="px-1.5 py-0.5 rounded bg-zinc-800/90 text-emerald-300 font-mono text-[11px] border border-white/10"
                    >
                      {part.text}
                    </code>
                  );
                }
                if (part.type === 'link') {
                  return (
                    <a
                      key={pIdx}
                      href={part.url}
                      target={part.url?.startsWith('mailto:') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 font-medium transition-colors"
                    >
                      {part.text}
                    </a>
                  );
                }
                return null;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I am Amritesh's AI Portfolio Assistant.\n\nI can provide verified technical insights into his **projects**, **Linux & systems lab**, **academic background (Anna University, 8.88 CGPA)**, and **contact details**.\n\nSelect a prompt below or type your question:`,
      timestamp: 'Just now',
      suggestions: DEFAULT_SUGGESTIONS.slice(0, 4),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Auto focus input on desktop
      if (window.innerWidth >= 640) {
        setTimeout(() => inputRef.current?.focus(), 150);
      }
    }
  }, [isOpen, messages, isTyping, scrollToBottom]);

  // Handle ESC key to dismiss modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const messageCounterRef = useRef(1);

  // Handle sending a message
  const handleSend = useCallback((userText: string) => {
    const query = userText.trim();
    if (!query || isTyping) return;

    const currentCount = messageCounterRef.current++;
    const timeStr = 'Just now';

    const userMessage: Message = {
      id: `user-${currentCount}`,
      role: 'user',
      content: query,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Realistic typing delay for human-like response
    setTimeout(() => {
      const { reply, suggestions } = queryKnowledgeBase(query);
      const assistantCount = messageCounterRef.current++;
      const assistantMessage: Message = {
        id: `assistant-${assistantCount}`,
        role: 'assistant',
        content: reply,
        timestamp: timeStr,
        suggestions,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 400);
  }, [isTyping]);

  const handleResetChat = useCallback(() => {
    const resetCount = messageCounterRef.current++;
    setMessages([
      {
        id: `welcome-${resetCount}`,
        role: 'assistant',
        content: `Conversation refreshed. How else can I assist you with Amritesh's technical portfolio and background?`,
        timestamp: 'Just now',
        suggestions: DEFAULT_SUGGESTIONS,
      },
    ]);
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* ── Floating Launcher Button ── */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0a0d14]/95 hover:bg-[#121622] text-white border transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(16,185,129,0.1)] group ${
            isOpen
              ? 'border-emerald-500/50 ring-2 ring-emerald-500/20'
              : 'border-white/15 hover:border-emerald-500/40'
          }`}
          aria-label={isOpen ? 'Close AI Portfolio Assistant' : 'Open AI Portfolio Assistant'}
          aria-expanded={isOpen}
        >
          {/* Animated Emerald Point Indicator */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
          </span>

          {/* Icon & Label */}
          <div className="flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-emerald-400 transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            >
              <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10a9.96 9.96 0 0 1-4.708-1.175L2 22l1.175-5.292A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2z" />
              <path d="M8 12h.01M12 12h.01M16 12h.01" />
            </svg>
            <span className="font-mono text-xs sm:text-sm font-medium tracking-tight text-zinc-200 group-hover:text-white">
              {isOpen ? 'Close AI' : 'Ask AI'}
            </span>
          </div>

          {/* Micro pill badge */}
          {!isOpen && (
            <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full ml-0.5">
              Dossier
            </span>
          )}
        </button>
      </div>

      {/* ── Chat Window Modal ── */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Amritesh AI Assistant Dialog"
          className="fixed bottom-20 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[410px] h-[550px] max-h-[82vh] z-50 flex flex-col rounded-2xl bg-[#090b11]/95 backdrop-blur-2xl border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_30px_rgba(16,185,129,0.08)] overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/8 bg-[#0d1017]/80">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center font-mono text-xs font-bold text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                AM
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
                  Amritesh AI Assistant
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
                </h3>
                <p className="font-mono text-[11px] text-zinc-400">
                  Portfolio Intelligence · <span className="text-emerald-400">Active</span>
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Reset conversation"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Reset chat conversation"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Assistant"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Close Assistant modal"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Message Thread */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 select-text">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-1.5 mb-1 px-1">
                  <span className="font-mono text-[10px] text-zinc-500">
                    {msg.role === 'user' ? 'You' : 'Amrit AI'}
                  </span>
                  <span className="text-[10px] text-zinc-600">·</span>
                  <span className="font-mono text-[10px] text-zinc-600">{msg.timestamp}</span>
                </div>

                <div
                  className={`group relative rounded-2xl px-3.5 py-3 text-sm ${
                    msg.role === 'user'
                      ? 'bg-zinc-800/90 text-white border border-white/10 rounded-tr-xs max-w-[85%]'
                      : 'bg-[#10141f] text-zinc-200 border border-white/8 rounded-tl-xs max-w-[94%] shadow-sm'
                  }`}
                >
                  <FormattedMessage content={msg.content} />

                  {/* Copy Button for Assistant responses */}
                  {msg.role === 'assistant' && (
                    <button
                      onClick={() => copyToClipboard(msg.content, msg.id)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white"
                      title="Copy response"
                      aria-label="Copy message"
                    >
                      {copiedId === msg.id ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 text-emerald-400">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3.5 h-3.5">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                      )}
                    </button>
                  )}
                </div>

                {/* Suggested follow-up prompt chips */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[94%]">
                    {msg.suggestions.map((sug, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleSend(sug)}
                        className="font-mono text-[11px] text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/8 hover:border-emerald-500/30 rounded-full px-2.5 py-1 transition-all text-left"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex flex-col items-start">
                <div className="font-mono text-[10px] text-zinc-500 mb-1 px-1">Amrit AI is analyzing...</div>
                <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-tl-xs bg-[#10141f] border border-white/8 text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse [animation-delay:180ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse [animation-delay:360ms]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input & Action Bar */}
          <div className="p-3 border-t border-white/8 bg-[#0b0e15]/90">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, systems lab, CGPA..."
                disabled={isTyping}
                className="flex-1 bg-[#05070a] border border-white/10 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/25 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 outline-none transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs sm:text-sm flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                aria-label="Send query"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>

            {/* Footer Microtext */}
            <div className="mt-2 flex items-center justify-between px-1 text-[10px] font-mono text-zinc-500">
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                Verified Portfolio Engine
              </span>
              <span>Press Esc to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
