// ============================================================================
// TEST EXERCICE 1 : MÉMORISATION (MEMOIZATION)
// ============================================================================

import { memoize } from "./ex1-memoize.js";

const FIBONACCI_NUMBER = 45;

// Fonction de Fibonacci naïve (très lente pour n=45)
function fibonacci(n: number): number {
  return n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}

type AnyFunction = (...args: any[]) => any;
// Compteur d'appels pour visualiser la différence
let callCount = 0;

// Fonction qui compte ses appels
function countCalls<T extends AnyFunction>(fn: T): T {
  return ((...args: any[]) => {
    callCount++;
    return fn(...args);
  }) as T;
}


// Test sans mémorisation
console.log("=== Test SANS mémorisation ===");
callCount = 0;
type FibonacciFunction = (n: number) => number;
const fibWithoutMemo: FibonacciFunction = countCalls(
  (n: number): number => n <= 1 ? n : fibWithoutMemo(n - 1) + fibWithoutMemo(n - 2)
);

console.time(`fibonacci(${FIBONACCI_NUMBER}) sans memo`);
const result1 = fibWithoutMemo(FIBONACCI_NUMBER);
console.timeEnd(`fibonacci(${FIBONACCI_NUMBER}) sans memo`);
console.log(`Résultat : ${result1}`);
console.log(`Nombre d'appels : ${callCount}\n`);

// Test AVEC mémorisation (à vous de compléter la fonction memoize !)
console.log("=== Test AVEC mémorisation ===");
callCount = 0;

// // TODO : Décommentez une fois que vous avez implémenté memoize
// const fibWithMemo: FibonacciFunction = memoize(
//   countCalls(
//     (n: number): number => n <= 1 ? n : fibWithMemo(n - 1) + fibWithMemo(n - 2)
//   )
// );

// console.time(`fibonacci(${FIBONACCI_NUMBER}) avec memo`);
// const result2 = fibWithMemo(FIBONACCI_NUMBER);
// console.timeEnd(`fibonacci(${FIBONACCI_NUMBER}) avec memo`);
// console.log(`Résultat : ${result2}`);
// const callsAfterMemo = callCount; // Sauvegardez le nombre d'appels après le premier test
// console.log(`Nombre d'appels : ${callCount}`);

// // Deuxième appel - devrait être instantané !
// console.log("\nDeuxième appel avec les mêmes arguments...");
// console.time(`fibonacci(${FIBONACCI_NUMBER}) 2ème appel`);
// const result3 = fibWithMemo(FIBONACCI_NUMBER);
// console.timeEnd(`fibonacci(${FIBONACCI_NUMBER}) 2ème appel`);
// console.log(`Résultat : ${result3}`);
// console.log(`Nombre d'appels additionnels : ${callCount - callsAfterMemo}`); // Devrait être 0 !
