import teamPhoto from "@/assets/team-logo.jpg";
import { Button } from "@/components/ui/button";
import { useLeadPopup } from "@/contexts/LeadPopupContext";
const About = () => {
  const {
    openPopup
  } = useLeadPopup();
  return <section id="sobre" className="py-12 md:py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-8 text-center">
          <span translate="no">CONHEÇA A UNIÃO MÁRMORES</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          <div className="space-y-6 font-sans text-base md:text-lg text-primary leading-relaxed max-w-prose">
            <p className="mb-5">
              <span translate="no">A União Mármores</span>{" "}nasceu da paixão de um pai pelas pedras ornamentais e da determinação de seu filho em inovar na indústria de revestimento com pedras exóticas.
            </p>

            <p className="mb-5">
              Enquanto o pai transformava ambientes com sua habilidade com mais de 30 anos de experiência, seu filho já traz uma nova tendência em esculpir estas pedras de um jeito totalmente personalizado para cada obra e ambiente.
            </p>

            <p className="mb-5">
              Hoje, a empresa vem mantendo seu legado familiar e exclusivo. Essa evolução trouxe uma nova era para a empresa, que agora foca na criação de peças personalizadas com materiais de alta qualidade, como <strong className="text-primary">Pedras Ultracompactas, Mármores, Quartzos, Quartzitos e Granitos</strong>.
            </p>

            <p>
              Cada projeto é feito sob medida, refletindo a individualidade de cada cliente. Com um compromisso inabalável com a <strong className="text-primary">qualidade e atendimento personalizado</strong>, a empresa se destaca no mercado, olhando para o futuro e buscando expandir sua presença e incorporar novas tecnologias.
            </p>
          </div>

          <div className="relative">
            <div className="bg-card p-8 rounded-lg border-2 border-accent shadow-[var(--shadow-lg)]">
              <h3 className="font-serif text-2xl font-bold text-primary mb-4">

              </h3>

              <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-[var(--shadow-elegant)] mb-6 border-2 border-accent">
                <img src={teamPhoto} alt="Logo União Mármores" width="1920" height="1080" loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </div>
              <Button variant="premium" size="lg" className="w-full" onClick={openPopup}>
                FAÇA SEU ORÇAMENTO
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;