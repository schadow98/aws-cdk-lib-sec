"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDomainName = checkDomainName;
const logger_1 = __importDefault(require("../tools/logger"));
/**
 * Validates and returns a complete `DomainNameOptions` configuration for an API Gateway custom domain.
 * If no input is provided, `undefined` is returned.
 *  Checks if the domainInput ist secured and endPointType is Private
 *
 * @param domainNameOptionsInput - Optional input for `DomainNameOptions` to validate or use as a base.
 * @returns A valid `DomainNameOptions` object or `undefined` if no input is given.
 */
function checkDomainName(domainNameOptionsInput) {
    logger_1.default.debug("checkDomainName " + domainNameOptionsInput);
    if (!domainNameOptionsInput) {
        logger_1.default.debug("set domainInput (seured - cert and domainname)");
        logger_1.default.debug("set endPointType Private");
    }
    return domainNameOptionsInput;
}
//# sourceMappingURL=checkDomainName.js.map