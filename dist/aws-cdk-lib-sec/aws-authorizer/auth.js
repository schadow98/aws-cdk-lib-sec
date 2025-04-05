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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const token = event.authorizationToken;
    try {
        // Replace 'YOUR_PUBLIC_KEY_OAUTH_PROVIDER' with the actual public key
        const decoded = jwt.verify(token, 'YOUR_PUBLIC_KEY_OAUTH_PROVIDER');
        // Extract necessary claims from the decoded token (e.g., user ID, roles)
        const userId = decoded.sub; // Assuming 'sub' is the user ID claim
        const roles = decoded.roles || []; // Assuming 'roles' is the roles claim
        // Create a policy based on the decoded claims
        const policy = generatePolicy(userId, 'Allow', event.methodArn, roles);
        return policy;
    }
    catch (err) {
        // Handle token verification errors gracefully
        console.error('Token verification failed:', err);
        return generatePolicy('user', 'Deny', event.methodArn);
    }
});
exports.handler = handler;
const generatePolicy = (principalId, effect, resource, roles = []) => {
    const policyDocument = {
        Version: '2012-10-17',
        Statement: [
            {
                Action: 'execute-api:Invoke',
                Effect: effect,
                Resource: resource,
                Condition: {
                    StringEquals: {
                        'aws:PrincipalType': 'Service',
                        'aws:SourceArn': `arn:aws:lambda:${process.env.AWS_REGION}:${process.env.AWS_ACCOUNT_ID}:function:${process.env.AWS_LAMBDA_FUNCTION_NAME}`
                    }
                }
            }
        ]
    };
    if (roles.length > 0) {
        policyDocument.Statement[0].Condition.StringMatches = {
            'aws:PrincipalRole': roles
        };
    }
    return {
        principalId,
        policyDocument
    };
};
