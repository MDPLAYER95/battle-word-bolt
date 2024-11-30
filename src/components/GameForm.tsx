import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import GameTimer from "./GameTimer";
import { TranslationKey } from "@/i18n/translations";
import { Difficulty } from "@/types/game";

interface GameFormProps {
  currentWord: string;
  inputWord: string;
  setInputWord: (value: string) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  score: number;
  timeLeft: number;
  difficulty: Difficulty;
  t: (key: TranslationKey) => string;
}

const GameForm = ({
  currentWord,
  inputWord,
  setInputWord,
  isLoading,
  onSubmit,
  score,
  timeLeft,
  difficulty,
  t
}: GameFormProps) => {
  const DIFFICULTY_SETTINGS = {
    easy: { time: 60 },
    medium: { time: 30 },
    hard: { time: 15 }
  };

  return (
    <motion.div 
      className="max-w-lg mx-auto space-y-6"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold text-game-primary mb-2">{t("title")}</h1>
        <div className="text-2xl font-semibold text-game-secondary mb-4">
          {t("score")}: {score}
        </div>
        
        <GameTimer 
          timeLeft={timeLeft} 
          maxTime={DIFFICULTY_SETTINGS[difficulty].time} 
        />
      </div>

      <motion.form 
        onSubmit={onSubmit} 
        className="space-y-4"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <motion.div 
          className="bg-white p-6 rounded-xl shadow-lg"
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <p className="text-sm text-gray-600 mb-2">{t("currentWord")}:</p>
          <div className="flex flex-col items-center gap-4">
            <motion.div 
              className="text-8xl mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                bounce: 0.5,
                duration: 0.5
              }}
            >
              {currentWord}
            </motion.div>
          </div>
        </motion.div>

        <div className="flex gap-2">
          <motion.input
            type="text"
            value={inputWord}
            onChange={(e) => setInputWord(e.target.value)}
            placeholder={t("inputPlaceholder")}
            className="flex-1 p-3 border-2 border-game-primary/20 rounded-lg focus:border-game-primary focus:outline-none transition-colors"
            disabled={isLoading}
            whileFocus={{ scale: 1.02 }}
          />
          <motion.button
            type="submit"
            disabled={isLoading}
            className="bg-game-primary text-white px-6 py-3 rounded-lg hover:bg-game-secondary transition-colors disabled:opacity-50 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {t("loading")}
              </>
            ) : (
              t("submit")
            )}
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default GameForm;