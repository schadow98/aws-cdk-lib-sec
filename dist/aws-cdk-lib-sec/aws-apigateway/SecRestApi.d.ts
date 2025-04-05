import * as aws_apigateway from 'aws-cdk-lib/aws-apigateway';
import * as aws_iam from 'aws-cdk-lib/aws-iam';
import { SecMarker } from '../SecMarker';
import { Construct } from 'constructs';
import { RemovalPolicy, Size } from 'aws-cdk-lib';
/**
 * Custom wrapper for the AWS CDK `RestApi` construct.
 *
 * This class adds the SecMarker tp the RestApi
 * This class extends the default `RestApi` to provide additional functionality
 * or predefined configurations for building secure and consistent REST APIs.
 */
export declare class RestApi extends aws_apigateway.RestApi {
    static [SecMarker]: boolean;
    constructor(scope: Construct, id: string, props: RestApiAttributes);
}
/**
 * Represents a configuration container for attributes related to a custom `RestApi`.
 *
 * This class is used to group and manage input parameters or settings
 * that define the behavior and structure of the `RestApi` construct.
 */
export declare class RestApiAttributes {
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
    parameters?: {
        [key: string]: string;
    };
    policy?: aws_iam.PolicyDocument;
    failOnWarnings?: boolean;
    domainName?: aws_apigateway.DomainNameOptions;
    cloudWatchRole?: boolean;
    cloudWatchRoleRemovalPolicy?: RemovalPolicy;
    endpointExportName?: string;
    endpointTypes?: aws_apigateway.EndpointType[];
    disableExecuteApiEndpoint?: boolean;
    description: string;
    constructor(props: RestApiAttributes, scope: Construct, id: string);
}
