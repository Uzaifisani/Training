interface IQuestion{
    question: string;
    choices: string[];
    correctAnswer: string;
}

class QuizExam {
        question: IQuestion[] = [];
        correctCount: number;
        QuestionIndex: number = 0;
        Marks: number = 0;

        addQuestion(question: IQuestion): void {
            this.question.push(question);
            console.log("Question Add Successfully!");
        }
        displayQuestion(): string {
            return this.question[this.QuestionIndex].question;
        }
        getChoices(): string[]{
            return this.question[this.QuestionIndex].choices;   
        }
        getScore(): number {
            return this.Marks;
        }
        getQuestionNo(): number {
            return this.QuestionIndex;
        }
    }

    let test1 = new QuizExam();
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

    
document.addEventListener("DOMContentLoaded", () => {
    displayQuestionOnPage();
    onAnswerClick();
});


function displayQuestionOnPage() {
    let displayQuestion = document.getElementById('showQuestion');
    let option1 = document.getElementById("option1");
    let option2 = document.getElementById("option2");
    let option3 = document.getElementById("option3");
    displayQuestion!.innerHTML = `<h2>${test1.displayQuestion()}</h2>`;
    option1!.innerHTML = test1.getChoices()[0];
    option2!.innerHTML = test1.getChoices()[1];
    option3!.innerText = test1.getChoices()[2];
}
function onAnswerClick() {
    let option1 = document.getElementById("option1");
    let option2 = document.getElementById("option2");
    let option3 = document.getElementById("option3");
    let marks = document.getElementById("score");
    let selectedAnswerIndex: number | null = null;

    option1!.addEventListener("click", () => { selectedAnswerIndex = 0; });
    option2!.addEventListener("click", () => { selectedAnswerIndex = 1; });
    option3!.addEventListener("click", () => { selectedAnswerIndex = 2; });
    document.getElementById("nextQuestion")!.addEventListener("click", () => {
        if (selectedAnswerIndex !== null) {
            if (test1.question[test1.QuestionIndex].correctAnswer === test1.question[test1.QuestionIndex].choices[selectedAnswerIndex]) {
                test1.Marks++;
            }
            test1.QuestionIndex++;
            marks!.innerText = String(test1.getScore());
            if (test1.QuestionIndex < test1.question.length) {
                displayQuestionOnPage();
                selectedAnswerIndex = null;
            } else {
                localStorage.setItem('quizScore', String(test1.getScore()));
                window.location.href = 'displayScore.html';
            }
        } else {
            alert("Please select one option, Without Selecting a Option you cant go to Next Question.")
        }
    });
}