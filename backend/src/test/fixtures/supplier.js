const mongoose = require('mongoose')

const supplier_one = {
    _id: new mongoose.Types.ObjectId(),
	"firstName": "supplier_one",
	"lastName": "supplier_one",
	"email": "supplier_one@email.com",
	"password": "Password123",
	"password2": "Password123",
	"company": "supplier's company",
	"street": "stuttgarter strasße",
	"city": "Stuttgart",
	"state": "bw",
	"code": "70123"
}

const supplier_two = {
    _id: new mongoose.Types.ObjectId(),
	"firstName": "supplier_two",
	"lastName": "supplier_two",
	"email": "supplier_two@email.com",
	"password": "Password123",
	"password2": "Password123",
	"company": "supplier's company",
	"street": "stuttgarter strasße",
	"city": "Stuttgart",
	"state": "bw",
	"code": "70123"
}

const supplier_three = {
    _id: new mongoose.Types.ObjectId(),
	"firstName": "supplier_three",
	"lastName": "supplier_three",
	"email": "supplier_three@email.com",
	"password": "Password123",
	"password2": "Password123",
	"company": "supplier's company",
	"street": "stuttgarter strasße",
	"city": "Stuttgart",
	"state": "bw",
	"code": "70123"
}

// -------REGISTER-------
const register_supplier = {
    _id: new mongoose.Types.ObjectId(),
    firstName: "register_supplier",
    lastName: "register_supplier",
    email: "register_supplier@mail.com",
    password: "password123",
    password2: "password123",
    company: "supplier's restaurant",
    street: "stuttgarter strasse",
    city: "Stuttgart",
    state: "BW",
    code: "71234"
}

const register_supplier_with_invalid_email = {
    _id: new mongoose.Types.ObjectId(),
    firstName: "invalid_email",
    lastName: "invalid_email",
    email: "invalid_email.com",
    password: "password123",
    password2: "password123",
    company: "supplier's restaurant",
    street: "stuttgarter strasse",
    city: "Stuttgart",
    state: "BW",
    code: "71234"
}

const register_supplier_with_invalid_password = {
    _id: new mongoose.Types.ObjectId(),
    firstName: "invalid_password",
    lastName: "invalid_password",
    email: "invalid_password@mail.com",
    password: "onlyCharacters",
    password2: "onlyCharacters",
    company: "supplier's restaurant",
    street: "stuttgarter strasse",
    city: "Stuttgart",
    state: "BW",
    code: "71234"
}

const register_supplier_with_invalid_cpassword = {
    _id: new mongoose.Types.ObjectId(),
    firstName: "invalid_cpassword",
    lastName: "Lainvalid_cpasswordstName",
    email: "invalid_cpassword@mail.com",
    password: "password123",
    password2: "password12345",
    company: "supplier's restaurant",
    street: "stuttgarter strasse",
    city: "Stuttgart",
    state: "BW",
    code: "71234"
}

const register_supplier_without_required_property = { // without the lastName property
    _id: new mongoose.Types.ObjectId(),
    firstName: "without_required_property",
    email: "without_required_property@mail.com",
    password: "password123",
    password2: "password123",
    company: "supplier's restaurant",
    street: "stuttgarter strasse",
    city: "Stuttgart",
    state: "BW",
    code: "71234"
}


// -------LOGIN-------
const login_supplier = {
    _id: new mongoose.Types.ObjectId(),
    email: register_supplier.email,
    password: register_supplier.password
}

const login_nonexistent_supplier = {
    _id: new mongoose.Types.ObjectId(),
    email: "nonexistent@mail.com",
    password: "password123"
}

const login_supplier_with_wrong_password = {
    _id: new mongoose.Types.ObjectId(),
    email: register_supplier.email,
    password: "wrongpassword123"
}

module.exports = {
    supplier_one,
    supplier_two,
    supplier_three,
    register_supplier,
    register_supplier_with_invalid_email,
    register_supplier_with_invalid_password,
    register_supplier_with_invalid_cpassword,
    register_supplier_without_required_property,
    login_supplier,
    login_nonexistent_supplier,
    login_supplier_with_wrong_password
}