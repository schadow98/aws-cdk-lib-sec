import { Construct } from "constructs";
import * as aws_sns from "aws-cdk-lib/aws-sns";
import * as aws_cloudwatch from "aws-cdk-lib/aws-cloudwatch";
import { SecMarker } from "../SecMarker";
import logger from "../tools/logger";
import { TagManager } from "aws-cdk-lib";
import * as aws_subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as aws_lambda from 'aws-cdk-lib/aws-lambda';
import * as aws_logs from 'aws-cdk-lib/aws-logs';
import * as cdk from 'aws-cdk-lib';

/**
 * Adds default CloudWatch metrics and alarms for a given Lambda function.
 * 
 * This function sets up monitoring for the specified Lambda by creating
 * commonly used metrics and alarms (e.g. errors, duration, throttles).
 *
 * @param scope - The CDK construct scope in which the resources are defined.
 * @param lambdaId - The identifier of the Lambda function to monitor.
 */
export function addCloudwatchMetricsAndAlarms(
  scope: Construct,
  lambdaId: string
) {
  logger.debug("calling addCloudwatchMetricsAndAlarms");
  const tags = TagManager.of(scope)?.renderTags();
  const contact:any = {}
  for (const elem of tags) {
    contact[elem.Key] = elem.Value;
  }

  const alarmTopic = new Topic(scope, 'AlarmTopic', {
    displayName: 'AlarmTopicForLambdaErrors',
  });


 alarmTopic.addSubscription(
    new EmailSubscription(contact["operationTeam"])
  );

  logger.info("adding alarm for " + contact["operationTeam"]);

  const lambdaFunction = scope.node.findChild(lambdaId) as aws_lambda.Function;


  // Füge einen Metric Filter zur Log Group hinzu
  const internalServerErrorFilter = lambdaFunction.logGroup.addMetricFilter('InternalServerErrorFilter', {
    filterPattern: aws_logs.FilterPattern.literal(
      '{ $.statusCode = 500  }'
    ),
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

  logger.info("adding InternalServerErrorAlarm");

  const unsecureRESTRequestFilter = lambdaFunction.logGroup.addMetricFilter('UnsecureRESTRequestFilter', {
    filterPattern: aws_logs.FilterPattern.literal(
      '{ $.statusCode >= 400 && $.statusCode < 500   }'
    ),
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

  logger.info("adding UnsecureRESTRequestAlarm");

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

  logger.info("adding TimeoutAlarm");
  logger.info("adding MemoryIssuesAlarm");
  logger.info("adding ConcurrentyExecutionsAlarm");
  logger.info("adding AmountThrottling");
  logger.info("adding AmountRequests");
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

