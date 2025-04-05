/**
 * Exports for secure Lambda function configuration and deployment.
 * 
 * - Re-exports all core constructs from `aws-cdk-lib/aws-lambda`.
 * - Provides secure wrappers: `Function` and `FunctionProps`, which apply
 *   validated defaults, monitoring, tracing, and security best practices.
 */

export { Function  } from "./SecLambda";
export { FunctionProps } from "./SecFunctionProps"
export * from 'aws-cdk-lib/aws-lambda';