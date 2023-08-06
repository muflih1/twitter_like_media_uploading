require('dotenv').config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Media = require("./models/Media");
const Tweet = require("./models/Tweet");

const app = express();

app.use("/media", express.static(path.join(__dirname, "/media")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .set("strictQuery", true)
  .connect("mongodb://127.0.0.1:27017/twitter")
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log(e));

app.use("/api/user", require('./routes/user'));
app.use("/api/media", require('./routes/media'));
app.use("/api/tweet", require('./routes/tweet'));

app.listen(3050, () => console.log("Server listening"));
