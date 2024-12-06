import * as cdk from 'aws-cdk-lib';
import { DefaultStackSynthesizer, Stack, StackProps } from 'aws-cdk-lib';

export class StackTagsSynthesizer extends DefaultStackSynthesizer {
  private readonly tags: { [key: string]: string } = {
    'Environment': 'Production',
    'Owner': 'MyTeam',
    'SecurityLevel': 'High'
  };

  // Die Methode bind wird aufgerufen, wenn der Synthesizer an einen Stack gebunden wird
  public bind(stack: Stack): void {
    super.bind(stack);
    if (!stack.templateOptions.metadata){
        stack.templateOptions.metadata = {}
    }
    // Füge die benutzerdefinierten Tags an den Stack hinzu
    for (const [key, value] of Object.entries(this.tags)) {
        cdk.Tags.of(stack).add(key, value);
        stack.templateOptions.metadata[key] = value;
    }
    console.log(stack.templateOptions.metadata)
  }
}

