'use client';

import { useEffect, useState } from 'react';
import Hero3DVisual from '@/components/Hero3DVisual';
import { useSound } from '@/components/SoundSystem';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'blueprint' | 'workstation' | 'lab' | 'proof'>('blueprint');
  const { playClick } = useSound();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 80);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleSelectTab = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (['blueprint', 'workstation', 'lab', 'proof'].includes(customEvent.detail)) {
        setActiveTab(customEvent.detail as 'blueprint' | 'workstation' | 'lab' | 'proof');
      }
    };
    window.addEventListener('select-dossier-tab', handleSelectTab);
    return () => window.removeEventListener('select-dossier-tab', handleSelectTab);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-[100dvh] flex flex-col justify-center relative overflow-hidden pt-24 pb-16 sm:py-24"
      aria-label="Hero section"
    >
      {/* Background Subtle Grid Texture */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(var(--color-border-subtle)_1px,transparent_1px)] [background-size:32px_32px] opacity-25 pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="relative z-10 max-w-[1520px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Top Hero Grid: Bio & Visual Engineering Satellite Node */}
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] xl:grid-cols-[1.25fr_0.75fr] gap-10 lg:gap-14 items-center mb-12 lg:mb-16">
          {/* Left Column: Developer Narrative & Visual Hierarchy */}
          <div>
            {/* Developer Node Kicker */}
            <div
              className={`flex items-center gap-2 mb-3.5 transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-accent-bronze animate-ping shrink-0" />
              <p className="text-xs sm:text-sm font-mono tracking-[0.2em] text-accent-bronze uppercase font-semibold">
                SYSTEMS &amp; BACKEND ARCHITECTURE
              </p>
            </div>

            {/* Main Statement / Headline */}
            <h1
              className={`font-display font-bold tracking-tight mb-4 text-text-primary transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{
                fontSize: "clamp(2.5rem, 5vw + 0.5rem, 4.5rem)",
                lineHeight: 1.06,
              }}
            >
              Understanding systems.<br />
              <span className="text-accent-bronze">Building what lasts.</span>
            </h1>

            {/* Clear, punchy one-line title */}
            <p
              className={`text-base sm:text-xl font-medium text-text-primary mb-5 transition-all duration-700 ease-out flex items-center gap-2 flex-wrap ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <span>Amritesh Mishra</span>
              <span className="text-accent-bronze">•</span>
              <span className="text-text-secondary">Computer Science Engineering @ Anna University</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-accent-bronze/15 border border-accent-bronze/40 text-accent-bronze font-semibold">
                8.88 CGPA
              </span>
            </p>

            {/* Visual Capability Badges */}
            <div
              className={`flex flex-wrap gap-2 sm:gap-2.5 mb-7 transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "150ms" }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-card border border-border-subtle text-xs font-mono text-text-primary shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-bronze" />
                Backend: Node.js · Spring Boot · PostgreSQL
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-card border border-border-subtle text-xs font-mono text-text-primary shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-bronze" />
                Linux: Debian 13 · KVM virbr0 · Systemd
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-card border border-border-subtle text-xs font-mono text-text-primary shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-bronze" />
                Security: ThreatDesk SIEM · 357 Pytests
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-card border border-border-subtle text-xs font-mono text-text-primary shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-bronze" />
                Flagship: ReleaseTrace Dual-Store
              </span>
            </div>

            {/* 3 Core Metric Cards with HUD Corner Brackets */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="corner-hud p-4 rounded-xl bg-bg-card border border-border-subtle shadow-sm">
                <p className="text-[11px] font-mono text-accent-bronze uppercase tracking-wider mb-1 font-semibold">ACADEMIC STANDING</p>
                <p className="text-xl sm:text-2xl font-bold font-display text-text-primary">8.88 CGPA</p>
                <p className="text-xs text-text-secondary font-mono mt-0.5">Top Tier · Anna University</p>
              </div>

              <div className="corner-hud p-4 rounded-xl bg-bg-card border border-border-subtle shadow-sm">
                <p className="text-[11px] font-mono text-accent-bronze uppercase tracking-wider mb-1 font-semibold">ENGINEERING BUILDS</p>
                <p className="text-xl sm:text-2xl font-bold font-display text-text-primary">9 Systems</p>
                <p className="text-xs text-text-secondary font-mono mt-0.5">Dual-Store, SIEM, CMS, SIH</p>
              </div>

              <div className="corner-hud p-4 rounded-xl bg-bg-card border border-border-subtle shadow-sm">
                <p className="text-[11px] font-mono text-accent-bronze uppercase tracking-wider mb-1 font-semibold">ENVIRONMENT</p>
                <p className="text-xl sm:text-2xl font-bold font-display text-text-primary">Debian 13</p>
                <p className="text-xs text-text-secondary font-mono mt-0.5">Linux 6.12 · KVM virbr0</p>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div
              className={`flex flex-wrap items-center gap-3.5 transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "250ms" }}
            >
              <a
                href="/resume/Amritesh_Mishra.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-text-primary text-bg-primary text-xs sm:text-sm font-mono font-bold tracking-tight hover:bg-accent-bronze hover:text-bg-primary transition-all duration-200 active:scale-95 shadow-md"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                <span>Download Résumé</span>
              </a>

              <a
                href="#projects"
                onClick={playClick}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-bg-tertiary border border-border-subtle text-xs sm:text-sm font-mono text-text-primary hover:border-accent-bronze hover:text-accent-bronze transition-all duration-200 active:scale-95"
              >
                <span>Explore My Work ↓</span>
              </a>

              <a
                href="https://github.com/amrit-verse"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-bg-card border border-border-subtle text-xs font-mono text-text-secondary hover:text-text-primary hover:border-accent-bronze/50 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </a>

              <a
                href="#contact"
                onClick={playClick}
                className="text-xs font-mono text-text-secondary hover:text-accent-bronze px-3 py-2 transition-colors"
              >
                Direct Contact →
              </a>
            </div>
          </div>

          {/* Right Column: Visual Architectural Satellite Node with 3D/2D Modes */}
          <div
            className={`relative flex items-center justify-center transition-all duration-700 ease-out ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <Hero3DVisual />
          </div>
        </div>

        {/* ─── SYSTEM INSPECTOR DOSSIER (Full Width Architecture Deck) ─── */}
        <div id="dossier" className="w-full corner-hud rounded-2xl bg-bg-card border border-border-subtle overflow-hidden shadow-xl transition-colors">
          {/* Deck Top Bar: Tabs & Mode Status */}
          <div className="px-4 sm:px-6 py-3.5 bg-bg-tertiary border-b border-border-subtle flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase bg-bg-card text-accent-bronze border border-border-subtle font-semibold">
                SYSTEM INSPECTOR
              </span>
              <span className="text-xs font-mono text-text-secondary hidden md:inline">
                Live Engineering Telemetry &amp; Architecture Atlas
              </span>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-bg-primary border border-border-subtle">
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setActiveTab('blueprint');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activeTab === 'blueprint'
                    ? 'bg-text-primary text-bg-primary font-bold shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                30s Skim
              </button>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setActiveTab('workstation');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activeTab === 'workstation'
                    ? 'bg-text-primary text-bg-primary font-bold shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                $ fastfetch
              </button>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setActiveTab('lab');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activeTab === 'lab'
                    ? 'bg-text-primary text-bg-primary font-bold shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                $ virsh list
              </button>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setActiveTab('proof');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activeTab === 'proof'
                    ? 'bg-text-primary text-bg-primary font-bold shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                $ highlights
              </button>
            </div>
          </div>

          {/* Deck Body */}
          <div className="p-5 sm:p-7 bg-bg-card">
            {activeTab === 'blueprint' && (
              <div className="grid md:grid-cols-3 gap-5">
                {/* Visual Card 1: Core Stack */}
                <div className="p-4 rounded-xl bg-bg-primary border border-border-subtle">
                  <p className="text-[11px] font-mono text-accent-bronze uppercase tracking-wider mb-2 font-semibold">01 // PRODUCTION STACK</p>
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-text-primary">Node.js / Express</span>
                      <span className="text-accent-bronze font-semibold">Advanced</span>
                    </div>
                    <div className="w-full bg-bg-tertiary h-1.5 rounded-full overflow-hidden">
                      <div className="bg-accent-bronze h-full w-[90%]" />
                    </div>

                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-text-primary">Java / Spring Boot</span>
                      <span className="text-accent-bronze font-semibold">Full CRUD REST</span>
                    </div>
                    <div className="w-full bg-bg-tertiary h-1.5 rounded-full overflow-hidden">
                      <div className="bg-accent-bronze h-full w-[85%]" />
                    </div>

                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-text-primary">PostgreSQL &amp; Prisma</span>
                      <span className="text-accent-bronze font-semibold">Schemas &amp; Indexing</span>
                    </div>
                    <div className="w-full bg-bg-tertiary h-1.5 rounded-full overflow-hidden">
                      <div className="bg-accent-bronze h-full w-[88%]" />
                    </div>
                  </div>
                </div>

                {/* Visual Card 2: Systems & Virtualization */}
                <div className="p-4 rounded-xl bg-bg-primary border border-border-subtle">
                  <p className="text-[11px] font-mono text-accent-bronze uppercase tracking-wider mb-2 font-semibold">02 // SYSTEMS &amp; LINUX</p>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2 rounded bg-bg-tertiary border border-border-subtle flex items-center justify-between">
                      <span className="text-text-primary">Host OS</span>
                      <span className="text-accent-bronze font-semibold">Debian 13 (Trixie)</span>
                    </div>
                    <div className="p-2 rounded bg-bg-tertiary border border-border-subtle flex items-center justify-between">
                      <span className="text-text-primary">Hypervisor</span>
                      <span className="text-accent-bronze font-semibold">QEMU / KVM</span>
                    </div>
                    <div className="p-2 rounded bg-bg-tertiary border border-border-subtle flex items-center justify-between">
                      <span className="text-text-primary">Isolated Bridge</span>
                      <span className="text-accent-bronze font-semibold">virbr0 NAT (192.168.122.0/24)</span>
                    </div>
                  </div>
                </div>

                {/* Visual Card 3: Key Verification Proofs */}
                <div className="p-4 rounded-xl bg-bg-primary border border-border-subtle">
                  <p className="text-[11px] font-mono text-accent-bronze uppercase tracking-wider mb-2 font-semibold">03 // VERIFIED AUDIT PROOF</p>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2 rounded bg-bg-tertiary border border-border-subtle flex items-center justify-between">
                      <span className="text-text-primary">ThreatDesk Rules</span>
                      <span className="text-accent-bronze font-semibold">66 Rules · 357 Pytests (100%)</span>
                    </div>
                    <div className="p-2 rounded bg-bg-tertiary border border-border-subtle flex items-center justify-between">
                      <span className="text-text-primary">Anna University</span>
                      <span className="text-accent-bronze font-semibold">8.88 CGPA (Coursework)</span>
                    </div>
                    <div className="p-2 rounded bg-bg-tertiary border border-border-subtle flex items-center justify-between">
                      <span className="text-text-primary">SIH 2026</span>
                      <span className="text-accent-bronze font-semibold">Team Leader (Team Sudo)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'workstation' && (
              <div className="font-mono text-xs text-text-primary bg-bg-primary p-5 rounded-xl border border-border-subtle overflow-x-auto">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-text-secondary">
                    <p className="text-accent-bronze font-bold mb-2">amrit@signal-workstation:~$ fastfetch</p>
                    <p><span className="text-text-primary">OS:</span> Debian GNU/Linux 13 (trixie) x86_64</p>
                    <p><span className="text-text-primary">Host:</span> HP Pavilion Aero Laptop 13-be0xxx</p>
                    <p><span className="text-text-primary">Kernel:</span> Linux 6.12.38-amd64</p>
                    <p><span className="text-text-primary">Uptime:</span> Active Systems Development Node</p>
                    <p><span className="text-text-primary">Shell:</span> bash 5.2.32</p>
                  </div>
                  <div className="space-y-1.5 text-text-secondary">
                    <p><span className="text-text-primary">CPU:</span> AMD Ryzen 5 5600U with Radeon Graphics (12) @ 2.30 GHz</p>
                    <p><span className="text-text-primary">Memory:</span> 16 GB DDR4-3200 (Dual Channel)</p>
                    <p><span className="text-text-primary">Disk:</span> 512 GB PCIe NVMe SSD</p>
                    <p><span className="text-text-primary">Virtualization:</span> KVM enabled (AMD-V hardware acceleration)</p>
                    <p><span className="text-text-primary">Default Toolchain:</span> Node 22, Python 3.13, OpenJDK 21, Docker Engine</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'lab' && (
              <div className="font-mono text-xs text-text-primary bg-bg-primary p-5 rounded-xl border border-border-subtle overflow-x-auto">
                <p className="text-accent-bronze font-bold mb-3">amrit@signal-workstation:~$ sudo virsh list --all &amp;&amp; ip route show</p>
                <div className="grid md:grid-cols-3 gap-3 mb-4">
                  <div className="p-3 rounded bg-bg-tertiary border border-border-subtle">
                    <p className="text-accent-bronze text-[10px] font-semibold">GUEST DOMAIN</p>
                    <p className="font-bold text-text-primary mt-1">debian13</p>
                    <p className="text-[11px] text-text-secondary">State: running · QEMU KVM</p>
                  </div>
                  <div className="p-3 rounded bg-bg-tertiary border border-border-subtle">
                    <p className="text-accent-bronze text-[10px] font-semibold">ISOLATED BRIDGE</p>
                    <p className="font-bold text-text-primary mt-1">virbr0</p>
                    <p className="text-[11px] text-text-secondary">Subnet: 192.168.122.0/24</p>
                  </div>
                  <div className="p-3 rounded bg-bg-tertiary border border-border-subtle">
                    <p className="text-accent-bronze text-[10px] font-semibold">DEFENSIVE AUDITS</p>
                    <p className="font-bold text-text-primary mt-1">Nmap 7.95</p>
                    <p className="text-[11px] text-text-secondary">Passive traffic modeling</p>
                  </div>
                </div>
                <p className="text-[11px] text-text-secondary mt-2">
                  Isolated hypervisor network ensures offensive security testing, TryHackMe labs, and port audits never compromise host integrity.
                </p>
              </div>
            )}

            {activeTab === 'proof' && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-3.5 rounded-xl bg-bg-primary border border-border-subtle">
                  <p className="text-[10px] font-mono text-accent-bronze uppercase font-semibold">ACADEMICS</p>
                  <p className="text-xl font-bold font-display text-text-primary mt-0.5">8.88 CGPA</p>
                  <p className="text-xs text-text-secondary font-mono mt-1">Excel Engineering College (Anna University affiliated)</p>
                </div>
                <div className="p-3.5 rounded-xl bg-bg-primary border border-border-subtle">
                  <p className="text-[10px] font-mono text-accent-bronze uppercase font-semibold">HACKATHON</p>
                  <p className="text-xl font-bold font-display text-text-primary mt-0.5">SIH 2026</p>
                  <p className="text-xs text-text-secondary font-mono mt-1">Team Leader (Team Sudo) tackling Problem SIH26145</p>
                </div>
                <div className="p-3.5 rounded-xl bg-bg-primary border border-border-subtle">
                  <p className="text-[10px] font-mono text-accent-bronze uppercase font-semibold">JAPANESE LANGUAGE</p>
                  <p className="text-xl font-bold font-display text-text-primary mt-0.5">JL-NAT N5</p>
                  <p className="text-xs text-text-secondary font-mono mt-1">Certified by Senmon Kyouiku Publishing (Tokyo, Japan)</p>
                </div>
                <div className="p-3.5 rounded-xl bg-bg-primary border border-border-subtle">
                  <p className="text-[10px] font-mono text-accent-bronze uppercase font-semibold">DUOLINGO ENGLISH</p>
                  <p className="text-xl font-bold font-display text-text-primary mt-0.5">105 Score</p>
                  <p className="text-xs text-text-secondary font-mono mt-1">CEFR B2 Level Professional English Proficiency</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Subtle Scroll Indicator */}
        <div className="mt-8 flex justify-center items-center gap-2 text-text-tertiary text-xs font-mono">
          <a
            href="#projects"
            className="flex items-center gap-2 hover:text-accent-bronze transition-colors py-1 px-3 rounded-full border border-border-subtle/50"
          >
            <span>SCROLL TO EXPLORE WORK</span>
            <span className="animate-bounce">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
