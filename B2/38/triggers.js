let allTriggerAnswersJSON = `[
{"Er arbeitet hier. | angestellt" : ["Kennst du die Person dort?", "Er arbeitet hier.", "Aha, er ist ein Angestellter", "Du hast es erfasst."],
"Sie ist meine Nichte. | verwandt" : ["Kennst du die Person dort?", "Sie ist meine Nichte.", "Aha, sie ist deine Verwandte.", "Du hast es erfasst."],
"Er kommt aus Deutschland. | Deutsch" : ["Kennst du die Person dort?", "Er kommt aus Deutschland.", "Aha, er ist ein Deutscher.", "Du hast es erfasst."],
"Ich kenne sie | vertraut" : ["Kennst du die Person dort?", "Ich kenne sie.", "Aha, sie ist eine Vertraute.", "Du hast es erfasst."],
"Ich liebe ihn | geliebt" : ["Kennst du die Person dort?", "Ich liebe ihn.", "Aha, er ist ein Geliebter.", "Du hast es erfasst."],
"Ich habe Angst vor ihr. | verrückt" : ["Kennst du die Person dort?", "Ich habe Angst vor ihr.", "Aha, sie ist eine Verrückte.", "Du hast es erfasst."],
"Nein. Aber er sieht hilfsbereit aus. | gut" : ["Kennst du die Person dort?", "Nein, aber er sieht hilfsbereit aus.", "Aha, er ist ein Guter.", "Du hast es erfasst."],
"Nein. Aber sie fährt ein fettes Auto. | neureich" : ["Kennst du die Person dort?", "Nein, aber sie fährt ein fettes Auto.", "Aha, sie ist eine Neureiche.", "Du hast es erfasst."]}
]`;

const triggers = ['Er arbeitet hier. | angestellt', 'Sie ist meine Nichte. | verwandt', 'Er kommt aus Deutschland. | Deutsch', 'Ich kenne sie | vertraut', 'Ich liebe ihn | geliebt', 'Ich habe Angst vor ihr. | verrückt', 'Nein. Aber er sieht hilfsbereit aus. | gut', 'Nein. Aber sie fährt ein fettes Auto. | neureich'];