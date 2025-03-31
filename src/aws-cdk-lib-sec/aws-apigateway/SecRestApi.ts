import * as aws_apigateway from 'aws-cdk-lib/aws-apigateway' ;
import * as aws_iam from 'aws-cdk-lib/aws-iam' ;
import { SecMarker } from '../SecMarker';
import { Construct } from 'constructs';
import { RemovalPolicy, Size } from 'aws-cdk-lib';
import { checkDescription } from '../aws-lambda/StandardizedNaming';
import { checkRetainDeployments } from './checkRetainDeployments';
import { checkDomainName } from './checkDomainName';
import { checkDefaultMethodOptions } from './checkDefaultMethodOptions';
import logger from '../../tools/logger';

/**
 * Custom wrapper for the AWS CDK `RestApi` construct.
 * 
 * This class adds the SecMarker tp the RestApi
 * This class extends the default `RestApi` to provide additional functionality
 * or predefined configurations for building secure and consistent REST APIs.
 */
export class RestApi extends aws_apigateway.RestApi{
    static [SecMarker] = true;
    constructor(scope: Construct, id: string, props: RestApiAttributes){
        
      props = new RestApiAttributes(props, scope, id) 

        super(scope, id, {
            ...props
          });        
    }
}

/**
 * Represents a configuration container for attributes related to a custom `RestApi`.
 * 
 * This class is used to group and manage input parameters or settings
 * that define the behavior and structure of the `RestApi` construct.
 */
export class RestApiAttributes{
  binaryMediaTypes?: string[];
  minimumCompressionSize?: number;
  minCompressionSize?: Size;
  cloneFrom?: aws_apigateway.IRestApi;
  apiKeySourceType?: aws_apigateway.ApiKeySourceType;
  endpointConfiguration?: aws_apigateway.EndpointConfiguration;
  defaultIntegration?: aws_apigateway.Integration;
  defaultMethodOptions?: aws_apigateway.MethodOptions;
  defaultCorsPreflightOptions?: aws_apigateway.CorsOptions;
  deploy?: boolean;
  deployOptions?: aws_apigateway.StageOptions;
  retainDeployments?: boolean;
  restApiName?: string;
  parameters?: { [key: string]: string }
  policy?: aws_iam.PolicyDocument;
  failOnWarnings?: boolean;
  domainName?: aws_apigateway.DomainNameOptions;
  cloudWatchRole?: boolean;
  cloudWatchRoleRemovalPolicy?: RemovalPolicy;
  endpointExportName?: string;
  endpointTypes?: aws_apigateway.EndpointType[];
  disableExecuteApiEndpoint?: boolean;
  description: string;


  constructor(props: RestApiAttributes, scope: Construct, id: string) {
    logger.debug(id)
    Object.assign(this, props);
    this.description = checkDescription(props.description);
    this.retainDeployments = checkRetainDeployments(props.retainDeployments)
    this.domainName = checkDomainName(props.domainName)
    this.defaultMethodOptions = checkDefaultMethodOptions(scope, props.defaultMethodOptions)
  }
}



