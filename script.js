var allQuestions = []
var selectedQuestion = []
const totalQuestionCount = 10
var mark = 0
var currentindex = 0
var userDetails = []
var selectList = []
var checkedInput = 0
var timeset = null

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
            function startTimer(duration) {
                var timer = duration, minutes, seconds;
                document.getElementById("timerBox").textContent = `Time out in: 00 : 00`
                timeset = setInterval(function () {
                    minutes = parseInt(timer / 60, 10);
                    seconds = parseInt(timer % 60, 10);

                    minutes = minutes < 10 ? "0" + minutes : minutes;
                    seconds = seconds < 10 ? "0" + seconds : seconds;

                    document.getElementById("timerBox").textContent = `Time out in: ${minutes} : ${seconds}`

                    if (--timer < 0) {
                        if (--timer < 0) {
                            clearInterval(timeset)
                        }
                        for (let i = 0; i < selectList.length; i++) {
                            if (selectList[i] == selectedQuestion[i].correct) {
                                mark = mark + 1
                            }
                        }
                        pageLoad("result.html")
                    }
                }, 1000);
            }

            startTimer(1 * 60);

            document.getElementById("quizNext").addEventListener("click", (event) => {

                var ansList = document.getElementsByName("answer")
                for (let index = 0; index < ansList.length; index++) {
                    if (ansList[index].checked) {
                        if (ansList[index].value == selectedQuestion[currentindex].correct) {
                            selectList.push(ansList[index].value)
                        } else {
                            selectList.push(ansList[index].value)
                        }
                        checkedInput = 1
                    }
                }

                if (checkedInput == 0) {
                    selectList.push("-1")
                }

                checkedInput = 0

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
                    clearInterval(timeset)
                    for (let i = 0; i < selectList.length; i++) {
                        if (selectList[i] == selectedQuestion[i].correct) {
                            mark = mark + 1
                        }
                        console.log(selectList[i] == selectedQuestion[i].correct);
                    }
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
                selectList.pop()
                showquestion()
            })
        }

        if (path == "result.html") {
            document.getElementById("resultInfo").textContent = `Hello, ${userDetails.userName}, You have scored ${mark} / ${totalQuestionCount}`
            document.getElementById("result__btn").addEventListener("click", function () {
                pageLoad("answer.html")
            })
        }

        if (path === "answer.html") {
            var html = "";
            var optionName = " "
            var sListCount = 0
            selectedQuestion.forEach(function (dt, index) {
                html += `<h1>${index + 1}. ${dt.question}</h1>
                <p>${dt.answers.map((data, idx) => {
                    var col = "black"
                    if (selectList[sListCount] == idx) {
                        col = "red"
                    }
                    if (dt.correct == idx) {
                        col = "lightgreen"
                    }
                    if (idx == 0) {
                        optionName = "a."
                    } else if (idx == 1) {
                        optionName = "b."
                    } else if (idx == 2) {
                        optionName = "c."
                    } else {
                        optionName = "d."
                    }
                    return `<p style='color:${col}'>${optionName} ${data}</p>`
                }).join(" ")}</p>
                <h4>Correct Answer: ${dt.answers[dt.correct]}</h4>`;
                sListCount = sListCount + 1
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


