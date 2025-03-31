import * as cdk from "../../src/aws-cdk-lib-sec";
import { Construct } from "constructs";
export class LambdaCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id, {
      description: "LambdaCdkStack für linecouting",
      contact: {
        developerTeam: "developerTeam@domain.com",
        operationTeam: "operationTeam@domain.com",
        privacyManager: "privacyManager@domain.com",
        securityManager: "securityManager@domain.com",
      },
    });
    const apiGateway = new cdk.aws_apigateway.RestApi(this, "MyApiGateway", {
      description: "API Gateway default secured",
    });
    const lambdaFunction = new cdk.aws_lambda.Function(
      this,
      "MyLambdaFunction",
      {
        runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,
        description: "My lambda function to deploy something",
      }
    );
    const pingRessource = apiGateway.root.addResource("ping");
    pingRessource.addMethod(
      "GET",
      new cdk.aws_apigateway.LambdaIntegration(lambdaFunction)
    );
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
new LambdaCdkStack(app, 'LambdaCdkStack');