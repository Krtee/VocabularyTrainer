const mongoose = require('mongoose')

const vocab_one = {
    _id: new mongoose.Types.ObjectId(),
    "language_id, ": "de",
    "english_word": "cat"
}

const vocab_two = {
    _id: new mongoose.Types.ObjectId(),
    "language_id, ": "fr",
    "english_word": "dog"
}

const vocab_three = {
    _id: new mongoose.Types.ObjectId(),
    "language_id, ": "de",
    "english_word": "house"
}


const add_new_word = {
    _id: new mongoose.Types.ObjectId(),
    language_id: "fr",
    english_word: "cat"
}

const add_new_word_wrong_language_id = {
    _id: new mongoose.Types.ObjectId(),
    language_id: "zz",
    english_word: "example"
}

const add_new_wrong_word = {
    _id: new mongoose.Types.ObjectId(),
    language_id: "de",
    english_word: "teem"
}

module.exports = {
    vocab_one: vocab_one,
    vocab_two: vocab_two,
    vocab_three: vocab_three,
    add_new_word: add_new_word,
    add_new_word_wrong_language_id: add_new_word_wrong_language_id,
    add_new_wrong_word: add_new_wrong_word
}