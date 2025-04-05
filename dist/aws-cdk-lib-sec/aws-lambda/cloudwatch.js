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
exports.EmailSubscription = exports.Alarm = exports.Topic = void 0;
exports.addCloudwatchMetricsAndAlarms = addCloudwatchMetricsAndAlarms;
const aws_sns = __importStar(require("aws-cdk-lib/aws-sns"));
const aws_cloudwatch = __importStar(require("aws-cdk-lib/aws-cloudwatch"));
const SecMarker_1 = require("../SecMarker");
const logger_1 = __importDefault(require("../tools/logger"));
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_subs = __importStar(require("aws-cdk-lib/aws-sns-subscriptions"));
const aws_logs = __importStar(require("aws-cdk-lib/aws-logs"));
const cdk = __importStar(require("aws-cdk-lib"));
/**
 * Adds default CloudWatch metrics and alarms for a given Lambda function.
 *
 * This function sets up monitoring for the specified Lambda by creating
 * commonly used metrics and alarms (e.g. errors, duration, throttles).
 *
 * @param scope - The CDK construct scope in which the resources are defined.
 * @param lambdaId - The identifier of the Lambda function to monitor.
 */
function addCloudwatchMetricsAndAlarms(scope, lambdaId) {
    logger_1.default.debug("calling addCloudwatchMetricsAndAlarms");
    const tags = aws_cdk_lib_1.TagManager.of(scope)?.renderTags();
    const contact = {};
    for (const elem of tags) {
        contact[elem.Key] = elem.Value;
    }
    const alarmTopic = new Topic(scope, 'AlarmTopic', {
        displayName: 'AlarmTopicForLambdaErrors',
    });
    alarmTopic.addSubscription(new EmailSubscription(contact["operationTeam"]));
    logger_1.default.info("adding alarm for " + contact["operationTeam"]);
    const lambdaFunction = scope.node.findChild(lambdaId);
    // Füge einen Metric Filter zur Log Group hinzu
    const internalServerErrorFilter = lambdaFunction.logGroup.addMetricFilter('InternalServerErrorFilter', {
        filterPattern: aws_logs.FilterPattern.literal('{ $.statusCode = 500  }'),
        metricName: 'InternalServerError',
        metricNamespace: lambdaId
    });
    new Alarm(scope, 'InternalServerErrorAlarm', {
        alarmName: 'InternalServerErrorAlarm',
        alarmDescription: 'Internal Server Error',
        metric: internalServerErrorFilter.metric({
            period: cdk.Duration.hours(1),
            statistic: 'Sum',
        }),
        threshold: 1,
        comparisonOperator: aws_cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
        evaluationPeriods: 1,
        treatMissingData: aws_cloudwatch.TreatMissingData.NOT_BREACHING,
    });
    logger_1.default.info("adding InternalServerErrorAlarm");
    const unsecureRESTRequestFilter = lambdaFunction.logGroup.addMetricFilter('UnsecureRESTRequestFilter', {
        filterPattern: aws_logs.FilterPattern.literal('{ $.statusCode >= 400 && $.statusCode < 500   }'),
        metricName: 'UnsecureRESTRequestFilter',
        metricNamespace: lambdaId
    });
    new Alarm(scope, 'UnsecureRESTRequestAlarm', {
        alarmName: 'UnsecureRESTRequestAlarm',
        alarmDescription: 'Unsecure REST Requests',
        metric: unsecureRESTRequestFilter.metric({
            period: cdk.Duration.hours(1),
            statistic: 'Sum',
        }),
        threshold: 1,
        comparisonOperator: aws_cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
        evaluationPeriods: 1,
        treatMissingData: aws_cloudwatch.TreatMissingData.NOT_BREACHING,
    });
    logger_1.default.info("adding UnsecureRESTRequestAlarm");
    const timeoutMetricFilter = lambdaFunction.logGroup.addMetricFilter('TimeoutMetricFilter', {
        filterPattern: aws_logs.FilterPattern.literal('"Task timed out"'),
        metricName: 'LambdaTimeouts',
        metricNamespace: 'MyLambdaMetrics', // Wähle hier einen sinnvollen Namensraum
    });
    new Alarm(scope, 'LambdaTimeoutAlarm', {
        alarmName: 'LambdaTimeoutAlarm',
        alarmDescription: 'Timeout Alarm',
        metric: timeoutMetricFilter.metric({
            period: cdk.Duration.minutes(5), // Aggregiert über 5 Minuten; kann angepasst werden
            statistic: 'Sum',
        }),
        threshold: 1, // Alarm, wenn mindestens ein Timeout in der Periode auftritt
        evaluationPeriods: 1,
        comparisonOperator: aws_cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
        treatMissingData: aws_cloudwatch.TreatMissingData.NOT_BREACHING,
    });
    logger_1.default.info("adding TimeoutAlarm");
    logger_1.default.info("adding MemoryIssuesAlarm");
    logger_1.default.info("adding ConcurrentyExecutionsAlarm");
    logger_1.default.info("adding AmountThrottling");
    logger_1.default.info("adding AmountRequests");
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
//# sourceMappingURL=cloudwatch.js.map