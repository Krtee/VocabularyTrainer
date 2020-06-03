const mongoose = require('mongoose')

const user_one = {
    _id: new mongoose.Types.ObjectId(),
	"firstName": "customer_one",
	"password": "Password123"
}

const user_two = {
    _id: new mongoose.Types.ObjectId(),
	"username": "customer_two",
	"password": "Password123"
}

const user_three = {
    _id: new mongoose.Types.ObjectId(),
	"username": "admin",
	"password": "admin"
}

const register_user = {
    _id: new mongoose.Types.ObjectId(),
    username: "register_customer",
    password: "password123"
}

module.exports = {
    user_one: user_one,
    user_two: user_two,
    user_three: user_three,
    register_user: register_user
}