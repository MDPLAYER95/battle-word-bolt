import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

interface GameNotificationProps {
  message: string;
  type: "success" | "error";
  isVisible: boolean;
}

const GameNotification = ({ message, type, isVisible }: GameNotificationProps) => {
  const variants = {
    initial: {
      opacity: 0,
      y: 50,
      scale: 0.3,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        bounce: 0.4,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        >
          <div className={`
            p-6 rounded-xl shadow-2xl backdrop-blur-md
            ${type === "success" 
              ? "bg-green-500/90 text-white" 
              : "bg-red-500/90 text-white"
            }
            flex items-center gap-4 max-w-md
          `}>
            {type === "success" ? (
              <CheckCircle2 className="w-8 h-8 animate-pulse" />
            ) : (
              <XCircle className="w-8 h-8 animate-pulse" />
            )}
            <p className="text-lg font-medium">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameNotification;