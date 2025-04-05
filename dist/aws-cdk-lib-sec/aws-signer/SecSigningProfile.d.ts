import { Duration } from 'aws-cdk-lib';
import * as signer from 'aws-cdk-lib/aws-signer';
import { Construct } from 'constructs';
import { SecMarker } from '../SecMarker';
/**
 * Custom wrapper for AWS Signer `SigningProfile` with secure defaults.
 *
 * Extends the default `signer.SigningProfile` and enforces the platform
 * `AWS_LAMBDA_SHA384_ECDSA` if none is specified.
 *
 * Includes a static `SecMarker` to mark the construct for security processing or identification.
 *
 * @extends signer.SigningProfile
 */
export declare class SigningProfile extends signer.SigningProfile {
    static [SecMarker]: boolean;
    constructor(scope: Construct, id: string, props: SigningProfileProps);
}
/**
 * Configuration properties for a secure AWS Signer `SigningProfile` used with Lambda functions.
 *
 * Enforces secure defaults and validations:
 * - `platform` must be `AWS_LAMBDA_SHA384_ECDSA` (default if not provided)
 * - `signatureValidity` must be exactly 2 years (default if not provided)
 * - `signingProfileName` must be undefined to allow CloudFormation to assign it
 *
 * Throws a `ConfigurationError` if any property does not meet the expected security standards.
 */
export declare class SigningProfileProps {
    platform?: signer.Platform;
    signatureValidity?: Duration;
    signingProfileName?: string;
    constructor(props: SigningProfileProps);
}
