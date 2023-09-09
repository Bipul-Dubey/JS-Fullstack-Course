"use strict";

const getRandomNumber = () => {
  return Math.trunc(Math.random() * 20) + 1;
};

let highscore = 0;
let score = 20;
let secretNumber = getRandomNumber();
document.querySelector(".number").textContent = secretNumber;

document.querySelector(".again").addEventListener("click", () => {});

document.querySelector(".check").addEventListener("click", () => {
  const guessNumber = Number(document.querySelector(".guess").value);
  if (!guessNumber) {
    document.querySelector(".message").textContent = "Enter a Number";
  }
});
