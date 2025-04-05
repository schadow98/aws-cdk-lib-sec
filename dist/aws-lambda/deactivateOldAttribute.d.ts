/**
 * Deactivates an old attribute by checking and optionally modifying a parameter value.
 *
 * This function can be used to mark or remove outdated parameter values
 * based on the provided name and value.
 *
 * @param paramName - The name of the parameter to process.
 * @param paramValue - Optional current value of the parameter.
 * @returns The updated parameter value or `undefined` if it should be removed or left unchanged.
 */
export declare function deactivateOldAttribute(paramName: string, paramValue?: string | undefined): (string | undefined);
