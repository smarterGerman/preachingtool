// // Check if the Web Speech API is supported
// if ('speechSynthesis' in window) {

//     // Create a new SpeechSynthesisUtterance object
//     var utterance = new SpeechSynthesisUtterance();
  
//     // Set the text that needs to be spoken
//     utterance.text = "Hallo Welt! Wie geht es dir?";
  
//     // Use a German voice
//     var germanVoices = speechSynthesis.getVoices().filter(function(voice) { return voice.lang.includes('de-DE'); });
//     if (germanVoices.length > 0) {
//       utterance.voice = germanVoices[0];
//     }
//     console.log(window.speechSynthesis.getVoices());
  
//     // Set the rate and pitch
//     utterance.rate = 1.0;
//     utterance.pitch = 1.0;
  
//     // Speak the text
//     speechSynthesis.speak(utterance);
//   } else {
//     console.log("The Web Speech API is not supported in this browser.");
//   }
function computerOutput(computerSpeech){
    var timer = setInterval(function() {
        var voices = speechSynthesis.getVoices();
        console.log(voices);
        let germanVoices = speechSynthesis.getVoices().filter(function(voice) { return voice.lang.includes('de-DE'); });
        console.log(germanVoices);
        if (germanVoices.length !== 0) {
            var msg = new SpeechSynthesisUtterance(computerSpeech);
            msg.rate = 0.8;
            msg.pitch = 1.2;
            msg.voice = germanVoices[0];
            speechSynthesis.speak(msg);
            clearInterval(timer);
        }
    }, 200);
}

computerOutput("Hallo Welt, wie geht es dir?");