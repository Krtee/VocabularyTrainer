const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const DataSchema = new Schema(
    {
        "english_word": String,
        "translation":
        {
            "ar": String,
            "cs": String,
            "da": String,
            "de": String,
            "el": String,
            "es": String,
            "fi": String,
            "fr": String,
            "he": String,
            "hi": String,
            "it": String,
            "ja": String,
            "ko": String,
            "nb": String,
            "nl": String,
            "pl": String,
            "pt": String,
            "ru": String,
            "sv": String,
            "tr": String,
            "zh": String
        }
    },
    { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("vocab", DataSchema);