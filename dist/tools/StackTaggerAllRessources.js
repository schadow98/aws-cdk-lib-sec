import * as cdk from '../../src/aws-cdk-lib-sec';
export class StackTaggerAllRessources {
    key;
    value;
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    visit(node) {
        // Variante 1: Mittels Tag-Klasse
        // new cdk.Tag(this.key, this.value).visit(node);
        // Variante 2: Empfohlener Weg mit Tags.of()
        cdk.Tags.of(node).add(this.key, this.value, {
            priority: 100
        });
    }
}
//# sourceMappingURL=StackTaggerAllRessources.js.map