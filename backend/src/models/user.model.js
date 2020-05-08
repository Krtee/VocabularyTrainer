// Post.model.js
const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String
    }
});

const User = mongoose.model("User", postSchema);
module.exports = User;