import { CheckCircle, XCircle } from "lucide-react";
import { Question } from "../types/quiz";

type QuestionCardProps = {
  question: Question;
  onAnswerSelect: (index: number) => void;
  selectedAnswer: number | null;
  totalQuestions: number;
  currentQuestion: number;
};

function QuestionCard({
  question,
  onAnswerSelect,
  selectedAnswer,
  totalQuestions,
  currentQuestion,
}: QuestionCardProps) {
  const getButtonClass = (index: number): string => {
    if (selectedAnswer === null) return "hover:bg-gray-100";
    if (index === question.correct) return "bg-green-100 border-green-500";
    if (selectedAnswer === index) return "bg-red-100 border-red-500";
    return "opacity-50";
  };

  return (
    <div className="quiz-container">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Question {currentQuestion + 1} of {totalQuestions}
      </h2>
      <p className="text-gray-600 mb-4">{question.question}</p>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => selectedAnswer === null && onAnswerSelect(index)}
            className={`w-full p-4 text-left border rounded-lg transition-all duration-300 ${getButtonClass(
              index
            )}`}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {selectedAnswer !== null && index === question.correct && (
                <CheckCircle />
              )}
              {selectedAnswer === index && index !== question.correct && (
                <XCircle  />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;
