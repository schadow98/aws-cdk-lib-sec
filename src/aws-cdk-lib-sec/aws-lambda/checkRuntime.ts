import * as Lambda  from 'aws-cdk-lib/aws-lambda';
import { ConfigurationError } from '../../tools/ConfigurationError';
import logger from '../../tools/logger';
const safeLambdaRuntimes: Lambda.Runtime[] = [
    // Lambda.Runtime.NODEJS,
    // Lambda.Runtime.NODEJS_4_3,
    // Lambda.Runtime.NODEJS_6_10,
    // Lambda.Runtime.NODEJS_8_10,
    // Lambda.Runtime.NODEJS_10_X,
    // Lambda.Runtime.NODEJS_12_X,
    // Lambda.Runtime.NODEJS_14_X,
    // Lambda.Runtime.NODEJS_16_X,
    Lambda.Runtime.NODEJS_18_X,
    Lambda.Runtime.NODEJS_20_X,
    // Lambda.Runtime.PYTHON_2_7,
    // Lambda.Runtime.PYTHON_3_6,
    // Lambda.Runtime.PYTHON_3_7,
    Lambda.Runtime.PYTHON_3_8,
    Lambda.Runtime.PYTHON_3_9,
    Lambda.Runtime.PYTHON_3_10,
    Lambda.Runtime.PYTHON_3_11,
    Lambda.Runtime.PYTHON_3_12,
    // Lambda.Runtime.JAVA_8,
    Lambda.Runtime.JAVA_8_CORRETTO,
    Lambda.Runtime.JAVA_11,
    Lambda.Runtime.JAVA_17,
    Lambda.Runtime.JAVA_21,
    Lambda.Runtime.DOTNET_6,
    Lambda.Runtime.DOTNET_8,
    // Lambda.Runtime.DOTNET_CORE_1,
    // Lambda.Runtime.DOTNET_CORE_2,
    // Lambda.Runtime.DOTNET_CORE_2_1,
    // Lambda.Runtime.DOTNET_CORE_3_1,
    // Lambda.Runtime.GO_1_X,
    // Lambda.Runtime.RUBY_2_5,
    // Lambda.Runtime.RUBY_2_7,
    Lambda.Runtime.RUBY_3_2,
    Lambda.Runtime.RUBY_3_3,
    //Lambda.Runtime.PROVIDED,
    Lambda.Runtime.PROVIDED_AL2,
    Lambda.Runtime.PROVIDED_AL2023,
    Lambda.Runtime.FROM_IMAGE
  ]



  export const checkRuntime = (runtime: Lambda.Runtime): Lambda.Runtime => {
    logger.debug("checkRuntime " + runtime)
    if (!safeLambdaRuntimes.includes(runtime)) {
        new ConfigurationError("runtime", "Not a valid and secured runtime: " + runtime);
    }
    return runtime;
};