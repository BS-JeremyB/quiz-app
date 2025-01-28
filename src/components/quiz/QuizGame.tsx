// src/components/quiz/QuizGame.tsx

import React, { useState } from 'react';
import * as fuzzball from 'fuzzball';
import { TQuestion } from '../../types';

import './QuizGame.css';

interface QuizGameProps {
  questions: TQuestion[];
  onGameOver: (finalScore: number) => void;
}

const QuizGame: React.FC<QuizGameProps> = ({ questions, onGameOver }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState<{
    bestMatch: string;
    score: number;
    isMatch: boolean;
  } | null>(null);
  const [score, setScore] = useState(0);

  if (!questions || questions.length === 0) {
    return <p className="no-questions">Aucune question.</p>;
  }

  const question = questions[currentIndex];

  const handleMatch = () => {
    if (!question) return;

    const predefinedResponses = {
      fr: question.reponse_fr || '',
      en: question.reponse_en || '',
      alternative: question.reponse_alternative || '',
    };

    // Calcule un score de similarité pour chaque réponse possible
    const scores = Object.values(predefinedResponses).map((response) => ({
      response,
      score: fuzzball.ratio(userInput, response),
    }));

    // Conserve la meilleure correspondance
    const bestMatch = scores.reduce((best, current) =>
      current.score > best.score ? current : best
    , { response: '', score: 0 });

    // Seuil de validation
    const isMatch = bestMatch.score >= 80;

    setResult({
      bestMatch: bestMatch.response,
      score: bestMatch.score,
      isMatch,
    });

    if (isMatch) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setResult(null);
    setUserInput('');

    // Passe à la question suivante ou termine le quiz
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onGameOver(score);
    }
  };

  return (
    <div className="quiz-game-container">
      <div className="question-container">
        <p className="question-text">{question.question}</p>
        {question.contenu && (
          <div className="question-image-wrapper">
            <img
              src={question.contenu}
              alt="Aperçu question"
              className="question-image"
            />
          </div>
        )}
      </div>

      {result && (
        <div className="result-message">
          {result.isMatch ? (
            <p className="correct-answer">
              Bonne réponse, c’était bien : {result.bestMatch}
            </p>
          ) : (
            <p className="wrong-answer">
              Mauvaise réponse, c’était : {result.bestMatch}
            </p>
          )}
        </div>
      )}

      {!result && (
        <div className="answer-input-container">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Entrez votre réponse"
            className="answer-input"
          />
          <button onClick={handleMatch} className="validate-button">
            Valider
          </button>
        </div>
      )}

      {result && (
        <button onClick={handleNextQuestion} className="next-button">
          {currentIndex < questions.length - 1
            ? 'Question suivante'
            : 'Terminer'}
        </button>
      )}
    </div>
  );
};

export default QuizGame;
