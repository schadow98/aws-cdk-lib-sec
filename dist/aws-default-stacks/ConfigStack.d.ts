import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
/**
 * CDK stack that sets up AWS Config resources for compliance and governance.
 *
 * This stack may include custom or managed AWS Config rules, recorders, delivery channels,
 * and associated permissions to monitor and evaluate resource configurations.
 * It deploys a LambdaFunction to evaluate the Custom Config Rules.
 */
export declare class ConfigStack extends cdk.Stack {
    readonly configFn: cdk.aws_lambda.IFunction;
    readonly configFnArn: string;
    constructor(scope: Construct, id: string, props?: cdk.StackProps);
}
