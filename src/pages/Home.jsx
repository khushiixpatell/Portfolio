import Hero from "../components/home/Hero";
import ProjectGrid from "../components/projects/ProjectGrid";
import Skills from "../components/home/Skills";
import Contact from "../components/home/Contact";

export default function Home() {
  return (
    <>
      <Hero />

      <ProjectGrid />

      <Skills />

      <Contact />
    </>
  );
}