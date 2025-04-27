import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class MyLambdaApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda-Funktion erstellen
    const lambdaFunction = new lambda.Function(this, 'MyLambda', {
      runtime: lambda.Runtime.NODEJS_20_X, // Runtime der Lambda
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda'), // Ordner mit dem Lambda-Code
    });

    // API Gateway erstellen
    const api = new apigateway.LambdaRestApi(this, 'MyApi', {
      handler: lambdaFunction,
    });
  }
}
