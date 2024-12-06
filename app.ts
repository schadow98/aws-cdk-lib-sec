// my-stack.ts
// npx ts-node app.ts && cdk synth
import * as cdk from './src/aws-cdk-lib-sec';
import { Construct } from 'constructs';



// export class MyLambdaStack extends Stack {
//     constructor(scope: Construct, id: string) {
//         super(scope, id);
// 
//         // Lambda-Funktion hinzufügen
//         new Function(this, 'MyLambdaFunction', {
//             runtime: cdk.aws_lambda.Runtime.NODEJS_14_X,
//             handler: 'index.handler',
//             code: cdk.aws_lambda.Code.fromAsset('lambda'), 
// 
//         });
//     }
// }


// Defines the Stack
export class MyLambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        // Add a Lambda-Function to the stack
        const lambdaFunction = new cdk.aws_lambda.Function(this, 'MyLambdaFunction', {
            runtime: cdk.aws_lambda.Runtime.NODEJS_12_X,
            description: "My lambda function to deploy something",
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
