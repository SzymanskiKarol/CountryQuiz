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
const chancesEl = document.getElementById("chances");
const flagEl = document.getElementById("flag");



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
    correctIndex = randNumber(251);
    question = countryData[correctIndex].capital;
    correctAnws = countryData[correctIndex].name.common;

    randAnws1 = countryData[checkNum(251, correctIndex)].name.common;
    randAnws2 = countryData[checkNum(251, correctIndex)].name.common;
    randAnws3 = countryData[checkNum(251, correctIndex)].name.common;
    let arrToChoose = [correctAnws, randAnws1, randAnws2, randAnws3];
    console.log(arrToChoose, question, correctAnws, correctIndex);

    a1.innerText = arrToChoose.splice(randNumber(arrToChoose.length), 1);
    a2.innerText = arrToChoose.splice(randNumber(arrToChoose.length), 1);
    a3.innerText = arrToChoose.splice(randNumber(arrToChoose.length), 1);
    a4.innerText = arrToChoose.splice(randNumber(arrToChoose.length), 1);
    questionEl.innerText = `${question} is the capital of:`;
}





function flagQuestion() {
    correctIndex = randNumber(251);
    question = countryData[correctIndex].flags.svg;
    correctAnws = countryData[correctIndex].name.common;

    randAnws1 = countryData[checkNum(251, correctIndex)].name.common;
    randAnws2 = countryData[checkNum(251, correctIndex)].name.common;
    randAnws3 = countryData[checkNum(251, correctIndex)].name.common;
    let arrToChoose = [correctAnws, randAnws1, randAnws2, randAnws3];
    console.log(arrToChoose, question, correctAnws, correctIndex);

    a1.innerText = arrToChoose.splice(randNumber(arrToChoose.length), 1);
    a2.innerText = arrToChoose.splice(randNumber(arrToChoose.length), 1);
    a3.innerText = arrToChoose.splice(randNumber(arrToChoose.length), 1);
    a4.innerText = arrToChoose.splice(randNumber(arrToChoose.length), 1);
    flagEl.innerHTML = `<img src="${question}" alt="">`
    questionEl.innerText = `Which country doies this flag belong to?`;
}


function populationQuestion() {
    correctIndex = randNumber(251);
    question = countryData[correctIndex].name.common;
    correctAnws = (countryData[correctIndex].population / 1000000).toFixed(3) + " M";

    randAnws1 = (countryData[checkNum(251, correctIndex)].population / 1000000).toFixed(3) + " M";
    randAnws2 = (countryData[checkNum(251, correctIndex)].population / 1000000).toFixed(3) + " M";
    randAnws3 = (countryData[checkNum(251, correctIndex)].population / 1000000).toFixed(3) + " M";
    let arrToChoose = [correctAnws, randAnws1, randAnws2, randAnws3];
    console.log(arrToChoose, question, correctAnws, correctIndex);

    a1.innerText = arrToChoose.splice(randNumber(arrToChoose.length), 1);
    a2.innerText = arrToChoose.splice(randNumber(arrToChoose.length), 1);
    a3.innerText = arrToChoose.splice(randNumber(arrToChoose.length), 1);
    a4.innerText = arrToChoose.splice(randNumber(arrToChoose.length), 1);
    questionEl.innerText = `How many people live in ${question}?`;
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
            chancesEl.innerText = "Chances: " + chances;
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
    flagEl.innerHTML = ""
    btnCheck.addEventListener("click", checkQuesion, { once: true });
    switch (randNumber(3)) {
        case 0:
            flagQuestion();
            break;
        case 1:
            capitalQuestion();
            break;
        case 2:
            populationQuestion();
            break;
    }
}






