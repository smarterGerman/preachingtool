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
  audio.pause();
}



function computerOutput(computerSpeech) {
  // remove all special characters from the input string 
  computerSpeech = computerSpeech.replace(/ä/g,"ae");
  computerSpeech = computerSpeech.replace(/Ä/g,"Ae");
  computerSpeech = computerSpeech.replace(/ö/g,"oe");
  computerSpeech = computerSpeech.replace(/Ö/g,"Oe");
  computerSpeech = computerSpeech.replace(/ü/g,"ue");
  computerSpeech = computerSpeech.replace(/Ü/g,"Ue");
  computerSpeech = computerSpeech.replace(/ß/g,"ss");
  computerSpeech = computerSpeech.replace(/[^a-zA-Z0-9 ]/g, "");
  // console.log(computerSpeech);
  globalThis.audio = new Audio('../audio/' + computerSpeech + '.mp3');
  // let audio = new Audio('audio/Ich sehe einen Stuhl.mp3');
  audio.play();
}


function toolAnswer(){
  p.innerText = allTriggerAnswersData[0][current_trigger][current_trigger_index +1];
  computerOutput(allTriggerAnswersData[0][current_trigger][current_trigger_index +1]);
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
  // words.innerHTML = "<img src='https://www.filepicker.io/api/file/Qf8Um3rTJihrNb0j2bCg'>";
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
    cancelSpeech();
    recognition.stop();
    audio_img.src = "https://www.filepicker.io/api/file/VyfbFTekQn6m2LEPlNm5";
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
    // computerSpeakingFirst = true;
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
      audio_img.src = "https://www.filepicker.io/api/file/Vd1N70dPS1yslZ2XwZEJ";
      const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
      
      if(paragraphs.length > 1){
        paragraphs[paragraphs.length - 1].style.color = "black";
        console.log(paragraphs[paragraphs.length - 1].textContent.replace('großen','grossen'));
      }
      p.textContent = transcript;
      // Here is where stuff is being written 
      if (e.results[0].isFinal) {
        let poopScript = transcript;
        poopScript = transcript.replace(/grossen/gi, 'großen').replace(/gross/gi,'groß').replace(/grosse/gi,'große').replace(/grosses/gi,'großes').replace(/weiss/gi,'weiß').replace(/beisse/gi,'beiße').replace(/beisst/gi,'beißt').replace(/beissen/gi,'beißen').replace(/Haettest/gi,'Hättest').replace(/haettest/gi,'hättest').replace(/Haette/gi,'Haette').replace(/haette/gi,'hätte').replace(/Haetten/gi,'Hätten').replace(/haetten/gi,'hätten').replace(/Autofahren/gi,"Auto fahren").replace(/autofahren/gi,"Auto fahren").replace(/zu Hause/gi,"zuhause").replace(/zu hause/gi,"zuhause").replace(/Ach so/gi,"Achso").replace(/ach so/gi,"achso");
        p.textContent = poopScript;
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
            sleepFor(3, nextTrigger);
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
      audio_img.src = "https://www.filepicker.io/api/file/Vd1N70dPS1yslZ2XwZEJ"
      const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
      
      // const poopScript = transcript;
      p.textContent = transcript;
      if(paragraphs.length > 1){
        paragraphs[paragraphs.length - 1].style.color = "black";
      }
      p.textContent = transcript;
      if (e.results[0].isFinal) {
        let poopScript = transcript;
        poopScript = transcript.replace(/grossen/gi, 'großen').replace(/gross/gi,'groß').replace(/grosse/gi,'große').replace(/grosses/gi,'großes').replace(/weiss/gi,'weiß').replace(/beisse/gi,'beiße').replace(/beisst/gi,'beißt').replace(/beissen/gi,'beißen').replace(/Haettest/gi,'Hättest').replace(/haettest/gi,'hättest').replace(/Haette/gi,'Haette').replace(/haette/gi,'hätte').replace(/Haetten/gi,'Hätten').replace(/haetten/gi,'hätten').replace(/Autofahren/gi,"Auto fahren").replace(/autofahren/gi,"Auto fahren").replace(/zu Hause/gi,"zuhause").replace(/zu hause/gi,"zuhause").replace(/Ach so/gi,"Achso").replace(/ach so/gi,"achso");
        p.textContent = poopScript;
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
              sleepFor(3.5, nextTrigger);
            }
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
      audio_img.src = "https://www.filepicker.io/api/file/VyfbFTekQn6m2LEPlNm5";
    });
  }
  });

  window.addEventListener("keydown", (event) => {
    if((event.metaKey ||  event.ctrlKey) && event.key == "Enter"){
      nextButton.classList.remove("hide-konstantin");
      if(initialCounter){
        countTrigger();
        initialCounter = false;
      }
      if (preachingStarted){
        audio_img.src = "https://www.filepicker.io/api/file/Vd1N70dPS1yslZ2XwZEJ"
        recognition.start();
      }
      preachingStarted = 1;
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
    if (preachingStarted){
      cancelSpeech();
      audio_img.src = "https://www.filepicker.io/api/file/Vd1N70dPS1yslZ2XwZEJ"
      recognition.start();
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
