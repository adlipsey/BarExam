

var db = require("../models");
var request = require("request");

module.exports = function(app){

  app.post("/api/users", function(req, res) {
    db.Users.create(req.body).then(function(dbUser) {
      console.log("Created a user: "+dbUser)
      res.json(dbUser);
    });
  });

<<<<<<< HEAD
  app.post("/register", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      access:   req.body.group1
    }).then(function() {
      res.redirect(307, "/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
    });
  });

};
// var db = require("../models");
// var passport = require("../config/passport");
// 
// module.exports = function(app) {
//   app.post("/api/login", passport.authenticate("local"), function(req, res) {
//     res.json("/members");
//   });
//
//   app.post("/api/signup", function(req, res) {
//     console.log(req.body);
//     db.Users.create({
//       email: req.body.email,
//       password: req.body.password
//     }).then(function() {
//       res.redirect(307, "/api/login");
//     }).catch(function(err) {
//       console.log(err);
//       res.json(err);
//     });
//   });
//
//   app.get("/logout", function(req, res) {
//     req.logout();
//     res.redirect("/");
//   });
//
//   app.get("/api/user_data", function(req, res) {
//     if (!req.user) {
//       res.json({});
//     }
//     else {
//       res.json({
//         email: req.user.email,
//         id: req.user.id
//       });
//     }
//   });
//
// };

	//API call to get questions
	app.post("/api/qstn", function(req, res){
		// console.log(req.body);
		getQs(req, function(data){
			res.json({questions: data});
		});
	});

	function getQs(req, cb){
		var url = "https://opentdb.com/api.php?amount="+ req.body.qspr;
		var game = [];
		var roundCat;
		var i = 0
		for(; i < req.body.rs; i++){
			// console.log(Date.now(), i)
			roundCat = req.body['r'+ i + 'cat'];
			if(roundCat){
				url += "&category="+roundCat
				request(url, function(err, resp, body){
					if(err) console.log(err);
					body = JSON.parse(body);
					game.push(body.results);
					// console.log(game);
					// console.log("-----")
				});
					// console.log("========")

			}
			else{
				request(url, function(err, resp, body){
					body = JSON.parse(body);
					game.concat(body.results);
				});
			}
		}
		setTimeout(function(){
			cb(game)
		},i * 1000)
	}
};


	//API call to get questions
	app.post("/api/qstn", function(req, res){
		aaa.getQs(req, function(data){
			res.json({questions: data});
		});
	});

	function Trivia() {
		this.game = [];

		function getQs(req, cb){
			//Set up base API url to get number of questions per round
			var url = "https://opentdb.com/api.php?amount="+ req.body.qstnsPerRound;
			var catCode;
			var i = 0;
			//For each round, make an API call
			for(; i < req.body.rounds; i++){
				catCode = req.body['r'+ i + 'cat'];
				//If a category code is present, append category to API url
				if(catCode){
					url += "&category="+ catCode;
					request(url, function(err, resp, body){
						if(err) console.log(err);
						body = JSON.parse(body);
						this.game.push(body.results);
					});
				}
				//If not, call without category (will select from all categories)
				else{
					request(url, function(err, resp, body){
						if(err) console.log(err);
						body = JSON.parse(body);
						this.game.push(body.results);
					});
				}
			}
			//After delay, execute callback
			setTimeout(function(){
				cb(this.game)
			},i * 1000);
		}
	}

	var aaa = new Trivia();

//End of export
};

