import logger from '../tools/logger';
import { ConfigurationError } from '../tools/ConfigurationError';
import { IProfilingGroup, ProfilingGroup, ComputePlatform, CfnProfilingGroup } from 'aws-cdk-lib/aws-codeguruprofiler';
import { Construct } from 'constructs';

/**
 * Validates and enforces tracing configuration for the application.
 * 
 * Ensures that tracing is enabled. If the input is explicitly `false`,
 * a `ConfigurationError` is thrown to enforce secure observability.
 * 
 * If no value is provided, tracing defaults to `true`.
 *
 * @param tracing - Optional flag indicating whether tracing is enabled.
 * @returns `true` if tracing is enabled or set by default.
 */
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

/**
 * Validates and enforces profiling configuration for the application.
 * 
 * Ensures that profiling is enabled to support secure monitoring and performance analysis.
 * If the input is explicitly `false`, a `ConfigurationError` is thrown.
 * 
 * If no value is provided, profiling defaults to `true`.
 *
 * @param profiling - Optional flag indicating whether profiling is enabled.
 * @returns `true` if profiling is enabled or set by default.
 */
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

/**
 * Validates the provided profiling group or creates a new secure one for AWS Lambda.
 * 
 * - If a profiling group is provided, it must be compatible and use `AWS_LAMBDA` as its compute platform.
 *   Otherwise, a `ConfigurationError` is thrown.
 * - If no profiling group is provided, a new one is created with the appropriate settings.
 *
 * @param scope - The CDK construct scope in which the profiling group is created.
 * @param lambdaId - The identifier of the Lambda function associated with the profiling group.
 * @param profilingGroup - Optional profiling group to validate and use.
 * @returns A valid and secure `IProfilingGroup` instance.
 */
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

    //const lambdaChild = scope.node.tryFindChild(lambdaId);
    // profilingGroupSec.grantPublish(lambdaChild);

      // give Lambda permissions to write code there
      // append Profiling Group ARN to env
    logger.info("setting profilingGroup (secured)")
    return profilingGroupSec
    
}