import * as Lambda  from 'aws-cdk-lib/aws-lambda';

export const handler: Lambda.Handler = async (event, context) => {
    console.log('EVENT: \n' + JSON.stringify(event, null, 2));
    return context.logStreamName;
};