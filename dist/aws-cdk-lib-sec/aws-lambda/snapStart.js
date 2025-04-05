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
exports.activeSnapStart = activeSnapStart;
const Lambda = __importStar(require("aws-cdk-lib/aws-lambda"));
const ConfigurationError_1 = require("../tools/ConfigurationError");
const logger_1 = __importDefault(require("../tools/logger"));
/**
 * Validates and enables SnapStart for supported Lambda runtimes.
 *
 * - If `snapStart` is not provided and the runtime supports SnapStart,
 *   it defaults to `ON_PUBLISHED_VERSIONS`.
 * - If `snapStart` is explicitly set to anything else, a `ConfigurationError` is thrown.
 *
 * SnapStart reduces cold start latency for Java-based Lambdas by initializing
 * the runtime state ahead of time.
 *
 * @param snapStart - Optional SnapStart configuration.
 * @param runtime - Optional Lambda runtime, used to determine if SnapStart is supported.
 * @returns The validated or default SnapStart configuration, or `undefined` if unsupported.
 */
function activeSnapStart(snapStart, runtime) {
    logger_1.default.debug("activeSnapStart for " + runtime + " : " + snapStart);
    if (!snapStart) {
        if (runtime?.supportsSnapStart) {
            logger_1.default.info("setting activeSnapStart " + Lambda.SnapStartConf.ON_PUBLISHED_VERSIONS);
            return Lambda.SnapStartConf.ON_PUBLISHED_VERSIONS;
        }
        else {
            logger_1.default.info("setting activeSnapStart " + undefined);
            return undefined;
        }
    }
    // if snapstart is set
    if (snapStart !== Lambda.SnapStartConf.ON_PUBLISHED_VERSIONS) {
        new ConfigurationError_1.ConfigurationError("snapStart", "Please set Snapstart to Lambda.SnapStartConf.ON_PUBLISHED_VERSIONS: " + snapStart);
    }
    return snapStart;
}
//# sourceMappingURL=snapStart.js.map