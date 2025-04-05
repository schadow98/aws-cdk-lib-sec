import { IKey } from "aws-cdk-lib/aws-kms";
import { Construct } from "constructs";
/**
 * Validates and returns a set of environment variables.
 *
 * If no environment variables are provided, returns `undefined`.
 * Ensures that the returned object has valid string key-value pairs.
 *
 * @param env - Optional object containing environment variables as key-value pairs.
 * @returns The validated environment variables object or `undefined` if not provided.
 */
export declare function checkEnvVariables(env: {
    [key: string]: string;
} | undefined): {
    [key: string]: string;
} | undefined;
/**
 * Validates or creates a KMS key for encrypting environment variables of a Lambda function.
 *
 * If no custom key is provided, a new KMS key will be created and associated with the Lambda.
 *
 * @param scope - The CDK construct scope, typically the stack in which the Lambda is defined.
 * @param lambdaId - The identifier of the Lambda function that requires encryption.
 * @param ikey - Optional existing KMS key to use for environment encryption.
 * @returns A KMS key (`IKey`) used to encrypt the Lambda environment variables.
 */
export declare function checkEnvironmentEncryption(scope: Construct, // Stack
lambdaId: string, // LambdaFunction 
ikey?: IKey): IKey;
