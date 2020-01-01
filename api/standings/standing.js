const mongoose = require("mongoose");

const standingSchema = new mongoose.Schema(
  {
    season: {
      type: Number,
      required: true
    },
    team: {
      type: Number,
      unique: true,
      required: true
    },
    win: {
      type: Number
    },
    lost: {
      type: Number
    },
    draw: {
      type: Number
    },
    scored: {
      type: Number
    },
    conceded: {
      type: Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Standing", standingSchema);
