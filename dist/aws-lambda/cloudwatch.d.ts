import { Construct } from "constructs";
import * as aws_sns from "aws-cdk-lib/aws-sns";
import * as aws_cloudwatch from "aws-cdk-lib/aws-cloudwatch";
import { SecMarker } from "../SecMarker";
import * as aws_subs from 'aws-cdk-lib/aws-sns-subscriptions';
/**
 * Adds default CloudWatch metrics and alarms for a given Lambda function.
 *
 * This function sets up monitoring for the specified Lambda by creating
 * commonly used metrics and alarms (e.g. errors, duration, throttles).
 *
 * @param scope - The CDK construct scope in which the resources are defined.
 * @param lambdaId - The identifier of the Lambda function to monitor.
 */
export declare function addCloudwatchMetricsAndAlarms(scope: Construct, lambdaId: string): void;
/**
 * Custom SNS Topic that extends the default `aws_sns.Topic` construct.
 *
 * This class can be used to apply standardized security settings or tagging for SNS topics.
 * The static `SecMarker` property is used to mark the topic for security-related processing.
 */
export declare class Topic extends aws_sns.Topic {
    static [SecMarker]: boolean;
}
/**
 * Custom CloudWatch Alarm that extends the default `aws_cloudwatch.Alarm` construct.
 *
 * This class allows for standardized alarm configurations and tagging.
 * The static `SecMarker` property marks the alarm for security-related identification or processing.
 */
export declare class Alarm extends aws_cloudwatch.Alarm {
    static [SecMarker]: boolean;
}
/**
 * Custom SNS email subscription that extends the default `aws_subs.EmailSubscription` construct.
 *
 * This class enables standardized configuration or tagging of email subscriptions.
 * The static `SecMarker` property marks the subscription for security-related identification or processing.
 */
export declare class EmailSubscription extends aws_subs.EmailSubscription {
    static [SecMarker]: boolean;
}
