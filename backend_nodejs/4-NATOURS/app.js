const express = require("express");
const fs = require("fs");
const app = express();

// === middlewares ===
app.use(express.json());

// === serving static files ===
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  const logDetails = `
    Date: ${new Date().toLocaleString()}
    Host/IP: ${req.ip}
    Method: ${req.method}
    Pathname: ${req.originalUrl}
    body: ${JSON.stringify(req.body)}
  `;

  // Log the details to logs.txt
  const logFilePath = `${__dirname}/logs.txt`;
  fs.appendFile(logFilePath, logDetails + "\n", (err) => {
    if (err) {
      console.error("Error logging request details:", err);
    }
  });
  next();
});

//  ====== routing ========
const userRouter = require("./routes/userRoutes");
const tourRouter = require("./routes/tourRoutes");

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
