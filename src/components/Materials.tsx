import ultracompactImg from "@/assets/material-ultracompact.webp";
import quartzImg from "@/assets/material-quartz.webp";
import marbleImg from "@/assets/material-marble.webp";
import porcelainImg from "@/assets/material-porcelain.webp";
import graniteImg from "@/assets/material-granite.webp";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useRef, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

const materials = [
  { name: "QUARTZO", image: quartzImg },
  { name: "MÁRMORE", image: marbleImg },
  { name: "GRANITO", image: graniteImg },
  { name: "PRIMER", image: porcelainImg },
  { name: "QUARTIZITO", image: marbleImg },
];

const Materials = () => {
  const [api, setApi] = useState<CarouselApi>();
  const sectionRef = useRef<HTMLElement>(null);
  const hasAutoScrolledRef = useRef(false);
  const isAutoScrollingRef = useRef(false);

  useEffect(() => {
    if (!api || !sectionRef.current) return;

    const isMobile = () => window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!isMobile() || prefersReducedMotion || hasAutoScrolledRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAutoScrolledRef.current) {
            hasAutoScrolledRef.current = true;
            isAutoScrollingRef.current = true;

            setTimeout(() => {
              if (isAutoScrollingRef.current && api) {
                api.scrollNext();
              }
              isAutoScrollingRef.current = false;
            }, 150);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(sectionRef.current);

    const handleUserInteraction = () => {
      isAutoScrollingRef.current = false;
    };

    api.on('pointerDown', handleUserInteraction);
    
    return () => {
      observer.disconnect();
      api.off('pointerDown', handleUserInteraction);
    };
  }, [api]);

  return (
    <section ref={sectionRef} id="materiais" className="py-12 md:py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-8 text-center">
          PEDRAS QUE TRABALHAMOS
        </h2>
        
        <div className="max-w-6xl mx-auto">
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {materials.map((material) => (
                <CarouselItem key={material.name} className="pl-4 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
                  <div 
                    className="group relative overflow-hidden rounded-lg shadow-[var(--shadow-lg)] hover:shadow-[var(--shadow-elegant)] transition-all cursor-pointer border-2 border-accent hover:brightness-105"
                  >
                    <div className="aspect-[3/4] overflow-hidden">
                      <img 
                        src={material.image} 
                        alt={material.name}
                        width="697"
                        height="928"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover scale-90 group-hover:scale-95 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center py-3 px-4 bg-primary/90">
                      <h3 className="font-sans text-lg md:text-xl font-bold text-center text-white">
                        {material.name}
                      </h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 backdrop-blur border-2 md:-left-12" style={{ backgroundColor: 'hsl(40 78% 95% / 0.9)', borderColor: 'hsl(45 65% 53%)', color: 'hsl(43 75% 31%)' }} aria-label="Material anterior" />
            <CarouselNext className="right-0 backdrop-blur border-2 md:-right-12" style={{ backgroundColor: 'hsl(40 78% 95% / 0.9)', borderColor: 'hsl(45 65% 53%)', color: 'hsl(43 75% 31%)' }} aria-label="Próximo material" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Materials;
