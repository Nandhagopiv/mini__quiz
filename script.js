var allQuestions = []
var selectedQuestion = []
const totalQuestionCount = 10
var mark = 0
var currentindex = 0
var userDetails = []

function selQuestion() {
    let lottedQuestion = allQuestions.sort(() => {
        return 0.5 - Math.random()
    })
    selectedQuestion = lottedQuestion.slice(0, totalQuestionCount)
}

function showquestion() {
    document.getElementById("questionBox").innerHTML = `<h1>${currentindex + 1}. ${selectedQuestion[currentindex].question}</h1>
            ${selectedQuestion[currentindex].answers.map((data, index) => {
        return `<label><input name = "answer" type = "radio" id= ${data} value = ${index}> ${data}</label><br>`
    }).join('')}
            `
    if (currentindex == 0) {
        document.getElementById("quizPrev").style.display = "none"
    } else {
        document.getElementById("quizPrev").style.display = "inline-block"
    }

}

function pageLoad(path) {
    fetch(`./pages/${path}`).then(data => data.text()).then((html) => {
        document.getElementById("landingPage").innerHTML = html
        if (path == "userForm.html") {
            var userForm = document.getElementById("user__form")

            userForm.addEventListener("submit", function (event) {
                event.preventDefault()
                userDetails.userName = document.getElementById("user__name").value
                userDetails.userEmail = document.getElementById("user__email").value
                pageLoad("instruction.html")
            })
        }

        if (path == "instruction.html") {
            document.getElementById("startQuiz__button").addEventListener("click", function () {
                pageLoad("quiz.html")
            })
        }

        if (path == "quiz.html") {
            selQuestion()
            showquestion()

            document.getElementById("quizNext").addEventListener("click", (event) => {

                var ansList = document.getElementsByName("answer")
                for (let index = 0; index < ansList.length; index++) {
                    if (ansList[index].checked) {
                        if (ansList[index].value == selectedQuestion[currentindex].correct) {
                            mark = mark + 1
                        }
                    }                                  
                }

                currentindex = currentindex + 1
                
                if (currentindex >= totalQuestionCount - 1) {
                    event.target.innerText = "Submit"
                    event.target.style.backgroundColor = "#3DA76C"
                    event.target.style.color = "white"
                }
                if (currentindex < totalQuestionCount) {
                    showquestion()
                }
                if (currentindex >= totalQuestionCount) {
                    pageLoad("result.html")
                }
            })

            document.getElementById("quizPrev").addEventListener("click", function () {
                if (currentindex < totalQuestionCount) {
                    document.getElementById("quizNext").innerText = "Next"
                    document.getElementById("quizNext").style.backgroundColor = "#FDE66C"
                    document.getElementById("quizNext").style.color = "black"
                }
                currentindex = currentindex - 1
                showquestion()
            })
        }

        if (path == "result.html") {
            document.getElementById("resultInfo").textContent = `Hello, ${userDetails.userName}, You have scored ${mark} out of ${totalQuestionCount} and you will also get updates on your mail (${userDetails.userEmail})`
            document.getElementById("result__btn").addEventListener("click",function(){
                pageLoad("answer.html")
            })
        }

        if (path === "answer.html") {
            var html = "";
            selectedQuestion.forEach(function(data, index) {
                html += `<h1>${index+1}. ${data.question}</h1><h4>Correct Answer: ${data.answers[data.correct]}</h4>`;
            });
            document.getElementById("showans").innerHTML = "<h2>Correct Answers</h2>" + html;
        }
    })
}

document.addEventListener("DOMContentLoaded", function () {
    pageLoad("userForm.html")
    fetch('./src/questions.json').then(data => data.json()).then((questions) => {
        allQuestions = questions
    })
})


