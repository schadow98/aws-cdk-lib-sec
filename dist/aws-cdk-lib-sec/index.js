/**
 * Central export module that re-exports core constructs and secure wrappers.
 *
 * - Re-exports the CDK library (`aws-cdk-lib`) for convenience.
 * - Provides secure versions of common AWS services (e.g., Lambda, Signer, Stack).
 * - Exposes the shared `logger` for consistent structured logging.
 */
export * as logger from './SecLogger';
export * from 'aws-cdk-lib';
export { Stack, StackProps } from './aws-stack';
export * as aws_lambda from './aws-lambda';
export * as aws_signer from './aws-signer';
//# sourceMappingURL=index.js.map