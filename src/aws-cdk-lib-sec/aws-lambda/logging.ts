import * as Lambda from 'aws-cdk-lib/aws-lambda';
import { ConfigurationError } from '../../tools/ConfigurationError';
import logger from '../../tools/logger';
import { Construct } from 'constructs';
import { Stack } from '../aws-stack';
import { RetentionDays, ILogGroup } from "aws-cdk-lib/aws-logs";
import { IRole, IPrincipal, ServicePrincipal, ManagedPolicy } from 'aws-cdk-lib/aws-iam';

export function checkApplicationLogLevel(stackInput: Construct, applicationLogLevel?: Lambda.ApplicationLogLevel): Lambda.ApplicationLogLevel {
    logger.debug("checkApplicationLogLevel" + applicationLogLevel)
    var stack = Stack.of(stackInput) as Stack;
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


export function checkSystemLogLevel(stackInput: Construct, systemLogLevel?: Lambda.SystemLogLevel): Lambda.SystemLogLevel {
    logger.debug("checkSystemLogLevel" + systemLogLevel)
    var stack = Stack.of(stackInput) as Stack;
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
export function checkLogRetentionOptions(logRetentionOptions?: Lambda.LogRetentionRetryOptions): Lambda.LogRetentionRetryOptions | undefined {
    logger.debug("checkLogRetentionOptions" + logRetentionOptions)
    if(!logRetentionOptions){
        logger.info("setting logRetentionOptions (secure)")
        return undefined
    }      
    return logRetentionOptions
}




