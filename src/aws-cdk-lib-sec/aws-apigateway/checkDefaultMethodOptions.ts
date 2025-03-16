import * as aws_apigateway from 'aws-cdk-lib/aws-apigateway' ;
import * as aws_lambda from 'aws-cdk-lib/aws-lambda' ;
import fs from 'fs';
import path from 'path';
import logger from '../../tools/logger';
import { AuthorizerStack } from '../aws-default-stacks/AuthorizerStack';
import { Construct } from 'constructs';
import { SecMarker } from '../SecMarker';
import { ConfigurationError } from '../../tools/ConfigurationError';
export function checkDefaultMethodOptions(scope: Construct, defaultMethodOptionsInput?: aws_apigateway.MethodOptions): aws_apigateway.MethodOptions {
    logger.debug("checkDefaultMethodOptions " + defaultMethodOptionsInput)
    if (!defaultMethodOptionsInput){

        const authorizerLambda = new SecAuthorizerLambdaFunction(scope, 'AuthorizerLambda', {
              runtime: aws_lambda.Runtime.NODEJS_18_X,
              code: aws_lambda.Code.fromInline(fs.readFileSync(path.join(path.dirname(__filename), "../aws-default-stacks/authorizeCode.ts"), { encoding: 'utf8', flag: 'r' })),
              handler: 'index.handler',
            });
        

        const tokenAuthorizer = new SecTokenAuthorizer(scope, 'TokenAuthorizer', {
            handler: authorizerLambda
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

class SecTokenAuthorizer extends aws_apigateway.TokenAuthorizer{
    static [SecMarker] = true;
}

class SecAuthorizerLambdaFunction extends aws_lambda.Function{
        static [SecMarker] = true;
}