import { isStackDeployed, deployStack } from "../../tools/checkStack";
import logger from "../../tools/logger";
import { ApiWithOAuth2AuthorizerStack } from "./deploy";


export function checkAuthorizerLambdaStatus(stackName: string) {
  isStackDeployed(ApiWithOAuth2AuthorizerStack.stackName)
    .then((isDeployed) => {
      if (isDeployed) {
        logger.info("Stack is deployed.");
      } else {
        logger.info("Stack will be deployed.");
        deployStack(ApiWithOAuth2AuthorizerStack)
      }
    })
}
