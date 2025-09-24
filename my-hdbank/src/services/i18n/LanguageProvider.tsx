import { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "vi";

interface LangContextValue {
  language: Language;
  changeLanguage: (lng: Language) => void;
}

const LanguageContext = createContext<LangContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(
    (localStorage.getItem("lang") as Language) || "en"
  );

  const changeLanguage = (lng: Language) => {
    setLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Language;
    if (stored) setLanguage(stored);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
};
