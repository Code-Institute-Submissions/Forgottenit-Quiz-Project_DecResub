const regex = /^[a-zA-Z]+$/;
let rules = document.getElementById("rules");

//Function to get and store Player Username
function getUserName() {
    let username = document.querySelector("#username")
    if (10 >= username.value.length && username.value.length > 2 && username.value.match(regex)) {
        localStorage.setItem("username", username.value);
        window.location.href = "quizchoice.html";
    } else {
        alert("Not a Valid Username, PLEASE enter a Name between 3 and 10 letters");
    }
}


//Function to Hide game rules
function hideRules() {
    rules.addEventListener("click", e => {
        rules.style.display = "none";
    });
}