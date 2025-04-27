import { Stack } from '../src/aws-stack/SecStack'; 
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  ConfigurationError,
  addConfigurationErrorDetails,
  handleDetailedConfigurationErrors
} from '../src/tools/ConfigurationError';
import logger from '../src/tools/logger';

jest.mock('../src/tools/logger');

describe('Configuration Validation', () => {
  let stack: Stack;
  let mockResource: Construct;
  let tagManager: any;

  beforeEach(() => {
    const app = new cdk.App();
    stack = new Stack(app, 'TestStack', {
      stage: 'dev',
      description: "Eine Beschreibung mit 20 Zeichen lang",
      contact: {
        developerTeam: "developerTeam@domain.com",
        operationTeam: "operationTeam@domain.com",
        privacyManager: "privacyManager@domain.com",
        securityManager: "securityManager@domain.com",
      }
    });
  
    mockResource = new Construct(stack, 'MockResource');
  
    tagManager = {
      tagValues: jest.fn().mockReturnValue({}),
      setTag: jest.fn()
    };
  
    (mockResource as any).node.defaultChild = { tags: tagManager };
  
    delete process.env.DEBUG;
    jest.clearAllMocks();
  });

  it('should collect ConfigurationError and convert to DetailedConfigurationError', () => {
    new ConfigurationError('testAttribute', 'test message');
    addConfigurationErrorDetails(mockResource, 'MockResource');

    expect(() => handleDetailedConfigurationErrors(stack)).toThrow(); // should throw because no insecure tag is set and DEBUG is not on
  });


  it('should log and continue in DEBUG mode if tag is missing', () => {
    process.env.DEBUG = 'true';
    new ConfigurationError('testAttribute', 'missing tag');
    addConfigurationErrorDetails(mockResource, 'MockResource');

    expect(() => {
      handleDetailedConfigurationErrors(stack);
    }).not.toThrow();

    expect(logger.error).toHaveBeenCalled();
  });

  it('should throw for invalid insecureValidTo tag', () => {
    new ConfigurationError('testAttribute', 'bad date');
    addConfigurationErrorDetails(mockResource, 'MockResource');

    tagManager.tagValues.mockReturnValue({
      'testAttribute:insecureReason': 'Allowed',
      insecure: 'true',
      insecureValidTo: '2000-01-01', // past date
      insecureResponsible: 'Responsible Guy'
    });

    expect(() => {
      handleDetailedConfigurationErrors(stack);
    }).toThrow();
  });

   it('should throw for missing insecureResponsible tag', () => {
     new ConfigurationError('testAttribute', 'missing responsible');
     addConfigurationErrorDetails(mockResource, 'MockResource');

     tagManager.tagValues.mockReturnValue({
       'testAttribute:insecureReason': 'Allowed',
       insecure: 'true',
       insecureValidTo: '2099-01-01'
     });

     expect(() => {
       handleDetailedConfigurationErrors(stack);
     }).toThrow();
   });
});
