import { Stack }  from '..';
import * as cdk from '..';
import logger from '../../tools/logger'; 
import { ConfigurationError } from '../../tools/ConfigurationError';
import { SecMarker } from '../SecMarker';

// checks if the class of the stack is the secured class
export function checkSecClass(stack: Stack) {

    if (!(stack instanceof Stack)) {
        new ConfigurationError("class", "Stack is not derived from the secured class: " + stack);
    }


    for (var elem of stack.node.children){
        logger.debug("check class for secmarker of elem: " + elem)
        if (!hasSecMarker(elem)) {
            new ConfigurationError("stack.children", "Elem of stack " + stack.stackName + " is not dervied from the secured class: " + elem);
        }
    }

    // Log success if the stack is valid
    logger.debug(`Stack ${stack.stackName} is derived from SecStack.`);
}

// checks if the class is derived from the secured framework
// every 
export function hasSecMarker(construct: any): boolean {
    const SecMarkerValue = (construct.constructor as any)[SecMarker];
    return SecMarkerValue === true;
}

export function checkSafeAttributForSecMarker(construct: any): any{
    if(!construct){
        return undefined
    }
    return hasSecMarker(construct)
}