// Quiz data: an array of objects
const questions = [
  { question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks Text Mark Language"],
    answer: 0 },
  { question: "Which language is used to style web pages?",
    options: ["HTML", "CSS", "Python", "SQL"],
    answer: 1 },
  { question: "Which keyword declares a variable that can change in JavaScript?",
    options: ["const", "let", "static", "fixed"],
    answer: 1 },
  { question: "Which AWS service is used to store static website files?",
    options: ["Amazon EC2", "Amazon RDS", "Amazon S3", "AWS Lambda"],
    answer: 2 },
  { question: "Which symbol is used for single-line comments in JavaScript?",
    options: ["<!-- -->", "//", "#", "**"],
    answer: 1 }
];

let currentIndex = 0;
let score = 0;
// Stores the chosen option for each question (null = not answered yet)
let userAnswers = new Array(questions.length).fill(null);

const progressEl = document.getElementById("progress");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

function showQuestion() {
  const q = questions[currentIndex];
  progressEl.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  feedbackEl.className = "";

  q.options.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.className = "option-btn";
    btn.addEventListener("click", () => selectAnswer(i));
    optionsEl.appendChild(btn);
  });

  // If already answered, show the earlier result
  if (userAnswers[currentIndex] !== null) {
    showFeedback(userAnswers[currentIndex]);
  }

  prevBtn.disabled = currentIndex === 0;
  nextBtn.textContent = currentIndex === questions.length - 1 ? "Finish" : "Next";
}

function selectAnswer(choice) {
  if (userAnswers[currentIndex] !== null) return; // already answered
  userAnswers[currentIndex] = choice;
  if (choice === questions[currentIndex].answer) score++;
  showFeedback(choice);
}

function showFeedback(choice) {
  const correct = questions[currentIndex].answer;
  const buttons = optionsEl.querySelectorAll(".option-btn");
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) btn.classList.add("correct");
    if (i === choice && choice !== correct) btn.classList.add("incorrect");
  });
  if (choice === correct) {
    feedbackEl.textContent = "Correct! 🎉";
    feedbackEl.className = "correct";
  } else {
    feedbackEl.textContent = "Incorrect. The right answer is: " + questions[currentIndex].options[correct];
    feedbackEl.className = "incorrect";
  }
}

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = `You scored ${score} out of ${questions.length}`;
}

nextBtn.addEventListener("click", () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    showQuestion();
  } else {
    showResult();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    showQuestion();
  }
});

restartBtn.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  userAnswers = new Array(questions.length).fill(null);
  resultBox.classList.add("hidden");
  quizBox.classList.remove("hidden");
  showQuestion();
});

showQuestion();
