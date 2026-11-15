'use client';

import { useState, useId } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useExperience } from '@/components/ExperienceContext';

interface GraphNode {
  id: string;
  label: string;
  category: 'language' | 'system' | 'build' | 'proof';
  x: number;
  y: number;
  description: string;
  details: string;
  jumpLink?: string;
  jumpLabel?: string;
}

interface GraphLink {
  source: string;
  target: string;
}

const NODES: GraphNode[] = [
  // Languages & Foundations (Col 1: x: 120)
  { id: 'ts', label: 'TypeScript', category: 'language', x: 120, y: 90, description: 'Type-safe contracts & Zod validation', details: 'Core language in ReleaseTrace, TeLSA, and Next.js full-stack architectures.' },
  { id: 'py', label: 'Python 3.13', category: 'language', x: 120, y: 215, description: 'Threat modeling & automated packet analysis', details: 'Powers ThreatDesk 66 deterministic rules and DIODESCAN flow analysis.' },
  { id: 'java', label: 'Java 21', category: 'language', x: 120, y: 340, description: 'Spring Boot REST backend services', details: 'JPA transactions, entity modeling, and MySQL concurrency in Library Management.' },

  // Systems & Virtualization (Col 2: x: 410)
  { id: 'debian', label: 'Debian 13', category: 'system', x: 410, y: 85, description: 'Workstation host OS & daily driver', details: 'HP Pavilion Aero running Linux 6.12, systemd services, and dotfiles.', jumpLink: '#learning', jumpLabel: 'Inspect Workstation Specs ↓' },
  { id: 'qemu', label: 'QEMU / KVM', category: 'system', x: 410, y: 215, description: 'Isolated hypervisor virtual testbed', details: 'Debian 13 guest on virbr0 NAT bridge for defensive port audits & threat modeling.', jumpLink: '#learning', jumpLabel: 'View Systems Lab ↓' },
  { id: 'docker', label: 'Docker Engine', category: 'system', x: 410, y: 340, description: 'Containerized services & databases', details: 'Isolated PostgreSQL 17, MongoDB, and microservice containers.' },

  // Builds & Platforms (Col 3: x: 720)
  { id: 'releasetrace', label: 'ReleaseTrace', category: 'build', x: 720, y: 70, description: 'Dual-store release intelligence platform', details: 'Tracks deployment state & schema transitions with tamper-evident audit memory.', jumpLink: '#projects', jumpLabel: 'Inspect ReleaseTrace in BUILD ↓' },
  { id: 'threatdesk', label: 'ThreatDesk', category: 'build', x: 720, y: 170, description: 'Digital risk protection platform', details: '66 deterministic detection rules with negative scoring for corporate defensive assets.', jumpLink: '#projects', jumpLabel: 'Inspect ThreatDesk in BUILD ↓' },
  { id: 'telsa', label: 'TeLSA', category: 'build', x: 720, y: 270, description: 'Production CMS & organizational portal', details: 'Role-based access control, editorial workflows, and legal research taxonomy.', jumpLink: '#projects', jumpLabel: 'Inspect TeLSA in BUILD ↓' },
  { id: 'diodescan', label: 'DIODESCAN', category: 'build', x: 720, y: 370, description: 'Passive AI threat detection for data diodes', details: 'Monitors unidirectional IP packet flows without active network footprints.', jumpLink: '#projects', jumpLabel: 'Inspect DIODESCAN in BUILD ↓' },

  // Proof & Credentials (Col 4: x: 990)
  { id: 'sih', label: 'SIH 2026', category: 'proof', x: 990, y: 135, description: 'Team Leader (Team Sudo) — SIH26145', details: 'National hackathon challenge on passive cyber threat classification.', jumpLink: '#education', jumpLabel: 'View Academic Journey ↓' },
  { id: 'cgpa', label: '8.88 CGPA', category: 'proof', x: 990, y: 285, description: 'Anna University academic record', details: 'Verified cumulative grade point average progressing into 2nd year Computer Science.', jumpLink: '#about', jumpLabel: 'View College Coordinates ↓' },
];

const LINKS: GraphLink[] = [
  { source: 'ts', target: 'releasetrace' },
  { source: 'ts', target: 'telsa' },
  { source: 'py', target: 'threatdesk' },
  { source: 'py', target: 'diodescan' },
  { source: 'java', target: 'docker' },
  { source: 'debian', target: 'qemu' },
  { source: 'debian', target: 'docker' },
  { source: 'qemu', target: 'threatdesk' },
  { source: 'qemu', target: 'diodescan' },
  { source: 'docker', target: 'releasetrace' },
  { source: 'docker', target: 'threatdesk' },
  { source: 'threatdesk', target: 'sih' },
  { source: 'diodescan', target: 'sih' },
  { source: 'telsa', target: 'cgpa' },
  { source: 'releasetrace', target: 'cgpa' },
];

export default function ConnectionGraph() {
  const { theme, renderMode } = useExperience();
  const [selectedId, setSelectedId] = useState<string>('releasetrace');
  const [viewMode, setViewMode] = useState<'graph' | 'list'>('graph');
  const [filterCategory, setFilterCategory] = useState<'all' | 'language' | 'system' | 'build' | 'proof'>('all');
  const gradientId = useId();

  const selectedNode = NODES.find((n) => n.id === selectedId) || NODES[0];

  const connectedNodeIds = new Set<string>();
  LINKS.forEach((link) => {
    if (link.source === selectedId) connectedNodeIds.add(link.target);
    if (link.target === selectedId) connectedNodeIds.add(link.source);
  });

  const isDark = theme === 'dark';
  const getCategoryColor = (cat: GraphNode['category']) => {
    switch (cat) {
      case 'language':
        return isDark ? '#F1EEE8' : '#20252B';
      case 'system':
        return isDark ? '#929BA4' : '#626B73';
      case 'build':
        return isDark ? '#9C8058' : '#8B6D42';
      case 'proof':
        return isDark ? '#9C8058' : '#8B6D42';
    }
  };

  const getCategoryLabel = (cat: GraphNode['category']) => {
    switch (cat) {
      case 'language':
        return 'Language & Foundation';
      case 'system':
        return 'Systems & Infrastructure';
      case 'build':
        return 'Engineering Build';
      case 'proof':
        return 'Verified Proof';
    }
  };

  return (
    <section id="graph" className="py-16 sm:py-24 md:py-32 bg-bg-primary transition-colors" aria-label="Interactive Systems Connection Graph">
      <div className="max-w-[1520px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
            <div>
              <p className="section-number">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-bronze shadow-[0_0_8px_rgba(156,128,88,0.6)]" />
                INTERACTIVE CONNECTION GRAPH // ARCHITECTURE ATLAS
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-text-primary tracking-tight mb-2">
                How My Systems Interconnect
              </h2>
              <p className="text-xs sm:text-sm text-[#929BA4] max-w-xl leading-relaxed">
                Click any node to explore how programming foundations feed into isolated Linux testbeds, engineering platforms, and verified credentials.
              </p>
            </div>

            {/* View Mode & Filter Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex rounded-lg bg-bg-secondary border border-border-subtle p-1 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setViewMode('graph')}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    viewMode === 'graph'
                      ? 'bg-accent-primary text-bg-primary font-semibold shadow-sm'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                  aria-pressed={viewMode === 'graph'}
                >
                  Graph View
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-accent-primary text-bg-primary font-semibold shadow-sm'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                  aria-pressed={viewMode === 'list'}
                >
                  List View
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Category Filters Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 no-scrollbar text-xs font-mono">
          {(['all', 'language', 'system', 'build', 'proof'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-lg border transition-all shrink-0 capitalize cursor-pointer ${
                filterCategory === cat
                  ? 'border-accent-bronze bg-bg-secondary text-text-primary font-bold shadow-sm'
                  : 'border-border-subtle bg-bg-card text-text-secondary hover:text-text-primary'
              }`}
            >
              {cat === 'all' ? 'All Interconnections' : `${cat}s`}
            </button>
          ))}
        </div>

        {/* Visual Graph View */}
        {viewMode === 'graph' ? (
          <div className={`glass-card border border-border-card p-4 sm:p-6 relative overflow-hidden rounded-2xl mb-6 bg-bg-card/95 transition-all ${
            renderMode === '3d'
              ? 'shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_24px_rgba(156,128,88,0.15)] ring-1 ring-accent-bronze/20'
              : ''
          }`}>
            <svg
              viewBox="0 0 1100 440"
              className="w-full h-auto select-none"
              style={{ minHeight: '340px' }}
              role="img"
              aria-label="Interactive graph of technologies, systems, and projects"
            >
              <defs>
                <linearGradient id={`${gradientId}-line`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={isDark ? '#9C8058' : '#8B6D42'} stopOpacity="0.95" />
                  <stop offset="100%" stopColor={isDark ? '#F1EEE8' : '#20252B'} stopOpacity="0.95" />
                </linearGradient>
              </defs>

              {/* Background Reference Grid & Column Guidelines */}
              <g opacity={isDark ? 0.12 : 0.08}>
                <line x1="265" y1="20" x2="265" y2="420" stroke={isDark ? '#343A40' : '#D6D0C4'} strokeDasharray="4 4" />
                <line x1="565" y1="20" x2="565" y2="420" stroke={isDark ? '#343A40' : '#D6D0C4'} strokeDasharray="4 4" />
                <line x1="855" y1="20" x2="855" y2="420" stroke={isDark ? '#343A40' : '#D6D0C4'} strokeDasharray="4 4" />
              </g>

              {/* Column Category Headers */}
              <g opacity="0.6" className="font-mono text-[9px] uppercase tracking-wider" fill={isDark ? '#929BA4' : '#626B73'}>
                <text x="120" y="25" textAnchor="middle">01 // LANGUAGES</text>
                <text x="410" y="25" textAnchor="middle">02 // SYSTEMS &amp; LINUX</text>
                <text x="720" y="25" textAnchor="middle">03 // BUILDS &amp; PLATFORMS</text>
                <text x="990" y="25" textAnchor="middle">04 // VERIFIED PROOF</text>
              </g>

              {/* Graph Edges */}
              {LINKS.map((link) => {
                const sourceNode = NODES.find((n) => n.id === link.source);
                const targetNode = NODES.find((n) => n.id === link.target);
                if (!sourceNode || !targetNode) return null;

                const isConnected =
                  link.source === selectedId || link.target === selectedId;

                const isFiltered =
                  filterCategory === 'all' ||
                  sourceNode.category === filterCategory ||
                  targetNode.category === filterCategory;

                return (
                  <line
                    key={`${link.source}-${link.target}`}
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke={
                      isConnected
                        ? `url(#${gradientId}-line)`
                        : isDark ? '#343A40' : '#D6D0C4'
                    }
                    strokeWidth={isConnected ? 2.5 : 1.2}
                    strokeDasharray={isConnected ? 'none' : '3 3'}
                    opacity={!isFiltered ? 0.08 : isConnected ? 1 : 0.4}
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* Graph Nodes */}
              {NODES.map((node) => {
                const isSelected = node.id === selectedId;
                const isConnected = connectedNodeIds.has(node.id);
                const isFiltered = filterCategory === 'all' || node.category === filterCategory;

                const baseColor = getCategoryColor(node.category);

                return (
                  <g
                    key={node.id}
                    tabIndex={0}
                    role="button"
                    aria-label={`${node.label} (${getCategoryLabel(node.category)})`}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedId(node.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedId(node.id);
                      }
                    }}
                    className="cursor-pointer focus:outline-none transition-all duration-300"
                    opacity={!isFiltered ? 0.15 : 1}
                  >
                    {/* Active highlight aura */}
                    {isSelected && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={34}
                        fill="#9C8058"
                        opacity={0.2}
                        className="animate-pulse"
                      />
                    )}

                    {/* Node Background */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isSelected ? 22 : isConnected ? 19 : 17}
                      fill={isDark ? '#121923' : '#FFFFFF'}
                      stroke={
                        isSelected
                          ? isDark ? '#9C8058' : '#8B6D42'
                          : isConnected
                          ? isDark ? '#F1EEE8' : '#20252B'
                          : isDark ? '#343A40' : '#D6D0C4'
                      }
                      strokeWidth={isSelected ? 2.5 : isConnected ? 2 : 1.5}
                      className="transition-all duration-300"
                    />

                    {/* Node Core Dot */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isSelected ? 6 : 4}
                      fill={baseColor}
                    />

                    {/* Node Label Pill Background */}
                    <rect
                      x={node.x - 48}
                      y={node.y + 25}
                      width={96}
                      height={18}
                      rx={4}
                      fill={isDark ? '#090D12' : '#F3F0E9'}
                      opacity={0.88}
                      className="pointer-events-none"
                    />

                    {/* Node Label */}
                    <text
                      x={node.x}
                      y={node.y + 37}
                      textAnchor="middle"
                      fill={isSelected ? (isDark ? '#F1EEE8' : '#20252B') : isConnected ? (isDark ? '#9C8058' : '#8B6D42') : (isDark ? '#929BA4' : '#626B73')}
                      fontSize="10"
                      fontFamily="var(--font-mono)"
                      fontWeight={isSelected ? '700' : '500'}
                      className="pointer-events-none transition-colors"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        ) : (
          /* Accessible List View Fallback */
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {NODES.filter((n) => filterCategory === 'all' || n.category === filterCategory).map((node) => (
              <button
                key={node.id}
                type="button"
                onClick={() => setSelectedId(node.id)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedId === node.id
                    ? 'border-accent-bronze bg-bg-secondary shadow-md'
                    : 'border-border-subtle bg-bg-card hover:border-accent-bronze/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-text-primary">{node.label}</span>
                  <span className="text-[10px] font-mono text-accent-bronze">{getCategoryLabel(node.category)}</span>
                </div>
                <p className="text-xs text-text-secondary font-mono line-clamp-2">{node.description}</p>
              </button>
            ))}
          </div>
        )}

        {/* Selected Node Telemetry HUD Card (Wide, punchy, scannable) */}
        <div className="corner-hud p-5 sm:p-6 rounded-2xl bg-bg-card border border-border-subtle shadow-card">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border-subtle">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-bg-secondary border border-border-subtle text-accent-bronze">
                  {getCategoryLabel(selectedNode.category)}
                </span>
                <span className="text-xs font-mono text-text-secondary">Node ID: {selectedNode.id}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-text-primary">
                {selectedNode.label}
              </h3>
            </div>

            {selectedNode.jumpLink && selectedNode.jumpLabel && (
              <a
                href={selectedNode.jumpLink}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-bg-primary border border-border-subtle text-xs font-mono text-text-primary hover:border-accent-bronze transition-colors self-start md:self-auto shadow-sm"
              >
                <span>{selectedNode.jumpLabel}</span>
              </a>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-4 text-xs font-mono">
            <div>
              <p className="text-accent-bronze uppercase mb-1">Core Functionality</p>
              <p className="text-text-primary">{selectedNode.description}</p>
            </div>
            <div>
              <p className="text-accent-bronze uppercase mb-1">Architectural Integration</p>
              <p className="text-text-secondary">{selectedNode.details}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
