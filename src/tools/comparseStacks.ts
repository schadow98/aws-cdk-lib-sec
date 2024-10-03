import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import  logger  from '../tools/logger';
import { cdk } from '../aws-cdk-lib-sec';
import jsonDiff  from 'json-diff'
import * as fs from 'fs'
import * as path from 'path'
import { Diff, diff } from 'deep-diff';


export function compareJSONTemplate(stack1: Stack, stack2: Stack, outputDir: string): void {
  logger.info(jsonDiff.diffString(getTemplateOfStack(stack1), getTemplateOfStack(stack2)))
  fs.writeFileSync(path.join(outputDir, "diff.txt"), jsonDiff.diffString(getTemplateOfStack(stack1), getTemplateOfStack(stack2), { color: false }));
}

function getTemplateOfStack(stack: Stack){
  const app = stack.node.root as cdk.App; 
  const assembly = app.synth();          
  const stackArtifact = assembly.getStackArtifact(stack.artifactId); 
  // Write the stack to the file
  return stackArtifact.template
}