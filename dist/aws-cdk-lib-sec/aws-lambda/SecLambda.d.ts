import * as Lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { FunctionProps } from "./SecFunctionProps";
import { SecMarker } from "../SecMarker";
/**
 * Secure wrapper around the AWS CDK `Lambda.Function` construct.
 *
 * This class applies secure defaults, centralized logging, monitoring, and
 * validation logic to standardize Lambda function deployment across environments.
 *
 * Features include:
 * - Secure defaults for handler and code
 * - Automatic log retention configuration
 * - Built-in CloudWatch metrics and alarms
 * - Centralized configuration error tracking
 *
 * @extends Lambda.Function
 */
export declare class Function extends Lambda.Function {
    static [SecMarker]: boolean;
    _logRetention: any;
    constructor(scope: Construct, id: string, props: FunctionProps);
}
/**
 * Handles secure log retention configuration for AWS Lambda functions.
 *
 * This class encapsulates logic for enforcing log retention policies
 * that align with security and compliance requirements.
 *
 * Can be extended to apply tagging, IAM roles, or custom retention behavior.
 */
export declare class SecLogRetention {
    static [SecMarker]: boolean;
    logGroupArn: any;
    ensureSingletonLogRetentionFunction: any;
    node: any;
    [key: string]: any;
    constructor(logRetention: any);
}
