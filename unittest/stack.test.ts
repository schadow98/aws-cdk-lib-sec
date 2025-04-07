import { Construct } from "constructs";
import { Stack } from "../src";

describe('stack testcase', () => {
  const props = {
    description: "Stack for simple test case",
    contact: {
      developerTeam:  "developerTeam@domain.com",
      operationTeam:  "operationTeam@domain.com",
      privacyManager: "privacyManager@domain.com",
      securityManager:"securityManager@domain.com",      
    }
  }
  const stack = new Stack(new Construct(undefined as any, 'Root'), 'TestStack', props);

  it('check stack', () => {
    expect(stack).toBeDefined();
  });
});