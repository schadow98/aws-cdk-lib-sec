import { SecStack, Secure } from '../aws-cdk-lib-sec';
import { Stack } from 'aws-cdk-lib';
import logger from '../tools/logger'; 
import { LogError } from './LogError';

// checks if the class of the stack is the secured class
export function checkStackClass(stack: Stack) {
    if (!(stack instanceof Secure)) {
        throw new LogError( "Stack is not derived from the secured class: " + stack.stackName);
    }

    // Log success if the stack is valid
    logger.info(`Stack ${stack.stackName} is derived from SecStack.`);
}
