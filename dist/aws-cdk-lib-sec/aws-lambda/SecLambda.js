import * as Lambda from "aws-cdk-lib/aws-lambda";
import { addConfigurationErrorDetails } from "../../tools/ConfigurationError";
import { FunctionProps } from "./SecFunctionProps";
import { SecMarker } from "../SecMarker";
import logger from "../../tools/logger";
import { addCloudwatchMetricsAndAlarms } from "./cloudwatch";
/**
 * Secure wrapper around the AWS CDK `Lambda.Function` construct.
 *
 * This class applies secure defaults, centralized logging, monitoring, and
 * validation logic to standardize Lambda function deployment across environments.
 *
 * Features include:
 * - Secure defaults for handler and code
 * - Automatic log retention configuration
 * - Built-in CloudWatch metrics and alarms
 * - Centralized configuration error tracking
 *
 * @extends Lambda.Function
 */
export class Function extends Lambda.Function {
    static [SecMarker] = true;
    _logRetention;
    constructor(scope, id, props) {
        logger.debug("Function scope" + scope);
        logger.debug("Function id" + id);
        logger.debug("Function props" + props);
        props = new FunctionProps(props, scope, id);
        super(scope, id, {
            ...props,
            code: props.code ?? FunctionProps.defaultCode,
            handler: props.handler ?? FunctionProps.defaultHandler,
        });
        this._logRetention = new SecLogRetention(this._logRetention);
        addConfigurationErrorDetails(this, id);
        addCloudwatchMetricsAndAlarms(scope, id);
        logger.debug("Function" + this);
    }
}
/**
 * Handles secure log retention configuration for AWS Lambda functions.
 *
 * This class encapsulates logic for enforcing log retention policies
 * that align with security and compliance requirements.
 *
 * Can be extended to apply tagging, IAM roles, or custom retention behavior.
 */
export class SecLogRetention {
    // Verwende das Symbol als Schlüssel für die statische Eigenschaft
    static [SecMarker] = true;
    logGroupArn;
    ensureSingletonLogRetentionFunction;
    node;
    constructor(logRetention) {
        // Weist alle Eigenschaften von logRetention dem aktuellen Objekt zu
        Object.assign(this, logRetention);
    }
}
//# sourceMappingURL=SecLambda.js.map