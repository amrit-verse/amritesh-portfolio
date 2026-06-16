"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

interface Project {
  number: string;
  name: string;
  tagline: string;
  badge?: string;
  techPreview: string[];
  fullTech: string[];
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  architecture: string;
  challenges: string;
  futureImprovements: string;
  github?: string;
  liveDemo?: string;
  metrics?: string;
}

const projects: Project[] = [
  {
    number: "01",
    name: "Smart Expense Tracker",
    tagline: "Financial analytics dashboard with aggregation pipelines",
    techPreview: ["Node.js", "MongoDB", "Chart.js"],
    fullTech: ["Node.js", "Express", "MongoDB Aggregations", "JWT Auth", "Chart.js"],
    overview:
      "A secure personal finance API and visual dashboard that leverages database aggregation pipelines to generate real-time spending insights.",
    problem:
      "Users require fast, actionable insights into their financial data, which generic banking apps often fail to provide in a customizable format.",
    solution:
      "Built a secure tracking system using JWT authentication and MongoDB aggregation pipelines to process thousands of transactions into visual categories efficiently.",
    features: [
      "Secure JWT-based user authentication and session management",
      "Complex NoSQL aggregation pipelines for spending categorization",
      "Interactive time-series visualizations using Chart.js",
      "Budget threshold monitoring and limit alerts",
    ],
    architecture:
      "Express.js backend serves structured JSON data compiled via MongoDB aggregation pipelines. The frontend charts are rendered client-side to offload server processing.",
    challenges:
      "Writing efficient MongoDB aggregation queries to group and sum transactions dynamically without causing memory bottlenecks on the database cluster.",
    futureImprovements:
      "Implementing Plaid API for automated bank syncing and deploying a caching layer.",
    metrics: "JWT Auth • 4 REST APIs • MongoDB Aggregation • High Data Throughput",
  },
  {
    number: "02",
    name: "Library Management System",
    tagline: "Scalable academic platform with strict role-based access control",
    techPreview: ["Spring Boot", "Java", "MySQL"],
    fullTech: ["Spring Boot", "Java", "MySQL", "JPA/Hibernate", "REST API"],
    overview:
      "A robust, full-stack library management system engineered for academic institutions. Designed to handle high-throughput book tracking and enforce strict authorization boundaries between administrators and students.",
    problem:
      "Academic libraries suffer from data inconsistency and inefficient checkout flows when relying on manual or monolithic legacy systems.",
    solution:
      "Engineered a centralized, cloud-hosted platform using a Spring Boot backend and responsive frontend to automate inventory management.",
    features: [
      "Role-Based Access Control (Admin/User) via Spring Security",
      "Advanced search algorithms for rapid catalog querying",
      "Automated transaction tracking for checkouts/returns",
      "RESTful backend architecture enforcing stateless communication",
    ],
    architecture:
      "The Spring Boot (Java) backend exposes stateless REST APIs, interacting with a normalized MySQL database via JPA/Hibernate.",
    challenges:
      "Designing a robust relational schema that prevented race conditions during concurrent book checkouts.",
    futureImprovements:
      "Implement Redis caching for high-frequency catalog searches.",
    github: "https://github.com/amrit-verse/Library-Management-System",
    metrics: "Spring Security • 12+ REST Endpoints • 5 Relational Entities • ACID Compliance",
  },
  {
    number: "03",
    name: "ShopEase",
    tagline: "High-performance e-commerce engine with secure payment gateways",
    techPreview: ["React", "Express", "MongoDB"],
    fullTech: ["Node.js", "Express", "MongoDB", "React", "TypeScript", "Razorpay API"],
    overview:
      "A modular, responsive e-commerce application focusing on a seamless user checkout experience and comprehensive inventory management.",
    problem:
      "Small vendors face significant technical barriers when establishing online storefronts, specifically concerning secure payment integration.",
    solution:
      "Developed a complete digital storefront with an Express.js backend, providing secure Razorpay payment webhooks and a dynamic React-based shopping cart.",
    features: [
      "Dynamic product catalog with faceted search and filtering",
      "Secure checkout pipeline integrating Razorpay payment gateways",
      "Stateful shopping cart and persistent user order history",
      "Seller dashboard for real-time CRUD operations",
    ],
    architecture:
      "A MERN stack architecture. The React frontend communicates with a scalable Node.js/Express API. MongoDB stores heterogeneous product schemas.",
    challenges:
      "Implementing idempotent webhook handlers to verify Razorpay transactions securely and prevent duplicate order fulfillment.",
    futureImprovements:
      "Microservice extraction for the payment processing module.",
    github: "https://github.com/amrit-verse/ShopEase",
    metrics: "OAuth Authentication • Webhook Integration • Document DB • Secure Transacting",
  },
  {
    number: "04",
    name: "AI Bus Tracker",
    tagline: "Real-time geospatial tracking and predictive arrival estimation",
    techPreview: ["Python", "WebSockets", "GeoJSON"],
    fullTech: ["Python", "FastAPI", "WebSockets", "PostGIS", "Machine Learning"],
    overview:
      "A real-time transit tracking system that ingests live GPS coordinates and utilizes predictive algorithms to estimate arrival times accurately.",
    problem:
      "Public transit systems often suffer from unpredictable delays that static schedules cannot accommodate, frustrating daily commuters.",
    solution:
      "Engineered a high-frequency WebSocket architecture to stream geospatial data in real-time, coupled with a lightweight prediction model for ETA calculations.",
    features: [
      "Bi-directional WebSocket streams for sub-second location updates",
      "Geospatial queries utilizing PostGIS boundaries",
      "Predictive arrival time adjustments based on historical traffic data",
      "Concurrent connection handling for thousands of active clients",
    ],
    architecture:
      "A Python FastAPI backend handles asynchronous WebSocket connections, while PostGIS efficiently queries location data against bus route polygons.",
    challenges:
      "Optimizing the WebSocket broadcasting loop to prevent server memory bloat when pushing updates to heavily congested client areas.",
    futureImprovements:
      "Integrating external traffic APIs to improve the predictive arrival model's accuracy during extreme weather conditions.",
    metrics: "Token Auth • WebSocket API • Geospatial Entities • Real-time Data Streaming",
  },
  {
    number: "05",
    name: "Sniffer",
    tagline: "Low-level network packet analyzer and protocol decoder",
    techPreview: ["C", "eBPF", "Libpcap"],
    fullTech: ["C", "Linux Kernel", "Libpcap", "eBPF", "CLI Development"],
    overview:
      "A command-line network exploration tool that hooks into the Linux kernel to capture, decode, and analyze raw TCP/IP packets in real-time.",
    problem:
      "Understanding low-level network behaviors and diagnosing malformed packets requires tools capable of bypassing standard OS networking stacks.",
    solution:
      "Developed a custom packet sniffer leveraging libpcap and eBPF to safely monitor network interfaces and dissect headers (Ethernet, IP, TCP/UDP).",
    features: [
      "Real-time interception of promiscuous mode network traffic",
      "Deep protocol dissection of IP headers, TCP flags, and payload lengths",
      "Configurable filtering rules using BPF syntax",
      "Memory-safe packet buffering to prevent kernel panics",
    ],
    architecture:
      "Written in C, the tool interfaces directly with Linux AF_PACKET sockets or libpcap. It parses raw byte streams into structured C structs representing protocol headers.",
    challenges:
      "Managing memory buffers and pointer arithmetic accurately when parsing malformed or dynamically-sized packet payloads without causing segmentation faults.",
    futureImprovements:
      "Adding a terminal user interface (TUI) via ncurses and implementing automated anomaly detection for port scanning attacks.",
    metrics: "No Auth • System Level API • 0 DB Entities • Kernel-space Execution",
  },
  {
    number: "06",
    name: "Attendance Guardian",
    tagline: "Cryptographic QR & geolocation verification system",
    badge: "Prototype",
    techPreview: ["Node.js", "Geolocation", "QR Auth"],
    fullTech: ["Node.js", "QR Generation", "Geolocation APIs", "WebSockets"],
    overview:
      "An advanced attendance verification prototype that mitigates proxy attendance by combining dynamic QR code generation with strict geolocation boundaries.",
    problem:
      "Traditional physical and static-digital attendance systems are highly susceptible to proxying, leading to inaccurate institutional reporting.",
    solution:
      "Designed a hybrid verification system requiring students to scan a time-sensitive QR code while physically present within a geofenced coordinate radius.",
    features: [
      "Time-to-Live (TTL) dynamic QR code generation",
      "Strict geofencing using browser Geolocation APIs",
      "Real-time WebSocket dashboard for administrative monitoring",
      "Automated CSV/PDF export of attendance records",
    ],
    architecture:
      "The backend orchestrates token generation and spatial verification logic, while the frontend captures device location and renders analytics.",
    challenges:
      "Calibrating geolocation accuracy tolerances to account for indoor GPS drift without increasing false-negative attendance rejections.",
    futureImprovements:
      "Integrating hardware-bound device fingerprinting and biometric WebAuthn.",
    metrics: "Role-Based Auth • REST & WSS APIs • Geolocation Entites • Cryptographic Token Security",
  },
];

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-text-secondary transition-transform duration-300 ${
        expanded ? "rotate-180" : ""
      }`}
      aria-hidden="true"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Projects() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleProject = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="projects" className="py-16 sm:py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal>
          <span className="section-number">03</span>
          <h2 id="projects-title" className="font-bold mb-3 text-text-primary" style={{ fontSize: 'clamp(1.5rem, 3vw + 0.5rem, 2.25rem)' }}>
            Featured Projects
          </h2>
          <p className="text-text-secondary max-w-2xl">
            Real-world applications built with modern technologies
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-accent-blue to-accent-purple mt-4 mb-8 sm:mb-12" />
        </ScrollReveal>

        {/* Project List */}
        <div className="space-y-6">
          {projects.map((project, index) => {
            const isExpanded = expandedId === project.number;

            return (
              <ScrollReveal key={project.number} delay={index * 100}>
                <div className="glass-card overflow-hidden hover:!transform-none">
                  {/* Project Header — Always Visible */}
                  <div
                    className="flex items-start justify-between p-4 sm:p-6 cursor-pointer"
                    onClick={() => toggleProject(project.number)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    aria-controls={`project-body-${project.number}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleProject(project.number);
                      }
                    }}
                  >
                    {/* Left Side */}
                    <div className="flex items-start gap-4">
                      <span className="text-accent-blue font-mono text-sm opacity-50 mt-1">
                        {project.number}
                      </span>
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h3 id={`project-heading-${project.number}`} className="text-lg sm:text-xl font-semibold text-text-primary">
                            {project.name}
                          </h3>
                          {project.badge && (
                            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              {project.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-text-secondary mt-1">
                          {project.tagline}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {project.techPreview.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs font-mono px-2.5 py-1 rounded-full bg-bg-tertiary text-text-secondary border border-border-subtle"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Side — Toggle */}
                    <button
                      className="project-toggle mt-1 p-1 rounded-lg hover:bg-bg-tertiary transition-colors duration-200"
                      aria-label="Toggle project details"
                      tabIndex={-1}
                    >
                      <ChevronIcon expanded={isExpanded} />
                    </button>
                  </div>

                  {/* Project Body — Expandable */}
                  <div
                    id={`project-body-${project.number}`}
                    className={`project-body ${isExpanded ? "expanded" : ""}`}
                    role="region"
                    aria-labelledby={`project-heading-${project.number}`}
                  >
                    <div>
                      <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2">
                        {/* Divider */}
                        <div className="h-px bg-border-subtle mb-6" />

                        {/* Overview */}
                        <p className="text-text-secondary leading-relaxed mb-6">
                          {project.overview}
                        </p>

                        {/* Detail Grid */}
                        <div className="grid gap-6 md:grid-cols-2">
                          <div>
                            <h4 className="text-sm font-semibold text-accent-blue uppercase tracking-wider mb-2">
                              Problem
                            </h4>
                            <p className="text-sm text-text-secondary">
                              {project.problem}
                            </p>
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold text-accent-blue uppercase tracking-wider mb-2">
                              Solution
                            </h4>
                            <p className="text-sm text-text-secondary">
                              {project.solution}
                            </p>
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold text-accent-blue uppercase tracking-wider mb-2">
                              Key Features
                            </h4>
                            <ul className="space-y-1.5">
                              {project.features.map((feature) => (
                                <li
                                  key={feature}
                                  className="text-sm text-text-secondary flex items-start gap-2"
                                >
                                  <span className="w-1 h-1 rounded-full bg-accent-blue mt-2 shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold text-accent-blue uppercase tracking-wider mb-2">
                              Future Improvements
                            </h4>
                            <p className="text-sm text-text-secondary">
                              {project.futureImprovements}
                            </p>
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold text-accent-blue uppercase tracking-wider mb-2">
                              Challenges
                            </h4>
                            <p className="text-sm text-text-secondary">
                              {project.challenges}
                            </p>
                          </div>
                        </div>

                        {/* Full Tech Stack */}
                        <div className="mt-6">
                          <h4 className="text-sm font-semibold text-accent-blue uppercase tracking-wider mb-2">
                            Tech Stack
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.fullTech.map((tech) => (
                              <span
                                key={tech}
                                className="text-xs font-mono px-2.5 py-1 rounded-full bg-bg-tertiary text-text-secondary border border-border-subtle"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Metrics */}
                        {project.metrics && (
                          <div className="mt-6 px-4 py-3 rounded-lg bg-accent-blue-dim border border-accent-blue/10">
                            <p className="text-xs text-accent-blue font-mono">{project.metrics}</p>
                          </div>
                        )}

                        {/* Links */}
                        {(project.github || project.liveDemo) && (
                          <div className="flex flex-wrap gap-3 mt-6">
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-bg-tertiary border border-border-subtle rounded-xl min-h-[2.75rem] px-5 text-sm font-medium text-text-secondary hover:border-border-hover hover:text-text-primary hover:bg-bg-tertiary/80 active:scale-[0.97] transition-all duration-300"
                                aria-label={`View ${project.name} source code on GitHub`}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                                </svg>
                                View Source
                              </a>
                            )}
                            {project.liveDemo && (
                              <a
                                href={project.liveDemo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-accent-blue text-white rounded-xl min-h-[2.75rem] px-5 text-sm font-semibold hover:bg-[#6aa2ff] hover:scale-[1.02] active:scale-[0.97] shadow-[0_4px_20px_rgba(79,143,247,0.3)] transition-all duration-300"
                                aria-label={`View ${project.name} live demo`}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                  <circle cx="12" cy="12" r="10" />
                                  <line x1="2" y1="12" x2="22" y2="12" />
                                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                </svg>
                                Live Demo
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
