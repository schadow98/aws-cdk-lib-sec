import * as signer from 'aws-cdk-lib/aws-signer';
import { Construct } from 'constructs';
import { SecMarker } from '../SecMarker';
import { ConfigurationError } from '../../tools/ConfigurationError';
import * as Lambda  from 'aws-cdk-lib/aws-lambda';
import logger from '../../tools/logger';

/**
 * Custom Lambda `CodeSigningConfig` with security tagging support.
 * 
 * Extends the default `Lambda.CodeSigningConfig` construct to apply
 * additional configuration or metadata. Includes a static `SecMarker`
 * used for identifying security-relevant constructs.
 *
 * @extends Lambda.CodeSigningConfig
 */
export class CodeSigningConfig extends Lambda.CodeSigningConfig{
    static [SecMarker] = true;

    constructor(scope: Construct, id: string, props: SecCodeSigningConfigProps){
        super(scope, id, {
            ...props
          });        
    } 
}

/**
 * Properties for configuring a secure Lambda `CodeSigningConfig`.
 * 
 * This class defines the expected input for creating a `CodeSigningConfig`
 * with additional security considerations or defaults.
 */
class SecCodeSigningConfigProps{
    readonly signingProfiles: signer.ISigningProfile[];
    readonly untrustedArtifactOnDeployment?: Lambda.UntrustedArtifactOnDeployment; //@default UntrustedArtifactOnDeployment.WARN
    readonly description?: string; // @default - No description.

    constructor(props: SecCodeSigningConfigProps){
        logger.debug("SecCodeSigningConfigProps Input " + SecCodeSigningConfigProps)
        //platform
        this.signingProfiles = props.signingProfiles // signer.Platform.AWS_LAMBDA_SHA384_ECDSA
        if(!this.signingProfiles || this.signingProfiles?.length){
            throw Error("Please defined a signingProfiles")
        }
        for(const signingProfile in this.signingProfiles){
            if ((signingProfile.constructor as any)[SecMarker] !== true){
                new ConfigurationError("signingProfile", "The signingProfile is not secured: " + signingProfile)
            }
        }
        // signatureValidity
        this.untrustedArtifactOnDeployment = props.untrustedArtifactOnDeployment
        if(!this.untrustedArtifactOnDeployment){
            this.untrustedArtifactOnDeployment = Lambda.UntrustedArtifactOnDeployment.ENFORCE
        }
        if (this.untrustedArtifactOnDeployment !== Lambda.UntrustedArtifactOnDeployment.ENFORCE){
            new ConfigurationError("untrustedArtifactOnDeployment", "Please set untrustedArtifactOnDeployment to ENFORCE so unauthorized changes are blocked: " + this.untrustedArtifactOnDeployment)
        }
        // signingProfileName
        this.description = props.description //undefined sein
        if( !this.description){
            this.description = "A signign profile for the lambda function"
        }
        logger.debug("SecCodeSigningConfigProps Output " + SecCodeSigningConfigProps)
    }
}