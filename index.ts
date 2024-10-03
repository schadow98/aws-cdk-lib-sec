// my-stack.ts

import * as cdk from 'aws-cdk-lib';
import { App, Stack } from 'aws-cdk-lib';
import { SecStack, SecLambda, logger } from './src/aws-cdk-lib-sec';
import { warn } from './src/aws-cdk-lib-sec/SecLogger';
import { Construct } from 'constructs';



export class MyLambdaStack extends SecStack {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        // Lambda-Funktion hinzufügen
        new SecLambda(this, 'MyLambdaFunction', {
            runtime: cdk.aws_lambda.Runtime.NODEJS_14_X,
            handler: 'index.handler',
            code: cdk.aws_lambda.Code.fromAsset('lambda'), 

        });
    }
}

export class MyLambdaStack2 extends SecStack {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        // Lambda-Funktion hinzufügen
        new SecLambda(this, 'MyLambdaFunction', {
            runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,
            handler: 'index.handler',
            code: cdk.aws_lambda.Code.fromAsset('lambda'),  // Der Ordner mit dem Lambda-Code
        });
    }
}
