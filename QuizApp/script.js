"use strict";

/**
 * Quiz App
 * ---------------------------------------------------
 * Design notes (why it's structured this way):
 * 1. Everything lives inside one IIFE -> nothing leaks into the global
 *    scope (`window`). Two <script> files on the same page could otherwise
 *    silently clash if they both declared `score` or `startQuiz`.
 * 2. DOM references, static data, and mutable state are kept in clearly
 *    separate blocks so you always know where to look.
 * 3. State changes (`State.reset`, `State.next`, `State.recordAnswer`)
 *    live as methods ON the state object, not as free-floating functions
 *    that reach in and mutate it from outside. This means there is exactly
 *    ONE place responsible for keeping state consistent.
 * 4. Render functions never mutate state, and state methods never touch
 *    the DOM. That separation is what makes each half independently easy
 *    to reason about and debug.
 */

(function () {
  // ---- DOM references ------------------------------------------------
  const dom = {
    startScreen: document.getElementById("start-screen"),
    quizScreen: document.getElementById("quiz-screen"),
    resultScreen: document.getElementById("result-screen"),

    startBtn: document.getElementById("start-btn"),
    resetBtn: document.getElementById("restart-btn"),

    answersContainer: document.getElementById("answers-container"),
    questionText: document.getElementById("question-txt"),
    questionNumber: document.getElementById("question-number"),
    totalQuestions: document.getElementById("question-total"),
    progressBar: document.getElementById("bar"),

    scoreDisplay: document.getElementById("score"),
    finalScoreDisplay: document.getElementById("final-score"),
  };

  // ---- Static data -----------------------------------------------------
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

  // ---- Mutable state -----------------------------------------------------
  // Every method here is the ONLY code allowed to change these fields.
  // Nothing outside this object ever writes `State.score = ...` directly.
  const State = {
    index: 0,
    score: 0,
    answered: false,

    get total() {
      return questions.length;
    },

    get currentQuestion() {
      return questions[this.index];
    },

    reset() {
      this.index = 0;
      this.score = 0;
      this.answered = false;
    },

    recordAnswer(isCorrect) {
      this.answered = true;
      if (isCorrect) this.score++;
    },

    advance() {
      this.index++;
      this.answered = false;
      return this.index < this.total; // true = more questions remain
    },
  };

  // ---- Rendering (reads state, never writes it) --------------------------
  function renderQuestion() {
    const { question, answers } = State.currentQuestion;

    dom.questionNumber.textContent = State.index + 1;
    dom.totalQuestions.textContent = State.total;
    dom.scoreDisplay.textContent = State.score;
    dom.questionText.textContent = question;

    dom.answersContainer.innerHTML = ""; // single, obvious place answers get cleared

    answers.forEach((answer, i) => {
      const label = document.createElement("label");
      label.className = "option";

      const input = document.createElement("input");
      input.type = "radio";
      input.value = i; // index, not text -> safe even with duplicate answer text

      const span = document.createElement("span");
      span.textContent = answer.text;

      label.append(input, span);
      dom.answersContainer.appendChild(label);
    });
  }

  function updateProgressBar() {
    const percent = ((State.index + 1) / State.total) * 100;
    dom.progressBar.style.width = `${percent}%`;
  }

  function revealCorrectAnswer() {
    const labels = dom.answersContainer.children;
    State.currentQuestion.answers.forEach((answer, i) => {
            if (answer.correct) {
                labels[i].classList.add("correct"); 
                labels[i].firstChild.checked = true;
            }
    });
  }

  function lockAnswers() {
    dom.answersContainer
      .querySelectorAll("input")
      .forEach((input) => (input.disabled = true));
  }

  function showResults() {
    dom.quizScreen.classList.remove("active");
    dom.resultScreen.classList.add("active");
    dom.finalScoreDisplay.textContent = State.score;
  }

  // ---- Event handlers (the only place State methods get called) ---------
  function handleAnswerSelected(event) {
    if (State.answered) return; // ignore stray events during the lock window
    const selected = event.target;
    const chosen = State.currentQuestion.answers[selected.value];

    State.recordAnswer(chosen.correct);
    selected.parentElement.classList.add(chosen.correct ? "correct" : "wrong");
    if (!chosen.correct) revealCorrectAnswer();

    lockAnswers();
    updateProgressBar();

    setTimeout(() => {
      const hasNext = State.advance();
      hasNext ? renderQuestion() : showResults();
    }, 1000);
  }

  function handleStart() {
    dom.startScreen.classList.remove("active");
    dom.quizScreen.classList.add("active");
    renderQuestion();
  }

  function handleReset() {
    dom.resultScreen.classList.remove("active");
    dom.startScreen.classList.add("active");
    dom.progressBar.style.width = "0%";
    State.reset();
  }

  // ---- Wiring -------------------------------------------------------------
  function init() {
    dom.startBtn.addEventListener("click", handleStart);
    dom.resetBtn.addEventListener("click", handleReset);
    dom.answersContainer.addEventListener("change", handleAnswerSelected);
  }

  init();
})();
