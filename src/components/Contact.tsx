import { Button } from "@/components/ui/button";
import { Phone, Clock, MessageCircle } from "lucide-react";
const Contact = () => {
  return <section id="contato" className="py-12 md:py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4" style={{
          color: 'white'
        }}>
            ENTRE EM CONTATO OU VENHA NOS VISITAR
          </h2>
          <p className="font-sans text-lg" style={{
          color: 'hsl(40 40% 93%)'
        }}>
            Fale com a gente e descubra como podemos te ajudar através de um atendimento humanizado e personalizado. Será um prazer te atender!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-6 bg-card p-8 rounded-lg border-2 border-accent shadow-[var(--shadow-lg)]">
            <div className="flex items-start gap-4">
              <MessageCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-sans font-semibold text-lg mb-2 text-primary">Whatsapp</h3>
                <a href="https://wa.me/5519998469597?text=Ol%C3%A1%2C%20vim%20do%20site%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es." target="_blank" rel="noopener noreferrer" className="font-sans text-primary hover:brightness-90 transition-all hover:underline decoration-primary decoration-2 underline-offset-4 font-semibold">(19) 99846-9597</a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-sans font-semibold text-lg mb-2 text-primary">Horário de Atendimento</h3>
                <p className="font-sans text-foreground">Segunda a quinta: 8h às 17:30</p>
                <p className="font-sans text-foreground">Sexta: 8h às 16:30</p>
              </div>
            </div>
            
            <Button variant="premium" size="lg" className="w-full mt-6" asChild>
              <a href="https://wa.me/5519998469597?text=Ol%C3%A1%2C%20vim%20do%20site%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es." target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                FAÇA SEU ORÇAMENTO
              </a>
            </Button>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-[var(--shadow-xl)] h-[400px] lg:h-auto border-2 border-accent">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.3858842615164!2d-47.138971999999995!3d-22.9360115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8b7e081f62529%3A0xdb136997248ad285!2sMarmoraria%20Uni%C3%A3o%20Campinas!5e0!3m2!1sen!2sbr!4v1762384878189!5m2!1sen!2sbr" width="100%" height="100%" style={{
            border: 0
          }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Localização Marmoraria União Campinas" />
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;