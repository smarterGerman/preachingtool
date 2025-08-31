let allTriggerAnswersJSON = `[
{"Ich habe das Auto gewaschen." : ["Was habe ich gemacht?", "Du hast das Auto gewaschen.", "Und jetzt?", "Jetzt ist das Auto gewaschen."],
"Du hast die Suppe gekocht." : ["Was hast du gemacht?", "Ich habe Suppe gekocht.", "Und jetzt?", "Jetzt ist die Suppe gekocht."],
"Er hat die Kinder versorgt." : ["Was hat er gemacht?", "Er hat die Kinder versorgt.", "Und jetzt?", "Jetzt sind die Kinder versorgt."],
"Der FC Bayern hat Borussia Dortmund endlich geschlagen." : ["Was hat der FC Bayern München gemacht?", "Er hat Borussia Dortmund geschlagen.", "Und jetzt?", "Jetzt ist Borussia Dortmund geschlagen."],
"Ich habe den Auftrag verstanden." : ["Was habe ich gemacht?", "Du hast den Auftrag verstanden.", "Und jetzt?", "Jetzt ist der Aufrag verstanden."],
"Die Fans begehren (=desire) den Fußballspieler." : ["Was haben die Fans gemacht?", "Die Fans haben den Fußballspieler begehrt.", "Und jetzt?", "Jetzt ist der Fußballspieler begehrt."],
"Sie hat das Licht ausgeschaltet (=turned off)." : ["Was hat sie gemacht?", "Sie hat das Licht ausgeschaltet.", "Und jetzt?", "Jetzt ist das Licht ausgeschaltet."],
"Der Assistent hat die Aufgabe erledigt (=accomplished)." : ["Was hat der Assistent gemacht?", "Er hat die Aufgabe erledigt.", "Und jetzt?", "Jetzt ist die Aufgabe erledigt."],
"Wir haben den Fußboden gewischt (=swept)." : ["Was haben wir gemacht?", "Wir haben den Fußboden gewischt.", "Und jetzt?", "Jetzt ist der Fußboden gewischt."],
"Die Pflegerin hat den Patienten geduscht." : ["Was hat die Pflegerin gemacht?", "Die Pflegerin hat den Patient(en) geduscht.", "Und jetzt?", "Jetzt ist der Patient geduscht."],
"Die Bombe hat den Wagen zerstört (=destroyed)." : ["Was hat die Bombe gemacht?", "Die Bombe hat den Wagen zerstört.", "Und jetzt?", "Jetzt ist der Wagen zerstört."],
"Das Krokodil hat seine Nahrung verdaut (=digested)." : ["Was hat das Krokodil gemacht?", "Das Krokodil hat die Nahrung verdaut.", "Und jetzt?", "Jetzt ist die Nahrung verdaut."],
"Sie haben alle Süßigkeiten aufgegessen (=eaten up)." : ["Was haben sie gemacht?", "Sie haben alles Süßigkeiten aufgegessen.", "Und jetzt?", "Jetzt sind alle Süßigkeiten aufgegessen."],
"Der Leiter hat das Seminar beendet." : ["Was hat derLeiter gemacht?", "Der Leiter hat das Seminar beendet.", "Und jetzt?", "Jetzt ist das Seminar beendet."],
"Die Lehrerin hat die Klassenarbeiten (=tests) ausgeteilt (=distributed)." : ["Was hat die Lehrerin gemacht?", "die Lehrerin hat die Klassenarbeiten ausgeteilt.", "Und jetzt?", "Jetzt sind alle Klassenarbeiten ausgeteilt."],
"Ich habe alle Aufgaben richtig beantwortet." : ["Was habe ich gemacht?", "Du hast alle Aufgaben richtig beantwortet.", "Und jetzt?", "Jetzt sind alle Aufgaben richtig beantwortet."],
"Die Soldaten haben den Terroristen festgenommen (=arrested)." : ["Was haben die Soldaten gemacht?", "Die Soldaten haben den Terroristen festgenommen.", "Und jetzt?", "Jetzt ist der Terrorist festgenommen."],
"Die Deutschen haben den Krieg verloren." : ["Was haben die Deutschen gemacht?", "Die Deutschen haben den Krieg verloren.", "Und jetzt?", "Jetzt ist der Krieg verloren."],
"Der Cutter hat den Film bearbeitet." : ["Was hat der Cutter gemacht?", "Der Cutter hat den Film bearbeitet.", "Und jetzt?", "Jetzt ist der Film bearbeitet."],
"Michael hat meinen Text korrigiert." : ["Was hat Michael gemacht?", "Michael hat meinen Text korrigiert.", "Und jetzt?", "Jetzt ist mein Text korrigiert."]}
]`;

const triggers = ['Ich habe das Auto gewaschen.', 'Du hast die Suppe gekocht.', 'Er hat die Kinder versorgt.', 'Der FC Bayern hat Borussia Dortmund endlich geschlagen.', 'Ich habe den Auftrag verstanden.', 'Die Fans begehren (=desire) den Fußballspieler.', 'Sie hat das Licht ausgeschaltet (=turned off).', 'Der Assistent hat die Aufgabe erledigt (=accomplished).', 'Wir haben den Fußboden gewischt (=swept).', 'Die Pflegerin hat den Patienten geduscht.', 'Die Bombe hat den Wagen zerstört (=destroyed).', 'Das Krokodil hat seine Nahrung verdaut (=digested).', 'Sie haben alle Süßigkeiten aufgegessen (=eaten up).', 'Der Leiter hat das Seminar beendet.', 'Die Lehrerin hat die Klassenarbeiten (=tests) ausgeteilt (=distributed).', 'Ich habe alle Aufgaben richtig beantwortet.', 'Die Soldaten haben den Terroristen festgenommen (=arrested).', 'Die Deutschen haben den Krieg verloren.', 'Der Cutter hat den Film bearbeitet.', 'Michael hat meinen Text korrigiert.'];