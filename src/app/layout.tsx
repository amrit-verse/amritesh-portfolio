import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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
  metadataBase: new URL("https://amritesh.is-a.dev"),
  title: "Amritesh Mishra — Computer Science Engineering Student",
  description:
    "Portfolio of Amritesh Mishra — a Computer Science Engineering student building practical software solutions while exploring Linux, systems, and cybersecurity.",
  keywords: [
    "Amritesh Mishra",
    "Computer Science Engineering Student",
    "Software Developer",
    "Linux Enthusiast",
    "Cybersecurity",
    "Full Stack Developer",
    "Portfolio",
  ],
  authors: [{ name: "Amritesh Mishra" }],
  creator: "Amritesh Mishra",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://amritesh.is-a.dev",
    title: "Amritesh Mishra — Computer Science Engineering Student",
    description:
      "Building practical software solutions while exploring Linux, systems, and cybersecurity.",
    siteName: "Amritesh Mishra",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Amritesh Mishra — Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amritesh Mishra — CS Engineering Student",
    description:
      "Building practical software solutions while exploring Linux, systems, and cybersecurity.",
    creator: "@amrit-verse",
    images: ["/og-image.png"],
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
  name: "Amritesh Mishra",
  url: "https://amritesh.is-a.dev",
  email: "m.amrit2004@gmail.com",
  jobTitle: "Computer Science Engineering Student",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Excel Engineering College (Anna University)",
  },
  sameAs: [
    "https://github.com/amrit-verse",
    "https://www.linkedin.com/in/amrit2004/",
    "https://tryhackme.com/p/amriteshmishra729",
    "https://www.hackerrank.com/profile/amriteshmishra71",
  ],
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
