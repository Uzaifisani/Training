var QuizExam = /** @class */ (function () {
    function QuizExam() {
        this.question = [];
        this.QuestionIndex = 0;
        this.Marks = 0;
    }
    QuizExam.prototype.addQuestion = function (question) {
        this.question.push(question);
        console.log("Question Add Successfully!");
    };
    QuizExam.prototype.displayQuestion = function () {
        return this.question[this.QuestionIndex].question;
    };
    QuizExam.prototype.getChoices = function () {
        return this.question[this.QuestionIndex].choices;
    };
    QuizExam.prototype.getScore = function () {
        return this.Marks;
    };
    QuizExam.prototype.getQuestionNo = function () {
        return this.QuestionIndex;
    };
    return QuizExam;
}());
var test1 = new QuizExam();
test1.addQuestion({
    question: "What is the primary benefit of using TypeScript over JavaScript?",
    choices: ["Improved runtime performance", "Static typing and better code maintainability", "It removes the need for writing JavaScript"],
    correctAnswer: "Static typing and better code maintainability"
});
test1.addQuestion({
    question: "Which keyword is used to define an interface in TypeScript?",
    choices: ["interface", "type", "struct"],
    correctAnswer: "interface"
});
test1.addQuestion({
    question: "How do you specify an optional property in a TypeScript interface?",
    choices: ["Using a question mark (?) after the property name", "Using the optional keyword before the property name", "Wrapping the property name in square brackets ([])"],
    correctAnswer: "Using a question mark (?) after the property name"
});
document.addEventListener("DOMContentLoaded", function () {
    displayQuestionOnPage();
    onAnswerClick();
});
function displayQuestionOnPage() {
    var displayQuestion = document.getElementById('showQuestion');
    var option1 = document.getElementById("option1");
    var option2 = document.getElementById("option2");
    var option3 = document.getElementById("option3");
    displayQuestion.innerHTML = "<h2>".concat(test1.displayQuestion(), "</h2>");
    option1.innerHTML = test1.getChoices()[0];
    option2.innerHTML = test1.getChoices()[1];
    option3.innerText = test1.getChoices()[2];
}
function onAnswerClick() {
    var option1 = document.getElementById("option1");
    var option2 = document.getElementById("option2");
    var option3 = document.getElementById("option3");
    var marks = document.getElementById("score");
    var selectedAnswerIndex = null;
    option1.addEventListener("click", function () { selectedAnswerIndex = 0; });
    option2.addEventListener("click", function () { selectedAnswerIndex = 1; });
    option3.addEventListener("click", function () { selectedAnswerIndex = 2; });
    document.getElementById("nextQuestion").addEventListener("click", function () {
        if (selectedAnswerIndex !== null) {
            if (test1.question[test1.QuestionIndex].correctAnswer === test1.question[test1.QuestionIndex].choices[selectedAnswerIndex]) {
                test1.Marks++;
            }
            test1.QuestionIndex++;
            marks.innerText = String(test1.getScore());
            if (test1.QuestionIndex < test1.question.length) {
                displayQuestionOnPage();
                selectedAnswerIndex = null;
            }
            else {
                localStorage.setItem('quizScore', String(test1.getScore()));
                window.location.href = 'displayScore.html';
            }
        }
        else {
            alert("Please select one option, Without Selecting a Option you cant go to Next Question.");
        }
    });
}
