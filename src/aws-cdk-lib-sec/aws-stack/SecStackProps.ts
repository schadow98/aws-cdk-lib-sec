import * as cdk from "aws-cdk-lib";
import { ConfigurationError } from "../../tools/ConfigurationError";
import logger from "../../tools/logger";

export class SecStackProps implements cdk.StackProps {
  public description: string;
  public env?: cdk.Environment;
  public tags?: { [key: string]: string };
  public synthesizer?: cdk.IStackSynthesizer;
  public stackName?: string;
  public stackId?: string;
  public templateOptions?: cdk.ITemplateOptions;
  public terminationProtection?: boolean;

  constructor(props: Partial<SecStackProps> | undefined = {}) {
    logger.debug("SecStackProps Input" + JSON.stringify(props));
    this.description = checkDescription(props.description);
    this.env = checkEnvironment(props.env);
    this.tags = props.tags;
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
