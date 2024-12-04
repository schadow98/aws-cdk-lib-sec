import * as Lambda  from 'aws-cdk-lib/aws-lambda';
export function checkCode(input_code: Lambda.Code = Lambda.Code.fromAsset("src")): Lambda.Code{


    if (input_code instanceof Lambda.AssetCode) {
        if (input_code.path !== "src") {
            throw new Error("Please define the code in the directory 'src'");
        }
    } else {
        throw new Error("The provided code must be of type 'AssetCode'");
    }
    return input_code
}

export function checkHandler(handler_name: string="handler.handler"): string{
    if (handler_name !== "handler.handler"){
        throw new Error("Please defiend the handler in a file 'handle' with an method 'handler' -> set this value to 'handler.handler'");
    }
    return handler_name
}