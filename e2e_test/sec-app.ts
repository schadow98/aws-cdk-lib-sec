#!/usr/bin/env node
import * as cdk from "aws-cdk-lib-sec";
import { Construct } from "constructs";


export class MyCdkAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    // Lambda-Funktion erstellen
    const lambdaFunction = new cdk.aws_lambda.Function(this, "MyLambdaFunction", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,
      description: "Secured Lambda for e2e test",
    });

    const apiGateway = new cdk.aws_apigateway.RestApi(this, "MyApiGateway", {
      description: "API Gateway default secured",
    });
    const pingRessource = apiGateway.root.addResource("ping");
    pingRessource.addMethod(
      "GET",
      new cdk.aws_apigateway.LambdaIntegration(lambdaFunction)
    );

    cdk.Tags.of(lambdaFunction).add("runtime:insecureReason", "Legacy system");
    cdk.Tags.of(lambdaFunction).add("insecure", "false");

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
new MyCdkAppStack(app, "MyCdkAppStack", {
  description: "Secure Stack for E2E-Test",
  contact: {
    developerTeam: "developerTeam@domain.com",
    operationTeam: "operationTeam@domain.com",
    privacyManager: "privacyManager@domain.com",
    securityManager: "securityManager@domain.com",
  },
});

