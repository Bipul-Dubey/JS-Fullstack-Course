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

// assignment operator
let assgn = 0;

// assgn ||= "Not Avail";
// assgn ??= "Not avail";
assgn &&= "Not avail";
console.log("assignment", assgn);

// for of
console.log("-----------------for of - loop ------------------");
const arr3 = ["a", "b", "c", "d"];
console.log("arr3", arr3);
for (const item of arr3) {
  console.log("item", item);
}

for (const item of arr3.entries()) {
  console.log("item", item);
}

console.log("-----------------Enhanced Object------------------");
const obj1Address = {
  street: "Via padova",
};
const obj1 = {
  name: "John",
  lastname: "Deo",
  obj1Address, // if have to keep same name as object
  address: obj1Address, // if have to change key name others
  // function in object
  print: function () {
    console.log(this.name);
  },
  printAll() {
    console.log(this.name, this.lastname);
  },
};

console.log("object", obj1);
obj1.print();
obj1.printAll();

console.log("---------------------Optional Chaining (?.)-------------------");
// optional chaining work only for undefined/null check not for falsy value like ("", 0)
// console.log("without optional chaining", obj1.address.street_number.number);
console.log("with optional chaining", obj1?.address?.street_number?.number);

console.log("----------------------looping object-----------------------");
const obj2 = {
  day1: "Mon",
  day2: "Tue",
  day3: "Wed",
  day4: "Thur",
  day5: "Fri",
  day6: "Sat",
  day7: "Sun",
};

console.log("obj", obj2);
console.log("Obj key list", Object.keys(obj2));
console.log("obj values list", Object.values(obj2));
console.log("obj entries", Object.entries(obj2)); // get list of key value [[key,value],...]

/* 
Let's continue with our football betting app!
GOOD LUCK 😀
*/

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

/* 1. Loop over the game.scored array and print each player name to
the console, along with the goal number
(Example: "Goal 1: Lewandowski") */
for (const item of Object.entries(game.scored)) {
  console.log(`Goal ${Number(item?.at(0)) + 1}: ${item?.at(1)}`);
}

/*
2. Use a loop to calculate the average odds and log it to the console 
(We already studied how to calculate averages, you can go check if you
 don't remember)
*/
let sum = 0;
for (const item of Object.values(game.odds)) {
  sum += item;
}
console.log("Average", sum / Object.values(game.odds)?.length);

/*
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). 
HINT: Note how the odds and the game objects have the same property names 😉
*/
for (const [team, point] of Object.entries(game.odds)) {
  const teamStr = team == "x" ? "draw" : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr}: ${point}`);
}
/*
BONUS: Create an object called 'scorers' which contains the names of 
the players who scored as properties, and the number of goals as the 
value. In this game, it will look like this:
{
  Gnarby: 1,
  Hummels: 1,
  Lewandowski: 2
}
*/
let scorers = {};
for (const item of game.scored) {
  if (!scorers[item]) {
    scorers[item] = 1;
  } else {
    scorers[item] += 1;
  }
}
console.log("scorers", scorers);

console.log("----------------Sets------------------");
/*  set doesnot contains dubplicate values, 
if an array pass with duplicate value it remove the duplicate value
and it doesnot change original array */
const orderSet = new Set(["a", "b", "c", "d", "c"]);
console.log("orderSet", orderSet.size, orderSet);
console.log("has", orderSet.has("c"));

const dubplicateArray = [1, 2, 5, 6, 7, 3, 1];
console.log("dubplicateArray Set", new Set(dubplicateArray));
console.log("dubplicateArray", dubplicateArray);

console.log("--------------------Maps---------------------------");
/* 
The Map is Data Structure object holds key-value pairs and remembers 
the original insertion order of the keys.
Any value (both objects and primitive values) may be used as 
either a key or a value.
*/
const map1 = new Map();
map1.set("key1", "Val1"); // set return map object array
map1.set(true, "This is true value");
const newmap1 = map1.set("key2", ["value2"]);
console.log("new map 1", newmap1);

console.log("has method", newmap1.has("key2")); // check keys exist or not
console.log("get method", newmap1.get(true));

const question = new Map([
  ["question", "What is best language in the world?"],
  [1, "C"],
  [2, "C++"],
  [3, "Java"],
  [4, "Python"],
  [5, "JavaScript"],
  ["correct", 3],
  [true, "Correct Answer"],
  [false, "Try Again"],
  [false, "Try Again 2"],
]);
console.log("question", question);

for (const item of question) {
  console.log("item", item);
}

for (const [key, value] of question) {
  console.log("key", key, "value", value);
}

console.log("value by key", question.get(false));

console.log("===================String===============");
// string is immutable, string method return new string
const exampleStr = "123456789 Tab";

// 0-based index
console.log("exampleStr[10]", exampleStr[8]); // if index not present return undefined
console.log("at a index", exampleStr.charAt(9)); // if index not present return

console.log("get value of index", exampleStr.indexOf("tab")); // case sensitive

console.log("slice from back specify number of letter", exampleStr.slice(-3));

// convert snake_case to camelCase

// first create capitalize funtion
const capitalizeSentence = (sentence) => {
  if (!sentence) return;
  const wordList = sentence?.split(" ");
  let capitalized = [];
  for (const word of wordList) {
    capitalized.push(
      word?.replace(word?.charAt(0), word?.charAt(0)?.toUpperCase())
    );
  }
  return capitalized?.join(" ");
};

const snakeToCamelCase = (snake_case) => {
  const splitToSentence = snake_case?.split("_")?.join(" ");
  const capitalize = capitalizeSentence(splitToSentence);
  const camelCase = capitalize?.split(" ")?.join("");
  return camelCase;
};

console.log("camel case word", "snake_case");
console.log("snakeToCamelCase", snakeToCamelCase("snake_case"));
