var q1 = document.getElementsByName("Q1")
var q2 = document.getElementsByName("Q2")
var q3 = document.getElementsByName("Q3")
var button = document.getElementById("submit")
var section = document.getElementById("section")
let crtq1ans = "Paris"
let crtq2ans = "England"
let crtq3ans = "Newzealand"
let userq1 = ""
let userq2 = ""
let userq3 = ""
let userpoints = 0

const anscheck = () => {
    if (userq1 == crtq1ans) {
        userpoints++
    }
    if (userq2 == crtq2ans) {
        userpoints++
    }
    if (userq3 == crtq3ans) {
        userpoints++
    }
}

const result = () => {
    const score = document.createElement("div")
    const crtans = document.createElement("div")
    crtans.innerHTML = `<p class="text-xl mt-5 font-extrabold text-red-700"> 1. What is the capital of France?</p><p class="text-xl mt-5 font-extrabold text-cyan-700">Correct Ans: Paris</p><p class="text-xl mt-5 font-extrabold text-red-700"> 2. Cricket is originated from which country?</p><p class="text-xl mt-5 font-extrabold text-cyan-700">Correct Ans: England</p><p class="text-xl mt-5 font-extrabold text-red-700">3. Which country is first celebrate New year?</p><p class="text-xl mt-5 font-extrabold text-cyan-700">Correct Ans: Newzealand</p>`
    score.innerHTML = `<h1 class="m-5 text-yellow-500 font-bold text-4xl">Your Score: ${userpoints}</h1>`
    section.append(crtans)
    section.append(score)
    button.remove()
}

button.addEventListener("click",function(event){
    event.preventDefault()
    for (let i = 0; i < q1.length; i++) {
        if (q1[i].checked === true) {
            userq1 = q1[i].value
        }
    }
    for (let i = 0; i < q2.length; i++) {
        if (q2[i].checked === true) {
            userq2 = q2[i].value
        }
    }
    for (let i = 0; i < q3.length; i++) {
        if (q3[i].checked === true) {
            userq3 = q3[i].value
        }
    }
    anscheck()
    result()
    console.log(userpoints);
})

