"use strict";
/**
 * Public API exports for the secure infrastructure framework.
 *
 * - Re-exports the custom secure `Stack` and `StackProps` implementations.
 * - Re-exports all core CDK modules from `aws-cdk-lib` for unified access.
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
exports.StackProps = exports.Stack = void 0;
var SecStack_1 = require("./SecStack");
Object.defineProperty(exports, "Stack", { enumerable: true, get: function () { return SecStack_1.Stack; } });
var SecStackProps_1 = require("./SecStackProps");
Object.defineProperty(exports, "StackProps", { enumerable: true, get: function () { return SecStackProps_1.StackProps; } });
__exportStar(require("aws-cdk-lib"), exports);
//# sourceMappingURL=index.js.map