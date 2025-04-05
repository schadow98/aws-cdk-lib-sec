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
exports.CodeSigningConfig = void 0;
const SecMarker_1 = require("../SecMarker");
const ConfigurationError_1 = require("../../tools/ConfigurationError");
const Lambda = __importStar(require("aws-cdk-lib/aws-lambda"));
const logger_1 = __importDefault(require("../../tools/logger"));
/**
 * Custom Lambda `CodeSigningConfig` with security tagging support.
 *
 * Extends the default `Lambda.CodeSigningConfig` construct to apply
 * additional configuration or metadata. Includes a static `SecMarker`
 * used for identifying security-relevant constructs.
 *
 * @extends Lambda.CodeSigningConfig
 */
class CodeSigningConfig extends Lambda.CodeSigningConfig {
    static [SecMarker_1.SecMarker] = true;
    constructor(scope, id, props) {
        super(scope, id, {
            ...props
        });
    }
}
exports.CodeSigningConfig = CodeSigningConfig;
/**
 * Properties for configuring a secure Lambda `CodeSigningConfig`.
 *
 * This class defines the expected input for creating a `CodeSigningConfig`
 * with additional security considerations or defaults.
 */
class SecCodeSigningConfigProps {
    signingProfiles;
    untrustedArtifactOnDeployment; //@default UntrustedArtifactOnDeployment.WARN
    description; // @default - No description.
    constructor(props) {
        logger_1.default.debug("SecCodeSigningConfigProps Input " + SecCodeSigningConfigProps);
        //platform
        this.signingProfiles = props.signingProfiles; // signer.Platform.AWS_LAMBDA_SHA384_ECDSA
        if (!this.signingProfiles || this.signingProfiles?.length) {
            throw Error("Please defined a signingProfiles");
        }
        for (const signingProfile in this.signingProfiles) {
            if (signingProfile.constructor[SecMarker_1.SecMarker] !== true) {
                new ConfigurationError_1.ConfigurationError("signingProfile", "The signingProfile is not secured: " + signingProfile);
            }
        }
        // signatureValidity
        this.untrustedArtifactOnDeployment = props.untrustedArtifactOnDeployment;
        if (!this.untrustedArtifactOnDeployment) {
            this.untrustedArtifactOnDeployment = Lambda.UntrustedArtifactOnDeployment.ENFORCE;
        }
        if (this.untrustedArtifactOnDeployment !== Lambda.UntrustedArtifactOnDeployment.ENFORCE) {
            new ConfigurationError_1.ConfigurationError("untrustedArtifactOnDeployment", "Please set untrustedArtifactOnDeployment to ENFORCE so unauthorized changes are blocked: " + this.untrustedArtifactOnDeployment);
        }
        // signingProfileName
        this.description = props.description; //undefined sein
        if (!this.description) {
            this.description = "A signign profile for the lambda function";
        }
        logger_1.default.debug("SecCodeSigningConfigProps Output " + SecCodeSigningConfigProps);
    }
}
//# sourceMappingURL=SecCodeSigningConfig.js.map