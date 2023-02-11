"use strict"

// get data from API
fetch("https://restcountries.com/v3.1/all").then((response) => response.json()).then((data) => {
    console.log("success", data);
    countryData = data;
}).catch((error) => {
    console.error("Error, error");
})
let countryData;

// secelcted elements
const questionEl = document.getElementById("question");
const flagEl = document.getElementById("flag");

const a1 = document.getElementById("a1").labels[0];
const a2 = document.getElementById("a2").labels[0];
const a3 = document.getElementById("a3").labels[0];
const a4 = document.getElementById("a4").labels[0];

const btnNext = document.getElementById("next");
const btnCheck = document.getElementById("check");
const btnStart = document.getElementById("start");
const btnAgain = document.getElementById("again");

const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highscore");
const chancesEl = document.getElementById("chances");


// saving best result in Local Storage
function highScoreLocalStorage(score) {
    let highScore;
    if (localStorage.getItem("highScore") === null) {
        highScore = [];
    } else {
        highScore = JSON.parse(localStorage.getItem("highScore"))
    }

    highScore[0] = score;
    localStorage.setItem("highScore", JSON.stringify(highScore));
}

// read best score from Local Storage if exist
function highScoreRead() {
    let highScore;
    if (localStorage.getItem("highScore") === null) {
        return 0;
    } else {
        return highScore = (JSON.parse(localStorage.getItem("highScore")))[0]
    }
}

// highscore
let highScore = highScoreRead();
highScoreEl.innerText = highScore;


// user score
let score = 0;
// user lives 0 = endgame
let chances = ["💗", "💗", "💗"];
chancesEl.innerText = chances.join("");
let correctAnws, correctIndex;
let randAnws1, randAnws2, randAnws3, question;



// generate random number 
function randNumber(max) {
    return Math.floor(Math.random() * max);
}

// checking if correct anwser index is differet than rest wrong awswers
function checkNum(max, correctIndex) {
    let i = randNumber(max);
    while (i === correctIndex) {
        i = randNumber(max);
    }
    return i
}

// question about Capital of country
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




// question about flag of couontry
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

// question about population of country
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

// checking if chosen option is correct, adding points if ok or taking lives if wrong
function checkQuesion() {
    let checkedOption;
    document.querySelectorAll(".quiz").forEach((i) => {
        btnNext.classList.remove("hidden");
        btnCheck.classList.add("hidden");
        if (i.checked) {
            checkedOption = i.labels[0].innerText
            console.log(checkedOption);
            i.checked = false;
            let aArr = [a1, a2, a3, a4];
            aArr.forEach((a) => {
                if (correctAnws === a.innerText) {
                    a.classList.add("correct");
                    if (checkedOption === correctAnws && checkedOption === a.innerText) {
                        score++;
                        scoreEl.innerText = "Score: " + score;
                    }
                } else if ((checkedOption !== correctAnws && checkedOption === a.innerText)) {
                    a.classList.add("wrong");
                    chances.pop();
                    chancesEl.innerText = chances.join("");
                    if (chances.length === 0) {
                        btnNext.classList.add("hidden");
                        btnCheck.classList.add("hidden");
                        if (score > highScore) {
                            highScoreLocalStorage(score);
                        }
                        setTimeout(() => {
                            document.querySelector(".game-container").classList.add("hidden");
                            document.querySelector(".end-container").classList.remove("hidden");
                            document.querySelector(".top-img").classList.add("hidden");
                            document.getElementById("result").innerText = score;
                        }, 1000)
                    }
                }
            })

        } else {
            console.log("not picked");
        }
    });

}


// next question function, reset styles and chose random next question
function nextQuestion() {
    let aArr = [a1, a2, a3, a4];
    aArr.forEach(function (i) {
        i.classList.remove("wrong");
        i.classList.remove("correct");
        i.checked = false;
    })
    flagEl.innerHTML = ""
    document.querySelector(".top-img").classList.remove("hidden");
    btnNext.classList.add("hidden");
    btnCheck.classList.remove("hidden");
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

// Start game or Try Again function 
function startGame() {
    document.querySelector(".start-container").classList.add("hidden");
    document.querySelector(".game-container").classList.remove("hidden");
    document.querySelector(".end-container").classList.add("hidden");
    score = 0;
    scoreEl.innerText = "Score: " + score;
    chances = ["💗", "💗", "💗"];
    chancesEl.innerText = chances.join("");
    btnNext.classList.remove("hidden");
    nextQuestion();
}
btnStart.addEventListener("click", startGame);
btnAgain.addEventListener("click", startGame);

// Check question if is correct
btnCheck.addEventListener("click", checkQuesion);

// go to next question
btnNext.addEventListener("click", nextQuestion);


