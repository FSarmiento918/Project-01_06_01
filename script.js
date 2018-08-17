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
//    validateNumbers();
}

////remove placeholder text
//function zeroPlaceholder() {
//    var addressBox = document.getElementById("addrinput");
//    addressBox.style.color = "black";
//    if (addressBox.value === addressBox.placeholder) {
//        addressBox.value === "";
//    }
//}
//
////function to restore placeholder text if box contains no user entry
//function checkPlaceholder() {
//    var addressBox = 
//}

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
    window.addEventListener("submit", validateForm);
}

window.addEventListener("load", createEventListeners);
