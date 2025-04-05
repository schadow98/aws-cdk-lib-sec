"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecMarker = void 0;
/**
 * Unique symbol used to mark classes as security-compliant.
 *
 * Classes that include `SecMarker` set to `true` are treated as validated and trusted
 * within security enforcement logic (e.g., in `checkSecClass` or `hasSecMarker`).
 *
 * This symbol acts as a lightweight and non-invasive security metadata flag.
 */
exports.SecMarker = Symbol('SecMarker');
//# sourceMappingURL=SecMarker.js.map