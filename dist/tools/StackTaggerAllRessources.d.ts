import * as cdk from '../../src/aws-cdk-lib-sec';
import { IConstruct } from 'constructs';
export declare class StackTaggerAllRessources implements cdk.IAspect {
    private readonly key;
    private readonly value;
    constructor(key: string, value: string);
    visit(node: IConstruct): void;
}
