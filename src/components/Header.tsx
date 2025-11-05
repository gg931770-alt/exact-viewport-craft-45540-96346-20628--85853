import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import logo from "@/assets/logo-uniao.png";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled 
          ? "shadow-lg" 
          : ""
      }`}
      style={{ 
        background: 'hsl(40 40% 93%)',
        borderBottomColor: 'hsl(45 65% 53% / 0.3)'
      }}
    >
      <div className="container mx-auto flex h-16 md:h-16 items-center justify-center md:justify-between px-4">
        <a href="/" className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity">
          <img 
            src={logo} 
            alt="Marmoraria União" 
            className="h-20 md:h-16 w-auto object-contain"
          />
        </a>
        
        <nav className="hidden md:flex items-center gap-8">
          <a 
            href="#projetos" 
            className="font-sans text-sm font-medium text-primary hover:bg-primary/10 hover:text-primary transition-all px-3 py-2 rounded-md"
          >
            Projetos
          </a>
          <a 
            href="#sobre" 
            className="font-sans text-sm font-medium text-primary hover:bg-primary/10 hover:text-primary transition-all px-3 py-2 rounded-md"
          >
            Sobre
          </a>
          <a 
            href="#materiais" 
            className="font-sans text-sm font-medium text-primary hover:bg-primary/10 hover:text-primary transition-all px-3 py-2 rounded-md"
          >
            Materiais
          </a>
          <a 
            href="#servicos" 
            className="font-sans text-sm font-medium text-primary hover:bg-primary/10 hover:text-primary transition-all px-3 py-2 rounded-md"
          >
            Serviços
          </a>
          <a 
            href="#contato" 
            className="font-sans text-sm font-medium text-primary hover:bg-primary/10 hover:text-primary transition-all px-3 py-2 rounded-md"
          >
            Contato
          </a>
        </nav>

      </div>
    </header>
  );
};

export default Header;
