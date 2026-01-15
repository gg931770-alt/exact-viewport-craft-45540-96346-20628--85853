import gourmetImg from "@/assets/service-gourmet-new.png";
import countertopImg from "@/assets/service-countertop.jpg";
import carvedSinkImg from "@/assets/service-carved-sink.jpg";
import bathroomImg from "@/assets/service-bathroom-new.jpg";
import stairsMarbleImg from "@/assets/service-stairs-marble.jpg";
import boatsImg from "@/assets/service-boats.jpg";
import kitchenImg from "@/assets/service-kitchen.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useRef, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useLeadPopup } from "@/contexts/LeadPopupContext";

const services = [{
  title: "Área gourmet",
  description: "Projeto e execução de bancadas e ilhas para áreas gourmet com acabamento de alto padrão.",
  image: gourmetImg
}, {
  title: "Bancadas retas",
  description: "Bancadas retas com cortes precisos e alinhamento perfeito dos veios.",
  image: countertopImg
}, {
  title: "Pias esculpidas",
  description: "Pias esculpidas sob medida, com caimento discreto e acabamento impecável.",
  image: carvedSinkImg
}, {
  title: "Banheiros",
  description: "Realizamos trabalhos completos em banheiros com detalhes únicos",
  image: bathroomImg
}, {
  title: "Escadas",
  description: "Projetamos escadas exclusivas que valorizam cada ambiente, unindo design refinado, elegância e harmonia em cada detalhe.",
  image: stairsMarbleImg
}, {
  title: "Embarcações",
  description: "Acabamentos sob medida para embarcações, durabilidade e estética superior.",
  image: boatsImg
}, {
  title: "Cozinhas",
  description: "Cozinhas completas com integração de cooktops, cubas e frontões em materiais nobres.",
  image: kitchenImg
}];

const Services = () => {
  const { openPopup } = useLeadPopup();
  const [api, setApi] = useState<CarouselApi>();
  const sectionRef = useRef<HTMLElement>(null);
  const hasAutoScrolledRef = useRef(false);
  const isAutoScrollingRef = useRef(false);

  useEffect(() => {
    if (!api || !sectionRef.current) return;

    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isMobile || prefersReducedMotion || hasAutoScrolledRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAutoScrolledRef.current) {
            hasAutoScrolledRef.current = true;
            isAutoScrollingRef.current = true;

            requestAnimationFrame(() => {
              setTimeout(() => {
                if (isAutoScrollingRef.current && api) {
                  api.scrollNext();
                }
                isAutoScrollingRef.current = false;
              }, 150);
            });
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
    <section ref={sectionRef} id="servicos" className="py-12 md:py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-8 text-center">
          NOSSOS SERVIÇOS
        </h2>

        <div className="max-w-7xl mx-auto">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {services.map((service, index) => (
                <CarouselItem key={index} className="pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden hover:shadow-[var(--shadow-elegant)] transition-all group cursor-pointer h-full border-2 border-accent hover:brightness-105 bg-card">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={service.image}
                        alt={service.title}
                        width="400"
                        height="300"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3
                        className="font-serif text-xl md:text-2xl font-bold text-primary group-hover:text-primary mb-3 line-clamp-1 transition-colors"
                        translate="no"
                      >
                        {service.title}
                      </h3>
                      <p className="font-sans text-primary leading-relaxed line-clamp-3">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              className="left-0 backdrop-blur border-2 md:-left-12"
              style={{ backgroundColor: 'hsl(40 78% 95% / 0.9)', borderColor: 'hsl(45 65% 53%)', color: 'hsl(43 75% 31%)' }}
              aria-label="Serviço anterior"
            />
            <CarouselNext
              className="right-0 backdrop-blur border-2 md:-right-12"
              style={{ backgroundColor: 'hsl(40 78% 95% / 0.9)', borderColor: 'hsl(45 65% 53%)', color: 'hsl(43 75% 31%)' }}
              aria-label="Próximo serviço"
            />
          </Carousel>

          <div className="flex justify-center mt-8">
            <Button variant="premium" size="lg" onClick={openPopup}>
              <MessageCircle className="h-5 w-5" />
              FAÇA SEU ORÇAMENTO
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
