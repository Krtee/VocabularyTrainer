const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const DataSchema = new Schema(
    {
        id: Number,
        language_id: Number,
        english_word: String,
        translation: String
    },
    { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("vocab", DataSchema);