import { useEffect } from "react";
import Lenis from "lenis";
import "@/App.css";
import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import Marquee from "@/components/site/Marquee";
import About from "@/components/site/About";
import Specialties from "@/components/site/Specialties";
import Gallery from "@/components/site/Gallery";
import Reviews from "@/components/site/Reviews";
import Location from "@/components/site/Location";
import FinalCTA from "@/components/site/FinalCTA";
import Footer from "@/components/site/Footer";
import FloatingCall from "@/components/site/FloatingCall";

function App() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let rafId;
    const loop = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const onClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { offset: -76 });
        }
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div className="grain bg-cream" data-testid="app-root">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Specialties />
        <Gallery />
        <Reviews />
        <Location />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingCall />
    </div>
  );
}

export default App;
