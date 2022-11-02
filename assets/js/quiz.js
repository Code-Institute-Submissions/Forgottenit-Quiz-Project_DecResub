//create required variables
const questionRef = document.querySelector("#question");
const answer1Ref = document.querySelector("#answer1");
const answer2Ref = document.querySelector("#answer2");
const answer3Ref = document.querySelector("#answer3");
const answer4Ref = document.querySelector("#answer4");
const availableQuestions = [];
const gameChoices = [];
const regex = /^[a-zA-Z]+$/;
let rules = document.getElementById("rules");
let score = 0;
let totalScore = document.querySelector(".score");
let questionNumber = document.querySelector("#qNumber");
let questionIndex = 0;
let progressBar = document.getElementById("progress-bar");
let fetchArray = [];
let time = 15;
let timeOut = setInterval(timer, 1000);
let selectedAnswer = Array.from(document.querySelectorAll(".choice"));

let fetchCatch = function (response) {
    if (!response.ok) {
        if (confirm("Sorry, there was a problem getting your questions, you can use our 20 stored questions if you want? If not, hit cancel and try again later")) {
            window.location.href = "/quiz2.html";
        } else {
            window.location.href = "index.html";
        }
        throw new Error('There was a problem with the Network response');
    }
    return response;
};

function homeClear() {
    localStorage.clear();
    window.location.href = "/index.html";
}

function replay() {
    window.location.href = "/quizChoice.html";
}

function getUserName() {
    let playButton = document.querySelector("#play");
    playButton.addEventListener("click", e => {
        if (10 >= document.querySelector("#username").value.length && document.querySelector("#username").value.length > 2 && document.querySelector("#username").value.match(regex)) {
            localStorage.setItem("username", document.querySelector("#username").value);
            window.location.href = "/quizChoice.html";
        } else {
            alert("Not a Valid Username, please enter a name between 3 and 10 letters");
        }
    });
}

function hideRules() {
    rules.addEventListener("click", e => {
        rules.style.display = "none";
    });
}

//fisher-yates shuffle to randomise answer postition from https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
    let m = array.length,
        t, i;
    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);
        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

function getCategories() {
    fetch("https://opentdb.com/api_category.php")
        .then(fetchCatch)
        .then(res => res.json())
        .then(categories => {
            gameChoices.push(...categories.trivia_categories);
            displayCategories();
        })
        .catch(error => console.log(error));
}

function displayCategories() {
    document.querySelector("#quiz-choice").innerHTML = (`Hello ${localStorage.getItem("username")}, please choose your categories (you can pick a maximum of 5)`);
    for (i = 0; i < 15; i++) {
        //fill div with 15 categories
        let categoryChoice = document.querySelector(".selection");
        let categories = document.createElement("input");
        let categoriesLabel = document.createElement("label");
        categories.classList = "checkbox";
        categories.value = [i + 9];
        categories.type = "checkbox";
        categories.id = [i + 9];
        categories.checked = false;
        categoriesLabel.htmlFor = `${i+9}`;
        categoriesLabel.classList = "select flex";
        categoriesLabel.innerHTML = (`${gameChoices[i].name}`);
        categoriesLabel.appendChild(categories);
        categories.innerHTML = (`${gameChoices[i].id} ${gameChoices[i].name}`);
        categoryChoice.appendChild(categoriesLabel);
    }
    changeURL();
}

// Find out value of clicked choice then change URL
function changeURL() {
    var checkedBox = document.querySelectorAll('input[type="checkbox"]:checked');
    checkedBox.forEach(element => {
        fetchArray.push(["https://opentdb.com/api.php?amount=10&category=" + element.value + "&type=multiple"]);
    });
    for (i = 0; i < fetchArray.length; i++) {
        localStorage.setItem(`genUrl${[i]}`, fetchArray[i]);
        localStorage.setItem("fetchArrayLength", fetchArray.length);
    }
    //limited to 50 question fetch by Opentdb
    let submitCategories = document.querySelector("#submit-categories");
    submitCategories.addEventListener("click", e => {
        if (fetchArray.length > 5 || fetchArray.length == 0) {
            if (confirm("Sorry, you have to pick between 1 and 5 categories!")) {
                window.location.href = "quizChoice.html";
            } else {
                window.location.href = "quizChoice.html";
            }
        } else
            setTimeout(() => {
                window.location.href = "quiz.html";
            }, 1000);
    });
}

function getURL() {
    for (i = 0; i < localStorage.getItem("fetchArrayLength"); i++) {
        fetch(localStorage.getItem("genUrl" + [i]))
            .then(fetchCatch)
            .then(res => res.json())
            .then(data => {
                let questions = (data.results.map(q => {
                    return {
                        category: q.category,
                        question: q.question,
                        correctAnswer: q.correct_answer,
                        answers: [...q.incorrect_answers, q.correct_answer]
                    };
                }));
                availableQuestions.push(...questions);
                shuffle(availableQuestions);
                availableQuestions.forEach(element => {
                    shuffle(element.answers);
                });
                displayQuestions();
            })
            .catch(error => console.log(error));
    }
}

//set timer
function resetTimer() {
    clearInterval(timeOut);
    time = 15;
}

function timer() {
    document.getElementById("timer").innerHTML = time + "s";
    time--;
    if (time < 10) {
        document.getElementById("timer").innerHTML = "0" + time + "s";
    }
    document.querySelector("#skip").addEventListener("click", e => {
        time = 0;
    });
    if (time < 0) {
        document.getElementById("timer").innerHTML = "Time Up!";
        resetTimer();
        selectedAnswer.forEach(answer => {
            answer.style.pointerEvents = "none";
            if (answer.innerHTML == availableQuestions[questionIndex].correctAnswer) {
                answer.style.color = "rgba(84, 234, 84, 0.9)";
                setTimeout(() => {
                    answer.style.color = "black";
                    answer.style.pointerEvents = "auto";
                }, 3000);
            } else {
                answer.style.color = "rgba(245, 49, 49, 0.9)";

                setTimeout(() => {
                    answer.style.color = "black";
                    answer.style.pointerEvents = "auto";
                }, 3000);
            }
        });
        setTimeout(() => {
            questionIndex++;
            displayQuestions();
        }, 3000);
    }
}

function displayQuestions() {
    if (questionIndex == availableQuestions.length) {
        localStorage.setItem("finalScore", score);
        localStorage.setItem("totalQuestions", availableQuestions.length);

        window.location.href = "topScore.html";
    }
    totalScore.innerHTML = `Score: ${score}`;
    questionNumber.innerHTML = ("Question: " + (questionIndex + 1) + "/" + (availableQuestions.length));
    questionRef.innerHTML = availableQuestions[questionIndex].question;
    answer1Ref.innerHTML = availableQuestions[questionIndex].answers[0];
    answer2Ref.innerHTML = availableQuestions[questionIndex].answers[1];
    answer3Ref.innerHTML = availableQuestions[questionIndex].answers[2];
    answer4Ref.innerHTML = availableQuestions[questionIndex].answers[3];
    nextQuestion();
}

// Set up a function to call a question from array and set it to the innerHTML of question
function nextQuestion() {
    let amountQuestions = availableQuestions.length;
    progressBar.max = amountQuestions;
    resetTimer();
    timeOut = setInterval(timer, 1000);
    timer();
    progressBar.value = questionIndex + 1;
}

//record which choice was selected using the data set, then compare this to the answer number
for (i = 0; i < 4; i++) {
    selectedAnswer[i].addEventListener("click", e => {
        resetTimer();
        if (e.target.innerHTML == availableQuestions[questionIndex].correctAnswer) {
            score += 100;
            e.target.style.background = "rgba(84, 234, 84, 0.8)";
            e.target.classList.add("choice-hover");
            setTimeout(() => {
                e.target.style.background = "antiquewhite";
                e.target.classList.remove("choice-hover");
                questionIndex++;
                displayQuestions();
            }, 1000);
        } else {
            e.target.style.background = "rgba(245, 49, 49, 0.8)";
            e.target.classList.add("choice-hover");
            setTimeout(() => {
                e.target.style.background = "antiquewhite";
                e.target.classList.remove("choice-hover");
                questionIndex++;
                displayQuestions();
            }, 1000);
        }
    });
}

function displayTopScore() {
    let result = document.querySelector("#result");
    let username = localStorage.getItem("username");
    let finalScore = localStorage.getItem("finalScore");
    let totalQuestions = localStorage.getItem("totalQuestions");
    document.querySelector("#score-box").innerHTML = `Hello ${username}, your score was ${finalScore} out of a possible ${totalQuestions*100}, you got ${finalScore/totalQuestions}% right`;
    if ((finalScore / totalQuestions) == 100) {
        result = ("Wow, great job!!! A perfect Score!");
    } else if ((finalScore / totalQuestions) > 65 && (finalScore / totalQuestions) < 100) {
        result.innerHTML = ("Really well done!");
    } else if ((finalScore / totalQuestions) > 20 && (finalScore / totalQuestions) < 65) {
        result.innerHTML = ("Better luck next time!");
    } else {
        result.innerHTML = ("Practice makes perfect...");
    }
    document.querySelector("#score-box").innerHTML = `Hello ${username}, your score was ${finalScore} out of a possible ${totalQuestions*100}, you got ${finalScore/totalQuestions}% right`;
}

// // //general knowledge questions url if fetch unsuccessful
function getURL2() {
    fetch("js/questions.json")
        .then(fetchCatch)
        .then(res => res.json())
        .then(data => {
            let questions = (data.results.map(q => {
                return {
                    category: q.category,
                    question: q.question,
                    correctAnswer: q.correct_answer,
                    answers: [...q.incorrect_answers, q.correct_answer]
                };
            }));
            availableQuestions.push(...questions);
            shuffle(availableQuestions);
            displayQuestions();
        })
        .catch(error => console.log(error));
}