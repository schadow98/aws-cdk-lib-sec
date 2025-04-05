import * as Lambda from "aws-cdk-lib/aws-lambda";
/**
 * Validates the provided Lambda `RuntimeManagementMode` or defaults it to `Auto`.
 *
 * Ensures that a valid runtime management mode is used. If none is provided,
 * the mode is set to `Lambda.RuntimeManagementMode.AUTO`.
 *
 * @param runtimeManagementMode - Optional runtime management mode for the Lambda function.
 * @returns A valid `RuntimeManagementMode`, defaulting to `AUTO` if not specified.
 */
export declare function checkRuntimeManagementMode(runtimeManagementMode?: Lambda.RuntimeManagementMode): Lambda.RuntimeManagementMode;
