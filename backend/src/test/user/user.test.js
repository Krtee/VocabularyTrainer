const request = require('supertest')
const app = require('../../../app')
const User = require('../../models/user.model')
const { setupDatabase } = require('../fixtures/db')
const { register_user } = require('../fixtures/user')

beforeAll(setupDatabase)

describe('Registration', () => {
    it('Should register a new user with valid info', async () => {
        const response = await request(app)
            .post('/Users/')
            .send(register_user)
            .expect(200)

        const user = await User.findById(response.body.data._id)
        expect(user).not.toBeNull()
        expect(user.email).toEqual(register_user.email)
    })

    it('Should not register a user with an email that already exists', async () => {
        const response = await request(app)
            .post('/Users/')
            .send(register_user)
            .expect(400)
        expect(response.body.email).toBeDefined()
    })
})

describe('Fetching', () => {
    it('Should fetch all users', async () => {

        const response = await request(app)
            .get('/Users/')
            .send()
            .expect(200)
        expect(response.body.data.length).toBeGreaterThan(0)
    })

})