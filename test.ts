// SecModule.ts

// 1. Definiere das Symbol für den Marker
export const SecMarker = Symbol('SecMarker');

// 2. Klasse SecStack, die den Marker besitzt
export class SecStack {
  static [SecMarker] = true;

  constructor() {
    console.log('SecStack instance created');
  }
}

// 3. Klasse SecLogger, die ebenfalls den Marker besitzt
export class SecLogger {
  static [SecMarker] = true;

  log(message: string) {
    console.log('Log:', message);
  }
}

// 4. Klasse ohne Marker zur Demonstration
export class UnmarkedClass {
  constructor() {
    console.log('UnmarkedClass instance created');
  }
}

// 5. Funktion zur Überprüfung, ob eine Instanz den Marker hat
export function hasSecMarker(instance: any): boolean {
  return Boolean(instance.constructor[SecMarker]);
}

// Testcode, um das Verhalten zu demonstrieren
const stack = new SecStack();
const logger = new SecLogger();
const unmarked = new UnmarkedClass();

console.log(hasSecMarker(stack));    // true, da SecStack den Marker hat
console.log(hasSecMarker(logger));   // true, da SecLogger den Marker hat
console.log(hasSecMarker(unmarked)); // false, da UnmarkedClass den Marker nicht hat
