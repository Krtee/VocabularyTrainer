const request = require('supertest')
const app = require('../../src/app')
const Customer = require('../../src/models/user.model')
const { setupDatabase } = require('../fixtures/db')
const {
    register_customer,
    register_customer_with_invalid_email,
    register_customer_with_invalid_password,
    register_customer_with_invalid_cpassword,
    register_customer_without_required_property,
    login_customer,
    login_nonexistent_customer,
    login_customer_with_wrong_password
} = require('../fixtures/customer')

beforeAll(setupDatabase)

describe('Registration', () => {
    it('Should register a new user with valid info', async () => {
        const response = await request(app)
            .post('/user/register')
            .send(register_customer)
            .expect(200)
        
        const customer = await Customer.findById(response.body._id)
        expect(customer).not.toBeNull()
        expect(customer.email).toEqual(register_customer.email)
    })

    it('Should not register a user with an email that already exists', async () => {
        const response = await request(app)
            .post('/user/register')
            .send(register_customer)
            .expect(400)
        expect(response.body.email).toBeDefined()
    })

    it('Should not register a user with an invalid email', async () => {
        const response = await request(app)
            .post('/user/register')
            .send(register_customer_with_invalid_email)
            .expect(400)
        expect(response.body.email).toBeDefined()
    })

    it('Should not register a user with an invalid password', async () => {
        const response = await request(app)
            .post('/user/register')
            .send(register_customer_with_invalid_password)
            .expect(400)
        expect(response.body.password).toBeDefined()
    })

    it('Should not register a user with an invalid confirm password', async () => {
        const response = await request(app)
            .post('/user/register')
            .send(register_customer_with_invalid_cpassword)
            .expect(400)
        expect(response.body.password2).toBeDefined()
    })

    it('Should not register a user without a required property', async () => {
        const response = await request(app)
            .post('/user/register')
            .send(register_customer_without_required_property)
            .expect(400)
        expect(response.body.lastName).toBeDefined()
    })
})

describe('Logging in', () =>{
    it('Should login an existing user', async () => {
        const response = await request(app)
            .post('/user/login')
            .send(login_customer)
            .expect(200)
        expect(response.body.success).toBeTruthy()
    })

    it('Should not login non-existent user', async () => {
        await request(app)
            .post('/user/login')
            .send(login_nonexistent_customer)
            .expect(404)
    })

    it('Should not login an existing user with a wrong password', async () => {
        await request(app)
            .post('/user/login')
            .send(login_customer_with_wrong_password)
            .expect(401)
    })
})

describe('Fetching', () => {
    it('Should fetch all customers', async () => {
        const login_response = await request(app)
            .post('/user/login')
            .send(login_customer)

        const response = await request(app)
            .get('/user')
            .set("Authorization", login_response.body.token)
            .send()
            .expect(200)
        expect(response.body.data.length).toBeGreaterThan(0)
    })

    it('Should not fetch customers without a token', async () => {
        await request(app)
            .get('/user')
            .send()
            .expect(404)
    })
});