import { Duration } from 'aws-cdk-lib';
import * as signer from 'aws-cdk-lib/aws-signer';
import { Construct } from 'constructs';
import { SecMarker } from '../SecMarker';
import { ConfigurationError } from '../../tools/ConfigurationError';

export class SigningProfile extends signer.SigningProfile{
    static [SecMarker] = true;

    constructor(scope: Construct, id: string, props: SecSigningProfileProps){
        super(scope, id, {
            ...props,
            platform: props.platform ?? signer.Platform.AWS_LAMBDA_SHA384_ECDSA
          });        
    }
}

class SecSigningProfileProps{
    platform?: signer.Platform; 
    signatureValidity?: Duration; // @default - 135 months
    signingProfileName?: string; // @default - Assigned by CloudFormation (recommended).

    constructor(props: SecSigningProfileProps){
        //platform
        this.platform = props.platform // signer.Platform.AWS_LAMBDA_SHA384_ECDSA
        if(!this.platform){
            this.platform =  signer.Platform.AWS_LAMBDA_SHA384_ECDSA
        }
        if (this.platform !== signer.Platform.AWS_LAMBDA_SHA384_ECDSA){
            new ConfigurationError("platform", "The plattform for a lambda function should be AWS_LAMBDA_SHA384_ECDSA, entered: " + this.platform)
        }
        // signatureValidity
        this.signatureValidity = props.signatureValidity
        if(!this.signatureValidity){
            this.signatureValidity = Duration.days(365 * 2)
        }
        if (this.signatureValidity !== Duration.days(365 * 2)){
            new ConfigurationError("signatureValidity", "The signatureValidity should be two years, entered: " + this.signatureValidity)
        }
        // signingProfileName
        this.signingProfileName = props.signingProfileName //undefined sein
        if( this.signingProfileName){
            new ConfigurationError("signingProfileName", "The signingProfileName for a SigningProfileProps should be calculated by a cloudFormation, entered: " + this.signingProfileName)
        }
    }
}