export type GameState = "start" | "playing" | "end"

export type Question = {
    question: string,
    options: string [],
    correct: number
}