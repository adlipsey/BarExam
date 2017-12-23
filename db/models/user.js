
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.promise = Promise;

const UserSchema = new Schema({
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
      required: "Password is required"
    },
    scores: [
      {
        type: Schema.Types.ObjectId,
        ref: "Score"
      }
    ]
    });

//User methods for checking and encrypting password
UserSchema.methods = {
  checkPassword: function(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: function(plainTextPassword) {
    return bcrypt.hashSync(plainTextPassword, 10);
  }
}

//Encrypt password before user instance created
UserSchema.pre('save', function(next) {
  if (!this.password) {
    console.log('=NO PASSWORD PROVIDED=');
    next();
  } else {
    this.password = this.hashPassword(this.password);
    next();
  }
  // this.password = this.hashPassword(this.password)
  // next()
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
