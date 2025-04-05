import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SecMarker } from '../SecMarker';
import { addConfigurationErrorDetails, handleDetailedConfigurationErrors } from '../tools/ConfigurationError';
import { StackProps } from './SecStackProps';
import logger from '../tools/logger';
import { checkSecClass } from './validator';
import { addConfigRules } from './configRules';

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
export class Stack extends cdk.Stack {
    static [SecMarker] = true;
    stage = undefined

    constructor(scope: Construct, id: string, props: StackProps) {
        logger.debug("Stack scope " + scope)
        logger.debug("Stack id " + id)
        logger.debug("Stack props " + JSON.stringify(props))

        const stage = scope.node.tryGetContext('stage') || 'development';
        if(!props.stage){
            logger.info("setting stage " + stage)
            props.stage = stage
        }
        props = new StackProps(props)
        super(scope, id, props);
        this.stage = stage
        addConfigurationErrorDetails(this, id)
        
        addConfigRules(this)

        this.node.addValidation({
            validate: () => {
                handleDetailedConfigurationErrors(this); // Ausführen der Methode, um alle Children zu prüfen
                return []; // Es wird eine leere Liste zurückgegeben, da keine weiteren Validierungsfehler hinzugefügt werden
            }
        });
        this.node.addValidation({
            validate: () => {
                checkSecClass(this); // Ausführen der Methode, um alle Children zu prüfen
                return []; // Es wird eine leere Liste zurückgegeben, da keine weiteren Validierungsfehler hinzugefügt werden
            }
        })
        logger.debug("Stack " + this)
    }

}
