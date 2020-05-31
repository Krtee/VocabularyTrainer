const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const DataSchema = new Schema(
    {
        username: String,
        password: String,
        progress: [
            {
                "ar": [
                    {
                        "vocab_id": 0,
                        "progress": 3,
                        "right_guesses_in_a_row": 0
                    }
                ]
            },
            {
                "cs": [
                    {
                        "vocab_id": 0,
                        "progress": 3,
                        "right_guesses_in_a_row": 0
                    }
                ]
            },
            {
                "da": [
                    {
                        "vocab_id": 0,
                        "progress": 3,
                        "right_guesses_in_a_row": 0
                    }
                ]
            },
            {
                "de": [
                    {
                        "vocab_id": 0,
                        "progress": 3,
                        "right_guesses_in_a_row": 0
                    }
                ]
            },
            {
                "el": [
                    {
                        "vocab_id": 0,
                        "progress": 3,
                        "right_guesses_in_a_row": 0
                    }
                ]
            },
            {
                "es": [
                    {
                        "vocab_id": 0,
                        "progress": 3,
                        "right_guesses_in_a_row": 0
                    }
                ]
            },
            {
                "fi": [
                    {
                        "vocab_id": 0,
                        "progress": 3,
                        "right_guesses_in_a_row": 0
                    }
                ]
            },
            {
                "fr": [
                    {
                        "vocab_id": 0,
                        "progress": 3,
                        "right_guesses_in_a_row": 0
                    }
                ]
            },
            {
                "he": [
                    {
                        "vocab_id": 0,
                        "progress": 3,
                        "right_guesses_in_a_row": 0
                    }
                ]
            },
            {
                "hi": [
                    {
                        "vocab_id": 0,
                        "progress": 3,
                        "right_guesses_in_a_row": 0
                    }
                ]
            },
            {
                "it": [
                    {
                        "vocab_id": 0,
                        "progress": 3,
                        "right_guesses_in_a_row": 0
                    }
                ]
            },
            {
                "ja": [
                    {
                        "vocab_id": 0,
                        "progress": 3,
                        "right_guesses_in_a_row": 0
                    }
                ]
            },
            {
                "ko": [
                    {
                        "vocab_id": 0,
                        "progress": 3,
                        "right_guesses_in_a_row": 0
                    }
                ]
            },
            {
                "nb": [
                    {
                        "vocab_id": 0,
                        "progress": 3,
                        "right_guesses_in_a_row": 0
                    }
                ]
            },
            {
                "nl": [
                    {
                        "vocab_id": 0,
                        "progress": 3,
                        "right_guesses_in_a_row": 0
                    }
                ]
            },
            {
                "pl": [
                    {
                        "vocab_id": 0,
                        "progress": 3,
                        "right_guesses_in_a_row": 0
                    }
                ]
            },
            {
                "pt": [
                    {
                        "vocab_id": 0,
                        "progress": 3,
                        "right_guesses_in_a_row": 0
                    }
                ]
            },
            {
                "ru": [
                    {
                        "vocab_id": 0,
                        "progress": 3,
                        "right_guesses_in_a_row": 0
                    }
                ]
            },
            {
                "sv": [
                    {
                        "vocab_id": 0,
                        "progress": 3,
                        "right_guesses_in_a_row": 0
                    }
                ]
            },
            {
                "tr": [
                    {
                        "vocab_id": 0,
                        "progress": 3,
                        "right_guesses_in_a_row": 0
                    }
                ]
            },
            {
                "zh": [
                    {
                        "vocab_id": 0,
                        "progress": 3,
                        "right_guesses_in_a_row": 0
                    }
                ]
            }
        ]
    },
    { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", DataSchema);