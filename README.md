# Secure AWS CDK LIB Framework

A lightweight and secure abstraction layer for deploying AWS secured AWS infrastructure and applications using AWS CDK.  
This framework automates secure configurations, enforces best practices, and integrates with compliance standards like CIS AWS Foundations and OWASP.

---

## 📚 Table of Contents

- [Secure AWS CDK LIB Framework](#secure-aws-cdk-lib-framework)
- [About](#-about)
- [Features](#-features)
- [Security](#-security)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#-usage)
  - [CLI Usage](#-cli-usage)
  - [Basic Usage](#-basic-usage)
  - [Advanced Configuration](#-advanced-configuration)
- [Example Project](#-example-project)
- [Deployment](#-deployment)
  - [Configure AWS Environment](#configure-aws-environment)
  - [Configure CI/CD-Pipeline /Github Actions](#configure-cicd-pipeline-github-actions)
- [Development](#-development)
- [License](#-license)
- [Extensions](#-extensions)
- [Support](#-support)

---

## 🧾 About

**AWS-CDK-LIB-SEC** is a framework designed for developers and DevSecOps teams who want to securely deploy infrastructure and applications functions with minimal effort. It wraps AWS CDK constructs and applies built-in security configurations to reduce the risk of misconfiguration and compliance issues.

---

## 🚀 Features

- ✅ Secure by default: IAM roles, environment encryption, VPC config
- 🛡️ Security-as-Code approach
- 📦 Easy integration into existing CDK apps
- 📐 Aligns with **CIS AWS Foundations**, **AWS Best Practices** and **OWASP Serverless Top 10**
- 🧪 Built-in test support for stacks and policies
- 🧰 TypeScript-based and extensible


## 🔐 Security
This framework follows the principle of secure by design.

Included Security Measures:
✅ IAM roles with least privilege

✅ Encrypted environment variables

✅ REST Protection thorugh Authentication and TLS

✅ Monitoring, logging, and X-Ray tracing

✅ CDK synth-time validations

✅ Automatic VPC attachment for private execution (comming soon)

✅ and more
---


## 🛠️ Getting Started

### Prerequisites

Make sure you have the following tools installed:

- [Node.js (>= 18)](https://nodejs.org/)
- [AWS CDK v2](https://docs.aws.amazon.com/cdk/v2/guide/home.html)
- [VSCode ](https://code.visualstudio.com/)

### Installation

```bash
npm install github:schadow98/aws-cdk-lib-sec
```

## ⚙️ Usage

The `aws-cdk-lib-sec` is designed to simplify the secure deployment of AWS components using AWS CDK.  
It wraps `aws-cdk-lib` and applies a series of secure defaults and best practices.

Just use the aws-cdk-lib-sec instead of the aws-cdk-lib.
```
//app.ts -> file that defines the structure of the infrasture
// old - imports code from unsecured aws-cdk-libary
import * as unsecured_cdk from 'aws-cdk-lib';
// new - imports code from safe framework
import * as secured_cdk from 'aws-cdk-lib-sec';
```

## 🧰 CLI Usage

The `aws-cdk-lib-sec` framework is fully compatible with the standard AWS CDK CLI commands.  
You can use it just like any other CDK project – no special tooling required.

### ✅ Common Commands

#### Synthesize the CloudFormation template
```bash
cdk synth     # Synthesize the CloudFormation template
cdk deploy    # Deploy the stack to AWS
cdk destroy   # Destroy the stack
cdk bootstrap # Bootstrap your environment (required once per account/region)
```

### 🧾 Basic Usage

```ts
import * as cdk from 'aws-cdk-lib-sec';

import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib-sec/aws-lambda';
import * as apigateway from 'aws-cdk-lib-sec/aws-apigateway';


export class MyLambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string) {
        super(scope, id, { 
            description: "irgendwas was 10 zeichen hat",
            contact: {
                developerTeam:  "developerTeam@domain.com",
                operationTeam:  "operationTeam@domain.com",
                privacyManager: "privacyManager@domain.com",
                securityManager:"securityManager@domain.com",      
              }

        });

        const lambdaFunction = new cdk.aws_lambda.Function(this, 'MyLambdaFunction', {
            runtime: cdk.aws_lambda.Runtime.NODEJS_10_X,
            description: "My lambda function to deploy something"
        })


        cdk.Tags.of(this).add("environment", "dev");    
        cdk.Tags.of(this).add("cost-center", "IT-123");   
        cdk.Tags.of(this).add("budget", "1000");          
        cdk.Tags.of(this).add("privacy-class", "internal");
        cdk.Tags.of(this).add("creator", "MyTeam");       
        cdk.Tags.of(this).add("created-at", "2025-03-14"); 
        cdk.Tags.of(this).add("compliance", "GDPR");       
        cdk.Tags.of(this).add("governance", "internal");

    }
}
```

### 🧾 Advanced Configuration
SecureLambda supports all standard Lambda options plus additional security-specific configurations:

```ts
import * as cdk from 'aws-cdk-lib-sec';

import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib-sec/aws-lambda';
import * as apigateway from 'aws-cdk-lib-sec/aws-apigateway';


export class MyLambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string) {
        super(scope, id, { 
            description: "irgendwas was 10 zeichen hat",
            contact: {
                developerTeam:  "developerTeam@domain.com",
                operationTeam:  "operationTeam@domain.com",
                privacyManager: "privacyManager@domain.com",
                securityManager:"securityManager@domain.com",      
              }

        });


        const apiGateway = new apigateway.RestApi(
            this, 
            "MyApiGateway",
            {
                description: "API Gateway default secured"
            }
        )
        

        const paramsAndSecrets = lambda.ParamsAndSecretsLayerVersion.fromVersion(lambda.ParamsAndSecretsVersions.V1_0_103, {
            cacheEnabled: false,
            logLevel: lambda.ParamsAndSecretsLogLevel.DEBUG,
          });

        // Add a Lambda-Function to the stack
        const lambdaFunction = new cdk.aws_lambda.Function(this, 'MyLambdaFunction', {
            runtime: cdk.aws_lambda.Runtime.NODEJS_10_X,
            description: "My lambda function to deploy something",
            environment: {
                PATH1: '/usr/bin:/bin',
            },
            
            paramsAndSecrets: paramsAndSecrets
        })

        const pingResource = apiGateway.root.addResource("ping");
        pingResource.addMethod("GET", new apigateway.LambdaIntegration(lambdaFunction));


        cdk.Tags.of(lambdaFunction).add("runtime:insecureReason", "Legacy system")
        cdk.Tags.of(lambdaFunction).add("insecure", "false")

        cdk.Tags.of(this).add("environment", "dev");    
        cdk.Tags.of(this).add("cost-center", "IT-123");   
        cdk.Tags.of(this).add("budget", "1000");          
        cdk.Tags.of(this).add("privacy-class", "internal");
        cdk.Tags.of(this).add("creator", "MyTeam");       
        cdk.Tags.of(this).add("created-at", "2025-03-14"); 
        cdk.Tags.of(this).add("compliance", "GDPR");       
        cdk.Tags.of(this).add("governance", "internal");

    }
}
```

### 📦 Example Project
A complete working example is available in the /e2e_test folder.


## 🚀 Deployment

For the deployment some manual  tasks in the aws are necessary.

### configure AWS Environment

1. Login to the AWS console
2. Register the Github OIDC provider in the AWS console:
2.1. Go to IAM → Identity Providers
    Click "Add provider"
    Choose Provider type: OIDC
    Provider URL: https://token.actions.githubusercontent.com
    Audience: sts.amazonaws.com
    Thumbprint: 6938fd4d98bab03faadb97b34396831e3780aea1
2.2. Alt. execute the command
    aws iam create-open-id-connect-provider \
    --url https://token.actions.githubusercontent.com \
    --client-id-list sts.amazonaws.com \
    --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
3. Create an IAM Role/ service account for GitHub Actions
    Navigate to IAM → Roles → Create Role
    Trusted entity type: Web identity
    Identity provider: Choose the GitHub OIDC provider you created
    Define trusted entities (Condition):
    Audience: sts.amazonaws.com
```json
{
  "Effect": "Allow",
  "Principal": {
    "Federated": "arn:aws:iam::<account-id>:oidc-provider/token.actions.githubusercontent.com"
  },
  "Action": "sts:AssumeRoleWithWebIdentity",
  "Condition": {
    "StringLike": {
      "token.actions.githubusercontent.com:sub": "repo:<owner>/<repo>:ref:refs/heads/main"
    }
  }
}
```
4. Add IAM Policies/ permissions to user (is not secured for Least-Privilege principle):
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CloudFormationAccess",
      "Effect": "Allow",
      "Action": [
        "cloudformation:DescribeStacks",
        "cloudformation:CreateChangeSet",
        "cloudformation:DescribeChangeSet",
        "cloudformation:ExecuteChangeSet",
        "cloudformation:DeleteChangeSet",
        "cloudformation:GetTemplateSummary",
        "cloudformation:DescribeStackEvents",
        "cloudformation:GetTemplate",
        "cloudformation:UpdateStack",
        "cloudformation:CreateStack"
      ],
      "Resource": "*"
    },
    {
      "Sid": "CDKToolkitAccess",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::cdktoolkit-stagingbucket-*",
        "arn:aws:s3:::cdktoolkit-stagingbucket-*/*"
      ]
    },
    {
      "Sid": "LambdaAccess",
      "Effect": "Allow",
      "Action": [
        "lambda:CreateFunction",
        "lambda:UpdateFunctionCode",
        "lambda:UpdateFunctionConfiguration",
        "lambda:DeleteFunction",
        "lambda:GetFunction",
        "lambda:AddPermission",         // notwendig für API Gateway Zugriff
        "lambda:RemovePermission",
        "lambda:TagResource"
      ],
      "Resource": "*"
    },
    {
      "Sid": "LambdaInvokePermissionForGateway",
      "Effect": "Allow",
      "Action": "lambda:AddPermission",
      "Resource": "*"
    },
    {
      "Sid": "IAMPassRole",
      "Effect": "Allow",
      "Action": "iam:PassRole",
      "Resource": "arn:aws:iam::<ACCOUNT_ID>:role/*"
    },
    {
      "Sid": "APIGatewayAccess",
      "Effect": "Allow",
      "Action": [
        "apigateway:GET",
        "apigateway:POST",
        "apigateway:PUT",
        "apigateway:DELETE",
        "apigateway:PATCH"
      ],
      "Resource": "*"
    },
    {
      "Sid": "CloudWatchLogsAccess",
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "logs:DescribeLogGroups",
        "logs:DescribeLogStreams"
      ],
      "Resource": "*"
    },
    {
      "Sid": "STSGetCallerIdentity",
      "Effect": "Allow",
      "Action": "sts:GetCallerIdentity",
      "Resource": "*"
    }
  ]
}
```
5.Configure GitHub Actions to Assume the Role
In your GitHub repository:

Go to Settings → Secrets and variables → Actions → Variables

Add the following repository variables:
AWS_ROLE_ARN    The ARN of the IAM role you created


6. Enable AWS Config (creates cost about 50 ct per day)
Execute the following commands:
```
aws configservice put-configuration-recorder \
  --configuration-recorder name=default,roleARN=arn:aws:iam::<aw-konto-id>:role/AWSConfigRole,recordingGroup={allSupported=true,includeGlobalResourceTypes=true

aws configservice put-delivery-channel \
  --delivery-channel name=default,s3BucketName=my-config-logs-bucket

aws configservice start-configuration-recorder \
  --configuration-recorder-name Default
```

### Configurate CI/CD-Pipeline /Github Actions:
Here is a secured integration into the pipeline.
An example ist in .github/workflows/e2e_test.yml.
Create a in your git the file .github/workflows/deploy.yml:
```yaml
name: End-to-End Tests

on:
  push:
    branches: [ main ]
    paths:
      - 'e2e_test/**'
      - '.github/workflows/e2e_test.yml'
  pull_request:
    paths:
      - 'e2e_test/**'
      - '.github/workflows/e2e_test.yml'
      
permissions:
  id-token: write
  contents: read

jobs:
  secure-deploy:
    runs-on: ubuntu-latest
    steps:

      # -----------------------------
      # Prepare Environment
      # -----------------------------


      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '22.4.0'

      - name: Install dependencies for E2E tests
        run: npm install
        working-directory: e2e_test

      # -----------------------------
      # SECURITY SCANS BEGIN HERE
      # -----------------------------

      - name: Run SAST with ESLint + Security Rules
        working-directory: e2e_test
        run: |
          npm run sast

      - name: Run Dependency Audit (npm audit)
        working-directory: e2e_test
        run: npm audit --audit-level=moderate || true

      - name: Run Trivy for Dependency Scanning
        uses: aquasecurity/trivy-action@0.28.0
        with:
          scan-type: 'fs'
          scan-ref: './e2e_test'  
        
      # -----------------------------
      # Function and Application tests
      # -----------------------------      
      
      - name: Run unit tests
        working-directory: e2e_test
        run: npm run unittest

      - name: Run integration tests
        working-directory: e2e_test
        run: npm run integrationtest

      # -----------------------------
      # CDK SYNTH → CloudFormation Templates
      # -----------------------------

      - name: Install AWS CDK
        run: npm install -g aws-cdk

      - name: debug
        working-directory: e2e_test
        run: node -p "require.resolve('aws-cdk-lib-sec')"

      - name: Synthesize CDK Templates
        working-directory: e2e_test
        run: cdk synth --app "npx ts-node sec-app.ts" --output ../templates

      # -----------------------------
      # 🔐 SECURITY SCANS: CloudFormation
      # -----------------------------

      - name: Simple test
        uses: stelligent/cfn_nag@master
        with:
          input_path: templates


      # -----------------------------
      # Deploy on AWS
      # -----------------------------      

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v3
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_TO_ASSUME }}
          aws-region: eu-central-1

      - name: Install AWS CDK
        run: npm install -g aws-cdk
        
      - name: Bootstrap
        working-directory: e2e_test
        run: cdk bootstrap
        
      - name: Deploy CDK Stack
        working-directory: e2e_test
        run: cdk deploy --app "npx ts-node sec-app.ts" --require-approval never
```


## 🛠️ Development

To contribute to the `aws-cdk-lib-sec` framework or use it in local development, follow these steps:

1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/aws-cdk-lib-sec.git
cd aws-cdk-lib-sec
npm install
```
2. Start developing
You can now:
Add or edit constructs in the src/ folder

Write tests in the test/ or e2e_test/ folder
Run the example stack or create your own CDK app using your local code

4. Run tests
```bash
npm test
# Or with coverage:
npx jest --coverage
```
5. Build the project
```bash
npm run build
```

## 📄 License

This project is licensed under the MIT License.  
For full details, see the [LICENSE](./LICENSE) file in the repository.

## 🧩 Extensions

Extensions and contributions are welcome.  
If you would like to add functionality, improve security features, or tailor the framework to specific use cases, feel free to open an issue or submit a pull request.

## 🙋‍♀️ Support

If you encounter any problems or have questions, feel free to open an [Issue](https://github.com/YOUR_USER/aws-cdk-lib-sec/issues).