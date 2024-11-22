const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      unique: false,
    },
    name: {
      type: String,
      unique: false,
    },
    redirectUrl: {
      type: String,
      unique: false,
    },
    visitedHistory: [
      {
        timestamp: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
