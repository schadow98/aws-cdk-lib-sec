import * as Lambda from 'aws-cdk-lib/aws-lambda';
import { ConfigurationError } from '../tools/ConfigurationError';
import logger from '../tools/logger';
import { Construct } from 'constructs';
import { Stack } from '../aws-stack';
import { RetentionDays, ILogGroup } from "aws-cdk-lib/aws-logs";
import { IRole, IPrincipal, ServicePrincipal, ManagedPolicy } from 'aws-cdk-lib/aws-iam';

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
export function checkApplicationLogLevel(stackInput: Construct, applicationLogLevel?: Lambda.ApplicationLogLevel): Lambda.ApplicationLogLevel {
    logger.debug("checkApplicationLogLevel" + applicationLogLevel)
    const stack = Stack.of(stackInput) as Stack;
    const stage = stack.stage;
    //prod
    if (stage === "production"){
        if(!applicationLogLevel){
            logger.info("setting applicationLogLevel production " + Lambda.ApplicationLogLevel.INFO)
            return Lambda.ApplicationLogLevel.INFO
        }else{
            new ConfigurationError("ApplicationLogLevel ", "ApplicationLogLevel should be in production at INFO and not at: " + applicationLogLevel)
        }        
    }else{
        //non-prod
        if(!applicationLogLevel){
            logger.info("setting applicationLogLevel non-production " + Lambda.ApplicationLogLevel.DEBUG)
            return Lambda.ApplicationLogLevel.DEBUG
        }else{
            new ConfigurationError("ApplicationLogLevel ", "ApplicationLogLevel should be in non-production at Debug and not at: " + applicationLogLevel)
        }           
    }
    // not reachable code
    return applicationLogLevel
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

export function checkSystemLogLevel(stackInput: Construct, systemLogLevel?: Lambda.SystemLogLevel): Lambda.SystemLogLevel {
    logger.debug("checkSystemLogLevel" + systemLogLevel)
    const stack = Stack.of(stackInput) as Stack;
    const stage = stack.stage;
    //prod
    if (stage === "production"){
        if(!systemLogLevel){
            logger.info("setting systemLogLevel production " + Lambda.ApplicationLogLevel.INFO)
            return Lambda.SystemLogLevel.INFO
        }else{
            new ConfigurationError("SystemLogLevel ", "SystemLogLevel should be in production at INFO and not at: " + systemLogLevel)
        }        
    }else{
        //non-prod
        if(!systemLogLevel){
            logger.info("setting systemLogLevel non-production " + Lambda.ApplicationLogLevel.DEBUG)
            return Lambda.SystemLogLevel.DEBUG
        }else{
            new ConfigurationError("SystemLogLevel ", "SystemLogLevel should be in non-production at Debug and not at: " + systemLogLevel)
        }           
    }
    // not reachable code
    return systemLogLevel
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
export function checkLoggingFormat(loggingFormat?: Lambda.LoggingFormat): Lambda.LoggingFormat {
    logger.debug("checkLoggingFormat " + loggingFormat)
    if(!loggingFormat || loggingFormat === Lambda.LoggingFormat.JSON){
        logger.info("setting LoggingFormat " + Lambda.LoggingFormat.JSON)
        return Lambda.LoggingFormat.JSON
    }else{
        new ConfigurationError("loggingFormat ", "loggingFormat should JSON, other configuration could cause an error with the implemented logger: " + loggingFormat)
    }        

    return loggingFormat
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
export function checkLogGroup(lambdaId: string, logGroup?: ILogGroup): ILogGroup | undefined {
    logger.debug("checkLogGroup- logGroup: " + logGroup + " ; lambdaId: " + lambdaId)
    const excpectedLogGroup = "/aws/lambda/" + lambdaId

    if(!logGroup){
        logger.info("setting logGroup")
        return undefined
    }

    if(logGroup?.logGroupName === excpectedLogGroup){
        return logGroup
    }else{
        new ConfigurationError("logGroup ", "logGroup should log into " + " but gotten: " + logGroup?.logGroupName)
    }        

    return logGroup
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
export function checkTracing(tracing?: Lambda.Tracing): Lambda.Tracing {
    logger.debug("checkTracing" + tracing)
    if(!tracing || tracing === Lambda.Tracing.PASS_THROUGH){
        logger.info("setting tracing " + Lambda.Tracing.PASS_THROUGH)
        return Lambda.Tracing.PASS_THROUGH
    }else{
        new ConfigurationError("checkTracing ", "checkTracing should be PASS_THROUGH: " + tracing)
    }        

    return tracing
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
export function checkLogRetention(logRetention?: RetentionDays): RetentionDays {
    logger.debug("checkLogRetention" + logRetention)
    if(!logRetention){
        logger.info("setting logRetention " + RetentionDays.THREE_MONTHS)
        return RetentionDays.THREE_MONTHS
    }      

    if(logRetention.valueOf() > 90){
        new ConfigurationError("logRetention ", "RetentionDays should be 90 Days (3 Months) or shorter: " + logRetention)
    }

    return logRetention
}

/**
 * Validates and returns the IAM role used for setting log retention on a CloudWatch Log Group.
 * 
 * If no role is provided, secure default behavior is assumed (e.g., automatic role creation or no custom role).
 * 
 * @param logRetentionRole - Optional IAM role to be used for log retention configuration.
 * @returns The validated `IRole` or `undefined` if no role is provided.
 */
export function checkLogRetentionRole(logRetentionRole?: any): IRole | undefined {
    logger.debug(`checkLogRetentionRole: ${logRetentionRole?.roleName}`);

    if (!logRetentionRole) {
        logger.info("setting logRetentionRole (secured)")
        logger.debug("No logRetentionRole provided. Returning undefined.");
        return undefined;
    }

    // Retrieve the assumedBy principal from the role
    const principal: IPrincipal = logRetentionRole.assumedBy;
    if (!principal) {
        throw new ConfigurationError(
            "logRetentionRole",
            "logRetentionRole must have an assumedBy principal defined."
        );
    }

    // Ensure the principal is a ServicePrincipal
    if (!(principal instanceof ServicePrincipal)) {
        throw new ConfigurationError(
            "logRetentionRole",
            `logRetentionRole must be assumed by a ServicePrincipal, but found ${principal.constructor.name}.`
        );
    }

    // Define allowed services that can assume this role
    const allowedServices = ['logs.amazonaws.com']; // Modify as needed

    if (!allowedServices.includes(principal.service)) {
        throw new ConfigurationError(
            "logRetentionRole",
            `logRetentionRole should only be assumed by the following services: ${allowedServices.join(', ')}. Found: '${principal.service}'.`
        );
    }

    // Define allowed Managed Policy ARNs
    const allowedManagedPolicyArns: string[] = [
        // Add the ARNs of allowed Managed Policies here
        'arn:aws:iam::aws:policy/CloudWatchLogsFullAccess',
        // Example: 'arn:aws:iam::aws:policy/AnotherAllowedPolicy',
    ];

    const attachedManagedPolicies = logRetentionRole.managedPolicies;

    attachedManagedPolicies.forEach((policy: ManagedPolicy) => {
        if (!allowedManagedPolicyArns.includes(policy.managedPolicyArn)) {
            throw new ConfigurationError(
                "logRetentionRole",
                `logRetentionRole has an unauthorized Managed Policy attached: ${policy.managedPolicyArn}.`
            );
        }
    });

    logger.debug("logRetentionRole has passed all security checks.");
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

export function checkLogRetentionOptions(logRetentionOptions?: Lambda.LogRetentionRetryOptions): Lambda.LogRetentionRetryOptions | undefined {
    logger.debug("checkLogRetentionOptions" + logRetentionOptions)
    if(!logRetentionOptions){
        logger.info("setting logRetentionOptions (secure)")
        return undefined
    }      
    return logRetentionOptions
}




