import * as Lambda from 'aws-cdk-lib/aws-lambda';
import { ConfigurationError } from '../../tools/ConfigurationError';
import logger from '../../tools/logger';
/**
 * Validates and enables SnapStart for supported Lambda runtimes.
 *
 * - If `snapStart` is not provided and the runtime supports SnapStart,
 *   it defaults to `ON_PUBLISHED_VERSIONS`.
 * - If `snapStart` is explicitly set to anything else, a `ConfigurationError` is thrown.
 *
 * SnapStart reduces cold start latency for Java-based Lambdas by initializing
 * the runtime state ahead of time.
 *
 * @param snapStart - Optional SnapStart configuration.
 * @param runtime - Optional Lambda runtime, used to determine if SnapStart is supported.
 * @returns The validated or default SnapStart configuration, or `undefined` if unsupported.
 */
export function activeSnapStart(snapStart, runtime) {
    logger.debug("activeSnapStart for " + runtime + " : " + snapStart);
    if (!snapStart) {
        if (runtime?.supportsSnapStart) {
            logger.info("setting activeSnapStart " + Lambda.SnapStartConf.ON_PUBLISHED_VERSIONS);
            return Lambda.SnapStartConf.ON_PUBLISHED_VERSIONS;
        }
        else {
            logger.info("setting activeSnapStart " + undefined);
            return undefined;
        }
    }
    // if snapstart is set
    if (snapStart !== Lambda.SnapStartConf.ON_PUBLISHED_VERSIONS) {
        new ConfigurationError("snapStart", "Please set Snapstart to Lambda.SnapStartConf.ON_PUBLISHED_VERSIONS: " + snapStart);
    }
    return snapStart;
}
//# sourceMappingURL=snapStart.js.map