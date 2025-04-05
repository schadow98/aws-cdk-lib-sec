import * as aws_apigateway from 'aws-cdk-lib/aws-apigateway' ;
import logger from '../tools/logger';

/**
 * Validates and returns a complete `DomainNameOptions` configuration for an API Gateway custom domain.
 * If no input is provided, `undefined` is returned.
 *  Checks if the domainInput ist secured and endPointType is Private
 *
 * @param domainNameOptionsInput - Optional input for `DomainNameOptions` to validate or use as a base.
 * @returns A valid `DomainNameOptions` object or `undefined` if no input is given.
 */
export function checkDomainName(domainNameOptionsInput?: aws_apigateway.DomainNameOptions): aws_apigateway.DomainNameOptions | undefined{
    logger.debug("checkDomainName " + domainNameOptionsInput)
    if (!domainNameOptionsInput){
        logger.debug("set domainInput (seured - cert and domainname)")
        logger.debug("set endPointType Private")
    }
    return domainNameOptionsInput
}