const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    user_id: Number,
    vocab_id: Number,
    progress: Number,
    right_guesses_in_a_row: Number
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Progress", DataSchema);