const Customer = require('../../src/models/user.model');
const Supplier = require('../../src/models/supplier.model');
cons
const { customer_one, customer_two, customer_three } = require('./customer')
const { supplier_one, supplier_two, supplier_three } = require('./supplier')

const setupDatabase = async () => {
	await Customer.deleteMany();
	await Supplier.deleteMany();
	await new Customer(customer_one).save();
	await new Customer(customer_two).save();
	await new Customer(customer_three).save();

	await new Supplier(supplier_one).save();
	await new Supplier(supplier_two).save();
	await new Supplier(supplier_three).save();
}

module.exports = {
    setupDatabase
}