
import { SecStack } from './SecStack'
import { SecLambda } from './aws-lambda-sec/SecLambda'
import * as logger from './SecLogger'
import * as cdk from 'aws-cdk-lib'

// cdk.aws_lambda.Function = SecLambda
// cdk.Stack = SecStack

export { cdk, SecStack, SecLambda, logger }