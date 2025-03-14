import logger from '../../tools/logger';
import { ConfigurationError } from '../../tools/ConfigurationError';
import { IpAddresses, IVpc, SubnetSelection, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from "constructs";

export function checkVPC(
    scope: Construct,
    vpc?: IVpc
): IVpc | undefined {
    logger.debug("checkVPC Input " + vpc)

    if(!vpc){
        logger.info("setting VPC")
    }



    return vpc
}


export function checkVPCSubnets(
    subnets?: SubnetSelection
): SubnetSelection | undefined {
    logger.debug("checkVPCSubnets Input " + subnets)

    if(!subnets){
        logger.info("setting VPC subnets")
    }

    return subnets
}

export function checkIpv6AllowedForDualStack(
    ipv6AllowedForDualStack?: boolean
): boolean | undefined {
    logger.debug("checkIpv6AllowedForDualStack Input: " + ipv6AllowedForDualStack);

    if (!ipv6AllowedForDualStack) {
        logger.info("setting VPC checkIpv6AllowedForDualStack");
    }

    return ipv6AllowedForDualStack;
}

export function checkAllowAllOutbound (
    allowAllOutbound ?: boolean
): boolean | undefined{
    logger.debug("checkAllowAllOutbound Input " + allowAllOutbound)
    if(!allowAllOutbound){
        logger.info("setting VPC checkIpv6AllowedForDualStack")
    }

    return allowAllOutbound
}

export function checkAllowAllIpv6Outbound(
    allowAllIpv6Outbound?: boolean
): boolean | undefined {
    logger.debug("checkAllowAllIpv6Outbound Input: " + allowAllIpv6Outbound);

    if (!allowAllIpv6Outbound) {
        logger.info("setting VPC checkAllowAllIpv6Outbound");
    }

    return allowAllIpv6Outbound;
}

export function checkAllowPublicSubnet (
    allowPublicSubnet  ?: boolean
): boolean | undefined{
    logger.debug("checkAllowPublicSubnet Input " + allowPublicSubnet)
    if(!allowPublicSubnet){
        logger.info("setting VPC allowPublicSubnet");
    }

    return allowPublicSubnet
}