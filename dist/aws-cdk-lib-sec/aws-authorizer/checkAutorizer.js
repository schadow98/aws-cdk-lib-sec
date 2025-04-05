"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthorizerLambdaStatus = checkAuthorizerLambdaStatus;
const checkStack_1 = require("../../tools/checkStack");
const logger_1 = __importDefault(require("../../tools/logger"));
const deploy_1 = require("./deploy");
function checkAuthorizerLambdaStatus(stackName) {
    (0, checkStack_1.isStackDeployed)(deploy_1.ApiWithOAuth2AuthorizerStack.stackName)
        .then((isDeployed) => {
        if (isDeployed) {
            logger_1.default.info("Stack is deployed.");
        }
        else {
            logger_1.default.info("Stack will be deployed.");
            (0, checkStack_1.deployStack)(deploy_1.ApiWithOAuth2AuthorizerStack);
        }
    });
}
