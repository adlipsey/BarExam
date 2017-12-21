var db = require("../models");
//var passport = require("../config/passport");
//var localStrategy = require("passport-local").Strategy;
var express = require('express');
var router = express.Router();
    
      
// Register user
/*router.post("/register", function(req, res) {
  var email =req.body.email;
  var username =req.body.username;
  var password =req.body.password;
  // Validation
  req.checkBody('email','Email is required').notEmpty();
  req.checkBody('email','Email is not valid').isEmail();
  req.checkBody('username','Username is required').notEmpty();
  req.checkBody('password','password is required').notEmpty();
  req.checkBody('password2','paswords do not match').equals(req.body.password);
  var errors = req.validationErrors();
  if(errors.length > 0){
    console.log('there was an error')
    res.render('register',{
      errors:errors
    });
  }
  else {
    db.User.create(req.body).then(function(err,user) {
      if(err) throw err;
        console.log(user);
    });
    res.redirect("/login");
  }
});


        router.post('/login',
          passport.authenticate('local', {successRedirect:'/user-dashboard', failureRedirect:'/login', failureFlash: true}),
          function(req, res){
            console.log(req.body);
            req.flash('success_msg', "Login Successful")
            console.log("user login res:" + res);
            res.redirect('/user-dashboard');
        });

        router.post('/barlogin',
          passport.authenticate('local', {successRedirect:'/bar-dashboard', failureRedirect:'/login', failureFlash: true}),
          function(req, res){
            console.log(req.body);
            req.flash('success_msg', "Login Successful")
            console.log("bar login res:" + res);
            res.redirect('/bar-dashboard');
        });

      router.get('/logout', function(req, res){
        req.logout();
        req.flash('success_msg', 'you are logged out');
        res.redirect('/login');
      });

      // Get UserId
    //      router.get("/all", isAuthenticated, function (req, res) {
    //         db.User.findAll({
    //         where: {
    //           UserId: req.user.id
    //         }
    //     });
    // });*/

module.exports = router;
