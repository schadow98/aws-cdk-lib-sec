"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiWithOAuth2AuthorizerStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const cognito = __importStar(require("aws-cdk-lib/aws-cognito"));
const logger_1 = __importDefault(require("../../tools/logger"));
class ApiWithOAuth2AuthorizerStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        if (id) {
            logger_1.default.info("id " + id + " get changed to " + ApiWithOAuth2AuthorizerStack.userPoolName);
        }
        super(scope, ApiWithOAuth2AuthorizerStack.userPoolName, props);
        // Schritt 1: Erstelle einen Cognito User Pool
        const userPool = new cognito.UserPool(this, ApiWithOAuth2AuthorizerStack.userPoolName, {
            userPoolName: ApiWithOAuth2AuthorizerStack.userPoolName,
            signInAliases: { email: true },
            selfSignUpEnabled: true,
            autoVerify: { email: true },
        });
        // Schritt 2: Erstelle einen Cognito User Pool Domain
        const userPoolDomain = new cognito.UserPoolDomain(this, ApiWithOAuth2AuthorizerStack.userPoolClientName, {
            userPool,
            cognitoDomain: {
                domainPrefix: ApiWithOAuth2AuthorizerStack.cognitoDomainPrefix, // Der Domain-Name für Cognito-hosted UI (Anpassbar)
            },
        });
        // Schritt 3: Erstelle einen User Pool Client mit OAuth2 Konfiguration
        const userPoolClient = new cognito.UserPoolClient(this, ApiWithOAuth2AuthorizerStack.userPoolClientName, {
            userPool,
            oAuth: {
                flows: {
                    authorizationCodeGrant: true, // OAuth2 Authorization Code Flow
                },
                scopes: [
                    cognito.OAuthScope.EMAIL,
                    cognito.OAuthScope.OPENID,
                    cognito.OAuthScope.COGNITO_ADMIN,
                ],
                callbackUrls: ["https://example.com/callback"], // Anpassen an deine Anwendung
                logoutUrls: ["https://example.com/logout"],
            },
            generateSecret: true, // Bei OAuth2 sollte ein Client-Secret verwendet werden
        });
        //    // Schritt 4: Erstelle das API Gateway
        //    const api = new apigateway.RestApi(this, 'MyOAuth2Api', {
        //      restApiName: 'OAuth2APIWithCognito',
        //      description: 'API gesichert durch Cognito OAuth2 Authorization',
        //    });
        //
        //    // Schritt 5: Füge den Cognito OAuth2 Authorizer hinzu
        //    const authorizer = new apigateway.CognitoUserPoolsAuthorizer(this, 'OAuth2CognitoAuthorizer', {
        //      cognitoUserPools: [userPool],
        //      authorizerName: 'OAuth2Authorizer',
        //    });
        //
        //    // Schritt 6: Erstelle einen API-Endpunkt
        //    const books = api.root.addResource('books');
        //
        //    // Füge eine GET-Methode hinzu, die durch den Cognito OAuth2 Authorizer geschützt ist
        //    books.addMethod('GET', new apigateway.MockIntegration(), {
        //      authorizer,
        //      authorizationType: apigateway.AuthorizationType.COGNITO,
        //    });
        //
        //    // Ausgabe der Domain-URL des User Pools (für das Authentifizieren)
        //    new cdk.CfnOutput(this, 'CognitoDomainUrl', {
        //      value: `https://${userPoolDomain.domainName}.auth.${this.region}.amazoncognito.com`,
        //    });
        //
        //    // Ausgabe des User Pool Client ID
        //    new cdk.CfnOutput(this, 'UserPoolClientId', {
        //      value: userPoolClient.userPoolClientId,
        //    });
        //
        //    // Ausgabe der API URL
        //    new cdk.CfnOutput(this, 'ApiUrl', {
        //      value: api.url,
        //    });
    }
}
exports.ApiWithOAuth2AuthorizerStack = ApiWithOAuth2AuthorizerStack;
ApiWithOAuth2AuthorizerStack.stackName = "ApiWithOAuth2AuthorizerStack";
ApiWithOAuth2AuthorizerStack.userPoolName = "oauth2-user-pool";
ApiWithOAuth2AuthorizerStack.cognitoDomainPrefix = "my-oauth2-app";
ApiWithOAuth2AuthorizerStack.userPoolClientName = "OAuth2UserPoolClient";
