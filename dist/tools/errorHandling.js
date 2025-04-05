"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerInstance = exports.handleError = exports.ErrorHandler = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/**
 * Centralized error handling utility to wrap and manage function execution.
 *
 * - Catches and logs runtime errors from wrapped functions.
 * - Optionally throws errors based on configuration.
 * - Collects all errors in a static list (`ErrorHandler.errors`) for later inspection or reporting.
 */
class ErrorHandler {
    static errors = [];
    options;
    // Konstruktor, um Standardoptionen zu setzen
    constructor(options = { throwError: false }) {
        this.options = options;
    }
    // Methode zum Einwickeln einer Funktion
    handleError(fn) {
        return (...args) => {
            try {
                // Führe die ursprüngliche Funktion aus
                return fn(...args);
            }
            catch (error) {
                // Behandle den Fehler
                console.error("An error occurred:", error);
                // Fehler in die Fehlerliste einfügen
                if (error instanceof Error) {
                    ErrorHandler.errors.push(error);
                }
                if (this.options.throwError) {
                    // Fehler erneut werfen, wenn `throwError` gesetzt ist
                    throw error;
                }
                // Gib null zurück, wenn der Fehler nicht geworfen wird
                return null;
            }
        };
    }
}
exports.ErrorHandler = ErrorHandler;
/**
 * Instance of `ErrorHandler` configured to throw errors by default.
 */
const errorHandlerInstance = new ErrorHandler({ throwError: true });
exports.errorHandlerInstance = errorHandlerInstance;
/**
 * Shorthand helper to wrap functions using the default `errorHandlerInstance`.
 */
const handleError = errorHandlerInstance.handleError.bind(errorHandlerInstance);
exports.handleError = handleError;
//# sourceMappingURL=errorHandling.js.map