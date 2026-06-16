import React from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Method from "../components/Method";
import Markets from "../components/Markets";
import Team from "../components/Team";
import Clients from "../components/Clients";
import Testimonials from "../components/Testimonials";
import Manifesto from "../components/Manifesto";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-[#050505]">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Method />
      <Markets />
      <Team />
      <Clients />
      <Testimonials />
      <Manifesto />
      <Contact />
      <Footer />
    </main>
  );
}