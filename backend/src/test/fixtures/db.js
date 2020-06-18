const User = require('../../models/user.model');
const Vocab = require('../../models/vocab.model');
const { user_one, user_two, user_three } = require('./user')
const { vocab_one, vocab_two, vocab_three } = require('./vocab')

const setupDatabase = async () => {
	await User.deleteMany(
		{ "forTesting": true }
	);
	await Vocab.deleteMany(
		{ "forTesting": true }
	);


	await new User(user_one).save();
	await new User(user_two).save();
	await new User(user_three).save();

	await new Vocab(vocab_one).save();
	await new Vocab(vocab_two).save();
	await new Vocab(vocab_three).save(); 

}

module.exports = {
	setupDatabase
}