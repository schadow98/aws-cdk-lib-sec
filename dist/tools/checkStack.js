import { CloudFormation } from '@aws-sdk/client-cloudformation';
import logger from './logger';
const cloudformationClient = new CloudFormation();
export async function isStackDeployed(stackName) {
    try {
        const { Stacks } = await cloudformationClient.describeStacks({ StackName: stackName });
        if (!Stacks || Stacks.length === 0) {
            logger.info("Stack not Found: " + stackName);
            return false;
        }
        logger.info("Stacks found, will use first: " + Stacks);
        const stackStatus = Stacks[0].StackStatus;
        logger.info(`Stack ${stackName} Status: ${stackStatus}`);
        return true;
    }
    catch (error) {
        throw new Error('Unexpected error:' + error);
    }
}
/*
export async function deployStack(stackInput: Stack){
    logger.info("Stack will be deployed.");

    // Synthese des Stacks
    const app = new App();
    const stack = new stackInput(app, stackName);
    const assembly = app.synth();

    // Holen des CloudFormation-Templates
    const templateFilePath = `${assembly.directory}/stacks/${stack.stackName}.template.json`;
    const templateBody = require('fs').readFileSync(templateFilePath, 'utf8');

    // CloudFormation-Deployment über AWS SDK
    const client = new CloudFormationClient({ region: 'us-east-1' });

    const params = {
      StackName: stack.stackName,
      TemplateBody: templateBody,
      Capabilities: ['CAPABILITY_NAMED_IAM'],  // Falls IAM-Rollen erstellt werden
    };

    try {
      // Check if the stack already exists
      if (isDeployed) {
        // Falls es ein Update ist
        const updateCommand = new UpdateStackCommand(params);
        await client.send(updateCommand);
        logger.info("Stack update initiated.");
      } else {
        // Falls es ein neuer Stack ist
        const createCommand = new CreateStackCommand(params);
        await client.send(createCommand);
        logger.info("Stack creation initiated.");
      }
    } catch (err) {
      logger.error("Error deploying stack:", err);
      throw err;
    }
  }
}

*/ 
//# sourceMappingURL=checkStack.js.map