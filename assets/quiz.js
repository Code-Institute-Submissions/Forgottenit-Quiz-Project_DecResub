//create required variables
const questionRef = document.querySelector("#question");
const answer1Ref = document.querySelector("#answer1");
const answer2Ref = document.querySelector("#answer2");
const answer3Ref = document.querySelector("#answer3");
const answer4Ref = document.querySelector("#answer4");
const availableQuestions = [];
const gameChoices = [];
let categoryChoice = document.querySelector(".select");
let score = 0;
let totalScore = document.querySelector(".score");
let questionNumber = document.querySelector("#qNumber");

let selectedQuiz = Array.from(document.querySelectorAll(".link"));
console.log(selectedQuiz);
categoryChoice.addEventListener("onclick", e => console.log(e.target.dataset.id))
fetch("https://opentdb.com/api_category.php")
    .then(res => res.json())
    .then(categories => {
        gameChoices.push(...categories.trivia_categories);
        displayCategories();
    })

function displayCategories() {
    console.log(gameChoices[0].name)
    for (i = 0; i < 15; i++) {
        //fill div with categories
        (x = document.createElement('option')).innerHTML = (`<p class="chosenCategory"data-id="${gameChoices[i].id}">${gameChoices[i].name}` + `${gameChoices[i].id}</p>`)
        categoryChoice.appendChild(x);
        
        
        console.log(gameChoices[i].name);
        console.log(gameChoices[i].id);

        console.log(gameChoices.length);
        checkGameChoice();
    }
};
//check what game was selected then put that value into the Url postition for category
    function checkGameChoice(){
        let chosen = document.getElementsByClassName(".chosenCategory");
        console.log(categoryChoice)
    }

// `"https://opentdb.com/api.php?amount=10&category=`${gameChoices[i].id}`&type=multiple"`
//general knowledge questions url
const genUrl = "https://opentdb.com/api.php?amount=10&category=9&type=multiple";
getURL();

function getURL() {
    fetch(genUrl)
        .then(res => res.json())
        .then(data => {
            const questions = (data.results.map(q => {
                return {
                    question: q.question,
                    correctAnswer: q.correct_answer,
                    answers: [...q.incorrect_answers, q.correct_answer]
                };
            }))
            console.log(questions);
            availableQuestions.push(...questions);
            getQuestions();
        })

}

// console.log(availableQuestions)

// console.log("questions outside of fetch log: "+questions);
let questionIndex = 0;

function getQuestions(questions) {
    availableQuestions.push(questions);
    console.log(availableQuestions[0].question);
    getNewQuestion();

}

function getNewQuestion() {
    totalScore.innerHTML = `Score: ${score}`;
    questionNumber.innerHTML = ("Question Number: " + (questionIndex + 1) + "/" + (availableQuestions.length - 1))

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
    shuffle(availableQuestions[questionIndex].answers);
    questionRef.innerHTML = availableQuestions[questionIndex].question;
    answer1Ref.innerHTML = availableQuestions[questionIndex].answers[0];
    answer2Ref.innerHTML = availableQuestions[questionIndex].answers[1];
    answer3Ref.innerHTML = availableQuestions[questionIndex].answers[2];
    answer4Ref.innerHTML = availableQuestions[questionIndex].answers[3];
    console.log("Correct Answer= " + availableQuestions[questionIndex].correctAnswer)
}



// {
//     question: "What is the capital of France?",
//     answer1: "Monaco",
//     answer2: "Berlin",
//     answer3: "London",
//     answer4: "Paris",
//     correctAnswer: 4
// }, {
//     question: "What is the capital of England?",
//     answer1: "Monaco",
//     answer2: "Berlin",
//     answer3: "Paris",
//     answer4: "London",
//     correctAnswer: 4
// }, {
//     question: "What is the capital of Germany?",
//     answer1: "Monaco",
//     answer2: "Paris",
//     answer3: "London",
//     answer4: "Berlin",
//     correctAnswer: 4
// }];
// console.log("available questions length:" + availableQuestions.length);
// console.log(availableQuestions.correctAnswer);
// Set up a function to call a question from array and set it to the innerHTML of question


function nextQuestion() {

    if (questionIndex < (availableQuestions.length - 2)) {

        questionIndex++;
        getNewQuestion();
        console.log("Question Index:" + questionIndex)
    } else {

        console.log("Question Index:" + questionIndex)
        window.location.href = "/topScore.html"
        totalScore.innerHTML = `Final Score: ${score}`;
        console.log("Game over")
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

        if (e.target.innerHTML == availableQuestions[questionIndex].correctAnswer) {
            console.log("correct");
            score += 100;
            console.log(score);
            e.target.style.background = "green";
            setTimeout(() => {
                e.target.style.background = "antiquewhite";
                nextQuestion();
            }, "1000")


        } else {
            console.log("incorrect");
            e.target.style.background = "red";
            setTimeout(() => {
                e.target.style.background = "antiquewhite";
                nextQuestion();
            }, "1000")


        }
    })
}
// // //general knowledge questions url