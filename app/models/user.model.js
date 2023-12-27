const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    id_sql: String,
    email: String,
    password: String,
    role: String,
    nationalId: String
  })
);

module.exports = User;
