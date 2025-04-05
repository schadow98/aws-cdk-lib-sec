"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRuntimeManagementMode = checkRuntimeManagementMode;
const Lambda = __importStar(require("aws-cdk-lib/aws-lambda"));
const logger_1 = __importDefault(require("../tools/logger"));
const ConfigurationError_1 = require("../tools/ConfigurationError");
/**
 * Validates the provided Lambda `RuntimeManagementMode` or defaults it to `Auto`.
 *
 * Ensures that a valid runtime management mode is used. If none is provided,
 * the mode is set to `Lambda.RuntimeManagementMode.AUTO`.
 *
 * @param runtimeManagementMode - Optional runtime management mode for the Lambda function.
 * @returns A valid `RuntimeManagementMode`, defaulting to `AUTO` if not specified.
 */
function checkRuntimeManagementMode(runtimeManagementMode) {
    logger_1.default.debug("checkRecursiveLoop " + runtimeManagementMode);
    if (!runtimeManagementMode) {
        logger_1.default.info("setting checkRecursiveLoop " + Lambda.RuntimeManagementMode.AUTO);
        return Lambda.RuntimeManagementMode.AUTO;
    }
    if (runtimeManagementMode !== Lambda.RuntimeManagementMode.AUTO) {
        new ConfigurationError_1.ConfigurationError("runtimeManagementMode", "runtimeManagementMode is not safe: " + runtimeManagementMode);
    }
    return runtimeManagementMode;
}
//# sourceMappingURL=checkRuntimeManagementMode.js.map