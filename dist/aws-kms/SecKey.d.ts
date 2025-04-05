import { Duration, RemovalPolicy } from 'aws-cdk-lib';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { SecMarker } from '../SecMarker';
import { IPrincipal } from 'aws-cdk-lib/aws-iam';
/**
 * Secured Key that extends the CDK `Key` construct.
 *
 * This secures the class CustomRule and adds the SecMarker
 */
export declare class Key extends kms.Key {
    static [SecMarker]: boolean;
    constructor(scope: Construct, id: string, props: KeyProps);
}
export declare class KeyProps {
    /**
     * Eine Liste von Principals, die als Key-Administratoren zur Schlüsselrichtlinie hinzugefügt werden.
     *
     * @default Keine Administratoren hinzugefügt.
     */
    readonly admins?: IPrincipal[];
    /**
     * Initialer Alias, der dem Schlüssel hinzugefügt werden soll.
     *
     * @default Kein Alias.
     */
    readonly alias?: string;
    /**
     * Eine Beschreibung des Schlüssels.
     *
     * @default Keine Beschreibung.
     */
    readonly description?: string;
    /**
     * Gibt an, ob AWS KMS den Schlüssel rotiert.
     *
     * @default true
     */
    readonly enableKeyRotation?: boolean;
    /**
     * Gibt an, ob der Schlüssel zur Verwendung verfügbar ist.
     *
     * @default true
     */
    readonly enabled?: boolean;
    /**
     * Die kryptografische Konfiguration des Schlüssels. Der gültige Wert hängt von der Verwendung des Schlüssels ab.
     *
     * @default STANDARD
     */
    readonly keySpec?: kms.KeySpec;
    /**
     * Die kryptografischen Operationen, für die der Schlüssel verwendet werden kann.
     *
     * @default ENCRYPT_DECRYPT
     */
    readonly keyUsage?: kms.KeyUsage;
    /**
     * Erstellt einen Multi-Region-Primärschlüssel, den du in anderen AWS-Regionen replizieren kannst.
     *
     * @default false
     */
    readonly multiRegion?: boolean;
    /**
     * Gibt die Anzahl der Tage in der Wartezeit an, bevor AWS KMS einen CMK löscht, der aus einem CloudFormation-Stack entfernt wurde.
     *
     * @default Duration.days(7)
     */
    readonly pendingWindow?: Duration;
    /**
     * Benutzerdefiniertes Richtliniendokument, das dem KMS-Schlüssel angehängt werden soll.
     *
     * @default Keine benutzerdefinierte Richtlinie.
     */
    readonly policy?: iam.PolicyDocument;
    /**
     * Gibt an, ob der Verschlüsselungsschlüssel beibehalten werden soll, wenn er aus dem Stack entfernt wird.
     *
     * @default RemovalPolicy.DESTROY
     */
    readonly removalPolicy?: RemovalPolicy;
    /**
     * Der Zeitraum zwischen jeder automatischen Rotation.
     *
     * @default Duration.days(90)
     */
    readonly rotationPeriod?: Duration;
    constructor(props: KeyProps);
}
