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
        <button className="game-card flex items-center gap-2 p-2 hover:scale-105 transition-transform">
          <Globe className="w-5 h-5 text-white" />
          <span className="text-lg">{languages.find(l => l.code === currentLanguage)?.flag}</span>
        </button>
        
        <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          <div className="game-card p-2 space-y-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                className={`w-full px-4 py-2 rounded-lg flex items-center gap-2 transition-colors
                  ${currentLanguage === lang.code 
                    ? 'bg-primary/20 text-white' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="text-sm font-medium">{lang.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LanguageSelector;