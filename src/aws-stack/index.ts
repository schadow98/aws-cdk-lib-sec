/**
 * Public API exports for the secure infrastructure framework.
 * 
 * - Re-exports the custom secure `Stack` and `StackProps` implementations.
 * - Re-exports all core CDK modules from `aws-cdk-lib` for unified access.
 */

export { Stack  } from "./SecStack";
export { StackProps  } from "./SecStackProps";

export * from 'aws-cdk-lib';