const fs = require("fs");
const logFilePath = `${__dirname}/logs.txt`;

exports.fileLogger = (logDetails) => {
  fs.appendFile(logFilePath, logDetails + "\n", (err) => {
    if (err) {
      console.error("Error logging request details:", err);
    }
  });
};
