# Amritesh Mishra — Portfolio

A premium dark-themed portfolio website built with **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Static Export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom design system
- **Fonts**: Inter + JetBrains Mono (Google Fonts)
- **Icons**: Inline SVG (zero dependencies)
- **Animations**: CSS transitions + IntersectionObserver
- **API**: GitHub REST API v3 (cached in sessionStorage)

## Features

- 🎨 Premium dark theme with glass morphism
- 📱 Fully responsive (mobile-first)
- ♿ Accessible (WCAG 2.1 AA, keyboard nav, screen reader)
- 🔍 SEO optimized (Open Graph, Twitter Cards, JSON-LD)
- ⚡ Static export — deploy anywhere
- 🌐 Live GitHub API integration with caching
- 🎯 10 sections: Hero, About, Focus, Projects, Skills, Education, Learning, GitHub, Contact, Footer

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production (static export)
npm run build

# The static output is in the `out/` directory
```

## Deployment

### Vercel (Recommended)
```bash
npx vercel --prod
```

### GitHub Pages
1. Run `npm run build`
2. Deploy the `out/` directory

### Netlify
1. Set build command: `npm run build`
2. Set publish directory: `out`

### Any Static Host
The `out/` directory contains a fully static site that can be served by any web server.

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Design system + custom Tailwind theme
│   ├── layout.tsx       # Root layout with metadata & SEO
│   └── page.tsx         # Page compositor
├── components/
│   ├── Navbar.tsx       # Glass nav with scroll tracking
│   ├── Hero.tsx         # Full-viewport hero section
│   ├── About.tsx        # Personal story + stats
│   ├── CurrentFocus.tsx # Focus area cards
│   ├── Projects.tsx     # Expandable project case studies
│   ├── Skills.tsx       # Three-tier skill tags
│   ├── Education.tsx    # Vertical timeline
│   ├── LearningJourney.tsx  # Platform cards
│   ├── GitHubActivity.tsx   # Live GitHub API
│   ├── Contact.tsx      # Contact links
│   ├── Footer.tsx       # Footer with socials
│   └── ScrollReveal.tsx # Scroll animation hook
public/
├── avatar.svg           # Custom SVG avatar
├── favicon.svg          # Gradient AM favicon
└── robots.txt           # SEO
```

## License

© 2026 Amritesh Mishra. All rights reserved.
