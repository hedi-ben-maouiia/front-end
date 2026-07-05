const startBtn      = document.getElementById("start-btn");
const resetBtn      = document.getElementById("restart-btn");

const startScreen   = document.getElementById("start-screen"); 
const quizScreen    = document.getElementById("quiz-screen");
const resultScreen  = document.getElementById("result-screen");


const answersContainer = document.getElementById("answers-container");
const questionText = document.getElementById("question-txt");
const questionNumber = document.getElementById("question-number");
const score = document.getElementById("score");
const finalScore = document.getElementById("final-score");

const totalQuestions = document.getElementById("question-total");
const progressBar = document.getElementById("bar");





const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

const questionInfo = {
    questionIdx: 0,
    score: 0, 
    totalQuestion: (questions!== null) ? questions.length : 0,
    answered: false,
    reset(){
        this.questionIdx = 0;
        this.score = 0;
        this.totalQuestion = (questions!== null) ? questions.length : 0;
        this.answered = false;
    }
};

function renderQuestion()
{
    questionNumber.innerText = questionInfo.questionIdx + 1; 
    score.innerText = questionInfo.score;
    totalQuestions.innerText = questionInfo.totalQuestion;

    questionText.innerText = questions[questionInfo.questionIdx].question; 
    questions[questionInfo.questionIdx].answers.forEach((answer, index) => {
        const questionLabel = document.createElement("label");
        questionLabel.classList.add("option");

        const questionInput = document.createElement("input");
        questionInput.setAttribute("type", "radio");
        questionInput.setAttribute("value", index);

        const questionAnswer = document.createElement("span");
        questionAnswer.innerHTML = answer.text; 

        questionLabel.appendChild(questionInput);
        questionLabel.appendChild(questionAnswer);

        answersContainer.appendChild(questionLabel);     
    });
}
function clearOldQuestion(){ 
    let options = answersContainer.querySelectorAll("label");
    options.forEach(node => answersContainer.removeChild(node));
}


function updateQuestion(){
    questionInfo.questionIdx++;
    questionInfo.answered = false;
    if(questionInfo.questionIdx < questionInfo.totalQuestion){
        clearOldQuestion();
        renderQuestion();     
    }else {
        showResults();
    }
}

function checkAnswer(target){
    questionInfo.answered = true;
    const userAnswer = questions[questionInfo.questionIdx].answers[target.value];
    if(userAnswer.correct){
        questionInfo.score++;
        if(!target.parentNode.classList.contains("correct")){
            target.parentNode.classList.add("correct");
        }

    }else {
        target.parentNode.classList.add("wrong");
        revaleCorrectAnswer();
    }
    progressBar.style.width = `${((questionInfo.questionIdx + 1) * 100) / questionInfo.totalQuestion}%`;
}
function revaleCorrectAnswer()
{
    questions[questionInfo.questionIdx].answers.forEach((answer, index) => {
        if(answer.correct){
            answersContainer.children[index].classList.add("correct");
            answersContainer.children[index].firstChild.checked = true;
        }
    });
}
function showResults()
{
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    finalScore.textContent = questionInfo.score;  
}

function startQuiz()
{
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    renderQuestion();
}

function resetQuiz()
{
    resultScreen.classList.remove("active");
    startScreen.classList.add("active");        
    questionInfo.reset();
    clearOldQuestion();
    progressBar.style.width = 0;
}

function main(){
    startBtn.addEventListener("click", startQuiz); 
    answersContainer.addEventListener("change", e =>{
        if(!questionInfo.answered){
            checkAnswer(e.target);
            setTimeout(updateQuestion, 1000);
        }
    });
    resetBtn.addEventListener("click", resetQuiz);
}

main();

