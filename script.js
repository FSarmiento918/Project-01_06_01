/*
      Project 01_06_01

      Author: Fernando Sarmiento
      Date:   08.15.18

      Filename: script.js
*/
"use strict";

var formValidity = true;


//function to validate the form
function validateForm(evt) {
    if (evt.preventDefault) {
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }
    validateRequired();
}

//remove placeholder text
function zeroPlaceholder() {
    var addressBox = document.getElementById("addrinput");
    addressBox.style.color = "black";
    if (addressBox.value === addressBox.placeholder) {
        addressBox.value === "";
    }
}

//function to restore placeholder text if box contains no user entry
function checkPlaceholder() {
    var addressBox = document.getElementById("addrinput");
    addressBox.style.color = "black";
    if (addressBox.value === "") {
        addressBox.style.color = "rgb(178,184,183)";
        addressBox.value = addressBox.placeholder;
    }
}

//add placeholder text for browsers that don't support placeholder attribute
function generatePlaceholder() {
    if (!Modernizr.input.placeholder) {
        var addressBox = document.getElementById("addrinput");
        addressBox.value = addressBox.placeholder;
        addressBox.style.color = "rgb(178,184,183)";
        if (addressBox.addEventListener) {
            addressBox.addEventListener("focus", zeroPlaceholder, false);
            addressBox.addEventListener("blur", checkPlaceholder, false);
        } else if (addressBox.attachEvent) {
            addressBox.attachEvent("onfocus", zeroPlaceholder);
            addressBox.attachEvent("onblur", checkPlaceholder);
        }
    }
}

//function to switch focus on SSN box
function advanceSsn() {
    var ssnFields = document.getElementsByClassName("ssn");
    var currentField = document.activeElement;
    if (currentField.value.length === currentField.maxLength) {
        if (currentField === ssnFields[0]) {
            ssnFields[1].focus();
        }
        if (currentField === ssnFields[1]) {
            ssnFields[2].focus();
        }
        if (currentField === ssnFields[2]) {
            document.getElementById("submitBtn").focus();
        }
    }
}

//function to set up page with all function calls
function setUpPage() {
    createEventListeners();
    generatePlaceholder();
}

//function to validate the required sections of the form
function validateRequired() {
    var formInput = document.getElementsByTagName("input");
    var errorDiv = document.getElementById("errorText");
    var fieldsetValidity = true;
    var elementCount = formInput.length;
    var currentElement = null;
    try {
        for (var i = 0; i < elementCount; i++) {
            currentElement = formInput[i];
            if (currentElement.value === "") {
                currentElement.style.background = "rgb(255,233,233)";
                fieldsetValidity = false;
            } else {
                currentElement.style.background = "white";
            }
        }
        if (fieldsetValidity === false) {
            throw "Please fill out the required fields";
        } else {
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
            formValidity = true;
        }
    } catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;
    }
    if (formValidity === true) {
        document.getElementsByTagName("form")[0].submit();
    }
}

//function to create event listeners for the document
function createEventListeners() {
    var ssnFields = document.getElementsByClassName("ssn");
    for (var i = 0; i < ssnFields.length; i++) {
        if (ssnFields[i].addEventListener) {
            ssnFields[i].addEventListener("input", advanceSsn, false);
        } else if (ssnFields[i].attachEvent) {
            ssnFields[i].attachEvent("oninput", advanceSsn);
        }
    }
    window.addEventListener("submit", validateForm);
}

if (window.addEventListener) {
    window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", setUpPage);
}
