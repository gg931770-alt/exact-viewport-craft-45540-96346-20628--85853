import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const NaoAtendemos = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card border-2 border-accent rounded-xl p-6 sm:p-8 text-center space-y-6">
        <div className="w-16 h-16 mx-auto bg-accent/30 rounded-full flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-primary">
          Agradecemos seu interesse!
        </h1>

        <div className="space-y-4 text-muted-foreground">
          <p className="leading-relaxed">
            No momento, a <strong className="text-primary">Marmoraria União</strong> atende exclusivamente{" "}
            <strong className="text-primary">projetos completos</strong>, com fornecimento e instalação.
          </p>

          <p className="leading-relaxed">
            Infelizmente, não trabalhamos com cortes avulsos de pedras.
          </p>

          <p className="leading-relaxed">
            Caso esteja buscando um projeto completo, ficaremos felizes em atender você!
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao site
        </Link>
      </div>
    </div>
  );
};

export default NaoAtendemos;
