const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter the book title"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Please enter the book author"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const BookModel = mongoose.model("Book", BookSchema);

module.exports = BookModel;
