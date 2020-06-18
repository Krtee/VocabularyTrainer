const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const DataSchema = new Schema(
    {
        "username": String,
        "password": String,
        "right_guesses_in_a_row": Number, 
        "forTesting": Boolean
    },
    { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", DataSchema);