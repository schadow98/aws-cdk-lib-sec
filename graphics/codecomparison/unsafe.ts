import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
export class LambdaCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const lambdaFunction = new cdk.aws_lambda.Function(this, "HelloLambda", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      handler: "hello.handler",
      code: cdk.aws_lambda.Code.fromAsset("lambda"),
    });
    const apiGateway = new cdk.aws_apigateway.RestApi(this, "MyApiGateway", {
      description: "API Gateway default secured",
    });
    const pingRessource = apiGateway.root.addResource("ping");
    pingRessource.addMethod(
      "GET",
      new cdk.aws_apigateway.LambdaIntegration(lambdaFunction)
    );
  }
}
const app = new cdk.App();
new LambdaCdkStack(app, 'LambdaCdkStack');