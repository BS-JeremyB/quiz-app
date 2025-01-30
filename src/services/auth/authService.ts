// services/Auth.service.ts

const BASE_URL = 'http://i3-quiz.local/'

/**
 * Authentifie l’utilisateur auprès de WordPress
 * via wp-login.php (POST).
 */
export async function loginUser(username: string, password: string): Promise<boolean> {
  const formData = new URLSearchParams();
  formData.append('log', username);
  formData.append('pwd', password);

  try {
    const response = await fetch(BASE_URL + 'wp-login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
      credentials: 'include',
    });

    // Si WordPress redirige, ça peut être un signe de succès ou d’échec.
    // Mais en pratique, response.ok = true si le statut est 200-299.
    // On peut donc avoir besoin de checker la réponse HTML
    // si on veut être certain.
    return response.ok;
  } catch (err) {
    console.error('Erreur lors de la connexion :', err);
    throw err;
  }
}

// services/Auth.service.ts

/**
 * Inscrit un utilisateur auprès de WordPress (action=register).
 * Attention : WordPress par défaut n’accepte pas le mot de passe
 * via ce formulaire standard, à moins d’un plugin ou d’une config spéciale.
 */
export async function registerUser(username: string, email: string): Promise<boolean> {
    const formData = new URLSearchParams();
    formData.append('user_login', username);
    formData.append('user_email', email);
    formData.append('wp-submit', 'Register'); // Nom du bouton
    formData.append('action', 'register');
    formData.append('redirect_to', '/');
  
    try {
      const response = await fetch(BASE_URL + 'wp-login.php?action=register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
        credentials: 'include',
      });
  
      // WordPress renverra une page de confirmation ou un message d’erreur
      // Il n'y a pas de code 4xx si c’est un échec partiel,
      // donc on peut devoir vérifier le contenu HTML.
      // Pour un premier test, on peut se contenter de response.ok:
      return response.ok;
    } catch (error) {
      console.error('Erreur lors de l’inscription :', error);
      throw error;
    }
  }
  
// src/services/authService.ts

/**
 * Retourne l'utilisateur courant (ID + nom), ou null s'il n'est pas logué.
 */
export async function fetchCurrentUser(): Promise<{id: number; name: string} | null> {
    try {
      const { wpApiSettings } = window as any;
      if (!wpApiSettings?.root) {
        console.error('wpApiSettings.root est introuvable.');
        return null;
      }
  
      const resp = await fetch(`${wpApiSettings.root}wp/v2/users/me`, {
        credentials: 'include',
        headers: {
          'X-WP-Nonce': wpApiSettings.nonce
        }
      });
  
      if (!resp.ok) {
        console.error('GET /users/me =>', resp.status, await resp.text());
        return null;
      }
  
      const data = await resp.json();
      // data = { id: 1, name: "admin", ... }
      return { id: data.id, name: data.name };
    } catch (err) {
      console.error('Erreur fetchCurrentUser:', err);
      return null;
    }
  }
  
  