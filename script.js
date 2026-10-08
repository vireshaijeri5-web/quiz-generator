const questions = [
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: 1,
  },
  {
    question: "Which CSS property changes the text color?",
    options: ["background-color", "color", "font-size", "margin"],
    answer: 1,
  },
  {
    question: "Which JavaScript keyword declares a block-scoped variable?",
    options: ["var", "let", "function", "const"],
    answer: 1,
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language",
      "Hyperlink and Text Markup Language",
      "High Text Machine Language",
    ],
    answer: 0,
  },
  {
    question: "Which tag is used to include JavaScript in an HTML file?",
    options: ["<script>", "<js>", "<code>", "<link>"],
    answer: 0,
  },
];

let currentQuestionIndex = 0;
let score = 0;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");
const questionText = document.getElementById("question-text");
const currentQuestionNumber = document.getElementById("current-question");
const totalQuestions = document.getElementById("total-questions");
const scoreDisplay = document.getElementById("score");
const answersContainer = document.getElementById("answers-container");
const progressBar = document.getElementById("progress");
const finalScore = document.getElementById("final-score");
const maxScore = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");

function showScreen(screen) {
  startScreen.classList.remove("active");
  quizScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  screen.classList.add("active");
}

function updateProgress() {
  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

function renderQuestion() {
  const question = questions[currentQuestionIndex];

  questionText.textContent = question.question;
  currentQuestionNumber.textContent = currentQuestionIndex + 1;
  totalQuestions.textContent = questions.length;
  scoreDisplay.textContent = score;
  answersContainer.innerHTML = "";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-btn";
    button.textContent = option;
    button.dataset.index = index;

    button.addEventListener("click", () => handleAnswer(button, index, question.answer));
    answersContainer.appendChild(button);
  });

  updateProgress();
}

function handleAnswer(selectedButton, selectedIndex, correctIndex) {
  const answerButtons = [...answersContainer.querySelectorAll(".answer-btn")];

  answerButtons.forEach((button) => {
    button.disabled = true;

    if (Number(button.dataset.index) === correctIndex) {
      button.classList.add("correct");
    }

    if (Number(button.dataset.index) === selectedIndex && selectedIndex !== correctIndex) {
      button.classList.add("incorrect");
    }
  });

  if (selectedIndex === correctIndex) {
    score += 1;
    scoreDisplay.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex += 1;

    if (currentQuestionIndex < questions.length) {
      renderQuestion();
    } else {
      showResult();
    }
  }, 800);
}

function showResult() {
  finalScore.textContent = score;
  maxScore.textContent = questions.length;

  if (score === questions.length) {
    resultMessage.textContent = "Perfect score! You nailed it!";
  } else if (score >= questions.length / 2) {
    resultMessage.textContent = "Nice job! You know your stuff.";
  } else if (score > 0) {
    resultMessage.textContent = "Good try! Keep practicing and you will improve.";
  } else {
    resultMessage.textContent = "A fresh start is all you need. Try again!";
  }

  showScreen(resultScreen);
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreDisplay.textContent = "0";
  progressBar.style.width = "0%";
  renderQuestion();
  showScreen(quizScreen);
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  progressBar.style.width = "0%";
  scoreDisplay.textContent = "0";
  showScreen(startScreen);
}

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);
