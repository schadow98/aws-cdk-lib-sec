import * as Lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
/**
 * Creates a new `CodeSigningConfig` or returns an existing one.
 * Then it adds to the Lambdafuntion
 *
 * @param scope - The construct scope in which the resource is created.
 * @param lambdaId - A unique identifier for the resource.
 * @param codeSigningConfigInput - Optional: An existing `CodeSigningConfig`.
 * @returns An instance of `Lambda.CodeSigningConfig`.
 */
export declare function createCodeSigningConfig(scope: Construct, // Stack
lambdaId: string, // LambdaFunction
codeSigningConfigInput?: Lambda.ICodeSigningConfig): Lambda.CodeSigningConfig;
