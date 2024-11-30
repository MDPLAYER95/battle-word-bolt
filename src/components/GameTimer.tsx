import { motion } from "framer-motion";
import { Timer } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface GameTimerProps {
  timeLeft: number;
  maxTime: number;
}

const GameTimer = ({ timeLeft, maxTime }: GameTimerProps) => {
  const progress = (timeLeft / maxTime) * 100;
  
  const getProgressColor = () => {
    if (progress > 66) return "bg-green-500";
    if (progress > 33) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  return (
    <div className="relative">
      <div className="flex items-center gap-2 mb-2">
        <Timer className="w-6 h-6 text-game-primary animate-pulse" />
        <span className="font-bold text-xl text-game-primary">{timeLeft}s</span>
      </div>
      <Progress 
        value={progress} 
        className={`h-3 bg-gray-200 [&>div]:${getProgressColor()} [&>div]:transition-all [&>div]:duration-500`}
      />
    </div>
  );
};

export default GameTimer;