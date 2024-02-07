let allTriggerAnswersJSON = `[
{"neue Klamotten kaufen - hat bereits genug Klamotten" : ["Ich habe mir neue Klamotten gekauft.", "Hast du nicht erst kürzlich gesagt, dass du bereits genug Klamotten hast?", "Ja, aber ich habe halt meine Meinung geändert. Hast du damit ein Problem?", "Warum sollte ich? Es ist doch dein Geld."],
"eine Packung Zigaretten kaufen - hat mit dem Rauchen aufgehört" : ["Ich habe mir eine Packung Zigaretten gekauft.", "Hast du nicht erst kürzlich gesagt, dass du mit dem Rauchen aufgehört hast?", "Ja, aber ich habe halt meine Meinung geändert. Hast du damit ein Problem?", "Warum sollte ich? Es ist doch deine Gesundheit."],
"nie wieder ins Kino gehen - liebt Filme" : ["Ich gehe nie wieder ins Kino.", "Hast du nicht gesagt, dass du Filme liebst?", "Ja, aber ich habe halt meine Meinung geändert. Hast du damit ein Problem?", "Warum sollte ich? Es ist doch deine Sache."],
"aus seiner (=one's) Wohnung ausziehen - die Wohnung liegt gut" : ["Ich ziehe nächsten Monat aus meiner Wohnung aus.", "Hast du nicht neulich erst gesagt, dass die Wohnung gut liegt?", "Ja, aber ich habe halt meine Meinung geändert. Hast du damit ein Problem?", "Warum sollte ich? Es ist doch dein Leben."],
"seinen alten Freund besuchen - nicht mehr miteinander sprechen" : ["Ich habe gestern meinen alten Freund Sven besucht.", "Hast du nicht gesagt, dass ihr nicht mehr miteinander sprecht?", "Ja, aber ich habe inzwischen meine Meinung geändert. Hast du damit ein Problem?", "Warum sollte ich? Ich freue mich, dass ihr wieder Kontakt habt."],
"sich auf den Urlaub freuen - würde lieber arbeiten" : ["Ich freue mich auf meinen Urlaub.", "Hast du nicht gesagt, dass du lieber arbeiten würdest?", "Ja, aber ich habe halt meine Meinung geändert. Hast du damit ein Problem?", "Warum sollte ich? Du kannst ein bisschen Erholung gut gebrauchen."],
"keinen Alkohol mehr trinken - kann ohne Wein nicht leben" : ["Ich werde ab sofort keinen Alkohol mehr trinken.", "Hast du nicht gesagt, dass du ohne Wein nicht leben kannst?", "Ja, aber ich habe halt meine Meinung geändert. Hast du damit ein Problem?", "Warum sollte ich? Es ist doch deine Gesundheit."],
"seinen Mann verlassen - ein Goldstück sein" : ["Ich habe letzte Woche meinen Mann verlassen.", "Hast du nicht gesagt, dass er ein Goldstück ist?", "Ja, aber ich habe halt meine Meinung geändert. Hast du damit ein Problem?", "Warum sollte ich? Es ist doch dein Leben."],
"anfangen Deutsch zu lernen - Deutsch ist unmöglich zu lernen" : ["Ich habe jetzt angefangen, Deutsch zu lernen.", "Hast du nicht erst kürzlich gesagt, dass es unmöglich ist, Deutsch zu lernen?", "Ja, aber ich habe halt meine Meinung geändert. Hast du damit ein Problem?", "Warum sollte ich? Es ist doch deine Entscheidung."],
"Ukulele spielen lernen - unmusikalisch sein" : ["Ich habe kürzlich angefangen, Ukulele zu spielen.", "Hast du nicht gesagt, dass du unmusikalisch bist?", "Ja, aber ich habe halt meine Meinung geändert. Hast du damit ein Problem?", "Warum sollte ich? Es ist doch deine Sache."],
"einen Marathon laufen - unsportlich sein" : ["Ich werde nächsten Herbst einen Marathon laufen.", "Hast du nicht neulich gesagt, dass du unsportlich bist?", "Ja, aber ich habe jetzt meine Meinung geändert. Hast du damit ein Problem?", "Warum sollte ich? Es ist doch deine Angelegenheit."]}
]`;

const triggers = ['neue Klamotten kaufen - hat bereits genug Klamotten', 'eine Packung Zigaretten kaufen - hat mit dem Rauchen aufgehört', 'nie wieder ins Kino gehen - liebt Filme', "aus seiner (=one's) Wohnung ausziehen - die Wohnung liegt gut", 'seinen alten Freund besuchen - nicht mehr miteinander sprechen', 'sich auf den Urlaub freuen - würde lieber arbeiten', 'keinen Alkohol mehr trinken - kann ohne Wein nicht leben', 'seinen Mann verlassen - ein Goldstück sein', 'anfangen Deutsch zu lernen - Deutsch ist unmöglich zu lernen', 'Ukulele spielen lernen - unmusikalisch sein', 'einen Marathon laufen - unsportlich sein'];
