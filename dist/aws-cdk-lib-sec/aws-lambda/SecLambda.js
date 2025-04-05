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
exports.SecLogRetention = exports.Function = void 0;
const Lambda = __importStar(require("aws-cdk-lib/aws-lambda"));
const ConfigurationError_1 = require("../../tools/ConfigurationError");
const SecFunctionProps_1 = require("./SecFunctionProps");
const SecMarker_1 = require("../SecMarker");
const logger_1 = __importDefault(require("../../tools/logger"));
const cloudwatch_1 = require("./cloudwatch");
/**
 * Secure wrapper around the AWS CDK `Lambda.Function` construct.
 *
 * This class applies secure defaults, centralized logging, monitoring, and
 * validation logic to standardize Lambda function deployment across environments.
 *
 * Features include:
 * - Secure defaults for handler and code
 * - Automatic log retention configuration
 * - Built-in CloudWatch metrics and alarms
 * - Centralized configuration error tracking
 *
 * @extends Lambda.Function
 */
class Function extends Lambda.Function {
    static [SecMarker_1.SecMarker] = true;
    _logRetention;
    constructor(scope, id, props) {
        logger_1.default.debug("Function scope" + scope);
        logger_1.default.debug("Function id" + id);
        logger_1.default.debug("Function props" + props);
        props = new SecFunctionProps_1.FunctionProps(props, scope, id);
        super(scope, id, {
            ...props,
            code: props.code ?? SecFunctionProps_1.FunctionProps.defaultCode,
            handler: props.handler ?? SecFunctionProps_1.FunctionProps.defaultHandler,
        });
        this._logRetention = new SecLogRetention(this._logRetention);
        (0, ConfigurationError_1.addConfigurationErrorDetails)(this, id);
        (0, cloudwatch_1.addCloudwatchMetricsAndAlarms)(scope, id);
        logger_1.default.debug("Function" + this);
    }
}
exports.Function = Function;
/**
 * Handles secure log retention configuration for AWS Lambda functions.
 *
 * This class encapsulates logic for enforcing log retention policies
 * that align with security and compliance requirements.
 *
 * Can be extended to apply tagging, IAM roles, or custom retention behavior.
 */
class SecLogRetention {
    // Verwende das Symbol als Schlüssel für die statische Eigenschaft
    static [SecMarker_1.SecMarker] = true;
    logGroupArn;
    ensureSingletonLogRetentionFunction;
    node;
    constructor(logRetention) {
        // Weist alle Eigenschaften von logRetention dem aktuellen Objekt zu
        Object.assign(this, logRetention);
    }
}
exports.SecLogRetention = SecLogRetention;
//# sourceMappingURL=SecLambda.js.map