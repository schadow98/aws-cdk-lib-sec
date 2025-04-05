import * as Lambda from "aws-cdk-lib/aws-lambda";
import logger from "../../tools/logger";
import { ConfigurationError } from "../../tools/ConfigurationError";
/**
 * Validates the provided Lambda `RuntimeManagementMode` or defaults it to `Auto`.
 *
 * Ensures that a valid runtime management mode is used. If none is provided,
 * the mode is set to `Lambda.RuntimeManagementMode.AUTO`.
 *
 * @param runtimeManagementMode - Optional runtime management mode for the Lambda function.
 * @returns A valid `RuntimeManagementMode`, defaulting to `AUTO` if not specified.
 */
export function checkRuntimeManagementMode(runtimeManagementMode) {
    logger.debug("checkRecursiveLoop " + runtimeManagementMode);
    if (!runtimeManagementMode) {
        logger.info("setting checkRecursiveLoop " + Lambda.RuntimeManagementMode.AUTO);
        return Lambda.RuntimeManagementMode.AUTO;
    }
    if (runtimeManagementMode !== Lambda.RuntimeManagementMode.AUTO) {
        new ConfigurationError("runtimeManagementMode", "runtimeManagementMode is not safe: " + runtimeManagementMode);
    }
    return runtimeManagementMode;
}
//# sourceMappingURL=checkRuntimeManagementMode.js.map