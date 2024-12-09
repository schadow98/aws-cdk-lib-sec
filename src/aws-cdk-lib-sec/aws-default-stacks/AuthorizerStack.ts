import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class AuthorizerStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Create an API Gateway with an Authorizer
        const api = new apigateway.RestApi(this, 'ApiWithAuthorizer', {
            restApiName: 'ApiWithAuthorizer',
            description: 'API with a custom Authorizer',
        });

        const authorizer = new apigateway.CfnAuthorizer(this, 'CustomAuthorizer', {
            name: 'MyAuthorizer',
            restApiId: api.restApiId,
            type: 'REQUEST',
            identitySource: 'method.request.header.Authorization',
        });

        // Output the API Gateway ID
        new cdk.CfnOutput(this, 'ApiGatewayId', {
            value: api.restApiId,
            description: 'The ID of the API Gateway',
        });

        // Output the Authorizer ID
        new cdk.CfnOutput(this, 'AuthorizerId', {
            value: authorizer.ref,
            description: 'The ID of the Authorizer',
        });
    }
}