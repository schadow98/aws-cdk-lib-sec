import * as Lambda from 'aws-cdk-lib/aws-lambda';
import { ConfigurationError } from '../../tools/ConfigurationError';
import logger from '../../tools/logger';

export function checkRecursiveLoop(recursiveLoopInput?: Lambda.RecursiveLoop): Lambda.RecursiveLoop {
    logger.debug("checkRecursiveLoop " + recursiveLoopInput )
    if(!recursiveLoopInput){
        return Lambda.RecursiveLoop.TERMINATE
    }
    if(recursiveLoopInput !== Lambda.RecursiveLoop.TERMINATE){
        new ConfigurationError("recursiveLoop ", " ist deprecated and do not should get used: " + recursiveLoopInput)
    }
    return recursiveLoopInput;
}
