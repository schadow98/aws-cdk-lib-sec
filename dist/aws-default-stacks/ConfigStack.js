"use strict";
// ConfigStack.ts
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
exports.ConfigStack = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const aws_lambda = __importStar(require("aws-cdk-lib/aws-lambda"));
/**
 * CDK stack that sets up AWS Config resources for compliance and governance.
 *
 * This stack may include custom or managed AWS Config rules, recorders, delivery channels,
 * and associated permissions to monitor and evaluate resource configurations.
 * It deploys a LambdaFunction to evaluate the Custom Config Rules.
 */
class ConfigStack extends cdk.Stack {
    configFn;
    configFnArn;
    constructor(scope, id, props) {
        super(scope, id, props);
        this.configFn = new aws_lambda.Function(this, 'ConfigLambda', {
            runtime: aws_lambda.Runtime.NODEJS_18_X,
            code: aws_lambda.Code.fromInline(fs_1.default.readFileSync(path_1.default.join(path_1.default.dirname(__filename), "./configCode.ts"), { encoding: 'utf8', flag: 'r' })),
            handler: 'index.handler',
        });
        this.configFnArn = this.configFn.functionArn;
        new cdk.CfnOutput(this, 'ConfigFnArn', {
            value: this.configFn.functionArn,
            exportName: 'ConfigFnArn' // eindeutiger Export-Name
        });
    }
}
exports.ConfigStack = ConfigStack;
//# sourceMappingURL=ConfigStack.js.map