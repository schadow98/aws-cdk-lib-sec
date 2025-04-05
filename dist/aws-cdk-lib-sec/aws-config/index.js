"use strict";
/**
 * Exports for AWS Config compliance rules with secure extensions.
 *
 * - Re-exports all core constructs from `aws-cdk-lib/aws-config`.
 * - Provides secure rule implementations:
 *   - `CustomRule` for custom Lambda-based compliance checks.
 *   - `ManagedRule` for predefined AWS Config managed rules with enforced configuration.
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
exports.ManagedRule = exports.CustomRule = void 0;
var SecRules_1 = require("./SecRules");
Object.defineProperty(exports, "CustomRule", { enumerable: true, get: function () { return SecRules_1.CustomRule; } });
Object.defineProperty(exports, "ManagedRule", { enumerable: true, get: function () { return SecRules_1.ManagedRule; } });
__exportStar(require("aws-cdk-lib/aws-config"), exports);
//# sourceMappingURL=index.js.map