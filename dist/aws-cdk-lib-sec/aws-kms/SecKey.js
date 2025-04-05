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
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyProps = exports.Key = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const kms = __importStar(require("aws-cdk-lib/aws-kms"));
const SecMarker_1 = require("../SecMarker");
const ConfigurationError_1 = require("../../tools/ConfigurationError");
/**
 * Secured Key that extends the CDK `Key` construct.
 *
 * This secures the class CustomRule and adds the SecMarker
 */
class Key extends kms.Key {
    static [SecMarker_1.SecMarker] = true;
    constructor(scope, id, props) {
        super(scope, id, {
            ...props
        });
    }
}
exports.Key = Key;
class KeyProps {
    /**
     * Eine Liste von Principals, die als Key-Administratoren zur Schlüsselrichtlinie hinzugefügt werden.
     *
     * @default Keine Administratoren hinzugefügt.
     */
    admins;
    /**
     * Initialer Alias, der dem Schlüssel hinzugefügt werden soll.
     *
     * @default Kein Alias.
     */
    alias;
    /**
     * Eine Beschreibung des Schlüssels.
     *
     * @default Keine Beschreibung.
     */
    description;
    /**
     * Gibt an, ob AWS KMS den Schlüssel rotiert.
     *
     * @default true
     */
    enableKeyRotation;
    /**
     * Gibt an, ob der Schlüssel zur Verwendung verfügbar ist.
     *
     * @default true
     */
    enabled;
    /**
     * Die kryptografische Konfiguration des Schlüssels. Der gültige Wert hängt von der Verwendung des Schlüssels ab.
     *
     * @default STANDARD
     */
    keySpec;
    /**
     * Die kryptografischen Operationen, für die der Schlüssel verwendet werden kann.
     *
     * @default ENCRYPT_DECRYPT
     */
    keyUsage;
    /**
     * Erstellt einen Multi-Region-Primärschlüssel, den du in anderen AWS-Regionen replizieren kannst.
     *
     * @default false
     */
    multiRegion;
    /**
     * Gibt die Anzahl der Tage in der Wartezeit an, bevor AWS KMS einen CMK löscht, der aus einem CloudFormation-Stack entfernt wurde.
     *
     * @default Duration.days(7)
     */
    pendingWindow;
    /**
     * Benutzerdefiniertes Richtliniendokument, das dem KMS-Schlüssel angehängt werden soll.
     *
     * @default Keine benutzerdefinierte Richtlinie.
     */
    policy;
    /**
     * Gibt an, ob der Verschlüsselungsschlüssel beibehalten werden soll, wenn er aus dem Stack entfernt wird.
     *
     * @default RemovalPolicy.DESTROY
     */
    removalPolicy;
    /**
     * Der Zeitraum zwischen jeder automatischen Rotation.
     *
     * @default Duration.days(90)
     */
    rotationPeriod;
    constructor(props) {
        this.admins = props.admins;
        if (this.admins && this.admins.length > 0) {
            new ConfigurationError_1.ConfigurationError("admins", "there should not be admins on a key");
        }
        this.alias = props.alias;
        if (this.alias) {
            new ConfigurationError_1.ConfigurationError("alias", "there should not be alias on a key");
        }
        this.description = props.description;
        if (!this.description || this.description.length > 10) {
            new ConfigurationError_1.ConfigurationError("description", "there should be a description with at least 10 chars on a key");
        }
        this.enableKeyRotation = props.enableKeyRotation;
        if (!this.enableKeyRotation) {
            new ConfigurationError_1.ConfigurationError("enableKeyRotation", "please enable KeyRotation on a key");
        }
        this.enabled = props.enabled;
        if (!this.enabled) {
            new ConfigurationError_1.ConfigurationError("enabled", "please delete unused keys");
        }
        this.keySpec = props.keySpec;
        if (this.keySpec == kms.KeySpec.RSA_2048) {
            new ConfigurationError_1.ConfigurationError("keySpec", "please use a safe key with RSA and more at least 3072 digits");
        }
        this.keyUsage = props.keyUsage;
        this.multiRegion = props.multiRegion;
        if (this.multiRegion) {
            new ConfigurationError_1.ConfigurationError("multiRegion", "please use the key only in a region");
        }
        this.pendingWindow = props.pendingWindow;
        if (this.pendingWindow && this.pendingWindow > aws_cdk_lib_1.Duration.days(7)) {
            new ConfigurationError_1.ConfigurationError("pendingWindow", "Unused keys should get removed after 7 days");
        }
        this.policy = props.policy;
        if (this.policy) {
            new ConfigurationError_1.ConfigurationError("policy", "Please dont add policies to a key");
        }
        this.removalPolicy = props.removalPolicy;
        if (this.removalPolicy && this.removalPolicy !== aws_cdk_lib_1.RemovalPolicy.DESTROY) {
            new ConfigurationError_1.ConfigurationError("removalPolicy", "Deleted keys should get deleted from the aws platform");
        }
        this.rotationPeriod = props.rotationPeriod;
        if (this.rotationPeriod && this.rotationPeriod > aws_cdk_lib_1.Duration.days(90)) {
            new ConfigurationError_1.ConfigurationError("pendingWindow", "Keys should rotate every 90 days");
        }
    }
}
exports.KeyProps = KeyProps;
//# sourceMappingURL=SecKey.js.map