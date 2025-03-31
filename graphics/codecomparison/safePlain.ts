import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
export class LambdaCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const signingProfile = new cdk.aws_signer.SigningProfile(
      this,
      "SigningProfile",
      {
        platform: cdk.aws_signer.Platform.AWS_LAMBDA_SHA384_ECDSA,
        signatureValidity: cdk.Duration.days(365),
      }
    );
    const codeSigningConfig = new cdk.aws_lambda.CodeSigningConfig(
      this,
      "CodeSigningConfig",
      {
        signingProfiles: [signingProfile],
        description: "CodeSigningConfig for HelloLambda",
      }
    );
    const lambdaFunction = new cdk.aws_lambda.Function(this, "HelloLambda", {
      codeSigningConfig: codeSigningConfig,
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      handler: "hello.handler",
      code: cdk.aws_lambda.Code.fromAsset("lambda"),
      allowAllIpv6Outbound: false,
      allowAllOutbound: false,
      allowPublicSubnet: false,
      applicationLogLevel: undefined,
      applicationLogLevelV2: cdk.aws_lambda.ApplicationLogLevel.DEBUG,
      currentVersionOptions: undefined,
      deadLetterQueue: undefined,
      deadLetterQueueEnabled: false,
      deadLetterTopic: undefined,
      description: "Description about HelloLambda",
      environmentEncryption: undefined,
      ephemeralStorageSize: cdk.Size.mebibytes(512),
      events: [],
      filesystem: undefined,
      functionName: "HelloLambda",
      initialPolicy: [],
      insightsVersion: cdk.aws_lambda.LambdaInsightsVersion.VERSION_1_0_119_0,
      ipv6AllowedForDualStack: false,
      layers: [],
      logFormat: cdk.aws_lambda.LogFormat.JSON,
      logGroup: undefined,
      logRetention: cdk.aws_logs.RetentionDays.THREE_MONTHS,
      logRetentionRole: undefined,
      logRetentionRetryOptions: undefined,
      loggingFormat: cdk.aws_lambda.LoggingFormat.JSON,
      maxEventAge: undefined,
      memorySize: 128,
      onFailure: undefined,
      onSuccess: undefined,
      paramsAndSecrets: undefined,
      profiling: true,
      profilingGroup: undefined,
      recursiveLoop: cdk.aws_lambda.RecursiveLoop.TERMINATE,
      reservedConcurrentExecutions: undefined,
      runtimeManagementMode: cdk.aws_lambda.RuntimeManagementMode.AUTO,
      securityGroups: [],
      snapStart: undefined,
      systemLogLevel: undefined,
      systemLogLevelV2: cdk.aws_lambda.SystemLogLevel.DEBUG,
      timeout: cdk.Duration.seconds(3),
      tracing: cdk.aws_lambda.Tracing.PASS_THROUGH,
      vpc: VPCStack.vpc,
      vpcSubnets: VPCStack.vpc.vpcSubnets,
    });
    const alarmTopic = new cdk.aws_sns.Topic(scope, "AlarmTopic", {
      displayName: "AlarmTopicForLambdaErrors",
    });
    alarmTopic.addSubscription(
      new cdk.aws_sns_subscriptions.EmailSubscription("max.Mustermann")
    );
    const internalServerErrorFilter = lambdaFunction.logGroup.addMetricFilter(
      "InternalServerErrorFilter",
      {
        filterPattern: cdk.aws_logs.FilterPattern.literal(
          "{ $.statusCode = 500  }"
        ),
        metricName: "InternalServerError",
        metricNamespace: lambdaFunction.functionName,
      }
    );

    new cdk.aws_cloudwatch.Alarm(scope, "InternalServerErrorAlarm", {
      alarmName: "InternalServerErrorAlarm",
      alarmDescription: "Internal Server Error",
      metric: internalServerErrorFilter.metric({
        period: cdk.Duration.hours(1),
        statistic: "Sum",
      }),
      threshold: 1,
      comparisonOperator:
        cdk.aws_cloudwatch.ComparisonOperator
          .GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: 1,
      treatMissingData: cdk.aws_cloudwatch.TreatMissingData.NOT_BREACHING,
    });

    const unsecureRESTRequestFilter = lambdaFunction.logGroup.addMetricFilter(
      "UnsecureRESTRequestFilter",
      {
        filterPattern: cdk.aws_logs.FilterPattern.literal(
          "{ $.statusCode >= 400 && $.statusCode < 500   }"
        ),
        metricName: "UnsecureRESTRequestFilter",
        metricNamespace: lambdaFunction.functionName,
      }
    );

    new cdk.aws_cloudwatch.Alarm(scope, "UnsecureRESTRequestAlarm", {
      alarmName: "UnsecureRESTRequestAlarm",
      alarmDescription: "Unsecure REST Requests",
      metric: unsecureRESTRequestFilter.metric({
        period: cdk.Duration.hours(1),
        statistic: "Sum",
      }),
      threshold: 1,
      comparisonOperator:
        cdk.aws_cloudwatch.ComparisonOperator
          .GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: 1,
      treatMissingData: cdk.aws_cloudwatch.TreatMissingData.NOT_BREACHING,
    });
    const timeoutMetricFilter = lambdaFunction.logGroup.addMetricFilter(
      "TimeoutMetricFilter",
      {
        filterPattern: cdk.aws_logs.FilterPattern.literal('"Task timed out"'),
        metricName: "LambdaTimeouts",
        metricNamespace: "MyLambdaMetrics", // Wähle hier einen sinnvollen Namensraum
      }
    );
    new cdk.aws_cloudwatch.Alarm(scope, "LambdaTimeoutAlarm", {
      alarmName: "LambdaTimeoutAlarm",
      alarmDescription: "Timeout Alarm",
      metric: timeoutMetricFilter.metric({
        period: cdk.Duration.minutes(5), // Aggregiert über 5 Minuten; kann angepasst werden
        statistic: "Sum",
      }),
      threshold: 1, // Alarm, wenn mindestens ein Timeout in der Periode auftritt
      evaluationPeriods: 1,
      comparisonOperator:
        cdk.aws_cloudwatch.ComparisonOperator
          .GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      treatMissingData: cdk.aws_cloudwatch.TreatMissingData.NOT_BREACHING,
    });
    const cert = cdk.aws_certificatemanager.Certificate.fromCertificateArn(
      this,
      "MyCert",
      "arn:aws:acm:eu-central-1:123456789012:certificate/abc-..."
    );
    const api = new cdk.aws_apigateway.RestApi(this, "SecureApi", {
      restApiName: "SecureApi",
      description: "HTTPS API mit Lambda Authorizer",
      endpointConfiguration: {
        types: [cdk.aws_apigateway.EndpointType.REGIONAL],
      },
      defaultCorsPreflightOptions: {
        allowOrigins: cdk.aws_apigateway.Cors.ALL_ORIGINS,
        allowMethods: cdk.aws_apigateway.Cors.ALL_METHODS,
      },
      domainName: {
        domainName: "api.mycompany.com",
        certificate: cert,
      },
    });
    const resource = api.root.addResource("secure-endpoint");
    resource.addMethod(
      "GET",
      new cdk.aws_apigateway.LambdaIntegration(lambdaFunction),
      {
        authorizer: AuthorizerStack.lambdaAuthorizer,
        authorizationType: cdk.aws_apigateway.AuthorizationType.CUSTOM,
      }
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
export class VPCStack extends cdk.Stack {
  public static vpc: cdk.aws_ec2.Vpc;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    VPCStack.vpc = new cdk.aws_ec2.Vpc(this, "MyVpc", {
      maxAzs: 2,
      natGateways: 1,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: "PrivateSubnet",
          subnetType: cdk.aws_ec2.SubnetType.PRIVATE_WITH_EGRESS,
        },
        {
          cidrMask: 24,
          name: "IsolatedSubnet",
          subnetType: cdk.aws_ec2.SubnetType.PRIVATE_ISOLATED,
        },
      ],
      enableDnsHostnames: false,
      enableDnsSupport: true,
    });
  }
}
export class AuthorizerStack extends cdk.Stack {
  public static authorizerFn: cdk.aws_lambda.IFunction;
  public static authorizerFnArn: string;
  public static lambdaAuthorizer: any;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    AuthorizerStack.authorizerFn = new cdk.aws_lambda.Function(
      this,
      "AuthorizerLambda",
      {
        runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
        code: cdk.aws_lambda.Code.fromAsset("src"),
        handler: "index.handler",
      }
    );
    AuthorizerStack.authorizerFnArn = AuthorizerStack.authorizerFn.functionArn;
    AuthorizerStack.lambdaAuthorizer = new cdk.aws_apigateway.TokenAuthorizer(
      this,
      "LambdaAuthorizer",
      {
        handler: AuthorizerStack.authorizerFn,
        identitySource: "method.request.header.Authorization",
      }
    );
  }
}
export class ConfigStack extends cdk.Stack {
  public readonly configFn: cdk.aws_lambda.IFunction;
  public readonly configFnArn: string;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    this.configFn = new cdk.aws_lambda.Function(this, "ConfigLambda", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      code: cdk.aws_lambda.Code.fromAsset("src"),
      handler: "index.handler",
    });
    this.configFnArn = this.configFn.functionArn;
    new cdk.CfnOutput(this, "ConfigFnArn", {
      value: this.configFn.functionArn,
      exportName: "ConfigFnArn",
    });
    new cdk.aws_config.CustomRule(this, "ValidateInstalledRessources", {
      configRuleName: "validate-installed-ressources",
      lambdaFunction: this.configFn,
      configurationChanges: true,
      periodic: true,
      maximumExecutionFrequency:
        cdk.aws_config.MaximumExecutionFrequency.TWENTY_FOUR_HOURS,
      ruleScope: cdk.aws_config.RuleScope.fromResources([
        cdk.aws_config.ResourceType.LAMBDA_FUNCTION,
        cdk.aws_config.ResourceType.IAM_ROLE,
      ]),
    });
    new cdk.aws_config.CustomRule(this, "CheckFrameworkVersion", {
      configRuleName: "check-framework-version",
      lambdaFunction: this.configFn,
      periodic: true,
      maximumExecutionFrequency:
        cdk.aws_config.MaximumExecutionFrequency.TWENTY_FOUR_HOURS,
      ruleScope: cdk.aws_config.RuleScope.fromResources([
        cdk.aws_config.ResourceType.LAMBDA_FUNCTION,
        cdk.aws_config.ResourceType.IAM_ROLE,
      ]),
    });
    new cdk.aws_config.ManagedRule(this, "StackDriftCheckRule", {
      configRuleName: "cloudformation-stack-drift-detection-check",
      identifier:
        cdk.aws_config.ManagedRuleIdentifiers
          .CLOUDFORMATION_STACK_DRIFT_DETECTION_CHECK,
      ruleScope: cdk.aws_config.RuleScope.fromResources([
        cdk.aws_config.ResourceType.CLOUDFORMATION_STACK,
      ]),
    });
    new cdk.aws_config.CustomRule(this, "RiskManagementRule", {
      configRuleName: "risk-management-rule",
      lambdaFunction: this.configFn,
      periodic: true,
      maximumExecutionFrequency:
        cdk.aws_config.MaximumExecutionFrequency.TWENTY_FOUR_HOURS,
      ruleScope: cdk.aws_config.RuleScope.fromResources([
        cdk.aws_config.ResourceType.LAMBDA_FUNCTION,
      ]),
    });
  }
}
const app = new cdk.App();
new LambdaCdkStack(app, "LambdaCdkStack");
new AuthorizerStack(app, "AuthorizerStack");
new ConfigStack(app, "ConfigStack");
new VPCStack(app, "VPCStack");