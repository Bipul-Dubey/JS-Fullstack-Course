const fs = require("fs");
const http = require("http");
const url = require("url");
const {
  replaceProductDetails,
  replateProductCard,
} = require("./modules/replaceTemplates");

//////////////////////// FILE System /////////////////////////////

// === readFileSync, writeFileSync - Blocking - works synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log("text in", textIn);

// const textOut = `This is what we know about the avocado: ${textIn}. -- Created on ${Date.now()}\n`;
// // fs.writeFileSync("./txt/output.txt", textOut); // re-write file data
// fs.appendFileSync("./txt/output.txt", textOut); // this append data into file

// Non-Blocking: aynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("Error1: ", err);

//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     if (err) return console.log("Error2: ", err);

//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       if (err) return console.log("Error3: ", err);

//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         if (!err) {
//           console.log("Your file has been written");
//         } else {
//           console.log("error: ", err);
//         }
//       });
//     });
//   });
// });
// console.log("reading file async way");

//////////////////////// SERVER /////////////////////////////
const productData = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const jsonProductData = JSON.parse(productData);
const productPage = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);
const overviewPage = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const overviewProductCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  switch (pathname?.toLowerCase()) {
    case "/":
    case "/overview":
      res.writeHead(200, {
        "Content-type": "text/html",
      });

      // filling data in card
      const cardsHTML = jsonProductData
        ?.map((el) => replaceProductDetails(overviewProductCard, el))
        ?.join("");

      const productCardHTML = replateProductCard(overviewPage, cardsHTML);
      res.end(productCardHTML);
      break;
    case "/product":
      res.writeHead(200, {
        "Content-type": "text/html",
      });

      const product = jsonProductData?.find((el) => query.id == el.id);
      const productDetails = replaceProductDetails(productPage, product);

      res.end(productDetails);
      break;
    case "/api":
      res.writeHead(200, {
        "Contet-type": "application/json",
      });
      res.end(productData);
      break;

    default:
      res.writeHead(404, {
        "Content-type": "text/html",
      });
      res.end("<h1>Page Not found! 404</h1>");
      break;
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listing to requests on port 8000");
});
