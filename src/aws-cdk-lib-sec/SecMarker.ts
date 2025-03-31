/**
 * Unique symbol used to mark classes as security-compliant.
 * 
 * Classes that include `SecMarker` set to `true` are treated as validated and trusted
 * within security enforcement logic (e.g., in `checkSecClass` or `hasSecMarker`).
 * 
 * This symbol acts as a lightweight and non-invasive security metadata flag.
 */
export const SecMarker = Symbol('SecMarker');