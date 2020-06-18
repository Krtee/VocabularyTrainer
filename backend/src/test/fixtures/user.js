const mongoose = require('mongoose')

const user_one = {
    _id: new mongoose.Types.ObjectId(),
    "username": "testing_one",
    "password": "Password123",
    "right_guesses_in_a_row": 3,
    "forTesting": true
}

const user_two = {
    _id: new mongoose.Types.ObjectId(),
    "username": "testing_two",
    "password": "Password123",
    "right_guesses_in_a_row": 3,
    "forTesting": true
}

const user_three = {
    _id: new mongoose.Types.ObjectId(),
    "username": "testing_three",
    "password": "Password123",
    "right_guesses_in_a_row": 3,
    "forTesting": true
}

const register_user = {
    _id: new mongoose.Types.ObjectId(),
    "username": "test_customer",
    "password": "password123",
    "right_guesses_in_a_row": 3,
    "forTesting": true
}

module.exports = {
    user_one: user_one,
    user_two: user_two,
    user_three: user_three,
    register_user: register_user
}