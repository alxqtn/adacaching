// ============================================================================
// EXERCICE 1 : MÉMORISATION (MEMOIZATION)
// ============================================================================

type AnyFunction = (...args: any[]) => any;

/**
 * Crée une version mémorisée d'une fonction pure
 *
 * @param fn - La fonction à mémoriser
 * @returns Une fonction qui met en cache les résultats
 */
function memoize<F extends AnyFunction>(fn: F): (...args: Parameters<F>) => ReturnType<F> {
  // TODO : Implémentez cette fonction
  //
  // Créez un objet (ou une Map()) pour stocker les résultats

  return (...args) => {
    // 1. Générez une clé unique à partir des arguments (JSON.stringify)
    // 2. Vérifiez si le résultat est déjà dans le cache (objet créé à l'étape précédente)
    // 3. Si oui, retournez la valeur du cache
    // 4. Sinon, appelez la fonction originale (fn) avec les arguments (args), stockez le résultat dans le cache avec la clé générée, et retournez-le

    return null as any; // Placeholder, remplacez par votre implémentation
  }
}





export { memoize };
