import * as Lambda  from 'aws-cdk-lib/aws-lambda';
import { FunctionProps } from './SecFunctionProps';
import { ConfigurationError } from '../tools/ConfigurationError';
import logger from '../tools/logger';

/**
 * Validates the provided Lambda `Code` configuration.
 * 
 * Ensures that:
 * - The code is of type `AssetCode`
 * - The path matches the expected secure default (`'src'` directory)
 * 
 * Throws a `ConfigurationError` if the path is incorrect,
 * or a general `Error` if the code is not an instance of `AssetCode`.
 * 
 * @param input_code - The Lambda code to validate. Defaults to the secure fallback from `FunctionProps.defaultCode`.
 * @returns The validated `Lambda.Code` instance.
 */
export function checkCode(input_code: Lambda.Code = FunctionProps.defaultCode): Lambda.Code{
    logger.debug("checkCode " + input_code)

    if (input_code instanceof Lambda.AssetCode) {
        if (input_code.path !== FunctionProps.defaultCode.path) {
            new ConfigurationError("code", "Please define the code in the directory 'src'");
        }
    } else {
        new Error("The provided code must be of type 'AssetCode'");
    }
    logger.info("setting code to " + FunctionProps.defaultCode)
    return input_code
}

/**
 * Validates the Lambda handler configuration.
 * 
 * Ensures that the handler follows the convention: `'handler.handler'`, 
 * meaning the function must be exported from a file named `handler.ts|js`.
 * 
 * Throws a `ConfigurationError` if the handler deviates from this convention.
 * 
 * @param handler_name - The name of the handler function. Defaults to `FunctionProps.defaultHandler`.
 * @returns The validated handler name.
 */
export function checkHandler(handler_name: string=FunctionProps.defaultHandler): string{
    logger.debug("checkHandler " + handler_name)
    if (handler_name !== FunctionProps.defaultHandler){
        new ConfigurationError("handler", "Please defiend the handler in a file 'handle' with an method 'handler' -> set this value to '" + FunctionProps.defaultHandler + "'");
    }
    logger.info("setting handler to " + FunctionProps.defaultHandler)
    return handler_name
}

/**
 * Validates the description for a Lambda function.
 * 
 * Ensures that the description is present and contains at least 20 characters.
 * 
 * Throws a `ConfigurationError` if the description is too short or empty.
 * 
 * @param description - The description string to validate.
 * @returns The validated description.
 */
export function checkDescription(description: string): string{
    logger.debug("checkDescription " + description)
    if (!description || description.length < 20){
        new ConfigurationError("description", "Please describe the lambda function with a least 20 letters");
    }
    return description
}



