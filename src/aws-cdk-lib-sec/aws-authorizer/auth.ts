import { PolicyDocument } from 'aws-cdk-lib/aws-iam';
import * as jwt from 'jsonwebtoken';

export const handler = async (event: APIGatewayTokenAuthorizerEvent) => {
  const token = event.authorizationToken;

  try {
    // Replace 'YOUR_PUBLIC_KEY_OAUTH_PROVIDER' with the actual public key
    const decoded = jwt.verify(token, 'YOUR_PUBLIC_KEY_OAUTH_PROVIDER');

    // Extract necessary claims from the decoded token (e.g., user ID, roles)
    const userId = decoded.sub; // Assuming 'sub' is the user ID claim
    const roles = decoded.roles || []; // Assuming 'roles' is the roles claim

    // Create a policy based on the decoded claims
    const policy = generatePolicy(userId, 'Allow', event.methodArn, roles);
    return policy;
  } catch (err) {
    // Handle token verification errors gracefully
    console.error('Token verification failed:', err);
    return generatePolicy('user', 'Deny', event.methodArn);
  }
};

const generatePolicy = (principalId: string, effect: string, resource: string, roles: string[] = []) => {
  const policyDocument: PolicyDocument = {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource,
        Condition: {
          StringEquals: {
            'aws:PrincipalType': 'Service',
            'aws:SourceArn': `arn:aws:lambda:${process.env.AWS_REGION}:${process.env.AWS_ACCOUNT_ID}:function:${process.env.AWS_LAMBDA_FUNCTION_NAME}`
          }
        }
      }
    ]
  };

  if (roles.length > 0) {
    policyDocument.Statement[0].Condition.StringMatches = {
      'aws:PrincipalRole': roles
    };
  }

  return {
    principalId,
    policyDocument
  };
};