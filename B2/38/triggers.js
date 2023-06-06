let allTriggerAnswersJSON = `[
{"Er arbeitet hier. | angestellt" : ["Kennst du die Person dort?", "Er arbeitet hier.", "Aha, ein Angestellter", "Du hast es erfasst."],
"Er ist mein Neffe | verwandt" : ["Kennst du die Person dort?", "Er ist mein Neffe.", "Aha, ein Verwandter.", "Du hast es erfasst."],
"Er kommt aus Deutschland. | Deutsch" : ["Kennst du die Person dort?", "Er kommt aus Deutschland..", "Aha, ein Deutscher.", "Du hast es erfasst."],
"Ich kenne ihn | vertraut" : ["Kennst du die Person dort?", "Er ist mir vertraut.", "Aha, ein Vertrauter.", "Du hast es erfasst."],
"Ich liebe ihn | geliebt" : ["Kennst du die Person dort?", "Er liebt mich.", "Aha, ein Geliebter.", "Du hast es erfasst."],
"Ich habe Angst vor ihm. | verrückt" : ["Kennst du die Person dort?", "Er hat Angst vor mir.", "Aha, ein Ängstlicher", "Du hast es erfasst."],
"Nein. Aber er sieht hilfsbereit aus. | gut" : ["Kennst du die Person dort?", "Er ist neureich.", "Aha, ein Neureicher.", "Du hast es erfasst."],
"Nein. Aber er fährt ein fettes Auto. | neureich" : ["Kennst du die Person dort?", "Er ist betrunken.", "Aha, ein Betrunkener.", "Du hast es erfasst."]}
]`;

const triggers = ['Er arbeitet hier. | angestellt', 'Er ist mein Neffe | verwandt', 'Er kommt aus Deutschland. | Deutsch', 'Ich kenne ihn | vertraut', 'Ich liebe ihn | geliebt', 'Ich habe Angst vor ihm. | verrückt', 'Nein. Aber er sieht hilfsbereit aus. | gut', 'Nein. Aber er fährt ein fettes Auto. | neureich'];