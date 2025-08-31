let allTriggerAnswersJSON = `[
{"auf + Dachboden | in + Wohnzimmer" : ["Wo bist du gerade?", "Ich bin auf dem Dachboden. Warum?", "Könntest du kurz ins Wohnzimmer kommen? Ich brauche deine Hilfe.", "Kein Problem. Ich komme ins Wohnzimmer."],
"in + Wohnzimmer | in + Küche" : ["Wo bist du gerade?", "Ich bin im Wohnzimmer. Warum?", "Könntest du kurz in die Küche kommen? Ich brauche deine Hilfe.", "Kein Problem. Ich komme in die Küche."],
"in + Küche | auf + Markt" : ["Wo bist du gerade?", "Ich bin in der Küche. Warum?", "Könntest du kurz auf den Markt kommen? Ich brauche deine Hilfe.", "Kein Problem. Ich komme auf den Markt."],
"auf + Markt | in + Stadt" : ["Wo bist du gerade?", "Ich bin auf dem Markt. Warum?", "Könntest du kurz in die Stadt kommen? Ich brauche deine Hilfe.", "Kein Problem. Ich komme in die Stadt."],
"in + Stadt | an + Strand" : ["Wo bist du gerade?", "Ich bin in der Stadt. Warum?", "Könntest du kurz an den Strand kommen? Ich brauche deine Hilfe.", "Kein Problem. Ich komme an den Strand."],
"an + Strand | vor + Tür" : ["Wo bist du gerade?", "Ich bin am Strand. Warum?", "Könntest du kurz vor die Tür kommen? Ich brauche deine Hilfe.", "Kein Problem. Ich komme vor die Tür."],
"vor + Tür | hinter + Haus" : ["Wo bist du gerade?", "Ich bin vor der Tür. Warum?", "Könntest du kurz hinter das Haus kommen? Ich brauche deine Hilfe.", "Kein Problem. Ich komme hinter das Haus."],
"hinter + Haus | unter + Dusche" : ["Wo bist du gerade?", "Ich bin hinter dem Haus. Warum?", "Könntest du kurz unter die Dusche kommen? Ich brauche deine Hilfe.", "Kein Problem. Ich komme unter die Dusche."],
"unter + Dusche | auf + Klo" : ["Wo bist du gerade?", "Ich bin unter der Dusche. Warum?", "Könntest du kurz aufs Klo kommen? Ich brauche deine Hilfe.", "Kein Problem. Ich komme aufs Klo."],
"auf + Klo | auf + Dachboden" : ["Wo bist du gerade?", "Ich bin auf dem Klo. Warum?", "Könntest du kurz auf den Dachboden kommen? Ich brauche deine Hilfe.", "Kein Problem. Ich komme auf den Dachboden."]}
]`;

const triggers = ['auf + Dachboden | in + Wohnzimmer', 'in + Wohnzimmer | in + Küche', 'in + Küche | auf + Markt', 'auf + Markt | in + Stadt', 'in + Stadt | an + Strand', 'an + Strand | vor + Tür', 'vor + Tür | hinter + Haus', 'hinter + Haus | unter + Dusche', 'unter + Dusche | auf + Klo', 'auf + Klo | auf + Dachboden'];
