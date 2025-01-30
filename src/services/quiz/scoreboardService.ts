// src/services/scoreboardService.ts

import { TScoreboard } from '../../types';
const BASE_URL = 'http://i3-quiz.local/wp-json/wp/v2';

/**
 * Crée un scoreboard via Pods REST API.
 * @param quizId       ID du Quiz
 * @param userId       ID de l'utilisateur connecté
 * @param scorePercent Score en pourcentage (ex: 80 pour 80%)
 * @param timeMs       Temps total en millisecondes
 * @returns L'objet scoreboard créé, tel que renvoyé par Pods
 */
export async function postScoreboard(
  quizId: number,
  userId: number,
  scorePercent: number,
  timeMs: number
): Promise<TScoreboard> {
  const { wpApiSettings } = window as any;

  if (!wpApiSettings || !wpApiSettings.root || !wpApiSettings.nonce) {
    throw new Error('wpApiSettings ou nonce introuvable. Vérifiez wp_localize_script.');
  }

  const now = new Date();
  const dateStr = now.toISOString().replace('T', ' ').split('.')[0]; 
  const postTitle = `QUIZ-${quizId}-USER-${userId}-DATE${dateStr.replace(/[^0-9]/g, '')}`;

  // Corps de la requête pour Pods
  const payload = {
    quiz: quizId,
    utilisateur: userId,
    score: scorePercent,
    temps: timeMs,
    title: postTitle,
    status: 'publish', // ou "draft", "pending"...
  };

  console.log(payload);

  const resp = await fetch(`${BASE_URL}/scoreboards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-WP-Nonce': wpApiSettings.nonce,
    },
    credentials: 'include', // pour envoyer le cookie de session (si user connecté)
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Erreur HTTP: ${resp.status} - ${errText}`);
  }

  const createdScoreboard: TScoreboard = await resp.json();
  return createdScoreboard;
}