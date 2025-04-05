/**
 * Exports for AWS Config compliance rules with secure extensions.
 *
 * - Re-exports all core constructs from `aws-cdk-lib/aws-config`.
 * - Provides secure rule implementations:
 *   - `CustomRule` for custom Lambda-based compliance checks.
 *   - `ManagedRule` for predefined AWS Config managed rules with enforced configuration.
 */
export { CustomRule, ManagedRule } from "./SecRules";
export * from 'aws-cdk-lib/aws-config';
