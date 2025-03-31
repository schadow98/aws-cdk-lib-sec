import * as cdk from "aws-cdk-lib";
import { ConfigurationError } from "../../tools/ConfigurationError";
import logger from "../../tools/logger";

/**
 * Secure and extended implementation of `cdk.StackProps` with validation logic.
 * 
 * This class wraps and validates all input properties used to configure a CDK stack,
 * enforcing secure and standardized project-wide defaults.
 * 
 * Features:
 * - Validates and sets required metadata (e.g. `contact`, `description`, `tags`)
 * - Supports CDK environment and synthesizer configuration
 * - Applies safeguards like `terminationProtection`
 * 
 * @implements cdk.StackProps
 */
export class StackProps implements cdk.StackProps {
  public description: string;
  public contact: Contact;
  public env?: cdk.Environment;
  public stage? : string;
  public tags?: { [key: string]: string };
  public synthesizer?: cdk.IStackSynthesizer;
  public stackName?: string;
  public stackId?: string;
  public templateOptions?: cdk.ITemplateOptions;
  public terminationProtection?: boolean;

  constructor(props: Partial<StackProps> | undefined = {}) {
    logger.debug("StackProps Input" + JSON.stringify(props));
    this.contact = checkContact(props.contact);
    this.description = checkDescription(props.description);
    this.env = checkEnvironment(props.env);
    this.stage = checkStage(props.stage);
    this.tags = checkTags(props.tags, this.contact);
    this.synthesizer = props.synthesizer;
    this.stackName = props.stackName;
    this.stackId = props.stackId;
    this.templateOptions = props.templateOptions;
    this.terminationProtection = checkTerminationProtection(
      props.terminationProtection
    );
    logger.debug("StackProps Output " + JSON.stringify(this));
  }
}

/**
 * Defines contact metadata for a CDK stack.
 * 
 * Used to identify responsible teams and individuals for different operational areas.
 */
interface Contact{
  developerTeam: string
  operationTeam: string
  privacyManager: string
  securityManager: string
}

/**
 * Ensures that required contact tags are added to the stack's tag set.
 * 
 * This function enriches the provided tag object with contact metadata
 * such as developer, operations, privacy, and security responsibilities.
 * 
 * @param tags - Optional existing set of tags to extend.
 * @param contact - Contact information used to populate mandatory tags.
 * @returns The updated tag object including contact-related tags.
 */
function checkTags(tags: { [key: string]: string } = {}, contact: Contact){

    tags["developerTeam"] = contact.developerTeam
    tags["operationTeam"] = contact.operationTeam
    tags["privacyManager"] = contact.privacyManager
    tags["securityManager"] = contact.securityManager

    return tags
}

/**
 * Validates the provided contact information or applies a fallback structure.
 * 
 * If no contact is provided, a `ConfigurationError` is triggered and a default
 * (empty) `Contact` object is returned. This ensures that the structure is always present,
 * even if not correctly populated.
 * 
 * @param contact - Optional contact information object.
 * @returns A valid `Contact` object (may contain empty fields).
 */
function checkContact(contact: Contact | undefined): Contact {
  logger.debug("checkContact " + contact);
  if (!contact) {
    new ConfigurationError("contact", "Please provide a contact with valid options");
    contact = {
      developerTeam: "",
      operationTeam: "",
      privacyManager: "",
      securityManager: "",      
    }
  }
  return contact;
}

/**
 * Validates or defaults the deployment stage.
 * 
 * If no stage is provided, it defaults to `"development"`.
 * This value is used to distinguish environments like dev, test, or production.
 * 
 * @param stage - Optional stage string (e.g., `"development"`, `"production"`).
 * @returns A valid stage string.
 */
function checkStage(stage: string | undefined): string {
  logger.debug("checkStage " + stage);
  if (!stage) {
    logger.info("setting stage development")
    return "development";
  }
  return stage;
}
 
/**
 * Validates the stack description or applies a fallback value.
 * 
 * Ensures that the description:
 * - Is defined and a valid string
 * - Has a minimum length greater than 10 characters
 * 
 * If validation fails, a `ConfigurationError` is triggered and a default value `"Not defined"` is returned.
 * 
 * @param description - Optional description string for the stack.
 * @returns A valid description string.
 */
function checkDescription(description: string | undefined): string {
  logger.debug("checkDescription " + description);
  if (!description || typeof description !== "string") {
    new ConfigurationError(
      "description",
      "Please defiene a description for the stack"
    );
    description = "Not defined";
  }
  if (description.length <= 10) {
    new ConfigurationError("description", "Description for Stack to short");
  }
  return description;
}

/**
 * Validates the CDK environment configuration or applies a secure default.
 * 
 * If no environment is provided, the region defaults to `"eu-central-1"`.
 * 
 * Throws a `ConfigurationError` if a region other than `"eu-central-1"` is specified,
 * to enforce regional compliance or deployment constraints.
 * 
 * @param env - Optional CDK environment configuration.
 * @returns A valid `cdk.Environment` object with the required region.
 */
function checkEnvironment(env?: cdk.Environment): cdk.Environment {
  logger.debug("env " + env);
  if (!env) {
    logger.info("setting env eu-central-1")
    return { region: "eu-central-1" };
  }

  if (env?.region !== "eu-central-1") {
    new ConfigurationError("env.region", "region is not 'eu-central-1'");
  }
  return env;
}

/**
 * Validates the termination protection setting for the stack.
 * 
 * Ensures that termination protection is enabled to prevent accidental stack deletion.
 * 
 * - If not explicitly set, it defaults to `true`.
 * - If set to `false`, a `ConfigurationError` is thrown.
 * 
 * @param terminationProtection - Optional flag indicating whether termination protection is enabled.
 * @returns `true` if termination protection is enabled.
 */
function checkTerminationProtection(terminationProtection?: boolean): boolean {
  logger.debug("checkTerminationProtection " + terminationProtection);
  if (terminationProtection === undefined) {
    logger.info("setting terminationProtection true")
    return true;
  }
  if (terminationProtection !== true) {
    new ConfigurationError(
      "terminationProtection",
      "terminationProtection must be true"
    );
  }
  return terminationProtection;
}
