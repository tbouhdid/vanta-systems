import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import Services from "../components/sections/Services";
import Projects from "../components/sections/Projects";
import CTA from "../components/sections/CTA";
import Footer from "../components/layout/Footer";
import Values from "../components/sections/Values";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <Values />
      <CTA />
      <Footer />
    </>
  );
}
