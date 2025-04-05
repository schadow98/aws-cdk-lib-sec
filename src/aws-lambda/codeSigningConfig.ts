import * as Lambda from 'aws-cdk-lib/aws-lambda';
import * as signer from '../aws-signer';
import { Construct } from 'constructs';
import { Tags } from 'aws-cdk-lib';
import { CodeSigningConfig } from './SecCodeSigningConfig';
import logger from '../tools/logger';
import { hasSecMarker } from '../aws-stack/validator';
import { ConfigurationError } from '../tools/ConfigurationError';

/**
 * Creates a new `CodeSigningConfig` or returns an existing one.
 * Then it adds to the Lambdafuntion
 *
 * @param scope - The construct scope in which the resource is created.
 * @param lambdaId - A unique identifier for the resource.
 * @param codeSigningConfigInput - Optional: An existing `CodeSigningConfig`.
 * @returns An instance of `Lambda.CodeSigningConfig`.
 */
export function createCodeSigningConfig(
    scope: Construct, // Stack
    lambdaId: string, // LambdaFunction
    codeSigningConfigInput?: Lambda.ICodeSigningConfig,
): Lambda.CodeSigningConfig {
    logger.debug("createCodeSigningConfig Input " + scope)
    logger.debug("createCodeSigningConfig Input " + lambdaId)
    logger.debug("createCodeSigningConfig Input " + codeSigningConfigInput)
    const tags: { [key: string]: string } = {
        "Lambda": lambdaId
    }

    if (!codeSigningConfigInput) {
        const signingProfile = new signer.SigningProfile(scope, `${lambdaId}SigningProfile`, {
        });

        // Füge Tags zum SigningProfile hinzu
        if (tags) {
            Object.entries(tags).forEach(([key, value]) => {
                Tags.of(signingProfile).add(key, value);
            });
        }

        // Verwende eine eindeutige ID für CodeSigningConfig
        const codeSigningConfig = new CodeSigningConfig(scope, `${lambdaId}CodeSigningConfig`, {
            signingProfiles: [signingProfile]
        });

        // Füge Tags zur CodeSigningConfig hinzu
        if (tags) {
            Object.entries(tags).forEach(([key, value]) => {
                Tags.of(codeSigningConfig).add(key, value);
            });
        }
        logger.info("setting codeSigningConfig (secure, deafult)")

        return codeSigningConfig;
    }

    logger.debug("codeSigningConfigInput Output " + codeSigningConfigInput)
    
    if(!hasSecMarker(codeSigningConfigInput)){
        new ConfigurationError("codeSigningConfig", "codeSigningConfig is not secured")
    }


    // Rückgabe der vorhandenen CodeSigningConfig, wenn vorhanden
    return codeSigningConfigInput as Lambda.CodeSigningConfig;
}
