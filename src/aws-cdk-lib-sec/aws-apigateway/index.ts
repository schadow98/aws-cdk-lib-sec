/**
 * Exports for secure API Gateway configuration.
 * 
 * - Re-exports all core constructs from `aws-cdk-lib/aws-apigateway`.
 * - Provides secure wrappers:
 *   - `RestApi` for hardened API Gateway setup with standardized security controls.
 *   - `RestApiAttributes` for defining custom attributes and configurations for secure APIs.
 */

export {  RestApi, RestApiAttributes } from "./SecRestApi";
export * from 'aws-cdk-lib/aws-apigateway';