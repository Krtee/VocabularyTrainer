const request = require('supertest')
const app = require('../../../app')
const Vocab = require('../../models/Vocab.model')
const { setupDatabase } = require('../fixtures/db')
const { add_new_word_wrong_language_id,add_new_wrong_word,add_new_word } = require('../fixtures/vocab')

beforeAll(setupDatabase)

describe('Vocabs', () => {
    it('Should add word with valid info', async () => {
        const response = await request(app)
            .post('/Vocab/insert')
            .send(add_new_word)
            .expect(200)

        const vocab = await Vocab.findById(response.body.data)
        expect(vocab).not.toBeNull()
        expect(vocab.data.english_word).toEqual(add_new_word.english_word)
    })

    it('Should not add word with a word that already exists', async () => {
        const response = await request(app)
            .post('/Vocab/insert')
            .send(add_new_word)
            .expect(400)
    })
})

describe('Fetching', () => {
    it('Should fetch all Vocabs', async () => {

        const response = await request(app)
            .get('/Vocab/')
            .send()
            .expect(200)

        expect(response.body.data.length).toBeGreaterThan(0)
    })

})