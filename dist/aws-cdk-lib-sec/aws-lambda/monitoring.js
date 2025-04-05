"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTracing = checkTracing;
exports.checkProfiling = checkProfiling;
exports.checkProfilingGroup = checkProfilingGroup;
const logger_1 = __importDefault(require("../../tools/logger"));
const ConfigurationError_1 = require("../../tools/ConfigurationError");
const aws_codeguruprofiler_1 = require("aws-cdk-lib/aws-codeguruprofiler");
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
function checkTracing(tracing) {
    logger_1.default.debug("checkTracing Input " + tracing);
    if (tracing === false) {
        new ConfigurationError_1.ConfigurationError("tracing", "please enable tracing, so monitoring of the app is secured");
    }
    if (!tracing) {
        logger_1.default.info("setting tracing to true");
        return true;
    }
    return tracing;
}
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
function checkProfiling(profiling) {
    logger_1.default.debug("checkProfiling Input " + profiling);
    if (profiling === false) {
        new ConfigurationError_1.ConfigurationError("profiling", "please enable profiling, so monitoring of the app is secured");
    }
    if (!profiling) {
        logger_1.default.info("setting profiling to true");
        return true;
    }
    return profiling;
}
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
function checkProfilingGroup(scope, lambdaId, profilingGroup) {
    logger_1.default.debug("checkProfilingGroup Input " + profilingGroup);
    if (profilingGroup) {
        const child = profilingGroup.node.defaultChild;
        if (!child) {
            throw new Error('ProfilingGroup ist importiert oder nicht kompatibel!');
        }
        if (child.computePlatform && child.computePlatform !== 'AWSLambda') {
            new ConfigurationError_1.ConfigurationError('profilingGroup', 'Bitte setze die ProfilingGroup auf AWS_LAMBDA');
        }
        // ProfilingGroup ist i.O., also zurückgeben
        return profilingGroup;
    }
    const profilingGroupSec = new aws_codeguruprofiler_1.ProfilingGroup(scope, 'ProfilingGroup_DEV_SecMonitoring', {
        computePlatform: aws_codeguruprofiler_1.ComputePlatform.AWS_LAMBDA,
    });
    //const lambdaChild = scope.node.tryFindChild(lambdaId);
    // profilingGroupSec.grantPublish(lambdaChild);
    // give Lambda permissions to write code there
    // append Profiling Group ARN to env
    logger_1.default.info("setting profilingGroup (secured)");
    return profilingGroupSec;
}
//# sourceMappingURL=monitoring.js.map