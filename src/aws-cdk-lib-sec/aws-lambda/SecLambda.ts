import * as Lambda  from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { ConfigurationError, addConfigurationErrorDetails } from '../../tools/ConfigurationError';
import { SecFunctionProps } from './SafeFunctionProps';
import { SecMarker } from '../SecMarker';
import * as cdk from "..";

export class Function extends Lambda.Function {
    static [SecMarker] = true;
  
    constructor(scope: Construct, id: string, props: SecFunctionProps) {
      props = new SecFunctionProps(props) 
      super(scope, id, {
        ...props,
        code: props.code ?? SecFunctionProps.defaultCode,
        handler: props.handler ?? SecFunctionProps.defaultHandler,
      });
      addConfigurationErrorDetails(this, id)
    }
  }
