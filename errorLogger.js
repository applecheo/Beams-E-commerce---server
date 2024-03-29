const fs = require("fs");

const errorLogger = (err, req, res, next) => {
  if (err) {
    fs.appendFile("ErrorLogger.txt", err.stack + "\n", (error) => {
      if (error) {
        console.log("Could not log the errors");
      }
    });
    if (err.status) {
      res.status(err.status);
    } else {
      res.status(500);
    }
    res.json({ message: err.message });
  }
  next();
};

module.exports = errorLogger;
