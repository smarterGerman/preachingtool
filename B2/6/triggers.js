let allTriggerAnswersJSON = `[
{
"gehen - am Samstag - in ein Restaurant - in eine Imbissbude?" : ["Ich gehe am Samstag in ein Restaurant.", "Warum gehst du am Samstag nicht in eine Imbissbude?", "Weil ich am Samstag lieber in ein Restaurant gehe.", "Das ergibt Sinn."],
"fahren - nächste Woche - in die Berge (pl) - an die See?" : ["Ich fahre nächste Woche in die Berge.", "Warum fährst du nächste Woche nicht an die See?", "Weil ich nächste Woche lieber in die Berge fahre.", "Das ergibt Sinn."],
"fliegen - übermorgen - in die USA (pl) - in die Türkei?" : ["Ich fliege übermorgen in die USA.", "Warum fliegst du übermorgen nicht in die Türkei?", "Weil ich übermorgen lieber in die USA fliege.", "Das ergibt Sinn."],
"arbeiten - am Abend - von zu Hause aus - in der Firma?" : ["Ich arbeite am Abend von zu Hause aus.", "Warum arbeitest du am Abend nicht in der Firma?", "Weil ich am Abend lieber von zu Hause aus arbeite.", "Das ergibt Sinn."],
"schlafen - morgen - bei meinem Freund - zu Hause?" : ["Ich schlafe morgen bei meinem Freund.", "Warum schläfst du morgen nicht zu Hause?", "Weil ich morgen lieber bei meinem Freund schlafe.", "Das ergibt Sinn."],
"kaufen - übermorgen - Fleisch - beim Metzger - im Supermarkt?" : ["Ich kaufe übermorgen Fleisch beim Metzger.", "Warum kaufst du übermorgen dein Fleisch nicht im Supermarkt?", "Weil ich übermorgen lieber Fleisch beim Metzger kaufe.", "Das ergibt Sinn."],
"verkaufen - nächstes Wochenende - Kram - auf dem Flohmarkt - im Internet?" : ["Ich verkaufe nächstes Wochenende meinen Kram auf dem Flohmarkt.", "Warum verkaufst du nächstes Wochenende deinen Kram nicht im Internet?", "Weil ich meinen Kram nächstes Wochenende lieber auf dem Flohmarkt verkaufe.", "Das ergibt Sinn."],
"abholen - meine Kinder (pl) - heute Nachmittag - vom Kindergarten - von der Schule?" : ["Ich hole heute Nachmittag meine Kinder vom Kindergarten ab.", "Warum holst du heute Nachmittag deine Kinder nicht von der Schule ab?", "Weil ich meine Kinder heute Nachmittag lieber von der Schule abhole.", "Das ergibt Sinn."],
"warten - nachher - am Ausgang Hasenheide* - auf dich - am Ausgang Südstern?" : ["Ich warte nachher am Ausgang Hasenheide auf dich.", "Warum wartest Du nachher nicht am Ausgang Südstern auf mich?", "Weil ich nachher lieber am Ausgang Hasenheide auf dich warte.", "Das ergibt Sinn."],
"hängen - vorher - meine Klamotten (pl) - in den Schrank - an die Garderobe?" : ["Ich hänge vorher meine Klamotten in den Schrank.", "Warum hängst du vorher deine Klamotten nicht an die Garderobe?", "Weil ich vorher lieber meine Klamotten in den Schrank hänge.", "Das ergibt Sinn."]
}
]`;

const triggers = [
'gehen - am Samstag - in ein Restaurant - in eine Imbissbude?',
'fahren - nächste Woche - in die Berge (pl) - an die See?',
'fliegen - übermorgen - in die USA (pl) - in die Türkei?',
'arbeiten - am Abend - von zu Hause aus - in der Firma?',
'schlafen - morgen - bei meinem Freund - zu Hause?',
'kaufen - übermorgen - Fleisch - beim Metzger - im Supermarkt?',
'verkaufen - nächstes Wochenende - Kram - auf dem Flohmarkt - im Internet?',
'abholen - meine Kinder (pl) - heute Nachmittag - vom Kindergarten - von der Schule?',
'warten - nachher - am Ausgang Hasenheide* - auf dich - am Ausgang Südstern?',
'hängen - vorher - meine Klamotten (pl) - in den Schrank - an die Garderobe?'
];
