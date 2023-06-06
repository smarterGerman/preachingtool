let allTriggerAnswersJSON = `[
{"fragen | mein Auto nehmen" : ["Ohne zu fragen, hat er mein Auto genommen.", "Ohne etwas zu riskieren, hat man keinen Erfolg.", "Ohne eine Pause zu machen, lief sie 42km.", "Ohne etwas zu essen, überlebten wir drei Monate."],
"etwas riskieren | Man hat keinen Erfolg." : ["Ohne Alkohol zu trinken, komme ich nicht durch den Tag.", "Ohne zu schummeln, komme ich nicht durch die Prüfung.", "Ohne angeben zu wollen: Ich bin der/die beste Deutschlerner aller Zeiten.", "Ohne zu viel versprechen zu wollen: Ich mache dich zum Millionär."],
"eine Pause machen | sie lief 42km" : ["Ohne das Haus zu verlassen, kann sie für ihre Firma arbeiten.", "Ohne Geld auszugeben, sind wir um die Welt gereist."],
"etwas essen | Wir überlebten drei Monate." : [],
"Alkohol trinken | nicht durch den Tag kommen" : [],
"schummeln | nicht durch die Prüfung kommen" : [],
"angeben wollen | Ich bin der/die beste Deutschlerner aller Zeiten." : [],
"zu viel versprechen wollen | Ich mache dich zum Millionär." : [],
"das Haus verlassen | Sie kann für ihre Firma arbeiten." : [],
"Geld ausgeben | Wir sind um die Welt gereist." : []}
]`;

const triggers = ['fragen | mein Auto nehmen', 'etwas riskieren | Man hat keinen Erfolg.', 'eine Pause machen | sie lief 42km', 'etwas essen | Wir überlebten drei Monate.', 'Alkohol trinken | nicht durch den Tag kommen', 'schummeln | nicht durch die Prüfung kommen', 'angeben wollen | Ich bin der/die beste Deutschlerner aller Zeiten.', 'zu viel versprechen wollen | Ich mache dich zum Millionär.', 'das Haus verlassen | Sie kann für ihre Firma arbeiten.', 'Geld ausgeben | Wir sind um die Welt gereist.'];