let allTriggerAnswersJSON = `[
{"Dachboden (m)" : ["Wo bist du gerade?", "Ich bin auf dem Dachboden. Warum?", "Könntest du kurz ins Wohnzimmer kommen? Ich brauche deine Hilfe.", "Kein Problem. Ich komme ins Wohnzimmer."],
"Wohnzimmer (n)" : ["Wo bist du gerade?", "Ich bin im Wohnzimmer. Warum?", "Könntest du kurz in die Küche kommen? Ich brauche deine Hilfe.", "Kein Problem. Ich komme in die Küche."],
"Küche (f)" : ["Wo bist du gerade?", "Ich bin in der Küche. Warum?", "Könntest du kurz auf den Markt kommen? Ich brauche deine Hilfe.", "Kein Problem. Ich komme auf den Markt."],
"Klo (n)" : ["Wo bist du gerade?", "Ich bin auf dem Markt. Warum?", "Könntest du kurz in die Stadt kommen? Ich brauche deine Hilfe.", "Kein Problem. Ich komme in die Stadt."],
"Stadt (f)" : ["Wo bist du gerade?", "Ich bin in der Stadt. Warum?", "Könntest du kurz an den Strand kommen? Ich brauche deine Hilfe.", "Kein Problem. Ich komme an den Strand."],
"Strand (m)" : ["Wo bist du gerade?", "Ich bin am Strand. Warum?", "Könntest du kurz vor die Tür kommen? Ich brauche deine Hilfe.", "Kein Problem. Ich komme vor die Tür."],
"Tür (f)" : ["Wo bist du gerade?", "Ich bin vor der Tür. Warum?", "Könntest du kurz ins Haus kommen? Ich brauche deine Hilfe.", "Kein Problem. Ich komme ins Haus."],
"Haus n)" : ["Wo bist du gerade?", "Ich bin im Haus. Warum?", "Könntest du kurz in die Dusche kommen? Ich brauche deine Hilfe.", "Kein Problem. Ich komme in die Dusche."],
"Dusche (f)" : ["Wo bist du gerade?", "Ich bin in der Dusche. Warum?", "Könntest du kurz aufs Klo kommen? Ich brauche deine Hilfe.", "Kein Problem. Ich komme aufs Klo."],
"Markt (m)" : ["Wo bist du gerade?", "Ich bin aufm Klo. Warum?", "Könntest du kurz auf den Dachboden kommen? Ich brauche deine Hilfe.", "Kein Problem. Ich komme auf den Dachboden."]}
]`;

const triggers = ['Dachboden (m)', 'Wohnzimmer (n)', 'Küche (f)', 'Klo (n)', 'Stadt (f)', 'Strand (m)', 'Tür (f)', 'Haus n)', 'Dusche (f)', 'Markt (m)'];