import * as Lambda from 'aws-cdk-lib/aws-lambda';
/**
 * Validates and enables SnapStart for supported Lambda runtimes.
 *
 * - If `snapStart` is not provided and the runtime supports SnapStart,
 *   it defaults to `ON_PUBLISHED_VERSIONS`.
 * - If `snapStart` is explicitly set to anything else, a `ConfigurationError` is thrown.
 *
 * SnapStart reduces cold start latency for Java-based Lambdas by initializing
 * the runtime state ahead of time.
 *
 * @param snapStart - Optional SnapStart configuration.
 * @param runtime - Optional Lambda runtime, used to determine if SnapStart is supported.
 * @returns The validated or default SnapStart configuration, or `undefined` if unsupported.
 */
export declare function activeSnapStart(snapStart?: Lambda.SnapStartConf, runtime?: Lambda.Runtime): Lambda.SnapStartConf | undefined;
