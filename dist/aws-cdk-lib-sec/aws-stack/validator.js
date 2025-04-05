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
exports.checkSecClass = checkSecClass;
exports.hasSecMarker = hasSecMarker;
exports.checkSafeAttributForSecMarker = checkSafeAttributForSecMarker;
const __1 = require("..");
const cdk = __importStar(require(".."));
const logger_1 = __importDefault(require("../../tools/logger"));
const ConfigurationError_1 = require("../../tools/ConfigurationError");
const SecMarker_1 = require("../SecMarker");
/**
 * Validates that the provided stack and all its children are based on secured classes.
 *
 * - Verifies that the stack is an instance of the custom secure `Stack` class.
 * - Checks each child construct for the presence of the `SecMarker` symbol,
 *   excluding CDK-generated constructs like `LogRetentionFunction`.
 * - Triggers a `ConfigurationError` if any construct is not security-compliant.
 *
 * Also calls `validateStackTags` to ensure required metadata is present.
 *
 * @param stack - The stack instance to validate.
 */
function checkSecClass(stack) {
    logger_1.default.debug("check stack class ");
    if (!(stack instanceof __1.Stack)) {
        new ConfigurationError_1.ConfigurationError("class", "Stack is not derived from the secured class: " + stack);
    }
    validateStackTags(stack);
    for (const elem of stack.node.children) {
        logger_1.default.debug("check class for secmarker of elem: " + elem);
        // ugly hack: LogRetentionFunction generated class thorough
        if (!hasSecMarker(elem) && elem.constructor.name !== 'LogRetentionFunction') {
            new ConfigurationError_1.ConfigurationError("stack.children", "Elem of stack " + stack.stackName + " is not dervied from the secured class: " + elem);
        }
    }
    // Log success if the stack is valid
    logger_1.default.debug(`Stack ${stack.stackName} is derived from SecStack.`);
}
/**
 * Checks whether a construct class is marked as security-compliant using the `SecMarker` symbol.
 *
 * This is used to identify constructs that conform to the secure implementation standards
 * defined in the project (e.g., enhanced validation, tagging, hardening).
 *
 * @param construct - The construct instance to check.
 * @returns `true` if the construct class is marked with `SecMarker`, otherwise `false`.
 */
function hasSecMarker(construct) {
    const SecMarkerValue = construct.constructor[SecMarker_1.SecMarker];
    return SecMarkerValue === true;
}
/**
 * Safely checks whether a construct is marked as security-compliant using the `SecMarker`.
 *
 * Returns `undefined` if the construct is null or undefined,
 * otherwise delegates to `hasSecMarker()` to perform the actual check.
 *
 * @param construct - The construct to validate.
 * @returns `true` if the construct has `SecMarker`, `false` if not, or `undefined` if input is falsy.
 */
function checkSafeAttributForSecMarker(construct) {
    if (!construct) {
        return undefined;
    }
    return hasSecMarker(construct);
}
/**
 * Validates that all required metadata tags are present on the provided CDK stack.
 *
 * Required tags include:
 * - `environment`
 * - `cost-center`
 * - `budget`
 * - `privacy-class`
 * - `creator`
 * - `created-at`
 * - `compliance`
 * - `governance`
 *
 * Throws a `ConfigurationError` if any required tag is missing.
 *
 * @param stack - The CDK stack to validate.
 */
function validateStackTags(stack) {
    logger_1.default.debug("validateStackTags ");
    const tagmanager = cdk.TagManager.of(stack);
    if (!tagmanager) {
        throw "Problem while rendering tags of stack";
    }
    const allTags = tagmanager.tagValues();
    const requiredTagKeys = ['environment', 'cost-center', 'budget', 'privacy-class', 'creator', 'created-at', 'compliance', 'governance'];
    const missingKeys = [];
    for (const requiredKey of requiredTagKeys) {
        if (!(requiredKey in allTags)) {
            missingKeys.push(requiredKey);
        }
    }
    if (missingKeys.length > 0) {
        new ConfigurationError_1.ConfigurationError("stack.tags", "Missing tags in stack: " + missingKeys);
    }
}
//# sourceMappingURL=validator.js.map