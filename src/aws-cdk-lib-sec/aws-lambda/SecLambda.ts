import * as Lambda  from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import {  addConfigurationErrorDetails } from '../../tools/ConfigurationError';
import { FunctionProps } from './SecFunctionProps';
import { SecMarker } from '../SecMarker';
import logger from '../../tools/logger';
import { addCloudwatchMetricsAndAlarms } from './cloudwatch';

export class Function extends Lambda.Function {
    static [SecMarker] = true;
    _logRetention: any

    constructor(scope: Construct, id: string, props: FunctionProps) {
      logger.debug("Function scope" + scope)
      logger.debug("Function id" + id)
      logger.debug("Function props" + props)
      props = new FunctionProps(props, scope, id) 
      super(scope, id, {
        ...props,
        code: props.code ?? FunctionProps.defaultCode,
        handler: props.handler ?? FunctionProps.defaultHandler,
      });
      
      this._logRetention = new SecLogRetention(this._logRetention)
      addConfigurationErrorDetails(this, id)

      addCloudwatchMetricsAndAlarms(scope, id)
      logger.debug("Function" + this)
    }
  }


  export class SecLogRetention {
    // Verwende das Symbol als Schlüssel für die statische Eigenschaft
    static [SecMarker] = true;
  
    logGroupArn: any
    ensureSingletonLogRetentionFunction: any
    node: any
    // Definiere die Eigenschaften der Klasse (optional)
    // Hier wird angenommen, dass logRetention ein Objekt mit beliebigen Eigenschaften ist
    [key: string]: any;
  
    constructor(logRetention: any) {
      // Weist alle Eigenschaften von logRetention dem aktuellen Objekt zu
      Object.assign(this, logRetention);
    }
  }