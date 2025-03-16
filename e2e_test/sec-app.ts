#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib-sec';
import { Construct } from 'constructs';

export class MyCdkAppStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);
  
      // Lambda-Funktion erstellen
      new cdk.aws_lambda.Function(this, 'MyLambdaFunction', {
        runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,
        description: "My secured app"
      });
    }
  }

const app = new cdk.App();
new MyCdkAppStack(app, 'MyCdkAppStack');
