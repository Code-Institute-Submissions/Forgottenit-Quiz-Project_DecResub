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
let c = 0;
function startQuiz(){
    
    questionRef.innerHTML=availableQuestions[c].question;
    answer1Ref.innerHTML=availableQuestions[c].answer1;
    answer2Ref.innerHTML=availableQuestions[c].answer2;
    answer3Ref.innerHTML=availableQuestions[c].answer3;
    answer4Ref.innerHTML=availableQuestions[c].correctAnswer;
    }

function nextQuestion(){
    if(c<2){
    c++;
    startQuiz();
    }
    else{
        console.log("Game over")
    }
}
startQuiz();

//check answers with Event Listener and see if string matches correct answer string
