import { createContext, useContext, useState, ReactNode } from "react";

interface LeadPopupContextType {
  isOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
}

const LeadPopupContext = createContext<LeadPopupContextType | undefined>(undefined);

export const LeadPopupProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <LeadPopupContext.Provider value={{ isOpen, openPopup, closePopup }}>
      {children}
    </LeadPopupContext.Provider>
  );
};

export const useLeadPopup = () => {
  const context = useContext(LeadPopupContext);
  if (!context) {
    throw new Error("useLeadPopup must be used within a LeadPopupProvider");
  }
  return context;
};
