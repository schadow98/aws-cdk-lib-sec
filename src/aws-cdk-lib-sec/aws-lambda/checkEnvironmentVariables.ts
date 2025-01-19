import { IKey } from "aws-cdk-lib/aws-kms";
import { ConfigurationError } from "../../tools/ConfigurationError";
import logger from "../../tools/logger";

import { Construct } from "constructs";
import * as cdk from 'aws-cdk-lib';
import { Key } from "../aws-kms/SecKey";
import { checkSafeAttributForSecMarker } from "../aws-stack/validator";

// List of regular expressions to detect potential secrets
const secretPatterns: RegExp[] = [
    /password/i,                       // Match variables containing "password"
    /ghp_[a-zA-Z0-9]{36}/,             // GitHub tokens
    /(AKIA|ASIA|AROA)[A-Z0-9]{16}/,    // AWS access keys
    /sk_live_[a-zA-Z0-9]{24}/,         // Stripe keys
    /eyJ[A-Za-z0-9._=-]+/,             // JSON Web Tokens (JWT)
    /[a-zA-Z0-9._-]*secret[a-zA-Z0-9._-]*/i, // Generic secret keyword match
];

// List of forbidden environment variables
const forbiddenVariables: string[] = [
    'PATH',
    'NODE_PATH',
    'NODEJS_PATH',
    'LD_LIBRARY_PATH',
];

// Function to analyze environment variables
export function checkEnvVariables(env: { [key: string]: string } | undefined): { [key: string]: string } | undefined {
    logger.debug("Starting environment variables analysis...");

    if (!env) {
        logger.warn("No environment variables found for analysis.");
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



export function checkEnvironmentEncryption(
    scope: Construct, // Stack
    lambdaId: string, // LambdaFunction 
    ikey?: IKey
): IKey {
    logger.debug("Starting checkEnvironmentEncryption analysis...");
    // Wenn kein Schlüssel bereitgestellt wurde, erstellen Sie einen neuen KMS-Schlüssel
    const environmentEncryptionKey = new Key(scope, `${lambdaId}EnvironmentEncryptionKey`, {
        description: `Schlüssel zur Verschlüsselung der Lambda-Umgebungsvariablen ${lambdaId}`,
    });

    if (!ikey) {
        return environmentEncryptionKey
    }

    if (!checkSafeAttributForSecMarker(ikey)) {
        new ConfigurationError("environmentEncryption", `environmentEncryption is not Safe`);
    }

    return environmentEncryptionKey;
}