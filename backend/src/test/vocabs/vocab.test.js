const request = require('supertest')
const app = require('../../../app')
const Vocab = require('../../models/Vocab.model')
const { setupDatabase } = require('../fixtures/db')
const { add_new_word_wrong_language_id, add_new_wrong_word, add_new_word } = require('../fixtures/vocab')

beforeAll(setupDatabase)

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

describe('translation', function () {

});

describe('Fetching', () => {
/*     it('Should fetch all Vocabs', async () => {

        const response = await request(app)
            .get('/Vocab/')
            .send()
            .expect(200)

        expect(response.body.data.length).toBeGreaterThan(0)
    }) */

})