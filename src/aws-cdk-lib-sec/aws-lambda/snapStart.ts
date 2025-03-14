import * as Lambda  from 'aws-cdk-lib/aws-lambda';
import { ConfigurationError } from '../../tools/ConfigurationError';
import logger from '../../tools/logger';
export function activeSnapStart(snapStart?: Lambda.SnapStartConf, runtime?: Lambda.Runtime): Lambda.SnapStartConf | undefined{
    logger.debug("activeSnapStart for " + runtime + " : " + snapStart)
    if(!snapStart){
        if(runtime?.supportsSnapStart){
            logger.info("setting activeSnapStart " + Lambda.SnapStartConf.ON_PUBLISHED_VERSIONS)
            return Lambda.SnapStartConf.ON_PUBLISHED_VERSIONS
        }else{
            logger.info("setting activeSnapStart " + undefined)
            return undefined
        }
    }

    // if snapstart is set
    if(snapStart !== Lambda.SnapStartConf.ON_PUBLISHED_VERSIONS){
        new ConfigurationError("snapStart", "Please set Snapstart to Lambda.SnapStartConf.ON_PUBLISHED_VERSIONS: " + snapStart)
    }
    return snapStart
}