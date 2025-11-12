import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import project1 from "@/assets/project-11.png";
import project2 from "@/assets/project-12.png";
import project3 from "@/assets/project-13.png";
import project4 from "@/assets/project-14.png";
import project5 from "@/assets/project-15.png";
import project6 from "@/assets/project-16.png";
import project7 from "@/assets/project-17.png";
import project8 from "@/assets/project-18.png";
import project9 from "@/assets/project-9.webp";
import project10 from "@/assets/project-10.webp";

const Projects = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const projects = [project1, project2, project3, project4, project5, project6, project7, project8, project9, project10];
  
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const hasAutoScrolledRef = useRef(false);
  const isAutoScrollingRef = useRef(false);

  useEffect(() => {
    if (!gridRef.current || !sectionRef.current) return;

    const isMobile = () => window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!isMobile() || prefersReducedMotion || hasAutoScrolledRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6 && !hasAutoScrolledRef.current && gridRef.current) {
            hasAutoScrolledRef.current = true;
            isAutoScrollingRef.current = true;

            const autoScroll = async () => {
              const scrollAmount = gridRef.current!.children[0]?.clientWidth + 16 || 200;
              
              for (let i = 0; i < 3; i++) {
                await new Promise(resolve => setTimeout(resolve, 700));
                if (!isAutoScrollingRef.current) break;
                gridRef.current!.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                await new Promise(resolve => setTimeout(resolve, 700));
              }
              isAutoScrollingRef.current = false;
            };

            autoScroll();
          }
        });
      },
      { threshold: 0.6 }
    );

    observer.observe(sectionRef.current);

    const handleUserInteraction = () => {
      isAutoScrollingRef.current = false;
    };

    gridRef.current.addEventListener('touchstart', handleUserInteraction);
    const gridElement = gridRef.current;
    
    return () => {
      observer.disconnect();
      gridElement?.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  return <>
      <section ref={sectionRef} id="projetos" className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4 text-center">CONFIRA  ALGUNS  PROJETOS</h2>
          <p className="font-sans text-center text-primary mb-8">
            Toque nas imagens para ampliar
          </p>

          <div 
            ref={gridRef}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none px-4 md:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {projects.map((project, index) => <div key={index} className="aspect-square overflow-hidden rounded-lg cursor-pointer group relative border-2 border-accent hover:brightness-105 transition-all snap-start flex-shrink-0 w-[calc(50vw-2rem)] md:w-auto md:min-w-0" onClick={() => setSelectedImage(project)}>
                <img 
                  src={project} 
                  alt={`Projeto ${index + 1}`} 
                  width="1080"
                  height="1080"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </div>)}
          </div>
          
          <div className="flex justify-center mt-8">
            <Button variant="premium" size="lg" asChild>
              <a href="https://wa.me/5519998469597?text=Ol%C3%A1%2C%20vim%20do%20site%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es." target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                FAÇA SEU ORÇAMENTO
              </a>
            </Button>
          </div>
        </div>
      </section>

      {selectedImage && <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'hsl(43 75% 31% / 0.95)' }} onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-6xl max-h-[90vh]">
            <button onClick={() => setSelectedImage(null)} className="absolute -top-12 right-0 transition-all text-4xl font-sans" style={{ color: 'hsl(40 78% 95%)' }} aria-label="Fechar">
              ×
            </button>
            <img src={selectedImage} alt="Projeto ampliado" className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-[var(--shadow-xl)] border-2 border-accent" />
          </div>
        </div>}
    </>;
};
export default Projects;
