import { Duration } from 'aws-cdk-lib';
import * as signer from 'aws-cdk-lib/aws-signer';
import { Construct } from 'constructs';
import { SecMarker } from '../SecMarker';
import { ConfigurationError } from '../tools/ConfigurationError';
import logger from '../tools/logger';

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
export class SigningProfile extends signer.SigningProfile{
    static [SecMarker] = true;

    constructor(scope: Construct, id: string, props: SigningProfileProps){
        super(scope, id, {
            ...props,
            platform: props.platform ?? signer.Platform.AWS_LAMBDA_SHA384_ECDSA
          });        
    }
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
export class SigningProfileProps{
    platform?: signer.Platform; 
    signatureValidity?: Duration; // @default - 135 months
    signingProfileName?: string; // @default - Assigned by CloudFormation (recommended).

    constructor(props: SigningProfileProps){
        //platform
        this.platform = props.platform // signer.Platform.AWS_LAMBDA_SHA384_ECDSA
        if(!this.platform){
            logger.info("setting signer.Platform " + signer.Platform.AWS_LAMBDA_SHA384_ECDSA)
            this.platform =  signer.Platform.AWS_LAMBDA_SHA384_ECDSA
        }
        if (this.platform !== signer.Platform.AWS_LAMBDA_SHA384_ECDSA){
            new ConfigurationError("platform", "The plattform for a lambda function should be AWS_LAMBDA_SHA384_ECDSA, entered: " + this.platform)
        }
        // signatureValidity
        this.signatureValidity = props.signatureValidity
        if(!this.signatureValidity){
            logger.info("setting signer.signatureValidity " + Duration.days(365 * 2))
            this.signatureValidity = Duration.days(365 * 2)
        }
        if (this.signatureValidity !== Duration.days(365 * 2)){
            new ConfigurationError("signatureValidity", "The signatureValidity should be two years, entered: " + this.signatureValidity)
        }
        // signingProfileName
        this.signingProfileName = props.signingProfileName //undefined sein
        logger.info("setting signer.signingProfileName")
        if( this.signingProfileName){
            new ConfigurationError("signingProfileName", "The signingProfileName for a SigningProfileProps should be calculated by a cloudFormation, entered: " + this.signingProfileName)
        }
    }
}