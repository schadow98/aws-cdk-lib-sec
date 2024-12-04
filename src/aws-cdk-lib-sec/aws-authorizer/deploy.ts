import * as cdk from "aws-cdk-lib";
import { Stack, StackProps } from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as cognito from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";
import logger from "../../tools/logger";
import { checkAuthorizerLambdaStatus } from "./checkAutorizer"
import { isStackDeployed } from "../../tools/checkStack";

export class ApiWithOAuth2AuthorizerStack extends Stack {
  public static readonly stackName: string = "ApiWithOAuth2AuthorizerStack"
  private static readonly userPoolName: string = "oauth2-user-pool";
  private static readonly cognitoDomainPrefix: string = "my-oauth2-app";
  private static readonly userPoolClientName: string = "OAuth2UserPoolClient";



  constructor(scope: Construct, id: string, props?: StackProps) {
    if(id){
        logger.info("id " + id  + " get changed to " +  ApiWithOAuth2AuthorizerStack.userPoolName)
    }
    super(scope, ApiWithOAuth2AuthorizerStack.userPoolName, props);


    // Schritt 1: Erstelle einen Cognito User Pool
    const userPool = new cognito.UserPool(
      this,
      ApiWithOAuth2AuthorizerStack.userPoolName,
      {
        userPoolName: ApiWithOAuth2AuthorizerStack.userPoolName,
        signInAliases: { email: true },
        selfSignUpEnabled: true,
        autoVerify: { email: true },
      }
    );

    // Schritt 2: Erstelle einen Cognito User Pool Domain
    const userPoolDomain = new cognito.UserPoolDomain(
      this,
      ApiWithOAuth2AuthorizerStack.userPoolClientName,
      {
        userPool,
        cognitoDomain: {
          domainPrefix: ApiWithOAuth2AuthorizerStack.cognitoDomainPrefix, // Der Domain-Name für Cognito-hosted UI (Anpassbar)
        },
      }
    );

    // Schritt 3: Erstelle einen User Pool Client mit OAuth2 Konfiguration
    const userPoolClient = new cognito.UserPoolClient(
      this,
      ApiWithOAuth2AuthorizerStack.userPoolClientName,
      {
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
      }
    );

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


