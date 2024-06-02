// =========== AJAX request ============
// const getTodoById = (id) => {
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://jsonplaceholder.typicode.com/todos/${id}`);
//   // ==== this return a promise =======
//   request.send();

//   request.addEventListener("load", () => {
//     console.log(JSON.parse(request.responseText));
//   });
// };

// getTodoById(1);
// getTodoById(2);
// getTodoById(3);
// getTodoById(4);

// =========== Callback Hell ===========
// setTimeout(() => {
//   console.log("1 sec pass");
//   setTimeout(() => {
//     console.log("2 sec pass");
//     setTimeout(() => {
//       console.log("3 sec pass");
//       setTimeout(() => {
//         console.log("4 sec pass");
//         setTimeout(() => {
//           console.log("5 sec pass");
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// ======= Promises ES6 feature=========
const request = fetch(`https://jsonplaceholder.typicode.com/todos/${1}`);
console.log(request); // fetch api return a promise

// Promises
/*
Promise = An object that is used as a placeholder for the future result of an aysnchronous operation
pros: 
- we no longer need to rely on events and callback passed into aysnchronous 
  functions to handle asynchronous results
- instead of nesting callbacks, we can chain promises for a sequence of 
  asynchronous operations: escaping callback hell


state of promises
- pending - before the future value is available
- settled - asynchronous task has finished either by succes or failure
  -- fullfilled - success, the value is now available
  -- rejected - an error happend

- a promise only consumed when we already have a promise, eg promise returned from fetch API
*/

// ======== consuming promises ======
// const getDataById = (id) => {
//   fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
//     .then((response) => {
//       return response.json();
//     })
//     .then((result) => {
//       console.log(result);
//     });
// };

const getDataById = (id) => {
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(
      (response) => response.json()
      // (err) => alert(err)
    )
    .then((result) => {
      console.log(result);

      return fetch(
        `https://jsonplaceholder.typicode.com/todos/${result?.id + 1}`
      );
    })
    .then(
      (resp) => resp.json()
      // (err) => alert(`${err} in second`)
    )
    .then((data) => {
      console.log(data);
    })
    // beside adding error handling in each then we can add it into final catch block
    .catch((err) => alert(`${err} error in catch block`))
    .finally(() => {
      console.log("execution done");
    });
};
// fetch only throw errors when internet connection not available, error and catch only handle this error

// getDataById(4);

// try {
//   const abc = 10;
//   abc = 20;
//   console.log(abc);
// } catch (error) {
//   console.log("error in try catch", error);
// } finally {
//   console.log("finally block");
// }

console.log("========= Event loop =============");
console.log("test start");
setTimeout(() => {
  console.log("0 sec timer");
}, 0);
// promises executed first becuase it has priority task then other async/callback stack - due to microtask

// Promise.resolve("Resolve Promise 1").then((res) => {
//   console.log(res);
// });
// Promise.resolve("Resolve Promise 2").then((res) => {
//   for (let index = 0; index < 1000000000; index++) {}
//   console.log(res);
// });
// console.log("test end");

console.log("======== creating simple Promisses ============");
const simplePromise = new Promise((resolve, reject) => {
  console.log("Funtion starting now........");
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      return resolve("You win");
    } else {
      return reject("You loss");
    }
  }, 2500);
});

simplePromise
  .then((result) => {
    console.log("result", result);
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

console.log("=========== Promises with Async-Await ============");
const getUserDataById = async (id) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );
  const data = await response.json();
  console.log("Dataaaa", data);
};

console.log("getUserDataById", getUserDataById(1));

console.log("=========== Promises in Parallel============");
// cons - if one promise is reject then all promises is rejected

const getUserData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const getUserDataByIds = async (...ids) => {
  const urls = ids.map((id) =>
    getUserData(`https://jsonplaceholder.typicode.com/todos/${id}`)
  );

  const data = await Promise.all(urls);

  console.log("data", data);
};

// console.log(getUserDataByIds(1, 2, 3, 4));

// Promice.race - only get once result -  the result of one who first get the result from server
// if it get any rejected first then all request is rejected
(async function () {
  const urls = [1, 2, 3, 4].map((id) =>
    getUserData(`https://jsonplaceholder.typicode.com/todos/${id}`)
  );

  const data = await Promise.race(urls);

  console.log("Promise.race - > data", data);
})();

// Promise.allSettle
// return all the promises with its status that it "fulfilled" or "rejected"
(async function () {
  const urls = [1, 2, 3, 4].map((id) =>
    getUserData(`https://jsonplaceholder.typicode.com/todos/${id}`)
  );

  const data = await Promise.allSettled([...urls, Promise.reject("rejected")]);

  console.log("Promise.allSettle -> data", data);
})();
