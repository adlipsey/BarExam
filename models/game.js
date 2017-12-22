
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var GameSchema = new Schema({
    name: {
      type: String,
      trim: true,
      required: "Game name is required",
    },
    roomNum: {
      type: String,
    }
    dateCreated: {
      type: Date,
      default: Date.now()
    },
    users: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }]
    });

GameSchema.methods.getRoomNum = function(){
    this.roomNum = this._id.slice(-4);
    return this.roomNum;
  };


var Game = mongoose.model("Game", GameSchema);

module.exports = Game;

