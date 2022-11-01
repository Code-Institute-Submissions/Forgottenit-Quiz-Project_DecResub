//create required variables
const questionRef = document.querySelector("#question");
const answer1Ref = document.querySelector("#answer1");
const answer2Ref = document.querySelector("#answer2");
const answer3Ref = document.querySelector("#answer3");
const answer4Ref = document.querySelector("#answer4");
const availableQuestions = [];
const gameChoices = [];
var regex = /^[a-zA-Z]+$/;
let qBody = document.getElementById("quiz-body");

function getUserName() {

    let playButton = document.querySelector("#play");
    playButton.addEventListener("click", e => {
        if (10 > document.querySelector("#username").value.length && document.querySelector("#username").value.length > 2 && document.querySelector("#username").value.match(regex)) {
            localStorage.setItem("username", document.querySelector("#username").value);
            window.location.href = "/quizChoice.html";

        } else {
            alert("Not a Valid Username, please enter a name between 3 and 9 letters")
        }

    })
}

let genUrl;
let score = 0;
let totalScore = document.querySelector(".score");
let questionNumber = document.querySelector("#qNumber");
let chosenQuestions = document.getElementsByClassName(".selection");
const allUrl = [];
let fetchArray = [];


let fetchCatch = function (response) {
    if (!response.ok) {

        if (confirm("Sorry, there was a problem getting your questions, you can use our 20 stored questions if you want? If not, hit cancel and try again later")) {

            window.location.href = "/quiz2.html"
        } else {
            console.log("cancel")
            window.location.href = "index.html"
        }
        throw new Error('There was a problem with the Network response');

    }
    return response;
}

//fisher-yates shuffle to randomise answer postition from https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
    var m = array.length,
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
        .catch(error => console.log(error))
}

function displayCategories() {

    document.querySelector("#quiz-choice").innerHTML = `Hello ${localStorage.getItem("username")}, please choose your categories (you can pick a maximum of 5)`

    for (i = 0; i < 15; i++) {
        //fill div with 15 categories
        let categoryChoice = document.querySelector(".selection");
        let categories = document.createElement("input");
        let categoriesLabel = document.createElement("label");
        categories.classList = "flex checkbox";
        categories.value = [i + 9];
        categories.type = "checkbox";
        categories.id = [i + 9];
        categories.checked = false;
        categoriesLabel.htmlFor = `${i+9}`;
        categoriesLabel.classList = "select flex"
        categoriesLabel.innerHTML = (`${gameChoices[i].name}`);
        categoriesLabel.appendChild(categories)
        console.log(categories);
        console.log(categoriesLabel);
        categories.innerHTML = (`${gameChoices[i].id} ${gameChoices[i].name}`)
        categoryChoice.appendChild(categoriesLabel);
        console.log(categories.innerHTML)
        console.log(categories.value)
    }
    changeURL()
};

// Find out value of clicked choice then change URL
function changeURL() {
    var checkedBox = document.querySelectorAll('input[type="checkbox"]:checked');

    checkedBox.forEach(element => {
        console.log(element.value)
        console.log(element.length)
        //   fetchArray.push(element.value)
        fetchArray.push(["https://opentdb.com/api.php?amount=10&category=" + element.value + "&type=multiple"])
        console.log(fetchArray)
    });

    for (i = 0; i < fetchArray.length; i++) {
        console.log("fetchArray" + [i] + "= " + fetchArray[i])
        localStorage.setItem(`genUrl${[i]}`, fetchArray[i]);
        console.log("get Item Url " + [i] + "= " + localStorage.getItem(`genUrl${[i]}`));
        console.log("fetchArray length = " + fetchArray.length)
        localStorage.setItem("fetchArrayLength", fetchArray.length);
    }

    //limited to 50 question fetch by Opentdb
    let submitCategories = document.querySelector("#submit-categories")
    submitCategories.addEventListener("click", e => {
        if (fetchArray.length > 5 || fetchArray.length == 0) {
            if (confirm("Sorry, you have to pick between 1 and 5 categories!")) {
                window.location.href = "quizChoice.html"
            } else {
                window.location.href = "quizChoice.html"
            }
        } else
            setTimeout(() => {
                window.location.href = "quiz.html"

            }, 1000)
    })






}
// getURL();
//general knowledge questions url = "https://opentdb.com/api.php?amount=10&category=15&type=multiple";
function getURL() {
    for (i = 0; i < localStorage.getItem("fetchArrayLength"); i++) {
        console.log("fetchArray.length = " + localStorage.getItem("fetchArrayLength"))
        console.log("getURL" + localStorage.getItem("genUrl" + [i]))
        // localStorage.getItem("genUrl" + [i])
        // "questions.json"
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
                }))

                console.log(questions);
                availableQuestions.push(...questions);
                console.log(availableQuestions);
                shuffle(availableQuestions);
                console.log(availableQuestions);
                nextQuestion();
            })
            .catch(error => console.log(error))

    }

}

let questionIndex = 0;

document.getElementById("progress-bar").value = 0;
//set timer



function resetTimer() {
    clearInterval(timeOut);
    time = 15;
}
let time = 15;

let timeOut = setInterval(timer, 1000);

function timer() {

    document.getElementById("timer").innerHTML = time;
    time--;

    if (time < 0) {
        resetTimer();
        console.log(availableQuestions[questionIndex].correctAnswer)
        selectedAnswer.forEach(answer => {
            answer.style.pointerEvents = "none";
            if (answer.innerHTML == availableQuestions[questionIndex].correctAnswer) {
                answer.style.color = "green";
                setTimeout(() => {
                    answer.style.color = "black";
                    answer.style.pointerEvents = "auto";
                }, 3000)
            } else {
                answer.style.color = "red";
                setTimeout(() => {
                    answer.style.color = "black";
                    answer.style.pointerEvents = "auto";
                }, 3000)
            }
        });
        setTimeout(() => {
            // questionIndex++;
            nextQuestion();

        }, 3000)

    }
}





// Set up a function to call a question from array and set it to the innerHTML of question


function nextQuestion() {
    resetTimer();
    timeOut = setInterval(timer, 1000);
    timer();
    if (questionIndex < (availableQuestions.length - 1)) {
        questionIndex++;
        document.getElementById("progress-bar").value = 1 + questionIndex;

        
    

        totalScore.innerHTML = `Score: ${score}`;
        questionNumber.innerHTML = ("Question: " + (questionIndex) + "/" + (availableQuestions.length))
        shuffle(availableQuestions[questionIndex].answers);
        questionRef.innerHTML = availableQuestions[questionIndex].question;
        answer1Ref.innerHTML = availableQuestions[questionIndex].answers[0];
        answer2Ref.innerHTML = availableQuestions[questionIndex].answers[1];
        answer3Ref.innerHTML = availableQuestions[questionIndex].answers[2];
        answer4Ref.innerHTML = availableQuestions[questionIndex].answers[3];
        console.log("Correct Answer= " + availableQuestions[questionIndex].correctAnswer)





        // getNewQuestion();
        

    } else {
        window.location.href = "/topScore.html"
        

    }

}


//check answers with Event Listener and see if string matches correct answer string
let selectedAnswer = Array.from(document.querySelectorAll(".choice"));
console.log(selectedAnswer);

//record which choice was selected using the data set, then compare this to the answer number
for (i = 0; i < 4; i++) {
    selectedAnswer[i].addEventListener("click", e => {
        console.log(e.target.dataset.id)
        resetTimer();


        if (e.target.innerHTML == availableQuestions[questionIndex].correctAnswer) {
            console.log("correct");
            score += 100;

            console.log(score);
            e.target.style.background = "green";
            setTimeout(() => {
                e.target.style.background = "antiquewhite";
                questionIndex++;
                nextQuestion();
            }, 1000)


        } else {
            console.log("incorrect");
            e.target.style.background = "red";

            setTimeout(() => {
                e.target.style.background = "antiquewhite";
                questionIndex++;
                nextQuestion();
            }, 1000)


        }
    })
}


// // //general knowledge questions url if fetch unsuccessful
function getURL2() {

    fetch("questions.json")
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
            }))

            console.log(questions);
            availableQuestions.push(...questions);
            console.log(availableQuestions);
            shuffle(availableQuestions);
            console.log(availableQuestions);
            nextQuestion(); //was getNewQuestion
        })
        .catch(error => console.log(error))

}