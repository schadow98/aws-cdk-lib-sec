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
exports.checkApplicationLogLevel = checkApplicationLogLevel;
exports.checkSystemLogLevel = checkSystemLogLevel;
exports.checkLoggingFormat = checkLoggingFormat;
exports.checkLogGroup = checkLogGroup;
exports.checkTracing = checkTracing;
exports.checkLogRetention = checkLogRetention;
exports.checkLogRetentionRole = checkLogRetentionRole;
exports.checkLogRetentionOptions = checkLogRetentionOptions;
const Lambda = __importStar(require("aws-cdk-lib/aws-lambda"));
const ConfigurationError_1 = require("../tools/ConfigurationError");
const logger_1 = __importDefault(require("../tools/logger"));
const aws_stack_1 = require("../aws-stack");
const aws_logs_1 = require("aws-cdk-lib/aws-logs");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
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
function checkApplicationLogLevel(stackInput, applicationLogLevel) {
    logger_1.default.debug("checkApplicationLogLevel" + applicationLogLevel);
    const stack = aws_stack_1.Stack.of(stackInput);
    const stage = stack.stage;
    //prod
    if (stage === "production") {
        if (!applicationLogLevel) {
            logger_1.default.info("setting applicationLogLevel production " + Lambda.ApplicationLogLevel.INFO);
            return Lambda.ApplicationLogLevel.INFO;
        }
        else {
            new ConfigurationError_1.ConfigurationError("ApplicationLogLevel ", "ApplicationLogLevel should be in production at INFO and not at: " + applicationLogLevel);
        }
    }
    else {
        //non-prod
        if (!applicationLogLevel) {
            logger_1.default.info("setting applicationLogLevel non-production " + Lambda.ApplicationLogLevel.DEBUG);
            return Lambda.ApplicationLogLevel.DEBUG;
        }
        else {
            new ConfigurationError_1.ConfigurationError("ApplicationLogLevel ", "ApplicationLogLevel should be in non-production at Debug and not at: " + applicationLogLevel);
        }
    }
    // not reachable code
    return applicationLogLevel;
}
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
function checkSystemLogLevel(stackInput, systemLogLevel) {
    logger_1.default.debug("checkSystemLogLevel" + systemLogLevel);
    const stack = aws_stack_1.Stack.of(stackInput);
    const stage = stack.stage;
    //prod
    if (stage === "production") {
        if (!systemLogLevel) {
            logger_1.default.info("setting systemLogLevel production " + Lambda.ApplicationLogLevel.INFO);
            return Lambda.SystemLogLevel.INFO;
        }
        else {
            new ConfigurationError_1.ConfigurationError("SystemLogLevel ", "SystemLogLevel should be in production at INFO and not at: " + systemLogLevel);
        }
    }
    else {
        //non-prod
        if (!systemLogLevel) {
            logger_1.default.info("setting systemLogLevel non-production " + Lambda.ApplicationLogLevel.DEBUG);
            return Lambda.SystemLogLevel.DEBUG;
        }
        else {
            new ConfigurationError_1.ConfigurationError("SystemLogLevel ", "SystemLogLevel should be in non-production at Debug and not at: " + systemLogLevel);
        }
    }
    // not reachable code
    return systemLogLevel;
}
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
function checkLoggingFormat(loggingFormat) {
    logger_1.default.debug("checkLoggingFormat " + loggingFormat);
    if (!loggingFormat || loggingFormat === Lambda.LoggingFormat.JSON) {
        logger_1.default.info("setting LoggingFormat " + Lambda.LoggingFormat.JSON);
        return Lambda.LoggingFormat.JSON;
    }
    else {
        new ConfigurationError_1.ConfigurationError("loggingFormat ", "loggingFormat should JSON, other configuration could cause an error with the implemented logger: " + loggingFormat);
    }
    return loggingFormat;
}
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
function checkLogGroup(lambdaId, logGroup) {
    logger_1.default.debug("checkLogGroup- logGroup: " + logGroup + " ; lambdaId: " + lambdaId);
    const excpectedLogGroup = "/aws/lambda/" + lambdaId;
    if (!logGroup) {
        logger_1.default.info("setting logGroup");
        return undefined;
    }
    if (logGroup?.logGroupName === excpectedLogGroup) {
        return logGroup;
    }
    else {
        new ConfigurationError_1.ConfigurationError("logGroup ", "logGroup should log into " + " but gotten: " + logGroup?.logGroupName);
    }
    return logGroup;
}
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
function checkTracing(tracing) {
    logger_1.default.debug("checkTracing" + tracing);
    if (!tracing || tracing === Lambda.Tracing.PASS_THROUGH) {
        logger_1.default.info("setting tracing " + Lambda.Tracing.PASS_THROUGH);
        return Lambda.Tracing.PASS_THROUGH;
    }
    else {
        new ConfigurationError_1.ConfigurationError("checkTracing ", "checkTracing should be PASS_THROUGH: " + tracing);
    }
    return tracing;
}
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
function checkLogRetention(logRetention) {
    logger_1.default.debug("checkLogRetention" + logRetention);
    if (!logRetention) {
        logger_1.default.info("setting logRetention " + aws_logs_1.RetentionDays.THREE_MONTHS);
        return aws_logs_1.RetentionDays.THREE_MONTHS;
    }
    if (logRetention.valueOf() > 90) {
        new ConfigurationError_1.ConfigurationError("logRetention ", "RetentionDays should be 90 Days (3 Months) or shorter: " + logRetention);
    }
    return logRetention;
}
/**
 * Validates and returns the IAM role used for setting log retention on a CloudWatch Log Group.
 *
 * If no role is provided, secure default behavior is assumed (e.g., automatic role creation or no custom role).
 *
 * @param logRetentionRole - Optional IAM role to be used for log retention configuration.
 * @returns The validated `IRole` or `undefined` if no role is provided.
 */
function checkLogRetentionRole(logRetentionRole) {
    logger_1.default.debug(`checkLogRetentionRole: ${logRetentionRole?.roleName}`);
    if (!logRetentionRole) {
        logger_1.default.info("setting logRetentionRole (secured)");
        logger_1.default.debug("No logRetentionRole provided. Returning undefined.");
        return undefined;
    }
    // Retrieve the assumedBy principal from the role
    const principal = logRetentionRole.assumedBy;
    if (!principal) {
        throw new ConfigurationError_1.ConfigurationError("logRetentionRole", "logRetentionRole must have an assumedBy principal defined.");
    }
    // Ensure the principal is a ServicePrincipal
    if (!(principal instanceof aws_iam_1.ServicePrincipal)) {
        throw new ConfigurationError_1.ConfigurationError("logRetentionRole", `logRetentionRole must be assumed by a ServicePrincipal, but found ${principal.constructor.name}.`);
    }
    // Define allowed services that can assume this role
    const allowedServices = ['logs.amazonaws.com']; // Modify as needed
    if (!allowedServices.includes(principal.service)) {
        throw new ConfigurationError_1.ConfigurationError("logRetentionRole", `logRetentionRole should only be assumed by the following services: ${allowedServices.join(', ')}. Found: '${principal.service}'.`);
    }
    // Define allowed Managed Policy ARNs
    const allowedManagedPolicyArns = [
        // Add the ARNs of allowed Managed Policies here
        'arn:aws:iam::aws:policy/CloudWatchLogsFullAccess',
        // Example: 'arn:aws:iam::aws:policy/AnotherAllowedPolicy',
    ];
    const attachedManagedPolicies = logRetentionRole.managedPolicies;
    attachedManagedPolicies.forEach((policy) => {
        if (!allowedManagedPolicyArns.includes(policy.managedPolicyArn)) {
            throw new ConfigurationError_1.ConfigurationError("logRetentionRole", `logRetentionRole has an unauthorized Managed Policy attached: ${policy.managedPolicyArn}.`);
        }
    });
    logger_1.default.debug("logRetentionRole has passed all security checks.");
    return logRetentionRole;
}
/**
 * Validates and returns the log retention retry options for a Lambda function.
 *
 * If no options are provided, logs that secure default behavior will be used.
 * These options control retry behavior when setting log retention on a log group.
 *
 * @param logRetentionOptions - Optional retry options for log retention configuration.
 * @returns The provided `LogRetentionRetryOptions` or `undefined` if none are specified.
 */
function checkLogRetentionOptions(logRetentionOptions) {
    logger_1.default.debug("checkLogRetentionOptions" + logRetentionOptions);
    if (!logRetentionOptions) {
        logger_1.default.info("setting logRetentionOptions (secure)");
        return undefined;
    }
    return logRetentionOptions;
}
//# sourceMappingURL=logging.js.map