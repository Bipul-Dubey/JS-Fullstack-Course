const fs = require("fs");
const crypto = require("crypto");
const os = require("os");

setTimeout(() => console.log("Timer 1 finish"));
setImmediate(() => console.log("Immediate 1 finish"));

const startTime = Date.now();

// change threadpool size
console.log("thread pool size", os.cpus().length);
process.env.UV_THREADPOOL_SIZE = os.cpus().length;
console.log("process.env.UV_THREADPOOL_Size", process.env.UV_THREADPOOL_SIZE);
process.env.UV_THREADPOOL_SIZE = 1;
console.log("process.env.UV_THREADPOOL_Size", process.env.UV_THREADPOOL_SIZE);

fs.readFile("test-file.txt", () => {
  console.log("i/o finished");
  console.log("================");

  setTimeout(() => console.log("Timer 2 finish"));
  setImmediate(() => console.log("Immediate 2 finish"));

  process.nextTick(() => console.log("Process nextTick"));

  crypto.pbkdf2("password", "Salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - startTime, "Pass encrypted 1");
  });
  crypto.pbkdf2("password", "Salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - startTime, "Pass encrypted 2");
  });
  crypto.pbkdf2("password", "Salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - startTime, "Pass encrypted 3");
  });
  crypto.pbkdf2("password", "Salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - startTime, "Pass encrypted 4");
  });
});

console.log("Hello from the top-level code");
