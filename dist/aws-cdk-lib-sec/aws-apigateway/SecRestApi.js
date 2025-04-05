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
exports.RestApiAttributes = exports.RestApi = void 0;
const aws_apigateway = __importStar(require("aws-cdk-lib/aws-apigateway"));
const SecMarker_1 = require("../SecMarker");
const StandardizedNaming_1 = require("../aws-lambda/StandardizedNaming");
const checkRetainDeployments_1 = require("./checkRetainDeployments");
const checkDomainName_1 = require("./checkDomainName");
const checkDefaultMethodOptions_1 = require("./checkDefaultMethodOptions");
const logger_1 = __importDefault(require("../../tools/logger"));
/**
 * Custom wrapper for the AWS CDK `RestApi` construct.
 *
 * This class adds the SecMarker tp the RestApi
 * This class extends the default `RestApi` to provide additional functionality
 * or predefined configurations for building secure and consistent REST APIs.
 */
class RestApi extends aws_apigateway.RestApi {
    static [SecMarker_1.SecMarker] = true;
    constructor(scope, id, props) {
        props = new RestApiAttributes(props, scope, id);
        super(scope, id, {
            ...props
        });
    }
}
exports.RestApi = RestApi;
/**
 * Represents a configuration container for attributes related to a custom `RestApi`.
 *
 * This class is used to group and manage input parameters or settings
 * that define the behavior and structure of the `RestApi` construct.
 */
class RestApiAttributes {
    binaryMediaTypes;
    minimumCompressionSize;
    minCompressionSize;
    cloneFrom;
    apiKeySourceType;
    endpointConfiguration;
    defaultIntegration;
    defaultMethodOptions;
    defaultCorsPreflightOptions;
    deploy;
    deployOptions;
    retainDeployments;
    restApiName;
    parameters;
    policy;
    failOnWarnings;
    domainName;
    cloudWatchRole;
    cloudWatchRoleRemovalPolicy;
    endpointExportName;
    endpointTypes;
    disableExecuteApiEndpoint;
    description;
    constructor(props, scope, id) {
        logger_1.default.debug(id);
        Object.assign(this, props);
        this.description = (0, StandardizedNaming_1.checkDescription)(props.description);
        this.retainDeployments = (0, checkRetainDeployments_1.checkRetainDeployments)(props.retainDeployments);
        this.domainName = (0, checkDomainName_1.checkDomainName)(props.domainName);
        this.defaultMethodOptions = (0, checkDefaultMethodOptions_1.checkDefaultMethodOptions)(scope, props.defaultMethodOptions);
    }
}
exports.RestApiAttributes = RestApiAttributes;
//# sourceMappingURL=SecRestApi.js.map