const EventEmitter = require("events");

const myEmitter = new EventEmitter();

myEmitter.on("newSale", () => {
  console.log("There was a new Sale");
});

myEmitter.on("newSale", () => {
  console.log("There was a new Sale Sale Sale");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There was a ${stock} Sale `);
});

myEmitter.emit("newSale", 9);
