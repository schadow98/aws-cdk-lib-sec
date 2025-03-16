// my-stack.ts
// npx ts-node app.ts && cdk synth
import * as cdk from './src/aws-cdk-lib-sec';

import { Construct } from 'constructs';
import * as lambda from './src/aws-cdk-lib-sec/aws-lambda';
import * as apigateway from './src/aws-cdk-lib-sec/aws-apigateway';



// Defines the Stack
export class MyLambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: cdk.StackProps) {
        super(scope, id, { 
            description: "irgendwas was 10 zeichen hat",
            contact: {
                developerTeam:  "developerTeam@domain.com",
                operationTeam:  "operationTeam@domain.com",
                privacyManager: "privacyManager@domain.com",
                securityManager:"securityManager@domain.com",      
              }

        });


        const apiGateway = new apigateway.RestApi(
            this, 
            "MyApiGateway",
            {
                description: "API Gateway default secured"
            }
        )
        

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

        const pingRessource = apiGateway.root.addResource("ping");
        pingRessource.addMethod("GET", new apigateway.LambdaIntegration(lambdaFunction));


        cdk.Tags.of(lambdaFunction).add("runtime:insecureReason", "Legacy system")
        cdk.Tags.of(lambdaFunction).add("insecure", "false")

        cdk.Tags.of(this).add("environment", "dev");    
        cdk.Tags.of(this).add("cost-center", "IT-123");   
        cdk.Tags.of(this).add("budget", "1000");          
        cdk.Tags.of(this).add("privacy-class", "internal");
        cdk.Tags.of(this).add("creator", "MyTeam");       
        cdk.Tags.of(this).add("created-at", "2025-03-14"); 
        cdk.Tags.of(this).add("compliance", "GDPR");       
        cdk.Tags.of(this).add("governance", "internal");

    }
}

const app = new cdk.App();
new MyLambdaStack(app, 'MyLambdaStack');
app.synth();
