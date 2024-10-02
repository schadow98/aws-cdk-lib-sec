import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import  logger  from '../tools/logger';

// Funktion zum Vergleich der Ressourcen in zwei Stacks
export function compareStackResources(stack1: Stack, stack2: Stack): void {
  const resourcesStack1 = stack1.node.children.map((child: Construct) => child.constructor.name);
  const resourcesStack2 = stack2.node.children.map((child: Construct) => child.constructor.name);

  const diff1 = resourcesStack1.filter(res => !resourcesStack2.includes(res));
  const diff2 = resourcesStack2.filter(res => !resourcesStack1.includes(res));

  if (diff1.length === 0 && diff2.length === 0) {
    logger.info('Die Ressourcen in den Stacks sind identisch.');
  } else {
    logger.info('Die Stacks unterscheiden sich in folgenden Ressourcen:');
    logger.info('In Stack1, aber nicht in Stack2:', diff1);
    logger.info('In Stack2, aber nicht in Stack1:', diff2);
  }
}