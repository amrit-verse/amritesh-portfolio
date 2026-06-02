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
}

const projects: Project[] = [
  {
    number: "01",
    name: "Library Management System",
    tagline: "Full-stack academic library platform with role-based access control",
    techPreview: ["Spring Boot", "Java", "MySQL"],
    fullTech: ["Spring Boot", "Java", "MySQL", "HTML", "CSS", "JavaScript", "Railway", "Render", "Vercel"],
    overview:
      "A comprehensive library management platform designed for academic institutions, featuring separate admin and user interfaces with full CRUD operations and cloud deployment.",
    problem:
      "Academic libraries often struggle with manual book tracking, resulting in lost inventory, inefficient checkouts, and poor user experience.",
    solution:
      "Built a centralized system with role-based access, search-driven catalog management, and cloud-hosted backend services for reliable operation.",
    features: [
      "Role-based authentication (Admin/User)",
      "Admin dashboard with CRUD operations",
      "User catalog, search, and borrowing flow",
      "RESTful backend architecture",
      "Inventory tracking with search",
      "Cloud deployment across Railway, Render, and Vercel",
    ],
    architecture:
      "Spring Boot backend serves REST APIs, while the frontend uses vanilla JavaScript and responsive HTML/CSS. MySQL stores books and transactions.",
    challenges:
      "Securing role-based access and maintaining consistent behavior across multiple deployment platforms.",
    futureImprovements:
      "Add reporting exports and automated overdue reminders for library administrators.",
  },
  {
    number: "02",
    name: "ShopEase",
    tagline: "Modern e-commerce platform with complete shopping flow",
    techPreview: ["React", "TypeScript", "MongoDB"],
    fullTech: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Razorpay"],
    overview:
      "A responsive e-commerce application offering product discovery, checkout, and order tracking for small-business sellers.",
    problem:
      "Small businesses need affordable, easy-to-manage online stores without enterprise-level setup.",
    solution:
      "Built a modular shopping experience with product browsing, secure checkout, and order management for buyers and sellers.",
    features: [
      "Product catalog with categories",
      "Advanced filtering and search",
      "Shopping cart and secure checkout",
      "User authentication and order history",
      "Seller dashboard with product management",
      "Razorpay payment integration",
    ],
    architecture:
      "React frontend consumes an Express REST API. MongoDB stores products, users, and orders. Payment flows are verified through Razorpay webhooks.",
    challenges:
      "Handling payment verification and real-time cart updates while keeping the user interface responsive.",
    futureImprovements:
      "Add inventory alerts and multi-currency support for broader adoption.",
  },
  {
    number: "03",
    name: "Attendance Guardian",
    tagline: "QR + geolocation attendance system prototype",
    badge: "Prototype",
    techPreview: ["QR Code", "Geolocation", "Analytics"],
    fullTech: ["QR Code Generation", "Geolocation API", "Real-time Analytics", "Role-based Access"],
    overview:
      "A prototype attendance system that combines QR scanning with location checks to improve accuracy and provide administrators with real-time analytics.",
    problem:
      "Traditional attendance systems are vulnerable to proxy attendance and lack real-time visibility for administrators.",
    solution:
      "Introduced a QR-based sign-in workflow with geolocation verification and a dashboard for attendance reporting.",
    features: [
      "QR code-based attendance capture",
      "Geolocation verification",
      "Real-time analytics dashboard",
      "Leave management workflows",
      "Role-based access for students and admins",
      "Exportable attendance reports",
    ],
    architecture:
      "PWA-style frontend communicates with an attendance service, using geolocation checks and WebSocket updates for dashboard analytics.",
    challenges:
      "Balancing location accuracy and compatibility across devices, while keeping the system easy to use.",
    futureImprovements:
      "Add secure time-based QR tokens and more robust anti-proxy protections.",
  },
  {
    number: "04",
    name: "Smart Expense Tracker",
    tagline: "Personal finance tool with visual analytics",
    techPreview: ["Node.js", "MongoDB", "Chart.js"],
    fullTech: ["Node.js", "Express", "MongoDB", "JWT", "Chart.js"],
    overview:
      "A personal finance dashboard that helps users track spending, categorize expenses, and review trends through visual reports.",
    problem:
      "Many people lack visibility into spending habits, making budgeting and financial planning difficult.",
    solution:
      "Built a secure expense tracking app with categorized transactions, charts, and reporting for quick insights.",
    features: [
      "Expense tracking with categories",
      "Interactive visual analytics",
      "Monthly and weekly reporting",
      "JWT-based authentication",
      "Budget tracking and alerts",
      "Data export options",
    ],
    architecture:
      "Express backend uses MongoDB aggregation pipelines for analytics, while Chart.js renders interactive visual summaries on the frontend.",
    challenges:
      "Optimizing analytics queries for responsive chart updates with changing data.",
    futureImprovements:
      "Add recurring transactions and budget forecasting tools.",
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
    <section id="projects" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <ScrollReveal>
          <span className="section-number">03</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-text-primary">
            Featured Projects
          </h2>
          <p className="text-text-secondary max-w-2xl">
            Real-world applications built with modern technologies
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-accent-blue to-accent-purple mt-4 mb-12" />
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
                    className="flex items-start justify-between p-6 cursor-pointer"
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
                          <h3 id={`project-heading-${project.number}`} className="text-xl font-semibold text-text-primary">
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
                      <div className="px-6 pb-6 pt-2">
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

                        {/* Links */}
                        {project.github && (
                          <div className="flex gap-3 mt-6">
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-bg-tertiary border border-border-subtle rounded-lg px-4 py-2 text-sm text-text-secondary hover:border-border-hover hover:text-text-primary transition-all duration-300"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                              </svg>
                              View Source
                            </a>
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
