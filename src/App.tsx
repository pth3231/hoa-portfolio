import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";
import { FuturePlans } from "./components/sections/FuturePlans";
import { Hero } from "./components/sections/Hero";
import { Projects } from "./components/sections/Projects";
import { Skills } from "./components/sections/Skills";
import { Timeline } from "./components/sections/Timeline";
import { Nav } from "./components/ui/Nav";

export default function App() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-16">
        <Hero />
        <About />
        <Timeline />
        <Projects />
        <Skills />
        <FuturePlans />
        <Contact />
      </main>
      <footer className="border-t border-border">
        <p className="mx-auto max-w-5xl px-6 py-6 text-[15px] text-muted">
          © 2026 Phan Thai Hoa — built with Vite + React
        </p>
      </footer>
    </>
  );
}
