import * as signer from 'aws-cdk-lib/aws-signer';
import { Construct } from 'constructs';
import { SecMarker } from '../SecMarker';
import * as Lambda from 'aws-cdk-lib/aws-lambda';
/**
 * Custom Lambda `CodeSigningConfig` with security tagging support.
 *
 * Extends the default `Lambda.CodeSigningConfig` construct to apply
 * additional configuration or metadata. Includes a static `SecMarker`
 * used for identifying security-relevant constructs.
 *
 * @extends Lambda.CodeSigningConfig
 */
export declare class CodeSigningConfig extends Lambda.CodeSigningConfig {
    static [SecMarker]: boolean;
    constructor(scope: Construct, id: string, props: SecCodeSigningConfigProps);
}
/**
 * Properties for configuring a secure Lambda `CodeSigningConfig`.
 *
 * This class defines the expected input for creating a `CodeSigningConfig`
 * with additional security considerations or defaults.
 */
declare class SecCodeSigningConfigProps {
    readonly signingProfiles: signer.ISigningProfile[];
    readonly untrustedArtifactOnDeployment?: Lambda.UntrustedArtifactOnDeployment;
    readonly description?: string;
    constructor(props: SecCodeSigningConfigProps);
}
export {};
