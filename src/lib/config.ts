/**
 * Site-wide configuration & single source of truth.
 * Automatically synchronizes metadata, canonical URLs, sitemaps, robots, and JSON-LD.
 */
export const SITE_URL = "https://amritesh.com.np";

export const ACADEMIC_INFO = {
  cgpa: "8.88",
  cgpaScale: "10.00",
  startYear: 2025,
  graduationYear: 2029,
  college: "Excel Engineering College",
  university: "Anna University, Chennai",
  degree: "B.E. Computer Science & Engineering",
  currentYearText: "2nd Year",
};

export const SITE_CONFIG = {
  name: "Amritesh Mishra",
  displayName: "Amrit",
  title: "Amritesh Mishra | Software Engineer | Linux & Backend Developer",
  description:
    "Computer Science Engineering student passionate about Linux, Backend Development, Full Stack Engineering, Cybersecurity, and Open Source. Explore projects, skills, and professional experience.",
  shortDescription:
    "Computer Science Engineering student passionate about Linux, Backend Development, Full Stack Engineering, Cybersecurity, and Open Source.",
  email: "contact@amritesh.com.np",
  jobTitle: "Software Engineer",
  location: "Chennai, India",
  links: {
    github: "https://github.com/amrit-verse",
    linkedin: "https://www.linkedin.com/in/amriteshmishra0",
    tryhackme: "https://tryhackme.com/p/amriteshmishra729",
    hackerrank: "https://www.hackerrank.com/profile/amriteshmishra71",
  },
  resume: "/resume/Amritesh_Mishra.pdf",
} as const;
