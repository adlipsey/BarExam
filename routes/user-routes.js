var db = require("../models");
var passport = require("../config/passport");
var express = require('express');
var router = express.Router();
var username;
    
  router.post("/register", function(req, res) {
    console.log(req.body);
    username = req.body.username;
    db.User.save({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.render("login", {data:{username: username, fromSignUp: true}});
    }).catch(function(err) {
      console.log(err);
      res.json(err);
    });
  });

module.exports = router;
