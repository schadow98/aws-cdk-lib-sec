// my-stack.ts
// npx ts-node app.ts && cdk synth
import * as cdk from '../src/aws-cdk-lib-sec';
import { Construct } from 'constructs';




console.log(process.argv)

// Defines the Stack
export class MyLambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string) {
        super(scope, id, { description: "irgendwas was 10 zeichen hat"});

        // Add a Lambda-Function to the stack
        const lambdaFunction = new cdk.aws_lambda.Function(this, 'MyLambdaFunction', {
            runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,
            description: "My lambda function to deploy something",
            environment: {

            }
            // handler: 'handler.handler',
            // code: cdk.aws_lambda.Code.fromAsset('src')
        });
        cdk.Tags.of(lambdaFunction).add("runtime:insecureReason", "Legacy system")
        cdk.Tags.of(lambdaFunction).add("insecure", "false")
    }
}

const app = new cdk.App();
new MyLambdaStack(app, 'MyLambdaStack');
app.synth();
