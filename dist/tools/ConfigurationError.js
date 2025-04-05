"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationError = void 0;
exports.addConfigurationErrorDetails = addConfigurationErrorDetails;
exports.handleDetailedConfigurationErrors = handleDetailedConfigurationErrors;
const aws_cdk_lib_sec_1 = require("../aws-cdk-lib-sec");
const logger_1 = __importDefault(require("./logger"));
/**
 * Holds all basic configuration errors collected during construct validation.
 *
 * These are temporary and will be converted into `DetailedConfigurationError` instances
 * via `addConfigurationErrorDetails()` for structured reporting.
 */
const configurationErrors = [];
/**
 * Contains enriched configuration errors bound to specific CDK constructs.
 *
 * Used to track validation issues across resources with context such as
 * construct scope, resource ID, attribute, and message.
 */
const detailedConfigurationErrors = [];
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
function addConfigurationErrorDetails(ressource, resourceId) {
    configurationErrors.forEach(error => {
        const detailedError = new DetailedConfigurationError(ressource, resourceId, error.attribut, error.message);
        detailedConfigurationErrors.push(detailedError);
    });
    configurationErrors.length = 0;
}
/**
 * Checks whether an insecure configuration is explicitly tagged and accepted.
 *
 * - If the given `tagName` exists in the resource's tags, the configuration is considered intentionally insecure.
 * - If the tag is missing and `DEBUG` mode is off, the function throws the `DetailedConfigurationError`.
 * - If `DEBUG` is enabled, it logs an error and allows the deployment to continue (useful for development).
 *
 * @param detailedConfigurationError - The detailed error describing the insecure configuration.
 * @param tagName - The name of the tag that allows an insecure configuration when present.
 * @param tagManager - The CDK `TagManager` instance used to inspect tags on the resource.
 * @returns `true` if the resource is insecure (either explicitly tagged or tolerated in DEBUG), otherwise the error is thrown.
 */
function checkIfUnsecureConfigurationisTagged(detailedConfigurationError, tagName, tagManager) {
    let isResourceUnsecure = false;
    // Überprüfung, ob eine unsichere Konfiguration gewollt ist oder Fehlerbehandlung fehlt
    if (tagManager.tagValues() && tagName in tagManager.tagValues()) {
        isResourceUnsecure = true;
        logger_1.default.warn(`Ressource ${detailedConfigurationError.resource.toString()} hat ein unsicheres Parameter ${detailedConfigurationError.attribut}: ${tagManager.tagValues()[tagName]}`);
    }
    else {
        if (!process.env.DEBUG) {
            throw detailedConfigurationError;
        }
        else {
            isResourceUnsecure = true;
            logger_1.default.error(`Unsichere Konfiguration. Bitte fügen Sie einen Tag ${tagName} hinzu auf: ${detailedConfigurationError.toString()}`);
        }
    }
    return isResourceUnsecure;
}
/**
 * Adds metadata tags to the stack to mark the presence of an insecure resource configuration.
 *
 * Tags added:
 * - `includesInsecureResource: true` — Indicates that the stack contains at least one insecure configuration.
 * - `<resourceId>:<attribute>:insecureReason` — Explains the reason for the insecure setting, taken from the specified tag or defaults to `"No reason set"`.
 *
 * @param detailedConfigurationError - The error object representing the insecure resource and attribute.
 * @param tagName - The name of the tag to extract the justification/reason from.
 * @param tagManager - The CDK `TagManager` used to retrieve tag values.
 */
function addTagsToStack(detailedConfigurationError, tagName, tagManager) {
    const resourceStack = aws_cdk_lib_sec_1.Stack.of(detailedConfigurationError.resource);
    resourceStack.tags.setTag('includesInsecureResource', 'true');
    resourceStack.tags.setTag(`${detailedConfigurationError.resourceId}:${detailedConfigurationError.attribut}:insecureReason`, tagManager.tagValues()[tagName] || "No reason set");
}
/**
 * Validates that all required risk management tags are present and correctly formatted on an insecure resource.
 *
 * Required tags:
 * - `insecure`: Must be set to `"true"`.
 * - `insecureValidTo`: Must be a valid future date (format: `DD.MM.YYYY` or ISO accepted).
 * - `insecureResponsible`: Must be a descriptive string with at least 10 characters identifying the responsible person.
 *
 * Behavior:
 * - Throws an error if any tag is missing or invalid, unless `DEBUG` mode is enabled.
 * - In `DEBUG` mode, logs the error instead of throwing.
 *
 * @param detailedConfigurationError - The error object containing information about the insecure resource.
 * @param tagManager - The CDK `TagManager` used to access the resource's tags.
 */
function checkIfValidRiskManagementTagsAreOnRessourceToo(detailedConfigurationError, tagManager) {
    // define needed tags
    const neededTags = [
        {
            key: 'insecure',
            validate: (x) => x.trim() === 'true',
            expected: 'Unsecure component - please add a tag: insecure:true'
        },
        {
            key: 'insecureValidTo',
            validate: (x) => {
                const date = new Date(x.trim());
                return !isNaN(date.getTime()) && date > new Date();
            },
            expected: 'Unsecure component - please add a tag with a valid future date until when the exception is valid, e.g.: insecureValidTo:01.01.2025'
        },
        {
            key: 'insecureResponsible',
            validate: (x) => x.trim().length >= 10,
            expected: 'Unsecure component - please add a tag with a responsible person, e.g.: insecureResponsible:Malte Schadow, Cyber Risk Manager of the application XXX'
        }
    ];
    // check the resource and tags
    for (const neededTag of neededTags) {
        if (neededTag.key in tagManager.tagValues()) {
            const tagValue = tagManager.tagValues()[neededTag.key];
            if (!neededTag.validate(tagValue)) {
                const errorMsg = `Ressource ${detailedConfigurationError.resource.toString()} hat ein unsicheres Parameter and need a risk management tag ${neededTag.key} - ${neededTag.expected}: got ${tagValue}`;
                if (!process.env.DEBUG) {
                    throw new Error(errorMsg);
                }
                else {
                    logger_1.default.error(errorMsg);
                }
            }
        }
        else {
            const errorMsg = `Ressource ${detailedConfigurationError.resource.toString()} hat ein unsicheres Parameter and need a risk management tag ${neededTag.key} - ${neededTag.expected}`;
            if (!process.env.DEBUG) {
                throw new Error(errorMsg);
            }
            else {
                logger_1.default.error(errorMsg);
            }
        }
    }
}
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
function handleDetailedConfigurationErrors(stack) {
    logger_1.default.debug("handleDetailedConfigurationErrors" + stack.stackId);
    for (const detailedConfigurationError of detailedConfigurationErrors) {
        // Zugriff auf das CloudFormation-Objekt der Ressource
        const cfnFunction = detailedConfigurationError.resource.node.defaultChild;
        const tagManager = cfnFunction.tags;
        const tagName = `${detailedConfigurationError.attribut}:insecureReason`;
        const isResourceUnsecure = checkIfUnsecureConfigurationisTagged(detailedConfigurationError, tagName, tagManager);
        if (isResourceUnsecure) {
            addTagsToStack(detailedConfigurationError, tagName, tagManager);
        }
        // Überprüfung, ob andere erforderliche Tags gesetzt sind, um Risiko zu markieren und zu managen
        // define the tags and rules from chapter 3.6
        if (isResourceUnsecure) {
            checkIfValidRiskManagementTagsAreOnRessourceToo(detailedConfigurationError, tagManager);
        }
    }
}
/**
 * Represents a configuration-related validation error within the CDK application.
 *
 * - Contains the name of the attribute (`attribut`) that caused the validation failure.
 * - If `DEBUG` mode is **not** enabled, the error is immediately thrown.
 * - If `DEBUG` mode **is** enabled, the error is collected in `configurationErrors` for deferred processing.
 *
 * This allows the application to switch between fail-fast and debug-friendly validation behavior.
 */
class ConfigurationError extends Error {
    attribut;
    constructor(attribut, message) {
        super(message);
        this.attribut = attribut;
        this.name = 'ConfigurationError'; // Der Fehlername
        if (!process.env.DEBUG) {
            throw this; // Fehler werfen, wenn DEBUG nicht gesetzt ist
        }
        else {
            configurationErrors.push(this); // Fehler in die Liste einfügen
        }
    }
}
exports.ConfigurationError = ConfigurationError;
/**
 * Represents a configuration error with additional context about the affected resource.
 *
 * Extends `ConfigurationError` by adding:
 * - `resourceId`: Identifier of the resource where the error occurred.
 * - `resource`: The actual CDK construct associated with the error.
 *
 * Provides a `toString()` method for structured logging and diagnostics.
 *
 * This class is used to trace misconfigurations back to their specific constructs in the CDK app.
 *
 * @extends ConfigurationError
 */
class DetailedConfigurationError extends ConfigurationError {
    resourceId;
    resource;
    constructor(resource, resourceId, attribut, message) {
        super('DetailedConfigurationError', message);
        this.resourceId = resourceId;
        this.resource = resource;
        this.attribut = attribut;
    }
    toString() {
        return JSON.stringify({
            resource: this.resource.toString(),
            resourceId: this.resourceId,
            attribut: this.attribut,
            message: this.message
        });
    }
}
//# sourceMappingURL=ConfigurationError.js.map