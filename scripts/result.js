/* Filename: result.js
   Target html: result.html
   Purpose : uploads quiz results based on session storage
   Author: Spencer McKnight - 103061518
   Date written: 24/09/2020
   Revisions:  [ your name, what, when�]
*/

//ensures no global variables are introduced
"use strict";

window.onload = init;

function init() {
  displayResults();
  hideRetry();
}

//function displays attempt information on results page if name is stored
function displayResults() {
  if (sessionStorage.firstname != undefined) {
    document.getElementById("resName").textContent =
      sessionStorage.firstname + " " + sessionStorage.lastname;
    document.getElementById("resStuID").textContent = sessionStorage.id;
    document.getElementById("resScore").textContent =
      sessionStorage.score + " of 5";
    document.getElementById("resAttempts").textContent =
      sessionStorage.attempts + " of 3";
    //if function checks if quiz was submitted late according to enhancement timer and displays late message
    if (sessionStorage.late == "Late") {
      document.getElementById("msg").innerHTML =
        "Your quiz was submitted late.\n";
    }
  } else
    document.getElementById("msg").innerHTML =
      "Oh no! You didn't enter your name. Your quiz attempt is invalid.\n";
}

//function hides the retry option if they have completed their third attempt
function hideRetry() {
  if (parseInt(sessionStorage.attempts) >= 3) {
    document.getElementById("retryLink").style.display = "none";
    document.getElementById("msg").innerHTML += "You've run out of attempts.";
  }
}
