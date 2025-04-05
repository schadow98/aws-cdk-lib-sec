import * as Lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { RetentionDays, ILogGroup } from "aws-cdk-lib/aws-logs";
import { IRole } from 'aws-cdk-lib/aws-iam';
/**
 * Determines and validates the appropriate application log level based on the deployment stage.
 *
 * - In **production**, the log level must be `INFO`. If not provided, it defaults to `INFO`.
 * - In **non-production**, the log level must be `DEBUG`. If not provided, it defaults to `DEBUG`.
 *
 * Throws a `ConfigurationError` if the provided log level does not match the expected value
 * for the current stage.
 *
 * @param stackInput - The CDK construct scope from which the deployment stage is derived.
 * @param applicationLogLevel - Optional application log level to validate.
 * @returns The valid and stage-appropriate `ApplicationLogLevel`.
 */
export declare function checkApplicationLogLevel(stackInput: Construct, applicationLogLevel?: Lambda.ApplicationLogLevel): Lambda.ApplicationLogLevel;
/**
 * Determines and validates the appropriate system log level based on the deployment stage.
 *
 * - In **production**, the log level must be `INFO`. If not provided, it defaults to `INFO`.
 * - In **non-production**, the log level must be `DEBUG`. If not provided, it defaults to `DEBUG`.
 *
 * Throws a `ConfigurationError` if the provided system log level does not match the expected value
 * for the current stage.
 *
 * @param stackInput - The CDK construct scope from which the deployment stage is derived.
 * @param systemLogLevel - Optional system log level to validate.
 * @returns The valid and stage-appropriate `SystemLogLevel`.
 */
export declare function checkSystemLogLevel(stackInput: Construct, systemLogLevel?: Lambda.SystemLogLevel): Lambda.SystemLogLevel;
/**
 * Validates and returns the logging format for a Lambda function.
 *
 * Only `JSON` is supported by the current logger implementation.
 * If no format is provided or if `JSON` is explicitly specified, it defaults to `JSON`.
 *
 * Throws a `ConfigurationError` if a different format is provided.
 *
 * @param loggingFormat - Optional logging format to validate.
 * @returns The validated logging format (`JSON`).
 */
export declare function checkLoggingFormat(loggingFormat?: Lambda.LoggingFormat): Lambda.LoggingFormat;
/**
 * Validates the provided CloudWatch Log Group for a Lambda function.
 *
 * Ensures that the log group name matches the expected pattern: `/aws/lambda/<lambdaId>`.
 * If no log group is provided, returns `undefined` and logs the fallback behavior.
 *
 * Throws a `ConfigurationError` if the log group name does not match the expected format.
 *
 * @param lambdaId - The identifier of the Lambda function used to construct the expected log group name.
 * @param logGroup - Optional existing CloudWatch Log Group to validate.
 * @returns The validated `ILogGroup` or `undefined` if none was provided.
 */
export declare function checkLogGroup(lambdaId: string, logGroup?: ILogGroup): ILogGroup | undefined;
/**
 * Validates and returns the tracing configuration for a Lambda function.
 *
 * Only `PASS_THROUGH` is supported in the current implementation.
 * If no tracing mode is specified or `PASS_THROUGH` is explicitly provided,
 * it is returned as the default.
 *
 * Throws a `ConfigurationError` if any other tracing mode is used.
 *
 * @param tracing - Optional tracing configuration for the Lambda function.
 * @returns The validated tracing mode (`PASS_THROUGH`).
 */
export declare function checkTracing(tracing?: Lambda.Tracing): Lambda.Tracing;
/**
 * Validates and returns the log retention period for a CloudWatch Log Group.
 *
 * If no retention is provided, it defaults to `THREE_MONTHS` (90 days).
 *
 * Throws a `ConfigurationError` if the specified retention exceeds 90 days.
 *
 * @param logRetention - Optional log retention period (`RetentionDays`) to validate.
 * @returns The validated log retention period.
 */
export declare function checkLogRetention(logRetention?: RetentionDays): RetentionDays;
/**
 * Validates and returns the IAM role used for setting log retention on a CloudWatch Log Group.
 *
 * If no role is provided, secure default behavior is assumed (e.g., automatic role creation or no custom role).
 *
 * @param logRetentionRole - Optional IAM role to be used for log retention configuration.
 * @returns The validated `IRole` or `undefined` if no role is provided.
 */
export declare function checkLogRetentionRole(logRetentionRole?: any): IRole | undefined;
/**
 * Validates and returns the log retention retry options for a Lambda function.
 *
 * If no options are provided, logs that secure default behavior will be used.
 * These options control retry behavior when setting log retention on a log group.
 *
 * @param logRetentionOptions - Optional retry options for log retention configuration.
 * @returns The provided `LogRetentionRetryOptions` or `undefined` if none are specified.
 */
export declare function checkLogRetentionOptions(logRetentionOptions?: Lambda.LogRetentionRetryOptions): Lambda.LogRetentionRetryOptions | undefined;
