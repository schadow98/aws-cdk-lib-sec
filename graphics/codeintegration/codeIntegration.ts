//app.ts -> file that defines the structure of the infrasture
// old - imports code from unsecured aws-cdk-libary
import * as cdk from 'aws-cdk-lib';
// new - imports code from safe framework
import * as cdk from 'aws-cdk-lib-sec';
import { Construct } from 'constructs';

// Defines the Stack
export class MyLambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        // Add a Lambda-Function to the stack
        new cdk.aws_lambda.Function(this, 'MyLambdaFunction', {
            runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,
            handler: 'index.handler',
            code: cdk.aws_lambda.Code.fromAsset('lambda')
        });
    }
}

const app = new cdk.App();
new MyLambdaStack(app, 'MyLambdaStack');