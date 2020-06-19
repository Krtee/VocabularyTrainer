const mongoose = require('mongoose')

const vocab_one = {
    _id: new mongoose.Types.ObjectId(),
    "language_id, ": "de",
    "english_word": "cat",
    "forTesting": true
}

const vocab_two = {
    _id: new mongoose.Types.ObjectId(),
    "language_id, ": "fr",
    "english_word": "dog",
    "forTesting": true
}

const vocab_three = {
    _id: new mongoose.Types.ObjectId(),
    "language_id, ": "de",
    "english_word": "house",
    "forTesting": true
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

const register_testuser = {
    /* _id: new mongoose.Types.ObjectId(), */
    _id: "000",
    "username": "test_customer_###",
    "password": "password123",
    "right_guesses_in_a_row": 3,
    "forTesting": true
}

const progress_object = {
    language_id: "fr",
    english_word: "cat",
    user_id: "000"
};

const increase_progress = {
    user_id: "000",
    english_word: "cat",
    lang_id: "fr",
};

const get_all_progress_objects = {
    user_id: "000",
    lang_id: "fr",
};

module.exports = {
    vocab_one: vocab_one,
    vocab_two: vocab_two,
    vocab_three: vocab_three,
    add_new_word: add_new_word,
    add_new_word_wrong_language_id: add_new_word_wrong_language_id,
    add_new_wrong_word: add_new_wrong_word,
    register_testuser: register_testuser,
    progress_object: progress_object,
    increase_progress: increase_progress,
    get_all_progress_objects: get_all_progress_objects

}