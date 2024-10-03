import { SecStack } from '../aws-cdk-lib-sec';
import { Stack } from 'aws-cdk-lib';
import logger from '../tools/logger'; 
import { LogError } from './LogError';

// checks if the class of the stack is the secured class
export function checkStackClass(stack: Stack) {

    if (!(stack instanceof SecStack)) {
        throw new LogError( "Stack is not derived from the secured class: " + stack.stackName);
    }


    /*
    Überlegen, wie man überprüfen kann, ob auch die Secured Funktionen genutzt wurden
    for (var elem of stack.node.children){
        if (!isSafe(elem)) {
            throw new LogError( "Elem of stack " + stack.stackName + " is not dervied from the secured class: " + elem);
        }
    }*/

    // Log success if the stack is valid
    logger.info(`Stack ${stack.stackName} is derived from SecStack.`);
}

// checks if the class is derived from the secured framework
// every 
function isSafe(obj: any): boolean {
    return obj.isSafe === true;
  }
  