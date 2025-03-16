import * as cdk from '../../src/aws-cdk-lib-sec';
import {  IConstruct } from 'constructs';

class StackTaggerAllRessources implements cdk.IAspect {
    private readonly key: string;
    private readonly value: string;
    constructor(key: string, value: string) {
      this.key = key;
      this.value = value;
    }
  
    public visit(node: IConstruct): void {
      // Variante 1: Mittels Tag-Klasse
      // new cdk.Tag(this.key, this.value).visit(node);
      
      // Variante 2: Empfohlener Weg mit Tags.of()
      cdk.Tags.of(node).add(this.key, this.value, {
          priority: 100
      });
    }
  }
  