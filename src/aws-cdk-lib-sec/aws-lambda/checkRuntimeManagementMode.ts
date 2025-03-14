import * as Lambda from "aws-cdk-lib/aws-lambda";
import logger from "../../tools/logger";
import { ConfigurationError } from "../../tools/ConfigurationError";
export function checkRuntimeManagementMode(runtimeManagementMode? : Lambda.RuntimeManagementMode){
    logger.debug("checkRecursiveLoop " + runtimeManagementMode )
    if(!runtimeManagementMode){
        logger.info("setting checkRecursiveLoop " + Lambda.RuntimeManagementMode.AUTO )
        return Lambda.RuntimeManagementMode.AUTO
    }
    if(runtimeManagementMode !== Lambda.RuntimeManagementMode.AUTO){
        new ConfigurationError("runtimeManagementMode", "runtimeManagementMode is not safe: " + runtimeManagementMode)
    }
    return runtimeManagementMode;
}