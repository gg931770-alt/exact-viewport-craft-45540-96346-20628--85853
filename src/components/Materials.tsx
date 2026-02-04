import ultracompactImg from "@/assets/laminas-ultra-compactas.png";
import travertinoRomanoImg from "@/assets/travertino-romano.png";
import travertinoSilverImg from "@/assets/travertino-silver.png";
import lizardImg from "@/assets/lizard.png";
import tajMahalImg from "@/assets/taj-mahal.png";
import brancoParanaImg from "@/assets/branco-parana.png";
import rockFaceImg from "@/assets/rock-face.png";
import { ChevronRight } from "lucide-react";

const materials = [
  {
    name: "Travertino Romano",
    image: travertinoRomanoImg,
    description: "O Travertino Romano une sofisticação e durabilidade, ideal para pisos, paredes e bancadas, trazendo uma elegância atemporal.",
  },
  {
    name: "Travertino Silver",
    image: travertinoSilverImg,
    description: "O Travertino Silver é uma pedra de tons acinzentados, ideal para quem busca a textura do travertino e outra tonalidade.",
  },
  {
    name: "Lizard",
    image: lizardImg,
    description: "O Quartzito Lizard é uma pedra exótica de tons esverdeados com veios únicos, ideal para bancadas e revestimentos que buscam exclusividade.",
  },
  {
    name: "Taj Mahal",
    image: tajMahalImg,
    description: "O Quartzito Taj Mahal possui tons claros e dourados com veios suaves, trazendo sofisticação atemporal para ambientes elegantes.",
  },
  {
    name: "Branco Paraná",
    image: brancoParanaImg,
    description: "O Granito Branco Paraná é uma pedra clássica de fundo branco com grãos finos, ideal para cozinhas e banheiros com elegância discreta.",
  },
  {
    name: "Rock Face",
    image: rockFaceImg,
    description: "O acabamento Rock Face oferece um visual rústico e imponente, ideal para fachadas e muros, garantindo durabilidade e sofisticação.",
  },
  {
    name: "Lâminas Ultra Compactas",
    image: ultracompactImg,
    description: "Uma ótima alternativa para quem busca qualidade e praticidade combinando a beleza das pedras naturais com uma superfície lisa.",
  },
];

const Materials = () => {
  const handleWhatsAppClick = (materialName: string) => {
    const message = encodeURIComponent(
      `Olá! Gostaria de saber mais sobre ${materialName} para meu projeto.`
    );
    window.open(`https://wa.me/5511999999999?text=${message}`, "_blank");
  };

  return (
    <section id="materiais" className="py-16 md:py-24 bg-background" translate="no">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-12 md:mb-16">
          Conheça nossos revestimentos
        </h2>

        <div className="flex flex-col gap-4 md:gap-6 max-w-5xl">
          {materials.map((material) => (
            <div
              key={material.name}
              className="group flex flex-col sm:flex-row items-stretch gap-4 sm:gap-6 p-4 sm:p-5 bg-card rounded-lg border border-border hover:border-accent/50 hover:shadow-[var(--shadow-elegant)] transition-all duration-300"
            >
              {/* Image */}
              <div className="w-full sm:w-40 md:w-48 flex-shrink-0">
                <div className="aspect-[4/3] sm:aspect-square overflow-hidden rounded-lg bg-secondary">
                  {material.image ? (
                    <img
                      src={material.image}
                      alt={material.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                      Imagem pendente
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-center min-w-0">
                <h3 className="font-serif text-xl md:text-2xl font-bold text-accent mb-2">
                  {material.name}
                </h3>
                <p className="text-foreground/70 text-sm md:text-base leading-relaxed line-clamp-3">
                  {material.description}
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex items-center justify-end sm:justify-center flex-shrink-0 pt-2 sm:pt-0">
                <button
                  onClick={() => handleWhatsAppClick(material.name)}
                  className="inline-flex items-center gap-1 px-4 py-2 text-sm font-sans font-medium text-accent border border-accent rounded hover:bg-accent hover:text-white transition-colors duration-200 whitespace-nowrap"
                >
                  VEJA MAIS
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Materials;
