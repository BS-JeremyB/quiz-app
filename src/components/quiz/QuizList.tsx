// src/components/quiz/QuizList.tsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllQuizzes } from '../../services/quizService';
import { TQuiz } from '../../types';

import quizLogo from '../../assets/quizz-logo.png'; // adapte le chemin si nécessaire
import './QuizList.css';

const QuizList: React.FC = () => {
  const [quizzes, setQuizzes] = useState<TQuiz[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllQuizzes();
        setQuizzes(data);
      } catch (err: any) {
        setError(err.message);
      }
    })();
  }, []);

  if (error) {
    return <p className="error-message">Erreur : {error}</p>;
  }

  return (
    <div className="page-container quiz-list-page">
      {/* Logo centré en haut */}
      <div className="quiz-list-header">
        <img src={quizLogo} alt="Quiz Logo" className="quiz-list-logo" />
      </div>

      <h1 className="quiz-list-title">Tous les Quiz</h1>

      <div className="quiz-cards-container">
        {quizzes.map((quiz) => (
          <div className="quiz-card" key={quiz.id}>
            {/* Vignette à gauche */}
            <div className="quiz-card-image-wrapper">
              {quiz.vignette?.guid && (
                <img
                  src={quiz.vignette.guid}
                  alt={quiz.vignette.post_title || 'Quiz Thumbnail'}
                  className="quiz-card-image"
                />
              )}
            </div>

            {/* Contenu texte + bouton */}
            <div className="quiz-card-content">
              <h3 className="quiz-card-title">{quiz.title.rendered}</h3>
              <p className="quiz-card-description">{quiz.description}</p>
              <p className="quiz-card-difficulty">
                Difficulté : {quiz.difficulte?.[0]}
              </p>

              <div className="discover-button-container">
                <Link to={`/quiz/${quiz.id}`} className="btn-discover">
                  Découvrir
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;
