import { useState } from "react";
import { useLeadPopup } from "@/contexts/LeadPopupContext";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Briefcase, Scissors } from "lucide-react";

type Step = "question1" | "question2" | "rejected";

const LeadQualificationPopup = () => {
  const { isOpen, closePopup } = useLeadPopup();
  const [step, setStep] = useState<Step>("question1");

  const handleClose = () => {
    closePopup();
    setTimeout(() => setStep("question1"), 300);
  };

  const handleProjectType = (type: "complete" | "cut") => {
    if (type === "complete") {
      setStep("question2");
    } else {
      setStep("rejected");
    }
  };

  const handleTimeline = (timeline: "30days" | "other") => {
    if (timeline === "30days") {
      window.open("https://wa.link/7owg4u", "_blank");
    } else {
      window.open("https://wa.link/rq97lv", "_blank");
    }
    handleClose();
  };

  const handleBack = () => {
    if (step === "question2" || step === "rejected") {
      setStep("question1");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-md mx-auto p-0 gap-0 bg-card border-2 border-accent rounded-xl overflow-hidden">
        {step === "question1" && (
          <div className="p-5 sm:p-6">
            <div className="text-center mb-6">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-primary mb-2">
                Conte-nos sobre seu projeto
              </h2>
              <p className="text-sm text-muted-foreground">
                Responda rapidamente para direcionarmos você ao atendimento ideal.
              </p>
            </div>

            <p className="font-sans font-semibold text-primary text-center text-sm sm:text-base mb-4">
              O que você está buscando no momento?
            </p>

            <div className="space-y-3">
              <button
                onClick={() => handleProjectType("complete")}
                className="w-full p-4 rounded-lg border-2 border-accent bg-gradient-to-r from-primary to-primary/90 text-white hover:brightness-110 transition-all text-left"
              >
                <div className="flex items-start gap-3">
                  <Briefcase className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="font-semibold block text-sm sm:text-base">Projeto completo</span>
                    <span className="text-xs sm:text-sm opacity-90 block mt-1 leading-relaxed">
                      Bancada, ilha, banheiro, escada, área gourmet, entre outros
                    </span>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleProjectType("cut")}
                className="w-full p-4 rounded-lg border-2 border-accent bg-card hover:bg-accent/10 transition-all text-left"
              >
                <div className="flex items-start gap-3">
                  <Scissors className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                  <span className="font-semibold text-primary text-sm sm:text-base">Corte de pedra</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {step === "question2" && (
          <div className="p-5 sm:p-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar</span>
            </button>

            <div className="text-center mb-6">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-primary">
                Conte-nos sobre seu projeto
              </h2>
            </div>

            <p className="font-sans font-semibold text-primary text-center text-sm sm:text-base mb-4">
              Em quanto tempo você pretende executar esse projeto?
            </p>

            <div className="space-y-2">
              <button
                onClick={() => handleTimeline("30days")}
                className="w-full py-3 px-4 rounded-lg border-2 border-accent bg-gradient-to-r from-primary to-primary/90 text-white hover:brightness-110 transition-all font-semibold text-sm sm:text-base"
              >
                Até 30 dias
              </button>

              <button
                onClick={() => handleTimeline("other")}
                className="w-full py-3 px-4 rounded-lg border-2 border-accent bg-card hover:bg-accent/10 transition-all font-semibold text-primary text-sm sm:text-base"
              >
                De 30 a 60 dias
              </button>

              <button
                onClick={() => handleTimeline("other")}
                className="w-full py-3 px-4 rounded-lg border-2 border-accent bg-card hover:bg-accent/10 transition-all font-semibold text-primary text-sm sm:text-base"
              >
                Mais de 60 dias
              </button>

              <button
                onClick={() => handleTimeline("other")}
                className="w-full py-3 px-4 rounded-lg border-2 border-accent bg-card hover:bg-accent/10 transition-all font-semibold text-primary text-sm sm:text-base"
              >
                Apenas pesquisando ideias
              </button>
            </div>
          </div>
        )}

        {step === "rejected" && (
          <div className="p-5 sm:p-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar</span>
            </button>

            <div className="text-center space-y-4">
              <div className="w-14 h-14 mx-auto bg-accent/30 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-7 w-7 text-primary" />
              </div>

              <h3 className="font-serif text-lg sm:text-xl font-bold text-primary">
                Agradecemos seu contato.
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                No momento, a Marmoraria União atende exclusivamente{" "}
                <strong className="text-primary">projetos completos</strong>, com fornecimento e instalação.
              </p>

              <p className="text-sm text-muted-foreground leading-relaxed">
                Caso esteja buscando esse tipo de projeto, ficaremos felizes em atender você.
              </p>

              <button
                onClick={() => setStep("question1")}
                className="w-full py-3 px-4 rounded-lg border-2 border-accent bg-gradient-to-r from-primary to-primary/90 text-white hover:brightness-110 transition-all font-semibold text-sm sm:text-base mt-2"
              >
                Tenho um projeto completo
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadQualificationPopup;
