import * as Lambda from 'aws-cdk-lib/aws-lambda';
/**
 * Validates if the RecursiveLoop configuration for a Lambda function is TERMINATE.
 *
 * @param recursiveLoopInput - Optional input defining the recursive loop settings.
 * @returns A valid `RecursiveLoop` configuration object.
 */
export declare function checkRecursiveLoop(recursiveLoopInput?: Lambda.RecursiveLoop): Lambda.RecursiveLoop;
