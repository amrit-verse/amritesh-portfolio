'use client';

import { useState, useEffect } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import ProjectCard3D from '@/components/ProjectCard3D';

interface Project {
  number: string;
  name: string;
  tagline: string;
  badge?: string;
  category: 'backend' | 'fullstack' | 'systems';
  techPreview: string[];
  fullTech: string[];
  showOffStat: string;
  overview: string;
  whyIBuiltIt: string;
  keyFeatures: string[];
  architecture: string;
  dataFlow: string;
  hardestPart: string;
  github?: string;
  liveDemo?: string;
  highlight: string;
}

const projects: Project[] = [
  {
    number: '01',
    name: 'ReleaseTrace',
    tagline: 'Release intelligence platform with memory, evidence & human control',
    badge: 'Flagship Platform',
    category: 'fullstack',
    techPreview: ['Next.js 15.1', 'TypeScript', 'Hindsight Cloud Memory', 'Inngest'],
    fullTech: ['Next.js 15.1', 'TypeScript', 'Prisma 6', 'Neon PostgreSQL', 'Inngest', 'Groq', 'Hindsight Cloud', 'Zod', 'Vitest + Playwright'],
    showOffStat: 'HMAC-SHA256 Signed Telemetry · Persistent Incident Memory · Human Confirmation Gate',
    overview:
      'A release intelligence agent that ingests HMAC-SHA256-signed deployment webhooks, recalls past release incidents from Hindsight Cloud memory, diffs environment configurations, and synthesizes a risk assessment with a Groq LLM — validated by Zod and gated behind human confirmation.',
    whyIBuiltIt:
      'Deployments fail the same way twice because nothing remembers the last incident. I wanted an agent that recalls prior release behavior before judging a new one, and that refuses to guess when evidence is thin — relevance scoring has explicit abstention paths.',
    keyFeatures: [
      'Signed webhook ingestion (HMAC-SHA256) for deployment telemetry',
      'Persistent incident memory via Hindsight Cloud for cross-release recall',
      'Environment diffing with deterministic risk rules and abstention on low-confidence signals',
      'Groq LLM synthesis with Zod schema validation and a human confirmation gate',
      'Event-driven background jobs on Inngest; 101 vitest + Playwright tests',
    ],
    architecture:
      'Next.js 15.1 App Router with Prisma 6 on Neon PostgreSQL. Inngest handles event-driven evaluation; a Groq-backed synthesis step produces the final release report only after deterministic rules pass.',
    dataFlow: 'CI/CD Webhook ──> HMAC Validator ──> Inngest Jobs ──> Hindsight Memory Recall ──> Diff Engine ──> Groq + Zod Report ──> Human Gate',
    hardestPart:
      'Designing the abstention path: the agent must say "insufficient evidence" instead of inventing a risk verdict when memory recall returns weak matches.',
    github: 'https://github.com/amrit-verse/ReleaseTrace',
    liveDemo: 'https://release-trace-red.vercel.app/dashboard',
    highlight: 'Next.js 15.1 • Hindsight Memory • Inngest • Groq Synthesis • 101 Tests',
  },
  {
    number: '02',
    name: 'ThreatDesk',
    tagline: 'Enterprise Digital Risk Protection (DRP) for brand & impersonation monitoring',
    badge: 'HacXLerate 2026',
    category: 'systems',
    techPreview: ['Python 3.13', 'PostgreSQL 16', '66 Detection Rules', 'ML Regression'],
    fullTech: ['Python 3.13', 'PostgreSQL 16', '66 Deterministic Rules', 'Logistic Regression Evaluator', 'AppArmor', 'Pytest (357 Tests)'],
    showOffStat: '357 Automated Tests (100% Pass) · 66 Deterministic Rules · 0% FP on Official Assets',
    overview:
      'An enterprise-grade Digital Risk Protection (DRP) platform built to detect brand impersonation, typosquatting domains, rogue mobile apps, and unauthorized social profiles without brittle black-box heuristics.',
    whyIBuiltIt:
      'Engineered for ByteXL HacXLerate 2026 (Challenge 3). Existing commercial risk platforms either rely on slow manual analyst queues or brittle AI calls that hallucinate false positives on legitimate corporate domains.',
    keyFeatures: [
      '66 deterministic detection rules with negative scoring for verified corporate defensive assets',
      'Zero-code-execution Python logistic regression evaluator with precomputed weights',
      'Strict pre-inference official brand asset exclusion gate guaranteeing 0% false positives',
      'Automated headless Chrome screenshot and evidentiary capture pipeline',
    ],
    architecture:
      'Modular Python backend with PostgreSQL 16 persistence. Evaluates endpoint streams through deterministic scoring chains and mathematical logistic regression, verified across 357 automated test suites.',
    dataFlow: 'Monitored Endpoints ──> Deterministic Scoring (66 Rules) ──> ML Risk Gate ──> Evidence Ledger ──> PostgreSQL',
    hardestPart:
      'Eliminating false positives on legitimate defensive domain registrations by building negative-scoring rules and rigorous official asset allowlisting.',
    github: 'https://github.com/amrit-verse/ThreatDesk',
    highlight: 'Python 3.13 • PostgreSQL 16 • 66 Rules • 357 Passing Pytests',
  },
  {
    number: '03',
    name: 'Terai Law Students Association (TeLSA)',
    tagline: 'Official organizational platform & editorial publishing CMS',
    badge: 'Production CMS',
    category: 'fullstack',
    techPreview: ['Next.js 16', 'Prisma', 'PostgreSQL', 'Auth.js'],
    fullTech: ['Next.js 16', 'React 19', 'Prisma ORM', 'PostgreSQL', 'Auth.js (v5)', 'Tailwind CSS', 'Cloudinary'],
    showOffStat: '100% RBAC Coverage · Replaced WhatsApp Roster for Active Student Body',
    overview:
      'A full-stack web portal built for a real law students association, replacing chaotic WhatsApp groups with a unified hub for member profiles, event notices, and student legal publications.',
    whyIBuiltIt:
      'The student association was tracking hundreds of members on disparate spreadsheets and sharing article drafts over chat. They needed a single portal where students could submit legal essays and admins could review, approve, and publish them with proper author credits.',
    keyFeatures: [
      'Role-based permissions (Super Admin, Admin, Member, Guest)',
      'Editorial submission workflow with draft, review, and publish states',
      'Study material and legal research taxonomy',
      'Dynamic SEO sitemaps for public legal articles',
    ],
    architecture:
      'Built using Next.js App Router for server-rendered performance, backed by a PostgreSQL database managed via Prisma ORM. Asset attachments and documents are uploaded and processed through Cloudinary.',
    dataFlow: 'Client Browser ──> Next.js App Router ──> Auth.js RBAC ──> Prisma ORM ──> PostgreSQL + Cloudinary',
    hardestPart:
      'Getting the role-based authorization clean in Next.js Server Actions so that non-admin members cannot manipulate editorial records or change article publication statuses.',
    highlight: 'Next.js 16 • Prisma • PostgreSQL • Auth.js RBAC',
  },
  {
    number: '04',
    name: 'Entertain Lawyers',
    tagline: 'Legal education resource directory & WordPress to Next.js migration',
    badge: 'CMS Migration',
    category: 'fullstack',
    techPreview: ['Next.js 16', 'Prisma 6', 'PostgreSQL', 'Backblaze B2'],
    fullTech: ['Next.js 16', 'React 19', 'Prisma 6', 'PostgreSQL', 'Auth.js (v5)', 'Backblaze B2 (S3)', 'Upstash Redis', 'Cheerio'],
    showOffStat: 'WordPress to Next.js Migration · Backblaze B2 · Prisma 6 Relational Taxonomy',
    overview:
      'A structured legal resource repository and full-scale architectural migration from a legacy WordPress site to a typed Next.js 16, PostgreSQL, and Backblaze B2 cloud storage architecture.',
    whyIBuiltIt:
      'The legacy WordPress platform suffered from database bloat, slow page loads, and fragile plugins. I engineered automated extraction and staging scripts to parse, sanitize, and migrate dense course taxonomies and thousands of resources into a clean relational database.',
    keyFeatures: [
      'Automated ETL migration scripts extracting and sanitizing legacy WordPress data',
      'Hierarchical study taxonomy for legal semesters, subjects, and study materials',
      'Backblaze B2 cloud storage integration via AWS S3 SDK for document downloads',
      'Upstash Redis rate-limiting and performance caching for high-traffic endpoints',
    ],
    architecture:
      'Next.js 16 App Router backed by PostgreSQL via Prisma 6. Custom migration scripts parse and stage data using Cheerio, with assets hosted on Backblaze B2.',
    dataFlow: 'Legacy WordPress ──> Custom ETL Script ──> Prisma 6 Models ──> PostgreSQL + Backblaze B2 S3',
    hardestPart:
      'Reconciling inconsistent WordPress category hierarchies and repairing malformed legacy HTML content during ETL staging without losing relational links to legal subjects.',
    highlight: 'WordPress to Next.js Migration • Prisma 6 • PostgreSQL • Backblaze B2',
  },
  {
    number: '05',
    name: 'DIODESCAN (Smart India Hackathon 2026)',
    tagline: 'Passive AI-driven cyber threat detection for unidirectional IP traffic',
    badge: 'Hackathon Project',
    category: 'systems',
    techPreview: ['Python', 'Traffic Analysis', 'Flow Extraction', 'ML Models'],
    fullTech: ['Python', 'Network Flow Analysis', 'Statistical Feature Extraction', 'Machine Learning Models'],
    showOffStat: 'Team Leader (Team Sudo) · Problem SIH26145 · NTRO Cybersecurity Challenge',
    overview:
      'A passive network monitoring architecture submitted for Smart India Hackathon 2026 (Problem Statement SIH26145: AI-Based Detection of Cyber Threats in Unidirectional IP Traffic) by Team Sudo, where I served as Team Leader.',
    whyIBuiltIt:
      'Unidirectional data diodes protect sensitive networks by physically allowing traffic in only one direction. Traditional active scanning cannot run on one-way links. We designed a passive monitoring pipeline that inspects passing packet flows and classifies threat signatures silently.',
    keyFeatures: [
      'Passive one-way flow observation that leaves zero network footprint',
      'Flow-level statistical feature extraction (packet timing variance, size distributions)',
      'AI/ML threat classification models for anomalous and encrypted patterns',
      'Threat severity confidence scoring and forensic evidence reporting',
    ],
    architecture:
      'Observes one-way network traffic inside an isolated monitoring environment. Extracts flow-level features (packet intervals, directional payload variance) and detects suspicious behavioral anomalies using lightweight classification models.',
    dataFlow: 'Unidirectional Traffic ──> Passive Flow Extraction ──> Statistical Feature Vector ──> ML Threat Classifier ──> Evidence Report',
    hardestPart:
      'Extracting meaningful behavioral indicators from unidirectional streams where return ACKs and two-way handshakes cannot be observed.',
    highlight: 'Team Leader • Team Sudo • Problem SIH26145 • Unidirectional Traffic Detection',
  },
  {
    number: '06',
    name: 'Library Management System',
    tagline: 'Academic inventory platform with strict role separation',
    badge: 'Flagship Backend',
    category: 'backend',
    techPreview: ['Spring Boot', 'Java', 'MySQL', 'REST API'],
    fullTech: ['Spring Boot', 'Java', 'MySQL', 'JPA / Hibernate', 'Docker', 'REST API'],
    showOffStat: 'ACID-Compliant Transactions · Spring Boot · 12+ REST Endpoints',
    overview:
      'A robust Java backend that handles book inventory, automated loan tracking, and strict authorization boundaries between college librarians and students.',
    whyIBuiltIt:
      'This was my primary deep-dive into enterprise backend development with Java and Spring Boot. I wanted to build a complete system with strict database consistency rather than a lightweight script.',
    keyFeatures: [
      'Role-based permissions separating librarian CRUD actions from student searches',
      'Automated checkout tracking and return timestamp auditing',
      'Fast catalog search across title, author, and ISBN',
      'Stateless REST API design with input validation',
    ],
    architecture:
      'Spring Boot application communicating with a normalized MySQL database through JPA/Hibernate. Containerized with Docker for predictable local development and cloud hosting.',
    dataFlow: 'Client Request ──> Spring Security (JWT) ──> Spring REST Controller ──> JPA Transactions ──> MySQL InnoDB',
    hardestPart:
      'Ensuring that concurrent checkout requests for the last physical copy of a book don\'t cause a race condition, handled with database transactions and inventory constraints.',
    github: 'https://github.com/amrit-verse/Library-Management-System',
    highlight: 'Spring Boot • MySQL • JPA Transactions • 12+ Endpoints',
  },
  {
    number: '07',
    name: 'EduTrack (Smart Attendance & OD Calculator)',
    tagline: 'Timetable intelligence & 75% statutory detention calculator',
    badge: 'Featured Web App',
    category: 'systems',
    techPreview: ['JavaScript', 'Timetable Engine', 'OD Simulator', 'Local Storage'],
    fullTech: ['JavaScript', 'HTML5', 'CSS3', 'Timetable Algorithm', 'Leave/OD Simulator', 'Local Storage'],
    showOffStat: 'Instant In-Browser Computation · 0ms Server Latency · 75% Detention Proof',
    overview:
      'An academic attendance intelligence tool that parses college timetables and semester end dates to calculate exact safe bunk margins, On-Duty (OD) buffers, and prove when recovery to 75% is mathematically impossible.',
    whyIBuiltIt:
      'Anna University strictly detains students whose attendance falls below 75%. The official college portal only shows historical percentages, so my classmates were always guessing whether missing a lecture would push them into detention. I built this so anyone can know their exact margin in seconds.',
    keyFeatures: [
      'Automatic class timetable parser calculating remaining hours per subject',
      'Statutory 75% detention prediction with safe absence buffer',
      'On-Duty (OD) simulator testing official duty absences before applying',
      'Instant client-side computation running with zero server latency',
    ],
    architecture:
      'Pure client-side computational engine in modular JavaScript. Computes calendar matrices, lab block hours, and future lecture totals entirely in browser memory with zero network delay.',
    dataFlow: 'Timetable Matrix ──> Client Memory Engine ──> 75% Detention Algorithm ──> Real-time Buffer Trajectory',
    hardestPart:
      'Handling messy academic edge cases: odd/even laboratory blocks (which count as 3 hours), unexpected institutional holidays, and computing the exact inflection point where recovering to 75% becomes impossible.',
    highlight: 'Zero-latency timetable algorithm • 75% Detention proof • OD Simulator',
  },
  {
    number: '08',
    name: 'Smart Expense Tracker',
    tagline: 'Personal finance analytics with server-side database aggregations',
    badge: 'API & Analytics',
    category: 'backend',
    techPreview: ['Node.js', 'Express', 'MongoDB', 'Chart.js'],
    fullTech: ['Node.js', 'Express.js', 'MongoDB Aggregations', 'JWT Auth', 'Chart.js', 'REST API'],
    showOffStat: 'Optimized Aggregation Pipelines · Zero Client-Side Data Looping',
    overview:
      'A personal finance API and dashboard that calculates real-time spending breakdowns using MongoDB database aggregation pipelines rather than sluggish client-side loops.',
    whyIBuiltIt:
      'I wanted to understand how real financial apps handle analytical queries over thousands of user receipts without blowing up memory on the backend.',
    keyFeatures: [
      'Multi-stage MongoDB aggregation pipelines for weekly and monthly category sums',
      'JWT authentication with HTTP-only cookie session handling',
      'Dynamic visual charts showing spending trajectory over time',
      'Custom budget limit alerts per category',
    ],
    architecture:
      'Express backend exposing REST endpoints that trigger optimized NoSQL aggregation pipelines ($group, $match, $project). Chart.js renders the aggregated numbers client-side.',
    dataFlow: 'Express REST Endpoints ──> JWT Auth ──> MongoDB Aggregations ($group/$match) ──> Chart.js View',
    hardestPart:
      'Structuring MongoDB aggregation queries so that category sums across custom date ranges run on indexed fields rather than doing full-collection scans in memory.',
    highlight: 'MongoDB Aggregation Pipelines • JWT Auth • Chart.js',
  },
  {
    number: '09',
    name: 'ShopEase',
    tagline: 'Modular e-commerce store with secure payment webhooks',
    badge: 'Full Stack',
    category: 'fullstack',
    techPreview: ['React', 'Express', 'MongoDB', 'Razorpay'],
    fullTech: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Razorpay API'],
    showOffStat: 'Cryptographic Webhook Verification · State Machine Cart',
    overview:
      'A full-featured digital storefront with category browsing, cart state management, and end-to-end Razorpay payment checkout integration.',
    whyIBuiltIt:
      'I built this to learn how payment gateways and shopping carts actually work behind the scenes, specifically what happens when network calls drop halfway through payment.',
    keyFeatures: [
      'Dynamic product catalog with filtering and search',
      'Persistent shopping cart across browser reloads',
      'Razorpay payment gateway integration with digital signature checks',
      'Seller inventory management dashboard',
    ],
    architecture:
      'MERN stack setup. The React frontend talks to an Express REST API, which stores orders and inventory documents in MongoDB and verifies payments via Razorpay webhooks.',
    dataFlow: 'React Shopping Cart ──> Express API ──> Razorpay Webhook Signatures ──> Idempotent DB Write ──> MongoDB',
    hardestPart:
      'Handling webhook idempotency: making sure that if a customer pays and immediately closes their tab, the server verifies the cryptographic webhook signature from Razorpay and fulfills the order once without duplicates.',
    github: 'https://github.com/amrit-verse/ShopEase',
    highlight: 'Razorpay Webhooks • MERN Stack • Cart State Machine',
  },
];

export default function Projects() {
  const [expandedId, setExpandedId] = useState<string | null>('01');
  const [filter, setFilter] = useState<'all' | 'backend' | 'fullstack' | 'systems'>('all');

  useEffect(() => {
    const handleSelectProject = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setFilter('all');
      setExpandedId(customEvent.detail);
      const target = document.getElementById('projects');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('select-project', handleSelectProject);
    return () => window.removeEventListener('select-project', handleSelectProject);
  }, []);

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.category === filter);

  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case 'Flagship Platform':
      case 'Production CMS':
        return 'bg-accent-bronze/15 text-accent-bronze border-accent-bronze/40 font-semibold';
      case 'HacXLerate 2026':
      case 'Hackathon Project':
        return 'bg-bg-tertiary text-accent-bronze border-border-subtle font-semibold';
      case 'Featured Web App':
      case 'CMS Migration':
        return 'bg-bg-tertiary text-text-primary border-border-subtle font-semibold';
      default:
        return 'bg-bg-card text-text-secondary border-border-subtle';
    }
  };

  return (
    <section id="projects" className="py-16 sm:py-24 md:py-32" aria-label="Featured Projects">
      <div className="max-w-[1520px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
            <div>
              <p className="section-number">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-bronze shadow-[0_0_8px_rgba(156,128,88,0.6)]" />
                DIMENSION 01 // BUILD &amp; ARCHITECTURE
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-text-primary tracking-tight mb-2">
                Featured Engineering Builds
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary max-w-xl leading-relaxed">
                Production platforms, enterprise threat detection suites, and systems tools. Click any card to inspect the real backstories, technical trade-offs, and architecture data flows.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-bg-card border border-border-subtle text-xs font-mono self-start md:self-auto overflow-x-auto max-w-full shrink-0">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filter === 'all'
                    ? 'bg-text-primary text-bg-primary font-bold shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                All (9)
              </button>
              <button
                type="button"
                onClick={() => setFilter('fullstack')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filter === 'fullstack'
                    ? 'bg-text-primary text-bg-primary font-bold shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Full Stack (4)
              </button>
              <button
                type="button"
                onClick={() => setFilter('systems')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filter === 'systems'
                    ? 'bg-text-primary text-bg-primary font-bold shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Systems &amp; Security (3)
              </button>
              <button
                type="button"
                onClick={() => setFilter('backend')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filter === 'backend'
                    ? 'bg-text-primary text-bg-primary font-bold shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Backend &amp; APIs (2)
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Project Card List with 3D Spatial Cards */}
        <div className="space-y-4 sm:space-y-5">
          {filteredProjects.map((project, index) => {
            const isExpanded = expandedId === project.number;

            return (
              <ScrollReveal key={project.name} delay={index * 30}>
                <ProjectCard3D>
                  <div
                    className={`corner-hud glass-card border rounded-2xl overflow-hidden transition-all duration-300 ${
                      isExpanded
                        ? 'border-accent-bronze/70 bg-bg-card shadow-2xl'
                        : 'border-border-card hover:border-accent-bronze/50'
                    }`}
                  >
                    {/* Card Header (Click to expand) */}
                    <div
                      className="p-4 sm:p-6 cursor-pointer select-none"
                      onClick={() => setExpandedId(isExpanded ? null : project.number)}
                      role="button"
                      tabIndex={0}
                      aria-expanded={isExpanded}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setExpandedId(isExpanded ? null : project.number);
                        }
                      }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <span className="text-xs sm:text-sm font-mono font-bold text-accent-bronze pt-0.5">
                            {project.number}
                          </span>
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h3 className="text-base sm:text-lg font-display font-bold text-text-primary group-hover:text-accent-bronze transition-colors">
                                {project.name}
                              </h3>
                              {project.badge && (
                                <span className={`text-[0.6875rem] font-mono px-2 py-0.5 rounded-md border ${getBadgeStyle(project.badge)}`}>
                                  {project.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs sm:text-sm text-text-secondary leading-snug mb-2.5">
                              {project.tagline}
                            </p>

                            {/* Show-off metric pill */}
                            <div className="mb-2.5">
                              <span className="text-[0.6875rem] font-mono px-2.5 py-1 rounded bg-bg-primary border border-border-subtle text-text-primary inline-flex flex-wrap items-center gap-1.5 max-w-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-bronze shrink-0" />
                                <span className="break-words">{project.showOffStat}</span>
                              </span>
                            </div>

                            {/* Quick Tech Preview Badges */}
                            <div className="flex flex-wrap items-center gap-1.5">
                              {project.techPreview.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-[0.6875rem] font-mono px-2 py-0.5 rounded bg-bg-tertiary border border-border-subtle text-text-secondary"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Header Actions */}
                        <div className="flex items-center gap-2 self-end sm:self-start shrink-0 pt-1">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 px-3 py-1.5 min-h-[36px] text-xs font-mono rounded-lg bg-bg-tertiary border border-border-subtle text-text-primary hover:border-accent-bronze transition-colors"
                              aria-label={`View ${project.name} source code on GitHub`}
                            >
                              <span>Code</span>
                              <span className="text-accent-bronze">↗</span>
                            </a>
                          )}

                          <span className="inline-flex items-center gap-1 text-xs font-mono px-2.5 py-1.5 rounded-lg text-text-secondary bg-bg-tertiary border border-border-subtle">
                            {isExpanded ? 'Collapse' : 'Architecture ↓'}
                            <svg
                              className={`w-3.5 h-3.5 text-accent-bronze transition-transform duration-300 ${
                                isExpanded ? 'rotate-180' : ''
                              }`}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2.5}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Expandable Deep Dive Body */}
                    <div className={`project-body ${isExpanded ? 'expanded' : ''}`}>
                      <div>
                        <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-border-subtle bg-bg-card space-y-4 text-xs sm:text-sm">
                          {/* Data-Flow Blueprint */}
                          <div className="mt-3 p-3.5 rounded-xl bg-bg-primary border border-border-subtle font-mono text-[0.6875rem] text-text-primary overflow-x-auto no-scrollbar">
                            <p className="text-accent-bronze uppercase tracking-wider font-bold mb-1 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent-bronze shadow-[0_0_8px_rgba(156,128,88,0.6)]" />
                              System Architecture Blueprint:
                            </p>
                            <p className="text-text-primary whitespace-nowrap">{project.dataFlow}</p>
                          </div>

                          {/* Backstory & Technical Architecture */}
                          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                            <div className="rounded-xl bg-bg-tertiary p-4 border border-border-subtle">
                              <h4 className="text-xs font-mono uppercase tracking-wider text-accent-bronze mb-1.5 flex items-center gap-1.5 font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-bronze" />
                                The Real Backstory
                              </h4>
                              <p className="text-text-secondary leading-relaxed text-xs sm:text-sm">
                                {project.whyIBuiltIt}
                              </p>
                            </div>
                            <div className="rounded-xl bg-bg-tertiary p-4 border border-border-subtle">
                              <h4 className="text-xs font-mono uppercase tracking-wider text-accent-bronze mb-1.5 flex items-center gap-1.5 font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-bronze" />
                                Technical Architecture
                              </h4>
                              <p className="text-text-secondary leading-relaxed text-xs sm:text-sm">
                                {project.architecture}
                              </p>
                            </div>
                          </div>

                          {/* Implemented Features & Hurdle */}
                          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                            <div className="rounded-xl bg-bg-tertiary p-4 border border-border-subtle">
                              <h4 className="text-xs font-mono uppercase tracking-wider text-accent-bronze mb-2 font-bold">
                                Implemented Features
                              </h4>
                              <ul className="space-y-1.5">
                                {project.keyFeatures.map((feat) => (
                                  <li key={feat} className="flex items-start gap-2 text-text-secondary text-xs sm:text-sm">
                                    <span className="text-accent-bronze text-xs mt-0.5">▪</span>
                                    <span>{feat}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="rounded-xl bg-bg-tertiary p-4 border border-border-subtle">
                              <h4 className="text-xs font-mono uppercase tracking-wider text-accent-bronze mb-1.5 font-bold">
                                Hardest Bug / Engineering Hurdle
                              </h4>
                              <p className="text-text-secondary leading-relaxed text-xs sm:text-sm">
                                {project.hardestPart}
                              </p>
                            </div>
                          </div>

                          {/* Full Tech Stack Pills */}
                          <div className="pt-2 border-t border-border-subtle flex flex-wrap items-center justify-between gap-3">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="text-[0.6875rem] font-mono text-text-tertiary mr-1">Full Stack:</span>
                              {project.fullTech.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-[0.6875rem] font-mono px-2 py-0.5 rounded bg-bg-primary border border-border-subtle text-text-primary"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-mono text-accent-bronze hover:text-text-primary hover:underline"
                              >
                                <span>View GitHub Repository</span>
                                <span>→</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ProjectCard3D>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
