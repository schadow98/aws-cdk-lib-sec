/**
 * Exports for AWS Signer integration with secure defaults.
 *
 * - Re-exports the CDK's `aws-signer` module under the `signer` namespace.
 * - Provides secure wrapper classes: `SigningProfile` and `SigningProfileProps`
 *   for consistent and validated usage in signing Lambda functions.
 */
export * as signer from 'aws-cdk-lib/aws-signer';
export { SigningProfile, SigningProfileProps } from "./SecSigningProfile";
//# sourceMappingURL=index.js.map