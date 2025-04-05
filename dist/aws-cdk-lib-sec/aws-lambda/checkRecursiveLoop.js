import * as Lambda from 'aws-cdk-lib/aws-lambda';
import { ConfigurationError } from '../../tools/ConfigurationError';
import logger from '../../tools/logger';
/**
 * Validates if the RecursiveLoop configuration for a Lambda function is TERMINATE.
 *
 * @param recursiveLoopInput - Optional input defining the recursive loop settings.
 * @returns A valid `RecursiveLoop` configuration object.
 */
export function checkRecursiveLoop(recursiveLoopInput) {
    logger.debug("checkRecursiveLoop " + recursiveLoopInput);
    if (!recursiveLoopInput) {
        logger.info("setting recursiveLoopInput to" + Lambda.RecursiveLoop.TERMINATE);
        return Lambda.RecursiveLoop.TERMINATE;
    }
    if (recursiveLoopInput !== Lambda.RecursiveLoop.TERMINATE) {
        new ConfigurationError("recursiveLoop ", " ist deprecated and do not should get used: " + recursiveLoopInput);
    }
    return recursiveLoopInput;
}
//# sourceMappingURL=checkRecursiveLoop.js.map