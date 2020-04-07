"use strict";
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const admin = require("firebase-admin");
const { Auth } = require("../services/auth");
const { SpotList } = require("../services/spotList");
const { Saved } = require("../services/saved");
const { Remove } = require("../services/remove");
const { Moderation } = require("../services/moderation");
const { CreateSpot } = require("../services/createSpot");
const { User } = require("../services/user");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.options("*", cors());

const googleKey =
  process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  `${__dirname}/serviceAccount.json`;

admin.initializeApp({
  credential: admin.credential.cert(googleKey)
});

// endpoint access
Auth(app, admin);
SpotList(app, admin);
Saved(app, admin);
Remove(app, admin);
Moderation(app, admin);
CreateSpot(app, admin, multer, fs);
User(app, admin);

// server is running
app.listen(PORT, () => {
  console.log(`\x1b[36m%s\x1b[0m`, `Server is up on ${PORT}`);
  console.log(`\x1b[36m%s\x1b[0m`, `---------------------------------------`);
});
module.exports = app;
