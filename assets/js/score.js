//Function to display Results on top Score page and display msg depending on score
function displayTopScore() {
    let result = document.querySelector("#result");
    let username = localStorage.getItem("username");
    let finalScore = localStorage.getItem("finalScore");
    let totalQuestions = localStorage.getItem("totalQuestions");
    let roundedScore = Math.round(finalScore / totalQuestions);
    let background = document.querySelector("#score-box");
    if ((finalScore / totalQuestions) == 100) {
        result.innerHTML = ("Wow, great job!!! A perfect Score!");
        result.style.color = "rgb(1, 78, 1)";
        background.style.background = "linear-gradient(225deg, rgba(3, 158, 21, 0.2), rgba(17, 201, 69, 0.4))";
    } else if ((finalScore / totalQuestions) >= 65 && (finalScore / totalQuestions) < 100) {
        result.innerHTML = ("Really well done!");
        result.style.color = "rgb(3, 57, 5)";
        background.style.background = "linear-gradient(225deg, rgba(3, 158, 21, 0.2), rgba(17, 201, 69, 0.4))";
    } else if ((finalScore / totalQuestions) >= 50 && (finalScore / totalQuestions) < 65) {
        result.innerHTML = ("You got at least half right!");
        background.style.background = "linear-gradient(75deg, rgba(250, 26, 48, 0.1), rgba(32, 159, 58, 0.1))";
    } else if ((finalScore / totalQuestions) >= 20 && (finalScore / totalQuestions) < 50) {
        result.style.color = "rgb(108, 15, 29)";
        result.innerHTML = ("Better luck next time!");
        background.style.background = "linear-gradient(225deg, rgba(248, 75, 75, 0.4), rgba(242, 3, 3, 0.6))";
    } else {
        result.innerHTML = ("Practice makes perfect...");
        result.style.color = "rgb(184, 30, 53)";
        background.style.background = "linear-gradient(225deg, rgba(248, 75, 75, 0.4), rgba(242, 3, 3, 0.6))";
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