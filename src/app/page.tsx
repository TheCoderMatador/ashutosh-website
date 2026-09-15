import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Currently from "@/components/Currently";
import SelectedWork from "@/components/SelectedWork";
import Journey from "@/components/Journey";
import About from "@/components/About";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Currently />
        <SelectedWork />
        <Journey />
        <About />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
