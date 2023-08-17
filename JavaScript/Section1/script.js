console.log("JavaScript is Fun!! -> External JS file");
console.log("==================Data Type==================");

console.log("Numbers=============");
console.log(1, 1.2, 1.22222222222222222);
console.log("typeof 1, typeof 'a' ==", typeof 1, typeof 'a');

console.log(false, true);
console.log(`this is string litrals ${10 + 2}`)

let year
console.log(year)

year = null
console.log(year);

console.log("type of null = ", typeof null);

console.log("==============Way to declare variable : var, let, const ============");
// var a = 10
{
    var a = 10
}
console.log(a);

let b = 20
{
    let b = 30 // this b is in this scope only
}
console.log(b);

const c = 30
// c = 40 // cannot change
{
    // c = 40 
    const c = 50 // this is in scope only
}
console.log(c);

console.log("=============Operators==============");
console.log(2000 - 400);

console.log("String first" + " " + "String Second");
console.log(2 + "1");
console.log(2 - "1");
console.log("2" + 3);

console.log(5 > 1);

console.log('===============String/Templates Litrals==============');
let litral = "literals"
console.log(`This is ${litral} variable/operation in strings`);

console.log("===========Conditional statement===========");
let age = 15
if (age > 18) {
    console.log("You can Drive. If you have Driving Licence");
}
else if (age == 18) {
    console.log("You can Apply for Driving Licences.");
}
else {
    console.log(`You cannot drive wait for ${18 - age} year`);
}

console.log("==============Type Conversion and Type Coercion==================");
// type conversion
let iyear = '2000'
console.log(Number(iyear), iyear); // original variable is not converted
console.log("try to convert a alpha to number", Number("abc"));

// type coercion
console.log("this is " + 2023 + " year");

console.log("23" - 10);
console.log("23" + 10);
console.log("23" * 10);
console.log("23" / 10);
console.log(2 + 3 + 4 + "5");
console.log("2" + 3 + 4 + 5);

console.log("============truthy and falsy value");
// 5 falsy value = 0, '', undefined, null , NaN -- become false when try to convert into boolean
// other value become true

console.log(Boolean(0))
console.log(Boolean(''))
console.log(Boolean(undefined))
console.log(Boolean(null))
console.log(Boolean(NaN))
console.log(Boolean("123"))

console.log("################## == vs === #####################");
console.log("5 == '5' -> ", 5 == '5'); // doesnot type check
console.log("5 === '5' -> ", 5 === '5'); // check data type also

console.log("############### boolean logical operator #################");
console.log(true && true, false && true);
console.log(true || true, false || true, false || false);
console.log(!true, !false);

console.log("########## switch statement ##############");
const caseValue = 3
switch (caseValue) {
    case 1:
        console.log("case 1");
        break
    case 2:
        console.log("case 2");
        break
    case 3:
        console.log("case 3");
        break
    default:
        console.log("case value is not in case");
}

console.log("############ ternary operator ############");
false ? console.log("if condiiton value is true") : console.log("if condiiton value is false")