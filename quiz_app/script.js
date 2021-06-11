const quizData = [
    {
        question: 'How many undergraduates are enrolled at UC Berkeley',
        answers: {
            0: '24,000',
            1: '51,000',
            2: '32,000',
            3: '42,000'
        },
        correct: 2
    },
    {
        question: 'Who was not one of the Paypal Mafia?',
        answers: {
            0: 'Marc Andreessen',
            1: 'Elon Musk',
            2: 'Peter Thiel',
            3: 'Reid Hoffman'
        },
        correct: 0
    },
    {
        question: 'Which early browser is credited to have popularized the World Wide Web?',
        answers: {
            0: 'Netscape',
            1: 'Internet Explorer',
            2: 'Google Chrome',
            3: 'Mosaic'
        },
        correct: 3
    },
    {
        question: 'What year was UC Berkeley founded?',
        answers: {
            0: '1854',
            1: '1794',
            2: '1868',
            3: '1848'
        },
        correct: 3
    },
    {
        question: 'Which coding language came first?',
        answers: {
            0: 'C++',
            1: 'JavaScript',
            2: 'Python',
            3: 'Ruby'
        },
        correct: 0
    }
]
let questionIndex = 0;
let answersCorrect = 0;
const answerChoices = document.querySelectorAll('input[name="quiz-answer"]');
const title = document.querySelector('.card-title');
const quizCard = document.getElementById(('quiz-card'));
const quiz = document.forms[0];

quiz.addEventListener('submit', processSubmission);
displayQuestion();

function processSubmission(e) {
    e.preventDefault();
    const userAnswer = +collectAnswer();
    const correctAnswer = quizData[questionIndex].correct;
    if (userAnswer === correctAnswer) {
        countAnswer(true);
    } else {
        countAnswer(false);
    }
    questionIndex++;
    if (questionIndex >= quizData.length) {
        showResults();
    } else {
        displayQuestion();
    }
}

function collectAnswer() {
    for (let choice of answerChoices) {
        if (choice.checked) {
            return choice.dataset.answer;
        }
    }
}

function countAnswer(correct) {
    const alert = document.createElement('div');
    alert.className = 'alert';
    alert.role = 'alert';
    if (correct) {
        alert.textContent = 'Correct!';
        alert.classList.add('alert-success');
        answersCorrect++;
    } else {
        alert.textContent = 'Incorrect.';
        alert.classList.add('alert-danger');
    }

    document.body.append(alert);
    setTimeout(() => alert.remove(), 1500);
}

function displayQuestion() {
    title.textContent = quizData[questionIndex].question;
    let answers = document.querySelectorAll('.quiz-answer-container label');
    for (let i = 0; i < answers.length; i++) {
        answers[i].textContent = quizData[questionIndex].answers[i];
    }
    // Deselect all answers
    for (let answer of answerChoices) {
        answer.checked = false;
    }
}

function showResults() {
    quizCard.remove();
    let resultsPage = document.querySelector('#scorecard').content.cloneNode(true);
    resultsPage.querySelector('p').textContent = `You got ${answersCorrect}/${quizData.length} correct!`;
    resultsPage.querySelector('button').addEventListener('click', () => {
        location.reload();
    })
    document.body.append(resultsPage);
}