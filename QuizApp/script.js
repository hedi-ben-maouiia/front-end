const startBtn      = document.getElementById("start-btn");
const startScreen   = document.getElementById("start-screen"); 
const quizScreen    = document.getElementById("quiz-screen");
const answersContainer = document.getElementById("answers-container");
const questionText = document.getElementById("question-txt");


const questionLabel = document.createElement("label");
const questionInput = document.createElement("input");
const questionTxt = document.createElement("span");




let questions = [
    {
        question: "What is the capitale of France ?",
        answers: [
            {name:"London", correct:false},
            {name:"Berlin", correct:false},
            {name:"Paris", correct:true},
            {name:"Madrid", correct:false}
        ]
    },
    {
        question: "Which planet is known as the red planet ?", 
        answers: [
            {name:"Venus", correct:false},
            {name:"Mars", correct:true},
            {name:"Jupiter", correct:false},
            {name:"Saturn", correct:false}
        ]
    }
];






function initQuestion()
{
    questionText.innerHTML += questions[0].question; 
    for(let i = 0; i < questions[0].answers.length;++i){

        const answerTxt = questions[0].answers[i].name;
        const questionLabel = document.createElement("label");
        const questionInput = document.createElement("input");
        const questionAnswer = document.createElement("span");

        questionLabel.classList.add("option");
        questionInput.setAttribute("type", "radio");

        questionInput.setAttribute("value", answerTxt);
        questionAnswer.innerHTML = answerTxt; 

        console.log(questions[0].answers[i].name);
        questionLabel.appendChild(questionInput);
        questionLabel.appendChild(questionAnswer);

        answersContainer.appendChild(questionLabel);     
    } 
}
function checkAnswer(questionIdx)
{
    // const answerInput = document.querySelectorAll(`input[type="radio"]`);
    // answerInput.forEach(answer => {
    //     if(answer.checked){
    //         if(questions[questionIdx].answers[answer.value]){}
    //     } 
    // });
}
function updateQuestion()
{ 
    questionText.innerHTML += questions[0].question; 
    for(let i = 1; i < questions.length;++i){
        for(let j = 0; j < questions[i].answers.length;++j){

            const questionLabel = document.createElement("label");
            const questionInput = document.createElement("input");
            const questionAnswer = document.createElement("span");

            questionLabel.classList.add("option");
            questionInput.setAttribute("type", "radio");

            questionAnswer.innerHTML = questions[i].answers[j].name;
            console.log(questions[0].answers[i].name);
            questionLabel.appendChild(questionInput);
            questionLabel.appendChild(questionAnswer);

            answersContainer.appendChild(questionLabel);     
        } 
    }
}



startBtn.addEventListener( "click",() => {

    if(startScreen.classList.contains("active")){
        startScreen.classList.remove("active");

        if(!quizScreen.classList.contains("active")){
            initQuestion();
            quizScreen.classList.add("active");
        }
    }
});

