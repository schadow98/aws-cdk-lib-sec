/**
 * Centralized error handling utility to wrap and manage function execution.
 *
 * - Catches and logs runtime errors from wrapped functions.
 * - Optionally throws errors based on configuration.
 * - Collects all errors in a static list (`ErrorHandler.errors`) for later inspection or reporting.
 */
declare class ErrorHandler {
    static errors: Error[];
    private options;
    constructor(options?: {
        throwError: boolean;
    });
    handleError(fn: Function): (...args: any[]) => any;
}
/**
 * Instance of `ErrorHandler` configured to throw errors by default.
 */
declare const errorHandlerInstance: ErrorHandler;
/**
 * Shorthand helper to wrap functions using the default `errorHandlerInstance`.
 */
declare const handleError: (fn: Function) => (...args: any[]) => any;
export { ErrorHandler, handleError, errorHandlerInstance };
