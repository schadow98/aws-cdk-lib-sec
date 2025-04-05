import { ConfigurationError } from "../../tools/ConfigurationError";
import logger from "../../tools/logger";
import { Key } from "../aws-kms/SecKey";
import { checkSafeAttributForSecMarker } from "../aws-stack/validator";
// List of regular expressions to detect potential secrets
const secretPatterns = [
    /password/i, // Match variables containing "password"
    /ghp_[a-zA-Z0-9]{36}/, // GitHub tokens
    /(AKIA|ASIA|AROA)[A-Z0-9]{16}/, // AWS access keys
    /sk_live_[a-zA-Z0-9]{24}/, // Stripe keys
    /eyJ[A-Za-z0-9._=-]+/, // JSON Web Tokens (JWT)
    /[a-zA-Z0-9._-]*secret[a-zA-Z0-9._-]*/i, // Generic secret keyword match
];
// List of forbidden environment variables
const forbiddenVariables = [
    'PATH',
    'NODE_PATH',
    'NODEJS_PATH',
    'LD_LIBRARY_PATH',
];
/**
 * Validates and returns a set of environment variables.
 *
 * If no environment variables are provided, returns `undefined`.
 * Ensures that the returned object has valid string key-value pairs.
 *
 * @param env - Optional object containing environment variables as key-value pairs.
 * @returns The validated environment variables object or `undefined` if not provided.
 */
export function checkEnvVariables(env) {
    logger.info("checking environment variables");
    if (!env) {
        logger.info("No environment variables found for analysis.");
        return undefined;
    }
    Object.entries(env).forEach(([key, value]) => {
        logger.debug(`Checking variable: ${key}`);
        // Check for forbidden variables
        if (forbiddenVariables.includes(key)) {
            new ConfigurationError("environment", `Forbidden environment variable detected: '${key}'`);
        }
        // Check for hardcoded secrets
        const secretMatch = secretPatterns.some((pattern) => pattern.test(value));
        if (secretMatch) {
            new ConfigurationError("environment", `Potential secret detected in environment variable '${key}'`);
        }
        // Check for potential injection vulnerabilities
        if (value.includes(';') || value.includes('&&') || value.includes('|')) {
            new ConfigurationError("environment", `Potential injection detected in environment variable '${key}'. Value: '${value}'`);
        }
    });
    logger.debug("Environment variables analysis completed successfully.");
    return env; // Return the analyzed environment variables if needed
}
/**
 * Validates or creates a KMS key for encrypting environment variables of a Lambda function.
 *
 * If no custom key is provided, a new KMS key will be created and associated with the Lambda.
 *
 * @param scope - The CDK construct scope, typically the stack in which the Lambda is defined.
 * @param lambdaId - The identifier of the Lambda function that requires encryption.
 * @param ikey - Optional existing KMS key to use for environment encryption.
 * @returns A KMS key (`IKey`) used to encrypt the Lambda environment variables.
 */
export function checkEnvironmentEncryption(scope, // Stack
lambdaId, // LambdaFunction 
ikey) {
    logger.debug("Starting checkEnvironmentEncryption analysis...");
    // Wenn kein Schlüssel bereitgestellt wurde, erstellen Sie einen neuen KMS-Schlüssel
    const environmentEncryptionKey = new Key(scope, `${lambdaId}EnvironmentEncryptionKey`, {
        description: `Schlüssel zur Verschlüsselung der Lambda-Umgebungsvariablen ${lambdaId}`,
    });
    if (!ikey) {
        return environmentEncryptionKey;
    }
    if (!checkSafeAttributForSecMarker(ikey)) {
        new ConfigurationError("environmentEncryption", `environmentEncryption is not Safe`);
    }
    return environmentEncryptionKey;
}
//# sourceMappingURL=checkEnvironmentVariables.js.map