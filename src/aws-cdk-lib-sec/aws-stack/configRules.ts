import { Construct } from 'constructs';
import * as aws_config from '../aws-config';
import * as aws_lambda from 'aws-cdk-lib/aws-lambda';
import { SecMarker } from '../SecMarker';
import fs from "fs"
import path from "path"
import logger from '../../tools/logger';

/**
 * Adds AWS Config rules to the provided CDK stack.
 * 
 * This function sets up compliance rules to evaluate resource configurations
 * and ensure they align with organizational security and governance policies.
 * 
 * @param stack - The CDK construct in which the AWS Config rules will be defined.
 */

export function addConfigRules(stack: Construct ){
    logger.debug("addConfigRules")

    logger.info("add lambdaFuntction complianceFunction")
    const complianceFunction = new SecConfigLambdaFunction(stack, 'ConfigLambda', {
          runtime: aws_lambda.Runtime.NODEJS_18_X,
          code: aws_lambda.Code.fromInline(fs.readFileSync(path.join(path.dirname(__filename), "../aws-default-stacks/authorizeCode.ts"), { encoding: 'utf8', flag: 'r' })),
          handler: 'index.handler',
        });

    logger.info("adding validateInstalledRessourcesRule")
     new aws_config.CustomRule(stack, 'ValidateInstalledRessources', {
        configRuleName: 'validate-installed-ressources',
        lambdaFunction: complianceFunction,
        configurationChanges: true,
        periodic: true, // falls du die Regel zeitlich periodisch laufen lassen möchtest, setze das auf true
        maximumExecutionFrequency: aws_config.MaximumExecutionFrequency.TWENTY_FOUR_HOURS, // nur relevant, wenn periodic = true
        ruleScope: aws_config.RuleScope.fromResources([
            aws_config.ResourceType.LAMBDA_FUNCTION,
            aws_config.ResourceType.IAM_ROLE
        ]),
      });

      logger.info("adding checkFrameworkVersionRule")
       new aws_config.CustomRule(stack, 'CheckFrameworkVersion', {
        configRuleName: 'check-framework-version',
        lambdaFunction: complianceFunction,
        periodic: true, // falls du die Regel zeitlich periodisch laufen lassen möchtest, setze das auf true
        maximumExecutionFrequency: aws_config.MaximumExecutionFrequency.TWENTY_FOUR_HOURS, // nur relevant, wenn periodic = true
        ruleScope: aws_config.RuleScope.fromResources([
            aws_config.ResourceType.LAMBDA_FUNCTION,
            aws_config.ResourceType.IAM_ROLE
        ]),
      });

      logger.info("adding driftDetectionRule")
      new aws_config.ManagedRule(stack, 'StackDriftCheckRule', {
        configRuleName: 'cloudformation-stack-drift-detection-check',
        identifier: aws_config.ManagedRuleIdentifiers.CLOUDFORMATION_STACK_DRIFT_DETECTION_CHECK,

        ruleScope: aws_config.RuleScope.fromResources([
            aws_config.ResourceType.CLOUDFORMATION_STACK,
          ]),
      });

      logger.debug("adding riskManagementRule")
      new aws_config.CustomRule(stack, 'RiskManagementRule', {
        configRuleName: 'risk-management-rule',
        lambdaFunction: complianceFunction,
        periodic: true, // falls du die Regel zeitlich periodisch laufen lassen möchtest, setze das auf true
        maximumExecutionFrequency: aws_config.MaximumExecutionFrequency.TWENTY_FOUR_HOURS, // nur relevant, wenn periodic = true
        ruleScope: aws_config.RuleScope.fromResources([
            aws_config.ResourceType.LAMBDA_FUNCTION
        ]),
      });

}

class SecConfigLambdaFunction extends aws_lambda.Function{
        static [SecMarker] = true;
}