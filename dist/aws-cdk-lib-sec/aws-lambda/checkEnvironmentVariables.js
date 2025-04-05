"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEnvVariables = checkEnvVariables;
exports.checkEnvironmentEncryption = checkEnvironmentEncryption;
const ConfigurationError_1 = require("../../tools/ConfigurationError");
const logger_1 = __importDefault(require("../../tools/logger"));
const SecKey_1 = require("../aws-kms/SecKey");
const validator_1 = require("../aws-stack/validator");
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
function checkEnvVariables(env) {
    logger_1.default.info("checking environment variables");
    if (!env) {
        logger_1.default.info("No environment variables found for analysis.");
        return undefined;
    }
    Object.entries(env).forEach(([key, value]) => {
        logger_1.default.debug(`Checking variable: ${key}`);
        // Check for forbidden variables
        if (forbiddenVariables.includes(key)) {
            new ConfigurationError_1.ConfigurationError("environment", `Forbidden environment variable detected: '${key}'`);
        }
        // Check for hardcoded secrets
        const secretMatch = secretPatterns.some((pattern) => pattern.test(value));
        if (secretMatch) {
            new ConfigurationError_1.ConfigurationError("environment", `Potential secret detected in environment variable '${key}'`);
        }
        // Check for potential injection vulnerabilities
        if (value.includes(';') || value.includes('&&') || value.includes('|')) {
            new ConfigurationError_1.ConfigurationError("environment", `Potential injection detected in environment variable '${key}'. Value: '${value}'`);
        }
    });
    logger_1.default.debug("Environment variables analysis completed successfully.");
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
function checkEnvironmentEncryption(scope, // Stack
lambdaId, // LambdaFunction 
ikey) {
    logger_1.default.debug("Starting checkEnvironmentEncryption analysis...");
    // Wenn kein Schlüssel bereitgestellt wurde, erstellen Sie einen neuen KMS-Schlüssel
    const environmentEncryptionKey = new SecKey_1.Key(scope, `${lambdaId}EnvironmentEncryptionKey`, {
        description: `Schlüssel zur Verschlüsselung der Lambda-Umgebungsvariablen ${lambdaId}`,
    });
    if (!ikey) {
        return environmentEncryptionKey;
    }
    if (!(0, validator_1.checkSafeAttributForSecMarker)(ikey)) {
        new ConfigurationError_1.ConfigurationError("environmentEncryption", `environmentEncryption is not Safe`);
    }
    return environmentEncryptionKey;
}
//# sourceMappingURL=checkEnvironmentVariables.js.map