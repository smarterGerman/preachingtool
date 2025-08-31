window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
Element.prototype.remove = function() {
  this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
  for(var i = this.length - 1; i >= 0; i--) {
      if(this[i] && this[i].parentElement) {
          this[i].parentElement.removeChild(this[i]);
      }
  }
}



// Containers 
const body = document.querySelector("body");
const audio_img = document.getElementById("audio-img");
const trigger_content = document.querySelector(".trigger-content");
const correct_answers_div = document.querySelector(".correct-answers"); 
const previous_answers_div = document.querySelector(".previous-answers");
const preaching_section = document.querySelector(".preaching-container");
const starting_box = document.querySelector(".starting-box-konstantin");
const mic_container = document.querySelector(".mic-container");
const tutorialContainer = document.querySelector(".tutorial-container");
const navigationContainer = document.querySelector(".navigation");
const nextButton = document.querySelector(".next-button");
const triggerTutorialContainer = document.querySelector(".triggers");
const finishBox = document.querySelector(".finish-screen-konstantin");
const triggerCounterDiv = document.querySelector(".trigger-counter");
const counter = 0;
let play_pause_counter = 0;
let germanVoices = speechSynthesis.getVoices().filter(function(voice) { return voice.lang.includes('de-DE'); });
// ! DELAY FUNCTION
// Put whatever code that needs to be delayed into sleepFor(seconds)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function sleepFor(seconds, whattodo, index) {
  for (let i = 0; i < seconds; i++) {
      await sleep(i * 1000);
  }
  whattodo(index);
}

// ! RESET GAME 
function resetGame(){
  location.reload();
}

// cancel any ongoing speech output
function cancelSpeech() {
  speechSynthesis.cancel();
}

// Let computer give its answer function 
// function computerOutput(computerSpeech){
//   var timer = setInterval(function() {
//       // var voices = speechSynthesis.getVoices();
//       // console.log(voices);
//       let germanVoices = speechSynthesis.getVoices().filter(function(voice) { return voice.lang.includes('de-DE'); });
//       // console.log(germanVoices);
//       if (germanVoices.length !== 0) {
//           var msg = new SpeechSynthesisUtterance(computerSpeech);
//           msg.rate = 0.8;
//           msg.pitch = 1.2;
//           msg.voice = germanVoices[0];
//           speechSynthesis.speak(msg);
//           clearInterval(timer);
//       }
//   }, 200);
// }

function computerOutput(computerSpeech){
  var msg = new SpeechSynthesisUtterance(computerSpeech);
  msg.rate = 0.8;
  msg.pitch = 1.2;
  msg.voice = germanVoices[0];
  speechSynthesis.speak(msg);
}

function toolAnswer(){
  p.innerText = allTriggerAnswersData[0][current_trigger][current_trigger_index +1];
  computerOutput(allTriggerAnswersData[0][current_trigger][current_trigger_index +1]);
  // console.log("current index" + current_trigger_index);
  // if (current_trigger_index == 2) {
  //   correct_answers_div.innerText = "Good job. Practice the trigger again or go to the next one.";
  // }
  current_trigger_index += 2; 
  // console.log("Trigger Index: " + current_trigger_index);
  p = document.createElement('p');
  words.appendChild(p)
}
function computerFirst(){
  // console.log("Computer writes");
  current_trigger = current_trigger.replace(/\n/g,"");
  p = document.createElement('p');
  words.appendChild(p);
  p.innerText = allTriggerAnswersData[0][current_trigger][current_trigger_index];
  computerOutput(allTriggerAnswersData[0][current_trigger][current_trigger_index]);
  current_trigger_index += 1;
  p = document.createElement('p');
  words.appendChild(p);
}

// ! START PREACHING 
let preachingStarted = 0;
function startPreaching(){
  preaching_section.classList.remove("hide-konstantin");
  starting_box.classList.add("hide-konstantin");
  trigger_content.classList.remove("hide-konstantin");
  mic_container.classList.remove("hide-konstantin");
  nextButton.classList.add("hide-konstantin");
  gameIsFinished = false;
  sleep(3000);
  turnOnMicro();
}
// ! FINISHED PREACHING 
let gameIsFinished = true;
function finishGame(){
  recognition.stop();
  // words.innerHTML = "<img src='https://raw.githubusercontent.com/smarterGerman/preachingtool/main/icons/preaching-tool-skip-button-symbol.png'>";
  // words.style.background = "#FFECE2";
  words.classList.add("hide-konstantin");
  triggerTutorialContainer.classList.add("hide-konstantin");
  navigationContainer.classList.add("hide-konstantin");
  finishBox.classList.remove("hide-konstantin");
  correct_answers_div.innerText = ""
  gameIsFinished = true;
}
  // WEB SPEECH API SETTINGS 
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.continuous = false;
  recognition.lang = 'de-DE';
  
  allTriggerAnswersData = JSON.parse(allTriggerAnswersJSON);
  trigger_content.innerText = triggers[0];
  
  let p = document.createElement('p');
  const words = document.querySelector('.words');
  words.appendChild(p);

  // Focus Function 
  function triggerFocus(element) {
    var eventType = "onfocusin" in element ? "focusin" : "focus",
    bubbles = "onfocusin" in element,
    event;
    
    if ("createEvent" in document) {
      event = document.createEvent("Event");
      event.initEvent(eventType, bubbles, true);
    }
    else if ("Event" in window) {
      event = new Event(eventType, { bubbles: bubbles, cancelable: true });
    }
    
    element.focus();
    element.dispatchEvent(event);
  }
  
  // Pick the current Trigger 
  let current_trigger = triggers[0]; 
  let current_trigger_index = 0;
  let next_index = 0;
  let paragraphs = words.getElementsByTagName("p");

  let initialCounter = true;
  function countTrigger(){
    triggerCounterDiv.textContent = triggers.indexOf(current_trigger) + 1 + "/" + triggers.length;
  }
  // ! NEXT TRIGGER FUNCTION
  let secondHalf = false;
  let nextCounter = 0;
  function nextTrigger() {
    // if(switchPlaces % 2 == 1){
    //   toolAnswer();
    // }
    // sleep(2, console.log(""));
    cancelSpeech();
    nextCounter++;
    if (next_index + 1 < triggers.length){
      next_index++; 
      // console.log("index: " + next_index);
    }
    else{
      if(nextCounter >= (triggers.length*2-1) || secondHalf){
        finishGame();
      } else{
        next_index = 0;
        switchPlaces++; 
      }
    }
    current_trigger = triggers[next_index];
    // console.log(current_trigger);
    trigger_content.innerText = current_trigger;
    deleteEverything();
    correct_answers_div.innerText = "";
    // triggerFocus(words);
    computerSpeakingFirst = true;
    countTrigger();
  }
  // ! DELETE EVERYTHING FUNCTION 
  function deleteEverything() {
    if(switchPlaces % 2 == 0){
      // console.log("Delete first");
      for(i=paragraphs.length - 1; i > 0; i--){
          if(i >= 0){
              paragraphs[i].remove();
            }
          }
      p = document.createElement('p');
      words.appendChild(p);
    } else {
        for(i=paragraphs.length - 1; i > 0; i--){
          if(i >= 0){
            paragraphs[i].remove();
          }
        }
      p = document.createElement('p');
      words.appendChild(p);
    }
    paragraphs[0].innerText = "";
    current_trigger_index = 0;
    computerSpeakingFirst = true;
    // console.log("Before the if statement in DELETE");
    if(computerSpeakingFirst && switchPlaces % 2 == 0){
      // console.log("Is the computerFirst function being called?");
      computerFirst();
      computerSpeakingFirst = false;
    }
  }
  function otherPerson(){
    switchPlaces++; 
    // console.log(switchPlaces);
    deleteEverything();
  }
  // ! Tutorial Button 
  let tutorial_counter = 0;
  let example_preaching = ["Bestrafst du gern?",
  "Ich bestrafe nicht gern.",
  "Warum bestrafst du nicht gern?", "Weil ich einfach nicht gern bestrafe."]
  function startTutorial(){
    if(tutorial_counter % 2 == 0){
      // deleteEverything();
      if(switchPlaces % 2 == 0){
        tutorialContainer.innerHTML = "";
        p = document.createElement('p');
        tutorialContainer.appendChild(p);
      }
      for(i = 0; i < example_preaching.length; i++){
        p.innerText = example_preaching[i];
        p = document.createElement('p');
        tutorialContainer.appendChild(p);
      }
      tutorialContainer.classList.remove("hide-konstantin")
      words.classList.add("blur-konstantin");
      navigationContainer.classList.add("blur-konstantin");
      tutorial_counter++;
    }
    else {
      // deleteEverything();
      tutorialContainer.innerHTML = "";
      words.classList.remove("blur-konstantin");
      navigationContainer.classList.remove("blur-konstantin");
      tutorial_counter++;
      tutorialContainer.classList.add("hide-konstantin")
    }
  }

  let switchPlaces = 0;
  let computerSpeakingFirst = true;
  let test = true; 
  // recognition.start();
// ! GET RESULT OF AUDIO 
  recognition.addEventListener('result', e => {
    if (switchPlaces % 2 == 0){
      // TOOL SPEAKS FIRST 
      // Reset correct answer div 
      correct_answers_div.innerText = "";
      // MIC ON
      audio_img.src = "data:image/png;base64,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";
      const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
      
      // const poopScript = transcript.replace(/poo|shit|dump/gi, '💩');
      const poopScript = transcript;
      const deleteScript = transcript.match("löschen");
      if (deleteScript == "löschen" && counter == 0) {
        deleteEverything();
        $('.words').children().last().remove();
      }
      
      if(paragraphs.length > 1){
        paragraphs[paragraphs.length - 1].style.color = "black";
      }
      p.textContent = poopScript;
      // Here is where stuff is being written 
      if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
        // Remove special characters from current_trigger 
        current_trigger = current_trigger.replace(/\n/g,"");
        if(paragraphs.length > 1) {
          if(paragraphs[paragraphs.length - 2].innerText.toLowerCase().replace(/[.,?!;:]/g,"") == allTriggerAnswersData[0][current_trigger][current_trigger_index].toLowerCase().replace(/[.,?!;:]/g,"")){
            // console.log("I am in the TOOL LOOP");
            paragraphs[paragraphs.length - 2].style.color = "green";
            // if(current_trigger_index == 3){
            //   correct_answers_div.innerText = "Good job. Practice the trigger again or go to the next one.";
            // }
          if(allTriggerAnswersData[0][current_trigger][current_trigger_index + 1]){
            sleepFor(2, toolAnswer);
          }
          if(current_trigger_index == 3){
            // console.log("Last Trigger Answer");
            // console.log("I am about to call the timer nextTrigger");
            sleepFor(3, nextTrigger);
            // console.log("Was it called before?");
            // previous_answers_div.innerHTML = "";
            // for(i=0; i < allTriggerAnswersData[0][current_trigger].length; i++){
            //   p = document.createElement('p');
            //   p.innerText = allTriggerAnswersData[0][current_trigger][i];
            //   previous_answers_div.appendChild(p);
            //   p = document.createElement('p');
            // }
          }
        }
        else {
          paragraphs[paragraphs.length - 2].style.color = "red";
          correct_answers_div.innerHTML = "<span style=\"color: red; font-weight: 500;\">Correct: </span>" + allTriggerAnswersData[0][current_trigger][current_trigger_index];
        }
      }
    }
    if(paragraphs.length > 5){
      paragraphs[0].remove();
    }
    recognition.addEventListener('end', () => {
      // MIC OFF 
      audio_img.src = "https://www.filepicker.io/api/file/VyfbFTekQn6m2LEPlNm5"
    });
    test = false; 
  } else {
    // STUDENT SPEAKS FIRST
    // set secondHalf = true so that the finish screen is shown
    secondHalf = true;
// Reset correct answer div 

      correct_answers_div.innerText = "";
      // MIC ON 
      audio_img.src = "https://raw.githubusercontent.com/smarterGerman/preachingtool/main/icons/preaching-tool-microphone-button-active-symbol.png"
      const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
      
      let poopScript = transcript.replace(/grossen/gi, 'großen');
      poopScript = transcript.replace(/gross/gi, 'groß');
      poopScript = transcript.replace(/grosse/gi, 'große');
      // const poopScript = transcript;
      const deleteScript = transcript.match("löschen");
      if (deleteScript == "löschen" && counter == 0) {
        deleteEverything();
        $('.words').children().last().remove();
      }
      
      if(paragraphs.length > 1){
        paragraphs[paragraphs.length - 1].style.color = "black";
      }
      p.textContent = poopScript;
      if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
        // Remove special characters from current_trigger 
        current_trigger = current_trigger.replace(/\n/g,"");
        if(paragraphs.length > 1) {
          if(paragraphs[paragraphs.length - 2].innerText.toLowerCase().replace(/[.,?!;:]/g,"") == allTriggerAnswersData[0][current_trigger][current_trigger_index].toLowerCase().replace(/[.,?!;:]/g,"")){
            paragraphs[paragraphs.length - 2].style.color = "green";
          if(allTriggerAnswersData[0][current_trigger][current_trigger_index + 1]){
            sleepFor(2, toolAnswer);
          }
          if(current_trigger_index == 2){
            // console.log("Last Trigger Answer");
            // console.log("I am about to call the timer nextTrigger in Else");
            // sleepFor(2, () => {
              // p.innerText = allTriggerAnswersData[0][current_trigger][3];
            // });
            if(current_trigger == triggers[triggers.length - 1]){
              sleepFor(3, finishGame);
            } else {
              sleepFor(3, nextTrigger);
            }
            // previous_answers_div.innerHTML = "";
            //   sleepFor(2, () => {
            //     for(i=0; i < allTriggerAnswersData[0][current_trigger].length; i++){
            //       p = document.createElement('p');
            //       p.innerText = allTriggerAnswersData[0][current_trigger][i];
            //       previous_answers_div.appendChild(p);
            //       p = document.createElement('p');
            //       words.appendChild(p);
            //     }
              // })
          }
        }
        else {
          paragraphs[paragraphs.length - 2].style.color = "red";
          correct_answers_div.innerHTML = "<span style=\"color: red; font-weight: 500;\">Correct: </span>" + allTriggerAnswersData[0][current_trigger][current_trigger_index];
        }
      }
    }
    if(paragraphs.length > 5){
      paragraphs[0].remove();
    }
    recognition.addEventListener('end', () => { 
      // MIC OFF
      audio_img.src = "https://www.filepicker.io/api/file/VyfbFTekQn6m2LEPlNm5"
    });
  }
  });
  // Key command to pause and start the audio 
  window.addEventListener("keydown", (event) => {
    nextButton.classList.remove("hide-konstantin");
    if(event.isComposing || event.keyCode === 13 && 
      (event.ctrlKey ||event.metaKey) && !gameIsFinished){
      recognition.start();
      audio_img.src = "https://raw.githubusercontent.com/smarterGerman/preachingtool/main/icons/preaching-tool-microphone-button-active-symbol.png"
      if (computerSpeakingFirst && switchPlaces % 2 == 0 && test) {
        computerFirst();
        computerSpeakingFirst = false;
      } else {
        // deleteEverything();
      }
    }
  });
  // Button to start the microphone 
  function turnOnMicro(){
    nextButton.classList.remove("hide-konstantin");
    if(initialCounter){
      countTrigger();
      initialCounter = false;
    }
    recognition.start();
    if (preachingStarted){
      audio_img.src = "https://raw.githubusercontent.com/smarterGerman/preachingtool/main/icons/preaching-tool-microphone-button-active-symbol.png"
    }
    preachingStarted = 1;
    if (computerSpeakingFirst && switchPlaces % 2 == 0 && test) {
      computerFirst();
      computerSpeakingFirst = false;
    } else {
      // deleteEverything();
    }
  }
  // Key command to go to next trigger 
  window.addEventListener("keydown", (event) => {
    if(event.isComposing || event.keyCode === 39){
      nextTrigger();
    }
  });