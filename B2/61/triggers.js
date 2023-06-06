let allTriggerAnswersJSON = `[
{"keine Zeit haben | mehr Zeit haben" : ["Ich habe keine Zeit.", "Und wo ist das Problem?", "Ich hätte lieber mehr Zeit.", "Deine Probleme möchte ich nicht haben."],
"ein Mann sein | eine Frau sein" : ["Ich bin ein Mann.", "Und wo ist das Problem?", "Ich wäre lieber eine Frau.", "Deine Probleme möchte ich nicht haben."],
"verheiratet sein | Single sein" : ["Er ist verheiratet.", "Und wo ist das Problem?", "Er wäre lieber Single.", "Seine Probleme möchte ich nicht haben."],
"zu wenig schlafen | mehr schlafen" : ["Wir schlafen zu wenig.", "Und wo ist das Problem?", "Wir würden lieber mehr schlafen.", "Eure Probleme möchte ich nicht haben."],
"zu wenig wiegen | mehr wiegen" : ["Sie wiegen zu wenig.", "Und wo ist das Problem?", "Sie würden lieber mehr wiegen.", "Ihre Probleme möchte ich nicht haben."],
"arm sein | reich sein" : ["Sie sind arm.", "Und wo ist das Problem?", "Sie wären lieber reich.", "Ihre Probleme möchte ich nicht haben."],
"sechs Kinder haben | keine Kinder haben" : ["Ich habe sechs Kinder.", "Und wo ist das Problem?", "Ich hätte lieber keine Kinder.", "Deine Probleme möchte ich nicht haben."],
"eine Stunde gewartet | nach fünf Minuten nach Hause gegangen" : ["Ich habe eine Stunde gewartet.", "Und wo ist das Problem?", "Ich wäre lieber nach fünf Minuten nach Hause gegangen.", "Deine Probleme möchte ich nicht haben."],
"einen schweren Unfall überlebt | gestorben sein" : ["Sie hat einen schweren Unfall überlebt.", "Und wo ist das Problem?", "Sie wäre lieber gestorben.", "Ihre Probleme möchte ich nicht haben."],
"das Wetter in Deutschland ist beschissen | wir in Südfrankreich leben" : ["Das Wetter in Deutschland ist beschissen.", "Und wo ist das Problem?", "Wir würden lieber in Südfrankreich leben.", "Seine Probleme möchte ich nicht haben."]}
]`;

const triggers = ['keine Zeit haben | mehr Zeit haben', 'ein Mann sein | eine Frau sein', 'verheiratet sein | Single sein', 'zu wenig schlafen | mehr schlafen', 'zu wenig wiegen | mehr wiegen', 'arm sein | reich sein', 'sechs Kinder haben | keine Kinder haben', 'eine Stunde gewartet | nach fünf Minuten nach Hause gegangen', 'einen schweren Unfall überlebt | gestorben sein', 'das Wetter in Deutschland ist beschissen | wir in Südfrankreich leben'];