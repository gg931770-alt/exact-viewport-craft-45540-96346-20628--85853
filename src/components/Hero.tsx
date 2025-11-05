import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import heroKitchen from "@/assets/hero-marble-kitchen.jpg";
import heroWorkshop from "@/assets/hero-workshop.jpg";
import heroBathroom from "@/assets/hero-bathroom.jpg";
import heroGourmet from "@/assets/hero-gourmet.jpg";
import heroMarbleDetail from "@/assets/hero-marble-detail.jpg";
const heroImages = [heroKitchen, heroWorkshop, heroBathroom, heroGourmet, heroMarbleDetail];
const Hero = () => {
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
              <div className="absolute inset-0 bg-cover bg-center" style={{
            backgroundImage: `url(${image})`
          }} />
            </CarouselItem>)}
        </CarouselContent>
      </Carousel>

      {/* Gradient overlay for text readability - Preto/Cinza escuro com transparência */}
      <div className="absolute inset-0" style={{
      background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4))'
    }} />
      
      <div className="container relative z-10 mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl mx-auto md:mx-0">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-center md:text-left" style={{
          color: 'hsl(40 78% 95%)',
          textShadow: '2px 2px 8px rgba(0,0,0,0.4)'
        }}>A MARMORARIA COM O ACABAMENTO MAIS IMPECÁVEL DE CAMPINAS</h1>
          
          <p className="font-sans text-lg md:text-xl mb-8 leading-relaxed text-center md:text-left" style={{
          color: 'hsl(40 40% 93%)'
        }}>
            Solicite seu orçamento hoje e garanta a melhor qualidade de materiais premium para sua obra
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button variant="premium" size="lg" asChild className="text-base md:text-lg">
              <a href="https://wa.me/5519998469597?text=Ol%C3%A1%2C%20vim%20do%20site%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es." target="_blank" rel="noopener noreferrer">
                FAÇA SEU ORÇAMENTO
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;