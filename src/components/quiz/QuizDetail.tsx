// src/components/quiz/QuizDetail.tsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getQuizById } from '../../services/quiz/quizService';
import { TQuiz } from '../../types';


import QuizOverview from './QuizOverview';
import QuizGame from './QuizGame';

import './QuizDetail.css';

const QuizDetail: React.FC = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState<TQuiz | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'overview' | 'play' | 'end'>('overview');
  const [finalScore, setFinalScore] = useState<number | null>(null);

  // AJOUT : on stocke le temps de départ (en ms, via Date.now())
  const [startTime, setStartTime] = useState<number | null>(null);
  // AJOUT : on stocke le temps final (ou la durée totale)
  const [elapsedTime, setElapsedTime] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const quizId = parseInt(id, 10);
        const data = await getQuizById(quizId);
        setQuiz(data);
      } catch (err: any) {
        setError(err.message);
      }
    })();
  }, [id]);

  if (error) {
    return <p className="error-message">Erreur : {error}</p>;
  }
  if (!quiz) {
    return <p className="loading-message">Chargement...</p>;
  }

  /**
   * Au clic sur "Jouer", on passe en mode "play",
   * on réinitialise finalScore, et on démarre le chrono.
   */
  const handlePlay = () => {
    setMode('play');
    setFinalScore(null);
    setElapsedTime(null);

    // On enregistre le moment du départ (en ms)
    setStartTime(Date.now());
  };

  /**
   * Quand le jeu est terminé, on récupère le score
   * et on calcule le temps écoulé.
   */
  const handleGameOver = (score: number) => {
    setFinalScore(score);
    setMode('end');

    if (startTime) {
      const endTime = Date.now();
      const total = endTime - startTime; // en ms
      setElapsedTime(total);
    }
  };

  const totalQuestions = quiz.questions?.length || 0;
  const percentage =
    finalScore !== null && totalQuestions > 0
      ? Math.round((finalScore / totalQuestions) * 100)
      : 0;

  /**
   * On convertit la durée en secondes.
   * (1s = 1000ms). Par exemple, 4852 ms => ~4.85s
   */
  const elapsedSeconds = elapsedTime ? (elapsedTime / 1000).toFixed(2) : null;

  return (
    <div className="page-container quiz-detail-container">

      {/* Contenu principal */}
      <div className="quiz-detail-content">
        {mode === 'overview' && (
          <QuizOverview quiz={quiz} onPlay={handlePlay} />
        )}

        {mode === 'play' && quiz.questions && quiz.questions.length > 0 && (
          <QuizGame questions={quiz.questions} onGameOver={handleGameOver} />
        )}

        {mode === 'end' && (
          <div className="quiz-end-container">
            <h2>Partie terminée</h2>
            <p>
              Vous avez {finalScore} bonne(s) réponse(s) sur {totalQuestions}.
            </p>
            <p>Score final : {percentage}%</p>

            {/* AJOUT : affichage du temps total (en secondes) */}
            {elapsedSeconds && (
              <p>Temps total : {elapsedSeconds} secondes</p>
            )}

            <button
              onClick={() => setMode('overview')}
              className="btn btn-return-overview"
            >
              Revenir à l’aperçu
            </button>
          </div>
        )}
      </div>

      {/* Bouton de retour en bas, à droite */}
      <div className="back-button-container">
        <Link to="/" className="btn back-button">
          Retour à la liste
        </Link>
      </div>
    </div>
  );
};

export default QuizDetail;
