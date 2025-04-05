import * as Lambda from 'aws-cdk-lib/aws-lambda';
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
export declare function checkCode(input_code?: Lambda.Code): Lambda.Code;
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
export declare function checkHandler(handler_name?: string): string;
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
export declare function checkDescription(description: string): string;
