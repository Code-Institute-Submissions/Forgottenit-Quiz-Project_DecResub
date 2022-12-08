const regex = /^[a-zA-Z]+$/;
let rules = document.getElementById("rules");

//Function to get and store Player Username
function getUserName() {
    let playButton = document.querySelector("#play");
    playButton.addEventListener("click", e => {
        if (10 >= document.querySelector("#username").value.length && document.querySelector("#username").value.length > 2 && document.querySelector("#username").value.match(regex)) {
            localStorage.setItem("username", document.querySelector("#username").value);
            window.location.href = "https://www.youtube.com/watch?v=z7Zynn4bJ3Q&ab_channel=WebStylePress";
        } else {
            alert("Not a Valid Username, please enter a Name between 3 and 10 letters");
        }
    });
}

//Function to Hide game rules
function hideRules() {
    rules.addEventListener("click", e => {
        rules.style.display = "none";
    });
}