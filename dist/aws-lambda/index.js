"use strict";
/**
 * Exports for secure Lambda function configuration and deployment.
 *
 * - Re-exports all core constructs from `aws-cdk-lib/aws-lambda`.
 * - Provides secure wrappers: `Function` and `FunctionProps`, which apply
 *   validated defaults, monitoring, tracing, and security best practices.
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionProps = exports.Function = void 0;
var SecLambda_1 = require("./SecLambda");
Object.defineProperty(exports, "Function", { enumerable: true, get: function () { return SecLambda_1.Function; } });
var SecFunctionProps_1 = require("./SecFunctionProps");
Object.defineProperty(exports, "FunctionProps", { enumerable: true, get: function () { return SecFunctionProps_1.FunctionProps; } });
__exportStar(require("aws-cdk-lib/aws-lambda"), exports);
//# sourceMappingURL=index.js.map