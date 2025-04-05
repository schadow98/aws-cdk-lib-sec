import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SecMarker } from '../SecMarker';
import { StackProps } from './SecStackProps';
/**
 * Secure CDK stack wrapper with built-in validation and compliance features.
 *
 * This class extends the default `cdk.Stack` and provides:
 *
 * - Automatic `stage` detection from context (defaults to `'development'`)
 * - Enforced security tagging via `SecMarker`
 * - Injection of AWS Config rules for compliance monitoring
 * - Centralized configuration error collection and validation
 * - Custom CDK node validations for secure class enforcement and detailed diagnostics
 *
 * @extends cdk.Stack
 */
export declare class Stack extends cdk.Stack {
    static [SecMarker]: boolean;
    stage: undefined;
    constructor(scope: Construct, id: string, props: StackProps);
}
