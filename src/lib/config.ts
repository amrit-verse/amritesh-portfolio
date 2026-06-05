/**
 * Site-wide configuration.
 * Change SITE_URL when migrating from amritesh.is-a.dev → amritesh.com.np.
 * Every metadata field, canonical URL, sitemap, robots, and JSON-LD will update automatically.
 */
export const SITE_URL = "https://amritesh.is-a.dev";

export const SITE_CONFIG = {
  name: "Amritesh Mishra",
  title: "Amritesh Mishra — Computer Science Engineering Student",
  description:
    "Portfolio of Amritesh Mishra — a Computer Science Engineering student building practical software solutions while exploring Linux, systems, and cybersecurity.",
  shortDescription:
    "Building practical software solutions while exploring Linux, systems, and cybersecurity.",
  email: "contact@amritesh.com.np",
  jobTitle: "Computer Science Engineering Student",
  location: "Chennai, India",
  links: {
    github: "https://github.com/amrit-verse",
    linkedin: "https://www.linkedin.com/in/amriteshmishra0",
    tryhackme: "https://tryhackme.com/p/amriteshmishra729",
    hackerrank: "https://www.hackerrank.com/profile/amriteshmishra71",
  },
  resume: "/resume/Amritesh_Mishra.pdf",
} as const;
