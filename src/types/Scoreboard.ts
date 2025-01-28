/**
 * Représente un enregistrement dans le Pod "Scoreboard"
 */
export type TScoreboard = {
    utilisateur: number;   // ID de l'user WP
    quiz: number;          // ID du quizz
    score: number;         // ou number, selon comment c'est stocké
    temps: number;         // stocké en string (secondes, ms, etc.)
  
    // Champs WordPress standard
    ID: number;
    post_title?: string;
    post_author?: string;
    post_date?: string;
    post_status?: string;
    
    // Autres potentiels
    [key: string]: any;
  };
  