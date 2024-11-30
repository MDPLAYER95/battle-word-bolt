import { motion } from "framer-motion";
import { Skull, RotateCcw, Timer, XCircle } from "lucide-react";
import { HistoryItem } from "@/types/game";

interface GameOverAnimationProps {
  score: number;
  onRestart: () => void;
  lastMove?: HistoryItem;
  timeUp?: boolean;
}

const GameOverAnimation = ({ score, onRestart, lastMove, timeUp }: GameOverAnimationProps) => {
  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="game-card max-w-lg w-full mx-4 text-center relative overflow-hidden"
      >
        {/* Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-rose-500/10 z-0" />
        
        {/* Content */}
        <div className="relative z-10">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="mb-6"
          >
            <Skull className="w-24 h-24 mx-auto text-red-500" />
          </motion.div>
          
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-white mb-4 neon-glow"
          >
            Game Over!
          </motion.h2>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            {/* Score Display */}
            <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-2xl text-white/90">Score Final: <span className="text-primary font-bold">{score}</span></p>
              <div className="text-6xl my-2">🏆</div>
            </div>
            
            {/* Reason for Game Over */}
            <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
              {timeUp ? (
                <div className="flex items-center justify-center gap-2 text-red-400">
                  <Timer className="w-5 h-5" />
                  <span>Temps écoulé!</span>
                </div>
              ) : lastMove?.isError && (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-red-400">
                    <XCircle className="w-5 h-5" />
                    <span>Mot invalide!</span>
                  </div>
                  <div className="text-sm text-white/60">
                    {lastMove.explanation}
                  </div>
                </div>
              )}
            </div>
            
            {/* Restart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRestart}
              className="game-button flex items-center gap-2 mx-auto"
            >
              <RotateCcw className="w-5 h-5" />
              Rejouer
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GameOverAnimation;