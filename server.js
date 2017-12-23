//Dependencies
//=====================================
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const router = express.Router();
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const dbConnection = require("./db");
var passport = require("passport");


//Setup Express App
//=====================================
var app = express();
var PORT = process.env.PORT || 8080;

//Set up dev logger
app.use(logger("dev"));

//Setup bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Setup Handlebars view engine
app.set('views', path.join(__dirname, 'views'));
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//Static directory
app.use(express.static(path.join(__dirname, 'public')));

//passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Session
app.use(session({
  secret:'totally secret',
  store: new MongoStore({mongooseConnection: dbConnection}),
  saveUninitialized: false,
  resave: false,
}));


//Setup socket.io
var server = require('http').Server(app);
var io = require('socket.io')(server);

//Routes
//====================================
//var apiRoutes = require("./routes/api-routes.js");
//var appRoutes = require("./routes/app-routes.js")
app.use('/', require('./auth'));
app.use("/", require("./routes/html-routes.js"));
//app.use("/", appRoutes)
//app.use("/api", apiRoutes);


//start server
server.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});


//Socket events
//====================================
io.on('connection', function (socket) {

  socket.on("join room", function(data){
    socket.join(data.room);
  });

//Onclick countdown broadcast
  var count = 21;
  var counter;
  function timer(room) {
  	count = count - 1;
  	if(count < 0){
  		clearInterval(counter);
  		count = 21;
      io.to(room).emit('times up', {done: true});
  		return;
  	}
  	io.to(room).emit('countdown', {left: count});
  }

//Array shuffle
function shuffle(array, cb) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  cb(array);
}

//When receive start timer event
  socket.on('start timer', function(data){
  	if(data.room){
  		counter = setInterval(function(){
        timer(data.room);
      }, 1000);
  	}
  });


//When receive push question event
  socket.on('push question', function(data){
    data.q.incorrect_answers.push(data.q.correct_answer);
    shuffle(data.q.incorrect_answers, function(array){
      data.q.incorrect_answers = array;
      io.to(data.room).emit('do the thing', data);
    });
  });

});
