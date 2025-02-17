import { useState } from "react";
import StartScreen from "../components/StartScreen";
import QuestionCard from "../components/QuestionCard";
import GameOver from "../components/GameOver";
import { GameState } from "../types/quiz";
import { Questions } from "../components/Questions";

function FooQuiz() {
  const [gameState, setGameState] = useState<GameState>("start");
  const handleStart = () => {
    setGameState("playing");
  };
  return (
    <>
      <div>
        {gameState === "start" && <StartScreen onStart={handleStart} />}
        {gameState === "playing" && <QuestionCard question={Questions[0]} />}
        {gameState === "end" && <GameOver />}
      </div>
    </>
  );
}

export default FooQuiz;
