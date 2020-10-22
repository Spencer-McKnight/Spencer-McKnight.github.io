/* Filename: enhancements.js
   Target html: quiz.html
   Purpose : enhancements for quiz. timer.
   Author: Spencer McKnight - 103061518
   Date written: 25/09/2020
   Credit to: 
   https://www.codegrepper.com/code-examples/javascript/add+countdown+timer+to+javascript+quiz 
   for timer code assistance
   Revisions:  [ your name, what, when�]
*/

//ensures no global variables are introduced
"use strict";

//use this rather than onload as onload only handles one js file
window.addEventListener("load", init);

function init() {
  quizTimer();
  prefillDetails();
}

//function begins a 90 second timer that counts down to 0 and takes one score off if student goes overtime
//blank timer code was developed from codegrepper.com as referenced
function quizTimer() {
  sessionStorage.late = false;
  var count = 90;
  var interval = setInterval(function () {
    count--;
    document.getElementById("timer").innerHTML = count + "s";
    if (count == 0) {
      document.getElementById("timer").innerHTML = "Your time is up!";
      clearInterval(interval);
      alert(
        "You went overtime. Your quiz will be submitted with a late status."
      );
      //stores late status if late
      sessionStorage.late = "Late";
    }
  }, 1000);
}

//function prefills previous attempt's name and ID.
function prefillDetails() {
  if (sessionStorage.firstname != undefined) {
    document.getElementById("givenName").value = sessionStorage.firstname;
    document.getElementById("familyName").value = sessionStorage.lastname;
    document.getElementById("stuID").value = sessionStorage.id;
  }
}
