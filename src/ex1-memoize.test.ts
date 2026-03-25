// ============================================================================
// TEST EXERCICE 1 : MÉMORISATION (MEMOIZATION)
// ============================================================================

import { memoize } from "./ex1-memoize.js";

// Fonction de fibonacci récursive (très lente sans mémorisation)
function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Compteur d'appels pour visualiser la différence
let callCount = 0;

// Fonction qui compte ses appels
function countCalls<T extends AnyFunction>(fn: T): T {
  return ((...args: any[]) => {
    callCount++;
    return fn(...args);
  }) as T;
}

type AnyFunction = (...args: any[]) => any;

// Test sans mémorisation
console.log("=== Test SANS mémorisation ===");
callCount = 0;
const fibWithoutMemo = countCalls(fibonacci);

console.time("fibonacci(35) sans memo");
const result1 = fibWithoutMemo(35);
console.timeEnd("fibonacci(35) sans memo");
console.log(`Résultat : ${result1}`);
console.log(`Nombre d'appels : ${callCount}\n`);

// Test AVEC mémorisation (à vous de compléter la fonction memoize !)
console.log("=== Test AVEC mémorisation ===");
callCount = 0;

// TODO : Décommentez une fois que vous avez implémenté memoize
// const fibWithMemo = countCalls(memoize(fibonacci));
//
// console.time("fibonacci(35) avec memo");
// const result2 = fibWithMemo(35);
// console.timeEnd("fibonacci(35) avec memo");
// console.log(`Résultat : ${result2}`);
// console.log(`Nombre d'appels : ${callCount}`);
//
// // Deuxième appel - devrait être instantané !
// console.log("\nDeuxième appel avec les mêmes arguments...");
// console.time("fibonacci(35) 2ème appel");
// const result3 = fibWithMemo(35);
// console.timeEnd("fibonacci(35) 2ème appel");
// console.log(`Résultat : ${result3}`);
// console.log(`Nombre d'appels additionnels : ${callCount - 36}`); // Devrait être 0 !
