const request = require('supertest')
const app = require('../../../app')
const User = require('../../models/user.model')
const Vocab = require('../../models/Vocab.model')
const { setupDatabase } = require('../fixtures/db')
const { add_new_word_wrong_language_id, add_new_wrong_word, add_new_word, register_testuser, progress_object, increase_progress, get_all_progress_objects, user_id } = require('../fixtures/vocab')


beforeAll(setupDatabase)

let testuser;

describe('Registration', () => {
    it('Should register a new user with valid info', async () => {
        const response = await request(app)
            .post('/Users/')
            .send(register_testuser)
            .expect(200)

        testuser = await User.findById(response.body.data._id)
        expect(testuser).not.toBeNull()
        expect(testuser.username).toEqual(register_testuser.username)
    })

})

describe('Vocabs', () => {
    it('Should add a new, valid vocab', async () => {
        const response = await request(app)
            .post('/Vocab/insert')
            .send(add_new_word)
            .expect(200)

        //const vocab = await Vocab.findById(response.body.data)
        //console.log(response.body.data)
        //expect(vocab).not.toBeNull()
        console.log(response.body)

    })

    it('Should not add a vocab that already exists', async () => {
        const response = await request(app)
            .post('/Vocab/insert')
            .send(add_new_word)
            .expect(200)

        console.log(response.body)
    })

    it('Should not add a nonexistent vocab', async function () {
        const response = await request(app)
            .post('/Vocab/insert')
            .send(add_new_wrong_word)
            .expect(400)
    });

    it('Should not add a vocab with a nonexistent lang id', async function () {
        const response = await request(app)
            .post('/Vocab/insert')
            .send(add_new_word_wrong_language_id)
            .expect(400)

        expect(response.body.success).toEqual(false)
    })


})

describe('Progress', () => {
    it('Should add a progress object for a given word, language and user', async () => {

        const response = await request(app)
            .post('/Vocab/createProgress')
            .send(progress_object)
            .expect(200)

        expect(response.body.success).toEqual(true)
    })

    it('Should get all progress objects for given user and language', async () => {

        const response = await request(app)
            .post('/Vocab/getProgressForUserAndLanguage')
            .send(get_all_progress_objects)
            .expect(200)

        expect(response.body.success).toEqual(true)
    })

    it('Should increase RGIAR for given user, language and word (from 0 to 1)', async () => {

        const response = await request(app)
            .post('/Vocab/increaseRGIAR')
            .send(increase_progress)
            .expect(200)

        expect(response.body.success).toEqual(true)
    })

    
    it('Should return RGIAR 1 for given user, language and word', async () => {

        const response = await request(app)
            .post('/Vocab/searchProgress')
            .send(progress_object)
            .expect(200)

        expect(response.body.data.right_guesses_in_a_row).toEqual(1)
    })

    it('Should reset RGIAR for given user, language and word', async () => {

        const response = await request(app)
            .post('/Vocab/resetRGIAR')
            .send(increase_progress)
            .expect(200)

        expect(response.body.success).toEqual(true)
    })

    it('Should return RGIAR 0 for given user, language and word', async () => {

        const response = await request(app)
            .post('/Vocab/searchProgress')
            .send(progress_object)
            .expect(200)

        expect(response.body.data.right_guesses_in_a_row).toEqual(0)
    })

    it('Should increase progress for given user, language and word (from 1 to 2)', async () => {

        const response = await request(app)
            .post('/Vocab/increaseProgress')
            .send(increase_progress)
            .expect(200)

        expect(response.body.success).toEqual(true)
    })

    it('Should return Progress 2 for given user, language and word', async () => {

        const response = await request(app)
            .post('/Vocab/searchProgress')
            .send(progress_object)
            .expect(200)

        expect(response.body.data.progress).toEqual(2)
    })

})


describe('Delete', () => {

    it('Should delete specified progress', async () => {

        const response = await request(app)
            .delete(`/Vocab/${user_id}`)
            .send()
            .expect(200)
        expect(response.body.success).toEqual(true)
    })

})


