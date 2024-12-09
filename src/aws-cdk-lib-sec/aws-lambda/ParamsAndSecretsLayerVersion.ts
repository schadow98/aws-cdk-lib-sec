import * as Lambda  from 'aws-cdk-lib/aws-lambda';
import { Duration } from 'aws-cdk-lib/core';
import { Construct } from 'constructs';

declare abstract class ParamsAndSecretsLayerVersion {
    private readonly options;

    static fromVersionArn(arn: string, options?: Lambda.ParamsAndSecretsOptions): ParamsAndSecretsLayerVersion;
    static fromVersion(version: Lambda.ParamsAndSecretsVersions, options?: Lambda.ParamsAndSecretsOptions): ParamsAndSecretsLayerVersion;
    private constructor();
    abstract _bind(scope: Construct, fn: Lambda.IFunction): any;
    private get environmentVariablesFromOptions();
    private getVersionArn;
}

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
