import { ConfigurationError } from '../../tools/ConfigurationError';
import logger from '../../tools/logger';
/**
 * Checks if the API Gateway deployments isretained.
 *
 * @param retainDeployments - Optional flag indicating whether to retain deployments.
 * @returns `true` if deployments should be retained, otherwise `false`.
 */
export function checkRetainDeployments(retainDeployments) {
    logger.debug("checkRetainDeployments " + retainDeployments);
    if (retainDeployments === undefined) {
        logger.debug("setting retainDeployments to true");
        return false;
    }
    if (retainDeployments === true) {
        new ConfigurationError("retainDeployments", "retainDeployments darf nicht auf true gesetzt sein.");
    }
    return false;
}
//# sourceMappingURL=checkRetainDeployments.js.map