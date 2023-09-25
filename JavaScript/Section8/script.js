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
console.log(addDeclare(2,4)); // can access before declaration
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
const obj = {
    name:'bipul',
    getName : function(){
        return this.name
    }
}

console.log(obj);