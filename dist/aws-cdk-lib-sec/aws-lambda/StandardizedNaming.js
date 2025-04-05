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
exports.checkCode = checkCode;
exports.checkHandler = checkHandler;
exports.checkDescription = checkDescription;
const Lambda = __importStar(require("aws-cdk-lib/aws-lambda"));
const SecFunctionProps_1 = require("./SecFunctionProps");
const ConfigurationError_1 = require("../tools/ConfigurationError");
const logger_1 = __importDefault(require("../tools/logger"));
/**
 * Validates the provided Lambda `Code` configuration.
 *
 * Ensures that:
 * - The code is of type `AssetCode`
 * - The path matches the expected secure default (`'src'` directory)
 *
 * Throws a `ConfigurationError` if the path is incorrect,
 * or a general `Error` if the code is not an instance of `AssetCode`.
 *
 * @param input_code - The Lambda code to validate. Defaults to the secure fallback from `FunctionProps.defaultCode`.
 * @returns The validated `Lambda.Code` instance.
 */
function checkCode(input_code = SecFunctionProps_1.FunctionProps.defaultCode) {
    logger_1.default.debug("checkCode " + input_code);
    if (input_code instanceof Lambda.AssetCode) {
        if (input_code.path !== SecFunctionProps_1.FunctionProps.defaultCode.path) {
            new ConfigurationError_1.ConfigurationError("code", "Please define the code in the directory 'src'");
        }
    }
    else {
        new Error("The provided code must be of type 'AssetCode'");
    }
    logger_1.default.info("setting code to " + SecFunctionProps_1.FunctionProps.defaultCode);
    return input_code;
}
/**
 * Validates the Lambda handler configuration.
 *
 * Ensures that the handler follows the convention: `'handler.handler'`,
 * meaning the function must be exported from a file named `handler.ts|js`.
 *
 * Throws a `ConfigurationError` if the handler deviates from this convention.
 *
 * @param handler_name - The name of the handler function. Defaults to `FunctionProps.defaultHandler`.
 * @returns The validated handler name.
 */
function checkHandler(handler_name = SecFunctionProps_1.FunctionProps.defaultHandler) {
    logger_1.default.debug("checkHandler " + handler_name);
    if (handler_name !== SecFunctionProps_1.FunctionProps.defaultHandler) {
        new ConfigurationError_1.ConfigurationError("handler", "Please defiend the handler in a file 'handle' with an method 'handler' -> set this value to 'handler.handler'");
    }
    logger_1.default.info("setting handler to " + SecFunctionProps_1.FunctionProps.defaultHandler);
    return handler_name;
}
/**
 * Validates the description for a Lambda function.
 *
 * Ensures that the description is present and contains at least 20 characters.
 *
 * Throws a `ConfigurationError` if the description is too short or empty.
 *
 * @param description - The description string to validate.
 * @returns The validated description.
 */
function checkDescription(description) {
    logger_1.default.debug("checkDescription " + description);
    if (!description || description.length < 20) {
        new ConfigurationError_1.ConfigurationError("description", "Please describe the lambda function with a least 20 letters");
    }
    return description;
}
//# sourceMappingURL=StandardizedNaming.js.map