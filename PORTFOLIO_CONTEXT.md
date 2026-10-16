# Comprehensive Portfolio Context & Agent Handbook

> **Target Audience for this Document**: AI Agents & Engineers continuing the development, maintenance, or refinement of Amritesh Mishra's portfolio.
> **Core Directive**: Keep the site lean, authentic, and high-signal. Eliminate all AI-generated buzzword fluff ("AI slop"). Prioritize 5-second recruiter comprehension and verified technical depth.

---

## 1. Identity & Core Profile (Single Source of Truth)

| Field | Verified Value |
| :--- | :--- |
| **Full Name** | Amritesh Mishra |
| **Preferred Name** | Amrit |
| **Headline / Positioning** | Computer Science Engineering Undergrad · Backend Developer · Linux & Systems Enthusiast · Security Learner |
| **Current Education** | B.E. Computer Science & Engineering (2025 — 2029, progressing into 2nd year) |
| **Institution** | Excel Engineering College (Affiliated with Anna University, Chennai, India) |
| **Academic Standing** | **Current CGPA: 8.88 / 10.00** |
| **Origin & Journey** | Born in Rautahat, Nepal → Lived in Kathmandu → Currently based in Chennai, India |
| **Daily Driver OS** | Debian 13 (Trixie) Linux with Bash automation, QEMU/KVM virtual testbeds, & custom dotfiles |
| **Languages Spoken** | Nepali, Hindi, Bhojpuri, Maithili (Native/Multilingual); English (Professional, Duolingo: 105); Tamil (Conversational); Japanese (Elementary, JL-NAT N5 level) |
| **Email** | `contact@amritesh.com.np` |
| **Portfolio Domain** | `https://amritesh.com.np` |
| **GitHub** | `https://github.com/amrit-verse` |
| **LinkedIn** | `https://www.linkedin.com/in/amriteshmishra0` |
| **TryHackMe** | `https://tryhackme.com/p/amriteshmishra729` |
| **HackerRank** | `https://www.hackerrank.com/profile/amriteshmishra71` |

---

## 2. The 3 Core Pillars (Every Section Must Reinforce These)

1. **Backend Development**:
   - Node.js/Express and Java (Spring Boot) REST APIs.
   - Relational & document data models (PostgreSQL, MySQL, MongoDB).
   - Type-safe schema validation (TypeScript, Zod), clean migrations via Prisma ORM, and Auth.js RBAC.
2. **Linux & Systems Engineering**:
   - Daily workstation runs Debian Linux; automates environment setup with raw Bash scripts.
   - Understanding process trees, systemd units, memory footprints, and kernel internals.
   - Local hypervisor setups with QEMU/KVM for virtual network isolation.
3. **Cybersecurity Learning & Network Diagnostics**:
   - Hands-on packet inspection with Wireshark and network reconnaissance with Nmap.
   - Leader of **Team Sudo** in the **Smart India Hackathon (SIH 2026)** tackling NTRO challenge (SIH26145).
   - Practical understanding of defense-in-depth, RBAC, cryptographic signatures, and secure auth flows.

---

## 3. The "Anti-AI Slop" Manifesto (Strict Guidelines)

When AI models build portfolios, they often default to repetitive, hollow tropes that hiring managers immediately recognize and reject. **Strictly adhere to the following rules:**

### What NEVER to Do:
- ❌ **No Hollow Buzzwords**: Ban phrases like *"Passionate engineer leveraging cutting-edge paradigms"*, *"Orchestrating end-to-end digital synergies"*, *"Tech enthusiast with a vision"*, or *"Crafting seamless user journeys"*.
- ❌ **No Fake Skill Percentages / Progress Bars**: Never display `"React: 90%"`, `"Python: 85%"`, or `"Linux: 95%"`. They are meaningless and look amateurish.
- ❌ **No Overcrowding / Component Bloat**: Do not add random 3D canvas spheres, floating particles that lag the CPU, or redundant sections (e.g., separate "Hobbies", "Philosophy", or unverified "Testimonials").
- ❌ **No Inflated Infrastructure Claims**: Never claim a personal project handles "millions of requests" or runs on "enterprise multi-region Kubernetes clusters" unless backed by code and deployment logs.
- ❌ **No Generic Stock Illustrations**: Avoid cookie-cutter 3D purple isometric illustrations or cartoon avatars. Use authentic terminal outputs, data-flow diagrams, and real photos.

### What ALWAYS to Do:
- ✅ **Ground Every Claim in Real Context**: Explain the *why* using real-world circumstances (e.g., *"Switched to Debian at 14 because Windows was sluggish on an old family PC"*, *"Built Attendance OS because Anna University detains students below 75% attendance"*).
- ✅ **Show Monospace Architecture Data Flows**: Show the exact request lifecycle (`Client -> App Router -> Auth.js RBAC -> Prisma ORM -> PostgreSQL`).
- ✅ **Natural, First-Person Voice**: Sound like a dedicated 2nd-year engineering student who loves getting hands dirty with systems, not a marketing agency.
- ✅ **5-Second Recruiter Test**: Ensure any technical recruiter can glance at the top of the page for 5 seconds and know immediately: **WHO** he is, **WHAT** he builds, and **HOW** he builds it.

---

## 4. Visual Identity & Aesthetic Standard

- **Theme Inspiration**: **DARK Webseries Aesthetic** (like Netflix's *DARK* or *Mr. Robot*).
- **Color Palette**:
  - Background Canvas: Deep Obsidian (`#050608` / `#090c12`)
  - Elevated Cards: Glassmorphism with deep border borders (`#0c0f16` with `border-zinc-800/80`)
  - Specular Accents: Warm Amber (`#e5a93c`) representing time loops / terminal phosphor, with subtle emerald (`#34d399`) for live statuses
  - Typography: Clean sans-serif for headlines; crisp monospace (`font-mono`) for metadata, metrics, timecodes, and system diagnostics
- **Spacing Rhythm**: Clean, uniform section padding (`py-16 sm:py-24 md:py-28`), generous card gutters (`gap-4 sm:gap-6`), and zero horizontal overflow.
- **Photo / Portrait Presentation**:
  - Keep the portrait clean, unobstructed, and framed naturally in 1:1 aspect ratio.
  - **NEVER** display CGPA, test scores, floating badges, stat pills, or heavy gradient darkening overlays on, over, or around the photo.
  - Academic scores belong exclusively in appropriate academic sections (`Education` and `About`).

---

## 5. Verified Projects Catalog (High Signal Only)

The portfolio features exactly **7 external/actual projects**. Do not add "Personal Portfolio" as a project card.

### 1. Terai Law Students Association (TeLSA) — Production Platform
- **Role**: Full-Stack Developer & Maintainer
- **Problem**: Association was managing memberships and publications across scattered WhatsApp chats and spreadsheets.
- **Implementation**: Production web application with role-based access control (RBAC), membership registry, study resources taxonomy, and editorial CMS.
- **Tech Stack**: Next.js (App Router), React, Prisma ORM, PostgreSQL, Auth.js, Cloudflare R2, Cloudinary, Tailwind CSS.
- **Standout Proof**: Replaced manual WhatsApp roster with 100% RBAC coverage for active student body.

### 2. Attendance OS / Attendance Guardian — Academic Utility
- **Role**: Creator & Architect
- **Problem**: Anna University enforces strict 75% attendance detention rules; students lacked real-time visibility into safe bunks.
- **Implementation**: Zero-latency mathematical calculator and QR/geolocation prototype to compute safe skips, predict recovery hours, and prevent proxy records.
- **Tech Stack**: Next.js, TypeScript, LocalStorage API, Tailwind CSS.
- **Standout Proof**: 100% client-side execution · 0ms server latency · 75% detention threshold calculator.

### 3. Smart Expense Tracker — Financial Analytics Service
- **Role**: Backend Developer
- **Problem**: Expense tracking apps often rely on heavy client-side filtering that becomes sluggish as transaction histories grow.
- **Implementation**: Financial tracking application with multi-stage MongoDB aggregation pipelines computing monthly categorized spending summaries server-side.
- **Tech Stack**: Node.js, Express.js, MongoDB, Mongoose, JWT Auth, Chart.js.
- **Standout Proof**: Optimized aggregation pipelines · Zero client-side data looping · JWT token rotation.

### 4. Library Management System — Full-Stack Academic System
- **Role**: Backend & Systems Developer
- **Problem**: Academic book catalogs struggle with inventory sync, concurrency race conditions, and role authorization.
- **Implementation**: Tiered Spring Boot REST API with full CRUD book lifecycle, transaction isolation, and decoupled client.
- **Tech Stack**: Spring Boot (Java), MySQL, JPA/Hibernate, HTML5, Vanilla JS, Railway, Render, Vercel.
- **Standout Proof**: ACID-compliant database transactions · Multi-cloud deployment topology · 12+ REST endpoints.

### 5. ShopEase — Full-Featured E-Commerce System
- **Role**: Full-Stack Developer
- **Problem**: Small businesses need a resilient shopping checkout flow without paying enterprise monthly SaaS fees.
- **Implementation**: Decoupled React e-commerce application featuring dynamic cart state management, product filtering, and payment gateway integration.
- **Tech Stack**: React, TypeScript, Node.js, Express, MongoDB, Razorpay Payment Gateway.
- **Standout Proof**: Cryptographic webhook signature verification · State machine shopping cart flow.

### 6. Entertain Lawyers — Legal Study & Content Platform
- **Role**: Full-Stack Architecture Contributor
- **Problem**: Legal educational repositories require strict hierarchical taxonomy, document confidentiality, and multi-tier author review.
- **Implementation**: Legal editorial architecture featuring multi-role publication pipelines, categorized study resources, and Cloudflare R2 cloud asset planning.
- **Tech Stack**: Next.js App Router, Prisma ORM, PostgreSQL, Auth.js, Cloudflare R2 (Architecture).
- **Standout Proof**: Multi-tier editorial review workflow · Hierarchical legal resource taxonomy.

### 7. DIODESCAN — Cyber Threat Detection Concept (Smart India Hackathon)
- **Role**: Team Leader (Team Sudo)
- **Problem Statement**: SIH26145 (National Technical Research Organisation - NTRO).
- **Implementation**: Passive cyber-threat detection concept combining network anomaly detection models with raw packet sniffing principles.
- **Tech Stack**: Python, Network Protocols, Threat Detection Models, Linux Networking.
- **Standout Proof**: Smart India Hackathon 2026 Problem SIH26145 · Team Sudo Leadership.

---

## 6. Codebase Architecture & Technical Stack

- **Framework**: Next.js 16.2.7 (App Router, Turbopack)
- **UI Library**: React 19, Tailwind CSS v4
- **State & Animation**: React standard hooks (`useState`, `useEffect`, `useCallback`), CSS keyframe animations (no heavy Framer Motion runtime overhead)
- **Single Source of Truth**: `src/lib/config.ts` controls all metadata, social links, contact email, and academic CGPA.
- **Key Navigation**: Global keyboard shortcuts (`D` = Dossier, `P` = Projects, `L` = Lab, `S` = Skills, `T` = Timeline, `C` = Contact) implemented in `src/components/Navbar.tsx`.

---

## 7. Self-Updating & Dynamic Systems

1. **GitHub Activity Sync (`src/components/GitHubActivity.tsx`)**:
   - Queries GitHub REST API (`https://api.github.com/users/amrit-verse`).
   - Caches in `sessionStorage` with a 10-minute TTL to stay under API rate limits.
   - Includes a manual `[↻ Sync Now]` button that clears cache and queries live on demand.
2. **Automated CI Workflow (`.github/workflows/deploy.yml`)**:
   - Runs `npm ci`, `npm run lint`, and `npm run build` on every push, pull request, manual dispatch, and a weekly cron schedule (`0 0 * * 0`).
3. **Dynamic Timestamps**: Dynamic `new Date().getFullYear()` used in footer.

---

## 8. Guardrails for Any Incoming AI Agent

If tasked with continuing or updating this website, the agent MUST obey these constraints:
1. **Never Rebuild from Scratch**: Preserve the existing Next.js architecture, component modularity, and Tailwind styling.
2. **Keep the Signal-to-Noise Ratio High**: Do NOT introduce new sections unless explicitly instructed. If information can fit inside an existing card or tab, integrate it there.
3. **Never Lower the Academic CGPA**: The current verified record is **8.88 / 10.00**.
4. **Preserve Human Tone**: Keep copy written in grounded, authentic language. Avoid any phrase that sounds like an automated AI template.
5. **Always Verify**: Run `npm run lint` and `npm run build` before considering any task complete. Zero warnings, zero errors.
