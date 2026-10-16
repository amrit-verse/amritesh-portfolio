'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'blueprint' | 'workstation' | 'lab' | 'proof'>('blueprint');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-[100dvh] flex flex-col justify-center relative overflow-hidden pt-24 pb-16 sm:py-24"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 hero-depth" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        {/* Top Hero Grid: Bio + Visual Node */}
        <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-8 lg:gap-12 items-center mb-10 sm:mb-12">
          <div>
            {/* Mobile Avatar Presentation (visible only on mobile/tablet screens) */}
            <div
              className={`lg:hidden flex items-center gap-4 mb-5 transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 aspect-square rounded-full p-1 bg-gradient-to-b from-amber-500/20 via-zinc-800/40 to-transparent shadow-lg shadow-black/80 shrink-0">
                <div className="relative w-full h-full rounded-full overflow-hidden border border-zinc-700/80 bg-[#07090e]">
                  <Image
                    src="/avatar.png"
                    alt="Amritesh Mishra"
                    fill
                    className="object-cover object-center scale-[1.08]"
                    priority
                    sizes="96px"
                  />
                </div>
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold text-white tracking-tight">Amritesh Mishra</p>
                <p className="text-xs text-zinc-300 font-mono">Backend Developer · Debian 13 Workstation</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                  <span className="text-[0.6875rem] text-emerald-400 font-mono font-medium">Available for Internships</span>
                </div>
              </div>
            </div>

            {/* Developer Node Kicker */}
            <div
              className={`flex items-center gap-2 mb-3 transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "50ms" }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
              <p className="text-xs font-mono tracking-[0.2em] text-zinc-400 uppercase">
                BACKEND &amp; SYSTEMS ENGINEERING // AMRITESH MISHRA
              </p>
            </div>

            {/* Main Name / Title */}
            <h1
              className={`font-extrabold tracking-[-0.03em] mb-3 transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{
                transitionDelay: "120ms",
                fontSize: "clamp(2.4rem, 5vw + 0.5rem, 4.25rem)",
                lineHeight: 1.05,
              }}
            >
              <span className="text-white">Amritesh Mishra</span>
            </h1>

            {/* Specialization subtitle */}
            <p
              className={`text-lg sm:text-xl md:text-2xl font-semibold text-zinc-200 mb-3 transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "160ms" }}
            >
              Building robust backend APIs &amp; daily driving Linux.
            </p>

            {/* Authentic Narrative Bio */}
            <p
              className={`text-sm sm:text-base text-zinc-300 max-w-xl leading-relaxed mb-6 transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              Computer Science undergraduate (2nd Year, Anna University) specializing in Node.js, Spring Boot, and PostgreSQL. Focused on type-safe schemas, low-latency queries, and isolated virtual lab testbeds on Debian.
            </p>

            {/* 3 Core Capability Cards */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-6 max-w-xl transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "240ms" }}
            >
              <div className="p-3 rounded-xl bg-[#0d1017] border border-zinc-800/90 hover:border-amber-500/30 transition-colors">
                <p className="text-[0.6875rem] font-mono text-amber-400 font-bold uppercase tracking-wider">Academic Record</p>
                <p className="text-xs font-semibold text-white mt-0.5">8.88 CGPA · 2nd Year</p>
                <p className="text-[0.6875rem] text-zinc-400">Anna University affiliated</p>
              </div>
              <div className="p-3 rounded-xl bg-[#0d1017] border border-zinc-800/90 hover:border-sky-500/30 transition-colors">
                <p className="text-[0.6875rem] font-mono text-sky-400 font-bold uppercase tracking-wider">Backend Core</p>
                <p className="text-xs font-semibold text-white mt-0.5">Node.js · Spring Boot</p>
                <p className="text-[0.6875rem] text-zinc-400">PostgreSQL, Prisma, MongoDB</p>
              </div>
              <div className="p-3 rounded-xl bg-[#0d1017] border border-zinc-800/90 hover:border-emerald-500/30 transition-colors">
                <p className="text-[0.6875rem] font-mono text-emerald-400 font-bold uppercase tracking-wider">Systems Lab</p>
                <p className="text-xs font-semibold text-white mt-0.5">Debian 13 · QEMU/KVM</p>
                <p className="text-[0.6875rem] text-zinc-400">virbr0 &amp; Nmap 7.95 testbeds</p>
              </div>
            </div>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "280ms" }}
            >
              <a
                href="/resume/Amritesh_Mishra.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-200 text-black font-semibold rounded-xl min-h-[2.85rem] px-5 sm:px-6 text-xs sm:text-sm transition-all duration-200 active:scale-[0.98] shadow-md shadow-white/5 text-center"
                aria-label="View resume PDF in a new tab"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                View Resume (PDF)
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 bg-[#12151f] border border-zinc-800 hover:border-zinc-600 text-zinc-200 font-medium rounded-xl min-h-[2.85rem] px-4 sm:px-5 text-xs sm:text-sm transition-all duration-200 active:scale-[0.98] text-center"
              >
                <span>Browse 7 Projects ↓</span>
              </a>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://github.com/amrit-verse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#12151f] border border-zinc-800 hover:border-zinc-600 text-zinc-200 font-medium rounded-xl min-h-[2.85rem] px-4 text-xs sm:text-sm transition-all duration-200 active:scale-[0.98]"
                  aria-label="Visit GitHub profile"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                <a
                  href="#contact"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 text-zinc-300 hover:text-white rounded-xl min-h-[2.85rem] px-4 text-xs sm:text-sm transition-all duration-200 border border-zinc-800 bg-[#0e1118] sm:bg-transparent sm:border-transparent"
                >
                  Contact →
                </a>
              </div>
            </div>
          </div>

          {/* Desktop Right Column: Perfectly Proportioned Circular Avatar Frame */}
          <div
            className={`hidden lg:flex flex-col items-center justify-center transition-all duration-1000 ease-out ${
              isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
            }`}
            style={{ transitionDelay: "320ms" }}
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 xl:w-80 xl:h-80 aspect-square rounded-full p-2 bg-gradient-to-b from-amber-500/20 via-zinc-800/40 to-transparent shadow-[0_0_50px_rgba(0,0,0,0.6)] group">
              <div className="relative w-full h-full rounded-full overflow-hidden border border-zinc-700/80 bg-[#07090e]">
                <Image
                  src="/avatar.png"
                  alt="Amritesh Mishra"
                  fill
                  className="object-cover object-center scale-[1.08] transition-transform duration-500 group-hover:scale-[1.12]"
                  priority
                  sizes="(max-width: 1024px) 256px, 320px"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            ADDICTIVE INTERACTIVE DOSSIER & SYSTEM INSPECTOR (#dossier)
            ═══════════════════════════════════════════════════════════ */}
        <div
          id="dossier"
          className={`glass-card p-4 sm:p-6 border border-zinc-800/90 relative overflow-hidden transition-all duration-700 ease-out mt-8 sm:mt-12 scroll-mt-20 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "380ms" }}
        >
          {/* Subtle ambient corner glow */}
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-zinc-700/5 blur-2xl pointer-events-none" />

          {/* Interactive Tab Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 mb-4 border-b border-zinc-800/80">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[0.6875rem] font-mono font-bold uppercase rounded bg-zinc-800 text-zinc-200 border border-zinc-700 shrink-0">
                SYSTEM INSPECTOR
              </span>
              <span className="text-xs font-mono text-zinc-400 truncate">Click tabs to inspect Amritesh:</span>
            </div>

            {/* Tab Buttons — Mobile scrollable without wrapping */}
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#07090f] border border-zinc-800 text-xs font-mono overflow-x-auto max-w-full">
              <button
                type="button"
                onClick={() => setActiveTab('blueprint')}
                className={`shrink-0 px-2.5 py-1 rounded transition-all ${
                  activeTab === 'blueprint'
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                ⚡ 30s Skim
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('workstation')}
                className={`shrink-0 px-2.5 py-1 rounded transition-all ${
                  activeTab === 'workstation'
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                $ fastfetch
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('lab')}
                className={`shrink-0 px-2.5 py-1 rounded transition-all ${
                  activeTab === 'lab'
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                $ virsh list
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('proof')}
                className={`shrink-0 px-2.5 py-1 rounded transition-all ${
                  activeTab === 'proof'
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                $ highlights
              </button>
            </div>
          </div>

          {/* TAB 1: 30-Second Blueprint */}
          {activeTab === 'blueprint' && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm animate-fade-in">
              <div className="p-3.5 rounded-xl bg-[#090b11] border border-zinc-800/80 hover:border-emerald-500/30 transition-colors">
                <p className="text-[0.6875rem] font-mono uppercase tracking-wider text-emerald-400 mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Identity &amp; Status
                </p>
                <p className="font-semibold text-white">Amritesh Mishra</p>
                <p className="text-zinc-400 text-xs mt-0.5">2nd Year B.E. Computer Science</p>
                <p className="text-zinc-500 text-[0.6875rem] mt-0.5">Excel Eng. College (Anna Univ)</p>
                <p className="text-emerald-400 font-mono text-xs mt-1.5 font-semibold">CGPA: 8.88 / 10.00</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#090b11] border border-zinc-800/80 hover:border-sky-500/30 transition-colors">
                <p className="text-[0.6875rem] font-mono uppercase tracking-wider text-sky-400 mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  Everyday Backend
                </p>
                <p className="text-zinc-200 font-medium">Node.js, Express, Spring Boot</p>
                <p className="text-zinc-400 text-xs mt-1">PostgreSQL, Prisma ORM, MongoDB</p>
                <p className="text-zinc-500 text-[0.6875rem] mt-0.5">Docker, REST APIs, Auth.js RBAC</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#090b11] border border-zinc-800/80 hover:border-emerald-500/30 transition-colors">
                <p className="text-[0.6875rem] font-mono uppercase tracking-wider text-emerald-400 mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Linux &amp; Systems Lab
                </p>
                <p className="text-zinc-200 font-medium">Debian 13 (trixie) Daily Driver</p>
                <p className="text-zinc-400 text-xs mt-1">HP Pavilion Aero 13 · QEMU/KVM</p>
                <p className="text-zinc-500 text-[0.6875rem] mt-0.5">virbr0 NAT bridge, debian13 guest, Nmap 7.95, Docker</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#090b11] border border-zinc-800/80 hover:border-amber-500/30 transition-colors">
                <p className="text-[0.6875rem] font-mono uppercase tracking-wider text-amber-400 mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Verified Credentials
                </p>
                <p className="text-zinc-200 font-medium">Team Leader — SIH &apos;26 (Team Sudo)</p>
                <p className="text-zinc-400 text-xs mt-1">JL-NAT N5 Japanese Certified</p>
                <p className="text-zinc-500 text-[0.6875rem] mt-0.5">Duolingo English: 105 Score</p>
              </div>
            </div>
          )}

          {/* TAB 2: $ fastfetch Workstation */}
          {activeTab === 'workstation' && (
            <div className="p-4 rounded-xl bg-[#090b11] border border-zinc-800/80 font-mono text-xs text-zinc-300 space-y-1.5 animate-fade-in">
              <p className="text-emerald-400 font-semibold">$ fastfetch --pipe</p>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 pt-1 text-zinc-400">
                <p><span className="text-zinc-200 font-bold">OS:</span> Debian GNU/Linux 13 (trixie) x86_64</p>
                <p><span className="text-zinc-200 font-bold">Host:</span> HP Pavilion Aero Laptop 13-be2xxx</p>
                <p><span className="text-zinc-200 font-bold">Kernel:</span> Linux 6.12.111+deb13-amd64</p>
                <p><span className="text-zinc-200 font-bold">Shell:</span> bash 5.2.37</p>
                <p><span className="text-zinc-200 font-bold">CPU:</span> AMD Ryzen 7 7735U (16) @ 4.82 GHz</p>
                <p><span className="text-zinc-200 font-bold">Memory:</span> 16 GB LPDDR5 (14.84 GiB available)</p>
                <p><span className="text-zinc-200 font-bold">Primary Editor:</span> VS Code</p>
                <p><span className="text-zinc-200 font-bold">Hypervisor:</span> QEMU 10.0 / KVM (libvirt 11.3)</p>
                <p><span className="text-zinc-200 font-bold">Languages:</span> Java 21, TypeScript, Python 3.13, SQL, C, Bash</p>
                <p><span className="text-zinc-200 font-bold">Databases:</span> PostgreSQL 17 (psql 17.11), Prisma, MongoDB</p>
              </div>
            </div>
          )}

          {/* TAB 3: $ virsh list Virtual Lab */}
          {activeTab === 'lab' && (
            <div className="p-4 rounded-xl bg-[#090b11] border border-zinc-800/80 font-mono text-xs text-zinc-300 space-y-2 animate-fade-in">
              <p className="text-emerald-400 font-semibold">$ virsh -c qemu:///system list --all</p>
              <div className="overflow-x-auto text-zinc-400">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-zinc-800 text-zinc-500">
                      <th className="py-1 pr-4">Id</th>
                      <th className="py-1 pr-4">VM / Network Node</th>
                      <th className="py-1 pr-4">State</th>
                      <th className="py-1">Configuration &amp; Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1 pr-4 text-zinc-600">-</td>
                      <td className="py-1 pr-4 text-white font-bold">debian13</td>
                      <td className="py-1 pr-4 text-zinc-400 font-semibold">shut off (guest)</td>
                      <td className="py-1 text-zinc-300">QEMU/KVM isolated testbed (2 vCPU, 2 GiB RAM, AppArmor)</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4 text-zinc-600">net</td>
                      <td className="py-1 pr-4 text-zinc-200 font-bold">virbr0 (NAT Bridge)</td>
                      <td className="py-1 pr-4 text-emerald-400 font-semibold">active</td>
                      <td className="py-1 text-zinc-300">192.168.122.1/24 (dnsmasq DHCP: .2–.254, private subnet)</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4 text-zinc-600">app</td>
                      <td className="py-1 pr-4 text-zinc-300 font-bold">Docker Engine</td>
                      <td className="py-1 pr-4 text-emerald-400 font-semibold">v26.1.5</td>
                      <td className="py-1 text-zinc-400">Local containerized development environments</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: $ highlights Proof of Work */}
          {activeTab === 'proof' && (
            <div className="p-4 rounded-xl bg-[#090b11] border border-zinc-800/80 font-mono text-xs text-zinc-300 space-y-2 animate-fade-in">
              <p className="text-emerald-400 font-semibold">$ cat achievements.json | jq .highlights</p>
              <div className="grid sm:grid-cols-2 gap-2 text-zinc-400">
                <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 hover:border-purple-500/30 transition-colors">
                  <p className="text-purple-300 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                    Smart India Hackathon 2026
                  </p>
                  <p className="text-zinc-400 text-[0.6875rem] mt-0.5">Team Leader for Team Sudo (NTRO Threat Detection Problem SIH26145)</p>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 hover:border-emerald-500/30 transition-colors">
                  <p className="text-emerald-300 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    Current Academic CGPA: 8.88 / 10
                  </p>
                  <p className="text-zinc-400 text-[0.6875rem] mt-0.5">Excel Engineering College (Anna University affiliated coursework)</p>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/30 transition-colors">
                  <p className="text-amber-300 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    JL-NAT N5 Japanese Certified
                  </p>
                  <p className="text-zinc-400 text-[0.6875rem] mt-0.5">Autodidactic language study validating reading &amp; listening comprehension</p>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 hover:border-sky-500/30 transition-colors">
                  <p className="text-sky-300 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                    Duolingo English Score: 105
                  </p>
                  <p className="text-zinc-400 text-[0.6875rem] mt-0.5">Certified literacy, academic comprehension, and professional expression</p>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Fast Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 mt-4 border-t border-zinc-800/80 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-zinc-500">Quick Navigation:</span>
              <a href="#projects" className="px-2.5 py-1 rounded bg-[#090c12] border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors font-mono">
                Featured 7 Projects ↓
              </a>
              <a href="#learning" className="px-2.5 py-1 rounded bg-[#090c12] border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors font-mono">
                Virtual Security Lab ↓
              </a>
              <a href="#contact" className="px-2.5 py-1 rounded bg-[#090c12] border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors font-mono">
                Direct Contact ↓
              </a>
            </div>
            <a
              href="mailto:contact@amritesh.com.np"
              className="text-zinc-300 hover:text-white hover:underline font-mono"
            >
              contact@amritesh.com.np →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
