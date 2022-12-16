//create required variables
const questionRef = document.querySelector("#question");
const answer1Ref = document.querySelector("#answer1");
const answer2Ref = document.querySelector("#answer2");
const answer3Ref = document.querySelector("#answer3");
const answer4Ref = document.querySelector("#answer4");
const availableQuestions = [];
let gameChoices = [];
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

//Function to respond if Response from Fetch not Ok, otherwise return Ok
let fetchCatch = function (response) {
    if (!response.ok) {
        if (confirm("Sorry, there was a problem getting your questions, you can use our 20 stored questions if you want? If not, hit cancel and try again later")) {
            window.location.href = "quiz2.html";
        } else {
            window.location.href = "index.html";
        }
        throw new Error('There was a problem with the Network response');
    }
    return response;
};

//Function to return to homescreen and clear local Storage
function homeClear() {
    localStorage.clear();
    window.location.href = "index.html";
}






//fisher-yates shuffle to randomise question and answer postitions, taken from https://bost.ocks.org/mike/shuffle/
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



//Function to fetch the selected categories from user input stored in Local storage
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

// Function to reset timer
function resetTimer() {
    clearInterval(timeOut);
    time = 15;
}

//Funtion to Set timer
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

//Function to display questions if there are Questions left in Array, if not, to go to final score page
function displayQuestions() {
    if (questionIndex == availableQuestions.length) {
        localStorage.setItem("finalScore", score);
        localStorage.setItem("totalQuestions", availableQuestions.length);
        window.location.href = "score.html";
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

// Function to reset timer and update progress
function nextQuestion() {
    let amountQuestions = availableQuestions.length;
    progressBar.max = amountQuestions;
    resetTimer();
    timeOut = setInterval(timer, 1000);
    timer();
    progressBar.value = questionIndex + 1;
}

//Function to check answers vs correct answers in Array by comparing HTML
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



//Function that fetches JSON file from assets, called if Fetch from URL is unsuccesful
function getURL2() {
    fetch("assets/js/questions.json")
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