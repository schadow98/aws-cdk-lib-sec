
import { ConfigurationError } from "../../tools/ConfigurationError"
import logger from "../../tools/logger"
import { Size } from "../aws-stack"
import * as Lambda from "aws-cdk-lib/aws-lambda";

export function deactivateProperties(paramName: string, paramValue: any){
    logger.debug("deactivateProperties of " + paramName + " - please delete key and value: " + paramValue)
    if (paramValue || typeof paramValue == "string"){
        new ConfigurationError(paramName, paramName + " ist not supported, please wait for the next version of the framework: " + paramValue)
    }    
    return paramValue
}

export function checkEphemeralStorageSize(ephemeralStorageSize?: Size) : Size |undefined{
    logger.debug("ephemeralStorageSize " + ephemeralStorageSize)
    return ephemeralStorageSize
}


export function checkArchitecture(architecture?: Lambda.Architecture){
    logger.debug("checkArchitecture " + architecture)
    return architecture
}