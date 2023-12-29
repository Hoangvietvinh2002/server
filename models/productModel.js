const mongoose = require("mongoose");

var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
    },
    slug: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },
    desctription: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    brand: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
      select: false,
    },
    sold: {
      type: Number,
      default: 0,
      select: false,
    },
    images: [],
    color: {
      type: String,
      require: true,
    },
    ratings: [
      {
        star: Number,
        comment: String,
        postedby: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    totalrating: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
