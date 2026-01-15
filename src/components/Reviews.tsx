import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import type { CarouselApi } from "@/components/ui/carousel";
const reviews = [{
  name: "Juliana Cardoso",
  date: "15 de outubro de 2024",
  city: "São Paulo, SP",
  text: "Atendimento muito gentil da equipe. Os valores justos e o serviço ficaram excelentes e dentro dos prazos estabelecidos. Estamos muito satisfeitos.",
  rating: 5,
  initials: "JC"
}, {
  name: "Yasmin Esther",
  date: "22 de setembro de 2024",
  city: "São Paulo, SP",
  text: "Ótimo atendimento, materiais de primeira, ótima qualidade, super bem atendido, uma ótima equipe de instalação!!Se quiser qualidade e preço justo, recomendo demais!!!",
  rating: 5,
  initials: "YE"
}, {
  name: "Matheus Costa",
  date: "05 de novembro de 2024",
  city: "São Paulo, SP",
  text: "Ótimo atendimento, e preços acessíveis",
  rating: 5,
  initials: "MC"
}, {
  name: "Sandra Roque",
  date: "18 de agosto de 2024",
  city: "São Paulo, SP",
  text: "A equipe que nos atendeu foi um amor, excelente atendimento, serviço muito bem feito e com muita rapidez e o atendimento pós venda perfeito também. E pra mim foi o melhor preço e excelente custo benefício da região.",
  rating: 5,
  initials: "SR"
}, {
  name: "Flávia Fern Roque",
  date: "29 de julho de 2024",
  city: "São Paulo, SP",
  text: "Fui muito bem atendida pela equipe, excelente atendimento, melhor custo benefício de toda região! O atendimento é ótimo desde fechar a venda até o pós venda!",
  rating: 5,
  initials: "FR"
}, {
  name: "Flávia Fern Roque",
  date: "12 de outubro de 2024",
  city: "São Paulo, SP",
  text: "Meu lavatório ficou lindo!! Fui super bem atendida, destaque especial para a equipe de vendas, muito profissional e gentil. Recomendo!!",
  rating: 5,
  initials: "FR"
}, {
  name: "Lisandra Duarte",
  date: "03 de setembro de 2024",
  city: "São Paulo, SP",
  text: "Atendimento rápido e preço justo. Destaque para a equipe de instalação, muito cuidadosos, amáveis e organizados. Parabéns!",
  rating: 5,
  initials: "LD"
}, {
  name: "Maria Alves",
  date: "20 de novembro de 2024",
  city: "São Paulo, SP",
  text: "Serviço bem feito e pessoal super gentil. Fiz uma pia e balcão para fogão cooptok. Super recomendo.",
  rating: 5,
  initials: "MA"
}, {
  name: "Maria Podolog",
  date: "14 de agosto de 2024",
  city: "São Paulo, SP",
  text: "Trabalho com excelência!! Estão de parabéns!! Entregaram antes do prazo determinado!! Ficou perfeito!!",
  rating: 5,
  initials: "MP"
}, {
  name: "Antônio José da Silva",
  date: "07 de outubro de 2024",
  city: "São Paulo, SP",
  text: "O melhor lugar para comprar pedras de marmore",
  rating: 5,
  initials: "AS"
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
    
    // Check conditions once on mount, not in callback
    const isMobileCheck = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isMobileCheck || prefersReducedMotion || hasAutoScrolledRef.current) return;
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
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
          
          // Use requestAnimationFrame to batch with next paint
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
    api.on('pointerDown', handleUserInteraction);
    return () => {
      observer.disconnect();
      api.off('pointerDown', handleUserInteraction);
    };
  }, [api]);
  return <section ref={sectionRef} className="py-12 md:py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 text-left" style={{
          color: 'white'
        }}>CONFIRA  AS  AVALIAÇÕES  DE  NOSSOS  CLIENTES</h2>
          <div className="flex items-center gap-2" style={{
          color: 'hsl(40 40% 93%)'
        }}>
            <span className="font-sans font-semibold" translate="no">Marmoraria União</span>
            <span>•</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(star => <Star key={star} className="h-5 w-5" style={{
              fill: '#FFD700',
              color: '#FFD700'
            }} />)}
            </div>
            <span>•</span>
            <span className="font-sans"> 31 Avaliações</span>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <Carousel setApi={setApi} opts={{
          align: "start",
          loop: true
        }} plugins={[plugin.current]} className="w-full" onMouseEnter={plugin.current.stop} onMouseLeave={plugin.current.reset}>
            <CarouselContent className="-ml-4">
              {reviews.map((review, index) => <CarouselItem key={index} className="pl-4 md:basis-1/2">
                  <Card className="hover:shadow-[var(--shadow-elegant)] transition-all h-full border-2 border-accent" style={{
                backgroundColor: 'white'
              }} onClick={handleCardClick}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                          <span className="font-sans font-medium text-sm" style={{
                        color: 'hsl(43 75% 31%)'
                      }}>
                            {review.initials}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-sans font-medium text-sm truncate" style={{
                        color: 'black'
                      }}>{review.name}</p>
                          <div className="flex gap-0.5 mt-1">
                            {[1, 2, 3, 4, 5].map(star => <Star key={star} className="h-3.5 w-3.5" style={{
                          fill: '#FFD700',
                          color: '#FFD700'
                        }} />)}
                          </div>
                        </div>
                      </div>
                      <p className="font-sans text-sm mb-2 leading-relaxed" style={{
                    color: 'black'
                  }}>
                        {review.text}
                      </p>
                      <div className="font-sans text-xs" style={{
                    color: 'hsl(43 92% 38%)'
                  }}>
                        <p>{review.date}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 backdrop-blur border-2" style={{
            backgroundColor: 'hsl(40 78% 95% / 0.9)',
            borderColor: 'hsl(45 65% 53%)',
            color: 'hsl(43 75% 31%)'
          }} aria-label="Avaliação anterior" />
            <CarouselNext className="hidden md:flex -right-12 backdrop-blur border-2" style={{
            backgroundColor: 'hsl(40 78% 95% / 0.9)',
            borderColor: 'hsl(45 65% 53%)',
            color: 'hsl(43 75% 31%)'
          }} aria-label="Próxima avaliação" />
          </Carousel>
        </div>
      </div>
    </section>;
};
export default Reviews;