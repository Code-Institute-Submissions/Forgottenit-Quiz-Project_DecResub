//create required variables
const questionRef = document.querySelector("#question");
const answer1Ref = document.querySelector("#answer1");
const answer2Ref = document.querySelector("#answer2");
const answer3Ref = document.querySelector("#answer3");
const answer4Ref = document.querySelector("#answer4");
const availableQuestions = [];
const gameChoices = [];
// let quizNumber;
let genUrl;
let score = 0;
let totalScore = document.querySelector(".score");
let questionNumber = document.querySelector("#qNumber");
let chosenQuestions = document.getElementsByTagName("option");
let selectedQuiz = Array.from(document.querySelectorAll(".link"));


console.log(selectedQuiz);

fetch("https://opentdb.com/api_category.php")
    .then(res => res.json())
    .then(categories => {
        gameChoices.push(...categories.trivia_categories);
        displayCategories();
    })

function displayCategories() {

    for (i = 0; i < 15; i++) {
        //fill div with 15 categories
        let categoryChoice = document.querySelector(".select");
        let categories = document.createElement("option");
        categories.innerHTML = (`${gameChoices[i].id} ${gameChoices[i].name}`)
        categoryChoice.appendChild(categories);
    }
    checkGameChoice();
};
// check what game was selected then put that value into the Url postition for category
function checkGameChoice() {
    //add value to options to select game choice (values start at 9 from url)

    for (i = 0; i < 15; i++) {
        chosenQuestions[i].value = i + 9;
        console.log(chosenQuestions[i].value)
    }

    console.log(Array.from(gameChoices))
    console.log(gameChoices.length)
    console.log(gameChoices[14].id)
    changeURL();
}


// Find out value of clicked choice then change URL
function changeURL() {
    let quizContent = document.getElementsByTagName("select");
    for (i = 0; i < 15; i++) {
        quizContent[i].addEventListener("click", e => {
            console.log(e.target.value);
            let quizNumber = e.target.value;
            console.log("Quiz Number =" + quizNumber);
            genUrl=(`"https://opentdb.com/api.php?amount=10&category=${quizNumber}&type=multiple"`);
            console.log("Url: " + genUrl);
            return testUrl(genUrl);

        })
        
    }
    
}

function testUrl(genUrl){
    console.log("test"+genUrl);
    return getURL(genUrl);
}

getURL();
//general knowledge questions url = "https://opentdb.com/api.php?amount=10&category=15&type=multiple";
function getURL(genUrl) {
    console.log("getURL"+genUrl)
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
    totalScore.innerHTML = `Score : ${score}`;
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