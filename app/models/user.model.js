const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    idSql: String,
    email: String,
    password: String,
    username: String,
    nationalId: String
  })
);

module.exports = User;
