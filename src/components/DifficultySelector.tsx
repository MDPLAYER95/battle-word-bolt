import { motion } from "framer-motion";
import BattleAnimation from "./BattleAnimation";
import { Language, TranslationKey, translations } from "@/i18n/translations";
import { Difficulty } from "@/types/game";

interface DifficultySelectorProps {
  onSelectDifficulty: (difficulty: Difficulty) => void;
  currentLanguage: Language;
}

const DifficultySelector = ({ onSelectDifficulty, currentLanguage }: DifficultySelectorProps) => {
  const t = (key: TranslationKey) => translations[currentLanguage][key];
  
  const DIFFICULTY_SETTINGS = {
    easy: { time: 60, label: t("easy") },
    medium: { time: 30, label: t("medium") },
    hard: { time: 15, label: t("hard") }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-game-background to-white p-4 flex items-center justify-center"
    >
      <div className="text-center space-y-8">
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl font-bold text-game-primary mb-8"
        >
          {t("chooseDifficulty")}
        </motion.h1>
        
        <BattleAnimation />
        
        <div className="flex flex-col md:flex-row gap-4">
          {(Object.keys(DIFFICULTY_SETTINGS) as Difficulty[]).map((level) => (
            <motion.button
              key={level}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectDifficulty(level)}
              className={`
                px-8 py-4 rounded-xl shadow-lg text-white font-bold text-xl
                ${level === 'easy' ? 'bg-green-500 hover:bg-green-600' : 
                  level === 'medium' ? 'bg-yellow-500 hover:bg-yellow-600' : 
                  'bg-red-500 hover:bg-red-600'}
                transition-colors duration-200
              `}
            >
              {DIFFICULTY_SETTINGS[level].label}
              <div className="text-sm mt-2">
                {DIFFICULTY_SETTINGS[level].time} {t("seconds")}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DifficultySelector;