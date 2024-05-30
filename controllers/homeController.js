const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const dbURL = "mongodb://localhost:27017/usersdb";
const User = require("../models/users");

var usersArray = [];

mongoose.connect(dbURL, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Users" });
});

console.log("in homeController pass 1");
router.showUsers = (req, res) => {
  res.render("users", {
    allUsers: usersArray,
    title: "Users List",
  });
};

console.log("in homeController pass 2");
router.addUsers = (req, res) => {
  var newUserName = req.body.name;
  var newUserGender = req.body.gender;
  console.log("name " + newUserName);
  console.log("gender " + newUserGender);

  let newUser = new User({
    name: newUserName,
    gender: newUserGender,
  });

  newUser
    .save()
    .then((result) => {
      console.log(`New user ${result.name} added successfully`);

      usersArray.push({ name: newUserName, gender: newUserGender });
      res.render("users", {
        allUsers: usersArray,
        title: "Users List",
      });
    })
    .catch((error) => {
      res.render(error);
    });
};

console.log("in homeController pass 3");
router.getNewUser = (req, res) => {
  console.log("in homeController getNewUser");
  res.render("newUser", { title: "New User" });
};
router.postSignUpForm = (req, res) => {
  console.log("in homeController postSignUpForm method");
  res.render("contact", { title: "Contact Us" });
};

module.exports = router;