import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useLeadPopup } from "@/contexts/LeadPopupContext";
import heroKitchen from "@/assets/hero-marble-kitchen.jpg";
import heroWorkshop from "@/assets/hero-workshop.jpg";
import heroBathroom from "@/assets/hero-bathroom.jpg";
import heroGourmet from "@/assets/hero-gourmet.jpg";
import heroMarbleDetail from "@/assets/hero-marble-detail.jpg";
const heroImages = [heroKitchen, heroWorkshop, heroBathroom, heroGourmet, heroMarbleDetail];
const Hero = () => {
  const {
    openPopup
  } = useLeadPopup();
  const plugin = useRef(Autoplay({
    delay: 2000,
    stopOnInteraction: true,
    stopOnMouseEnter: true
  }));
  return <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
      <Carousel opts={{
      align: "center",
      loop: true
    }} plugins={[plugin.current]} className="absolute inset-0" onMouseEnter={plugin.current.stop} onMouseLeave={plugin.current.reset}>
        <CarouselContent className="h-[600px] md:h-[700px]">
          {heroImages.map((image, index) => <CarouselItem key={index} className="relative h-full">
              <div className="absolute inset-0">
                <img src={image} alt={`Marmoraria União - Imagem ${index + 1}`} className="w-full h-full object-cover" fetchPriority={index === 0 ? "high" : undefined} loading={index === 0 ? "eager" : "lazy"} decoding="async" />
              </div>
            </CarouselItem>)}
        </CarouselContent>
      </Carousel>

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0" style={{
      background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4))'
    }} />

      <div className="container relative z-10 mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl mx-auto md:mx-0">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 leading-tight text-center lg:text-5xl md:text-justify" style={{
          color: 'hsl(40 78% 95%)',
          textShadow: '2px 2px 8px rgba(0,0,0,0.4)'
        }}>TRANSFORMAMOS PEDRAS EM AMBIENTES DE ARQUITETURA EXCLUSIVA</h1>

          <p className="font-sans text-lg md:text-xl mb-8 leading-relaxed text-center md:text-left" style={{
          color: 'hsl(40 40% 93%)'
        }}>
            Especialistas em travertino romano, branco Paraná, mármores importados e pedras exóticas. Da especificação à instalação impecável, para projetos residenciais e comerciais de alto padrão em Campinas e região.
          </p>

          <div className="flex flex-col gap-4 justify-center md:justify-start items-center md:items-start">
            <Button variant="premium" size="lg" className="text-base md:text-lg shadow-[0_4px_20px_hsl(var(--primary)/0.35)] hover:shadow-[0_6px_30px_hsl(var(--primary)/0.5)] transition-shadow duration-300" onClick={openPopup}>
              VER COTAÇÃO 
            </Button>
            <Button variant="ghost" size="default" asChild className="text-cream-light hover:text-white hover:bg-white/10 border border-cream-light/30">
              <a href="#contato">
                NOSSA LOCALIZAÇÃO
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;