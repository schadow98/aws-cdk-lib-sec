import * as cdk from "aws-cdk-lib";
import { ConfigurationError } from "../../tools/ConfigurationError";
import logger from "../../tools/logger";

export class SecStackProps implements cdk.StackProps {
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

  constructor(props: Partial<SecStackProps> | undefined = {}) {
    logger.debug("SecStackProps Input" + JSON.stringify(props));
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
    logger.debug("SecStackProps Output " + JSON.stringify(this));
  }
}

interface Contact{
  developerTeam: string
  operationTeam: string
  privacyManager: string
  securityManager: string
}

function checkTags(tags: { [key: string]: string } = {}, contact: Contact){

    tags["developerTeam"] = contact.developerTeam
    tags["operationTeam"] = contact.operationTeam
    tags["privacyManager"] = contact.privacyManager
    tags["securityManager"] = contact.securityManager

    return tags
}

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

function checkStage(stage: string | undefined): string {
  logger.debug("checkStage " + stage);
  if (!stage) {
    logger.info("setting stage development")
    return "development";
  }
  return stage;
}
 

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
