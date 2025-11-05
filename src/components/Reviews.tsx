import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import type { CarouselApi } from "@/components/ui/carousel";
const reviews = [{
  name: "Vinicius Pontes Magalhães",
  date: "02 de julho de 2025",
  city: "São Paulo, SP",
  text: "Bom minha casa está em reforma, por isso o buraco e o piso velho, mas o atendimento, instalação e a qualidade do material da pia ficou nota 10, podem contratar, eu índico. Parabéns para os meninos da The Gold Marmoraria.",
  rating: 5,
  initials: "VM"
}, {
  name: "Thaina Silva",
  date: "10 de setembro de 2025",
  city: "São Paulo, SP",
  text: "Excelente trabalho! A equipe foi extremamente profissional desde o primeiro contato até a finalização do serviço. Os acabamentos ficaram impecáveis, o atendimento foi sempre cordial e atencioso. Recomendo fortemente para quem busca qualidade e confiança",
  rating: 5,
  initials: "TS"
}, {
  name: "Jessica Elize Alves",
  date: "03 de agosto de 2025",
  city: "São Paulo, SP",
  text: "Serviço muito bom, peças de qualidade e prazo cumprido! Muito bom The Gold Marmoraria!",
  rating: 5,
  initials: "JA"
}, {
  name: "Bruno William",
  date: "25 de setembro de 2025",
  city: "São Paulo, SP",
  text: "Tivemos ótima experiência com a The Gold Marmoraria. Atendimento profissional, instalação bem executada e acabamento de primeira. Indico com tranquilidade.",
  rating: 5,
  initials: "BW"
}, {
  name: "Abraão Mendes",
  date: "09 de dezembro de 2024",
  city: "São Paulo, SP",
  text: "Ótimo serviço prestado pelo Kleber e atendeu minha necessidade quanto ao prazo perfeitamente.",
  rating: 5,
  initials: "AM"
}, {
  name: "Antonio S.sobrinho",
  date: "22 de agosto de 2025",
  city: "São Paulo, SP",
  text: "Contratei as pedras da cozinha (pia) e lavanderia com bancada. Foi super rápida a produção e instalação! Recomendo!",
  rating: 5,
  initials: "AS"
}, {
  name: "Higor Campos",
  date: "07 de setembro de 2025",
  city: "São Paulo, SP",
  text: "Tudo perfeito: entrega no prazo, qualidade incrível e um atendimento de primeira!",
  rating: 5,
  initials: "HC"
}, {
  name: "mundo do rafa Gomes",
  date: "15 de agosto de 2025",
  city: "São Paulo, SP",
  text: "Eu amei minha pedra da cozinha, várias pessoas do meu condomínio fecharam com eles, super recomendo.",
  rating: 5,
  initials: "RG"
}];
const Reviews = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Configurar autoplay: rápido no mobile, lento no desktop
  const plugin = useRef(Autoplay({
    delay: isMobile ? 2500 : 6000,
    stopOnInteraction: false,
    stopOnMouseEnter: !isMobile
  }));
  
  const [api, setApi] = useState<CarouselApi>();
  const sectionRef = useRef<HTMLElement>(null);
  const hasAutoScrolledRef = useRef(false);
  const isAutoScrollingRef = useRef(false);

  // Atualizar configuração do autoplay quando mobile muda
  useEffect(() => {
    plugin.current = Autoplay({
      delay: isMobile ? 2500 : 6000,
      stopOnInteraction: false,
      stopOnMouseEnter: !isMobile
    });
  }, [isMobile]);

  // Handler para pausar no mobile ao clicar
  const handleCardClick = () => {
    if (isMobile && !isPaused) {
      setIsPaused(true);
      plugin.current.stop();
    }
  };

  useEffect(() => {
    if (!api || !sectionRef.current) return;

    const checkIsMobile = () => window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!checkIsMobile() || prefersReducedMotion || hasAutoScrolledRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6 && !hasAutoScrolledRef.current) {
            hasAutoScrolledRef.current = true;
            isAutoScrollingRef.current = true;

            const autoScroll = async () => {
              for (let i = 0; i < 3; i++) {
                await new Promise(resolve => setTimeout(resolve, 700));
                if (!isAutoScrollingRef.current) break;
                api.scrollNext();
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

    api.on('pointerDown', handleUserInteraction);
    
    return () => {
      observer.disconnect();
      api.off('pointerDown', handleUserInteraction);
    };
  }, [api]);

  return <section ref={sectionRef} className="py-12 md:py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 text-left" style={{ color: 'white' }}>CONFIRA  AS  AVALIAÇÕES  DE  NOSSOS  CLIENTES</h2>
          <div className="flex items-center gap-2" style={{ color: 'hsl(40 40% 93%)' }}>
            <span className="font-sans font-semibold" translate="no">The Gold Marmoraria</span>
            <span>•</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(star => <Star key={star} className="h-5 w-5" style={{ fill: '#FFD700', color: '#FFD700' }} />)}
            </div>
            <span>•</span>
            <span className="font-sans">27 Avaliações</span>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <Carousel 
            setApi={setApi}
            opts={{
              align: "start",
              loop: true
            }} 
            plugins={[plugin.current]} 
            className="w-full" 
            onMouseEnter={plugin.current.stop} 
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-ml-4">
              {reviews.map((review, index) => <CarouselItem key={index} className="pl-4 md:basis-1/2">
                  <Card 
                    className="hover:shadow-[var(--shadow-elegant)] transition-all h-full border-2 border-accent" 
                    style={{ backgroundColor: 'white' }}
                    onClick={handleCardClick}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                          <span className="font-sans font-medium text-sm" style={{ color: 'hsl(43 75% 31%)' }}>
                            {review.initials}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-sans font-medium text-sm truncate" style={{ color: 'black' }}>{review.name}</p>
                          <div className="flex gap-0.5 mt-1">
                            {[1, 2, 3, 4, 5].map(star => <Star key={star} className="h-3.5 w-3.5" style={{ fill: '#FFD700', color: '#FFD700' }} />)}
                          </div>
                        </div>
                      </div>
                      <p className="font-sans text-sm mb-2 leading-relaxed" style={{ color: 'black' }}>
                        {review.text}
                      </p>
                      <div className="font-sans text-xs" style={{ color: 'hsl(43 92% 38%)' }}>
                        <p>{review.date}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 backdrop-blur border-2" style={{ backgroundColor: 'hsl(40 78% 95% / 0.9)', borderColor: 'hsl(45 65% 53%)', color: 'hsl(43 75% 31%)' }} aria-label="Avaliação anterior" />
            <CarouselNext className="hidden md:flex -right-12 backdrop-blur border-2" style={{ backgroundColor: 'hsl(40 78% 95% / 0.9)', borderColor: 'hsl(45 65% 53%)', color: 'hsl(43 75% 31%)' }} aria-label="Próxima avaliação" />
          </Carousel>
        </div>
      </div>
    </section>;
};
export default Reviews;