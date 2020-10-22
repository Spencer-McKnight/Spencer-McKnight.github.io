/* Filename: HD.js
   Target html: HD.html
   Purpose : Quote System
   Author: Spencer McKnight - 103061518
   Date written: 9/06/2020
   Revisions:  [ your name, what, when�]
*/

// [ brief comment on what the function does�]

//Task design: it is preferred that your array of objects is not a global variable, but this could be an exception
var arrQuotes = [];

function init() {
  document.getElementById("btnGetQuote").onclick = getQuote;
  document.getElementById("btnClearForm").onclick = clearForm;
  document.getElementById("btnList").onclick = listQuotes;
  document.getElementById("btnSearch").onclick = valSearch;
  document.getElementById("btnClearOutput").onclick = clearOutput;
  document.getElementById("btnResetQuotes").onclick = resetQuoteArray;
  //clear all quotes button?????????????????

  //onblur events. they call calling functions as onblur is difficult to pass variables
  document.getElementById("txtName").onblur = callValName;
  document.getElementById("txtOrgName").onblur = callValOrgName;
  document.getElementById("txtEmail").onblur = callValEmail;
  document.getElementById("txtVisits").onblur = callValVisits;
}

function resetQuoteArray() {
  arrQuotes = [];
}

function clearOutput() {
  document.getElementById("output1").innerHTML = null;
}

function clearForm() {
  document.getElementById("txtName").value = null;
  document.getElementById("txtOrgName").value = null;
  document.getElementById("txtEmail").value = null;
  document.getElementById("txtVisits").value = null;
  document.getElementById("chkCleaning").checked = false;
  document.getElementById("rBasic").checked = false;
  document.getElementById("rBasicExtra").checked = false;
  document.getElementById("rExtensive").checked = false;
}

function addToOutput(string, outputid, reset) {
  //function interacts with html given a string, a html ID,
  //and a boolean for whether it is an error message.
  if (!reset) {
    document.getElementById(outputid).innerHTML += string + "<br>";
  } else {
    document.getElementById(outputid).innerHTML = string;
  }
}

//functions call validate functions as onclick cannot call parameters
function callValName() {
  validateNames(document.getElementById("txtName").value, "errName");
}

function callValOrgName() {
  validateNames(document.getElementById("txtOrgName").value, "errOrgName");
}

function callValEmail() {
  validateEmail(document.getElementById("txtEmail").value);
}

function callValVisits() {
  validateVisits(document.getElementById("txtVisits").value);
}

function validateNames(strName, output) {
  //uses regEx to validate input of Name and Organisation Name
  var valid = false;
  if (strName.length == 0) {
    addToOutput("Please do not leave blank.", output, true);
  } else {
    let valChar2 = /^[a-z]\w{1,}/gi;
    if (valChar2.test(strName)) {
      //clears errors if input is valid
      addToOutput(null, output, true);
      valid = true;
    } else {
      addToOutput(
        "Must begin with a letter and be 2 or more characters.",
        output,
        true
      );
    }
  }
  return valid;
}

function validateEmail(strEmail) {
  //checks that email is in the form *@*. where * is a character
  var valid = false;
  if (strEmail.length == 0) {
    addToOutput("Please do not leave blank.", "errEmail", true);
  } else {
    let valEmail = /@+\w{1,}./gi;
    if (valEmail.test(strEmail)) {
      //clears errors if input is valid
      addToOutput(null, "errEmail", true);
      valid = true;
    } else {
      addToOutput(
        "Must include an @, a . at least one character after.",
        "errEmail",
        true
      );
    }
  }
  return valid;
}

function validateVisits(strVisits) {
  //checks that visits is an integer greater than 1
  if (strVisits.length == 0) {
    addToOutput("Please do not leave blank.", "errVisits", true);
  } else {
    var numVisits = Number(strVisits);
    if (!Number.isInteger(numVisits)) {
      addToOutput("Please enter a whole number value.", "errVisits", true);
    } else if (numVisits <= 1) {
      addToOutput("Please enter a number greater than 1.", "errVisits", true);
    } else if (numVisits > 1) {
      //clears errors if input is valid
      addToOutput(null, "errVisits", true);
      return true;
    }
  }
}

//this function creates an object based on inputs and saves to array
function getQuote() {
  var package = findPackage();
  var allValid = isQuoteValid();
  var materials = isChecked();
  if (allValid) {
    var newObj = {
      name: document.getElementById("txtName").value,
      orgName: document.getElementById("txtOrgName").value,
      email: document.getElementById("txtEmail").value,
      strVisits: document.getElementById("txtVisits").value,
      package: package,
      materials: materials,
    };
    arrQuotes[arrQuotes.length] = newObj;

    strQuote = quoteToString(newObj);
    addToOutput(strQuote + "<br/>", "output1", false);
    addToOutput(null, "errGetQuote", true);
  } else {
    addToOutput("Not all inputs are valid.", "errGetQuote", true);
  }
}

//this function utilises how each validate function returns true
//if the input is valid, to do a final check before calculations
function isQuoteValid() {
  var valid = false;
  var vName = validateNames(
    document.getElementById("txtName").value,
    "errName"
  );
  var vOrgName = validateNames(
    document.getElementById("txtOrgName").value,
    "errOrgName"
  );
  var vEmail = validateEmail(document.getElementById("txtEmail").value);
  var vVisits = validateVisits(document.getElementById("txtVisits").value);
  var vPackage = findPackage();

  if ((vName, vOrgName, vEmail, vVisits, vPackage != false)) {
    valid = true;
  }
  return valid;
}

//checks if checkbox for materials is clicked
function isChecked() {
  checkbox = document.getElementById("chkCleaning");
  var ticked;
  if (checkbox.checked) {
    ticked = "Yes";
  } else {
    ticked = "No";
  }
  return ticked;
}

//checks which package is selected and returns package name
function findPackage() {
  var package;
  var choices = document
    .getElementById("fldPackages")
    .getElementsByTagName("input");
  var labels = document
    .getElementById("fldPackages")
    .getElementsByTagName("label");
  for (var i = 0; i < choices.length; i++) {
    if (choices[i].checked) {
      package = labels[i].textContent;
    }
  }

  if (package == undefined) {
    //error message if package is not selected
    addToOutput("Please select a package type.", "errPackage", true);
    package = false;
  } else {
    //clear error message if correct
    addToOutput(null, "errPackage", true);
  }
  return package;
}

//uses package name to find description
function switchPDesc(package) {
  var desc;
  switch (package) {
    case "Basic":
      desc =
        "Rubbish removal, vacuuming floor sufaces, toilet areas full clean-up.";
      break;
    case "Basic Extra":
      desc = "As basic plus washing dishes in kitchenettes.";
      break;
    case "Extensive":
      desc =
        "As basic extra plus cleaning desk surfaces and kitchenette benches.";
      break;
    default:
      desc = "No package";
  }
  return desc;
}

//uses package name to find cost
function switchCostPerVisit(package) {
  var cost;
  switch (package) {
    case "Basic":
      cost = 120;
      break;
    case "Basic Extra":
      cost = 130;
      break;
    case "Extensive":
      cost = 160;
      break;
    default:
      cost = 0;
  }
  return cost;
}

//takes an object and returns it as an informal string
function quoteToString(object) {
  var totalCost = calculateCost(
    switchCostPerVisit(object.package),
    object.strVisits,
    object.materials
  );
  var message =
    "Order for: " +
    object.name +
    ". " +
    object.package +
    " package: " +
    switchPDesc(object.package) +
    " Cost per Visit: " +
    switchCostPerVisit(object.package) +
    ". Number of Visits: " +
    object.strVisits +
    ". Total Cost: " +
    totalCost;
  return message;
}

//calculates cost and discounts to cost
function calculateCost(package, strVisits, materials) {
  var numVisits = Number(strVisits);
  //costPerVisit is returned as a number so Number() is not necessary
  switchCostPerVisit(package);
  var costPerVisit = package;
  var cost = numVisits * costPerVisit;
  var initialCost = cost;
  if (numVisits >= 10) {
    cost = cost * 0.9;
  }

  if (numVisits < 10 && numVisits >= 5) {
    cost = cost * 0.95;
  }

  if (materials == "Yes") {
    cost = cost - 5;
  }

  var totalDiscount = initialCost - cost;

  if (totalDiscount > 0) {
    addToOutput(
      "Total discount is: $" + totalDiscount + "<br/>",
      "output1",
      false
    );
  }
  return cost;
}

//lists all quotes
function listQuotes() {
  var quotesList = arrayToString(arrQuotes);
  addToOutput(quotesList, "output2", true);
}

function arrayToString(array) {
  //note: quoteToString is not used as it results in a less formal format.
  //due to the way I added values with string = string + values
  //string is defined with "" to prevent string containing undefined
  var string = "";
  for (var i = 0; i < array.length; i++) {
    string =
      string +
      "Name: " +
      array[i].name +
      " ||| Organisation: " +
      array[i].orgName +
      " ||| Email: " +
      array[i].email +
      " ||| Visits: " +
      array[i].strVisits +
      " ||| Package: " +
      array[i].package +
      " ||| Sup. Materials: " +
      array[i].materials +
      "<br/>";
  }
  return string;
}

function valSearch() {
  //dropdown box always has a value selected by default
  var searchValue = document.getElementById("txtSearch").value;
  var searchPackage = document.getElementById("dropPackage").value;
  if (searchValue == "") {
    addToOutput("Please enter a value to search.", "errSearch", true);
  } else {
    addToOutput(null, "errSearch", true);
    addToOutput(
      "Matching values: <br/>" +
        arrayToString(searchQuotes(searchValue, searchPackage)),
      "output2",
      true
    );
  }
}

function searchQuotes(value, searchPackage) {
  //rather than returning an object, this returns an array of objects as multiple may match
  //search returns a result for a match in ANY field
  var arrMatching = [];
  for (var i = 0; i < arrQuotes.length; i++) {
    if (
      (arrQuotes[i].name == value || arrQuotes[i].orgName == value) &&
      arrQuotes[i].package == searchPackage
    ) {
      arrMatching[arrMatching.length] = arrQuotes[i];
    }
  }
  return arrMatching;
}
window.onload = init;
