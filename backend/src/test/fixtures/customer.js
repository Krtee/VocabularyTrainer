const mongoose = require('mongoose')

const customer_one = {
    _id: new mongoose.Types.ObjectId(),
	"firstName": "customer_one",
	"lastName": "customer_one",
	"email": "customer_one@email.com",
	"password": "Password123"
}

const customer_two = {
    _id: new mongoose.Types.ObjectId(),
	"firstName": "customer_two",
	"lastName": "customer_two",
	"email": "customer_two@email.com",
	"password": "Password123"
}

const customer_three = {
    _id: new mongoose.Types.ObjectId(),
	"firstName": "customer_three",
	"lastName": "customer_three",
	"email": "customer_three@email.com",
	"password": "Password123",
	"password2": "Password123"
}

// -------REGISTER-------
const register_customer = {
    _id: new mongoose.Types.ObjectId(),
    firstName: "register_customer",
    lastName: "register_customer",
    email: "register_customer@mail.com",
    password: "password123",
    password2: "password123"
}

const register_customer_with_invalid_email = {
    _id: new mongoose.Types.ObjectId(),
    firstName: "invalid_email",
    lastName: "invalid_email",
    email: "invalid_email.com",
    password: "password123"
}

const register_customer_with_invalid_password = {
    _id: new mongoose.Types.ObjectId(),
    firstName: "invalid_password",
    lastName: "invalid_password",
    email: "invalid_password@mail.com",
    password: "onlyCharacters"
}

const register_customer_with_invalid_cpassword = {
    _id: new mongoose.Types.ObjectId(),
    firstName: "invalid_cpassword",
    lastName: "Lainvalid_cpasswordstName",
    email: "invalid_cpassword@mail.com",
    password: "password123",
    password2: "password12345",
    company: "user's restaurant",
    street: "stuttgarter strasse",
    city: "Stuttgart",
    state: "BW",
    code: "71234"
}

const register_customer_without_required_property = { // without the lastName property
    _id: new mongoose.Types.ObjectId(),
    firstName: "without_required_property",
    email: "without_required_property@mail.com",
    password: "password123",
    password2: "password123",
    company: "user's restaurant",
    street: "stuttgarter strasse",
    city: "Stuttgart",
    state: "BW",
    code: "71234"
}


// -------LOGIN-------
const login_customer = {
    _id: new mongoose.Types.ObjectId(),
    email: register_customer.email,
    password: register_customer.password
}

const login_nonexistent_customer = {
    _id: new mongoose.Types.ObjectId(),
    email: "nonexistent@mail.com",
    password: "password123"
}

const login_customer_with_wrong_password = {
    _id: new mongoose.Types.ObjectId(),
    email: register_customer.email,
    password: "wrongpassword123"
}

module.exports = {
    customer_one,
    customer_two,
    customer_three,
    register_customer,
    register_customer_with_invalid_email,
    register_customer_with_invalid_password,
    register_customer_with_invalid_cpassword,
    register_customer_without_required_property,
    login_customer,
    login_nonexistent_customer,
    login_customer_with_wrong_password
}