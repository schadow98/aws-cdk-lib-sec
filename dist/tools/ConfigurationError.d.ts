import { Stack } from "../aws-cdk-lib-sec";
import { Construct } from 'constructs';
/**
 * Converts collected `ConfigurationError` entries into detailed error constructs.
 *
 * Attaches detailed configuration errors to a specific CDK construct for
 * traceability and validation reporting within the CDK app.
 *
 * - Converts all items from the global `configurationErrors` list
 *   into `DetailedConfigurationError` instances tied to the given resource.
 * - Empties the original `configurationErrors` array after processing.
 *
 * @param ressource - The CDK construct (e.g., a stack or resource) to associate with the errors.
 * @param resourceId - The identifier used for error tracing and reporting.
 */
export declare function addConfigurationErrorDetails(ressource: Construct, resourceId: string): void;
/**
 * Processes all collected `DetailedConfigurationError` entries for a given stack.
 *
 * For each insecure resource:
 * - Determines if the insecure configuration is explicitly tagged with a justification.
 * - Adds stack-level metadata tags to mark the presence of insecure components.
 * - Validates that all required risk management tags are set (as defined in chapter 3.6), including:
 *   - `insecure`
 *   - `insecureValidTo`
 *   - `insecureResponsible`
 *
 * In non-`DEBUG` mode, the function will throw errors for missing or invalid tags.
 * In `DEBUG` mode, it will only log warnings.
 *
 * @param stack - The CDK stack whose detailed configuration errors should be processed.
 */
export declare function handleDetailedConfigurationErrors(stack: Stack): void;
/**
 * Represents a configuration-related validation error within the CDK application.
 *
 * - Contains the name of the attribute (`attribut`) that caused the validation failure.
 * - If `DEBUG` mode is **not** enabled, the error is immediately thrown.
 * - If `DEBUG` mode **is** enabled, the error is collected in `configurationErrors` for deferred processing.
 *
 * This allows the application to switch between fail-fast and debug-friendly validation behavior.
 */
export declare class ConfigurationError extends Error {
    attribut: string;
    constructor(attribut: string, message: string | undefined);
}
