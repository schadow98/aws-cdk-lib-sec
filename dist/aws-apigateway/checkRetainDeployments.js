"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRetainDeployments = checkRetainDeployments;
const ConfigurationError_1 = require("../tools/ConfigurationError");
const logger_1 = __importDefault(require("../tools/logger"));
/**
 * Checks if the API Gateway deployments isretained.
 *
 * @param retainDeployments - Optional flag indicating whether to retain deployments.
 * @returns `true` if deployments should be retained, otherwise `false`.
 */
function checkRetainDeployments(retainDeployments) {
    logger_1.default.debug("checkRetainDeployments " + retainDeployments);
    if (retainDeployments === undefined) {
        logger_1.default.debug("setting retainDeployments to true");
        return false;
    }
    if (retainDeployments === true) {
        new ConfigurationError_1.ConfigurationError("retainDeployments", "retainDeployments darf nicht auf true gesetzt sein.");
    }
    return false;
}
//# sourceMappingURL=checkRetainDeployments.js.map