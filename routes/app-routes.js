
var db = require("../models");
var express = require('express');
var router = express.Router();
    // Register
    router.get("/user", function(req, res) {
      res.render("user");
      });

    router.post("/user", function(req, res) {
      var name  =req.body.name;
      var GameId =req.body.GameId;
  
    req.checkBody('name','Name is required').notEmpty();
    req.checkBody('GameId','GameId is required').notEmpty();
    req.body.userId = 1

    var errors = req.validationErrors();
    if(errors.length > 0){
      console.log('===============there was an error======>')
      res.render('user-game',{
        errors:errors
      })
 
      }else {
       db.Team.create(req.body).then(function(team) {
        if(!team) throw "error";
           db.User.findById(req.body.userId).then(function(user){
            user.setTeams([team]).then(function(){
                res.redirect("/usergame");
            });
          })
      
        });
      }
    });

module.exports = router;
