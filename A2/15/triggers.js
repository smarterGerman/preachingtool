let allTriggerAnswersJSON = `[
{"groß | klein | Kaffee" : ["Hättest du lieber einen großen oder einen kleinen Kaffee?", "Ich hätte lieber einen kleinen Kaffee.", "Warum hättest du denn lieber einen kleinen Kaffee?", "Weil ich einfach lieber einen kleinen Kaffee hätte."],
"neu | gebraucht | Telefon" : ["Hättest du lieber ein neues oder ein gebrauchtes Telefon?", "Ich hätte lieber ein gebrauchtes Telefon.", "Warum hättest du denn lieber ein gebrauchtes Telefon?", "Weil ich einfach lieber ein gebrauchtes Telefon hätte."],
"klein | groß | Wohnung" : ["Hättest du lieber eine kleine oder eine große Wohnung?", "Ich hätte lieber eine kleine Wohnung.", "Warum hättest du denn lieber eine kleine Wohnung?", "Weil ich einfach lieber eine kleine Wohnung hätte."],
"klein | groß | Hund" : ["Hättest du lieber einen großen oder einen kleinen Hund?", "Ich hätte lieber einen kleinen Hund.", "Warum hättest du denn lieber einen kleinen Hund?", "Weil ich einfach lieber einen kleinen Hund hätte."],
"klein | groß | Haus" : ["Hättest du lieber ein großes oder ein kleines Haus?", "Ich hätte lieber ein kleines Haus.", "Warum hättest du denn lieber ein kleines Haus?", "Weil ich einfach lieber ein kleines Haus hätte."],
"Neuwagen | Gebrauchtwagen" : ["Hättest du lieber einen Neuwagen oder einen Gebrauchtwagen?", "Ich hätte lieber einen Gebrauchtwagen.", "Warum hättest du denn lieber einen Gebrauchtwagen?", "Weil ich einfach lieber einen Gebrauchtwagen hätte."],
"jung | alt | Katze" : ["Hättest du lieber eine junge oder eine alte Katze?", "Ich hätte lieber eine alte Katze.", "Warum hättest du denn lieber eine alte Katze?", "Weil ich einfach lieber eine alte Katze hätte."],
"neu | gebraucht | Anzug" : ["Hättest du lieber einen neuen oder einen gebrauchten Anzug?", "Ich hätte lieber einen gebrauchten Anzug.", "Warum hättest du denn lieber einen gebrauchten Anzug?", "Weil ich einfach lieber einen gebrauchten Anzug hätte."],
"klein | groß | Garten" : ["Hättest du lieber einen großen oder einen kleinen Garten?", "Ich hätte lieber einen kleinen Garten.", "Warum hättest du denn lieber einen kleinen Garten?", "Weil ich einfach lieber einen kleinen Garten hätte."],
"heiß | kalt | Pizza" : ["Hättest du lieber eine heiße oder eine kalte Pizza?", "Ich hätte lieber eine kalte Pizza.", "Warum hättest du denn lieber eine kalte Pizza?", "Weil ich einfach lieber eine kalte Pizza hätte."]}
]`;

const triggers = ['groß | klein | Kaffee', 'neu | gebraucht | Telefon', 'klein | groß | Wohnung', 'klein | groß | Hund', 'klein | groß | Haus', 'Neuwagen | Gebrauchtwagen', 'jung | alt | Katze', 'neu | gebraucht | Anzug', 'klein | groß | Garten', 'heiß | kalt | Pizza'];
