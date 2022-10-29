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
let chosenQuestions = document.getElementsByClassName(".selection");







fetch(`https://opentdb.com/api_category.php`)

    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res);
    })
    .then(categories => {
        gameChoices.push(...categories.trivia_categories);
        displayCategories();
    })
    .catch(error => console.log(error))

function displayCategories() {

    for (i = 0; i < 15; i++) {
        //fill div with 15 categories
        let categoryChoice = document.querySelector(".selection");
        let categories = document.createElement("button");
        categories.classList = "select flex";
        categories.value = [i + 9]
        //will have to add href on click
        categories.innerHTML = (`${gameChoices[i].id} ${gameChoices[i].name}`)
        categoryChoice.appendChild(categories);
        console.log(categories.innerHTML)
        console.log(categories.value)
    }
    changeURL();
};

// Find out value of clicked choice then change URL
function changeURL() {
    let quizContent = document.getElementsByClassName("select");
    for (i = 0; i < 15; i++) {
        quizContent[i].addEventListener("click", e => {
            console.log(e.target.value);
            let quizNumber = e.target.value;
            console.log("Quiz Number =" + quizNumber);
            localStorage.setItem("genUrl", `https://opentdb.com/api.php?amount=10&category=${quizNumber}&type=multiple`);
            console.log("Url: " + localStorage.getItem("genUrl"));
            getURL();
        })

    }

}


getURL();
//general knowledge questions url = "https://opentdb.com/api.php?amount=10&category=15&type=multiple";
function getURL() {
    console.log("getURL" + localStorage.getItem("genUrl"))
    fetch(localStorage.getItem("genUrl"))
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res);
        })
        .then(data => {
            let questions = (data.results.map(q => {
                return {
                    question: q.question,
                    correctAnswer: q.correct_answer,
                    answers: [...q.incorrect_answers, q.correct_answer]
                };
            }))

            console.log(questions);
            availableQuestions.push(...questions);
            getNewQuestion();
        })
        .catch(error => console.log(error))
}

let questionIndex = 0;

document.getElementById("progressBar").value = 0;








function getNewQuestion() {


    totalScore.innerHTML = `Score: ${score}`;
    questionNumber.innerHTML = ("Question: " + (questionIndex + 1) + "/" + (availableQuestions.length))





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




// Set up a function to call a question from array and set it to the innerHTML of question


function nextQuestion() {

    if (questionIndex < (availableQuestions.length - 1)) {

        questionIndex++;
        document.getElementById("progressBar").value = 1 + questionIndex;
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
            }, 1000)


        } else {
            console.log("incorrect");
            e.target.style.background = "red";
            setTimeout(() => {
                e.target.style.background = "antiquewhite";

                nextQuestion();
            }, 1000)


        }
    })
}
// // //general knowledge questions url