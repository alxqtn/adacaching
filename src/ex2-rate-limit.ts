// ============================================================================
// EXERCICE 2 : RATE LIMITING AVEC REDIS
// ============================================================================

// ============================================================================
// SECTION 1 — CLIENT REDIS (ÉTAPE 1)
// ============================================================================

// TODO : Initialisez votre client Redis
//
import Redis from "ioredis";
export const redis = new Redis();

// ============================================================================
// SECTION 2 — FONCTION IS_ALLOWED (ÉTAPE 2)
// ============================================================================

/**
 * Vérifie si une action est autorisée selon le rate limit
 *
 * @param key - Identifiant unique (ex: IP, user ID)
 * @param max - Nombre maximum de requêtes autorisées
 * @param windowSec - Fenêtre de temps en secondes
 * @returns true si autorisé, false si limit atteint
 */
export async function isAllowed(
  key: string,
  max: number,
  windowSec: number
): Promise<boolean> {
  // TODO : Implémentez cette fonction
  //
  // ALGORITHME :
  // 1. Incrémente un compteur Redis pour cette clé
  // 2. Si c'est la première incrémentation (INCR retourne 1), on doit définir l'expiration (EXPIRE)
  // 3. On vérifie si le compteur est inférieur ou égal à la limite (max) et on retourne true/false en conséquence

  throw new Error("TODO: implémentez la fonction isAllowed");
}

// ============================================================================
// SECTION 3 — CREATE RATE LIMITER (DÉJÀ IMPLÉMENTÉ)
// ============================================================================

/**
 * Crée un fonction de rate limiting réutilisable
 * C'est une fonction d'ordre supérieur, similaire à `memoize` de l'exercice 1
 *
 * @param max - Nombre maximum de requêtes autorisées
 * @param windowSec - Fenêtre de temps en secondes
 * @returns Une fonction withRateLimit qui enveloppe n'importe quelle action
 */
export function createRateLimiter(max: number, windowSec: number) {
  return async function withRateLimit<T>(
    key: string,
    action: () => Promise<T>
  ): Promise<T> {
    const allowed = await isAllowed(key, max, windowSec);

    if (!allowed) {
      throw new Error(
        `Rate limit exceeded for "${key}": ${max} requests per ${windowSec}s`
      );
    }

    return action();
  };
}
