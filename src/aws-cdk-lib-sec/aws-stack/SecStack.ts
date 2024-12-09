import * as cdk from 'aws-cdk-lib';
import { Construct, IValidation } from 'constructs';
import { SecMarker } from '../SecMarker';
import { addConfigurationErrorDetails, handleDetailedConfigurationErrors } from '../../tools/ConfigurationError';
import { SecStackProps } from './SecStackProps';
import logger from '../../tools/logger';
import { checkSecClass } from './validator';

export class Stack extends cdk.Stack {
    static [SecMarker] = true;

    constructor(scope: Construct, id: string, props: SecStackProps) {
        logger.debug("Stack scope " + scope)
        logger.debug("Stack id " + id)
        logger.debug("Stack props " + JSON.stringify(props))
        props = new SecStackProps(props)
        super(scope, id, props);
        addConfigurationErrorDetails(this, id)
        
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
