import * as Lambda  from 'aws-cdk-lib/aws-lambda';
import { SecFunctionProps } from './SecFunctionProps';
import { ConfigurationError } from '../../tools/ConfigurationError';
import logger from '../../tools/logger';
export function checkCode(input_code: Lambda.Code = SecFunctionProps.defaultCode): Lambda.Code{
    logger.debug("checkCode " + input_code)

    if (input_code instanceof Lambda.AssetCode) {
        if (input_code.path !== SecFunctionProps.defaultCode.path) {
            new ConfigurationError("code", "Please define the code in the directory 'src'");
        }
    } else {
        new Error("The provided code must be of type 'AssetCode'");
    }
    return input_code
}

export function checkHandler(handler_name: string=SecFunctionProps.defaultHandler): string{
    logger.debug("checkHandler " + handler_name)
    if (handler_name !== SecFunctionProps.defaultHandler){
        new ConfigurationError("handler", "Please defiend the handler in a file 'handle' with an method 'handler' -> set this value to 'handler.handler'");
    }
    return handler_name
}

export function checkDescription(description: string): string{
    logger.debug("checkDescription " + description)
    if (!description || description.length < 20){
        new ConfigurationError("description", "Please describe the lambda function with a least 20 letters");
    }
    return description
}



