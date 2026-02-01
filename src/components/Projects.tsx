import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useLeadPopup } from "@/contexts/LeadPopupContext";
import project1 from "@/assets/project-11.webp";
import project2 from "@/assets/project-12.webp";
import project3 from "@/assets/project-13.webp";
import project4 from "@/assets/project-14.webp";
import project5 from "@/assets/project-15.webp";
import project6 from "@/assets/project-16.webp";
import project7 from "@/assets/project-17.webp";
import project8 from "@/assets/project-18.webp";
import project9 from "@/assets/project-9-new.webp";
import project10 from "@/assets/project-10-new.webp";
const Projects = () => {
  const {
    openPopup
  } = useLeadPopup();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const newProjects = ["https://i.postimg.cc/3JByHjMr/1.png", "https://i.postimg.cc/qBGBtk15/2.png", "https://i.postimg.cc/dVgJMD0J/3.png", "https://i.postimg.cc/zBFNRjFR/4.png", "https://i.postimg.cc/c4HWrfgv/5.png", "https://i.postimg.cc/8C8gK3y4/6.png", "https://i.postimg.cc/q7cSm76k/8.png", "https://i.postimg.cc/65GHjQFY/9.png"];
  const projects = [...newProjects, project1, project2, project3, project4, project5, project6, project7, project8, project9, project10];
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const hasAutoScrolledRef = useRef(false);
  const isAutoScrollingRef = useRef(false);
  useEffect(() => {
    if (!gridRef.current || !sectionRef.current) return;
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isMobile || prefersReducedMotion || hasAutoScrolledRef.current) return;
    const firstChild = gridRef.current.children[0] as HTMLElement | undefined;
    const scrollAmount = firstChild ? firstChild.offsetWidth + 16 : 200;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6 && !hasAutoScrolledRef.current && gridRef.current) {
          hasAutoScrolledRef.current = true;
          isAutoScrollingRef.current = true;
          const autoScroll = async () => {
            for (let i = 0; i < 3; i++) {
              await new Promise(resolve => setTimeout(resolve, 700));
              if (!isAutoScrollingRef.current) break;
              gridRef.current!.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
              });
              await new Promise(resolve => setTimeout(resolve, 700));
            }
            isAutoScrollingRef.current = false;
          };
          requestAnimationFrame(() => autoScroll());
        }
      });
    }, {
      threshold: 0.6
    });
    observer.observe(sectionRef.current);
    const handleUserInteraction = () => {
      isAutoScrollingRef.current = false;
    };
    gridRef.current.addEventListener('touchstart', handleUserInteraction, {
      passive: true
    });
    const gridElement = gridRef.current;
    return () => {
      observer.disconnect();
      gridElement?.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);
  return <>
      <section ref={sectionRef} id="projetos" className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4 text-center">
            CONFIRA ALGUNS PROJETOS
          </h2>
          <p className="font-sans text-center text-primary mb-8 text-xs">CADA PROJETO, UMA ASSINATURA DE EXCLUSIVIDADE
Toque nas imagens para ampliar</p>

          <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none px-4 md:px-0" style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
            {projects.map((project, index) => <div key={index} className="aspect-square overflow-hidden rounded-lg cursor-pointer group relative border-2 border-accent hover:brightness-105 transition-all snap-start flex-shrink-0 w-[calc(50vw-2rem)] md:w-auto md:min-w-0" onClick={() => setSelectedImage(project)}>
                <img src={project} alt={`Projeto ${index + 1}`} width="1080" height="1080" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>)}
          </div>

          <div className="flex justify-center mt-8">
            <Button variant="premium" size="lg" onClick={openPopup}>
              <MessageCircle className="h-5 w-5" />
              FAÇA SEU ORÇAMENTO
            </Button>
          </div>
        </div>
      </section>

      {selectedImage && <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{
      backgroundColor: 'hsl(43 75% 31% / 0.95)'
    }} onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-6xl max-h-[90vh]">
            <button onClick={() => setSelectedImage(null)} className="absolute -top-12 right-0 transition-all text-4xl font-sans" style={{
          color: 'hsl(40 78% 95%)'
        }} aria-label="Fechar">
              ×
            </button>
            <img src={selectedImage} alt="Projeto ampliado" className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-[var(--shadow-xl)] border-2 border-accent" />
          </div>
        </div>}
    </>;
};
export default Projects;