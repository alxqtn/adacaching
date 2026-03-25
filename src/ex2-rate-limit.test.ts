// ============================================================================
// TEST EXERCICE 2 : RATE LIMITING AVEC REDIS
// ============================================================================

import { createRateLimiter } from "./ex2-rate-limit.js";

const MAX_REQUESTS = 5;
const WINDOW_SEC = 10;
const TEST_KEY = "user:alice";

// Fonction d'aide pour attendre
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log(`\n=== Test Rate Limiting ===`);
  console.log(`Configuration : ${MAX_REQUESTS} requêtes max par ${WINDOW_SEC}s`);
  console.log(`Clé de test : "${TEST_KEY}"\n`);

  // Crée le rate limiter
  const withRateLimit = createRateLimiter(MAX_REQUESTS, WINDOW_SEC);

  // PHASE 1 : Test de la limite
  console.log("--- PHASE 1 : Test de la limite ---");
  for (let i = 1; i <= 8; i++) {
    withRateLimit(TEST_KEY, async () => {
      console.log(`✅ Requête ${i} autorisée`);
      return Promise.resolve();
    }).catch((err) => {
      console.log(`❌ Requête ${i} rejetée : ${err.message}`);
    });

    await sleep(100); // Petit délai entre les requêtes
  }

  // PHASE 2 : Attendre la réinitialisation du compteur
  console.log(`\n--- PHASE 2 : Attente de la réinitialisation ---`);
  console.log(`Attente de ${WINDOW_SEC} secondes pour que le compteur Redis expire...`);
  await sleep((WINDOW_SEC * 1000) + 500);

  console.log(`\n--- PHASE 3 : Nouvelles requêtes après expiration ---`);
  for (let i = 1; i <= 3; i++) {
    withRateLimit(TEST_KEY, async () => {
      console.log(`✅ Requête ${i} autorisée`);
      return Promise.resolve();
    }).catch((err) => {
      console.log(`❌ Requête ${i} rejetée : ${err.message}`);
    });

    await sleep(100);
  }

  console.log("\n=== Test terminé ===");
}

// Lance le test si ce fichier est exécuté directement
main().catch(console.error);
