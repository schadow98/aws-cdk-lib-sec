import { Construct } from "constructs";
import * as aws_config from "../aws-config";
import * as aws_lambda from "aws-cdk-lib/aws-lambda";
import { SecMarker } from "../SecMarker";
import fs from "fs";
import path from "path";
import logger from "../../tools/logger";
import * as aws_sns from "aws-cdk-lib/aws-sns";
import * as aws_cloudwatch from "aws-cdk-lib/aws-cloudwatch";
import * as aws_subs from "aws-cdk-lib/aws-sns-subscriptions";
import * as events from "aws-cdk-lib/aws-events";
import * as targets from "aws-cdk-lib/aws-events-targets";
import { TagManager } from "aws-cdk-lib";
/**
 * Adds AWS Config rules to the provided CDK stack.
 *
 * This function sets up compliance rules to evaluate resource configurations
 * and ensure they align with organizational security and governance policies.
 *
 * @param stack - The CDK construct in which the AWS Config rules will be defined.
 */

export function addConfigRules(stack: Construct) {
  logger.debug("addConfigRules");

  logger.info("add lambdaFuntction complianceFunction");
  const complianceFunction = new SecConfigLambdaFunction(
    stack,
    "ConfigLambda",
    {
      runtime: aws_lambda.Runtime.NODEJS_18_X,
      code: aws_lambda.Code.fromInline(
        fs.readFileSync(
          path.join(
            path.dirname(__filename),
            "../aws-default-stacks/authorizeCode.ts"
          ),
          { encoding: "utf8", flag: "r" }
        )
      ),
      handler: "index.handler",
    }
  );

  logger.info("adding validateInstalledRessourcesRule");
  new aws_config.CustomRule(stack, "ValidateInstalledRessources", {
    configRuleName: "validate-installed-ressources",
    lambdaFunction: complianceFunction,
    configurationChanges: true,
    periodic: true, // falls du die Regel zeitlich periodisch laufen lassen möchtest, setze das auf true
    maximumExecutionFrequency:
      aws_config.MaximumExecutionFrequency.TWENTY_FOUR_HOURS, // nur relevant, wenn periodic = true
    ruleScope: aws_config.RuleScope.fromResources([
      aws_config.ResourceType.LAMBDA_FUNCTION,
      aws_config.ResourceType.IAM_ROLE,
    ]),
  });

  logger.info("adding checkFrameworkVersionRule");
  new aws_config.CustomRule(stack, "CheckFrameworkVersion", {
    configRuleName: "check-framework-version",
    lambdaFunction: complianceFunction,
    periodic: true, // falls du die Regel zeitlich periodisch laufen lassen möchtest, setze das auf true
    maximumExecutionFrequency:
      aws_config.MaximumExecutionFrequency.TWENTY_FOUR_HOURS, // nur relevant, wenn periodic = true
    ruleScope: aws_config.RuleScope.fromResources([
      aws_config.ResourceType.LAMBDA_FUNCTION,
      aws_config.ResourceType.IAM_ROLE,
    ]),
  });

  logger.info("adding driftDetectionRule");
  new aws_config.ManagedRule(stack, "StackDriftCheckRule", {
    configRuleName: "cloudformation-stack-drift-detection-check",
    identifier:
      aws_config.ManagedRuleIdentifiers
        .CLOUDFORMATION_STACK_DRIFT_DETECTION_CHECK,

    ruleScope: aws_config.RuleScope.fromResources([
      aws_config.ResourceType.CLOUDFORMATION_STACK,
    ]),
  });

  logger.debug("adding riskManagementRule");
  new aws_config.CustomRule(stack, "RiskManagementRule", {
    configRuleName: "risk-management-rule",
    lambdaFunction: complianceFunction,
    periodic: true, // falls du die Regel zeitlich periodisch laufen lassen möchtest, setze das auf true
    maximumExecutionFrequency:
      aws_config.MaximumExecutionFrequency.TWENTY_FOUR_HOURS, // nur relevant, wenn periodic = true
    ruleScope: aws_config.RuleScope.fromResources([
      aws_config.ResourceType.LAMBDA_FUNCTION,
    ]),
  });

  const topic = new Topic(stack, "ConfigAlertsTopic", {
    displayName: "AWS Config Alerts Topic",
  });

    const tags = TagManager.of(stack)?.renderTags();
    const contact:any = {}
    for (const elem of tags) {
      contact[elem.Key] = elem.Value;
    }

  // 3. Optional: E-Mail-Abo hinzufügen
  topic.addSubscription(
    new EmailSubscription(contact["operationTeam"]) // Ersetze mit deiner E-Mail
  );

  // 4. EventBridge Rule bei NON_COMPLIANT Event
  new Rule(stack, "ConfigNonCompliantRule", {
    eventPattern: {
      source: ["aws.config"],
      detailType: ["Config Rules Compliance Change"],
      detail: {
        configRuleName: [
          "cloudformation-stack-drift-detection-check",
          "check-framework-version",
        ],
        newEvaluationResult: {
          complianceType: ["NON_COMPLIANT"],
        },
      },
    },
    targets: [new SnsTopic(topic)],
  });
  logger.info("adding rule alarms for " + contact["operationTeam"]);
}

class SecConfigLambdaFunction extends aws_lambda.Function {
  static [SecMarker] = true;
}

/**
 * Custom SNS Topic that extends the default `aws_sns.Topic` construct.
 *
 * This class can be used to apply standardized security settings or tagging for SNS topics.
 * The static `SecMarker` property is used to mark the topic for security-related processing.
 */
export class Topic extends aws_sns.Topic {
  static [SecMarker] = true;
}

/**
 * Custom CloudWatch Alarm that extends the default `aws_cloudwatch.Alarm` construct.
 *
 * This class allows for standardized alarm configurations and tagging.
 * The static `SecMarker` property marks the alarm for security-related identification or processing.
 */

export class Alarm extends aws_cloudwatch.Alarm {
  static [SecMarker] = true;
}

/**
 * Custom SNS email subscription that extends the default `aws_subs.EmailSubscription` construct.
 *
 * This class enables standardized configuration or tagging of email subscriptions.
 * The static `SecMarker` property marks the subscription for security-related identification or processing.
 */
export class EmailSubscription extends aws_subs.EmailSubscription {
  static [SecMarker] = true;
}

/**
 * Rule that extends the default `events.Rule` construct.
 *
 * This class enables standardized configuration or tagging of email subscriptions.
 * The static `SecMarker` property marks the subscription for security-related identification or processing.
 */
export class Rule extends events.Rule {
  static [SecMarker] = true;
}

/**
 * SnsTopic that extends the default `events.Rule` construct.
 *
 * This class enables standardized configuration or tagging of email subscriptions.
 * The static `SecMarker` property marks the subscription for security-related identification or processing.
 */
export class SnsTopic extends targets.SnsTopic {
  static [SecMarker] = true;
}
