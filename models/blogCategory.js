const mongoose = require("mongoose");

var blogCategoryShema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlogCategory", blogCategoryShema);
