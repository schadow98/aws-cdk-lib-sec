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
exports.Stack = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const SecMarker_1 = require("../SecMarker");
const ConfigurationError_1 = require("../tools/ConfigurationError");
const SecStackProps_1 = require("./SecStackProps");
const logger_1 = __importDefault(require("../tools/logger"));
const validator_1 = require("./validator");
const configRules_1 = require("./configRules");
/**
 * Secure CDK stack wrapper with built-in validation and compliance features.
 *
 * This class extends the default `cdk.Stack` and provides:
 *
 * - Automatic `stage` detection from context (defaults to `'development'`)
 * - Enforced security tagging via `SecMarker`
 * - Injection of AWS Config rules for compliance monitoring
 * - Centralized configuration error collection and validation
 * - Custom CDK node validations for secure class enforcement and detailed diagnostics
 *
 * @extends cdk.Stack
 */
class Stack extends cdk.Stack {
    static [SecMarker_1.SecMarker] = true;
    stage = undefined;
    constructor(scope, id, props) {
        logger_1.default.debug("Stack scope " + scope);
        logger_1.default.debug("Stack id " + id);
        logger_1.default.debug("Stack props " + JSON.stringify(props));
        const stage = scope.node.tryGetContext('stage') || 'development';
        if (!props.stage) {
            logger_1.default.info("setting stage " + stage);
            props.stage = stage;
        }
        props = new SecStackProps_1.StackProps(props);
        super(scope, id, props);
        this.stage = stage;
        (0, ConfigurationError_1.addConfigurationErrorDetails)(this, id);
        (0, configRules_1.addConfigRules)(this);
        this.node.addValidation({
            validate: () => {
                (0, ConfigurationError_1.handleDetailedConfigurationErrors)(this); // Ausführen der Methode, um alle Children zu prüfen
                return []; // Es wird eine leere Liste zurückgegeben, da keine weiteren Validierungsfehler hinzugefügt werden
            }
        });
        this.node.addValidation({
            validate: () => {
                (0, validator_1.checkSecClass)(this); // Ausführen der Methode, um alle Children zu prüfen
                return []; // Es wird eine leere Liste zurückgegeben, da keine weiteren Validierungsfehler hinzugefügt werden
            }
        });
        logger_1.default.debug("Stack " + this);
    }
}
exports.Stack = Stack;
//# sourceMappingURL=SecStack.js.map