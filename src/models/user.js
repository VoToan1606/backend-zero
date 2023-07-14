const mongoose = require("mongoose");

const kittySchema = new mongoose.Schema({
  email: String,
  name: String,
  city: String,
});

const User = mongoose.model("user", kittySchema);

module.exports = User;
