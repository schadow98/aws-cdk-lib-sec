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
exports.compareJSONTemplate = compareJSONTemplate;
const logger_1 = __importDefault(require("../tools/logger"));
const json_diff_1 = __importDefault(require("json-diff"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function compareJSONTemplate(stack1, stack2, outputDir) {
    logger_1.default.info(json_diff_1.default.diffString(getTemplateOfStack(stack1), getTemplateOfStack(stack2)));
    fs.writeFileSync(path.join(outputDir, "diff.txt"), json_diff_1.default.diffString(getTemplateOfStack(stack1), getTemplateOfStack(stack2), { color: false }));
}
function getTemplateOfStack(stack) {
    const app = stack.node.root;
    const assembly = app.synth();
    const stackArtifact = assembly.getStackArtifact(stack.artifactId);
    // Write the stack to the file
    return stackArtifact.template;
}
