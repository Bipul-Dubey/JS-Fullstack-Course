console.log("====================Section 14 - OOPS ======================");
/*
-Class - a blueprint
- Class are a template that have some variable(properties) and method(behaviour), from a class we can create multiple instance(Object)
 -- Abstraction
 --- ignoring or hiding details that donot matter, allowing user to
    get an overview perspective of the thing we're implementing
 -- Encapsulation 
 --- Keeping properties and method private inside the class,
     so they are not accessible from outside class.
     Some methods can be exposed as a public
 -- Inheritance
 --- When we have 2 or more class and one class inherit some property
    or method from another class
 -- Polymorphism (many shape/form)
 --- a child class can overwrite a method it inherited from a parent class
*/

/*
-Class implementation in js - 3 ways
-- Contructor funtions
---> technique to create object from a function
---> this is how built-in object like Arrays, Maps or sets are actually implemented

-- ES6 Classes
--> Modern alternative to contructor function syntax
--> "Syntactic sugar": behind the scenes, ES6 classes work exactly like contrutor functions
--> ES6 classes do NOT behave like classes in "classical OOP"

-- object.create()
--> the easiest and most strightforward way of linking an object to a prototype object
*/

console.log("================ Contructor funtions ====================");
const Person = function (firstname, lastname) {
  console.log("this", this);
  this.firstname = firstname;
  this.lastname = lastname;

  // not a best practice to create method inside constructor function
  // if we create n number object then it create n number copy of function
  this.fullNameInside = function () {
    return this.firstname + " " + this.lastname;
  };
};

const raj = new Person("Raj", "kumar");
console.log("raj", raj);
// console.log("raj", raj.fullname());

/* -- it not work on arrow functions
1. new {} is created
2. function is called, this = {}
3. {} linked to prototype
4. function automatically return {}
*/

console.log("check instance is made from class:", raj instanceof Person);

console.log("================ Prototypes ====================");
// this will create a single copy for a class and can call by object created by that constructor function
// and THIS key will assign to that object
Person.prototype.fullname = function () {
  return this.firstname + " " + this.lastname;
};
console.log("raj", raj);
console.log("person prototypes: ", Person.prototype);
console.log("raj", raj.fullname());
console.log("checking the prototypes is belong to that class or not ");
console.log(raj.__proto__ == Person.prototype);
console.log(Person.prototype.isPrototypeOf(raj));

// raj object create by class Person when raj object called with fullNameInside it just called
// but when fullname is called which is prototype so object first try to find that function
// in  contructor function it cannot be found then it search for it in prototypes
// -- work as prototype chain
const arr = [1, 2, 3, 4, 4, 5];
console.log(arr.__proto__.__proto__);

// ========= inheritence ==========
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

console.log("=======coding challenge ===============");
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
};

Car.prototype.brake = function () {
  this.speed -= 5;
};

const car1 = new Car("BMW", 120);
const car2 = new Car("Mercedes", 95);

console.log(car1);
car1.accelerate();
console.log(car1);
car1.brake();
console.log(car1);

console.log("================= ES6 Classes ============");
// class expression
// const Personcl = class {}

// class declaration
class PersonCl {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }

  // methods will be added to .prototype property
  calcFullname() {
    return this.firstname + " " + this.lastname;
  }
}

const demo = new PersonCl("Demo", "class");
console.log(demo);
console.log(demo.calcFullname());

console.log(demo.__proto__);
console.log(PersonCl.prototype);

PersonCl.prototype.greet = function () {
  return `Hey ${this.firstname} !!`;
};

console.log(demo.greet());

/*
1. Classes are not hoisted
2. class are first-class citizen
3. classes are executed in strict mode - either we enable or not
*/
console.log("======== Setter and Getter ===========");
// ES5 feature to set and get data from object class only
// function in classes that set and get data for a class object/class only
const account = {
  owner: "Sushant",
  movement: [23, 235, 54, 23, 54],
  fullname: "",
  get latest() {
    return this.movement.slice(-1).pop();
  },

  set latest(mov) {
    this.movement.push(mov);
  },

  // validate that it is fullname - exceed maximum call limit because try to set fullname at 2 place
  // that us why use another variable name
  set fullname(name) {
    this._fullname = name;
  },

  // but after using another variable name we cannot access fullname that is why created  a getter function
  get fullname() {
    return this._fullname;
  },
};

console.log(account.latest);
console.log(account.movement);
account.latest = 102;
console.log(account.movement);
account.fullname = "bipul";
console.log(account);
console.log(account.fullname);

console.log("======== static method =========");
class PersonCl2 {
  constructor(fullname) {
    this.fullname = fullname;
  }

  // Instance method
  // methods will be added to .prototype property
  set fullName(name) {
    this.fullname = name;
  }

  // static method only call on class itself not on methods/property
  // not added in .prototype property
  // static class methods are defined on the class itself.
  // You cannot call a static method on an object, only on an object class.
  static hey() {
    console.log("hey static here");
  }
}

const p = new PersonCl2();
p.fullName = "Bipul";
PersonCl2.hey();
console.log(p);

console.log("============ object.create ===========");
const Women = {
  calcAge: function () {
    console.log(2024 - this.birthYear);
  },

  init(firstname, birthYear) {
    this.firstname = firstname;
    this.birthYear = birthYear;
  },
};

const sarah = Object.create(Women);
console.log(sarah);
sarah.firstname = "Sarah";
sarah.birthYear = 2000;
console.log(sarah);
sarah.calcAge();

const mady = Object.create(Women);
console.log(mady);
mady.init("Mady", 2003);
console.log(mady);
mady.calcAge();

// =================================
class CarCl {
  constructor(brand, speed) {
    this.brand = brand;
    this.speed = speed;
  }

  get speed() {
    return this._speed;
  }

  set speed(speed) {
    this._speed = speed;
  }
}

const bmw = new CarCl("BMW", 230);
console.log(bmw);
console.log(bmw.speed);
bmw.speed = 20;
console.log(bmw);

// ======== Inheritence =============
// ======== Inheritence in Constructor function =========
const PersonCf = function (firstname, birthYear) {
  this.firstname = firstname;
  this.birthYear = birthYear;
};

PersonCf.prototype.calcAge = function () {
  return 2024 - this.birthYear;
};

const StudentCf = function (firstname, birthYear, course) {
  // this.firstname = firstname;
  // this.birthYear = birthYear;
  // PersonCf(firstname,birthYear) // undefined value becuase here not creating with new so doesnot received this keyword
  // new PersonCf(firstname, birthYear); // new is also not work here
  PersonCf.call(this, firstname, birthYear); // call method set this keyword bydefault then we pass arguments
  this.course = course;
};

// linking prototype - it must be done before creating new prototype in child class function
StudentCf.prototype = Object.create(PersonCf.prototype);

StudentCf.prototype.calcCode = function () {
  return this.course + this.firstname;
};

StudentCf.prototype.introduce = function () {
  return `My name is ${this.firstname}, I am born in ${this.birthYear} and I study ${this.course}`;
};

const mike = new StudentCf("Mike", 2000, "Computer");
console.log(mike.introduce());

console.log(PersonCf.prototype);
console.log(StudentCf.prototype);

// making PersonCf prototype also prototype of student
// StudentCf.prototype = PersonCf.prototype;
console.log(StudentCf.prototype);

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

// StudentCf prototype now point to PersonCf to fix this issue we should assign
StudentCf.prototype.constructor = StudentCf;

console.dir(StudentCf.prototype.constructor);

// == prototype chaining
console.log(mike instanceof StudentCf);
console.log(mike instanceof PersonCf);
console.log(mike instanceof Object);

// ========= challenge 3 ==========
const CarCf = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

CarCf.prototype.accelerate = function () {
  this.speed += 10;
};

CarCf.prototype.brake = function () {
  this.speed -= 5;
};

const ElectricCarCf = function (make, speed, currentBatteryPer) {
  CarCf.call(this, make, speed);

  this.battery = currentBatteryPer;
};

ElectricCarCf.prototype = Object.create(CarCf.prototype);
console.log(ElectricCarCf.prototype);

const ev = new ElectricCarCf("Tesla", 120, 23);
console.log(ev);

ElectricCarCf.prototype.currentBatteryPercent = function () {
  return `${this.battery} %`;
};

ElectricCarCf.prototype.chargeBattery = function (chargeTo) {
  this.battery = chargeTo;
};

ElectricCarCf.prototype.accelerate = function () {
  this.speed += 20;
  this.battery--;
};

console.log(ev);
ev.accelerate();
console.log(ev);

console.log("============= Inheritence, Encapsulation in ES6 ==============");
// ========== Encapsulation =========== not fully working in js but in-pogress by js
// 1. Public fields/property
// 2. Private fields/property - prefix by #
// 3. Public methods
// 4. Private methods - prefix by #
// {there is also property and methods with static keyword}
class User {
  constructor(fullName) {
    this.fullName = fullName;
  }

  getFullName() {
    return this.fullName;
  }
}

class Account extends User {
  // private field
  #movements = [];
  #pin;

  constructor(fullname, currency, pin) {
    super(fullname); // mandotary while extending class to call parent class constructor
    this.currency = currency;
    this.#pin = pin;
    // this.movement = [];
    // this.locale = window.navigator.locale;
  }

  deposit(amount) {
    this.#movements.push(amount);
    return this;
  }

  withdraw(amount) {
    this.deposit(-amount);
    return this;
  }

  requestLoan(amount) {
    if (this.#approveLoan()) {
      console.log("Loan aprroved");
      this.deposit(amount);
      return this;
    }
  }

  getMovements() {
    return this.#movements;
  }

  // private method
  #approveLoan() {
    return true;
  }
}
const acc1 = new Account("Johny", "INR", 1111);
console.log(acc1.getFullName());
console.log(Account.prototype);
acc1.requestLoan(1000);
acc1.requestLoan(90);
acc1.requestLoan(20);
console.log(acc1);
console.log(acc1.getMovements());

// ============ CHAINING METHODS ===============
// we can do like we do on Array but here also method must return accordingly
acc1.deposit(10000).requestLoan(1200).withdraw(1100).withdraw(55);
console.log(acc1.getMovements());

// ============= challenge =============
