"use strict";
/**
 * Central export module that re-exports core constructs and secure wrappers.
 *
 * - Re-exports the CDK library (`aws-cdk-lib`) for convenience.
 * - Provides secure versions of common AWS services (e.g., Lambda, Signer, Stack).
 * - Exposes the shared `logger` for consistent structured logging.
 */
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aws_signer = exports.aws_lambda = exports.StackProps = exports.Stack = exports.logger = void 0;
exports.logger = __importStar(require("./SecLogger"));
__exportStar(require("aws-cdk-lib"), exports);
var aws_stack_1 = require("./aws-stack");
Object.defineProperty(exports, "Stack", { enumerable: true, get: function () { return aws_stack_1.Stack; } });
Object.defineProperty(exports, "StackProps", { enumerable: true, get: function () { return aws_stack_1.StackProps; } });
exports.aws_lambda = __importStar(require("./aws-lambda"));
exports.aws_signer = __importStar(require("./aws-signer"));
//# sourceMappingURL=index.js.map