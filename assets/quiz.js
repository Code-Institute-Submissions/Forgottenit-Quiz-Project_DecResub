//create required variables
const questionRef = document.querySelector("#question");
const answer1Ref = document.querySelector("#answer1");
const answer2Ref = document.querySelector("#answer2");
const answer3Ref = document.querySelector("#answer3");
const answer4Ref = document.querySelector("#answer4");

const availableQuestions = [{
    question:"What is the capital of France?",answer1:"Monaco",answer2:"Berlin",answer3:"London",correctAnswer:"Paris"
},{
    question:"What is the capital of England?",answer1:"Monaco",answer2:"Berlin",answer3:"Paris",correctAnswer:"London"
},{
    question:"What is the capital of Germany?",answer1:"Monaco",answer2:"Paris",answer3:"London",correctAnswer:"Berlin"
}];
console.log(availableQuestions.length)
// Set up a fuction to call a question from array and set it to the innerHTML of question
let questionIndex = 0;
function startQuiz(){
    
    questionRef.innerHTML=availableQuestions[questionIndex].question;
    answer1Ref.innerHTML=availableQuestions[questionIndex].answer1;
    answer2Ref.innerHTML=availableQuestions[questionIndex].answer2;
    answer3Ref.innerHTML=availableQuestions[questionIndex].answer3;
    answer4Ref.innerHTML=availableQuestions[questionIndex].correctAnswer;
    }

function nextQuestion(){
    if(questionIndex<2){
    questionIndex++;
    startQuiz();
    }
    else{
        console.log("Game over")
    }
}
startQuiz();

//check answers with Event Listener and see if string matches correct answer string
let selectedAnswer = Array.from(document.querySelectorAll(".choice"));
console.log (selectedAnswer);

//record which choice was selected using the data set, then compare this to the answer number
for (i=0;i<4;i++){
selectedAnswer[i].addEventListener("click", e=>{
    console.log(e.target.dataset.id)
}
);

}


selectedAnswer.forEach(function(element, index){
    element.innerHTML = availableQuestions.answer[index];
    console.log(element.innerHTML);
})

