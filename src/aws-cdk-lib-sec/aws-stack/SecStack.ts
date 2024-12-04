import * as cdk from 'aws-cdk-lib';
import { Construct, IValidation } from 'constructs';
import { SecMarker } from '../SecMarker';

export class Stack extends cdk.Stack {
    static [SecMarker] = true;

    constructor(scope: Construct, id: string, props: cdk.StackProps | undefined = undefined) {
        super(scope, id, props);
    

    }

}
