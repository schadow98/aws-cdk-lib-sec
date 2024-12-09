import * as Lambda from 'aws-cdk-lib/aws-lambda';
import * as signer from '../aws-signer';
import { Construct } from 'constructs';
import { Tags } from 'aws-cdk-lib';
import { CodeSigningConfig } from './SecCodeSigningConfig';
import logger from '../../tools/logger';
import { hasSecMarker } from '../aws-stack/validator';
import { ConfigurationError } from '../../tools/ConfigurationError';

/**
 * Erstellt eine neue CodeSigningConfig oder gibt eine vorhandene zurück und fügt Tags hinzu.
 *
 * @param scope - Der Konstruktbereich, in dem die Ressource erstellt wird.
 * @param lambdaId - Eine eindeutige Kennung für die Ressource.
 * @param codeSigningConfigInput - Optional: Eine vorhandene CodeSigningConfig.
 * @param tags - Optional: Ein Objekt mit Tags, die hinzugefügt werden sollen.
 * @returns Eine Instanz von Lambda.CodeSigningConfig.
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

        return codeSigningConfig;
    }

    logger.debug("codeSigningConfigInput Output " + codeSigningConfigInput)
    
    if(!hasSecMarker(codeSigningConfigInput)){
        new ConfigurationError("codeSigningConfig", "codeSigningConfig is not secured")
    }

    // Rückgabe der vorhandenen CodeSigningConfig, wenn vorhanden
    return codeSigningConfigInput as Lambda.CodeSigningConfig;
}
