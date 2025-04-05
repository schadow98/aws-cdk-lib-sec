"use strict";
/**
 * Exports for secure API Gateway configuration.
 *
 * - Re-exports all core constructs from `aws-cdk-lib/aws-apigateway`.
 * - Provides secure wrappers:
 *   - `RestApi` for hardened API Gateway setup with standardized security controls.
 *   - `RestApiAttributes` for defining custom attributes and configurations for secure APIs.
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
exports.RestApiAttributes = exports.RestApi = void 0;
var SecRestApi_1 = require("./SecRestApi");
Object.defineProperty(exports, "RestApi", { enumerable: true, get: function () { return SecRestApi_1.RestApi; } });
Object.defineProperty(exports, "RestApiAttributes", { enumerable: true, get: function () { return SecRestApi_1.RestApiAttributes; } });
__exportStar(require("aws-cdk-lib/aws-apigateway"), exports);
//# sourceMappingURL=index.js.map