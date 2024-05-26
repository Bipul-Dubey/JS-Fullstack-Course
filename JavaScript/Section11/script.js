"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDate: [
    "2024-01-15T08:30:00.000Z",
    "2024-02-28T12:45:00.000Z",
    "2024-03-10T14:00:00.000Z",
    "2024-04-22T09:15:00.000Z",
    "2024-05-18T17:30:00.000Z",
    "2024-06-05T11:00:00.000Z",
    "2024-07-19T20:45:00.000Z",
    "2024-08-23T06:00:00.000Z",
  ],
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDate: [
    "2024-03-10T14:00:00.000Z",
    "2024-04-22T09:15:00.000Z",
    "2024-05-18T17:30:00.000Z",
    "2024-06-05T11:00:00.000Z",
    "2024-07-19T20:45:00.000Z",
    "2024-08-23T06:00:00.000Z",
    "2024-09-11T15:30:00.000Z",
    "2024-10-29T13:15:00.000Z",
  ],
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDate: [
    "2024-01-15T08:30:00.000Z",
    "2024-02-28T12:45:00.000Z",
    "2024-03-10T14:00:00.000Z",
    "2024-04-22T09:15:00.000Z",
    "2024-07-19T20:45:00.000Z",
    "2024-08-23T06:00:00.000Z",
    "2024-09-11T15:30:00.000Z",
    "2024-10-29T13:15:00.000Z",
  ],
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDate: [
    "2024-03-10T14:00:00.000Z",
    "2024-04-22T09:15:00.000Z",
    "2024-05-18T17:30:00.000Z",
    "2024-07-19T20:45:00.000Z",
    "2024-08-23T06:00:00.000Z",
  ],
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
const calculateDate = (date) => {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed == 0) return "Today";
  if (daysPassed == 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
};
// ====================== UI ======================
const eurToUsd = 1.1;

const displayMovements = (account, sort = false) => {
  containerMovements.innerHTML = "";
  const movs = sort
    ? account?.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movs.forEach(function (movement, i) {
    const type = movement > 0 ? "deposit" : "withdrawal";

    const dateString = calculateDate(new Date(account.movementsDate[i]));

    const htmlEle = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${dateString}</div>
      <div class="movements__value">${movement} €</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", htmlEle);
  });
};

// calculate current balance
const calculateCurrentBalance = (account = {}) => {
  account.balance = account?.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${account.balance} €`;
};

const calcDisplaySummary = (account = {}) => {
  const income = account?.movements
    .filter((item) => item > 0)
    .reduce((acc, curr) => acc + curr, 0);

  labelSumIn.textContent = `${parseFloat(income).toFixed(2)} €`;

  const outcome = account?.movements
    .filter((item) => item < 0)
    .reduce((acc, curr) => acc + curr, 0);

  labelSumOut.textContent = `${parseFloat(Math.abs(outcome)).toFixed(2)} €`;

  const interest = account?.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * account?.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumInterest.textContent = `${parseFloat(interest).toFixed(2)} €`;
};

// calculate username
const createUserName = (accounts = []) => {
  accounts.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      ?.map((user) => user.at(0))
      .join("");
  });
};
createUserName(accounts);

// == update UI balances ==
function updateUI(currentAccount = {}) {
  displayMovements(currentAccount);
  calculateCurrentBalance(currentAccount);
  calcDisplaySummary(currentAccount);
}

// =================== login ===================
let currentAccount;

// ========== fake login =============
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

// =============== login click ================
btnLogin.addEventListener("click", (e) => {
  // prevent default event - like reload on submit
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => inputLoginUsername.value == acc.username
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display welcome message and UI
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner}`;

    // show UI
    containerApp.style.opacity = 1;

    const now = new Date();
    // labelDate.textContent = now.toLocaleDateString("en-gb");
    const day = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, 0);
    const min = `${now.getMinutes()}`.padStart(2, 0);

    labelDate.textContent = `${day}/${month}/${year} ${hour}:${min}`;

    // clear input after submit
    inputLoginUsername.value = inputLoginPin.value = "";

    // calculation based on login account
    updateUI(currentAccount);
  }
});

// =================== transfer ===================
btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();
  const recieverAcc = accounts.find(
    (acc) => acc.username == inputTransferTo.value
  );
  const sendAmount = Number(inputTransferAmount.value);

  if (
    sendAmount > 0 &&
    recieverAcc &&
    currentAccount.balance >= sendAmount &&
    currentAccount.username != recieverAcc.username
  ) {
    // update amount in account
    currentAccount.movements.push(-sendAmount);
    recieverAcc.movements.push(sendAmount);

    // update timestamp
    currentAccount.movementsDate.push(new Date().toISOString());
    recieverAcc.movementsDate.push(new Date().toISOString());

    updateUI(currentAccount);
  }
  inputTransferTo.value = inputTransferAmount.value = "";
});

// ========== close account =============
btnClose.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    currentAccount.username == inputCloseUsername.value &&
    currentAccount.pin == inputClosePin.value
  ) {
    accounts.splice(
      accounts.findIndex((val) => val.username == currentAccount.username),
      1
    );
  }
  inputCloseUsername.value = inputClosePin.value = "";
  // hide UI
  containerApp.style.opacity = 0;
  labelWelcome.textContent = `Log in to get started`;
});

// ============ loan ===============
btnLoan.addEventListener("click", (e) => {
  e.defaultPrevented();
});

/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
console.log("================LOOPING=================");
console.log("================ forEach =================");
movements.forEach((movement, currIdx, array) => {
  if (movement > 0) {
    console.log("Deposited ", movement);
  } else if (movement == 0) {
    console.log("No Transation");
  } else {
    console.log("Withdraw ", movement);
  }
});

// break or continue statement not work with forEach, map, filter, reduce loop, work with for, for in, for of

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

currencies.forEach((value, key, map) => {
  console.log(`${key} : ${value}`);
});

// Set
const currenciesUnique = new Set(["USD", "EUR", "INR", "USD"]);
currenciesUnique.forEach((value, key, map) => {
  console.log(`${key} : ${value}`);
});

console.log("================ map method =================");
const movementUsd = movements.map((mov) => mov * eurToUsd);

console.log("movementUsd", movementUsd);

console.log("================ reduce method =================");
// reduce method takes a callback function and initial value
// return a single value based on funtion pass in reduce method
// param in callback function
// - accumulator - return last calculated value
// - current value - return current item data
// - index
// - array
//

const balance = movements.reduce((acc, curr, idx, arr) => {
  console.log(`Iteration ${idx} : ${acc} : ${curr}`);
  return acc + curr;
}, 0);

console.log(balance);

// calculate max using reduce
const max = movements.reduce((acc, curr) => {
  if (acc > curr) {
    return acc;
  } else {
    return curr;
  }
}, movements[0]);

console.log("max", max);

//  ============== challenge 2 =============
const calculateAverageHumanAge = (data = []) => {
  const humageAgeFromDog = data?.map((age) => {
    if (age <= 2) {
      return 2 * age;
    } else {
      return 16 + age * 4;
    }
  });

  // eligible = 17+
  const eligible = humageAgeFromDog?.filter((item) => item >= 18);

  // calculate average age
  // const avgAge = eligible.reduce((acc, curr) => acc + curr) / eligible.length;
  const avgAge = eligible.reduce(
    (acc, curr, i, arr) => acc + curr / arr.length,
    0
  );
  console.log("avgAge", avgAge);
};
calculateAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

console.log("======== Some and Every method ========");

console.log("======================= sorting ==================");
const owner = ["Jonas", "Zach", "Adam", "Martha"];
// sort() method
//- first convert everything into string then sort
// - mutate the array
console.log(owner.sort());

console.log(movements);
// console.log(movements.sort());
movements.sort((a, b) => {
  if (a > b) {
    return 1;
  }
  if (b > a) {
    return -1;
  }
});
// movements.sort((a, b) => a - b)
console.log(movements);

// descending order
movements.sort((a, b) => {
  if (a > b) {
    return -1;
  }
  if (b > a) {
    return 1;
  }
});

console.log(movements);
