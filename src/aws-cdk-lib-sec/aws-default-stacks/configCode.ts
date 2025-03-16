exports.handler = async (event) => {
    // Das 'event' enthält die Informationen zu den Ressourcen, die du prüfen möchtest.
    // Du bekommst die AWS Config Event-Details in event.invokingEvent.
    // In event.ruleParameters liegen ggf. vom Benutzer definierte Parameter.

    // Hier ein ganz einfaches Beispiel, das immer "NON_COMPLIANT" zurückgibt,
    // wenn der ResourceName nicht 'MeinErlaubterName' ist.
    
    const invokingEvent = JSON.parse(event.invokingEvent);
    const configurationItem = invokingEvent.configurationItem;
    const resourceName = configurationItem.resourceName || '';

    // Beispiel: Wir fordern, dass der Ressource-Name genau 'MeinErlaubterName' ist
    const isCompliant = resourceName === 'MeinErlaubterName';

    let compliance = 'COMPLIANT';
    if (!isCompliant) {
      compliance = 'NON_COMPLIANT';
    }

    // Ergebnis-Objekt für AWS Config
    const result = {
      compliance_type: compliance,
      annotation: isCompliant
        ? 'Ressource entspricht der geforderten Syntax.'
        : 'Ressource entspricht NICHT der geforderten Syntax.',
    };

    return result;
  };