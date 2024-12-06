import { error } from "console";
import { CfnResource, Stack } from "../aws-cdk-lib-sec";
import * as cdk from "../aws-cdk-lib-sec";
import logger from "./logger";
import { Construct } from 'constructs';

const configurationErrors: ConfigurationError[] = [];
const detailedConfigurationErrors: DetailedConfigurationError[] = [];


export function addConfigurationErrorDetails( ressource: Construct, resourceId: string) {
  configurationErrors.forEach(error => {
    const detailedError = new DetailedConfigurationError(ressource, resourceId, error.attribut, error.message);
    detailedConfigurationErrors.push(detailedError);
  });
  configurationErrors.length = 0; 

}

export function handleDetailedConfigurationErrors(stack: Stack) {
  for (const detailedConfigurationError of detailedConfigurationErrors) {
    // Zugriff auf das CloudFormation-Objekt der Ressource
    const cfnFunction = detailedConfigurationError.resource.node.defaultChild as cdk.CfnResource;
    const tagManager = (cfnFunction as any).tags;
    const tagName: string = `${detailedConfigurationError.attribut}:insecureReason`;
    let isResourceUnsecure = false;

    // Überprüfung, ob eine unsichere Konfiguration gewollt ist oder Fehlerbehandlung fehlt
    if (tagManager.tagValues() && tagName in tagManager.tagValues()) {
      isResourceUnsecure = true;
      logger.warn(`Ressource ${detailedConfigurationError.resource.toString()} hat ein unsicheres Parameter ${detailedConfigurationError.attribut}: ${tagManager.tagValues()[tagName]}`);
    } else {
      if (!process.env.DEBUG) {
        throw detailedConfigurationError;
      } else {
        isResourceUnsecure = true;
        logger.error(`Unsichere Konfiguration. Bitte fügen Sie einen Tag ${tagName} hinzu auf: ${detailedConfigurationError.toString()}`);
      }
    }

    // Add tag to stack to, so stack know that resource is unsecure too
    
    if (isResourceUnsecure) {
      const resourceStack = Stack.of(detailedConfigurationError.resource);
      resourceStack.tags.setTag('includesInsecureResource', 'true');
      resourceStack.tags.setTag(`${detailedConfigurationError.resourceId}:${detailedConfigurationError.attribut}:insecureReason`, tagManager.tagValues()[tagName] || "No reason set");
    }


    // Überprüfung, ob andere erforderliche Tags gesetzt sind, um Risiko zu markieren und zu managen
    // define the tags and rules from chapter 3.6
    if (isResourceUnsecure) {
      const neededTags = [
        {
          key: 'insecure',
          validate: (x: string) => x.trim() === 'true',
          expected: 'Unsecure component - please add a tag: insecure:true'
        },
        {
          key: 'insecureValidTo',
          validate: (x: string) => {
            const date = new Date(x.trim());
            return !isNaN(date.getTime()) && date > new Date();
          },
          expected: 'Unsecure component - please add a tag with a valid future date until when the exception is valid, e.g.: insecureValidTo:01.01.2025'
        },
        {
          key: 'insecureResponsible',
          validate: (x: string) => x.trim().length >= 10,
          expected: 'Unsecure component - please add a tag with a responsible person, e.g.: insecureResponsible:Malte Schadow, Cyber Risk Manager of the application XXX'
        }
      ];

      // check the resource and tags
      for (const neededTag of neededTags) {
        if (neededTag.key in tagManager.tagValues()) {
          const tagValue = tagManager.tagValues()[neededTag.key];
          if (!neededTag.validate(tagValue)) {
            const errorMsg =`Ressource ${detailedConfigurationError.resource.toString()} hat ein unsicheres Parameter and need a risk management tag ${neededTag.key} - ${neededTag.expected}: got ${tagValue}`
            if (!process.env.DEBUG) {
              throw new Error(errorMsg)
            } else {
              logger.error(errorMsg);
            }
          }
        } else {
          const errorMsg = `Ressource ${detailedConfigurationError.resource.toString()} hat ein unsicheres Parameter and need a risk management tag ${neededTag.key} - ${neededTag.expected}`
          if (!process.env.DEBUG) {
            throw new Error(errorMsg)
          } else {
            logger.error(errorMsg);
          }
        }
      }
    }
  }
}



export class ConfigurationError extends Error {
  attribut: string;

  constructor(attribut: string, message: string | undefined) {
    super(message);
    this.attribut = attribut;
    this.name = 'ConfigurationError'; // Der Fehlername

    if (!process.env.DEBUG) {
      throw this; // Fehler werfen, wenn DEBUG nicht gesetzt ist
    } else {
      configurationErrors.push(this); // Fehler in die Liste einfügen
    }
  }
}

class DetailedConfigurationError extends ConfigurationError {
  resourceId: string;
  resource: Construct;

  constructor(resource: Construct, resourceId: string, attribut: string, message: string | undefined) {
    super('DetailedConfigurationError', message);
    this.resourceId = resourceId;
    this.resource = resource;
    this.attribut = attribut

  }

  toString(){
    return JSON.stringify({
      resource: this.resource.toString(),
      resourceId: this.resourceId,
      attribut: this.attribut,
      message: this.message
    });
  }
}
