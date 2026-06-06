import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SITE_URL, SITE_CONFIG } from "@/lib/config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  keywords: [
    "Amritesh Mishra",
    "Software Engineer",
    "Backend Developer",
    "Linux",
    "Cybersecurity",
    "Full Stack Developer",
    "Computer Science Engineering",
    "Open Source",
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
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.shortDescription,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} — Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.shortDescription,
    images: [`${SITE_URL}/og-image.png`],
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
  themeColor: "#0a0e17",
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
    "Linux",
    "Cybersecurity",
    "Python",
    "Java",
    "JavaScript",
    "React",
    "Spring Boot",
    "Node.js",
  ],
};

const portfolioJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${SITE_CONFIG.name} — Portfolio`,
  url: SITE_URL,
  description: SITE_CONFIG.description,
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://api.github.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-bg-primary text-text-primary font-sans antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
