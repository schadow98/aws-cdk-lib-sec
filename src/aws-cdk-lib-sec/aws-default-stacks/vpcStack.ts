import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class VPCStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Create a VPC
        const vpc = new ec2.Vpc(this, 'VPC', {
            cidr: '10.0.0.0/16',
            maxAzs: 3, // Default is all AZs in the region, set it to 3 for cost efficiency
            subnetConfiguration: [
                {
                    cidrMask: 24,
                    name: 'PrivateSubnet',
                    subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
                }
            ]
        });

        vpc.privateSubnets.forEach((subnet, index) => {
            new cdk.CfnOutput(this, `PrivateSubnet${index + 1}Id`, {
                value: subnet.subnetId,
                description: `The ID of Private Subnet ${index + 1}`,
            });
        });


        // Output the VPC ID
        new cdk.CfnOutput(this, 'VpcId', {
            value: vpc.vpcId,
            description: 'The ID of the created VPC',
        });
    }
}

const app = new cdk.App();
new VPCStack(app, 'VPCStack');
app.synth();
