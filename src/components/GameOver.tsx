import { Trophy } from 'lucide-react'
import { Button } from 'react-bootstrap'

type GameOverProps = {
    onRestart: () => void;
    score: number;
    totalQuestions: number
}

function GameOver({onRestart, score, totalQuestions} : GameOverProps) {

    const percentage = Math.round((score / totalQuestions) * 100)
  return (
    <div className='p-8 text-center'>
        <Trophy/>
        <h2>Game over!</h2>
        <p>Final score: {score}/{totalQuestions}</p>
        <p>({percentage}% correct)</p>
        <Button onClick={onRestart}>Play again</Button>
    </div>
    
  )
}

export default GameOver