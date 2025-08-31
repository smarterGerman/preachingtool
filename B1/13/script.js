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
  if(!preachingStarted){
    globalThis.audio = new Audio('../audio/' + computerSpeech + '.mp3');
    // let audio = new Audio('audio/Ich sehe einen Stuhl.mp3');
    console.log(audio);
    audio.play();
  } else {
    audio.src = '../audio/' + computerSpeech + '.mp3';
    audio.play()
  }
}

function stopRecording(){
  recognition.stop();
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
  words.classList.add("hide-konstantin");
  triggerTutorialContainer.classList.add("hide-konstantin");
  navigationContainer.classList.add("hide-konstantin");
  finishBox.classList.remove("hide-konstantin");
  correct_answers_div.innerText = ""
  gameIsFinished = true;
}
  // WEB SPEECH API SETTINGS 
  
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
    audio_img.src = "data:image/png;base64,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";
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
// ! GET RESULT OF AUDIO 
  function startRecording(){
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'de-DE';
    recognition.start();
    recognition.onresult = function (event) {

      if (switchPlaces % 2 == 0){
        // TOOL SPEAKS FIRST 
      // Reset correct answer div 
      correct_answers_div.innerText = "";
      // MIC ON
      audio_img.src = "data:image/png;base64,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";
      // const transcript = event.results[event.results.length - 1][0].transcript;
      const transcript = Array.from(event.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
      
      if(paragraphs.length > 1){
        paragraphs[paragraphs.length - 1].style.color = "black";
        // console.log(paragraphs[paragraphs.length - 1].textContent.replace('großen','grossen'));
      }
      p.textContent = transcript;
      // Here is where stuff is being written 
      if (event.results[0].isFinal) {
        audio_img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAeGVYSWZNTQAqAAAACAAEARIAAwAAAAEAAQAAARoABQAAAAEAAAA+ARsABQAAAAEAAABGh2kABAAAAAEAAABOAAAAAAAAAEgAAAABAAAASAAAAAEAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAlqADAAQAAAABAAAAlgAAAAD41eaXAAAACXBIWXMAAAsTAAALEwEAmpwYAAAClmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzI8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4xMDI0PC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT4xPC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4xMDI0PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CrHyLyYAABIYSURBVHgB7Z19zBzFfcdn9uXu9u55HoPhicFxEI0MFFPSIhu1NPzxUJmmNH4ctfRxlagKlhIckTRRaGUT2lRcjQwxNjEhCgqulNI0TSo/apPYYCdNCI9CUqvCRlRgCC1qHQxOjFOMn5e7vX2bfn+zO3v7vDqi/ce7v7FvZ3Z2Zu7Zz3xvZva3s7NCsGMCTIAJMAEmwASYABNgAkyACTABJsAEmAATYAJMgAkwASbABJgAE2ACTIAJMAEmwASYABNgAkyACTABJsAEmAATYAJMgAkwASbABJgAE2ACTIAJMAEmwASYABNgAkyACTABJsAEmAATYAJMgAkwASbABJgAE2ACTIAJMAEmwASYABNgAkyACTABJsAEmAATYAJMgAkwASbABJgAEygnAVnO0/r/PSslhBTtdsqqfY+SQiKKHRN4GwRITGqk7dBnbnYllFRbtrhqbMyee4z3mcCiBOaKCSKzZ/5050q//ci737rxQxcWM6qxfbZqt61iHIepiWc3iwCJSk60I9UW1vSzd22yHeePRKKuU7Z1iXSkm/SiaXSEx2Wc/FD1gq+1vrfnCBVg8s0qrMI7LKys8s04Srbbyczo1g3Sdvd49dZq+uklcSzCJBZKKWFblnAt9IC2I5LAF37P/5Y4e+bjraf3/uzI2i3uuqN7wwrrKT91FhZQaFFBNFJKNbNx233NxtDdQiWim4ShjhaCujrNCmm11rBJELK9mmd1u9PT0bR/y9D3H/wRiyvVFo8NwGFipG2TqKY3bN3ZHFh+dzcOom4cRVCcCzXR4F0LSwswFZiN8buLFszq9jpBrVYbcAe9p2duvnMdtVhzx2gp6mptK99imbFRZ+O2P/S8Zf/UjXoh+jyISYINtU+LOUKnWzlsVejZNbfb677+1mvPX7ny6IEOXTlW2SxR6RaLWiA9UMfYSFjOHqViaEWBSV9Ui0or+0nSuAvpXT8Kel5z6J0XXLrmHpLi0bUfm2emoPiquEoLS6ALpIr2V6+4zWu0LvPjEANvibi+nBZt0vtJSIy4cBS1MPSFcJ2PqvVblukuEa1WVYQ09zwrLayJjIYKkg06iJ4tHaLPxbTQflFZuo2TUZJEnttY3m1ccLPOMfLXlTWgVlpYI0/dg74PLhGrRIKLPOiDWp+37SQykylCWuvedhklyVhpYdGVINWjsmWj2P3puCUqeK70zD5kpbs+Ka2hJbJX4lBlhQUxaBHAd2SiGllDZeLO2SMaMZFKzEDK+BiieZVQzxInWVlhGSbHyU6lVA3mgVwhJJCicExa49PxXEQmMveppKSud4fXLFVMnqOMgcoLqy5WWjAZOHMVsLhwziEDKighO1i1XeWFZYmLyWjV11E/dE5lkIbMJ0+M/JbUlvo8qoqByguLKh3i6MuJlPJLOsrUz9jPBJtW5blWHkBfDv3QQtpaKM7kmCUuSqiqaxg1TCovrBUgkQsjU0++bygV0xTiFgwulHnBhOWOrLywqHpNa0SDrcWcSWP8xdKl8UuVtHTOshwtvbAgBEnTh1Fh6Rz2OffvThVqcinRLKG5XJj9orQVv7+LkJ7CjO+mWQ/Z3zPreNl2Si0sEhUEoeT4Jrp1o2gmA01locpdtCIXP5JnKQqQwufKokTbor+Bvlt/EC77PPnS2luMqODb/h/c/SVU/01JnBz2wxOfkofkpK7YdjvVSGZ218pJY3IRFQN0iEQ0N4mJL6Y1YXqSR46345lb/3IUer4XNq5E+GEbU6D3p8fG0/uVJkNJ/PK2WNmUmO7otp2N1kUfs2z3yuay4dsa9qov6ro7cFLPPEgH7+dqc9LaNqmK4jJxRT3kwrvwDFqq8biz4c53ykR8q+l6v96se9c1Wt63p373U79Gx8r6CFkphYWK1RP4qLJlrfa+pDeDyQtJN/anMfnAWatFcOTRiPxsjFVss/Rh2uQCyWP6cQsJyiSj7o7Cr5x4QfO1Qvtqz6lbmJ0a4ONbTk1YA6336vSnr1mqKFPkeeeXUlim+mlOunKcOlUz/ruYzQATk/KUWEthXfkrhEtzEvqDrkI1F4LzKlZnnhebRlhZ2avFFTpCSmdQj/YwjwIRNoXtWn2QDh698uRSX6Pzn4+bkgqrXxWotbzismnEuEF8re4GKdXP8A+ur5N+iOJzR9F99RUKRXz+Bf3Us0pJLOVhjhYVkMdj+pdmnzafecbSBEoqrLSq0SoliVIBtVS5I0ltvjzfvVScTKCM+faBLIVRgi4BO4WS8jJMmjxCYERVdE7xD0gPWCrpUejo0WLC8oRLKizdBGkNQFpd3Q2hu6NqwyQ8KS6fdS8PIpAwBcDNV8gsIS0kKl0mbQoukVJf6R1f8abOEjdrGWcYOnTHiy9SCSbIC7F2cOUC31oo7DwNllJYqE2YjtqpDuLYT8c3qCGyYDnok4bX5Oc9gUkuSBjq8dcilUg1rz9pibOarQVVIYV+GvpyU17TybteU4SK0hbLJCmbX1o7Vl5RicofeUe/KFTdrk0OD9XoOMZc0JOMZiwZUIXjs6BOTFn5CClLRR7lK/oUg8kNujUy+ZwLBxqi0zW7aY4gCAoRpQvmv9zSndmxNVnjoKZMi5VAGVYvbrqHjrT0+W4a1+cPWzwqOUteAGFURkeMgEyc8QvJ8yCk1aGd12bO6kLjU5PLdQmkOdgiqOVMokinyTOVLFBeYZ1+UVcqBPA/RjQYyCtXyYY6O32JrkcYMLUfq7Op+PI2SUfrAgoVTvtz44oCwxAduxCNTH5K2VZlea1OcBnF67TQdoIFRmS99nN9ePhYsYgsx/nvlVdYU5l9yJKv9ns4GdtuHTYk9wZddWd+kg4Fatbz2hxAtxHnKGdereM4xZlkxqfykNsJsQKNiHo/0OWPv6a7u8Sxf1tgxRrIVloW+l0Vd9RwE38X3DXXzPsKHX+eb8orrOxqS8Xxj0SsjezpucKApKQ1quvtxWX66i2ykq8nkb76x/z3vgyLAjK1T8dJTGafysnEFTXdmgzj6N8GDj70HO5FOlKMx707drzHUda13ZgWrkFDZWH5I6lean2lfVIXZe5X6j+oPJvyCmsifRi1NTl9uBv2TrnSttEZ0W0VgSuy9f62h66Sx9rBsbF2bWj8/sO9IHjccz0bIsntXsXWyFiiTBz59CGBaZHpbhAxcbJDy+PYWZf8eDr8cM3S1woxyoBZFBeIUXxIp1m7BeKbpVEdXYZNaYVF9+vSlWQemUar9biD+3OoRDKGhp7VEPHPz/45VeCa08c1A6mST3T96Z5rIyFWjzEDflPJ1NyQy7zcJ3HhytL3ai0X+f+h9fjOA2rLo64c39OdbO++WPnx7UGkrw0sZHKCsCscN9mnC3v3mdmGVB1Zjk1phaWrxwyM4+DLMS3YAesoVW438JXbU7cHf/Gl35ATj/knxu70vAM7X41l8PsJuk3Pdl0MmGh8lFc8CYic8dM9EUFokVdrNnx/aqL57c/9iY7Pbj67r0zvaFqNoVgkWBpJJJ5bl5FKvl8f3/n8Pj2dppxTZohBqYWVTkvZZ7cO7jkShMF+VCydb4yzTtzYEtHx039HEN6F1kV98uH64Dd3/yDyp6/HOlfHvXqz5to2pY+olSMBmQ/to5WCUGpO03GdTufM33rf3HETlXVytN2Uh77Ym7njvo2N0NrSDX2sMZneAKf1IaDs+yjdcElnNdC5kZvzA0wjy7Q1k+l66z99dTI08CIG7ujP0LFJtDRO3fU99Y/eY3/1QTpntbndkI+1fQjI9d+/7TPKdT4Bga0QWHcU4pjlIrSAYRj+2Aqj7Y1Du/5F50fLR11g745d74l/MfmMnVg1tFbU6sUYv7ndztQ/N/fffytNTc5mtc4qs0w7pReWrnCsyS737g27G7Z+tjG4/F5a3hEtjh5LNdyG67vhV72/b99GaU+ObmmuPLBXGy/fGB4bGPjNX/k9rO5wA9q5S2gwhSYnlrb1k2S6c6j13Yee1eXf8nD96BsvJLQm1szH77/eOt15qqacVk9F+h6kY9l2FAZT8dTMFQNPfuEUzV6lRXQpb1ldNYRFLTM1UpgnNfOBz3yv2Vy23u91YF+QdYzxw4bTcLuJ/7Twkg82v7rjdarsosAWq/z/vOWT9dWvXqTo6pLSzHx4+0dlN/qbGhYFhK2KukALX6o827E6M5MbWk/sfkJh9UBZgZWVKyEsqnTTSpxcO9q8YNW1z3pe6yo/6JHxqo5pUqHuFkO/g1UXtnuXDz4iH7hrivKRU2LEESMjWAV3gnbhJqglyjvHzub2b6mZZHvTqt/shzBnSFpzUg8zFBZis2cm3/z0wMEHv1AVURGhygiLTvYpvBzgJjypc/Z9H1nueiv+1fMGr+oG3QCtGWwRMsLUTqcGy3w36PwCC0aOy1Z9f324/px4YOsbNFinMsiph782FPz7K5fF3XhERvKP0ULdaElHdKMATwEp2MtEDAu7U7dd0Z08u7V5aNdus4huWkL5t5USlhaFefPEDWOe/47V+xvNofUQF/WVev1R9JiJC1GQ3Uug4YFYOhjvv443U3RlDfbTMHFwz3HYjtTFdQfrteG+H9YupduQdEGAQZiMGk6thitLmFqDDzUP7vqGEXT55dQ/w8oJqyguCs9svOuzeILn3ka9iaeyfJpYk42NtA0LdnIcxVUhTUqgcRo5WgA+pIs9dKEIpgyhTNyuwUsr0Ep1pp6J3+reNvjDh16q6gsFKiksEgeNuUT2irip92+7Giar+2tu7QN2zcOtxYBecQLlqJikBEhWPqDKxk4QWoxGyrakZdcdunsj8fqTzokkCu9rPf7Al/V3ZFejFK6aq6ywTEUXB9QzG//sOsuq347pf6MNu7YKIy7dSsHImSYnWmjS0CxJB2Mx3Q32uoFKksNSRY+99tIL37jilUM9JJFibJN+ptB8T9X8yguLKjx9aHRMGKPlf49sblwyuGIdBLLOqtffi2brVprygn8Yf9mwiUYnoKqviyB+DoI67B188KdGOFXt+sz5G5+FZUjAJ4Ed/a8LreIbvNSjB5r+k0dOW5FqxlIFuC9Y60y++ZXWE7s+YrLqbnUCNquJ9iwzhDleRb/8c95/iVrF+Cn9gY2PJ1igHQ0Uxl9jsLePw/D58n9cpLs2XQ6SYQBviXQejMItHHHNsh4e3KBHDuleIv9QM950k7WSjkRAtiUSDcnFfAgGXgCdiH336IcwZuwG/MLQnRLAJEGeEDcEdGuG8tKe8alMav3SLpaOVM9VUlgkKi2kfFkjiAyPvj+Fpbnh68+LcpOeqNfyY7TqsCXM1kbK7ZmDeD5fkEGU8pCv4zEYw9JJ47GeXUFXnxV04Fsth8rXoiIhYCWazyvbvQm2BHr3IC4B6RCcoaKNnpaDN1e8C2IhLSqYF/AMbDyN5YhOIaJohkBGbZ6gG9wdJA2SXm/7wHce/C61XCQyXXZFNgZhRU4XVZ9Z3juj2z7nLXvHXUnQ0c1MZvucxwHdmuilc+bNMejMkpirlXWAiCaKUCr5dOmod8hQ2sXqNkn4q439D7xs7lXiYCVc9QbvIxgfTaDqHft3ot60CKO4Ay3obm+RGiet6B9gJhlYRrEoUkzLQqAZQy9Jvs5LPSYJjDaYsIVX1Q368dSNiHgZ30ldYn6/kVKV2VVPWFkFqzj5sTMwcL3T6zbTXo6qWasirW8jkFnR2fFURjSmSh2N0Eh9FE8b8h0XE/smVTA1PYE9ITJB63AFNimiCpyoOcX0KhAPWmze3OicuXQ3QmvxKgnYEOi2IG4301Q+PPuH9DSXSjsK49IPHSBUQyn0W3lJSRil61YLHu4you1KZJyEKozpntC0DPzt3nc+/2QVx1iGd6V8SOBt/6DQ70FF+kPv4KGPnfkUnleuNp5Wim7FT5bEpe1YMAeQILTtieL+D6IrINVLblfZjjXvF1aAU8nguYWFFOQyL93JtppmihTbhVLMSs47TIAJMAEmwASYABNgAkyACTABJsAEmAATYAJMgAkwASbABJgAE2ACTIAJMAEmwASYABNgAkyACTABJsAEmAATYAJMgAkwASbABJgAE2ACTIAJMAEmwASYABNgAkyACTABJsAEmAATYAJMgAkwASbABJgAE2ACTIAJMAEmwASYABNgAkyACTABJsAEmAATYAJMgAkwASbABJgAE2ACTIAJMAEmwASYABNgAkyACTABIf4X1dLKb7vJhysAAAAASUVORK5CYII=";
        recognition.stop();
        let poopScript = transcript;
        poopScript = transcript.replace(/grossen/gi, 'großen').replace(/gross/gi,'groß').replace(/grosse/gi,'große').replace(/grosses/gi,'großes').replace(/weiss/gi,'weiß').replace(/beisse/gi,'beiße').replace(/beisst/gi,'beißt').replace(/beissen/gi,'beißen').replace(/Fussball/gi,'Fußball').replace(/noch mal/gi, 'nochmal');
        p.textContent = poopScript;
        p = document.createElement('p');
        words.appendChild(p);
        // Remove special characters from current_trigger 
        current_trigger = current_trigger.replace(/\n/g,"");
        if(paragraphs.length > 1) {
          if(paragraphs[paragraphs.length - 2].innerText.toLowerCase().replace(/[.,?!;:]/g,"").replace(/ß/gi, 'ss') == allTriggerAnswersData[0][current_trigger][current_trigger_index].toLowerCase().replace(/[.,?!;:]/g,"").replace(/ß/gi, 'ss')){
            paragraphs[paragraphs.length - 2].style.color = "green";
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
    test = false; 
  } else {
    secondHalf = true
    
    correct_answers_div.innerText = "";
    // MIC ON 
    audio_img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAeGVYSWZNTQAqAAAACAAEARIAAwAAAAEAAQAAARoABQAAAAEAAAA+ARsABQAAAAEAAABGh2kABAAAAAEAAABOAAAAAAAAAEgAAAABAAAASAAAAAEAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAlqADAAQAAAABAAAAlgAAAAD41eaXAAAACXBIWXMAAAsTAAALEwEAmpwYAAAClmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzI8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4xMDI0PC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT4xPC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4xMDI0PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CrHyLyYAABIYSURBVHgB7Z19zBzFfcdn9uXu9u55HoPhicFxEI0MFFPSIhu1NPzxUJmmNH4ctfRxlagKlhIckTRRaGUT2lRcjQwxNjEhCgqulNI0TSo/apPYYCdNCI9CUqvCRlRgCC1qHQxOjFOMn5e7vX2bfn+zO3v7vDqi/ce7v7FvZ3Z2Zu7Zz3xvZva3s7NCsGMCTIAJMAEmwASYABNgAkyACTABJsAEmAATYAJMgAkwASbABJgAE2ACTIAJMAEmwASYABNgAkyACTABJsAEmAATYAJMgAkwASbABJgAE2ACTIAJMAEmwASYABNgAkyACTABJsAEmAATYAJMgAkwASbABJgAE2ACTIAJMAEmwASYABNgAkyACTABJsAEmAATYAJMgAkwASbABJgAEygnAVnO0/r/PSslhBTtdsqqfY+SQiKKHRN4GwRITGqk7dBnbnYllFRbtrhqbMyee4z3mcCiBOaKCSKzZ/5050q//ci737rxQxcWM6qxfbZqt61iHIepiWc3iwCJSk60I9UW1vSzd22yHeePRKKuU7Z1iXSkm/SiaXSEx2Wc/FD1gq+1vrfnCBVg8s0qrMI7LKys8s04Srbbyczo1g3Sdvd49dZq+uklcSzCJBZKKWFblnAt9IC2I5LAF37P/5Y4e+bjraf3/uzI2i3uuqN7wwrrKT91FhZQaFFBNFJKNbNx233NxtDdQiWim4ShjhaCujrNCmm11rBJELK9mmd1u9PT0bR/y9D3H/wRiyvVFo8NwGFipG2TqKY3bN3ZHFh+dzcOom4cRVCcCzXR4F0LSwswFZiN8buLFszq9jpBrVYbcAe9p2duvnMdtVhzx2gp6mptK99imbFRZ+O2P/S8Zf/UjXoh+jyISYINtU+LOUKnWzlsVejZNbfb677+1mvPX7ny6IEOXTlW2SxR6RaLWiA9UMfYSFjOHqViaEWBSV9Ui0or+0nSuAvpXT8Kel5z6J0XXLrmHpLi0bUfm2emoPiquEoLS6ALpIr2V6+4zWu0LvPjEANvibi+nBZt0vtJSIy4cBS1MPSFcJ2PqvVblukuEa1WVYQ09zwrLayJjIYKkg06iJ4tHaLPxbTQflFZuo2TUZJEnttY3m1ccLPOMfLXlTWgVlpYI0/dg74PLhGrRIKLPOiDWp+37SQykylCWuvedhklyVhpYdGVINWjsmWj2P3puCUqeK70zD5kpbs+Ka2hJbJX4lBlhQUxaBHAd2SiGllDZeLO2SMaMZFKzEDK+BiieZVQzxInWVlhGSbHyU6lVA3mgVwhJJCicExa49PxXEQmMveppKSud4fXLFVMnqOMgcoLqy5WWjAZOHMVsLhwziEDKighO1i1XeWFZYmLyWjV11E/dE5lkIbMJ0+M/JbUlvo8qoqByguLKh3i6MuJlPJLOsrUz9jPBJtW5blWHkBfDv3QQtpaKM7kmCUuSqiqaxg1TCovrBUgkQsjU0++bygV0xTiFgwulHnBhOWOrLywqHpNa0SDrcWcSWP8xdKl8UuVtHTOshwtvbAgBEnTh1Fh6Rz2OffvThVqcinRLKG5XJj9orQVv7+LkJ7CjO+mWQ/Z3zPreNl2Si0sEhUEoeT4Jrp1o2gmA01locpdtCIXP5JnKQqQwufKokTbor+Bvlt/EC77PPnS2luMqODb/h/c/SVU/01JnBz2wxOfkofkpK7YdjvVSGZ218pJY3IRFQN0iEQ0N4mJL6Y1YXqSR46345lb/3IUer4XNq5E+GEbU6D3p8fG0/uVJkNJ/PK2WNmUmO7otp2N1kUfs2z3yuay4dsa9qov6ro7cFLPPEgH7+dqc9LaNqmK4jJxRT3kwrvwDFqq8biz4c53ykR8q+l6v96se9c1Wt63p373U79Gx8r6CFkphYWK1RP4qLJlrfa+pDeDyQtJN/anMfnAWatFcOTRiPxsjFVss/Rh2uQCyWP6cQsJyiSj7o7Cr5x4QfO1Qvtqz6lbmJ0a4ONbTk1YA6336vSnr1mqKFPkeeeXUlim+mlOunKcOlUz/ruYzQATk/KUWEthXfkrhEtzEvqDrkI1F4LzKlZnnhebRlhZ2avFFTpCSmdQj/YwjwIRNoXtWn2QDh698uRSX6Pzn4+bkgqrXxWotbzismnEuEF8re4GKdXP8A+ur5N+iOJzR9F99RUKRXz+Bf3Us0pJLOVhjhYVkMdj+pdmnzafecbSBEoqrLSq0SoliVIBtVS5I0ltvjzfvVScTKCM+faBLIVRgi4BO4WS8jJMmjxCYERVdE7xD0gPWCrpUejo0WLC8oRLKizdBGkNQFpd3Q2hu6NqwyQ8KS6fdS8PIpAwBcDNV8gsIS0kKl0mbQoukVJf6R1f8abOEjdrGWcYOnTHiy9SCSbIC7F2cOUC31oo7DwNllJYqE2YjtqpDuLYT8c3qCGyYDnok4bX5Oc9gUkuSBjq8dcilUg1rz9pibOarQVVIYV+GvpyU17TybteU4SK0hbLJCmbX1o7Vl5RicofeUe/KFTdrk0OD9XoOMZc0JOMZiwZUIXjs6BOTFn5CClLRR7lK/oUg8kNujUy+ZwLBxqi0zW7aY4gCAoRpQvmv9zSndmxNVnjoKZMi5VAGVYvbrqHjrT0+W4a1+cPWzwqOUteAGFURkeMgEyc8QvJ8yCk1aGd12bO6kLjU5PLdQmkOdgiqOVMokinyTOVLFBeYZ1+UVcqBPA/RjQYyCtXyYY6O32JrkcYMLUfq7Op+PI2SUfrAgoVTvtz44oCwxAduxCNTH5K2VZlea1OcBnF67TQdoIFRmS99nN9ePhYsYgsx/nvlVdYU5l9yJKv9ns4GdtuHTYk9wZddWd+kg4Fatbz2hxAtxHnKGdereM4xZlkxqfykNsJsQKNiHo/0OWPv6a7u8Sxf1tgxRrIVloW+l0Vd9RwE38X3DXXzPsKHX+eb8orrOxqS8Xxj0SsjezpucKApKQ1quvtxWX66i2ykq8nkb76x/z3vgyLAjK1T8dJTGafysnEFTXdmgzj6N8GDj70HO5FOlKMx707drzHUda13ZgWrkFDZWH5I6lean2lfVIXZe5X6j+oPJvyCmsifRi1NTl9uBv2TrnSttEZ0W0VgSuy9f62h66Sx9rBsbF2bWj8/sO9IHjccz0bIsntXsXWyFiiTBz59CGBaZHpbhAxcbJDy+PYWZf8eDr8cM3S1woxyoBZFBeIUXxIp1m7BeKbpVEdXYZNaYVF9+vSlWQemUar9biD+3OoRDKGhp7VEPHPz/45VeCa08c1A6mST3T96Z5rIyFWjzEDflPJ1NyQy7zcJ3HhytL3ai0X+f+h9fjOA2rLo64c39OdbO++WPnx7UGkrw0sZHKCsCscN9mnC3v3mdmGVB1Zjk1phaWrxwyM4+DLMS3YAesoVW438JXbU7cHf/Gl35ATj/knxu70vAM7X41l8PsJuk3Pdl0MmGh8lFc8CYic8dM9EUFokVdrNnx/aqL57c/9iY7Pbj67r0zvaFqNoVgkWBpJJJ5bl5FKvl8f3/n8Pj2dppxTZohBqYWVTkvZZ7cO7jkShMF+VCydb4yzTtzYEtHx039HEN6F1kV98uH64Dd3/yDyp6/HOlfHvXqz5to2pY+olSMBmQ/to5WCUGpO03GdTufM33rf3HETlXVytN2Uh77Ym7njvo2N0NrSDX2sMZneAKf1IaDs+yjdcElnNdC5kZvzA0wjy7Q1k+l66z99dTI08CIG7ujP0LFJtDRO3fU99Y/eY3/1QTpntbndkI+1fQjI9d+/7TPKdT4Bga0QWHcU4pjlIrSAYRj+2Aqj7Y1Du/5F50fLR11g745d74l/MfmMnVg1tFbU6sUYv7ndztQ/N/fffytNTc5mtc4qs0w7pReWrnCsyS737g27G7Z+tjG4/F5a3hEtjh5LNdyG67vhV72/b99GaU+ObmmuPLBXGy/fGB4bGPjNX/k9rO5wA9q5S2gwhSYnlrb1k2S6c6j13Yee1eXf8nD96BsvJLQm1szH77/eOt15qqacVk9F+h6kY9l2FAZT8dTMFQNPfuEUzV6lRXQpb1ldNYRFLTM1UpgnNfOBz3yv2Vy23u91YF+QdYzxw4bTcLuJ/7Twkg82v7rjdarsosAWq/z/vOWT9dWvXqTo6pLSzHx4+0dlN/qbGhYFhK2KukALX6o827E6M5MbWk/sfkJh9UBZgZWVKyEsqnTTSpxcO9q8YNW1z3pe6yo/6JHxqo5pUqHuFkO/g1UXtnuXDz4iH7hrivKRU2LEESMjWAV3gnbhJqglyjvHzub2b6mZZHvTqt/shzBnSFpzUg8zFBZis2cm3/z0wMEHv1AVURGhygiLTvYpvBzgJjypc/Z9H1nueiv+1fMGr+oG3QCtGWwRMsLUTqcGy3w36PwCC0aOy1Z9f324/px4YOsbNFinMsiph782FPz7K5fF3XhERvKP0ULdaElHdKMATwEp2MtEDAu7U7dd0Z08u7V5aNdus4huWkL5t5USlhaFefPEDWOe/47V+xvNofUQF/WVev1R9JiJC1GQ3Uug4YFYOhjvv443U3RlDfbTMHFwz3HYjtTFdQfrteG+H9YupduQdEGAQZiMGk6thitLmFqDDzUP7vqGEXT55dQ/w8oJqyguCs9svOuzeILn3ka9iaeyfJpYk42NtA0LdnIcxVUhTUqgcRo5WgA+pIs9dKEIpgyhTNyuwUsr0Ep1pp6J3+reNvjDh16q6gsFKiksEgeNuUT2irip92+7Giar+2tu7QN2zcOtxYBecQLlqJikBEhWPqDKxk4QWoxGyrakZdcdunsj8fqTzokkCu9rPf7Al/V3ZFejFK6aq6ywTEUXB9QzG//sOsuq347pf6MNu7YKIy7dSsHImSYnWmjS0CxJB2Mx3Q32uoFKksNSRY+99tIL37jilUM9JJFibJN+ptB8T9X8yguLKjx9aHRMGKPlf49sblwyuGIdBLLOqtffi2brVprygn8Yf9mwiUYnoKqviyB+DoI67B188KdGOFXt+sz5G5+FZUjAJ4Ed/a8LreIbvNSjB5r+k0dOW5FqxlIFuC9Y60y++ZXWE7s+YrLqbnUCNquJ9iwzhDleRb/8c95/iVrF+Cn9gY2PJ1igHQ0Uxl9jsLePw/D58n9cpLs2XQ6SYQBviXQejMItHHHNsh4e3KBHDuleIv9QM950k7WSjkRAtiUSDcnFfAgGXgCdiH336IcwZuwG/MLQnRLAJEGeEDcEdGuG8tKe8alMav3SLpaOVM9VUlgkKi2kfFkjiAyPvj+Fpbnh68+LcpOeqNfyY7TqsCXM1kbK7ZmDeD5fkEGU8pCv4zEYw9JJ47GeXUFXnxV04Fsth8rXoiIhYCWazyvbvQm2BHr3IC4B6RCcoaKNnpaDN1e8C2IhLSqYF/AMbDyN5YhOIaJohkBGbZ6gG9wdJA2SXm/7wHce/C61XCQyXXZFNgZhRU4XVZ9Z3juj2z7nLXvHXUnQ0c1MZvucxwHdmuilc+bNMejMkpirlXWAiCaKUCr5dOmod8hQ2sXqNkn4q439D7xs7lXiYCVc9QbvIxgfTaDqHft3ot60CKO4Ay3obm+RGiet6B9gJhlYRrEoUkzLQqAZQy9Jvs5LPSYJjDaYsIVX1Q368dSNiHgZ30ldYn6/kVKV2VVPWFkFqzj5sTMwcL3T6zbTXo6qWasirW8jkFnR2fFURjSmSh2N0Eh9FE8b8h0XE/smVTA1PYE9ITJB63AFNimiCpyoOcX0KhAPWmze3OicuXQ3QmvxKgnYEOi2IG4301Q+PPuH9DSXSjsK49IPHSBUQyn0W3lJSRil61YLHu4you1KZJyEKozpntC0DPzt3nc+/2QVx1iGd6V8SOBt/6DQ70FF+kPv4KGPnfkUnleuNp5Wim7FT5bEpe1YMAeQILTtieL+D6IrINVLblfZjjXvF1aAU8nguYWFFOQyL93JtppmihTbhVLMSs47TIAJMAEmwASYABNgAkyACTABJsAEmAATYAJMgAkwASbABJgAE2ACTIAJMAEmwASYABNgAkyACTABJsAEmAATYAJMgAkwASbABJgAE2ACTIAJMAEmwASYABNgAkyACTABJsAEmAATYAJMgAkwASbABJgAE2ACTIAJMAEmwASYABNgAkyACTABJsAEmAATYAJMgAkwASbABJgAE2ACTIAJMAEmwASYABNgAkyACTABIf4X1dLKb7vJhysAAAAASUVORK5CYII="
    // const transcript = event.results[event.results.length - 1][0].transcript;
    const transcript = Array.from(event.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
    
    // const poopScript = transcript;
    p.textContent = transcript;
    if(paragraphs.length > 1){
      paragraphs[paragraphs.length - 1].style.color = "black";
    }
    p.textContent = transcript;
    if (event.results[0].isFinal) {
      audio_img.src = "data:image/png;base64,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";
      // recognition.stop();
      recognition.stop();
      let poopScript = transcript;
      poopScript = transcript.replace(/grossen/gi, 'großen').replace(/gross/gi,'groß').replace(/grosse/gi,'große').replace(/grosses/gi,'großes').replace(/weiss/gi,'weiß').replace(/beisse/gi,'beiße').replace(/beisst/gi,'beißt').replace(/beissen/gi,'beißen').replace(/Fussball/gi,'Fußball').replace(/noch mal/gi, 'nochmal');
      p.textContent = poopScript;
      p = document.createElement('p');
      words.appendChild(p);
      // Remove special characters from current_trigger 
      current_trigger = current_trigger.replace(/\n/g,"");
      if(paragraphs.length > 1) {
        if(paragraphs[paragraphs.length - 2].innerText.toLowerCase().replace(/[.,?!;:]/g,"").replace(/ß/gi, 'ss') == allTriggerAnswersData[0][current_trigger][current_trigger_index].toLowerCase().replace(/[.,?!;:]/g,"").replace(/ß/gi, 'ss')){
          paragraphs[paragraphs.length - 2].style.color = "green";
          if(allTriggerAnswersData[0][current_trigger][current_trigger_index + 1]){
            sleepFor(2, toolAnswer);
          }
          if(current_trigger_index == 2){
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
  }
  }
}
window.addEventListener("keydown", (event) => {
  if((event.metaKey ||  event.ctrlKey) && event.key == "Enter"){
    // cancelSpeech();
    nextButton.classList.remove("hide-konstantin");
    if(initialCounter){
      countTrigger();
      initialCounter = false;
    }
    audio_img.src = "data:image/png;base64,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";
    startRecording();
    // if(!preachingStarted){
    //   // cancelSpeech();
    //   audio_img.src = "data:image/png;base64,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"
    // } 
    preachingStarted = 1;
    if (computerSpeakingFirst && switchPlaces % 2 == 0 && test) {
      computerFirst();
      computerSpeakingFirst = false;
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
    audio_img.src = "data:image/png;base64,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";
    startRecording();
    if(!preachingStarted){
      // cancelSpeech();
      deleteEverything();
      audio_img.src = "data:image/png;base64,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"
    } 
    if (computerSpeakingFirst && switchPlaces % 2 == 0 && test) {
      computerFirst();
      computerSpeakingFirst = false;
    }
    preachingStarted = 1;
  }
  // Key command to go to next trigger 
  window.addEventListener("keydown", (event) => {
    if(event.isComposing || event.keyCode === 39){
      nextTrigger();
    }
  });
