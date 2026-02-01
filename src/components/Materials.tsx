import ultracompactImg from "@/assets/material-ultracompact.webp";
import quartzImg from "@/assets/material-quartz.webp";
import marbleImg from "@/assets/material-marble.webp";
import graniteImg from "@/assets/material-granite.webp";
import { ChevronRight } from "lucide-react";

// Placeholder para imagens que serão adicionadas depois
const placeholderImg = "";

const materials = [
  {
    name: "Travertino Romano",
    image: marbleImg, // Imagem temporária - substituir pela correta
    description: "O Travertino Romano une sofisticação e durabilidade, ideal para pisos, paredes e bancadas, trazendo uma elegância atemporal.",
  },
  {
    name: "Travertino Silver",
    image: quartzImg, // Imagem temporária - substituir pela correta
    description: "O Travertino Silver é uma pedra de tons acinzentados, ideal para quem busca a textura do travertino e outra tonalidade.",
  },
  {
    name: "Hijau",
    image: placeholderImg, // Aguardando imagem
    description: "A pedra Hijau oferece beleza única, efeito paradisíaco na água, alta durabilidade e resistência à umidade, ideal para piscinas e spas.",
  },
  {
    name: "Hitam",
    image: placeholderImg, // Aguardando imagem
    description: "A pedra Hitam é uma rocha natural vulcânica de tom escuro, ideal para pisos, revestimentos, piscinas e áreas externas com elegância.",
  },
  {
    name: "Aquamarine",
    image: placeholderImg, // Aguardando imagem
    description: "A pedra Aquamarine é uma rocha natural em tons azul-esverdeados, ideal para piscinas, revestimentos e paisagismo.",
  },
  {
    name: "Rock Face",
    image: graniteImg, // Imagem temporária - substituir pela correta
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
