import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const emojis = ["😀", "😈", "👻", "👽", "🤖", "🦁", "🐯", "🐉"];

const BattleAnimation = () => {
  const [attacker, setAttacker] = useState(emojis[0]);
  const [victim, setVictim] = useState(emojis[1]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newAttacker = emojis[Math.floor(Math.random() * emojis.length)];
      const newVictim = emojis[Math.floor(Math.random() * emojis.length)];
      setAttacker(newAttacker);
      setVictim(newVictim);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-48 flex items-center justify-center mb-8">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ 
          x: [null, 0, 100, -100],
          opacity: [null, 1, 0, 0],
          scale: [null, 1, 1.5, 1]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute text-8xl md:text-9xl"
      >
        {attacker}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{ 
          opacity: [null, 1, 0],
          scale: [null, 1, 0.5],
          rotate: [null, 0, 180]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute text-8xl md:text-9xl"
      >
        {victim}
      </motion.div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [null, 0, 2, 0],
          opacity: [null, 0, 1, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute text-8xl md:text-9xl text-yellow-500"
      >
        💥
      </motion.div>
    </div>
  );
};

export default BattleAnimation;