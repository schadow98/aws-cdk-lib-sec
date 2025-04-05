"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnsTopic = exports.Rule = exports.EmailSubscription = exports.Alarm = exports.Topic = void 0;
exports.addConfigRules = addConfigRules;
const aws_config = __importStar(require("../aws-config"));
const aws_lambda = __importStar(require("aws-cdk-lib/aws-lambda"));
const SecMarker_1 = require("../SecMarker");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("../tools/logger"));
const aws_sns = __importStar(require("aws-cdk-lib/aws-sns"));
const aws_cloudwatch = __importStar(require("aws-cdk-lib/aws-cloudwatch"));
const aws_subs = __importStar(require("aws-cdk-lib/aws-sns-subscriptions"));
const events = __importStar(require("aws-cdk-lib/aws-events"));
const targets = __importStar(require("aws-cdk-lib/aws-events-targets"));
const aws_cdk_lib_1 = require("aws-cdk-lib");
/**
 * Adds AWS Config rules to the provided CDK stack.
 *
 * This function sets up compliance rules to evaluate resource configurations
 * and ensure they align with organizational security and governance policies.
 *
 * @param stack - The CDK construct in which the AWS Config rules will be defined.
 */
function addConfigRules(stack) {
    logger_1.default.debug("addConfigRules");
    logger_1.default.info("add lambdaFuntction complianceFunction");
    const complianceFunction = new SecConfigLambdaFunction(stack, "ConfigLambda", {
        runtime: aws_lambda.Runtime.NODEJS_18_X,
        code: aws_lambda.Code.fromInline(fs_1.default.readFileSync(path_1.default.join(path_1.default.dirname(__filename), "../aws-default-stacks/authorizeCode.ts"), { encoding: "utf8", flag: "r" })),
        handler: "index.handler",
    });
    logger_1.default.info("adding validateInstalledRessourcesRule");
    new aws_config.CustomRule(stack, "ValidateInstalledRessources", {
        configRuleName: "validate-installed-ressources",
        lambdaFunction: complianceFunction,
        configurationChanges: true,
        periodic: true, // falls du die Regel zeitlich periodisch laufen lassen möchtest, setze das auf true
        maximumExecutionFrequency: aws_config.MaximumExecutionFrequency.TWENTY_FOUR_HOURS, // nur relevant, wenn periodic = true
        ruleScope: aws_config.RuleScope.fromResources([
            aws_config.ResourceType.LAMBDA_FUNCTION,
            aws_config.ResourceType.IAM_ROLE,
        ]),
    });
    logger_1.default.info("adding checkFrameworkVersionRule");
    new aws_config.CustomRule(stack, "CheckFrameworkVersion", {
        configRuleName: "check-framework-version",
        lambdaFunction: complianceFunction,
        periodic: true, // falls du die Regel zeitlich periodisch laufen lassen möchtest, setze das auf true
        maximumExecutionFrequency: aws_config.MaximumExecutionFrequency.TWENTY_FOUR_HOURS, // nur relevant, wenn periodic = true
        ruleScope: aws_config.RuleScope.fromResources([
            aws_config.ResourceType.LAMBDA_FUNCTION,
            aws_config.ResourceType.IAM_ROLE,
        ]),
    });
    logger_1.default.info("adding driftDetectionRule");
    new aws_config.ManagedRule(stack, "StackDriftCheckRule", {
        configRuleName: "cloudformation-stack-drift-detection-check",
        identifier: aws_config.ManagedRuleIdentifiers
            .CLOUDFORMATION_STACK_DRIFT_DETECTION_CHECK,
        ruleScope: aws_config.RuleScope.fromResources([
            aws_config.ResourceType.CLOUDFORMATION_STACK,
        ]),
    });
    logger_1.default.debug("adding riskManagementRule");
    new aws_config.CustomRule(stack, "RiskManagementRule", {
        configRuleName: "risk-management-rule",
        lambdaFunction: complianceFunction,
        periodic: true, // falls du die Regel zeitlich periodisch laufen lassen möchtest, setze das auf true
        maximumExecutionFrequency: aws_config.MaximumExecutionFrequency.TWENTY_FOUR_HOURS, // nur relevant, wenn periodic = true
        ruleScope: aws_config.RuleScope.fromResources([
            aws_config.ResourceType.LAMBDA_FUNCTION,
        ]),
    });
    const topic = new Topic(stack, "ConfigAlertsTopic", {
        displayName: "AWS Config Alerts Topic",
    });
    const tags = aws_cdk_lib_1.TagManager.of(stack)?.renderTags();
    const contact = {};
    for (const elem of tags) {
        contact[elem.Key] = elem.Value;
    }
    // 3. Optional: E-Mail-Abo hinzufügen
    topic.addSubscription(new EmailSubscription(contact["operationTeam"]) // Ersetze mit deiner E-Mail
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
    logger_1.default.info("adding rule alarms for " + contact["operationTeam"]);
}
class SecConfigLambdaFunction extends aws_lambda.Function {
    static [SecMarker_1.SecMarker] = true;
}
/**
 * Custom SNS Topic that extends the default `aws_sns.Topic` construct.
 *
 * This class can be used to apply standardized security settings or tagging for SNS topics.
 * The static `SecMarker` property is used to mark the topic for security-related processing.
 */
class Topic extends aws_sns.Topic {
    static [SecMarker_1.SecMarker] = true;
}
exports.Topic = Topic;
/**
 * Custom CloudWatch Alarm that extends the default `aws_cloudwatch.Alarm` construct.
 *
 * This class allows for standardized alarm configurations and tagging.
 * The static `SecMarker` property marks the alarm for security-related identification or processing.
 */
class Alarm extends aws_cloudwatch.Alarm {
    static [SecMarker_1.SecMarker] = true;
}
exports.Alarm = Alarm;
/**
 * Custom SNS email subscription that extends the default `aws_subs.EmailSubscription` construct.
 *
 * This class enables standardized configuration or tagging of email subscriptions.
 * The static `SecMarker` property marks the subscription for security-related identification or processing.
 */
class EmailSubscription extends aws_subs.EmailSubscription {
    static [SecMarker_1.SecMarker] = true;
}
exports.EmailSubscription = EmailSubscription;
/**
 * Rule that extends the default `events.Rule` construct.
 *
 * This class enables standardized configuration or tagging of email subscriptions.
 * The static `SecMarker` property marks the subscription for security-related identification or processing.
 */
class Rule extends events.Rule {
    static [SecMarker_1.SecMarker] = true;
}
exports.Rule = Rule;
/**
 * SnsTopic that extends the default `events.Rule` construct.
 *
 * This class enables standardized configuration or tagging of email subscriptions.
 * The static `SecMarker` property marks the subscription for security-related identification or processing.
 */
class SnsTopic extends targets.SnsTopic {
    static [SecMarker_1.SecMarker] = true;
}
exports.SnsTopic = SnsTopic;
//# sourceMappingURL=configRules.js.map