/**
 * Représente un objet "Question" retourné par l'API Pods/WordPress.
 */
export type TQuestion = {
    question: string;
    contenu?: string;
    reponse_fr?: string;
    reponse_en?: string;
    reponse_alternative?: string;
    quiz_associes?: number[];
  
    // Champs WordPress standard
    ID: number;
    post_title?: string;
    post_author?: string;
    post_date?: string;
    post_status?: string;
  
  
    // S'il y a des champs additionnels non listés
    [key: string]: any;
  };
  