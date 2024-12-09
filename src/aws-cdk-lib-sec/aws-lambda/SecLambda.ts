import * as Lambda  from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { ConfigurationError, addConfigurationErrorDetails } from '../../tools/ConfigurationError';
import { SecFunctionProps } from './SecFunctionProps';
import { SecMarker } from '../SecMarker';
import * as cdk from "..";
import logger from '../../tools/logger';

export class Function extends Lambda.Function {
    static [SecMarker] = true;
  
    constructor(scope: Construct, id: string, props: SecFunctionProps) {
      logger.debug("Function scope" + scope)
      logger.debug("Function id" + id)
      logger.debug("Function props" + props)
      props = new SecFunctionProps(props, scope, id) 
      super(scope, id, {
        ...props,
        code: props.code ?? SecFunctionProps.defaultCode,
        handler: props.handler ?? SecFunctionProps.defaultHandler,
      });
      addConfigurationErrorDetails(this, id)
      logger.debug("Function" + this)
    }
  }
