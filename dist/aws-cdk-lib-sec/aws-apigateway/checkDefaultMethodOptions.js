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
exports.checkDefaultMethodOptions = checkDefaultMethodOptions;
const aws_apigateway = __importStar(require("aws-cdk-lib/aws-apigateway"));
const aws_lambda = __importStar(require("aws-cdk-lib/aws-lambda"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("../tools/logger"));
const SecMarker_1 = require("../SecMarker");
const ConfigurationError_1 = require("../tools/ConfigurationError");
/**
 * Validates and returns a complete `MethodOptions` configuration for an API Gateway method.
 * If no options are provided, a default configuration will be generated.
 *
 * @param scope - The CDK construct scope in which the method is defined.
 * @param defaultMethodOptionsInput - Optional `MethodOptions` to be used or extended.
 * @returns A fully resolved and valid `MethodOptions` object.
 */
function checkDefaultMethodOptions(scope, defaultMethodOptionsInput) {
    logger_1.default.debug("checkDefaultMethodOptions " + defaultMethodOptionsInput);
    if (!defaultMethodOptionsInput) {
        const authorizerLambda = new SecAuthorizerLambdaFunction(scope, 'AuthorizerLambda', {
            runtime: aws_lambda.Runtime.NODEJS_18_X,
            code: aws_lambda.Code.fromInline(fs_1.default.readFileSync(path_1.default.join(path_1.default.dirname(__filename), "../aws-default-stacks/authorizeCode.ts"), { encoding: 'utf8', flag: 'r' })),
            handler: 'index.handler',
        });
        const tokenAuthorizer = new SecTokenAuthorizer(scope, 'TokenAuthorizer', {
            handler: authorizerLambda
        });
        logger_1.default.info("setting authorizer to API Gateway");
        logger_1.default.info("setting authorizationType " + aws_apigateway.AuthorizationType.CUSTOM);
        return {
            authorizer: tokenAuthorizer,
            authorizationType: aws_apigateway.AuthorizationType.CUSTOM,
        };
    }
    new ConfigurationError_1.ConfigurationError("defaultMethodOptions", "Unsceure defaultMethodOptions for API Gateway");
    return defaultMethodOptionsInput || {};
}
/**
 * A custom API Gateway token authorizer that extends the default `TokenAuthorizer`.
 *
 * This class adds the SecMarker to the SecTokenAuthorizer.
 * This class can be used to implement additional security configurations
 * or logic for authorizing requests based on bearer tokens.
 */
class SecTokenAuthorizer extends aws_apigateway.TokenAuthorizer {
    static [SecMarker_1.SecMarker] = true;
}
/**
 * A custom lambda function to authorizes tokens.
 *
 * This class adds the SecMarker to the SecTokenAuthorizer.
 * This class can be used to implement additional security configurations
 * or logic for authorizing requests based on bearer tokens.
 */
class SecAuthorizerLambdaFunction extends aws_lambda.Function {
    static [SecMarker_1.SecMarker] = true;
}
//# sourceMappingURL=checkDefaultMethodOptions.js.map