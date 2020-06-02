const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
    {
        user_id: String,
        vocab_id: String,
        language_id: String,
        progress: Number,
        right_guesses_in_a_row: Number
    },
    { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("progress", DataSchema);