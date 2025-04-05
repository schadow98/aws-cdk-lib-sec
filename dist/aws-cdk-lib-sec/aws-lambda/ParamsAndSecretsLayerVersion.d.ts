import * as Lambda from 'aws-cdk-lib/aws-lambda';
import { Duration } from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
/**
 * Abstract base class for managing AWS Lambda's Parameters and Secrets Extension layer versions.
 *
 * Provides utility methods for binding specific layer versions to Lambda functions
 * either by direct version ARN or by predefined version enum.
 *
 * Use `fromVersionArn` to reference a specific version by ARN,
 * or `fromVersion` to use an AWS-managed version from the CDK enum.
 */
export declare abstract class ParamsAndSecretsLayerVersion {
    private readonly options;
    static fromVersionArn(arn: string, options?: Lambda.ParamsAndSecretsOptions): ParamsAndSecretsLayerVersion;
    static fromVersion(version: Lambda.ParamsAndSecretsVersions, options?: Lambda.ParamsAndSecretsOptions): ParamsAndSecretsLayerVersion;
    private constructor();
    abstract _bind(scope: Construct, fn: Lambda.IFunction): any;
    private get environmentVariablesFromOptions();
    private getVersionArn;
}
/**
 * Configuration options for AWS Lambda's Parameters and Secrets Extension.
 *
 * These options allow fine-grained control over how parameters and secrets
 * are retrieved and cached when using the Lambda extension layer.
 */
export interface ParamsAndSecretsOptions {
    readonly cacheEnabled?: boolean;
    readonly cacheSize?: number;
    readonly httpPort?: number;
    readonly logLevel?: Lambda.ParamsAndSecretsLogLevel;
    readonly maxConnections?: number;
    readonly secretsManagerTimeout?: Duration;
    readonly secretsManagerTtl?: Duration;
    readonly parameterStoreTimeout?: Duration;
    readonly parameterStoreTtl?: Duration;
}
