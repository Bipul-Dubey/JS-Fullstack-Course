"use strict";

// default arguments
const bookings = [];
// we can use parameter in calculating default parameter,
// but that must be defined above
const createBooking = (flightName, number = 1, price = 50 * number) => {
  const booking = {
    flightName,
    number,
    price,
  };
  bookings.push(booking);
};

createBooking("AIR01", 2);
// pass undefined to skill a parameter
createBooking("AIR02", undefined, 75);
console.log("bookings", bookings);

// string can manipulate in funtion
const flight = "LH123";
const exp = {
  name: "Jonas",
  passport: 1234345645756,
};
const checkIn = (flightNum, passenger) => {
  flightNum = "LH999";
  // it change to original object because object pass to same memory
  passenger.name = "Mr. " + passenger.name;
  console.log("flightNum", flightNum, passenger);
};

checkIn(flight, exp);
console.log(flight);
console.log(exp);

console.log(
  "===============First class funtion and HIGH-ORDER FUNCTION================="
);
// JS treats funtions as first-class funtion
// this means that functions are simply values
// funtions are just another "type" of object
// -- store funtions in variables or property
// -- pass funtions as arguments to Other funtions
// -- return funtions from funtions
// -- call methods on funtions -> bind

// ========= Higher Order Funtions ===========
/* -> A funtions that receives another funtion as an argument,
 that return a new funtions or both */
// -> This is only possible because first-class funtion

// ========= Funtions that accepts other funtions ===============
const oneWord = (str) => {
  return str.replace(/ /g, "").toLowerCase();
};

const upperFirstWord = (str) => {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};

const transformer = function (str, fn) {
  console.log("Orginal String: ", str);
  console.log("Transformed String: ", fn(str));
  console.log("Transformed By: ", fn.name);
};

transformer("javascript is the best! - upperFirstWord", upperFirstWord);
transformer("javascript is the best! - oneWord", oneWord);

// ================== funtions returning funtions (closures) =================
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greetHello = greet("Hello");
greetHello("Bipul");

greet("Hi")("Bipul");

// ============= call and apply method for funtion =============
const airLine = {
  name: "AirLine",
  code: "AL",
  bookings: [],
  book(seat, passenger) {
    console.log(
      `Hi ${passenger} your ticket for ${this.name} with code ${this.code} booked`
    );
    this.bookings.push({
      flight: this.name + this.code,
      passengerName: passenger,
      seat: seat,
    });
  },
};

airLine.book(101, "Bipul");
console.log(airLine.bookings);

const airIndia = {
  name: "AirIndia",
  code: "AI",
  bookings: [],
};

/* 
The call() method calls the function directly and sets this to the first argument passed to the call
method and if any other sequences of arguments preceding the first argument are passed to the call 
method then they are passed as an argument to the function.
*/
// create a function variable
const book = airLine.book;
// call a funtion with argument
book.call(airIndia, 102, "Dubey");

/*
The apply() method calls the function directly and sets this to the first argument passed to the apply
method and if any other arguments provided as an array are passed to the call method then they are passed
as an argument to the function.
*/
// apply - work same as call but takes array as argument
book.apply(airIndia, [103, "Vaibhav"]);

// this can simply done with call
book.call(airIndia, ...[104, "Rohit"]);
console.log("airIndia", airIndia);

// ================== Bind method ======================
// Bind a funtion to an object with this keywords
const bookAI = book.bind(airIndia);
bookAI(105, "Steve");
bookAI(106, "Tony");

/*
The bind() method creates a new function and when that new function is called it set this keyword
to the first argument which is passed to the bind method, and if any other sequences of arguments
preceding the first argument are passed to the bind method then they are passed as an argument to 
the new function when the new function is called. 
*/
// bind a parameter with a value
const bookAI2 = book.bind(airIndia, 111);
bookAI2("Manish");
console.log("airIndia", airIndia);

// =============== Immediately Invoked Function Expressions (IIFE) =======================
// run once/call one - call by itself

const runOnce = function () {
  console.log("This will run on call");
};

runOnce();

// call once by itself
(function () {
  console.log("call by itself");
})();

(() => {
  console.log("call by itself");
})();

// closures
// - A function has access to the variable environment (VE) of the execution context in which it was created.
// - Closure: VE attached to the function, exactly as it was at the time and place the function was created.
const secureCount = function () {
  let count = 0;
  return function () {
    count++;
    console.log("count ", count);
  };
};

const increseCount = secureCount();

increseCount();
increseCount();
increseCount();

// definition
/* A closure is closed-over VE of the execution context in which a function was created,
 even after that execution is gone.*/

// or

/* A closure gives a function access to all the variable of its parent function, even after that parent function
 has returned. The function keeps a reference to its outer scope, which preserves the scope chain throughtout time.*/
console.dir(increseCount);

// other 2nd example where closer can be generated
let x;

const g = function () {
  let a = 20;
  x = function () {
    console.log("closeer example 2", a * 2);
    return (a = a * 2);
  };
};

g();
x();
console.log(x());

// other 3rd example where closer can be generated - by timeout function
const timeoutFuntion = (number) => {
  let group = number / 3;
  setTimeout(() => {
    console.log("This timeout is executed", group);
  }, 1000);
  console.log("funtion log executed");
};

timeoutFuntion(120);

// =================== coding challenge =====================
// example of closure
(function name(params) {
  const header = document.querySelector("h1");

  document.querySelector(
    "body",
    addEventListener("click", () => {
      header.style.color = "red";
    })
  );
})();
