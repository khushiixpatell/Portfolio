import Hero from "../components/home/Hero";
import ProjectGrid from "../components/projects/ProjectGrid";
import Experience from "../components/home/Experience";
import About from "../components/home/About";
import Skills from "../components/home/Skills";
import Contact from "../components/home/Contact";

export default function Home() {
  return (
    <>
      <Hero />

      <ProjectGrid />

      <Experience />

      <About />

      <Skills />

      <Contact />
    </>
  );
}