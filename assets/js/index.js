const regex = /^[a-zA-Z]+$/;
// let rules = document.getElementById("rules");

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


//Function to Hide game rules
function hideRules() {
    rules.addEventListener("click", e => {
        rules.style.display = "none";
    });
}

function displayRules() {
    // Get the modal
    let rules = document.getElementById("rules");
    rules.style.display = "block";
    // Get the button that opens the modal


    // Get the <span> element that closes the modal
    let rulesSpan = document.getElementsByClassName("close-rules")[0];


    // rules.style.display = "block";

    rulesSpan.onclick = function () {
        rules.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == rules) {
            rules.style.display = "none";
        }
    }
}

function displayWarning() {
    // Get the modal
    let warning = document.getElementById("warning");
    warning.style.display = "block";
    // Get the button that opens the modal


    // Get the <span> element that closes the modal
    let warningSpan = document.getElementsByClassName("close-warning")[0];


    // warningSpan.style.display = "block";

    warningSpan.onclick = function () {
        warning.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == warning) {
            warning.style.display = "none";
        }
    }
}