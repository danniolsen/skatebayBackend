"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.options("*", cors());
app.use(bodyParser.urlencoded({ extended: true }));

const googleKey =
  process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  `${__dirname}/serviceAccount.json`;

admin.initializeApp({
  credential: admin.credential.cert(googleKey)
});

// server is running
app.listen(PORT, () => {
  console.log(`\x1b[36m%s\x1b[0m`, `Server is up on ${PORT}`);
  console.log(`\x1b[36m%s\x1b[0m`, `---------------------------------------`);
});
module.exports = app;
