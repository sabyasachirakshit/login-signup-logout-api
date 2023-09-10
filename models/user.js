var mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    maxlength: 200,
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 200,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
