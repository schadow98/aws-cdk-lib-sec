
import { ConfigurationError } from "../../tools/ConfigurationError"
import logger from "../../tools/logger"
export function deactivateOldAttribute(paramName: string, paramValue: string | undefined=undefined): (string | undefined){
    logger.debug("deactivateOldAttribute of " + paramName + " - please delete key and value: " + paramValue)
    if (paramValue || typeof paramValue == "string"){
        new ConfigurationError(paramName, paramName + " ist deprecated and do not should get used: " + paramValue)
    }
    return paramValue
}