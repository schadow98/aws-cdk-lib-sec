import * as Lambda  from 'aws-cdk-lib/aws-lambda';
import * as Logs  from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { ConfigurationError, addConfigurationErrorDetails } from '../../tools/ConfigurationError';
import { SecFunctionProps } from './SecFunctionProps';
import { SecMarker } from '../SecMarker';
import * as cdk from "..";
import logger from '../../tools/logger';
import { FunctionProps } from 'aws-cdk-lib/aws-lambda';
import { addCloudwatchMetricsAndAlarms } from './cloudwatch';

export class Function extends Lambda.Function {
    static [SecMarker] = true;
    _logRetention: any

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