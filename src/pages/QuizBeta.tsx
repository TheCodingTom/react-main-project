import { useState } from "react";
import StartScreen from "../components/StartScreen";
import QuestionCard from "../components/QuestionCard";
import GameOver from "../components/GameOver";
import { GameState } from "../types/quiz";
import { Questions } from "../components/Questions";

function QuizBeta() {
  const [gameState, setGameState] = useState<GameState>("start");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const handleStart = () => {
    setGameState("playing");
  };

  const handleRestart = () => {
    setGameState("start")
  }
  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    const isCorrect = index === Questions[currentQuestion].correct;

    if (isCorrect === true) {
      setScore((prev) => prev + 1);
    }
    setTimeout(() => {
      if (currentQuestion < Questions.length - 1) {
        // prevent app from crashing at the end of 10 questions
        setCurrentQuestion((prev) => prev + 1); // updates the current question with the next one
        setSelectedAnswer(null); // reset the selected answer otherwise the index won't change
      } else {
        setGameState("end");
      }
    }, 1000);
  };
  return (
    <>
      <div>
        {gameState === "start" && <StartScreen onStart={handleStart} />}
        {gameState === "playing" && (
          <div>
            <QuestionCard
              question={Questions[currentQuestion]}
              onAnswerSelect={handleAnswer}
              selectedAnswer={selectedAnswer}
              totalQuestions={Questions.length}
              currentQuestion={currentQuestion}
            />

            <div>
              Score: {score}/{Questions.length}
            </div>
          </div>
        )}
        {gameState === "end" && (
          <GameOver
            totalQuestions={Questions.length}
            score={score}
            onRestart={handleRestart}
          />
        )}
      </div>
    </>
  );
}

export default QuizBeta;
