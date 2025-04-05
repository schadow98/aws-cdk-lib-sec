"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkVPC = checkVPC;
exports.checkVPCSubnets = checkVPCSubnets;
exports.checkIpv6AllowedForDualStack = checkIpv6AllowedForDualStack;
exports.checkAllowAllOutbound = checkAllowAllOutbound;
exports.checkAllowAllIpv6Outbound = checkAllowAllIpv6Outbound;
exports.checkAllowPublicSubnet = checkAllowPublicSubnet;
const logger_1 = __importDefault(require("../../tools/logger"));
/**
 * Validates and returns the provided VPC configuration.
 *
 * If no VPC is provided, logs that a default or external VPC will be used or configured.
 * Useful for handling conditional VPC setup in constructs.
 *
 * @param scope - The CDK construct scope in which the VPC is being referenced or configured.
 * @param vpc - Optional VPC to be used. If not provided, `undefined` is returned.
 * @returns The provided VPC or `undefined` if none is given.
 */
function checkVPC(scope, vpc) {
    logger_1.default.debug("checkVPC Input " + vpc);
    if (!vpc) {
        logger_1.default.info("setting VPC");
    }
    return vpc;
}
/**
 * Validates and returns the provided VPC subnet selection.
 *
 * If no subnet selection is provided, logs that a default selection will be used.
 * Useful for applying custom or default subnet configurations when working with VPCs.
 *
 * @param subnets - Optional subnet selection for the VPC.
 * @returns The provided `SubnetSelection` or `undefined` if none is given.
 */
function checkVPCSubnets(subnets) {
    logger_1.default.debug("checkVPCSubnets Input " + subnets);
    if (!subnets) {
        logger_1.default.info("setting VPC subnets");
    }
    return subnets;
}
/**
 * Validates the IPv6 dual-stack setting for a VPC.
 *
 * If not explicitly set, logs that the setting will default or be configured elsewhere.
 * This flag determines whether IPv6 is allowed for dual-stack subnets.
 *
 * @param ipv6AllowedForDualStack - Optional flag to allow IPv6 in dual-stack mode.
 * @returns The provided flag value or `undefined` if not set.
 */
function checkIpv6AllowedForDualStack(ipv6AllowedForDualStack) {
    logger_1.default.debug("checkIpv6AllowedForDualStack Input: " + ipv6AllowedForDualStack);
    if (!ipv6AllowedForDualStack) {
        logger_1.default.info("setting VPC checkIpv6AllowedForDualStack");
    }
    return ipv6AllowedForDualStack;
}
/**
 * Validates the `allowAllOutbound` setting for a security group or resource.
 *
 * If not provided, logs that a default outbound rule configuration will be applied.
 * This flag controls whether all outbound traffic is allowed by default.
 *
 * @param allowAllOutbound - Optional flag to allow all outbound traffic.
 * @returns The provided flag value or `undefined` if not set.
 */
function checkAllowAllOutbound(allowAllOutbound) {
    logger_1.default.debug("checkAllowAllOutbound Input " + allowAllOutbound);
    if (!allowAllOutbound) {
        logger_1.default.info("setting VPC checkIpv6AllowedForDualStack");
    }
    return allowAllOutbound;
}
/**
 * Validates the `allowAllIpv6Outbound` setting for a security group or resource.
 *
 * If not explicitly set, logs that a default IPv6 outbound rule configuration will be applied.
 * This flag determines whether all IPv6 outbound traffic is allowed by default.
 *
 * @param allowAllIpv6Outbound - Optional flag to allow all outbound IPv6 traffic.
 * @returns The provided flag value or `undefined` if not set.
 */
function checkAllowAllIpv6Outbound(allowAllIpv6Outbound) {
    logger_1.default.debug("checkAllowAllIpv6Outbound Input: " + allowAllIpv6Outbound);
    if (!allowAllIpv6Outbound) {
        logger_1.default.info("setting VPC checkAllowAllIpv6Outbound");
    }
    return allowAllIpv6Outbound;
}
/**
 * Validates the `allowPublicSubnet` setting for a resource within a VPC.
 *
 * If not explicitly set, logs that a default configuration will be applied.
 * This flag controls whether resources are allowed to be placed in a public subnet.
 *
 * @param allowPublicSubnet - Optional flag to allow usage of public subnets.
 * @returns The provided flag value or `undefined` if not set.
 */
function checkAllowPublicSubnet(allowPublicSubnet) {
    logger_1.default.debug("checkAllowPublicSubnet Input " + allowPublicSubnet);
    if (!allowPublicSubnet) {
        logger_1.default.info("setting VPC allowPublicSubnet");
    }
    return allowPublicSubnet;
}
//# sourceMappingURL=checkVPC.js.map