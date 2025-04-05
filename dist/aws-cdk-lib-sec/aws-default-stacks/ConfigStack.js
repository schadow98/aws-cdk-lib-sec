// ConfigStack.ts
import * as cdk from 'aws-cdk-lib';
import fs from 'fs';
import path from 'path';
import * as aws_lambda from 'aws-cdk-lib/aws-lambda';
/**
 * CDK stack that sets up AWS Config resources for compliance and governance.
 *
 * This stack may include custom or managed AWS Config rules, recorders, delivery channels,
 * and associated permissions to monitor and evaluate resource configurations.
 * It deploys a LambdaFunction to evaluate the Custom Config Rules.
 */
export class ConfigStack extends cdk.Stack {
    configFn;
    configFnArn;
    constructor(scope, id, props) {
        super(scope, id, props);
        this.configFn = new aws_lambda.Function(this, 'ConfigLambda', {
            runtime: aws_lambda.Runtime.NODEJS_18_X,
            code: aws_lambda.Code.fromInline(fs.readFileSync(path.join(path.dirname(__filename), "./configCode.ts"), { encoding: 'utf8', flag: 'r' })),
            handler: 'index.handler',
        });
        this.configFnArn = this.configFn.functionArn;
        new cdk.CfnOutput(this, 'ConfigFnArn', {
            value: this.configFn.functionArn,
            exportName: 'ConfigFnArn' // eindeutiger Export-Name
        });
    }
}
//# sourceMappingURL=ConfigStack.js.map