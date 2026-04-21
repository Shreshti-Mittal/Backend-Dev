const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  lastLogin: Date,
  lastLogout: Date,
  lastActive: Date
});

// update last active before save
userSchema.pre("save", function (next) {
  this.lastActive = new Date();
  next();
});

// login method
userSchema.methods.login = function () {
  this.lastLogin = new Date();
  return this.save();
};

// logout method
userSchema.methods.logout = function () {
  this.lastLogout = new Date();
  return this.save();
};

module.exports = mongoose.model("User", userSchema);