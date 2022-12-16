//create required variables
const questionRef = document.querySelector("#question");
const answer1Ref = document.querySelector("#answer1");
const answer2Ref = document.querySelector("#answer2");
const answer3Ref = document.querySelector("#answer3");
const answer4Ref = document.querySelector("#answer4");
const availableQuestions = [];
let score = 0;
let totalScore = document.querySelector(".score");
let questionNumber = document.querySelector("#qNumber");
let questionIndex = 0;
let progressBar = document.getElementById("progress-bar");
let fetchArray = [];
let time = 15;
let timeOut = setInterval(timer, 1000);
let selectedAnswer = Array.from(document.querySelectorAll(".choice"));




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
            .catch(err => fetchWarning());
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
    if (time <= 0) {
        document.getElementById("timer").innerHTML = "Time Up!";
        resetTimer();
        displayCorrect();
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
        let correct = availableQuestions[questionIndex].correctAnswer;
        if (e.target.innerHTML == correct) {
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
            // correct.innerHTML.style.color = "rgba(84, 234, 84, 0.8)";
            displayIncorrect();
            // e.target.style.background = "rgba(245, 49, 49, 0.8)";
            // e.target.classList.add("choice-hover");
            setTimeout(() => {
                questionIndex++;
                displayQuestions();
            }, 3000);
            // setTimeout(() => {
            //     // e.target.style.background = "antiquewhite";
            //     // e.target.classList.remove("choice-hover");
            //     questionIndex++;
            //     displayQuestions();
            // }, 1000);
        }
    });
}



//Function that fetches JSON file from assets, called if Fetch from URL is unsuccesful
function getURL2() {
    fetch("assets/js/questions.json")
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
        .catch(err => fetchWarning());
}

function fetchWarning() {
    // Get the modal
    let fetchwarning = document.getElementById("fetchwarning");
    fetchwarning.style.display = "block";
    // Get the button that opens the modal


    // Get the <span> element that closes the modal
    let fetchwarningSpan = document.getElementsByClassName("close-fetchwarning")[0];


    // warningSpan.style.display = "block";

    fetchwarningSpan.onclick = function () {
        // warning.style.display = "none";
        window.location.href = "quiz2.html";
    }
    window.onclick = function (event) {
        if (event.target == fetchwarning) {
            // warning.style.display = "none";
            window.location.href = "quiz2.html";
        }
    }
}
//Function to display correct Answer when timer runs out
function displayCorrect() {
    selectedAnswer.forEach(answer => {
        answer.style.pointerEvents = "none";
        let correct = availableQuestions[questionIndex].correctAnswer;
        if (answer.innerHTML == correct) {
            answer.style.color = "rgba(24, 164, 24, 0.9)";
            answer.style.fontWeight = 900;
            setTimeout(() => {
                answer.style.color = "black";
                answer.style.fontWeight = 600;
                answer.style.pointerEvents = "auto";
            }, 3000);
        } else {
            answer.style.color = "rgba(245, 49, 49, 0.9)";
            answer.style.fontWeight = 500;
            setTimeout(() => {
                answer.style.color = "black";
                answer.style.fontWeight = 600;
                answer.style.pointerEvents = "auto";
            }, 3000);
        }
    })
}

function displayIncorrect() {
    selectedAnswer.forEach(answer => {
        answer.style.pointerEvents = "none";
        let correct = availableQuestions[questionIndex].correctAnswer;
        if (answer.innerHTML == correct) {
            answer.style.background = "rgba(24, 164, 24, 0.9)";
            answer.style.fontWeight = 900;
            setTimeout(() => {
                answer.style.background = "antiquewhite";
                answer.style.fontWeight = 600;
                answer.style.pointerEvents = "auto";
            }, 3000);
        } else {
            answer.style.background = "rgba(245, 49, 49, 0.8)";
            answer.style.fontWeight = 500;
            setTimeout(() => {
                answer.style.background = "antiquewhite";
                answer.style.fontWeight = 600;
                answer.style.pointerEvents = "auto";
            }, 3000);
        }
    })
}