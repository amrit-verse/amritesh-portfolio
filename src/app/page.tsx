import Navbar from "@/components/Navbar";
import SpatialBackground from "@/components/SpatialBackground";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CurrentFocus from "@/components/CurrentFocus";
import Projects from "@/components/Projects";
import ConnectionGraph from "@/components/ConnectionGraph";
import LearningJourney from "@/components/LearningJourney";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import GitHubActivity from "@/components/GitHubActivity";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import CommandPalette from "@/components/CommandPalette";

export default function Home() {
  return (
    <>
      <SpatialBackground />
      <header>
        <Navbar />
      </header>
      <main id="main-content">
        <Hero />
        <About />
        <CurrentFocus />
        <Projects />
        <ConnectionGraph />
        <LearningJourney />
        <Skills />
        <Education />
        <Certifications />
        <GitHubActivity />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
      <CommandPalette />
    </>
  );
}
