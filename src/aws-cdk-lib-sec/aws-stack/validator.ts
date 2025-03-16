import { Stack }  from '..';
import * as cdk from '..';
import logger from '../../tools/logger'; 
import { ConfigurationError } from '../../tools/ConfigurationError';
import { SecMarker } from '../SecMarker';

// checks if the class of the stack is the secured class
export function checkSecClass(stack: Stack) {

    logger.debug("check stack class ")
    if (!(stack instanceof Stack)) {
        
        new ConfigurationError("class", "Stack is not derived from the secured class: " + stack);
    }

    validateStackTags(stack)


    for (const elem of stack.node.children){
        logger.debug("check class for secmarker of elem: " + elem)
        // ugly hack: LogRetentionFunction generated class thorough
        if (!hasSecMarker(elem) && elem.constructor.name !== 'LogRetentionFunction') {

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

function validateStackTags(stack: Stack){
   logger.debug("validateStackTags ")
   const tagmanager= cdk.TagManager.of(stack)
    if (!tagmanager){
        throw "Problem while rendering tags of stack"
    }

   const allTags = tagmanager.tagValues();
   
   const requiredTagKeys = ['environment', 'cost-center', 'budget', 'privacy-class', 'creator', 'created-at', 'compliance', 'governance'];

   const missingKeys: string[] = [];
   for (const requiredKey of requiredTagKeys) {
     if (!(requiredKey in allTags)) {
       missingKeys.push(requiredKey);
     }
   }
   if (missingKeys.length > 0){
    new ConfigurationError("stack.tags", "Missing tags in stack: " + missingKeys);
   }
}