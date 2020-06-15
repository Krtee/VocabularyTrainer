const express = require("express");
const vocabRoutes = express.Router();
const Vocab = require("../models/vocab.model");
const Progress = require("../models/progress.model");
const LanguageTranslatorV3 = require("ibm-watson/language-translator/v3");
const {IamAuthenticator} = require("ibm-watson/auth");

// fetches all available data
vocabRoutes.get("/", (req, res) => {
    Vocab.find((err, data) => {
        if (err) return res.status(400).json({success: false, error: err});
        return res.status(200).json({success: true, data: data});
    });
});

vocabRoutes.post("/getByIdArray", (req, res) => {
    const en_words = JSON.parse(JSON.stringify(req.body));
    const query = {english_word: {$in: en_words}};

    Vocab.find(query, function (err, result) {
        if (err) {
            res.status(400).send({
                success: false,
                error: err.message,
            });
        }
        res.status(200).send({
            success: true,
            data: result,
        });
    });
});

vocabRoutes.get("/byId", (req, res) => {
    const {id} = req.query;
    Vocab.findOne({vocab_id: id}, (err, data) => {
        if (err) {
            // console.error(err);
            return res.json({success: false, error: err});
        }
        return res.json({success: true, data: data});
    });
});

// overwrites existing data
vocabRoutes.post("/update", (req, res) => {
    const {id, update} = req.body;
    Vocab.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true});
    });
});

// removes existing data
vocabRoutes.delete("/delete", (req, res) => {
    const {id} = req.body;
    Vocab.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({success: true});
    });
});

// fetches progress for given vocab
vocabRoutes.get("/getProgress", (req, res) => {
    Progress.find((err, data) => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true, data: data});
    });
});

vocabRoutes.post("/createProgress", (req, res) => {
    const {user_id, english_word, language_id} = req.body;

    Progress.find(
        {english_word: english_word, user_id: user_id, language_id: language_id},
        (entry) => {
            if (entry !== null) {
                res.json({success: true, data: entry})
            }
        }
    );

    const prog = new Progress({
        english_word: english_word,
        user_id: user_id,
        language_id: language_id,
        progress: 1,
        right_guesses_in_a_row: 0,
    });

    prog.save((err) => {
        if (err) return res.json({success: false, error: err});
    });
    return res.json({success: true, data: prog});
});


vocabRoutes.post("/searchProgress", (req, res) => {

    Progress.findOne(req.body, (err, data) => {
        if (err) {
            // console.error(err);
            return res.json({success: false, error: err});
        }
        return res.json({success: true, data: data});
    });
});

vocabRoutes.post("/getProgressForUserAndLanguage", (req, res) => {
    const {user_id, lang_id} = req.body;

    Progress.find({user_id: user_id, language_id: lang_id}, (err, data) => {
        if (err) {
            return res.json({success: false, error: err});
        }
        return res.json({success: true, data: data});
    });
});

vocabRoutes.get("/filterProgress", (req, res) => {
    Progress.find(req.query, (err, data) => {
        if (err) {
            console.error(err);
            return res.json({success: false, error: err});
        }
        return res.json({success: true, data: data});
    });
});

/**
 * Increase right_guesses_in_a_row by one
 */
vocabRoutes.post("/increaseRGIAR", (req, res) => {
    const {user_id, lang_id, english_word} = req.body;

    Progress.findOneAndUpdate(
        {user_id: user_id, language_id: lang_id, english_word: english_word},
        {$inc: {right_guesses_in_a_row: 1}},
        (err, data) => {
            if (err) {
                console.error(err);
                return res.json({success: false, error: err});
            }
            console.info("%c Updated: ", "background: #0f0", data)
            return res.json({success: true, data: data});
        }
    );
});

vocabRoutes.post("/resetRGIAR", (req, res) => {
    const {user_id, lang_id, english_word} = req.body;
    Progress.findOneAndUpdate(
        {user_id: user_id, language_id: lang_id, english_word: english_word},
        {right_guesses_in_a_row: 0},
        (err, data) => {
            if (err) {
                console.error(err);
                return res.json({success: false, error: err});
            }
            console.info("%c reset: > ", "background: #0f0", data)
            return res.json({success: true, data: data});
        }
    );
});

/**
 * Increase progress by one
 */
vocabRoutes.post("/increaseProgress", (req, res) => {
    const {user_id, lang_id, english_word} = req.body;
    Progress.findOneAndUpdate(
        {user_id: user_id, language_id: lang_id, english_word: english_word},
        {$inc: {progress: 1}},
        (err, data) => {
            if (err) {
                console.error(err);
                return res.json({success: false, error: err});
            }
            console.info("%c Updated: ", "background: #0f0", data)
            return res.json({success: true, data: data});
        }
    );
});

vocabRoutes.post("/getVocabAndTranslation", (req, res) => {
    const {english_word, lang_id} = req.body;
    var vocab = "";
    var translation = "";

    Vocab.findOne({english_word: english_word}, (err, data) => {
        if (err || !data) {
            // console.error(err);
            return res.json({success: false, error: err});
        }
        try {
            return res.json({vocab: data.english_word, translation: data.translation[lang_id]});
        } catch (error) {
            console.error(error);
        }
    });
});

// adds new data
vocabRoutes.post("/insert", (req, res) => {
    try {
        const {language_id, english_word} = req.body;

        // Check if input form is empty
        if (!language_id || !english_word) {
            return res.json({
                success: false,
                error: "Invalid input",
            });
        }

        const en_word = english_word.toLowerCase();
        const lang_id = language_id.toLowerCase();

        // Check if requested vocab does exist in Vocab collection
        Vocab.find({english_word: en_word}, async (err, existingVocab) => {
            if (!!err) {
                console.error(err);
                return res.status(500).json({success: false, error: "An error occurred."});
            }

            // Is the word in vocab collection?
            const isInCollection = existingVocab && existingVocab.length !== 0;

            if (!isInCollection) {
                console.log(
                    "\x1b[43m\x1b[30m%s\x1b[0m\x1b[40m\x1b[33m%s\x1b[0m",
                    "Is not in collection:",
                    " ",
                    en_word
                );

                // Create Word in vocab collection

                const translation = await getTranslation(lang_id, english_word);
                if (translation.status !== 200) {
                    return res.status(translation.status).json(translation);
                }

                // Word does not exist --> create new db entry with first translation
                const vocab = new Vocab({
                    english_word: en_word,
                    translation: {[lang_id]: translation.translation},
                });
                vocab.save((err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            } // if is NOT in collection
            else {
                // IS in collection
                console.log(
                    "\x1b[42m\x1b[30m%s\x1b[0m\x1b[40m\x1b[32m%s\x1b[0m",
                    "Is already in collection:",
                    " ",
                    en_word
                );

                // check if already in this language available
                const isAlreadyTranslated = getTranslationForLanguage(existingVocab[0], lang_id);
                if (isAlreadyTranslated) {
                    return res
                        .status(200)
                        .json({success: true, message: `Is already translated to ${lang_id}`});
                }

                const translation = await getTranslation(lang_id, en_word);
                if (translation.status !== 200) {
                    return res.status(translation.status).json(translation);
                }

                setTranslationForLanguage(existingVocab[0], lang_id, translation.translation);
            } // IS in collection

            // if all good
            return res.status(200).json({success: true});
        });
    } catch (error) {
        console.error(error);
    }
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
    try {
        return vocab.translation[language_id] ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function getTranslation(lang_id, en_word) {
    const languageTranslator = new LanguageTranslatorV3({
        version: "2018-05-01",
        authenticator: new IamAuthenticator({
            apikey: "dSg6yvKxrxo9Sy2SCHbV_r9LthK7ybcXnkkjGC4cyOcd",
        }),
        url:
            "https://api.eu-de.language-translator.watson.cloud.ibm.com/instances/93ebb1a7-fe31-4268-b0b6-3bde1a15069c",
    });

    const translateParams = {
        text: en_word,
        modelId: `en-${lang_id}`,
    };

    // Translate via IBM
    let ibmRes = await languageTranslator.translate(translateParams).then((translationResult) => {
        return JSON.stringify(translationResult, null, 2);
    });
    ibmRes = JSON.parse(ibmRes);

    if (ibmRes.status !== 200) {
        // Any IBM Problem
        return res
            .status(500)
            .json({success: false, error: "Problems with IBM Cloud. Try again later."});
    }

    const translation = ibmRes.result.translations[0].translation;

    // Check if API found a translation
    if (en_word === translation.toLowerCase()) {
        console.log("\x1b[41m\x1b[30m%s\x1b[0m", "IBM SEEMS NOT TO KNOW THIS WORD:", " ", en_word);

        // When the API doesn't know a translation for an English input word,
        // it always returns the input word.
        return {status: 502, error: "Unknown word. Please check the spelling."};
    }
    return {status: 200, translation: translation};
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
