import { Duration, RemovalPolicy } from 'aws-cdk-lib';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { SecMarker } from '../SecMarker';
import { ConfigurationError } from '../../tools/ConfigurationError';

import { IPrincipal } from 'aws-cdk-lib/aws-iam';

/**
 * Secured Key that extends the CDK `Key` construct.
 * 
 * This secures the class CustomRule and adds the SecMarker
 */
export class Key extends kms.Key{
    static [SecMarker] = true;

    constructor(scope: Construct, id: string, props: KeyProps){
        super(scope, id, {
            ...props
          });        
    }
}

export class KeyProps {
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

    constructor(props: KeyProps){
        this.admins = props.admins
        if (this.admins && this.admins.length > 0){
            new ConfigurationError("admins", "there should not be admins on a key")
        }
        this.alias = props.alias
        if (this.alias){
            new ConfigurationError("alias", "there should not be alias on a key")
        }
        this.description = props.description
        if (!this.description || this.description.length > 10){
            new ConfigurationError("description", "there should be a description with at least 10 chars on a key")
        }
        this.enableKeyRotation = props.enableKeyRotation
        if (!this.enableKeyRotation){
            new ConfigurationError("enableKeyRotation", "please enable KeyRotation on a key")
        }
        this.enabled = props.enabled
        if (!this.enabled){
            new ConfigurationError("enabled", "please delete unused keys")
        }        
        this.keySpec = props.keySpec
        if(this.keySpec == kms.KeySpec.RSA_2048){
            new ConfigurationError("keySpec", "please use a safe key with RSA and more at least 3072 digits")
        }
        this.keyUsage = props.keyUsage
        this.multiRegion = props.multiRegion
        if(this.multiRegion){
            new ConfigurationError("multiRegion", "please use the key only in a region")
        }
        this.pendingWindow = props.pendingWindow
        if(this.pendingWindow && this.pendingWindow > Duration.days(7)){
            new ConfigurationError("pendingWindow", "Unused keys should get removed after 7 days")
        }   
        this.policy = props.policy
        if(this.policy){
            new ConfigurationError("policy", "Please dont add policies to a key")
        }
        this.removalPolicy = props.removalPolicy
        if(this.removalPolicy && this.removalPolicy !== RemovalPolicy.DESTROY){
            new ConfigurationError("removalPolicy", "Deleted keys should get deleted from the aws platform")
        }     
        this.rotationPeriod = props.rotationPeriod
        if(this.rotationPeriod && this.rotationPeriod > Duration.days(90)){
            new ConfigurationError("pendingWindow", "Keys should rotate every 90 days")
        }      
    }
}