import * as aws_apigateway from 'aws-cdk-lib/aws-apigateway';
import { SecMarker } from '../SecMarker';
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
export class RestApi extends aws_apigateway.RestApi {
    static [SecMarker] = true;
    constructor(scope, id, props) {
        props = new RestApiAttributes(props, scope, id);
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
export class RestApiAttributes {
    binaryMediaTypes;
    minimumCompressionSize;
    minCompressionSize;
    cloneFrom;
    apiKeySourceType;
    endpointConfiguration;
    defaultIntegration;
    defaultMethodOptions;
    defaultCorsPreflightOptions;
    deploy;
    deployOptions;
    retainDeployments;
    restApiName;
    parameters;
    policy;
    failOnWarnings;
    domainName;
    cloudWatchRole;
    cloudWatchRoleRemovalPolicy;
    endpointExportName;
    endpointTypes;
    disableExecuteApiEndpoint;
    description;
    constructor(props, scope, id) {
        logger.debug(id);
        Object.assign(this, props);
        this.description = checkDescription(props.description);
        this.retainDeployments = checkRetainDeployments(props.retainDeployments);
        this.domainName = checkDomainName(props.domainName);
        this.defaultMethodOptions = checkDefaultMethodOptions(scope, props.defaultMethodOptions);
    }
}
//# sourceMappingURL=SecRestApi.js.map