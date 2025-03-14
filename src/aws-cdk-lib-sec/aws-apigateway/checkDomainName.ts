import * as aws_apigateway from 'aws-cdk-lib/aws-apigateway' ;
import logger from '../../tools/logger';
export function checkDomainName(domainNameOptionsInput?: aws_apigateway.DomainNameOptions): aws_apigateway.DomainNameOptions | undefined{
    logger.debug("checkDomainName " + domainNameOptionsInput)
    if (!domainNameOptionsInput){
        logger.debug("set domainInput (seured - cert and domainname)")
        logger.debug("set endPointType Private")
    }
    return domainNameOptionsInput
}