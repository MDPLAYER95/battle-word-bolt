import { motion } from "framer-motion";

interface HistoryItem {
  word: string;
  explanation: string;
  emoji: string;
  isError?: boolean;
}

interface GameHistoryProps {
  history: HistoryItem[];
}

const GameHistory = ({ history }: GameHistoryProps) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-xl shadow-lg"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <h2 className="font-bold text-2xl mb-6 text-game-primary flex items-center gap-2">
        <span>📜</span> Historique
      </h2>
      <div className="space-y-4">
        {history.map((item, index) => (
          <motion.div 
            key={index} 
            className={`p-4 rounded-lg ${
              item.isError 
                ? "bg-red-50 border-2 border-red-200" 
                : "bg-gray-50 hover:bg-gray-100"
            } transition-colors duration-200`}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-4xl">{item.emoji}</span>
              <div className="flex-1">
                <h3 className={`font-bold text-xl ${
                  item.isError ? "text-red-600" : "text-game-text"
                }`}>
                  {item.word}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{item.explanation}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default GameHistory;