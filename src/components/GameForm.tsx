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
  // Get the current emoji from the history
  const getCurrentEmoji = () => {
    // This is a simple mapping for demonstration. You should get the actual emoji from your history
    const emojiMap: Record<string, string> = {
      "Pierre": "🪨",
      "Stone": "🪨",
      "Stein": "🪨",
      "Piedra": "🪨",
      "Pietra": "🪨",
      // Add more mappings as needed
    };
    return emojiMap[currentWord] || "❓";
  };

  return (
    <motion.div 
      className="max-w-2xl mx-auto space-y-8"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold neon-glow bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
          {t("title")}
        </h1>
        <div className="text-3xl font-bold text-white/90">
          {t("score")}: <span className="text-primary">{score}</span>
        </div>
        
        <GameTimer 
          timeLeft={timeLeft} 
          maxTime={difficulty === 'easy' ? 60 : difficulty === 'medium' ? 30 : 15}
        />
      </div>

      <motion.div 
        className="game-card"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <p className="text-sm text-white/60 mb-2">{t("currentWord")}:</p>
        <div className="flex flex-col items-center gap-4">
          <motion.div 
            className="flex flex-col items-center gap-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              bounce: 0.5,
              duration: 0.5
            }}
          >
            <span className="text-8xl animate-float">{getCurrentEmoji()}</span>
            <span className="text-3xl text-white/90 font-medium">{currentWord}</span>
          </motion.div>
        </div>
      </motion.div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex gap-3">
          <motion.input
            type="text"
            value={inputWord}
            onChange={(e) => setInputWord(e.target.value)}
            placeholder={t("inputPlaceholder")}
            className="game-input flex-1"
            disabled={isLoading}
            whileFocus={{ scale: 1.02 }}
          />
          <motion.button
            type="submit"
            disabled={isLoading}
            className="game-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2 inline" />
                {t("loading")}
              </>
            ) : (
              t("submit")
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default GameForm;