import * as Lambda  from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { LogError } from '../../tools/LogError';
import { SafeFunctionProps } from './SafeFunctionProps';
import { SecMarker } from '../SecMarker';


export class Function extends Lambda.Function {
    static [SecMarker] = true;
  
    constructor(scope: Construct, id: string, props: SafeFunctionProps) {
      super(scope, id, {
        ...props,
        runtime: Lambda.Runtime.NODEJS_18_X,
        code: props.code ?? Lambda.Code.fromAsset("src"),
        handler: props.handler ?? "index.handler",
      });
    }
  }
