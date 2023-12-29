const mongoose = require("mongoose");

var couponShema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
    index: true,
  },
  expity: {
    type: Date,
    require: true,
  },
  discount: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("Counpon", couponShema);
