import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Domains from "@/components/sections/Domains";
import Projects from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import Gallery from "@/components/sections/Gallery";
import Team from "@/components/sections/Team";
import JoinUs from "@/components/sections/JoinUs";
import FAQs from "@/components/sections/FAQs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Domains />
        <Projects />
        <Achievements />
        <Gallery />
        <Team />
        <JoinUs />
        <FAQs />
      </main>
      <Footer />
    </div>
  );
}
