const express = require('express');
const vocabRoutes = express.Router();
const Vocab = require('../models/vocab.model');
const Progress = require('../models/progress.model');
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');


// fetches all available data
vocabRoutes.get("/", (req, res) => {
    Vocab.find((err, data) => {
        if (err) return res.status(400).json({ success: false, error: err });
        return res.status(200).json({ success: true, data: data });
    });
});

vocabRoutes.get("/byId", (req, res) => {
    const { id } = req.query;
    Vocab.findOne({ vocab_id: id }, (err, data) => {
        if (err) {
            console.error(err);
            return res.json({ success: false, error: err });
        }
        return res.json({ success: true, data: data });
    });
});


// overwrites existing data
vocabRoutes.post("/update", (req, res) => {
    const { id, update } = req.body;
    Vocab.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// removes existing data
vocabRoutes.delete("/delete", (req, res) => {
    const { id } = req.body;
    Vocab.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

// fetches progress for given vocab
vocabRoutes.get("/getProgress", (req, res) => {
    Progress.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

vocabRoutes.get("/getProgressById", (req, res) => {
    const { id } = req.query;
    Progress.findOne({ vocab_id: id }, (err, data) => {
        if (err) {
            console.error(err);
            return res.json({ success: false, error: err });
        }
        return res.json({ success: true, data: data });
    });
});

vocabRoutes.post("/getProgressForUserAndLanguage", (req, res) => {
    const { user_id, lang_id } = req.body;

    Progress.find({ user_id: user_id, language_id: lang_id }, (err, data) => {
        if (err) {
            console.error(err);
            return res.json({ success: false, error: err });
        }
        return res.json({ success: true, data: data });
    });
});

vocabRoutes.get("/getNumberOfVocabByUserID", (req, res) => {
    const { id } = req.query;
    console.log("*** userID: " + id);
    Progress.find({ user_id: id }, (err, data) => {
        if (err) {
            console.error(err);
            return res.json({ success: false, error: err });
        }
        console.log("*** data: " + JSON.stringify(data));
        return res.json({ success: true, data: data });
    });
});

vocabRoutes.post("/getVocabAndTranslation", (req, res) => {
    const { vocab_id, lang_id } = req.body;
    var vocab = "";
    var translation = "";

    Vocab.findOne({ _id: vocab_id }, (err, data) => {
        if (err) {
            console.error(err);
            return res.json({ success: false, error: err });
        }
        vocab = data.english_word;
        translation = getTranslationForLanguage(data, lang_id);
        return res.json({ vocab: vocab, translation: translation });
    });

});

// adds new data
vocabRoutes.post("/insert", (req, res) => {
    const { language_id, english_word, user_id } = req.body;
    var existingVocab = null;
    var existsInSelectedLanguage = false;
    var vocab_id = null;

    // Check if input form is empty
    if (!language_id || !english_word) {
        return res.json({
            success: false,
            error: "Invalid input",
        });
    }

    // Check if requested vocab does exist in Vocab collection
    Vocab.find((err, list) => {
        if (!err) {
            for (let item of list) {
                if (item.english_word === english_word) {
                    existingVocab = item;
                    // Does requested vocab also exist in the required language?
                    if (getTranslationForLanguage(item, language_id) != null) {
                        existsInSelectedLanguage = true;
                    }
                }
            }        

            // If requested vocab doesn't exist at all or if it doesn't exist in requested language
            if (existingVocab == null || (existingVocab != null && !existsInSelectedLanguage)) {

                const languageTranslator = new LanguageTranslatorV3({
                    version: '2018-05-01',
                    authenticator: new IamAuthenticator({
                        apikey: 'dSg6yvKxrxo9Sy2SCHbV_r9LthK7ybcXnkkjGC4cyOcd',
                    }),
                    url: 'https://api.eu-de.language-translator.watson.cloud.ibm.com/instances/93ebb1a7-fe31-4268-b0b6-3bde1a15069c',
                });

                const translateParams = {
                    text: english_word.toLowerCase(),
                    modelId: `en-${language_id.toLowerCase()}`,
                };

                languageTranslator
                    .translate(translateParams)
                    .then((translationResult) => {
                        const ibmResponse = JSON.stringify(translationResult, null, 2);

                        try {
                            const ibmRes = JSON.parse(ibmResponse)
                            console.log(ibmRes);

                            if (ibmRes.status === 200) {
                                const translation = ibmRes.result.translations[0].translation;
                                console.log(`${english_word} > ${translation}`);
                                // Check if API found a translation
                                if (english_word.toLowerCase() == translation.toLowerCase()) {
                                    // When the API doesn't know a translation for an English input word, 
                                    // it always returns the input word.
                                    return res.status(200).json({ success: false, error: "Unknown word. Please check the spelling." });
                                }
                                // Check whether requested vocab is only missing in requested language or if it's missing completely
                                if (existingVocab != null && !existsInSelectedLanguage) {
                                    var setTranslationWorked = setTranslationForLanguage(existingVocab, language_id, translation);
                                    if (!setTranslationWorked) {
                                        return res.status(400).json({ success: false, error: "An error occured. Please try again later." });
                                    }
                                    vocab_id = existingVocab._id;
                                } else {
                                    const vocab = new Vocab();
                                    vocab.english_word = english_word;
                                    vocab_id = vocab._id;
                                    var setTranslationWorked = setTranslationForLanguage(vocab, language_id, translation);
                                    if (!setTranslationWorked) {
                                        return res.status(400).json({ success: false, error: "An error occured. Please try again later." });
                                    }
                                }

                                var createProgressWorked = createProgress(user_id, vocab_id, language_id);
                                if (!createProgressWorked) {
                                    return res.status(200).json({ success: false, error: "An error occured. Please try again later." });
                                } else {
                                    return res.status(200).json({ success: true, info: "New word was successfully added." });
                                }
                            }
                        } catch (error) {
                            console.error(error)
                        }
                    })
                    .catch((err) => {
                        console.log("error:", err);
                    });


            } else { // If requested vocab already exists in Vocab collection

                Progress.find((err, list) => {
                    var existsInPersonalCollection = false;
                    if (!err) {
                        for (let item of list) {
                            // If requested vocab already exists in personal collection
                            if (item.vocab_id == existingVocab._id && item.user_id == user_id) {
                                existsInPersonalCollection = true;
                                return res.status(200).json({ success: true, info: "Word already exists" });
                            }
                        }
                        if (!existsInPersonalCollection) {
                            // If requested vocab doesn't exist in personal collection yet

                            var createProgressWorked = createProgress(user_id, existingVocab._id, language_id);
                            if (!createProgressWorked) {
                                return res.status(200).json({ success: false, error: "An error occured. Please try again later." });
                            } else {
                                return res.status(200).json({ success: true, info: "New word was successfully added." });
                            }
                        }
                    }
                });
            }

        }
    });


});

function setTranslationForLanguage(vocab, language_id, translation) {
    vocab.translation[language_id] = translation;

    // TODO: Error nicht hier abfangen! True/false zurückliefern und dann in /insert entsprechend reagieren
    vocab.save((err) => {
        if (err) return false;
    });
    return true;
}

function getTranslationForLanguage(vocab, language_id) {
    return vocab.translation[language_id];
}

function createProgress(user_id, vocab_id, language_id) {
    const prog = new Progress();
    prog.user_id = user_id;
    prog.vocab_id = vocab_id;
    prog.language_id = language_id;
    prog.progress = 1;
    prog.right_guesses_in_a_row = 0;

    // TODO: Error nicht hier abfangen! True/false zurückliefern und dann in /insert entsprechend reagieren
    prog.save((err) => {
        if (err) return false;
    });
    return true;
}

module.exports = vocabRoutes;