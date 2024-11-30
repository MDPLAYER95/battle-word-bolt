import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { Language } from "@/i18n/translations";

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

const LanguageSelector = ({ currentLanguage, onLanguageChange }: LanguageSelectorProps) => {
  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "it", label: "Italiano", flag: "🇮🇹" }
  ];

  return (
    <motion.div 
      className="fixed top-4 right-4 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="relative group">
        <button className="bg-white p-2 rounded-lg shadow-lg flex items-center gap-2">
          <Globe className="w-5 h-5" />
          <span>{languages.find(l => l.code === currentLanguage)?.flag}</span>
        </button>
        
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onLanguageChange(lang.code)}
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 ${
                currentLanguage === lang.code ? "bg-gray-50" : ""
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LanguageSelector;