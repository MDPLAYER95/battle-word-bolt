import { motion } from "framer-motion";
import { Skull, RotateCcw } from "lucide-react";

interface GameOverAnimationProps {
  score: number;
  onRestart: () => void;
}

const GameOverAnimation = ({ score, onRestart }: GameOverAnimationProps) => {
  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md w-full mx-4"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 1,
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
          className="text-4xl font-bold text-red-500 mb-4"
        >
          Game Over!
        </motion.h2>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <p className="text-2xl">Score Final: {score}</p>
          <div className="text-6xl">🏆</div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRestart}
            className="bg-game-primary text-white px-6 py-3 rounded-lg hover:bg-game-secondary transition-colors flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            Rejouer
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default GameOverAnimation;