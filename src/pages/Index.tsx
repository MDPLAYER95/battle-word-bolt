import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import GameNotification from "@/components/GameNotification";
import GameHistory from "@/components/GameHistory";
import GameTimer from "@/components/GameTimer";
import BattleAnimation from "@/components/BattleAnimation";
import GameOverAnimation from "@/components/GameOverAnimation";
import { Loader2 } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import { translations, Language, TranslationKey } from "@/i18n/translations";
import GameForm from "@/components/GameForm";
import DifficultySelector from "@/components/DifficultySelector";
import { startingWords } from "@/lib/starting-words";

interface GameResponse {
  explication_pour_ou_contre: string;
  mot_precedent: string;
  mot_soumis_par_utilisateur: string;
  smiley_correspondant_au_mot: string;
  mot_deja_utiliser_precedement: boolean;
  succes: boolean;
}

interface HistoryItem {
  word: string;
  explanation: string;
  emoji: string;
  isError?: boolean;
}

type Difficulty = "easy" | "medium" | "hard";

const DIFFICULTY_SETTINGS = {
  easy: { time: 60 },
  medium: { time: 30 },
  hard: { time: 15 }
};

const Index = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const browserLang = navigator.language.split('-')[0];
    return (browserLang in translations ? browserLang : 'en') as Language;
  });

  const [currentWord, setCurrentWord] = useState(startingWords[currentLanguage].word);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      word: startingWords[currentLanguage].word,
      explanation: translations[currentLanguage].initialWord,
      emoji: startingWords[currentLanguage].emoji
    }
  ]);
  const [inputWord, setInputWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    type: "success" as "success" | "error",
    isVisible: false
  });
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timerPaused, setTimerPaused] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && timeLeft > 0 && !timerPaused) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameOver(true);
            showNotification(t("gameOver"), "error");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, timeLeft, timerPaused]);

  // Effect to handle language changes
  useEffect(() => {
    if (!gameStarted) {
      const startingWord = startingWords[currentLanguage];
      setCurrentWord(startingWord.word);
      setHistory([{
        word: startingWord.word,
        explanation: translations[currentLanguage].initialWord,
        emoji: startingWord.emoji
      }]);
    }
  }, [currentLanguage, gameStarted]);

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type, isVisible: true });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  const resetGame = () => {
    const startingWord = startingWords[currentLanguage];
    setDifficulty(null);
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setHistory([{
      word: startingWord.word,
      explanation: t("initialWord"),
      emoji: startingWord.emoji
    }]);
    setCurrentWord(startingWord.word);
    setInputWord("");
    setTimeLeft(0);
    setTimerPaused(false);
  };

  const startGame = (selectedDifficulty: Difficulty) => {
    const startingWord = startingWords[currentLanguage];
    setDifficulty(selectedDifficulty);
    setTimeLeft(DIFFICULTY_SETTINGS[selectedDifficulty].time);
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setHistory([{
      word: startingWord.word,
      explanation: t("initialWord"),
      emoji: startingWord.emoji
    }]);
    setCurrentWord(startingWord.word);
  };

  const submitWord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputWord.trim()) return;
    
    setTimerPaused(true);
    setIsLoading(true);
    
    try {
      const response = await fetch("/.netlify/functions/check-word", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          word: inputWord,
          previousWords: history.map(item => item.word),
          currentWord,
          language: currentLanguage
        }),
      });
      
      const data: GameResponse = await response.json();
      
      if (response.ok && data.succes) {
        if (difficulty) {
          setTimeLeft(DIFFICULTY_SETTINGS[difficulty].time);
        }
        setScore(prev => prev + 1);
        setHistory(prev => [...prev, { 
          word: inputWord,
          explanation: data.explication_pour_ou_contre,
          emoji: data.smiley_correspondant_au_mot
        }]);
        setCurrentWord(inputWord);
        showNotification(data.explication_pour_ou_contre, "success");
        setTimerPaused(false);
      } else {
        setHistory(prev => [...prev, { 
          word: inputWord,
          explanation: data.explication_pour_ou_contre,
          emoji: "💀",
          isError: true
        }]);
        showNotification(data.explication_pour_ou_contre, "error");
        setGameOver(true);
      }
    } catch (error) {
      showNotification(t("error"), "error");
    } finally {
      setIsLoading(false);
      setInputWord("");
    }
  };

  const t = (key: TranslationKey) => translations[currentLanguage][key];

  if (!difficulty) {
    return (
      <>
        <LanguageSelector 
          currentLanguage={currentLanguage}
          onLanguageChange={setCurrentLanguage}
        />
        <DifficultySelector 
          onSelectDifficulty={startGame}
          currentLanguage={currentLanguage}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-game-background to-white p-4">
      <LanguageSelector 
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />

      <GameNotification 
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
      />
      
      {gameOver && <GameOverAnimation score={score} onRestart={resetGame} />}
      
      <GameForm
        currentWord={currentWord}
        inputWord={inputWord}
        setInputWord={setInputWord}
        isLoading={isLoading}
        onSubmit={submitWord}
        score={score}
        timeLeft={timeLeft}
        difficulty={difficulty}
        t={t}
      />

      {history.length > 0 && <GameHistory history={history} />}
    </div>
  );
};

export default Index;