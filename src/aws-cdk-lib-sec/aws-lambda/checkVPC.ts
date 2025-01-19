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
        return new Vpc(scope, 'TheVPC', {
            ipAddresses: IpAddresses.cidr('10.0.0.0/16'),
          })
    }

    //checkIfVPCIsPrivate

    return undefined
}


export function checkVPCSubnets(
    subnets?: SubnetSelection
): SubnetSelection | undefined {
    logger.debug("checkVPCSubnets Input " + subnets)

    if(!subnets){
        //check if VPC exisits somewhere an append
    }

    //checkIfVPCIsPrivate

    return undefined
}

export function checkIpv6AllowedForDualStack(
    ipv6AllowedForDualStack?: boolean
): boolean{
    logger.debug("checkIpv6AllowedForDualStack Input " + ipv6AllowedForDualStack)
    if(ipv6AllowedForDualStack===true){
        new ConfigurationError("ipv6AllowedForDualStack", "please disable ipv6AllowedForDualStack, so no network attacks are possible")
        return ipv6AllowedForDualStack
    }
    if(!ipv6AllowedForDualStack){
        return false
    }
    return ipv6AllowedForDualStack
}

export function checkAllowAllOutbound (
    allowAllOutbound ?: boolean
): boolean{
    logger.debug("checkAllowAllOutbound Input " + allowAllOutbound)
    if(allowAllOutbound===true){
        new ConfigurationError("allowAllOutbound", "please disable allowAllOutbound, so no network attacks are possible")
        return allowAllOutbound
    }
    if(!allowAllOutbound){
        return false
    }
    return allowAllOutbound
}

export function checkAllowAllIpv6Outbound(
    allowAllIpv6Outbound ?: boolean
): boolean{
    logger.debug("checkAllowAllIpv6Outbound Input " + allowAllIpv6Outbound)
    if(allowAllIpv6Outbound===true){
        new ConfigurationError("allowAllIpv6Outbound", "please disable allowAllIpv6Outbound, so no network attacks are possible")
        return allowAllIpv6Outbound
    }
    if(!allowAllIpv6Outbound){
        return false
    }
    return allowAllIpv6Outbound
}

export function checkAllowPublicSubnet (
    allowPublicSubnet  ?: boolean
): boolean{
    logger.debug("checkAllowPublicSubnet Input " + allowPublicSubnet)
    if(allowPublicSubnet===true){
        new ConfigurationError("allowPublicSubnet", "please disable allowPublicSubnet, so no network attacks are possible")
        return allowPublicSubnet
    }
    if(!allowPublicSubnet){
        return false
    }
    return allowPublicSubnet
}