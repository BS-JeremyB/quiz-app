// src/components/quiz/QuizOverview.tsx

import React from 'react';
import { TQuiz } from '../../types';

import './QuizOverview.css';

interface QuizOverviewProps {
  quiz: TQuiz;
  onPlay: () => void; // callback pour déclencher le mode "play"
}

const QuizOverview: React.FC<QuizOverviewProps> = ({ quiz, onPlay }) => {
  return (
    <div className="quiz-overview-container">
      <div className="quiz-overview-content">
        <h2 className="quiz-title">{quiz.title.rendered}</h2>
        <p className="quiz-difficulty">Difficulté : {quiz.difficulte?.[0]}</p>
        <p className="quiz-description">{quiz.description}</p>

        <button onClick={onPlay} className="btn-play">
          Jouer
        </button>

        <hr className="quiz-divider" />

        {/* Scoreboard */}
        {quiz.scoreboard && quiz.scoreboard.length > 0 ? (
          <div className="scoreboard-container">
            <div className="scoreboard-header">
              <span>Pseudo</span>
              <span>Score</span>
              <span>Temps (s)</span>
            </div>
            {quiz.scoreboard.map((s) => (
              <div className="scoreboard-row" key={s.ID}>
                <span>{s.utilisateur}</span>
                <span>{s.score}%</span>
                <span>{(s.temps / 1000).toFixed(2)}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-score-yet">Aucun score pour l’instant.</p>
        )}
      </div>

      <div className="quiz-overview-image">
        {quiz.vignette?.guid && (
          <img
            src={quiz.vignette.guid}
            alt={quiz.vignette.post_title || 'Quiz Image'}
            className="overview-image"
          />
        )}
      </div>
    </div>
  );
};

export default QuizOverview;
