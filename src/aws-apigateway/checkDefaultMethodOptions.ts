import * as aws_apigateway from 'aws-cdk-lib/aws-apigateway' ;
import * as aws_lambda from 'aws-cdk-lib/aws-lambda' ;
import fs from 'fs';
import path from 'path';
import logger from '../tools/logger';
import { Construct } from 'constructs';
import { SecMarker } from '../SecMarker';
import { ConfigurationError } from '../tools/ConfigurationError';

/**
 * Validates and returns a complete `MethodOptions` configuration for an API Gateway method.
 * If no options are provided, a default configuration will be generated.
 *
 * @param scope - The CDK construct scope in which the method is defined.
 * @param defaultMethodOptionsInput - Optional `MethodOptions` to be used or extended.
 * @returns A fully resolved and valid `MethodOptions` object.
 */

export function checkDefaultMethodOptions(scope: Construct, defaultMethodOptionsInput?: aws_apigateway.MethodOptions): aws_apigateway.MethodOptions {
    logger.debug("checkDefaultMethodOptions " + defaultMethodOptionsInput)
    if (!defaultMethodOptionsInput){

        const authorizerLambda = new SecAuthorizerLambdaFunction(scope, 'AuthorizerLambda', {
              runtime: aws_lambda.Runtime.NODEJS_18_X,
              code: aws_lambda.Code.fromInline(fs.readFileSync(path.join(path.dirname(__filename), "../aws-default-stacks/authorizeCode.ts"), { encoding: 'utf8', flag: 'r' })),
              handler: 'index.handler',
            });
        

        const tokenAuthorizer = new SecTokenAuthorizer(scope, 'TokenAuthorizer', {
            handler: authorizerLambda,
            identitySource: 'method.request.header.Authorization'
          });
          logger.info("setting authorizer to API Gateway")
          logger.info("setting authorizationType " + aws_apigateway.AuthorizationType.CUSTOM)

        return {
            authorizer: tokenAuthorizer,
            authorizationType: aws_apigateway.AuthorizationType.CUSTOM,
         }   
    }

    new ConfigurationError("defaultMethodOptions", "Unsceure defaultMethodOptions for API Gateway")

    return defaultMethodOptionsInput ||{}
}

/**
 * A custom API Gateway token authorizer that extends the default `TokenAuthorizer`.
 * 
 * This class adds the SecMarker to the SecTokenAuthorizer.
 * This class can be used to implement additional security configurations
 * or logic for authorizing requests based on bearer tokens.
 */
class SecTokenAuthorizer extends aws_apigateway.TokenAuthorizer{
    static [SecMarker] = true;
}

/**
 * A custom lambda function to authorizes tokens.
 * 
 * This class adds the SecMarker to the SecTokenAuthorizer.
 * This class can be used to implement additional security configurations
 * or logic for authorizing requests based on bearer tokens.
 */
class SecAuthorizerLambdaFunction extends aws_lambda.Function{
        static [SecMarker] = true;
}