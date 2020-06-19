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

const get_id_for_username = {
    "userName": "test_customer"
}

const get_id_for_nonexistent_username = {
    "userName": "/&$-§W_b[f-ü<R+'#{#-#!§$;=h}r[>j;_|%&:?)(:/%1-8f5]}-0;w_G47B-"
}

const user_info_to_change = {
    "username": "W5#NZ3~yG72P@gW",
    "password": "new_password",
    "right_guesses_in_a_row": 1
  }

module.exports = {
    user_one: user_one,
    user_two: user_two,
    user_three: user_three,
    register_user: register_user,
    get_id_for_username: get_id_for_username,
    get_id_for_nonexistent_username: get_id_for_nonexistent_username,
    user_info_to_change: user_info_to_change
}