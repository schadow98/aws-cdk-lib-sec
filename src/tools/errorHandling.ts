/* eslint-disable @typescript-eslint/no-unsafe-function-type */
class ErrorHandler {
    static errors: Error[] = [];
    private options: { throwError: boolean };

    // Konstruktor, um Standardoptionen zu setzen
    constructor(options = { throwError: false }) {
        this.options = options;
    }

    // Methode zum Einwickeln einer Funktion
    handleError(fn: Function) {
        return (...args: any[]) => {
            try {
                // Führe die ursprüngliche Funktion aus
                return fn(...args);
            } catch (error) {
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

// Beispielinstanz mit spezifischen Optionen
const errorHandlerInstance = new ErrorHandler({ throwError: true });

// Wrapper-Funktion basierend auf einer Instanz des ErrorHandlers
const handleError = errorHandlerInstance.handleError.bind(errorHandlerInstance);


export { ErrorHandler, handleError, errorHandlerInstance };
