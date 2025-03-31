import { Stack }  from '..';
import * as cdk from '..';
import logger from '../../tools/logger'; 
import { ConfigurationError } from '../../tools/ConfigurationError';
import { SecMarker } from '../SecMarker';

/**
 * Validates that the provided stack and all its children are based on secured classes.
 * 
 * - Verifies that the stack is an instance of the custom secure `Stack` class.
 * - Checks each child construct for the presence of the `SecMarker` symbol,
 *   excluding CDK-generated constructs like `LogRetentionFunction`.
 * - Triggers a `ConfigurationError` if any construct is not security-compliant.
 * 
 * Also calls `validateStackTags` to ensure required metadata is present.
 *
 * @param stack - The stack instance to validate.
 */
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

/**
 * Checks whether a construct class is marked as security-compliant using the `SecMarker` symbol.
 * 
 * This is used to identify constructs that conform to the secure implementation standards
 * defined in the project (e.g., enhanced validation, tagging, hardening).
 * 
 * @param construct - The construct instance to check.
 * @returns `true` if the construct class is marked with `SecMarker`, otherwise `false`.
 */
export function hasSecMarker(construct: any): boolean {
    const SecMarkerValue = (construct.constructor as any)[SecMarker];
    return SecMarkerValue === true;
}

/**
 * Safely checks whether a construct is marked as security-compliant using the `SecMarker`.
 * 
 * Returns `undefined` if the construct is null or undefined,
 * otherwise delegates to `hasSecMarker()` to perform the actual check.
 * 
 * @param construct - The construct to validate.
 * @returns `true` if the construct has `SecMarker`, `false` if not, or `undefined` if input is falsy.
 */
export function checkSafeAttributForSecMarker(construct: any): any{
    if(!construct){
        return undefined
    }
    return hasSecMarker(construct)
}

/**
 * Validates that all required metadata tags are present on the provided CDK stack.
 * 
 * Required tags include:
 * - `environment`
 * - `cost-center`
 * - `budget`
 * - `privacy-class`
 * - `creator`
 * - `created-at`
 * - `compliance`
 * - `governance`
 * 
 * Throws a `ConfigurationError` if any required tag is missing.
 * 
 * @param stack - The CDK stack to validate.
 */
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