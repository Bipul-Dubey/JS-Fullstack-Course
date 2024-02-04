// let b = 30
// var v = 40
// function ScopeVar(){
//     let a = 20
//     b = 50
//     console.log(a,b);
// }

// // console.log(a);
// ScopeVar()
// console.log(b);

// hoisting
// variable
console.log("var a ", a); // return undefined not error
// console.log("let b ",b) // return ReferenceError because accessing before init
// console.log("const c ",c) // return ReferenceError because accessing before init

var a = 20;
let b = 30;
const c = 40;

// functions
console.log(addDeclare(2, 4)); // can access before declaration
// console.log(addExpression(2,4)); // cannot access before init
// console.log(addArrow(2,4)); // cannot access before init

function addDeclare(a, b) {
  return a + b;
}

const addExpression = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;

// this keyword
console.log("Calling this globally", this);

// this inside function
const thisKeyword = function () {
  console.log("this inside function get", this);
};
thisKeyword();

// this inside arrow function
const byThis = () => {
  console.log("this inside arrow", this);
};
byThis();

const obj1 = {
  name: "Bipul",
  lastName: "Dubey",
  getName: function () {
    return `${this.name} ${this.lastName}`;
  },
};

const obj2 = {
  name: "Akash",
  lastName: "Pandey",
  birthYear: 1997,
  calAge: function () {
    console.log("this inside regular function inside object", this);
    // const isDriverReady = function () { // DONOT USE LIKE THIS CREATE BUGS/ERROR
    //   // here this keyword os undefined/from global value
    //   console.log(this);
    //   // return nothings
    //   console.log("obj accessing",this.name);
    // }
    // isDriverReady()

    // solution 1
    const self = this;
    const isDriverReady = function () {
      console.log(self);
      console.log("obj accessing", self.name);
    };
    isDriverReady();

    // solution 2 - arrow function take this properties from global scope/parent scope
    const isDriverReady2 = () => {
      console.log(this);
      console.log("obj accessing arrow function", this.name);
    };
    isDriverReady2();
  },
  geet: () => console.log(`Hey ${this.name}`),
};
// borrow function that uses this keyword
obj2.getName = obj1.getName;

console.log(obj1.getName());
console.log(obj2.getName());

// this will return undefined/nothing because
// arrow function doesnot have this keyword
// it take value from global scope/ parent scope
obj2.geet();
obj2.calAge();

// argument keyword
const addFun = function (a, b, c) {
  console.log("ARG", arguments);
};

addFun(1, 2, 4);

// preserve value of variable - make it non-changeable
// primitive data type
let lastName = "robin";
let oldLastname = lastName;
lastName = "John";
console.log("lastName->", lastName, "oldLastname->", oldLastname);

// objects
john1 = {
  name: "john",
  age: 27,
  member: ["deo", "don"],
};

copyJohn1 = john1;
copyJohn1.age = 30; // it changes the value of original and copy one both because it is pointing to same memory in heap
console.log("original->", john1);
console.log("copy->", copyJohn1);

// shallow copy
john2 = {
  name: "john",
  age: 27,
  member: ["deo", "don"],
};

const copyJohn2 = Object.assign({}, john2);
copyJohn2.age = 30; // it only change value of copy object because pointing to different location
copyJohn2.member.push("johnny"); // issue still exist for object/array inside object/array
// shallow copy only work one level inside object
console.log("original 2->", john2);
console.log("copy 2->", copyJohn2);

// method 2 for shallow copy
john3 = {
  name: "john",
  age: 27,
  member: ["deo", "don"],
};

const copyJohn3 = { ...john3 };
copyJohn3.age = 30; // it only change value of copy object because pointing to different location
copyJohn3.member.push("johnny"); // issue still exist for object/array inside object/array
// shallow copy only work one level inside object
console.log("original 3->", john3);
console.log("copy by spread operator 3->", copyJohn3);

// deepcopy
// method 1 for deep copy object
john4 = {
  name: "john",
  age: 27,
  member: ["deo", "don"],
  getMember: function () {
    console.log(this.member.join(","));
  },
};

// this deep copy does not work when object contains function/date
// date shown but not is exact date function
//  for these issue we can use lodash library
const copyJohn4 = JSON.parse(JSON.stringify(john4));
copyJohn4.age = 30; // it only change value of copy object because pointing to different location
copyJohn4.member.push("johnny"); // issue still exist for object/array inside object/array
// shallow copy only work one level inside object
console.log("original 4->", john4);
console.log("deep copy 4->", copyJohn4); // function removed in deep copy

// method 2
john5 = {
  name: "john",
  age: 27,
  member: ["deo", "don"],
  // getMember: function (){
  //   console.log("function is here");
  // }
};
// does not work if contains function
const johnDeepCopy = structuredClone(john5);
johnDeepCopy.member.push("Happy");
console.log("john5->", john5);
console.log("john deep copy", johnDeepCopy);

// other method may use other library - loadish
//  import library (by cdn/npm      ) then code below
console.log("######################");
john6 = {
  name: "john",
  age: 27,
  member: ["deo", "don"],
  getMember: function () {
    return "function is here";
  },
};
console.log("john 6->", john6);
const deepCopyObj = _.cloneDeep(john6);
deepCopyObj.member.push("roby");
console.log("deepCopyObj->", deepCopyObj);
console.log("deep copy object->", deepCopyObj.getMember());

// shallow copy vs deep copy
