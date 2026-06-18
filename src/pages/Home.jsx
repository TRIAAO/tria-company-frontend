import React from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Markets from "../components/Markets";
import Team from "../components/Team";
import Clients from "../components/Clients";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-[#050505]">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Markets />
      <Team />
      <Clients />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}