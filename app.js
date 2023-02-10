"use strict"

fetch("https://restcountries.com/v3.1/all").then((response) => response.json()).then((data) => {
    console.log("success", data);
    countryData = data;
}).catch((error) => {
    console.error("Error, error");
})
// secelcted elements
const questionEl = document.getElementById("question");
const a1 = document.getElementById("a1").labels[0];
const a2 = document.getElementById("a2").labels[0];
const a3 = document.getElementById("a3").labels[0];
const a4 = document.getElementById("a4").labels[0];
const btn = document.getElementById("rand");
const btnNext = document.getElementById("next");
const btnCheck = document.getElementById("check");
const scoreEl = document.getElementById("score");



btnNext.addEventListener("click", nextQuestion);

let countryData;
let score = 0;
let chances = 3;
let correctAnws, correctIndex;
let randAnws1, randAnws2, randAnws3, question;


function randNumber(max) {
    return Math.floor(Math.random() * max);
}

function checkNum(max, correctIndex) {
    let i = randNumber(max);
    while (i == correctIndex) {
        i = randNumber(max);
    }
    return i
}

function capitalQuestion() {
    correctIndex = randNumber(250);
    question = countryData[correctIndex].capital;
    correctAnws = countryData[correctIndex].name.common;

    randAnws1 = countryData[checkNum(250, correctIndex)].name.common;
    randAnws2 = countryData[checkNum(250, correctIndex)].name.common;
    randAnws3 = countryData[checkNum(250, correctIndex)].name.common;
    let arrToChoose = [correctAnws, randAnws1, randAnws2, randAnws3];
    console.log(arrToChoose, question, correctAnws, correctIndex);

    a1.innerText = arrToChoose.splice(randNumber(arrToChoose.length), 1);
    a2.innerText = arrToChoose.splice(randNumber(arrToChoose.length), 1);
    a3.innerText = arrToChoose.splice(randNumber(arrToChoose.length), 1);
    a4.innerText = arrToChoose.splice(randNumber(arrToChoose.length), 1);
    questionEl.innerText = `${question} is the capital of:`;
}
function flagQuestion() {
    correctIndex = randNumber(250);
    question = countryData[correctIndex].capital;
    correctAnws = countryData[correctIndex].name.common;

    randAnws1 = countryData[checkNum(250, correctIndex)].name.common;
    randAnws2 = countryData[checkNum(250, correctIndex)].name.common;
    randAnws3 = countryData[checkNum(250, correctIndex)].name.common;
    let arrToChoose = [correctAnws, randAnws1, randAnws2, randAnws3];
    console.log(arrToChoose, question, correctAnws, correctIndex);

    a1.innerText = arrToChoose.splice(randNumber(arrToChoose.length), 1);
    a2.innerText = arrToChoose.splice(randNumber(arrToChoose.length), 1);
    a3.innerText = arrToChoose.splice(randNumber(arrToChoose.length), 1);
    a4.innerText = arrToChoose.splice(randNumber(arrToChoose.length), 1);
    questionEl.innerText = `${question} is the capital of:`;
}


function checkQuesion() {
    let checkedOption;
    document.querySelectorAll(".quiz").forEach((i) => {
        if (i.checked) {
            checkedOption = i.labels[0].innerText
            console.log(checkedOption);
            i.checked = false;
        }
    });
    let aArr = [a1, a2, a3, a4];
    aArr.forEach((a) => {
        if (correctAnws === a.innerText) {
            a.classList.add("correct");
            if (checkedOption === correctAnws && checkedOption === a.innerText) {
                score++;
                scoreEl.innerText = "Score: " + score;
            }
        } else if (checkedOption !== correctAnws && checkedOption === a.innerText) {
            a.classList.add("wrong");
            chances--;
            chancesEl.innerText = "Chances: " + score;
        }
    })
}

btnCheck.addEventListener("click", checkQuesion, { once: true });

function nextQuestion() {
    let aArr = [a1, a2, a3, a4];
    aArr.forEach(function (i) {
        i.classList.remove("wrong");
        i.classList.remove("correct");
        i.classList.remove("block");
    })
    flagQuestion();
}






