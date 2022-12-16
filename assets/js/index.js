//Value to check if something is a letter
const regex = /^[a-zA-Z]+$/;


//Function to get and store Player Username
function getUserName() {
    let username = document.querySelector("#username")
    if (10 >= username.value.length && username.value.length > 2 && username.value.match(regex)) {
        localStorage.setItem("username", username.value);
        window.location.href = "quizchoice.html";
    } else {
        // alert("Not a Valid Username, PLEASE enter a Name between 3 and 10 letters");
        displayWarning();
    }
}

// Function to display and hide rules
function displayRules() {

    let rules = document.getElementById("rules");

    //Display rules
    rules.style.display = "block";

    let rulesSpan = document.getElementsByClassName("close-rules")[0];

    // Hide Rules if user clicks span/ "x"
    rulesSpan.onclick = function (e) {
        if (e.target == rulesSpan) {
            rules.style.display = "none";
        }
    }

    // Hide rules if user clicks window
    window.onclick = function (event) {
        if (event.target == rules) {
            rules.style.display = "none";
        }
    }
}

// Function to display warning
function displayWarning() {

    let warning = document.getElementById("warning");

    // Display warning
    warning.style.display = "block";

    let warningSpan = document.getElementsByClassName("close-warning")[0];

    // Hide warning if span/ "x" is clicked
    warningSpan.onclick = function () {
        window.location.href = "index.html";
    }

    //Hide warning if window is clicked
    window.onclick = function (event) {
        if (event.target == warning) {
            window.location.href = "index.html";
        }
    }
}