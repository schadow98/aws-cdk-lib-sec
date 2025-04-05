import { IProfilingGroup } from "aws-cdk-lib/aws-codeguruprofiler";
import { IVpc, SubnetSelection, ISecurityGroup } from "aws-cdk-lib/aws-ec2";
import { PolicyStatement, IRole } from "aws-cdk-lib/aws-iam";
import { IKey } from "aws-cdk-lib/aws-kms";
import * as Lambda from "aws-cdk-lib/aws-lambda";
import { RetentionDays, ILogGroup } from "aws-cdk-lib/aws-logs";
import { ITopic } from "aws-cdk-lib/aws-sns";
import { IQueue } from "aws-cdk-lib/aws-sqs";
import { Duration, Size } from "aws-cdk-lib/core";
import { SecMarker } from "../SecMarker";
import { Construct } from "constructs";
/**
 * Defines configuration properties for a secure and standardized Lambda function.
 *
 * This class can be used to encapsulate all necessary parameters for creating
 * a Lambda function, including runtime settings, logging, tracing, security, and more.
 */
export declare class FunctionProps {
    static [SecMarker]: boolean;
    static defaultCode: Lambda.AssetCode;
    static defaultHandler: "index.handler";
    runtime: Lambda.Runtime;
    code?: Lambda.Code;
    handler?: string;
    description: string;
    timeout?: Duration | undefined;
    environment?: {
        [key: string]: string;
    } | undefined;
    functionName?: string | undefined;
    memorySize?: number | undefined;
    ephemeralStorageSize?: Size | undefined;
    initialPolicy?: PolicyStatement[] | undefined;
    role?: IRole | undefined;
    vpc?: IVpc | undefined;
    ipv6AllowedForDualStack?: boolean | undefined;
    vpcSubnets?: SubnetSelection | undefined;
    securityGroups?: ISecurityGroup[] | undefined;
    allowAllOutbound?: boolean | undefined;
    allowAllIpv6Outbound?: boolean | undefined;
    deadLetterQueueEnabled?: boolean | undefined;
    deadLetterQueue?: IQueue | undefined;
    deadLetterTopic?: ITopic | undefined;
    tracing?: Lambda.Tracing | undefined;
    snapStart?: Lambda.SnapStartConf | undefined;
    profiling?: boolean | undefined;
    profilingGroup?: IProfilingGroup | undefined;
    insightsVersion?: Lambda.LambdaInsightsVersion | undefined;
    adotInstrumentation?: Lambda.AdotInstrumentationConfig | undefined;
    paramsAndSecrets?: Lambda.ParamsAndSecretsLayerVersion | undefined;
    layers?: Lambda.ILayerVersion[] | undefined;
    reservedConcurrentExecutions?: number | undefined;
    events?: Lambda.IEventSource[] | undefined;
    logRetention?: RetentionDays | undefined;
    logRetentionRole?: IRole | undefined;
    logRetentionRetryOptions?: Lambda.LogRetentionRetryOptions | undefined;
    currentVersionOptions?: Lambda.VersionOptions | undefined;
    filesystem?: Lambda.FileSystem | undefined;
    allowPublicSubnet?: boolean | undefined;
    environmentEncryption?: IKey | undefined;
    codeSigningConfig?: Lambda.ICodeSigningConfig | undefined;
    architecture?: Lambda.Architecture | undefined;
    runtimeManagementMode?: Lambda.RuntimeManagementMode | undefined;
    logGroup?: ILogGroup | undefined;
    logFormat?: string | undefined;
    loggingFormat?: Lambda.LoggingFormat | undefined;
    recursiveLoop?: Lambda.RecursiveLoop | undefined;
    applicationLogLevel?: string | undefined;
    applicationLogLevelV2?: Lambda.ApplicationLogLevel | undefined;
    systemLogLevel?: string | undefined;
    systemLogLevelV2?: Lambda.SystemLogLevel | undefined;
    onFailure?: Lambda.IDestination | undefined;
    onSuccess?: Lambda.IDestination | undefined;
    maxEventAge?: Duration | undefined;
    retryAttempts?: number | undefined;
    constructor(props: FunctionProps, scope: Construct, id: string);
}
