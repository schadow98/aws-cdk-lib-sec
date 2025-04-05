import * as cdk from "aws-cdk-lib";
/**
 * Secure and extended implementation of `cdk.StackProps` with validation logic.
 *
 * This class wraps and validates all input properties used to configure a CDK stack,
 * enforcing secure and standardized project-wide defaults.
 *
 * Features:
 * - Validates and sets required metadata (e.g. `contact`, `description`, `tags`)
 * - Supports CDK environment and synthesizer configuration
 * - Applies safeguards like `terminationProtection`
 *
 * @implements cdk.StackProps
 */
export declare class StackProps implements cdk.StackProps {
    description: string;
    contact: Contact;
    env?: cdk.Environment;
    stage?: string;
    tags?: {
        [key: string]: string;
    };
    synthesizer?: cdk.IStackSynthesizer;
    stackName?: string;
    stackId?: string;
    templateOptions?: cdk.ITemplateOptions;
    terminationProtection?: boolean;
    constructor(props?: Partial<StackProps> | undefined);
}
/**
 * Defines contact metadata for a CDK stack.
 *
 * Used to identify responsible teams and individuals for different operational areas.
 */
interface Contact {
    developerTeam: string;
    operationTeam: string;
    privacyManager: string;
    securityManager: string;
}
export {};
