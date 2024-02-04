"use strict";

// #####################==Destructuring Array==############################
// get data from array into variable
const arr = [2, 3, 4, 5];
const [a, b, c, d] = arr;
const [x, y] = arr;
console.log("a->", a, "b->", b, "c->", c, "d->", d);
console.log("x->", x, "y->", y);

// swap variable value
let main = 6;
let seconday = 7;
console.log("main->", main, "secondary->", seconday);
[seconday, main] = [main, seconday];
console.log("main->", main, "secondary->", seconday);

// nested destructuring
const nested = [1, 3, [6, 7]];
const [i, j, [k, l, m = 1]] = nested;
console.log(i, j, k, l, m);

// #####################==Destructuring Object==############################
const obj = {
  name: "bipul",
  age: 25,
  year: 2000,
};

const { name, age, year } = obj;
console.log("name->", name, "age->", age, "year->", year);

// giving name for key name of object and default value for member
const { name: firstName, year: bornYear, member = [] } = obj;
console.log(
  "firstName->",
  firstName,
  "bornYear->",
  bornYear,
  "member->",
  member
);

// #####################==Destructuring in function parameter==############################
// can pass variable length argument
const desFunction = (...values) => {
  // argument received as array
  console.log("inside function", values);
};
desFunction(3, 4, 5);

const desObjectFunction = ({ value, ...otherValues }) => {
  console.log("values of object inside desObjectFunction", value);
  console.log("otherValues of object inside desObjectFunction", otherValues);
};
desObjectFunction({ value: 10, a: "xyz" });

// #####################==Spread Operator==############################
// spread operator work on all iterable like: arrays, strings, maps, sets
// work on object but its only create a copy of 1st level key
const arr1 = [7, 8, 9];
const newArr = [1, 2, 4, ...arr1];
console.log("new arr by spread->", newArr);
console.log(...newArr);

// add 2 array
const arr2 = [...arr, ...newArr];
console.log("arr2->", arr2);

console.log("spread->", ..."Spread", [..."Spread"]);

// #####################==Rest pattern and parameter==############################
// Spread operator because uses on right side of assignment operator (=)
const arrSpread = [1, 2, 3, ...[6, 7, 8]];
console.log("arr spread", arrSpread);

// Rest operator because uses on left side of assignment operator (=)
const [ele1, ele2, ...otherEle] = arrSpread;
console.log("rest operator->", ele1, ele2, otherEle);

// rest for objects
const johnny = {
  a1: "a",
  b1: "b",
  c: "c",
  d: "d",
};
console.log("johnny obj", johnny);
// const { a1, b1, ...otherKeys } = johnny;
const { a1, b1, ...otherKeys } = johnny;
console.log("johnny obj rest->", a1, b1, otherKeys);

// #####################==Short Circuiting (&& and ||)==############################
console.log(`################===OR===################`);
// OR return first true value, if all are falsy then return last falsy value
console.log("" || "John" || "Lase" || 0); // return first true value
console.log(`################===AND===################`);
// AND return with value if it find any falsy value or if all value is truthy then return last true value
console.log(0 && "AND");
console.log(1 && true && "John" && 0);
console.log(1 && true && "John" && 10);

console.log(
  `################===?? (Nullish coalesing operator)===################`
);
// work on concept of null and undefined not on falsy value
console.log(null ?? "nullish");
console.log(undefined ?? "undefined value");
