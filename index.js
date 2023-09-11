const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./config/config").get(process.env.NODE_ENV);
const User = require("./models/user");
const { auth } = require("./middlewares/auth");

const app = express();

app.use(bodyparser.urlencoded({ extended: "false" }));
app.use(bodyparser.json());
app.use(cookieParser());

//database connection
mongoose.Promise = global.Promise;
mongoose
  .connect(db.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.get("/", function (req, res) {
  res.status(200).send("Welcome to login, sign up api");
});

//adding new user (sign up route)

app.post("/api/register", function (req, res) {
  //taking a user
  const newUser = new User(req.body);

  if (newUser.password != newUser.password2)
    return res.status(400).json({ message: "password not match" });

  User.findOne({ email: newUser.email }, function (err, user) {
    if (user)
      return res.status(400).json({ auth: false, message: "email exists" });

    newUser.save((err, doc) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ success: false });
      }
      res.status(200).json({
        success: true,
        user: doc,
      });
    });
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`app is live at ${PORT}`);
});
