import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CurrentFocus from "@/components/CurrentFocus";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import LearningJourney from "@/components/LearningJourney";
import GitHubActivity from "@/components/GitHubActivity";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <CurrentFocus />
        <Projects />
        <Skills />
        <Education />
        <Certifications />
        <LearningJourney />
        <GitHubActivity />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
