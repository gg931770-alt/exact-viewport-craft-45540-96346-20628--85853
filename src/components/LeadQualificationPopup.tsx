import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLeadPopup } from "@/contexts/LeadPopupContext";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Briefcase, Building2, Scissors, User, Phone, Hammer, Construction, Wrench } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Step = "contact" | "question1" | "questionStage" | "question2";

interface LeadData {
  name: string;
  phone: string;
  project_type: string | null;
  project_stage?: string | null;
  timeline: string | null;
}

const LeadQualificationPopup = () => {
  const { isOpen, closePopup } = useLeadPopup();
  const [step, setStep] = useState<Step>("contact");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState<string | null>(null);
  const [projectStage, setProjectStage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const resetTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        window.clearTimeout(resetTimeoutRef.current);
        resetTimeoutRef.current = null;
      }
    };
  }, []);

  const handleClose = () => {
    closePopup();
    if (resetTimeoutRef.current) {
      window.clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
    resetTimeoutRef.current = window.setTimeout(() => {
      setStep("contact");
      setName("");
      setPhone("");
      setProjectType(null);
      setProjectStage(null);
      setErrors({});
    }, 300);
  };

  const validateContactForm = () => {
    const newErrors: { name?: string; phone?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }
    
    const phoneDigits = phone.replace(/\D/g, "");
    if (!phoneDigits) {
      newErrors.phone = "Telefone é obrigatório";
    } else if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      newErrors.phone = "Telefone deve ter DDD + número (10 ou 11 dígitos)";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContactSubmit = () => {
    if (validateContactForm()) {
      setStep("question1");
    }
  };

  const saveLead = async (data: LeadData) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any).from("leads").insert({
        name: data.name.trim(),
        phone: data.phone.replace(/\D/g, ""),
        project_type: data.project_type,
        project_stage: data.project_stage ?? null,
        timeline: data.timeline,
      });
      
      if (error) {
        console.error("Error saving lead:", error);
      }
    } catch (err) {
      console.error("Error saving lead:", err);
    }
  };

  const handleProjectType = async (type: "residential" | "commercial" | "cut") => {
    if (type === "cut") {
      await saveLead({
        name,
        phone,
        project_type: "corte",
        timeline: null,
      });
      handleClose();
      navigate("/nao-atendemos");
      return;
    }

    setProjectType(type === "residential" ? "projeto_residencial_completo" : "projeto_comercial_completo");
    setStep("questionStage");
  };

  const handleProjectStage = (stage: "obra_do_zero" | "obra_em_andamento" | "reforma") => {
    setProjectStage(stage);
    setStep("question2");
  };

  const handleTimeline = async (timeline: "30days" | "30-60days" | "60plus" | "research") => {
    const timelineMap = {
      "30days": "ate_30_dias",
      "30-60days": "30_a_60_dias",
      "60plus": "mais_de_60_dias",
      "research": "pesquisando_ideias",
    };
    
    await saveLead({
      name,
      phone,
      project_type: projectType,
      project_stage: projectStage,
      timeline: timelineMap[timeline],
    });
    
    if (timeline === "30days") {
      window.open("https://wa.link/7owg4u", "_blank");
    } else {
      window.open("https://wa.link/rq97lv", "_blank");
    }
    handleClose();
  };

  const handleBack = () => {
    if (step === "question2") {
      setStep("questionStage");
    } else if (step === "questionStage") {
      setStep("question1");
    } else if (step === "question1") {
      setStep("contact");
    }
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        // Only run close logic when Radix is requesting a close.
        // Prevents extra close cycles that can lead to inconsistent unmounts.
        if (!open) handleClose();
      }}
    >
      <DialogContent className="w-[calc(100vw-2rem)] max-w-md mx-auto p-0 gap-0 bg-card border-2 border-accent rounded-xl overflow-hidden">
        {step === "contact" && (
          <div className="p-5 sm:p-6">
            <div className="text-center mb-6">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-primary mb-2">
                Conte-nos sobre você
              </h2>
              <p className="text-sm text-muted-foreground">
                Preencha seus dados para prosseguir.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-primary mb-2">
                  <User className="h-4 w-4" />
                  Nome completo
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite seu nome"
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-destructive mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-primary mb-2">
                  <Phone className="h-4 w-4" />
                  Telefone com DDD
                </label>
                <Input
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="(00) 00000-0000"
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                )}
              </div>

              <button
                onClick={handleContactSubmit}
                className="w-full py-3 px-4 rounded-lg border-2 border-accent bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:brightness-110 transition-all font-semibold text-sm sm:text-base mt-2"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {step === "question1" && (
          <div className="p-5 sm:p-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar</span>
            </button>

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
                onClick={() => handleProjectType("residential")}
                className="w-full p-4 rounded-lg border-2 border-accent bg-card hover:bg-accent/10 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="font-semibold text-primary text-sm sm:text-base">Projeto Residencial Completo</span>
                </div>
              </button>

              <button
                onClick={() => handleProjectType("commercial")}
                className="w-full p-4 rounded-lg border-2 border-accent bg-card hover:bg-accent/10 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="font-semibold text-primary text-sm sm:text-base">Projeto Comercial Completo</span>
                </div>
              </button>

              <button
                onClick={() => handleProjectType("cut")}
                className="w-full p-4 rounded-lg border-2 border-accent bg-card hover:bg-accent/10 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <Scissors className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="font-semibold text-primary text-sm sm:text-base" translate="no">Corte de Pedra</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {step === "questionStage" && (
          <div className="p-5 sm:p-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar</span>
            </button>

            <div className="text-center mb-6">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-primary mb-2">
                Conte-nos sobre seu projeto
              </h2>
            </div>

            <p className="font-sans font-semibold text-primary text-center text-sm sm:text-base mb-4">
              Qual se encaixa melhor?
            </p>

            <div className="space-y-3">
              <button
                onClick={() => handleProjectStage("obra_do_zero")}
                className="w-full p-4 rounded-lg border-2 border-accent bg-card hover:bg-accent/10 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <Construction className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="font-semibold text-primary text-sm sm:text-base">Obra do zero</span>
                </div>
              </button>

              <button
                onClick={() => handleProjectStage("obra_em_andamento")}
                className="w-full p-4 rounded-lg border-2 border-accent bg-card hover:bg-accent/10 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <Hammer className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="font-semibold text-primary text-sm sm:text-base">Obra em andamento</span>
                </div>
              </button>

              <button
                onClick={() => handleProjectStage("reforma")}
                className="w-full p-4 rounded-lg border-2 border-accent bg-card hover:bg-accent/10 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <Wrench className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="font-semibold text-primary text-sm sm:text-base">Reforma</span>
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
                className="w-full py-3 px-4 rounded-lg border-2 border-accent bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:brightness-110 transition-all font-semibold text-sm sm:text-base"
              >
                Até 30 dias
              </button>

              <button
                onClick={() => handleTimeline("30-60days")}
                className="w-full py-3 px-4 rounded-lg border-2 border-accent bg-card hover:bg-accent/10 transition-all font-semibold text-primary text-sm sm:text-base"
              >
                De 30 a 60 dias
              </button>

              <button
                onClick={() => handleTimeline("60plus")}
                className="w-full py-3 px-4 rounded-lg border-2 border-accent bg-card hover:bg-accent/10 transition-all font-semibold text-primary text-sm sm:text-base"
              >
                Mais de 60 dias
              </button>

              <button
                onClick={() => handleTimeline("research")}
                className="w-full py-3 px-4 rounded-lg border-2 border-accent bg-card hover:bg-accent/10 transition-all font-semibold text-primary text-sm sm:text-base"
              >
                Apenas pesquisando ideias
              </button>
            </div>
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
};

export default LeadQualificationPopup;
