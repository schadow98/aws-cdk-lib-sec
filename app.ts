// my-stack.ts
// npx ts-node app.ts && cdk synth
import * as cdk from './src/aws-cdk-lib-sec';
import { Construct } from 'constructs';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as lambda from './src/aws-cdk-lib-sec/aws-lambda';

import * as path from 'path';
import { ProfilingGroup } from 'aws-cdk-lib/aws-codeguruprofiler';

// Defines the Stack
export class MyLambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string) {
        super(scope, id, { description: "irgendwas was 10 zeichen hat"});

        const paramsAndSecrets = lambda.ParamsAndSecretsLayerVersion.fromVersion(lambda.ParamsAndSecretsVersions.V1_0_103, {
            cacheEnabled: false,
            logLevel: lambda.ParamsAndSecretsLogLevel.DEBUG,
          });

        // Add a Lambda-Function to the stack
        const lambdaFunction = new cdk.aws_lambda.Function(this, 'MyLambdaFunction', {
            runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,
            description: "My lambda function to deploy something",
            environment: {
                // API_URL: 'https://example.com/api',
                // DB_PASSWORD: 'someHardcodedSecret',
                // TOKEN: 'ghp_very_suspicious_token',
                // NORMAL_VAR: 'just_normal_value',
                PATH1: '/usr/bin:/bin',
            },
            paramsAndSecrets: paramsAndSecrets
            // handler: 'handler.handler',
            // code: cdk.aws_lambda.Code.fromAsset('src')
            //snapStart: cdk.aws_lambda.SnapStartConf.ON_PUBLISHED_VERSIONS,
        })



        cdk.Tags.of(lambdaFunction).add("runtime:insecureReason", "Legacy system")
        cdk.Tags.of(lambdaFunction).add("insecure", "false")
    }
}

const app = new cdk.App();
new MyLambdaStack(app, 'MyLambdaStack');
app.synth();
