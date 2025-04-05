import * as aws_apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
/**
 * Validates and returns a complete `MethodOptions` configuration for an API Gateway method.
 * If no options are provided, a default configuration will be generated.
 *
 * @param scope - The CDK construct scope in which the method is defined.
 * @param defaultMethodOptionsInput - Optional `MethodOptions` to be used or extended.
 * @returns A fully resolved and valid `MethodOptions` object.
 */
export declare function checkDefaultMethodOptions(scope: Construct, defaultMethodOptionsInput?: aws_apigateway.MethodOptions): aws_apigateway.MethodOptions;
