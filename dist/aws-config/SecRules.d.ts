import * as aws_config from 'aws-cdk-lib/aws-config';
import { SecMarker } from '../SecMarker';
/**
 * Custom AWS Config rule that extends the CDK `CustomRule` construct.
 *
 * This secures the class CustomRule and adds the SecMarker
 */
export declare class CustomRule extends aws_config.CustomRule {
    static [SecMarker]: boolean;
}
/**
 * Custom AWS Managed rule that extends the CDK `ManagedRule` construct.
 *
 * This secures the class CustomRule and adds the SecMarker
 */
export declare class ManagedRule extends aws_config.ManagedRule {
    static [SecMarker]: boolean;
}
