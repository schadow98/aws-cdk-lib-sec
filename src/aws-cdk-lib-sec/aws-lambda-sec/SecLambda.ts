import * as Lambda  from 'aws-cdk-lib/aws-lambda';
import { FunctionProps } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { LogError } from '../../tools/LogError';
import { SafeFunctionProps } from './SafeFunctionProps';


export class SecLambda extends Lambda.Function{
    isSafe: boolean;
    constructor(scope: Construct, id: string, props: FunctionProps){
        super(scope, id, new SafeFunctionProps(props))
        this.isSafe = true
    }
    
}


