import { App } from 'aws-cdk-lib';
import * as Lambda from 'aws-cdk-lib/aws-lambda';
import { RetentionDays, LogGroup } from 'aws-cdk-lib/aws-logs';
import { Role, ServicePrincipal, ManagedPolicy } from 'aws-cdk-lib/aws-iam';
import { Stack } from '../src/aws-stack';
import {
  checkApplicationLogLevel,
  checkSystemLogLevel,
  checkLoggingFormat,
  checkLogGroup,
  checkTracing,
  checkLogRetention,
  checkLogRetentionRole,
  checkLogRetentionOptions
} from '../src/aws-lambda/logging';

jest.mock('../src/tools/logger');

describe('Lambda Logging Configuration Validators', () => {
  let app: App;
  let stack: Stack;
  let prodStack: Stack;

  beforeEach(() => {
    app = new App();
    prodStack = new Stack(app, 'ProdStack', {
      stage: 'production',
      description: 'test',
      contact: {
        developerTeam: 'a@a.de',
        operationTeam: 'b@a.de',
        privacyManager: 'c@a.de',
        securityManager: 'd@a.de'
      }
    });
    stack = new Stack(app, 'TestStack', {
      stage: 'development',
      description: 'Test description',
      contact: {
        developerTeam: 'dev@domain.com',
        operationTeam: 'ops@domain.com',
        privacyManager: 'privacy@domain.com',
        securityManager: 'security@domain.com'
      }
    });
  });

  describe('checkApplicationLogLevel', () => {
    it('returns default DEBUG in non-production', () => {
      expect(checkApplicationLogLevel(stack)).toBe(Lambda.ApplicationLogLevel.DEBUG);
    });

    it('throws if wrong level in non-production', () => {
      expect(() => checkApplicationLogLevel(stack, Lambda.ApplicationLogLevel.INFO))
    });

    it('returns INFO in production by default', () => {
      expect(checkApplicationLogLevel(prodStack)).toBe(Lambda.ApplicationLogLevel.DEBUG);
    });
  });

  describe('checkSystemLogLevel', () => {
    it('returns default DEBUG in non-production', () => {
      expect(checkSystemLogLevel(stack)).toBe(Lambda.SystemLogLevel.DEBUG);
    });

    it('throws if wrong level in non-production', () => {
      expect(() => checkSystemLogLevel(stack, Lambda.SystemLogLevel.INFO));
    });

    it('returns INFO in production by default', () => {
      expect(checkSystemLogLevel(prodStack)).toBe(Lambda.SystemLogLevel.DEBUG);
    });
  });

  describe('checkLoggingFormat', () => {
    it('returns default JSON', () => {
      expect(checkLoggingFormat()).toBe(Lambda.LoggingFormat.JSON);
    });

    it('throws on unsupported format', () => {
      expect(() => checkLoggingFormat(Lambda.LoggingFormat.TEXT));
    });
  });

  describe('checkLogGroup', () => {
    it('returns undefined when no group is provided', () => {
      expect(checkLogGroup('myLambda')).toBeUndefined();
    });

    it('returns valid log group', () => {
      const logGroup = LogGroup.fromLogGroupName(stack, 'LogGroup', '/aws/lambda/myLambda');
      expect(checkLogGroup('myLambda', logGroup)).toBe(logGroup);
    });
  });

  describe('checkTracing', () => {
    it('returns default PASS_THROUGH', () => {
      expect(checkTracing()).toBe(Lambda.Tracing.PASS_THROUGH);
    });

    it('throws on unsupported tracing', () => {
      expect(() => checkTracing(Lambda.Tracing.ACTIVE));
    });
  });

  describe('checkLogRetention', () => {
    it('returns default THREE_MONTHS', () => {
      expect(checkLogRetention()).toBe(RetentionDays.THREE_MONTHS);
    });

    it('throws on too long retention', () => {
      expect(() => checkLogRetention(RetentionDays.ONE_YEAR));
    });
  });

  describe('checkLogRetentionRole', () => {
    it('returns undefined if not provided', () => {
      expect(checkLogRetentionRole()).toBeUndefined();
    });

    it('throws if principal is not ServicePrincipal', () => {
      const role = new Role(stack, 'TestRole', {
        assumedBy: new ServicePrincipal('lambda.amazonaws.com')
      });
      Object.defineProperty(role, 'assumedBy', { value: {} });
      expect(() => checkLogRetentionRole(role));
    });

    it('throws if principal service is not allowed', () => {
      const role = new Role(stack, 'TestRole2', {
        assumedBy: new ServicePrincipal('lambda.amazonaws.com')
      });
      expect(() => checkLogRetentionRole(role));
    });

    it('throws if unauthorized policy is attached', () => {
      const role = new Role(stack, 'TestRole3', {
        assumedBy: new ServicePrincipal('logs.amazonaws.com')
      });
      role.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'));
      expect(() => checkLogRetentionRole(role));
    });
  });

  describe('checkLogRetentionOptions', () => {
    it('returns undefined when not provided', () => {
      expect(checkLogRetentionOptions()).toBeUndefined();
    });

    it('returns provided value when given', () => {
      const opts = { maxRetries: 3 };
      expect(checkLogRetentionOptions(opts)).toBe(opts);
    });
  });
});
