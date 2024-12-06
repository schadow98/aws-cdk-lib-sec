import * as cdk from 'aws-cdk-lib';
import { Construct, IValidation } from 'constructs';
import { SecMarker } from '../SecMarker';
import { handleDetailedConfigurationErrors } from '../../tools/ConfigurationError';
import { StackTagsSynthesizer } from "./StackTagsSynthesizer"

export class Stack extends cdk.Stack {
    static [SecMarker] = true;

    constructor(scope: Construct, id: string, props: cdk.StackProps | undefined = undefined) {
        // if (!props){
        //     props = {synthesizer: new StackTagsSynthesizer()}
        // }else{
        //     props = {...props, synthesizer: new StackTagsSynthesizer()}
        // }

        super(scope, id, props);

        
        this.node.addValidation({
            validate: () => {
                handleDetailedConfigurationErrors(this); // Ausführen der Methode, um alle Children zu prüfen
                return []; // Es wird eine leere Liste zurückgegeben, da keine weiteren Validierungsfehler hinzugefügt werden
            }
        });
    }

}
