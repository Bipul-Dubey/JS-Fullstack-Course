// ================== Number ===================
// in js it store number in form of floating value, 64bit, base 2
console.log(Number("23") == +"23");

// parsing
// parseInt method convert any string that start with numeric value into number
console.log(parseInt("25.5rem"));
console.log(parseFloat("23rem"));

console.log(isNaN("20rem"));
console.log(isFinite("10e100"));

console.log(Number.isInteger(12));

console.log("==============Rounding===========");
// sqrt
console.log(Math.sqrt(2), 2 ** (1 / 2));
// max, min
// random , trunc
console.log(Math.random() * 10);

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

console.log(randomInt(11, 13));

// trunc, round, ceil, floor
// toFixed, toPrecision - return string
console.log((1.2).toFixed(3));
console.log((1.2).toPrecision(5));

// bigint
console.log(2 ** 53 - 1, Number.MAX_SAFE_INTEGER);

console.log("big int", 82389479237498273498237493749n + 1n);

console.log("========================= Date time ========================");
console.log(new Date());

const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "numeric",
  year: "numeric",
  // weekday: "long"
};

const locale = navigator.language; // get user current locale language from browser
console.log(locale);
const format = new Intl.DateTimeFormat(locale, options).format(new Date());
console.log(format);

console.log("================Number formater================");
const num = 1223423534;

const formatN = new Intl.NumberFormat("en-GB").format(num);
console.log(formatN);

const optionN = {
  // style: "unit",
  // unit: "celsius"
  // unit: "mile-per-hour"
  style: "currency",
  currency: "EUR",
};
const lang = "de-DE";
const formatN2 = new Intl.NumberFormat(lang, optionN).format(num);
console.log(formatN2);

let timerText = document.querySelector("#timeText");
const startTimer = (timeInSecond = 10) => {
  let timer;
  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(Math.trunc(time % 60)).padStart(2, 0);

    const timeString = `${min}:${sec}`;
    // where text have to show
    timerText.textContent = timeString;

    if (time == 0) {
      clearInterval(timer);
    }

    time--;
  };

  // set time
  let time = timeInSecond;

  tick();
  timer = setInterval(tick, 1000);
};
