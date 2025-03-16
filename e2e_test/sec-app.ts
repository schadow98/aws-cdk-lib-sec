#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib-sec';
import * as lambda from 'aws-cdk-lib-sec/aws-lambda';
import { Construct } from 'constructs';

export class MyCdkAppStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);
  
      // Lambda-Funktion erstellen
      new lambda.Function(this, 'MyLambdaFunction', {
        runtime: lambda.Runtime.NODEJS_16_X, // Wähle die gewünschte Node.js-Version
        handler: 'hello.handler',            // Datei: hello.js, Export: handler
        code: lambda.Code.fromAsset('lambda')  // Pfad zum Lambda-Code
      });
    }
  }

const app = new cdk.App();
new MyCdkAppStack(app, 'MyCdkAppStack');
