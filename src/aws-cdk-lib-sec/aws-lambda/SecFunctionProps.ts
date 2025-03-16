import { IProfilingGroup } from "aws-cdk-lib/aws-codeguruprofiler";
import { IVpc, SubnetSelection, ISecurityGroup } from "aws-cdk-lib/aws-ec2";
import { PolicyStatement, IRole } from "aws-cdk-lib/aws-iam";
import { IKey } from "aws-cdk-lib/aws-kms";
import * as Lambda from "aws-cdk-lib/aws-lambda";
import { RetentionDays, ILogGroup } from "aws-cdk-lib/aws-logs";
import { ITopic } from "aws-cdk-lib/aws-sns";
import { IQueue } from "aws-cdk-lib/aws-sqs";
import { Duration, Size } from "aws-cdk-lib/core";
import { checkRuntime } from "./checkRuntime";
import { SecMarker } from "../SecMarker";
import {
  checkCode,
  checkHandler,
  checkDescription,
} from "./StandardizedNaming";
import logger from "../../tools/logger";
import { deactivateOldAttribute } from "./deactivateOldAttribute";
import { checkEnvironmentEncryption, checkEnvVariables } from "./checkEnvironmentVariables";
import { checkRecursiveLoop } from "./checkRecursiveLoop";
import { createCodeSigningConfig } from "./codeSigningConfig";
import { Construct } from "constructs";
import { activeSnapStart } from "./snapStart";
import { checkSafeAttributForSecMarker } from "../aws-stack/validator";
import { checkArchitecture, checkEphemeralStorageSize, deactivateProperties } from "./deactivateProperties";
import { checkRuntimeManagementMode } from "./checkRuntimeManagementMode";
import { checkApplicationLogLevel, checkLoggingFormat, checkLogGroup, checkLogRetention, checkLogRetentionOptions, checkLogRetentionRole, checkSystemLogLevel, checkTracing } from "./logging";
import { checkAllowAllIpv6Outbound, checkAllowAllOutbound, checkAllowPublicSubnet, checkIpv6AllowedForDualStack, checkVPC, checkVPCSubnets } from "./checkVPC";

export class SecFunctionProps {
  static [SecMarker] = true;
  static defaultCode: Lambda.AssetCode = Lambda.Code.fromAsset("src");
  static defaultHandler: "index.handler";
  runtime: Lambda.Runtime;
  code?: Lambda.Code;
  handler?: string;
  description: string;
  timeout?: Duration | undefined;
  environment?: { [key: string]: string } | undefined;
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

  constructor(props: SecFunctionProps, scope: Construct, id: string) {
    logger.debug("InputProps SecFunctionProps " + JSON.stringify(props));
    this.runtime = checkRuntime(props.runtime);
    this.code = checkCode(props.code || SecFunctionProps.defaultCode);
    this.handler = checkHandler(
      props.handler || SecFunctionProps.defaultHandler
    );
    this.description = checkDescription(props.description);
    this.timeout = props.timeout;
    this.environment = checkEnvVariables(props.environment);
    this.functionName = props.functionName;
    this.memorySize = props.memorySize;
    this.ephemeralStorageSize = checkEphemeralStorageSize(props.ephemeralStorageSize);
    this.initialPolicy = props.initialPolicy;
    this.role = props.role;
    this.vpc = checkVPC(scope, props.vpc);
    this.ipv6AllowedForDualStack = checkIpv6AllowedForDualStack(props.ipv6AllowedForDualStack);
    this.vpcSubnets = checkVPCSubnets(props.vpcSubnets);
    this.securityGroups = props.securityGroups;
    this.allowAllOutbound = checkAllowAllOutbound(props.allowAllOutbound);
    this.allowAllIpv6Outbound = checkAllowAllIpv6Outbound(props.allowAllIpv6Outbound);
    this.deadLetterQueueEnabled = deactivateProperties("deadLetterQueueEnabled", props.deadLetterQueueEnabled);
    this.deadLetterQueue = deactivateProperties("deadLetterQueue", props.deadLetterQueue);
    this.deadLetterTopic = deactivateProperties("deadLetterTopic", props.deadLetterTopic)
    this.tracing = checkTracing(props.tracing);
    this.snapStart = activeSnapStart(props.snapStart, props.runtime);
    this.profiling = props.profiling;
    this.profilingGroup = props.profilingGroup;
    this.insightsVersion = props.insightsVersion;
    this.adotInstrumentation = props.adotInstrumentation;
    this.paramsAndSecrets = props.paramsAndSecrets;
    this.layers = props.layers;
    this.reservedConcurrentExecutions = props.reservedConcurrentExecutions;
    this.events = props.events;
    this.logRetention = checkLogRetention(props.logRetention);
    this.logRetentionRole = checkLogRetentionRole(props.logRetentionRole);
    this.logRetentionRetryOptions = checkLogRetentionOptions(props.logRetentionRetryOptions);
    this.currentVersionOptions = props.currentVersionOptions;
    this.filesystem = props.filesystem;
    this.allowPublicSubnet = checkAllowPublicSubnet(props.allowPublicSubnet);
    this.environmentEncryption = checkEnvironmentEncryption(scope,
      id,
      props.environmentEncryption);
    this.codeSigningConfig = createCodeSigningConfig(
      scope,
      id,
      props.codeSigningConfig
    );
    this.architecture = checkArchitecture(props.architecture);
    this.runtimeManagementMode = checkRuntimeManagementMode(props.runtimeManagementMode);
    this.logGroup = checkLogGroup(id, props.logGroup);
    this.logFormat = deactivateOldAttribute("logFormat", props.logFormat);
    this.loggingFormat = checkLoggingFormat(props.loggingFormat);
    this.recursiveLoop = checkRecursiveLoop(props.recursiveLoop);
    this.applicationLogLevel = deactivateOldAttribute(
      "applicationLogLevel",
      props.applicationLogLevel
    );
    this.applicationLogLevelV2 = checkApplicationLogLevel(scope, props.applicationLogLevelV2);
    this.systemLogLevel = deactivateOldAttribute(
      "systemLogLevel",
      props.systemLogLevel
    );
    this.systemLogLevelV2 = checkSystemLogLevel(scope, props.systemLogLevelV2);
    this.onFailure = checkSafeAttributForSecMarker(props.onFailure);
    this.onSuccess = checkSafeAttributForSecMarker(props.onSuccess);
    this.maxEventAge = props.maxEventAge;
    this.retryAttempts = props.retryAttempts;
    logger.debug("OutputProps SecFunctionProps " + JSON.stringify(props));
  }
}
