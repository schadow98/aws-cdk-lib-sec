import * as cdk from 'aws-cdk-lib';
import { App, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';

class MyLambdaStack extends Stack {
    constructor(scope: Construct, id: string) {
      super(scope, id);
  
      // Lambda-Funktion hinzufügen
      new cdk.aws_lambda.Function(this, 'MyLambdaFunction', {
        runtime: cdk.aws_lambda.Runtime.NODEJS_14_X,
        handler: 'index.handler',
        code: cdk.aws_lambda.Code.fromAsset('lambda'),  // Der Ordner mit dem Lambda-Code
      });
    }
  }