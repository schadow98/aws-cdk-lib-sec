import * as Lambda from 'aws-cdk-lib/aws-lambda';
/**
 * Validates the provided Lambda runtime.
 *
 * Ensures that the given runtime is supported and up to date and returns it unchanged.
 * Can be extended to enforce allowed runtimes or apply defaults.
 *
 * @param runtime - The Lambda runtime to validate.
 * @returns The validated Lambda runtime.
 */
export declare const checkRuntime: (runtime: Lambda.Runtime) => Lambda.Runtime;
