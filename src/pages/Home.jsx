import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Method from "../components/Method";
import Partners from "../components/Partners";
import Testimonials from "../components/Testimonials";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Services />
        <Method />
        <Partners />
        <Testimonials />
        <ContactForm />
      </main>

      <Footer />
    </>
  );
}