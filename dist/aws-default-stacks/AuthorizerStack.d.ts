import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
/**
 * CDK stack that provisions resources required for API Gateway authorizers.
 *
 * This stack typically includes custom Lambda authorizers, IAM roles, and related configurations
 * used to secure API Gateway endpoints.
 */
export declare class AuthorizerStack extends cdk.Stack {
    readonly authorizerFn: cdk.aws_lambda.IFunction;
    readonly authorizerFnArn: string;
    constructor(scope: Construct, id: string, props?: cdk.StackProps);
}
