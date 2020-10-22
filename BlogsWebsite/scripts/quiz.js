/* Filename: quiz.js
   Target html: quiz.html
   Purpose : validates the quiz form to determine correct answers
   Author: Spencer McKnight - 103061518
   Date written: 24/09/2020
   Revisions:  [ your name, what, when�]
*/

//ensures no global variables are introduced
"use strict";

window.onload = init;

//hides submit if >= 3 attempts. This means that after the third attempt they cannot submit the quiz.
//called from a pageshow event which includes showing page from pressing the back button.
window.addEventListener("pageshow", hideSubmit);

//validate submission
function init() {
  document.getElementById("blogForm").onsubmit = validate;
}

function validate() {
  //equating variables
  var submit = true;
  var errMsg = "Sorry, you got none right. Here is some feedback:\n";
  var stuID = document.getElementById("stuID").value;
  var firstname = document.getElementById("givenName").value;
  var lastname = document.getElementById("familyName").value;
  //answers to questions as variables
  var q1 = document.getElementById("q1").value;
  var q2 = getChecked();
  var q3 = getMultiChecked();
  var q4id = document.getElementById("q4");
  //returns long answer  to q4 as either same, formal or facts
  var q4 = q4id.options[q4id.selectedIndex].value;
  var q5 = document.getElementById("q5").value;

  var score = 0;

  //question one validation and score adjustment
  if (q1 == "Journalism" || q1 == "journalism") {
    score += 1;
  } else {
    errMsg += "Q1. It may be a common form of communication on the news.\n";
  }

  //question two validation and score adjustment
  if (q2 == "1994") {
    score += 1;
  } else {
    errMsg += "Q2. It is between 1993 and 1995.\n";
  }

  //question three validation and score adjustment
  if (q3[0] == "Driving Organic Traffic" && q3[1] == "Sharing Ideas") {
    score += 1;
  } else {
    errMsg += "Q3. It's usually not used for negative things.\n";
  }

  //question four validation and score adjustment
  if (q4 == "formal") {
    score += 1;
  } else {
    errMsg += "Q4. They are not the same.\n";
  }

  //question five validation and score adjustment
  var q5num = parseInt(q5);
  if (q5num > 25 && q5num < 50) {
    score += 1;
  } else {
    errMsg += "It is an amount less than half.\n";
  }

  //test if form should be submitted based on parameters
  //stores true if all js required questions are complete
  var submitConditions = submitConditionsDone(q3, q4, q5, score);
  if (!submitConditions) {
    submit = false;
    if (score == 0) {
      //providing feedback for user if they get a 0 score.
      alert(errMsg);
    } else {
      alert("Please check a box for question 3.");
    }
  }

  if (submit) {
    storeAttempt(firstname, lastname, stuID, score);
  }

  return submit;
}

//finds value that is checked for single answer question q2
function getChecked() {
  var checkedValue = "Unknown";
  var checkboxArray = document
    .getElementById("q2field")
    .getElementsByTagName("input");

  for (var i = 0; i < checkboxArray.length; i++) {
    if (checkboxArray[i].checked) {
      checkedValue = checkboxArray[i].value;
    }
  }
  return checkedValue;
}

//finds value(s) that are checked for a multi-answer question q3
function getMultiChecked() {
  var checkedValues = [];
  var checkboxArray = document
    .getElementById("q3field")
    .getElementsByTagName("input");
  for (var i = 0; i < checkboxArray.length; i++) {
    if (checkboxArray[i].checked) {
      checkedValues[checkedValues.length] = checkboxArray[i].value;
    }
  }
  //returns checked values as an array
  return checkedValues;
}

//returns a boolean based on whether questions not required in html are completed
function submitConditionsDone(q3, q4, q5, score) {
  var valid = true;
  /*please note that question 4 has an option already selected, and question 5 
    is a range with a default option as well. Hence it is difficult to not have selected an answer.
    However, I have included conditions on 4 and 5 to meet requirements.*/
  if (q3.length == 0 || q4 == undefined || q5 == undefined || score == 0) {
    valid = false;
  }
  return valid;
}

//stores the attempt using local html storage
function storeAttempt(firstname, lastname, stuID, score) {
  sessionStorage.firstname = firstname;
  sessionStorage.lastname = lastname;
  sessionStorage.id = stuID;
  sessionStorage.score = score;

  //checking if attempts already exists. If so, it adds to the counter. If not, it declares it as 1.
  if (parseInt(sessionStorage.attempts) > 0) {
    sessionStorage.attempts = parseInt(sessionStorage.attempts) + 1;
  } else {
    sessionStorage.attempts = 1;
  }
}

//function hides the submit option on the quiz if attempts is >= 3
function hideSubmit() {
  if (sessionStorage.attempts >= 3) {
    document.getElementById("btnSubmit").style.display = "none";
  }
}
