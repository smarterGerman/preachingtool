let allTriggerAnswersJSON = `[
{"Redakteur | Eigentümer | entlassen werden" : ["Ich habe gehört, dass der Redakteur entlassen wird.", "Das stimmt. Der Redakteur wird entlassen.", "Von wem wird der Redakteur denn entlassen?", "Er wird vom Eigentümer entlassen."],
"Schiller Institut | Bezirksamt | schließen" : ["Ich habe gehört, dass das Schiller Institut geschlossen wird.", "Das stimmt. Das Schiller Institut wird geschlossen.", "Von wem wird das Schiller Institut denn geschlossen?", "Es wird vom Bezirksamt geschlossen."],
"Kirche | Regierung | umbauen" : ["Ich habe gehört, dass die Kirche umgebaut wird.", "Das stimmt. Die Kirche wird von der Regierung umgebaut.", "Von wem wird die Kirche denn umgebaut?", "Die Kirche wird von der Regierung umgebaut."],
"Zirkus | Tierschutzverein | boykottiert" : ["Ich habe gehört, dass der Zirkus boykottiert wird.", "Das stimmt. Der Zirkus wird boykottiert.", "Von wem wird der Zirkus denn boykottiert.", "Er wird vom Tierschutzverein boykottiert."],
"Preise (pl) | Ölkonzerne (pl) |  erhöhen" : ["Ich habe gehört, dass die Preise erhöht werden.", "Das stimmt. Die Preise werden erhöht.", "Von wem werden die Preise denn erhöht?", "Sie werden von den Ölkonzernen erhöht."],
"Denkmal | Gemeinde | etwas abreißen" : ["Ich habe gehört, dass das Denkmal abgerissen wird.", "Das stimmt. Das Denkmal wird abgerissen.", "Von wem wird das Denkmal denn abgerissen?", "Es wird von der Gemeinde abgerissen."],
"Kollegin | Chefin |  rausschmeißen" : ["Ich habe gehört, dass die Kollegin rausgeschmissen wird.", "Das stimmt. Die Kollegin wird rausgeschmissen.", "Von wem wird die Kollegin denn rausgeschmissen?", "Die/Sie wird von der Chefin rausgeschmissen."],
"Stadion | Bauamt | bauen" : ["Ich habe gehört, dass das Stadion gebaut wird.", "Das stimmt. Das Stadion wird gebaut.", "Von wem wird das Stadion denn gebaut?", "Es wird vom Bauamt gebaut."],
"Kino | Eigentümer | schließen" : ["Ich habe gehört, dass das Kino geschlossen wird.", "Das stimmt. Das Kino wird geschlossen.", "Von wem wird das Kino denn geschlossen?", "Es wird vom Eigentümer geschlossen."],
"Schulen (pl) | Eltern (pl) | renoviert" : ["Ich habe gehört, dass die Schule renoviert wird.", "Das stimmt. Die Schule wird renoviert .", "Von wem wird die Schule denn renoviert?", "Sie wird von den Eltern renoviert."]}
]`;

const triggers = ['Redakteur | Eigentümer | entlassen werden', 'Schiller Institut | Bezirksamt | schließen', 'Kirche | Regierung | umbauen', 'Zirkus | Tierschutzverein | boykottiert', 'Preise (pl) | Ölkonzerne (pl) |  erhöhen', 'Denkmal | Gemeinde | etwas abreißen', 'Kollegin | Chefin |  rausschmeißen', 'Stadion | Bauamt | bauen', 'Kino | Eigentümer | schließen', 'Schulen (pl) | Eltern (pl) | renoviert'];