import { About } from "./components/sections/About";
import { Hero } from "./components/sections/Hero";
import { Nav } from "./components/ui/Nav";

export default function App() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-16">
        <Hero />
        <About />
      </main>
    </>
  );
}
