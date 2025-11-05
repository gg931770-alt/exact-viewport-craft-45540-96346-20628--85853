import { Button } from "@/components/ui/button";
import { Phone, Clock, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <section id="contato" className="py-12 md:py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4" style={{ color: 'white' }}>
            ENTRE EM CONTATO OU VENHA NOS VISITAR
          </h2>
          <p className="font-sans text-lg" style={{ color: 'hsl(40 40% 93%)' }}>
            Fale com a gente e descubra como podemos te ajudar através de um atendimento humanizado e personalizado. Será um prazer te atender!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-6 bg-card p-8 rounded-lg border-2 border-accent shadow-[var(--shadow-lg)]">
            <div className="flex items-start gap-4">
              <MessageCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-sans font-semibold text-lg mb-2 text-primary">Whatsapp</h3>
                <a 
                  href="https://wa.me/5511993187939?text=Ol%C3%A1%2C%20queria%20saber%20mais%20sobre%20a%20marmoraria." 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-accent hover:brightness-110 transition-all hover:underline decoration-accent decoration-2 underline-offset-4 font-semibold"
                >
                  (11) 99318-7939
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Clock className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-sans font-semibold text-lg mb-2 text-primary">Horário de Atendimento</h3>
                <p className="font-sans text-primary">
                  Segunda à Sexta: 8h às 17h<br />
                  Sábado: 8h às 12h
                </p>
              </div>
            </div>
            
            <Button variant="premium" size="lg" className="w-full mt-6" asChild>
              <a href="https://wa.me/5511993187939?text=Ol%C3%A1%2C%20queria%20saber%20mais%20sobre%20a%20marmoraria." target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                FAÇA SEU ORÇAMENTO
              </a>
            </Button>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-[var(--shadow-xl)] h-[400px] lg:h-auto border-2 border-accent">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.123!2d-46.8511!3d-23.7143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cfab1234567890%3A0x1234567890abcdef!2sRua%20Almerindo%20Pereira%20Bueno%2C%20148%20-%20Jardim%20Nisalves%2C%20Itapecerica%20da%20Serra%20-%20SP%2C%2006871-030!5e0!3m2!1spt-BR!2sbr!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização The Gold Marmoraria - Rua Almerindo Pereira Bueno, 148, Itapecerica da Serra - SP"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
