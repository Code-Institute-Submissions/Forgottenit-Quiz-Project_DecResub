//Function to display Results on top Score page and display msg depending on score
function displayTopScore() {
    let result = document.querySelector("#result");
    let username = localStorage.getItem("username");
    let finalScore = localStorage.getItem("finalScore");
    let totalQuestions = localStorage.getItem("totalQuestions");
    let roundedScore = Math.round(finalScore / totalQuestions);
    if ((finalScore / totalQuestions) == 100) {
        result.innerHTML = ("Wow, great job!!! A perfect Score!");
    } else if ((finalScore / totalQuestions) >= 65 && (finalScore / totalQuestions) < 100) {
        result.innerHTML = ("Really well done!");
    } else if ((finalScore / totalQuestions) >= 50 && (finalScore / totalQuestions) < 65) {
        result.innerHTML = ("You got at least half right!");
    } else if ((finalScore / totalQuestions) >= 20 && (finalScore / totalQuestions) < 50) {
        result.innerHTML = ("Better luck next time!");
    } else {
        result.innerHTML = ("Practice makes perfect...");
    }
    document.querySelector("#score-box").innerHTML = `Hello ${username}, your score was ${finalScore} out of a possible ${totalQuestions*100}, you got ${roundedScore}% right`;
}

//Function to Clear storage and go to home page
function homeClear() {
    localStorage.clear();
    window.location.href = "index.html";
}

//Function to go back to Quiz choices
function replay() {
    window.location.href = "quizchoice.html";
}