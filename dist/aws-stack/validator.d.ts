import { Stack } from '..';
/**
 * Validates that the provided stack and all its children are based on secured classes.
 *
 * - Verifies that the stack is an instance of the custom secure `Stack` class.
 * - Checks each child construct for the presence of the `SecMarker` symbol,
 *   excluding CDK-generated constructs like `LogRetentionFunction`.
 * - Triggers a `ConfigurationError` if any construct is not security-compliant.
 *
 * Also calls `validateStackTags` to ensure required metadata is present.
 *
 * @param stack - The stack instance to validate.
 */
export declare function checkSecClass(stack: Stack): void;
/**
 * Checks whether a construct class is marked as security-compliant using the `SecMarker` symbol.
 *
 * This is used to identify constructs that conform to the secure implementation standards
 * defined in the project (e.g., enhanced validation, tagging, hardening).
 *
 * @param construct - The construct instance to check.
 * @returns `true` if the construct class is marked with `SecMarker`, otherwise `false`.
 */
export declare function hasSecMarker(construct: any): boolean;
/**
 * Safely checks whether a construct is marked as security-compliant using the `SecMarker`.
 *
 * Returns `undefined` if the construct is null or undefined,
 * otherwise delegates to `hasSecMarker()` to perform the actual check.
 *
 * @param construct - The construct to validate.
 * @returns `true` if the construct has `SecMarker`, `false` if not, or `undefined` if input is falsy.
 */
export declare function checkSafeAttributForSecMarker(construct: any): any;
