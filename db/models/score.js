
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ScoreSchema = new Schema({
    gamePoints: {
      type: Number,
      default: 0
    },
    numRight: {
      type: Number,
      default: 0
    },
    numTotal: {
      type: Number,
      default: 0
    },
    dateCreated: {
      type: Date,
      default: Date.now()
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    game: {
      type: Schema.Types.ObjectId,
      ref: "Game"
    }
    });

  //Set user
  ScoreSchema.methods.setUser = function(userID){
    this.user = userID;
    return this.user;
  };

  //Set game
  ScoreSchema.methods.setGame = function(gameID){
    this.game = gameID;
    return this.game;
  };

var Score = mongoose.model("Score", ScoreSchema);

module.exports = Score;