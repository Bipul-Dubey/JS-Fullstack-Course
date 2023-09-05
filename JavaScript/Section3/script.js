'use strict'

// function - function declaration
function funcName() {
    console.log("this is function")
}


funcName()
funcName()


// function with parameter
function funcParemeter(para1,para2){
    console.log(`${para1} and ${para2}`);
}

funcParemeter("para 1",'para 2')


// named parameter - default value
function funcNamedPara({name,age=0}){
    console.log(`${name} is ${age} year old.`);
}

// passing value to named parameter function
funcNamedPara({name:'bipul',age:20})

// function with return type
function funcReturn(number){
    return number*10
}

let newNumber = funcReturn(10)
console.log(newNumber);


// anonymous function - function expression
const calcAdd = function (num1,num2){
    console.log(num1+num2);
}

calcAdd(5,23)

// function declaration can be called before it declared but function expression only after it declared

// arrow function
// const varName = parameter/(para's) => return expression
const multiple = num => num*num

console.log(multiple(5));

// arrow function declaration-2
// if we have multiple expression
const arrowFunc = num => {
    const sqr = num*num
    return sqr+num
}

console.log(arrowFunc(4));

// arrow function if multiple parameter
const arrowFunc2 = (num1,num2) =>{
    return num1+num2
}

console.log(arrowFunc2(5,6));

// arrow function vs Normal function
// - arrow function doesnot get 'this' keyword

console.log("======================= Array =========================");
const arr1 = ['Deepak','Ritik','Saurav','Akash',1,2,3.3,true,false,null,undefined]
console.log(arr1);

const arr2 = new Array(1,2,3)
console.log(arr2);

// access array element
console.log(arr1[1]);

// array methods
console.log(arr1.length);

arr1[2] = 1000
console.log(arr1)

const newLength = arr1.push("Himanshu")  // add element in last , and return new length
console.log(arr1,newLength);

const newLength2 = arr1.unshift("at start") // add element at start , and return new length
console.log(arr1);

arr1.pop() // remove last element , and return removed element
console.log(arr1);

arr1.shift() // remove the first element , and return removed element
console.log(arr1);

console.log(arr1.indexOf(1)); // return index of given element if not present return -1

console.log(arr1.includes("bipul")) // return bool element present or not

console.log("========================= Object ==========================");

const ids = {
    1:"bipul",
    2:"manish",
    3:"satish"
}

console.log(ids);

const bipul = {
    firstName:"Bipul",
    lastName:"Dubey",
    job:"Developer",
    tech:["JavaScript","React","Next js","Flutter","Go","Docker"],
    calTechCount: function (){
        return this.tech.length
    }
}

// retrive data from object - dot vs bracket Notation
console.log(bipul);

console.log(bipul.firstName);
console.log(bipul["firstName"]);

console.log(bipul.tech);

console.log(bipul.home);
console.log(bipul['home']); // if key not present return undefined which use as false

// object methods
console.log(bipul.calTechCount());

console.log(Object.keys(bipul)); // return list of key of given object
console.log(Object.values(bipul)); // return list of value of given object

console.log("=============== iterating ===================");
for(let i=0;i<10;i++){
    console.log(i);
}
for(let i=0;i<10;){
    console.log(i++);
}
let i=0
for(;i<10;){
    console.log(i++);
}
let rep=0
for(;;){
    console.log(rep++);
    if(rep==10){
        // if break not use then it keep running the loop
        break
    }
}

let arr = ["item1",'item2','item3','item4','item5']
for(let i=0;i<arr.length;i++){
    console.log(arr[i]);
}

// for in loop - loop through the properties of an object
const obj = {fname:"John",lname:"Dow",age:25,isMale:true}
for(let key in obj){
    console.log(key);
    console.log(obj[key]);
}

// for of loop - loops through the values of an iterable
const cars = ["BMW", "Volvo", "Mini"];
for(let x of cars){
    console.log(x);
}

// loop through string
let language = "JavaScript";
for(let c of language){
    console.log(c);
}

// forEach() loop - method calls a function once for each array element
const numbers = [45, 4, 9, 16, 25];
numbers.forEach((value,index,array) =>{
    console.log(value);
    console.log(index);
    console.log(array);
})

// while loop
let idx=0
while (idx<arr.length){
    console.log(arr[idx]);
    idx++
}

// do while
let index=0
do {
    console.log(index);
    index++
}while(index<10)