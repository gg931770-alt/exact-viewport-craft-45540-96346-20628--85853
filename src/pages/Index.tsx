import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Materials from "@/components/Materials";
import Reviews from "@/components/Reviews";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Projects />
        <About />
        <Materials />
        <Reviews />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
