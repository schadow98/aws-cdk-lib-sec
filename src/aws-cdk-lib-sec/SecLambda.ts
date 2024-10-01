import { IProfilingGroup } from 'aws-cdk-lib/aws-codeguruprofiler';
import { IVpc, SubnetSelection, ISecurityGroup } from 'aws-cdk-lib/aws-ec2';
import { PolicyStatement, IRole } from 'aws-cdk-lib/aws-iam';
import { IKey } from 'aws-cdk-lib/aws-kms';
import * as Lambda  from 'aws-cdk-lib/aws-lambda';
import { FunctionProps } from 'aws-cdk-lib/aws-lambda';
import { RetentionDays, ILogGroup } from 'aws-cdk-lib/aws-logs';
import { ITopic } from 'aws-cdk-lib/aws-sns';
import { IQueue } from 'aws-cdk-lib/aws-sqs';
import { Duration, Size } from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { LogError } from '../tools/LogError';

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

class safeFunctionProps{
    _runtime: Lambda.Runtime= Lambda.Runtime.NODEJS_18_X;
    _code: Lambda.Code;
    _handler: string;
    _description?: string | undefined;
    _timeout?: Duration | undefined;
    _environment?: { [key: string]: string; } | undefined;
    _functionName?: string | undefined;
    _memorySize?: number | undefined;
    _ephemeralStorageSize?: Size | undefined;
    _initialPolicy?: PolicyStatement[] | undefined;
    _role?: IRole | undefined;
    _vpc?: IVpc | undefined;
    _ipv6AllowedForDualStack?: boolean | undefined;
    _vpcSubnets?: SubnetSelection | undefined;
    _securityGroups?: ISecurityGroup[] | undefined;
    _allowAllOutbound?: boolean | undefined;
    _allowAllIpv6Outbound?: boolean | undefined;
    _deadLetterQueueEnabled?: boolean | undefined;
    _deadLetterQueue?: IQueue | undefined;
    _deadLetterTopic?: ITopic | undefined;
    _tracing?: Lambda.Tracing | undefined;
    _snapStart?: Lambda.SnapStartConf | undefined;
    _profiling?: boolean | undefined;
    _profilingGroup?: IProfilingGroup | undefined;
    _insightsVersion?: Lambda.LambdaInsightsVersion | undefined;
    _adotInstrumentation?: Lambda.AdotInstrumentationConfig | undefined;
    _paramsAndSecrets?: Lambda.ParamsAndSecretsLayerVersion | undefined;
    _layers?: Lambda.ILayerVersion[] | undefined;
    _reservedConcurrentExecutions?: number | undefined;
    _events?: Lambda.IEventSource[] | undefined;
    _logRetention?: RetentionDays | undefined;
    _logRetentionRole?: IRole | undefined;
    _logRetentionRetryOptions?: Lambda.LogRetentionRetryOptions | undefined;
    _currentVersionOptions?: Lambda.VersionOptions | undefined;
    _filesystem?: Lambda.FileSystem | undefined;
    _allowPublicSubnet?: boolean | undefined;
    _environmentEncryption?: IKey | undefined;
    _codeSigningConfig?: Lambda.ICodeSigningConfig | undefined;
    _architecture?: Lambda.Architecture | undefined;
    _runtimeManagementMode?: Lambda.RuntimeManagementMode | undefined;
    _logGroup?: ILogGroup | undefined;
    _logFormat?: string | undefined;
    _loggingFormat?: Lambda.LoggingFormat | undefined;
    _recursiveLoop?: Lambda.RecursiveLoop | undefined;
    _applicationLogLevel?: string | undefined;
    _applicationLogLevelV2?: Lambda.ApplicationLogLevel | undefined;
    _systemLogLevel?: string | undefined;
    _systemLogLevelV2?: Lambda.SystemLogLevel | undefined;
    _onFailure?: Lambda.IDestination | undefined;
    _onSuccess?: Lambda.IDestination | undefined;
    _maxEventAge?: Duration | undefined;
    _retryAttempts?: number | undefined;

    constructor(props: FunctionProps){
        this.runtime = props.runtime
        this._code = props.code 
        this._handler = props.handler 
    }

    public set runtime(runtime: Lambda.Runtime){
        if  (! safeLambdaRuntimes.includes(runtime)){
            throw new LogError("Not a valid Runtime" + runtime)
        }
        this._runtime = runtime
    }

    public get runtime():  Lambda.Runtime{
        return this._runtime
    }

    public get code():  Lambda.Code{
        return this._code
    }

    public set code(code: Lambda.Code){
        this._code = code
    }

    public get handler():  string{
        return this._handler
    }

    public set handler(handler: string){
        this._handler = handler
    }

 
}

export class SecLambda extends Lambda.Function{
    constructor(scope: Construct, id: string, props: FunctionProps){
        
        super(scope, id, new safeFunctionProps(props))
    }
}


