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




//general knowledge questions url
const genUrl = "https://opentdb.com/api.php?amount=10&category=9&type=multiple";
getURL();
function getURL(){
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
    questionNumber.innerHTML = ("Question Number: " + (questionIndex + 1) + "/" + availableQuestions.length)
    questionRef.innerHTML = availableQuestions[questionIndex].question;
    answer1Ref.innerHTML = availableQuestions[questionIndex].answers[0];
    answer2Ref.innerHTML = availableQuestions[questionIndex].answers[1];
    answer3Ref.innerHTML = availableQuestions[questionIndex].answers[2];
    answer4Ref.innerHTML = availableQuestions[questionIndex].answers[3];
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

    if (questionIndex < (availableQuestions.length - 1)) {

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

        if (e.target.dataset.id == availableQuestions[questionIndex].correctAnswer) {
            console.log("correct");
            score += 100;
            console.log(score);
            e.target.style.color = "green";
            setTimeout(() => {
                e.target.style.color = "black";
                nextQuestion();
            }, "1000")


        } else {
            console.log("incorrect");
            e.target.style.color = "red";
            setTimeout(() => {
                e.target.style.color = "black";
                nextQuestion();
            }, "1000")


        }
    })
}
// // //general knowledge questions url