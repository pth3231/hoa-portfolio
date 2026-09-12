import { About } from "./components/sections/About";
import { Hero } from "./components/sections/Hero";
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
        <Skills />
      </main>
    </>
  );
}
