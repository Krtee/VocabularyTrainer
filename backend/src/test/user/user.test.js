const request = require('supertest')
const app = require('../../../app')
const User = require('../../models/user.model')
const { setupDatabase } = require('../fixtures/db')
const { register_user, get_id_for_username, get_id_for_nonexistent_username, user_info_to_change } = require('../fixtures/user')

beforeAll(setupDatabase)

let testuser;

describe('Registration', () => {
    it('Should register a new user with valid info', async () => {
        const response = await request(app)
            .post('/Users/')
            .send(register_user)
            .expect(200)

        testuser = await User.findById(response.body.data._id)
        expect(testuser).not.toBeNull()
        expect(testuser.username).toEqual(register_user.username)
    })

    it('Should not register a user with a user name that already exists', async () => {
        const response = await request(app)
            .post('/Users/')
            .send(register_user)
            .expect(400)
        expect(response.body.success).toEqual(false)
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

    it('Should get ID for username', async () => {

        const response = await request(app)
            .post('/Users/getIdForUserName')
            .send(get_id_for_username)
            .expect(200)
        expect(response.body.userId).toBeDefined()
    })

    it('Should not get ID for nonexistent username', async () => {
        const response = await request(app)
            .post('/Users/getIdForUserName')
            .send(get_id_for_nonexistent_username)
            .expect(400)
        expect(response.body.success).toEqual(false)
    })

})

describe('Editing', () => {
    it('Should successfully edit user data', async () => {

        const response = await request(app)
            .delete(`/Users/${testuser._id}`, { user_info_to_change })
            .send()
            .expect(200)
        expect(response.body.success).toEqual(true)
    })

})

describe('Deleting', () => {
    it('Should delete specified user', async () => {

        const response = await request(app)
            .delete(`/Users/${testuser._id}`)
            .send()
            .expect(200)
        expect(response.body.success).toEqual(true)
    })

    it('Should get 404 when deleting user with nonexistent id', async () => {

        let nonexistent_id = "###";
        const response = await request(app)
            .delete(`/Users/${nonexistent_id}`)
            .send()
            .expect(404)
    })


})

