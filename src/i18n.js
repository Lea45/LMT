import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "hr", "it", "de"],
    detection: {
      order: ["path", "localStorage", "navigator"], 
      lookupFromPathIndex: 0,
    },
    backend: {
      loadPath: "/locales/{{lng}}.json" 
    },
    interpolation: { escapeValue: false }
  });

export default i18n;