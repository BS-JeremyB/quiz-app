import { TQuestion } from './Question';
import { TScoreboard } from './Scoreboard';

/**
 * Représente la structure "vignette" pour l'image du Quizz
 */
export type TVignette = {
  ID: string;
  guid?: string;
  post_title?: string;
  post_mime_type?: string;
  [key: string]: any;
};

/**
 * Représente un Quizz (Pod "Quizz") dans l'API WP/Pods
 */
export type TQuiz = {
  id: number;      // ID WP
  date: string;
  date_gmt: string;
  slug?: string;
  status?: string;
  link?: string;

  title: {
    rendered: string;
  };

  // Champs Pods / custom
  vignette?: TVignette;         // Image
  description?: string;         // Texte
  difficulte?: string[];        // Single select => souvent ["Facile"]

  // Relations
  questions?: TQuestion[];      
  scoreboard?: TScoreboard[];   

  // Champs WP natifs divers
  class_list?: string[];
  _links?: {
    self?: Array<{ href: string }>;
    [key: string]: any;
  };

  [key: string]: any;
};
