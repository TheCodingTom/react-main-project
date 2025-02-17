import { Question } from "../types/quiz"

type QuestionCardProps = {
    question: Question
}


function QuestionCard({question}: QuestionCardProps) {
  return (
    <div>
        <h2>
            Question 1 of 5
        </h2>
    </div>
  )
}

export default QuestionCard