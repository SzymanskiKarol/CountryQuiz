"use strict"

// secelcted elements
const questionEl = document.getElementById("question");
const a1 = document.getElementById("a-1");
const a2 = document.getElementById("a-2");
const a3 = document.getElementById("a-3");
const a4 = document.getElementById("a-4");
const btn = document.querySelector("button");

btn.addEventListener("click", capitalQuestion);

let countryData;

function randNumber(max) {
    return Math.floor(Math.random() * max);
}

function capitalQuestion() {
    let randAnws1, randAnws2, randAnws3, correctAnws, question, correctIndex;
    correctIndex = randNumber(250);
    question = countryData[correctIndex].capital;
    correctAnws = countryData[correctIndex].name.common;

    randAnws1 = countryData[randNumber(250)].name.common;
    randAnws2 = countryData[randNumber(250)].name.common;
    randAnws3 = countryData[randNumber(250)].name.common;
    let arrToChoose = [correctAnws, randAnws1, randAnws2, randAnws3];
    a1.innerText = arrToChoose.splice(randNumber(arrToChoose.length), 1);
    a2.innerText = arrToChoose.splice(randNumber(arrToChoose.length), 1);
    a3.innerText = arrToChoose.splice(randNumber(arrToChoose.length), 1);
    a4.innerText = arrToChoose.splice(randNumber(arrToChoose.length), 1);
    questionEl.innerText = `${question} is the capital of:`;
}






fetch("https://restcountries.com/v3.1/all").then((response) => response.json()).then((data) => {
    console.log("success", data);
    countryData = data;
}).catch((error) => {
    console.error("Error, error");
})
