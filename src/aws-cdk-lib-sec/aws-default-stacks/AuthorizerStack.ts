// AuthorizerStack.ts

import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import fs from 'fs';
import path from 'path';

import * as aws_lambda from 'aws-cdk-lib/aws-lambda';

/**
 * CDK stack that provisions resources required for API Gateway authorizers.
 * 
 * This stack typically includes custom Lambda authorizers, IAM roles, and related configurations
 * used to secure API Gateway endpoints.
 */
export class AuthorizerStack extends cdk.Stack {
  public readonly authorizerFn: cdk.aws_lambda.IFunction;
  public readonly authorizerFnArn: string;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.authorizerFn = new aws_lambda.Function(this, 'AuthorizerLambda', {
      runtime: aws_lambda.Runtime.NODEJS_18_X,
      code: aws_lambda.Code.fromInline(fs.readFileSync(path.join(path.dirname(__filename), "./authorizeCode.ts"), { encoding: 'utf8', flag: 'r' })),
      handler: 'index.handler',
    });

    this.authorizerFnArn = this.authorizerFn.functionArn;

    new cdk.CfnOutput(this, 'AuthorizerFnArn', {
      value: this.authorizerFn.functionArn,
      exportName: 'AuthorizerFnArn' // eindeutiger Export-Name
    });

  }
}
