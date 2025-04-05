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
exports.SigningProfileProps = exports.SigningProfile = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const signer = __importStar(require("aws-cdk-lib/aws-signer"));
const SecMarker_1 = require("../SecMarker");
const ConfigurationError_1 = require("../tools/ConfigurationError");
const logger_1 = __importDefault(require("../tools/logger"));
/**
 * Custom wrapper for AWS Signer `SigningProfile` with secure defaults.
 *
 * Extends the default `signer.SigningProfile` and enforces the platform
 * `AWS_LAMBDA_SHA384_ECDSA` if none is specified.
 *
 * Includes a static `SecMarker` to mark the construct for security processing or identification.
 *
 * @extends signer.SigningProfile
 */
class SigningProfile extends signer.SigningProfile {
    static [SecMarker_1.SecMarker] = true;
    constructor(scope, id, props) {
        super(scope, id, {
            ...props,
            platform: props.platform ?? signer.Platform.AWS_LAMBDA_SHA384_ECDSA
        });
    }
}
exports.SigningProfile = SigningProfile;
/**
 * Configuration properties for a secure AWS Signer `SigningProfile` used with Lambda functions.
 *
 * Enforces secure defaults and validations:
 * - `platform` must be `AWS_LAMBDA_SHA384_ECDSA` (default if not provided)
 * - `signatureValidity` must be exactly 2 years (default if not provided)
 * - `signingProfileName` must be undefined to allow CloudFormation to assign it
 *
 * Throws a `ConfigurationError` if any property does not meet the expected security standards.
 */
class SigningProfileProps {
    platform;
    signatureValidity; // @default - 135 months
    signingProfileName; // @default - Assigned by CloudFormation (recommended).
    constructor(props) {
        //platform
        this.platform = props.platform; // signer.Platform.AWS_LAMBDA_SHA384_ECDSA
        if (!this.platform) {
            logger_1.default.info("setting signer.Platform " + signer.Platform.AWS_LAMBDA_SHA384_ECDSA);
            this.platform = signer.Platform.AWS_LAMBDA_SHA384_ECDSA;
        }
        if (this.platform !== signer.Platform.AWS_LAMBDA_SHA384_ECDSA) {
            new ConfigurationError_1.ConfigurationError("platform", "The plattform for a lambda function should be AWS_LAMBDA_SHA384_ECDSA, entered: " + this.platform);
        }
        // signatureValidity
        this.signatureValidity = props.signatureValidity;
        if (!this.signatureValidity) {
            logger_1.default.info("setting signer.signatureValidity " + aws_cdk_lib_1.Duration.days(365 * 2));
            this.signatureValidity = aws_cdk_lib_1.Duration.days(365 * 2);
        }
        if (this.signatureValidity !== aws_cdk_lib_1.Duration.days(365 * 2)) {
            new ConfigurationError_1.ConfigurationError("signatureValidity", "The signatureValidity should be two years, entered: " + this.signatureValidity);
        }
        // signingProfileName
        this.signingProfileName = props.signingProfileName; //undefined sein
        logger_1.default.info("setting signer.signingProfileName");
        if (this.signingProfileName) {
            new ConfigurationError_1.ConfigurationError("signingProfileName", "The signingProfileName for a SigningProfileProps should be calculated by a cloudFormation, entered: " + this.signingProfileName);
        }
    }
}
exports.SigningProfileProps = SigningProfileProps;
//# sourceMappingURL=SecSigningProfile.js.map