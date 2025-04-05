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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagedRule = exports.CustomRule = void 0;
const aws_config = __importStar(require("aws-cdk-lib/aws-config"));
const SecMarker_1 = require("../SecMarker");
/**
 * Custom AWS Config rule that extends the CDK `CustomRule` construct.
 *
 * This secures the class CustomRule and adds the SecMarker
 */
class CustomRule extends aws_config.CustomRule {
    static [SecMarker_1.SecMarker] = true;
}
exports.CustomRule = CustomRule;
/**
 * Custom AWS Managed rule that extends the CDK `ManagedRule` construct.
 *
 * This secures the class CustomRule and adds the SecMarker
 */
class ManagedRule extends aws_config.ManagedRule {
    static [SecMarker_1.SecMarker] = true;
}
exports.ManagedRule = ManagedRule;
//# sourceMappingURL=SecRules.js.map