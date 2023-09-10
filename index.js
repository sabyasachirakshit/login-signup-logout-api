const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./config/config").get(process.env.NODE_ENV);

const app = express();

app.use(bodyparser.urlencoded({ extended: "false" }));
app.use(bodyparser.json());
app.use(cookieParser());

//database connection
mongoose.Promise = global.Promise;
mongoose.connect(
  db.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) console.log(err);
  }
);

app.get("/", function (req, res) {
  res.status(200).send("Welcome to login, sign up api");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`app is live at ${PORT}`);
});
