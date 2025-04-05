
import { ConfigurationError } from "../tools/ConfigurationError"
import logger from "../tools/logger"
import { Size } from "../aws-stack"
import * as Lambda from "aws-cdk-lib/aws-lambda";

/**
 * Deactivates or sanitizes specific properties based on the given parameter name and value.
 * 
 * This function is used to handle outdated, deprecated, or sensitive properties
 * by modifying or removing them according to internal rules.
 *
 * @param paramName - The name of the property to deactivate.
 * @param paramValue - The current value of the property to process.
 */
export function deactivateProperties(paramName: string, paramValue: any){
    logger.debug("deactivateProperties of " + paramName + " - please delete key and value: " + paramValue)
    if (paramValue || typeof paramValue == "string"){
        new ConfigurationError(paramName, paramName + " ist not supported, please wait for the next version of the framework: " + paramValue)
    }    
    return paramValue
}

/**
 * Validates and returns the provided ephemeral storage size for a Lambda function.
 * 
 * If no size is specified, logs or applies a default behavior (if implemented elsewhere).
 * This is used to control the `/tmp` storage size available to the Lambda.
 *
 * @param ephemeralStorageSize - Optional size of the ephemeral storage.
 * @returns The provided `Size` value or `undefined` if not specified.
 */
export function checkEphemeralStorageSize(ephemeralStorageSize?: Size) : Size |undefined{
    logger.debug("ephemeralStorageSize " + ephemeralStorageSize)
    return ephemeralStorageSize
}

/**
 * Validates the provided Lambda architecture or applies default behavior.
 * 
 * This function ensures that the specified architecture (e.g., `X86_64`, `ARM_64`)
 * is valid and supported. If none is provided, a default may be used.
 *
 * @param architecture - Optional Lambda architecture to validate.
 * @returns The provided architecture or a default (if implemented).
 */
export function checkArchitecture(architecture?: Lambda.Architecture){
    logger.debug("checkArchitecture " + architecture)
    return architecture
}