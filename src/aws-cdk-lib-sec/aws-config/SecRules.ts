
import * as aws_config from 'aws-cdk-lib/aws-config';

import { SecMarker } from '../SecMarker';



export class CustomRule extends aws_config.CustomRule{
        static [SecMarker] = true;
}

export class ManagedRule extends aws_config.ManagedRule{
    static [SecMarker] = true;
}
