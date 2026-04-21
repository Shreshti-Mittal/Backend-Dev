const fs = require("fs");

const logger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    const log = `${new Date().toISOString()} | ${req.method} | ${req.originalUrl} | ${res.statusCode} | ${duration}ms\n`;

    fs.appendFile("requests.log", log, (err) => {
      if (err) console.error(err);
    });
  });

  next();
};

module.exports = logger;