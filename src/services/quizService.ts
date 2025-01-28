import { TQuiz } from "../types";

const BASE_URL = 'http://i3-quiz.local/wp-json/wp/v2';

/**
 * Récupère tous les Quizz publiés
 */
export async function getAllQuizzes(): Promise<TQuiz[]> {
  const response = await fetch(`${BASE_URL}/quiz?status=publish`);
  if (!response.ok) {
    throw new Error(`Erreur HTTP! status: ${response.status}`);
  }
  const data = await response.json();
  // On cast la réponse en TQuiz[] pour rester typed
  return data as TQuiz[];
}

/**
 * Récupère un Quizz spécifique par son ID
 * (si besoin dans un composant "QuizDetail")
 */
export async function getQuizById(id: number): Promise<TQuiz> {
  const response = await fetch(`${BASE_URL}/quiz/${id}`);
  if (!response.ok) {
    throw new Error(`Erreur HTTP! status: ${response.status}`);
  }
  const data = await response.json();

  // Si le quiz a un scoreboard, on va chercher chaque scoreboard par son ID
  if (data.scoreboard && Array.isArray(data.scoreboard)) {
    const scoreboardPromises = data.scoreboard.map(async (sbItem: any) => {
      if (sbItem.id) {
        // Récupère l'objet complet du scoreboard pour avoir la propriété "utilisateur"
        const sbResponse = await fetch(`${BASE_URL}/scoreboards/${sbItem.id}`);
        if (!sbResponse.ok) {
          throw new Error(`Erreur scoreboard fetch! status: ${sbResponse.status}`);
        }
        const sbData = await sbResponse.json();

        // On fusionne l'item original avec le vrai nom d'utilisateur
        return {
          ...sbItem,
          utilisateur: sbData.utilisateur,
        };
      }
      // Si pas de id, on renvoie tel quel
      return sbItem;
    });

    // On attend que tous les scoreboard soient récupérés, puis on les réinjecte
    data.scoreboard = await Promise.all(scoreboardPromises);
  }

  // On cast la réponse pour rester typed
  return data as TQuiz;
}

/**
 * Ex. : Créer un Quizz côté WP via la REST API
 * (nécessite d'être authentifié, avoir un nonce, etc.)
 * => on verra ça plus tard.
 */
// export async function createQuiz(payload: Partial<TQuiz>): Promise<TQuiz> {
//   ...
// }
