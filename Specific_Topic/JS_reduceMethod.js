// reduce Method in JavaScript
/* reduce method executes a reducer function (callback function that executed on each element of given array),
return a single value */
// It executed from left to right
// doest not execute for empty array and not change original array
// first callback, there is no return value from previous callback
// Normally array index 0 is used for initial value (if initial value is not provided), and iteration start from index 1,
//  and if initail value is provided then start from index 0
// basic syntax
// Array().reduce(function (accumulator, currentValue, currentIndex, arr) {},initialValue);
const arr = [1, 2, 3, 4];
let sum = arr.reduce(function (accumulator, currentValue, currentIndex, arr) {
  console.log("accumulator", accumulator);
  console.log("currentValue", currentValue);
  console.log("currentIndex", currentIndex);
  console.log("arr", arr);
  return accumulator + currentValue;
});

console.log("after sum reduce complete", sum);

console.log(
  "-------------------remove duplicate from an array----------------------"
);
const arr1 = [18, 18, 21, 1, 1, 51, 18, 21, 5, 18, 7, 10];

const uniqueArr1 = arr1.reduce((acc, currVal, currIdx, _) => {
  if (acc.indexOf(currVal) == -1) {
    acc.push(currVal);
  }
  return acc;
}, []); // provided empty array for acc so that used as array

console.log("unique array ", uniqueArr1);

console.log(
  "------------------------Grouping Objects by a property---------------"
);
const people = [
  { name: "John", age: 21 },
  { name: "Oliver", age: 55 },
  { name: "Michael", age: 55 },
  { name: "Dwight", age: 19 },
  { name: "Oscar", age: 21 },
  { name: "Kevin", age: 55 },
];

const groupedByProperty = (object = {}, propertyBy) => {
  return object.reduce((acc, currVal, currIdx, _) => {
    const key = currVal[propertyBy];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(currVal);
    return acc;
  }, {});
};
console.log("groupedByProperty", groupedByProperty(people, "age"));