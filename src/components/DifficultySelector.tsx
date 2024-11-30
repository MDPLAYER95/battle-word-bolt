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
    easy: { time: 60, label: t("easy"), color: "from-green-500 to-emerald-600" },
    medium: { time: 30, label: t("medium"), color: "from-yellow-500 to-orange-600" },
    hard: { time: 15, label: t("hard"), color: "from-red-500 to-rose-600" }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="text-center space-y-12 max-w-2xl mx-auto">
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-6xl font-bold neon-glow bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400"
        >
          {t("chooseDifficulty")}
        </motion.h1>
        
        <BattleAnimation />
        
        <div className="grid md:grid-cols-3 gap-4">
          {(Object.keys(DIFFICULTY_SETTINGS) as Difficulty[]).map((level) => (
            <motion.button
              key={level}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectDifficulty(level)}
              className={`game-card p-6 text-center bg-gradient-to-br ${DIFFICULTY_SETTINGS[level].color} hover:opacity-90`}
            >
              <h3 className="text-2xl font-bold text-white mb-2">
                {DIFFICULTY_SETTINGS[level].label}
              </h3>
              <div className="text-white/90">
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