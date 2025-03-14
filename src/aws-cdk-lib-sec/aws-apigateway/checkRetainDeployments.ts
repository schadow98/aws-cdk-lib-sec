import { ConfigurationError } from '../../tools/ConfigurationError';
import logger from '../../tools/logger';

export function checkRetainDeployments(retainDeployments: boolean | undefined): boolean {
    logger.debug("checkRetainDeployments " + retainDeployments)
    if (retainDeployments === undefined) {
        logger.debug("setting retainDeployments to true")
      return false;
    }
  
    if (retainDeployments === true) {
      new ConfigurationError("retainDeployments", "retainDeployments darf nicht auf true gesetzt sein.");
    }
  
    return false;
  }