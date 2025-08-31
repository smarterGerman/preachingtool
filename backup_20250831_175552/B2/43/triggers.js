let allTriggerAnswersJSON = `[
{"Ich werde gefragt." : ["Wirst Du gefragt?", "Nein, ich werde nicht gefragt.", "Würdest du gern öfter gefragt?", "Wer würde nicht gern öfter gefragt?"],
"Ich werde massiert." : ["Wirst Du massiert?", "Nein, ich werde nicht massiert.", "Würdest du gern öfter massiert?", "Wer würde nicht gern öfter massiert?"],
"Ich werde abgeholt." : ["Wirst du abgeholt?", "Nein, ich werde nicht abgeholt.", "Würdest du gern öfter abgeholt?", "Wer würde nicht gern öfter abgeholt?"],
"Du wirst geküsst." : ["Wirst du geküsst?", "Nein, ich werde nicht geküsst.", "Würdest du gern öfter geküsst?", "Wer würde nicht gern öfter geküsst?"],
"Er wird erkannt." : ["Wird er erkannt?", "Nein, er wird nicht erkannt.", "Würde er gern öfter erkannt?", "Wer würde nicht gern öfter erkannt?"],
"Wir werden freigelassen." : ["Werdet ihr freigelassen?", "Nein, wir werden nicht freigelassen.", "Würdet ihr gern freigelassen?", "Wer würde nicht gern freigelassen?"],
"Ihr werdet rausgeschmissen." : ["Werdet ihr rausgeschmissen?", "Nein, wir werden nicht rausgeschmissen.", "Würdet ihr gern rausgeschmissen?", "Wer würde nicht gern rausgeschmissen?"],
"Sie werden aufgenommen." : ["Werden sie aufgenommen?", "Nein, sie werden nicht aufgenommen.", "Würden sie gern aufgenommen?", "Wer würde nicht gern aufgenommen?"],
"Du wirst korrigiert." : ["Wirst du korrigiert?", "Nein, ich werde nicht korrigiert.", "Würdest du gern öfter korrigiert?", "Wer würde nicht gern öfter korrigiert?"],
"Du wirst entlassen." : ["Wirst du entlassen?", "Nein, ich werde nicht entlassen.", "Würdest du gern entlassen?", "Wer würde nicht gern entlassen?"],
"Sie tragen dich." : ["Wirst du getragen?", "Nein, ich werde nicht getragen.", "Würdest du gern öfter getragen?", "Wer würde nicht gern öfter getragen?"],
"Der Kontrolleur erwischt dich." : ["Wirst du erwischt?", "Nein, ich werde nicht erwischt.", "Würdest du gern öfter erwischt?", "Wer würde nicht gern öfter erwischt?"],
"Die Sonne weckt ihn auf." : ["Wirst du aufgeweckt?", "Nein, ich werde nicht aufgeweckt.", "Würdest du gern öfter aufgeweckt?", "Wer würde nicht gern öfter aufgeweckt?"],
"Das Auto überfährt sie." : ["Wird sie überfahren?", "Nein, sie wird nicht überfahren.", "Würde sie gern öfter überfahren?", "Wer würde nicht gern öfter überfahren?"],
"Der Chirurg operiert das Kind." : ["Wird das Kind operiert?", "Nein, es wird nicht operiert.", "Würde das Kind öfter operiert?", "Wer würde nicht gern öfter operiert?"],
"Die Kinder nerven die Eltern." : ["Werden die Eltern genervt?", "Nein, sie werden nicht genervt.", "Würden sie gern öfter genervt?", "Wer würde nicht gern öfter genervt?"],
"Ihr vermisst uns." : ["Werdet ihr vermisst?", "Nein, wir werden nicht vermisst.", "Würdet ihr gern öfter vermisst?", "Wer würde nicht gern öfter vermisst?"]}
]`;

const triggers = ['Ich werde gefragt.', 'Ich werde massiert.', 'Ich werde abgeholt.', 'Du wirst geküsst.', 'Er wird erkannt.', 'Wir werden freigelassen.', 'Ihr werdet rausgeschmissen.', 'Sie werden aufgenommen.', 'Du wirst korrigiert.', 'Du wirst entlassen.', 'Sie tragen dich.', 'Der Kontrolleur erwischt dich.', 'Die Sonne weckt ihn auf.', 'Das Auto überfährt sie.', 'Der Chirurg operiert das Kind.', 'Die Kinder nerven die Eltern.', 'Ihr vermisst uns.'];