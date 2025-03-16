// ConfigStack.ts

import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import fs from 'fs';
import path from 'path';
import * as aws_lambda from 'aws-cdk-lib/aws-lambda';

export class ConfigStack extends cdk.Stack {
  public readonly configFn: cdk.aws_lambda.IFunction;
  public readonly configFnArn: string;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.configFn = new aws_lambda.Function(this, 'ConfigLambda', {
      runtime: aws_lambda.Runtime.NODEJS_18_X,
      code: aws_lambda.Code.fromInline(fs.readFileSync(path.join(path.dirname(__filename), "./configCode.ts"), { encoding: 'utf8', flag: 'r' })),
      handler: 'index.handler',
    });

    this.configFnArn = this.configFn.functionArn;

    new cdk.CfnOutput(this, 'ConfigFnArn', {
      value: this.configFn.functionArn,
      exportName: 'ConfigFnArn' // eindeutiger Export-Name
    });

  }
}

