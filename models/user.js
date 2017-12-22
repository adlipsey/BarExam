
var bcrypt = require("bcrypt-nodejs");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
SALT SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    username: {
      type: String,
      trim: true,
      unique: true,
      required: "Username is required"
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please enter a valid e-mail address"],
      required: "Email is required"
    },
    password: {
      type: String,
      trim: true,
      required: "Password is required",
      validate: [
      function(input) {
        return input.length >= 6;
      }, "Password should be longer than 6 characters"
      ]
    },
    scores: [
      {
        type: Schema.Types.ObjectId,
        ref: "Score"
      }
    ]
    });

//Encrypt password before user created
UserSchema.pre("save", function(next){
  var user = this;
  //Only encrypt if password is new or has been changed
  if(!user.isModified("password")){
    return next();
  }
  //Generate encryption key
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
    if(err) return next(err);
    //Encrypt based on key
    bcrypt.hash(user.password, salt, function(err, hash){
      if(err) return next(err);
      //Overwrite password
      user.password = hash;
      next();
    });
  });
});

//Compare and validate password
  UserSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
  };

var User = mongoose.model("User", UserSchema);

module.exports = User;
