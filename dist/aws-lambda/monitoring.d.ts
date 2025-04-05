import { IProfilingGroup } from 'aws-cdk-lib/aws-codeguruprofiler';
import { Construct } from 'constructs';
/**
 * Validates and enforces tracing configuration for the application.
 *
 * Ensures that tracing is enabled. If the input is explicitly `false`,
 * a `ConfigurationError` is thrown to enforce secure observability.
 *
 * If no value is provided, tracing defaults to `true`.
 *
 * @param tracing - Optional flag indicating whether tracing is enabled.
 * @returns `true` if tracing is enabled or set by default.
 */
export declare function checkTracing(tracing?: boolean): boolean;
/**
 * Validates and enforces profiling configuration for the application.
 *
 * Ensures that profiling is enabled to support secure monitoring and performance analysis.
 * If the input is explicitly `false`, a `ConfigurationError` is thrown.
 *
 * If no value is provided, profiling defaults to `true`.
 *
 * @param profiling - Optional flag indicating whether profiling is enabled.
 * @returns `true` if profiling is enabled or set by default.
 */
export declare function checkProfiling(profiling?: boolean): boolean;
/**
 * Validates the provided profiling group or creates a new secure one for AWS Lambda.
 *
 * - If a profiling group is provided, it must be compatible and use `AWS_LAMBDA` as its compute platform.
 *   Otherwise, a `ConfigurationError` is thrown.
 * - If no profiling group is provided, a new one is created with the appropriate settings.
 *
 * @param scope - The CDK construct scope in which the profiling group is created.
 * @param lambdaId - The identifier of the Lambda function associated with the profiling group.
 * @param profilingGroup - Optional profiling group to validate and use.
 * @returns A valid and secure `IProfilingGroup` instance.
 */
export declare function checkProfilingGroup(scope: Construct, lambdaId: string, profilingGroup?: IProfilingGroup): IProfilingGroup;
