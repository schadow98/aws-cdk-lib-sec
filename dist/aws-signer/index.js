"use strict";
/**
 * Exports for AWS Signer integration with secure defaults.
 *
 * - Re-exports the CDK's `aws-signer` module under the `signer` namespace.
 * - Provides secure wrapper classes: `SigningProfile` and `SigningProfileProps`
 *   for consistent and validated usage in signing Lambda functions.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigningProfileProps = exports.SigningProfile = exports.signer = void 0;
exports.signer = __importStar(require("aws-cdk-lib/aws-signer"));
var SecSigningProfile_1 = require("./SecSigningProfile");
Object.defineProperty(exports, "SigningProfile", { enumerable: true, get: function () { return SecSigningProfile_1.SigningProfile; } });
Object.defineProperty(exports, "SigningProfileProps", { enumerable: true, get: function () { return SecSigningProfile_1.SigningProfileProps; } });
//# sourceMappingURL=index.js.map