import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { SITE_URL, SITE_CONFIG } from "@/lib/config";
import { SoundProvider } from "@/components/SoundSystem";
import { ExperienceProvider } from "@/components/ExperienceContext";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Amritesh Mishra | Understanding systems. Building what lasts.",
  description:
    "Engineering portfolio of Amritesh Mishra. Computer Science undergraduate (Anna University) building robust backends, exploring Linux internals, and analyzing system threat patterns.",
  keywords: [
    "Amritesh Mishra",
    "Software Engineer",
    "Backend Developer",
    "Linux Systems",
    "Cybersecurity",
    "Full Stack Developer",
    "Computer Science Engineering",
    "Next.js",
    "Prisma",
    "PostgreSQL",
    "ReleaseTrace",
    "ThreatDesk",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Amritesh Mishra | Understanding systems. Building what lasts.",
    description:
      "Engineering portfolio of Amritesh Mishra. Focused on robust backend architecture, Linux kernel workflows, and verified system security.",
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${SITE_URL}/icon.png`,
        width: 512,
        height: 512,
        alt: `${SITE_CONFIG.name} — Architecture & Systems Archive`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amritesh Mishra | Understanding systems. Building what lasts.",
    description:
      "Engineering portfolio of Amritesh Mishra. Robust backends, Linux internals, and verified system security.",
    images: [`${SITE_URL}/icon.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090D12",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_CONFIG.name,
  url: SITE_URL,
  image: `${SITE_URL}/avatar.png`,
  email: SITE_CONFIG.email,
  jobTitle: SITE_CONFIG.jobTitle,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Excel Engineering College (Anna University)",
  },
  sameAs: Object.values(SITE_CONFIG.links),
  knowsAbout: [
    "Software Engineering",
    "Linux Internals",
    "Cybersecurity",
    "Python",
    "Java",
    "TypeScript",
    "React",
    "Next.js",
    "Spring Boot",
    "Node.js",
    "PostgreSQL",
    "Prisma",
  ],
};

const portfolioJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${SITE_CONFIG.name} — Engineering Archive`,
  url: SITE_URL,
  description: "Understanding systems. Building what lasts.",
  author: {
    "@type": "Person",
    name: SITE_CONFIG.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://api.github.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('signal_theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);if(t==='light'){document.documentElement.classList.add('light');}else{document.documentElement.classList.remove('light');}var m=localStorage.getItem('signal_render_mode');if(m){document.documentElement.setAttribute('data-render-mode',m);}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-bg-primary text-text-primary font-sans antialiased selection:bg-[#9C8058]/30 transition-colors duration-300">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ExperienceProvider>
          <SoundProvider>{children}</SoundProvider>
        </ExperienceProvider>
      </body>
    </html>
  );
}
