import { Runtime, Function } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

describe('function testcase', () => {
  it('should throw wrong runtime', () => {
    const props = {
      runtime: Runtime.NODEJS_10_X,
      description: "Function for simple test case"
    };

    expect(() => {
      new Function(new Construct(undefined as any, 'Root'), 'TestFunction', props as any);
    }).toThrow(); 
  });
});
