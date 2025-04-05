"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivateOldAttribute = deactivateOldAttribute;
const ConfigurationError_1 = require("../tools/ConfigurationError");
const logger_1 = __importDefault(require("../tools/logger"));
/**
 * Deactivates an old attribute by checking and optionally modifying a parameter value.
 *
 * This function can be used to mark or remove outdated parameter values
 * based on the provided name and value.
 *
 * @param paramName - The name of the parameter to process.
 * @param paramValue - Optional current value of the parameter.
 * @returns The updated parameter value or `undefined` if it should be removed or left unchanged.
 */
function deactivateOldAttribute(paramName, paramValue = undefined) {
    logger_1.default.debug("deactivateOldAttribute of " + paramName + " - please delete key and value: " + paramValue);
    if (paramValue || typeof paramValue == "string") {
        new ConfigurationError_1.ConfigurationError(paramName, paramName + " ist deprecated and do not should get used: " + paramValue);
    }
    return paramValue;
}
//# sourceMappingURL=deactivateOldAttribute.js.map