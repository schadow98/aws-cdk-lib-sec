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
exports.checkRuntime = void 0;
const Lambda = __importStar(require("aws-cdk-lib/aws-lambda"));
const ConfigurationError_1 = require("../../tools/ConfigurationError");
const logger_1 = __importDefault(require("../../tools/logger"));
const safeLambdaRuntimes = [
    // Lambda.Runtime.NODEJS,
    // Lambda.Runtime.NODEJS_4_3,
    // Lambda.Runtime.NODEJS_6_10,
    // Lambda.Runtime.NODEJS_8_10,
    // Lambda.Runtime.NODEJS_10_X,
    // Lambda.Runtime.NODEJS_12_X,
    // Lambda.Runtime.NODEJS_14_X,
    // Lambda.Runtime.NODEJS_16_X,
    Lambda.Runtime.NODEJS_18_X,
    Lambda.Runtime.NODEJS_20_X,
    // Lambda.Runtime.PYTHON_2_7,
    // Lambda.Runtime.PYTHON_3_6,
    // Lambda.Runtime.PYTHON_3_7,
    Lambda.Runtime.PYTHON_3_8,
    Lambda.Runtime.PYTHON_3_9,
    Lambda.Runtime.PYTHON_3_10,
    Lambda.Runtime.PYTHON_3_11,
    Lambda.Runtime.PYTHON_3_12,
    // Lambda.Runtime.JAVA_8,
    Lambda.Runtime.JAVA_8_CORRETTO,
    Lambda.Runtime.JAVA_11,
    Lambda.Runtime.JAVA_17,
    Lambda.Runtime.JAVA_21,
    Lambda.Runtime.DOTNET_6,
    Lambda.Runtime.DOTNET_8,
    // Lambda.Runtime.DOTNET_CORE_1,
    // Lambda.Runtime.DOTNET_CORE_2,
    // Lambda.Runtime.DOTNET_CORE_2_1,
    // Lambda.Runtime.DOTNET_CORE_3_1,
    // Lambda.Runtime.GO_1_X,
    // Lambda.Runtime.RUBY_2_5,
    // Lambda.Runtime.RUBY_2_7,
    Lambda.Runtime.RUBY_3_2,
    Lambda.Runtime.RUBY_3_3,
    //Lambda.Runtime.PROVIDED,
    Lambda.Runtime.PROVIDED_AL2,
    Lambda.Runtime.PROVIDED_AL2023,
    Lambda.Runtime.FROM_IMAGE
];
/**
 * Validates the provided Lambda runtime.
 *
 * Ensures that the given runtime is supported and up to date and returns it unchanged.
 * Can be extended to enforce allowed runtimes or apply defaults.
 *
 * @param runtime - The Lambda runtime to validate.
 * @returns The validated Lambda runtime.
 */
const checkRuntime = (runtime) => {
    logger_1.default.debug("checkRuntime " + runtime);
    if (!safeLambdaRuntimes.includes(runtime)) {
        new ConfigurationError_1.ConfigurationError("runtime", "Not a valid and secured runtime: " + runtime);
    }
    return runtime;
};
exports.checkRuntime = checkRuntime;
//# sourceMappingURL=checkRuntime.js.map