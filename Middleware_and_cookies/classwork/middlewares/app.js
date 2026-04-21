const express = require("express");
const logger = require("./middlewares/logger");

const app = express();

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello");
});

const MFA = require("./middlewares/mfa");

app.get("/secure", MFA, (req, res) => {
  res.send("Sensitive Data");
});
const sanitize = require("./middlewares/sanitize");

app.use(express.json());
app.use(sanitize);

app.listen(3000);