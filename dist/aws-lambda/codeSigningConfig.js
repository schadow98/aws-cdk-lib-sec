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
exports.createCodeSigningConfig = createCodeSigningConfig;
const signer = __importStar(require("../aws-signer"));
const aws_cdk_lib_1 = require("aws-cdk-lib");
const SecCodeSigningConfig_1 = require("./SecCodeSigningConfig");
const logger_1 = __importDefault(require("../tools/logger"));
const validator_1 = require("../aws-stack/validator");
const ConfigurationError_1 = require("../tools/ConfigurationError");
/**
 * Creates a new `CodeSigningConfig` or returns an existing one.
 * Then it adds to the Lambdafuntion
 *
 * @param scope - The construct scope in which the resource is created.
 * @param lambdaId - A unique identifier for the resource.
 * @param codeSigningConfigInput - Optional: An existing `CodeSigningConfig`.
 * @returns An instance of `Lambda.CodeSigningConfig`.
 */
function createCodeSigningConfig(scope, // Stack
lambdaId, // LambdaFunction
codeSigningConfigInput) {
    logger_1.default.debug("createCodeSigningConfig Input " + scope);
    logger_1.default.debug("createCodeSigningConfig Input " + lambdaId);
    logger_1.default.debug("createCodeSigningConfig Input " + codeSigningConfigInput);
    const tags = {
        "Lambda": lambdaId
    };
    if (!codeSigningConfigInput) {
        const signingProfile = new signer.SigningProfile(scope, `${lambdaId}SigningProfile`, {});
        // Füge Tags zum SigningProfile hinzu
        if (tags) {
            Object.entries(tags).forEach(([key, value]) => {
                aws_cdk_lib_1.Tags.of(signingProfile).add(key, value);
            });
        }
        // Verwende eine eindeutige ID für CodeSigningConfig
        const codeSigningConfig = new SecCodeSigningConfig_1.CodeSigningConfig(scope, `${lambdaId}CodeSigningConfig`, {
            signingProfiles: [signingProfile]
        });
        // Füge Tags zur CodeSigningConfig hinzu
        if (tags) {
            Object.entries(tags).forEach(([key, value]) => {
                aws_cdk_lib_1.Tags.of(codeSigningConfig).add(key, value);
            });
        }
        logger_1.default.info("setting codeSigningConfig (secure, deafult)");
        return codeSigningConfig;
    }
    logger_1.default.debug("codeSigningConfigInput Output " + codeSigningConfigInput);
    if (!(0, validator_1.hasSecMarker)(codeSigningConfigInput)) {
        new ConfigurationError_1.ConfigurationError("codeSigningConfig", "codeSigningConfig is not secured");
    }
    // Rückgabe der vorhandenen CodeSigningConfig, wenn vorhanden
    return codeSigningConfigInput;
}
//# sourceMappingURL=codeSigningConfig.js.map