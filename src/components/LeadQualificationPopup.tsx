import { useState } from "react";
import { useLeadPopup } from "@/contexts/LeadPopupContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

type Step = "question1" | "question2" | "rejected";

const LeadQualificationPopup = () => {
  const { isOpen, closePopup } = useLeadPopup();
  const [step, setStep] = useState<Step>("question1");

  const handleClose = () => {
    closePopup();
    // Reset to initial state after animation
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
      // Lead prioritário - até 30 dias
      window.open("https://wa.link/7owg4u", "_blank");
    } else {
      // Outros prazos
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
      <DialogContent className="sm:max-w-md bg-card border-2 border-accent">
        {step === "question1" && (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl text-primary text-center">
                Conte-nos sobre seu projeto
              </DialogTitle>
              <DialogDescription className="text-center text-muted-foreground">
                Responda rapidamente para direcionarmos você ao atendimento ideal.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-3 mt-6">
              <p className="font-sans font-semibold text-primary text-center mb-4">
                O que você está buscando no momento?
              </p>
              
              <Button
                variant="premium"
                size="lg"
                className="w-full h-auto py-4 px-6 text-left"
                onClick={() => handleProjectType("complete")}
              >
                <div className="flex items-start gap-3 w-full">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block">Projeto completo</span>
                    <span className="text-sm opacity-90 font-normal block mt-1">
                      Bancada, ilha, banheiro, escada, área gourmet, entre outros
                    </span>
                  </div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="w-full h-auto py-4 px-6 text-left border-2 border-accent hover:bg-accent/10"
                onClick={() => handleProjectType("cut")}
              >
                <div className="flex items-start gap-3 w-full">
                  <div className="h-5 w-5 rounded-full border-2 border-current mt-0.5 flex-shrink-0" />
                  <span className="font-semibold">Corte de pedra</span>
                </div>
              </Button>
            </div>
          </>
        )}

        {step === "question2" && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto"
                  onClick={handleBack}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">Voltar</span>
              </div>
              <DialogTitle className="font-serif text-2xl text-primary text-center">
                Conte-nos sobre seu projeto
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-3 mt-6">
              <p className="font-sans font-semibold text-primary text-center mb-4">
                Em quanto tempo você pretende executar esse projeto?
              </p>
              
              <Button
                variant="premium"
                size="lg"
                className="w-full py-4"
                onClick={() => handleTimeline("30days")}
              >
                Até 30 dias
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="w-full py-4 border-2 border-accent hover:bg-accent/10"
                onClick={() => handleTimeline("other")}
              >
                De 30 a 60 dias
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="w-full py-4 border-2 border-accent hover:bg-accent/10"
                onClick={() => handleTimeline("other")}
              >
                Mais de 60 dias
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="w-full py-4 border-2 border-accent hover:bg-accent/10"
                onClick={() => handleTimeline("other")}
              >
                Apenas pesquisando ideias
              </Button>
            </div>
          </>
        )}

        {step === "rejected" && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto"
                  onClick={handleBack}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">Voltar</span>
              </div>
            </DialogHeader>
            
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              
              <h3 className="font-serif text-xl font-bold text-primary">
                Agradecemos seu contato.
              </h3>
              
              <p className="font-sans text-muted-foreground leading-relaxed">
                No momento, a Marmoraria União atende exclusivamente{" "}
                <strong className="text-primary">projetos completos</strong>, com fornecimento e instalação.
              </p>
              
              <p className="font-sans text-muted-foreground leading-relaxed">
                Caso esteja buscando esse tipo de projeto, ficaremos felizes em atender você.
              </p>
              
              <Button
                variant="premium"
                size="lg"
                className="mt-4"
                onClick={() => setStep("question1")}
              >
                Tenho um projeto completo
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadQualificationPopup;
