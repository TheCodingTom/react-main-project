import { useEffect, useState } from "react";

interface Country {
  name: { common: string };
  capital?: string[];
  flags: { png: string };
}

const QuizGame = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data: Country[] = await response.json();
      setCountries(data.sort(() => 0.5 - Math.random()).slice(0, 10)); // Pick 10 random countries
    };
    fetchCountries();
  }, []);

  const handleAnswer = (answer: string) => {
    if (!countries[currentQuestion]) return;
    if (answer === countries[currentQuestion].capital?.[0]) {
      setScore((prev) => prev + 1);
    }
    setSelectedAnswer(answer);
    setTimeout(() => {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
    }, 1000);
  };

  if (countries.length === 0) return <p>Loading...</p>;
  if (currentQuestion >= countries.length) return <p>Game Over! Score: {score}</p>;

  return (
    <div>
      <h2>What is the capital of {countries[currentQuestion].name.common}?</h2>
      <img src={countries[currentQuestion].flags.png} alt="flag" width={100} />
      {["Option1", "Option2", countries[currentQuestion].capital?.[0], "Option3"]
        .sort(() => 0.5 - Math.random())
        .map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            disabled={selectedAnswer !== null}
            style={{
              backgroundColor: selectedAnswer === option ? (option === countries[currentQuestion].capital?.[0] ? "green" : "red") : "white",
            }}
          >
            {option}
          </button>
        ))}
      <p>Score: {score}</p>
    </div>
  );
};

export default QuizGame;