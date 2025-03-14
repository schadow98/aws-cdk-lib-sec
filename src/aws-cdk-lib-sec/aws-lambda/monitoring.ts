import logger from '../../tools/logger';
import { ConfigurationError } from '../../tools/ConfigurationError';
import { IProfilingGroup, ProfilingGroup, ComputePlatform, CfnProfilingGroup } from 'aws-cdk-lib/aws-codeguruprofiler';
import { Construct } from 'constructs';

export function checkTracing (
    tracing  ?: boolean
): boolean{
    logger.debug("checkTracing Input " + tracing)
    if(tracing===false){
        new ConfigurationError("tracing", "please enable tracing, so monitoring of the app is secured")
    }

    if(!tracing){
        logger.info("setting tracing to true")
        return true
    }

    return tracing
}


export function checkProfiling (
    profiling  ?: boolean
): boolean{
    logger.debug("checkProfiling Input " + profiling)
    if(profiling===false){
        new ConfigurationError("profiling", "please enable profiling, so monitoring of the app is secured")
    }

    if(!profiling){
        logger.info("setting profiling to true")
        return true
    }

    return profiling
}

export function checkProfilingGroup  (
    scope: Construct,
    lambdaId: string,
    profilingGroup ?: IProfilingGroup
): IProfilingGroup{
    logger.debug("checkProfilingGroup Input " + profilingGroup)


    if (profilingGroup) {

        const child = profilingGroup.node.defaultChild as CfnProfilingGroup | undefined;
        if (!child) {
            throw new Error('ProfilingGroup ist importiert oder nicht kompatibel!');
          }
        if (child.computePlatform && child.computePlatform !== 'AWSLambda') {
          new ConfigurationError('profilingGroup', 'Bitte setze die ProfilingGroup auf AWS_LAMBDA');
        }

    
        // ProfilingGroup ist i.O., also zurückgeben
        return profilingGroup;
      }
    const profilingGroupSec = new ProfilingGroup(scope, 'ProfilingGroup_DEV_SecMonitoring', {
        computePlatform: ComputePlatform.AWS_LAMBDA,
      });

    const lambdaChild = scope.node.tryFindChild(lambdaId);
    // profilingGroupSec.grantPublish(lambdaChild);

      // give Lambda permissions to write code there
      // append Profiling Group ARN to env
    logger.info("setting profilingGroup (secured)")
    return profilingGroupSec
    
}