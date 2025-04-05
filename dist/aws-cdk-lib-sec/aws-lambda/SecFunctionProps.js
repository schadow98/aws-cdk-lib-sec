"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionProps = void 0;
const Lambda = __importStar(require("aws-cdk-lib/aws-lambda"));
const checkRuntime_1 = require("./checkRuntime");
const SecMarker_1 = require("../SecMarker");
const StandardizedNaming_1 = require("./StandardizedNaming");
const logger_1 = __importDefault(require("../../tools/logger"));
const deactivateOldAttribute_1 = require("./deactivateOldAttribute");
const checkEnvironmentVariables_1 = require("./checkEnvironmentVariables");
const checkRecursiveLoop_1 = require("./checkRecursiveLoop");
const codeSigningConfig_1 = require("./codeSigningConfig");
const snapStart_1 = require("./snapStart");
const validator_1 = require("../aws-stack/validator");
const deactivateProperties_1 = require("./deactivateProperties");
const checkRuntimeManagementMode_1 = require("./checkRuntimeManagementMode");
const logging_1 = require("./logging");
const checkVPC_1 = require("./checkVPC");
/**
 * Defines configuration properties for a secure and standardized Lambda function.
 *
 * This class can be used to encapsulate all necessary parameters for creating
 * a Lambda function, including runtime settings, logging, tracing, security, and more.
 */
class FunctionProps {
    static [SecMarker_1.SecMarker] = true;
    static defaultCode = Lambda.Code.fromAsset("src");
    static defaultHandler;
    runtime;
    code;
    handler;
    description;
    timeout;
    environment;
    functionName;
    memorySize;
    ephemeralStorageSize;
    initialPolicy;
    role;
    vpc;
    ipv6AllowedForDualStack;
    vpcSubnets;
    securityGroups;
    allowAllOutbound;
    allowAllIpv6Outbound;
    deadLetterQueueEnabled;
    deadLetterQueue;
    deadLetterTopic;
    tracing;
    snapStart;
    profiling;
    profilingGroup;
    insightsVersion;
    adotInstrumentation;
    paramsAndSecrets;
    layers;
    reservedConcurrentExecutions;
    events;
    logRetention;
    logRetentionRole;
    logRetentionRetryOptions;
    currentVersionOptions;
    filesystem;
    allowPublicSubnet;
    environmentEncryption;
    codeSigningConfig;
    architecture;
    runtimeManagementMode;
    logGroup;
    logFormat;
    loggingFormat;
    recursiveLoop;
    applicationLogLevel;
    applicationLogLevelV2;
    systemLogLevel;
    systemLogLevelV2;
    onFailure;
    onSuccess;
    maxEventAge;
    retryAttempts;
    constructor(props, scope, id) {
        logger_1.default.debug("InputProps FunctionProps " + JSON.stringify(props));
        this.runtime = (0, checkRuntime_1.checkRuntime)(props.runtime);
        this.code = (0, StandardizedNaming_1.checkCode)(props.code || FunctionProps.defaultCode);
        this.handler = (0, StandardizedNaming_1.checkHandler)(props.handler || FunctionProps.defaultHandler);
        this.description = (0, StandardizedNaming_1.checkDescription)(props.description);
        this.timeout = props.timeout;
        this.environment = (0, checkEnvironmentVariables_1.checkEnvVariables)(props.environment);
        this.functionName = props.functionName;
        this.memorySize = props.memorySize;
        this.ephemeralStorageSize = (0, deactivateProperties_1.checkEphemeralStorageSize)(props.ephemeralStorageSize);
        this.initialPolicy = props.initialPolicy;
        this.role = props.role;
        this.vpc = (0, checkVPC_1.checkVPC)(scope, props.vpc);
        this.ipv6AllowedForDualStack = (0, checkVPC_1.checkIpv6AllowedForDualStack)(props.ipv6AllowedForDualStack);
        this.vpcSubnets = (0, checkVPC_1.checkVPCSubnets)(props.vpcSubnets);
        this.securityGroups = props.securityGroups;
        this.allowAllOutbound = (0, checkVPC_1.checkAllowAllOutbound)(props.allowAllOutbound);
        this.allowAllIpv6Outbound = (0, checkVPC_1.checkAllowAllIpv6Outbound)(props.allowAllIpv6Outbound);
        this.deadLetterQueueEnabled = (0, deactivateProperties_1.deactivateProperties)("deadLetterQueueEnabled", props.deadLetterQueueEnabled);
        this.deadLetterQueue = (0, deactivateProperties_1.deactivateProperties)("deadLetterQueue", props.deadLetterQueue);
        this.deadLetterTopic = (0, deactivateProperties_1.deactivateProperties)("deadLetterTopic", props.deadLetterTopic);
        this.tracing = (0, logging_1.checkTracing)(props.tracing);
        this.snapStart = (0, snapStart_1.activeSnapStart)(props.snapStart, props.runtime);
        this.profiling = props.profiling;
        this.profilingGroup = props.profilingGroup;
        this.insightsVersion = props.insightsVersion;
        this.adotInstrumentation = props.adotInstrumentation;
        this.paramsAndSecrets = props.paramsAndSecrets;
        this.layers = props.layers;
        this.reservedConcurrentExecutions = props.reservedConcurrentExecutions;
        this.events = props.events;
        this.logRetention = (0, logging_1.checkLogRetention)(props.logRetention);
        this.logRetentionRole = (0, logging_1.checkLogRetentionRole)(props.logRetentionRole);
        this.logRetentionRetryOptions = (0, logging_1.checkLogRetentionOptions)(props.logRetentionRetryOptions);
        this.currentVersionOptions = props.currentVersionOptions;
        this.filesystem = props.filesystem;
        this.allowPublicSubnet = (0, checkVPC_1.checkAllowPublicSubnet)(props.allowPublicSubnet);
        this.environmentEncryption = (0, checkEnvironmentVariables_1.checkEnvironmentEncryption)(scope, id, props.environmentEncryption);
        this.codeSigningConfig = (0, codeSigningConfig_1.createCodeSigningConfig)(scope, id, props.codeSigningConfig);
        this.architecture = (0, deactivateProperties_1.checkArchitecture)(props.architecture);
        this.runtimeManagementMode = (0, checkRuntimeManagementMode_1.checkRuntimeManagementMode)(props.runtimeManagementMode);
        this.logGroup = (0, logging_1.checkLogGroup)(id, props.logGroup);
        this.logFormat = (0, deactivateOldAttribute_1.deactivateOldAttribute)("logFormat", props.logFormat);
        this.loggingFormat = (0, logging_1.checkLoggingFormat)(props.loggingFormat);
        this.recursiveLoop = (0, checkRecursiveLoop_1.checkRecursiveLoop)(props.recursiveLoop);
        this.applicationLogLevel = (0, deactivateOldAttribute_1.deactivateOldAttribute)("applicationLogLevel", props.applicationLogLevel);
        this.applicationLogLevelV2 = (0, logging_1.checkApplicationLogLevel)(scope, props.applicationLogLevelV2);
        this.systemLogLevel = (0, deactivateOldAttribute_1.deactivateOldAttribute)("systemLogLevel", props.systemLogLevel);
        this.systemLogLevelV2 = (0, logging_1.checkSystemLogLevel)(scope, props.systemLogLevelV2);
        this.onFailure = (0, validator_1.checkSafeAttributForSecMarker)(props.onFailure);
        this.onSuccess = (0, validator_1.checkSafeAttributForSecMarker)(props.onSuccess);
        this.maxEventAge = props.maxEventAge;
        this.retryAttempts = props.retryAttempts;
        logger_1.default.debug("OutputProps FunctionProps " + JSON.stringify(props));
    }
}
exports.FunctionProps = FunctionProps;
//# sourceMappingURL=SecFunctionProps.js.map